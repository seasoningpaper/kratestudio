import { DatabaseSync } from 'node:sqlite';
import { createHash, randomUUID } from 'node:crypto';
import * as fs from 'node:fs';
import path from 'node:path';
const COLLECTIONS = ['images', 'audio', 'videos', 'fonts'] as const;
type Collection = typeof COLLECTIONS[number];
type Asset = {
    id: string;
    name?: string;
    data?: string;
    mime?: string;
    bytes?: number;
    guid?: string;
    [key: string]: unknown;
};
export type Project = {
    id: string;
    title: string;
    chapters: {
        id: string;
        events: {
            id: string;
            type: string;
            [key: string]: unknown;
        }[];
        [key: string]: unknown;
    }[];
    images?: Asset[];
    audio?: Asset[];
    videos?: Asset[];
    fonts?: Asset[];
    [key: string]: unknown;
};
type AssetWrite = {
    collection: Collection;
    id: string;
    size: number;
    mime: string;
    offset: number;
    fd: number;
    file: string;
    hash: ReturnType<typeof createHash>;
};
type Save = {
    project: Project;
    root: string;
    key: string;
    assets: Map<string, AssetWrite>;
    committed: boolean;
};
const digest = (s: string) => createHash('sha256').update(s).digest('hex');
const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v));
export function validateProject(value: unknown): Project {
    if (!value || typeof value !== 'object' || Array.isArray(value))
        throw Error('專案資料無效');
    const p = value as Project;
    const ids = new Set<string>();
    const id = (s: unknown) => { if (typeof s !== 'string' || !s.trim() || s.length > 512 || ids.has(s))
        throw Error('專案節點ID缺少或重複'); ids.add(s); };
    if (typeof p.id !== 'string' || !p.id || p.id.length > 512 || typeof p.title !== 'string' || p.title.length > 1000 || !Array.isArray(p.chapters) || !p.chapters.length)
        throw Error('專案基本資料無效');
    if (Buffer.byteLength(JSON.stringify(p)) > 32 * 1024 * 1024)
        throw Error('專案結構超過32 MiB安全界線，未寫入');
    for (const c of p.chapters) {
        id(c.id);
        if (!Array.isArray(c.events))
            throw Error('劇情事件清單無效');
        for (const e of c.events) {
            id(e.id);
            if (typeof e.type !== 'string')
                throw Error('事件類型無效');
        }
    }
    for (const c of COLLECTIONS) {
        if (p[c] !== undefined && !Array.isArray(p[c]))
            throw Error('素材清單無效');
        const seen = new Set();
        for (const a of p[c] || []) {
            if (typeof a.id !== 'string' || !a.id || a.id.length > 512 || seen.has(a.id))
                throw Error('素材ID缺少或重複');
            seen.add(a.id);
        }
    }
    return clone(p);
}
export function contained(root: string, ...parts: string[]): string {
    const base = fs.realpathSync(root), target = path.resolve(base, ...parts);
    if (target !== base && !target.startsWith(base + path.sep))
        throw Error('拒絕存取專案以外的路徑');
    let probe = target;
    while (!fs.existsSync(probe))
        probe = path.dirname(probe);
    const real = fs.realpathSync(probe);
    if (real !== base && !real.startsWith(base + path.sep))
        throw Error('拒絕符號連結越界');
    return target;
}
function atomicJSON(file: string, value: unknown) {
    const temp = file + '.tmp-' + randomUUID();
    let fd: number | undefined;
    try {
        fd = fs.openSync(temp, 'wx');
        fs.writeFileSync(fd, JSON.stringify(value, null, 2));
        fs.fsyncSync(fd);
        fs.closeSync(fd); fd = undefined;
        fs.renameSync(temp, file);
    } finally {
        if (fd !== undefined) fs.closeSync(fd);
        // Only this operation's private temporary file may be removed.
        try { fs.unlinkSync(temp); } catch { /* already renamed or inaccessible */ }
    }
}
function connect(file: string) { const db = new DatabaseSync(file, { enableForeignKeyConstraints: true, allowExtension: false }); db.exec('PRAGMA trusted_schema=OFF; PRAGMA journal_mode=WAL; PRAGMA synchronous=FULL; PRAGMA foreign_keys=ON;'); return db; }
function projectDB(root: string) {
    const db = connect(contained(root, 'project.sqlite'));
    const v = Number((db.prepare('PRAGMA user_version').get() as {
        user_version: number;
    }).user_version);
    if (v > 1) {
        db.close();
        throw Error('此專案需要較新版本的Koi Maker，未修改資料');
    }
    if (v === 0)
        db.exec(`BEGIN IMMEDIATE; CREATE TABLE document(id INTEGER PRIMARY KEY CHECK(id=1),revision INTEGER NOT NULL,json TEXT NOT NULL); CREATE TABLE assets(collection TEXT NOT NULL,id TEXT NOT NULL,guid TEXT NOT NULL,hash TEXT NOT NULL,mime TEXT NOT NULL,size INTEGER NOT NULL,PRIMARY KEY(collection,id)); CREATE TABLE asset_versions(guid TEXT NOT NULL,hash TEXT NOT NULL,mime TEXT NOT NULL,size INTEGER NOT NULL,PRIMARY KEY(guid,hash)); PRAGMA user_version=1; COMMIT;`);
    return db;
}
export class ProjectStore {
    readonly catalog: DatabaseSync;
    readonly projectsRoot: string;
    readonly sessions = new Map<string, Save>();
    readonly warnings: string[] = [];
    private closed = false;
    readonly userRoot: string;
    readonly recoveryReport: {id:string; status:'restored'|'incomplete'|'invalid'; message?:string}[] = [];
    constructor(userRoot: string, projectsRoot: string) {
        this.userRoot = userRoot;
        fs.mkdirSync(userRoot, {recursive:true}); fs.mkdirSync(projectsRoot, {recursive:true});
        this.projectsRoot = fs.realpathSync(projectsRoot);
        this.catalog = connect(path.join(userRoot, 'state.sqlite'));
        const version = Number((this.catalog.prepare('PRAGMA user_version').get() as {user_version:number}).user_version);
        if (version > 1) {this.catalog.close(); throw Error('專案索引需要較新版本的Koi Maker');}
        this.catalog.exec(`CREATE TABLE IF NOT EXISTS projects(id TEXT PRIMARY KEY,root TEXT NOT NULL,key TEXT NOT NULL UNIQUE,title TEXT NOT NULL,at INTEGER NOT NULL,deleted INTEGER NOT NULL DEFAULT 0); CREATE TABLE IF NOT EXISTS settings(key TEXT PRIMARY KEY,value TEXT NOT NULL);`);
        if (version === 0) {
            this.catalog.exec('BEGIN IMMEDIATE');
            try {
                const columns = this.catalog.prepare('PRAGMA table_info(projects)').all() as {name:string}[];
                if (!columns.some(c=>c.name==='pending_save')) this.catalog.exec('ALTER TABLE projects ADD COLUMN pending_save INTEGER NOT NULL DEFAULT 0');
                this.catalog.exec('PRAGMA user_version=1; COMMIT');
            } catch(error) { this.catalog.exec('ROLLBACK'); this.catalog.close(); throw error; }
        }
        this.recoverPending();
    }
    private recoverPending() {
        const rows = this.catalog.prepare('SELECT id,root,key FROM projects WHERE pending_save=1').all() as {id:string;root:string;key:string}[];
        for (const row of rows) {
            let db: DatabaseSync | undefined;
            try {
                const root = contained(this.projectsRoot, row.key);
                if (fs.realpathSync(row.root) !== fs.realpathSync(root)) throw Error('專案路徑不一致');
                const file = contained(root,'project.sqlite');
                if (!fs.existsSync(file)) {this.recoveryReport.push({id:row.id,status:'incomplete'});continue;}
                db = new DatabaseSync(file,{readOnly:true,allowExtension:false});
                const schema = Number((db.prepare('PRAGMA user_version').get() as {user_version:number}).user_version);
                if (schema !== 1 || Object.values(db.prepare('PRAGMA quick_check').get()||{})[0] !== 'ok') throw Error('資料庫結構或完整性檢查失敗');
                const doc = db.prepare('SELECT json FROM document WHERE id=1').get() as {json:string}|undefined;
                if (!doc) {this.recoveryReport.push({id:row.id,status:'incomplete'});continue;}
                const project = validateProject(JSON.parse(doc.json));
                if (project.id !== row.id) throw Error('專案識別不一致');
                for (const c of COLLECTIONS) for (const a of project[c]||[]) {
                    const uri = this.parseAsset(a.data||'');
                    if (uri.key !== row.key || uri.guid !== digest(c+'\0'+a.id)) throw Error('素材身分不一致');
                    const asset = db.prepare('SELECT hash,size FROM assets WHERE collection=? AND id=?').get(c,a.id) as {hash:string;size:number}|undefined;
                    if (!asset || asset.hash !== uri.hash || fs.statSync(contained(root,'assets',asset.hash)).size !== asset.size) throw Error('素材缺失或不完整');
                }
                this.catalog.exec('BEGIN IMMEDIATE');
                try {
                    this.catalog.prepare('UPDATE projects SET title=?,at=?,deleted=0,pending_save=0 WHERE id=?').run(project.title,Date.now(),row.id);
                    if (!this.settingGet('desktop:current')) this.settingSet('desktop:current',row.id);
                    this.catalog.exec('COMMIT');
                } catch(error) {this.catalog.exec('ROLLBACK');throw error;}
                this.recoveryReport.push({id:row.id,status:'restored'});
            } catch(error) {
                this.recoveryReport.push({id:row.id,status:'invalid',message:error instanceof Error?error.message:'無法恢復專案'});
            } finally {db?.close();}
        }
        if (this.recoveryReport.length) {
            try {atomicJSON(path.join(this.userRoot,'recovery-report.json'),{at:Date.now(),projects:this.recoveryReport});}
            catch {this.warnings.push('恢復報告無法寫入，原始資料保留。');}
        }
    }
    settingGet(key: string) { this.checkKey(key); return (this.catalog.prepare('SELECT value FROM settings WHERE key=?').get(key) as {
        value: string;
    } | undefined)?.value ?? null; }
    settingSet(key: string, value: string) { this.checkKey(key); if (typeof value !== 'string' || Buffer.byteLength(value) > 8 * 1024 * 1024)
        throw Error('設定或存檔超過8 MiB，原資料保留'); this.catalog.prepare('INSERT INTO settings VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value').run(key, value); }
    settingRemove(key: string) { this.checkKey(key); this.catalog.prepare('DELETE FROM settings WHERE key=?').run(key); }
    private checkKey(key: string) { if (typeof key !== 'string' || !key || key.length > 512 || key.includes('\0'))
        throw Error('儲存鍵無效'); }
    private project(id: string) { const row = this.catalog.prepare('SELECT * FROM projects WHERE id=? AND deleted=0').get(id) as {
        id: string;
        root: string;
        key: string;
        title: string;
        at: number;
    } | undefined; if (!row)
        throw Error('找不到已授權的專案'); return row; }
    private register(p: Project) { let row = this.catalog.prepare('SELECT * FROM projects WHERE id=?').get(p.id) as {
        root: string;
        key: string;
    } | undefined; if (!row) {
        const key = randomUUID(), root = contained(this.projectsRoot, key);
        fs.mkdirSync(root);
        for (const d of ['scripts', 'assets', 'saves', 'backups', '.pending'])
            fs.mkdirSync(path.join(root, d));
        this.catalog.prepare('INSERT INTO projects(id,root,key,title,at,deleted,pending_save) VALUES(?,?,?,?,?,1,1)').run(p.id, root, key, p.title, Date.now());
        row = { root, key };
    } return row; }
    begin(value: unknown) { const project = validateProject(value); if ([...this.sessions.values()].some(s => s.project.id === project.id))
        throw Error('同一專案已有儲存交易進行中'); if (this.sessions.size >= 2)
        throw Error('已有儲存交易進行中'); const row = this.register(project), token = randomUUID(); fs.mkdirSync(contained(row.root, '.pending', token)); this.catalog.prepare('UPDATE projects SET pending_save=1 WHERE id=?').run(project.id); this.sessions.set(token, { project, root: row.root, key: row.key, assets: new Map(), committed:false }); return token; }
    assetBegin(token: string, collection: Collection, id: string, size: number, mime: string) { const s = this.session(token); if (!COLLECTIONS.includes(collection) || !(s.project[collection] || []).some(a => a.id === id) || !Number.isSafeInteger(size) || size < 0 || size > 5e9 || !/^[-\w.+]+\/[-\w.+]+$/.test(mime))
        throw Error('素材描述無效'); const slot = collection + ':' + id; if (s.assets.has(slot))
        throw Error('素材重複寫入'); if (this.disk().browserAvailable < size + 1024 * 1024)
        throw Error('磁碟空間不足，原專案保留'); const total = [...s.assets.values()].reduce((n, a) => n + a.size, 0) + size; if (total > 5e9)
        throw Error('素材總量超過5 GB安全界線'); const ticket = randomUUID(), file = contained(s.root, '.pending', token, ticket), fd = fs.openSync(file, 'wx'); s.assets.set(slot, { collection, id, size, mime, offset: 0, fd, file, hash: createHash('sha256') }); return slot; }
    chunk(token: string, slot: string, offset: number, data: Uint8Array) { const s = this.session(token), a = s.assets.get(slot); if (!a || a.fd < 0 || !(data instanceof Uint8Array) || data.byteLength > 1024 * 1024 || offset !== a.offset || offset + data.byteLength > a.size)
        throw Error('素材分段或順序無效'); let done = 0; while (done < data.length)
        done += fs.writeSync(a.fd, data, done, data.length - done); a.hash.update(data); a.offset += data.length; return a.offset; }
    private session(token: string) { const s = this.sessions.get(token); if (!s)
        throw Error('儲存交易已失效'); return s; }
    abort(token: string) { const s = this.sessions.get(token); if (!s)
        return; for (const a of s.assets.values())
        if (a.fd >= 0) {
            fs.closeSync(a.fd);
            a.fd = -1;
        } if(!s.committed)this.catalog.prepare('UPDATE projects SET pending_save=0 WHERE id=?').run(s.project.id); this.sessions.delete(token); /* pending files retained for diagnosis; never delete committed data */ }
    commit(token: string) {
        const s = this.session(token), p = s.project;
        let db: DatabaseSync | undefined;
        try {
            db = projectDB(s.root);
            const descriptors: {
                c: Collection;
                a: Asset;
                guid: string;
                hash: string;
                mime: string;
                size: number;
            }[] = [];
            for (const c of COLLECTIONS)
                for (const a of p[c] || []) {
                    const guid = digest(c + '\0' + a.id), write = s.assets.get(c + ':' + a.id);
                    let hash, mime, size;
                    if (write) {
                        if (write.offset !== write.size)
                            throw Error('素材未完整寫入');
                        fs.fsyncSync(write.fd);
                        fs.closeSync(write.fd);
                        write.fd = -1;
                        hash = write.hash.digest('hex');
                        mime = write.mime;
                        size = write.size;
                        const dest = contained(s.root, 'assets', hash);
                        if (!fs.existsSync(dest))
                            fs.renameSync(write.file, dest);
                        else {
                            if (fs.statSync(dest).size !== size)
                                throw Error('素材雜湊檔案大小不一致');
                            fs.unlinkSync(write.file);
                        }
                    }
                    else {
                        const u = this.parseAsset(a.data || '');
                        const old = this.resolveAsset(a.data || '');
                        hash = u.hash;
                        mime = old.mime;
                        size = old.size;
                        if (fs.statSync(old.file).size !== size)
                            throw Error('素材檔案不完整');
                        const dest = contained(s.root, 'assets', hash);
                        if (!fs.existsSync(dest)) {
                            if (this.disk().browserAvailable < size + 1024 * 1024)
                                throw Error('磁碟空間不足');
                            fs.copyFileSync(old.file, dest, fs.constants.COPYFILE_EXCL);
                        }
                    }
                    a.guid = guid;
                    a.bytes = size;
                    a.mime = mime;
                    a.data = this.assetURL(s.key, guid, hash);
                    delete a.storageKey;
                    delete a.thumbnail;
                    descriptors.push({ c, a, guid, hash, mime, size });
                }
            if (descriptors.reduce((n, d) => n + d.size, Buffer.byteLength(JSON.stringify(p))) > 5e9)
                throw Error('專案超過5 GB安全界線');
            const revision = Number((db.prepare('SELECT revision FROM document WHERE id=1').get() as {
                revision: number;
            } | undefined)?.revision || 0) + 1;
            db.exec('BEGIN IMMEDIATE');
            try {
                db.prepare('DELETE FROM assets').run();
                for (const d of descriptors) {
                    db.prepare('INSERT INTO assets VALUES(?,?,?,?,?,?)').run(d.c, d.a.id, d.guid, d.hash, d.mime, d.size);
                    db.prepare('INSERT OR IGNORE INTO asset_versions VALUES(?,?,?,?)').run(d.guid, d.hash, d.mime, d.size);
                }
                db.prepare('INSERT INTO document VALUES(1,?,?) ON CONFLICT(id) DO UPDATE SET revision=excluded.revision,json=excluded.json').run(revision, JSON.stringify(p));
                db.exec('COMMIT');
                s.committed = true;
            }
            catch (e) {
                db.exec('ROLLBACK');
                throw e;
            }
            const warning = this.writeMirror(s.root, p, revision);
            db.exec('PRAGMA wal_checkpoint(FULL)');
            this.catalog.prepare('UPDATE projects SET title=?,at=?,deleted=0,pending_save=0 WHERE id=?').run(p.title, Date.now(), p.id);
            this.settingSet('desktop:current', p.id);
            this.sessions.delete(token);
            return { bytes: descriptors.reduce((n, a) => n + a.size, Buffer.byteLength(JSON.stringify(p))), at: Date.now(), revision, warning, assets: descriptors.map(d => ({ collection: d.c, id: d.a.id, data: d.a.data, bytes: d.size, mime: d.mime })) };
        }
        catch (e) {
            this.abort(token);
            throw e;
        }
        finally {
            db?.close();
        }
    }
    private writeMirror(root: string, project: Project, revision: number) {
        try {
            atomicJSON(contained(root, 'project.json'), {format:'koi-maker-project',schemaVersion:1,revision,project});
        } catch {
            const warning = 'SQLite主資料保留，project.json副本無法更新，請檢查檔案權限或同名資料夾。';
            if (this.warnings.length >= 50) this.warnings.shift();
            this.warnings.push(warning);
            return warning;
        }
    }
    load(id?: string) { const target = id || this.settingGet('desktop:current'); if (!target)
        return null; const row = this.project(target), db = projectDB(row.root); try {
        const doc = db.prepare('SELECT * FROM document WHERE id=1').get() as {
            revision: number;
            json: string;
        } | undefined;
        if (!doc)
            return null;
        const p = validateProject(JSON.parse(doc.json));
        for (const c of COLLECTIONS)
            for (const a of p[c] || []) {
                const asset = this.resolveAsset(a.data || '');
                if (fs.statSync(asset.file).size !== asset.size)
                    throw Error('素材遺失或大小不符：' + a.id);
            }
        this.writeMirror(row.root, p, doc.revision);
        return p;
    }
    finally {
        db.close();
    } }
    list() { return this.catalog.prepare('SELECT id,title,at,at AS createdAt FROM projects WHERE deleted=0 ORDER BY at').all(); }
    rename(id: string, title: string) { if (typeof title !== 'string' || !title.trim() || title.length > 1000)
        throw Error('專案名稱無效'); const row = this.project(id), db = projectDB(row.root); try {
        const doc = db.prepare('SELECT revision,json FROM document WHERE id=1').get() as {
            revision: number;
            json: string;
        } | undefined;
        if (!doc)
            throw Error('專案尚未完成儲存');
        const p = JSON.parse(doc.json);
        p.title = title;
        db.prepare('UPDATE document SET json=?,revision=? WHERE id=1').run(JSON.stringify(p), doc.revision + 1);
        this.writeMirror(row.root, p, doc.revision + 1);
        this.catalog.prepare('UPDATE projects SET title=? WHERE id=?').run(title, id);
    }
    finally {
        db.close();
    } }
    remove(id: string) { if (id === this.settingGet('desktop:current'))
        throw Error('請先切換到其他專案'); this.project(id); this.catalog.prepare('UPDATE projects SET deleted=1 WHERE id=?').run(id); /* recycle only: original project/assets stay intact */ }
    private assetURL(key: string, guid: string, hash: string) { return `koi://asset/${key}/${guid}/${hash}`; }
    private parseAsset(value: string) { const u = new URL(value); const [key, guid, hash, ...rest] = u.pathname.slice(1).split('/'); if (u.protocol !== 'koi:' || u.hostname !== 'asset' || rest.length || !/^[-\da-f]{36}$/.test(key) || !/^[\da-f]{64}$/.test(guid) || !/^[\da-f]{64}$/.test(hash) || u.search || u.hash)
        throw Error('素材網址無效'); return { key, guid, hash }; }
    resolveAsset(value: string): {
        file: string;
        mime: string;
        size: number;
    } { const { key, guid, hash } = this.parseAsset(value), r = this.catalog.prepare('SELECT root FROM projects WHERE key=? AND deleted=0').get(key) as {
        root: string;
    } | undefined; if (!r)
        throw Error('專案未授權'); const db = projectDB(r.root); try {
        const a = db.prepare('SELECT mime,size FROM asset_versions WHERE guid=? AND hash=?').get(guid, hash) as {
            mime: string;
            size: number;
        } | undefined;
        if (!a)
            throw Error('素材未授權');
        return { file: contained(r.root, 'assets', hash), ...a };
    }
    finally {
        db.close();
    } }
    disk() { const s = fs.statfsSync(this.projectsRoot); return { browserQuota: Number(s.blocks) * Number(s.bsize), browserUsage: Number(s.blocks - s.bavail) * Number(s.bsize), browserAvailable: Number(s.bavail) * Number(s.bsize) }; }
    close() { if (this.closed)
        return; this.closed = true; for (const token of this.sessions.keys())
        this.abort(token); this.catalog.close(); }
}
