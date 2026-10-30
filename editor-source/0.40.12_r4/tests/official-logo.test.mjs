import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {JSDOM} from 'jsdom';
import {setup,wait} from './p1c-dom-harness.mjs';
import {installStorage} from './browser-storage.mjs';

const hash=b=>createHash('sha256').update(b).digest('hex');
const baseline=f=>execFileSync('git',['show','dfcbc25:'+f]);
const logoCSS=()=>readFile('dist/brand.css','utf8');
const withCSS=async h=>{const style=h.d.createElement('style');style.textContent=(await readFile('dist/style.css','utf8'))+'\n'+await logoCSS();h.d.head.append(style)};
const menu=h=>h.d.getElementById('projectMenu');
const logo=h=>h.d.getElementById('brandHome');

test('official originals are byte-for-byte the two uploaded files and remain separate from deploy assets',async()=>{
 assert.equal(hash(await readFile('design/official-logo/originals/light.jpeg')),'6ff772a6c84068e6fc0b738258e335d49e07085dbc08f416da73f4413e60cdf6');
 assert.equal(hash(await readFile('design/official-logo/originals/dark.png')),'43582c9944c8ef85d533e433708b424f0be9a41d8b786e4449a76859f8dd61b4');
 const data=JSON.parse(await readFile('research/logo-20261021/ASSET-INSPECTION.json'));
 for(const a of data.assets){assert.deepEqual(a.originalSize,[2170,725]);assert.equal(a.opaqueInteriorChangedPixels,0);assert.deepEqual(a.normalizedCanvas,[1440,360]);assert.ok(a.recompositeMeanAbsoluteError<1);assert.ok(a.recomposite99thPercentileError<=7);assert.deepEqual(a.backgroundCornersAlpha,[0,0])}
});

test('transparent rasters and icons contain actual alpha, correct dimensions and only the original symbol',()=>{
 const json=execFileSync('python',['-c',`from PIL import Image
import json
out=[]
for name,size in [('koi-maker-light',1440),('koi-maker-dark',1440),('icon-16',16),('icon-32',32),('icon-180',180)]:
 im=Image.open('dist/assets/brand/'+name+'.png');a=im.getchannel('A');assert im.mode=='RGBA';assert im.width==size;assert im.height==(360 if size==1440 else size);assert a.getextrema()==(0,255);assert im.getpixel((0,0))[3]==0;assert im.getpixel((im.width-1,im.height-1))[3]==0
 out.append({'name':name,'size':im.size,'box':a.getbbox()})
print(json.dumps(out))`],{encoding:'utf8'});
 const rows=JSON.parse(json);assert.equal(rows.length,5);for(const a of rows.filter(r=>r.name.startsWith('icon'))){const [x,y,r,b]=a.box;assert.ok(r-x<b-y,'symbol is taller than wide; not the wordmark')}
});

test('header and application markup stay identical outside brand button, cache keys and favicon links',async()=>{
 const old=baseline('dist/index.html').toString(),now=await readFile('dist/index.html','utf8');
 const strip=s=>s.replace(/<strong class="wordmark".*?<\/strong>|<button id="brandHome".*?<\/button>/g,'<OFFICIAL-BRAND>').replace(/<link rel="(?:icon|apple-touch-icon)"[^>]*>/g,'').replace(/<link rel="stylesheet" href="brand.css[^"]*">/g,'').replaceAll('04011-r3-logo1','04011-r3');
 assert.equal(strip(now),strip(old));
 const d=new JSDOM(now).window.document,b=d.getElementById('brandHome');
 assert.equal(b.tagName,'BUTTON');assert.equal(b.type,'button');assert.ok(b.disabled);assert.match(b.getAttribute('aria-label'),/Koi Maker.*返回專案首頁/);assert.equal(b.getAttribute('aria-controls'),'projectMenu');assert.equal(d.querySelectorAll('.wordmark').length,1);
 assert.equal(b.querySelectorAll('img').length,2);for(const img of b.querySelectorAll('img')){assert.equal(img.getAttribute('width'),'1440');assert.equal(img.getAttribute('height'),'360');assert.equal(img.getAttribute('aria-hidden'),'true')}
});

