import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { ProjectStore, contained, validateProject, type Project } from '../src/project-store.ts';
import { isApplicationURL } from '../src/security.ts';
const project = (): Project => ({ id: '專案 ../ 不可作為檔案路徑', title: '測試專案', chapters: [
        { id: 'chapter', events: [{ id: 'event', type: 'dialogue', text: '你好', extension: { keep: true }, blockPos: { x: 4, y: 8 } }] }
    ], images: [], audio: [], videos: [], fonts: [], extension: { version: 999 } });
function fixture(t: any) { const root = fs.mkdtempSync(path.join(os.tmpdir(), 'koi-native-')); const s = new ProjectStore(path.join(root, 'user'), path.join(root, 'projects')); t.after(() => { s.close(); fs.rmSync(root, { recursive: true, force: true }); }); return { root, s }; }
function save(s: ProjectStore, p = project()) { const token = s.begin(p); return s.commit(token); }
function image(s: ProjectStore, p: Project, bytes = Buffer.from([0, 255, 1, 2])) {
    p.images = [{ id: '素材/../same', name: '立繪.png', custom: { preserve: true } }];
    const token = s.begin(p), slot = s.assetBegin(token, 'images', p.images[0].id, bytes.length, 'image/png');
    s.chunk(token, slot, 0, bytes.subarray(0, 2));
    s.chunk(token, slot, 2, bytes.subarray(2));
    return { token, bytes };
}
test('真實SQLite保存、關閉及重開後完整保留事件ID與未知欄位', t => { const { root, s } = fixture(t); save(s); const expected = project(); assert.deepEqual(s.load(), expected); s.close(); const reopened = new ProjectStore(path.join(root, 'user'), path.join(root, 'projects')); try {
    assert.deepEqual(reopened.load(), expected);
}
finally {
    reopened.close();
} });
test('專案資料夾與預期目錄存在，使用者ID不構成路徑', t => { const { root, s } = fixture(t); save(s); const dirs = fs.readdirSync(path.join(root, 'projects')); assert.equal(dirs.length, 1); assert.match(dirs[0], /^[a-f0-9-]{36}$/); for (const entry of ['project.json', 'project.sqlite', 'scripts', 'assets', 'saves', 'backups'])
    assert.ok(fs.existsSync(path.join(root, 'projects', dirs[0], entry))); });
test('重複事件ID、錯誤集合及未知結構明確拒絕', () => { const p = project(); p.chapters[0].events.push({ ...p.chapters[0].events[0] }); assert.throws(() => validateProject(p), /重複/); assert.throws(() => validateProject(null)); assert.throws(() => validateProject({ ...project(), images: {} })); });
test('分段二進位素材真正落盤且重新讀取一致', t => { const { s } = fixture(t), p = project(), { token, bytes } = image(s, p); const result = s.commit(token), loaded = s.load()!; assert.equal(result.revision, 1); assert.deepEqual(loaded.images![0].custom, { preserve: true }); const a = s.resolveAsset(loaded.images![0].data!); assert.deepEqual(fs.readFileSync(a.file), bytes); assert.equal(a.size, 4); });
test('素材舊版本保留，Undo後可重新引用舊內容', t => { const { s } = fixture(t); let p = project(); let x = image(s, p); s.commit(x.token); const old = s.load()!; p = structuredClone(old); x = image(s, p, Buffer.from([4, 5, 6, 7])); s.commit(x.token); assert.notEqual(s.load()!.images![0].data, old.images![0].data); save(s, old); assert.equal(s.load()!.images![0].data, old.images![0].data); });
test('取消及未寫完的交易不覆寫舊事件或素材', t => { const { s } = fixture(t); save(s); const before = s.load(); let p = project(); p.title = '不應儲存'; let token = s.begin(p); s.abort(token); assert.deepEqual(s.load(), before); p.images = [{ id: 'image' }]; token = s.begin(p); s.assetBegin(token, 'images', 'image', 4, 'image/png'); assert.throws(() => s.commit(token), /未完整/); assert.deepEqual(s.load(), before); });
test('新專案取消後不出現在專案清單', t => { const { s } = fixture(t); const token = s.begin(project()); s.abort(token); assert.deepEqual(s.list(), []); assert.equal(s.load(), null); });
test('拒絕重複交易、重複分段與過大分段', t => { const { s } = fixture(t), p = project(); p.images = [{ id: 'image' }]; const token = s.begin(p), slot = s.assetBegin(token, 'images', 'image', 4, 'image/png'); assert.throws(() => s.begin(p), /同一專案/); s.chunk(token, slot, 0, Buffer.from([0, 1])); assert.throws(() => s.chunk(token, slot, 0, Buffer.from([0, 1]))); assert.throws(() => s.chunk(token, slot, 2, new Uint8Array(1024 * 1024 + 1))); assert.throws(() => s.assetBegin(token, 'images', 'image', 4, 'image/png')); });
test('配額不足在寫入前拒絕且保留原專案', t => { const { s } = fixture(t); save(s); const before = s.load(), p = project(); p.images = [{ id: 'image' }]; const token = s.begin(p); s.disk = () => ({ browserAvailable: 0, browserQuota: 0, browserUsage: 0 }); assert.throws(() => s.assetBegin(token, 'images', 'image', 4, 'image/png'), /磁碟空間不足/); s.abort(token); assert.deepEqual(s.load(), before); });
test('5GB邊界拒絕不是大量占用磁碟的假壓測', t => { const { s } = fixture(t), p = project(); p.images = [{ id: 'image' }]; const token = s.begin(p); assert.throws(() => s.assetBegin(token, 'images', 'image', 5000000001, 'image/png'), /描述無效/); });
test('複製專案會複製已授權素材且保留獨立狀態', t => { const { s } = fixture(t), p = project(), { token } = image(s, p); s.commit(token); const original = s.load()!, copy = structuredClone(original); copy.id = 'copy'; copy.title = '副本'; save(s, copy); assert.notEqual(s.load()!.images![0].data, original.images![0].data); assert.deepEqual(fs.readFileSync(s.resolveAsset(s.load()!.images![0].data!).file), Buffer.from([0, 255, 1, 2])); assert.equal(s.load(original.id)!.title, original.title); });
test('未知或外部素材參照不允許讀取檔案', t => { const { s } = fixture(t); for (const url of ['file:///etc/passwd', 'https://example.com/a', 'koi://asset/../../etc/passwd'])
    assert.throws(() => s.resolveAsset(url)); assert.throws(() => s.load('../secret')); });
