# Koi Maker 視覺化故事創作平台

版本：**0.40.12_r4 — 公開測試修訂版**。從 `e762fa6` 接續；部署狀態與來源見 [本輪報告](research/04012-r4/REPORT.md)。本機 build／start 不會部署。

## 本版範圍

- 沿用原Logo與GUI結構。修正浮動積木拆除後剩餘串回跳，依同一連接模型補上C容器側邊；沒有換用新積木編輯器。
- 過場文字動畫不再淡化整個遮罩；過場交給黑幕時避免先露出舊舞台。30/240FPS修正版實機錄影仍待驗。
- 試玩右上「除錯」唯讀檢視既有Engine狀態；正式匯出玩家版沒有此入口。最近互動檢查點不是所有自動指令的完整執行紀錄。
- 容量區塊20px藍色分段、精簡MB/GB及剩餘空間；一般專案仍2 GiB安全寫入界線。
- 「素材→儲存說明→建立5 GB實驗測試專案」另建空白測試專案，需支援串流備份及估計可用至少5,000 MB。實驗路徑使用同一Blob/IndexedDB及原子交易，**尚未通過真實瀏覽器4～5GB寫入/重載驗收，請勿存放唯一的重要資料**。
- `.koib`串流備份保留CRC及原格式。一般JSON/遊戲ZIP安全封裝上限256 MB；較大遊戲可在支援目錄選擇器的環境串流輸出完整HTML5資料夾，失敗時保留未完成標記。
- 作者可讀KOI Script仍待下一工作包，沒有不完整轉換現有事件JSON。Windows EXE、實機觸控、聽感與Windows11實測仍待驗。

## Windows 11／VS Code 快速開始

先安裝 **Node.js 24.x（包含 npm 11.x）**、VS Code，將完整 ZIP 解壓縮到一般可寫入資料夾。在 VS Code 開啟包含 `package.json` 的資料夾，再開啟 PowerShell 終端機：

```powershell
node --version
npm.cmd --version
npm.cmd ci
npm.cmd run build
npm.cmd test
npm.cmd start
```

開啟 <http://127.0.0.1:4173/>。停止用 `Ctrl+C`。`npm.cmd` 可避免 PowerShell 對 `npm.ps1` 的執行原則限制，不必降低系統安全設定。

修改來源後，先停止伺服器，再執行 `npm.cmd run dev`：會重新建置並啟動同一個本機網址。**沒有自動監看或熱重載**；修改後須重新建置、重新啟動並重新整理瀏覽器。完整指令、資料搬移及待驗事項請看 [WINDOWS-SETUP.md](WINDOWS-SETUP.md)。

## 原始碼與建置關係

| 路徑 | 用途與編輯注意事項 |
| --- | --- |
| `src/` | 完整 React JSX 與 ES module JavaScript：播放器、積木、流程、模板、事件模型、儲存及 KOI Script；本專案目前沒有 TypeScript 建置流程。 |
| `dist/app.js` | **可編輯的原始主控制器**，管理專案與 DOM／React 整合；不是 `src/` 的 bundle，不可刪除或誤認為可重新產生。 |
| `dist/index.html`、`dist/brand.css`、`dist/editor-fixes.css` | 現有 HTML、品牌及局部樣式來源。 |
| `dist/style.css`、`dist/player.css` | 包含手寫來源及產生區段；共用遊戲外觀區段由 `src/game-skins.css` 產生，請編輯該來源。 |
| `dist/workspace.js`、`dist/player.js` | esbuild 從 `src/workspace.jsx`、`src/player.jsx` 產生的 bundle；不要直接修改。 |
| `scripts/` | 文件產生、esbuild、Worker 封裝、資產驗證、本機伺服器及有限測試入口。 |
| `worker/index.js`、`dist/server/index.js` | 建置產生的靜態資產映射；本機 Node 伺服器重用此映射，不需要 Cloudflare 或 Sites SDK。 |
| `.openai/hosting.json` | 保留原網站部署設定，不是登入憑證；本機不需變更或登入 Sites。 |
| `package.json`、`package-lock.json` | 建議的 npm 指令與完整鎖定依賴；`npm ci` 依鎖檔安裝。 |
| `pnpm-lock.yaml` | 原有 pnpm 鎖檔保留；直接依賴解析版本與 npm 鎖檔一致。交付流程使用 npm，請勿交替更新兩份鎖檔。 |
| `tests/` | 完整既有測試、DOM 模擬及素材樣本。預設只跑有限本機驗收，見下節。 |
| `design/official-logo/originals/` | 使用者提供的正式 Logo 原圖；網站適用版本位於 `dist/assets/brand/`。 |
| `research/`、`PROGRESS.md` | 歷史檢查點、修復、驗收與限制紀錄。 |

