import test from'node:test';import assert from'node:assert/strict';import{writeFileSync}from'node:fs';
import{Engine}from'../src/engine.mjs';import{serializeEvents,compileProgram}from'../src/program-files.mjs';
import{story,supplied,copy,semantic}from'./r4-story-fixture.mjs';
import{moveEvent}from'../src/event-order.mjs';import{copyCards,pasteCards}from'../src/card-clipboard.mjs';

function play(p,policy={max:false,final:0},saving=false){
 const en=new Engine(p),trace=[],choices=new Set(),executed=new Set();let steps=0,saves=0;
 const apply=en.apply.bind(en);en.apply=e=>{executed.add(e.id);const before=Object.keys(en.state.actors);apply(e);if(['character','animation','jump','condition'].includes(e.type))trace.push({chapter:en.state.chapter,index:en.state.index,id:e.id,type:e.type,target:e.target??e.character,before,after:Object.keys(en.state.actors),error:en.state.error})};
 while(!en.state.ended&&en.event?.type!=='end'&&steps++<700){assert.equal(en.state.error,null);const e=en.event;executed.add(e.id);let pick;if(e.type==='choice'){pick=e.options.length===4?policy.final:e.options.length===3&&policy.first!==undefined?policy.first:policy.max?e.options.length-1:0;choices.add(e.id+':'+pick)}
  if(saving&&saves<3&&['choice','dialogue'].includes(e.type)&&steps%17===0){const snapshot=en.save(),restored=new Engine(p);assert.ok(restored.load(snapshot));assert.deepEqual(restored.state,snapshot.state);assert.deepEqual(restored.history,snapshot.history);assert.deepEqual(restored.state,copy(en.state));saves++}
  assert.ok(en.advance(pick,e.type==='activity'?{score:100}:e.type==='input'?'測試':undefined));
 }
 assert.equal(en.state.error,null);assert.equal(en.event?.type,'end');return{steps,end:en.event.id,choices:[...choices],executed:[...executed],trace,saves};
}
test('R4 supplied source: missing original modules remain an explicit untested dependency',()=>{const en=new Engine(story(false,{stubs:false}));assert.equal(en.event.type,'activity');assert.equal(en.advance(undefined,{}),false);assert.equal(en.state.index,1)});
test('R4 supplied original: null is invalid even after a successful fig-right show; never auto-repair story data',()=>{const p=story(false),before=copy(p);const en=new Engine(p);for(let i=0;i<20&&!en.state.error;i++)en.advance(undefined,en.event?.type==='activity'?{score:100}:undefined);assert.match(en.state.error,/動畫目標.*null/);assert.equal(en.state.index,15);assert.ok(en.state.actors['fig-right']);assert.equal(p.chapters[0].events.filter(e=>e.type==='animation'&&e.target===null).length,20);assert.deepEqual(p,before)});
test('R4 supplied correction: real branch execution covers all option edges and seven endings without alias errors',{timeout:15000},()=>{
 const p=story(),before=copy(p),runs=[];for(const max of[false,true])for(let final=0;final<4;final++)runs.push({max,final,...play(p,{max,final},true)});runs.push({first:1,final:0,...play(p,{first:1,final:0},true)});
 const edges=new Set(runs.flatMap(r=>r.choices)),endings=new Set(runs.map(r=>r.end)),expected=p.chapters[0].events.filter(e=>e.type==='choice').reduce((n,e)=>n+e.options.length,0);
 assert.equal(edges.size,expected);assert.equal(endings.size,7);assert.deepEqual(p,before);
 writeFileSync('research/r4-20261021/supplied-story-traces.json',JSON.stringify({scope:supplied.scope,sourceSha256:supplied.originalSha256,correctedSha256:supplied.suppliedCorrectionSha256,eventCount:513,optionEdges:edges.size,endings:endings.size,runs},null,2));
});
test('R4 supplied correction: Script roundtrip preserves all fields, IDs, target types and branch execution',{timeout:10000},()=>{
 const p=story(),es=p.chapters[0].events,result=compileProgram({kind:'script',chapterId:'story',source:serializeEvents(es)},p);assert.deepEqual(result.diagnostics.map(d=>[d.severity,d.message]),[['warning','缺少或有重複名稱的素材：08f12b2e-d1f6-4d4d-acb4-0f7a91405e76']]);assert.deepEqual(semantic(result.events),semantic(es));p.chapters[0].events=result.events;
 assert.deepEqual(play(p,{max:true,final:2}).choices,play(story(),{max:true,final:2}).choices);
 const original=story(false),parsed=compileProgram({kind:'script',chapterId:'story',source:serializeEvents(original.chapters[0].events)},original);assert.equal(parsed.events.filter(e=>e.type==='animation'&&e.target===null).length,20);
});

