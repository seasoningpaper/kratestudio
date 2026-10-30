# r3 問題、根因與修復

|嚴重程度／狀態|重現與根因|修改與證據|
|---|---|---|
|High 相容性風險，已阻止|新模板備份放入settings後，原遞迴字型引用掃描可能改寫備份內font引用；先備份模板、再修復／移除字型即可影響還原原文。這是新擴充整合時發現的風險，不宣稱舊正式站已資料遺失。|asset-references visitor排除menuTemplateBackups；typed修復測試比較備份原文不變。|
|High 相容性風險，已阻止|共用screenSync可能複製新component metadata到其他畫面，導致元件ID／群組跨頁污染。|writeProfile只寫指定profile；componentId不走共用外觀；備份、groups隔離。C5跨頁測試通過。|
|High 資料保護，已阻止|未知未來componentVersion或已損壞的備份若重新建立備份，可能失去原版回復能力。|啟用前驗證；拒絕未來版本／壞備份／非陣列群組，UI提示回復；原專案不變。C5十一項通過。|
|Medium 操作缺口，已補範圍|現有設定導覽元件可單選，但缺乏明確group／ungroup與內建元件複製；不是全部畫面只有一個共用物件。|沿用SystemSurface及world座標；新增logical groups／clones／zIndex。內部閱讀與音訊表單仍部分實作。|
|Medium 診斷覆蓋，已補|原檢查清單未全面涵蓋次要stems／模板圖片與空動畫目標。|沿用schema-aware refs及原統一清單，加入已知欄位缺失、event ID及target診斷，保留靜態分析限制。|
|測試定位問題，已修正|C6初次六失敗源於Engine.background整個event保留scriptLine診斷行號，非劇情資料遺失。|只正規化來源行號；仍深比所有其他JSON及Engine trace/state。初次失敗日誌保留，最後全部通過。|

目前本輪已測範圍無未解決Critical／High；不代表任意專案與全部真人路徑均已驗證。原C1–C4手機修復、音訊修復及P0成果沿用，未重新實作。既有流程交線、超大型Fit最小縮放與任意手動布局限制仍保留，見前輪C3與r2報告。
