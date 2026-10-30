# Windows 11 + VS Code 本機開發

適用：Koi Maker **0.41.0_r2** 完整原始碼。以下是 Windows PowerShell 指令；本次實際自動驗證環境為 Linux + Node.js 24.19.0 + npm 11.9.0，**沒有執行 Windows 11 實機測試**。

## 1. 準備與解壓縮

安裝 Node.js 24.x（含 npm 11.x）、VS Code；若要自行管理修改紀錄，再安裝 Git。一般本機啟動不需要 Git、Python、ffmpeg、Sites 登入或 Cloudflare 工具。

將下載的 ZIP 解壓縮到例如 `C:\Dev\Koi-Maker-0.41.0`。請開啟含 `package.json` 的那層，避免在外層資料夾執行 npm。可用 VS Code「檔案 → 開啟資料夾」，再「終端機 → 新增終端機」。

```powershell
Set-Location 'C:\Dev\Koi-Maker-0.41.0'
node --version
npm.cmd --version
Test-Path .\package.json
Test-Path .\package-lock.json
```

最後兩行應為 `True`。若顯示找不到 node／npm，確認 Node 安裝完成後重新開啟 VS Code。`code .` 只有 VS Code 命令已加入 PATH 時才可用。

## 2. 安裝與建置

```powershell
npm.cmd ci
if ($LASTEXITCODE -ne 0) { throw '依賴安裝失敗，請保留錯誤訊息。' }
npm.cmd run build
if ($LASTEXITCODE -ne 0) { throw '建置失敗，請勿繼續當成驗收通過。' }
npm.cmd run check:assets
if ($LASTEXITCODE -ne 0) { throw '靜態資產驗證失敗。' }
```

`npm ci` 依 `package-lock.json` 安裝，需要首次下載依賴的網路；不要先刪鎖檔或使用 `--omit=optional`（esbuild 的 Windows 二進位檔是平台相關 optional dependency）。鎖檔包含 win32-x64／win32-arm64 的 esbuild 解析資訊，但本次未實際執行 Windows 二進位檔。

不要用 `npm audit fix --force`、更換 UI 框架或重新安裝整套編輯器來處理安裝問題。若同一失敗連續兩次，保存完整終端機紀錄後停止；不要反覆刪鎖檔重試。依賴安全弱點稽核不屬於本次驗證，沒有宣稱零弱點。

## 3. 啟動與停止

```powershell
npm.cmd start
```

在瀏覽器開啟 <http://127.0.0.1:4173/>。伺服器只綁定本機回圈位址，不對區網開放；不必建立任何 Sites 專案。不要直接雙擊 `dist/index.html` 以 `file://` 開啟，否則儲存、安全環境及匯出資產讀取可能不同。

停止：在該終端機按 `Ctrl+C`。不會刪除瀏覽器專案資料。

修改來源後：

```powershell
# 先 Ctrl+C 停止原伺服器；此命令會重新建置再啟動
npm.cmd run dev
```

這不是熱重載；每次修改後需重新建置、重啟、重新整理瀏覽器。若 4173 被占用：

```powershell
npm.cmd start -- --port 4174
```

然後開啟 `http://127.0.0.1:4174/`。**更換 host（localhost／127.0.0.1）或 port 會改變瀏覽器資料來源**；若看不到舊專案，先回到原網址，不要誤以為資料已刪除。請固定一個本機網址使用。

## 4. 有限自動化測試

停止舊伺服器後執行：

```powershell
npm.cmd test
if ($LASTEXITCODE -ne 0) { throw '本機驗收失敗，請保存輸出。' }
```

同義指令 `npm.cmd run test:local`。不使用 PowerShell 的 `*.test.mjs` 展開，而由 Node 明確列出案例；單一檔案 20 秒、整批 120 秒上限，依序執行，沒有自動無限重試。包含引擎、實際編譯 bundle 的 JSDOM 模擬、儲存／遊戲匯出、本機 HTTP 和原始碼 GUI 雜湊比對。

若尚未安裝與建置，請先完成第 2 節。本機伺服器以最新建置的 Worker 資產映射提供網站，不會從正式站讀取程式。

完整歷史測試（不建議首次執行）：

```powershell
npm.cmd run test:all
```

這會選取所有既有測試，包含歷史版本檢查、Git 舊提交取檔、ffprobe 及大型記憶體配置；原始 Git 歷史不在 ZIP 裡，部分歷史斷言本來就不是針對 r1。此命令保留供維護者研究，**未在本輪執行或宣稱全部通過**。

## 5. 必做人工操作（本次待驗）

