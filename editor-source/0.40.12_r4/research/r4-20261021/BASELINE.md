# r4 修改前基準

接續乾淨的 9af300c79cab5eedc9b0e337b56b430d586756e1，沒有較新工作區修改。已建立 checkpoint-r4-before-20261021 及 Koi-Maker-before-r4-9af300c.zip。正式站維持 Sites56／03b922c，原網址與公開權限不變。

已取得兩份相同的 513 事件原始 KOI Script，以及使用者提供的動畫目標修正版與修復說明；尚無完整含章節、互動定義及素材的 JSON 專案。原始副本 SHA256：519bb40adf695026c4e9207af268acefa2e272480b6d9289f8c60f79e531a153；修正版：24eb8accec427c9dd99e269df8fec7c0487d4697f079820c1e9da39eb3aaef6d。另一份 198753 bytes 的文字是 HTML，不能當作專案 JSON。

原始事件第16筆（原 scriptLine19、ID214a3bc5-91c0-48af-abe4-097f6fb8e84c）target:null，前一筆已成功建立 fig-right。這是空目標資料，不是該位置無法解析。共20筆空目標；使用者修正版只修改這20筆的target，未替換為角色名稱。直接引擎播放修正版的初步路徑未出現角色目標錯誤；未藉此聲稱完整原專案已通過。

R4-H1 已重現：Player 複製狀態後等待慢速背景載入；其間並行退場完成，提交舊副本卻重新帶回角色。真實 Player bundle 的 JSDOM 測試 preload-before.tap 於「completed actor must stay removed after commit」失敗。不是瀏覽器視覺或實機測試。

測試有明確5秒／15秒逾時；原測試期望保留，修復後重跑。未安裝依賴、未改GUI或原始使用者劇本。
