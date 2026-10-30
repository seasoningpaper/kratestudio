import{programDefaults,serializeEvents,compileProgram}from'./program-files.mjs';
import{remapDestinations}from'./event-order.mjs';
import{reconcileValueBindings}from'./value-binding-sync.mjs';
const clone=v=>JSON.parse(JSON.stringify(v));
export const canonicalEventSource=events=>serializeEvents(events.map(({scriptLine,...e})=>e));
const contextOf=p=>JSON.stringify({variables:p.variables||{},types:p.variableTypes||{}});
const chapterOf=(p,file)=>p.chapters.find(c=>c.id===file.chapterId);
const stateFor=(file,canonical)=>file.syncState?.version===1?file.syncState:{version:1,events:canonical,dirty:file.source!==canonical};
// events remain authoritative; syncState is a draft base, never a second AST.
export function synchronizeProgramFiles(p){
 if(!p.programFiles?.length)p.programFiles=programDefaults(p,p.chapters[0].id);
 let changed=false;const sources=new Map();
 const next=p.programFiles.map(file=>{if(file.kind!=='script')return file;const c=chapterOf(p,file);if(!c)return file;
  if(!sources.has(c.id))sources.set(c.id,canonicalEventSource(c.events));const canonical=sources.get(c.id),state=stateFor(file,canonical),context=contextOf(p),baseContext=state.context??context;
  const source=!state.dirty&&canonical!==state.events?canonical:file.source;
  const syncState={version:1,events:state.dirty?state.events:canonical,context:state.dirty?baseContext:context,dirty:!!state.dirty,conflict:!!state.dirty&&(canonical!==state.events||context!==baseContext)};
  if(source===file.source&&JSON.stringify(syncState)===JSON.stringify(file.syncState))return file;
  changed=true;return{...file,source,syncState};
 });if(changed)p.programFiles=next;return changed;
}
export function updateProgramFiles(p,files){
 const previous=p.programFiles||[];p.programFiles=clone(files).map(file=>{
  if(file.kind!=='script')return file;const c=chapterOf(p,file);if(!c)return file;
  const old=previous.find(f=>f.name===file.name),canonical=canonicalEventSource(c.events),rebound=old&&(old.kind!==file.kind||old.chapterId!==file.chapterId),state=rebound?{version:1,events:canonical,context:contextOf(p),dirty:true}:stateFor(file,canonical);
  if(!old||file.source!==old.source||rebound)state.dirty=file.source!==canonical;
  if(!state.dirty)state.events=canonical;file.syncState=state;return file;
 });synchronizeProgramFiles(p);
}
export function ensureChapterProgram(p,chapterId){synchronizeProgramFiles(p);if(p.programFiles.some(f=>f.kind==='script'&&f.chapterId===chapterId))return;const c=p.chapters.find(c=>c.id===chapterId);if(!c)return;const names=new Set(p.programFiles.map(f=>f.name));let name='script-'+(p.chapters.indexOf(c)+1)+'.koi',n=2;while(names.has(name))name='script-'+(p.chapters.indexOf(c)+1)+'-'+(n++)+'.koi';p.programFiles=[...p.programFiles,{name,kind:'script',chapterId,source:canonicalEventSource(c.events)}];synchronizeProgramFiles(p)}
export function planProgramApply(p,file){
 const current=p.programFiles?.find(f=>f.name===file.name),error=message=>({diagnostics:[{line:1,severity:'error',message}]});
 if(current&&(current.source!==file.source||current.kind!==file.kind||current.chapterId!==file.chapterId))return error('草稿已變更，請重新檢查後再套用。');
 if(file.kind==='script'){const c=chapterOf(p,file);if(!c)return error('綁定劇情已不存在，請重新選擇綁定劇情。');const state=file.syncState;
  if(state?.version===1&&(state.events!==canonicalEventSource(c.events)||state.context!==undefined&&state.context!==contextOf(p)))return error('劇情已在其他模式修改。草稿已保留；請先匯出草稿，再使用「從事件更新」或手動整合，避免覆蓋事件。');
 }
 return compileProgram(file,p);
}
export function applyProgramResult(p,file,result){
 if(result.diagnostics?.some(d=>d.severity==='error'))return false;
 if(file.kind==='script'){const c=chapterOf(p,file);if(!c)return false;const before=c.events,indices=new Map(result.events.map((e,i)=>[e.id,i]));remapDestinations(p,c.id,n=>indices.get(before[n]?.id)??null);c.events=clone(result.events);}
 else{const files=p.programFiles;Object.assign(p,result.project);p.programFiles=files}
 reconcileValueBindings(p);
 const c=chapterOf(p,file);p.programFiles=(p.programFiles||[]).map(f=>f.name===file.name?{...f,source:file.source,...(file.kind==='script'?{syncState:{version:1,events:canonicalEventSource(c.events),context:contextOf(p),dirty:false,conflict:false}}:{})}:f);
 synchronizeProgramFiles(p);return true;
}
export function synchronizeWorkspace(p){reconcileValueBindings(p);synchronizeProgramFiles(p)}
