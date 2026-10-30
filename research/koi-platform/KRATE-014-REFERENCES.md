# Krate Studio 0.1.4 參考與體驗紀錄

日期 2026/10/27。使用者指定あおぎり高校、hololive、Canva 與另外 10 站，本輪共檢查下列 13 站。內容讀取、畫面檢視、公開操作與未完成部分分別記錄。這不是全站所有功能、會員流程或歷史版本的全面驗收。

| 站點 | 內容與畫面 | 已執行的操作及結果 | 未完成範圍 | 採用方向 |
|---|---|---|---|---|
| あおぎり高校 https://vhs-city.com/aogirihighschool/ | 已讀取首頁並檢視首屏、成員列表 | 首頁 MEMBERS 進入成員列表，列出角色名稱與入口 | 已點角色詳情但未完成詳情載入驗收，其他頁未全面體驗 | 主視覺與文字導覽分層，不複製其美術 |
| hololive https://hololive.hololivepro.com/ | 已讀取首頁並開啟 TALENT | 列表切換 0期生，網址帶 gp=gen-0，結果為 5 位角色 | 直播、商店、會員及其他分類未全面操作 | 分類必須真正變更結果 |
| Canva https://www.canva.com/ | 已讀取現行公開首頁、檢視首屏 | 兩次點擊簡報頁籤，但 aria-selected 仍為 false，未列為切換成功 | 未進入登入後編輯器、未建立或匯出作品，不能宣稱完整體驗 | 只採 2021 官方文章的個別元素互動觀念，不採現行 AI 首頁 |
| Tailwind v2 https://v2.tailwindcss.com/ | 已讀取並檢視互動範例 | 點選 Transforms，畫面呈現旋轉與位移示例；在 Filter projects 輸入文字 | 未驗證示例輸入是否會篩選資料，未操作每一個範例 | 原創圖示、明確操作回饋、局部示意互動，不安裝 v3 或 v4 |
| WebGAL https://www.openwebgal.com/ | 已讀取並檢視首頁 | 進入 demo.openwebgal.com，點擊 PRESS THE SCREEN TO START | 啟動後呈黑畫面，無法確認後續劇情或存檔，不能列完整試玩成功 | 試玩與教學各有清楚入口，不搬用播放器 |
| Ren'Py https://www.renpy.org/ | 已讀取並檢視首頁 | 點 quickstart，成功進入帶章節導覽的入門文件 | 未安裝桌面程式或完整執行所有教學 | 入門劇本與備份說明可直接找到 |
| RPG Maker https://rpgmakerofficial.com/ | 已讀取並檢視首頁 | 點 FAQ，進入常見問題與相關條款內容頁 | 未下載、安裝或購買製作器，未驗收全部 FAQ | 把必要的保存與登入資訊集中呈現 |
| TyranoBuilder https://tyranobuilder.com/ | 已讀取並檢視首頁輪播 | 點 Next，檢視輪播與教學、功能入口 | 未購買或操作桌面製作器，未完成全教學 | 圖示搭配真實功能說明，不加裝飾點 |
| itch.io https://itch.io/ | 已讀取並檢視搜尋結果 | 搜尋 visual novel，進入有結果數及篩選入口的結果頁 | 未購買、投稿或使用登入後功能，未玩完全部搜尋結果 | 搜尋和分類組合、空結果可恢復 |
| ノベルゲームコレクション https://novelgame.jp/ | 已讀取並檢視搜尋頁 | 搜尋喫茶，結果頁顯示搜尋詞與 67 件結果 | 未登入、投稿或玩完作品，未逐一驗證排序 | 作品資訊與直接試玩入口 |
| sprite https://sprite.net/ | 已讀取並檢視公開作品入口 | 點 banner 中ゲーム，進入 /games 作品目錄 | 未購物、未完成全部作品詳情，首屏部分仍在動畫載入 | 作品圖片與作品介紹保持關聯 |
| CloverWorks https://cloverworks.co.jp/ | 已讀取並檢視作品分類畫面 | 點首頁輪播下一張、進入 WORKS、分類選 TV，結果顯示 TV 40件 | 未測全部年份、分類或外部作品站 | 控制項要有真實篩選結果，不抄卡片格線 |
| ATLUS https://www.atlus.co.jp/ | 已讀取並檢視消息區 | 點輪播 Next，再點 News，網址定位 #news | 未購物、未全面操作全部作品外站 | 穩定導航、清楚的消息與作品入口 |

Twine 首頁本輪網頁內容讀取為 403，未以瀏覽器繞過，也未計入上述 13 站，改以 RPG Maker 補足。

## 年代依據

- Tailwind CSS v2.0 官方發布文 https://tailwindcss.com/blog/tailwindcss-v2 ，日期 2020/11/18，已讀取正文。現行文章站外殼顯示 v4 不作參考，實際視覺參考為 v2.tailwindcss.com 與使用者提供照片。
- Neumorphism in user interfaces https://uxdesign.cc/neumorphism-in-user-interfaces-b47cef3bf3a6 ，日期 2019/12/17，已讀取標題、日期與公開開頭，會員全文未讀。局部輕微凸面延續前輪既有樣式。
- Glassmorphism in 2021 https://michalmalewicz.medium.com/glassmorphism-in-2021-b6a8e3e8f509 ，日期 2021/08/17，已讀取公開段落，未讀會員全文。僅用少量半透明及背景模糊，不加玻璃卡片陣列。
- Canva 2021/10/12 官方 Video Suite 文章 https://www.canva.com/newsroom/news/canva-launches-video-suite-empower-everyone-create-edit-record-stunning-videos/ ，已讀取文章中個別元素動畫與易懂操作的說明。

以上日期落在 2019/01/01 至 2022/06/30 的指定區間。其他現行品牌網站不是該年代存檔，不將其現況冒充歷史設計。無法取得或設定模型的 GUI 訓練資料日期，本輪以可查證公開資料作參考。

## 在 Krate Studio 的實際整合

原創 SVG 圖示對應探索、製作、分支、試玩、保存與搜尋，不新增圖示底座。保留既有官網區段順序，在原製作器介紹區加入對話、分支、預覽三種可操作示意。作品搜尋結合分類與空結果提示。新增本機儲存與帳號狀態常見問題，以及不依賴素材的入門劇本下載。未加入第三方角色、Logo、美術、程式或假社群資訊。
