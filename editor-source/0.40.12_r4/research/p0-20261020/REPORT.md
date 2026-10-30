# KOI Maker 0.40.10 本次工程報告

本次僅執行原始專案診斷、積木技術研究與 P0-A、P0-B、P0-C。沒有進入 P0-D、P1 或 P2，也沒有重建網站。版本維持 0.40.10。

**交付狀態：程式修改與相關自動測試已保存；P0-C 的真實瀏覽器視覺驗收仍未完成，不能宣稱本次全部需求完整驗收。修正版保存為同一個 Site 的可還原來源與未部署版本，正式網站保持原部署。**

## 檢查點

| 階段 | 檢查點 |
|---|---|
| 修改前原始碼 | `0cb21b6723ac6962b97200657169061bc26df1d0`；標記 `checkpoint-04010-p0-baseline-20261020` |
| P0-A | `ed4f39d`；標記 `checkpoint-04010-p0-a-20261020` |
| P0-B | `5b47068`；標記 `checkpoint-04010-p0-b-20261020` |
| P0-C | 交付來源內的 `checkpoint-04010-p0-c-20261020`；最終提交另見交付中繼資料 |

還原應在獨立 checkout／分支檢出對應提交，再經 Site 保存與部署流程；不要直接清除使用者本機專案資料。

## 第一階段：實際專案結構

| 系統 | 實際來源與機制 |
|---|---|
| 積木入口 | `src/workspace.jsx` 整合 React 根與 `window.KoiWorkspace`；`dist/app.js` 是既有手寫主程式，不能當成可刪除的純建置產物。 |
| 渲染 | `src/blocks-editor.jsx` 以 HTML article／input／select 絕對定位；外形由 `dist/style.css` 的 clip-path 與既有顏色定義，小地圖使用 SVG。不是 Canvas 積木，也未安裝 Blockly。 |
| 資料模型 | `chapter.events` 為單一事件來源；主串由陣列順序推導，獨立串由 blockDetached、blockStack、blockPos 推導。`src/block-integrity.mjs` 檢查 ID／迴圈。沒有另外一組可變動的 parent／next 圖。 |
| 拖曳 | Pointer Events、pointer capture、拖曳快照與取消；`gripDown/Move/End` 移動語句串，`paletteDown/Move/End` 建立模板實體及值積木。 |
| 座標／連接 | `src/stack-model.mjs` 供應 stackSpan／stackLayout／stackSnap／transferStack。世界座標與縮放共同驅動繪圖、吸附及重排；移動時保留跳轉目的地身分。 |
| 工具箱 | `src/block-model.mjs` 的 blockCategories 配合 React 產生按鈕；模板不直接成為工作區實體。 |
| 文字欄位 | 原本只將 value／count 標為表達式目標，角色／台詞沒有文字插槽；本次增加宣告型插槽與字串值積木。 |
| 遊戲預覽 | `src/player.jsx`／`src/engine.mjs` 為完整播放器；主程式另有編輯器場景預覽。本次保留原 `dist/player.js` 完全相同的位元組。 |
| 背景 | `src/project-tools.jsx`、`src/game-designer.jsx`、`src/stage-layers.jsx` 與播放器分別處理工具、版面及圖層；本次只閱讀，沒有修改背景功能。 |
| 事件／程式同步 | 事件、積木與流程共享 events；`src/program-files.mjs` serializeEvents／compileProgram 供應 KOI 事件資料轉換。`src/code-editor.jsx` 保留檔案草稿與明確「套用」流程，不是每次輸入自動覆寫事件。 |
| 儲存／匯出 | `src/storage.mjs` 使用 IndexedDB／素材參照；`src/packaging.mjs` 封裝遊戲；主程式有專案備份與匯入。本次未重構。 |
| Undo／Redo | 主程式 JSON 專案快照，最多 60 筆；程式草稿另有檔案本地歷史。新值積木移動使用一次既有 snapshot，沒有重寫歷史架構。 |

## 可重現問題、根因及本次處理

