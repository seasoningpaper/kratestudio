# 正式發布紀錄 — KOI Maker 0.40.10_r49

- 原 Site：appgprj_6ad04b4f4db081918fe4a0e9d541130f；公開權限與網址保留。
- URL：https://koimaker.briny-angel-8862.chatgpt.site/
- 正式版本：Sites 第 49 版；名稱 KOI Maker 0.40.10_r49。
- 發布來源：525dd90d6962a9d14d1bf44d509e6bf2cf617cd5。
- 部署 ID：appgdep_6ad7584c84888191a3f29d0242d6c09e。
- Sites 原生部署結果：succeeded，failure_message=null；2026-10-20 20:02:32（台灣時間）。
- 還原基準：b3ec877；發布前 tag checkpoint-04010-before-r49-publish-20261020；正式版 tag release-04010-r49-20261020 指向 525dd90。
- 使用已保存、對應 commit 的 archive 部署，未重建產品、未變更 src/dist/worker，未存取使用者本機專案；沒有清除素材或重設資料庫。

## 發布門檻

上次待驗整合案例 1/1 通過；P0-D 12 模型＋7 DOM 共 19/19 通過（包含該案例，去重只算 19）；安全儲存／搬移／失敗保留／portable export 4/4；實際 app 匯入兩張圖片、儲存與輸出 ZIP 1/1。共 24 個不重複測試通過。
語法檢查 dist/app.js、workspace.js 與既有 Worker ESM 驗證通過。產品來源與 525dd90 完全一致，沿用該版本已通過的 workspace／Worker 建置，不做不必要全量重編。
儲存首輪錯誤因篩選時漏掉建立 9 張圖片的前置案例；補齊後一次重試 4/4 通過，失敗紀錄保留。

## 發布後驗證與限制

- 原生部署 API 已回報 succeeded 與原網址，此為實際部署證據。
- 原始碼完整 ZIP 經 ZIP CRC 及主要檔案逐位元比較通過，來源仍是 525dd90。
- 額外 HTTP 探測在 Cloudflare 邊緣被 403／error code 1010 拒絕，不能據此宣稱正式站 HTTP 200 或真人可操作。本輪不嘗試繞過，也不反覆探測。這項是機器請求的存取限制；沒有取得正式站 runtime crash 證據。
- 原生最近 10 分鐘 errors_only 日誌只見 robots.txt、sitemap.xml 的 404／outcome ok，沒有可見應用程式例外。日誌不是完整真人操作驗收。
- 正式站核心功能的真實瀏覽器／手機操作仍未驗證；本機測試產物與已部署第 49 版同源，不將本機 JSDOM 稱為線上端到端驗收。
- P0-C 7 個視覺案例仍「待人工驗收」。依使用者本輪授權，在沒有已知阻斷性資料／啟動問題及自動化門檻通過後發布，不把未驗項目標記通過。
- 剩餘風險為真實字型／縮放／觸控／拖曳與個別舊版大型專案未實機確認；請依 MANUAL-ACCEPTANCE.md 在測試專案完成確認。

## 備份

KOI-Maker-0.40.10_r49-published-source.zip：完整已發布原始碼，git archive 525dd90，ZIP 有效、240 檔、10,077,584 bytes；既有 P0D ZIP、視覺驗收 ZIP 與 b3ec877 均保留。
最新進度與發布後診斷另外保存在本研究目錄，以免改動實際發布的 commit／archive。

## 接續

正式發布成功與備份完成，允許開始單一 P1-A 開發包。P1-A 在獨立開發檢查點，只保存不部署；P1-B／P1-C／P2 不開始。
