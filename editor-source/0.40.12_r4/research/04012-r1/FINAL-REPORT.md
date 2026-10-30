# Koi Maker 0.40.12_r1 驗收與交付

## 範圍與來源

接續f916968／正式Sites57 d855a55，保留全部r4修復與正式Logo。R1檢查工作區乾淨，修改前完整ZIP、tag checkpoint-04012-r1-before、GUI雜湊與DOM基準均已保存。未重建網站、未換框架、未安裝依賴、未修改正式使用者專案。

## 已確認Bug與修復

| 項目 | 根因 | 修復與證據 | 狀態 |
|---|---|---|---|
| R2打字機首提交／High | 新台詞Render沿用舊count，useEffect之後才歸零，短句會先全文出現 | 進度綁定事件／文字／字速／顯示偏好key；舊Timer不能污染新句。三字速DOM寫入順序前失敗後通過；無固定延遲或隱藏畫面 | 程式首提交缺陷已修復；240FPS真人待驗 |
| R3解除跳動／High | 拖曳提交後選取自動置中，並重播舊FLIP位置 | 保留該次Pointer落點與視野，跳過被拖積木的舊FLIP；其他選取／正常接合重排保留。未加CSS transform補丁 | 最小重現前失敗後通過 |
| 運算搜尋／Medium | 運算分類未使用search篩選 | 基本值與運算入口共同篩選；新preset查詢不存在label時不throw | DOM通過 |
| 角色引用診斷 | 新引用若來源ID重複不應任意選第一筆 | 嚴格唯一角色ID，改名同步連結，刪除／重複診斷並保留原名稱 | 測試通過 |
| 過場後舊景閃回／使用者回報待驗 | 未取得240FPS錄影；正常／慢速跨章DOM案例均未重現 | 沿用現有新素材就緒後才提交與generation保護，不任意重寫過場或清快取 | **沒有宣稱已修復** |

原始《青春校園戀愛日誌》20筆target:null仍保留診斷，沒有批次換成角色名稱。另附明確修正版的25出口／7結局維持回歸；缺完整JSON章節／互動／素材，不宣稱原專案完整播放通過。

## 實際新增積木與入口

| 功能 | 原生資料／執行 | 實際入口與限制 |
|---|---|---|
| 重複直到條件成立 | 既有repeat／repeatEnd，明確repeatMode:until；until必須Boolean，count為上限 | 控制工具箱；預設=true跳過body，作者需設定條件；最高10000及同步300步防護。含互動時loopFrames可存讀 |
| 設定旗標、取消旗標 | 既有variable/set/true或false；必要的新布林變數同一Undo交易 | 變數工具箱；不覆寫既有數值變數 |
| 角色引用Value | 穩定characterId與值積木ID在blockInputs；event.name仍為可執行文字 | 劇情工具箱的角色資料；只接對話name，文字仍用既有字串槽。刪除角色保留名稱並診斷 |
| ≥、≤、≠、abs、floor、ceil、sqrt、min、max | 使用既有安全expression語法與求值器 | 9個新增工具箱入口，**不是9個新runtime函式**；既有點選組合與拖曳方式保留 |

共3個Statement模板、1種角色Value及9個運算入口。沒有新增第二份事件來源、獨立VM或空白功能。舊repeat若只有同名未知until欄位，不會啟用新模式；未知資料維持。新until功能需要r1播放器，不能承諾舊播放器執行新模式；舊專案及舊語法不改義。

尚未新增：外部條件等待、完整子程序call／return、多重條件容器、隨機分支容器、執行一次專用積木、逐事件等待語音、清單、完整素材reporter及巢狀Value AST樹。既有畫面／聲音／變數與算術功能保留並做必要回歸，不重複宣稱本輪新增。無工程模式／Live2D／新UI框架。

## GUI凍結比較

