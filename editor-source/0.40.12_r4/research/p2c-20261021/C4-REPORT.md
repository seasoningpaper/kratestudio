# C4 手機操作的已重現修復與驗收限制

從f726b75接續。這是已測子範圍的修復，不是全手機操作完成。

## 真實重現方式與根因

沒有可用的實機觸控結果。依使用者允許，使用實際bundles、真實模板／積木React元件、Pointer／Touch合成事件與IndexedDB測試副本重現，沒有修改正式使用者專案。C4-reproduction.tap保存5個修復前失敗，C4-first-fix.tap為第一輪最小修復後5個及3模板回歸通過。

|問題|嚴重度|修復前可重現步驟與根因|修改|
|---|---|---|---|
|工具箱直向手勢誤進拖曳|High（手機主要操作）|touch pointerdown後x+1/y+50仍保留ghost；CSS強制none，程式沒有捲動意圖判斷|palette限定pan-y；垂直主導超過閾值取消ghost／capture且抑制尾隨click，向外拖曳保留|
|遊戲模板被另一pointer移動／提交|High（錯誤覆寫位置）|pointer1開始，pointer2 move/up即可提交pointer1草稿；drag未保存owner|記pointerId，拒絕次要down、非owner move/up；先驗證owner再更新|
|功能畫面模板同類污染|High|同上，在真實MenuTemplateEditor與SystemSurface重現|同owner保護延伸框選，保留既有ID／schema3|
|兩種模板失capture後仍可提交|Medium|開始移動→lostpointercapture→pointerup，原本沒有lost handler仍寫入草稿|cancel恢復原ref／草稿，不建Undo交易；blur／resize同樣取消|
|雙指積木僅平移不縮放|Medium（程式可確認、修後測試）|原touchmove只算中點位移，未計距離|使用起始距離／zoom與同一offset，維持中點世界座標，cancel／blur清除手勢|

## 修改檔案

src/blocks-editor.jsx、src/game-designer.jsx、src/menu-template-editor.jsx；dist/style.css及player.css僅增加palette touch-action規則（兩份共享樣式都需覆蓋）；dist/workspace.js與Worker為建置輸出。新增tests/p2c-mobile.test.mjs。

沒有改儲存key、KOI Script、事件／素材ID或模板資料格式。沒有C5新元件模型／遷移，沒有全面重新設計、放大積木或控制點。

## 通過

12個C4案例：5重現修復、雙指縮放座標／取消、觸控工具箱新增及取消／無誤播、觸控整串立即單次解除音效／拒播Promise安全、桌面與手機模板顯示座標、Undo／Redo、IndexedDB還原、功能畫面模板縮放座標／還原、旋轉resize取消兩模板草稿。

另12個必要回歸：P1B音效7、P0C字串與連續新增2、r2對齊DOM3。原有單一抽出、上下重新接合、聲音拒播、模板群組拖移／微調／對齊／Undo斷言保留。C4-complete-test.tap 12/12、C4-regression.tap 12/12。

完整npm build及Worker ESM／22資產一致通過，C4-build.log與C4-assets.log保存。最終10個JS/MJS語法檢查通過；JSX由esbuild實際編譯。沒有安裝依賴或重建網站。

## 未完成、不得當成通過

- 真實iOS／Android Safari／Chrome觸控、原生捲動與pointer capture生命週期、鍵盤／字串選取、系統縮放、安全區域、手指遮擋及視覺／聽感。
- 桌面真實瀏覽器驗收受HTTP預覽crypto環境限制，見C1；合成事件不保證原生手勢預設行為相同。
- 沒有宣稱新增長按規格／自動邊緣捲動或所有手機選取難題都已解決。既有數值調整、多選／對齊控制保留，但仍需實機操作。
- C5元件化／資料遷移與回復、C6全代表性50/300/500四模式往返、C7全回歸與品牌、C8部署均未執行。正式站保留Sites54。
