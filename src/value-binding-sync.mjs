import{socketType,characterReference}from'./value-sockets.mjs';
const literal=v=>'="'+String(v).replace(/\\/g,'\\\\').replace(/"/g,'\\"')+'"';
const quotedOrName=/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|[\p{L}_][\p{L}\p{N}_]*/gu;
export const expressionUsesVariable=(source,name)=>typeof source==='string'&&(source.replace(/^=/,'')===name||(source.match(quotedOrName)||[]).includes(name));
export function rewriteVariableExpression(source,old,replacement){if(typeof source!=='string')return source;if(source===old)return replacement;return source.replace(quotedOrName,token=>token===old?replacement:token)}
const rewriteText=(text,old,replacement)=>typeof text==='string'?text.split('{'+old+'}').join(replacement):text;
export function rewriteValueReferences(p,old,name){
 const replacement=name??(typeof p.variables[old]==='string'?literal(p.variables[old]).slice(1):String(p.variables[old])),text=name?'{'+name+'}':String(p.variables[old]);
 const reporter=r=>{const direct=r.kind==='variable'&&r.expression===old;if(typeof r.expression==='string')r.expression=rewriteVariableExpression(r.expression,old,replacement);if(typeof r.value==='string')r.value=rewriteText(r.value,old,text);if(typeof r.output==='string')r.output=r.output.startsWith('=')?'='+rewriteVariableExpression(r.output.slice(1),old,replacement):rewriteText(r.output,old,text);if(typeof r.fallback==='string')r.fallback=r.fallback.startsWith('=')?'='+rewriteVariableExpression(r.fallback.slice(1),old,replacement):rewriteText(r.fallback,old,text);if(!name&&direct){const value=p.variables[old];r.kind=typeof value==='string'?'string':typeof value==='number'?'number':'boolean';if(r.kind==='string')r.value=value}else if(!name&&r.kind==='variable')r.kind='expression'};
 for(const c of p.chapters)for(const e of c.events){for(const key of['value','count','until'])if((key!=='until'||e.type==='repeat'&&e.repeatMode==='until')&&typeof e[key]==='string'&&e[key].startsWith('='))e[key]='='+rewriteVariableExpression(e[key].slice(1),old,replacement);for(const r of Object.values(e.blockInputs||{}))reporter(r)}
 for(const r of p.editorSettings?.reporterBlocks||[])reporter(r);
}
// Other editors may change primitive fields directly. Retain binding identity
// and its original fallback; adapt the derived reporter to that authored value.
export function reconcileValueBindings(p){
 for(const r of p.editorSettings?.reporterBlocks||[])if(r.kind==='character'){const role=characterReference(p,r.characterId);if(role)r.value=role.name}
 for(const c of p.chapters||[])for(const e of c.events||[])for(const[key,r]of Object.entries(e.blockInputs||{})){
  if(!r||typeof r!=='object')continue;
  if(!socketType(e,key)){p.editorSettings||={};p.editorSettings.reporterBlocks||=[];if(!p.editorSettings.reporterBlocks.some(v=>v.id===r.id))p.editorSettings.reporterBlocks.push({...r,x:e.blockPos?.x??600,y:e.blockPos?.y??80});delete e.blockInputs[key];continue}
  if(r.kind==='character'&&Object.is(r.output,e[key])){const role=characterReference(p,r.characterId);if(role){e[key]=role.name;r.value=role.name;r.output=role.name}continue}
  if(Object.is(r.output,e[key]))continue;const value=e[key]??'';let next;
  if(socketType(e,key)==='string')next={...r,kind:'string',value:String(value),output:value};
  else if(typeof value==='string'&&value.startsWith('='))next={...r,kind:'expression',expression:value.slice(1),output:value};
  else if(typeof value==='number'||typeof value==='boolean')next={...r,kind:typeof value==='number'?'number':'boolean',expression:String(value),output:value};
  else next={...r,kind:'string',value:String(value),output:value};
  e.blockInputs[key]=next;
 }
 return p;
}
