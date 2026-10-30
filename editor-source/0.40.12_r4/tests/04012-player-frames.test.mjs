import test from'node:test';import assert from'node:assert/strict';
import{setup,wait}from'./p1c-dom-harness.mjs';

async function ready(fn){for(let i=0;i<30;i++){if(fn())return;await wait(10)}assert.ok(fn(),'bounded Player readiness')}
function writes(w){const values=[];for(const key of['nodeValue','textContent']){const original=Object.getOwnPropertyDescriptor(w.Node.prototype,key);Object.defineProperty(w.Node.prototype,key,{...original,set(value){const p=this.nodeType===3?this.parentElement:this;if(p?.matches?.('.game-textbox p'))values.push(String(value??''));original.set.call(this,value)}})}return values}
for(const speed of[5,35,80])test('04012 R2: next dialogue first DOM commit never inherits completed text at speed '+speed,{timeout:5000},async()=>{
 const h=await setup();try{const{w,d}=h,p=w.__p(),values=writes(w),timers=new Map();let id=0;w.setInterval=(fn)=>{timers.set(++id,fn);return id};w.clearInterval=id=>timers.delete(id);
 p.chapters[0].events=[{id:'first',type:'dialogue',text:'前一段已完整顯示的長句',speed},{id:'second',type:'dialogue',text:'新句',speed},{id:'end',type:'end',text:'完'}];w.KoiPlayer.mount(p,{start:{chapter:0,index:0}});await ready(()=>d.querySelector('.game-textbox p')&&timers.size>0);d.querySelector('.game-tap').click();await ready(()=>d.querySelector('.game-textbox p')?.textContent==='前一段已完整顯示的長句');assert.equal(d.querySelector('.game-textbox p').textContent,'前一段已完整顯示的長句');values.length=0;d.querySelector('.game-tap').click();await wait(20);assert.ok(!values.includes('新句'),'completed next text was committed before any typing tick: '+JSON.stringify(values));assert.equal(d.querySelector('.game-textbox p').textContent,'');for(const fn of timers.values())fn();await wait(10);assert.equal(d.querySelector('.game-textbox p').textContent,'新');assert.equal(h.errors.length,0)
 }finally{h.dom.window.close()}
});

for(const delay of[0,180])test('04012 R2: intro stays until new chapter scene assets are ready, without exposing the old stage '+delay,{timeout:5000},async()=>{
 const h=await setup();try{const{w,d}=h,p=w.__p(),slow='data:image/png;base64,UjJJTlRSTw==',Fast=w.Image;w.Image=class extends Fast{set src(v){if(v===slow){this.url=v;setTimeout(()=>this.onload?.(),delay)}else super.src=v}get src(){return this.url}};
 p.images.push({id:'new-bg',name:'新背景.png',data:slow});p.chapters=[{id:'a',title:'甲',events:[{id:'old',type:'background',scene:'bg',text:'舊場景'},{id:'intro',type:'intro',text:'下一章',wait:true,duration:1,backgroundColor:'#000000',motion:'none'},{id:'jump',type:'jump',targetChapter:'b',target:0}]},{id:'b',title:'乙',events:[{id:'new',type:'background',scene:'new-bg',text:'新場景'},{id:'line',type:'dialogue',text:'下一幕'}]}];
 w.KoiPlayer.mount(p,{start:{chapter:0,index:0}});await wait(35);const seen=[];const observer=new w.MutationObserver(()=>{if(!d.querySelector('.game-intro'))seen.push(d.querySelector('.game-art')?.style.backgroundImage)});observer.observe(d.querySelector('#playerRoot'),{subtree:true,childList:true,attributes:true});d.querySelector('.game-intro').click();if(delay){await wait(40);assert.ok(d.querySelector('.game-intro'),'must keep real intro while decoding')}await wait(delay+70);assert.ok(!d.querySelector('.game-intro'));assert.ok(seen.length);assert.ok(seen.every(url=>url?.includes('UjJJTlRSTw==')),JSON.stringify(seen));observer.disconnect();assert.equal(h.errors.length,0)
 }finally{h.dom.window.close()}
});
