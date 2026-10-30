# KOI Maker 0.40.10 積木技術研究

本次僅研究積木技術，不執行 P2-A 的 15 款遊戲引擎競品矩陣，也不導入替代 UI／Blockly 引擎。查閱日期：2026/10/20。以下為官方文件與關鍵來源研究；沒有逐行審計所有專案，也沒有實機操作各歷史版本。

## 官方來源

- [Scratch Blocks](https://github.com/scratchfoundation/scratch-blocks)：現行 2.0 依賴 Blockly；不能把現行行為直接當成歷史 Scratch 3.0 的完整規格。
- [Scratch VM](https://github.com/scratchfoundation/scratch-vm)：AST 透過工作區事件維護，範例含 id、inputs、fields、next、parent。舊獨立庫已遷移至 scratch-editor。
- [Scratch GUI](https://github.com/scratchfoundation/scratch-gui)：編輯器與執行環境的整合參考。
- [Blockly](https://github.com/google/blockly)：官方連結現轉至 RaspberryPiFoundation/blockly。
- [Block 原始實作固定版本](https://github.com/RaspberryPiFoundation/blockly/blob/b2f4048aaf0abfa61db674830baa72a3ba29a365/packages/blockly/core/block.ts)：閱讀 unplug、unplugFromRow、unplugFromStack；一般斷開與補接上下方積木為不同操作。補接仍須通過相容性檢查。
- [Connection checks](https://docs.blockly.com/guides/create-custom-blocks/inputs/connection-checks/)：String、Number、Boolean 等型別檢查；周圍迴圈等上下文約束不能只靠兩端型別判斷。
- [Block API](https://docs.blockly.com/reference/classes/Block/)：previous／next／output 與 inputList 分工；surround parent 與直接 parent 不同。
- [儲存與載入](https://docs.blockly.com/guides/configure/serialization/)：工作區狀態序列化應由結構化資料驅動。
- [Text input fields](https://docs.blockly.com/guides/create-custom-blocks/fields/built-in-fields/text-input/)：值與欄位呈現分離，避免以顯示文字替代資料。
- [事件群組](https://docs.blockly.com/reference/namespaces/Events/functions/setGroup/)：多個相關事件應具有一致的操作群組。
- [BlockDrag](https://docs.blockly.com/reference/namespaces/Events/classes/BlockDrag/)：拖曳根與整個移動集合分離。
- [Code.org](https://github.com/code-dot-org/code-dot-org)／[歷史 Blockly fork](https://github.com/code-dot-org/blockly)：官方說明已遷回主線 Blockly；歷史 fork 的課程功能與積木數量限制不能當成通用操作要求。
- [MIT App Inventor](https://github.com/mit-cml/appinventor-sources)：README 說明使用帶修改的 Blockly 11。其客製依賴連結無法由本次工具讀取；未將其細部手勢當成已驗證事實。

僅參考架構與互動原則，沒有複製第三方原始碼或素材。Scratch VM／GUI 等授權與 Blockly 不同，未把它們直接打包至 KOI Maker。

## 15 項技術與 KOI 決策

| 技術 | 研究重點與本次選擇 |
|---|---|
| Connection model | 語句前後連接與值輸出分離。保留既有事件陣列推導語句關係；新增值插槽中介資料，不建立第二份事件樹。 |
| 上下堆疊 | 插入前先驗證結構，既有 transferStack 保留下游事件。 |
| 單一 detach | 以明確模式執行並補接原上下方；KOI 使用 Alt 拖曳或右鍵「拆開單一積木」。 |
| Sub-stack | 一般拖曳移動目前積木及下方同層語句；本次移除區段標記造成的意外截斷。 |
| 插入後重連 | 新串尾端接回原下游，避免先刪後補造成資料遺失。 |
| C 型容器 | 保護既有 repeat／repeatEnd 配對。條件／選項在 KOI 仍為跳轉目的地，不在本次改為新容器。 |
| Value／statement input | 新值積木只能進入已宣告的值插槽；不得吸附至語句連接點。 |
| String／Number／Boolean | 文字槽接字串及文字變數；count 僅接數字表達式；variable／condition value 延續既有值語義。布林值可進 value 槽。素材 dropdown／checkbox 不改為新插槽。 |
| 吸附預覽 | 語句沿用原高亮；值積木僅在合法槽高亮。放開時再以現有資料驗證。 |
| 型別／上下文 | 保留迴圈結構驗證；數字槽拒絕文字與布林值。沒有以外形相似代替型別檢查。 |
| AST／序列化 | e.text／e.name／e.value 等維持原引擎可讀值；blockInputs 保存值積木身分、原值、輸出。原 KOI 事件 JSON 可保留附加欄位。任意巢狀圖形運算樹尚未新增。 |
| Undo／交易 | 值移動、來源移除、目標更新在一次既有 snapshot 中完成；不重構全域歷史系統。 |
| 縮放／座標 | 使用既有世界座標與縮放；測量採 offsetHeight／scrollHeight 等未縮放 DOM 尺寸，吸附使用同一個重排結果。 |
| Pointer lifecycle | 沿用捕捉、取消、Escape、blur、模式切換清理；新值拖曳也走相同生命週期。 |
| 大量積木 | 沿用視窗裁切；只觀察目前渲染的欄位，不建立全工作區永久 DOM。測量相同時不更新 React state。 |

## 行為差異與一致規格

| 參考 | 可確認的差異／限制 | KOI 規格 |
|---|---|---|
| Scratch 2 | 本次未操作歷史 Flash 版本，無法驗證全部快捷鍵差異。 | 不混入未驗證的歷史手勢。 |
| Scratch 3／VM | 編輯器與執行 AST 分工；目前倉庫已演進。 | 保留編輯資料與播放器介面，不導入 VM。 |
| Blockly | unplug 的 healStack 選項明確區分單一補接與一般斷開。 | 一般拖下方子串；Alt／選單單獨抽出並補接。 |
| Code.org | 課程客製與歷史 fork 不代表主線通用行為。 | 不新增課程專用限制。 |
| App Inventor | 有客製 Blockly 依賴，未驗證細部手勢差異。 | 採 KOI 同一套手勢，無衝突的第二套模式。 |

所有斷開、插入、移動先驗證 ID、移動集合、迴圈配對、自連接；失敗時保留原資料。容器起訖須成組移動，不能抽出結尾而留下破損的迴圈。
