# Debug 檢查

已比對 r1 2d4ee8a、r2 20901c7、r3 49fa62c 及所有 src/player.jsx 歷史的 debug/Debug/除錯/偵錯入口，未找到既有通用面板被隱藏／刪除的證據。早期文件 research/r3-20261021/IMPLEMENTATION-STATUS.md 明記「工程Debug列後續」；9af300c 標題中的 debug integration 不是通用面板程式。

保留既有 Engine、指定事件試玩、錯誤回退與驗證器。本輪在既有試玩版面工具加入「除錯」，直接唯讀投影同一 Engine：章節、事件 ID/序號/類型、選項／迴圈、變數、角色／素材、背景、錯誤及最近30個互動檢查點；明確不是所有自動指令的執行紀錄。沒有第二套播放器或正式資料修改。

2項測試通過：投影可修改而不污染 Engine；實際 bundle 入口、暫停、專案不變與 standalone 完全沒有入口。真人點擊／小螢幕布局待驗。不宣稱已找到並原樣恢復歷史通用 Debug 面板。
