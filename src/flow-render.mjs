// Lay out text at its displayed size, independently of the SVG wire transform.
// Snap only the displayed origin; retain exact world coordinates for editing.
export function nodeFrame(point,view,dpr=1,collapsed=false){const ratio=Number.isFinite(dpr)&&dpr>0?dpr:1;const snap=n=>Math.round(n*ratio)/ratio;return{left:snap(point.x*view.s+view.x),top:snap(point.y*view.s+view.y),width:216*view.s,height:(collapsed?118:88)*view.s,'--flow-scale':view.s}}
