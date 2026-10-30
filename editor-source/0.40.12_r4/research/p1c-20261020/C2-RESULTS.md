# P1-C2 劇情、動畫及音訊結果

新增9項測試在r52來源上重現6類失敗，修復後與既有39項模型／轉換合計48/48通過。其餘播放器／音訊／背景／裝置／影片57/57通過；引擎功能與舊語法47/48，唯一失敗為舊測試未處理r52已公開的原生等待規則。在獨立r52原始碼副本重現相同失敗後，更新測試為先斷言animation、wait=true、800ms，再advance後驗證原對話；單項1/1通過。不是修改引擎迎合舊測試，未移除斷言。此包共153個不重複案例通過。

修復：
- High：Engine.jump對不存在章節及非整數／越界／空值目的地產生中文診斷，保留原位置；next／條件／選項共用。明確null仍代表終止，數字字串保留相容。
- High：明確空動畫target不再回退lastActor；匯入與執行有診斷。未填target參數的舊規則仍預設最後立繪，文件須明確說明；多角色建議明確ID。
- High：字串false不再被!!當true；音效循環、過場等待、影片跳過／靜音／填滿與鏡頭跟隨一致接受true/false/1/0與裸旗標。
- High相容性：自動匯入辨識改為完整既有legacyCommands清單，audioStop／setTransform等不再被誤當一般對話；沒有新增外部引擎指令。
- High：load驗證state及history基本形狀、原子拒絕損壞資料；合法缺少新欄位舊存檔仍可讀。不是任意外部存檔的完整schema保證。

修改src/engine.mjs、src/script-import.mjs；重新產生workspace/player bundles；新增tests/p1c-story.test.mjs與調整上述一項舊規則測試。沒有CSS／GUI修改；第51版音訊來源未改。原始失敗與通過紀錄均保留。
真實瀏覽器視覺、聲音／影片解碼與觸控尚未驗證，沒有以媒體stub代替。下一包只處理資料與素材安全及有界壓力測試。
