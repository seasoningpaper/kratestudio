import React,{useId,useRef,useState}from'react';
// Keep the native picker; capture the pre-edit value so cancel also undoes live preview.
export default function ColorField({label,value,onChange,defaultValue}){
 const id=useId(),original=useRef(value),[editing,setEditing]=useState(false);
 const begin=()=>{if(!editing){original.current=value;setEditing(true)}};
 return <div className="sf-color-field"><label htmlFor={id}>{label}</label><div className="sf-color-actions"><input id={id} type="color" aria-label={label} value={value||'#000000'} onFocus={begin} onChange={e=>{begin();onChange(e.target.value)}}/>{editing&&<><button type="button" onClick={()=>setEditing(false)} aria-label={'完成'+label}>完成</button><button type="button" onClick={()=>{onChange(original.current);setEditing(false)}} aria-label={'取消'+label}>取消</button></>}{defaultValue&&value!==defaultValue&&<button type="button" onClick={()=>{onChange(defaultValue);setEditing(false)}} aria-label={'還原'+label}>還原</button>}</div></div>
}
