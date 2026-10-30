import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {spawnSync} from 'node:child_process';
import {DatabaseSync} from 'node:sqlite';
import {ProjectStore} from '../src/project-store.ts';
const project=id=>({id,title:id,chapters:[{id:'chapter-'+id,events:[{id:'event-'+id,type:'dialogue',text:'資料'}]}],images:[]});
const source=new URL('../src/project-store.ts',import.meta.url).href;
function fixture(t){const root=fs.mkdtempSync(path.join(os.tmpdir(),'koi-recovery-'));t.after(()=>fs.rmSync(root,{recursive:true,force:true}));return{root,open:()=>new ProjectStore(path.join(root,'user'),path.join(root,'projects'))};}
test('SQLite已提交但索引尚未更新即終止，新專案重開後不會消失',t=>{
 const f=fixture(t);const code=`import {ProjectStore} from ${JSON.stringify(source)};import path from 'node:path';const root=process.argv[1],s=new ProjectStore(path.join(root,'user'),path.join(root,'projects'));const prepare=s.catalog.prepare.bind(s.catalog);s.catalog.prepare=sql=>{if(sql.startsWith('UPDATE projects SET title='))process.exit(77);return prepare(sql)};s.commit(s.begin(${JSON.stringify(project('crashed'))}));`;
 const child=spawnSync(process.execPath,['--input-type=module','-e',code,f.root],{encoding:'utf8',timeout:5000});assert.equal(child.status,77,child.stderr);
 const s=f.open();try{assert.equal(s.list().length,1);assert.deepEqual(s.load('crashed'),project('crashed'));assert.equal(s.recoveryReport[0].status,'restored');}finally{s.close()}
});
test('舊索引向下相容遷移，保留設定且不復活已刪除的專案',t=>{
 const f=fixture(t),before=f.open();before.commit(before.begin(project('old')));before.commit(before.begin(project('keep')));before.settingSet('koi-theme','dark');before.remove('old');before.close();
 const db=new DatabaseSync(path.join(f.root,'user/state.sqlite'));db.exec('ALTER TABLE projects DROP COLUMN pending_save; PRAGMA user_version=0');const original=db.prepare('SELECT id,title,deleted FROM projects ORDER BY id').all();db.close();
 const after=f.open();try{assert.equal(after.settingGet('koi-theme'),'dark');assert.equal(after.list().length,1);assert.equal(after.list()[0].id,'keep');assert.deepEqual(after.catalog.prepare('SELECT id,title,deleted FROM projects ORDER BY id').all(),original);assert.deepEqual(after.recoveryReport,[]);}finally{after.close()}
});
test('首次儲存前中斷不能把不完整專案當成成功專案',t=>{
 const f=fixture(t);const code=`import {ProjectStore} from ${JSON.stringify(source)};import path from 'node:path';const root=process.argv[1],s=new ProjectStore(path.join(root,'user'),path.join(root,'projects'));s.begin(${JSON.stringify(project('partial'))});process.exit(78);`;
 const child=spawnSync(process.execPath,['--input-type=module','-e',code,f.root],{encoding:'utf8',timeout:5000});assert.equal(child.status,78,child.stderr);
 const s=f.open();try{assert.equal(s.list().length,0);assert.equal(s.load(),null);assert.equal(s.recoveryReport[0].status,'incomplete');assert.ok(fs.existsSync(path.join(f.root,'user/recovery-report.json')));}finally{s.close()}
});
test('無效的中斷資料保留原檔並診斷，不自動啟用',t=>{
 const f=fixture(t),s=f.open();s.commit(s.begin(project('broken')));const row=s.catalog.prepare('SELECT root FROM projects').get();s.catalog.prepare('UPDATE projects SET deleted=1,pending_save=1').run();s.close();
 const db=new DatabaseSync(path.join(row.root,'project.sqlite'));db.prepare('UPDATE document SET json=?').run('{invalid');db.close();
 const after=f.open();try{assert.equal(after.list().length,0);assert.equal(after.recoveryReport[0].status,'invalid');assert.ok(fs.existsSync(path.join(row.root,'project.sqlite')))}finally{after.close()}
});
