# KOI Maker 0.40.8 功能整合表

查閱日期：2026/10/17。官方／作者網站 50 個；公開介紹與文件查閱，非全部產品實機測試。功能參考不代表程式引擎合併，未實作項目明列如下。

| 功能 | KOI 實際內容 | 0.40.8 狀態 | 參考方向 |
|---|---|---|---|
| 影片與開場 | MP4／WebM／OGV／MOV 匯入；開場 Logo／影片排序、秒數、略過；首頁循環影片；劇情影片事件 | 已具備；解碼依瀏覽器支援 | KOI 原生功能 |
| 平面提示視窗 | 固定標題與 SVG 關閉鍵，內容獨立捲動，取消不修改資料 | 0.40.8 修正 | KOI 原生功能 |
| 專案管理 | 新增、改名、複製、刪除、切換獨立專案 | 0.40.8 已補齊 | TyranoBuilder／GB Studio／LDtk |
| 多劇情腳本 | 新增、重新命名、刪除、章節工作分頁 | 已具備 | Ren’Py／ink／Yarn Spinner |
| 工具與側欄 | 專案工具共用一頁；圖片編輯可另開；左右側欄及流程概覽可獨立收合 | 0.40.8 修正 | 編輯工作流程整合 |
| 分頁操作 | 拖動捲動；長按分頁後拖移排序 | 0.40.8 補齊 | 編輯工作流程整合 |
| 純文字匯入 | KOI 語法表、TXT／KOI 檔、部分舊指令、缺失行號 | 已具備；非完整其他引擎相容 | Ren’Py／ink／Tuesday JS |
| 變數資料庫 | 數值、文字、布林，新增／改名／刪除同步引用 | 已具備 | TyranoBuilder／Naninovel |
| 匯入新變數 | 自動註冊引用名稱與類型；保留原有初始值 | 0.40.8 修正預設選項誤導 | TyranoBuilder／Naninovel／WebGAL 文件 |
| 分支條件 | 選項、條件、跳轉、跨腳本目的地、迴圈保護 | 已具備 | Twine／ink／Yarn Spinner |
| 流程圖 | 拉線、斷線、卡片新增／刪除／複製、復原 | 已具備 | Tuesday JS／articy:draft／Arcweave |
| 流程圖視野 | 100% 起始、每格 5% 縮放、觸控平移與縮圖 | 已具備 | Tuesday JS／Arcweave |
| 匯入節點座標 | 回跳分支不推走前段節點；收合移除自動座標空洞 | 0.40.8 修正 | KOI 匯入回歸案例 |
| 區段與大量事件 | 自訂區段、超過 10 個事件收合、框選批次操作 | 已具備 | articy:draft／Arcweave |
| 事件排序 | 桌面拖曳區域、手機長按排序、上下移動 | 已具備 | TyranoBuilder／Tuesday JS |
| 素材管理 | 圖片、音訊、字體；資料夾辨識、引用檢查、刪除確認 | 已具備 | TyranoBuilder／VN Maker／OpenFL |
| 圖片與立繪 | 背景與立繪分軌；左中右與九點定位；縮放、鏡像、偏移 | 已具備 | TyranoBuilder／VN Maker |
| 圖片編輯 | 獨立分頁調整圖片並更新既有引用 | 已具備 | Pencil2D／Aseprite 的素材工作流程 |
| 動作演出 | 內建進出場、淡入淡出、搖晃、縮放、秒數與循環 | 已具備；非骨架動畫 | TyranoBuilder／Tuesday JS |
| 等待事件 | 只計時；不顯示編輯器的等待秒數說明 | 0.40.8 修正 | Ren’Py／TyranoBuilder |
| 遊戲介面設計 | 六種主題、六種對話框、六種名稱樣式；按鈕位置、圖片、字體與懸停 | 0.40.8 已補齊 | Ren’Py／TyranoBuilder |
| 雙版面 | 手機與電腦獨立畫面配置；預覽可切換 | 已具備 | Tuesday JS／Monogatari |
| 閱讀功能 | 打字機、歷史、自動、已讀快轉、回溯、隱藏介面 | 已具備 | Ren’Py／Naninovel |
| 存檔容量 | 每頁 3×3、預設 12 頁、可增至 50 頁／450 格 | 0.40.8 新增 | Ren’Py 可調整存檔列與行 |
| 存檔操作 | 覆蓋確認、刪除確認、命名、自動存檔、快速存讀 | 0.40.8 補齊；保留舊格位 | Ren’Py／Naninovel |
| 首頁演出 | 背景動畫、秒數、首頁配樂、進入音效、遊戲音樂切換 | 已具備 | TyranoBuilder／VN Maker |
| 聲音 | 背景配樂、音效、語音與分組音量、語音完成後自動前進 | 已具備；尚無完整混音時間軸 | VN Maker／Naninovel |
| 鑑賞收集 | CG、音樂解鎖、結局收集 | 已具備 | TyranoBuilder／Ren’Py |
| 小遊戲 | 限時點擊、記憶配對、自訂隔離 HTML／JS 回傳分數 | 已具備 | Tuesday JS／Twine |
| 自訂遊戲畫面 | 滿遊戲畫布，不向玩家顯示 HTML／JS 技術標題 | 0.40.8 修正 | Tuesday JS／Monogatari |
| 資料表 | 視覺欄列與有限 SQL 語法，同步變數與文字插值 | 已具備；不是完整 SQL 伺服器 | articy:draft 的集中資料管理概念 |
| 劇本檢查 | 失效連線、圖片、語音、變數、型別、秒數與空白對話 | 0.40.8 擴充 | Yarn Spinner／Ren’Py 的檢查工作流程 |
| 匯出與發布 | 獨立 HTML 與網站 ZIP，匯出後共用同一播放器 | 已具備；不等於原生 App 封裝 | Twine／TyranoBuilder |
| 儲存空間 | 單一專案上限 2048 MiB，瀏覽器裝置內 IndexedDB | 已具備；實際可用量依裝置額度 | 瀏覽器素材管理 |
| 骨架角色動畫 | Live2D、Spine 模型與口型同步 | 尚未實作 | Live2D／Spine／VN Maker |
| 3D 與完整 RPG | 3D 場景、材質、物理、背包、戰鬥、任務與地圖編輯器 | 尚未實作 | Unity／Godot／Unreal／RPG Maker／Tiled／LDtk |
| 多語系製作 | 翻譯工作表、CSV 往返、語系資源包 | 尚未實作 | VN Maker／Yarn Spinner／articy:draft |
| 協作與雲端 | 多人同時編輯、分支合併、跨裝置雲端存檔 | 尚未實作 | Arcweave／articy:draft／Flax |
| 專業音訊製作 | 多軌混音、音效剪輯、完整自適應音樂系統 | 尚未實作；可匯入外部製作音檔 | Audacity 等素材製作工具 |
| 跨平台安裝包 | Windows／macOS／iOS／Android 原生安裝包與商店建置 | 尚未實作；目前為網頁輸出 | Ren’Py／Unity／Defold／OpenFL |

