import {assertBufferedExport,assertProjectSize} from './storage-policy.mjs';
import JSZip from 'jszip';
import {blobOf,assertAssetIds,usage} from './storage.mjs';
const extensions={'font/woff':'woff','font/woff2':'woff2','font/ttf':'ttf','font/otf':'otf','image/png':'png','image/jpeg':'jpg','image/webp':'webp','image/gif':'gif','image/avif':'avif','image/bmp':'bmp','audio/mpeg':'mp3','audio/mp4':'m4a','audio/wav':'wav','audio/x-wav':'wav','audio/ogg':'ogg','audio/aac':'aac','audio/flac':'flac','audio/x-m4a':'m4a','video/mp4':'mp4','video/webm':'webm','video/ogg':'ogv','video/quicktime':'mov'};
const html='<!doctype html><html lang="zh-TW"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>Koi Maker 遊戲</title><meta name="generator" content="Koi Maker 視覺化故事創作平台 0.41.0"><link rel="stylesheet" href="player.css"><style>body{margin:0}</style></head><body><script src="player.js"></script><script src="game.js"></script></body></html>';
const instructions='將整個資料夾上傳到支援靜態網站的主機。入口為 index.html，請保留 assets 資料夾。\n玩家存檔保存在玩家的瀏覽器，跨網址不共用。\n素材分離封裝，請勿合併成大型 HTML。';
async function* gameFiles(p,status){
 assertAssetIds(p);assertProjectSize(await usage(p));
 const paths=new Set(),out=JSON.parse(JSON.stringify(p));
 for(const type of ['images','audio','videos','fonts'])for(let i=0;i<(out[type]||[]).length;i++){
  const a=out[type][i],blob=await blobOf(p[type][i]),ext=blob.type==='video/mp4'&&type==='audio'?'m4a':extensions[blob.type]||'bin';
  const base='assets/'+type+'/'+String(a.id).replace(/[^a-zA-Z0-9_-]/g,'_');let name=base+'.'+ext,n=2;
  while(paths.has(name))name=base+'-'+n+++'.'+ext;paths.add(name);
  a.data=name;delete a.storageKey;delete a.thumbnail;status('正在輸出 '+a.name);yield [name,blob];
 }
 for(const name of ['player.js','player.css','assets/classroom.png']){const r=await fetch(name);if(!r.ok)throw Error('無法讀取遊戲檔案：'+name);yield [name==='assets/classroom.png'?'assets/default.png':name,new Blob([await r.arrayBuffer()])]}
 out.defaultBg='assets/default.png';
 yield ['game.js',new Blob(['KoiPlayer.mount('+JSON.stringify(out).replace(/</g,'\\u003c')+',{standalone:true});'])];
 yield ['index.html',new Blob([html])];yield ['使用說明.txt',new Blob([instructions])];
}
export async function zipGame(p,status=()=>{}){
 assertAssetIds(p);assertBufferedExport(await usage(p),{kind:'game'});status('正在封裝網站檔案…');
 const zip=new JSZip();for await(const [name,blob]of gameFiles(p,status))zip.file(name,new Uint8Array(await blob.arrayBuffer()));
 return zip.generateAsync({type:'blob',compression:'STORE'},info=>status('封裝中 '+info.percent.toFixed(0)+'%'));
}
async function writeFile(root,path,blob){
 const parts=path.split('/');let dir=root;for(const part of parts.slice(0,-1))dir=await dir.getDirectoryHandle(part,{create:true});
 const handle=await dir.getFileHandle(parts.at(-1),{create:true}),writer=await handle.createWritable(),reader=blob.stream().getReader();
 try{for(;;){const{done,value}=await reader.read();if(done)break;await writer.write(value)}await writer.close()}
 catch(error){await writer.abort?.(error).catch(()=>{});throw error}
 finally{await reader.cancel().catch(()=>{});reader.releaseLock()}
}
export async function exportGameDirectory(p,status=()=>{}){
 if(typeof globalThis.showDirectoryPicker!=='function')throw Error('此環境不支援資料夾串流輸出；請使用支援檔案選擇器的瀏覽器。');
 assertAssetIds(p);assertProjectSize(await usage(p));
 const parent=await showDirectoryPicker({mode:'readwrite'}),name='Koi-game-'+crypto.randomUUID();
 // Always create a fresh child; never overwrite an existing game directory.
 try{await parent.getDirectoryHandle(name);throw Error('輸出資料夾已存在，未覆寫任何檔案。')}catch(e){if(e.name!=='NotFoundError')throw e}
 const dir=await parent.getDirectoryHandle(name,{create:true});
 await writeFile(dir,'輸出未完成.txt',new Blob(['輸出尚未完成，請勿發布此資料夾。']));
 for await(const [path,blob]of gameFiles(p,status))await writeFile(dir,path,blob);
 await dir.removeEntry('輸出未完成.txt');status('遊戲已完整輸出至新資料夾：'+name);return{name};
}
if(typeof window!=='undefined')window.KoiPackage={zipGame,exportGameDirectory};
