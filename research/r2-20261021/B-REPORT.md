# R2-B 角色登退場

狀態：本工作包模型、真實Player的JSDOM生命週期與相關建置通過；未發布。真人動畫外觀、聽感、觸控仍待驗。

## 實際根因與修復

1. High：hide立即刪除，motionWait刻意排除hide，無動畫完成生命週期。沿用character/action=hide，新增fadeOut／exitLeft／exitRight／exitUp／exitDown；保留無動作立即退場。Engine等待步驟完成或Player非等待時鐘完成才移除。暫停選單／隱藏時保留剩餘時鐘；預載素材後啟動。令牌防止過期回呼刪除新實例。動畫重載按存檔保留的剩餘值重新播放，不聲稱逐幀保存動畫進度。
2. High：hide的slot支線刪除同位置全部角色；已重現A/B同左側退場A後兩者都消失。現在精確ID優先、唯一位置別名退場；不存在／位置不唯一會中文診斷，不猜角色。
3. 相容性：舊角色狀態的undefined replaceMode在JSON歷史被省略，舊visual-state回歸因此不相等。確認原基準也有該undefined欄位；現在狀態不寫入undefined元資料，沒有改事件格式或預設換圖行為。

## 可操作補強

既有新增事件視窗增加「角色登場／換表情」「角色退場」，實際均寫character，沒有新增事件type。退場預選目前最後有效角色，可修改角色ID／位置；增加目標ID提示、圖層（0～100）與清楚等待動畫文字。表情仍使用現有角色立繪圖片選擇，沒有另一套表情資料。新視覺化登場預設keep避免取代其他角色；既有與舊腳本slot意義保留。積木沿用原進階欄位，只補等待與圖層。原GUI樣式保留，僅追加四種退場keyframes；沒有修改既有CSS規則。

KOI Script舊立繪:none與changeFigure:none仍立即移除；立繪:none -id=A -動畫=向左退場 -秒數=0.8 -等待=true可動畫退場；序列化仍是完整事件JSON。原文件同步產生，語言名稱KOI Script不變。

## 測試紀錄

B-model-1：29/30，舊undefined元資料比較失敗；B-model-2：30/30。
B-dom-1：8/9；唯一失敗為測試共用自動對話驅動器已自動選dialogue，手動定位退場按鈕為null；測試harness新增可停用driver參數，產品不繞過對話框。B-dom-2：4/4新增DOM，原actor DOM的5項已在第一次通過。
B-regression：81/82；唯一為文件產生檔尚未重建與新版reference不同；正常npm run build產生文件後，B-doc-sync重跑該案例及P0-D DOM。未反覆重跑未受影響案例。
語法node --check；完整build、22資產Worker ESM通過（B-build.txt）。每命令逾時30～60秒，無依賴安裝／預覽伺服器。

## 待驗與限制

JSDOM驗證的是實際Player DOM／計時狀態，不是瀏覽器動畫視覺通過。沒有真實瀏覽器工具；人工需至少A/B同位置、五種退場、等待／並行、選單暫停、反覆登退場、存讀／跨場景／手機。
R2-C～I尚未完成，不具備r2發布門檻。正式站維持0.40.11／Sites53。下一包流程圖模型排列與連線。
