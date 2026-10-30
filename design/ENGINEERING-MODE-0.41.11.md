# KOI Maker 0.41.11 工程模式技術設計與實作計畫

狀態：**設計提案，未實作**。本輪只有 P1-B 音效修復與指定文字修改；沒有工程模式按鈕、空白展示頁或大型新模組。正式站仍為 0.40.10_r49。
設計依據：本專案實際原始碼，P1-A 起點 250bb44、P1-B 修復 e26c18a；不是依截圖推測或外部產品名稱猜測。

## 1. 目標與不可變條件

入口位於現有「模板編輯」，預定沿用其工作分頁與操作控制樣式，加入「工程模式」。進入後使用當前章節／事件、目前裝置版面，顯示**真正的遊戲 Player 畫面**。

- 繼續使用 src/player.jsx、src/stage-layers.jsx、src/system-surface.jsx、Engine 與既有 gameUI／screenLayout；編輯選取框是疊加層，不重寫角色、文字、背景或按鈕的外觀。
- 不以 GameDesigner 的示意文字／假選項畫布當作工程模式。既有 GameDesigner 可保留，不能冒稱與真實遊戲相同。
- 正式專案仍是 chapters.events、settings.gameUI、settings.menuTemplates、characters 等現有分支；不另存一份 engineeringScene AST，也不把流程圖 e.pos 拿來當遊戲畫面座標。
- Debug 變數／標籤／事件步進及測試存檔只存在會話記憶體，不寫回正式初始值、劇情歷史或真實玩家存檔。
- 只有「儲存並離開」能套用經驗證的作者設定；「不儲存並離開」丟棄全部會話 patch。
- GUI 的配色、字型、按鈕、間距與布局沿用現狀，不重新設計其他頁面。工程模式未完成前不新增不能操作的入口。

## 2. 實際架構與必要改接點

| 原始碼 | 現況 | 工程模式必要工作 |
|---|---|---|
| dist/app.js openTools／snapshot／dirty／save | 主專案、editRevision、60 筆全域 Undo；save 內部 catch，不回報結構化成功結果 | 由模板入口取得 projectId、chapterId、eventId 與基準 revision；提供窄版 editor commit bridge，回傳明確儲存結果 |
| src/player.jsx Player／KoiPlayer.mount | Engine 存在 useRef；mount 會卸載舊 root；一般 project props 更新不會重新建立 en.p | 工程會話只 mount 一次，透過受限 adapter 更新 Engine 的作者設定與 layout revision，不能拖一像素就重新 mount 或 reset |
| src/player.jsx load／put／readPrefs | 直接讀寫 localStorage；會自動更新 resume、auto slots、meta、prefs、page-count | 全部經可注入 persistence port；正常遊戲預設維持原行為，工程會話使用記憶體實作，不能只禁用一條自動存檔 effect |
| src/engine.mjs | normalize 深拷貝專案；state.vars 與 p.variables 分開；history 與 settle 上限已存在 | 每個會話獨立 Engine；Debug 改 state.vars，不改 p.variables；沿用循環／歷史上限 |
| src/stage-layers.jsx | 真實背景、角色、鏡頭、CG 顯示；角色由事件及 actorStyle 決定 | 在真實節點上提供穩定 target 標記與量測，不替換成另一套角色 preview |
| src/game-ui.mjs、src/screen-layout.mjs | 電腦／手機模板、百分比 UI 幾何、透明度／圖層等已有資料 | 經 withGameUI／withScreenLayout 寫回，保留既有繼承與 screenSync 規則 |
| src/canvas-scale.mjs | referenceCanvas 電腦 960、手機 390 寬，整面縮放 | overlay 使用相同 reference 與 scale；不能按 CSS 螢幕像素直接寫模板百分比 |
| src/placement.mjs | 角色 anchor、offsetX/Y、scale、flip、opacity 等；手機另有 mobilePlacement | 經同一 placement／actorForDevice 轉換；尊重目前角色來源事件與手機 override |
| src/program-sync.mjs | 已套用事件為真實來源，KOI 草稿有衝突保護 | 工程儲存後只呼叫現有同步；不得覆寫未套用的 KOI 草稿 |
| src/storage.mjs | IndexedDB 專案／素材、佇列與失敗保留 | 只在作者設定提交時使用；會話不存新素材副本、不清理正式素材、不另開同 ID 假專案 |

