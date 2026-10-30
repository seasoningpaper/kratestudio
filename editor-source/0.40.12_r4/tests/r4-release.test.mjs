import test from'node:test';import assert from'node:assert/strict';import{readFile}from'node:fs/promises';import{execFileSync}from'node:child_process';
test('R4 release: requested version, brand, script docs and game generator agree',async()=>{
 const html=await readFile('dist/index.html','utf8'),guide=await readFile('dist/koi-script-guide.html','utf8'),pack=await readFile('src/packaging.mjs','utf8');assert.ok(html.includes('<title>Koi Maker 視覺化故事創作平台 0.40.11_r4</title>'));assert.ok(html.includes('測試版 0.40.11_r4'));assert.ok(guide.includes('Koi Maker 0.40.11_r4'));assert.ok(guide.includes('r4-release-notes.md'));assert.ok(pack.includes('Koi Maker 視覺化故事創作平台 0.40.11_r4'));assert.equal(JSON.parse(await readFile('package.json')).version,'0.40.11-r4');
});
test('R4 release: logo, CSS, parser, storage keys and UI markup remain unchanged apart from version strings',async()=>{
 for(const file of['dist/style.css','dist/player.css','dist/brand.css','dist/editor-fixes.css','dist/assets/brand/koi-maker-light.png','dist/assets/brand/koi-maker-dark.png','dist/assets/brand/icon-16.png','dist/assets/brand/icon-32.png','dist/assets/brand/icon-180.png','src/storage.mjs','src/script-import.mjs','src/program-sync.mjs','src/engine.mjs','src/placement.mjs','.openai/hosting.json','pnpm-lock.yaml']){
  assert.deepEqual(await readFile(file),execFileSync('git',['show','9af300c:'+file]),file);
 }
 const normalized=(await readFile('dist/index.html','utf8')).replaceAll('0.40.11_r4','0.40.11_r3').replaceAll('04011-r4','04011-r3');assert.equal(normalized,execFileSync('git',['show','9af300c:dist/index.html'],{encoding:'utf8'}));
});
test('R4 exported game: current generator and real player assets preserve all project fields',{timeout:10000},async()=>{
 const{setup}=await import('./p1c-dom-harness.mjs'),{default:JSZip}=await import('jszip'),h=await setup();try{h.w.fetch=async url=>new Response(await readFile('dist/'+String(url)));const before=JSON.stringify(h.w.__p()),blob=await h.w.KoiPackage.zipGame(h.w.__p()),zip=await JSZip.loadAsync(blob.arrayBuffer()),html=await zip.file('index.html').async('string');assert.ok(html.includes('name="generator" content="Koi Maker 視覺化故事創作平台 0.40.11_r4"'));assert.equal(JSON.stringify(h.w.__p()),before);assert.equal(await zip.file('player.js').async('string'),await readFile('dist/player.js','utf8'));assert.ok((await zip.file('game.js').async('string')).includes('standalone:true'))}finally{h.dom.window.close()}
});