test('logo-only CSS removes the previous recoloring filter while preserving every header and responsive rule',async()=>{
 const old=baseline('dist/style.css').toString(),now=await readFile('dist/style.css','utf8');
 const oldRule=':root .wordmark img{filter:brightness(0);transition:none}:root[data-editor-tone=dark] .wordmark img{filter:brightness(0) invert(1)}';
 assert.equal(now,old);assert.ok((await logoCSS()).includes('filter:none'));
 assert.ok(!/filter:(?!none)/.test(await logoCSS()));assert.match(await logoCSS(),/object-fit:contain/);
});

test('both logo assets are fetched up front and remain hidden until the stored theme has initialized',async()=>{
 const html=(await readFile('dist/index.html','utf8')).replace(/<script[^>]*src[^>]*><\/script>/g,'');const dom=new JSDOM(html);try{const d=dom.window.document,style=d.createElement('style');style.textContent=await logoCSS();d.head.append(style);const images=[...d.querySelectorAll('.wordmark img')];
 for(const im of images)assert.equal(dom.window.getComputedStyle(im).visibility,'hidden');
 d.documentElement.dataset.editorTone='dark';d.documentElement.dataset.brandReady='true';
 assert.equal(dom.window.getComputedStyle(images[0]).display,'none');assert.equal(dom.window.getComputedStyle(images[1]).display,'block');assert.equal(dom.window.getComputedStyle(images[1]).visibility,'visible');
 assert.ok(images.every(im=>im.getAttribute('src').startsWith('assets/brand/')&&!im.hasAttribute('loading')));
 }finally{dom.window.close()}
});

test('all existing light and dark presets switch the correct logo without changing src, palette or project data',async()=>{
 const h=await setup();try{await withCSS(h);const {editorThemes,applyTheme}=await import('../src/theme.mjs');const srcs=[...logo(h).querySelectorAll('img')].map(im=>im.src),before=JSON.stringify(h.w.__p());
 for(const [id,,,color] of editorThemes){const prefs={theme:id};h.w.KoiWorkspace.applyTheme(color,prefs);const dark=['black','midnight','charcoal','plumDark','forestDark','sepiaDark'].includes(id),images=[...logo(h).querySelectorAll('img')];assert.equal(h.d.documentElement.dataset.editorTone,dark?'dark':'light');assert.notEqual(h.w.getComputedStyle(images[dark?1:0]).display,'none');assert.equal(h.w.getComputedStyle(images[dark?0:1]).display,'none');assert.deepEqual(images.map(im=>im.src),srcs);for(const im of images)assert.equal(h.w.getComputedStyle(im).filter,'none')}
 assert.equal(JSON.stringify(h.w.__p()),before);assert.ok(!logo(h).disabled);assert.equal(h.d.documentElement.dataset.brandReady,'true');assert.equal(typeof applyTheme,'function');assert.deepEqual(await readFile('src/theme.mjs'),baseline('src/theme.mjs'));
 }finally{h.dom.window.close()}
});