const show=(id,key,position)=>({id,type:'character',text:'登場',character:key,position,image:'img',replaceMode:'slot'});
const project=events=>({id:'r4-lifecycle',variables:{route:true},images:[{id:'img',name:'立繪.png'}],chapters:[{id:'a',title:'甲',events},{id:'b',title:'乙',events:[{id:'end',type:'end',text:'完'}]}]});
test('R4 lifecycle: conditional branch skips invalid off-route targets; jump carries the actual actors across chapters and save/load',()=>{
 const p=project([show('a','A','right'),show('b','B','left'),{id:'branch',type:'condition',variable:'route',operator:'==',value:true,target:4,elseTarget:3},{id:'off',type:'animation',target:'missing',motion:'shake'},{id:'jump',type:'jump',targetChapter:'b',target:0}]);
 p.chapters[1].events=[{id:'move',type:'animation',target:'fig-right',motion:'shake',wait:true},{id:'exit',type:'character',character:'fig-right',action:'hide',motion:'fadeOut',wait:true},show('again','C','right'),{id:'again-motion',type:'animation',target:'fig-right',motion:'bounce',wait:true},{id:'end',type:'end',text:'完'}];
 const en=new Engine(p);assert.equal(en.event.id,'move');assert.equal(en.state.error,null);const save=en.save(),restored=new Engine(p);assert.ok(restored.load(save));assert.deepEqual(restored.state,en.state);en.advance();const token=en.state.actors.A.exit.token;en.advance();assert.deepEqual(Object.keys(en.state.actors),['B','C']);assert.equal(en.completeCharacterExit('A',token),false);assert.equal(en.state.actors.C.motion,'bounce');en.advance();assert.equal(en.event.id,'end');en.rollback();assert.equal(en.event.id,'again-motion');
});
test('R4 lifecycle: repeat center/right show, replacement and waiting exit 20 times without stale aliases',()=>{
 const events=[show('other','other','left')];for(let i=0;i<20;i++){const position=i%2?'center':'right';events.push(show('show'+i,'slot-'+i,position),{id:'move'+i,type:'animation',target:'fig-'+position,motion:'shake',wait:true},{id:'exit'+i,type:'character',character:'fig-'+position,action:'hide',motion:'fadeOut',wait:true})}events.push({id:'end',type:'end',text:'完'});
 const en=new Engine(project(events));for(let i=0;i<50&&en.event.type!=='end';i++){assert.equal(en.state.error,null);assert.ok(en.state.actors.other);en.advance()}assert.equal(en.event.type,'end');assert.deepEqual(Object.keys(en.state.actors),['other']);
});
test('R4 target namespaces: filename, role ID and empty position never alias an unrelated actor',()=>{
 for(const target of['character_me2','character_me2_free.png','fig-center',null,'']){const p=project([show('actor','instance','right'),{id:'bad',type:'animation',target,motion:'shake',wait:true}]),en=new Engine(p);assert.match(en.state.error,/動畫目標/);assert.deepEqual(Object.keys(en.state.actors),['instance'])}
});
test('R4 edit lifecycle: reordering and copied events keep string targets and independent parameters',()=>{const p=project([show('show','A','right'),{id:'motion',type:'animation',target:'fig-right',motion:'shake',wait:true},{id:'line',type:'dialogue',text:'停'}]);const es=p.chapters[0].events;assert.ok(moveEvent(p,0,2,1));assert.equal(es.find(e=>e.id==='motion').target,'fig-right');const [cloned]=pasteCards(p,0,2,copyCards(p,0,['motion']));assert.notEqual(cloned.id,'motion');cloned.motion='bounce';assert.equal(es.find(e=>e.id==='motion').motion,'shake');assert.equal(cloned.target,'fig-right')});
