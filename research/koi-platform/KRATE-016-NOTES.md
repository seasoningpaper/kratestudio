# Krate Studio 0.1.6 視覺修訂與驗收

2026/10/27，接續 6104672，前正式站 Sites 75、來源 3ae3391。

## 視覺依據與實作

已實際檢視本輪四張使用者截圖，針對大型標題、浮動書本插圖、流程圖與操作按鈕修訂。

- 新增 heading token #172330，套用主標、區段標題、作品名稱、內容頁與流程面板標題，保留一般說明文字層級。
- 原創 SVG 書本紙面改為透明度漸層，播放圖形改為玻璃色面，流程浮動圖使用獨立漸層避免色域造成純白；收斂白色高光，無新增外框。
- 三種流程 SVG 的氣泡、節點及播放圖形採一致的玻璃漸層與輕微體積陰影，文字仍為獨立文字。真正語意的分支連線保留。
- 主要操作按鈕採微凸表面、按下內凹，流程區以 16px 背景模糊和透明色面呈現玻璃質感。沒有新增漂浮卡片陣列、圖示底座或大型圓角。
- 保留上一輪移除小圖示與密集提示字的修改。原製作器、儲存與專案資料未改。17 頁版號為 0.1.6。

## 年代與參考限制

本輪重新讀取 Tailwind CSS v2.0 官方發布文，2020/11/18；Michal Malewicz 的 Glassmorphism in 2021，2021/08/17；Neumorphism in user interfaces，2019/12/17。後兩篇只讀取公開部分，不宣稱取得會員全文。

https://tailwindcss.com/blog/tailwindcss-v2
https://michalmalewicz.medium.com/glassmorphism-in-2021-b6a8e3e8f509
https://uxdesign.cc/neumorphism-in-user-interfaces-b47cef3bf3a6

13 個網站的公開內容、視覺檢視、實際互動與受限範圍沿用 KRATE-014-REFERENCES.md 與 KRATE-015-NOTES.md。涵蓋 Aogiri、hololive、Canva、Tailwind v2、WebGAL、RenPy、RPG Maker、TyranoBuilder、itch.io、novelgame、sprite、CloverWorks、ATLUS。不能宣稱已完整體驗所有會員、付款、桌面工具或所有遊戲。Canva 公開簡報頁籤未切換成功，登入後製作與匯出未完成；WebGAL 完整試玩亦未完成。

不採現行 Canva AI、膠囊及卡片樣式；不搬用其他品牌角色、Logo 或美術。不宣稱能存取、篩選或變更模型訓練資料日期。

## 驗收證據

- npm run build 通過，Worker ESM default.fetch 有效。
- 10 項既有回歸通過，含歷史製作器逐位元相同、試玩兩分支與本機存檔、搜尋分類、流程頁籤鍵盤支援、備份劇本相容。
- 最後的 SVG 色面微調後再次建置通過，SVG id 唯一且全部 url 引用可解析。
- 17 頁版號、三個 FAQ 必要箭頭保留、移除提示字靜態檢查通過。
- Chrome 預覽主要標題 computed color 為 rgb(23,35,48)，流程表面 blur(16px)，按鈕具微凸多方向柔和陰影。按鈕內小圖示數為 0。
- Chrome 點分支、方向鍵切預覽，aria-selected 確認預覽；常見問題可展開並顯示本機儲存說明。
- 桌面 viewport/scrollWidth 為 1348/1348。沒有變動布局尺寸。本輪未重跑全部手機與瀏覽器縮放矩陣。

- 正式發布：Sites 76，來源 bf0e6933b85d17e1437f1dacdf0a6736b0c25be2，deployment appgdep_6ae059147d708191925e0703f2b367e9。保留 Sites 75 回復點。
- 正式 HTTPS 已重開驗證 title、頁尾 0.1.6，主標 rgb(23,35,48)，新版浮動圖 flow-glass 存在；1348/1348 無水平溢出。本站來源 error 日誌無結果。截圖 research/koi-platform/live-krate-016.jpg。
