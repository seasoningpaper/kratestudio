import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {webcrypto} from 'node:crypto';
import {JSDOM} from 'jsdom';
import {applySoftflowTheme,softflowPalettes} from '../src/softflow-theme.mjs';
const baseline=JSON.parse(await readFile('research/0410-online/BASELINE.json'));
const hash=b=>createHash('sha256').update(b).digest('hex');
test('0.41.0 keeps the actual engine, four-mode semantics, persistence and official branding',async()=>{
 for(const f of ['src/engine.mjs','src/workspace.jsx','src/player.jsx','src/script-import.mjs','src/program-files.mjs','src/program-sync.mjs','src/program-identities.mjs','src/block-model.mjs','src/storage.mjs','dist/style.css','dist/player.css','src/game-skins.css','dist/brand.css','dist/assets/brand/koi-maker-light.png','dist/assets/brand/koi-maker-dark.png'])assert.equal(hash(await readFile(f)),baseline.files[f],f);
});
test('0.41.0 retains every unique existing HTML control and the four-mode order',async()=>{
 const after=new JSDOM(await readFile('dist/index.html','utf8')).window.document;
 for(const id of baseline.htmlIds)assert.equal(after.querySelectorAll(`[id="${id}"]`).length,1,id);
 assert.deepEqual([...after.querySelectorAll('[data-mode]')].map(e=>e.dataset.mode),['code','event','flow','blocks']);
 assert.equal(after.querySelector('.modes').closest('#workspace').id,'workspace');
 assert.ok(after.title.includes('0.41.0'));assert.equal(after.querySelectorAll('#softflowTheme option:not([disabled])').length,3);
});
test('SoftFlow blue and lavender exactly use the selected design tokens; dark preserves official logo tone',()=>{
 const root=new JSDOM('').window.document.documentElement;
 for(const [settings,variant] of [[{},'blue'],[{softflowVariant:'lavender'},'lavender'],[{theme:'midnight'},'dark'],[{softflowVariant:'invalid'},'blue']]){
  assert.equal(applySoftflowTheme(settings,root),variant);assert.equal(root.dataset.softflow,variant);
  for(const [k,v]of Object.entries(softflowPalettes[variant]))assert.equal(root.style.getPropertyValue('--sf-'+k),v);
  assert.equal(root.style.getPropertyValue('--pink'),softflowPalettes[variant].deep);
 }
 assert.equal(softflowPalettes.blue.surface,'#eff5fa');assert.equal(softflowPalettes.lavender.from,'#eee0fa');
});
test('SoftFlow appearance serializes with existing settings without touching authored data or unknown fields',()=>{
 const p={id:'project-id',editorSettings:{theme:'sky',softflowVariant:'lavender',future:{keep:true}},chapters:[{id:'chapter',events:[{id:'event',type:'dialogue',text:'測試',unknown:[1,2]}]}]};
 const copy=JSON.parse(JSON.stringify(p));applySoftflowTheme(copy.editorSettings,new JSDOM('').window.document.documentElement);assert.deepEqual(copy,p);
});
test('Existing theme and custom colour controls remain effective within SoftFlow surfaces',()=>{
 const root=new JSDOM('').window.document.documentElement;
 root.style.setProperty('--theme-accent','#4c917f');root.style.setProperty('--theme-surface','#f0faf5');root.style.setProperty('--theme-text','#122820');root.style.setProperty('--pink','#356b5d');
 assert.equal(applySoftflowTheme({softflowVariant:'custom',theme:'mint'},root),'custom');assert.equal(root.style.getPropertyValue('--sf-primary'),'#4c917f');assert.equal(root.style.getPropertyValue('--sf-surface'),'#f0faf5');assert.equal(root.style.getPropertyValue('--sf-ink'),'#122820');
});
test('HTTP preview compatibility produces cryptographic unique UUIDv4 and preserves native implementations',async()=>{
 const script=await readFile('dist/browser-compat.js','utf8');const vm=await import('node:vm');
 const crypto={getRandomValues:webcrypto.getRandomValues.bind(webcrypto)};vm.runInNewContext(script,{crypto,Uint8Array,Object,Array});
 const ids=Array.from({length:1000},()=>crypto.randomUUID());assert.equal(new Set(ids).size,1000);for(const id of ids)assert.match(id,/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/);
 const native=()=> 'native';const keep={randomUUID:native,getRandomValues:crypto.getRandomValues};vm.runInNewContext(script,{crypto:keep});assert.equal(keep.randomUUID,native);assert.doesNotMatch(script,/Math.random/);
});
test('Online sources agree on release and retain hosting identity; browser entry never requires Electron',async()=>{
 for(const f of ['package.json','package-lock.json'])assert.equal(JSON.parse(await readFile(f)).version,'0.41.0');
 assert.equal(JSON.parse(await readFile('.openai/hosting.json')).project_id,'appgprj_6ad04b4f4db081918fe4a0e9d541130f');
 const html=await readFile('dist/index.html','utf8');assert.ok(html.indexOf('browser-compat.js')<html.indexOf('workspace.js'));assert.doesNotMatch(html,/desktop\/|electron|nodeIntegration/);
 const app=await readFile('dist/app.js','utf8');assert.match(app,/softflowTheme.*addEventListener\('change'/);assert.match(app,/snapshot\(\);project.editorSettings=/);
});
test('SoftFlow CSS scopes controls away from game UI and keeps responsive navigation and keyboard focus',async()=>{
 const css=await readFile('dist/softflow.css','utf8');assert.match(css,/@media\(max-width:900px\)/);assert.match(css,/@media\(max-width:540px\)/);assert.match(css,/focus-visible/);assert.doesNotMatch(css,/filter:.*invert|body\s+\*\s*\{|\.koi-player\s/);
 assert.match(css,/var\(--sf-sunken\)/);assert.match(css,/var\(--sf-raised\)/);assert.match(css,/repeat\(4,minmax\(0,1fr\)\)/);
});
