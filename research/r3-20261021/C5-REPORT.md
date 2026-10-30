# C5 模板元件與群組

從d898715接續；沒有重做C1–C4。既有settings的header／body／close與nav:history/save/load/settings/gallery/close本來已是各自元件；本包補logical grouping、解除、內建元件建立複本、統一圖層、版本化備份／回復，沿用原移動／大小／多選／對齊／分布／隱藏／鎖定／Undo與真實SystemSurface。

資料擴充為可選componentVersion:1、componentGroups（扁平集合）；原schema3及所有舊keys／事件／素材／API保持。只在使用群組、解除或建立複本時啟用，載入舊專案不自動寫遷移。每個元件仍以既有key或extras.id唯一識別，內建另記profile限定componentId。群組只展開選取集合，不引入第二render tree或坐標系；不支援巢狀group，拒絕循環、缺失、重複、多重父成員。群組移動修改既有世界座標；縮放控制點仍針對單一元件，非群組整體縮放。

每頁首次啟用保留原desktop/mobile原文至settings.menuTemplateBackups；「回復元件化前版面」一次回復整頁兩profile。獨立備份與group metadata不跨page同步；共用外觀遵循原screenSync，但componentId不複製到其他頁。刪除內建按鈕為hidden，底層存讀與設定actions不刪除。新增複本保留action且巢狀資料獨立。

11個新增自動化通過，3個原對齊DOM回歸通過（初次12/12，後補跨頁隔離後C5-final10/10，最終C8-sync-migration含C5十一項全部通過）。包含desktop/mobile原文備份與原地不變、idempotence、完整回復、群組校驗、深層獨立、匯入群組與圖層、導航真實UI／history／IndexedDB。資料安全細節是本輪程式檢查發現並於驗證前補強，沒有失敗修復重試循環。

使用範圍：設定頁導覽／標題／背景內容容器與自訂文字、圖片、按鈕、底圖可操作。PlayerSettings內閱讀／音量滑桿仍屬於原內容表單組件，本包沒有把每個表單控制項改成獨立任意畫布元件；此細粒度拆分列後續，不能稱全表單自由拆分完成。群組框整體resize、巢狀容器與實機視覺仍未驗。沒有新增事件指令或模板第二預覽器。

補強：不支援的未來componentVersion、非陣列群組、損壞備份均拒絕修改並提示；避免無法回復的覆寫。
