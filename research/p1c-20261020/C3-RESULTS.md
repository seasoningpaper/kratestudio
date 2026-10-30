# P1-C3 素材、相容與容量

本輪新增6項素材／壓力案例、4項既有安全儲存及1項實際app匯入ZIP回歸全部通過。

重現並修復兩項Critical資料遺失風險：
1. 同類素材ID重複，IndexedDB以同一key寫入，前一素材會被覆寫。saveProject及zipGame共用assertAssetIds，在交易／封裝前拒絕空白或重複ID，保留原儲存；不重新編號或猜測舊參照。
2. 不同自訂asset ID經檔名清理後產生同一路徑（a:b與a/b），ZIP原本只剩最後一份。封裝加入有界唯一檔名，事件ID與資源ID不變。兩個原始失敗紀錄均保留。

真實合成PNG／JPG／WAV、既有MP3及ffmpeg產生MP4通過ffprobe離線格式辨識，匯入／儲存維持原始bytes。圖片尺寸與影片metadata使用明確stub；不表示各瀏覽器解碼或音訊政策已驗證。空檔、不支援音訊、副檔名配對、重複檔名需完整路徑、無效圖片與尺寸0均有測試。主要素材引用移除不改原專案。

有界500事件／132素材，8,575,234 bytes；解析23.92ms、引擎建立1.98ms、儲存14.14ms、載入5.91ms、portable備份回存768.04ms、遊戲ZIP 11,483,207 bytes，封裝76.78ms。1000事件只執行一次編譯與ID檢查，11.93ms。逐項數值見PRESSURE-500.json。

Node.js＋fake-indexeddb，不是實機瀏覽器效能；RSS由56,987,648至332,595,200 bytes，是前後快照而非峰值或洩漏結論。測試程序已結束並釋放程序資源。未跑長時間循環、512MiB／2GiB真實容量／瀏覽器quota；只以虛擬size測上限拒絕邏輯，明確不算容量壓力已通過。

新發現Medium待辦：BGM stems與鏡頭分割圖未納入引用掃描／移除清理（c3-secondary-reference-audit.txt有實際輸出）。手動刪除這些次要資源會留下空效果／無效引用；主要音軌與專案不被覆寫。列P2-B受控引用修復，不在本輪擴充。其餘持續記憶體、任意舊真實專案與裝置codec未確認。

修改src/storage.mjs、src/packaging.mjs及workspace bundle；新增tests/p1c-assets.test.mjs與小型合成測試fixtures。沒有修改正式用戶資料或GUI。
