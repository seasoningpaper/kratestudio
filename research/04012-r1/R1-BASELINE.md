# R1 原始碼與GUI凍結基準

工作區乾淨，最新f9169682dc2283a1513d9b43d4945fe54fbe2f1c；Sites原生確認正式57／0.40.11_r4／public／原網址。已用既有Sites來源流程開啟，未退回舊程式。

修改前完整來源Koi-Maker-before-0.40.12_r1-f916968.zip及tag checkpoint-04012-r1-before已保存。GUI-BASELINE.json保存HTML、CSS、主題、Logo、儲存及鎖檔SHA；DOM-BASELINE.json保存既有Header品牌入口、六分類與工作區工具列。新增功能只容許必要的工具箱條目與局部欄位，不修改CSS或頁面布局。

240FPS錄影未提供，尚不能確認使用者影格。先以真實bundle的DOM Commit測試重現首幀狀態，再做模型／非同步生命週期回歸。既有受支援預覽環境限制保留；未執行真實瀏覽器截圖／高刷／觸控驗收，不用DOM或CSS比較冒充視覺通過。

本輪依R2→R3→R4→R5→R6→R7→R8單包推進；每包有逾時、失敗最多兩輪，完成即保存檢查點。大功能若無法安全完成列待辦，沒有空白按鈕或功能刪除。
