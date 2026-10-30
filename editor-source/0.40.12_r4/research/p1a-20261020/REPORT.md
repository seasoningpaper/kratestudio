# P1-A 背景選擇修復與驗證（開發版，未發布）

## 範圍與檢查點

只執行 P1-A，未開始 P1-B／P1-C／P2。正式站固定為 Sites 第 49 版、525dd90，名稱 KOI Maker 0.40.10_r49。
發布結果與非瀏覽器驗證限制見 ../release-r49-20261020/RELEASE.md；機器 HTTP 被 Cloudflare 1010 阻擋，不當作真人操作成功。
P1-A 修改前：52ad77e（checkpoint-04010-before-p1a-20261020）；第一批核心修改：61645d3（checkpoint-04010-p1a-core-20261020）。
最新開發版 tag：checkpoint-04010-p1a-saved-20261020；完整 SHA 見交付索引／git。只保存版本，不部署。

## 根因與修復

| 問題 | 修復 |
|---|---|
| 「遊戲畫面」可匯入目前元件圖片，但選取背景時沒有素材庫圖片選單 | 在既有背景檢查器加入同風格的素材下拉選擇；首頁與劇情分別寫入 titleBackground 與 background 事件 scene |
| 章節在首個背景事件前無法指定背景，匯入圖片只留在素材庫 | 使用既有事件模型在章節開頭新增一個唯一 ID 背景事件，重映本章與跨章節跳轉／條件／選項目的地，不新增競爭的資料來源 |
| 編輯器／玩家／功能畫面各自硬編碼 cover，設定未一致套用 | 共用背景呈現 helper；保留 cover／contain，補 stretch、百分比位置與素材尺寸相依的縮放 |
| 功能畫面只有圖片與底色，顯示位置／縮放無控制，JSON import 丟失這些欄位 | 在原有「畫面底色與圖片」區加入既有樣式控制；validateScreen 保存並限制合法欄位；預覽與 SystemSurface 玩家共用設定 |
| 前一張背景的裁切／位置可能影響後續呈現 | 每次由目前事件重算完整背景樣式，背景切換後回復新事件預設值；CG 不繼承場景縮放與位置 |

## 本輪完成

- 首頁背景可選取素材庫圖片，原匯入功能保留；沿用劇情背景選項保留。
- 劇情場景可選素材庫或既有三個內建背景；尚未設定時新增章節開頭背景事件，作為該章初始背景。
- 可於既有「匯入目前元件圖片」直接匯入並套用新背景；背景圖片替換會停止該事件原 backgroundVideo，不刪除影片素材。
- 背景 cover／contain／stretch、水平與垂直百分比；具尺寸資訊素材可縮放 50%–300%，比例依目前畫布及素材計算。
- 存檔／讀檔／設定等功能畫面的圖片、模式與位置使用各頁既有 layout 資料；手機與電腦 profile 分開保存。
- 場景／首頁背景仍隨共用劇情與專案設定作用於電腦／手機，依各自畫布比例適配；沒有自行建立第二份劇情。
- 儲存／重載與 portable 專案保留背景 ID、素材、位置與縮放；範本 JSON 匯出／驗證保留相關欄位。
- 圖層結構與既有演出／立繪／對話 UI 保留，未修改 CSS、HTML、積木編輯器外觀、核心引擎或儲存模組。

## 已知限制／未驗證

- 缺少 width／height 的舊素材與內建背景，縮放控制暫不顯示，100% 維持舊版 cover／contain 行為；可重新匯入圖片取得尺寸，沒有猜測尺寸或自動重寫舊素材。
- 沒有新增全域 defaultBackground 設定；章節初始背景由原有 background 事件表達，避免與事件來源競爭。
- 首頁現有影片功能仍優先於首頁圖片。若設定 titleVideo，需透過既有影片設定停用後才會顯示背景圖；本輪未清掉既有影片設定或重做影片 UI。
- 真實瀏覽器視覺、圖片實際解碼／像素與實機觸控尚未驗收，JSDOM 中的 Image／畫布／座標有 stub；不能將測試視為截圖比較通過。
- 大型真實使用者專案、多瀏覽器、完整 P1-C 回歸未執行。開發版未發布。

## 修改檔案