test('persisted dark preference is restored by a fresh document using the real storage and startup path',async()=>{
 const h=await setup();let fresh;try{h.w.__p().editorSettings={theme:'midnight',accent:'#829ecb'};h.w.__render();h.d.getElementById('save').click();await wait(50);
 const html=(await readFile('dist/index.html','utf8')).replace(/<script[^>]*src[^>]*><\/script>/g,'');fresh=new JSDOM(html,{url:'https://koi.test',runScripts:'outside-only',pretendToBeVisual:true});const w=fresh.window;
 installStorage(w);Object.defineProperty(w,'indexedDB',{value:h.w.indexedDB});w.confirm=()=>true;w.prompt=()=>'';w.matchMedia=()=>({matches:false});w.ResizeObserver=class{observe(){}disconnect(){}};w.structuredClone=structuredClone;w.HTMLElement.prototype.setPointerCapture=()=>{};w.HTMLElement.prototype.getBoundingClientRect=()=>({left:0,top:0,width:800,height:500,right:800,bottom:500});w.HTMLMediaElement.prototype.pause=()=>{};w.Image=class{set src(x){queueMicrotask(()=>this.onload?.())}};
 w.eval(await readFile('dist/workspace.js','utf8'));w.eval(await readFile('dist/player.js','utf8'));w.eval(await readFile('dist/app.js','utf8'));await w.KoiReady;await wait(20);
 assert.equal(w.document.documentElement.dataset.editorTone,'dark');assert.equal(w.document.documentElement.dataset.brandReady,'true');assert.ok(!w.document.getElementById('brandHome').disabled);assert.match(w.document.getElementById('projectTitle').textContent,/作品/);
 }finally{fresh?.window.close();h.dom.window.close()}
});

