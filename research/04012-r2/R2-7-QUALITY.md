# R2-7：有限架構稽核與回歸

## 有證據的修正

| 嚴重程度 | 問題 | 根因／修正 | 證據 |
|---|---|---|---|
| High | 一次拖曳多次新增、取消仍新增 | 450ms時間猜測；改手勢狀態與資料入口WeakSet一次性交易 | palette-before、R2-2回歸、新預設測試 |
| High | 區段垃圾桶只移除標題，內容誤併到其他區段 | 一般事件刪除與區段所有權未區分；加入有範圍再驗證與容器邊界拒絕的刪除計畫 | editor-before／editor-final、既有刪除及四模式 |
| Medium | 統計定義／範圍不同 | 同一counts衍生本章／專案；不把section列入事件，明示兩種範圍 | editor測試 |
| Medium | 區段工具列可能換行 | 加入checkbox後原calc寬度未計算全部控制項；固定操作欄＋彈性標題 | GUI報告；真實像素待驗 |
| Medium | Windows文件建置路徑 | URL.pathname不能當Windows磁碟路徑；改fileURLToPath | build／syntax；Windows實機待驗 |
| Low／授權改善 | 頁籤寬度、選取線與清單密度 | 只改指定容器與原設定，保留主題／焦點／舊strong設定 | R2-4、r2保護契約 |

沒有為這些問題重新抽換編輯器、資料模型、UI框架或動畫引擎；沒有新增第二套解析器／事件資料。新模組只負責交易、刪除計畫、數值呈現，避免繼續增加大型共用元件。

## 相關品質檢查範圍

- 交易token為WeakSet弱引用，消耗發生在變更前；不產生序列化欄位／全域無界歷史。取消釋放capture，舊指標、重複up、相容click無重複提交。
- sectionDeletePlan使用既有sections與blockSpan；不做遞迴、不擴大刪除到不相關區段；確認期間範圍改變則中止。
- 統計使用共同事件陣列；未知深參數不改動；四模式以ID／型別／所有參數／執行trace比較。
- useEffect／測量／拖曳舊回歸執行未有反覆渲染或無限遞迴；不是對全產品記憶體洩漏的保證。
- 有限存儲測試驗證舊Base64搬移、交易失敗保留原資料、素材移除及字型／畫面參照。沒有配置512MiB／2GiB壓力資料，沒有5GB寫入宣稱。
- 根package直接依賴版本不變，沒有npm重裝；npm ci --dry-run --offline檢查最終鎖檔相容（pnpm工作區顯示同版本佈局變更預估），不冒充本輪重新完整安裝。上一輪乾淨npm ci結果保留。

## 測試記錄

TEST-INDEX.json：190項具名不重複通過（各log重複執行只算一次）；預設npm test 60通過，KOI Script相容42通過、有限存儲4通過等包含其中。

19項語法通過，JSX由esbuild驗證；正式build成功；Worker 34資產逐位元組比對及root200／r2通過。沒有未處理的最終失敗。原始重現與兩次不同測試fixture錯誤有原log，不刪除歷史失敗；後續同案例均已通過，沒有放寬功能斷言。

50／300／500四模式：保留所有參數（只排除定義可正規化scriptLine）、分支與資源參照、角色值／旗標／repeat-until，並比較Engine完整trace、Undo／Redo與IndexedDB。新數值檔在sync-new-*；舊r1原資料已還原，沒有覆寫歷史測量。

事件列表500／1000各一次有限測試，render／selection／move皆低於既有6秒閾值；新量測在list-capacity-*，不是瀏覽器FPS。語法範本兩路解析／往返／執行至結局及舊秒／毫秒相容通過。

## GUI與剩餘風險

r2 release測試由r1基準檢查Logo、品牌、主題、字型、六分類、玩家樣式與素材未變；主style.css只有選取2px改1px，editor-fixes原段完全保留；HTML骨架只版本／初始容量字串變更。新r2 APP-BASELINE保護已核准的當前來源，沒有把r1的整份來源凍結誤當作r2不能修程式。

Sites58既有正式前截圖保存；本輪受支援HTTP預覽缺少crypto.randomUUID，不繞過環境限制。新GUI像素、實機觸控／音訊、240FPS、Windows實機仍待人工。過場舊景閃回未重現，沒有藉由新增轉場把風險帶入。

待辦：5GB真實配額／串流與還原、Windows EXE、背景交叉淡化／遮幕與等待、完整巢狀值樹／素材reporter、完整Rollback／工程模式。未啟用高風險遷移，不阻擋本輪已驗證修補依使用者授權發布測試修訂版。
