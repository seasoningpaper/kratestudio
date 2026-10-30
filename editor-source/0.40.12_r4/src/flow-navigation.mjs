import{boundedView,clamp,zoomAt}from'./flow-math.mjs';
// Scrollbars are projections of the same view transform, never another camera.
export function scrollAxes(view,points,width,height){
 const min=boundedView({...view,x:-Number.MAX_VALUE,y:-Number.MAX_VALUE},points,width,height).view,max=boundedView({...view,x:Number.MAX_VALUE,y:Number.MAX_VALUE},points,width,height).view;
 return{x:{min:-max.x,max:-min.x,value:-view.x,page:width},y:{min:-max.y,max:-min.y,value:-view.y,page:height}};
}
export function scrollThumb(axis,length){const range=Math.max(0,axis.max-axis.min),size=Math.min(length,Math.max(24,length*axis.page/(axis.page+range))),travel=Math.max(0,length-size);return{size,travel,offset:range?(clamp(axis.value,axis.min,axis.max)-axis.min)/range*travel:0,range}}
export function wheelView(view,event,point){const unit=event.deltaMode===1?16:event.deltaMode===2?400:1,dx=event.deltaX*unit,dy=event.deltaY*unit;if(event.ctrlKey||event.metaKey)return dy?zoomAt(view,Math.round((view.s+(dy<0?.05:-.05))*100)/100,point):view;return{...view,x:view.x-(event.shiftKey?(dx||dy):dx),y:view.y-(event.shiftKey?0:dy)}}
export function locateFlowEvent(events,query){const q=String(query).trim();if(!q)return{error:'請輸入事件編號、事件 ID 或區段名稱'};const id=events.findIndex(e=>e.id===q);if(id>=0)return{index:id};if(/^\d+$/.test(q)){const index=Number(q)-1;return events[index]?{index}:{error:'找不到指定事件編號'}}const matches=events.flatMap((e,i)=>e.type==='section'&&e.text===q?[i]:[]);return matches.length===1?{index:matches[0]}:{error:matches.length?'區段名稱重複，請使用事件 ID':'找不到指定事件或區段'}}
