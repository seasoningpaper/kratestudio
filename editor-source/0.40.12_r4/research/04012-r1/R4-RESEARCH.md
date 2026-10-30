# R4 六分類盤點與官方技術取捨

參考日期2026/10/21。Scratch網站只回傳需要JavaScript的殼，不宣稱已操作官方編輯器。Scratch Blocks／VM使用公開預設分支README的當日快照；Blockly為當日官方文件，沒有聲稱特定未確認release。未下載整套引擎、未安裝框架、未複製來源程式。

官方來源：
- https://scratch.mit.edu/
- https://github.com/scratchfoundation/scratch-blocks （Blockly為基礎的積木編輯介面）
- https://github.com/scratchfoundation/scratch-vm （workspace事件與AST／執行狀態的分工）
- https://developers.google.com/blockly/guides/create-custom-blocks/inputs/connection-checks （導向docs.blockly.com）
- https://developers.google.com/blockly/guides/configure/web/serialization （官方JSON序列化）
- https://developers.google.com/blockly/guides/get-started/workspace-anatomy

採用原則：Statement前後接合與Value輸出分開檢查；Boolean不是任意真值；C型容器保留完整子樹；shadow對應既有fallback而不是覆寫原欄位；動態渲染依實測尺寸，資料／拖曳／snap共用座標。Koi仍用目前原生事件陣列及blockInputs，不引進Scratch VM或Blockly workspace作第二份真相。工具箱與六分類DOM、顏色、寬度、位置全部保留。

| 分類 | 已有功能（不重做） | 本輪安全候選 |
|---|---|---|
| 劇情 | 對話、選項、輸入、過場、標籤、結局；文字／字串插槽 | 角色資料引用值積木，使用既有角色name執行欄位 |
| 畫面 | 背景、登退場、動畫、鏡頭、變形、圖層、濾鏡、天氣、影片等 | 保留，優先首幀／角色回歸；素材reporter另列後續 |
| 聲音 | BGM／音效／語音、volume、停止、淡化、解鎖鑑賞 | 保留，驗證數值插槽及音訊生命週期；逐事件等待語音暫不新增 |
| 控制 | 秒數等待、次數repeat、條件兩目的、標籤／跨章jump、動畫等待 | 以既有repeat加布林until與硬性上限；不新增無界迴圈 |
| 變數 | 設定／加減、型別管理、文字、布林、好感度／玩家名稱 | 設定／取消旗標模板，單一原生variable事件 |
| 運算 | 字串／數字／布林／變數；算術、and/or/not、random、round、length、join、contains | 補比較≥≤≠及既有安全函式abs／floor／ceil／sqrt／min／max工具箱入口；修正分類內搜尋 |

等待直到外部條件、呼叫／返回、事件一次鎖、多重結構化條件、隨機分支容器、清單、完整角色／素材reporter樹需更完整執行語意／回復規格，先列待辦。無界遞迴、並行變數事件或商業時間軸不納入。本輪不為積木數量重寫GUI。

每個實作候選須先通過單元／DOM／持久化／四模式測試才算完成；本表只是R4決策，不是完工宣告。
