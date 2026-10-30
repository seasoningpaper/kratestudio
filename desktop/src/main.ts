import { app, BrowserWindow, Menu, ipcMain, protocol, dialog } from 'electron';
import path from 'node:path';
import fs from 'node:fs';
import { Readable } from 'node:stream';
import { ProjectStore, contained } from './project-store.ts';
import { isApplicationURL } from './security.ts';
import {randomUUID} from 'node:crypto';
import {CloseGuard, SaveHandshake} from './close-guard.ts';
protocol.registerSchemesAsPrivileged([{ scheme: 'koi', privileges: { standard: true, secure: true, supportFetchAPI: true, stream: true, corsEnabled: true } }]);
let window: BrowserWindow;
let store: ProjectStore;
const rendererRoot = path.join(__dirname, 'renderer');
const mime: Record<string, string> = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.txt': 'text/plain; charset=utf-8', '.md': 'text/plain; charset=utf-8' };
export function trusted(event: Electron.IpcMainEvent | Electron.IpcMainInvokeEvent) { if (!window || event.sender !== window.webContents || event.senderFrame !== window.webContents.mainFrame || !isApplicationURL(event.senderFrame.url))
    throw Error('拒絕未授權IPC來源'); }
async function start() {
    store = new ProjectStore(app.getPath('userData'), path.join(app.getPath('documents'), 'Koi Maker', 'projects'));
    protocol.handle('koi', request => {
        try {
            if (request.method !== 'GET' && request.method !== 'HEAD')
                return new Response(null, { status: 405 });
            const url = new URL(request.url);
            let file: string, type: string, size: number;
            if (url.hostname === 'app') {
                const rel = decodeURIComponent(url.pathname).replace(/^\//, '') || 'index.html';
                if (rel.includes('\\') || rel.includes('\0'))
                    throw Error('路徑無效');
                file = contained(rendererRoot, rel);
                size = fs.statSync(file).size;
                type = mime[path.extname(file)] || 'application/octet-stream';
            }
            else if (url.hostname === 'asset') {
                const a = store.resolveAsset(request.url);
                file = a.file;
                type = a.mime;
                size = a.size;
            }
            else
                throw Error('來源無效');
            let start = 0, end = size - 1, status = 200;
            const range = request.headers.get('Range');
            if (range) {
                const m = /^bytes=(\d+)-(\d*)$/.exec(range);
                if (!m)
                    return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${size}` } });
                start = Number(m[1]);
                end = m[2] ? Math.min(size - 1, Number(m[2])) : size - 1;
                if (start > end || start >= size)
                    return new Response(null, { status: 416 });
                status = 206;
            }
            const headers: Record<string, string> = { 'Content-Type': type, 'Content-Length': String(Math.max(0, end - start + 1)), 'Accept-Ranges': 'bytes', 'Access-Control-Allow-Origin': 'koi://app', 'Vary': 'Origin', 'X-Content-Type-Options': 'nosniff', 'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' koi: data: blob:; media-src 'self' koi: data: blob:; font-src 'self' koi: data: blob:; connect-src 'self' koi:; frame-src 'self' blob:; object-src 'none'; base-uri 'none'" };
            if (status === 206)
                headers['Content-Range'] = `bytes ${start}-${end}/${size}`;
            return new Response(request.method === 'HEAD' || !size ? null : Readable.toWeb(fs.createReadStream(file, { start, end })) as ReadableStream, { status, headers });
        }
        catch {
            return new Response('無法讀取已授權檔案', { status: 404 });
        }
    });
    window = new BrowserWindow({ width: 1440, height: 960, minWidth: 800, minHeight: 600, show: false, backgroundColor: '#ffffff', webPreferences: { preload: path.join(__dirname, 'preload.cjs'), contextIsolation: true, sandbox: true, nodeIntegration: false, webSecurity: true, allowRunningInsecureContent: false, spellcheck: false } });
    window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
    window.webContents.on('will-navigate', (event, url) => { if (url !== 'koi://app/index.html')
        event.preventDefault(); });
    window.webContents.session.setPermissionRequestHandler((_w, _p, callback) => callback(false));
    window.webContents.session.on('will-download', (_event, item) => { item.setSaveDialogOptions({ title: '儲存Koi Maker輸出檔案' }); });
    const handshake = new SaveHandshake({id:randomUUID,send:requestId=>
        window.webContents.send('koi:command',{action:'prepare-close',requestId})});
    const closeGuard = new CloseGuard({save:()=>handshake.request(),choose:async()=>{
        const result = await dialog.showMessageBox(window,{type:'warning',
            title:'尚未確認儲存完成',message:'專案尚未確認安全儲存，請選擇下一步。',
            buttons:['留在程式','重試儲存','不儲存並離開'],defaultId:0,cancelId:0,noLink:true});
        return (['cancel','retry','discard'] as const)[result.response] ?? 'cancel';
    }});
    let closeAllowed = false, closePending = false;
    window.on('close',event=>{
        if(closeAllowed)return;
        event.preventDefault();
        if(closePending)return;
        closePending=true;
        void closeGuard.request().then(allowed=>{
            if(allowed&&!window.isDestroyed()){closeAllowed=true;window.close();}
        }).catch(()=>{}).finally(()=>{closePending=false;});
    });
    const methods: Record<string, (...args: any[]) => unknown> = {
        'project.status':()=>({warnings:[...store.warnings],recovery:[...store.recoveryReport]}),
        'window.saved': (requestId,saved)=>handshake.acknowledge(requestId,saved),
        'project.begin': p => store.begin(p), 'asset.begin': (...args) => store.assetBegin(args[0], args[1], args[2], args[3], args[4]), 'asset.chunk': (...args) => store.chunk(args[0], args[1], args[2], args[3]), 'project.commit': t => store.commit(t), 'project.abort': t => store.abort(t), 'project.load': id => store.load(id), 'project.list': () => store.list(), 'project.rename': (id, title) => store.rename(id, title), 'project.remove': id => store.remove(id), 'disk.estimate': () => store.disk()
    };
    ipcMain.handle('koi:call', (event, method: unknown, args: unknown) => { trusted(event); if (typeof method !== 'string' || !Object.hasOwn(methods, method) || !Array.isArray(args) || args.length > 6)
        throw Error('IPC方法或參數無效'); return methods[method](...args); });
    ipcMain.on('koi:settings', (event, args: unknown) => { try {
        trusted(event);
        if (!Array.isArray(args) || args.length > 3)
            throw Error('設定參數無效');
        const [op, key, value] = args;
        if (typeof key !== 'string')
            throw Error('設定鍵無效');
        if (op === 'get')
            event.returnValue = { value: store.settingGet(key) };
        else if (op === 'set') {
            if(typeof value !== 'string') throw Error('設定值無效');
                store.settingSet(key, value);
            event.returnValue = { value: null };
        }
        else if (op === 'remove') {
            store.settingRemove(key);
            event.returnValue = { value: null };
        }
        else
            throw Error('設定方法無效');
    }
    catch (e) {
        event.returnValue = { error: e instanceof Error ? e.message : '原生儲存失敗' };
    } });
    const command = (action: string) => window.webContents.send('koi:command', { action });
    Menu.setApplicationMenu(Menu.buildFromTemplate([
        { label: '檔案', submenu: [{ label: '新增專案', accelerator: 'CmdOrCtrl+N', click: () => command('new') }, { label: '匯入舊版專案備份', accelerator: 'CmdOrCtrl+O', click: () => command('import') }, { label: '儲存', accelerator: 'CmdOrCtrl+S', click: () => command('save') }, { label: '匯出專案備份', click: () => command('export') }, { type: 'separator' }, { label: '結束', role: 'quit' }] },
        { label: '編輯', submenu: [{ label: '復原', accelerator: 'CmdOrCtrl+Z', click: () => command('undo') }, { label: '重做', accelerator: 'CmdOrCtrl+Shift+Z', click: () => command('redo') }, { type: 'separator' }, { label: '剪下', role: 'cut' }, { label: '複製', role: 'copy' }, { label: '貼上', role: 'paste' }, { label: '全選', role: 'selectAll' }] },
        { label: '檢視', submenu: [{ label: '重新載入', accelerator:'CmdOrCtrl+R', click:async()=>{
            if(await closeGuard.request())window.webContents.reload();
        } }, { label: '放大', role: 'zoomIn' }, { label: '縮小', role: 'zoomOut' }, { label: '原始大小', role: 'resetZoom' }, { label: '全螢幕', role: 'togglefullscreen' }] }
    ]));
    window.once('ready-to-show', () => window.show());
    await window.loadURL('koi://app/index.html');
}
app.on('web-contents-created', (_event, contents) => { contents.on('will-attach-webview', event => event.preventDefault()); });
app.whenReady().then(start).catch(error => { dialog.showErrorBox('Koi Maker啟動失敗', error.message); app.quit(); });
app.on('window-all-closed', () => app.quit());
// before-quit precedes the cancellable window close. Keep SQLite alive until
// the save acknowledgement or explicit discard has allowed the application out.
app.on('will-quit', () => store?.close());
