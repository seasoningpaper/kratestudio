# P1-B 本輪修復報告（尚未發布）

起點：Sites 第 50 版 250bb445b657320765fc619fb2fb19e64ca9d1ed，保留 P1-A 19 項歷史測試與完整 ZIP。
正式站仍是第 49 版 525dd90（0.40.10_r49），本輪未呼叫部署，未重做 P0／P1-A 或擴充其他 P2 功能。
修改前 tag：checkpoint-04010-before-p1b-20261020；解除音效中途 checkpoint：6dbd0e5（checkpoint-04010-p1b-disconnect-20261020）。

## 根因、重現及修復

### 積木解除音效

舊 src/blocks-editor.jsx 在 gripEnd／pointerup 才呼叫 feedback(hit?'connect':'disconnect')，移動階段只改 DOM transform，故解除音效延遲，還會把整組已浮動積木的純移動當解除。
修復前兩個行為案例都得到 pointerup 前 disconnect 次數 0，原始記錄 block-reproduction.txt；初次測試 setup 未等待 React 進入積木模式的錯誤另保留於 block-baseline.txt。

新增 hasStackConnection，區分主串／起始帽連接、浮動串子串仍有的外部連接、整組浮動串已沒有外部連接。pointerdown 記住原狀態，在首次跨過既有 5px 語句拖曳門檻時播放解除音效；g.moved 旗標與 pointer ID 防止多次 move 或其他 pointer 重複播放。pointerup 只在成功吸附時播放連接音效。
這是拖曳期間的暫時視覺解除；正式事件資料仍在合法 drop 時一次提交，保持 Escape／cancel／外部 drop 可回復且 Undo 單一步驟，不在每個 move 寫入專案。
附著的值積木沿用原 8px 門檻，首次移離也播放一次；值解除按鈕與右鍵解除仍在成功操作時立即播放。工具箱新積木沒有舊連接，不播放解除。
原 block-audio.mjs、音效素材、音量 .35、blockSounds 設定、play() Promise catch 完全保留；沒有更換播放系統。

### 回憶鑑賞 BGM

舊 src/player.jsx 的 mixer 初始化、panel effect 及 unlockAudio 都用 panel==='gallery' 作為暫停條件。開啟單純 CG／結局列表也會 pause，不是播放器卸載。AudioPlayer 只有 onPlaying，沒有 pause／ended／error／unmount 的焦點釋放通知；停止鑑賞曲後 BGM 因 gallery 條件仍被暫停。合成 synth 不在 MusicMixer 內，也沒有一致的鑑賞焦點規則。
修復前「只開鑑賞仍持續播放」「暫停鑑賞曲恢復 BGM」兩案均重現失敗，見 gallery-reproduction.txt。

本輪規則：一般瀏覽不搶焦點；使用者主動播放鑑賞曲後，暫停原 BGM／合成器但保留同一音軌實體與 currentTime。鑑賞曲暫停、結束、錯誤或離開後釋放焦點；保留腳本 audioStop 所造成的無 BGM 狀態，不恢復被腳本停止的曲目。換鑑賞曲時先取得新擁有者，再暫停其他列，過時 pause 通知不得釋放新列焦點。瀏覽器拒絕／中斷 play 也會釋放已取得的焦點。
AudioPlayer 保留同一控制列，新增可選的播放狀態 callback；鑑賞曲音量為現有 master × music × 該列音量，遵守 muted。其他素材試聽預設外部增益為 1，原來互斥播放事件繼續使用。
目前 gallery 是 CG 圖片／音樂／結局清單，沒有獨立的劇情回放播放器。本輪不新增或假稱已有劇情回想模組。

### 指定文字

僅把 dist/index.html 側欄底部「KOI Maker　創作測試版」換成「KOI Maker  0.40.10_r50」。其餘 HTML、CSS、間距、版型、按鈕與積木 JSX 外型保持；0.41.11 只規劃，沒有升版或增加空白入口。

## 實際測試與紀錄

共 **17 個新增測試＋12 個必要回歸，29 項去重後通過**。不是重跑歷史 P0 全套；JSDOM／音訊 spy 不代表真實聲音／瀏覽器驗收。

