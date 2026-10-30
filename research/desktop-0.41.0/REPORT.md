# Koi Maker 桌面開發環境恢復與基礎整合報告

日期：2026-10-23（台灣時間）。狀態：0.41.0-dev.1 開發驗證包；不是正式 0.41.0。

## 來源與回復

- 原目錄曾被環境清理；已恢復終端機、檔案系統、Git 與 npm 網路存取。
- 從同一個 Sites 原始碼儲存庫還原 `/workspace/sites/galgame-studio`；未重新製作網站。
- 正式站來源 `3fa39c9`，最新還原提交 `072c5290b8eed43380e9d7b226a8ce1af809e563`。兩者只差 6 份發布／交接文件，程式與樣式相同。
- 遠端沒有比 072c529 更新的來源；還原後工作區乾淨。保留完整歷史、建立 `recovery-desktop-base-072c529` 標籤及修改前完整 ZIP。
- 開發分支 `feature/desktop-0.41.0`；核心第一檢查點 `2ad5e2d`。最終交付來源另記於 ZIP 附帶的交付檢查碼／Git 紀錄。
- 原網站保持 Sites61／0.40.12_r4；沒有儲存新 Sites 版本、部署、更改網址或公開權限。沒有讀取或清除使用者正式瀏覽器資料。
- 備份是原始碼備份，**不包含無法存取的使用者瀏覽器專案、影片或本機素材**。

## 實際修改