播放器的畫面更新 tick 目前同時影響 signature、文字／聲音與自動儲存。新增獨立的 **layoutRevision** 作畫面重算，不能用劇情 notify() 更新拖曳預覽，否則可能重播語音、重啟打字機或觸發劇情保存。

## 3. 會話資料與唯一作者資料來源

以下是提案的執行期結構，**不序列化到正式專案**：

```ts
type EngineeringSession = {
  id: string;
  projectId: string;
  baseRevision: number;
  chapterId: string;
  eventId: string;
  device: 'desktop' | 'mobile';
  patches: AuthorPatch[];
  undo: AuthorTransaction[];
  redo: AuthorTransaction[];
  selection: TargetRef[];
  runtime: Engine;                 // 私有實例：變數、步進、分支
  storage: MemoryPlayerStorage;    // 私有：prefs/meta/slots/resume
  layoutRevision: number;
};

type TargetRef =
  | {kind: 'ui'; device: string; key: string}
  | {kind: 'screen'; device: string; page: string; key: string}
  | {kind: 'actor'; device: string; chapterId: string; eventId: string}
  | {kind: 'background' | 'cg'; chapterId: string; eventId: string};
```

AuthorPatch 是白名單 target＋欄位＋原值／新值，不接受任意 JSON 路徑或任意 JavaScript。作者 draft 是「基準專案＋patch」的暫時候選版本，不是第二份持久化模型。
素材使用原有 asset ID 與既有唯讀資料 URL／Blob 參照，會話不得 revoke 正式專案所擁有的 URL。
事件以 chapterId／eventId 尋址，絕不把當時的陣列 index 當長期 ID。章節／事件在外部被刪除時應報衝突，不自動編造替代對象。

### 元件寫回映射與首版界線

| 可選元件 | 作者欄位與保存位置 | 首版行為／限制 |
|---|---|---|
| 對話框、姓名框、選項群、工具列與現有按鈕 | settings.gameUI.elements；手機走既有 gameUI.mobile | 拖曳、大小、對齊、透明度；圖層檢查顯示實際語義層與 zIndex，不能宣稱可越過系統遮罩 |
| 存讀檔／設定畫面元件與圖片 | settings.menuTemplates[page] 的 elements／extras 與 mobile profile | 同一 SystemSurface，沿用 screenSync；共用變更範圍在提交前顯示 |
| 角色立繪 | 來源 character 事件的 offsetX/Y、scale、opacity 等；手機走 mobilePlacement | 預設編輯「本事件」。角色目前位置若被 animation 事件改寫，須選擇最後實際貢獻欄位的來源事件，不盲目回寫最早的登場事件 |
| 角色模板預設 | 既有 characters[].placement／素材 placement（明確的後續套用動作） | 與本事件分開。更新模板不會假稱已覆蓋所有具有明確事件值的角色；套用到既有事件須預覽影響清單並形成一筆交易 |
| 背景 | background 事件 scene／imageFit／bgX／bgY／bgScale；首頁使用現有 titleBackground 等欄位 | 沿用 P1-A。無尺寸素材暫不提供猜測性的縮放 |
| CG／事件圖片 | 現在是全舞台 CG，沒有獨立 x/y/w/h 模型 | E3 才規劃可選 cgPlacement（使用同一 placement 型態），由真實 StageLayers 支援；缺少欄位仍是舊版全畫面。未完成前相關獨立幾何控制不可假裝可用 |
| 外部動態模型 iframe、影片、互動模組 | 現有來源事件與 renderer | 首版只檢查可取得的外層 bounds／既有定位資料，不操控跨來源 iframe 內部內容；不新增假定位資料 |

「儲存到模板設定」涵蓋 UI 及功能畫面的既有模板分支；角色／背景／CG 的本事件修改仍寫回原事件，統一在儲存並離開時提交。**不把同一角色位置再複製進一套 settings.engineeringTemplates，避免兩套互相覆蓋的真實來源。**

## 4. 真實渲染器與操作生命週期

