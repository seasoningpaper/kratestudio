import{BLOCK_LIMITS,blockSpan,expandBlockSelection as completeRepeats,stackComponents,inspectBlocks,connectedSelection,normalizeStackRoots}from'./block-integrity.mjs';export{stackComponents}from'./block-integrity.mjs';import{remapDestinations}from'./event-order.mjs';
const bounded=(v,fallback,max)=>Number.isFinite(Number(v))?Math.max(0,Math.min(max,Number(v))):fallback;
const pos=(p={})=>({x:bounded(p.x,600,BLOCK_LIMITS.x),y:bounded(p.y,80,BLOCK_LIMITS.y)});
// One set of workspace coordinates drives both rendering and snapping.
export const STACK_DOCK=Object.freeze({x:16,top:16,height:48,y:60});
export function stackSpan(events,index,mode=false){
 const event=events[index];if(!event)return[];
 if(mode===true||mode==='single')return completeRepeats(events,blockSpan(events,index));
 const component=event.blockDetached?stackComponents(events).byId.get(event.id)?.events:events.filter(e=>!e.blockDetached);
 if(!component)return[];if(mode==='whole')return completeRepeats(events,component.map(e=>e.id));
 // A statement inside a C-shaped block carries its following siblings, never
 // the enclosing loop's closing connector or statements outside that loop.
 let start=component.indexOf(event);if(event.type==='repeatEnd'){const root=component.findIndex(e=>e.id===event.loopId);if(root>=0)start=root}
 let end=component.length;const open=[];
 for(let i=0;i<component.length;i++){const e=component[i];if(e.type==='repeat')open.push(i);if(e.type==='repeatEnd'){const root=open.pop();if(root!==undefined&&root<start&&i>start){end=Math.min(end,i)}}}
 return completeRepeats(events,component.slice(start,end).map(e=>e.id));
}
// Main-stack roots connect to the start dock; a complete floating stack has
// no external connection. Extracting a subset of a floating stack does.
export function hasStackConnection(events,ids){const moving=new Set(ids);if(events.some(e=>moving.has(e.id)&&!e.blockDetached))return true;return stackComponents(events).groups.some(c=>c.events.some(e=>moving.has(e.id))&&c.events.some(e=>!moving.has(e.id)))}
function balanced(events){const open=[];for(const e of events){if(e.type==='repeat')open.push(e.id);if(e.type==='repeatEnd'&&open.pop()!==e.loopId)return false}return open.length===0}
function transferPlan(p,ci,ids,targetId,options={}){const es=p.chapters[ci]?.events;if(!es||!Array.isArray(ids)||!ids.length||new Set(ids).size!==ids.length||inspectBlocks(es).length)return null;const present=new Set(es.map(e=>e.id));if(ids.some(id=>!present.has(id)))return null;const complete=completeRepeats(es,ids),keys=new Set(complete),group=es.filter(e=>keys.has(e.id));if(!group.length||keys.has(targetId)||!connectedSelection(es,complete))return null;const remaining=es.filter(e=>!keys.has(e.id)),detach=!!options.detach;let target=es.find(e=>e.id===targetId),before=!!options.before;
 if(!detach&&!target){if(options.home){target=remaining.find(e=>!e.blockDetached);before=true}else if(options.reconnect){const first=group[0],after=remaining.find(e=>e.id===first.blockReturnAfter&&!e.blockDetached),next=remaining.find(e=>e.id===first.blockReturnBefore&&!e.blockDetached);target=after||next||remaining.filter(e=>!e.blockDetached).at(-1);before=!after&&!!next}else return null}
 const at=target?remaining.indexOf(target)+(before?0:1):detach?remaining.length:options.home?0:remaining.length;const ordered=[...remaining];ordered.splice(at,0,...group);if(!balanced(ordered))return null;const originalComponents=stackComponents(es),component=target?.blockDetached?originalComponents.byId.get(target.id):null,root=detach?group[0].id:component?.id,projected=ordered.map(e=>keys.has(e.id)?{...e,blockDetached:detach||!!component,blockStack:root}:e.blockDetached?{...e,blockStack:originalComponents.byId.get(e.id).id}:e);if(inspectBlocks(projected).length)return null;return{es,group,keys,ordered,target,before,detach,at}}
export const canTransferStack=(p,ci,ids,targetId,options={})=>!!transferPlan(p,ci,ids,targetId,options);
export function transferStack(p,ci,ids,targetId,options={}){const plan=transferPlan(p,ci,ids,targetId,options);if(!plan)return false;const{es,group,keys,ordered,target,detach}=plan,oldComponents=stackComponents(es),firstIndex=es.findIndex(e=>keys.has(e.id)),lastIndex=es.findLastIndex(e=>keys.has(e.id)),newPosition=pos(options),targetComponent=target?.blockDetached?oldComponents.byId.get(target.id):null;
 // The new root of the stationary tail retains its measured world anchor.
 // Reusing the removed head's anchor would pull every remaining block upward.
 const previousRows=new Map(stackLayout(es,-1,true,()=>'' ).map(r=>[r.id,r]));
 for(const component of oldComponents.groups){const left=component.events.filter(e=>!keys.has(e.id));if(!left.length)continue;const supplied=options.anchors?.[left[0].id],row=previousRows.get(left[0].id),anchor=left[0]===component.events[0]?component.position:pos(supplied||row||component.position);for(const e of left){e.blockStack=left[0].id;e.blockPos={...anchor}}}
 if(detach){const wasAttached=!group[0].blockDetached,after=es.slice(0,firstIndex).reverse().find(e=>!keys.has(e.id)&&!e.blockDetached),before=es.slice(lastIndex+1).find(e=>!keys.has(e.id)&&!e.blockDetached);for(const[e,i]of group.map((e,i)=>[e,i])){if(wasAttached){e.blockReturnAfter=after?.id||'';e.blockReturnBefore=before?.id||''}e.blockDetached=true;e.blockStack=group[0].id;e.blockPos={x:newPosition.x,y:newPosition.y+i*66}}}
 else if(targetComponent){const members=new Set([...targetComponent.events.map(e=>e.id),...group.map(e=>e.id)]),joined=ordered.filter(e=>members.has(e.id)),anchor=plan.before&&target===targetComponent.events[0]&&Number.isFinite(options.x)&&Number.isFinite(options.y)?newPosition:targetComponent.position;for(const[e,i]of joined.map((e,i)=>[e,i])){e.blockDetached=true;e.blockStack=joined[0].id;e.blockPos={x:anchor.x,y:anchor.y+i*66}}}
 else for(const e of group){e.blockDetached=false;e.blockStack=null;e.blockPos=null;delete e.blockReturnAfter;delete e.blockReturnBefore}
 // Split IDs after removing a tail; a merged stack gets one root ID throughout.
 normalizeStackRoots(ordered);
 p.chapters[ci].events=ordered;const indices=new Map(ordered.map((e,i)=>[e.id,i])),mapping=new Map(es.map((e,i)=>[i,indices.get(e.id)]));remapDestinations(p,p.chapters[ci].id,n=>mapping.get(n)??n);return true}