## 官方來源

1. [Ren’Py](https://www.renpy.org/)
2. [TyranoBuilder](https://tyranobuilder.com/)
3. [Tuesday JS](https://kirill-live.itch.io/tuesday-js)
4. [Naninovel](https://naninovel.com/)
5. [Unity](https://unity.com/)
6. [Godot](https://godotengine.org/)
7. [GDevelop](https://gdevelop.io/)
8. [Construct](https://www.construct.net/)
9. [GameMaker](https://gamemaker.io/)
10. [Twine](https://twinery.org/)
11. [ink](https://www.inklestudios.com/ink/)
12. [Yarn Spinner](https://yarnspinner.dev/)
13. [articy:draft](https://www.articy.com/)
14. [Arcweave](https://arcweave.com/)
15. [Monogatari](https://monogatari.io/)
16. [VN Maker](https://visualnovelmaker.com/)
17. [RPG Maker](https://www.rpgmakerweb.com/)
18. [Defold](https://defold.com/)
19. [Cocos](https://www.cocos.com/)
20. [PixiJS](https://pixijs.com/)
21. [Babylon.js](https://www.babylonjs.com/)
22. [PlayCanvas](https://playcanvas.com/)
23. [Three.js](https://threejs.org/)
24. [Bitsy](https://make.bitsy.org/)
25. [GB Studio](https://www.gbstudio.dev/)
26. [Solar2D](https://solar2d.com/)
27. [LÖVE](https://love2d.org/)
28. [HaxeFlixel](https://haxeflixel.com/)
29. [OpenFL](https://www.openfl.org/)
30. [Heaps](https://heaps.io/)
31. [WOLF RPG Editor](https://silversecond.com/WolfRPGEditor/)
32. [ティラノスクリプト](https://tyrano.jp/)
33. [Pencil2D](https://www.pencil2d.org/)
34. [Live2D](https://www.live2d.com/)
35. [Spine](https://esotericsoftware.com/)
36. [Audacity](https://www.audacityteam.org/)
37. [Tiled](https://www.mapeditor.org/)
38. [LDtk](https://ldtk.io/)
39. [Aseprite](https://www.aseprite.org/)
40. [Unreal Engine](https://www.unrealengine.com/en-US)
41. [Bevy](https://bevy.org/)
42. [Flax](https://flaxengine.com/)
43. [Stride](https://www.stride3d.net/)
44. [raylib](https://www.raylib.com/)
45. [libGDX](https://libgdx.com/)
46. [Adventure Creator](https://adventurecreator.org/)
47. [microStudio](https://microstudio.dev/)
48. [Ct.js](https://ctjs.rocks/)
49. [Castle Game Engine](https://castle-engine.io/)
50. [OHRRPGCE](https://rpg.hamsterrepublic.com/ohrrpgce/)
