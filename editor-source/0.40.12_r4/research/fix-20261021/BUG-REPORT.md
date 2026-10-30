# 本輪 Bug 清單與根因

|編號／嚴重程度|修復前重現／根因|結果／證據|
|---|---|---|
|H01 High 單一刪除失效|實際bundle接受確認，projectId未定義ReferenceError，未改資料；repeat同樣缺宣告。|已修，ID／章節／repeat集合競態保護與Undo；Fix01-delete-baseline.json、Fix05-first17/17。|
|M01 Medium 積木過高|stackLayout實測高度仍與310px下限max，不能縮回；Fix02-before得到310而非108。|改用有效實測與結構最小值，後繼與吸附同座標；Fix02-final13/13。|
|M02 Medium 欄位壓成直排／擠壓|Flex群組過度收縮、caption為匿名可斷文字；textarea原以明確換行數估高度。|獨立caption、成組換行、scrollHeight內容測量；外形配色未變。真人視覺待驗。|
|H02 High 可選模組缺省值風險|新數值欄位拆除若回復空字串，Number('')會把原預設時間／音量變成0。|以可選fallbackPresent保留未設欄位；JSON重載與Engine預設比較通過。|
|M03 Medium 素材選單資訊不一致|語音列全部音訊，重名難分，缺失ID在原生select可能看似選到其他項。|同一options helper，穩定ID、不猜分類、舊role未分類相容、缺失保留／診斷；6新測試及原素材安全回歸。|
|H03 High 特殊角色target誤解|target數字0被falsy當無角色；null可能碰到字串null鍵。|嚴格字串／數字正規化，0可解析、null拒絕；多角色／跨章／存讀測試通過。|
|H04 High 待原專案重現|截圖fig-right動畫、fig-center退場錯誤；未提供完整事件、分支、前綴、跳轉與角色／資源資料。|仍未排除，阻擋本輪正式發布。現有代表例的有效alias通過，不能替代原案例；不猜其他角色、不隱藏錯誤。|
|M04 Medium Logo不是實際首頁|原只開下拉專案清單。|沿用KoiTabs建立真實專案首頁，保留編輯分頁／草稿／history；Fix06-final16/16。|
|M05 Medium 首頁專案快照過期|新寫入儲存的專案未出現在啟動時registry快照，Fix06-first15/16。|進首頁讀既有listProjects，保護讀取失敗及切換競態；修復後16/16。|
|M06 Medium 待真人|手機模板欄位密集、其餘素材／變數表單布局及多解析度。|沒有虛構瀏覽器結果，保留待驗，不盲改整站CSS。|

此表以可執行案例及實際原碼為準；H04僅確認使用者現象，尚無足夠原專案資料判斷是語法無效、前綴重建、分支或角色映射。角色ID／實例ID／位置alias／素材ID／檔名仍視為不同概念。完整素材reporter與巢狀視覺運算樹為未完成擴充，不能算修復完成。
