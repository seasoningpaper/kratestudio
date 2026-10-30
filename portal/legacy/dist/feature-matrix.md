# Koi Maker 0.40.12_r4 公開測試修訂版 — 功能完整度矩陣

本公開測試版保留歷史功能清單；本輪積木位置、過場遮罩、唯讀除錯、容量整理與隔離實驗模式見[發布說明](04012-r4-release-notes.md)。一般寫入仍上限2 GiB；另建測試專案可啟用5GB實驗路徑，不宣稱瀏覽器4～5GB已驗證。作者可讀語法編輯器未完成。

本表以可稽核的功能列項為分母，不是整個產品完成率。A只表示該列模型／DOM／離線格式測試通過；真實視覺、聽感、觸控與大型實機情境另列F，不算完成。合成專案使用隔離測試庫；不修改使用者正式資料。

| 分類 | 定義 | 列項數 |
|---|---|---:|
| A | 已實作且已驗證（限列明範圍） | 100 |
| B | 已實作但部分情境失敗 | 0 |
| C | 有介面／指令但執行不完整 | 2 |
| D | 尚未實作 | 5 |
| E | 不適用 | 2 |
| F | 尚未確認 | 17 |

總列項：126。未知、未實作、不完整及不適用均不直接算完成，沒有任意產品完成百分比。每列ID固定，細分範圍與限制保留。

