# Koi Maker 0.41.0-dev.2：Debug 與回歸報告

日期：2026-10-23（台灣時間）。基準：37368994a75f295af58bd374e00caf59a96886c9；分支 feature/desktop-0.41.0。本輪只做確認問題的修復與驗證，沒有重寫製作器或部署正式網站。

## 已確認的問題與修復

| 編號／程度 | 原因與重現 | 最小修改 | 驗證結果 |
|---|---|---|---|
| D01 High 素材保存錯誤 | 素材 A 上傳中將編輯中的專案換成 B；提交後快取從即時專案讀取 B 的來源字串，卻連到 A 的原生檔案；下一次儲存錯存 A | native-storage 的快取只使用該筆儲存快照的來源，禁止讀回可變專案 | 修復前實讀磁碟為 00 01 02 03，預期 04 05 06 07；修復後實際二進位正確 |
| D02 High 儲存交易卡死 | projectDB 開啟在 try 外，遇到不支援的 Schema 就跳過 abort，後續永遠顯示「同一專案已有儲存交易」 | 將資料庫開啟納入 try／abort／可選 close | 原案例先失敗，修復後拒絕舊開啟且可開始下一筆交易 |
| D03 Medium JSON 副本故障阻止讀取 | SQLite 主資料完好，但 project.json 同名目錄／權限等錯誤使 load 拋錯；每次重試還遺留暫存檔 | 鏡像寫入可診斷降級，仍以 SQLite 主資料開啟；只清理本次私有暫存檔 | 先重現 EISDIR；修復後可讀取，warnings 與現有 toast 可通知，暫存檔未累積 |
| D04 High 關閉／重載未等待儲存 | 原程式沒有保存握手；before-quit 先關閉 SQLite，連後續嘗試儲存都無法完成 | Main／Preload／Renderer 保存確認、修訂檢查、取消／明確放棄、最多兩次保存嘗試；SQLite 延後至 will-quit 關閉 | 控制器、握手與同一實際 UI 保存測試通過；Windows 視窗 X／選單／系統退出仍待真人驗收 |
| D05 High 完整新專案重開後消失 | 專案 SQLite 提交成功，但索引啟用前終止；新專案仍是隱藏列 | 索引 v0→v1 增加 pending_save 標記，恢復時檢查 Schema／quick_check／專案與素材身分、大小後才啟用 | 真實子程序在索引更新前 process.exit(77)，修復前清單 0 筆；修復後找回專案 |

前三個實際失敗案例保存在 reproduce-save-bugs.log，中斷案例保存在 reproduce-recovery.log。沒有藉改掉測試預期掩蓋錯誤。新加容量測試第一輪的 fixture 缺少編輯器已正規化的 settings，補齊有效 fixture 後通過，未改斷言；這不列為產品 Bug。

## 資料遷移與恢復邊界

- 原有 catalog 為 user_version=0，新增 pending_save 欄位預設 0，保留既有資料與所有鍵值。v1 指的是索引資料庫版本，不更改現有 project.sqlite 的 v1 或事件資料格式。
- 舊已刪除列沒有中斷標記，不會被自動復活。已完成／未完成／無效資料分別記為 restored／incomplete／invalid；無效及未完成原檔保留。
- 恢復報告寫入 userData/recovery-report.json，並使用現有 toast 提示。沒有新增儀表板或更改 GUI 布局。
- 已測一個精確的提交後中斷位置、首次儲存前中斷、損壞資料拒絕與舊索引遷移。不是所有斷電、磁碟故障或 5 GB 情境皆已驗證。
- 玩家存檔仍採原有序列化鍵、由桌面 SQLite 保存；舊瀏覽器玩家資料的完整遷移與 .koimaker 封裝仍未完成。

## 測試紀錄