- src/backgrounds.mjs（新）：呈現計算、標題背景設定、章節背景插入與目的地重映。
- src/background-controls.jsx（新）：沿用現有 label／select／number input 樣式的背景控制。
- src/game-designer.jsx：背景素材選擇、缺少事件時匯入套用、預覽、縮放資料。
- src/menu-template-editor.jsx、src/screen-layout.mjs：背景控制與範本欄位保留。
- src/stage-layers.jsx、src/system-surface.jsx：播放器與功能畫面一致呈現背景。
- src/workspace.jsx、dist/app.js：主編輯預覽共用背景樣式。
- dist/workspace.js、dist/player.js、dist/server/index.js、worker/index.js：重建受影響的 bundles／Worker。
- tests/p1a-backgrounds.test.mjs：9 項必要模型／整合測試；research/p1a-20261020/* 與 PROGRESS.md：證據／進度。

## 實際測試

每個測試命令 timeout 30／40 秒；未安裝套件、未啟動預覽伺服器、未搜尋或繞過瀏覽器工具。
**9 項新測試、10 項受影響回歸，共 19 項去重後通過，沒有未解決失敗。** 原始失敗及修正後結果均保留。

| 命令／範圍 | 實際結果 | 紀錄 |
|---|---|---|
| timeout 40s node --test --test-concurrency=1 tests/p1a-backgrounds.test.mjs（當時 7 案例） | 首輪 5 通過、2 失敗：測試仍期待 Base64，而實際儲存已轉成 Blob URL | first-tests.txt |
| timeout 30s node --test --test-concurrency=1 --test-name-pattern='P1-A title library|P1-A switching a scene' tests/p1a-backgrounds.test.mjs | 改為比對目前素材 URL，兩案一次重試通過；產品邏輯未變 | retry1-tests.txt |
| timeout 30s node --test --test-concurrency=1 --test-name-pattern='P1-A importing|P1-A mobile menu' tests/p1a-backgrounds.test.mjs | 新增兩案：匯入／portable restore 通過；手機案首輪定位到主編輯器的版面選單而非模板選單，失敗 | import-restore.txt |
| timeout 30s node --test --test-name-pattern='P1-A mobile menu' tests/p1a-backgrounds.test.mjs | 改為既有 aria-label「功能畫面版面」後一次重試通過；手機／電腦各自設定、重載與玩家顯示通過 | mobile-restore-retry1.txt |
| timeout 40s node --test --test-concurrency=1 --test-name-pattern='game interface designer|screen layout import|custom save layout|game layout elements|template navigation|autoplay rejection|returning to the same video' tests/design-data.test.mjs tests/pro-revision.test.mjs tests/video-flat-ui.test.mjs | 選定 7/7 通過 | focused-regression.txt |
| timeout 30s node --test --test-concurrency=1 --test-name-pattern='P0-D clean KOI|P0-D global Undo|P0-D event properties' tests/p0d-dom.test.mjs | 選定 3/3 通過 | p0d-regression.txt |
| node --check（每個 timeout 15 秒） | 6 個 .js／.mjs 檔通過，JSX 由實際 esbuild 驗證 | syntax.json |
| node scripts/bundle.mjs workspace player | 兩個受影響 bundle 建置通過；不是 npm 全量 build | 測試使用實際產物 |
| timeout 30s node scripts/build-worker.mjs；timeout 30s node scripts/validate-worker.mjs | 17 資產、ESM default.fetch 通過 | build.txt |
| Worker.fetch 模組讀取（timeout 20 秒） | 6 個主要資產與本機受測檔案逐位元一致 | worker-fetch.txt |
| git diff --check；CSS／HTML／積木／engine／storage／QA 檔與 525dd90 雜湊比較 | 通過、保留檔案完全相同；不是視覺驗收 | preserved-files.json |

沒有重跑 P0-A～P0-C 的全部既有測試；19 個新增／受影響測試通過後，不無故重跑整套。

## 下一輪

先於測試專案人工確認 P0-C 與 P1-A；步驟見 MANUAL-P1-A.md。確認缺尺寸舊素材是否需要補尺寸流程，再決定是否進入單一 P1-B。P1-C、P2 尚未開始。不得把目前 P1-A 開發版當成已部署。
