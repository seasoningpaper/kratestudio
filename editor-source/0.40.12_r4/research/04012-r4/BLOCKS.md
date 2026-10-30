# r4 積木根因與驗證

來源 e762fa6：自製 React DOM 積木、CSS 接合外形、HTML 欄位；未使用 Blockly。章節 events 為單一來源，blockDetached/blockStack 決定執行串與浮動串，repeat/repeatEnd.loopId 定義 statement input；結構由 block-integrity 衍生，拒絕不平衡或非連續搬移。

已證實 High：抽離浮動串的第一個積木時，transferStack 把剩餘成員的 blockPos 設回原根座標，造成剩餘串往上跳。修復採拖曳開始的實測 world anchors，剩餘根保留原位置；純模型呼叫使用共用 stackLayout 的幾何。右鍵拆除同樣沿用目前位置，取消交易不寫入。

影片1 約4–5秒：460→463事件，新增的是 repeat / wait / repeatEnd；不是證實一次生成三個獨立容器。既有交易 token 與相容 click 防重入保留，7項既有真實 bundle 事件回歸全通過。

已確認 Medium：C 容器只有縮排，沒有跨越 statement body 的連續側邊。新增由相同連接模型及實測 layout 計算的容器側邊，沿用既有顏色、接合頭尾、18px 內縮；父容器拖曳與取消涵蓋側邊。不是另一套持久化模型。

本包13項通過：7既有工具箱交易、1修復前確定失敗的剩餘位置案例、1/2/3層容器、實際 bundle Pointer 拆除/取消/Undo/Redo/IDB重載、容器跟隨與取消。日誌 blocks-before.log / blocks-after.log / blocks-regression.log。

限制：Pointer 測試使用 JSDOM 與明確 viewport 邊界，不是瀏覽器像素或實機觸控驗收。影片的其他移動／吸附路徑仍須原專案或相同真實瀏覽器操作確認；不能宣稱全部影片缺陷已修復。

追加影片末尾重現：刪除浮動串後，應用程式把 selected 夾到故事最後一事件，積木選取可見性效果便把視角從 translate(16px,16px) 拉至 translate(0px,-30974px)。500事件實際bundle Pointer垃圾桶案例修復前失敗，修復後保留原視角；只抑制該次刪除的自動定位，不改事件順序或故事位置。日誌 trash-before.log / blocks-final.log（14項通過，含既有7項）。
