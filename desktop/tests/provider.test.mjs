import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { JSDOM, VirtualConsole } from '../../node_modules/jsdom/lib/api.js';
import { ProjectStore } from '../src/project-store.ts';
import * as native from '../renderer/native-storage.mjs';
const fixture = () => ({ id: 'provider', title: '原生儲存驗收', images: [], audio: [], videos: [], fonts: [], settings: {}, variables: { score: 1 }, chapters: [{ id: 'c', title: '序章', events: [{ id: 'a', type: 'dialogue', name: '小春', text: '你好', extension: { keep: true } }, { id: 'end', type: 'end', text: '結束' }] }] });
function bridge(store) {
    return { version: 1,
        project: { begin: p => store.begin(p), commit: t => store.commit(t), abort: t => store.abort(t), load: id => store.load(id), list: () => store.list(), rename: (...a) => store.rename(...a), remove: id => store.remove(id) },
        asset: { begin: (...a) => store.assetBegin(...a), chunk: (t, s, o, c) => store.chunk(t, s, o, Uint8Array.from(c)) },
        disk: { estimate: () => store.disk() }, settings: { getItem: k => store.settingGet(k), setItem: (k, v) => store.settingSet(k, String(v)), removeItem: k => store.settingRemove(k) }, onCommand: () => () => { }
    };
}
function setup(t) { const root = fs.mkdtempSync(path.join(os.tmpdir(), 'koi-provider-')); const store = new ProjectStore(path.join(root, 'user'), path.join(root, 'projects')); globalThis.KoiDesktop = bridge(store); t.after(() => { delete globalThis.KoiDesktop; store.close(); fs.rmSync(root, { recursive: true, force: true }); }); return store; }
test('Renderer provider透過真實SQLite保存及恢復，不呼叫瀏覽器儲存', async (t) => {
    setup(t);
    const denied = () => { throw Error('禁止瀏覽器持久化'); };
    Object.defineProperty(globalThis, 'indexedDB', { get: denied, configurable: true });
    Object.defineProperty(globalThis, 'localStorage', { get: denied, configurable: true });
    t.after(() => { delete globalThis.indexedDB; delete globalThis.localStorage; });
    const p = fixture();
    await native.saveProject(p);
    assert.deepEqual(await native.loadProject(), p);
    p.chapters[0].events[0].text = '更新';
    await native.saveProject(p);
    assert.equal((await native.loadProject()).chapters[0].events[0].text, '更新');
});
test('素材由data URL遷移為原生二進位，重複存檔不重新上傳', async (t) => { const store = setup(t), p = fixture(); p.images = [{ id: 'img', name: 'test.png', data: 'data:image/png;base64,AAECAw==' }]; let uploads = 0; const begin = globalThis.KoiDesktop.asset.begin; globalThis.KoiDesktop.asset.begin = (...a) => { uploads++; return begin(...a); }; await native.saveProject(p); const result = await native.loadProject(); assert.match(result.images[0].data, /^koi:\/\/asset\//); assert.deepEqual(fs.readFileSync(store.resolveAsset(result.images[0].data).file), Buffer.from([0, 1, 2, 3])); await native.saveProject(p); assert.equal(uploads, 1); assert.ok(p.images[0].data.startsWith('data:'), '不直接改寫目前編輯中的專案物件'); });
test('失去preload橋接時停止，不退回IndexedDB', async () => { delete globalThis.KoiDesktop; await assert.rejects(native.initialize(), /橋接未就緒/); });
test('原生素材串流尊重背壓與取消，不預載整個素材', async (t) => {
    const old = globalThis.fetch;
    let pulls = 0, cancelled = false;
    globalThis.fetch = async () => ({ ok: true, body: new ReadableStream({ pull(c) { pulls++; c.enqueue(new Uint8Array(1024)); }, cancel() { cancelled = true; } }, { highWaterMark: 0 }) });
    t.after(() => { globalThis.fetch = old; });
    const file = await native.blobOf({ name: '大素材', data: 'koi://asset/a/b/c', bytes: 100000000, type: 'video/mp4' }), reader = file.stream().getReader();
    await reader.read();
    await new Promise(r => setImmediate(r));
    assert.ok(pulls <= 2, `預讀次數 ${pulls}`);
    await reader.cancel();
    assert.ok(cancelled);
});
test('桌面生成版本沿用相同DOM、CSS和Logo，只變更版本文案與啟動腳本', () => {
    const web = new JSDOM(fs.readFileSync('../dist/index.html', 'utf8')), desktop = new JSDOM(fs.readFileSync('out/renderer/index.html', 'utf8'));
    const normalize = d => { d.querySelectorAll('script').forEach(e => e.remove()); return d.documentElement.outerHTML.replaceAll('0.40.12_r4', 'VERSION').replaceAll('0.41.0 開發驗證版', 'VERSION'); };
    assert.equal(normalize(web.window.document), normalize(desktop.window.document));
    for (const file of ['style.css', 'player.css', 'editor-fixes.css', 'brand.css', 'assets/brand/koi-maker-light.png', 'assets/brand/koi-maker-dark.png'])
        assert.deepEqual(fs.readFileSync('out/renderer/' + file), fs.readFileSync('../dist/' + file));
    web.window.close();
    desktop.window.close();
});
test('同一實際UI在原生provider下切換四模式、Undo/Redo、儲存及重載', async (t) => {
    const store = setup(t), p = fixture();
    store.commit(store.begin(p));
    const errors = [];
    const vc = new VirtualConsole();
    vc.on('jsdomError', e => errors.push(e.message));
    const html = fs.readFileSync('out/renderer/index.html', 'utf8').replace(/<script[^>]*src[^>]*><\/script>/g, '');
    const dom = new JSDOM(html, { url: 'https://desktop.test/', runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole: vc }), w = dom.window, d = w.document;
    t.after(() => dom.window.close());
    w.KoiDesktop = bridge(store);
    for (const name of ['indexedDB', 'localStorage', 'sessionStorage'])
        Object.defineProperty(w, name, { get() { throw Error('桌面版不可存取 ' + name); } });
    w.matchMedia = () => ({ matches: false });
    w.ResizeObserver = class {
        observe() { }
        disconnect() { }
    };
    w.structuredClone = structuredClone;
    w.TextEncoder = TextEncoder;
    w.TextDecoder = TextDecoder;
    w.HTMLMediaElement.prototype.play = () => Promise.resolve();
    w.HTMLMediaElement.prototype.pause = () => { };
    w.HTMLElement.prototype.getBoundingClientRect = () => ({ left: 0, top: 0, width: 1000, height: 700, right: 1000, bottom: 700 });
    w.eval(fs.readFileSync('out/renderer/desktop-bootstrap.js', 'utf8'));
    w.eval(fs.readFileSync('out/renderer/workspace.js', 'utf8'));
    w.eval(fs.readFileSync('out/renderer/app.js', 'utf8') + ';window.__project=()=>project;window.__props=workspaceProps;window.__save=save;');
    await w.KoiReady;
    const until = async (f) => { for (let n = 0; n < 80; n++) {
        if (f())
            return;
        await new Promise(r => setTimeout(r, 20));
    } assert.ok(f(), '介面未在時限內更新'); };
    const before = JSON.stringify(w.__project().chapters);
    for (const mode of ['blocks', 'code', 'flow', 'event']) {
        d.querySelector(`[data-mode=${mode}]`).click();
        await new Promise(r => setTimeout(r, 25));
    }
    assert.equal(JSON.stringify(w.__project().chapters), before);
    w.__props().onPatchEvent(0, { text: '桌面資料更新' });
    d.querySelector('#undo').click();
    assert.equal(w.__project().chapters[0].events[0].text, '你好');
    d.querySelector('#redo').click();
    assert.equal(w.__project().chapters[0].events[0].text, '桌面資料更新');
    await w.__save();
    await until(() => store.load().chapters[0].events[0].text === '桌面資料更新');
    assert.equal(store.load().chapters[0].events[0].extension.keep, true);
    w.__props().onPatchEvent(0, {text:'關閉前的最後修改'});
    assert.equal(await w.KoiDesktopPrepareClose(), true);
    assert.equal(store.load().chapters[0].events[0].text, '關閉前的最後修改');
    const commit = w.KoiDesktop.project.commit;
    w.KoiDesktop.project.commit = async token => {
        const saved = await commit(token);
        w.__props().onPatchEvent(0, {text:'儲存途中又有新修改'});
        return saved;
    };
    assert.equal(await w.KoiDesktopPrepareClose(), false, '仍有新修改時不可允許關閉');
    w.KoiDesktop.project.commit = commit;
    assert.deepEqual(errors, []);
});
