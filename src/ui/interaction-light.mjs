// Bounded decoration on primary commands, never on navigation or the whole page.
export function bindInteractionLight(button,{fine=true,reduced=false,request=globalThis.requestAnimationFrame?.bind(globalThis),cancel=globalThis.cancelAnimationFrame?.bind(globalThis)}={}){
 if(!button||!fine||reduced||!request)return()=>{};let frame=0,last=null;
 const move=e=>{if(e.pointerType==='touch')return;last={x:e.clientX,y:e.clientY};if(frame)return;frame=request(()=>{frame=0;if(!last)return;const r=button.getBoundingClientRect(),angle=Math.atan2(last.y-r.y-r.height/2,last.x-r.x-r.width/2)*180/Math.PI+90;button.style.setProperty('--sf-light-angle',angle+'deg');button.dataset.sfLit='true'})};
 const clear=()=>{if(frame)cancel?.(frame);frame=0;last=null;delete button.dataset.sfLit;button.style.removeProperty('--sf-light-angle')};button.addEventListener('pointermove',move,{passive:true});button.addEventListener('pointerleave',clear);return()=>{clear();button.removeEventListener('pointermove',move);button.removeEventListener('pointerleave',clear)};
}
export function initializeEditorLight(doc=document){const media=globalThis.matchMedia?.('(hover: hover) and (pointer: fine)'),reduce=globalThis.matchMedia?.('(prefers-reduced-motion: reduce)');let release=[];
 const update=()=>{release.forEach(fn=>fn());release=['save','playTop'].map(id=>bindInteractionLight(doc.getElementById(id),{fine:!!media?.matches,reduced:!!reduce?.matches}))};update();media?.addEventListener?.('change',update);reduce?.addEventListener?.('change',update);
 const destroy=()=>{release.forEach(fn=>fn());media?.removeEventListener?.('change',update);reduce?.removeEventListener?.('change',update)};globalThis.addEventListener?.('pagehide',destroy,{once:true});return destroy;
}
if(typeof document!=='undefined'){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>initializeEditorLight(),{once:true});else initializeEditorLight()}