1. 正式站先匯出可編輯專案備份；確認素材也被包含，另存一份原始備份。
2. 在本機匯入副本，確認事件、素材與章節；依序切換事件、積木、程式、流程圖，測試 Undo／Redo。
3. 預覽對話、選項、角色登退場及音訊；測試打字機和過場。先點擊互動以滿足瀏覽器自動播放限制。
4. 儲存、重新整理同一個本機網址，確認資料還在；再匯出備份並用另一測試副本還原。
5. 比對正式版的淡藍色 Logo、深淺色模式、六分類、工具列、字型、配色與布局。不要把自動雜湊比較當成真人視覺驗收。
6. Windows、實機觸控、240 FPS 逐幀與聽感仍須實測。r4已由使用者30FPS影片與程式重現過場遮罩問題並修正；修正版實機影格驗收仍未執行。

本機核心不需要 Sites；外部說明網站或劇本自行引用的遠端資源除外。可於依賴安裝與建置後離線測試內建或已匯入素材。原正式站儲存不會自動搬到 localhost；`.koi` 劇本本身不包含所有圖片／聲音。

## 6. 備份與修改範圍

ZIP 已含完整文字來源、測試、配置、兩種鎖檔、既有素材與 Logo 原圖，沒有 `node_modules`、登入資訊、使用者瀏覽器資料庫或 `.git`。可自行開始新 Git 紀錄：

```powershell
git init
git add .
git commit -m "Koi Maker 0.41.0 public test source baseline"
```

這個新提交不是原發布檢查點，不會憑空恢復舊歷史。原交付 SHA 見 ZIP 旁的檢查點檔。請保留原 ZIP；修改來源前先備份。工作區有歷史發布腳本，不代表執行 build／start 會部署；本機指令不會部署。r2 檢查點與正式發布狀態另見 research/04012-r2/RELEASE.md。


## r4 公開測試修訂版與大容量限制

本 ZIP 不會自動部署。實際發布見 research/04012-r4/RELEASE.md；Sites60保留回復。先用測試副本操作，勿覆蓋唯一備份。一般寫入2 GiB；可另建5GB實驗測試專案，瀏覽器4～5GB寫入/重載與Windows11實機仍待驗。

在支援 `showSaveFilePicker` 的安全內容（127.0.0.1或HTTPS）中，原匯出專案按鈕保存 `.koib` 串流備份；原匯入按鈕選取該檔案，校驗完成後才更換編輯專案。一般專案拒絕超過2GiB的還原；大型實驗備份需先另建實驗測試專案。取消選擇器不更動專案。較大遊戲可在支援 `showDirectoryPicker` 的環境輸出完整HTML5資料夾；必須保留整個資料夾，失敗的「輸出未完成.txt」不可忽略。

單獨驗證本輪功能：

```powershell
npm.cmd run build
node --test --test-concurrency=1 --test-timeout=20000 tests/04012-r4-blocks.test.mjs tests/04012-r4-player.test.mjs tests/04012-r4-debug.test.mjs tests/04012-r4-storage.test.mjs tests/04012-r4-directory.test.mjs tests/04012-r4-capacity.test.mjs
```

`npm.cmd test`才包含完整有限本機回歸；不要把單獨測試當成全部驗收。

歷史大型磁碟串流測試不是瀏覽器5GB驗證，不包含在npm test。確定至少11GB測試磁碟空間才執行：

```powershell
node scripts/verify-large-backup.mjs --confirm-10gb-temporary-disk
```

最多約10.1GB暫存、180秒取消上限；完成清理。強制終止時可能留下系統暫存 `koi-r3-large-*`。輸出仍到歷史路徑 research/04012-r3/large-backup.json，不要當成新驗收、不要平行重複執行。Linux結果不等於Windows已通過。

## 還原包含歷史的 Git bundle

完整原始碼 ZIP 可直接 npm ci／build；需要歷史提交時使用同批 bundle。PowerShell：

```powershell
Get-FileHash .\Koi-Maker-0.41.0-r2-final.bundle -Algorithm SHA256
git bundle verify .\Koi-Maker-0.41.0-r2-final.bundle
git clone --branch feature/softflow-0.41.0-r2 .\Koi-Maker-0.41.0-r2-final.bundle Koi-Maker-restored
Set-Location .\Koi-Maker-restored
npm.cmd ci
npm.cmd run build
npm.cmd test
npm.cmd start
```

實際下載檔名含檢查點 SHA，請把指令中的檔名換為實際名稱；不是重新 git init 就能恢復歷史。Windows／實機觸控未在本輪實測。
