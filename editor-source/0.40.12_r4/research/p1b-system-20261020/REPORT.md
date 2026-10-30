# KOI Maker 0.40.10 — P1-B 系統修復與發布門檻報告

## 範圍與目前狀態

由第51版 c26dce36cd553c53417ecf8d54c40f8c6e8a6c40 接續，保留 e26c18a 音效修復、250bb44 的 P1-A、525dd90 的正式r49與原備份。沒有重製網站、實作工程模式或啟動P2。119個不重複的模型／JSDOM整合案例通過，build、語法與Worker資產檢查通過。這是風險導向P1-B必要修復完成，不代表全系統每項功能或P1-C全面驗收完成。

發布候選來源將以本報告所在最終提交建立完整ZIP並保存到既有Sites。原生最新版本目前51，候選側欄文字r52；必須確認原生保存回傳版本確為52，才部署同一公開專案。實際發布結果另見RELEASE.md；本文件不預先宣稱部署成功。

## Bug、重現方式與根因

| 編號／嚴重程度 | 重現與根因 | 最小修復／最終證據 |
|---|---|---|
| B01 High：畫布編輯錯誤事件 | 建立A登場、A左移、A搖晃；畫布選第二個演出再更改動作。GameDesigner逆向搜尋最近character事件，忽略目前actor的animation來源，修改登場事件。JSDOM實際載入app重現。 | 以視覺狀態eventId綁定來源；拖曳也使用相同ID。actor-isolation-dom首案通過。 |
| B02 High：等待動畫被跳過 | fade→left→shake都wait:true；Engine.settle原本把所有animation當立即事件，停在對話時只剩最後動作。 | 有明確wait:true的演出成為引擎步驟，真實Player等待素材及設定時間；選單／隱藏暫停計時。引擎及Player序列案例通過。 |
| B03 High：巢狀參數參照污染 | applyVisual後修改runtime mobilePlacement，來源event也改變；原reducer淺複製巢狀物件。 | 進入視覺狀態先深複製事件；屬性patch也複製。原始資料不變、複製獨立測試通過。 |
| B04 High：數字角色名稱被重映 | animation.target='2'；排序或複製把它當事件索引調整。 | 事件目的地重映／剪貼簿排除animation.target；保留字串角色ID。排序、複製、KOI round-trip通過。 |
| B05 Critical：舊回呼覆寫其他事件 | 保存屬性回呼→重新排序→以原index更新，改到別人。跨章也有相同風險。 | 回呼綁定渲染時專案／章節／事件ID；刪除後忽略，跨專案忽略，跨章仍只更新原事件。延遲回呼、巢狀patch、刪除、切章案例通過。 |
| B06 Medium：一回動作殘留／重播 | 後續角色事件未指定motion時沿用前次shake；重複事件ID缺少單次播放識別。 | 預設清除已結束的一回動作、只保留明確循環；motionToken區分播放批次，只重掛目標角色，其他角色DOM保留。 |
| B07 Medium：無效目標靜默略過 | 指向不存在角色、或fig-left位置多名角色。 | 精確角色ID優先；位置別名只接受唯一對象，否則顯示執行診斷，不套到全舞台。缺少與歧義案例通過。 |
| B08 High：移動時誤刪其他角色 | A移至中央、B原在中央，舊動畫位置替換邏輯刪B。 | 未要求slot替換時只改A；保留舊版明確replaceMode=slot的產品規則。新舊兩種案例通過。 |
| B09 Medium：舞台動作未顯示 | stage-main寫入狀態但渲染層未使用。 | 既有StageLayers套用同一motionStyle與暫停狀態；移除已過時的腳本不支援警告。模型與建置通過；實際畫面待人工。 |
| B10 High：建置遺失P0-C樣式 | npm run build後git diff顯示四行textarea／reporter／手機排版規則被刪。產生器以共用區起點截斷整個檔尾。 | 共用樣式加入明確結尾，保留區外尾端；無法辨認舊範圍即停止，避免覆蓋。完整重建、語意內容完全相同與冪等檢查通過。 |

修復中發現的回歸也已處理：等待動畫的tap防連點擋住隱藏介面恢復，將恢復判斷提前；第一輪slot修復未保留明確舊slot規則，改為保存並繼承明確replaceMode。原始失敗紀錄保留，最後案例全部通過。

## 操作與相容性規則

- 每個事件保留既有ID及獨立參數，不引入第二份專案資料來源；四模式繼續使用既有資料模型。
- 明確wait:true依motionDuration等待；100–120000毫秒，無效數字回退800毫秒。循環動作等待一個週期後繼續，防止永久卡住。
- 舊事件未指定wait時維持非等待；新建角色／動畫預設等待。原生KOI動作預設等待，可用-等待=false明確並行；舊setAnimation未指定等待維持非等待。若三個舊事件本來沒有等待，仍可能同一步覆蓋同一目標的前一動作；需要依作者意圖勾選等待，沒有批次改寫舊專案。
- 多角色獨立target；明確stage-main才套舞台。位置別名多角色時診斷歧義；作者改用角色名稱即可。slot模式仍代表位置替換；keep模式可疊放角色。
- 場景預設清除角色及過期舞台動作；clearActors:false維持既有保留角色設計。
- 不變更IndexedDB schema、本機儲存key或素材庫初始化流程；部署只更新程式。實際用戶資料、所有舊版與所有容量無法以合成案例保證。

