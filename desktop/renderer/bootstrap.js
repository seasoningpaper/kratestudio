// Fail closed: never initialize a browser project if Electron preload is absent.
if (globalThis.KoiDesktop?.version !== 1)
    throw Error('桌面橋接未載入。請由 Electron 啟動，禁止以瀏覽器替代原生儲存。');
globalThis.KoiDesktop.onCommand(async ({ action, requestId }) => {
    if(action==='prepare-close'){
        let saved=false;
        try{saved=await globalThis.KoiDesktopPrepareClose?.()===true;}catch{}
        await globalThis.KoiDesktop.window.saved(requestId,saved);
        return;
    }
    const id = { new: 'newProject', import: 'import', save: 'save', export: 'export',
        undo: 'undo', redo: 'redo' }[action];
    if (id)
        document.getElementById(id)?.click();
});
