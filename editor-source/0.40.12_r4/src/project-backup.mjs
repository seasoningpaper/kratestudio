import {metadata, measureProject, objectURL} from './storage.mjs';
import {ASSET_COLLECTIONS, PROJECT_LIMIT, assertProjectSize} from './storage-policy.mjs';

const MAGIC = new TextEncoder().encode('KOIBACK1');
const MAX_HEADER = 16_000_000;
const table = Uint32Array.from({length: 256}, (_, n) => {
  for (let k = 0; k < 8; k++) n = n & 1 ? 0xedb88320 ^ (n >>> 1) : n >>> 1;
  return n >>> 0;
});
const checksum = (crc, bytes) => {
  for (const b of bytes) crc = table[(crc ^ b) & 255] ^ (crc >>> 8);
  return crc;
};
const checkCancelled = signal => { if (signal?.aborted) throw new DOMException('備份已取消', 'AbortError'); };
const cleanJSON = text => JSON.parse(text, (key, value) => {
  if (['__proto__', 'constructor', 'prototype'].includes(key)) throw Error('備份含不安全的欄位');
  return value;
});

// Versioned project backup, separate from public .koi author text and game ZIP.
// No base64, no concatenated multi-GB ArrayBuffer, no changes to IndexedDB schema.
export async function writeProjectBackup(project, writable, {signal, status = () => {}} = {}) {
  const writer = writable.getWriter ? writable.getWriter() : writable;
  try {
    const measured = await measureProject(project);
    assertProjectSize(measured.bytes);
    const manifest = {format: 'koi-project-backup', version: 1, project: measured.record,
      assets: measured.rows.map(({collection, asset, blob}) => ({collection, id: asset.id, size: blob.size, mime: blob.type}))};
    const header = new TextEncoder().encode(JSON.stringify(manifest));
    if (header.length > MAX_HEADER) throw Error('備份專案資料超過 0.016 GB；請先減少程式草稿或拆分專案。');
    const prefix = new Uint8Array(16); prefix.set(MAGIC);
    new DataView(prefix.buffer).setBigUint64(8, BigInt(header.length), true);
    checkCancelled(signal); await writer.write(prefix); await writer.write(header);
    for (const {asset, blob} of measured.rows) {
      status('備份素材：' + asset.name);
      let crc = 0xffffffff;
      const reader = blob.stream().getReader();
      try {
        for (;;) {
          checkCancelled(signal);
          const {done, value} = await reader.read(); if (done) break;
          crc = checksum(crc, value); await writer.write(value);
        }
      } finally { await reader.cancel().catch(() => {}); reader.releaseLock(); }
      const trailer = new Uint8Array(4); new DataView(trailer.buffer).setUint32(0, (crc ^ 0xffffffff) >>> 0, true);
      await writer.write(trailer);
    }
    checkCancelled(signal); await writer.close();
    return {bytes: measured.bytes, assets: measured.rows.length};
  } catch (error) {
    try { await writer.abort?.(error); } catch {} throw error;
  } finally { writer.releaseLock?.(); }
}

