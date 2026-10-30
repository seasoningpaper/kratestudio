# 0.41.0_r4 — 最終驗收與發布

接續 `77d8d7c`，完成真實瀏覽器流程節點拖曳／連線重接／縮放平移、積木加入／拖曳／拆分／條件與重複容器、Undo／Redo；五種桌面尺寸與高縮放等效 CSS 視窗複核。短視窗讀檔屬性欄 29px 的阻斷缺陷已限縮修復並在 Chrome 驗證可捲動操作，頂部布局未改。版本顯示已設為 0.41.0_r4；最終建置、119 主回歸、16 SoftFlow 測試、39 靜態資產檢查通過。Chrome 原生縮放因此環境控制限制未驗證，等效視窗及其限制詳 `research/0410-r4/FINAL-QA.md`。

**已發布**：原網址、public 權限不變，Sites 65，來源 `39a7cbcfd6c7e479061a0e8c4e999d5c363204df`，部署 `appgdep_6adcbec0727c8191a99dd2c4b596e033` 成功。正式瀏覽器重開後標題／頂部／側欄均顯示 r4。Sites 64／`f2db202` 仍為可回復版本；實際部署與 archive hash 見 `research/0410-r4/DEPLOYMENT.json`。

---

# 0.41.0_r4 — R1 來源與備份

Sites64／f2db202、遠端HEAD 3f9d5d7已核實。建立feature/softflow-0.41.0-r4與r3檢查點；完整ZIP／bundle與SHA記錄於research/0410-r4/R1-BACKUPS.json。已讀取七張最新缺陷圖與0.40.12真正來源3fa39c9。資料格式、storage與正式站未變更。

---

# 已發布：0.41.0_r3／Sites64

2026/10/24 15:10:33（台灣）部署succeeded；來源f2db20232f5349b2907c3836fdcf549e8c9b81ae，原URL／public保持。正式站瀏覽器確認r3。後續只補發布證據／報告，不變更已發布應用程式。

# 2026/10/24 — 0.41.0_r3 SoftFlow 1 修復

接續Sites63／3ad56d9。五級文字／舊!important、材質、常駐選取框／事件疊框、FilePicker、CodeEditor跨專案生命週期及內建場景預覽完成修正。保留Logo、模型、引擎、儲存、播放器與桌面布局。

主回歸116/116，50/300/500整合3/3，去重119；五級DOM與雙主題16組RWD無整頁溢出。瀏覽器真實草稿衝突／Undo／Redo／專案切換／匯入／播放器通過抽驗。全站全量及95件完整研究仍未完成，詳research/0410-r3/FINAL-REPORT.md。

發布與最終SHA以research/0410-r3/DEPLOYMENT.json為準。Sites63／3ad56d9及62／baf3da1保留回復。

---

# 2026-10-24 — 0.41.0_r2 來源重建與 SoftFlow 1

- 原83d7272／eac47dc／bfdc11e無法取回；從驗證0.41.0完整來源5f4a6ac／Sites62受控重建，沒有假稱復原舊r2。
- H1～H7已各自提交、ZIP、Git bundle、SHA並同步feature/softflow-0.41.0-r2，H8收錄最終驗收。
- 連續底線導航、Header四模式、設定主題、共用表單／FilePicker、受光／五態、頁面與樹／工具列整合完成。移除指定批次引用修復UI與編輯器和弦，普通音訊／引用保留。恢復可見匯入／備份入口。
- 核心／Logo SHA保持；50/300/500語意與儲存往返及Chrome實際500副本／主題／CRUD／草稿重載／預覽通過。
- 主回歸115/116通過，單一重載案例重跑1/1通過；小套件再次執行輸出不完整，不冒稱全套一次全綠。限制與失敗記錄完整保留，不無限重跑。
- 研究128候選（5技術／20日期／103待核），未達150；15張不同原截圖已檢視。
- 真實部署狀態見research/0410-r2/DEPLOYMENT.json；尚未寫入成功狀態前不宣稱已發布。
- 完整報告：research/0410-r2/FINAL-REPORT.md、H3-DEFECTS.md、H8-BROWSER.md；下一輪先評審18項畫面，再獨立追查自動化草稿重載不穩定與實機驗收。

---

# 2026-10-23 — 0.41.0 線上版 SoftFlow 1

- 接續最新桌面分支 `de9e1ac`，沒有回退既有修復。
- 已整合最新選定設計至真正四模式編輯器；保留正式 Logo、原資料格式與瀏覽器持久化。
- 111 項自動化通過；正式建置及 38 個 Worker 資產檢查通過。
- 受支援瀏覽器確認配色、編輯、儲存重載、四模式、Logo 保護及實際遊戲預覽；375／768／1024 與 1363px 版面已檢查。實機觸控與完整真人劇情仍待驗。
- 已發布 Sites 62，原網址與 public 權限保留；來源 `baf3da10fedb9ec4fbb74dbc4f90ae04be9e1699`，狀態 `succeeded`。上一正式版 Sites 61／`3fa39c9` 可回復；詳細資訊見 `research/0410-online/DEPLOYMENT.json`。
- 網頁版沒有宣稱完成桌面 SQLite、獨立 EXE 或完整 5 GB 安全儲存驗收。
- 詳細範圍、已知限制及測試紀錄見 `research/0410-online/REPORT.md`。

---

# 2026-10-23：0.41.0-dev.2 Debug 修訂（未部署網站）

接續3736899，已保存三批修復：素材儲存競態／失敗交易與鏡像降級 a2caf8a；關閉／重載保存保護 86fc5f1；索引中斷恢復 82a2769。

原版106、額外系統21、桌面42項自動化通過（共169個不重複案例），同一42項於Electron 45內建Node再次通過；型別、建置、Windows x64解壓開發包及PE／ASAR核對通過。50／300／500事件含四模式與原生SQLite往返已驗證。

GUI／CSS／Logo與原版src、dist、儲存鍵不變。Sites61／r4未部署更新。Windows真人、240FPS、聽感、觸控、4～5GB實寫與完整遷移仍待驗；不是0.41.0正式版。詳細失敗重現、修復與紀錄：research/desktop-debug/REPORT.md。

---

# 2026-10-23：桌面開發環境已恢復（開發分支，未更新正式站）

已還原同一儲存庫 `072c529`，核對正式來源 `3fa39c9`，建立 `feature/desktop-0.41.0` 與修改前回復標籤。核心桌面檢查點 `2ad5e2d`；保留所有 0.40.12_r4 原始修復，沒有變更原 GUI/CSS/Logo、src 或 dist。

原版 build／106 測試通過；原生 SQLite／provider／四模式整合與安全門檻 26 項通過，Electron 45 內建 Node 執行相同 26 項也通過；TypeScript、桌面 build、Windows x64 解壓開發包成功。Windows 真人啟動、正式 Installer／Portable、完整遷移、Engine Core 分離尚未完成，不標記 0.41.0 正式版。

完整操作步驟：desktop/README.md；實際命令與限制：research/desktop-0.41.0/REPORT.md；正式門檻：desktop/P0-STATUS.json。下一工作包先驗證 Windows 原生啟動、未儲存關閉與 crash-recovery，再接續遷移／封裝。原網站維持 Sites61／r4。

---

# 已發布：Koi Maker 0.40.12_r3 公開測試修訂版（Sites60）

原生部署succeeded，台灣2026/10/22 14:09:49；發布來源49fa62c2988f103739486d8fad2d2ed61fa41bc8。發布後active／public／第60版與r3標題已確認，沿用原網址。Sites59／20901c7完整回復archive保留。

本輪98/98既有回歸與8項新隔離、1項追加圖片編輯共107項不重複通過，10語法、build與35Worker資產通過。一般寫入仍限2GiB、5GB IndexedDB未開放；0.256GB記憶體封裝與0.350GB JSON讀入門檻可見。保留容量分色與串流備份；無資料庫遷移、ID變更、Logo/CSS/布局重設或使用者資料清除。

發布前完整source ZIP已保存，最新交付再包含發布結果。作者可讀KOI Script仍待下一優先工作包。真人正式站互動／像素／觸控／240FPS／聽感／Windows11仍待驗；HTTP資訊工具不能讀正式頁，未假稱真人通過。詳research/04012-r3-public/RELEASE.md、REPORT.md與TEST-INDEX.json。

---

# 最新：0.40.12_r3 公開測試修訂版通過發布前驗收

接續d4e5e7f；本輪只做風險隔離、版本、必要回歸與發布，沒有實作新作者語法或大型模組。實際部署狀態以research/04012-r3-public/RELEASE.md為準，尚未收到成功回應前不宣稱已上線。

風險隔離：一般專案寫入／素材新增／字體匯入／圖片副本沿用r2的2 GiB上限；5.0 GB為政策目標、IndexedDB大容量未開放。保留八類容量面板、.koib串流備份與一般JSON；大型JSON／遊戲ZIP及沒有檔案選擇器時的大型備份有明確安全門檻。超限時不覆寫原存檔，不清除使用者專案。

既有98/98回歸覆蓋通過（版本斷言按授權版本更新，保護語意不變）；8項新隔離／入口案例及1項額外圖片編輯回歸，共107個不重複案例通過。10項JS語法、JSX建置、35個Worker資產逐byte檢查通過（原34個加1份發布說明）。50/300/500四模式完整欄位／執行軌跡、Undo／Redo與儲存回歸通過。

GUI保護來源比對通過；本輪不改Logo、配色、字型、CSS、積木與主要布局，只更新必要版本與容量限制文字。真人像素、觸控、240FPS、聽感與Windows11實機仍待驗收。Sites59／20901c7的正式回復archive已由原生工具確認保留；d4e5e7f開發備份另存。

KOI Script作者語法為下一個優先工作包，現有完整事件JSON、ID與草稿保護保持原樣。詳research/04012-r3-public/REPORT.md、TEST-INDEX.json。

---

# 最新：r3 儲存開發成果已保存，未發布

正式站仍為 **0.40.12_r2／Sites59**，public、原URL與已發布來源20901c7保留。接續點49161bc；修改前ZIP與tag before-04012-r3-49161bc保存。沒有清除正式使用者資料，無法在此替使用者裝置備份IndexedDB。

