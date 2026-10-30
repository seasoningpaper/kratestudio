# Krate Studio 0.1.4 驗收紀錄

2026/10/27，發布前正式站 Sites 72，原碼 ec23f195a2d574ed94251255932dc2d118a2f06c。

| 檢查 | 結果與證據 |
|---|---|
| 正式建置 | npm run build 通過，Worker ESM default.fetch 驗證通過 |
| 自動回歸 | npm run test:portal，10 tests、10 pass、0 fail |
| 路由與資料安全 | 17 頁與內部連結可達，未開放帳號／API 仍關閉寫入 |
| 製作器保留 | tests/portal-foundation.test.mjs 逐位元比對真正 3fa39c9 的全部保留 runtime 檔案通過；src、portal/legacy 未修改 |
| 創作流程頁籤 | Chrome 實際點分支，aria-selected=true 且對應 panel 顯示；ArrowRight 切至預覽。自動測試補驗 Home、End、循環方向鍵與焦點移動 |
| 常見問題 | Chrome 點製作好的專案存在哪裡，details 展開顯示正確本機保存說明 |
| 搜尋與分類 | Chrome 搜尋春日 分支，1 個作品；不存在的詞為 0 個作品；清空後選社群顯示尚未開放。自動測試驗證清空與分類組合、文字不注入 HTML |
| RWD | 遠端 Chrome 390/1024 iframe 量測 width/scrollWidth 為 375/375、1009/1009。手機分支示意、標題、連結可讀與可操作。不是實機手機或瀏覽器原生縮放測試 |
| 試玩流程 | 手機 iframe 從創作預覽連到示範遊戲，繼續後顯示兩個選項，儲存進度回報已儲存到目前瀏覽器 |
| 實際劇本下載 | Chrome 點下載練習劇本。工具等待事件逾時，但同步區出現實際下載文件 /workspace/scratch/Krate-第一份練習劇本.txt，與 portal/examples/first-scene.txt 逐位元及 SHA-256 相同 |
| 下載 SHA-256 | 327e9cab63cac00e3342409e9dc2ec1e0e9ea8d2f0e572c2def8948803551953 |
| 歷史腳本相容 | 測試直接讀取 git 3fa39c9:src/script-import.mjs 與 event-catalog.mjs，無 diagnostics；兩條路線抵達不同結局 |
| 先前閃色修補 | news-row 的 will-change:transform 保留，未重改消息列的字色及滑入規則 |
| 發布包排除測試頁 | /qa/ 回應 404，17 頁頁尾為 0.1.4，新增 fragment 目標均存在 |

完整參考研究見 KRATE-014-REFERENCES.md，包含 Canva 與 WebGAL 未完成項目。未宣稱完整體驗 13 個網站的所有功能。

## 正式發布驗證

- 正式發布成功：Sites 73，來源 2ea5bbe9db7c77d35c1eb4441a92d14ca11a3016，deployment appgdep_6ae0407ed3f48191952192d60f40e23e。原網址與公開權限不變，Sites 72 保留為回退點。
- 正式 HTTPS 重開驗證：title Krate Studio 0.1.4、頁尾 0.1.4、20 個 ui-icon、3 個流程頁籤、無背景動態控制。實際點分支後 aria-selected=true，本站來源 error 日誌查詢無結果。
- 正式畫面保存於 research/koi-platform/live-krate-014.jpg 與 live-krate-014-flow.jpg。
