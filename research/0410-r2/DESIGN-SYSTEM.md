# SoftFlow 1 Design System（受控重建）

歷史依據與限制見 H2-RESEARCH.md，不宣稱完整150件研究。藍白為預設、粉紫為第二主題，深色與自訂舊設定仍可用。正式Logo原圖保留，不使用filter反白。

## 架構與責任

src/softflow-theme.mjs 是編輯器色彩／尺寸token唯一來源。src/theme.mjs 轉接舊CSS變數與積木分類，避免第二套主題狀態。src/design-system.css 是具語意的元件／版面樣式來源。

舊 src/game-skins.css 有184個!important，其中body *移除全部陰影，新舊SoftFlow原先再反向覆蓋。新的build-editor-styles.mjs把編輯器相容樣式放入 @layer legacy，只退役視覺屬性的!important，保留hidden、pointer與幾何安全規則。共用game skins只出現一次，新設計不新增!important。原player.css與真正遊戲Canvas不改；不重寫資料模型。

## Tokens

|類別|規格|
|---|---|
|基底／工作區|Blue #F7FAFD、Lavender #FCF8FC；連續表面，不是卡片牆|
|面板|Blue #F0F5FA、Lavender #F5F0F8|
|輸入|白色微凹，inset雙向明暗；單一底邊與focus-visible|
|主要操作|Blue #346A9A、Lavender #78539A；漸層至同色深階，微凸|
|次要操作|少量局部微凸，Toolbar／Nav／TextAction不用凸面|
|彈出視窗|9px圓角、單一集中投影；遮罩只服務模態操作|
|文字|標題16／區段14／內文13／輔助11～12／狀態10px；沿用系統字型家族|
|間距|4／8／12／16／24px|
|圓角|控制6px、面板9px、列表導航0～3px|
|動態|120ms；主要操作按下1px，不追蹤全頁；reduced-motion關閉位移|
|斷點|1900寬桌面、1200緊湊桌面、900手機模式、540單欄表單|
|高密度桌面|88px Header包含主操作／四模式與連續主導航；35px文件分頁；左右232／290px，可收合|
|窄Inspector|container query＋range control真實Grid，避免數值／滑桿超出欄寬|

## 控制項狀態

Idle以材質區別輸入、操作及資訊；Hover變背景明度；Active主要操作微凹／下移1px；Focus-visible單一2px高對比焦點；Disabled保留語意並降低透明度、禁止操作。錯誤使用文字及role=alert，不能只靠顏色。

導覽是連續底線，工作分頁是相接標籤，資源樹用縮排、圖示與選取底色。標題和說明不包成按鈕。沒有裝飾timeline圓點、卡片牆、發光邊框、長膠囊或被裁半的示意節點。

24組預設文字配對達WCAG AA 4.5:1，主操作文字4.5:1及焦點3:1已計算。這不是全站逐像素對比驗收；使用者自訂顏色仍需自行檢查。詳H4-CONTRAST.json。

H4語法與token檢查通過，GUI整合、RWD與互動驗收於H5～H8進行。