R3-A完成來源／原始碼備份與GUI來源基準。R3-B部分完成5,000,000,000-byte政策、實際Blob統計與原子／配額保護、.koib串流備份。R3-C完成原容量面板12px分段條／八類圖例與十進位GB；僅局部容量CSS，Logo／主題／字型／六類積木／主配置不變。逐包檢查點85bc113、36761fe、848a0b6；最新交付檢查點以ZIP旁索引為準。

受控真實磁碟素材4.99GB往返／CRC通過，總70.48秒、觀測峰值RSS122,171,392bytes，暫存已清除。**不能代替瀏覽器5GB IndexedDB驗證。** 本輪有限npm test74通過；四模式50/300/500 model+DOM共6項通過；舊儲存4項、9語法、build與34Worker資產通過。原匯入／匯出入口整合另2項通過；去重98項實際通過，名稱／log見TEST-INDEX.json。首次功能回歸79/80，1項舊r2固定2GiB斷言不適用新政策，保留失敗，未改舊期望值假裝通過。

發布阻斷：真實瀏覽器>2.1GB／近5GB未測；大型遊戲ZIP安全路徑、不支援儲存選擇器裝置的大型備份、大型舊JSON匯入未完成。開發版有記憶體安全門檻，這些大型路徑會明確拒絕，不能直接替代正式版。作者語法R3-D尚未修改，編輯器仍r2JSON；不能冒稱r3完成。因此保存本輪成果並停止發布；不是因一般真人聽感待驗延後。

完整報告：research/04012-r3/FINAL-REPORT.md。接續步驟：research/04012-r3/NEXT.md。真實視覺／觸控／240FPS／聽感／Windows11仍待驗。沒有猜測Work額度，沒有啟動新大型重構或新的正式網站。

---

# 已發布：Koi Maker 0.40.12_r2（Sites59，測試修訂版）

發布來源20901c7d8891e901ca9af0ceb6d2e6cd6e1cfad3；Sites原生部署appgdep_6ad8ffb6539c81918cdb33b808d73041 succeeded，發布後active／public／latest59及r2標題確認，原網址與權限保留。完整發布來源ZIP在部署前保存；Sites58／2d4ee8a與修改前136a540保留回復。

190項不重複自動化、19語法、build及34Worker資產通過。修復手勢重複新增／取消、區段完整刪除、共同統計；局部GUI有依本次授權調整（詳R2-4），沒有更換Logo、字型、主配色、六分類或主配置。詳research/04012-r2/FINAL-REPORT.md、RELEASE.md及TEST-INDEX.json。

5GB尚未完成，真實上限仍2GiB；背景交叉淡化／遮幕／等待、完整值樹／素材reporter、EXE／Rollback／工程模式保留下一包。既有圓角已驗證可到達真正播放器與匯出，不重複開發。KOI Script語法、資料格式、儲存鍵與事件ID不變。

真人多解析度／深淺色像素、實機觸控、240FPS、聽感、Windows11仍待驗。HTTP預覽環境缺crypto.randomUUID；正式頁抓取工具不可讀；Sites目前原生截圖仍58版，沒有冒稱新GUI或真人已通過。下一輪依MANUAL-ACCEPTANCE.md回報單包修補，不自行啟動大容量、EXE或新大型模組。

---

# 0.40.12_r2 核心修補通過，準備原網址發布

接續136a540，保留r1本機工具、完整來源及Sites58回復。R2-1 cf06345、手勢交易2cb5ce8、區段／統計2962772、局部GUI e799d82、既有圓角／播放器1882e80、有限研究2437726。沒有重作P0～P1或更換框架。

190項不重複自動化、19語法、正式建置、34Worker資產通過；四模式50／300／500語意／執行／儲存及500／1000列表有限測試通過。兩次不同fixture失敗已針對測試環境修正，功能斷言不放寬；原log保留。詳research/04012-r2/。

GUI這次有依授權局部調整：區段工具列同列、四模式等寬、選取線減細、分隔線／密度設定；Logo、字型、主配色、六分類與主要布局保留。Sites58正式前截圖已保存；新GUI像素、手機、聽感、240FPS及Windows實機未驗，不宣稱通過。

容量顯示使用真實GB換算，仍2GiB約2.1GB，5GB未完成；背景交叉淡化／遮幕與等待、完整值樹／素材reporter、EXE／工程模式仍待後續，不加入未驗證遷移。原過場舊景閃回未重現，打字機／慢載既有回歸通過。

實際部署狀態待Sites原生回應後記錄，當前不能宣稱r2已上線。

---

# 0.40.12_r1 本機開發原始碼交付（不部署）

接續最新 73931c8，保留所有已完成修復。新增 README.md、WINDOWS-SETUP.md、LOCAL-DEVELOPMENT-TODO.md、npm 鎖檔、本機 Node 伺服器與有限測試指令；保留 pnpm 鎖檔。只修正建置資產路徑的 Windows URL 分隔符，不修改產品功能。

隔離且無 .git 的副本：乾淨 npm ci、正式建置、40 項有限測試、33 個 Worker 資產、6 個語法檢查、CLI 啟動／root 200 通過；147 個應用程式／Logo／HTML／CSS／原 Worker 檔案雜湊一致。Windows PowerShell／瀏覽器實機尚未執行；完整歷史測試未重跑。詳 research/local-development/REPORT.md 與各原始 log。

本輪不部署、不升版、不新增功能、不改 GUI／Logo／字型／配色／布局。原正式版依歷史紀錄為 Sites58／2d4ee8a；修改前原始碼 ZIP 與 local-handoff-base-73931c8 tag 保留。正式站與本機資料不同 origin，須匯出含素材備份再匯入副本，不能自動共用。

後續：先依 WINDOWS-SETUP.md 完成本機人工驗收；積木未完功能、過場舊景閃回、5 GB（目前僅 2 GiB）、Windows EXE 均保留待辦，本輪不啟動。最新交付提交與 ZIP SHA256 另附檢查點檔；不將未實測項目標為通過。

---

# 已發布：Koi Maker 0.40.12_r1（Sites58，測試修訂版）

正式來源2d4ee8a8922fffe28c60549d1420b744ac7577a6；部署appgdep_6ad8c437f5088191af25d1f92d3b8e91原生succeeded，發布後active／public／latest58／r1標題與原網址確認。發布前完整ZIP及CRC／SHA256已保存；回復Sites57／d855a55、開發前f916968與完整備份保留。詳research/04012-r1/RELEASE.json／RELEASE.md。

199不重複自動化、20語法、正式建置及33Worker資產通過；新增積木與已修復／未確認項目分列FINAL-REPORT.md。GUI凍結：CSS／Logo／主題不改，HTML僅版本，Header／六分類／工具列DOM嚴格比較通過。只有工具箱條目、until局部欄位與必要功能行為修正。

真人240FPS／實際刷新率、未重現的過場舊景閃回、實機觸控、聽感與原始完整問題專案仍待驗，不宣稱全面通過。下一輪先依錄影／完整JSON與使用者操作回報單包修補；完整call／return、清單、素材reporter、巢狀值樹及外部條件等待未實作，不自行啟動或重新設計GUI。

---

# Koi Maker 0.40.12_r1 核心修補與安全擴充已驗證，準備發布

接續f916968，已保存完整修改前ZIP及GUI基準。R2首提交閃字16f0213、R3拖曳視野／FLIP跳動4f728a1已修復；過場舊景閃回未獨立重現，保留待錄影驗收。R4官方盤點d5a640b；R5有上限repeat-until、布林旗標及角色引用7227c72；R6九個運算入口與分類搜尋8a98e19。沒有重設計GUI、換框架或刪功能。

R7共199不重複自動化、20語法、正式建置與33Worker資產通過；新舊50／300／500四模式語意／儲存／執行一致，既有25出口／7結局角色隔離及12手機Pointer案例通過。凍結CSS／Logo／主題、HTML骨架及Header／六分類／工具列DOM比較通過；曾自動新增到工具列的preset選項已撤回，未放寬比較。真人視覺／240FPS／觸控／聽感、完整原問題專案仍待驗。

詳research/04012-r1/FINAL-REPORT.md、TEST-INDEX.json、RELEASE-GATE.json。無已重現未修復Critical／High，使用者授權可發布測試修訂版；須先保存正式來源ZIP，實際部署狀態另記RELEASE。保留Sites57／d855a55及56／03b922c回復，不更改原網址、權限、資料Key或使用者專案。下一輪依回報單包修補；call／return、條件等待、清單、完整素材reporter與巢狀運算樹未完成，不自行開發或改GUI。

---

# 已發布：Koi Maker 0.40.11_r4（Sites57，測試修訂版）

正式來源d855a55fb7981cc71db50bc977fbe276af976a69；部署appgdep_6ad8a1c4a1a481919003f0793167780b原生succeeded，發布後active／public／latest57／r4標題及原網址已確認。完整來源ZIP已在部署前保存並通過CRC／SHA256；回復Sites56／03b922c與55／1d7d0ce保留。詳research/r4-20261021/RELEASE.json及RELEASE.md。

本輪修復與138不重複自動化、14語法、建置、31Worker資產結果均已保存。原始空目標資料、未取得的完整原專案與真人待驗狀態不變，沒有宣稱完整原專案／真人通過；未重設專案資料、未改Logo或GUI設計。下一輪先以完整JSON、實際選項／跨章順序和真人回報追蹤，從最新交接提交接續，不重做本輪已驗證修復。

---

# r4角色目標與生命週期修補已驗證，準備既有網址發布

接續9af300c，保留全數前輪成果及Sites56正式Logo。已修正R4-H1慢速換場重新帶回已退場角色、R4-H2舊存檔缺position與fig-center解析不一致、R4-M1空目標卻顯示fig-center。修復前失敗TAP、個別檢查點及最小重現已保留。

138不重複自動化、14語法、正式建置、31Worker資產通過；50／300／500四模式、513事件副本、25選項出口／7結局／27中途存讀、跨章、多角色與20次同位置登退場均有列明測試。Logo、GUI CSS與HTML結構、Parser／Engine／資料鍵／ID不改。詳research/r4-20261021/REPORT.md與TEST-INDEX.json。

