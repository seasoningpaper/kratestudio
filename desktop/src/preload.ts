import { contextBridge, ipcRenderer } from 'electron';
const call = (method: string) => (...args: unknown[]) => ipcRenderer.invoke('koi:call', method, args);
const setting = (op: string, key: string, value?: string) => { const r = ipcRenderer.sendSync('koi:settings', [op, key, value]); if (r.error)
    throw Error(r.error); return r.value; };
contextBridge.exposeInMainWorld('KoiDesktop', {
    version: 1,
    project: { begin: call('project.begin'), commit: call('project.commit'), abort: call('project.abort'), load: call('project.load'), list: call('project.list'), rename: call('project.rename'), remove: call('project.remove'), status:call('project.status') },
    asset: { begin: call('asset.begin'), chunk: call('asset.chunk') }, disk: { estimate: call('disk.estimate') },
    window: {saved: call('window.saved')},
    settings: { getItem: (key: string) => setting('get', key), setItem: (key: string, value: string) => setting('set', key, String(value)), removeItem: (key: string) => setting('remove', key) },
    onCommand: (callback: (value: {
        action: string; requestId?: string;
    }) => void) => { if (typeof callback !== 'function')
        throw Error('命令接收器無效'); const receive = (_event: unknown, value: {
        action: string; requestId?: string;
    }) => callback({ action: value.action, ...(typeof value.requestId==='string'?{requestId:value.requestId}:{}) }); ipcRenderer.on('koi:command', receive); return () => ipcRenderer.removeListener('koi:command', receive); }
});
