import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {DatabaseSync} from 'node:sqlite';
import {ProjectStore} from '../src/project-store.ts';
import * as storage from '../renderer/native-storage.mjs';

const project=()=>({id:'save-safety',title:'儲存安全',images:[],audio:[],videos:[],fonts:[],chapters:[{id:'c',events:[{id:'e',type:'dialogue',text:'原內容'}]}]});
function fixture(t){const root=fs.mkdtempSync(path.join(os.tmpdir(),'koi-save-safety-'));const s=new ProjectStore(path.join(root,'user'),path.join(root,'projects'));t.after(()=>{delete globalThis.KoiDesktop;s.close();fs.rmSync(root,{recursive:true,force:true})});return{root,s};}
function bridge(s){return {version:1,project:{begin:p=>s.begin(p),commit:t=>s.commit(t),abort:t=>s.abort(t),load:id=>s.load(id)},asset:{begin:(...a)=>s.assetBegin(...a),chunk:(...a)=>s.chunk(...a)},disk:{estimate:()=>s.disk()}};}
test('儲存期間替換素材後，下一次儲存必須保存新檔案而非舊快取',async t=>{
 const {s}=fixture(t),p=project();p.images=[{id:'image',name:'test.png',data:'data:image/png;base64,AAECAw=='}];
 const api=bridge(s);globalThis.KoiDesktop=api;
 const chunk=api.asset.chunk;let replaced=false;
 api.asset.chunk=(...a)=>{const value=chunk(...a);if(!replaced){replaced=true;p.images[0].data='data:image/png;base64,BAUGBw=='}return value};
 await storage.saveProject(p);await storage.saveProject(p);
 const loaded=s.load();assert.deepEqual(fs.readFileSync(s.resolveAsset(loaded.images[0].data).file),Buffer.from([4,5,6,7]));
});
test('SQLite開啟失敗會解除交易，不能永遠卡在同一專案儲存中',t=>{
 const {s}=fixture(t),p=project();s.commit(s.begin(p));
 const row=s.catalog.prepare('SELECT root FROM projects').get();const db=new DatabaseSync(path.join(row.root,'project.sqlite'));db.exec('PRAGMA user_version=999');db.close();
 assert.throws(()=>s.commit(s.begin(p)),/較新版本/);
 assert.doesNotThrow(()=>s.abort(s.begin(p)));
});
test('project.json鏡像無法更新時仍可從完好的SQLite開啟專案',t=>{
 const {s}=fixture(t),p=project();s.commit(s.begin(p));const row=s.catalog.prepare('SELECT root FROM projects').get();
 fs.unlinkSync(path.join(row.root,'project.json'));fs.mkdirSync(path.join(row.root,'project.json'));
 assert.deepEqual(s.load(),p);
 assert.ok(s.warnings.length);assert.equal(fs.readdirSync(row.root).filter(f=>f.includes('.tmp-')).length,0);
});
