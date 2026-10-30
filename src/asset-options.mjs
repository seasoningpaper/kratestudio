// Options are presentation only. Values remain the existing stable resource IDs.
export function assetOptions(assets,current,builtins=[]){
 const counts=new Map();for(const a of assets||[])counts.set(a.name,(counts.get(a.name)||0)+1);
 const rows=(assets||[]).map(a=>[a.id,(a.name||a.id)+(counts.get(a.name)>1?'（'+a.id+'）':'')]);
 for(const pair of builtins)if(!rows.some(([id])=>id===pair[0]))rows.push(pair);
 if(current!==undefined&&current!==null&&current!==''&&!rows.some(([id])=>id===current))rows.push([current,'缺少素材：'+current]);
 return rows;
}
export function audioOptions(p,current,role){
 const roleNames={music:'音樂',sound:'音效',voice:'語音'},classified=a=>Object.hasOwn(roleNames,a.role),assets=(p.audio||[]).filter(a=>!role||!classified(a)||a.role===role||a.id===current);
 return assetOptions(assets,current==='synth'&&!['voice','sound'].includes(role)?undefined:current).map(([id,name])=>{const a=assets.find(a=>a.id===id);return[id,a?name+(!classified(a)?'（未分類）':role&&a.role!==role?'（目前引用：'+(roleNames[a.role]||a.role)+'）':''):name]});
}
