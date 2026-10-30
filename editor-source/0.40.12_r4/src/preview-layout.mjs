// Maximize the 16:9 stage while preserving usable space for editing events.
export function previewBounds(width,height,chrome,flow=false,ratio=16/9){const w=Math.max(1,Number(width)||1),h=Math.max(0,Number(height)||0),list=flow?Math.max(240,Math.min(360,h*.42)):Math.max(64,Math.min(112,h*.12));const max=Math.max(100,Math.floor(Math.min(w/(Number(ratio)>0?Number(ratio):16/9),h-Math.max(0,chrome)-list)));const mobile=w<=700;return{min:Math.min(100,max),max,auto:mobile?Math.min(max,Math.max(100,Math.floor(h*.36))):max}}
if(typeof window!=='undefined')window.KoiPreviewLayout={previewBounds};
