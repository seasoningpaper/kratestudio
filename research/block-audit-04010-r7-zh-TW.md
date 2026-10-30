# KOI Maker 0.40.10 積木編輯器修復與架構檢查報告

日期：2026/10/20。來源基準：`8bfcdefaab499b3f6a32c33063fbdfd520d33365`。功能版本維持 **0.40.10**，資源快取修訂為 `04010-r7`。

已直接修改既有專案、執行測試並完成 Worker 建置，未另建編輯器、未導入 UI 框架或額外執行引擎。本報告的「通過」僅指實際執行的驗證；沒有將模擬觸控視為手機實機驗證。

## 一、結果

- 完整測試：**264 項通過，0 項失敗**，本次最後一次執行約 46.3 秒。完整輸出見 `block-audit-r7-test-results.txt`。
- 本次新增 14 項模型驗證與 7 項 DOM 整合驗證；既有 243 項回歸測試保留。
- 另完成 300、3,000、10,000 個積木的模型操作量測，以及含巢狀重複結構的 1,000 次確定性拆接操作。
- 中英文共 10 種積木畫面的 DOM 與修改前完全相同；三份樣式檔逐位元組相同。HTML 只有快取修訂變動。這不是像素截圖比對。
- 真實 Chrome/Safari 操作、手機長按與多點命中、瀏覽器 FPS 尚未實測，列為驗收限制。

## 二、原始架構與資料流

`project.chapters[].events` 是共同資料來源。積木沒有另一份獨立 AST：

| 資料 | 現行用途與處理 |
| --- | --- |
| 事件陣列順序 | 正式執行順序；新增、移動、刪除時同步更新數值式分支目的地 |
| `id` | 積木與事件共同識別碼；React key、回接與剪貼簿使用同一個識別 |
| `blockDetached` | 獨立積木串；執行引擎略過，接回故事才執行 |
| `blockStack`、`blockPos` | 獨立串分組與錨點；連接元件由資料推導，不另外維護可失同步的父子狀態 |
| `repeat`、`repeatEnd.loopId` | 以配對表示巢狀內容；只允許同一串內合法巢狀配對 |
| 事件／流程／積木模式 | 讀取共同事件陣列；切換模式不建立副本或重新產生事件 |
| 程式模式 | `.koi` 草稿獨立保留；「從事件更新」明確匯出；「套用至專案」經檢查及確認後更新共同事件 |
| 遊戲預覽 | 啟動時由最新專案建立 Engine 快照；不將拖曳預覽的 DOM 當執行資料 |
| Undo／Redo | 使用既有專案快照；一次新增加接合是一個交易，拖曳移動預覽不提前寫入正式事件 |

故事選項或跳轉可形成作者設計的迴圈，這與錯誤的積木父子循環不同。本次驗證不會擅自禁止合法故事分支迴圈。

## 三、實際重現與修復

下列缺陷先以程式或測試確認，未將使用者列出的全部情境一律視為仍有問題。

| 編號 | 根因與修正 | 驗證結果 |
| --- | --- | --- |
| B01 | 快速連按新增時，React handler 保留舊選取位置，造成後建立者插到前面。改由正式事件回呼讀取最新選取位置。 | 十次連按保留建立順序、十三個總事件的 ID 唯一；十次撤銷與重做正確。 |
| B02 | Ctrl+C 只取選到的重複積木，可能漏掉內容與結束積木。將完整巢狀選取閉包統一到結構層。 | 複製完整配對、重新產生 ID、改寫 loopId；複本執行結果正確。 |
| B03 | 獨立積木貼到原串中間，令原串前後被不同根 ID 隔開。獨立複本保留為新的獨立串；一般積木貼入獨立串則繼承合法宿主分組。 | 原串保留完整順序；複本根 ID 獨立，不保留過期回接錨點。 |
| B04 | 連接判斷只檢查全域重複配對，沒有完整驗證唯一 ID、同串擁有關係及移動選取的連續性。 | 重複 ID、缺失 ID、孤立結束積木、跨串配對與不連續移動被拒絕；失敗不改事件。 |
| B05 | 複製、按鈕重新排序與拖曳使用不同路徑，可能產生不同連接結果。 | 重新排序改走既有共同 transfer；一般複製與重複複製統一使用共同剪貼簿。 |
| B06 | 同一 ID 的事件更換類型時，積木幾何快取未納入 type。 | 對話換成背景後高度立即正確，不沿用舊高度。 |
| B07 | 拖曳開始後若正式資料或工作區座標改變，舊拖曳仍可能提交；第二個觸控點也可能留下工具箱 ghost。 | 過期手勢取消且不提交；次要指標不建立第二個 ghost；取消不新增事件。 |
| B08 | 程式編譯與純文字匯入沒有完整阻擋破損重複結構；自動辨識未包含 `事件:`。 | 匯入辨識修正；編譯檢查配對與其他章節已使用的 ID；失敗保留草稿。 |
| B09 | 新章節匯入可能沿用既有事件 ID。 | 只對碰撞 ID 重新命名，更新 loopId、已知積木根與回接參照；原參數保留，舊章節不變。 |
| B10 | 新積木的頭尾同時吻合不同接點時，開始接點與串中接點可能同分，導致放在開始處卻插到中間。 | 距離相同時開始接點優先，再採一致方向排序；重現案例由錯插中間改為接到開始。 |
| B11 | 舊獨立重複積木可能只有根位置、沒有串 ID 或子積木座標，過度嚴格驗證會拒絕合法舊資料。 | 依既有配對辨識合法舊串；後續交易正規化根 ID，不刪除舊事件。 |
| B13 | 舊拖曳與貼上路徑仍將 y 限制在 15,000，與模型的深畫布上限不一致。 | 統一共用畫布上限；25,000 深處的拖曳與複製不再跳回 15,000。 |
| B12 | 全選複製與吸附反覆掃描結構，容易增加大量積木的運算成本。 | 一般積木不再逐個搜尋重複邊界；吸附先依幾何距離排序，再驗證候選，保留相同外觀。 |

