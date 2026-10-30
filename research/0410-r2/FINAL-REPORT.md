# Koi Maker 0.41.0_r2 — 來源重建與 SoftFlow 1 驗收

2026-10-24（台灣）。部署狀態以 DEPLOYMENT.json 為準；本檔寫入時尚未部署，不預先宣稱成功。

## 來源與保護

- 原站 Sites62，實際專案 appgprj_6ad04b4f4db081918fe4a0e9d541130f，發布 baf3da10fedb9ec4fbb74dbc4f90ae04be9e1699。使用者提供末尾多一個2的ID已透過原生工具核對，沒有另建站。
- main 5f4a6ac 是部署紀錄提交，與正式來源的程式相同。完整0.41.0 ZIP驗CRC及主要檔案比對通過。
- 搜尋全部可取遠端分支、Git物件、fsck與受控工作區／備份後，83d7272／eac47dc／bfdc11e不可取回。原本r2修改來源無法恢復。本輪為受控重新實作，不是復原那些提交。
- feature/softflow-0.41.0-r2 每包提交、完整ZIP／bundle／SHA；透過正確遠端push與fetch比對。沒有force/reset覆蓋，Sites62回復來源完整保留。

## 修改範圍

單一SoftFlow色彩／表面／字體／間距／圓角／互動常數，legacy樣式放入CSS layer，解除舊全域扁平!important與新材質的競爭；未以數十層!important再覆蓋。共用Button／Input／Select／SettingSection／FormRow／FieldGroup／PropertyEditor／InspectorSection及FilePicker。React19沿用，沒有Vue或外部UI Kit。

主導航連續底線、四模式回Header、配色進介面設定；工具頁收回無關Inspector空間。樹、清單、工具列、圖片／模板／表單／視窗共用語意材質；主要儲存／預覽可有局部受光，非全頁監聽。完整18項與元件清冊見H3-DEFECTS.md。

17處原生React檔案輸入接到共用元件，保留accept／directory／multiple／disabled及原回呼。移除指定的AssetRepair介面與編輯器和弦，保留原資料和普通素材引用／AudioPlayer／MusicMixer／SoundTracks。發現舊import/export被隱藏，接回儲存與匯出頁，不重寫備份引擎。

BASELINE.json的引擎、播放器、積木核心、持久化、KOI Script及正式Logo檔案SHA檢查通過。未新增資料庫格式或儲存鍵遷移，容量政策與安全門檻維持原版，不宣稱新增5GB驗證。

## 研究真實範圍

128個唯一候選，5個技術文件核實、20個僅日期核實、103待核；不是150件完成。25個優先候選不等於25個完整視覺核實。保留原始Excel、CSV／JSON、具體來源與核實層級；見H2-RESEARCH.md／NOTES。復原代理沒有新增查詢；主代理另作2輪有上限的官方文件核對。未搬用第三方CSS／圖片。

## 自動化結果與失敗記錄

- H1基準111/111通過。原上輪115/115只是歷史回報，不冒稱本輪原83d7272已重跑。
- 最終 npm run test:softflow 16/16通過（13共用GUI＋3容量級別整合），見H8-softflow-final-tests.log。
- H5直接12/12；H7新增移除案例後13/13。最終含備份入口15/15通過（H8-backup-ui-tests.log，與主套件有重疊，不相加灌數）。
- 主套件116項：首次最終回歸115通過、1草稿重載失敗（H8-regression-tests.log）；該案例單獨重跑1/1通過（H8-draft-retry.log）。再次完整p0d小套件雖exit0但只有5項輸出、無完整結束摘要，不能算7/7通過；保留原日誌，不無限重跑。真正Chrome的草稿儲存／重載與500筆正式事件保留另行通過。這是待追查的自動化重載不穩定限制，不把整套稱為一次全綠。
- 50／300／500實際React bundle四模式、ID／參數／未知欄位／分支／巢狀loop／序列化／Undo／Redo／IndexedDB還原通過。含容量防護共11/11（H8-targeted-tests.log）。layoutGraph回傳物件的positions正確量測，未把物件誤作陣列；最終排列1.33／1.65／5.62ms，非瀏覽器FPS。
- 測試副本原本loopId錯用名稱、標籤type誤用label，依真實模型修正fixture為repeat事件ID及section，未修改引擎或放寬斷言。初次新增移除測試錯用不存在AudioManager名稱，改為真實MusicMixer。
- FilePicker回歸找不到原aria-label，已於隱藏原生input保留同名，再測容量防護通過，未更改容量期望。
- 建置、語法、Worker與最終新增靜態檔驗證見H8-final-validation.log；以實際輸出數量為準，不冒稱舊34資產就是本輪數量。

## Chrome 實測

H8-BROWSER.md詳列動作、失敗與結果。真正檔案選擇PNG匯入、500筆副本匯入、四模式、儲存重載、未套用草稿、複製／刪除取消／確認／Undo／Redo、Logo取消與Enter首頁、預覽開始與關閉均有實際操作。七尺寸真實iframe CSS布局0整頁溢出，模式等寬，手機設定／FilePicker0溢出。不是實機觸控或不同DPI測試。

## 待驗與後續

- 150件完整歷史研究尚未完成；設計接受度由使用者評審，不能用Tokens取代主觀驗收。
- 自動化草稿重載偶發失敗／不完整輸出需獨立診斷；本輪不進一步重構原持久化核心。瀏覽器對應操作通過，模型及核心檔未修改，未發現本輪引入的資料遺失。
- Windows、Firefox／Safari、實機觸控／多DPI／全部鍵盤路徑、真實資料夾／多檔拖放、聽感、240FPS、使用者完整大型劇本仍待驗。
- 4～5GB真實IndexedDB與Windows EXE、作者可讀KOI Script完整編輯仍屬既有獨立待辦，沒有宣稱本輪完成。
- 不新增另一套引擎／資料模型，不清除使用者資料。若真人發現阻斷問題，可回復Sites62（既有saved version／發布來源），不以舊碼覆蓋本輪開發分支。
