# R2-E 風險導向檢查

## Bug與根因

- Critical，新增實際重現：assertAssetIds允許不同種類共用ID（各類獨立儲存），但unlink與素材選取只用裸ID；刪audio/same時同時刪images/same、videos/same等，且清除不相關引用。E-id-reproduction.json保留原失敗。新增schema-aware asset-references訪問器共用引用警告／移除；references/unlink保留API名稱並支援optional type。舊唯一ID呼叫維持有效；跨種類重複的未指定種類刪除在修改前拒絕。UI單筆、批次、範圍、反選都使用暫時性的[種類,ID]選取鍵，不改專案ID／DB key／格式。指定刪音訊不清掉圖片／影片／字型與對話內容。
- Medium，P1-C遺留：music.stems.audio與camera.splitLeft/Right未納入references／unlink。訪問器補齊、分軌被移除時刪空分軌；字型引用警告也與原有字型清理一致。草稿source、故事target、文本不亂替換。
- Medium，P1-C遺留：MusicMixer主軌gain=1且loop=true；Engine未保留逐事件狀態、同檔新cue不觸發播放effect。Engine保存musicVolume/musicLoop/musicCue，Mixer套用並在明確新cue重開同檔；Player依cue與選項同步；內建鋼琴false只一輪旋律。無參數的bgm／音樂維持原實際循環行為，明確false開始生效；玩家音量乘上逐事件值；選單／鑑賞焦點仍沿用原系統，已結束非循環音訊不因恢復焦點重播。KOI Script文件同步。

## 實際測試

E-assets-1模型5/5；E-assets-dom 1/1；補儲存後E-storage-restore 1/1。E-music-1共11/11（4新增＋7既有音效腳本）；E-music-dom初次因測試偏好key少-prefs而期望gain錯，修正測試key後E-music-dom-2 1/1。控制計時驗證鋼琴只8音與逐cue gain，不是音訊聽感。
E-regression-1 27/27：既有鑑賞BGM焦點、積木解除音效、P1-C劇情與匯出。E-docs 2/2：新版reference資料與產生文件一致、音樂解析／重匯。E-build成功，22靜態資產Worker ESM有效。第一次bundle因重複import一次失敗，已移除重複import，後續建置恢復，沒有依賴安裝／無限重試。

## 模組風險範圍

四模式：B角色完整JSON重匯與P0-D DOM，C順序／參照映射與Undo；D模板位置／復原；E音訊、素材刪除及儲存回復。未改解析器API／專案schema／localStorage key。未套用草稿source不直接改字串，仍由既有衝突保護管理。其他P1-C已驗功能沿用原報告，不把未重跑的真人影片codec、天氣畫面、手機觸控標為本輪通過。不存在已知未解決Critical／High；新圖形／模板功能仍有各包列明限制與真人待驗。

## 人工

用副本匯入不同種類同ID舊專案，刪音訊確認圖片仍在、Undo後恢復；BGM兩事件設定25%非循環及80%循環、相同檔案重播；開CG／試聽／退出確認位置與音量；內建鋼琴非循環；手機聲音政策與真實媒體格式待驗。
