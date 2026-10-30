# Koi Maker 0.40.11_r3 測試修訂版驗收報告

從最新d898715／已測7594a37接續，未重做P0–P1或C1–C4，原正式Sites54與53回復保留。實際發布狀態與來源以RELEASE.json為準。

## 已完成範圍

C5完成既有模板導航與自訂元件的群組、解除、內建複製、統一圖層及可回復版本化擴充；完整設定表單拆分仍部分實作。C6完成50／300／500完整語意與實際bundles往返、執行、history與儲存比較。C7沿用前輪官方矩陣並有限查核，新增跨章文字搜尋取代、typed批次素材引用修復與統一診斷。C8完成直接影響模組與必要核心回歸、品牌、語法文件與測試修訂發布準備。詳細範圍見IMPLEMENTATION-STATUS.md，未新增工程模式／大型動畫系統。

## 執行結果

173個不重複自動化案例通過（完整名稱及日誌見TEST-INDEX.json）；18個JavaScript／MJS語法檢查通過，JSX由esbuild建置；npm run build成功，Worker23資產與root200、r3版號全量一致。所有結果是本機模型、實際bundle的JSDOM、fake IndexedDB或本機Worker fetch，不能替代真人操作。

|日誌|本次通過|內容|
|---|---:|---|
|C8-core.tap|67|腳本、引擎、背景、素材、品牌初驗|
|C8-UI-media.tap|55|手機Pointer模型、列表、流程、角色／音訊／匯入|
|C8-new-final.tap|25|模板11、創作工具10、r3品牌／可玩遊戲ZIP4|
|C8-storage.tap|4|舊Base64、交易失敗、素材刪除、字型有限儲存回歸|
|C8-sync-migration.tap|21|最終C6十項與C5十一項|
|C6-regression.tap|12|同步模型必要回歸|
|C5-first.tap|12|初次模板與三項既有對齊回歸|

表內重複案例不能加總；索引依名稱去重為173。初次C6六個失敗源於scriptLine診斷正規化，修正測試後通過，C6-first保留；無未解決最終測試失敗。沒有重跑無影響的歷史全套，也未執行512MiB／2GiB配置壓測。

命令記錄以BUILD／ASSETS／SYNTAX及各.tap輸出為依據；直接案例來源tests/r3-components.test.mjs、r3-sync.test.mjs、r3-authoring.test.mjs、r3-release.test.mjs與日誌列明案例。可重現核心新增組合：timeout 180s node --test --test-concurrency=1 tests/r3-components.test.mjs tests/r3-sync.test.mjs tests/r3-authoring.test.mjs tests/r3-release.test.mjs；容量及DOM數值包含固定settling，不是瀏覽器FPS。大型測試受逾時與有限案例約束，無依賴重裝。

## 容量與資料

50／300／500每個規模比較完整JSON、ID、類型、順序、分支／跨章、未知巢狀參數、素材、Engine trace/state及save/load，僅明確正規化診斷scriptLine；不是只比數量。500事件模型雙循環約159ms、DOM全循環約2187ms（單次本機記錄，詳JSON；不同重跑值非效能承諾）。

本輪列表500：render315ms／selection117ms／move146ms；1000：render568ms／selection157ms／move121ms，含85mssettling。500流程：排布約35ms、0重疊、0穿卡、20交線；未保證零交線。原歷史指標不覆寫，本輪C8-capacity複本另外保存。無可靠實機記憶體或FPS資料。

## 發布門檻與限制

本輪已測範圍無已知未解決Critical／High，資料／草稿保護、可回復遷移、舊資料、核心引擎、建置與Worker通過，CSS及主要資料鍵未改。遷移僅明確使用功能才啟用，原文備份、完整回復、未知版本拒絕及跨profile隔離均測試；未驗證的完整表單細拆沒有帶入。

依使用者授權可發布待人工回報的測試修訂版；真實瀏覽器／觸控／聽感／所有任意舊專案仍待驗，見MANUAL-ACCEPTANCE.md。單元測試及靜態比較不等於全功能真人通過。部署必須使用保存並推送的精確來源與其archive，RELEASE記錄原生結果；若失敗保留r2，不宣稱上線。

## 交付索引

C5-REPORT.md、C6-REPORT.md、C7B-REPORT.md、BUG-LIST.md、USER-GUIDE.md、FEATURE-COMPARISON.md／json、根目錄FEATURE-MATRIX.md（110列：A88/B0/C2/D5/E2/F13，非產品完成率）、BRAND-AND-COMPATIBILITY.md、TEST-INDEX.json、MANUAL-ACCEPTANCE.md、PROGRESS.md與RELEASE。原始碼修改清單見MODIFIED-FILES.txt，完整ZIP含歷史與所有測試原始檔。
