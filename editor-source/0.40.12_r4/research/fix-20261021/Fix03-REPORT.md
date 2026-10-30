# Fix-03 漸進值模組範圍

保留既有主事件與blockInputs，擴充既有數字／布林值積木可接動畫時間、圖層、持續時間、音量、文字速度與等待／循環旗標。沿用相同child ID、獨立解除、父拖曳、history、storage與KOI Script JSON metadata；未新增事件指令或另一套AST。BlockExtras沿用主積木欄位renderer，避免兩套插槽規則。

引擎未使用eventValue的欄位只接受對應literal數字或布林值；不把字串、變數或未執行算式硬塞進Number／checkbox，也不改既有運算式在repeat／variable／condition的語意。動作／角色ID／素材仍使用原穩定欄位，完整巢狀運算樹與素材值模組尚未完成，這是漸進擴充而非全部Scratch功能完成。

新模組保留fallbackPresent，可辨識原欄位未設定；拆除／移動後回復undefined（JSON重載回到缺欄位），避免把原缺省800ms誤改為空字串／0。舊binding未記flag仍依原fallback還原，不改儲存key／專案格式版本。

Fix03-first11/11，補缺省回復後Fix03-final24/24（新4、P0C8、同步模型12）。含不合法連接原子拒絕、literal型別、獨立複製、完整script往返、Engine等待、DOM欄位、UndoRedo及IndexedDB。真人拖曳／觸控與畫面外觀待驗。Fix04尚需處理素材選項／目標診斷，Fix05 High單一刪除仍待修復，不發布本包。
