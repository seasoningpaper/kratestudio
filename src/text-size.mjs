export const textSizes=[{name:'超小',scale:.8},{name:'小',scale:.9},{name:'預設',scale:1},{name:'大',scale:1.1},{name:'特大',scale:1.2}];
export function textSizeIndex(value){return Number.isInteger(value)&&value>=0&&value<textSizes.length?value:2}
export function textScale(value){return textSizes[textSizeIndex(value)].scale}
