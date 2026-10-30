# Koi Maker 0.40.12_r2 最終交付報告

**Sites第59版已發布成功，沿用原網址及public權限。** 發布來源20901c7，詳RELEASE.md／JSON。接續最新136a540，未從較舊73931c8覆蓋來源。

## 完成範圍

- High：修復工具箱取消／延遲相容click重複新增，採手勢狀態與WeakSet一次性交易；保留合法repeat子結構及舊連接模型。
- High：區段刪除改為完整所有權計畫，確認跨章風險、拒絕跨容器誤刪、範圍變動即中止；同一Undo可還原。
- 共同計數定義與本章／專案範圍，沒有修改故事資料湊數。
- GUI依本次授權局部調整：區段操作同列、四頁籤等寬、選取線2px改1px、三種清單分隔線與三種密度；保留Logo、字型、主題、六分類、積木造型與主配置。
- 容量GB顯示由實際bytes／上限衍生；真實上限仍2GiB，不假稱5GB。
- 驗證既有圓角0／4／8／自訂會保存並到達桌面／手機真正Player和HTML5輸出；沒有重做第二套。
- 修正Windows文件產生器的URL檔案路徑使用；完整React／JS／CSS／HTML、npm／pnpm鎖檔、本機工具、測試與既有素材保留。
- 官方功能對照32項×17產品／版本範圍；保守標記無證據項，不把未知視為缺少。沒有複製第三方不相容程式。

## 測試

190項具名不重複通過、19語法、正式build、34Worker資產／root200／r2版本通過。詳TEST-INDEX.json與原始log。

- 預設npm test：60通過；核心新增、區段、設定、引擎、儲存／匯出、localhost及受保護GUI來源。
- 四模式50／300／500：比較ID、全參數（僅排除scriptLine）、條件與跳轉、未知深欄位、資源引用、Engine完整執行trace、Undo／Redo、IndexedDB。
- 事件列表500／1000各一次：500事件模型render337.7ms、選取127.6ms、移動179.1ms；1000事件625.6／173.7／143.9ms。JSDOM含固定settle，不是畫面FPS。
- 500事件四模式模型27.1ms、DOM1279.2ms；不是實機性能保證。
- KOI Script語法／範本／舊格式：42通過，沒有新增或更改公開指令格式。
- 有限存儲4通過：舊Base64、失敗不覆寫、素材刪除與字型／畫面參照。
- 打字機5／35／80字速首提交、過場0／180ms慢載跨章與退場／慢載競態回歸通過。

原始重現失敗及兩種測試fixture問題原log保留；最終同案例通過，沒有放寬功能斷言。新基準只凍結本輪已核准來源；另以r1的品牌／主題／玩家CSS、HTML骨架與baseCSS單一選取宣告差異作嚴格保護。未用DOM代替真人視覺。

## 未完成／待驗

- 背景交叉淡化、遮幕、等待整合：未實作；沿用原背景motion及獨立fade，不添加無執行意義的選項。
- 5GB真實quota／寫入／還原：未完成；維持2GiB，沒有高風險遷移。
- 完整巢狀值樹／素材reporter、Windows EXE、完整Rollback／工程模式：獨立後續工作包。
- 240FPS過場舊景閃回：DOM未重現，不宣稱完全修好。
- 新GUI各解析度／深淺色像素、實機觸控、聽感、Windows11與完整原問題專案：待人工；MANUAL-ACCEPTANCE.md有步驟。
- 受支援HTTP預覽因現有crypto.randomUUID環境限制未能初始化；沒有改寫正常app或使用替代瀏覽器。Native正式部署succeeded／active／public確認，但正式頁抓取工具不可讀；不能宣稱正式站瀏覽器核心互動驗收通過。
- Sites目前截圖仍為58版，作為前基準，沒有假稱r2後截圖。GUI前後差異以R2-4-GUI.md、source diff和原始前圖交付，修改後像素仍待驗。

## 檢查點

| 工作包 | 檢查點 |
|---|---|
| 修改前／完整ZIP | 136a540 |
| R2-1重現與開發啟動 | cf06345 |
| R2-2積木交易 | 2cb5ce8 |
| R2-3區段／統計 | 2962772 |
| R2-4局部GUI | e799d82 |
| R2-5播放器驗證 | 1882e80 |
| R2-6有限研究 | 2437726 |
| R2-7／發布來源 | 20901c7 |

最新交付另含發布後文件，SHA見完整ZIP註記與旁附檢查點檔；執行內容與發布來源相同。回復保留Sites58／2d4ee8a、r1本機136a540與原ZIP。沒有清除使用者儲存、素材庫或改變API／資料鍵／事件ID。

## 修改清單與文件

主要程式：src/block-insert-transaction.mjs、blocks-editor.jsx、section-delete.mjs、sections.mjs、event-list.jsx、storage-format.mjs、workspace.jsx、project-tools.jsx；dist/app.js；必要bundle／Worker輸出。

GUI：dist/editor-fixes.css及style.css一項宣告；dist/index.html只有版本／初始容量文字。品牌素材完全保留。

建置／版本：package.json、package-lock.json、scripts/serve-local.mjs、generate-script-guide.mjs（fileURLToPath）、generate-feature-matrix.mjs、generate-features.mjs、test-local.mjs、verify-static-assets.mjs、src/packaging.mjs。沒有新增npm依賴。

文件：README、WINDOWS-SETUP、LOCAL-DEVELOPMENT-TODO、PROGRESS、FEATURE-MATRIX、KOI Script說明與合法範本、release notes及research/04012-r2全報告。完整測試與歷史成果保留。

下一輪先依人工回報做有限修補；若核心穩定，再獨立實作背景轉場狀態機。5GB與EXE另包評估，不把大型功能塞進本次測試修訂版。