| 問題 | 實際證據／根因 | 修改與影響範圍 |
|---|---|---|
| 複製 ID 不防衝突 | 測試替換 UUID 來源為重複回傳值，原 pasteCards 直接使用該值，兩次貼上後無法保持 6 個不同身分。 | 以同一操作的 allocator 預留專案、章節、事件、獨立與內嵌值積木 ID；最多 8 次隨機嘗試後採有限集合中的序號候選，避免無限重試。 |
| 匯入意外改寫原本不衝突的 ID | 衝突事件先產生的 UUID 可能占走後面匯入事件本來的 ID；新測試在修改前失敗。 | 先預留整批來源 ID，再建立替代 ID；章節與值積木 ID 一併處理。 |
| 子串拖曳遇區段提前停止 | stackSpan 明確在下一個 section 截斷；原測試也固定了這個舊行為。 | 改為遵守本次規格，連同下方同層積木一起移動；同步更新該舊斷言，其餘動畫／跳轉斷言保留。迴圈仍以容器邊界限制。 |
| 文字欄位不能接字串 | 原欄位只接 value／count 的表達式，沒有字串模板及欄位型別。 | 新增字串／數字／布林值／變數模板，與 String／Number／Any 槽規則；不把素材 dropdown 改為自由文字欄位。 |
| 值移動缺少單一交易 | 原運算值 drop 先修改欄位，再移除工作區 reporter，會呼叫兩個快照 callback。 | `valueDropPlan`／`applyValuePlan` 一次處理來源、目標及 displaced value；Undo 一次回復完整移動。 |
| 文字資料與值積木不能完整保留 | 原本僅把運算式寫成字串，不保留值積木身分與覆蓋前內容。 | blockInputs 保存 id／kind／output／fallback；值仍物化到原 e.text／e.name／e.value 等欄位，保持舊引擎可讀。 |
| 固定估算高度可能裁切內容 | 原 stackLayout 僅按事件類型估高，article 固定高度且 overflow:hidden；新增欄位後沒有內容量測回饋。此為程式碼可確認缺口，未取得真實渲染的修改前截圖。 | 以欄位 intrinsic height、ResizeObserver、字型 ready、視窗變更補上量測，向下重排並供吸附／排列共用；原高度作既有最小外觀基準。多行台詞使用同風格 textarea。 |

字串開頭為 `=` 的情況，使用既有運算式語法可讀的引號／反斜線編碼，保留實際換行。沒有改動 `src/expressions.mjs` 或播放器解析器。

## 每個工作包與測試

| 工作包／批次 | 結果 | 限制 |
|---|---|---|
| 修改前全套基準 | 226 項：215 通過、10 失敗、1 取消，約 88 秒 | 原有並行執行包含 DOM／播放器等時間敏感案例；不能將這些失敗視為本次已修復。 |
| P0-A 初步模型回歸 | 29／29 通過 | ID 邊界、複製、匯入與既有連接。 |
| P0-A 剪貼簿 DOM | 5／5 通過 | 模擬 DOM，非真實裝置。 |
| P0-B 模型與受影響回歸 | 42／42 通過 | 子串、單獨抽出、巢狀迴圈、重連、目的地身分。 |
| 最終資料／引擎批次 | **60／60 通過** | `p0-regression-unit.txt`；含以上重複案例，不能重複加總。 |
| 最終既有積木互動 | **26／26 通過** | `p0-block-dom-final.txt`；含縮放／平移、mouse／touch 合成事件、取消、Alt 抽離、10 次快速新增、跨模式與舊匯入。 |
| 最終新增 DOM 整合 | **2／2 通過** | `p0-c-dom-final.txt`；實際 React callback／合成 Pointer drop、模板不變、一次 Undo／Redo、多行、IndexedDB 重載、25 次快速新增。 |
| GUI 結構比較 | **10 組通過** | 五種既有場景 × 繁中／英文；忽略新增的插槽 data 屬性後比較 DOM。現有 CSS 規則位元組不變，僅追加 508 bytes 的新欄位樣式。**這不是截圖比較。** |
| 較廣 DOM 回歸 | 24 項通過後達 60 秒 timeout | 記錄取消，縮小為積木相關批次，沒有無限重跑。 |
| 相容性批次 | 21 通過、影片速度 1 項失敗 | 儲存／剪貼簿等通過；該播放器案例不列為通過。 |

最終相關測試合計 **88 項通過**（60＋26＋2），不包含較廣測試中的失敗與取消，也不代表全系統所有測試通過。

曾嘗試重新編譯播放器時，影片速度測試出現 expected 1.5／actual 1；使用原播放器的對照案例通過。沒有修改影片系統來掩蓋問題，而是撤回共用解析器改動、僅建置 workspace，恢復原 player.js。最終原播放器 SHA-256 為 `0dff98a50a919618473b7f6e4bdfce5ac27fafd27087645308430bd002dba136`，與基準完全相同。這是回復穩定產物，不是宣稱修好影片問題。

## 逐項驗收

