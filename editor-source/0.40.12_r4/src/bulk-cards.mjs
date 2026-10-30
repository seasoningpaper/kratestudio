import{inspectBlocks}from'./block-integrity.mjs';
import{blockSpan}from'./block-model.mjs';
import{remapDestinations}from'./event-order.mjs';
export function deleteCards(project,chapterIndex,ids){const c=project.chapters[chapterIndex],removed=new Set(ids),before=[...c.events];before.forEach((e,i)=>{if(removed.has(e.id)&&['repeat','repeatEnd'].includes(e.type))for(const id of blockSpan(before,i))removed.add(id)});if(!before.some(e=>removed.has(e.id)))return false;c.events=c.events.filter(e=>!removed.has(e.id));const map=new Map(before.map((e,i)=>[i,c.events.findIndex(x=>x.id===e.id)]));const remap=v=>v==null?v:map.has(Number(v))?(map.get(Number(v))<0?null:map.get(Number(v))):v;remapDestinations(project,c.id,remap);return true}
export function patchCards(events,ids,field,value){if(!['text','name','speed'].includes(field))return 0;let count=0;for(const e of events)if(ids.includes(e.id)&&(field==='text'||e.type==='dialogue')){e[field]=field==='speed'?Math.max(5,Math.min(100,Number(value)||35)):String(value);count++}return count}

export function moveCards(project,chapterIndex,ids,to){
 const chapter=project.chapters[chapterIndex],before=chapter?.events;if(!before||!Number.isInteger(to)||to<0||to>=before.length)return false;
 const selected=new Set(ids);before.forEach((e,i)=>{if(selected.has(e.id)&&['repeat','repeatEnd'].includes(e.type))for(const id of blockSpan(before,i))selected.add(id)});
 if(selected.has(before[to].id))return false;const moved=before.filter(e=>selected.has(e.id)),rest=before.filter(e=>!selected.has(e.id));if(!moved.length)return false;
 const at=rest.indexOf(before[to])+(before.indexOf(moved[0])<to?1:0),next=[...rest.slice(0,at),...moved,...rest.slice(at)];
 if(inspectBlocks(next).length)return false;
 chapter.events=next;const map=new Map(before.map((e,i)=>[i,next.indexOf(e)]));remapDestinations(project,chapter.id,n=>map.get(n)??n);return true;
}
