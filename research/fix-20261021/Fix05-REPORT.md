# Fix-05 刪除與參照風險

已修復可重現High：deleteEvent未宣告projectId／chapterId造成接受確認後ReferenceError。現在以請求時project／chapter／event ID及repeat成員集合驗證；確認期間有排序或切換，不會刪到另一事件。單一垃圾桶僅刪指定ID，保留其他核取，Undo完整恢復。

新增eventReferencesTo只掃正式邏輯參照（choice／jump／condition／next），排除動畫target等ID。單一與批次確認都提示同章與跨章節來源，不無聲修改跳轉；刪除仍沿用原鄰接重接／remap與history。未知事件類型刪除不再因顯示名稱查表失敗。

修復前真實bundle error見Fix01-delete-baseline.json；Fix05-first17/17（新4與原列表13）通過：取消資料零變化、單刪不誤刪多選、跨章警示與Undo、待確認重排拒絕、repeat整組與Undo，以及原列表選取／捲動／容量案例。真機命中／拖曳仍待驗。
