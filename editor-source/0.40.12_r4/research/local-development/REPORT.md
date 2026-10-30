# 0.40.12_r1 本機開發原始碼交付報告

日期：2026-10-21。本輪僅補齊 Windows 11／VS Code 可用的本機開發包，不部署、不升版、不新增遊戲功能。

## 來源與檢查點

- 開始時工作區乾淨，最新可取得提交：73931c876fe2bafcf61bde95c88ae2595d3433c8。
- 該版本的應用程式執行內容與已發布 2d4ee8a8922fffe28c60549d1420b744ac7577a6 一致；歷史紀錄為 Sites58。本輪沒有重新查詢部署狀態或操作 Sites。
- 修改前 tag：local-handoff-base-73931c8；原完整來源 ZIP 保留，SHA256：79954d0176248bc68680261d1503d67cf5f101ce2971b8bebf6dd1a1ed7552ba。
- 本輪最終提交由 ZIP 旁的檢查點檔與 ZIP Git archive 註記記錄；沒有透過 Sites 同步或部署。

## 最小必要修改

1. 新增 README.md、WINDOWS-SETUP.md、LOCAL-DEVELOPMENT-TODO.md，說明完整來源位置、PowerShell 指令、測試限制及資料搬移。
2. 新增 package-lock.json，保留 pnpm-lock.yaml。沒有更換任何直接依賴版本：react／react-dom 19.3.1、jszip 3.10.2、esbuild 0.25.12、fake-indexeddb 6.2.6、jsdom 26.1.0。
3. package.json 加入 Node 24 範圍、本機 start／dev、有限 test／test:local、歷史 test:all、check:assets。原 build 流程保留。
4. scripts/serve-local.mjs 使用 Node 內建 HTTP 與既有 Worker 資產映射提供 localhost 網站；不依賴 Sites SDK、登入、雲端 API 或外部伺服器。只綁定 127.0.0.1，開發回應 no-store；不提供熱重載。
5. scripts/asset-path.mjs 及 build-worker.mjs／verify-static-assets.mjs：修正 Windows 路徑反斜線混入 URL 的跨平台問題。Linux 建置結果與原版完全相同；以 path.win32 做路徑單元驗證，不等於 Windows 實機執行。
6. scripts/test-local.mjs 與 tests/local-development.test.mjs：明確列出有限測試，不依賴 shell glob、Git 舊提交或多 GB 壓力配置。既有測試未刪除，沒有改變測試期望來掩蓋問題。

## 實際執行與結果

驗證於獨立副本執行，副本沒有 .git，不修改正式使用者資料，也未使用工作區原有 node_modules。環境：Linux、Node.js v24.19.0、npm 11.9.0。測試依賴原本 JSX／JavaScript，沒有虛構 TypeScript 編譯。

| 操作 | 實際結果 | 依據／限制 |
| --- | --- | --- |
| npm install --package-lock-only --ignore-scripts --no-audit --no-fund --fetch-retries=0 --fetch-timeout=15000 | 成功，25 秒 | 從既有 package.json 解析 npm 鎖檔；非 pnpm node_modules 複製。 |
| npm ci --no-audit --no-fund --fetch-retries=0 --fetch-timeout=20000 | 成功，新增 58 個套件，9 秒 | 乾淨隔離安裝；未停用 esbuild 安裝腳本。沒有執行 npm audit，不宣稱安全稽核通過。 |
| npm ls --depth=0 | 成功，六個直接套件版本與原專案一致 | 沒有新增第三方依賴。 |
| npm run build（90 秒逾時） | 成功 | build.log；文件產生、esbuild、Worker 及 ESM default.fetch 驗證。 |
| npm test（外層 135 秒，內層 120 秒、單檔 20 秒） | 40 通過、0 失敗、0 跳過，10,044.81 ms | tests.log；包含 localhost、7 引擎案例、7 跨模式 DOM 案例、角色、控制、運算、積木穩定、9 MiB 素材儲存與遊戲 ZIP 匯出。 |
| 最後 no-store 調整後，僅重跑 local-development.test.mjs | 3 通過、0 失敗 | http-final.log；是上述 40 項的子集，不加總成 43 項。 |
| npm ci --dry-run --ignore-scripts --no-audit --no-fund --offline（最終 package／lock） | 成功 | lock-final.log；只確認最終鎖檔相容，不當成第二次完整安裝。 |
| npm run check:assets | 33 個資產位元組完全一致，root 200、版本 0.40.12_r1 | 本機 Worker fetch；不是正式站瀏覽器驗收。 |
| Node CLI scripts/serve-local.mjs --port 4173 | 啟動成功、HTTP root 200、r1 版本正確、SIGTERM 正常停止 | 僅 Linux CLI／HTTP；未執行 Windows PowerShell 或真實瀏覽器。 |
| 6 個新增／受修改 JS 測試與工具的 node --check | 全通過 | asset-path、serve-local、test-local、build-worker、verify-static-assets、local-development.test。 |
| 應用程式／Logo／HTML／CSS／原 Worker 完整 SHA256 基準比較 | 147 檔完全一致 | APP-BASELINE.json；涵蓋 src、dist、worker 與 Logo 原圖。沒有視覺修改，不能取代真人視覺比較。 |

所有測試第一次通過；no-store 是開發伺服器快取修正後的定向驗證，沒有失敗重試循環。npm 顯示環境 http-proxy 設定警告及 whatwg-encoding 棄用提示；安裝／建置沒有因此失敗。完整歷史 npm test:all 未執行，避免多 GB 記憶體測試、歷史版本斷言及額外工具需求。

## 核心本機獨立性

正式 HTML 載入的 workspace.js／player.js／app.js／CSS／Logo 全由本機資產提供。React、JSZip 已 bundle；專案與素材沿用 IndexedDB（koi-maker-files）及既有 localStorage 識別。遊戲封裝讀取的 player.js／player.css／預設圖也是本機相對路徑。有限 DOM 測試實際執行現有 bundle、編輯／草稿／Undo／儲存／匯出與 Engine；不需要 Sites 帳號或 API。實際瀏覽器離線操作仍列待驗。

正式網站與 127.0.0.1:4173 是不同 origin，不會自動共用專案或玩家存檔；必須先從正式站備份含素材的可編輯專案，再在本機匯入副本。不得清除正式站資料。內建／已匯入素材可由本機提供，外部說明與自訂遠端素材不屬於離線保證。

## 未執行與未完成

- Windows 11 + VS Code／PowerShell 的實際安裝、視覺、觸控、聽感、240 FPS 與實際刷新率：待使用者依 WINDOWS-SETUP.md 驗收。
- 過場舊場景閃回：未獨立重現，不宣稱修好。原始完整問題專案仍未完整取得。
- 完整巢狀值積木／素材 reporter／清單／call-return 等：待後續單包實作。
- 5 GB：未支援；現有上限 2 GiB 且受瀏覽器 quota 限制。
- Windows EXE：未製作，不是本輪交付條件。
- 完整歷史測試、第三方素材再散布授權審查及依賴安全稽核：未執行；保留原始素材與既有文件，不新增外部素材或授權宣告。

## 交付範圍與下一步

ZIP 應包含完整追蹤來源、測試、配置、package-lock／pnpm-lock、既有素材與 Logo 原圖；排除 node_modules、.git、登入憑證及使用者瀏覽器資料。本輪沒有變更 src、dist、worker、Logo、CSS 或現有遊戲資料模型，也沒有清除任何使用者儲存。下一步優先於 Windows 使用專案副本驗收；不自動開始 EXE、容量遷移、大型積木重構或正式部署。
