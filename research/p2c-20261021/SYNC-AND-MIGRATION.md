# 四模式同步與設定畫面遷移狀態

## 本輪已執行的同步依據

C1-baseline.tap包含P0D model12項，C2-regression.tap包含P0D DOM7項。既有canonical chapters.events與program-sync／draft conflict機制保持；C2批次複製／移動／刪除用現有model服務，測試比較ID、巢狀資料、options／跨章target／順序，不只數量。
C2-draft.tap驗證新批次對話修改後，未套用KOI Script草稿不被覆寫並明確標衝突、拒絕過期apply；新選取不建立事件副本。C2保存偏好與C4模板座標通過IndexedDB存還原、Undo／Redo。

上述是本輪直接受影響路徑的必要回歸。**沒有執行使用者指定C6的50、300、500代表性完整專案四模式語意往返**；不宣稱C6完成。500／1000事件列表與300／500圖形導航測試是另一項測試，不能代替四模式往返。

## C5 遷移未開始

本輪沒有修改screen-layout.mjs的schema3、game-ui.mjs、storage.mjs或其key。設定body中的PlayerSettings仍是原群組；沒有把新欄位或按鈕冒充元件化。沒有新增資料遷移、群組schema或寫入正式使用者資料，因此「元件化遷移通過」不適用於本輪，應標記未執行。

下一輪C5先建立獨立來源／測試副本檢查點，再以目前實際renderer（SystemSurface／PlayerSettings）設計子元件ID／action／parent模型。保留schema3原文備份，明確desktop/mobile profile與共用樣式；純函式遷移及idempotence、深層獨立引用、循環父參照／重複ID／無效action診斷、刪除按鈕仍保留底層存讀、保存失敗原子回復，須先驗再接UI。

既有模板與新模板的實際renderer驗收不可由DOM比較冒充；若仍無法完成必要真人操作／高風險資料遷移驗收，保存開發成果並停止發布該變更。C6、C7、C8依序進行，不直接把本輪ZIP部署。
