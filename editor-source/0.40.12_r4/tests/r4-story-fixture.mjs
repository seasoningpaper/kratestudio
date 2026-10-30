import{readFileSync}from'node:fs';
import{createActivity}from'../src/activities.mjs';
export const supplied=JSON.parse(readFileSync(new URL('./fixtures/r4/stage-story.json',import.meta.url),'utf8'));
export const copy=v=>JSON.parse(JSON.stringify(v));
export const semantic=es=>copy(es.map(({scriptLine,...e})=>e));
export function story(corrected=true,{stubs=true}={}){
 const events=copy(supplied.events);if(corrected)for(const e of events)if(Object.hasOwn(supplied.suppliedTargets,e.id))e.target=supplied.suppliedTargets[e.id];
 const p={id:'r4-story-copy',title:'513事件角色測試副本',settings:{textSpeed:80,autoDelay:1800},variables:{},images:[],audio:[],videos:[],fonts:[],characters:[],chapters:[{id:'story',title:'劇本副本（未附章節資訊）',events}]};
 for(const e of events)for(const r of e.resourceRefs||[]){const list=r.type==='audio'?p.audio:r.type==='video'?p.videos:p.images;if(!list.some(a=>a.id===e[r.field]))list.push({id:e[r.field],name:r.filename})}
 // Explicit test-only stand-ins: original module definitions and media bytes were not supplied.
 if(stubs)p.extensions={activities:events.filter(e=>e.type==='activity').map(e=>createActivity('messages',e.activity))};
 return p;
}
