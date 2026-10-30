// Authored coordinates and UI sizes are evaluated once, then scaled as a single surface.
export function referenceCanvas(aspect='16:9',device='desktop'){const [a,b]=String(aspect).split(':').map(Number),ratio=a>0&&b>0?a/b:16/9,width=device==='mobile'?390:960;return{width,height:width/ratio}}
export function canvasScale(frame,reference){return Math.max(.001,Math.min(Number(frame.width)/reference.width,Number(frame.height)/reference.height))}
export function referenceStyle(reference,scale=1){return{width:reference.width,height:reference.height,transform:`scale(${scale})`,transformOrigin:'0 0','--reference-width':reference.width+'px','--reference-height':reference.height+'px'}}
