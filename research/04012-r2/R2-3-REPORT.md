# R2-3：區段刪除及共同事件統計

根因：區段垃圾桶呼叫一般 deleteEvent，只刪 section 標記，內容留在後面並歸入前區段。頁首 summary 排除 section，頁尾卻加總全部章節的原始陣列（包含 section），且沒有說明統計範圍。

修正：section-delete.mjs 由既有 sections 推導完整所屬 ID，不建立第二套資料。確認訊息列出區段／內容數與跨章引用；取消不變動；確認期間範圍改變則拒絕；跨區段 repeat 邊界明確拒絕，避免誤刪其他區段。沿用 deleteCards 的參照重映射、同一 Undo 交易與四模式資料來源。

事件統計沿用 counts 的既有定義（section 標題不計事件，repeatEnd 仍為執行流程節點），新增 eventTotals／footerSummary；頁尾明確顯示本章與專案總計，不把跨章總數假裝成本章數。沒有刪事件或只硬改數字。現有 flow 區段摘要也使用同一 summary。

修改：src/section-delete.mjs、src/sections.mjs、src/workspace.jsx、dist/app.js、dist/workspace.js。editor-before.log 保存原刪除提示與統計失敗；R2-3-regression.log 記錄 15 項通過，包含既有刪除、跨章目標及 P0-D 雙向／草稿衝突／Undo／儲存。editor-final.log 另包含新增的範圍變動與跨容器拒絕驗證，重複案例不重複加總。

GUI：Sites 原生 get_site 提供第58版正式截圖，已下載並檢視 sites58-before.png（1200×750），其中介面正常初始化。它可作為既有外觀基準；不是本輪瀏覽器操作截圖，不能證明新 GUI 的像素、手機或操作驗收。styles／Logo 尚未變動；區段工具列排版於下一包處理。

容量：本包不修改 2 GiB 應用程式上限；5 GB 需另包評估並完成實際配額／寫入／還原驗證，不能靠顯示 5.0 GB 宣稱完成。
