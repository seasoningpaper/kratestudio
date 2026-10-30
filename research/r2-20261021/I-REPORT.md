# R2-I 最後整合與發布門檻

I-build完整成功（22資產Worker ESM）；I-integration 24/24；I-syntax為24個JS/MJS；I-final-assets.json為22資產逐位元與root 200／r2文字。首個臨時資產檢查腳本URL多一個斜線造成404，修正檢查路徑後通過；正式程式無該路徑Bug。已留下可重現scripts/verify-static-assets.mjs。

I-storage初次1/4：transaction舊測試依賴被略過案例的9圖，改為自行先存9張一位元組副本；兩項揭露E的新引用API相容性（同一元件多欄位舊計數為1、未指定種類的唯一ID需清理舊無效跨欄引用、gameUI image原以delete清理）。保留舊計數並附fields明細、指定種類仍嚴格隔離、歧義未指定仍拒絕、gameUI保留delete語義。I-storage-2 11/11涵蓋舊4與新安全／DOM／引用7；沒有放寬資料安全斷言，沒有繼續盲目重試。

目前沒有已重現卻未處理Critical／High。B的兩個角色High、E的跨種類素材Critical與兩項遺留Medium均修復；相容性補修與測試缺陷如上明列。P1-C全套不重跑；TEST-INDEX只計本輪真實執行且去重的案例，歷史249項不直接相加。

發布前必要門檻：角色／跨模式、流程邏輯純布局、模板Undo、舊資料、素材刪除與儲存、音訊焦點、腳本範本、建置／Worker資產／品牌均有相關自動化依據。GUI原規則／Logo等逐位元比對，只有必要控制項與退場keyframes。真人視覺、聽感、觸控／實機長圖保留待驗，不標通過。已知非阻斷限制：11個正交交點／任意手排重疊不保證；局部模板不能超出父區域；全舞台立繪對齊與工程模式未實作；P2-A部分官方頁無正文；完整跨章取代／多代備份延後。

Sites工具只能修改display title，不能修改原生description欄位；HTML title／meta description會採正式新名稱，Sites卡片舊說明可能保留。原URL／public與來源備份需在部署回報中核對。此文件本身不代表已部署，實際狀態見RELEASE.md／RELEASE.json。