| 指令（均有限 timeout） | 結果／紀錄 |
|---|---|
| timeout 20s node --test --test-concurrency=1 tests/p1b-block-audio.test.mjs（修復前 2 案） | 0/2，兩個預期行為均失敗；block-reproduction.txt |
| timeout 25s node --test --test-concurrency=1 tests/p1b-block-audio.test.mjs（當時 5 案） | 4 通過、1 測試 fixture 缺 editorSettings；block-complete.txt |
| timeout 20s node --test --test-name-pattern='P1-B muted feedback' tests/p1b-block-audio.test.mjs | fixture 初始化後 1/1；block-muted-retry1.txt |
| timeout 25s node --test --test-concurrency=1 --test-name-pattern='P1-B attached value|P1-B dragging a tail' tests/p1b-block-audio.test.mjs | 新增 2/2；block-values-and-tail.txt。以上為 7 個不同解除音效案例 |
| timeout 25s node --test --test-concurrency=1 tests/p1b-gallery-audio.test.mjs（修復前 2 案） | 0/2，gallery-reproduction.txt；修復後相同 2/2，gallery-fixed.txt |
| timeout 30s node --test --test-concurrency=1 tests/p1b-gallery-audio.test.mjs（最終 10 案） | 10/10；gallery-final.txt。早期新增焦點案例另見 gallery-focus-tests.txt |
| timeout 40s node --test --test-concurrency=1 --test-name-pattern='custom audio playback|music crossfade|stack detach/attach|r5 pointer cancellation|r6 Alt-drag|r6 right-click|autoplay rejection|returning to the same video' tests/interaction-upgrade.test.mjs tests/expanded-interactions.test.mjs tests/pro-revision.test.mjs tests/video-flat-ui.test.mjs | 選定 8/8；focused-regression.txt |
| timeout 35s node --test --test-concurrency=1 --test-name-pattern='player title|grouped settings|automatic advance waits|CG hides actors' tests/player.test.mjs | 選定 4/4；player-regression.txt |
| node --check（每個檔案 timeout 15 秒） | 7 個 .js／.mjs 通過；syntax.json；JSX 使用 esbuild 實際建置 |
| node scripts/bundle.mjs player workspace | 兩個受影響 bundle 建置通過，行為測試使用實際產物 |
| timeout 30s node scripts/build-worker.mjs；timeout 30s node scripts/validate-worker.mjs | 17 資產及 ESM default.fetch 通過；build.txt |
| timeout 20s Worker.fetch 模組 smoke | 6 資產與受測檔案逐位元一致；worker-fetch.txt |
| git diff --check；CSS／音效／P1-A／engine／storage 雜湊比較 | 通過，preservation.json；HTML 只有指定字串替換 |

同一問題沒有超過兩次修復重試；沒有套件安裝、預覽伺服器或替代瀏覽器搜尋。新增測試或新改動影響時才擴充驗證。

## 修改檔案

- src/stack-model.mjs：新增判定實際外部連接的 helper，未改 transferPlan／序列化。
- src/blocks-editor.jsx：語句／值積木拖曳首次解除時播放一次，避免 drop 再播放解除。
- src/audio-player.jsx：播放焦點通知、失敗釋放、增益乘上現有音量；HTML 外型維持。
- src/player.jsx：移除 panel 名稱直接暫停音樂，改用目前鑑賞曲擁有者；整合 synth。
- dist/index.html：指定側欄文字；dist/workspace.js、dist/player.js、dist/server/index.js、worker/index.js：對應產物。
- tests/p1b-block-audio.test.mjs、tests/p1b-gallery-audio.test.mjs：新回歸。
- research/p1b-20261020/*、PROGRESS.md：報告與原始紀錄。

## 未完成驗收／限制

- 真實瀏覽器立即聽感、第一次音效下載延遲、音訊解鎖、實機 Pointer capture／觸控與長音樂實際播放位置尚未驗。測試確認 play 呼叫在 move 當下發生，不承諾被瀏覽器拒絕時也聽得到。
- 正式站未更新，仍為第 49 版；第 50 版及 P1-A ZIP 保留。本輪只保存新開發版。
- 本輪只修指定兩個 P1-B 問題，不代表整個腳本／素材系統的 P1-B、全系統 P1-C 已完成。
- P0-C／P1-A 人工視覺驗收仍待辦，沒有改成通過。

## 人工驗收

先備份自己的專案，於開發版預覽／另行核准發布後用測試副本：
1. 主串積木及 Alt 抽單塊，按下不動應無聲；移出接點時、不放開滑鼠前應聽到一次解除聲，多次 move 不重複。重新吸附才有連接聲。
2. 已浮動的整串純移動不應有解除聲；從浮動串抽尾巴應有。取消後原事件與順序不變，工具箱新增不誤叫。
3. 關閉積木音效設定後完全靜音；開回後在正常互動再試，不清除本機資料或繞過瀏覽器音訊限制。
4. 播放首頁／劇情 BGM，開啟 CG／音樂鑑賞，應持續且不跳回開頭。播曲一後 BGM 暫停，改曲二不混播，暫停／結束／關閉鑑賞回到原 BGM 位置。
5. 測試 master、music、mute 與鑑賞列音量，並確認腳本明確停止 BGM 後不被鑑賞操作重新開啟。

工程模式設計與實作計畫另於下一步文件交付，本輪不實作大型模組。
