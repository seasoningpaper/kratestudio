# Fix-07 整合及資料驗收

Fix07-integration26/26：包含新layout／typed modules／asset targets／delete與r3-sync十項；50／300／500事件跑模型及實際bundles的事件→積木→程式→流程→事件，深比所有JSON（僅既定診斷scriptLine正規化）、ID、參數、資源、分支／外章、未知欄位、Engine trace/state、UndoRedo及IndexedDB。500 DOM約2262ms，含settling，非實體瀏覽器FPS。另原1000事件列表有界案例在Fix05中重跑，原指標未覆寫，本輪JSON另存。

Fix07-brand4/4：原圖／透明圖示、18主題與真實儲存新document恢復。Fix07-legacy-assets6/6包括舊未知role相容，沒有修改role／ID。可玩遊戲ZIP1/1、含9MB圖片匯入／ZIP1/1、有限舊資料／交易失敗／刪除／字型儲存4/4；沒有執行512MiB／2GiB配置壓測。所有完整結果依TEST-INDEX去重，不累加歷史173或Logo21。

完整npm build成功；最後assetOptions相容補修只重建受影響workspace與Worker，最終30資產逐位元組、root200、版本r3與ESM通過；12最終JS/MJS語法通過。沒有安裝相依、重複開發伺服器、啟動替代瀏覽器或不限容量測試。

本輪沒有新增KOI Script指令、儲存key或主事件格式。新blockInputs可選metadata向下相容，現有primitive欄位仍是唯一執行值；舊版本不認得的新插槽視覺可被當loose reporter，執行參數仍保留，完整回復務必先匯出備份。既有舊binding無fallbackPresent仍按原fallback讀取。

真人排版／觸控／聽感與原問題專案H04未過，測試通過不等於所有功能正常。本輪停止發布；正式版維持Sites56。下一步先處理H04及剩餘模組／GUI，再驗收Fix08。
