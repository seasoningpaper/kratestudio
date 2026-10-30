export const statementPresetLabels={repeatUntil:'重複直到條件成立',flagOn:'設定旗標',flagOff:'取消旗標'};
// Presets create existing canonical events in one project history transaction.
export function statementPreset(key,p){
 if(key==='repeatUntil')return{type:'repeat',patch:{text:statementPresetLabels[key],repeatMode:'until',until:'=true',count:1000}};
 if(!['flagOn','flagOff'].includes(key))return null;
 let name=Object.keys(p.variables||{}).find(k=>typeof p.variables[k]==='boolean');const variables={},variableTypes={};
 if(!name){for(let i=0;i<1000;i++){const candidate='旗標'+(i||'');if(!Object.hasOwn(p.variables||{},candidate)){name=candidate;break}}if(!name)return{error:'無法建立旗標：請先在變數管理新增布林變數'};variables[name]=false;variableTypes[name]='boolean'}
 return{type:'variable',patch:{text:statementPresetLabels[key],variable:name,operation:'set',value:key==='flagOn'},variables,variableTypes};
}
