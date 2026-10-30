import{readFile,writeFile}from'node:fs/promises';
const root=new URL('../',import.meta.url),css=(await readFile(new URL('src/game-skins.css',root),'utf8')).trimEnd(),marker='/* KOI shared game skins */',end='/* End KOI shared game skins */';
for(const file of ['dist/style.css','dist/player.css']){
 const url=new URL(file,root),s=await readFile(url,'utf8'),at=s.indexOf(marker);let prefix=s,tail='';
 if(at>=0){prefix=s.slice(0,at);const body=s.slice(at+marker.length).replace(/^\r?\n/,'');const boundary=body.indexOf(end);
  if(boundary>=0)tail=body.slice(boundary+end.length);
  else if(body.startsWith(css))tail=body.slice(css.length);
  else throw Error('無法辨識舊版共用樣式範圍，已停止產生以保護既有樣式：'+file);
 }
 await writeFile(url,prefix.trimEnd()+'\n'+marker+'\n'+css+'\n'+end+tail);
}