1. 模板編輯入口建立會話、記住主編輯器分頁／選取／目前 revision，建立基準候選專案及私有 Engine。
2. 透過現有 KoiPlayer.mount 的可選 engineering adapter 啟動相同 Player；正常遊戲未傳 adapter 時維持原路徑、DOM 與保存行為。
3. Player／StageLayers／SystemSurface 在工程模式提供 target 標記，overlay 從真正節點量測。選取框不作圖片／字體／角色的另一套渲染。
4. 編輯狀態下先攔截點選／拖曳，防止事件穿透到「繼續劇情」、選項或遊戲按鈕。另設明確「測試互動／步進」操作才把輸入交回遊戲。
5. pointerdown 記住 target 原值、reference、相機矩陣與 pointer ID；setPointerCapture。pointermove 僅更新同一暫時 patch，最多每 animation frame 一次。
6. pointerup 驗證並合併成一筆會話 Undo；pointercancel、lost capture、Escape、失焦、切裝置或來源 target 變更則回復手勢前 patch。其他 pointer 不得接管同一手勢。
7. 作者設定 patch 經穩定 ID 更新私有 Engine.p 的對應分支並增加 layoutRevision，保留 runtime.state、聲音實例與劇情 signature；不用 normalize／reset 重放全部劇情。
8. 解除會話時清掉 overlay、捕獲、監聽、計時器、私有音訊與模型訊息，不清掉或停止其他編輯器所擁有的資源。

### 座標與尺寸

- UI：由 game-reference 的實際矩形換算 referenceCanvas 座標，再轉 x/y/w/h 百分比；使用相同 rect() 限制與既有對齊工具。
- 角色：先排除 viewport 縮放，再反算 game-camera 的平移／縮放及 anchor，計算 offsetX/Y 或 scale；不可把鏡頭移動造成的位置直接當成作者角色位移。
- 拖曳定位時凍結會妨礙選取量測的動畫時鐘，保留所處時間；測試互動時恢復。Inspector 同時顯示作者值、裝置 override、套用後 bounds 與相機後座標。
- 窗口縮放／裝置切換後重新量測，不能沿用舊 bounding rect。缺少可逆矩陣或無有效尺寸的元件只允許讀取，不能寫 NaN 或硬猜座標。
- 對齊採相同座標空間；UI／相機內角色跨空間的選取先要求明確基準，不直接混算。

### 工程偏好與正式偏好

工程會話的 prefs 為記憶體中的作者設定預設，不讀取或覆寫玩家真實偏好。套用 UI 幾何後同步重算其衍生 prefs（如 boxWidth），避免 Player 現有偏好值蓋掉剛拖曳的寬度。
同一 renderer、相同專案設定、相同裝置及相同偏好下，工程與一般預覽必須得到相同畫面。不能靠改 CSS 補出不同的「工程預覽版」。

## 5. Debug、Undo 與隔離

- Debug 顯示目前章節／event ID／指令、標籤及其實際目標、state.vars、條件結果、loopFrames 與目的地解析。不存在的目的地與既有循環上限應原樣報錯，不無限執行。
- 暫時變數輸入只改 runtime.state.vars，明確標示「測試值」。不會改專案初始 variables 或 KOI 草稿；若未來要更新初始值，需另列明確作者操作，不暗中合併。
- 作者 Undo／Redo 為會話交易，沿用 60 筆上限，一次拖曳一筆；劇情回退使用 Engine.history（現有 150 筆），兩者名稱／作用須可辨識。Debug 的劇情回退不等於版面 Undo。
- 會話 memory persistence port 覆蓋 prefs、appearance、resume、auto／quick／manual slots、meta／CG／結局／已讀／BGM 解鎖及頁數讀寫。不得只加一個「不自動存檔」旗標，也不得把真實 project ID 改成假 ID 來迴避問題。
- 不 monkeypatch 全域 localStorage／KoiStorage，避免影響其他分頁或專案；未提供 memory port 的 engineering mount 應拒絕啟動，而非偷偷改用正式儲存。
- 目前所有 Player 持久化集中於 player.jsx load／put；後續新模組必須使用同一 port。外部模型 sandbox 仍沿用原限制，會話資料不主動傳送給外部模型。

## 6. 儲存並離開／不儲存並離開

### 儲存並離開

