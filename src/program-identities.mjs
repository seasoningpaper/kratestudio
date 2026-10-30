const editorKeys=['pos','blockDetached','blockStack','blockPos','blockInputs','blockReturnAfter','blockReturnBefore'];
const semantic=e=>{const value={...e};if(['jump','condition'].includes(e.type)){delete value.target;delete value.elseTarget}if(e.options)value.options=e.options.map(({target,...o})=>o);return JSON.stringify(Object.fromEntries(Object.entries(value).filter(([key])=>!['id','scriptLine',...editorKeys].includes(key)).sort(([a],[b])=>a.localeCompare(b))))};
// Explicit JSON IDs always win. Native commands reuse matched live identities,
// first by unchanged content, then by the original source line or edited slot.
export function preserveProgramIdentities(events,previous,generated){
 const used=new Set(events.filter(e=>!generated.has(e.id)).map(e=>e.id)),matches=new Map(),oldById=new Map(previous.map(e=>[e.id,e]));
 const claim=(e,old)=>{if(!old||used.has(old.id)||old.type!==e.type)return false;used.add(old.id);matches.set(e,old);return true};
 const bySemantic=new Map(),byLine=new Map(),enqueue=(map,key,e)=>{if(!map.has(key))map.set(key,{items:[],at:0});map.get(key).items.push(e)};
 for(const old of previous){enqueue(bySemantic,semantic(old),old);if(old.scriptLine!==undefined)enqueue(byLine,old.type+':'+old.scriptLine,old)}
 const firstFree=queue=>{while(queue&&queue.at<queue.items.length){const old=queue.items[queue.at++];if(!used.has(old.id))return old}};
 for(const e of events.filter(e=>generated.has(e.id)))claim(e,firstFree(bySemantic.get(semantic(e))));
 for(const[e,i]of events.map((e,i)=>[e,i]))if(generated.has(e.id)&&!matches.has(e))claim(e,firstFree(byLine.get(e.type+':'+e.scriptLine)))||claim(e,previous[i]);
 const remap=new Map();for(const e of events){const old=matches.get(e)||oldById.get(e.id);if(!old||old.type!==e.type)continue;if(matches.has(e)){remap.set(e.id,old.id);e.id=old.id}for(const key of editorKeys)if(e[key]===undefined&&old[key]!==undefined)e[key]=JSON.parse(JSON.stringify(old[key]))}
 for(const e of events)for(const key of['loopId','blockStack','blockReturnAfter','blockReturnBefore'])if(remap.has(e[key]))e[key]=remap.get(e[key]);
 return events;
}

export function inspectProgramValueIds(p,chapterId,events){const used=new Set([...(p.chapters||[]).map(c=>c.id),...events.map(e=>e.id),...(p.editorSettings?.reporterBlocks||[]).map(r=>r.id),...(p.chapters||[]).filter(c=>c.id!==chapterId).flatMap(c=>c.events.flatMap(e=>[e.id,...Object.values(e.blockInputs||{}).map(r=>r?.id)]))]),errors=[];for(const e of events)for(const r of Object.values(e.blockInputs||{})){if(!r||typeof r.id!=='string'||!r.id||used.has(r.id))errors.push({line:e.scriptLine||1,message:'值積木 ID 無效、重複或已被占用：'+String(r?.id||'')});else used.add(r.id)}return errors}
