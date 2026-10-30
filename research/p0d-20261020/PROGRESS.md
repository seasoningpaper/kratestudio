# KOI Maker 0.40.10 — P0-D 接續進度（2026-10-20）

## 狀態與範圍

**P0-D 核心修改已保存，整體驗收尚未完成。禁止將此檢查點視為正式發布版本。**
本輪從 Sites 第 48 版、`b3ec877569073b0a93270ef13151a6c58d8ddbe4` 接續，只修改 P0-D 及必要測試。
沒有重建網站、重做 P0-A／B／C、啟動 P1／P2、部署網站、安裝依賴或搜尋瀏覽器插件。
版本名稱保持 0.40.10，原 Site 與正式網址保持不變。

依使用者最新指示，P0-C 真實瀏覽器視覺驗收改列「待人工驗收，不阻擋後續程式開發」，但仍是正式發布前的必要驗收。
七種視覺比對案例、visual-acceptance.zip、上一輪 88 項測試與 10 組 GUI DOM 比較均保留；沒有將歷史紀錄算成本輪重跑結果。
沒有取得可靠即時額度，不推測剩餘百分比。本輪命令 timeout 為 15／20／30／40 秒；同類失敗最多兩次重試。

## 根因及核心修復

| 根因 | 修改後規則 | 證據／限制 |
|---|---|---|
| 事件／流程／積木共用 chapters.events，但 KOI 檔與 React 本機 files 只在載入時初始化 | chapters.events 持續為唯一已套用事件資料；乾淨的劇情來源隨修改更新，程式編輯器訂閱 programFiles 並跟隨目前章節 | 模型測試、DOM 同步及章節測試通過 |
| 程式檔草稿編輯未納入全域 history，程式編輯器另有自己的 Undo 堆疊 | 主程式接管 Undo／Redo；事件與檔案草稿一起快照，還原時同步 React | DOM 全域 Undo／Redo 與既有 r3 案例通過 |
| 草稿與其他模式可同時修改，舊草稿可能直接覆蓋新事件 | syncState 記錄草稿基底與變數 context；保留雙方內容，套用前重新檢查，衝突透過既有診斷欄拒絕覆蓋 | 模型、DOM 衝突測試通過；不自動合併任意衝突 |
| native KOI 每次 parse 產生新 ID，程式重排未重映跨章節數字目的地 | 唯一 allocator；優先保留明確 ID，原生指令按語義、行、位置匹配；按目的事件 ID 重映其他章節連接 | native 重複套用／前插、跨章節跳轉測試通過；大量相同且同時改寫的原生指令身份匹配仍屬啟發式，JSON 事件 ID 最明確 |
| 其他模式直接改欄位，blockInputs 保留舊內容；事件型別改變可能遺留插槽 | 以事件原始欄位為準調和 value metadata，保留值積木 ID 與 fallback；不再合法的值積木移回工作區保留 | 模型測試通過；完整真實操作仍待驗收 |
| 更名／刪除變數只改部分純文字與 e.variable | 同步數值運算式、附著／游離值積木與 fallback，保護引號內字面文字，刪除時實體化舊值 | 模型與既有 typed variables／CRUD 回歸通過 |
| 舊專案可能沒有 syncState；章節切換可能仍選錯劇情檔 | 缺少 metadata 時保留既有草稿；只在進入程式模式為缺少的章節建立唯一檔名；同步相同輸入不反覆產生新狀態 | 舊草稿模型、IndexedDB 還原、兩章切換通過 |

草稿仍使用既有「套用至專案」操作，避免每次輸入不完整程式就破壞已套用事件。syncState 是衝突檢查的文字基底，並非另一套事件 AST。
新值積木 ID 檢查會拒絕套用不合法／重複的 ID，不會替使用者靜默刪除內容。

## 修改檔案

- `src/program-sync.mjs`（新）：canonical 來源、章節來源選擇、草稿基底／衝突、套用與同步入口。
- `src/program-identities.mjs`（新）：原生指令 ID 保留、值積木 ID 檢查；索引佇列避免逐一搜尋造成平方增長。
- `src/value-binding-sync.mjs`（新）：欄位與值積木 metadata 調和、變數引用改寫。
- `src/program-files.mjs`：編譯時 ID 保留與驗證。
- `src/variables.mjs`：變數改名／刪除時保留跨模式引用一致。
- `src/code-editor.jsx`：訂閱共享檔案、章節選擇、使用全域 Undo／Redo 與套用重新驗證；JSX 版型不變。
- `src/workspace.jsx`：匯出共用同步入口。
- `dist/app.js`：修改／快照／儲存／載入整合；檔案變動納入共用歷史。
- `dist/workspace.js`：僅重建 workspace bundle，保留原 player bundle。
- `dist/server/index.js`、`worker/index.js`：從既有 dist 重建 Worker ESM。
- `tests/p0d-model.test.mjs`、`tests/p0d-dom.test.mjs`：新增模型／JSDOM 整合測試。
- `PROGRESS.md`、`research/p0d-20261020/*`：本報告、執行紀錄、GUI 與歷史資料雜湊。

## 實際執行與驗收

以下為去除重複計算後 **45 項通過；1 項整合案例最後執行失敗，測試修正後尚未重跑**。
語法、建置與 Worker 讀取檢查另外列出。所有 JSDOM 紀錄是模擬 DOM，並非真實瀏覽器截圖或視覺驗收。

