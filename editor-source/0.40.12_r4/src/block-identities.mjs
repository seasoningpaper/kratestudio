// One allocator per operation. Reserve IDs before cloning; no unbounded retries.
export const blockIdentitySet=(project={})=>new Set([...(project.chapters||[]).flatMap(c=>[c.id,...(c.events||[]).flatMap(e=>[e.id,...Object.values(e.blockInputs||{}).map(r=>r.id)])]),...(project.editorSettings?.reporterBlocks||[]).map(r=>r.id)]);
export function createBlockIdAllocator(project={},reserved=[]){
 const used=new Set([...blockIdentitySet(project),...reserved]);
 let sequence=0;
 return()=>{for(let attempt=0;attempt<8;attempt++){const id=crypto.randomUUID();if(typeof id==='string'&&id&&!used.has(id)){used.add(id);return id}}
 let id;do{id='koi-block-'+(++sequence)}while(used.has(id));used.add(id);return id};
}
