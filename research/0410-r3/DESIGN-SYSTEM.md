# SoftFlow 1 r3 Design System

接續 r2 3ad56d9；保留 React、事件模型、儲存格式、正式 Logo 與既有桌面布局。沒有新增框架。

| 表面 | 實作 |
|---|---|
| Base | 中性白 #F8F9FB、面板 #F0F3F7、事件內容純白；連續平面，沒有面板投影 |
| Raised | 必要操作 1px 2px 3px 暗面與 -1px -1px 2px 亮面 |
| Recessed | 欄位 inset 1px 1px 2px；去除重複底線 |
| Primary | 藍 #3F729E→#315D86；紫 #7B589A→#684883；限真正行動 |
| Popup | 6px 圓角、0 4px 14px 小面積投影 |

主要控制項圓角 4px，連續導航 0px，資源清單 3px。文件／四模式／工具導航位置及 desktop 88px 高度不變；左右欄寬度沿用 r2。

字體使用 --sf-font-11 至 --sf-font-16 × --ui-text-scale；舊編輯器文字在 build-editor-styles.mjs 轉為同一縮放規則並移除該類規則的字型 !important。保留真正遊戲／畫布的獨立尺寸，不改劇情字級。設定仍依現有專案 editorSettings 保存，各專案保留自己的設定。

src/softflow-theme.mjs 管理材質色彩與尺寸。src/design-system.css 管理 GUI。src/ui/softflow.jsx 為共用 Button/Input/Select/FormRow；src/ui/file-picker.jsx 保留原生選擇器與受設計的單一入口。src/color-palette.jsx 使用有語意的勾選；不使用常駐選取外框。鍵盤仍有單一 focus-visible。

五態：Idle 表面；Hover 明度；Pressed 主操作下壓及微凹；Focus-visible 單一2px輪廓；Disabled opacity .48 與語意停用。排除 disabled 的 hover 回饋。reduced-motion 關閉位移。

檔案選擇器外層改為正常連續列，只有真正的「選擇檔案」操作微凸。專案資源樹與事件清單不做卡片。移除舊 event-row:focus-within 整列外框，保留真實控制項鍵盤焦點。

來源對照見 RESEARCH.md；歷史技術並非95件完整作品研究已完成的證明。