| 執行 | 結果 | 原始紀錄 |
|---|---|---|
| `timeout 30s node --test --test-concurrency=1 tests/p0d-model.test.mjs tests/block-audit-r7.test.mjs tests/event-order.test.mjs` | 28 通過（12 新模型、14 積木結構回歸、2 目的地重映） | `model-regression.txt` |
| `timeout 30s node --test --test-concurrency=1 tests/p0d-dom.test.mjs`，第一次加測及兩次重試 | 最後 6 通過、1 失敗；詳見下段 | `expanded-dom.txt`、`expanded-dom-retry1.txt`、`expanded-dom-retry2.txt` |
| `timeout 40s node --test --test-concurrency=1 --test-name-pattern='r3 KOI code editor|R7 edited blocks survive|typed variables rename|variable CRUD' tests/pro-revision.test.mjs tests/design-data.test.mjs` | 選定 4 通過，其餘案例未跑 | `focused-regression.txt` |
| 初步同步／音訊／序列化／分支回歸（3 新 DOM、7 audio-code、2 event-order） | 12 通過，其中 5 已在上表重複，只額外計入 7 項 | `first-regression.txt` |
| `node --check` 九個修改後 .js／.mjs 檔，每個 timeout 15 秒 | 9 通過；JSX 由 esbuild 編譯驗證，專案無 TypeScript 檢查設定 | `syntax-checks.json` |
| `node scripts/bundle.mjs workspace` | 通過，只建置受影響 bundle；沒有執行會改寫其他 bundles 的全量 build | 產物 `dist/workspace.js`；上述 DOM 測試使用該實際產物 |
| `timeout 30s node scripts/build-worker.mjs`；`timeout 30s node scripts/validate-worker.mjs` | 17 個資產建置；ESM default.fetch 通過 | `build-worker.txt` |
| Worker.fetch 模組直接呼叫（timeout 20 秒） | 5 個資產逐位元一致，404／410／405／HEAD 共 9 項檢查通過；不是瀏覽器驗收 | `worker-fetch-smoke.txt` |
| CSS／HTML／player／積木外觀來源及既有 QA 與 b3ec877 比較 | 全部相同；visual ZIP 存在並記錄 SHA-256 | `gui-and-history-preservation.json` |

通過的六個新 DOM 案例：事件修改更新 KOI；全域 Undo／Redo 還原草稿；重排程式保留跨章節目的地；衝突拒絕套用且保留歷史；IndexedDB 儲存／重載；章節切換保留各自草稿。

### 尚未完成的第七個整合案例

案例名稱：`P0-D event properties, bound blocks, flow links, duplication and source share IDs and one global history`。
最後失敗原因已定位：測試用第二次 `window.eval('selected=0;render()')`，無法存取 app 初次 eval 的 lexical selected，實際編輯到第二個事件；診斷輸出顯示第一事件未變、第二事件正常更新，無 jsdomError。
測試已改用現有 `workspaceProps().onSelect(0)`，語法檢查通過，但依同類失敗最多兩次重試規則，本輪不再執行。
此案例後續的附著字串顯示、flow 連接、複製、Undo、程式 round-trip 聯合斷言未全部執行，**不可列為通過**。其中單項模型與既有 R7 跨模式 DOM 回歸已有通過紀錄，仍不取代本案例重跑。

### 開發期間失敗紀錄

- `baseline-reproduction.txt`：修改前 3 個同步問題重現失敗，後續同案例通過。
- `first-dom.txt`：同步初始化早於 settings 預設值，已將同步移至 ensureProject 結尾，`second-dom.txt` 3/3 通過。
- `core-sync.txt`：最初 11/12，原生跳轉的數字 target 被誤算為語義身份；匹配排除解析後目的索引後通過，見後續 model-regression。
- 擴充 DOM 衝突案例首輪因尚未等到 React effect 完成，診斷被初始化清除；測試等待 render settled 後通過。事件屬性必須派發既有 change 事件，並改用正式選取 callback。

上述診斷均保留，不以後續成功覆蓋失敗紀錄。沒有發生需恢復資料的實際專案遺失；沒有宣稱未測項目正常。

## 檢查點與還原

- 修改前穩定版本：第 48 版 `b3ec877569073b0a93270ef13151a6c58d8ddbe4`；tag `checkpoint-04010-before-p0d-20261020`。
- 重要核心修改中途提交：`2b1e5ba`；tag `checkpoint-04010-p0d-core-20261020`，保留以供比較，不代表完成全部驗收。
- 本輪最新開發檢查點：tag `checkpoint-04010-p0d-saved-20261020`；完整 SHA 見 git／另附交付索引。
- 完整原始碼 ZIP 由該提交 `git archive` 產生，包含 src、dist、Worker、測試、過往 QA 與本進度，不包含 node_modules 或 git 歷史；檢查點已推送至原 Site 原始碼庫。
- 原 Site 僅保存新版本，**未呼叫 deploy，正式網站未改動**。新版本不是發布驗收完成的穩定 release；b3ec877 是明確可退回的先前穩定基準。

## 下一輪接續

1. 先只重跑修正後的第七個 DOM 案例：`timeout 30s node --test --test-name-pattern='P0-D event properties' tests/p0d-dom.test.mjs`，不需要重跑未受修改的 45 個通過案例。若再次失敗，先讀完整診斷，不得盲目循環。
2. P0-D 尚需真實操作驗收／原專案備份匯入匯出驗收；本輪已有 IndexedDB 與舊草稿 fixtures，不代表所有舊版大型專案已驗證。P0-C 的 7 案例仍待人工驗收。
3. P0-D 完成後，才另開 P1-A。建議先備份，診斷既有「專案工具 → 遊戲畫面」的背景設定、素材 ID、預設／章節背景與 player 圖層，僅修背景選擇、儲存與預覽；沿用現有 UI，不同時展開 P1-B／P1-C。
4. P1-B、P1-C、P2 未開始。發布前必須完成 P0-C 真實視覺與 P0-D／P1 必要驗收，確定無阻斷 bug、資料遺失與不相容，再使用原 Site 網址發布。
