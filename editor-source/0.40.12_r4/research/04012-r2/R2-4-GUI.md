# R2-4：限定範圍的 GUI 修正

修改前視覺基準：sites58-before.png，Sites 原生保存的正式58版截圖，1200×750，已檢視。修改前可回復來源136a540；source diff 保留。

| 部位 | 修改前根因 | 局部修改 | 驗證限制 |
| --- | --- | --- | --- |
| 區段工具列 | 標題 inline-flex 的 max-width calc(100%-100px) 未包含後加核取方塊、按鈕 margin 及行內空白；四個控制項沒有共同列，寬度可能超出而換行 | 單一 event-group-heading Grid，核取方塊／彈性標題／編輯／刪除四欄，標題可縮短、按鈕固定欄，內容事件仍在原容器 | DOM 結構及 CSS 規格通過；實際窄螢幕像素待驗 |
| 四模式分頁 | flex intrinsic 寬度與 code 專用 min-width 造成寬度不一致 | 現有 modes 內改為四個相同 minmax 欄；沿用桌面40／窄版33高度與主題、位置、順序 | CSS 規格通過；真實各解析度待驗 |
| 清單分隔線 | 既有功能用 checkbox＋強度，缺少需求文字與寬鬆密度 | 在原清單設定中以無／極細／標準呈現；舊 strong 保存為「清晰（舊設定）」而非丟棄；加入寬鬆，保留緊湊／標準 | 設定、保存／載入與不變更事件通過 |
| 積木選取線 | 既有 selected 2px outline | 僅降至1px，保留 focus-visible／focus-within、類別顏色、凹凸造型與拖曳提示 | 原始碼規格；真人視覺／鍵盤仍待驗 |
| 儲存顯示 | 主控器與素材容量區各自硬編碼 2048MB 顯示 | 共同 formatStorageUsage 由真實 bytes／limit 換算十進位GB。605.7MiB顯示0.6／2.1GB，並標示2GiB實際上限 | 沒有把未驗證容量改稱5GB；未加大資料上限 |

修改檔案：src/event-list.jsx、src/storage-format.mjs、src/workspace.jsx、src/project-tools.jsx、dist/app.js、dist/editor-fixes.css、dist/style.css（僅既有積木選取線一個宣告）及 workspace bundle。不是全面改寫 CSS，沒有新UI框架、Logo、字型、主配色、導航位置或工作區改造。

R2-4-first-fixture.log 保留一次測試 fixture 錯誤：測試假設目前編輯索引0，實際初始化為1；已在測試開始明確選取0，才檢查checkbox不改變編輯游標。沒有修改選取功能或放寬期望掩蓋問題。R2-4-final.log 為最後4項通過、0失敗。editor-final.log 另含4項區段／計數核心通過。

受支援預覽HTTP環境無法初始化原有crypto.randomUUID，沒有透過其他瀏覽器或修改正常app繞過。修改後實際像素、深淺色、各解析度、手機實機仍待人工驗收；DOM／CSS測試不等同視覺驗收。

5GB不是本包完成項。仍須實際配額、分批媒體寫入、原子還原與備份驗證；Windows EXE與大容量架構另包，不加入未驗證遷移。
