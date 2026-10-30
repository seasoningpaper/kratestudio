import{createBlockIdAllocator}from'./block-identities.mjs';
import{remapDestinations}from'./event-order.mjs';
const number=(v,min,max,f)=>v!==''&&v!=null&&Number.isFinite(Number(v))?Math.max(min,Math.min(max,Number(v))):f;
export const titleBackgroundSpec=p=>({imageFit:p.settings?.titleImageFit||'cover',bgX:p.settings?.titleBgX??50,bgY:p.settings?.titleBgY??50,bgScale:p.settings?.titleBgScale??100});
// Keep legacy 100% keyword sizing exact. Imported image dimensions make zoom
// relative to cover/contain rather than stretching the image to the canvas.
export function backgroundStyle(spec={},asset,aspect='16:9'){
 const fit=['cover','contain','stretch'].includes(spec.imageFit)?spec.imageFit:'cover',scale=number(spec.bgScale,50,300,100),parts=String(aspect).split(':').map(Number),ratio=parts[0]>0&&parts[1]>0?parts[0]/parts[1]:16/9;
 let size=fit==='stretch'?'100% 100%':fit;
 if(scale!==100){if(fit==='stretch')size=scale+'% '+scale+'%';else if(asset?.width>0&&asset?.height>0){const relative=asset.width/asset.height/ratio,width=(fit==='contain'?Math.min(1,relative):Math.max(1,relative))*scale;size=width+'% auto'}else size=fit;}
 return{backgroundSize:size,backgroundPosition:number(spec.bgX,0,100,50)+'% '+number(spec.bgY,0,100,50)+'%',backgroundRepeat:'no-repeat'};
}
export function changeSceneBackground(p,chapterIndex,index,patch){
 const q=JSON.parse(JSON.stringify(p)),c=q.chapters[chapterIndex];if(!c)throw Error('找不到劇情腳本');
 let at=-1;for(let i=0;i<=Math.min(index,c.events.length-1);i++)if(c.events[i].type==='background'&&!c.events[i].blockDetached)at=i;
 if(at<0){const e={id:createBlockIdAllocator(q)(),type:'background',text:'背景切換',scene:'classroom',...patch};remapDestinations(q,c.id,n=>n+1);c.events.unshift(e);return{project:q,index:index+1,event:e}}
 Object.assign(c.events[at],patch);return{project:q,index,event:c.events[at]};
}
