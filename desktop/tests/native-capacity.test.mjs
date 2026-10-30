import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {ProjectStore} from '../src/project-store.ts';
import {Engine} from '../../src/engine.mjs';
import {synchronizeWorkspace,planProgramApply,applyProgramResult} from '../../src/program-sync.mjs';
import {stackLayout} from '../../src/stack-model.mjs';
import {positions,edges} from '../../src/flow-math.mjs';

for(const size of [50,300,500])test(`${size}事件：原生SQLite與四模式資料往返、執行結果、遊戲存檔一致`,()=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'koi-native-capacity-'));let store;
 try{
  store=new ProjectStore(path.join(root,'user'),path.join(root,'projects'));
  const events=Array.from({length:size-1},(_,i)=>({id:'e'+i,type:i%4===0?'variable':'dialogue',text:'事件 '+i,
    ...(i%4===0?{variable:'score',operation:'add',value:1}:{name:'測試角色'}),
    custom:{nested:{values:[i,true,false,null,'保留']},assetReference:'future-asset'}}));events.push({id:'end',type:'end',text:'結局'});
  const p={id:'p'+size,title:'原生容量測試',settings:{},variables:{score:0},variableTypes:{score:'number'},chapters:[{id:'c',title:'序章',events}],images:[]};
  synchronizeWorkspace(p);const semantic=es=>JSON.parse(JSON.stringify(es.map(({scriptLine,...e})=>e))),before=semantic(events);
  stackLayout(events,0,false,()=> '');const result=planProgramApply(p,p.programFiles[0]);assert.ok(!result.diagnostics.some(d=>d.severity==='error'));assert.ok(applyProgramResult(p,p.programFiles[0],result));positions(p.chapters[0].events);edges(p.chapters[0].events);assert.deepEqual(semantic(p.chapters[0].events),before);
  const run=project=>{const en=new Engine(project),trace=[];for(let step=0;step<size*2;step++){assert.equal(en.state.error,null);trace.push([en.event?.id,en.state.vars.score]);if(en.event?.type==='end')return {en,trace};assert.ok(en.advance())}assert.fail('執行步數超限')};
  const original=run(p);store.commit(store.begin(p));store.close();store=new ProjectStore(path.join(root,'user'),path.join(root,'projects'));
  const restored=store.load();assert.deepEqual(restored,p);const loaded=run(restored);assert.deepEqual(loaded.trace,original.trace);
  const saved=original.en.save();store.settingSet('koi-game-'+p.id+'-slots',JSON.stringify({quick:saved}));const player=new Engine(restored);assert.ok(player.load(JSON.parse(store.settingGet('koi-game-'+p.id+'-slots')).quick));assert.deepEqual(player.state,original.en.state);
 }finally{store?.close();fs.rmSync(root,{recursive:true,force:true})}
});
