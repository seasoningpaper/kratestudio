// Desktop-specific module binding. Browser source and storage keys stay intact.
import * as web from '../../src/storage.mjs';
export * from '../../src/storage.mjs';
const api = () => { if (globalThis.KoiDesktop?.version !== 1)
    throw Error('原生儲存橋接未就緒，桌面版禁止退回瀏覽器儲存'); return globalThis.KoiDesktop; };
export const LIMIT = 5000000000, WRITE_LIMIT = LIMIT;
export const projectWriteLimit = () => LIMIT, isLargeProject = () => false;
export function assertWritableProjectSize(bytes) { if (!Number.isSafeInteger(bytes) || bytes < 0 || bytes > LIMIT)
    throw Error('原生專案容量無效或超過5 GB'); }
export async function blobOf(asset) {
    if (!asset.data?.startsWith('koi://asset/'))
        return web.blobOf(asset);
    const source = asset.data;
    return { size: asset.bytes, type: asset.mime || 'application/octet-stream', stream() {
            let reader, opening;
            const abort = new AbortController();
            return new ReadableStream({ async pull(controller) {
                    try {
                        opening ||= fetch(source, { signal: abort.signal }).then(r => { if (!r.ok || !r.body)
                            throw Error('素材讀取失敗：' + asset.name); return r.body.getReader(); });
                        reader ||= await opening;
                        const { done, value } = await reader.read();
                        if (done) {
                            reader.releaseLock();
                            controller.close();
                        }
                        else
                            controller.enqueue(value);
                    }
                    catch (error) {
                        controller.error(error);
                    }
                }, async cancel(reason) { abort.abort(); await reader?.cancel(reason).catch(() => { }); } }, { highWaterMark: 1 });
        }, async arrayBuffer() { const r = await fetch(source); if (!r.ok)
            throw Error('素材讀取失敗'); return r.arrayBuffer(); } };
}
export async function measureProject(p) { const record = web.metadata(p), rows = []; for (const collection of ['images', 'audio', 'videos', 'fonts'])
    for (const asset of p[collection] || []) {
        const blob = await blobOf(asset);
        const stored = record[collection].find(a => a.id === asset.id);
        stored.bytes = blob.size;
        rows.push({ collection, asset, blob, source: asset.data, bytes: blob.size, key: stored.storageKey });
    } const { capacityBreakdown } = await import('../../src/storage-capacity.mjs'); return { record, rows, ...capacityBreakdown(p, new Blob([JSON.stringify(record)]).size, rows) }; }
export async function usage(p) { return (await measureProject(p)).bytes; }
export const storageEstimate = () => api().disk.estimate();
export async function estimate(p) { const x = await measureProject(p); return { bytes: x.bytes, metadataBytes: x.metadataBytes, categories: x.categories, limit: LIMIT, writeLimit: LIMIT, experimental: false, ...await storageEstimate() }; }
export const persist = async () => true;
let queue = Promise.resolve();
const savedAssets = new Map();
export function saveProject(p) {
    const snapshot = JSON.parse(JSON.stringify(p));
    // Match the committed bytes to this immutable save request, never to the
    // live project, which may already contain the user's next image edit.
    const sources = new Map();
    for (const collection of ['images', 'audio', 'videos', 'fonts'])
        for (const asset of snapshot[collection] || [])
            sources.set(JSON.stringify([snapshot.id, collection, asset.id]), asset.data);
    const pending = queue.then(async () => {
        for (const c of ['images', 'audio', 'videos', 'fonts'])
            for (const a of snapshot[c] || []) {
                const old = savedAssets.get(JSON.stringify([snapshot.id, c, a.id]));
                if (old?.source === a.data)
                    Object.assign(a, old.native);
            }
        const measured = await measureProject(snapshot);
        assertWritableProjectSize(measured.bytes);
        const disk = await storageEstimate();
        const added = measured.rows.filter(r => !r.source?.startsWith('koi://asset/')).reduce((n, r) => n + r.bytes, 0);
        if (disk.browserAvailable < added + measured.metadataBytes * 2)
            throw Error('磁碟空間不足，原專案保留');
        const clean = JSON.parse(JSON.stringify(snapshot));
        for (const c of ['images', 'audio', 'videos', 'fonts'])
            for (const a of clean[c] || [])
                if (!a.data?.startsWith('koi://asset/'))
                    delete a.data;
        const token = await api().project.begin(clean);
        try {
            for (const { collection, asset, blob, source } of measured.rows) {
                if (source?.startsWith('koi://asset/'))
                    continue;
                const slot = await api().asset.begin(token, collection, asset.id, blob.size, blob.type || 'application/octet-stream'), reader = blob.stream().getReader();
                let offset = 0;
                try {
                    for (;;) {
                        const { done, value } = await reader.read();
                        if (done)
                            break;
                        for (let n = 0; n < value.length; n += 64 * 1024) {
                            const chunk = value.subarray(n, n + 64 * 1024);
                            offset = await api().asset.chunk(token, slot, offset, chunk);
                        }
                    }
                }
                finally {
                    await reader.cancel().catch(() => { });
                    reader.releaseLock();
                }
            }
            const result = await api().project.commit(token);
            for (const a of result.assets || []) {
                const key = JSON.stringify([snapshot.id, a.collection, a.id]);
                if (sources.has(key))
                    savedAssets.set(key, { source: sources.get(key), native: { data: a.data, bytes: a.bytes, mime: a.mime } });
            }
            if (result.warning)
                console.warn(result.warning);
            return result;
        }
        catch (error) {
            await api().project.abort(token);
            throw error;
        }
    });
    queue = pending.catch(() => { });
    return pending;
}
export const loadProject = id => api().project.load(id);
export const listProjects = () => api().project.list();
export const renameProject = (id, title) => api().project.rename(id, title);
export const deleteProject = id => api().project.remove(id);
export const initialize = async () => ({ project: await loadProject(), migrated: false });
export async function portable(p) { const { assertBufferedExport } = await import('../../src/storage-policy.mjs'); assertBufferedExport(await usage(p)); const out = JSON.parse(JSON.stringify(p)); for (const c of ['images', 'audio', 'videos', 'fonts'])
    for (let i = 0; i < (out[c] || []).length; i++) {
        let b = await blobOf(p[c][i]);
        if (!(b instanceof Blob))
            b = new Blob([await b.arrayBuffer()], { type: b.type });
        out[c][i].data = await web.dataURL(b);
        delete out[c][i].storageKey;
    } return out; }
if (typeof window !== 'undefined')
    Object.assign(window.KoiStorage, { LIMIT, WRITE_LIMIT, projectWriteLimit, isLargeProject, assertWritableProjectSize, blobOf, measureProject, usage, estimate, storageEstimate, persist, saveProject, loadProject, listProjects, renameProject, deleteProject, initialize, portable });
