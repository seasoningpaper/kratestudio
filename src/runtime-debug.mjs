// Read-only projection of the existing Engine; never a second execution state.
export function runtimeDebug(engine) {
 const s=engine.state,p=engine.p,event=engine.event,chapter=p.chapters[s.chapter];
 const image=id=>{const a=p.images.find(a=>a.id===id);return{id:id||'',name:a?.name||'',missing:!!id&&!a&&!['classroom','campus','night'].includes(id)}};
 return JSON.parse(JSON.stringify({
  劇情:{ID:chapter?.id,名稱:chapter?.title,序號:s.chapter+1},
  事件:{ID:event?.id,序號:s.index+1,類型:event?.type,分支:event?.type==='choice'?event.options:undefined,循環:s.loopFrames||{}},
  變數:s.vars,角色:Object.fromEntries(Object.entries(s.actors).map(([id,a])=>[id,{...a,素材:image(a.image)}])),
  背景:image(s.scene),錯誤:s.error||null,
  最近檢查點:engine.history.slice(-30).map(v=>({劇情:p.chapters[v.chapter]?.id,事件:p.chapters[v.chapter]?.events[v.index]?.id,序號:v.index+1})),
  限制:'唯讀；檢查點不包含所有自動執行事件，關閉試玩後不保留。'
 }));
}
