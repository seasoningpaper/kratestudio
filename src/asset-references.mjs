const lists={image:'images',audio:'audio',video:'videos',font:'fonts'};
const canonical=type=>({images:'image',videos:'video',fonts:'font'})[type]||type;
// One schema-aware visitor powers both warnings and removal, including secondary tracks.
// Story targets, dialogue text, resource IDs and unapplied script drafts are not rewritten.
function visit(p,fn){
 const field=(owner,key,type,chapter,event,id,fallback='',remove=false)=>{if(owner)fn({owner,key,type,chapter,event,id,fallback,remove})};
 for(const key of ['titleBackground','titleMusic','gameMusic','titleSound','titleVideo'])field(p.settings,key,key.includes('Music')||key==='titleSound'?'audio':key==='titleVideo'?'video':'image','首頁與音效',key,key);
 for(const item of p.settings?.openingSequence||[])field(item,'asset',item.type==='video'?'video':'image','開場演出',item.type,item.id);
 for(const[key,v]of Object.entries(p.settings?.menuTemplates||{}))for(const t of [v,...(v.mobile?[v.mobile]:[])]){
  field(t,'image','image','功能畫面範本',key,key);
  for(const[k,e]of [...Object.entries(t.elements||{}),...(t.extras||[]).map(e=>[e.id,e])])for(const f of ['image','hoverImage'])field(e,f,'image','功能畫面範本',key+' '+k,k);
 }
 for(const a of p.extensions?.activities||[])for(const item of [a,...a.items||[]])for(const key of ['image','audio','endAudio','video'])field(item,key,key==='image'?'image':key==='video'?'video':'audio','互動模組',a.name,a.id);
 for(const c of p.characters||[])field(c,'image','image','角色資料庫',c.name,c.id);
 for(const c of p.chapters||[])for(const e of c.events||[]){
  for(const key of ['scene','image','audio','voice','video','backgroundVideo','splitLeft','splitRight'])field(e,key,['audio','voice'].includes(key)?'audio':['video','backgroundVideo'].includes(key)?'video':'image',c.title,e.text||e.type,e.id,key==='scene'?'classroom':'');
  if(Array.isArray(e.stems))for(const stem of e.stems)field(stem,'audio','audio',c.title,(e.text||e.type)+'（分軌）',e.id);
 }
 for(const[key,e]of [...Object.entries(p.settings?.gameUI?.elements||{}),...Object.entries(p.settings?.gameUI?.mobile?.elements||{}).map(([k,v])=>['手機 '+k,v])])for(const f of ['image','hoverImage'])field(e,f,'image','遊戲畫面',key,key,'',true);
 const seen=new WeakSet(),stack=[p];while(stack.length){const o=stack.pop();if(!o||typeof o!=='object'||seen.has(o))continue;seen.add(o);for(const key of Object.keys(o)){if(key==='menuTemplateBackups')continue;if(['font','fontFamily'].includes(key))field(o,key,'font','字型設定',key,key,'system');else if(o[key]&&typeof o[key]==='object')stack.push(o[key])}}
}
const matches=(ref,id)=>ref.owner[ref.key]=== (ref.type==='font'?'font:'+id:id);
export function references(p,id,type){type=canonical(type);const owners=new Map();visit(p,ref=>{if((!type||type===ref.type)&&matches(ref,id)){const old=owners.get(ref.owner);if(old)old.fields.push(ref.key);else owners.set(ref.owner,{chapter:ref.chapter,event:ref.event,id:ref.id,type:ref.type,field:ref.key,fields:[ref.key]})}});return [...owners.values()]}
export function unlink(p,id,type){
 type=canonical(type);if(type&&!lists[type])throw Error('無效的素材種類：'+type);
 const found=Object.keys(lists).filter(k=>(p[lists[k]]||[]).some(a=>a.id===id));
 if(!type&&found.length>1)throw Error('素材 ID 跨種類重複，請指定要刪除的素材種類。');
 const out=JSON.parse(JSON.stringify(p)),removeOpening=new Set((out.settings?.openingSequence||[]).filter(item=>item.asset===id&&(!type||type===(item.type==='video'?'video':'image'))));
 visit(out,ref=>{if((!type||type===ref.type)&&matches(ref,id)){if(ref.remove)delete ref.owner[ref.key];else ref.owner[ref.key]=ref.fallback}});
 for(const[k,list]of Object.entries(lists))if(!type||type===k)out[list]=(out[list]||[]).filter(a=>a.id!==id);
 if(out.settings?.openingSequence)out.settings.openingSequence=out.settings.openingSequence.filter(item=>!removeOpening.has(item));
 if(!type||type==='audio')for(const c of out.chapters||[])for(const e of c.events||[])if(Array.isArray(e.stems))e.stems=e.stems.filter(t=>t.audio);
 return out;
}

export function repairAssetReferences(p,changes){if(!Array.isArray(changes)||changes.length>100)throw Error('素材修復批次無效');const map=new Map();for(const c of changes){const type=canonical(c.type);if(!lists[type]||!c.from||!c.to||c.from===c.to||!(p[lists[type]]||[]).some(a=>a.id===c.to))throw Error('修復目標必須是存在的同種類素材');const key=JSON.stringify([type,c.from]);if(map.has(key))throw Error('同一來源素材不能指定多個修復目標');map.set(key,c.to)}const q=JSON.parse(JSON.stringify(p));let count=0;visit(q,ref=>{const current=ref.owner[ref.key],id=ref.type==='font'&&typeof current==='string'&&current.startsWith('font:')?current.slice(5):current,key=JSON.stringify([ref.type,id]);if(map.has(key)){ref.owner[ref.key]=(ref.type==='font'?'font:':'')+map.get(key);count++}});return{project:q,count}}

export function missingAssetReferences(p){const out=[];visit(p,ref=>{let id=ref.owner[ref.key];if(!id)return;if(ref.type==='font'){if(typeof id!=='string'||!id.startsWith('font:'))return;id=id.slice(5)}if(ref.type==='image'&&ref.key==='scene'&&['classroom','campus','night'].includes(id)||ref.type==='audio'&&id==='synth')return;if(!(p[lists[ref.type]]||[]).some(a=>a.id===id))out.push({chapter:ref.chapter,event:ref.event,field:ref.key,type:ref.type,id})});return out}
