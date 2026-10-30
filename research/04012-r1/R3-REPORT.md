# R3 積木解除跳動

真實bundle的Pointer最小重現：Alt拖出B至可見工作區底緣，模型落點正確，放開後視窗由translate(16,16)改為translate(-600,-430)。根因是拖曳後選取B觸發既有自動定位，並且重排的FLIP會重播拖曳項目的舊螢幕位置。

修復僅src/blocks-editor.jsx：記錄這次Pointer提交的ID，跳過該項舊FLIP；此次拖曳提交的選取保留現有視野，鍵盤／其他選取仍使用原定位。frames依連接／落點重新同步，不新增CSS、不重新置中、不用新transform掩蓋座標錯誤。既有正常拖曳transform保留。

Connection Model沿用唯一stack-model／block-integrity：stackSpan決定單塊／子串／容器，transferStack檢查平衡／循環並重接，stackLayout及stackSnap共用同一workspace座標；值插槽仍用value-sockets與原生event欄位。沒有建立競爭資料來源或替換積木引擎。

R3-before.tap失敗；R3-after與R3-regression包括解除、重新接回、巢狀、取消、縮放、值積木、Undo／Redo及手機Pointer相關既有案例。實際測試數以去重索引為準；真人觸控與視覺尚未驗，不將測試rect當作實機。
