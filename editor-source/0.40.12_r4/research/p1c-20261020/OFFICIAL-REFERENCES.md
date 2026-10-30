# 官方參考與驗收設計

本表只用來形成驗收問題，不複製外部引擎或宣稱KOI有同等能力。日期2026-10-20；原網站文件可能持續更新。

| 工具 | 官方來源 | 已讀依據與對KOI的檢查 |
|---|---|---|
| Ren’Py | https://www.renpy.org/doc/html/label.html | label／jump與call不同，context含劇情位置、視覺及音訊；檢查KOI分支合流、無效跳轉、存讀；KOI沒有call返回堆疊。 |
| WebGAL | https://docs.openwebgal.com/ 、https://www.openwebgal.com/ | 官方文件與視覺編輯／腳本設計；只參考指令／編輯器一致性，KOI只兼容已列舊語法子集。 |
| TyranoBuilder | https://tyranobuilder.com/ | 官方產品頁的視覺製作與輸出設計；教學路徑無法擷取，未宣稱已讀完整手冊。檢查四編輯模式與封裝。 |
| TyranoScript | https://tyrano.jp/tag/ | 官方tag表含訊息／字體／圖層與等待；檢查KOI文字框、目標與時間參數，非直接套用其語法。 |
| Unity＋Naninovel | https://naninovel.com/guide/scenario-scripting | 明確布林旗標、wait與非同步軌；檢查KOI false解析、並行／等待與存讀。KOI沒有多軌async/await。 |
| Visual Novel Maker | https://asset.visualnovelmaker.com/help/index.htm | 官方help索引可開但擷取只有外框；細項未能確認，不據產品名推定功能。 |
| Kirikiri／KAG | https://krkrz.github.io/krkr2doc/kag3doc/contents/Tags.html | 官方專案維護的標籤參考；檢查跳轉、圖層、音訊與狀態參數分離。 |
| Suika2 | https://suika2.com/en/ 、https://github.com/suika2engine/suika2 | 本環境擷取失敗，另找到fork但不以fork當官方技術證據；此項研究部分未完成，不推定功能。 |
| RPG Maker MV／MZ | https://rpgmakerofficial.com/product/MV_Help/page/01_10.html 、https://rpgmakerofficial.com/product/MZ_help-en/01_10.html 、https://rpgmakerofficial.com/product/MZ_help-en/01_10_11.html | 官方事件命令分類：文字／選項／變數、條件、圖像、等待與音訊；形成KOI盤點分類。戰鬥／地圖等不屬KOI本輪範圍。 |
| Twine | https://twinery.org/reference/en/ | 官方說明區分編輯器與story format，分支可視化與HTML發布；檢查KOI事件圖、分支、輸出，不假設所有格式語法相同。 |

未擷取的官方細節列為研究限制；不因追求來源數量反覆搜尋或擴充大型模組。
