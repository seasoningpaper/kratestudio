import test from 'node:test';
import assert from 'node:assert/strict';
import {transferStack,stackLayout} from '../src/stack-model.mjs';
const floating=()=>({chapters:[{id:'c',events:['a','b','c'].map((id,i)=>({id,type:'wait',duration:1,blockDetached:true,blockStack:'a',blockPos:{x:600,y:200+i*66}}))}]});
test('r4 video reproduction: extracting a floating head must preserve the remaining tail world position',()=>{
 const p=floating(),before=stackLayout(p.chapters[0].events,-1,true,()=>''),anchors=Object.fromEntries(before.map(r=>[r.id,{x:r.x,y:r.y}]));
 assert.ok(transferStack(p,0,['a'],null,{detach:true,x:900,y:400,anchors}));
 const after=stackLayout(p.chapters[0].events,-1,true,()=>''),old=before.find(r=>r.id==='b'),next=after.find(r=>r.id==='b');
 assert.deepEqual({x:next.x,y:next.y},{x:old.x,y:old.y});
 assert.equal(after.find(r=>r.id==='a').y,400);
});
import {statementContainers,stackSpan} from '../src/stack-model.mjs';
import {inspectBlocks} from '../src/block-integrity.mjs';
import {setup,wait} from './p1c-dom-harness.mjs';
function pointer(h,el,type,x,y){const ev=new h.w.MouseEvent(type,{bubbles:true,cancelable:true,button:0,clientX:x,clientY:y});Object.defineProperties(ev,{pointerId:{value:7},pointerType:{value:'mouse'},isPrimary:{value:true}});el.dispatchEvent(ev)}
function nested(depth){const es=[];for(let i=0;i<depth;i++)es.push({id:'r'+i,type:'repeat',count:2});es.push({id:'body',type:'wait',duration:1});for(let i=depth-1;i>=0;i--)es.push({id:'end'+i,type:'repeatEnd',loopId:'r'+i});return es}
for(const depth of [1,2,3])test('r4 statement inputs: '+depth+' nested containers have measured spines, independent body detach and legal reinsert',()=>{
 const p={chapters:[{id:'c',events:nested(depth)}]},rows=stackLayout(p.chapters[0].events,-1,true,()=> 'blue'),cs=statementContainers(p.chapters[0].events,rows);
 assert.equal(cs.length,depth);for(const c of cs){const end=rows.find(r=>r.id==='end'+c.id.slice(1));assert.equal(c.y+c.h,end.y+5);assert.equal(c.x,rows.find(r=>r.id===c.id).x)}
 assert.deepEqual(stackSpan(p.chapters[0].events,depth,'single'),['body']);assert.ok(transferStack(p,0,['body'],null,{detach:true,x:800,y:500}));assert.deepEqual(inspectBlocks(p.chapters[0].events),[]);
 assert.ok(transferStack(p,0,['body'],'r'+(depth-1),{before:false}));assert.deepEqual(p.chapters[0].events.map(e=>e.id),nested(depth).map(e=>e.id));assert.deepEqual(inspectBlocks(p.chapters[0].events),[]);
});
test('r4 real editor pointer replay: floating head detach preserves tail DOM geometry, cancellation and Undo restore data',async()=>{
 const h=await setup();try{const p=h.w.__p();p.chapters[0].events=floating().chapters[0].events;h.w.__select(0);h.w.__render();h.d.querySelector('[data-mode=blocks]').click();await wait();
 const area=h.d.querySelector('.blocks-program');area.getBoundingClientRect=()=>({left:250,top:0,right:1550,bottom:1000,width:1300,height:1000});
 const head=()=>h.d.querySelector('[data-block-id=a]'),tail=()=>h.d.querySelector('[data-block-id=b]'),y=tail().style.top;
 const before=JSON.stringify(p.chapters[0].events);pointer(h,head(),'pointerdown',870,230);pointer(h,head(),'pointermove',1200,430);pointer(h,head(),'pointercancel',1200,430);await wait();assert.equal(JSON.stringify(p.chapters[0].events),before);
 // Alt explicitly extracts one statement rather than the default following stack.
 const el=head(),ev=new h.w.MouseEvent('pointerdown',{bubbles:true,cancelable:true,button:0,clientX:870,clientY:230,altKey:true});Object.defineProperties(ev,{pointerId:{value:7},pointerType:{value:'mouse'}});el.dispatchEvent(ev);
 pointer(h,el,'pointermove',1200,430);pointer(h,el,'pointerup',1200,430);await wait();assert.equal(tail().style.top,y);assert.equal(tail().style.transform,'');assert.equal(h.w.__p().chapters[0].events.find(e=>e.id==='b').blockStack,'b');
 await h.w.KoiStorage.saveProject(h.w.__p());assert.equal((await h.w.KoiStorage.loadProject(p.id)).chapters[0].events.find(e=>e.id==='b').blockPos.y,parseFloat(y));
 h.d.querySelector('#undo').click();await wait();assert.equal(JSON.stringify(h.w.__p().chapters[0].events),before);h.d.querySelector('#redo').click();await wait();assert.equal(tail().style.top,y);assert.equal(h.errors.length,0);
 }finally{h.dom.window.close()}
});
test('r4 real editor: paired C spines render and follow parent drag, no persistence on cancel',async()=>{const h=await setup();try{h.w.__p().chapters[0].events=nested(3);h.w.__select(0);h.w.__render();h.d.querySelector('[data-mode=blocks]').click();await wait();assert.equal(h.d.querySelectorAll('[data-block-container]').length,3);const before=JSON.stringify(h.w.__p().chapters),el=h.d.querySelector('[data-block-id=r0]');pointer(h,el,'pointerdown',100,100);pointer(h,el,'pointermove',180,180);assert.ok([...h.d.querySelectorAll('[data-block-container]')].every(n=>n.style.transform==='translate(80px,80px)'));pointer(h,el,'pointercancel',180,180);await wait();assert.equal(JSON.stringify(h.w.__p().chapters),before);assert.ok([...h.d.querySelectorAll('[data-block-container]')].every(n=>!n.style.transform));}finally{h.dom.window.close()}});
test('r4 video trash replay: deleting a floating stack never pans the viewport to the final story event',async()=>{const h=await setup();try{const p=h.w.__p();p.chapters[0].events=[...Array.from({length:500},(_,i)=>({id:'story'+i,type:'wait',duration:1,text:'等待'})),{id:'floating',type:'wait',duration:1,blockDetached:true,blockStack:'floating',blockPos:{x:600,y:200}}];h.w.__select(500);h.w.__render();h.d.querySelector('[data-mode=blocks]').click();await wait();h.d.querySelector('.blocks-program').getBoundingClientRect=()=>({left:250,top:0,right:1550,bottom:1000,width:1300,height:1000});h.d.querySelector('.blocks-palette').getBoundingClientRect=()=>({left:0,top:0,right:240,bottom:1000,width:240,height:1000});const transform=h.d.querySelector('.blocks-world').style.transform,el=h.d.querySelector('[data-block-id=floating]');pointer(h,el,'pointerdown',870,230);pointer(h,el,'pointermove',150,200);pointer(h,el,'pointerup',150,200);await wait();assert.equal(h.w.__p().chapters[0].events.length,500);assert.equal(h.d.querySelector('.blocks-world').style.transform,transform);assert.equal(h.errors.length,0)}finally{h.dom.window.close()}});