test('路徑穿越及符號連結穿越拒絕', t => { const { root } = fixture(t); const base = path.join(root, 'base'), outside = path.join(root, 'outside'); fs.mkdirSync(base); fs.mkdirSync(outside); assert.throws(() => contained(base, '..', 'outside')); fs.symlinkSync(outside, path.join(base, 'link'), process.platform === 'win32' ? 'junction' : 'dir'); assert.throws(() => contained(base, 'link', 'new')); });
test('新版本SQLite拒絕載入且原document不變', t => { const { s } = fixture(t); save(s); const row = s.catalog.prepare('SELECT root FROM projects').get() as {
    root: string;
}; const db = new DatabaseSync(path.join(row.root, 'project.sqlite')); const before = db.prepare('SELECT json FROM document').get(); db.exec('PRAGMA user_version=999'); db.close(); assert.throws(() => s.load(), /較新版本/); const check = new DatabaseSync(path.join(row.root, 'project.sqlite')); try {
    assert.deepEqual(check.prepare('SELECT json FROM document').get(), before);
}
finally {
    check.close();
} });
test('JSON鏡像損壞由SQLite主資料恢復', t => { const { s } = fixture(t); save(s); const row = s.catalog.prepare('SELECT root FROM projects').get() as {
    root: string;
}; fs.writeFileSync(path.join(row.root, 'project.json'), 'broken'); assert.deepEqual(s.load(), project()); assert.equal(JSON.parse(fs.readFileSync(path.join(row.root, 'project.json'), 'utf8')).project.id, project().id); });
test('偏好、遊戲存檔及解鎖鍵維持原名稱並存入SQLite', t => { const { s } = fixture(t); for (const key of ['koi-game-test-slots', 'koi-game-test-meta', 'koi-sidebar-closed']) {
    s.settingSet(key, JSON.stringify({ position: 42 }));
    assert.deepEqual(JSON.parse(s.settingGet(key)!), { position: 42 });
} assert.throws(() => s.settingSet('x', 'a'.repeat(8 * 1024 * 1024 + 1))); s.settingRemove('koi-sidebar-closed'); assert.equal(s.settingGet('koi-sidebar-closed'), null); });
test('刪除專案僅回收、不刪除素材或專案檔案', t => { const { s } = fixture(t); save(s); const old = project().id; const row = s.catalog.prepare('SELECT root FROM projects').get() as {
    root: string;
}; save(s, { ...project(), id: 'next' }); s.remove(old); assert.equal(s.list().length, 1); assert.ok(fs.existsSync(path.join(row.root, 'project.sqlite'))); assert.throws(() => s.load(old)); });
test('IPC只允許主程式URL，拒絕外部頁、子路徑、帳密與無效URL', () => { assert.ok(isApplicationURL('koi://app/index.html')); for (const url of ['koi://app.evil/index.html', 'koi://evil@app/index.html', 'file:///index.html', 'https://app/index.html', 'koi://app/other.html', 'koi://app/index.html?x=1', 'bad'])
    assert.equal(isApplicationURL(url), false, url); });
