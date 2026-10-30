# Koi 品牌平台先行版

範圍：公開官網、消息、作品操作示範、教學與原 0.40.12_r4 本機版入口。
未開放：Google 登入、私人雲端專案、5 GB、社群寫入、投稿發布、AI/Live2D。
平台身分能力：Sites 文件提供 ChatGPT 身分；指定 Google 登入尚待確認支援及配置，未自行替換身分系統。

原編輯器來自 3fa39c9a7e8c9f0bb27b26cb5c4c929ad385f4b6 的 dist，保存在 portal/legacy/dist。建置僅為 index.html 加 base URL，程式、樣式、素材保持逐位元相同。既有主線 r4 src 保留，品牌平台使用獨立 portal/build.mjs，不重新建置為新版編輯器。
使用相同 origin 與原 IndexedDB/localStorage 命名，不移除、不改名、不自動遷移。公開示範僅使用 koi-public-demo-v1 儲存鍵。
帳號路徑未啟用，伺服器導向登入狀態頁；API 回傳 503，不收集私人資料。local 是既有公開本機版的相容入口，並非登入帳號或雲端空間。

回退：部署原 Sites 61，saved version appgprj_6ad04b4f4db081918fe4a0e9d541130f~appgver_12f1906f9e988191beaa02938de23991。
前一部署 appgdep_6adebfafcecc8191be7ca0ab875060fd；public audience 保留。
Git checkpoint checkpoint/pre-koi-platform-20261026 -> 1689a0726728c9481adbe93fe37eeb73a00e44b5。

參考狀態：沿用上輪讀取之日系品牌資訊架構；本輪未宣稱完成 62 站視覺研究。主圖來自既有製作器示範素材，不搬用參考站美術。示範文字不含使用者私人故事。
