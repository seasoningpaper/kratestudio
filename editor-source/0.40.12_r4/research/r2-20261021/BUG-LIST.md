# r2 Bug 清單與根因

|嚴重程度|重現／根因|最小修復|依據|
|---|---|---|---|
|Critical|圖片、音訊同ID；只勾音訊或刪音訊時裸ID同時刪其他種類|種類＋ID暫時選取鍵、typed references/unlink，歧義未指定拒絕；DB／ID不改|E-id-reproduction.json、r2-asset-safety／asset-dom、I-storage-2|
|High|A/B同位置；hide+slot刪掉兩者|精確ID／唯一位置解析，只移除指定實例|B-model原重現、r2-character與DOM|
|High|hide立即刪立繪、motionWait排除hide，退場動作沒有生命週期|退場動作、等待／並行Player計時、令牌防舊回呼、場景清理|B-model／DOM、I-exit-position|
|Medium|分軌／分割圖遺漏素材引用／刪除清理|schema訪問器共用警告與清理|E-assets、I-storage-2、G-reference-ui|
|Medium|BGM主軌gain=1／loop=true、同檔新cue不重播|Engine狀態＋Mixer／Player依cue套用，含鋼琴一輪與焦點保護|E-music、gallery原8項、E-regression|
|Medium|列表多選鍵只開flow/blocks，點選不傳修飾鍵；Flow多選拖曳只移一個|事件全選／多選／群組排序、Flow群組世界座標交易|C-dom、C-expansion|
|Medium|原排列用全域索引Y，Bezier沒有障礙檢查|有限分層、正交路徑、存pos且可Undo；故事不變|C-PERFORMANCE、C模型／DOM500|
|Medium|對齊包含locked/hidden；GameDesigner缺獨立Undo、UI鍵盤與群組移動|共用對齊幾何、參照、bounded history、群組位移；沿用模板|D-model／DOM／regression|
|相容性|undefined元資料在JSON歷史消失；新訪問器曾改舊refs計數／delete／未指定唯一ID語義|省略undefined狀態欄位；保留舊API計數與清理，fields提供明細|B-model-2、I-storage-2|

沒有已重現卻未處理Critical/High。未重現／未驗不宣稱已修。各包原始失敗日誌保留。流程圖11交點、任意手排重疊、局部模板父區限制、模型橋接與真人待驗仍在最終報告。
