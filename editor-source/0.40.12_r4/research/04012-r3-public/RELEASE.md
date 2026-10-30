# 已發布：Koi Maker 0.40.12_r3 — 公開測試修訂版

- 正式網址：<https://koimaker.briny-angel-8862.chatgpt.site/>
- Sites第60版，原生部署狀態 **succeeded**。
- 發布來源：`49fa62c2988f103739486d8fad2d2ed61fa41bc8`。
- 部署：`appgdep_6ad9a8a196f481919e1789ce2bf3293b`。
- 原生發布時間：2026/10/22 **14:09:49（台灣）**；發布後active／public／第60版與r3公開測試標題確認，原網址及權限不變。
- 回復：Sites59，正式來源`20901c7d8891e901ca9af0ceb6d2e6cd6e1cfad3`，完整原生archive仍保留；修改前開發點d4e5e7f亦完整備份。

## 發布門檻

既有98/98實際回歸全部覆蓋，含50/300/500四模式、舊專案、Undo／Redo及儲存；8項新風險隔離與1項追加圖片編輯，共107項不重複通過。10語法、build、原34個加1份說明共35個Worker資產通過。沒有以修改期望值掩蓋資料損失；版本／GUI凍結比對只正規化明確授權的版本metadata與原.koib輸入接受欄位。

公開功能：八類容量統計、12px分段條、一般專案四模式與原功能、.koib串流備份／校驗匯入（需檔案儲存選擇器）、門檻內舊JSON與遊戲ZIP。

未開放：>2GiB一般寫入與對應UI匯入／素材新增；大型遊戲ZIP；超過0.256GB的記憶體封裝；超過0.350GB的舊JSON檔案讀入；沒有檔案選擇器環境的大型備份。5.0GB只為政策目標，不宣稱瀏覽器IndexedDB已完成驗證。限制在介面、footer提示與公開發布說明可見，原存檔不被超限操作覆寫。

作者可讀KOI Script未實作，列為下一個優先工作包；現有事件JSON、解析器與ID機制保持可用。

## 發布後確認與限制

原生get_site_version確認Sites60來源／archive／部署ID，get_site確認active／public與r3標題。送出的本機archive內Worker與已驗證輸出一致，35資產local Worker逐byte一致。原生封裝記錄37檔、11,130,880 bytes；原生content_hash與本機gzip／TAR原始hash分別保留，**沒有宣稱原生伺服器封裝已完成逐byte下載比對**（POST-DEPLOY-ASSETS.json）。最初把這些不同層級的hash當成必須相同而產生檢查斷言，已停止該比較，沒有改動產品或反覆重試部署。

正式根頁與發布說明的資訊工具HTTP探測仍不可存取；沒有把原生成功等同真人瀏覽器操作。多解析度深淺色、正式站實際操作、手機觸控、240FPS、音訊聽感及Windows11仍待驗收。這些非阻斷項目依本輪使用者授權於發布後回報。

## 備份與後續

發布前完整來源ZIP已保存，校驗資料見RELEASE.json；最新交付ZIP另包含本發布紀錄與PROGRESS。Git tag `published-04012-r3-sites60-49fa62c` 指向正式執行來源；最新開發接續點以交付ZIP旁檢查點JSON為準。回復ZIP／原生版本資訊見ROLLBACK.json。

接續先整理實際使用回報；下一個主要工作包為KOI Script作者語法，避免重新製作另一套Parser或丟失UUID、未知欄位與草稿。5GB瀏覽器驗收、大型匯出另立工作包，不用測試版標籤冒稱全部完成。
