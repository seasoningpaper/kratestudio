# Krate Studio 0.1.3

日期 2026/10/27，延續遠端 449fe60 與正式 Sites 70。

## 修改

- 完全移除首頁背景動態控制與空容器，清理對應 CSS 與按鈕事件，不留下隱藏按鈕。
- 插圖、幾何背景自動播放。依 prefers-reduced-motion 停用動態，分頁隱藏時暫停，不寫入專案或設定儲存。
- 插圖幅度略增，按鈕增加 2px 滑入抬起及按壓回饋，文字操作輕微橫移，消息列淡藍紫滑入回饋。
- 作品圖放大上限 1.025，不影響外部布局。主要區塊進入視窗時僅執行一次 0.65 秒淡入與 12px 位移，不持續晃動 GUI。
- 內容預設可見，IntersectionObserver 僅漸進增強，無 JS 時不會隱藏正文。
- 延續局部微凸與玻璃材質，手機導覽增加半透明及背景模糊，無邊框或浮動卡片。
- 瀏覽器視覺檢查發現玻璃頁首建立堆疊情境，可能把展開選單壓在主視覺下方。以頁首 position:relative、z-index:5 修正層級，重開選單及截圖確認可見。
- 17 頁頁尾版本為 0.1.3，Koi Maker 0.40.12_r4 及資料格式不變。

## 參考範圍

沒有取得或宣稱取得模型訓練資料。指定日期作為公開史料的篩選範圍，不是對模型訓練截止時間的設定。

| 來源 | 狀態 | 採用及限制 |
|---|---|---|
| https://www.canva.com/newsroom/news/canva-launches-video-suite-empower-everyone-create-edit-record-stunning-videos/ | 已讀取官方 2021/10/12 文章 | 參考個別元素與情境化動態的概念，未搬用程式或素材 |
| https://note.com/canvajapan/n/n5221fd118a96 | 已讀取官方 2021/06/29 文章 | 參考單個圖像可獨立動態，不讓整頁工具列持續移動 |
| https://hype4.academy/articles/design/neumorphism-in-user-interfaces | 已讀取公開材質及可及性段落 | 延續局部輕微凸面，現行重刊頁不當歷史網站快照 |
| https://michalmalewicz.medium.com/glassmorphism-in-2021-b6a8e3e8f509 | 前輪已讀取 2021/08/17 公開段落，本輪僅載入導覽 | 沿用前輪小量玻璃材質方向，未宣稱本輪全文可讀 |
| https://vhs-city.com/aogirihighschool/ | 本輪已讀取內容並視覺檢視首屏 | 圖像活潑、導航獨立，現行網站非歷史存檔，未複製其角色與美術 |
| https://hololive.hololivepro.com/ | 本輪已讀取內容並視覺檢視首屏 | 觀察動態主視覺與穩定文字入口，未採膠囊、粗框與裝飾點 |

## 驗收

- 正式建置與 Worker ESM 驗證。
- 既有 7 項回歸涵蓋公開頁面、私人路由關閉、歷史製作器逐位元一致、示範遊戲存讀檔、作品篩選、禁止文案及動態偏好。
- 動態測試改為驗證無控制按鈕、自動播放狀態、系統偏好切換、隱藏分頁暫停及不寫入 storage。
- Chrome 桌面首屏無背景按鈕，4 個插圖圖層均 running。兩次量測圖像矩陣改變，頁首、標題區與操作區的文件位置相同。
- 瀏覽器確認區塊進場標記已套用。
- 390/1024px iframe 內容寬與捲動寬為 375/375、1009/1009。手機選單開啟，display:flex，層級修正後截圖可見全部入口。
- 這是遠端 Chrome 與 iframe 響應式檢查，不是實機手機或原生縮放矩陣測試。
- 正式包移除 /qa/，17 頁頁尾版本檢查後發布。

回退點 Sites 70，來源 3ef5f92db64e3be8c1447ea17a59953d878af06d。

## 正式結果

Sites 71，來源 05ee592650fef7633c7858db9247cc162ece4dca，deployment appgdep_6ae016f6e14c8191ba3cfcfe7dbd1aac 成功。正式 HTTPS 標題及頁尾顯示 0.1.3，控制按鈕數量 0，4 個圖像圖層 running，本站來源 error 日誌查詢無結果。正式桌面寬及捲動寬同為 1348px。
