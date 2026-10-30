# 本輪 Bug 與剩餘風險

|ID|嚴重度|重現／根因|檔案／修復|實際結果|
|---|---|---|---|---|
|C2-01|Medium|列表編輯游標與批次集合共用select更新|app.js／event-list：獨立callback與核取|C2前2項通過；不改canonical事件|
|C2-02|High|批次刪除confirm等待期間chapter可變，回呼讀取新上下文|app.js：提示前鎖定project/chapter，切換取消|C2確認／切章／Undo測試通過|
|C2-03|Medium（開發中發現）|收合設定selected觸發新reveal effect再次展開|event-list：標頭不強制展開|C2-first初敗，retest通過|
|C3-01|Medium|原transform視圖沒有可拖動捲動軌、普通wheel強制zoom|workspace／flow-navigation／scrollbars：同一view投影與明確手勢|C3全9新增通過；真人未驗|
|C4-01|High|palette touch-action:none，未分垂直捲動意圖|blocks-editor與兩CSS：pan-y、取消ghost／抑制尾click|修前重現失敗，修後通過|
|C4-02|High|GameDesigner drag無pointer owner，次要手指可move/up提交|game-designer：owner guard／primary guard|修前失敗、修後通過，桌面回歸通過|
|C4-03|High|MenuTemplateEditor同上，含框選|menu-template-editor：owner guard|修前失敗、修後通過|
|C4-04|Medium|模板失capture未結束草稿，後續up仍寫入|兩模板：cancel回復ref／草稿，blur／resize取消|兩個修前失敗、修後均通過|
|C4-05|Medium|積木雙指只移動中點，未使用距離|blocks-editor：距離比例與中點座標|修後自動化通過，不算實機通過|
|ENV-01|環境限制|HTTP內部Chrome沒有crypto.randomUUID，defaults初始化中斷|不改正式HTTPS應用來補預覽環境|真實瀏覽器操作驗收未完成，停止重試|
|FLOW-REMAIN|Medium|有交點、Fit最低20%、任意手排重疊|沿用r2／C3，沒有重排故事|500／26選項本輪20交點、0重疊／0穿卡；後續優化|
|MOBILE-REMAIN|待驗|原生觸控／安全區／長按／遮擋及聲音聽感|見MANUAL-ACCEPTANCE.md|未執行；不宣稱全部手機問題修好|
|MIGRATION-REMAIN|發布門檻|C5與C6尚未開發／驗收|見SYNC-AND-MIGRATION.md|不部署本輪來源|

已測範圍最後無失敗；沒有以此宣稱全系統不存在其他Critical／High。未測功能與環境限制維持待驗。
