# H3 截圖與18項缺陷追蹤

已逐張檢視19檔，SHA-256去重後正好15張。完整檔名／尺寸／重複關係見 SCREENSHOTS.json；表中為該檔案序號。下表已補入本輪實作與驗證狀態；「抽驗」不代表所有情境真人驗收完成。

|要求|截圖|實際來源／問題|修正規格|狀態|
|---|---|---|---|---|
|GUI-01|1|dist/app.js動態toolNav、dist/softflow.css給一般導航凸起表面|連續底線導航，不做浮雕按鈕|已實作；Chrome 主導航／截圖確認|
|GUI-02|2|dist/index.html的modes位於workspace內，work-tabs.mjs包入storyPage|回Header、維持ID與setMode|已實作；7尺寸等寬與四模式往返確認|
|GUI-03|1、3|HTML常駐softflowTheme，app.js保存主題|移EditorSettings，仍commit同一project|已實作；Chrome 藍白／粉紫保存重載確認|
|GUI-04|5、10～19|根CSS、React tools-body及native Inspector覆蓋不一致|共用分層樣式＋元件清冊|已建立全站清冊與共用樣式；各頁Chrome抽驗，非每個操作全測|
|GUI-05|5、18|7個React模組直接渲染input type=file|FilePicker保留callbacks、accept、directory與錯誤|已實作；13項GUI測試／Chrome PNG匯入確認；實體資料夾拖放待驗|
|GUI-06|素材入口需求|src/asset-repair.jsx、project-tools.jsx|移除UI／元件，保留正常引用與內部相容工具|已移除UI；一般引用與資料測試保留|
|GUI-07|指定需求|沒有局部受光生命週期|只限儲存／預覽，rAF合併，減少動態／觸控降級|已實作；rAF／清理／觸控／reduced-motion自動化通過，受光細節待使用者評審|
|GUI-08|10、19|工具頁仍顯示無關事件Inspector；4模式另占一行|連續工作區，工具頁歸還右欄，既有側欄收合|已實作；7尺寸實際CSS布局／工具頁Inspector收回|
|GUI-09|指定需求|app.js的chord、hearMusic及預覽副作用|移除編輯和弦；保留AudioPlayer／真正Runtime|已移除；Runtime與普通音訊保留，聽感待驗|
|GUI-10|1、7、9、16|導航／標籤與操作共用raised陰影|依語意定義5種表面，不做卡片牆|已實作語意表面；截圖抽驗，最終設計接受度待使用者|
|GUI-11|全組|src/game-skins.css含body * box-shadow:none!important，舊SoftFlow再覆蓋|編輯器legacy layer＋單一新DS；保留獨立player.css|已實作CSS layer／單一DS；核心與Logo位元組保持|
|GUI-12|8、10～15、18|設定頁未統一標籤欄與內容寬度|SettingSection／FormRow等；不用absolute補洞|已實作共用設定／作品屬性表單；375／390px無溢出|
|GUI-13|4、6|manager-open與普通工具導航被當操作按鈕|TextAction／Toolbar／Primary分工且保留button語意|已實作導航／文字操作／主要按鈕分工；保留原互動語意|
|GUI-14|5、18|React19＋DOM shell已存在；重複原生檔案輸入|沿用React，無Vue／外部UI Kit|已沿用React19；共用表單及FilePicker，無第二框架|
|GUI-15|1、8、16|全域flat優先級與局部陰影互相競爭|共用hover／active／focus-visible／disabled|已實作共用五態與AA Tokens對比檢查；非全頁／自訂色全量對比驗收|
|GUI-16|19|資源樹縮排／動作密度不一致|同層行高、圖示、縮排，不做浮起小卡|已實作樹層級／密度；Chrome截圖抽驗|
|GUI-17|16、17、18|圖片與模板工具列碎片化、多層背景|緊湊橫向工具列、控制項分組、畫布優先|已實作圖片／模板工具列；Chrome入口與畫面抽驗|
|GUI-18|4、7、9、16|一般導覽及資訊標籤被套raised效果|標題／說明／導航不使用凸面|已實作連續表面／標題文字去框；截圖抽驗|

## 元件清冊（實作與驗收範圍）

|頁面／元件|來源|處理方式|狀態|
|---|---|---|---|
|主選單／Header／四模式|dist/index.html、dist/app.js|結構整合與語意樣式|共用樣式已整合；H8抽驗，完整操作仍待人工|
|專案首頁／資源樹|dist/app.js、work-tabs.mjs|連續清單／層級密度|共用樣式已整合；H8抽驗，完整操作仍待人工|
|事件列表|event-list.jsx|保留CRUD與模型，只更新表面|共用樣式已整合；H8抽驗，完整操作仍待人工|
|流程畫布|workspace.jsx、flow-scrollbars.jsx|保留坐標與連線，只更新節點材質|共用樣式已整合；H8抽驗，完整操作仍待人工|
|積木畫布|blocks-editor.jsx|只更新容器／工具列；原積木造型與幾何不改|共用樣式已整合；H8抽驗，完整操作仍待人工|
|KOI Script|code-editor.jsx|共用控制項與匯入入口，不改語法|共用樣式已整合；H8抽驗，完整操作仍待人工|
|素材庫／容量|project-tools.jsx、capacity-meter.jsx|共用FilePicker／表單／密度；容量限制不變|共用樣式已整合；H8抽驗，完整操作仍待人工|
|圖片編輯|image-editor.jsx|共用檔案與工具列、控制項|共用樣式已整合；H8抽驗，完整操作仍待人工|
|模板／遊戲介面|menu-template-editor.jsx、game-designer.jsx|共用表單與控制列；預覽Canvas不套外殼樣式|共用樣式已整合；H8抽驗，完整操作仍待人工|
|變數／資料庫／搜尋|variable-editor.jsx、database.jsx、story-search.jsx|統一表格、表單與欄位|共用樣式已整合；H8抽驗，完整操作仍待人工|
|擴充／鏡頭／音訊|extensions.jsx、stage-editor.jsx、audio-editor.jsx|共用導航／表單／檔案|共用樣式已整合；H8抽驗，完整操作仍待人工|
|介面／遊戲設定|editor-settings.jsx、project-tools.jsx|重建共用對齊表單|共用樣式已整合；H8抽驗，完整操作仍待人工|
|對話框／匯入匯出|dialogs.mjs、export-manager.jsx|共用表面與狀態|共用樣式已整合；H8抽驗，完整操作仍待人工|
|真正遊戲播放器與匯出模板|player.jsx、player.css|不適用GUI重建；只做回歸|保留|

## 框架選擇

沿用React19與既有DOM外殼，比導入Vue或另一UI Kit成本低，無雙框架狀態與資料遷移。僅共用可重用控制項，保留現有各編輯器責任，不建立巨型GUI管理器或另一故事引擎。
