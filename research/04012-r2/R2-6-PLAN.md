# R2-6：研究與有限擴充結論

COMPARISON.md／JSON 包含32項功能、17個產品／版本範圍、官方URL與限制。官方Ren’Py 8.5.4、Naninovel1.21、TyranoScriptV6及Twine2.12.1有頁面版本依據；其餘未顯示patch者不虛構版本。只使用官方／作者資料作技術判斷；讀不到或證據不完整列尚未驗證。比較不是全面競品實測，也沒有將未知算成完成率。

採用原則：保留Koi共同事件模型，Statement／Value 型別及序列化沿用現有資料；交易token不寫入專案。單一手勢和相容click拆分，沒有重新實作另一套Blockly。Blockly保存／載入與型別連接、Scratch Blocks堆疊和App Inventor Designer／Blocks分離作參考；未複製不相容原始碼或安裝新編輯器。

本輪實作限於A類穩定性與創作效率：新增交易防重入、區段所有權刪除、統一統計、清單密度與局部排列。圓角是驗證既有能力；不冒充新功能。B類背景轉場、完整值樹；C類5GB、EXE、Rollback、工程模式另列規格與前置，沒有塞入r2。

新增事件指令：無；KOI Script公開格式不變。說明頁及範本品牌修訂為r2，現有語法相容性另測。Windows路徑稽核發現generate-script-guide用URL.pathname作檔案路徑，會在Windows驅動器路徑前帶斜線；改用fileURLToPath，沒有更動解析器或輸出語意。