- 全部既有CSS、Logo、主題、字型相關來源、HTML骨架、hosting、儲存及鎖檔維持基準；HTML只更改版本與cache query。
- 品牌入口、六分類順序／顏色、工作區工具列DOM嚴格逐字比較通過，沒有放寬測試。
- 曾抓到新preset自動帶進工具列下拉，已撤回，只保留工具箱入口；失敗紀錄R7-before-toolbar-rollback.tap保存。
- 授權的局部GUI：工具箱新條目、運算搜尋功能、僅新until模式顯示條件與安全上限欄位。沒有改工具箱寬度／位置、Header／Sidebar／Workspace／Inspector骨架、圓角、陰影或積木接合造型。
- 未執行修改前後真實瀏覽器截圖／像素比較。上述是來源／DOM證據，**不等同真人視覺通過**。

## 測試與容量

199個不重複自動化案例通過，逐例見TEST-INDEX.json；不把歷史138／173項累加。20個JS／MJS語法通過，JSX由esbuild驗證；完整正式建置成功，後續僅針對workspace／Worker重建；33個Worker資產逐位元組相同，local Worker根頁200、版本正確。

新until／旗標／角色引用／運算的50／300／500事件：模型約16.23／22.44／31.62ms；實際bundle DOM往返約826.13／1076.36／1396.59ms（包括測試等待，非實機FPS）。逐次比較全部JSON事件欄位（僅忽略診斷scriptLine）、ID、順序、分支、未知擴充、來源套用、Undo／Redo、IndexedDB及Engine變數／執行trace。原有50／300／500跨章、資源參照與未知欄位案例也通過；歷史metrics另存至本目錄，未覆寫舊紀錄。

包括嵌套／互動repeat、布林型別拒絕、上限診斷、存讀檔／rollback、flag Undo、role連接／拆除／資料改名／刪除／ID歧義、全部9運算結果、R3串接與字串數值插槽回歸、角色登退場／別名／舊存檔、解除音效、鑑賞BGM焦點、播放器、KOI Script原生／舊語法範本、素材缺失、專案首頁與草稿保護、12個手機Pointer／Touch自動化案例。使用隔離測試庫，未破壞正式專案；未跑512MiB／2GiB的大記憶體測試。

失敗處理：R2／R3原始程式失敗基準保留。R6首輪用錯接收變數型別且未選中變數，僅修正測試輸入與操作，期望結果不變；R7一次測試在Player尚未就緒點擊，改為有300ms上限的就緒條件，只重跑該檔。未加入應用程式延遲，也沒有改測試期望掩蓋Bug。同類失敗修復不超過兩輪。沒有無限安裝、壓力測試或重複伺服器。

## 檔案與檢查點

邏輯：src/player.jsx、blocks-editor.jsx、engine.mjs、block-model.mjs、stack-model.mjs、block-presets.mjs、value-sockets.mjs、value-binding-sync.mjs、validation.mjs、workspace.jsx、dist/app.js。版本／封裝：package.json、src/packaging.mjs、dist/index.html；文件generator與生成文件／bundle／Worker；tests/04012-*.mjs與本目錄測試紀錄。CSS、Parser、儲存格式及Key未更改。

- R1 be4bfb9：來源與GUI基準。
- R2 16f0213：首提交修補。
- R3 4f728a1：Pointer落點與FLIP修補。
- R4 d5a640b：官方盤點與取捨。
- R5 5d7b3b5、7227c72：有上限until、旗標與角色引用。
- R6 8a98e19：運算入口驗證；99ecc44是中間記錄，非發布穩定點。
- 最終R7／R8來源、完整ZIP、部署狀態與回復點見RELEASE。

## 人工待驗與接續

先備份並用副本：240FPS攝影與60／120／240Hz首幀；快進／自動／存讀後字元進度；過場舊景、連續過場及真實慢速素材；手機拖曳命中／縮放／取消；Logo首頁與未儲存保護；真人聽感、不同codec及任意舊專案。需要原始錄影與完整問題JSON，才能確認未重現的原回報。新功能可使用內建操作說明與koi-script-repeat-until-example.txt。

目前無已重現未修復的Critical／High；可以按使用者授權發布測試修訂版，但不宣稱全面真人驗收完成。下一輪依真人回報單包修補，再評估未實作項目；不自行重設計GUI。
