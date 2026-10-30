# P1-C4 語法文件與範本

以解析器、事件目錄、Engine／Player與serializeEvents／compileProgram為依據，建立src/script-reference.mjs。30個中文劇情指令＋事件JSON／設定／介面／功能畫面／互動模組共35項，每項15個必需欄位；沒有假設所有參數都能播放。

已更新線上koi-script-guide.html、koi-script-example.txt，新增koi-script-legacy-example.txt、koi-script-reference.md／json、koi-script-errors.txt。保留原文件頁CSS及表格語言，只補內容。兩份可玩範本皆有兩個選項路線抵達結局；錯誤檔故意有5則中文診斷，明確不是可玩範本。

新增42項參考／範本／35×15欄位／30事件JSON／時間相容／診斷測試全部通過，並重跑9項受影響故事測試，合計51/51。原生等待秒、legacy wait毫秒及原生與舊動畫等待規則分開說明；不變更已公開有效語法。未列專用中文指令的CG、小遊戲、重複事件等用事件JSON／GUI，不宣稱新語法已實作。

新增重現High：停止音訊的拼錯通道原本回退all，可能把BGM一起停掉。改為匯入及執行中文診斷並保留原音樂；空白仍保留all的既有預設。統一剩餘方向旗標與motion等待的true/false/1/0判斷；沒有改有效的舊指令格式。

文件明確揭露：BGM逐事件volume／loop欄位未套用；自帶HTML模型不是原生Live2D；callScene沒有返回堆疊且有不相容診斷；未知欄位不保證有作用；原生條件標籤目前限同腳本；真實codec、聽感、動畫視覺與觸控未驗。

接到新需求：先完成P1-C5及穩定檢查點，再統一品牌Koi Maker與版本0.40.11。此包仍保留0.40.10語法基準；KOI Script語言名稱及格式不改。
