export function eventReferencesTo(p,chapterId,ids){
 const destination=p.chapters.find(c=>c.id===chapterId),removed=new Set(ids),indices=new Set((destination?.events||[]).flatMap((e,i)=>removed.has(e.id)?[i]:[])),rows=[];
 const valid=n=>n!==null&&n!==undefined&&String(n).trim()!==''&&Number.isInteger(Number(n))&&indices.has(Number(n));
 for(const c of p.chapters)for(const[e,i]of c.events.map((e,i)=>[e,i])){
  if(c.id===chapterId&&removed.has(e.id))continue;
  const targets=[];
  if(e.type==='choice')for(const o of e.options||[])targets.push([o.targetChapter||c.id,o.target]);
  if(e.type==='jump')targets.push([e.targetChapter||c.id,e.target]);
  if(e.type==='condition')targets.push([c.id,e.target],[c.id,e.elseTarget]);
  if(e.next!==undefined)targets.push([c.id,e.next]);
  if(targets.some(([dest,n])=>dest===chapterId&&valid(n)))rows.push({chapterId:c.id,eventId:e.id,index:i,label:c.title+'／第 '+(i+1)+' 個事件',crossChapter:c.id!==chapterId});
 }
 return rows;
}
