import test from 'node:test';
import assert from 'node:assert/strict';
import {pasteCards,copyCards} from '../src/card-clipboard.mjs';
import {prepareImportedChapter} from '../src/block-integrity.mjs';
const project=()=>({id:'p',editorSettings:{reporterBlocks:[{id:'reporter'}]},chapters:[{id:'c',events:[{id:'taken',type:'dialogue',text:'原文'},{id:'b',type:'dialogue'}]}]});
test('P0-A pasted events never reuse existing IDs even if the UUID provider repeats',()=>{const p=project(),data=copyCards(p,0,['taken','b']),original=JSON.stringify(data),random=crypto.randomUUID;crypto.randomUUID=()=> 'taken';try{const a=pasteCards(p,0,0,data),b=pasteCards(p,0,0,data);assert.equal(new Set(p.chapters[0].events.map(e=>e.id)).size,6);assert.equal(a.length,2);assert.equal(b.length,2);assert.equal(JSON.stringify(data),original)}finally{crypto.randomUUID=random}});
test('P0-A imported chapter IDs reserve non-colliding incoming IDs before remapping others',()=>{const p=project(),random=crypto.randomUUID;let i=0;crypto.randomUUID=()=> ['incoming','fresh','chapter'][i++]||'extra';try{const result=prepareImportedChapter(p,{id:'new',events:[{id:'taken',type:'dialogue'},{id:'incoming',type:'dialogue'}]});assert.equal(new Set(result.events.map(e=>e.id)).size,2);assert.equal(result.events[1].id,'incoming')}finally{crypto.randomUUID=random}});

test('P0-A chapter imports cannot reuse IDs owned by reporters or attached value blocks',()=>{const p=project();p.chapters[0].events[0].blockInputs={text:{id:'socket',kind:'string',value:'原文',output:'原文'}};const result=prepareImportedChapter(p,{id:'new',events:[{id:'reporter',type:'dialogue'},{id:'socket',type:'dialogue'}]});assert.ok(result);assert.ok(result.events.every(e=>!['reporter','socket'].includes(e.id)))});
