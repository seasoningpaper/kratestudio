> 最新開發修訂：**0.41.0-dev.2**。已修復素材儲存競態、失敗交易殘留、JSON鏡像阻塞、關閉／重載保存握手及中斷索引恢復。完整本輪報告：[desktop-debug/REPORT.md](../research/desktop-debug/REPORT.md)。

# Koi Maker 0.41.0 Desktop Engine Foundation：開發驗證版

接續既有 Koi Maker，沒有重建製作器。網頁版維持 0.40.12_r4；本資料夾為獨立桌面開發入口，**尚非 0.41.0 正式版**。

## Windows 11 + VS Code

安裝 Node.js **24.19.0 x64**，以 VS Code 開啟整個原始碼根目錄。PowerShell 逐行執行；任何一步失敗就停止，不必反覆安裝。

```powershell
node --version
npm ci --ignore-scripts --no-audit --no-fund
npm run build
npm ci --prefix desktop --no-audit --no-fund
npm run typecheck --prefix desktop
npm run build --prefix desktop
npm test --prefix desktop
npm start --prefix desktop
```

Electron 第一次安裝需要網路下載二進位程式。上述步驟在 Linux 已執行對應版本的安裝、型別檢查、建置及測試；**Windows 實機執行仍待驗**。原本網頁本機開發請參閱根目錄 `WINDOWS-SETUP.md`，不要把 `desktop/out/renderer/index.html` 當成一般網頁開啟。

產生 Windows x64 解壓開發包：

```powershell
npm run pack:win:dir --prefix desktop
Get-FileHash .\desktop\artifacts\win-unpacked\KoiMaker.exe -Algorithm SHA256
.\desktop\artifacts\win-unpacked\KoiMaker.exe
```

必須保留整個 `win-unpacked` 資料夾，不能單獨複製 EXE。這不是單檔 Portable，也不是安裝程式。目前未簽章，封裝 EXE 使用 Electron 預設圖示／資源資訊；程式內仍是原 Koi Maker Logo 與 GUI。正式品牌圖示與簽章列入 Windows 發布驗收。

`npm run dist:win --prefix desktop` 受 `P0-STATUS.json` 與 `release-gate.mjs` 阻擋，P0 尚未完成時預期失敗。不要只改布林值繞過驗收。

## 已實作的儲存邊界

- Main：Node 檔案系統、內建 `node:sqlite`、授權專案目錄與 SQLite 交易。
- Preload：固定方法與事件橋接；不提供任意 IPC、SQL、檔案路徑或 Node 權限。
- Renderer：相同編輯器與播放器。桌面建置將儲存介面接到原生 provider，不修改網頁版的儲存鍵或事件格式。沒有橋接時停止，不退回 IndexedDB。
- 原生視窗：`contextIsolation:true`、`sandbox:true`、`nodeIntegration:false`；拒絕外部導覽、新視窗、WebView 和權限請求。
- SQLite 保存完整事件 JSON 及未知欄位；素材為分段傳輸的二進位檔案，使用內容雜湊定位，保留舊素材版本供 Undo 重新引用。
- 玩家設定、存檔與解鎖沿用舊鍵名稱，改存原生 SQLite。每個鍵 8 MiB 上限；遊戲存檔尚未分流到個別 `saves/` 檔案。

桌面獨立 npm 鎖檔固定 Electron 45.0.0、electron-builder 26.15.3、TypeScript 5.9.3。Electron 45 實測內建 Node 24.22.0、SQLite 3.53.4；開發 Node 24.19.0 內建 SQLite 3.53.3，不需 SQLite 原生 addon 或 ABI 重建。

## 實際檔案位置與恢復

專案位於 Windows「文件」目錄的 `Koi Maker/projects/<內部 UUID>/`。請以系統實際文件資料夾為準，可能受 OneDrive 重新導向。

```text
project.json       完整資料的可讀鏡像
project.sqlite     權威資料、修訂及素材索引
scripts/           預留；目前劇本仍保存在完整專案 JSON
assets/            雜湊命名的二進位素材
saves/             預留；玩家資料目前位於 userData/state.sqlite
backups/           預留；完整備份仍使用既有匯出入口
.pending/          未完成的素材交易，保留診斷
```

Electron `userData/state.sqlite` 保存專案索引和操作／玩家設定；位置通常在 `%APPDATA%/koi-maker-desktop/`，依 Electron 平台設定為準。可編輯資料不寫入安裝目錄。`project.json` 損壞可由 `project.sqlite` 重新產生；JSON 不是另一份可獨立競爭的來源。

測試前請使用專案副本。關閉程式後備份整個專案目錄與 userData 目錄；不要只複製資料庫並漏掉 WAL 或素材。取消交易保留上一份已提交資料；未完成檔案及歷史素材暫不自動清理，可能額外占用磁碟。已加入索引 v0→v1 相容遷移與 pending_save 恢復標記，驗證提交後索引更新前強制終止可恢復；未完成／損壞及已刪除資料不會自動啟用。恢復報告位於 userData/recovery-report.json。完整斷電情境、自動快照回復、正式刪除與垃圾回收仍待完成。

## 舊版遷移與已知限制

網頁 IndexedDB 屬於原網站來源，桌面程式不能任意讀取。請在原網站先匯出專案備份，保留原資料，再由桌面既有「匯入」入口匯入副本。已驗證小型資料、二進位素材與未知欄位遷移到 SQLite；完整 `.koib`／大專案遷移、玩家舊存檔與偏好搬移尚待驗收。**不會自動刪除網站資料**。

原生專案採 5,000,000,000 bytes 政策界線、磁碟檢查與有序分段寫入；本輪沒有 4～5 GB 壓測，不代表已驗證 5 GB。既有單一素材大小和記憶體備份／ZIP 安全限制仍保留。原生另存新檔、任選專案目錄、`.koimaker` 封裝、大容量原生備份、正式遷移精靈仍待下一工作包。

原有 HTML5 遊戲匯出保留獨立 web player，不依賴桌面編輯器橋接；它仍採原本瀏覽器儲存語意。**獨立 Windows 遊戲 EXE、完整 Engine Core 分離、Scene Graph、版本化 IR、Rollback、Plugin API 尚未完成**。

## CI 與人工驗收

`.github/workflows/desktop-windows.yml` 在 Windows Server 2022 x64 固定 Node 版本，執行原版／桌面建置、回歸、開發包與 SHA-256。原專案是 Sites Git 儲存庫，沒有已授權的 GitHub Actions 執行端；本輪只保存流程，沒有宣稱 Windows CI 已執行。

Windows 10／11 請分別驗證：首次啟動、原生選單、建立測試專案、四模式編輯、儲存後重開、素材播放、遊戲存讀檔／解鎖、斷網啟動、DPI 125%／150%、關閉前未儲存變更、磁碟不足與意外終止。視窗關閉／重載已加入保存與明確放棄流程，但 Windows 實機與完整資料恢復驗收仍屬阻擋正式版的待辦，請勿直接用唯一的重要專案測試。

正式門檻與完整實際結果：`P0-STATUS.json`、`../research/desktop-0.41.0/REPORT.md`。
