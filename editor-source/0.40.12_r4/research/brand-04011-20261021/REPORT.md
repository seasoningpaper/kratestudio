# Koi Maker 0.40.11 — 品牌、版本及相容性驗證

## 執行順序與結果

先完成P1-C1～C5，保存穩定檢查點34a1e05fe8ff8f54b5a82ec42f153599cd52f486、推送既有來源庫，建立KOI-Maker-0.40.10-P1C-validated-source.zip並驗證CRC。該版本沒有部署；原正式r52仍為31b17bb。

再進行本包Koi Maker 0.40.11品牌升級。P1-C 243個不重複案例與6個新品牌案例，合計249個不重複案例通過；最終品牌6/6，KOI文件42、跨模式與圖片匯入ZIP等受影響回歸亦通過。首輪品牌有2項測試fixture錯誤（Document.title折疊空白、舊版測試HTML無React掛載節點），補正fixture後通過，沒有改產品邏輯掩蓋測試。

最終npm run build成功，Worker ESM有效；22個部署資產逐項200與來源bytes一致。檢查的是本機Worker，不是正式瀏覽器。語法、git diff --check通過。正式部署結果另見RELEASE.md，這份報告不預告成功。

## 文字與版本修改清單

- dist/index.html：網站title／版本、Logo替代文字／aria、側欄品牌與版本；樣式／script查詢版本更新以取得新程式。元素／class／布局維持。
- dist/assets/koi.svg：O/I改為小寫o/i筆畫；K與Maker向量座標、黑色、3.25線寬、圓線帽、viewBox與顯示尺寸維持，不替換字型或重設Logo。
- src/workspace.jsx：流程圖水印Koi Maker。
- src/storage.mjs：儲存庫占用提示的品牌文字。
- src/packaging.mjs：遊戲ZIP中HTML製作器標題改Koi Maker；實際封裝測試通過。
- src/i18n-extra.mjs：品牌翻譯值與新顯示鍵；保留舊翻譯鍵為相容別名。
- package.json：version=0.40.11；package name、依賴與pnpm-lock不變。
- 語法頁／範本／參數說明、功能頁與矩陣產生器：產品名／版本統一，保留KOI Script名稱與0.40.10語法相容說明；歷史版本功能列不重寫。
- scripts/prepare-block-visual-review.mjs：未來產生的補驗文件使用新名稱；原7案例ZIP不覆寫。
- 產物：workspace／player bundles、Worker、功能文件及矩陣、KOI語法頁與兩份可玩範本。完整git差異及INVENTORY.json可稽核。

未發現獨立歡迎／關於視窗的舊產品名稱，沒有為更名新增空白頁面或按鈕。所有已定位使用者可見產品字樣均已統一；歷史紀錄、舊翻譯鍵及CSS歷史註解中的KOI Maker保留，不作執行時全域文字取代。

## 相容性證據

parser、Engine、event-catalog、program-files／sync、ID與value socket資料邏輯與34a1e05逐位元相同。storage／packaging／workspace相對該檢查點僅產品顯示字串變更；公開KoiStorage／KoiWorkspace／KoiPlayer匯出鍵相同。KOI Script語言、.koi、事件型別、資源／專案／事件ID均不更名。

IndexedDB仍koi-maker-files版本1，stores仍projects／assets；localStorage既有galgame-studio-v1與koi-game-*前綴保留。測試把包含「KOI Maker 0.40.10」的作者台詞、專案名、變數存讀後保持原文，未誤改作者資料；既有玩家存檔key內容未動。沒有資料遷移、清除或素材庫重建。

原公開Site project ID／URL與public權限保留。舊功能文件URL仍可開，不移除公開舊連結。新版本附帶KOI Script文件，格式相容0.40.10；不是將語言或檔案識別改名。

## GUI與實際未完成驗收

HTML結構經正規化允許的品牌／版本／快取參數後與34a1e05相同。CSS、icons、原音效、lockfile、hosting設定均未改。語法文件頁保留原CSS，只增加所需說明。

Logo已以Inkscape離線產生PNG並實際檢視：尺寸相同，Maker區域逐像素相同；K向量座標相同，但嚴格逐像素相等檢查未通過，複合路徑重新光柵化有160個邊緣alpha差異，最大13/255。沒有為消除此微差改動K筆畫。詳logo-before／after.png與logo-pixel-check.txt。這是非阻斷性的資產光柵化差異，不是網站截圖，也不宣稱GUI像素完全相同。

真人開站、Logo在實際瀏覽器顯示、P0-C原7案例、動畫觀感、聽感、觸控、真實大型舊專案及512MiB／2GiB容量仍待驗。沒有搜尋或使用替代瀏覽器。人工程序沿用research/p1c-20261020/MANUAL-ACCEPTANCE.md。

## 發布門檻與接續

本輪已重現的2個Critical與6個High均修復，必要劇情／儲存／預覽／四模式／KOI文件測試通過。沒有未處理的已知阻斷性資料安全問題。Medium次要素材引用、逐事件BGM參數及其他F類未驗情境明確保留，見FEATURE-MATRIX.md與P1-C FINAL-REPORT.md；不宣稱整個產品100%完成。

發布前保存完整來源及r52回復點；版本以原生Sites保存結果與RELEASE.md記錄。之後P2-A補官方與真人驗收差距、P2-B受控處理兩項Medium，P2-C再評估返回堆疊／模型／工程模式。本輪未實作0.41.11工程模式、Live2D或其他大型功能。