1. 結束／取消正在進行的 pointer 手勢，凍結作者命令，取得主編輯器提交閘門。
2. 比對 project ID、editRevision 與各 target 原值；沒有刪除、型別變更或同欄位衝突才建立 latest project＋白名單 patch 候選。不能把整個 runtime.p 或 runtime.state 複製回主專案。
3. 只驗證本次作者欄位與引用；保留未知的舊欄位、事件 ID／順序、變數初始值、KOI 未套用草稿與素材 ID。
4. 經現有 synchronizeWorkspace 整理對應事件／來源；草稿衝突遵守 P0-D 保留規則。
5. 由 host 以一次原子作者提交處理候選；保存成功才關閉會話。主編輯器形成一筆全域 Undo，可還原整次工程儲存；失敗保留會話及候選供重試，不顯示成功。

**E0 必須先決定並驗證提交原子性**：現有 save() 會 catch 且沒有成功回傳，不能直接拿它作離開判據。擬採窄版 commit bridge，提交期間暫停本專案作者寫入／autoSave 排程，沿用儲存佇列；失敗保持主專案與會話原狀。多瀏覽器分頁仍可能競爭，須在既有 IndexedDB 記錄加入可選 revision／條件式比較後寫入（舊資料缺少時視為 0），避免 last-writer 靜默覆寫。未通過衝突／Quota／abort／重複點擊測試前，不開放儲存入口。這是下一輪小包的必要設計驗證，**本輪沒有修改儲存格式或實作該橋接**。

### 不儲存並離開

丟棄 patch、會話 Undo 與私有測試狀態，釋放會話資源，回到原模板分頁與選取。主專案、IndexedDB 與真實玩家 localStorage 前後內容必須相同。
關閉分頁／重整走離開保護，不使用 beforeunload 強行自動寫入。任何「草稿恢復」若未另外設計並驗證，不預設持久化整個會話。

## 7. 分階段實作工作包

本輪不執行以下工作；每包先檢查點、有限測試、失敗最多兩次修復，完成後再進下一包。不要直接同時開發全部。

| 工作包 | 最小交付 | 必要驗收／停止條件 |
|---|---|---|
| E0：隔離與提交契約 | Player persistence port、記憶體版、穩定 runtime／layout 更新分離、typed save result／提交衝突設計落地 | 工程進入／步進／鑑賞／存讀檔／退出後正式 storage 雜湊相同；Quota／abort／雙分頁衝突不寫壞；有資料遺失即停止還原 |
| E1：模板 UI 工程模式 | 模板入口、真正 Player 疊加層、對話／姓名／選項／工具列選取、拖曳／尺寸、會話 Undo、儲存／丟棄 | 電腦／手機及多種視窗座標；一次手勢一筆 Undo；不穿透選項；儲存重開與一般 Player 一致；不重播音樂／語音 |
| E2：角色與既有背景 | 來源事件解析、相機反算、手機 placement、透明度／圖層檢查、同空間對齊；P1-A 背景設定重用 | 左／中／右 anchor、縮放／鏡像／動畫、嵌套相機；同名角色與 animation 覆寫解析；事件重排仍使用 ID |
| E3：CG 與 Debug 補齊 | 同一 StageLayers 的可選 cgPlacement、事件／標籤／條件／暫時變數、明確步進 | 舊 CG 無新欄位畫面不變；新幾何 KOI／專案 round-trip；Debug 不改初始變數；循環可中止；不寫真實解鎖紀錄 |
| E4：整合與發布驗收 | 真實 renderer 對照、舊專案匯入、保存重載、全部取消／錯誤清理、人工視覺與觸控 | 同 source／device／prefs 的畫面比較；無存檔污染／阻斷問題；保留正式還原版本後才另行發布 0.41.11 |

建議下一次只開始 **E0**；若目前優先完成 P1-B 其餘腳本／素材問題，工程模式繼續停留規格，不與 P1-C／P2 並行展開。

## 8. 尚待實作時確認的細節

- 角色模板預設套用到既有事件的範圍；預設不批次覆蓋作者原本的 per-event 演出。
- animation 鏈條下各欄位最後來源解析與鏡頭逆矩陣，必須先建立測試，不能只靠 DOM top/left 回寫。
- CG 獨立幾何是既有事件欄位的可選擴充，需要真實 renderer 舊版對照，不視為目前已存在功能。
- 工程模式不提供任意 JS console、任意 iframe DOM 操作、任意圖層跨越系統遮罩或無限自動劇情執行。
- 首版元件選取與操作標記必須僅在工程模式存在，正常遊戲不增加可見框線、操作列或新間距。

本設計不宣稱上述功能已可操作；所有新增介面、資料契約與原子提交都需要依工作包實作並測試。