原有的單塊 Alt 拖曳、右鍵三種拆開操作、一般空白處新增、整串接回故事、取消拖曳、雙指平移等路徑，在本次回歸測試中正常，未重做其 GUI。區段分界與獨立串不執行的既有行為保留。

## 四、20 項驗收表

「自動」為純模型或 JSDOM 整合測試；JSDOM 不能證明真實瀏覽器的版面、指標捕捉或觸控手感。

| 項目 | 測試情境 | 預期結果 | 實際結果 | 狀態及證據 |
| --- | --- | --- | --- | --- |
| 1 | 工具箱新增單一積木 | 一次操作只新增一個合法事件 | 拖曳加 click 不會重複建立，空白處為獨立串 | 通過，自動；既有 r6 滑鼠／觸控案例 |
| 2 | 連續新增十個積木 | 順序與建立順序相同、ID 唯一 | 十個依序接續，總事件十三個且不重複 | 通過，自動；R7 ten rapid Add |
| 3 | 從串中間取單塊或後綴 | 來源接續，不刪其他積木 | 單塊、後綴、整串三種操作皆驗證 | 通過，自動；r6 context、Alt-drag、模型測試 |
| 4 | 將整串拖離故事 | 原串內容一起移動，獨立後不執行 | 事件完整保留，Engine 略過獨立內容 | 通過，自動；r5 complete floating stack |
| 5 | 兩個獨立串合併 | 接合後只有一組合法根 | 合併、再拆分與根 ID 一致 | 通過，自動；stack-reconnect |
| 6 | 插入上方、中間、尾端 | 前後串接續且順序正確 | prepend／between／append 的事件順序與 Engine 順序相符 | 通過，自動；R7 single and full stacks |
| 7 | 重複拆接、巢狀拆接 | 數量、ID 與分支不遺失 | 既有 400 次與新增 1,000 次確定性操作均穩定 | 通過，自動；模型壓力測試 |
| 8 | 不合法接點與結構 | 拒絕且不修改正式資料 | 自接、缺失 ID、錯誤配對、不連續移動皆拒絕 | 通過，自動；R7 invalid／source cases |
| 9 | 縮放後拖曳 | 螢幕位移正確轉為工作區位移 | 50% 縮放下滑鼠與模擬觸控落在指定 x/y；25,000 深畫布拖曳及既有多倍率容差測試通過 | 通過，自動；R7 zoomed and panned |
| 10 | 工作區平移後拖曳 | 保留拾取點偏移 | 平移後兩種指標均得到指定世界座標 | 通過，自動；同上；捲動以既有自由平移工作區處理 |
| 11 | 撤銷新增與解除 | 恢復完整事件與連接 | 新增十步、整串解除及接回可復原 | 通過，自動；R7 rapid、r5/r6 undo |
| 12 | 重做 | 還原相同 ID 與順序 | 十步重做及接回重做相符 | 通過，自動 |
| 13 | 儲存、讀回 | 事件與巢狀配對保留 | fake-indexedDB 讀回事件與根、loopId 一致 | 通過，自動；尚非實際瀏覽器重新開站 |
| 14 | 事件、流程、程式、積木切換 | 不重設或重複事件 | 多次切換事件 JSON 相同 | 通過，自動；R7 edited blocks |
| 15 | KOI Script 匯入 | 完整參數與巢狀結構可保留 | 原生事件 JSON 自動辨識；碰撞 ID 改寫且配對正確；錯誤匯入保留草稿 | 通過，自動；R7 raw KOI import、serialization |
| 16 | 重排後試玩 | 使用最新有效事件 | 先重排，再切換模式、更新來源、儲存，啟動真正 Player 顯示新台詞 | 通過，JSDOM 整合；不是畫面截圖驗證 |
| 17 | 大量積木 | 不遺失事件，渲染數量有界 | 620 個積木的既有 DOM 界限測試通過；模型 10,000 個可複製、拆開、接回 | 部分通過；真實 FPS、長時間記憶體與 GPU 尚未量測 |
| 18 | 滑鼠、觸控、多點取消 | 不重複新增、不留下拖曳狀態 | 模擬指標、兩指平移、次指標與取消通過 | 部分通過；iPhone／Android 實機待驗證 |
| 19 | 舊資料與版本 | 合法舊資料可還原 | 無串 ID、無子位置的舊獨立重複結構能辨識並接回；版本維持 0.40.10 | 通過，涵蓋已測舊資料；未知損毀資料不自動猜測修復 |
| 20 | GUI 不變 | 不改既有布局與樣式 | 中英 10 種 DOM 相同；三份 CSS 完全一致；HTML 僅快取版本變更 | 部分通過；沒有真實瀏覽器的像素級截圖比對 |

