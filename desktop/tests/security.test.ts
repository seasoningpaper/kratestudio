import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {spawnSync} from 'node:child_process';

test('Electron安全設定與preload能力採固定白名單，沒有暴露原始IPC或Node檔案權限',()=>{
 const main=fs.readFileSync('src/main.ts','utf8');
 for(const flag of ['contextIsolation: true','sandbox: true','nodeIntegration: false','webSecurity: true','allowRunningInsecureContent: false'])assert.ok(main.includes(flag),flag);
 for(const check of ['event.sender !== window.webContents','event.senderFrame !== window.webContents.mainFrame','Object.hasOwn(methods, method)',"action: 'deny'","'will-attach-webview'"])assert.ok(main.includes(check),check);
 const preload=fs.readFileSync('src/preload.ts','utf8');assert.ok(!/node:fs|node:sqlite|process\.env/.test(preload));assert.ok(!/exposeInMainWorld\(['"](?:ipcRenderer|require|process)/.test(preload));
 assert.ok(main.includes("'Access-Control-Allow-Origin': 'koi://app'"),'素材fetch只對應用程式來源開放CORS');
});
test('正式安裝版與Portable在P0待驗時確實被阻擋',()=>{
 const result=spawnSync(process.execPath,['release-gate.mjs'],{encoding:'utf8',timeout:5000});
 assert.equal(result.status,1);assert.match(result.stderr,/尚未達到0.41.0正式發布門檻/);
});
