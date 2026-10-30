import test from 'node:test';
import assert from 'node:assert/strict';
import {stackLayout,stackSnap} from '../src/stack-model.mjs';
import {measuredBlockHeight} from '../src/block-measure.mjs';
import {setup,wait,set} from './p1c-dom-harness.mjs';

test('Fix-02 actual measured content can shrink a detailed character block below the estimated 310px',()=>{
 const events=[{id:'actor',type:'character'},{id:'d',type:'dialogue'}];
 const measured=new Map([['actor',{h:108,detailed:true}]]);
 const rows=stackLayout(events,0,false,()=>'',measured);
 assert.equal(rows[0].h,108);assert.equal(rows[1].y,rows[0].y+104);
 for(const zoom of [.2,.5,1,2])assert.equal(stackSnap(rows,['new'],{x:rows[0].x,y:rows[1].y,h:66},{zoom}).id,'actor');
});
test('Fix-02 intrinsic measurement uses unscaled content, expands then shrinks and keeps connector padding',()=>{
 const field={offsetTop:12,offsetHeight:620,scrollHeight:622},node={querySelector:()=>field};
 assert.equal(measuredBlockHeight(node,66,{paddingBottom:'14px',borderBottomWidth:'1px'}),649);
 field.offsetHeight=35;field.scrollHeight=35;assert.equal(measuredBlockHeight(node,66,{paddingBottom:'14px',borderBottomWidth:'1px'}),66);
});
test('Fix-02 dialogue captions and controls remain separate layout units, with auto-sized multiline text',async()=>{
 const h=await setup();try{h.w.__props().onPatchEvent(0,{text:'早安\n'+('長篇中文對話與英文 Mixed words '.repeat(12))});h.d.querySelector('[data-mode=blocks]').click();await wait();
 const block=h.d.querySelector('[data-block-id=d]'),text=block.querySelector('[data-expression-key=text]');assert.equal(text.tagName,'TEXTAREA');assert.equal(text.rows,1);
 const label=text.closest('label');assert.equal(label.querySelector('.block-field-label').textContent,'說');assert.equal(label.firstElementChild.tagName,'SPAN');
 assert.ok(h.d.querySelector('[data-block-id=d] .block-field-label'));assert.equal(h.errors.length,0);
 }finally{h.dom.window.close()}
});
