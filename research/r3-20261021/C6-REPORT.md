# C6 四模式無損同步驗收

50／300／500代表性事件副本，包含角色show/hide／指定A動畫、圖片／語音ID、變數與多型別、condition／choice、label、等待、跨章跳轉及各事件深層未知JSON欄位。

每個容量執行模型雙次derived循環與實際bundles的事件→積木→程式→流程→事件，程式實際apply後Undo／Redo及IndexedDB重載。每步比較完整事件JSON、ID、順序、options／target／foreign chapter、asset ID及自訂欄位；另用Engine有界執行比較trace與最終state，驗證save/load遊戲狀態。50/300/500另測copy／paste新ID、delete／reorder與跨章目的再經canonical source。未知event type明確diagnostic且apply拒絕，保留原事件，沒有靜默刪除。

C6-final7/7、C6-crud3/3、新增共10，另P0D模型12必要回歸通過。時間與比較範圍見C6-model-*.json及C6-DOM-*.json；500 DOM整體約2.8秒，含固定settling，不是實體瀏覽器幀時間。

第一次6失敗均來自診斷來源scriptLine：事件根層已定義可正規化，但Engine.background會保存整個背景event，仍帶該來源行號。測試只針對此已知診斷欄位做相同正規化；其他unknown欄位全比，沒有改正式程式或放寬為數量相等。第一輪明確修正後全部通過，初始失敗保留C6-first.tap。

限制：實際React模式切換由JSDOM自動化，不等同真人視覺／觸控。只執行代表性一條主分支，非所有組合的窮舉；分支／外章參照JSON完整比對。事件模型／Parser／同步程式未重寫，仍是canonical chapters.events及既有草稿衝突機制。