export async function readProjectBackup(file, {signal, status = () => {}, maxProjectBytes = PROJECT_LIMIT} = {}) {
  checkCancelled(signal);
  const prefix = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  if (prefix.length !== 16 || MAGIC.some((b, i) => prefix[i] !== b)) throw Error('不是 Koi Maker 串流專案備份');
  const length = Number(new DataView(prefix.buffer).getBigUint64(8, true));
  if (!Number.isSafeInteger(length) || length <= 0 || length > MAX_HEADER || 16 + length > file.size) throw Error('備份標頭長度無效');
  const manifest = cleanJSON(await file.slice(16, 16 + length).text());
  if (manifest.format !== 'koi-project-backup' || manifest.version !== 1 || !Array.isArray(manifest.assets)) throw Error('不支援的備份版本');
  const p = manifest.project;
  if (!p || typeof p.title !== 'string' || !Array.isArray(p.chapters) || !p.chapters.length
    || p.chapters.some(c => !Array.isArray(c.events))) throw Error('備份專案資料無效');
  const expected = new Map();
  for (const collection of ASSET_COLLECTIONS) {
    if (p[collection] !== undefined && !Array.isArray(p[collection])) throw Error('備份素材清單無效');
    for (const asset of p[collection] || []) {
      const key = collection + ':' + asset.id;
      if (typeof asset.id !== 'string' || !asset.id || expected.has(key)) throw Error('備份素材 ID 空白或重複');
      expected.set(key, asset);
    }
  }
  // Gate an import from its bounded manifest before reading any large payload.
  if (!Number.isSafeInteger(maxProjectBytes) || maxProjectBytes < 0 || maxProjectBytes > PROJECT_LIMIT)
    throw Error('備份匯入容量限制無效');
  let declaredBytes = 0;
  const manifestKeys = new Set();
  for (const row of manifest.assets) {
    const key = row.collection + ':' + row.id, asset = expected.get(key);
    if (!asset || manifestKeys.has(key) || !Number.isSafeInteger(row.size) || row.size < 0 || typeof row.mime !== 'string')
      throw Error('備份素材索引無效');
    manifestKeys.add(key); asset.bytes = row.size; declaredBytes += row.size;
    assertProjectSize(declaredBytes);
  }
  if (manifestKeys.size !== expected.size) throw Error('備份缺少素材');
  declaredBytes += new Blob([JSON.stringify(metadata(p))]).size;
  assertProjectSize(declaredBytes);
  if (declaredBytes > maxProjectBytes)
    throw Error('此備份超過本公開測試版的 2.1 GB 一般專案寫入上限。5.0 GB 尚未開放；目前專案未變更。');
  let offset = 16 + length, bytes = new Blob([JSON.stringify(metadata(p))]).size;
  const restored = [];
  // Validate the whole file before exposing any object URL or changing the live project.
  for (const row of manifest.assets) {
    checkCancelled(signal);
    const key = row.collection + ':' + row.id, asset = expected.get(key);
    if (!asset || !Number.isSafeInteger(row.size) || row.size < 0 || typeof row.mime !== 'string') throw Error('備份素材索引無效');
    expected.delete(key); bytes += row.size; assertProjectSize(bytes);
    if (offset + row.size + 4 > file.size) throw Error('備份中斷或素材長度不符：' + asset.name);
    const blob = file.slice(offset, offset + row.size, row.mime);
    let crc = 0xffffffff; const reader = blob.stream().getReader();
    try {
      for (;;) {
        checkCancelled(signal);
        const {done, value} = await reader.read(); if (done) break;
        crc = checksum(crc, value);
      }
    } finally { await reader.cancel().catch(() => {}); reader.releaseLock(); }
    const trailer = await file.slice(offset + row.size, offset + row.size + 4).arrayBuffer();
    if (new DataView(trailer).getUint32(0, true) !== ((crc ^ 0xffffffff) >>> 0)) throw Error('備份素材校驗失敗：' + asset.name);
    asset.bytes = row.size; restored.push({asset, blob}); offset += row.size + 4;
    status('已驗證：' + asset.name);
  }
  if (expected.size || offset !== file.size) throw Error('備份缺少素材或含未識別的尾端資料');
  assertProjectSize(new Blob([JSON.stringify(metadata(p))]).size + restored.reduce((n, r) => n + r.blob.size, 0));
  for (const {asset, blob} of restored) { asset.data = objectURL(blob); asset.bytes = blob.size; }
  return p;
}

export async function chooseProjectBackup(project) {
  if (!globalThis.showSaveFilePicker) return false;
  const handle = await showSaveFilePicker({suggestedName: project.title + '.koib',
    types: [{description: 'Koi Maker 串流專案備份', accept: {'application/octet-stream': ['.koib']}}]});
  await writeProjectBackup(project, await handle.createWritable());
  return true;
}
if (typeof window !== 'undefined') window.KoiBackup = {writeProjectBackup, readProjectBackup, chooseProjectBackup};
