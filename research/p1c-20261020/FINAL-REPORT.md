# KOI Maker 0.40.10 — P1-C 品質驗收報告

## 結果與範圍

由c3e4de4接續r52正式來源31b17bb；P1-C1～C5必要自動化驗收及修復完成，共243個不重複案例通過，完整清單TEST-INDEX.json。不把上輪119案例直接加進本輪，也不把重跑相同案例重複計數。C2早期一項舊測試期待與r52等待規則不同，已在原版重現並更新斷言後通過；原始失敗紀錄保留。沒有尚未處理的已知Critical／High。

不是所有情境已驗證。FEATURE-MATRIX.md共99列：A75、B1、C3、D5、E2、F13。A僅限列明的模型／DOM／離線格式範圍；B／C／D／E／F不算完成，不計整體產品完成率。真人視覺、聽感、觸控、任意真實舊專案與實際大容量均未通過，不以自動化代替。

收到新需求後，本P1-C穩定版本先保存而不發布；正式站維持0.40.10_r52。下一包統一Koi Maker 0.40.11品牌文字與版本，再做相容性／建置檢查，符合門檻才更新同一網址及公開權限。最終部署以RELEASE.md為準，本報告不預告成功。

## 已修復Bug

| ID | 嚴重程度 | 重現／根因 | 修復／證據 |
|---|---|---|---|
| C-01 | High | 無效章節／索引被jump回退、掉落下一章或結束；next／條件／選項同受影響 | 中央跳轉先驗證章節及整數目的，錯誤保留原位置並顯示中文診斷；p1c-story第1／2案 |
| C-02 | High | 明確空target被||回退lastActor，可能錯誤動畫另一名角色 | 區分參數省略與明確空值，空值匯入及執行診斷；targets與empty案 |
| C-03 | High | 字串false經!!成true，音效循環／過場等待／影片／跟隨旗標錯誤 | 一致解析true/false/1/0及裸旗標；flags與相容案 |
| C-04 | High相容性 | 自動辨識漏掉已有legacy命令，變成一般對話 | 依完整既有清單辨識，不新增外部引擎語法；legacy案 |
| C-05 | High | 損壞state／history先被load套用，之後advance／rollback可能錯誤 | 形狀驗證、原子拒絕，合法缺少新欄位舊存檔仍可用；save案 |
| C-06 | Critical | 同類asset ID重複時兩份寫到同一IndexedDB key | 交易／封裝前拒絕空白與重複ID，保留原儲存；c3-duplicate-id-reproduction及修復案 |
| C-07 | Critical | 不同asset ID清理後同名，ZIP只剩最後檔案 | 封裝檔名唯一化而不改事件／素材ID；c3-zip-path-reproduction與碰撞案 |
| C-08 | High | 停止音訊的錯字通道預設all，誤停BGM | 未知通道匯入及執行診斷；原音樂保留，空白預設all仍相容；c4-stop-channel-reproduction及修復案 |

Medium待辦：BGM stems／鏡頭分割素材未完整納入引用清理；逐事件BGM volume／loop雖有解析欄位但未套用。文件與矩陣明確揭露，不將其寫成全部支援。callScene返回堆疊、自帶模型內容與原生進階引擎能力也不宣稱完成。

## 實際命令與結果

所有測試使用隔離副本／測試庫，不修改正式用戶資料；同類問題未超過兩輪失敗修復。不安裝依賴、不啟動預覽伺服器、沒有搜尋替代瀏覽器。

