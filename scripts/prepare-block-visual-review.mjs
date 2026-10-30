// Prepare isolated visual fixtures; this does not launch a browser or record a pass.
import{readFile,writeFile,mkdir}from'node:fs/promises';
import{execFileSync}from'node:child_process';
import{Script}from'node:vm';
import{createHash}from'node:crypto';
const baseline='0cb21b6723ac6962b97200657169061bc26df1d0',current='532b93bc73b9cb54c3eb7c19adaaa0e0a22c0811';
const safe=v=>JSON.stringify(v).replace(/</g,'\\u003c');
const sources=[];
for(const[sha,label]of[[baseline,'修改前'],[current,'目前保存修正版']]){
 const get=path=>execFileSync('git',['show',sha+':'+path],{encoding:'utf8',maxBuffer:12*1024*1024});
 const source={sha,label,html:get('dist/index.html').replace(/<script[^>]*src[^>]*><\/script>/g,'').replace(/<link[^>]*rel="stylesheet"[^>]*>/g,''),css:get('dist/style.css'),workspace:get('dist/workspace.js'),icons:get('dist/assets/icons.svg')};
 new Script(source.workspace);sources.push(source);
}
const e=(id,extra={})=>({id,type:'dialogue',name:'小春',text:'今天也一起回家嗎？',...extra});
const cases=[
 {name:'既有角色對話',events:[e('a'),e('b',{name:'男主角',text:'好啊，一起走吧。'})]},
 {name:'長中文單行',events:[e('a',{name:'名字較長的測試角色',text:'長中文對話與標點，應維持欄位對齊。'.repeat(60)}),e('b')]},
 {name:'多行對話',events:[e('a',{text:'第一行：早安。\n第二行：'+'中文換行測試'.repeat(35)+'\n第三行：保留結尾。'}),e('b')]},
 {name:'選項與長下拉文字',events:[e('choice',{type:'choice',text:'要選哪一條路？',options:Array.from({length:5},(_,i)=>({text:'第'+(i+1)+'個選項：'+'選項文字'.repeat(i+2),target:1}))}),e('b')]},
 {name:'巢狀重複積木',events:[e('r',{type:'repeat',count:2}),e('a'),e('r2',{type:'repeat',count:3}),e('b'),e('re2',{type:'repeatEnd',loopId:'r2'}),e('re',{type:'repeatEnd',loopId:'r'}),e('c')]},
 {name:'分離積木串',events:[e('a',{blockDetached:true,blockStack:'a',blockPos:{x:600,y:100}}),e('b',{blockDetached:true,blockStack:'a',blockPos:{x:600,y:166}})]},
 {name:'新字串插槽（允許必要控制項差異）',events:[e('a',{text:'早安\n今天也請多指教。',blockInputs:{text:{id:'value-a',kind:'string',value:'早安\n今天也請多指教。',output:'早安\n今天也請多指教。',fallback:'原內容'}}}),e('b')]}
];
const frameBootstrap=`(()=>{const p=window.__fixture;const root=document.getElementById('blockEditor');root.hidden=false;for(const id of ['eventList','codeEditor','flowEditor'])document.getElementById(id).hidden=true;document.body.classList.add('blocks-mode');const rewrite=()=>{for(const use of document.querySelectorAll('use')){const href=use.getAttribute('href')||'';if(href.includes('icons.svg'))use.setAttribute('href',href.slice(href.indexOf('#')))}};new MutationObserver(rewrite).observe(document.body,{childList:true,subtree:true});let selected=0;const render=()=>KoiWorkspace.render({project:p,chapterId:'c',projectKey:'visual-fixture',events:p.chapters[0].events,selected,blocksActive:true,codeActive:false,active:false,onSelect:i=>{selected=i;render()},onSelectMany(){},onPatchEvent:(i,patch)=>{Object.assign(p.chapters[0].events[i],patch);render()}});render();})();`;
new Script(frameBootstrap);
const outer=`const sources=${safe(sources)},cases=${safe(cases)},bootstrap=${safe(frameBootstrap)};const selector=document.getElementById('case');cases.forEach((c,i)=>selector.add(new Option(c.name,i)));const escapeScript=s=>s.replace(/<\\/script/gi,'<\\\\/script');function load(){const fixture=cases[selector.value||0],mobile=document.getElementById('size').value==='mobile',width=mobile?390:1440,height=mobile?844:900;document.querySelectorAll('iframe').forEach((frame,i)=>{const s=sources[i],project={id:'isolated-visual-qa',title:'視覺驗收樣本',settings:{},editorSettings:{language:'zh-TW',blockSounds:false},variables:{好感度:0},images:[],audio:[],videos:[],chapters:[{id:'c',title:'視覺驗收',events:fixture.events}]};frame.width=width;frame.height=height;frame.srcdoc=s.html.replace('</head>','<style>'+s.css+'</style></head>').replace('</body>','<div style="display:none">'+s.icons+'</div><script>window.__fixture='+JSON.stringify(project).replace(/</g,'\\\\u003c')+';<'+ '/script><script>'+escapeScript(s.workspace)+';<'+ '/script><script>'+bootstrap+'<'+ '/script></body>')});}selector.onchange=load;document.getElementById('size').onchange=load;load();`;
new Script(outer);
const html=`<!doctype html><html lang="zh-TW"><meta charset="utf-8"><title>Koi Maker 0.40.11_r3 視覺補驗樣本</title><style>body{font-family:system-ui,sans-serif;margin:20px;background:#f4f4f4;color:#222}header{position:sticky;top:0;background:#f4f4f4;padding:8px;z-index:2}select{margin-right:18px;padding:5px}section{margin:22px 0}.frame-scroll{overflow:auto;border:1px solid #bbb}iframe{display:block;border:0;background:white}p{max-width:1000px;line-height:1.6}</style><header><h1>Koi Maker 0.40.11_r3 視覺補驗樣本</h1><p>此檔案尚未經本輪真實瀏覽器驗收，不代表通過。使用隔離的 React／CSS 樣本，不載入主程式、不連線、不讀寫專案儲存。可比較基本外觀、長文字、選項、巢狀積木及必要新增控制項；完整拖曳、儲存與跨模式操作另行驗收。</p><label>案例 <select id="case"></select></label><label>視窗 <select id="size"><option value="desktop">電腦 1440 × 900</option><option value="mobile">手機 390 × 844</option></select></label><p>兩個畫面皆可使用既有縮放控制。請依驗收清單記錄瀏覽器、實際可用字型、尺寸、縮放與截圖；瀏覽器缺字型或圖片時不得視為原樣通過。</p></header><section><h2>修改前 0cb21b6</h2><div class="frame-scroll"><iframe title="修改前積木畫面" sandbox="allow-scripts allow-same-origin"></iframe></div></section><section><h2>目前保存修正版 532b93b</h2><div class="frame-scroll"><iframe title="目前保存積木畫面" sandbox="allow-scripts allow-same-origin"></iframe></div></section><script>${outer}</script></html>`;
await mkdir('qa',{recursive:true});await writeFile('qa/p0-c-visual-review.html',html);
const result={baseline,current,cases:cases.map(c=>c.name),viewports:[{width:1440,height:900},{width:390,height:844}],syntaxChecked:true,browserExecuted:false,screenshotsProduced:false,visualAcceptance:'blocked',sha256:createHash('sha256').update(html).digest('hex')};
await writeFile('qa/p0-c-visual-review-manifest.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({file:'qa/p0-c-visual-review.html',caseCount:cases.length,bytes:Buffer.byteLength(html),browserExecuted:false}));
