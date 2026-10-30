# KOI Maker 0.40.10 r5：積木接回與順序一致性

維持既有平面 GUI，只修正拖曳／接合邏輯與開場排序箭頭。

## 修正原因

- 原接合判定只用了第一塊高度，向上接回時忽略整串尾端。
- 拖曳開始立刻選取積木，會改變展開高度與後續接點位置。
- 浮動積木用固定 66 像素位置排列，展開後互相覆蓋。
- 合併兩個浮動群組只更新搬動部分，留下兩套群組 ID。
- 主程式全數拆開後，沒有能接回的主程式起點。
- 右鍵接回直接修改啟用旗標，與拖曳重排不是同一套交易。
- 素材分類拖出新積木只會附加到末尾，沒有依吸附位置插入。
- 原生拖曳和 Pointer Events 同時存在，取消與模式切換可能留下狀態。

## 最終行為

接合計算使用整串首尾、固定拖曳快照，以及螢幕像素容許距離。主程式「當故事開始」可接回完整浮動串。有效接合先檢查，再一次更新共通事件順序、群組、啟用狀態、數字目的地與跨章節目的地；變更可用一次復原恢復。重複的起訖積木一起搬動，避免交錯配對。

浮動群組分拆／合併後使用一致根 ID；其排列使用實際累計高度，展開時不重疊。重新排列保持每串連接，不逐塊打散。右鍵接回可使用拆開時記錄的前後事件位置；若位置已被刪除則接到有效主程式末尾。

新積木拖曳亦使用接點候選與插入預覽。只允許運算積木進入 value／count 插槽，避免覆寫角色名或普通文字。Escape、指標取消、失去捕捉、離開視窗、切換模式與切換章節會清除暫存拖曳狀態；放到畫布之外不改變事件；放回分類區可刪除。

開場的上移／下移文字箭頭改為相同尺寸的 SVG，保留原標籤、停用邊界與排序行為。

## 開源參考與範圍

- Scratch 2 官方開源專案與 README：https://github.com/scratchfoundation/scratch-flash （歷史 ActionScript 版本，未直接移植程式碼。）
- Code.org 歷史 Blockly fork：https://github.com/code-dot-org/blockly （官方說明已停止作為現行依賴，僅作歷史參考。）
- MIT App Inventor 官方開源專案：https://github.com/mit-cml/appinventor-sources （使用修改版 Blockly。）
- Blockly 拖曳控制器官方文件：https://docs.blockly.com/guides/configure/dragging/dragger/
- Blockly 接合預覽官方文件：https://docs.blockly.com/guides/create-custom-blocks/inputs/connection-previews/
- Blockly Connection 官方 API：https://docs.blockly.com/reference/classes/Connection/

採用接點候選與合法性檢查、插入預覽、拖曳期間暫存幾何，以及放開後才提交的處理原則，並沿用 KOI 的事件資料及 GUI；沒有換掉整個編輯器或聲稱直接內嵌上述引擎。

## 驗證

涵蓋完整主串接回、浮動串合併／拆分、展開高度、縮放容許距離、右鍵還原位置、重複結構、無效連接、400 次固定亂數拆分／合併、跨章節選項目的地、滑鼠插入、取消拖曳、一次復原、重做、儲存重讀及章節切換。沒有支援的瀏覽器 QA，未驗證實機觸控手感或 FPS。
