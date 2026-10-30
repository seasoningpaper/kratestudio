# P1-C1 功能盤點與基準

2026-10-20（台灣）由乾淨的c3e4de4接續；正式來源31b17bb，正式Sites第52版，公開權限與原網址不變。修改前tag checkpoint-04010-before-p1c-20261020。未安裝依賴、未啟動預覽伺服器或搜尋瀏覽器插件。

實際模型：30種事件、20種內建motion；src/event-catalog.mjs為編輯器事件分類、src/engine.mjs負責劇情狀態、src/visual-state.mjs與src/stage-layers.jsx負責視覺、src/player.jsx為正式播放器；src/program-sync.mjs維持事件為權威資料及草稿衝突保護；src/storage.mjs為IndexedDB素材與專案、localStorage保留玩家偏好與存檔；src/script-import.mjs解析KOI及舊語法，src/program-files.mjs以事件JSON序列化保留完整參數。

基準命令（45秒逾時）：node --test --test-concurrency=1 tests/engine.test.mjs tests/actor-isolation.test.mjs tests/p0d-model.test.mjs tests/audio-code-r3.test.mjs。
結果39/39通過，原始紀錄c1-baseline.txt；不把上輪119案例當成本輪已重跑。通過範圍為模型與轉換，無真人視覺／聽感／觸控。既有P0修復不重新開發，只選擇相關回歸。

待驗重點：原Engine.jump容許無效章節與索引回退，解析器空動畫目標可能回退lastActor，文件參數布林與時間單位、遺漏的事件JSON／程式設定語法、素材備份及有界容量。尚未重現者不先宣稱Bug；下一包建立失敗案例才修。

完整功能列項將持續更新至根目錄FEATURE-MATRIX.md，A只能代表該列列明的驗證範圍；未驗與缺少項目均不計完成，沒有整體產品完成率。