| 範圍 | 結果 |
|---|---|
| desktop/src/main.ts、preload.ts、security.ts | Electron 主程序／沙箱橋接／白名單 IPC、來源與路徑驗證、原生選單、koi 協定讀取與音訊／影片 Range |
| desktop/src/project-store.ts | 真實 SQLite WAL／FULL、v0→v1 Schema、完整 JSON 與未知欄位、分段二進位寫入、素材版本與內容雜湊、失敗保留原資料 |
| desktop/renderer/* | 以現有儲存介面連到原生 SQLite／檔案；玩家設定及存檔改用原生資料庫；無橋接時停止 |
| desktop/build.mjs | 建置桌面專用 copy，保留原 src／dist；HTML5 匯出仍使用獨立 web player |
| desktop/package*.json、tsconfig、electron-builder.json | 獨立鎖檔、固定 Electron／Node／TypeScript／builder、Windows NSIS／Portable 設定 |
| desktop/P0-STATUS.json、release-gate.mjs | P0 未完成時禁止正式 Setup／Portable；開發解壓包可建立 |
| .github/workflows/desktop-windows.yml | Windows x64 可重現 CI；尚未在 GitHub 執行 |
| desktop/tests/*、verify-package.mjs | SQLite／原生 provider／四模式 DOM 整合／安全設定／PE 與 ASAR 一致性驗證 |
| README.md、PROGRESS.md、desktop/README.md、THIRD-PARTY-NOTICES.md | 使用與遷移限制、PowerShell 指令、第三方授權索引與後續工作 |

沒有更改原版 React 元件、播放器、積木、流程圖、KOI Script、GUI CSS、Logo、根目錄 package 或既有儲存鍵。桌面版版本文字、儲存提示文字及原生選單是新增邊界。

## 實際測試與命令

| 命令／檢查 | 結果 | 紀錄 |
|---|---|---|
| npm ci --ignore-scripts --no-audit --no-fund（根目錄） | 成功，58 套件 | 原既有 npm 鎖檔 |
| npm run build | 成功；36 個 Worker 應用資產，ESM fetch 有效 | web-baseline-build.log |
| npm test | 106／106，零失敗 | web-baseline-test.log |
| desktop npm 安裝與 npm ls --depth=0 | 成功；精確版本與鎖檔相符 | install-desktop.log |
| npm run typecheck --prefix desktop | 通過 | typecheck.log |
| npm run build --prefix desktop | Main／Preload／Renderer 成功 | desktop-build.log |
| npm test --prefix desktop | 26／26，零失敗 | native-tests.log |
| Electron 45 內建 Node 執行相同測試 | 同一 26 項全通過，不重複計數 | electron-native-tests.log |
| npm run pack:win:dir --prefix desktop | 成功，真實 Windows x64 解壓包 | windows-pack.log |
| node desktop/verify-package.mjs（desktop 目錄） | x64 PE、8 份 ASAR 內容與 out 完全一致，EXE／ASAR SHA-256 已記錄 | package-verification.log |
| 正式 release-gate | 預期拒絕，因 P0 待驗；這是保護測試通過，並非正式版完成 | security.test.ts |
| Windows 10／11 啟動、安裝、Portable、離線／DPI／聽感 | **尚未執行** | 不以建置取代實機驗收 |

不重複計數共 132 個自動化案例（106 原版＋26 桌面）。Node 開發環境 24.19.0／SQLite 3.53.3；Electron 45.0.0 內建 Node 24.22.0／SQLite 3.53.4 實際可用，詳 electron-runtime.log。

26 項新增案例涵蓋：資料庫重開、資料夾基準、重複 ID、二進位分段、Undo 舊素材版本、取消與未完成交易、隱藏未完成新專案、重複交易與錯序分段、磁碟不足保護、5 GB 邊界拒絕、複製專案、未授權素材、路徑／symlink 越界、新版 Schema 拒絕、JSON 鏡像恢復、玩家存檔鍵、回收而不實體刪除、IPC 來源、禁用瀏覽器儲存的 provider、素材上傳快取、缺橋接停止、背壓取消、DOM/CSS/Logo、實際編輯介面四模式與 Undo／Redo、靜態安全設定及正式發布門檻。

首輪新增測試曾因 Node strip-only 不支援參數屬性、測試未知欄位型別不明而失敗；修正宣告後通過，未修改預期結果。Electron 測試曾有一次相對路徑啟動錯誤，修正命令後才執行成功。Sites 安裝輔助程式拒絕雙鎖檔，改依原 WINDOWS-SETUP 指定的 npm ci，沒有刪除任一鎖檔或反覆安裝。

## GUI 與資料安全的可驗證範圍

DOM 比較先排除 script，再正規化版本文案，其他標記完全一致；4 份 CSS 與 2 份原始 Logo 位元組相同。這是靜態／DOM 驗證，**不是 Windows 真人視覺、觸控或聽感驗收**。

原生 provider 的整合測試使用真實 SQLite 與檔案系統、同一套打包後編輯介面，令 IndexedDB／localStorage／sessionStorage 一經存取就失敗；仍成功完成四模式、事件修改、Undo／Redo、儲存及還原。Electron BrowserWindow／IPC 本身尚未完成真人 GUI E2E。

5 GB 是原生政策界線；本輪只測描述邊界與受控小檔案，不是 4～5 GB 實寫壓測。單一素材與記憶體匯出安全門檻保留；未占用使用者正式儲存區測試。

## 尚未完成及正式版阻擋

1. Windows 10／11 視窗實際啟動、音訊／影片、離線、DPI、原生選單與未儲存關閉保護。
2. 完整舊 IndexedDB／玩家資料遷移精靈、原生選擇專案目錄與另存新檔、.koimaker 封裝。
3. 跨 catalog／project SQLite 的強制終止恢復、自動快照與還原介面、完整性雜湊驗證、歷史素材／pending 回收。現有 SQLite 提交是原子的，但不能聲稱所有跨資料庫更新已達 crash-proof。
4. scripts／saves／backups 目錄目前預留；劇本與玩家資料仍分別存 project.sqlite 與 userData/state.sqlite。
5. 獨立 Engine Core 的 Scene Graph／ECS／版本化 IR／Snapshot+Delta／Rollback／Plugin API 與獨立遊戲 EXE。原有 Engine 保留，106 項回歸已驗證；沒有以新空殼冒充完整引擎。
6. 未簽章的開發 EXE 使用 Electron 原生資源圖示；正式品牌 EXE 圖示、版本資源、NSIS 與 Portable 真實安裝／啟動待驗。
7. GitHub Windows CI 已保存，但目前儲存庫屬 Sites，沒有執行 GitHub workflow 的已授權遠端；沒有 CI run／Windows 真人測試結果。

因此未產生或發布 KoiMaker-Setup-0.41.0-x64.exe／KoiMaker-Portable-0.41.0-x64.exe。已實際產生的是完整解壓開發包中的 KoiMaker.exe。

## 接續順序

先於 Windows 測試本輪解壓開發包與原生檔案／SQLite；完成關閉保護與跨資料庫 crash-recovery，再做舊備份／玩家資料遷移、.koimaker 封裝及受控大容量測試。上述資料邊界穩定後，再依已核准規格逐步抽離 Engine Core 與獨立遊戲發行，不重寫原 GUI。P0 完整通過前不啟用正式版 gate，也不覆蓋網頁正式站。

## 官方依據

- Electron 安全與沙箱：https://www.electronjs.org/docs/latest/tutorial/security 、https://www.electronjs.org/docs/latest/tutorial/sandbox
- Electron ESM／沙箱 preload：https://www.electronjs.org/docs/latest/tutorial/esm
- Electron 發布版本：https://releases.electronjs.org/
- Node SQLite：https://nodejs.org/docs/latest-v24.x/api/sqlite.html
- electron-builder NSIS／Portable：https://www.electron.build/v26/docs/nsis/
- GitHub Actions：https://github.com/actions/checkout 、https://github.com/actions/setup-node 、https://github.com/actions/upload-artifact