新增驗收測試位於 `tests/block-audit-r7.test.mjs` 與 `tests/pro-revision.test.mjs`。測試用主題對話框由既有測試 driver 回答；不等於人工點擊或實機驗收。

## 五、效能量測

以下為本次 Node 單次模型操作量測，單位毫秒。不是平均值、效能保證或瀏覽器 FPS，數值會隨環境改變。完整資料見 `block-audit-r7-performance.json`。

| 積木數 | 排列 | 複製全部 | 拆開半串 | 吸附判斷 | 接回 |
| --- | ---: | ---: | ---: | ---: | ---: |
| 300 | 0.70 | 0.70 | 3.82 | 1.31 | 2.77 |
| 3,000 | 1.33 | 7.06 | 12.62 | 5.72 | 8.26 |
| 10,000 | 1.63 | 21.24 | 20.93 | 14.08 | 64.96 |

量測後每組事件數均與輸入相同；完整複製數量也相同。腳本：`node scripts/audit-block-performance.mjs`。

## 六、官方研究與採用原則

| 來源 | 實際查閱範圍 | 對本次工作的用途 |
| --- | --- | --- |
| [Scratch 2 原始專案](https://github.com/scratchfoundation/scratch-flash) | 官方 README、封存狀態與架構；Block.as 頁面擷取失敗 | 歷史參考；不宣稱已逐行驗證 Scratch 2 拖曳原始碼 |
| [scratch-blocks](https://github.com/scratchfoundation/scratch-blocks) | 官方 README 與現行 Blockly 關係 | 不把不同世代當成相同實作，也不導入替代 GUI |
| [scratch-vm](https://github.com/scratchfoundation/scratch-vm) | README 的 blockListener 與 AST 說明；核心檔頁面擷取失敗 | 參考工作區操作應更新正式執行資料的原則；KOI 保留其事件模型 |
| [scratch-gui blocks.jsx](https://github.com/scratchfoundation/scratch-gui/blob/develop/src/containers/blocks.jsx) | 實際原始碼 attachVM、workspace.addChangeListener、workspaceUpdate | 對照事件與執行模型同步，避免另外建立會失同步的積木資料 |
| [Blockly Block](https://docs.blockly.com/reference/classes/Block/) | unplug(healStack)、dispose、積木操作 API | 明確區分單塊抽出並補接來源，以及帶後綴移動 |
| [Blockly Connection](https://docs.blockly.com/reference/classes/Connection/) | connect、disconnect 與連接 API | 正式提交前驗證結構，不以幾何相近等同合法連接 |
| [Blockly Workspace](https://docs.blockly.com/reference/classes/Workspace/) 與 [Events](https://docs.blockly.com/guides/configure/events/) | 工作區事件、Undo／Redo API | 保留單一正式交易與可撤銷操作 |
| [Blockly Serialization](https://docs.blockly.com/guides/configure/serialization/) 與 [Mutators](https://docs.blockly.com/guides/create-custom-blocks/mutators/) | 工作區／積木保存、額外狀態、複製後的獨立資料 | 保留完整參數、巢狀配對與獨立 ID；未宣稱實作 Blockly Mutator UI |
| [Code.org](https://github.com/code-dot-org/code-dot-org) | 官方 repository 與 apps 架構說明；內部目錄頁部分擷取失敗 | 參考現行專案位置；不依賴已封存的舊 fork |
| [MIT App Inventor](https://github.com/mit-cml/appinventor-sources) | 官方 README 所述修改版 Blockly 依賴；內部事件檔擷取失敗 | 確認平台差異，不虛構各平台完全相同的操作或程序模型 |

採用的是「合法堆疊、配對、明確單塊／後綴範圍、資料交易與完整保存」原則，沒有宣稱四套引擎的功能與 KOI 完全一致。

## 七、修改檔案

| 檔案 | 修改內容 |
| --- | --- |
| `src/block-integrity.mjs` | 共用衍生結構、合法性檢查、巢狀選取閉包、舊資料辨識、匯入 ID 修正 |
| `src/stack-model.mjs` | 連接前檢查、同串連續選取、候選吸附排序與開始接點衝突規則 |
| `src/block-model.mjs` | 保留 API，重新排序改走同一轉移機制 |
| `src/card-clipboard.mjs` | 完整複製巢狀內容、獨立複本、宿主串接續與清理過期錨點 |
| `src/blocks-editor.jsx` | 最新選取位置、type 幾何依賴、次要指標防護與過期手勢取消；沒有修改 JSX 視覺內容與樣式 |
| `src/program-files.mjs` | 程式套用前驗證巢狀結構與跨章 ID 碰撞 |
| `src/script-import.mjs` | 自動辨識原生 `事件:` 指令 |
| `src/project-tools.jsx` | 匯入被拒時保留原草稿與錯誤狀態 |
| `src/workspace.jsx` | 暴露既有流程需要的共用模型操作 |
| `dist/app.js` | 共用正式操作回呼、最新新增位置、複製與匯入路徑、非法操作防護 |
| `dist/index.html` | 僅快取修訂更新，版本仍為 0.40.10 |
| `tests/block-audit-r7.test.mjs`、`tests/pro-revision.test.mjs` | 新增模型與整合驗證，既有測試保留 |
| `scripts/audit-gui-blocks.mjs`、`scripts/audit-block-performance.mjs` | 可重現的 DOM／樣式比對與模型量測 |
| `dist/workspace.js`、`dist/player.js`、`worker/index.js`、`dist/server/index.js` | 由來源重新建置 |

`src/game-skins.css`、`dist/style.css`、`dist/player.css` 未修改；沒有新增套件。

## 八、相容性與尚未驗證的限制

1. KOI 保留事件陣列模型，沒有移植 Scratch VM；不能直接載入 `.sb3`、App Inventor 工程或 Blockly XML，也沒有新增完整程序模型或 Mutator UI。
2. 運算積木仍以現有運算式欄位表示，不是完整的 Scratch 多層輸入插槽 AST。本次未擅自重做這套功能。
3. 完整事件參數可透過 `.koi` 的 `事件:JSON;` 形式往返；人類可讀指令仍以既有指令表為準。未知擴充欄位保留值，但不推測其內部自訂 ID 引用。
4. 程式草稿不自動被視覺編輯覆蓋，須明確更新或套用；這是保護草稿的既有行為。執行中的遊戲採啟動快照，編輯後重新啟動試玩取得最新事件。
5. 已損毀且有歧義的舊資料不會被自動刪除或猜測改寫；移動／貼上會阻擋非法結構，合法舊資料則可繼續使用。
6. 本環境沒有真實瀏覽器互動驗證能力，未啟動替代瀏覽器或安裝新瀏覽器。實機拖曳手感、多點命中、長串拖曳的實際畫面、FPS、長時間記憶體與像素級 GUI 一致性仍待驗證。

## 九、重現指令

```sh
node --test tests/*.test.mjs
node scripts/audit-gui-blocks.mjs 8bfcdefaab499b3f6a32c33063fbdfd520d33365
node scripts/audit-block-performance.mjs
node scripts/generate-script-guide.mjs
node scripts/generate-features.mjs
node scripts/generate-game-skins.mjs
node scripts/bundle.mjs
node scripts/build-worker.mjs
node scripts/validate-worker.mjs
```

建置產物通過 ESM 與 `default.fetch` 檢查。驗收紀錄與報告隨本次來源版本保存。
