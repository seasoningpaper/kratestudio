import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {extractFile} from '@electron/asar';
const app=path.resolve('artifacts/win-unpacked');
const exe=fs.readFileSync(path.join(app,'KoiMaker.exe'));
const pe=exe.readUInt32LE(0x3c);
if(exe.toString('ascii',0,2)!=='MZ'||exe.toString('ascii',pe,pe+4)!=='PE\0\0'||exe.readUInt16LE(pe+4)!==0x8664)
  throw Error('不是Windows x64 PE執行檔');
const archive=path.join(app,'resources/app.asar');
const digest=b=>createHash('sha256').update(b).digest('hex');
const verified=[];
for(const file of ['main.cjs','preload.cjs','renderer/index.html','renderer/workspace.js','renderer/player.js','renderer/app.js','renderer/style.css','renderer/brand.css']) {
  const packed=extractFile(archive,'out/'+file),built=fs.readFileSync('out/'+file);
  if(!packed.equals(built))throw Error('封裝與建置來源不同：'+file);
  verified.push({file,sha256:digest(packed)});
}
const report={version:JSON.parse(fs.readFileSync('package.json')).version,platform:'win32-x64',
  exeSHA256:digest(exe),asarSHA256:digest(fs.readFileSync(archive)),verified,
  windowsLaunchVerified:false,formalRelease:false};
fs.writeFileSync('artifacts/PACKAGE-VERIFICATION.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