| 範圍 | 實際結果 | 日誌 |
|---|---|---|
| 原版建置與 Worker | 成功；36 個應用資產，ESM fetch 有效 | baseline-build.log |
| 原版預設回歸 | 106／106 | baseline-web-tests.log |
| 桌面修改前基準 | 26／26 | baseline-desktop-tests.log |
| 第一批儲存修復 | 3 個失敗重現修復後通過；整組 29／29 | save-fix-tests.log、save-fix-regression.log |
| 關閉／重載修復 | 35／35，含保存、錯誤取消、明確放棄、重試上限、偽造／過期回覆、Renderer 無回應 | close-tests.log |
| 額外系統回歸 | 21／21，含 50／300／500 事件四模式、角色目標與背景 | extended-system-tests.log |
| 最終 TypeScript | 通過 | final-typecheck.log |
| 最終桌面建置 | Main／Preload／Renderer 成功 | final-build.log |
| 最終桌面測試 | 42／42；原有 26 項＋本輪 16 項 | final-tests.log |
| Electron 45 內建 Node／SQLite | 同一 42 項再次通過，不重複計數 | electron-tests.log |
| Windows x64 解壓開發包 | 實際產生 KoiMaker.exe | windows-pack.log |
| PE／ASAR 核對 | x64 PE，8 份關鍵檔案與 out 位元組一致，SHA-256 已產生 | package-verification.log |

本輪不重複計數共 169 個案例：原版 106＋桌面 42＋額外系統 21。新增桌面案例 16 項（儲存 3、關閉 6、恢復 4、容量與模型 3）。桌面與 Electron 重跑不增加案例總數。

原版 src／dist／根目錄 package／lockfile 未變，106 項基準不因桌面修改重複執行。沒有無限制全專案掃描、安裝新依賴或無限制壓力測試。

### 50／300／500 事件

- 額外既有測試在實際 bundles 的 JSDOM 介面中，執行四模式、套用、Undo／Redo、IndexedDB 及引擎 trace；50／300／500 的該情境耗時約 807／969／1,174 ms。精確紀錄在 performance/，不是 Windows 瀏覽器效能保證。
- 另加 3 個原生 SQLite 案例，比較事件全欄位（只允許 scriptLine 正規化）、未知巢狀欄位、ID、執行 trace，關閉重開資料庫後完全一致；遊戲快存透過 SQLite 還原後 state 一致。
- 沒有執行 4～5 GB 大容量寫入，不能據此宣稱 5 GB 正式支援。

## GUI 保護

沒有修改原版 CSS、Logo、字型、積木、主導覽、播放器或主要布局。既有測試比較桌面與網頁 DOM（版本／script 除外），4 份 CSS 與 2 份 Logo 位元組一致。新增的是資料保護的原生確認對話與現有 toast 訊息。

DOM／CSS 比較不是真人視覺驗收。未執行 Windows 實機觸控、DPI、240 FPS 錄影、音訊聽感或真正 Electron 視窗 E2E。原版打字機／過場／角色生命週期的既有自動化回歸通過，不宣稱真人閃爍問題已完全驗收。

## 版本與檢查點

- 修改前回復：3736899，標籤 debug-base-3736899，原始碼 ZIP 已保存。
- 儲存修復：a2caf8a。
- 關閉／重載：86fc5f1。
- 索引中斷恢復：82a2769。
- 最終交付提交另記在 DELIVERY.json 與 Git 分支；本報告隨該提交打包，避免以自我參照提交號誤標。
- 桌面開發版本：0.41.0-dev.2；不是正式 0.41.0。正式門檻仍為 false。
- 正式網站維持 Sites61／0.40.12_r4，原網址、公開權限未改；沒有呼叫部署或建立網站。

## 尚未完成與下一步

1. Windows 10／11 真實啟動、原生關閉／重載／取消離開、離線、音訊／影片、DPI 與觸控驗收。
2. 更多寫入時機的強制終止、實際斷電、磁碟滿、4～5 GB 大素材及完整備份還原；目前只保證已測案例，不宣稱 crash-proof。
3. 完整舊版瀏覽器專案／玩家資料遷移、.koimaker、原生另存、完整快照與回復介面。
4. 獨立 Engine Core／版本化 IR／Scene Graph、獨立遊戲 EXE、正式 NSIS／Portable、品牌 EXE 資源／簽章及 GitHub Windows CI 實際執行。
5. 核心清單沒有新增已重現但未修的 Critical／High；仍有上述未驗證範圍，因此不能說全系統零 Bug 或正式桌面版完成。

下一輪先以本開發包在 Windows 驗證原生視窗與保存流程，取得實際錯誤紀錄後修補；不需重做這三批已保存的修復。
