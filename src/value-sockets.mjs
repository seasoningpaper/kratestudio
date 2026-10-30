import {evaluateExpression} from './expressions.mjs';
import {createBlockIdAllocator} from './block-identities.mjs';
const copy=v=>JSON.parse(JSON.stringify(v));
// Encode only the escapes supported by the existing runtime, retaining literal
// line breaks. This avoids changing KOI Script or the game player bundle.
const stringValue=value=>'="'+value.replace(/\\/g,'\\\\').replace(/"/g,'\\"')+'"';
export function socketType(e,key){
 if(['character','animation','background'].includes(e.type)&&['motionDuration','zIndex'].includes(key)||['wait','fade','intro','effect'].includes(e.type)&&key==='duration'||e.type==='dialogue'&&key==='speed'||['music','sound','video'].includes(e.type)&&key==='volume')return 'literal:number';
 if(['character','animation'].includes(e.type)&&key==='wait'||['character','animation','background'].includes(e.type)&&key==='motionLoop')return 'boolean';
 if(['name','text'].includes(key)&&['dialogue','input','intro','end','section','cg'].includes(e.type))return 'string';
 if(key==='until'&&e.type==='repeat'&&e.repeatMode==='until')return 'booleanExpression';
 if(key==='count'&&e.type==='repeat')return 'number';
 if(key==='value'&&['variable','condition'].includes(e.type))return 'any';
 return null;
}
export const reporterText=r=>['string','character'].includes(r.kind)?String(r.value??''):String(r.expression??'');
export const editReporter=(r,text)=>r.kind==='character'?{...r,kind:'string',characterId:undefined,value:text}:r.kind==='string'?{...r,value:text}:{...r,expression:text};
export function boundReporter(e,key){const r=e.blockInputs?.[key];return r&&Object.is(r.output,e[key])?r:null}
export function characterReference(p,id){const matches=(p.characters||[]).filter(c=>c.id===id);return matches.length===1?matches[0]:null}
export function reporterOutput(r,e,key,p){
 const socket=socketType(e,key);if(!socket)return null;
 if(r.kind==='character'){if(e.type!=='dialogue'||key!=='name')return null;const role=characterReference(p,r.characterId);return role?.name?{value:role.name}:null}
 // These runtime fields use primitive Number/boolean, not eventValue. Never
 // store an unevaluated expression or variable reference in such a slot.
 if(socket==='literal:number'){const text=String(r.expression??'').trim();if(r.kind!=='number'||!text||!Number.isFinite(Number(text)))return null;return{value:Number(text)}}
 if(socket==='boolean'){if(r.kind!=='boolean'||!['true','false'].includes(r.expression))return null;return{value:r.expression==='true'}}
 if(socket==='booleanExpression'){if(r.kind==='string')return null;try{const value=evaluateExpression(r.expression,p.variables||{});return typeof value==='boolean'?{value:'='+r.expression}:null}catch{return null}}
 if(r.kind==='string'){if(socket==='number')return null;const value=String(r.value??'');return {value:socket==='any'&&value.startsWith('=')?stringValue(value):value}}
 let value;try{value=r.kind==='variable'&&Object.hasOwn(p.variables||{},r.expression)?p.variables[r.expression]:evaluateExpression(r.expression,p.variables||{})}catch{return null}
 if(socket==='string'){if(r.kind!=='variable'||typeof value!=='string'||!Object.hasOwn(p.variables||{},r.expression))return null;return {value:'{'+r.expression+'}'}}
 if(socket==='number'&&(typeof value!=='number'||!Number.isFinite(value)))return null;
 return {value:'='+r.expression};
}
// A drop is one existing project-history transaction; ordinary fields stay
// authoritative for old projects, scripts, previews and exported games.
export function valueDropPlan(p,ci,eventId,key,candidate,position={x:600,y:80}){
 const destination=p.chapters[ci]?.events.find(e=>e.id===eventId);if(!destination)return null;
 const reporters=copy(p.editorSettings?.reporterBlocks||[]),patches=new Map();
 const owned=[];for(const c of p.chapters)for(const e of c.events)for(const k of Object.keys(e.blockInputs||{})){const r=boundReporter(e,k);if(r)owned.push({e,key:k,r})}
 const source=candidate.id?owned.find(s=>s.r.id===candidate.id):null,loose=candidate.id?reporters.find(r=>r.id===candidate.id):null;
 if(candidate.id&&!source&&!loose)return null;
 if(source?.e===destination&&source.key===key)return null;
 const r=copy(source?.r||loose||candidate),out=reporterOutput(r,destination,key,p);if(!out)return null;
 if(!r.id)r.id=createBlockIdAllocator(p)();
 const patchFor=e=>{if(!patches.has(e.id))patches.set(e.id,{id:e.id,patch:{blockInputs:{...e.blockInputs}}});return patches.get(e.id).patch};
 if(source){const patch=patchFor(source.e);patch[source.key]=source.r.fallbackPresent===false?undefined:source.r.fallback;delete patch.blockInputs[source.key]}
 const old=boundReporter(destination,key),patch=patchFor(destination);
 if(old)reporters.push({...copy(old),x:position.x+30,y:position.y+30});
 patch[key]=out.value;patch.blockInputs[key]={...r,output:out.value,fallback:old?old.fallback:Object.hasOwn(destination,key)?destination[key]:'',fallbackPresent:old?old.fallbackPresent!==false:Object.hasOwn(destination,key)};
 return {patches:[...patches.values()],reporters:reporters.filter(v=>v.id!==r.id)};
}
export function valueDetachPlan(p,ci,eventId,key,position={x:600,y:80}){
 const e=p.chapters[ci]?.events.find(e=>e.id===eventId),r=e&&boundReporter(e,key);if(!r)return null;
 const inputs={...e.blockInputs};delete inputs[key];
 return {patches:[{id:e.id,patch:{[key]:r.fallbackPresent===false?undefined:r.fallback,blockInputs:inputs}}],reporters:[...p.editorSettings?.reporterBlocks||[],{...copy(r),...position}]};
}
export function inputPatch(e,key,value){const inputs={...e.blockInputs},r=boundReporter(e,key);if(!r){delete inputs[key];return e.blockInputs?{[key]:value,blockInputs:inputs}:{[key]:value}}const socket=socketType(e,key);if(socket==='literal:number'||socket==='boolean'){const output=socket==='boolean'?!!value:Number(value);inputs[key]={...r,kind:socket==='boolean'?'boolean':'number',expression:String(output),output};return{[key]:output,blockInputs:inputs}}const text=socket==='string'||r.kind==='string',output=text&&socketType(e,key)==='any'&&String(value).startsWith('=')?stringValue(String(value)):value;inputs[key]=text?{...r,kind:'string',value:String(value),output}:{...r,kind:'expression',expression:String(value).replace(/^=/,''),output};return{[key]:output,blockInputs:inputs}}