原始副本20筆target:null仍保留並報錯，不自動猜測或批次替換位置ID；使用者另提供的明確修正版用於角色隔離驗證。未附完整JSON章節／互動定義及原素材，真實原專案、瀏覽器視覺／觸控／聽感待驗；不能宣稱完整真人通過。本輪無已重現未修復的引擎Critical／High；符合使用者授權的測試修訂版發布門檻，來源ZIP保存後才部署。實際結果、正式來源與交接檢查點將記錄RELEASE。

回復點Sites56／03b922c及Sites55／1d7d0ce保留，開發修改前9af300c完整ZIP與tag checkpoint-r4-before-20261021。下一輪先以完整JSON和真人路線回報驗證，不重做已測包或擴張功能。

---

# 本輪 Debug 開發已保存，正式版保持Sites56；H04阻擋發布

從最新95a99a3接續，保留正式Logo與Sites56／03b922c；沒有退回55。Fix01 41ca19f完成12圖診斷與可執行基準；Fix02 f292e07實測縮放／欄位；Fix03 8e72053值模組漸進擴充；Fix04 4227f5f素材選項與角色診斷；Fix05 8b475b7單刪／競態／跨章；Fix06 601aa2b真實專案首頁及清單更新。最新整合檢查點以Git與交付ZIP為準。

113不重複案例、12語法、建置與30Worker資產通過，見research/fix-20261021/FINAL-REPORT.md與TEST-INDEX.json。原圖／Logo、shared style／player style、Header媒體規則與主題不變，新增CSS只處理積木欄位與首頁容器；事件原生欄位仍唯一執行來源，.koi／parser API／資料鍵／ID不改。

H04：原截圖fig-right動畫／fig-center退場仍需完整出錯事件、分支／跨章與角色／資源ID資料；不能拿代表測試當原案例修好，因此Fix08停止正式部署，Sites56／public／原URL維持。完整素材reporter、巢狀運算樹、全站模板／素材／變數表單排版及真人視覺／觸控／聽感尚未完成。下一輪先提供去除二進位的問題專案／.koi序列，依MANUAL重現H04，再補剩餘範圍與發布；不要重做已測包或覆蓋Logo。

---

# 正式Logo已更新發布：Sites56（版本維持0.40.11_r3）

發布來源03b922cd49c4be7348d394f39f15321bdb91d924，部署appgdep_6ad86f8c4e1c8191bcb905b8ab4d967a原生succeeded；get_site確認active/public/latest56/原網址及既有r3品牌名稱。發布於2026/10/21 15:54台灣時間。回復Sites55／1d7d0ce與修改前dfcbc25完整ZIP保留，54來源也未動。完整結果research/logo-20261021/RELEASE.json／RELEASE.md。

原樣保存兩張2170×725正式Logo，透明淺／深PNG等比例置入1440×360畫布，保留原色與字形；16／32favicon與180Apple圖示已引用。品牌專屬CSS適配原有18主題、保留既有Header與響應式規則、處理初始載入顯示順序。Logo開啟原有專案清單入口，確認取消／草稿／失敗保護，沒有新增首頁路由或重開空白專案。

本輪21個不重複案例、3JS語法、正式建置與29Worker資產通過；核心原始碼、shared CSS／player CSS、資料鍵與ID保持。指定解析度真人畫面、觸控、原生鍵盤與實際網路閃爍仍待驗，不能宣稱真人通過；原系統無跟隨OS主題，列不適用。報告／原圖／處理腳本／透明資產／人工清單與完整ZIP保留。本輪工作完成，停止擴充。

---

# 正式Logo更新已驗證，準備原站發布（版本維持0.40.11_r3）

接續乾淨dfcbc25；修改前checkpoint-before-logo-20261021與完整ZIP已保留，兩張2170×725原圖原樣保存。已完成透明淺／深PNG、16／32favicon與180Apple圖示、原有18主題同步顯示，以及Logo沿用專案清單首頁入口。未儲／草稿／失敗／取消保護與原生button語意已測；21不重複案例、3JS語法、正式建置與29Worker資產通過。詳research/logo-20261021/REPORT.md、TEST-INDEX.json。共享CSS／Header／media規則／播放器與核心編輯資料原始碼不改，Logo專屬brand.css只中和原舊濾鏡及切換原圖，不重新設計UI。

真實瀏覽器畫面、全部指定解析度、觸控、鍵盤預設操作與首次載入閃爍待人工；既有主題無跟隨系統功能，列不適用。本輪不擴大功能開發、不改版號或權限。正式部署與精確來源請見後續RELEASE紀錄；可回復Sites55／1d7d0ce與最新交接dfcbc25。

---

# 已發布：Koi Maker 視覺化故事創作平台 0.40.11_r3（Sites55，測試修訂版）

正式來源1d7d0ce84d8b6d775173de0f01dc3f033adb0d7d；部署appgdep_6ad85a9752548191b73ed437877295ba原生succeeded。發布後active/public/latest55/新品牌標題及原網址已確認，原權限不變。完整資訊research/r3-20261021/RELEASE.json／RELEASE.md。Sites54／5b004f3與53／48b5457回復版本、ZIP與使用者資料保留。

173不重複自動化、18語法、建置與23Worker資產通過。C5群組／解除／內建複本／圖層／可回復擴充，C6三種容量語意及執行往返，新增全域文字搜尋取代／typed批次素材修復／統一診斷完成列明範圍；未重寫共同事件模型或播放器。正式發布前來源ZIP／部署包已保存，部署後僅補文件交接。完整功能矩陣110列與官方差距矩陣48功能×15工具皆保留未知界線，無整體產品百分比宣稱。

限制：設定內部閱讀／音量表單仍未全部拆為獨立畫布元件，群組無巢狀／整體resize；這些未完成路徑未冒稱已發布。真人視覺／實機觸控／聽感／任意舊專案待驗，按MANUAL-ACCEPTANCE進行副本驗收。原七視覺案例、歷史88測試／10DOM與ZIP保留。本輪未新增大型工程／Live2D／Spine／時間軸／Rollback；下一輪先使用者操作回報，再單包評估細粒度表單或多代備份。本輪停止新增功能。

---

# r3 必要自動化驗收完成，準備原網址測試修訂發布

從d898715接續；C5可回復群組與元件操作範圍、C6完整語意容量往返、跨章搜尋取代／typed素材修復／靜態診斷完成並驗證。173個不重複自動化、18語法、建置與23Worker資產通過；詳細research/r3-20261021/FINAL-REPORT.md、TEST-INDEX.json。無未解決本輪已測Critical／High，CSS、儲存keys與KOI Script相容保持。C5內部閱讀／音量表單細拆、巢狀群組／整組resize未完成，沒有當完整設定引擎發布；真機／視覺／聽感待人工。實際上線與精確來源請以RELEASE.json及最新交接為準。正式Sites54／5b004f3及53回復保留，準備先完整備份再原生部署；無額度猜測。

---

# r3 開發：C5 已保存可測元件／群組範圍

從乾淨d898715接續，原Sites54／5b004f3與53回復仍保留。C5補既有模板logical群組、解除、內建元件複本／圖層、可選componentVersion1與原文備份／回復；10新測試＋3對齊回歸通過，詳research/r3-20261021/C5-REPORT.md。閱讀／音量每個表單控制項自由畫布化及群組整體resize仍後續，不冒稱完整大型UI引擎。正式站未變；接著C6指定50/300/500四模式語意往返。

---

# P2-C 本輪停在 C4 已測修復；尚未達發布門檻

C1已盤點並保留官方版本／未知界線；C2事件核取與安全批次完成自動化；C3導航補強與容量案例通過（交點／Fit限制仍列）；C4修正手機工具箱意圖、模板Pointer污染／失capture、雙指縮放。合計99個不重複已執行案例通過，10語法、完整建置、22Worker資產通過；不算真人視覺／實機觸控完成。初次失敗與修正日誌保留，見research/p2c-20261021/TEST-INDEX.json及各報告。

C5高風險資料遷移未開始，C6指定代表性四模式容量往返未執行，C7品牌「Koi Maker 視覺化故事創作平台」與全回歸待辦，C8未發布。正式站維持Sites54／0.40.11_r2，53／54回復來源均保留；未猜額度、未提前改版本。下一輪從C5資料模型與可回復遷移設計接續，先解決必要驗收環境，不能直接部署本輪開發來源。

---

# P2-C3 已保存；下一包 C4 手機操作修復

C3新增雙軸捲動軌、滾輪明確規則、Space平移及ID／編號／區段定位；9新測試及3既有Flow回歸通過，300／500有界案例0重疊／0穿卡，交點與Fit最低20%限制保留。詳research/p2c-20261021/C3-REPORT.md。正式Sites54與版本顯示不變，沒有部署。

---

# P2-C2 已驗證並保存，正式站仍為 Sites54

C2補事件核取／批次控制與編輯游標隔離、清單偏好／位置保留；修正收合後誤展開及刪除確認期間切章風險。13新＋15必要回歸＝28項通過，建置與22Worker資產通過。C1另外38基準通過；沒有累加歷史230。詳細research/p2c-20261021/C2-REPORT.md。C3準備開始，C4–C8尚未執行；品牌更新與正式部署仍未完成，版本不改號。

---

# P2-C 開發進行中；正式站維持 Sites54／0.40.11_r2

從5114690接續，修改前完整ZIP與checkpoint-p2c-before-20261021已保留。C1盤點／官方查核及38項基準通過，詳research/p2c-20261021/C1-REPORT.md。C2準備補事件核取與編輯游標隔離。C3–C8尚未執行；不宣稱手機／遷移／四模式完整新驗收完成。HTTP內部Chrome預覽缺crypto.randomUUID，未完成操作驗收；已停止預覽，不改正式HTTPS來源補環境差異。新品牌「Koi Maker 視覺化故事創作平台」列本輪需求，版本號不提前更新。

---

# 已正式發布：Koi Maker 視覺小說創作平台 0.40.11_r2（Sites54）