const blockHeight=(e,detailed)=>detailed?(e.type==='choice'?Math.max(160,(e.options?.length||0)*58+110):['character','background','animation'].includes(e.type)?310:150):66;
export function stackLayout(events,selected,compact,color,measurements=new Map()){const rows=[],components=stackComponents(events),cursors=new Map(),depths=new Map();let y=STACK_DOCK.y;for(let i=0;i<events.length;i++){const e=events[i],component=components.byId.get(e.id),key=component?.id||'main';let d=depths.get(key)||0;if(e.type==='repeatEnd')d=Math.max(0,d-1);const detailed=!compact&&(i===selected||events.length<=12),measured=measurements.get(e.id),h=measured?.detailed===detailed&&Number.isFinite(measured.h)?Math.max(66,measured.h):blockHeight(e,detailed),base=component?.position||{x:STACK_DOCK.x,y:STACK_DOCK.y},top=component?(cursors.get(key)??base.y):y;rows.push({id:e.id,index:i,x:base.x+d*18,y:top,w:460,h,color:color(e.type),detailed,component:component?.id||null});if(component)cursors.set(key,top+h-4);else y+=h-4;if(e.type==='repeat')d++;depths.set(key,d)}return rows}
// Both exposed ends of the entire moving stack participate, in screen-space
// tolerance, so zoom never makes connecting either impossible or too eager.
export function stackSnap(layout,ids,box,{zoom=1,home=false,events}={}){const candidates=[],moving=new Set(ids),z=Math.max(.05,Number(zoom)||1),offer=(candidate,dx,dy)=>{if(Math.abs(dx*z)>110||Math.abs(dy*z)>72)return;candidates.push({...candidate,distance:Math.hypot(dx*z,dy*z)})};for(const r of layout){if(moving.has(r.id))continue;offer({id:r.id,index:r.index,before:false},box.x-r.x,box.y-(r.y+r.h-4));offer({id:r.id,index:r.index,before:true},(box.tailX??box.x)-r.x,box.y+box.h-4-r.y)}if(home)offer({id:null,index:-1,before:true,home:true},box.x-STACK_DOCK.x,box.y-STACK_DOCK.y);candidates.sort((a,b)=>a.distance-b.distance||Number(!!b.home)-Number(!!a.home)||Number(a.before)-Number(b.before));return candidates.find(c=>!events||canTransferStack({chapters:[{events}]},0,ids,c.id,c.home?{home:true}:{before:c.before}))||null}
export function arrangeDetached(events,selected,compact,color,measurements){const rows=stackLayout(events,selected,compact,color,measurements),changes=[];let y=STACK_DOCK.y;for(const group of stackComponents(events).groups){const members=rows.filter(r=>r.component===group.id),top=members[0]?.y||0;for(const r of members)changes.push({id:r.id,patch:{blockStack:group.id,blockPos:{x:600,y:y+r.y-top}}});y+=Math.max(66,...members.map(r=>r.y+r.h-top))+60}return changes}

// Estimate the exact exposed connectors of a newly created statement stack.
export function newStackShape(type,eventCount=0,compact=false){const rows=['repeat','repeatUntil'].includes(type)?[{type:'repeat'},{type:'wait'},{type:'repeatEnd'}]:[{type,options:type==='choice'?[{},{}]:undefined}],total=eventCount+rows.length;let h=0;for(let i=0;i<rows.length;i++){const e=rows[i],detailed=!compact&&(i===0||total<=12),height=blockHeight(e,detailed);h+=height-(i?4:0)}return{h,tailX:0}}

// Paired statement inputs use the same derived component graph and measured
// rows as dragging and hit testing; this does not add a second persisted AST.
export function statementContainers(events,rows){
 const byId=new Map(rows.map(r=>[r.id,r])),open=new Map(),result=[];
 for(const e of events){const row=byId.get(e.id);if(!row)continue;const key=row.component||'main',stack=open.get(key)||[];
  if(e.type==='repeat')stack.push(row);
  if(e.type==='repeatEnd'&&stack.at(-1)?.id===e.loopId){const head=stack.pop();result.push({id:head.id,x:head.x,y:head.y+head.h-5,w:18,h:Math.max(0,row.y-(head.y+head.h-5)+5),color:head.color})}
  open.set(key,stack);
 }
 return result;
}