## 風險導向檢查矩陣

| 模組 | 已執行／結果 | 未完成範圍 |
|---|---|---|
| 四種編輯模式 | 實際bundles＋app在JSDOM：新增、複製、排序、刪除、Undo/Redo、KOI與四模式同步、ID/條件/標籤/跳轉保存；20項既有同步回歸通過 | 真實鍵盤／滑鼠／手機觸控與視覺 |
| 動畫播放器 | 全部既有motion映射、A/B/C目標、同角序列、等待／並行、存讀與快速100次更新、切景清理、無效目標；模型及DOM通過 | CSS實際插值、轉場與裝置效能 |
| 文字／劇情 | 逐字、快進、自動、語音等待、歷史、變數、選項／條件、跨章跳轉、迴圈停損、存讀、結局；既有模型／DOM通過 | 真實長篇劇本、各瀏覽器字型 |
| 音訊／鑑賞 | 既有第51版17項＋相關音軌／Player回歸：首次解除一次、無效拖曳不播、普通鑑賞不中斷、試聽優先、停止／結束／拒播恢復原位置 | 真實聽感、音訊政策與各裝置行為 |
| P1-A背景 | 9項獨立測試通過；主畫面／場景／存讀設定、桌機手機設定、素材引用及儲存 | 真實RWD與裁切觀感 |
| 專案／素材 | 9MB圖片、Base64舊資料遷移、交易失敗保留舊存檔、字型引用、ZIP全部素材；專案CRUD、跨章及1000指令同步通過 | 真實音樂／語音檔匯入、缺少素材的所有格式、512MiB/2GiB壓力及任意第三方舊專案 |
| GUI保護 | CSS只多範圍註解，規則內容與第51版逐字相同；HTML只有側欄版本文字r50→r52；圖示／音效檔雜湊未變；JSX檢視未重設布局 | 截圖、動畫、聽感與觸控，不能以DOM替代 |

## 角色演出15項驗收對照

| 要求 | 實際證據／狀態 |
|---|---|
| 1 三事件不同動作、2 修改第二事件不影響其他 | 模型＋實際GameDesigner DOM案例通過 |
| 3 複製獨立、4 刪除不污染、5 重排保留 | clipboard/delete/reorder＋延遲回呼案例通過 |
| 6 儲存重載、7 Undo/Redo | IndexedDB＋引擎save/load＋四模式DOM通過 |
| 8 KOI匯出入、9 積木／事件模式切換 | serializeEvents/compileProgram與四模式DOM通過 |
| 10 同角連續、11 多角不同動作 | 引擎序列與A/B/C並行、Player計時／其他角色DOM不重掛通過 |
| 12 不存在目標 | 不存在與歧義皆產生診斷，通過 |
| 13 快速連續 | 100次有界更新及重複ID播放token，通過；實機效能未驗 |
| 14 切景不殘留 | 模型預設切景清除actor/stageMotion通過；保留角色模式依原規則 |
| 15 持續時間與等待 | 模型分別120/240/360ms，Player時間序列與開選單暫停、隱藏恢復通過；CSS實際畫面未驗 |

## 修改檔案與檢查點

資料／事件：src/motion-state.mjs（新增）、src/visual-state.mjs、src/engine.mjs、src/event-order.mjs、src/card-clipboard.mjs、src/script-import.mjs、dist/app.js。
既有渲染／編輯：src/game-designer.jsx、src/block-extras.jsx、src/player.jsx、src/stage-layers.jsx。只修狀態、目標、播放與現有選項；沒有換UI框架。
建置：scripts/generate-game-skins.mjs；產物dist/workspace.js、dist/player.js、dist/server/index.js、worker/index.js；dist/style.css、dist/player.css僅新增界線註解，dist/index.html僅版本文字。
測試：tests/actor-isolation.test.mjs（13模型）、tests/actor-isolation-dom.test.mjs（5整合）。其他既有測試未為了通過而刪改。紀錄：本目錄、PROGRESS.md。

還原起點c26dce3（tag checkpoint-04010-before-p1b-system-20261020）；第一批362667a；第二批eaf1c5a；建置安全f271173。最終發布來源SHA、正式tag與ZIP見RELEASE.md。工程模式設計文件雜湊不變。

## 未完成與發布風險

目前已執行範圍沒有尚未處理的Critical/High或已知專案資料遺失；這不是對所有未知案例的保證。P0-C 7個視覺案例及原ZIP、88測試與10組DOM歷史紀錄保留，狀態仍待人工。沒有搜尋瀏覽器插件或使用替代瀏覽器。
本次沒有新的Medium待修；動畫畫面／音訊裝置行為仍待真實驗收。Low：非阻斷性提示完善列後續。手動步驟見MANUAL-ACCEPTANCE.md。原網址與public權限保持；發布後原生部署狀態僅證明部署流程，不能當作真人開站及操作通過。

下一階段P1-C先執行人工高風險清單，然後擴充真實舊專案、音樂／語音素材匯入、跨裝置及壓力測試。不要同時啟動工程模式或P2。