| ID | 功能 | 分類 | 原始碼 | 測試依據（含保留歷史結果） | 限制 | 嚴重程度 | 建議工作包 | 是否阻擋發布 |
|---|---|---|---|---|---|---|---|---|
| F001 | 角色對話與旁白 | A | src/script-import.mjs、src/player.jsx | tests/player.test.mjs；tests/p1c-script-reference.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F002 | 文字框顯示／隱藏 | A | src/visual-state.mjs、src/player.jsx | tests/version407.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F003 | 逐字打字機效果 | A | src/player.jsx | tests/player.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F004 | 字級／顏色／字型與粗體 | A | src/player.jsx、src/game-ui.mjs | tests/version407.test.mjs、tests/device-layouts.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F005 | 玩家輸入與名稱插值 | A | src/engine.mjs、src/variables.mjs | tests/engine.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F006 | 數字／布林／字串變數 | A | src/variables.mjs、src/expressions.mjs | tests/p1c-story.test.mjs、tests/version409.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F007 | 條件與嵌套分歧 | A | src/engine.mjs | tests/p1c-story.test.mjs：nested conditions | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F008 | 選項及分支後合流 | A | src/engine.mjs | tests/p1c-story.test.mjs：both choice routes | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F009 | 標籤／缺失標籤診斷 | A | src/script-import.mjs | tests/p1c-story.test.mjs：missing labels | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F010 | 同章與跨章跳轉／無效目的 | A | src/engine.mjs、src/chapter-links.mjs | tests/p1c-story.test.mjs、tests/interaction-upgrade.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F011 | 結束與多結局解鎖 | A | src/engine.mjs、src/player.jsx | tests/player.test.mjs、tests/p1c-script-reference.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F012 | 章節接續與迴圈停損 | A | src/chapter-links.mjs、src/engine.mjs | tests/engine.test.mjs、tests/interaction-upgrade.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F013 | 事件複製／刪除／排序及ID參照 | A | src/event-order.mjs、src/card-clipboard.mjs | tests/expanded-interactions.test.mjs、tests/p0d-model.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F014 | 未套用草稿衝突保護 | A | src/program-sync.mjs | tests/p0d-model.test.mjs、tests/p0d-dom.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F015 | Undo／Redo及跨模式一致性 | A | dist/app.js、src/program-sync.mjs | tests/p0d-dom.test.mjs、tests/actor-isolation-dom.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F016 | 程式／事件／積木／流程圖同步 | A | src/workspace.jsx、src/program-sync.mjs | tests/p0d-dom.test.mjs、tests/flow-render.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F017 | KOI事件JSON及全部30型別往返 | A | src/program-files.mjs | tests/p1c-script-reference.test.mjs：all 30 existing event types | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F018 | 重複積木及巢狀計數 | A | src/block-model.mjs、src/engine.mjs | tests/version409.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F019 | 程式設定／介面／功能畫面／模組檔 | A | src/program-files.mjs | tests/p1c-script-reference.test.mjs：program reference | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F020 | 立繪新增／隱藏／表情替換 | A | src/visual-state.mjs | tests/version407.test.mjs、tests/actor-isolation.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F021 | 左中右位置／自訂角色ID | A | src/placement.mjs、src/visual-state.mjs | tests/actor-isolation.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F022 | 多角色同時顯示與同ID替換 | A | src/visual-state.mjs | tests/actor-isolation.test.mjs：simultaneous A/B/C | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F023 | null／空白／消失目標與歧義診斷 | A | src/motion-state.mjs、src/engine.mjs | tests/p1c-story.test.mjs：targets | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F024 | 數字角色ID／位置別名／重排隔離 | A | src/motion-state.mjs、src/event-order.mjs | tests/actor-isolation.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F025 | 全部20動作的狀態與CSS映射 | A | src/game-ui.mjs、src/stage-layers.jsx | tests/actor-isolation.test.mjs：every existing motion | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F026 | 平移／旋轉／縮放與變形座標 | A | src/placement.mjs、src/script-import.mjs | tests/version407.test.mjs、tests/p1c-script-reference.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F027 | 動畫等待／並行／暫停恢復 | A | src/engine.mjs、src/player.jsx | tests/actor-isolation-dom.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F028 | 重複動作token及切景清理 | A | src/visual-state.mjs | tests/actor-isolation.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F029 | 鏡頭縮放／位置／跟隨／晃動／分割狀態 | A | src/visual-state.mjs、src/stage-layers.jsx | tests/expanded-interactions.test.mjs：camera, model, weather | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F030 | 天氣與濾鏡獨立軌 | A | src/stage-layers.jsx、src/visual-state.mjs | tests/expanded-interactions.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F031 | 淡幕與過場標題 | A | src/player.jsx | tests/version407.test.mjs、tests/video-flat-ui.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F032 | 一般畫面特效 | A | src/visual-state.mjs、dist/player.css | tests/version407.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F033 | CG顯示／恢復角色／鑑賞解鎖 | A | src/player.jsx、src/stage-layers.jsx | tests/player.test.mjs：CG hides actors | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F034 | 背景與角色／對話／操作UI圖層 | A | src/stage-layers.jsx、src/game-ui.mjs | tests/device-layouts.test.mjs、tests/player.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F035 | 16:9／4:3／9:16座標與版面 | A | src/game-ui.mjs、src/canvas-scale.mjs | tests/device-layouts.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F036 | BGM播放／停止／切換 | A | src/music-mixer.mjs、src/player.jsx | tests/audio-code-r3.test.mjs、tests/p1b-gallery-audio.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F037 | 音效／語音獨立生命週期 | A | src/sound-tracks.mjs | tests/audio-code-r3.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F038 | 指定音效／通道停止與無效通道保護 | A | src/engine.mjs | tests/audio-code-r3.test.mjs、tests/p1c-script-reference.test.mjs：audio stop | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F039 | 玩家主／音樂／音效／語音音量 | A | src/player-settings.jsx、src/player.jsx | tests/player.test.mjs、tests/p1b-gallery-audio.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F040 | BGM跨淡化與同步分軌 | A | src/music-mixer.mjs | tests/expanded-interactions.test.mjs：music crossfade | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F041 | CG／音樂鑑賞焦點及原位置恢復 | A | src/audio-player.jsx、src/player.jsx | tests/p1b-gallery-audio.test.mjs：10項 | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F042 | 積木真正解除立即一次音效 | A | src/blocks-editor.jsx、src/block-audio.mjs | tests/p1b-block-audio.test.mjs：7項 | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F043 | 拒播處理與試聽實例清理 | A | src/audio-player.jsx、src/sound-tracks.mjs | tests/p1b-gallery-audio.test.mjs、tests/interaction-upgrade.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F044 | 影片結束／略過／裁切與倍速 | A | src/media-video.jsx、src/player.jsx | tests/video-flat-ui.test.mjs、tests/version409.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F045 | 影片／開場切換的BGM生命週期 | A | src/player.jsx、src/opening-sequence.jsx | tests/video-flat-ui.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F046 | BGM逐事件volume／loop欄位 | A | src/engine.mjs、src/music-mixer.mjs、src/player.jsx | tests/r2-music.test.mjs、r2-music-dom.test.mjs、p1b-gallery-audio.test.mjs | 模型／控制計時與焦點通過；真實聽感、codec仍待驗；同src分軌沿用既有合併 | 無已知阻斷 | 人工音訊驗收 | 否 |
| F047 | 遊戲主畫面與開始／繼續 | A | src/player.jsx | tests/player.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F048 | 九格存讀檔／分頁／快存快讀 | A | src/save-browser.jsx、src/player.jsx | tests/player.test.mjs、tests/version408.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F049 | 設定與玩家偏好持久化 | A | src/player-settings.jsx | tests/player.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F050 | 對話歷史與回溯狀態 | A | src/player.jsx、src/engine.mjs | tests/player.test.mjs、tests/engine.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F051 | 對話框／姓名框／選項UI與模板 | A | src/game-ui.mjs、src/screen-layout.mjs | tests/design-data.test.mjs、tests/template-operations.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F052 | 手機／電腦獨立設定 | A | src/game-ui.mjs、src/screen-layout.mjs | tests/device-layouts.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F053 | 自動播放／快進／等待語音 | A | src/player.jsx | tests/player.test.mjs：automatic advance waits for voice | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F054 | 主畫面／場景／存讀設定背景選擇 | A | src/backgrounds.mjs、src/background-controls.jsx | tests/p1a-backgrounds.test.mjs：9項 | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F055 | 背景填滿／包含／位置／縮放 | A | src/backgrounds.mjs | tests/p1a-backgrounds.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F056 | 遊戲UI模板匯入／匯出與保留素材 | A | src/template-operations.mjs | tests/template-operations.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F057 | PNG/JPG／透明PNG原始bytes匯入 | A | src/storage.mjs | tests/p1c-assets.test.mjs：formats | ffprobe離線驗證；圖片decode與metadata是stub，透明視覺未驗 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F058 | MP3/WAV／MP4素材匯入路徑 | A | src/storage.mjs | tests/p1c-assets.test.mjs：formats | 真實小檔離線驗證及匯入bytes；瀏覽器播放另列F | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F059 | 空檔／不支援類型／尺寸0拒絕 | A | src/storage.mjs | tests/p1c-assets.test.mjs：formats | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F060 | 同檔名以完整路徑唯一配對 | A | src/script-import.mjs | tests/p1c-assets.test.mjs：references | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F061 | 重複／空ID拒絕且保留原儲存 | A | src/storage.mjs | tests/p1c-assets.test.mjs：duplicate storage IDs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F062 | 缺失素材與無效主要資源ID診斷 | A | src/script-import.mjs、src/validation.mjs | tests/p1c-assets.test.mjs、tests/version407.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F063 | 移除主要素材引用與保留原專案 | A | src/storage.mjs | tests/p1c-assets.test.mjs：references | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F064 | 無尺寸背景fallback | A | src/backgrounds.mjs | tests/p1a-backgrounds.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F065 | 舊Base64與字型資料遷移 | A | src/storage.mjs | tests/storage.test.mjs：legacy Base64、font files | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F066 | 交易失敗保留舊存檔 | A | src/storage.mjs | tests/storage.test.mjs：transaction failures | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F067 | 損壞玩家存檔原子拒絕 | A | src/engine.mjs | tests/p1c-story.test.mjs：save | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F068 | 多專案／跨章隔離 | A | src/storage.mjs、src/chapter-links.mjs | tests/version407.test.mjs、tests/version408.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F069 | 500事件／132素材存讀與備份還原 | A | src/storage.mjs、src/program-files.mjs | tests/p1c-assets.test.mjs；PRESSURE-500.json | Node＋fake-indexeddb，8.6MB；不是實機效能 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F070 | 有限1000事件編譯及唯一ID | A | src/program-files.mjs | tests/p1c-assets.test.mjs：pressure | 只跑一次編譯／ID；未測1000卡實機繪製 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F071 | 2GiB應用上限拒絕邏輯 | A | src/storage.mjs | tests/p1c-assets.test.mjs：capacity | 虛擬size測邏輯；真實2GiB容量未驗 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F072 | HTML5遊戲ZIP／素材完整性 | A | src/packaging.mjs | tests/import-package.test.mjs、tests/p1c-assets.test.mjs | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F073 | ZIP清理檔名碰撞不覆寫 | A | src/packaging.mjs | tests/p1c-assets.test.mjs：ZIP collisions | 模型／DOM範圍通過；真實裝置另列未確認項 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F074 | 次要素材引用移除：stems／分割圖 | A | src/asset-references.mjs、src/storage.mjs | tests/r2-asset-safety.test.mjs、r2-asset-dom.test.mjs | 已知schema主次引用一致；不解析未套用source或任意自訂payload | 無已知阻斷 | 後續schema加欄位時延伸訪問器 | 否 |
| F075 | 互動模組資料／分支執行 | A | src/activities.mjs、src/activity-player.jsx | tests/expanded-interactions.test.mjs | messages/sns/call/map/investigate/qte/rhythm有模型案例；實際全部操作未驗 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F076 | 小遊戲結果變數與沙盒 | A | src/minigames.mjs、src/player.jsx | tests/player.test.mjs、tests/engine.test.mjs | 只驗既有代表性模板，未逐一玩全部小遊戲 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F077 | 資料表／SQL與變數視覺編輯 | A | src/data-tables.jsx、src/variables.mjs | tests/design-data.test.mjs | 測原子變更與模型／DOM，不是外部SQL伺服器 | 無新已知阻斷 | P1-C 人工補驗 | 否 |
| F078 | 自帶HTML模型播放器橋接 | C | src/stage-layers.jsx、src/extensions.jsx | tests/expanded-interactions.test.mjs、原始碼橋接檢查 | 指令及iframe橋接存在；外部播放器內容未驗，非Live2D專用實作 | 待作者驗證 | P2-C 模型整合隔離 | 否 |
| F079 | callScene舊語法完整返回堆疊 | C | src/script-import.mjs | 原始碼與語法文件：明確不相容診斷 | 目前僅作跳轉，不提供call/return | 非阻斷：有診斷 | P2-C 調用堆疊設計 | 否 |
| F080 | 圖片編輯器完整操作 | F | src/image-editor.jsx | 本輪未完整操作 | 原始碼存在，不能以入口判定正常 | 待驗 | P1-C 後續代表性操作 | 否 |
| F081 | 音訊編輯器完整操作 | F | src/audio-editor.jsx | 本輪未完整操作 | 原始碼存在，不能以入口判定正常 | 待驗 | P1-C 後續代表性操作 | 否 |
| F082 | 全部範例專案逐一遊玩 | F | src/project-examples.mjs | 本輪未完整操作 | 原始碼存在，不能以入口判定正常 | 待驗 | P1-C 後續代表性操作 | 否 |
| F083 | 所有小遊戲逐一遊玩 | F | src/minigame-player.jsx、src/extra-minigames.jsx | 本輪未完整操作 | 原始碼存在，不能以入口判定正常 | 待驗 | P1-C 後續代表性操作 | 否 |
| F084 | 編輯器所有主題與語言完整文字 | F | src/i18n.mjs、src/editor-settings.jsx | 本輪未完整操作 | 原始碼存在，不能以入口判定正常 | 待驗 | P1-C 後續代表性操作 | 否 |
| F085 | 真實動畫／天氣／濾鏡視覺 | F | src/stage-layers.jsx | 未執行真人／長時間測試 | 有界自動化結果不能外推 | 待驗 | P1-C 人工與容量分批補驗 | 否 |
| F086 | 真實音訊聽感／瀏覽器音訊政策 | F | src/player.jsx | 未執行真人／長時間測試 | 有界自動化結果不能外推 | 待驗 | P1-C 人工與容量分批補驗 | 否 |
| F087 | 真實影片與各格式codec | F | src/media-video.jsx、src/storage.mjs | 未執行真人／長時間測試 | 有界自動化結果不能外推 | 待驗 | P1-C 人工與容量分批補驗 | 否 |
| F088 | 手機觸控／字型／RWD截圖 | F | src/blocks-editor.jsx、src/player.jsx | 未執行真人／長時間測試 | 有界自動化結果不能外推 | 待驗 | P1-C 人工與容量分批補驗 | 否 |
| F089 | P0-C保留7種真實視覺案例 | F | research/p0d-20261020、既有visual-acceptance.zip | 未執行真人／長時間測試 | 有界自動化結果不能外推 | 待驗 | P1-C 人工與容量分批補驗 | 否 |
| F090 | 任意真實舊版大型專案 | F | src/storage.mjs | 未執行真人／長時間測試 | 有界自動化結果不能外推 | 待驗 | P1-C 人工與容量分批補驗 | 否 |
| F091 | 512MiB／2GiB真實容量／quota | F | src/storage.mjs | 未執行真人／長時間測試 | 有界自動化結果不能外推 | 待驗 | P1-C 人工與容量分批補驗 | 否 |
| F092 | 長時間載入與記憶體洩漏 | F | src/storage.mjs、src/scene-assets.mjs | 未執行真人／長時間測試 | 有界自動化結果不能外推 | 待驗 | P1-C 人工與容量分批補驗 | 否 |
| F093 | 原生Live2D專用載入器 | D | 現有src未提供；工程模式只有design規格 | 原始碼盤點 | 不在本輪補齊 | 非現有功能故障 | P2-C 架構評估 | 否 |
| F094 | Spine專用載入器 | D | 現有src未提供；工程模式只有design規格 | 原始碼盤點 | 不在本輪補齊 | 非現有功能故障 | P2-C 架構評估 | 否 |
| F095 | 多軌async／await腳本 | D | 現有src未提供；工程模式只有design規格 | 原始碼盤點 | 不在本輪補齊 | 非現有功能故障 | P2-C 架構評估 | 否 |
| F096 | Windows／macOS原生EXE／安裝包 | D | 現有src未提供；工程模式只有design規格 | 原始碼盤點 | 不在本輪補齊 | 非現有功能故障 | P2-C 架構評估 | 否 |
| F097 | 0.41.11工程模式實作 | D | 現有src未提供；工程模式只有design規格 | 原始碼盤點 | 不在本輪補齊 | 非現有功能故障 | P2-C 架構評估 | 否 |
| F098 | RPG戰鬥／地圖引擎 | E | 不屬目前視覺小說定位 | 本輪不適用 | 不能以未實作這類功能扣除視覺小說品質 | 不適用 | 無 | 否 |
| F099 | 多人連線同步 | E | 不屬目前視覺小說定位 | 本輪不適用 | 不能以未實作這類功能扣除視覺小說品質 | 不適用 | 無 | 否 |
| R2-001 | 明確角色登場／退場與單目標清理 | A | src/visual-state.mjs、src/use-character-exits.jsx | tests/r2-character.test.mjs、r2-character-dom.test.mjs | 真人動畫外觀／觸控待驗 | 無已知阻斷 | 真人驗收／後續P2-C | 否 |
| R2-002 | 含循環的分層自排／正交路徑 | A | src/flow-layout.mjs | tests/r2-flow.test.mjs、r2-flow-capacity.test.mjs | 合成500事件0重疊／0穿卡片／11交點；手動任意重疊不保證 | 無已知阻斷 | 真人驗收／後續P2-C | 否 |
| R2-003 | 事件列表全選／多選／群組移動 | A | src/event-list.jsx、src/bulk-cards.mjs | tests/r2-flow-dom.test.mjs | 真人觸控待驗；非法重複積木組合拒絕 | 無已知阻斷 | 真人驗收／後續P2-C | 否 |
| R2-004 | 模板參照對齊與群組Undo／Redo | A | src/layout-tools.mjs、src/game-designer.jsx、src/menu-template-editor.jsx | tests/r2-alignment.test.mjs、r2-alignment-dom.test.mjs | 模板UI範圍；局部物件不能移出父內容；非立繪工程模式 | 無已知阻斷 | 真人驗收／後續P2-C | 否 |
| R2-005 | 跨種類同ID素材選取／刪除保護 | A | src/asset-references.mjs、src/asset-selection.mjs、src/project-tools.jsx | tests/r2-asset-safety.test.mjs、r2-asset-dom.test.mjs | 非指定type的歧義刪除拒絕；不改ID或DB schema | 無已知阻斷 | 真人驗收／後續P2-C | 否 |
| R2-006 | 可操作素材引用檢視 | A | src/project-tools.jsx、src/asset-references.mjs | tests/r2-reference-ui.test.mjs | 檢視目前 canonical schema；外部HTML／未套用草稿不推測引用 | 無已知阻斷 | 真人驗收／後續P2-C | 否 |
| R3-001 | 模板logical群組與可回復元件備份 | A | template-components／menu-template-editor | r3-components.test.mjs | 無巢狀group／群組整體resize；PlayerSettings內滑桿仍表單組件 | 非阻斷／真人待驗 | 後續修訂 | 否 |
| R3-002 | 50／300／500四模式語意往返 | A | program-sync／program-files／workspace | r3-sync.test.mjs | 代表性路徑，非窮舉；scriptLine診斷欄位正規化 | 非阻斷／真人待驗 | 後續修訂 | 否 |
| R3-003 | 跨章literal顯示文字取代 | A | story-search.mjs／jsx | r3-authoring.test.mjs | 保護插值／未知欄位／草稿；非regex／任意field取代 | 非阻斷／真人待驗 | 後續修訂 | 否 |
| R3-004 | 同種類批次素材引用修復 | A | asset-references／asset-repair | r3-authoring.test.mjs | 僅已知schema；不改未知extensions或備份原文 | 非阻斷／真人待驗 | 後續修訂 | 否 |
| R3-005 | 統一靜態診斷與動畫目標／次要素材 | A | validation／export-manager | r3-authoring.test.mjs | 非所有分支時序的執行驗證 | 非阻斷／真人待驗 | 後續修訂 | 否 |
| R4-01 | 慢速換場與並行退場狀態提交 | A | src/player.jsx、src/motion-state.mjs | r4-exit-preload／r4-exit-state；前失敗後通過 | JSDOM慢速圖片回呼；真人網路／畫面待驗 | 無已知阻斷 | 人工副本驗收 | 否 |
| R4-02 | 舊存檔預設位置與目標解析一致 | A | src/motion-state.mjs、src/placement.mjs | r4-legacy-target；前失敗後通過 | 無position依既有渲染規則為中；多角色仍拒絕猜測 | 無已知阻斷 | 人工副本驗收 | 否 |
| R4-03 | 空動畫目標屬性顯示忠實 | A | dist/app.js | r4-target-dom：null空白顯示、513事件往返 | 不自動修復null；新建事件既有預設不變 | 無已知阻斷 | 人工副本驗收 | 否 |
| R4-04 | 原始問題專案完整素材與互動播放 | F | src/engine.mjs、src/player.jsx | supplied-story-traces：僅513事件分支隔離；完整JSON未取得 | 25選項邊與7結局通過不代表原素材、互動與跨章metadata通過 | 未確認 | 人工副本驗收 | 否 |
| R1-01 | 打字機台詞首提交進度隔離 | A | src/player.jsx | 04012-player-frames（DOM寫入順序） | 原始240FPS錄影及實體刷新率待驗 | 無已知阻斷 | 真人回報／後續單包 | 否 |
| R1-02 | 積木放下位置與視野穩定 | A | src/blocks-editor.jsx | 04012-stack-stability、stack-reconnect | 測試rect與Pointer模擬；真人觸控待驗 | 無已知阻斷 | 真人回報／後續單包 | 否 |
| R1-03 | 有上限重複直到與布林旗標模板 | A | src/engine.mjs、src/block-presets.mjs | 04012-control、04012-sync 50/300/500 | 新until模式需r1；呼叫返回／條件等待未新增 | 無已知阻斷 | 真人回報／後續單包 | 否 |
| R1-04 | 角色引用值積木與可還原連接 | A | src/value-sockets.mjs、src/value-binding-sync.mjs | 04012-role、04012-sync | 只用於對話name；完整巢狀值樹與素材reporter未新增 | 無已知阻斷 | 真人回報／後續單包 | 否 |
| R1-05 | 九個安全運算入口與工具箱搜尋 | A | src/blocks-editor.jsx | 04012-operators | 沿用現有安全運算器，非九個全新runtime函式 | 無已知阻斷 | 真人回報／後續單包 | 否 |
| R1-06 | 使用者240FPS舊場景閃回回報 | F | src/player.jsx、src/stage-layers.jsx | 正常／慢速跨章DOM測試未重現 | 缺原始錄影；不是已修復宣告 | 待驗 | 真人回報／後續單包 | 否 |
| F121 | 工具箱單次手勢交易與取消防重入 | A | src/block-insert-transaction.mjs、src/blocks-editor.jsx、dist/app.js | tests/04012-r2-palette.test.mjs | 實際bundle／Pointer模擬；非實機觸控 | 無新已知阻斷 | 維護回歸 | 否 |
| F122 | 區段完整所有權刪除與跨容器邊界保護 | A | src/section-delete.mjs、dist/app.js | tests/04012-r2-editor.test.mjs | 確認後重新驗證範圍；跨區段容器須先整理 | 無新已知阻斷 | 維護回歸 | 否 |
| F123 | 四模式共用事件定義與本章／專案範圍 | A | src/sections.mjs、dist/app.js | tests/04012-r2-editor.test.mjs | section不計事件；repeatEnd仍計執行節點 | 無新已知阻斷 | 維護回歸 | 否 |
| F124 | 三種清單密度、分隔線與舊設定保存 | A | src/event-list.jsx、dist/editor-fixes.css | tests/04012-r2-layout.test.mjs | DOM／儲存驗證；像素另列F | 無新已知阻斷 | 維護回歸 | 否 |
| F125 | r2局部GUI各解析度／深淺色像素驗收 | F | dist/editor-fixes.css、dist/style.css | 正式58版前截圖；本輪後像素未執行 | HTTP預覽crypto環境限制，非真人通過 | 待驗／未啟用新容量 | r2人工補驗 | 否 |
| F126 | 5 GB實際配額／素材寫入與還原 | F | src/storage.mjs | 未執行大容量實機驗證 | 目前上限仍2GiB；不能把顯示換GB視為擴容 | 待驗／未啟用新容量 | 獨立大容量工作包 | 否 |

資料安全的已知Critical／High須修復才發布；F是真正尚未確認的情境，不應宣稱通過。真實大型舊專案與裝置quota沒有保證；目前沒有已重現卻未處理的阻斷性資料安全問題。P1-C兩項Medium已由R2-E修復；R2新增功能與真人限制分列，歷史P1-C記錄保留。

r2最新差異、測試、GUI及容量限制見research/04012-r2/；保留歷史列項不代表本輪全部重跑。官方參考、擷取限制與來源見research/p1c-20261020/OFFICIAL-REFERENCES.md；r3測試與新增限制見research/r3-20261021/；r2歷史見research/r2-20261021/；歷史P1-C測試仍於原目錄保留。
