# C2 事件清單改善與資料安全

本包從0878d13開始。維持0.40.11_r2標示與正式Sites54；沒有部署。

## 修改與根因

- `dist/app.js` 原select及onSelectMany同時改selected（游標）與selectedCards（批次集合）。新增事件清單專用callback：checkbox／全選只變ID集合，事件本體與屬性游標不變；普通點擊只編輯，Ctrl／Command與Shift處理批次。Flow／Blocks原callback保持既有語意。
- `src/event-list.jsx` 加小型核取、區段核取、已選數、複製／確認刪除／指定位置搬移、安全對話批次欄位、定位事件、上下／Home／End鍵。沿用copyCards/pasteCards/deleteCards/moveCards，不新增第二份事件來源。批次patch只開放對話text/name/speed，不能覆寫label／target／asset／type。
- 原生獨立可見捲動條本來就存在（style.css原規則），沿用並保留每專案章節scrollTop，最多50個暫時記錄；checkbox rerender不捲動到游標；新游標定位可展開收合區段。可選柔和／標準／清晰1px線與緊湊間距，預設保留標準間距。偏好存現有editorSettings.eventList，沒有schema或storage key變更。
- 刪除確認原先跨await使用全域chapter，可能在提示開啟後操作到新章節。現在鎖定確認前project/chapter，切換即取消，不刪除不同上下文資料。
- `dist/style.css` 只附加event-items作用域樣式，既有規則／顏色／字型／其他頁面不改。使用Set查核選取，避免列表內反覆includes的平方比較；未引入新的虛擬清單引擎。

## 測試（實際執行）

- 新增13個C2案例全部通過：編輯／選取隔離、Shift/Ctrl/Command、區段、深層複製及新ID、搬移與跨章目的、確認刪除與Undo、提示期間切章取消、安全欄位、偏好IndexedDB還原與Undo、捲動／鍵盤、500／1000、未套用草稿衝突保護。
- r2 Flow DOM3個通過，P0D DOM7個與角色DOM5個通過；C2共28個不重複案例。舊事件測試改以checkbox與batch-selected檢查新規格，其群組拖曳／Undo及Flow世界座標斷言保留。
- C2-retest.tap：15/15（12新＋3Flow）；C2-draft.tap：1/1；C2-regression.tap：12/12。
- C2-build.log：完整npm build；C2-assets.log：22個Worker資產與根頁200一致。命令逾時60–90秒，未安裝依賴。
- 容量時間見C2-capacity-500.json／1000.json；Node/JSDOM含固定85ms settling，不能視為真人瀏覽器繪製／觸控效能。

## 失敗及修正記錄

1. 初次bundle失敗：新JSX Enter定位handler缺一個右大括號；補正後bundle成功，沒有改模型。
2. C2-first.tap 9通過／3失敗：兩項預設游標測試假設0，實際舊初始化為1；測試副本明確設0。另一項是真實新互動錯誤：點收合時設定區段游標，reveal effect又打開它；改為區段標頭本身不自動展開。第一輪修正後15/15，無重複盲試。

## 限制

真實視覺／滾輪／可拖動捲動條／觸控仍待驗，HTTP預覽環境中斷記C1，未將DOM當真人通過。沒有虛擬化保證或1,000以上容量承諾。對話以外欄位不能批次改；搬移位置沿用既有「向後拖到目的後、向前拖到目的前」規則；重複積木必要配對會一併移動／刪除，非法結構拒絕。本包不算完成C3–C8或設定畫面資料遷移。