test('clean logo click uses the existing project hub, focuses the current project and never reloads or initializes a project',async()=>{
 const h=await setup();try{const before=JSON.stringify(h.w.__p()),href=h.w.location.href;logo(h).click();await wait(10);assert.equal(menu(h).hidden,false);assert.equal(h.d.activeElement,menu(h).querySelector('[aria-checked=true]'));assert.equal(h.w.location.href,href);assert.equal(JSON.stringify(h.w.__p()),before);assert.equal(h.d.querySelectorAll('.koi-dialog').length,0);
 logo(h).dispatchEvent(new h.w.MouseEvent('click',{button:0,detail:0,bubbles:true}));await wait(10);assert.equal(menu(h).hidden,false);assert.equal(JSON.stringify(h.w.__p()),before);
 menu(h).dispatchEvent(new h.w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert.equal(menu(h).hidden,true);assert.equal(h.d.activeElement,h.d.getElementById('projectTitle'));assert.equal(h.errors.length,0);
 }finally{h.dom.window.close()}
});

test('dirty navigation cancellation preserves the active editor, event IDs, data, history and existing draft',async()=>{
 const h=await setup({dialogs:false});try{h.w.__props().onPatchEvent(0,{text:'尚未儲存的修改'});const files=JSON.parse(JSON.stringify(h.w.__p().programFiles));files[0].source+='\n旁白：草稿保留';h.w.__props().onProgramFiles(files);const before=JSON.stringify(h.w.__p()),story=h.d.getElementById('storyPage');
 logo(h).click();await wait(10);assert.match(h.d.querySelector('.koi-dialog p').textContent,/尚未儲存.*草稿/);h.d.querySelector('[data-answer=cancel]').click();await wait(10);assert.equal(menu(h).hidden,true);assert.equal(story.hidden,false);assert.equal(JSON.stringify(h.w.__p()),before);
 h.d.getElementById('undo').click();await wait(10);assert.notEqual(JSON.stringify(h.w.__p()),before);assert.ok(h.w.__p().chapters[0].events[0].id);
 }finally{h.dom.window.close()}
});

test('confirmed navigation preserves pending source and rapid click/touch events ask only once',async()=>{
 const h=await setup({dialogs:false});try{h.w.__props().onPatchEvent(0,{text:'保留內容'});const before=JSON.stringify(h.w.__p());for(let i=0;i<3;i++){logo(h).dispatchEvent(new h.w.Event('pointerdown',{bubbles:true}));logo(h).click()}await wait(10);assert.equal(h.d.querySelectorAll('.koi-dialog').length,1);assert.equal(menu(h).hidden,true);h.d.querySelector('[data-answer=ok]').click();await wait(10);assert.equal(menu(h).hidden,false);assert.equal(JSON.stringify(h.w.__p()),before);assert.equal(h.d.querySelectorAll('.koi-dialog').length,0);
 logo(h).dispatchEvent(new h.w.Event('pointerdown',{bubbles:true}));logo(h).click();await wait(10);assert.equal(menu(h).hidden,false);
 }finally{h.dom.window.close()}
});

test('saved but unapplied program drafts and failed saves still request the existing confirmation dialog',async()=>{
 const h=await setup({dialogs:false});try{const files=JSON.parse(JSON.stringify(h.w.__p().programFiles));files[0].source+='\n旁白：未套用';h.w.__props().onProgramFiles(files);h.d.getElementById('save').click();await wait(50);assert.match(h.d.getElementById('saveState').textContent,/已儲存/);
 logo(h).click();await wait(10);assert.ok(h.d.querySelector('.koi-dialog'));h.d.querySelector('[data-answer=cancel]').click();await wait(10);
 h.w.KoiStorage.saveProject=async()=>{throw Error('測試儲存失敗')};h.d.getElementById('save').click();await wait(10);assert.match(h.d.getElementById('saveState').textContent,/儲存失敗/);const before=JSON.stringify(h.w.__p());logo(h).click();await wait(10);h.d.querySelector('[data-answer=cancel]').click();await wait(10);assert.equal(JSON.stringify(h.w.__p()),before);assert.equal(menu(h).hidden,true);
 }finally{h.dom.window.close()}
});

test('secondary mouse buttons do not navigate; Enter/Space remain native accessible button activation',async()=>{
 const h=await setup();try{logo(h).dispatchEvent(new h.w.MouseEvent('click',{button:2,bubbles:true}));await wait(10);assert.equal(menu(h).hidden,true);logo(h).focus();assert.equal(h.d.activeElement,logo(h));assert.equal(logo(h).tabIndex,0);assert.equal(logo(h).getAttribute('role'),null);assert.equal(logo(h).getAttribute('type'),'button');logo(h).click();await wait(10);assert.equal(menu(h).hidden,false);
 }finally{h.dom.window.close()}
});

test('favicon paths reference only needed transparent 16/32/180 PNGs and no new PWA or user-game logo is introduced',async()=>{
 const d=new JSDOM(await readFile('dist/index.html','utf8')).window.document;const links=[...d.querySelectorAll('link[rel=icon],link[rel=apple-touch-icon]')];assert.deepEqual(links.map(l=>l.getAttribute('sizes')),['16x16','32x32','180x180']);for(const l of links){const p=l.getAttribute('href').split('?')[0];assert.ok((await readFile('dist/'+p)).length>0)}assert.equal(d.querySelectorAll('link[rel=manifest]').length,0);
 for(const f of ['src/player.jsx','src/opening-sequence.jsx','src/engine.mjs','src/project-tools.jsx','src/blocks-editor.jsx','src/script-import.mjs','src/program-sync.mjs','src/storage.mjs','src/work-tabs.mjs','src/packaging.mjs','src/theme.mjs','dist/player.css','dist/assets/koi.svg','.openai/hosting.json','package.json','pnpm-lock.yaml'])assert.deepEqual(await readFile(f),baseline(f),f);
});


test('translated unsaved status cannot bypass logo navigation confirmation',async()=>{
 const h=await setup({dialogs:false});try{h.w.__p().editorSettings={language:'en'};h.w.__render();h.w.__props().onPatchEvent(0,{text:'待儲存'});await wait(30);assert.match(h.d.getElementById('saveState').textContent,/Not saved/);const before=JSON.stringify(h.w.__p());logo(h).click();await wait(10);assert.ok(h.d.querySelector('.koi-dialog'));h.d.querySelector('[data-answer=cancel]').click();await wait(10);assert.equal(menu(h).hidden,true);assert.equal(JSON.stringify(h.w.__p()),before);
 }finally{h.dom.window.close()}
});
