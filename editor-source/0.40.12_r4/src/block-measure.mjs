// Intrinsic DOM height in unscaled workspace units. The fields are not assigned
// a height, so this can shrink again after deleting options or multiline text.
export function measuredBlockHeight(node,minimum,style){
 const fields=node.querySelector('.block-fields');if(!fields)return minimum;
 const top=Number(fields.offsetTop)||0,height=Math.max(Number(fields.offsetHeight)||0,Number(fields.scrollHeight)||0),bottom=parseFloat(style?.paddingBottom)||0,border=parseFloat(style?.borderBottomWidth)||0;
 return height>0?Math.max(minimum,Math.ceil(top+height+bottom+border)):minimum;
}
export function sameMeasurements(a,b){return a.size===b.size&&[...b].every(([id,v])=>a.get(id)?.h===v.h&&a.get(id)?.detailed===v.detailed)}
// A textarea grows from its own untransformed scroll box, not character counts
// or screen coordinates. Clearing the previous height also allows shrinking.
export function autoSizeTextControl(node){if(!node)return;node.style.height='auto';if(node.scrollHeight>0)node.style.height=Math.ceil(node.scrollHeight)+'px'}