正式來源5b004f31b8ebfddfe9523703c73269af58cf71f1，原網址與public不變。部署appgdep_6ad7b385130c8191bdfb2a5814eb9473，Sites原生狀態succeeded；發布後metadata確認active/public/latest54/新title。原正式53版48b5457與ZIP保留，回復方法與發布後交接見research/r2-20261021/RELEASE.md、RELEASE.json。

R2-A～I必要工作完成：角色登退場、流程分層／正交路徑、列表／Flow群組選取拖曳、既有模板對齊與Undo、跨種類素材刪除Critical、兩項遺留Medium、官方比較／低風險引用檢視、品牌／文件。230個不重複自動化＋24語法＋建置／22Worker資產通過。完整範圍、失敗與修正及未驗事項在FINAL-REPORT.md與TEST-INDEX.json。

真人視覺／聽感／觸控／任意大型舊專案未驗，不宣稱全部正常。圖形仍有11交點案例；任意手排重疊無全域路由保證；局部模板不能移出父內容；立繪工程對齊／跨章全域取代／多代備份延後。Sites卡片舊description無可用更新參數，HTML meta/title已更新。105列功能矩陣A83/B0/C2/D5/E2/F13，沒有產品100%宣稱。

下一輪先真人驗收，再選P2-C單一工作包；不自行啟動工程模式／Live2D。以下保留候選／歷史紀錄，以本段及RELEASE原生結果為準。

---

# 最新候選：Koi Maker 0.40.11_r2 已通過必要自動化，等待原生發布回報

從7695072接續，R2-B角色、C流程圖、D模板、E資料／音訊、F官方比較、G低風險引用檢視、H品牌已完成分包檢查點；I最後整合與相容性補修完成。230個不重複自動化案例通過、24個JS/MJS語法、建置與22資產Worker通過。角色兩個High、跨種類素材刪除Critical及P1-C兩項Medium修復。檢查點與限制見research/r2-20261021/FINAL-REPORT.md、BUG-LIST.md、TEST-INDEX.json。

真人視覺／聽感／觸控保留待驗，人工程序已提供；不能算全產品100%。105列功能矩陣A83/B0/C2/D5/E2/F13；14工具比較保留無法驗證細項。沒有P2-C／工程模式實作。正式站此刻仍0.40.11／Sites53；部署成功與否只看後續RELEASE原生回報。

原正式來源48b5457、第53版及完整ZIP保留回復。r2僅更新既有專案，URL與public權限保持，沒有改DB/localStorage key／專案ID／事件type／KOI Script語言格式。

---

# 最新開發：0.40.11_r2 分包進行中，正式站仍為 0.40.11／Sites53

接續7695072，無較新未發布來源。還原tag checkpoint-04011-before-r2-20261021保留；原48b5457正式來源與ZIP不變。
R2-A完成來源與檢查點；R2-B完成角色登退場同模型、指定角色隔離與實際Player生命週期／腳本補強（e05b426）；R2-C完成有界分層自排／正交路徑、手排Undo、事件列表全選／多選與群組排序、Flow群組拖曳。詳見research/r2-20261021/B-REPORT.md與C-REPORT.md，所有原始失敗與修復結果保留。
R2-D之後尚在規劃／未驗，r2未完成發布門檻，沒有更新正式網站。真人視覺、音訊與觸控保持待驗，未把DOM與Node時間當真人驗收。

---

# 最新進度：Koi Maker 0.40.11 已正式發布（Sites第53版）

P1-C1～C5已完成必要自動化驗收並先保存34a1e05（0.40.10，未部署）；再完成Koi Maker 0.40.11品牌與版本。P1-C 243個不重複案例＋品牌6個，合計249個通過；本輪2 Critical／6 High均修復。完整明細：research/p1c-20261020/FINAL-REPORT.md、research/brand-04011-20261021/REPORT.md與各TEST-INDEX.json。

功能矩陣99列：A75（限列明範圍）、B1、C3、D5、E2、F13；未驗與不完整不計完成，沒有整體產品完成率。500事件／132素材、有限1000事件、真實小型媒體離線格式與備份驗證有紀錄，不代表實機codec／大容量通過。

品牌顯示改Koi Maker、產品版本0.40.11；KOI Script、.koi、資料格式、儲存key／schema、API、各類ID、原URL與權限保留。Logo只改o/i大小寫筆畫；CSS／布局不變，離線光柵化有已記錄的抗鋸齒微差，不宣稱整站視覺通過。

最終建置與Worker22資產通過。已使用保存的第53版發布到原網址，來源48b545768e0e124776d269acc2138eb0e6522b46，部署appgdep_6ad79ec29c9881919498692339af25a4，狀態succeeded。發布後確認active／public／Koi Maker 0.40.11與原URL；完整紀錄見research/brand-04011-20261021/RELEASE.md。發布tag release-04011-20261021，完整來源與r52回復點均保留。

真人視覺、聽感、觸控、任意舊專案、512MiB／2GiB容量等仍待人工；原7案例／88測試／10組DOM及visual-acceptance.zip保留。Medium：次要素材引用清理與BGM逐事件volume／loop未完整套用。下一輪先補人工驗收，再依P2-A/B/C分包，不開始大型工程模式或Live2D。

以下保留歷史（舊名稱／舊版本屬真實紀錄）。

---

# 最新狀態：P1-B 已正式發布 0.40.10_r52（2026-10-20）

由第51版c26dce3接續，保留P0／P1-A與e26c18a音訊成果。完成角色演出事件隔離、明確等待順序、獨立目標、數字角色參照、深層參數保護、延遲屬性回呼ID綁定與建置保留P0-C樣式。119個不重複案例通過，8個JS/MJS語法、JSX bundles、Worker與7項資產比對通過。

第一批檢查點362667a，第二批eaf1c5a，建置安全f271173。完整記錄：research/p1b-system-20261020/REPORT.md、COMMANDS.md、TEST-INDEX.json及原始通過／失敗紀錄。正式來源31b17bb314e0b0a1f7ec2f359e507d41f417eb9a已備份並推送；Sites第52版成功部署至原網址，部署appgdep_6ad778596b6c8191912133212e77179a，狀態succeeded。公開權限不變。正式tag release-04010-r52-20261020；完整結果見RELEASE.md。

GUI樣式規則、圖示與音效素材保持第51版內容；CSS只多範圍註解，HTML只將側欄r50改為候選r52。沒有工程模式實作、P2或不相關P0重做。已執行範圍無待修Critical/High；尚未全量P1-C驗收。

發布後原生metadata確認active／public／r52與原URL；單次HTTP探測代理CONNECT逾時，未取得網站回應，因此正式站真人可開啟仍未獨立驗證。真實視覺、聽感、觸控、真實大型／舊專案與實體音樂語音匯入待人工；P0-C的7視覺案例、原ZIP及88項／10組DOM歷史保留。DOM不等同視覺通過。人工步驟在MANUAL-ACCEPTANCE.md。下一階段P1-C先補上述高風險真實操作，再擴充全面回歸；不啟動工程模式/P2。

以下保留歷史紀錄（其「最新／尚未發布」字樣不代表本輪最終狀態）。

---

# 最新狀態：P1-B 指定音效修復完成，尚未發布

起點第50版 250bb44；保留正式第49版525dd90、P1-A與原ZIP。解除音效改在首次有效拖曳時播放一次；鑑賞BGM改用明確播放焦點，正常瀏覽持續、主動試聽才暫停，停止後恢復原曲與位置；側欄文字依要求為KOI Maker 0.40.10_r50。
17項新增＋12項必要回歸共29項通過；語法7檔、bundles、Worker與6資產一致性通過。原始失敗及修復紀錄見 research/p1b-20261020/REPORT.md。真實聲音、觸控、視覺仍未驗證，不宣稱通過。不部署、不重做P0，不代表整個P1-B/P1-C完成。
修改前檢查點 checkpoint-04010-before-p1b-20261020=250bb44；解除音效中途檢查點6dbd0e5；最新修復檢查點 tag checkpoint-04010-p1b-fixes-20261020。
0.41.11工程模式設計已完成：design/ENGINEERING-MODE-0.41.11.md，定義真實Player疊加層、既有資料寫回映射、測試狀態／持久化隔離、提交衝突與E0–E4工作包；只是規格，沒有實作大型模組或工程入口。最新修復提交e26c18a，最終含規格檢查點見tag checkpoint-04010-p1b-design-saved-20261020。下一次建議先人工驗收音效；若開始工程模式，只開E0隔離／提交契約小包。以下為上輪歷史。

# KOI Maker 最新進度 — 2026-10-20

## A. 正式網站

已成功發布 KOI Maker 0.40.10_r49 至原網址 https://koimaker.briny-angel-8862.chatgpt.site/ 。
Sites 第 49 版，來源 525dd90d6962a9d14d1bf44d509e6bf2cf617cd5，部署 appgdep_6ad7584c84888191a3f29d0242d6c09e，狀態 succeeded。
正式版 tag release-04010-r49-20261020 指向 525dd90；原還原基準 b3ec877 保留。正式站沒有包含本輪 P1-A 修改。

## B. 測試與限制

發布前：P0-D 19/19（上輪待驗案例已通過）、儲存安全／portable 4/4、圖片匯入與 ZIP 匯出 1/1，合計 24 個不重複案例；語法與既有 Worker ESM 驗證通過。
發布後：原生部署回報成功與原 URL；完整 source ZIP 已驗證。額外 HTTP 探測被 Cloudflare 403／1010 阻擋，正式站真人可開啟與操作未能獨立確認；日誌未見應用例外，不取代瀏覽器驗收。
P0-C 視覺仍待人工，7 案例、ZIP 與歷史 88 測試／10 DOM 結果保留。未搜尋／安裝替代瀏覽器；未將 DOM 當視覺通過。
發布與人工操作步驟：research/release-r49-20261020/RELEASE.md、MANUAL-ACCEPTANCE.md。

## C. P1-A 開發版

