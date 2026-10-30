# Koi Maker 0.41.0 線上版 — SoftFlow 1 整合驗收

日期：2026-10-23。沿用原 Sites 專案與公開網址，未建立新站。

## 來源與範圍

- 原正式版：Sites 61／0.40.12_r4，來源 `3fa39c9`；開啟時 main 接續點 `072c5290b8eed43380e9d7b226a8ce1af809e563`。
- 最新桌面分支：`de9e1ac694278e7bce25de9cff5ead53ad92ac56`，已完整保留；另建 `feature/online-0.41.0`。
- 修改前標籤：`online-0.41.0-before-softflow`，指向 `de9e1ac`。
- 設計依據：本次取回的最新 `KoiMaker_SoftFlow1_GUI_Test.html`，存為 DESIGN-REFERENCE.html。藍白與粉紫 Token 精確沿用，沒有採用較舊 Rev3 原型。
- 這是使用真實編輯器與播放器的 **0.41.0 線上公開測試版**；不是 Desktop Engine Foundation 全部功能完成或 Windows EXE 正式驗收。

## 實作

1. 新增局部 `dist/softflow.css`：連續工作台、SoftFlow 同色表面、克制的凸面按鈕與凹面欄位。保留原正式淡藍色圖片 Logo。
2. 主導覽整理為品牌／操作列與工具列；四模式移至中央工作區頂端，順序與控制項 ID 均保留。
3. 藍白／粉紫／深色切換使用既有 `editorSettings`、Undo 快照及專案儲存交易；新增選用的 `softflowVariant` 欄位，沒有更換儲存鍵或資料格式版本。既有自訂主題／自訂顏色仍可操作。
4. 原四模式、事件、積木幾何、角色系統、Parser、播放器、IndexedDB 與桌面開發成果保留。BASELINE.json 與測試核對核心來源、原 Logo、原 CSS 及玩家模板來源雜湊。
5. 發現 HTTP 本機預覽缺少 `crypto.randomUUID`，加上使用 `crypto.getRandomValues` 的 UUIDv4 相容處理；HTTPS 原生實作不被覆蓋，不改動既有 ID。
6. 更新線上版版本、文件標題、遊戲匯出 generator 與本機說明。KOI Script 語法與內部識別字不改名。

## 自動化驗收

- `npm ci --ignore-scripts --no-audit --no-fund`：成功，58 套件；無新框架或相依套件。
- `npm run build`：成功；React/esbuild、Worker ESM 驗證通過。
- `npm test` 最終：**111 通過、0 失敗**，37.34 秒。完整輸出 TESTS.log。
- `npm run check:assets`：**38 個 Worker 資產逐位元組相符**，入口 HTTP 200／0.41.0。
- `node --check`：app.js、theme.mjs、softflow-theme.mjs、browser-compat.js 通過。
- `git diff --check`：通過。
- 歷史測試處理：首輪 106 項有 3 項要求 r4 版本號／HTML 完全不變，與本次授權的設計及升版衝突。原案例未刪除；預設改跑 0.41.0 來源／控制項／資料保護檢查，歷史全套仍可由 `npm run test:all` 執行，會保留舊版斷言差異。這不是把資料斷言改成較弱條件。
- 首次新測試套件中一個 P0-D 草稿衝突案例發生 1 秒輪詢逾時；未改測試期望或資料邏輯。限定重跑相關檔 14/14 通過；最終完整預設套件也通過。

## 真實瀏覽器驗收（內部預覽）

使用受支援瀏覽器操作真實應用，不以原型或靜態 DOM 取代。

| 項目 | 實際結果 |
|---|---|
| 1363×936 藍白／粉紫介面 | 通過，已保存兩張實際畫面 |
| 深色 Logo | 只顯示正式深色圖；淺色圖隱藏 |
| 舊薄荷主題 | 選取後自訂配色生效，accent #4c917f，沒有變成空按鈕 |
| 事件編輯 | 真實鍵盤輸入、離開欄位後提交；文字及原事件 ID 同步至程式／積木／事件 |
| 四模式切換 | 可開啟，章節 9 事件／全專案 10 事件一致；往返保留修改文字 |
| 儲存與重新整理 | 真實測試專案修改內容及藍白設定保留 |
| Logo 未儲存變更保護 | 出現既有確認視窗；取消留在編輯器且保留資料；稍後自動儲存完成後可返回真正專案首頁 |
| 遊戲預覽 | 開啟原有遊戲首頁、開始故事、出現玩家工具列及 Debug 入口；可返回製作器 |
| 375px 真實 iframe viewport | 已修正列高造成工作區只剩 40px 的問題；工作區 637px，整頁無水平溢出 |
| 768px 真實 iframe viewport | 整頁無水平溢出；已調整 Logo 與配色欄位間距 |
| 1024px 真實 iframe viewport | 左 212／中央 552／右 260px，整頁無水平溢出 |

響應式驗收使用同一真實應用的 iframe 視窗，不是觸控裝置模擬；臨時 QA 入口已從部署資產移除。實機手機觸控、真人音訊聽感、240 FPS 錄影及正式站每個完整劇情路徑仍待人工驗收。

## 未改造與限制

- 網頁版保留瀏覽器儲存；未將桌面 SQLite/IPC 注入瀏覽器，沒有聲稱線上網站取得原生磁碟權限。
- 大容量政策、安全限制及實驗模式沿用 r4；沒有藉此宣稱完成 5 GB 瀏覽器驗證。
- KOI Script 作者語法改造、完整工程模式、Rollback／獨立 EXE 驗收等既有待辦沒有藉 GUI 改版宣稱完成。
- 原內建背景在沒有專案預設背景時可能顯示單色預覽；這沿用 r4 實際渲染與資料行為。本輪沒有任意替換使用者背景或故事內容。
- 已於 2026-10-23 15:45 UTC 發布 Sites 62，狀態 succeeded；正式來源 `baf3da10fedb9ec4fbb74dbc4f90ae04be9e1699`，原網址與 public 權限保留。回復版本 Sites 61／`3fa39c9`。原生部署回傳驗證上線，正式站真人瀏覽器完整操作尚未另做；部署詳細記錄見 DEPLOYMENT.json。
