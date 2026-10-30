import test from'node:test';import assert from'node:assert/strict';import{writeFileSync}from'node:fs';
import{setup,wait}from'./p1c-dom-harness.mjs';import{story,semantic,copy}from'./r4-story-fixture.mjs';

test('R4 Inspector: null animation target stays visibly unspecified, not a fake fig-center default',async()=>{
 const h=await setup();try{h.w.__p().chapters[0].events=[{id:'anim',type:'animation',target:null,motion:'shake',text:'測試'},{id:'end',type:'end',text:'完'}];h.w.__select(0);h.w.__render();await wait();const target=h.d.querySelector('#propertyContent [data-key="target"]');assert.equal(target.value,'');assert.equal(h.w.__p().chapters[0].events[0].target,null);assert.equal(h.errors.length,0)}finally{h.dom.window.close()}
});
test('R4 DOM 513: target editing, four modes, Undo/Redo and storage preserve full supplied event semantics',{timeout:20000},async()=>{
 const h=await setup();try{
  const p=h.w.__p(),fixture=story();fixture.id=p.id;
  // Only serialization is under test; no original image/audio bytes were provided.
  for(const a of fixture.images){a.data='data:image/png;base64,AQID';a.bytes=3}
  for(const a of fixture.audio){a.data='data:audio/wav;base64,AQID';a.bytes=3}
  Object.assign(p,fixture);delete p.programFiles;h.w.__render();h.w.__props().onPatchEvent(0,{});await wait();
  const before=semantic(p.chapters[0].events),start=performance.now();h.w.__select(15);h.w.__render();await wait();
  let target=h.d.querySelector('#propertyContent [data-key="target"]');target.value='fig-right';target.dispatchEvent(new h.w.Event('change',{bubbles:true}));assert.equal(h.w.__p().chapters[0].events[15].target,'fig-right');
  for(const mode of['event','blocks','code','flow','event']){h.d.querySelector('[data-mode='+mode+']').click();await wait();assert.deepEqual(semantic(h.w.__p().chapters[0].events),before,mode)}
  const file=h.w.__p().programFiles.find(f=>f.chapterId==='story');assert.equal(h.w.__props().onApplyProgram(file).applied,true);await wait();assert.deepEqual(semantic(h.w.__p().chapters[0].events),before);
  h.d.querySelector('#undo').click();await wait();assert.deepEqual(semantic(h.w.__p().chapters[0].events),before);h.d.querySelector('#redo').click();await wait();assert.deepEqual(semantic(h.w.__p().chapters[0].events),before);
  await h.w.KoiStorage.saveProject(h.w.__p());const restored=await h.w.KoiStorage.loadProject(p.id);assert.deepEqual(semantic(restored.chapters[0].events),before);
  assert.equal(h.errors.length,0,h.errors.map(e=>e.message).join('\n'));
  writeFileSync('research/r4-20261021/supplied-DOM-513.json',JSON.stringify({events:513,elapsedMs:performance.now()-start,modes:['event','blocks','code','flow','event'],checks:'all JSON event fields except diagnostic scriptLine; IDs, target strings, branches, asset references, Undo/Redo, IndexedDB',scope:'real bundles in JSDOM; synthetic byte buffers and test-only activity definitions, not original media/browser validation'},null,2));
 }finally{h.dom.window.close()}
});