已在正式發布成功與備份之後開始，完成背景素材選擇、缺少背景事件時自動建立章節初始背景、原圖片匯入套用、顯示模式與位置、具尺寸素材縮放、功能畫面及手機／電腦設定與預覽同步。
9 項新增測試與 10 項必要回歸去重後 19/19 通過；語法／bundles／Worker 與六資產一致性檢查通過。CSS、HTML、積木外型、engine、storage 未變。
限制：無尺寸舊素材不開放縮放；首頁影片仍依原規則優先；真實視覺／觸控與大型真實舊專案未驗。詳見 research/p1a-20261020/REPORT.md、MANUAL-P1-A.md。
P1-A 檢查點 tag checkpoint-04010-p1a-saved-20261020；只保存不部署。核心中途檢查點 61645d3；修改前 52ad77e。

## D. 下一步

先在測試專案完成 P0-C／P1-A 人工驗收，再依結果處理必要修正；若通過，可另行開始 P1-B。P1-B、P1-C、P2 未開始。本輪停止擴充，不重跑全部既有測試，不推測即時額度。

## 交付位置

- 已發布原始碼：KOI-Maker-0.40.10_r49-published-source.zip（525dd90）。
- P1-A 完整開發原始碼：KOI-Maker-0.40.10-P1A-source.zip（最新開發檢查點，見交付索引）。
- 原 visual-acceptance.zip、P0D-source.zip 與修改前備份均保留。
- 上輪 P0-D 歷史完整進度：research/p0d-20261020/PROGRESS.md。該歷史中「未發布／一項待跑」已由本輪結果取代，並非當前狀態。

## 2026/10/22 — 0.40.12_r4 發布準備

由e762fa6接續，先保存before-04012-r4-e762fa6與原始碼ZIP。已讀取本輪實收(3)/(2)兩段30FPS影片與三張截圖；20.0秒舊景露出有實際畫面證據。完成浮動根定位/C側邊(7cd4692)、過場遮罩/交易所有權(7d333ef)、唯讀Engine除錯與容量GUI(98d4ef6)、隔離大容量測試專案及遊戲目錄串流(9b0504b)，追加500事件垃圾桶刪除保視角與0秒fade修復。

146不重複案例通過、13語法、正式建置、36Worker資產通過。原98條目94直接/同義通過，4項舊規格來源/版本/CSS斷言由r4授權替代驗收覆蓋，原檔保留。詳research/04012-r4/TEST-INDEX與REPORT。

一般專案保持2GiB寫入保護；只有另建空白、具備估計額度與串流備份能力的實驗專案允許5GB路徑。真實4～5GB瀏覽器、原生資料夾輸出、真人視覺/聽感/觸控/240FPS/Windows11未驗證；不標通過。作者KOI Script下一包，沒有不完整遷移。

GUI僅容量區塊、必要C幾何、預覽除錯及使用者指定淺色預設黑字；Logo/導航/主版面/分類/字型/原接合外形保留。部署實際結果待native確認後補記；Sites60/r3保留回復，不建立新網站。

### r4 發布完成

Sites61／0.40.12_r4 公開測試修訂版已部署 succeeded，來源 `3fa39c9a7e8c9f0bb27b26cb5c4c929ad385f4b6`。原網址與public不變，Sites60／49fa62c保留回復。native完成時間2026-10-22T08:00:47.611974+00:00。發布前完整來源936檔CRC/逐檔一致，實際部署來源ZIP與開發完整ZIP分別保留；最後接續SHA見交付檢查點JSON。

部署後native確認Sites61/active/public/title。真人正式站操作、實機觸控/聽感/240FPS、4～5GB瀏覽器讀寫及原生目錄輸出仍未驗證，清單位於research/04012-r4/MANUAL-ACCEPTANCE.md。下一輪先取得同原劇情修正版錄影與實驗專案容量實測，處理實際回報，再獨立進入KOI Script作者語法。不要從舊版本覆蓋本輪積木、播放器、Debug、容量與安全保護。


## 0.41.0_r2 受控重建（2026/10/24）

H1：來源已由 Sites/Git 及既有 ZIP 交叉核對；原本 r2 本機物件無法取得，重建來源是 0.41.0 main 5f4a6ac。基準測試 111/111。H2～H9 待驗，不覆寫 Sites62。

H2：恢復128候選與狀態界線，有限複核官方導航／材質文件；未達150件，不宣稱完成。


## 0.41.0_r4 R2 — 歷史頂部復原

- 唯一依據：0.40.12_r4 `3fa39c9a7e8c9f0bb27b26cb5c4c929ad385f4b6` 實際原始碼及隔離執行截圖。
- 恢復 92px（50+42）兩列、Logo 146×40、四模式右上、連續式主導航左下、專案操作右下；操作本身不換行。文件分頁 44px。
- 修復 r3 index 已包 project-location，runtime 又建立空包裝造成額外 12px 偏移；沿用既有容器。
- 1366 原版量測：Logo (20,5,146,40)、modes (956,5,390,40)、nav (20,50,912,42)、tools (956,50,390,42)。
- 不改事件、儲存與遊戲預覽資料。建置通過；完整視覺驗收仍在 R6。


## 0.41.0_r4 R3 — 讀檔側欄根因修復

- 根因：r3 共用橫向工具列選擇器誤含 `.screen-tools`，覆蓋原本 grid，標籤與下拉被迫同列收縮。將其移出共用 image toolbar，建立限縮於 screen-options 的 inspector grid。
- 標籤全列、按鈕兩欄；輸入元件 min-width:0、寬度受側欄限制；保留側欄局部捲動。
- 移除舊 template layout 的幾何 !important，窄工作區以 720px container query 將屬性面板移到畫布下方；不修改畫布比例、事件模型或縮放演算法。
- 視覺及五級文字測試在 R6 記錄，不以程式變更代表已通過。


## 0.41.0_r4 R4 — 字級、Focus 與節點

- 字級根因：舊 CSS 的模板屬性與開場表單固定 px 字級沒有納入 editor typography 轉換；補齊限定範圍，保留 system-canvas、screen-preview 與遊戲字級。
- 共用控制高度跟隨 --ui-text-scale，介面基礎行高 1.45；五級維持既有 .8/.9/1/1.1/1.2 與資料格式。
- 鍵盤焦點改為元件內側唯一 2px outline，避免標籤輸入框父容器裁出上下兩條線；focus 狀態不再疊內凹 shadow。
- 流程節點選取改為單一 1px 邊界，移除節點裝飾性 ::before/::after；不改 ports、連線、拖曳或 IDs。
- 真實五級檢查與功能結果在 R6，尚不代表可發布。


## 0.41.0_r4 R5 — 表單與色票

- 首頁與音效：限制表單閱讀寬度，開場各列改連續表面，相關進退場效果與秒數各自成組，數字欄保留合適寬度，小工作區重排。
- 原生色票入口改為單一色塊，保留真正系統選色器。新增共用 ColorField，保留即時 commit 並支援取消回原色與還原預設。
- 第二輪定位發現模板幾何 !important 的真正來源為共用 game-skins 產生流程；在 editor compatibility 建構階段只退役 `.template-body .screen-editor-layout` 的舊優先權，遊戲匯出 CSS 保持原狀。
- R6 初次核心測試 116/116、SoftFlow 16/16 通過。真實讀檔側欄已恢復可讀 grid，截圖另存；仍須寬度及字級矩陣驗收。


## 0.41.0_r4 R6 檢查點（2026-10-24，尚未發布）

- 已依歷史原碼補齊資源欄 240／210／270px 與4px銜接；1366下文件分頁起點(244,92)、高度44，與0.40.12一致。保留r3事件屬性寬度與底部列。
- 修復左欄收起後零寬欄分配，真實瀏覽器確認收起與展開。窄資源欄將原有三項專案操作重排於名稱下方；1024特大名稱width與scrollWidth均58px。
- 25組真實Chromium完整app viewport（5字級×5尺寸）無頁面、頂部控制項、側欄標籤水平溢出；詳 research/0410-r4/evidence/final-font-rwd-matrix.json。
- 12頁已實際開啟截圖，7張原始缺陷逐一比較。實際驗證事件輸入、Undo／Redo、積木右鍵單一拆分與Undo、圖片翻轉復原、KOI檢查、遊戲預覽及雙主題。
- 正式建置與39個靜態資產驗證通過。核心119/119；SoftFlow16/16（其中13項與核心重疊），合計122項不同測試。新增色彩取消／還原、五級保存與模式切換、單一project-location測試。
- 測試副本已移出dist，新增發布產物防護；含QA副本會被validate-worker拒絕。
- 未完成：Chrome實際90/125/150%縮放、系統字體縮放、完整大尺寸視覺、真實滑鼠拖曳接合／接線及完整原生色彩視窗狀態驗收。環境拒絕Chrome設定頁，全頁截圖逾時；沒有嘗試繞過或用CSS zoom冒充。
- R7阻擋：未通過全部使用者要求的發布門檻，不更新正式版號、不建立r4 Sites版本、不部署。正式站保持r3／Sites64。
- 完整驗收、回復ID、來源與所有證據：research/0410-r4/ACCEPTANCE.md。候選原始碼／Git bundle與遠端同步結果另由交付manifest及SHA256SUMS.txt記錄。

## 2026-10-26 — Koi 品牌平台先行版

