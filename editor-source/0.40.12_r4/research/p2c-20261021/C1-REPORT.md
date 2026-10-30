# P2-C1：來源、比較與風險基準

查核日期2026-10-21。來源511469009d6183063b4ef14503ddbe4200356aec，工作區原先乾淨；原生Sites確認active/public/latest54及原網址。正式來源5b004f3與Sites53回復48b5457保持。修改前tag checkpoint-p2c-before-20261021，完整ZIP Koi-Maker-before-P2C-5114690.zip。沒有重做P0／P1。

## 已有能力與本輪範圍

以FEATURE-MATRIX.md的105列、P2-A-FEATURE-COMPARISON.md的35列×15工具及本輪補充矩陣為聯合清單。舊A僅承接列明的歷史測試，未重跑全部，不計為本輪新增通過。新增需求不因競品有就判缺少。未知不是缺少。

|工作包|實際現況／主要原始碼|缺口與安全實作界線|估計工程時／風險／前置|
|---|---|---|---|
|C2事件列表|event-list.jsx已有Shift/Ctrl、多選工具、群組拖曳；app.js selected與selectedCards耦合；bulk-cards已有搬移／安全patch／刪除|補獨立核取選取、批次入口與偏好；原有捲動條已存在，不重寫故事模型|4–8小時／中／C1、相關DOM與500/1000測試|
|C3流程|workspace.jsx、flow-math/layout已有有界分層、自排Undo、collapse／fit／平移／縮放|視圖transform與native scroll沒有共同橋接，需單一座標契約，不能新增競爭視圖狀態|6–12小時／中／C2完成後獨立測試|
|C4手機|blocks-editor／block-drag、game-designer／menu-template-editor已有Pointer與capture／cancel|真實觸控未驗；先測palette捲動意圖、pinch轉移與cancel；不以大CSS替代模型|8–16小時／中高／C3，Pointer自動化＋人工限制|
|C5設定拆分|screen-layout.mjs schema3、system-surface／player-settings使用真實renderer；body內仍整體設定群組|需穩定子元件ID、父子循環驗證、舊schema備份／遷移／降版；尚未實作|16–32小時／高／C4、獨立遷移與必要真人驗收|
|C6四模式|program-sync／files／identities、event-order、canonical chapters.events已共用；未知JSON欄位與草稿有既有保護|本輪50/300/500全語意往返與未知欄位仍待執行，不用事件數推論無損|8–16小時／高／C5模型穩定|
|C7品質|r2 230個歷史案例、腳本35指令×15欄、105功能列|針對實改範圍回歸；全產品真人／codec／觸控仍未知；品牌文字最後獨立驗證|8–16小時／中／C2–6|
|C8發布|既有Worker／Sites54公開網址|全必要門檻未達前不部署；保留53與54來源／存檔|2–4小時／高／C7通過|

以上為人工工程量級估計，不是剩餘Work額度或本次承諾時間。依使用者允許的工作包邊界停止並保存，不跨過未完成的高風險遷移。

## 本輪測試基準

實際執行 `timeout 60s node --test tests/r2-character.test.mjs tests/p0d-model.test.mjs tests/r2-alignment.test.mjs`：38/38通過，0失敗，Node約212ms；C1-baseline.tap保存原始結果。不是P0重做，也不是全系統重新驗收。

## 瀏覽器基準與限制

依Sites新版managed流程，僅使用supervisor及cua_repl。原Worker專案沒有dev/static預覽入口；短暫dev配置修正supervisor附加參數後可啟動，原hosting與正式部署未改。真實Chrome在HTTP terminal.local載入時，app.js defaults的crypto.randomUUID不可用而中斷（安全context環境差異）；截圖為未完成載入，不能拿來宣稱GUI正常。沒有修改正式應用以繞過預覽安全環境，已移除暫時dev設定並stop supervisor；不再反覆嘗試。正式HTTPS站是否正常不由這個失敗推論。

真實瀏覽器：嘗試但未完成；觸控／聽感：未執行。後續DOM測試不是替代真人或真實視覺驗收。原7視覺案例與ZIP、88測試／10組DOM歷史均保留。

## 架構決策

沿用canonical chapters.events及單一history；checkbox批次選取只儲存ID，不創第二事件資料來源。UI偏好放現有editorSettings的可選子欄位，沒有更改儲存key/schema。批次僅文字／對話姓名／文字速度，條件、目標、類型、素材與ID不開放批次覆寫。C5不與C2混作一次遷移。品牌新正式名稱已記入計畫，現正式版本名稱不提前改號。
