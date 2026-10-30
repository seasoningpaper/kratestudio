# C1 官方來源與版本界線

2026-10-21重新查閱。只使用官方頁／官方維護repo，未安裝或執行競品。R2既有比較保留；以下是本輪核實或明確無法核實的來源。網站未提供版本則明寫未確認，不推測最新發行版。

|工具|版本／查核狀態|官方來源與本輪界線|
|---|---|---|
|Ren’Py|8.5.4文件|https://www.renpy.org/doc/html/ 及 https://www.renpy.org/doc/html/save_load_rollback.html ：儲存涵蓋遊戲位置、顯示與變數；Rollback不是編輯器Undo|
|Unity＋Naninovel|Naninovel1.21；Unity版本未查證|https://naninovel.com/guide/ 及 /guide/state-management ：遊戲、全域與使用者設定分離；非把Unity所有能力計為VN內建|
|TyranoBuilder／Script|Builder官網未標版本；Script V6|https://tyranobuilder.com/ 與 https://tyrano.jp/tag/ ：拖放、鏡頭／影片／輸出；Script角色、流程、音訊等標籤，Builder能力不等同所有Script標籤|
|WebGAL／Terre|滾動文件，發行號未確認|https://docs.openwebgal.com/ ：指令索引、Terre貢獻入口；不把導航標題等同已測功能|
|Visual Novel Maker|文件版本未知|https://asset.visualnovelmaker.com/help/index.htm 仍僅搜尋外框；細項尚未驗證，停止重試|
|RPG Maker MV／MZ|本輪MZ Help，MV沿用R2記錄|https://rpgmakerofficial.com/product/MZ_help-en/01_10.html ：事件／迴圈／開關／圖片與音訊，不把地圖角色等同VN立繪資料庫|
|Twine|reference未標精確發行號|https://twinery.org/reference/en/ ：分支視圖與HTML；媒體與存讀依story format，不能混同|
|Suika2|未知|https://suika2.com/en/ 本輪工具擷取不可用；不以非官方fork補成已驗|
|Tuesday JS|官方repo default branch快照，發行號未確認|https://github.com/Kirilllive/tuesday-js ：瀏覽器／HTML元素編輯器；沿用R2官方編輯器手冊查核界線|
|Kirikiri／KAG|KAG3文件|https://krkrz.github.io/krkr2doc/kag3doc/contents/Tags.html ：標籤／條件／音訊等，不推論不同移植版平台|
|NVLMaker|未知|https://www.nvlmaker.net/ ：本輪零正文，不混作Cloud產品|
|橙光／66 RPG|官方初級模式教材，版本未知|https://www.66rpg.com/monthly/t_21/943.shtml ：立繪位置、數值／分歧／跳轉、BGM／CG解鎖；不外推高級版|
|Oice|未知|https://oice.com/ ：零正文，未核實細項|
|ACG Creator|官網未標發行號|https://acgcreator.com/zh-TW ：線上創作／網頁遊玩與翻譯，不猜測內部資料模型|

## 視覺程式與輸入技術（未複製程式碼、未增加依賴）

|來源／版本|可核實設計|Koi選擇|
|---|---|---|
|Scratch2 scratch-flash archived2019 https://github.com/scratchfoundation/scratch-flash|Flash舊編輯器，不是DOM Pointer實作|只參考使用意圖，不移植舊觸控事件|
|Scratch3 scratch-blocks目前2.0說明 https://github.com/scratchfoundation/scratch-blocks|目前依賴Blockly12而非舊fork；與 https://github.com/scratchfoundation/scratch-vm 分離運行模型|保留Koi既有canonical事件，不將VM或UI另建權威資料源|
|Blockly滾動文件 https://docs.blockly.com/guides/get-started/what-is-blockly/ 、https://docs.blockly.com/guides/configure/serialization/|處理連接與拖曳；JSON serializer按系統保存，XML保留為legacy|沿用P0連接規則；未知擴充欄位須保留、交易式Undo，不要求Koi改用Blockly|
|Code.org官方歷史fork https://github.com/code-dot-org/blockly|2026-01-27 archived；README確認已遷往mainline，不再發布舊套件|不引入已停維護fork；保留自動捲動意圖供C4測試|
|MIT App Inventor https://github.com/mit-cml/appinventor-sources|官方開源多平台專案，精確blockly版本本輪未核實|不將元件事件與Koi順序敘事混為相同模型；深層連接細節仍待後續指定檔案查證|
|W3C Pointer Events3（2026-06-30 Recommendation） https://www.w3.org/TR/pointerevents3/|pointerId／capture／cancel／touch-action及相容滑鼠事件|單一gesture生命週期；取消／失capture不提交；縮放前後使用同一座標基準，C4須測|

Scratch2、Scratch3套件版本、產品版本與Blockly主版不能互換。單一抽出需明確操作，預設拖尾串；不要求矛盾的拖曳手勢同時成立。C1僅決策／盤點，沒有重做已通過的P0積木模型。