- 依使用者新指示開始實作及發布品牌網站，沿用同一 public Sites 專案與網域。
- 新增 17 個公開頁面、可遊玩操作示範、本機存讀檔與作品篩選。
- 保留真實歷史 0.40.12_r4：portal/legacy/dist；僅建置輸出 index.html 增加 base URL；新入口 /maker/04012r4/local/。
- 不更動既有 IndexedDB、localStorage 或專案格式。帳號路徑與雲端 API 未開放。
- Google 登入、5 GB、投稿與社群寫入尚未完成；功能狀態頁與各入口明確標示。
- 回復點：Sites 61 / commit 3fa39c9；Git tag checkpoint/pre-koi-platform-20261026。
- 自動測試 5 個測試案例通過：17 頁與內部連結、私有與寫入入口 fail closed、歷史檔案完整一致、示範兩分支及存檔異常、篩選真正隱藏。
- Chrome 檢查：桌面 1363×936；390 與 1024 px iframe（內容寬 375 / 1009，扣除捲軸）無水平溢出；手機選單開關正常。不是實機手機或瀏覽器縮放測試。
- 實際示範分支、儲存、重開與讀取成功。
- 修復一次作品 display:grid 蓋過 hidden 的問題，新增回歸測試。
- HTTP 預覽原版編輯器 crypto.randomUUID 不可用，屬安全環境限制；不添加相容性覆蓋。需發布後 HTTPS 驗證四模式，失敗回退 Sites 61。
- 正式發布成功：Sites 66；來源 fa4086283fc20a7b18cdb1cf32543d64867bf8be；deployment appgdep_6adf206154808191b495f88f43a62770。
- 正式 HTTPS 驗證：0.40.12_r4 原版初始化成功；事件、流程、積木、程式切換成功；原範例 9 事件 / 2 選項 / 0 擴充儲存後重載仍一致。來源屬於本站的 error 日誌查詢無結果。
- HTTP 預覽的 crypto.randomUUID 問題在正式 HTTPS 未發生。不需改動原編輯器。
- 目前只做四模式開啟與儲存重載冒煙檢查，未宣稱重新完成所有積木拖曳、跨版本專案或所有瀏覽器的全面驗收。

## 2026-10-26 官網中文與藍紫動態修訂

使用者禁止裝飾性英文小字與分隔符號。移除公開頁面的英文眉題、英文小標語、斜線麵包屑、中點與破折號裝飾，保留產品名稱及必要技術名稱。
首頁使用藍白與少量淡紫背景，不新增光球、玻璃、膠囊、圖示底座或浮動卡片。移除主標題白色大底座。
背景色帶與既有主視覺使用 26 秒緩慢 CSS 動態。提供暫停與播放，遵守 prefers-reduced-motion，頁面隱藏時暫停。不改寫儲存資料。
本次檢視あおぎり高校首頁主視覺，已讀取 hololive 與あおぎり高校的公開頁面內容。未宣稱再次完成其他 62 站全面研究，未搬用第三方美術或程式。
既有 RWD 與編輯器完全保留，不為樣式修改重新替換 React 或 Vue 框架。
檢查結果：7 個自動測試通過，涵蓋 17 頁連結、帳號入口關閉、歷史編輯器逐位元比對、示範存讀檔、作品篩選、禁止文案與符號、減少動態及手動暫停。
Chrome 預覽實測：桌面首頁、動態執行及暫停；390 與 1024 px iframe 的內容寬及捲動寬一致；手機選單開關正常。未將 iframe 量測宣稱為實機手機測試。
正式發布：Sites 67，來源 d296101b7b71d081bd461c8b9cd6bf6c7717cd28，deployment appgdep_6adf358bd75881919586379362ec2b80。
正式 HTTPS 已確認中文首頁、暫停與重新播放動態控制。本站來源 error 日誌查詢無結果。已保存正式截圖 research/koi-platform/live-blue-lavender.jpg。
此次官網可回退至 Sites 66；原編輯器回退點 Sites 61 持續保留。

## 2026-10-26 原創圖示、淡幾何與文案精簡

- 接續 ad104a8，正式站發布前仍為 Sites 67，未變更 public audience。
- 研究あおぎり高校及另外 10 站公開首頁內容。已檢視首屏，部分僅載入標誌或黑色初始畫面，限制逐站記錄在 research/koi-platform/REFERENCES-GEOMETRY.md，不宣稱全面視覺研究。
- 官網人物圖改成原創 SVG 書本、畫筆、播放及流程圖示，使用輕微立體材質。作品封面與遊玩背景改成原創教室向量圖。未使用 imagegen 或外站美術。
- 新增低透明度三角形、方形與線段慢速動態，與既有暫停控制及減少動態設定整合。只套用首頁，不更動編輯器。
- 刪減首頁、社群、創作者、登入與製作器介紹的重複說明；保留必要的本機儲存與未開放功能狀態。
- Chrome 預覽：桌面主視覺與圖示正常；幾何動畫 running/paused 實測通過；手機選單可開關；390 與 1024 iframe 內容寬/捲動寬為 375/375、1009/1009，無水平溢出。
- 編輯器原碼與歷史素材未改動；保留相同 origin 與儲存命名。官網不再展示原人物圖，但不刪除舊編輯器素材以免破壞專案引用。
- 正式部署成功：Sites 68，來源 c6d8bfe24d25714db97c65addf96d07e2c6a76a7，deployment appgdep_6adf576760348191a6fedee5c27a8e49。
- 正式 HTTPS 首頁已重新開啟，圖示載入完成，幾何 animation=geometry-drift / running；本站來源 error 日誌查詢無結果。截圖保存 research/koi-platform/live-soft-icons.jpg。
- 正式版不含 QA 入口；17 個公開頁面不再引用舊人物 PNG。7 個回歸案例通過。

## 2026-10-27 Krate Studio 主畫面 0.1.1

- 由 8d464de 接續，發布前正式版為 Sites 68。
- 公開品牌由 Koi 改為 Krate Studio，頁首標示主畫面 0.1.1；Koi Maker 製作器名稱、路由、0.40.12_r4 原始檔與資料格式保留。
- 32 站首頁內容研究與採用方向記錄於 research/koi-platform/KRATE-011-REFERENCES.md，存取失敗候選另列；本輪重點視覺檢視 hololive、CloverWorks 與 ATLUS，不宣稱全部 32 站視覺驗收。
- 書本、畫筆、播放與流程圖示使用不同幅度與週期的 SVG 圖層動畫；所有變形僅套在圖像內部。主導覽、標題與按鈕不使用位移動畫。
- 動態共用暫停、恢復、減少動態與分頁隱藏暫停邏輯。
- 實際 Chrome 比對兩次量測：header、hero-copy、hero-actions、h1 邊界相同，圖像 transform 已改變；點擊暫停後 4 圖像和 3 幾何圖層均為 paused。
- 390/1024 px iframe 內容寬與捲動寬分別為 375/375、1009/1009。手機選單開關正常，品牌及版本可見。這不是實機手機或瀏覽器縮放測試。
- 新品牌較寬，1100px 以下導覽使用既有手機選單；主內容仍在原 760px 斷點重排。
- 正式發布：主畫面 0.1.1，Sites 69；來源 2652e3ed3aab1e1f9aeee65e9d6cb477bcfc8595；deployment appgdep_6adf909698108191bc81cc98628f2dd8。
- 正式 HTTPS 已驗證 Krate Studio 與主畫面 0.1.1，四個圖像圖層動畫均 running。本站 error 日誌查詢無結果；正式截圖 research/koi-platform/live-krate-011.jpg。
- 7 個回歸測試、17 頁品牌版本檢查、QA 路徑排除檢查均通過；原編輯器檔案逐位元比對通過。
- 前一正式官網 Sites 68 仍保留；主畫面版本與 Koi Maker 0.40.12_r4 製作器版本分開。

## 2026-10-26 Krate Studio 官網 0.1.2

- 接續 e05818a，原正式站為 Sites 69。
- 17 頁的版本移至頁尾最底部，顯示 0.1.2；移除頁首的主畫面版本字樣。
- 背景控制改成無可見文字的暫停／播放圖示，保留鍵盤與輔助技術操作。
- 僅調整官網既有元件的半透明、微凸與 Hover 材質，移除裝飾邊框，主 GUI 不加入位移。
- 建置及 7 項既有回歸通過，歷史製作器檔案逐位元相同；17 頁頁尾版本位置另行檢查通過。
- Chrome 實際檢視桌面與窄版，點擊動態控制與手機選單；390/1024 iframe 內容寬等於捲動寬。
- 參考來源、日期限制與測試範圍記於 research/koi-platform/KRATE-012-NOTES.md。未宣稱取得模型訓練資料或完成歷史網站視覺重建。
- 正式發布成功：Sites 70，來源 3ef5f92db64e3be8c1447ea17a59953d878af06d，deployment appgdep_6adf9423e86081918af61ab60a88f839。
- 正式 HTTPS 已重新開啟，頁尾最後一項為 0.1.2，頁首無版本文字，背景控制為 SVG 圖示。本站來源 error 日誌查詢無結果。正式截圖已保存於 research/koi-platform/live-krate-012.jpg 及 live-krate-012-footer.jpg。

## 2026/10/27 Krate Studio 官網 0.1.3

- 從遠端 449fe60 接續，正式站原為 Sites 70。工作區清理後透過原 Sites 來源恢復，未新建網站。
- 移除背景控制按鈕與相關樣式事件，背景自動播放並遵守系統減少動態及隱藏分頁暫停。
- 增加少量按鈕、作品、消息及區塊進場互動，維持藍白淡紫與局部玻璃／微凸材質。
- 修正玻璃頁首堆疊層級，手機展開選單不再被主視覺遮住。
- 桌面 Chrome 及 390/1024 iframe 檢查無水平溢出，插圖動而主要 GUI 文件位置穩定。
- 細節、參考日期及驗收限制記於 research/koi-platform/KRATE-013-NOTES.md。
- 正式發布成功：Sites 71，來源 05ee592650fef7633c7858db9247cc162ece4dca；deployment appgdep_6ae016f6e14c8191ba3cfcfe7dbd1aac。
- 正式 HTTPS 已驗證 0.1.3、無動態控制、4 圖層 running、區塊進場標記存在。本站來源 error 日誌查詢無結果。截圖 research/koi-platform/live-krate-013.jpg。
- 7 項回歸及 17 頁版本檢查均通過，正式包無 QA 路徑，Sites 70 回退點保留。

## 2026/10/27 Krate Studio 官網 0.1.4

