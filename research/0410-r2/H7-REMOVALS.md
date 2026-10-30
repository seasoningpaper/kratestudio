# H7 指定功能移除

- 移除批次修復素材引用的 AssetRepair UI、匯入與檔案；保留一般引用追蹤、查看引用、刪除引用防護及舊資料。純資料修復函式仍有歷史測試／用途，未因 UI 移除刪除。
- 移除編輯器預聽和弦入口、翻譯、AudioContext、合成器與自動播放觸發。遊戲播放器既有 MusicMixer／SoundTracks、普通 AudioPlayer 及素材試聽維持原樣。
- 首次新增移除測試錯用不存在的 AudioManager 名稱；修正為實際既有 MusicMixer，未改動播放器或測試對行為的要求。重跑結果見 H7-tests.log。
- npm test 改用 r2 GUI 契約，舊 0.41.0 視覺／版本斷言留存歷史檔案；引擎及資料安全測試不刪除。