| 驗收項目 | 本次實際結果 |
|---|---|
| 新增單一積木 | 通過：工具箱、空白處、插入串中、快速新增測試。 |
| 拖曳整串／子串 | 通過：主串、區段及分離串相關測試。 |
| 單獨解除 | 通過：Alt 與右鍵選單；原上下方補接。 |
| 重新連接／插入 | 通過：上方、中間、下方、起始 dock；非法自連拒絕。 |
| 新增字串積木 | 通過：運算分類模板與工作區實體。 |
| 字串進入合法欄位 | 通過：角色名稱／文字與 Any 值；count 拒絕字串。 |
| 長文字／多行排版 | 資料保留、textarea、量測公式與重排測試通過；真實字型與截圖尚未驗證。 |
| 拖曳連接位置／縮放 | 模型及 DOM 合成事件通過；實機尚未驗證。 |
| 巢狀資料不遺失 | repeat／repeatEnd 測試通過；條件與選項仍是既有目的地模型，未改造成新的 C 型容器。 |
| Undo／Redo | 新值移動一次 Undo／Redo 通過；全系統交易一致性留 P0-D。 |
| 儲存／重新載入 | 字串附加結構、長多行文字與現有儲存測試通過。 |
| KOI Script | 事件資料 JSON 輸出／編譯往返通過；不宣稱所有手寫腳本改寫都保留值積木身分。 |
| 切換編輯模式 | 既有事件跨事件／流程／程式模式測試通過；新值積木遇變數重新命名及任意草稿修改尚待 P0-D。 |
| 背景自由選擇 | 未執行，P1-A 待辦。 |
| 遊戲預覽 | 保留原播放器；本次沒有完成全預覽系統回歸。 |
| 手機／電腦 | 合成 mouse／touch 事件通過；真實手機、Safari 與桌面跨瀏覽器尚未驗證。 |
| 舊專案 | 既有 legacy loop、匯入與剪貼簿 fixture 通過；未蒐集所有歷史使用者專案。 |
| 原有功能全部正常 | 尚未達成此全系統驗收；基準本身有失敗，P1-C 才處理全面回歸。 |
| GUI 未重新設計 | 原 HTML 除快取識別外不變，原 CSS 規則不變，10 組 DOM 比較通過；新值／多行控制項為必要新增。尚缺修改前後真實截圖。 |

## 仍存在的限制

- 本環境未提供 Sites 要求的 control-browser 能力。依 Sites 工作流程，沒有私自安裝瀏覽器或啟動替代預覽；沒有真實截圖／觸控／字型渲染證據。
- 圖形化任意巢狀 value expression 尚未建立；運算式沿用原語法。本次只新增一層具有身分的合法欄位值積木。
- 新值中介資料在其他模式任意改寫、變數更名／刪除之後的完整重綁與恢復，需 P0-D 處理；沒有暗中執行該工作包。
- 素材 dropdown、語音資產選單與布林 checkbox 保持原控制項，未通用化為可接值的欄位。
- 初始全套測試與中途擴大測試的失敗／timeout 均保留原始日誌，沒有以調整斷言刪除功能或宣稱全部通過。

## 修改來源清單

- `src/block-identities.mjs`（新增）：統一身分預留與有限重試。
- `src/block-integrity.mjs`：匯入身分預留與值積木 ID。
- `src/card-clipboard.mjs`：貼上實體與內嵌值身分重新配置。
- `src/stack-model.mjs`：區段子串規則；量測高度與排列共用。
- `src/value-sockets.mjs`（新增）：型別檢查、連接／解除計畫、原值保存與舊引擎輸出。
- `src/block-measure.mjs`（新增）：固有尺寸量測及更新去重。
- `src/blocks-editor.jsx`：字串與值模板、合法槽、值移動、取消、動態尺寸、必要多行欄位。
- `src/workspace.jsx`：供應主程式需要的模型函式。
- `dist/app.js`：保留既有主程式，接入一次快照的值操作與唯一身分新增。
- `dist/workspace.js`：由既有來源重新建置。
- `dist/style.css`：只追加新值／多行欄位規則，現有規則保留。
- `dist/index.html`：只更新資源快取鍵至 04010-p0r8，顯示版本仍 0.40.10。
- `scripts/bundle.mjs`：可指定只建置 workspace，預設雙入口行為不變。
- `scripts/audit-p0-gui.mjs`（新增）：基準 DOM／樣式比較。
- `tests/p0-a-identities.test.mjs`、`tests/p0-b-components.test.mjs`、`tests/p0-c-values.test.mjs`、`tests/p0-c-dom.test.mjs`（新增）。
- `tests/expanded-interactions.test.mjs`：只調整「遇 section 截斷」舊斷言以符合本次子串規格。
- 本資料夾內的研究、診斷、待辦、測試日誌與 GUI 證據。
- `worker/index.js`、`dist/server/index.js`：依原 Worker 封裝流程產生新 workspace 的部署產物；伺服器行為未擴充。

`src/player.jsx`、`src/engine.mjs`、`src/expressions.mjs`、`dist/player.js`、`dist/player.css`、遊戲背景工具、套件版本與依賴均維持修改前內容。沒有安裝新依賴。

下一次先補 P0-C 的真實瀏覽器／裝置驗收，再經使用者確認進入 **P0-D：資料同步、序列化與 Undo／Redo 完整檢查**。其餘工作包見 BACKLOG.md。本次停止於此。
