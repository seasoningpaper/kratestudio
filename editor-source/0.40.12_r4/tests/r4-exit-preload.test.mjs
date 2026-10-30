import test from'node:test';
import assert from'node:assert/strict';
import{setup,wait}from'./p1c-dom-harness.mjs';

test('R4 Player: completed parallel exit is not resurrected by a pending image transition',{timeout:5000},async()=>{
 const h=await setup();try{
  const{w,d}=h,p=w.__p(),slow='data:image/png;base64,U0xPVw==',FastImage=w.Image;
  w.Image=class extends FastImage{set src(v){if(v!==slow){super.src=v;return}this.url=v;setTimeout(()=>this.onload?.(),500)}get src(){return this.url}};
  p.images.push({id:'slow-bg',name:'慢速背景.png',kind:'background',data:slow});
  p.chapters[0].events=[
   {id:'show',type:'character',text:'登場',character:'A',position:'center',image:'bg'},
   {id:'exit',type:'character',text:'退場',character:'fig-center',action:'hide',motion:'exitRight',motionDuration:180,wait:false},
   {id:'gate',type:'dialogue',text:'前'},
   ...Array.from({length:22},(_,i)=>({id:'skip-'+i,type:'section',text:'區段'})),
   {id:'background',type:'background',text:'換場',scene:'slow-bg',clearActors:false},
   {id:'after',type:'dialogue',text:'後'}
  ];
  w.localStorage.setItem('koi-game-'+p.id+'-prefs',JSON.stringify({instant:true}));
  w.KoiPlayer.mount(p,{start:{chapter:0,index:0}});await wait(50);
  assert.ok(d.querySelector('.game-actor img[alt="A"]'));
  d.querySelector('.game-tap').click();await wait(240);
  assert.ok(!d.querySelector('.game-actor img[alt="A"]'),'exit completed while loading');
  await wait(310);
  assert.ok(d.querySelector('.game-textbox').textContent.includes('後'),'transition finished');
  assert.ok(!d.querySelector('.game-actor img[alt="A"]'),'completed actor must stay removed after commit');
  assert.equal(h.errors.length,0,h.errors.map(e=>e.message).join('\n'));
 }finally{h.dom.window.close()}
});
