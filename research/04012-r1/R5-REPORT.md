# R5 控制、旗標與角色引用

新增三個Statement工具箱模板：重複直到條件成立、設定旗標、取消旗標。均產生既有repeat／repeatEnd或variable事件，不新增競爭AST。旗標與必要的布林變數在同一Undo交易建立；不覆寫原數值變數。

repeatMode:until才啟用新的until布林運算式；舊事件即使有同名未知until欄位也維持原次數語意。進入前／每次body完成後檢查；count作安全迭代上限，最高10000，既有單次settle 300步保護仍有效。條件不是布林、未知變數或用盡上限明確診斷，不建立無界工作執行緒。當body含互動，loopFrames照既有遊戲存檔還原。

新增角色引用Value：來自角色資料庫的穩定characterId，僅能接對話name。原生event.name仍保存可執行文字，KOI Script／舊模式可讀；blockInputs保留值積木ID／來源角色與fallback。中央角色重新命名會同步仍連結的名稱；直接編輯名稱轉為字串，尊重作者改動。刪除角色資料會診斷並保留原對話名，不把角色ID當素材或舞台目標。

新增入口只在既有六分類工具箱及repeat原欄位；沒有改CSS、工具箱尺寸、Header／Sidebar／Inspector骨架。角色值能拖入／拆除、Undo／Redo及IndexedDB還原。語法使用既有事件JSON，不新增虛假的中文指令。R5-final逐項測試及R7四模式／大專案回歸後才能判定發布；實體觸控與完整巢狀Value樹仍待驗／待開發。
