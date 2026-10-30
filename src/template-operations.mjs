import{alignElements}from'./layout-tools.mjs';
export const isLocal=k=>k==='pages'||k.startsWith('slot:');
export function templateElements(layout){return{...layout.elements,...Object.fromEntries(layout.extras.map(e=>[e.id,e]))}}
export function worldRect(layout,key){const e=templateElements(layout)[key];if(!e)return null;if(!isLocal(key))return{x:e.x,y:e.y,w:e.w,h:e.h};const b=layout.elements.body;return{x:b.x+e.x*b.w/100,y:b.y+e.y*b.h/100,w:e.w*b.w/100,h:e.h*b.h/100}}
export function translateElements(layout,ids,dx,dy){const all=templateElements(layout),active=ids.filter(k=>all[k]&&!all[k].locked&&!(ids.includes('body')&&isLocal(k))),boxes=active.map(k=>worldRect(layout,k));if(!boxes.length)return{};dx=Math.max(-Math.min(...boxes.map(b=>b.x)),Math.min(100-Math.max(...boxes.map(b=>b.x+b.w)),dx));dy=Math.max(-Math.min(...boxes.map(b=>b.y)),Math.min(100-Math.max(...boxes.map(b=>b.y+b.h)),dy));return Object.fromEntries(active.map(k=>[k,{...all[k],x:Number((all[k].x+dx*(isLocal(k)?100/layout.elements.body.w:1)).toFixed(4)),y:Number((all[k].y+dy*(isLocal(k)?100/layout.elements.body.h:1)).toFixed(4))}]))}
export function copyElements(layout,ids){const all=templateElements(layout);return ids.filter(k=>all[k]).map(k=>({key:k,...all[k],...worldRect(layout,k),kind:all[k].kind||(k.startsWith('slot:')?'button':all[k].action?'button':k==='body'?'panel':'text'),label:all[k].label||(k.startsWith('slot:')?'存檔 '+(Number(k.slice(5))+1):''),background:all[k].background||(k==='body'?layout.field:undefined),action:all[k].action||(k.startsWith('slot:')?'save':undefined)}))}
export function pasteElements(layout,copied,uid=()=>crypto.randomUUID()){return copied.map(({key,...e})=>({...e,id:uid(),locked:false,hidden:false,x:Math.max(0,Math.min(100-e.w,e.x+2)),y:Math.max(0,Math.min(100-e.h,e.y+2))}))}
export function imageElement(asset,reference,point={x:20,y:20}){const ratio=Math.max(.001,(asset.width||1)/(asset.height||1));let w=35,h=w/100*reference.width/ratio/reference.height*100;if(h>65){h=65;w=h/100*reference.height*ratio/reference.width*100}return{id:crypto.randomUUID(),kind:'image',image:asset.id,imageFit:'contain',x:Math.max(0,Math.min(100-w,point.x)),y:Math.max(0,Math.min(100-h,point.y)),w,h,opacity:1,background:'transparent',label:asset.name}}

export function alignTemplateElements(layout,ids,action,reference='auto'){
 const all=templateElements(layout),active=[...new Set(ids)].filter(k=>all[k]&&!all[k].locked&&!all[k].hidden&&!(ids.includes('body')&&isLocal(k)));
 const local=active.length&&active.every(isLocal);
 if(local&&reference==='auto'&&action!=='center-canvas'){const result=alignElements(all,active,action);return Object.fromEntries(active.map(k=>[k,result[k]]))}
 const world=Object.fromEntries(active.map(k=>[k,{...all[k],...worldRect(layout,k)}])),next=alignElements(world,active,action,reference),changes={};
 for(const k of active){const r=next[k],body=layout.elements.body;if(isLocal(k)){const x=(r.x-body.x)*100/body.w,y=(r.y-body.y)*100/body.h;if(x<-.0001||y<-.0001||x+all[k].w>100.0001||y+all[k].h>100.0001)throw Error('局部物件不能超出內容區域；請改用選取範圍或調整內容底圖。');changes[k]={...all[k],x:Math.max(0,x),y:Math.max(0,y)}}else changes[k]={...all[k],x:r.x,y:r.y}}
 return changes;
}
