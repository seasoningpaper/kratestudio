# Koi Maker 0.40.11_r3 正式Logo整合報告

本輪沿用dfcbc25，版本名稱不升版，原站Sites55／1d7d0ce可回復；正式部署結果以RELEASE.json為準。本輪只改品牌影像、顯示、入口導覽及相關測試／建置產物。

## 原圖與處理

兩張上傳原圖2170×725、RGB，沒有alpha。原樣保存design/official-logo/originals/light.jpeg與dark.png，hash見ASSET-INSPECTION.json。內容範圍分別[419,202,1753,517]及[399,197,1787,530]；來源圖形比例略不同，不以拉伸或重繪偽造完全一致。已知黑／白底做局部邊緣unmatte，保留不透明內部RGB；輸出同1440×360透明畫布、圖形等比例縮放／置中，不改字體、圖形或調色。Pillow／numpy／scipy處理腳本可重現，無生成式影像。

透明PNG淺色193KB／深色162KB；所有角落alpha0，不透明內部改色像素0。原尺寸重新合成回來源底色，平均RGB誤差淺0.840、深0.356／255，99百分位誤差7；邊緣壓縮雜訊無法逐像素等同原JPEG，但保留原外觀。composite-proof.png實際檢視淺／深面板與白／黑底、大圖及146px縮圖，未見背景矩形；不是瀏覽器截圖。

Favicon只裁左側原圖形產生16／32透明PNG，apple-touch-icon180；三者皆實際HTML入口，沒有既有PWA，所以不產生未使用192／512。原assets/koi.svg保留舊路徑相容；目前品牌顯示只有導覽列，未在原本沒有Logo的關於／啟動／文件任意加圖。使用者遊戲開場Logo與作品內容不更動。

## 主題、版面與首頁

沿用原documentElement.dataset.editorTone與18個現有主題，不改theme.mjs／顏色。兩個PNG從起始HTML預載，CSS依既有tone選擇，無JS反覆改src；既有KoiReady載入專案主題後才顯示，避免預設淺色先閃出。brand.css只作用wordmark，明確中和舊的整張反白濾鏡，沒有對Logo使用反白或調色。原style.css／player.css與全部Header／media規則逐位元組未變；原標稱146×40盒子沿用，contain等比例無裁切。RESPONSIVE-CHECKS列出全部指定解析度與DPR約束，實體版面仍待驗。

目前Koi Maker沒有獨立的專案首頁路由／歡迎畫面；現有renderProjectHub是專案清單。本次Logo開啟並聚焦這個既有入口，沒有改成新頁面、重開空白專案或導向遊戲首頁編輯器。原生button支援Tab與Enter／Space，保留原選單鍵盤處理。清單已開啟時再點不重載、不切換、不收合。

尚未儲存、儲存中、失敗或未套用／衝突草稿，沿用KoiDialogs確認；取消原地保留，確認才開清單，導覽不寫入／覆蓋專案、不apply草稿。短時間多個click／Pointer只允許一個確認，待確認期間若專案已變更便取消。處理既有中英文儲存狀態，避免切換介面語言漏掉未儲保護。本輪新文字為繁體中文。

## 測試紀錄

14個不重複Logo資產／DOM／主題／導覽案例，另7個必要P0-D跨模式／草稿／儲存／history回歸，合計21，最終結果見TEST-INDEX.json。未重跑無關的歷史173項。所有測試有60或120秒timeout；初次兩個失敗是JSDOM無URL的相對src與單獨樣式inline/block斷言錯誤，修正測試後通過，LOGO-first保留。建置發現共享CSS會覆蓋直接編輯，因此以獨立brand.css處理並在完整建置後重新驗證，避免player.css改動。另補既有英文狀態保護及直接導航測試。

完整npm run build成功，最後app.js必要調整後重建Worker／ESM驗證；29靜態資產全量比對、root200、版本r3、路徑／圖示均通過。3個JS入口語法檢查通過。tests/official-logo.test.mjs涵蓋原圖hash、alpha與品質、允許範圍外HTML不變、共用CSS不變、18主題資產／原色、KoiReady、真實storage新document載入、取消／確認／草稿／失敗保護及核心原始檔逐位元組保護。

原Script／儲存keys／事件與素材ID／資料格式／播放器／積木／流程模型不改。既有七種視覺案例、88測試／10DOM歷史紀錄及視覺ZIP保留。

## 尚未驗證與發布

真實瀏覽器視覺、指定解析度畫面、實機觸控、鍵盤原生預設動作、初始網路載入閃爍與正式站圖示快取仍待人工；不以JSDOM或合成圖當作真人通過。已知前輪受支援內部預覽工具環境限制，沒有重試該失敗、安裝替代瀏覽器或繞路控制。系統主題跟隨目前不存在，列不適用。

本輪自動化範圍無未解決Critical／High，不涉及資料遷移。依使用者授權允許保留非阻斷真人視覺待驗部署原站。正式結果、來源、回復與ZIP見RELEASE，人工步驟見MANUAL-ACCEPTANCE。