- 從遠端 ec23f19 接續，前正式 Sites 72。原網址與公開權限維持，上一輪消息列 will-change 閃色修補保留。
- 原創圖示與真實入口增加在主要操作、創作流程、作品資訊及搜尋。無圖示底座、常駐框線、膠囊或便當盒分區。
- 原製作器介紹區加入對話／分支／預覽互動示意，支援滑鼠、方向鍵、Home、End。示意明確標記，不當成真的編輯器。
- 作品搜尋與原分類篩選組合，提供真實結果數及空結果提示。新增常見問題展開、本機保存與尚未開放的帳號／雲端狀態說明。
- 教學新增第一份練習劇本下載。以 3fa39c9 的真正歷史解析器驗證，兩條分支皆能抵達不同結局。
- 10 項回歸測試通過，保留製作器歷史檔案逐位元一致檢查。
- Chrome 實測分頁切換、方向鍵、常見問題、搜尋及分類空結果。390／1024 iframe 內容寬和捲動寬分別為 375/375、1009/1009。手機分支頁籤可切換，試玩入口可開啟遊戲並保存進度。
- 瀏覽器下載事件等待逾時，但隨後在同步下載區找到實際下載的 Krate-第一份練習劇本.txt，逐位元比對與 SHA-256 均與來源相同，確認下載已成功。文件 HTTP 200 與歷史解析器驗證亦通過。
- 13 站逐站研究與未完成範圍詳見 research/koi-platform/KRATE-014-REFERENCES.md。Canva 登入後操作及 WebGAL 完整試玩未完成，不宣稱全站功能體驗通過。

- 正式發布成功：Sites 73，來源 2ea5bbe9db7c77d35c1eb4441a92d14ca11a3016，deployment appgdep_6ae0407ed3f48191952192d60f40e23e。原網址與公開權限不變，Sites 72 保留為回退點。
- 正式 HTTPS 重開驗證：title Krate Studio 0.1.4、頁尾 0.1.4、20 個 ui-icon、3 個流程頁籤、無背景動態控制。實際點分支後 aria-selected=true，本站來源 error 日誌查詢無結果。
- 正式畫面保存於 research/koi-platform/live-krate-014.jpg 與 live-krate-014-flow.jpg。

## 2026/10/27 0.1.4 小圖示精簡

- 移除按鈕、入口、頁籤與作品資訊旁共 23 個 ui-icon SVG，保留三個常見問題展開箭頭與主要插圖。清除失去用途的圖示尺寸樣式。
- 版號維持 0.1.4，製作器、資料及事件邏輯未改。
- 正式建置與 10 項既有回歸通過。

## 2026/10/27 Krate Studio 0.1.5

- 精簡首頁製作器區兩段提示字，入口改開始製作，直接開啟既有製作器。17 頁版本更新。
- 細修局部半透明材質，保留微凸按鈕與內凹輸入，不增加小圖示或改製作器。
- 建置及 10 項回歸通過；Chrome 頁籤、方向鍵與開始製作實際入口通過。參考體驗限制詳見 research/koi-platform/KRATE-015-NOTES.md。

- 正式發布成功：Sites 75，來源 3ae3391688c5064311c5d39b4648af73d4e4cab6，deployment appgdep_6ae0508ca89c8191836e9b61a12930f5。Sites 74 回退點保留。
- 正式 HTTPS 重開確認 title 與頁尾均為 0.1.5，製作器區無兩段提示字，開始製作指向原版入口。分支頁籤實測可切換，本站來源 error 日誌無結果。截圖 research/koi-platform/live-krate-015.jpg。

## 2026/10/27 Krate Studio 0.1.6

- 大型標題改為近黑 #172330，浮動原創插圖與流程 SVG 改為玻璃漸層和柔和體積。主要操作微凸／內凹，玻璃表面 16px 模糊。
- 保留布局與純文字入口，不新增小圖示、不修改原製作器。
- 建置、10 項回歸、SVG 引用及 17 頁版號檢查通過。Chrome 頁籤、鍵盤、FAQ 與材質檢視通過。參考與驗收限制見 research/koi-platform/KRATE-016-NOTES.md。

- 正式發布：Sites 76，來源 bf0e6933b85d17e1437f1dacdf0a6736b0c25be2，deployment appgdep_6ae059147d708191925e0703f2b367e9。保留 Sites 75 回復點。
- 正式 HTTPS 已重開驗證 title、頁尾 0.1.6，主標 rgb(23,35,48)，新版浮動圖 flow-glass 存在；1348/1348 無水平溢出。本站來源 error 日誌無結果。截圖 research/koi-platform/live-krate-016.jpg。

## 2026/10/27 Krate Studio 0.1.7

- 原創三張玻璃擬物作品插圖輪播，刪除三段作品資訊文字。四個區段連結新增向右箭頭與指定 Hover 圓框。
- 三線選單轉叉動畫與鍵盤關閉；頁首藍紫材質、社群插圖與淡游標反光。製作器未改。
- 建置、12 項測試、17 頁版號與 QA 排除通過。Chrome 桌面／390／1024 操作證據詳見 research/koi-platform/KRATE-017-NOTES.md。

- 正式發布成功：Sites 77，來源 a736012eebc2d85dd9f687dce87f1e7274a78c66，deployment appgdep_6ae061bbd4d8819186d11fb5bf5c5023。Sites 76 保留回退點。
- 正式 HTTPS 重開顯示 0.1.7；三張插圖、四個指定 SVG 箭頭入口、三線選單均存在，作品資訊列為 0。實際點下一張後顯示 story-scene-2.svg，本站來源 error 日誌無結果。截圖 research/koi-platform/live-krate-017.jpg。

## 2026/10/27 Krate Studio 0.1.8

- 接續32a9aa6，修復手機選單遮住第一行標題，改文件流直向漢堡選單。
- 多色玻璃黏土插圖、手寫展示字、螢光筆主標，移除兩個首頁捷徑。連續向左展示帶支援Hover暫停、點入與鍵盤。
- 新增消息分類、詳情互連、複製連結與頁尾回頂，延伸局部游標淡反光。製作器未改。
- 實際操作參考站範圍、功能採納與限制、瀏覽器證據見research/koi-platform/KRATE-018-NOTES.md。

- 正式發布成功：Sites78，來源95c2b6a6da40a69041b0d8f3458394141cdf9816，deployment appgdep_6ae0b5f497608191a53d4943960b021b。保留Sites77回復點。
- 正式HTTPS確認標題、頁尾0.1.8及新插圖。複製消息連結成功。14項回歸通過，/qa/正式排除，原版製作器逐檔相同。

## 2026/10/27 Krate Studio 0.2.0

- 接續c839bbd9。首頁恢復系統字體，平直低不透明度螢光筆，頂部插圖回藍紫並加耳機與音符。
- 八色編號展示帶、同色原創黏土圖示與抓卡片小狐，角色介紹新頁。暫停改圖示，保留無障礙控制。
- 瀏覽器手機、桌面、Hover、滑鼠與鍵盤角色入口驗收。原製作器未改。詳見research/koi-platform/KRATE-020-NOTES.md。

- 正式發布成功：Sites79，來源2b7c8a1c4abf0fe827c31d8752b2c17d57a40420，deployment appgdep_6ae0bffc93e48191b9974f603fbdc776。
- 正式首頁與角色頁已重開驗證0.2.0。15項回歸與24份新SVG解析通過，本站來源error無結果。Sites78回復點保留。

## 2026/10/27 0.2.0 移除角色

- 依使用者要求移除全部角色、角色頁、入口與素材。卡片由0.1.8真實來源復原結構，只保留八色及編號，官網統一系統字體，製作器不變。
- 詳見research/koi-platform/020-clean/NOTES.md。

## 2026/10/27 0.2.0 卡片淡色修正

- 依附圖使用0.1.8原始三張插圖，保留原物件與柔和材質，只對背景及卡片表面加極淡色；移除前次飽和染色，所有編號改深色。
- 預設系統字體保留，平直螢光筆不透明度提高至50%，移除主圖「你好，故事」文字。其餘布局不改。

## 2026/10/28 十二張故事卡片

- 依使用者最新文案與01至12圖片替換展示帶，上圖下文，最底進去看看，編號不顯示，所有暫停按鈕及圖示移除。
- 點卡片可檢視相應原圖與文案，原生dialog支援鍵盤與手機。未改原製作器。
- 瀏覽器與原圖完整性驗收見research/koi-platform/020-stories/NOTES.md。

- 正式覆核發現focus-visible重排會影響點擊目標，已改真正Tab事件才啟用靜態鍵盤瀏覽，滑鼠及圖片關閉焦點不再跳位。滑鼠第二張、鍵盤第三張、再滑鼠第一張實測皆正確。

## Krate Studio 0.2.1

Personal-site homepage now rotates across personal creation, everyday tools and Koi Maker. Added searchable /tools/ and eight functional tools. Preserve 12 story art files/copy, increase strip speed from 156s to 126s and replace text close control with 44px SVG cross. Editor 0.40.12_r4 preserved. Scope, reference-access distinctions, 50 implemented design details and browser evidence: research/koi-platform/021/NOTES.md. Tests: 16 portal + 11 tool tests. Prior live restore point Sites83 / c625415342e979293a6b6e2f876637c49d1daf52. Publish from exact helper-verified source commit after production build; never ship internal /qa/.

## Krate Studio 0.2.2

接續 Sites85 的 bba8fbe4175777a3e05c269d712517e7066214e7。氣象改為中央氣象署官方 AWS 觀測與縣市預報，預設新北市，精確定位採使用者點選授權且座標只留頁面。新增線上時鐘、計分板、文字比對、時區轉換、輪盤、翻譯與酷文字，工具總數 15。保留首頁、故事原圖、無橫桿箭頭與 0.40.12_r4 歷史編輯器。研究與驗收記錄 research/koi-platform/022/NOTES.md，50 項設計細節 DESIGN.md。正式 build 排除 /qa/，前正式回復點 Sites85。

## Krate Studio 0.2.3

限縮修復：氣象白底深色文字、成對細節分格與玻璃黏土氣象圖示，修正手機按鈕對齊；刪除時鐘面板說明與重複地名；首頁只顯示目前順序前 8 個工具，完整工具箱保留 15 個。其餘 30 公開頁面只更新版號，Koi Maker、CWA 資料來源、定位、故事圖片及功能不動。39 項回歸測試通過。量測與驗收見 research/koi-platform/023/NOTES.md；回復點 Sites86。

