export function sections(events){const out=[];let group=null;events.forEach((event,index)=>{if(event.type==='section'){group={key:event.id,title:event.text||'未命名區段',sectionIndex:index,items:[]};out.push(group)}else{if(!group){group={key:'unsectioned',title:'未分區事件',sectionIndex:null,items:[]};out.push(group)}group.items.push({event,index})}});return out}
export function counts(events){return{events:events.filter(e=>e.type!=='section').length,options:events.reduce((n,e)=>n+(e.type==='choice'?(e.options||[]).length:0),0),extensions:events.filter(e=>e.type==='minigame').length}}
export function summary(events){const c=counts(events);return `${c.events} 個事件　${c.options} 個選項　${c.extensions} 個擴充`}
export function eventTotals(project, chapterIndex=0){
 const chapters=project.chapters||[],current=counts(chapters[chapterIndex]?.events||[]);
 const total=chapters.reduce((sum,c)=>{const n=counts(c.events||[]);return{events:sum.events+n.events,options:sum.options+n.options,extensions:sum.extensions+n.extensions}}, {events:0,options:0,extensions:0});
 return{chapters:chapters.length,current,total};
}
export function footerSummary(project, chapterIndex=0){const s=eventTotals(project,chapterIndex);return `${s.chapters} 個章節　本章 ${s.current.events} 個事件／專案 ${s.total.events} 個事件`}
