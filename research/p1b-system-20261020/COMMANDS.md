# 本輪實際命令與紀錄

所有命令於既有專案執行；不安裝依賴、不啟動開發伺服器。以下為最後通過的受影響範圍，不是全套無差別測試。

| 實際命令（省略輸出重導向） | timeout | 結果／紀錄 |
|---|---:|---|
| node --test --test-concurrency=1 tests/actor-isolation.test.mjs tests/actor-isolation-dom.test.mjs tests/version4010.test.mjs | 45s | 22/22，actor-final-regression.txt |
| node --test --test-name-pattern='simultaneous' tests/actor-isolation.test.mjs | 20s | 1/1，multi-actor-final.txt |
| node --test --test-concurrency=1 tests/engine.test.mjs tests/visual-state.test.mjs tests/event-order.test.mjs tests/audio-code-r3.test.mjs | 60s | 19/19，runtime-script-regression.txt |
| node --test --test-concurrency=1 tests/p1a-backgrounds.test.mjs tests/p1b-block-audio.test.mjs tests/p1b-gallery-audio.test.mjs | 60s | 26/26，background-audio-regression.txt |
| node --test --test-concurrency=1 --test-name-pattern='legacy Base64\|many images beyond\|transaction failures\|font files' tests/storage.test.mjs | 45s | 4/4，storage-regression.txt（正規表示式實際使用未跳脫的縱線） |
| node --test --test-concurrency=1 tests/import-package.test.mjs tests/player.test.mjs | 45s | 11/11，player-package-regression.txt |
| node --test --test-concurrency=1 tests/p0d-model.test.mjs tests/p0d-dom.test.mjs tests/flow-render.test.mjs | 60s | 20/20，editor-sync-regression.txt |
| node --test --test-concurrency=1 tests/version408.test.mjs tests/design-data.test.mjs | 45s | 16/16，authoring-variables-regression.txt |
| npm run build | 60s | 初次編譯成功但產物比對抓到CSS遺失；修復後build-fixed.txt成功 |
| node scripts/build-worker.mjs；node scripts/validate-worker.mjs | 30s／20s | 版本文字更新後成功，release-worker-build.txt |
| node --check（8個變更的JS/MJS檔）＋本機Worker fetch比對 | 20s | syntax-worker-checks.txt |
| CSS／HTML／圖示／音效／設計文件雜湊與內容比較、產生器冪等驗證 | 有界單次 | gui-build-integrity.txt；只新增CSS範圍註解及r52文字 |
| git diff --check | 單次 | 通過 |

實際未修復前失敗紀錄保留：actor-reproduction.txt（6項）、event-identity-reproduction.txt（1項）。event-identity-fixed.txt的刪除測試因未等待非同步確認而失敗，補上await後event-identity-fixed2.txt通過。修復期間另由motion-hide-reproduction.txt、legacy-slots-reproduction.txt抓到兩個回歸，已由actor-final-regression.txt驗證修復。build-css-reproduction.diff保留產生器造成的樣式遺失證據。

最終119個不重複案例通過；歷史失敗不抹除，也不混算為最終失敗。詳細案例名稱在TEST-INDEX.json。大型512MiB/2GiB儲存壓力測試未跑；DOM／音訊stub的結果不等同於真實瀏覽器視覺或聽感。