### 2026-10-28 0.2.3 small copy and weather icon correction
- Removed only heading taglines from all 14 ordinary tool detail pages; functional labels/help retained. Homepage and complete tools directory byte-identical.
- Weekly dates shortened to 10/29（四） without whitespace; weather illustration stroke 1.4 to 0.7, metric stroke 3 to 1.5. Data and layout unchanged.
- npm run build passed; 39 existing regression tests passed. Chrome confirmed scoreboard has no heading subtitle and live preview weekly dates use short weekdays with expected SVG strokes. Version remains 0.2.3.

### 2026-10-28 0.2.3 tablet sizing, quiet search focus, manual story scrolling
- Recovered exact Sites 88 source e4184aeb from remote after workspace pruning; no editor changes.
- Centered ordinary tool workbenches with equal page gutters; explicit flexible widths, shrinkable/wrapping tool-list text, 16px form inputs, text autosizing consistency. Weather sheet explicitly bounded and centered. Safari focus zoom avoidance is implemented; physical iPad Safari remains unverified.
- Search input uses a bottom focus accent rather than an external blue rectangle; native search appearance suppressed. Functional keyboard focus retained.
- Replaced translated-only story animation with a shared native scroll position. Automatic 126-second loop remains, touch/trackpad scrolling and mouse dragging supported; interaction pauses auto motion and it resumes after inactivity. Hover/dialog/keyboard/reduced-motion/hidden-document pauses remain. Drag suppresses accidental click, ordinary tap still opens matching story. No motion buttons added.
- Chrome QA: 24 combinations of home/tools/weather/scoreboard at 390/768/820/1024/1194/1366 iframe widths, no document horizontal overflow. Scoreboard and weather margins equal on both sides. 390px filtered Selection Sort search remains in viewport.
- Actual Chrome drag moved scrollLeft 47 to 500 with no dialog, motion subsequently advanced 503 to 581, and normal click opened the matching 第一次的心動 story. Search has no outer outline; 16px input verified.
- 42 automated tests passed including new carousel drag/click safety, fractional auto looping, and keyboard/storage regression checks. Build passed. Version remains 0.2.3. Temporary QA route/build changes are excluded from production.

### 2026-10-28 0.2.4 field surface correction
- Removed both the search underline introduced in 0.2.3 and blue focus outlines on public tool text/number/textarea/select controls. Shared idle/hover/inset/focus tokens use translucent blue/lavender surfaces and soft inset shadows, with no hard spread/outline/underline. Keyboard focus is identified by a stronger surface tint/depth; disabled fields remain distinct.
- Applied the same correction to weather county select and work search. Buttons, navigation, layout, icons, carousel, functionality and editor remain unchanged.
- All 33 HTML pages differ only in displayed version 0.2.4. No JavaScript or data changes.
- Build passed; 42 regression tests passed. Chrome draw-tool checks: idle border 0/outline none; actual mouse hover changes surface; Tab reaches number field with focus-visible true, border 0/outline none and distinct lavender surface. Real draw submission returned an entered option. Search surface and tool fields share the same tokens.

### 2026-10-28 0.2.5 weather update
- Recovered exact Sites 90 source cca8ffd1 from remote. Preserved editor and all other functions.
- Scoped desktop weather layout, county forecast side list, light/dark/system theme, 5-minute visible-page refresh and return/online refresh.
- Default coarse IP county via ipapi.co; manual/GPS override races handled. Fresh high-accuracy GPS + best-sample watch limited to 20 seconds; city selector and place synchronize through browser-local administrative boundaries. Coordinates never transmitted or persisted. IP/physical accuracy limitations stated in the page.
- Required privacy disclosure and displayed version updated. Other 31 public pages differ only by version text.
- 50 tests passed; 14 light/dark responsive width checks passed. Actual Chrome IP lookup, themes/reload, county list, manual selection and denied-GPS fallback verified. No claim of physical GPS or Safari testing. See research/koi-platform/025/NOTES.md and tests.txt.

### 2026-10-28 0.2.5 compact weather controls and spotlight dots
- Phone weather toolbar is one row: county select, refresh SVG, location SVG, native theme picker with system/sun/moon SVG. Icon controls retain 44px targets, accessible labels and existing material/focus states. Desktop text controls remain.
- Home spotlight pagination now has three small dots with 44px targets and accessible slide names; removed visible labels and previous/next buttons. Automatic rotation and direct slide selection remain.
- Chrome iframe checks at 320/390/768: no document horizontal overflow. At 320 and 390 all four controls share y=166 and height=44. Theme picker changed to dark and corresponding moon icon appeared. Three dots selected Koi Maker and displayed the matching slide.
- Version remains 0.2.5; no project/editor/data changes. Temporary QA route excluded from production.

### 2026-10-29 0.2.6 weather quality correction
- Restored weather-only metric glass surfaces and balanced phone last-row alignment. No hard border strokes or unrelated GUI redesign.
- Shortened IP status, moved all explanatory text into linked privacy section, retained only forecast issue line and policy link at weather bottom.
- Added official CWA warning content, valid-time filtering, safe disclosure and independent minute refresh endpoint/fallback. Clear outage vs no-warning states.
- Per-field official observation fallback preserves incomplete-temperature station records, uses valid nearby fresh readings and shows their station/time. No fake values or unverified third-party model substitutions.
- 61 regression tests and 14 light/dark responsive checks passed. Actual Taoyuan pressure/visibility/UV and official warning data verified in Chrome. Physical iPad Safari and iframe screenshots remain unverified/unavailable. Evidence in research/koi-platform/026/NOTES.md and tests.txt.

### 2026-10-29 0.2.6 warning update hotfix
- Confirmed official W-C0033-002 announcement issued 10/29 16:26, effective 10/30 17:00 to 23:00. Previous active-period-only filtering hid this already announced warning.
- Display published, unexpired warnings before their effective start with 預告生效; still exclude not-yet-issued, cancelled and expired records. Keep active-period helper semantics unchanged.
- Warning snapshot now loads/refreshes independently of weather availability. General weather cache cannot overwrite a newer dedicated warning snapshot or restore a cleared warning. Weather failure no longer falsely marks the independently successful warning feed as failed.
- Skip identical warning DOM updates and preserve disclosure open/focus state when official contents change. Bypass browser/CDN caches for warning retrieval while retaining the 60-second server memo/coalescing; weather caching unchanged.
- 65 tests passed. Added actual future-announcement fixture and regressions for upcoming display, stable expanded DOM, changed content, old weather snapshot rollback, cancellation/empty response and weather outage isolation. All HTML/CSS, version 0.2.6 and unrelated functionality unchanged.
- Restore point: Sites 93 / f4c1e86f3fb19dd7f2484f1de5528bf4c0933afe. Test evidence: research/koi-platform/026/warning-update-tests.txt.
- Actual Chrome preview: official future warning rendered with 預告生效, opened details stayed open across 100 seconds of visible-page time (longer than the minute refresh interval).

## Krate Studio 0.2.7 QR generator 2026-10-29
- Continued exact Sites94 source7d8cc206. Added /tools/qr-code/ and /tools/qr-code/embed/ with local QR encoding, seven content types, four styles, L/M/Q/H, sizes160–1200, PNG/SVG/standalone HTML and iframe output. Four-module quiet zone and reserved structural modules retained; no data upload/storage.
- Existing site material and responsive layout reused, directory16 tools, homepage8 unchanged. All other existing pages receive footer version only. Editor and weather remain byte-identical.
-101 automatic tests pass including independent SVG image decoding; Chrome five widths and actualPNG download/decode passed. CloudChrome SVG/HTML downloads remain unconfirmed; Blob/HTML content verified separately. No physical scanner/Safari claim. Evidence research/koi-platform/027/.
- Prior production Sites94 remains rollback source. Build includes35public routes, excludes internalQA route.

## Krate Studio 0.2.8 宇通聲音模擬器 2026-10-29
- Added /tools/yutong/ to existing personal site'stoolbox. SpecifiedZK6128HG synthesis,30second10stagecycle, manualRPM/throttle/brake with6gears, volume/condition, pause/resume/stop/replay/loop. ProceduralAudioWorkletnoise withScriptProcessorfallback, smoothedoscillators/filterAM/retarder/softclipping. Noexternalrecordingassets orinputstorage.
- SharedGUI/weather/QR/editor unchanged. Existing34non-directorypages differonlyfooterrelease0.2.8; directory17, homepage8. Site95/source9ef8081 remainsrollback.
-110tests passed; actualChrome30secondcompletion andmanualcontrols;5widths nooverflow. OfflineAudioContext actualgraph40/80Hzfundamentals, increasedpoorconditionRMS,750Hzretarderandzeromute passed. PreviewHTTPusescompatibilityfallback; productionHTTPSAudioWorklet smoke-test required afterdeploy. Notes/reports:research/koi-platform/028.

## 宇通模擬器換檔與行程擴充 2026-10-30
- 以 Sites98/f98de81 接續，只修改 /tools/yutong/ 與其專屬控制、樣式、行程模型；其他35個路由字串相同。保留0.2.8、85%音量、自動行程減速器靜音。
- 設定說明改為提供的車型/引擎/ZF6速文字與7項流程，平均值敘述註明依提供資料設定，未宣稱取得或分析真實行車量測檔。
- 新增20/30/40/50/60km/h × 暴力型/標準型/悠閒型15組行程；標準40原30秒10階段完全保留，其他組合依參數調整行程總長並維持10秒巡航。手動基礎轉速預設800、下限600，聲音主頻同步降至30Hz。手動可選自動/手動換檔與1–6檔升降，變檔會改變行駛時RPM目標。
-113項測試通過，含全15組逐步量測、600RPM聲音參數與升檔降轉、UI檔位界限。Chrome實際60暴力型行程及600RPM/M2/30Hz啟動成功。5個寬度320/390/768/1024/1920量測零水平溢出、控制項皆在控制台內；320/390/768升檔成功，768瀏覽器回應逾時但DOM顯示2檔，不將逾時當產品錯誤或虛報全寬度互動通過。
- 報告 research/koi-platform/028/gear-tests.txt。未實測實體Safari/車輛音色，不宣稱工程模型為車輛實測平均值。
