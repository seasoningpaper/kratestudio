# Fix-06 首頁導覽與GUI保護

修復前Logo只開projectMenu下拉，沒有專案首頁。現在使用既有KoiTabs.openTool路由顯示「專案首頁」及同一projectRegistry真實專案清單，支援開啟既有專案、返回目前編輯、新增專案；不建立另一份專案資料、空白展示頁或新網站。切換沿用switchProject／KoiStorage，返回目前專案沿用故事分頁，保留draft、selected及history。既有未儲／草稿／失敗確認保留，取消留原頁，連點不重開分頁。

只使用既有tools-heading／tools-body／project row與button設計，加必要高度與溢出規則；Logo圖檔、brand.css、shared style.css、player.css、theme、Header與media規則全與95a99a3 byte-identical，沒有換色／換字體／換輪廓。Fix02已處理積木caption壓縮。

Fix06-first15/16，一個真實儲存後清單仍為啟動快照，已補每次首頁讀取既有listProjects與ID競態／錯誤保護；Fix06-final16/16（首頁新4、既有Pointer手機12）通過。仍未完成全部模板／素材／變數表單的實體viewport重現，不能以共用CSS未變宣稱GUI全面驗收完成。手機截圖模板欄位密集、全部指定解析度、Logo真機點擊／鍵盤瀏覽器預設動作仍待人工。

官方Logo第56版及21測試歷史保留；本輪首頁目的已更改，舊Logo專案下拉斷言屬歷史行為，不以改掉語意斷言冒稱舊行為仍是首頁。新首頁測試直接驗證工作分頁、實際資料及開啟其他專案。
