// SoftFlow 1: one editor token source; game data and Runtime palettes are independent.
export const softflowPalettes=Object.freeze({
 blue:{bg:'#f8f9fb',surface:'#f0f3f7',light:'#ffffff',primary:'#346a9a',deep:'#28577e',ink:'#263445',muted:'#536579',quiet:'#65758a',divide:'#dce4ed',edge:'#7b8b9e',high:'#ffffff',low:'#d6dfe8',inset:'#d5dee7',select:'#e3edf7',from:'#e8f2fa',to:'#f4f0f8','action-from':'#3f729e','action-to':'#315d86',modal:'#f8fbfe'},
 lavender:{bg:'#fcf8fc',surface:'#f5f0f8',light:'#ffffff',primary:'#78539a',deep:'#654282',ink:'#342a3e',muted:'#685a73',quiet:'#786982',divide:'#e5ddeb',edge:'#93829e',high:'#ffffff',low:'#ded2e6',inset:'#d9cce2',select:'#ede3f5',from:'#f0eafa',to:'#fbf0f5','action-from':'#7b589a','action-to':'#684883',modal:'#fdf9fe'},
 dark:{bg:'#202631',surface:'#2a3340',light:'#303b49',primary:'#a6cdef',deep:'#bdddf7',ink:'#eff4fb',muted:'#c1ccda',quiet:'#a4b5c8',divide:'#465468',edge:'#94a6bb',high:'#3a4758',low:'#1c222b',inset:'#1d2530',select:'#40546b',from:'#2c4054',to:'#3c344b','action-from':'#a6cdef','action-to':'#bdddf7',modal:'#293440'}
});
export const softflowMetrics=Object.freeze({'radius-control':'4px','radius-panel':'6px','space-1':'4px','space-2':'8px','space-3':'12px','space-4':'16px','space-5':'24px','control-height':'34px','motion-fast':'120ms'});
const darkThemes=new Set(['black','midnight','charcoal','plumDark','forestDark','sepiaDark']);
const validColor=v=>typeof v==='string'&&/^#[\da-f]{6}$/i.test(v);
export function resolveSoftflowTheme(prefs={}){
 const dark=darkThemes.has(prefs.theme),variant=prefs.softflowVariant==='custom'?'custom':dark?'dark':prefs.softflowVariant==='lavender'?'lavender':'blue';
 const base=softflowPalettes[variant==='custom'?(dark?'dark':'blue'):variant],colors={...base};
 if(variant==='custom'){
  if(validColor(prefs.accent))colors.primary=colors.deep=colors['action-from']=colors['action-to']=prefs.accent;
  for(const[old,key]of Object.entries({surface:'surface',panel:'bg',field:'light',active:'select',text:'ink',muted:'muted',line:'divide'}))if(validColor(prefs.colors?.[old]))colors[key]=prefs.colors[old];
 }
 return{variant,dark,colors};
}
export function applySoftflowTheme(prefs={},root=document.documentElement){
 const{variant,dark,colors:c}=resolveSoftflowTheme(prefs);root.dataset.softflow=variant;root.dataset.editorTone=dark?'dark':'light';
 for(const[k,v]of Object.entries({...c,...softflowMetrics}))root.style.setProperty('--sf-'+k,v);
 for(const[k,v]of Object.entries({accent:c.primary,surface:c.surface,panel:c.bg,field:c.light,active:c.select,text:c.ink,muted:c.muted,line:c.divide}))root.style.setProperty('--theme-'+k,v);
 for(const[k,v]of Object.entries({pink:c.primary,text:c.ink,surface:c.surface,active:c.select,pale:c.light,muted:c.muted}))root.style.setProperty('--'+k,v);
 const rgb=c.primary.slice(1).match(/../g).map(x=>parseInt(x,16)),end=c.surface.slice(1).match(/../g).map(x=>parseInt(x,16));
 for(let i=0;i<=100;i++)root.style.setProperty('--theme-tint-'+i,'#'+rgb.map((v,k)=>Math.round(v+(end[k]-v)*i/100).toString(16).padStart(2,'0')).join(''));
 root.style.setProperty('--theme-on-accent',dark?'#182332':'#ffffff');root.style.setProperty('--theme-overlay',dark?'#00000099':c.ink+'66');return variant;
}