| 工作包／命令範圍 | 逾時 | 最後結果 |
|---|---:|---|
| C1 engine／actor／p0d-model／audio-code-r3 | 45秒 | 39通過（與後續去重） |
| C2 p1c-story＋上述模型 | 30秒 | 48通過 |
| C2 player／gallery／block-audio／p1a／video-flat-ui／device-layouts | 60秒 | 57通過 |
| C2 expanded-interactions／interaction-upgrade／version407／409／image-flow-sections | 60秒 | 47通過＋1舊期待失敗；原r52同樣失敗，修正後單案通過 |
| C3 p1c-assets，node --expose-gc --test --test-concurrency=1 | 60秒 | 6通過 |
| C3 storage正規式選取legacy Base64／many images beyond／transaction failures／font files | 30秒 | 4通過 |
| C3 import-package | 30秒 | 1通過 |
| C4 p1c-script-reference＋p1c-story | 30秒 | 51通過，其中9為前包重跑 |
| C5 p0d-dom／flow-render／actor-isolation-dom／design-data／version408／template-operations | 60秒 | 35通過 |
| C5 p1c-visual-contract | 20秒 | 2通過 |
| C5 audio-code-r3 | 20秒 | 7通過，已去重 |
| npm run build | 60秒 | 成功，Worker ESM檢查通過 |
| node --check變更MJS、Worker 11資產比對、git diff --check | 有界單次 | 通過；詳c5-integrity.txt |

原始stdout、每次失敗與修正紀錄均在本目錄。編輯器新增／刪除／複製／排序、草稿衝突、Undo/Redo與四模式由實際app／bundle在JSDOM執行；沒有重新實作已完成P0功能。

## 素材與壓力

500事件、132素材、8,575,234 bytes：解析23.92ms、引擎建立1.98ms、儲存14.14ms、載入5.91ms，portable回存768.04ms，ZIP 11,483,207 bytes／封裝76.78ms。1000事件有界編譯一次11.93ms。Node＋fake-indexeddb，不是手機／桌機實機效能。RSS前後56,987,648→332,595,200 bytes，不是峰值或洩漏判定；程序已結束。

PNG／JPG／透明PNG／MP3／WAV／MP4真實小檔經ffprobe離線辨識，匯入／備份保留bytes；圖片與影片metadata仍以stub驅動，所以瀏覽器codec未驗。2GiB只測虛擬size的上限拒絕邏輯，沒有把它當真實容量通過。完整數值PRESSURE-500.json。

## 語法文件

30中文劇情指令＋5類事件／設定語法，共35項、各15欄；語法頁、短篇、舊語法、JSON與Markdown參考均更新。42個新文件案例通過；兩份可玩範本各兩條路線到結局，故意錯誤範例有5則中文診斷。KOI Script格式、.koi、API與事件型別不變。BGM逐事件參數與callScene等限制有明示。

## 修改檔案

執行與資料：src/engine.mjs、src/script-import.mjs、src/storage.mjs、src/packaging.mjs。
文件資料／產生：src/script-reference.mjs、scripts/generate-script-guide.mjs、scripts/generate-feature-matrix.mjs、scripts/generate-features.mjs、package.json的build順序。
產物：dist/workspace.js、dist/player.js、dist/server/index.js、worker/index.js、dist/koi-script-*、dist/features-04010.html／dist/features-0409.html、dist/feature-matrix.md、FEATURE-MATRIX.md。GUI CSS、index、logo、圖示、原音效與工程設計在P1-C階段雜湊完全不變。語法說明頁CSS不變，只增說明。
測試：tests/p1c-story.test.mjs、tests/p1c-assets.test.mjs、tests/p1c-script-reference.test.mjs、tests/p1c-visual-contract.test.mjs、tests/p1c-dom-harness.mjs、小型fixtures；既有version407僅調整過時等待期待並保留原斷言。

## 檢查點與未完成

修改前c3e4de4；C1 6f8231f；C2 b95b027；C3 fdbb62f；C4 4ae19f6；C5最終以tag checkpoint-04010-p1c-validated-20261020定位。未發布此0.40.10候選；接續品牌包後另記發布來源。

P0-C原7視覺案例、88測試及10組DOM歷史、原visual-acceptance.zip保留。人工步驟MANUAL-ACCEPTANCE.md。官方比較參考見OFFICIAL-REFERENCES.md：10工具都有來源／檢索紀錄，部分官方頁只取回外框或失敗，不聲稱完整讀過所有引擎手冊。

P2-A先用本矩陣與真人結果更新差距；P2-B先受控修復次要素材引用與BGM參數一致性；P2-C再評估call返回堆疊、模型隔離與工程模式，分包且不與本輪混做。未啟動0.41.11工程模式、Live2D或其他大型模組。
