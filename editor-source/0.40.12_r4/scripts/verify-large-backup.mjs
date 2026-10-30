// Explicit opt-in only. Max 10.1 GB temporary disk, 180 s; no user browser data.
import {openAsBlob, createWriteStream} from 'node:fs';
import {mkdtemp, open, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {performance} from 'node:perf_hooks';
import {objectURL, blobOf, usage, saveProject} from '../src/storage.mjs';
import {writeProjectBackup, readProjectBackup} from '../src/project-backup.mjs';
import assert from 'node:assert/strict';
if(process.argv[2]!=='--confirm-10gb-temporary-disk')throw Error('Requires --confirm-10gb-temporary-disk; never runs with npm test');
const folder=await mkdtemp(join(tmpdir(),'koi-r3-large-')),source=join(folder,'source.bin'),archive=join(folder,'project.koib');
const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),180000),start=performance.now();
let peakRSS=process.memoryUsage().rss;
const sample=setInterval(()=>{peakRSS=Math.max(peakRSS,process.memoryUsage().rss)},100);
const report={environment:'Node real temporary disk in <1 GB parts with exact range adapter (runtime file-Blob >4 GiB slicing bug); NOT browser IndexedDB/quota',payloadBytes:4_990_000_000,diskLimitBytes:10_100_000_000,timeoutSeconds:180,results:{}};
try{
  const fd=await open(source,'w'),chunk=Buffer.alloc(8_000_000,0x5a);
  try{for(let at=0;at<report.payloadBytes;){controller.signal.throwIfAborted();const count=Math.min(chunk.length,report.payloadBytes-at);await fd.write(chunk,0,count,at);at+=count}}finally{await fd.close()}
  const file=await open(source,'r'),parts=[];try{for(let i=0;i<10;i++){const part=join(folder,'input-'+i),out=await open(part,'w');try{for(let at=0;at<499_000_000;){const length=Math.min(chunk.length,499_000_000-at);const{bytesRead}=await file.read(chunk,0,length,i*499_000_000+at);assert.equal(bytesRead,length);await out.write(chunk,0,length,at);at+=length}}finally{await out.close()}parts.push(await openAsBlob(part))}}finally{await file.close()}await rm(source);const p={id:'large-isolated',title:'大型串流測試副本',chapters:[{id:'c',title:'c',events:[{id:'e',type:'end',text:'測試'}]}],videos:Array.from({length:10},(_,i)=>({id:'v'+i,name:'binary-fixture-'+i+'.bin',data:objectURL(parts[i].slice(0,499_000_000,'application/octet-stream'))}))};
  report.projectBytes=await usage(p);assert.ok(report.projectBytes>2147483648&&report.projectBytes<5e9);
  // Node file-backed Blob.slice truncates >4 GiB offsets in this runtime.
  // Keep each physical file <1 GB; provide exact range slicing over real files.
  const archiveParts=[];let fdOut=null,partBytes=0;
  const nextPart=async()=>{if(fdOut)await fdOut.close();const path=archive+'-'+archiveParts.length;archiveParts.push(path);fdOut=await open(path,'w');partBytes=0};
  await nextPart();
  const writable={async write(data){let at=0;while(at<data.byteLength){if(partBytes===1_000_000_000)await nextPart();const length=Math.min(data.byteLength-at,1_000_000_000-partBytes);const{bytesWritten}=await fdOut.write(data,at,length);if(!bytesWritten)throw Error('Short write');at+=bytesWritten;partBytes+=bytesWritten}},async close(){await fdOut.close();fdOut=null},async abort(){await fdOut?.close().catch(()=>{});fdOut=null}};
  const exportedAt=performance.now();await writeProjectBackup(p,writable,{signal:controller.signal});report.exportMs=performance.now()-exportedAt;
  const diskParts=await Promise.all(archiveParts.map(p=>openAsBlob(p))),fileView={size:diskParts.reduce((n,b)=>n+b.size,0),slice(start,end){const chunks=[];let offset=0;for(const b of diskParts){const a=Math.max(0,start-offset),z=Math.min(b.size,end-offset);if(z>a)chunks.push(b.slice(a,z));offset+=b.size}return new Blob(chunks)}};const importedAt=performance.now(),restored=await readProjectBackup(fileView,{signal:controller.signal});report.importMs=performance.now()-importedAt;
  assert.equal(await usage(restored),report.projectBytes);assert.equal(restored.videos.length,10);
  for(const a of restored.videos){const b=await blobOf(a);assert.equal(b.size,499_000_000);for(const offset of [0,b.size-1])assert.equal(new Uint8Array(await b.slice(offset,offset+1).arrayBuffer())[0],0x5a)}
  report.results.streamExport='passed: every byte read/written with CRC32';report.results.streamImport='passed: every byte verified with CRC32 and first/last byte per file';
  report.results.browserIndexedDB='NOT EXECUTED: file-backed Node Blobs cannot be structured-cloned; no browser claim';report.results.browserQuota='NOT EXECUTED';report.results.largeGameZip='NOT SUPPORTED: bounded memory path rejects above 0.256 GB';
}catch(error){report.error={name:error.name,message:error.message};process.exitCode=1}
finally{clearTimeout(timer);clearInterval(sample);report.totalMs=performance.now()-start;report.peakRSSBytes=peakRSS;await rm(folder,{recursive:true,force:true});report.temporaryDataRemoved=true;await writeFile('research/04012-r3/large-backup.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2))}
