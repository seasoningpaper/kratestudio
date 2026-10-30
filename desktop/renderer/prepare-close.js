// This is appended to the existing app script, sharing its private project
// revision. No second project model or browser persistence is introduced.
globalThis.KoiDesktopPrepareClose = async () => {
    if (!projectReady) return false;
    document.activeElement?.blur();
    await Promise.resolve();
    window.KoiWorkspace.synchronizeWorkspace(project);
    clearTimeout(autoSaveTimer);
    const revision = editRevision;
    const result = await window.KoiStorage.saveProject(project);
    if (result.warning) return false;
    return projectReady && revision === editRevision;
};

Promise.resolve(window.KoiReady).then(async()=>{
    const status = await globalThis.KoiDesktop.project.status?.();
    if(status?.recovery.some(p=>p.status==='restored')) toast('已從中斷儲存恢復專案，請確認內容並保留備份。');
    else if(status?.recovery.length) toast('發現未完成的儲存資料，原始檔已保留，請查看恢復報告。');
    else if(status?.warnings.length) toast(status.warnings.at(-1));
}).catch(()=>{});