執行 `npm run build` 會產生功能矩陣、語法說明、功能頁及共用樣式，再編譯兩個 React 入口、封裝並檢查 Worker。建置完全在本機執行，**不會部署**。依賴安裝完成後，核心編輯與遊戲預覽使用本機檔案、IndexedDB 及瀏覽器 API，不需 Sites 帳號或連線；外部說明連結及使用者自行設定的遠端資源仍需要網路。

## 測試範圍

```powershell
npm.cmd test
npm.cmd run check:assets
```

`npm test`／`npm run test:local`：有限的引擎、儲存與匯出、四模式核心同步、Undo／Redo、旗標／迴圈、角色值積木、運算、拖曳穩定及本機 HTTP／資產驗收。DOM 使用 JSDOM 與模擬音訊／IndexedDB，**不代表 Windows 實機、瀏覽器畫面或聽感通過**。

完整歷史測試原封保留，可用 `npm run test:all` 執行，但**不建議作為首次安裝檢查**：部分案例需要原始 Git 歷史、ffprobe、舊版本斷言或 512 MiB／2 GiB 記憶體配置。ZIP 不含 `.git`；`git init` 也不會產生歷史提交。此命令有 5 分鐘總上限，單一測試檔 20 秒上限；歷史失敗不能視為本機安裝必然失敗，也不能宣稱完整歷史測試已重跑通過。

## 專案資料與素材

正式網站、本機網址及不同連接埠屬於不同 origin，**不會自動共用專案、素材、玩家存檔或偏好設定**。先在正式網站匯出可編輯專案備份並確認包含素材，再到本機透過既有「匯入」入口載入。不要清除正式網站資料。只有劇本 `.koi` 不等於含完整素材的專案備份。

本 ZIP 包含目前 Git 追蹤的來源、Logo、網站既有素材、測試樣本與歷史紀錄，不含使用者瀏覽器資料庫、另行匯入的素材、帳號憑證、`node_modules` 或 Git 歷史。npm 安裝會依作業系統選取 esbuild 套件；不要從 Linux 複製 `node_modules` 到 Windows。

本交付沒有新增任何圖像或外部商業素材，也沒有重新授予既有素材開源授權。Logo 為使用者提供的專案品牌；測試素材說明見 `tests/fixtures/p1c/README.md`。第三方程式依各套件授權（安裝後的 LICENSE 與套件資料）使用；原有音效／圖片沒有完整再散布授權證明者，對外再散布前應由權利人確認，不能將「已隨專案交付」當成任意商用授權。

## 未完成及版本資訊

未完成的積木、過場閃幀、5 GB 容量及 EXE 項目見 [LOCAL-DEVELOPMENT-TODO.md](LOCAL-DEVELOPMENT-TODO.md)。r2 歷史僅有授權的區段工具列、等寬頁籤、選取線及清單設定局部調整；Logo、字型、主題與六分類保留。5 GB 僅完成部分儲存開發，實際瀏覽器能力未驗證；EXE 未實作。

本輪接續基準：`e762fa6e27b1f349504ff0dc27c68c2e954d5cbe`。上一正式版為 Sites60／0.40.12_r3，來源 `49fa62c2988f103739486d8fad2d2ed61fa41bc8`，保留回復。r4實際發布、最新提交及限制以 `research/04012-r4/RELEASE.md`、ZIP旁檢查點檔為準；歷史報告不代表本輪全部重跑。
