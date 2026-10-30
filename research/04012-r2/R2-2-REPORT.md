# R2-2：工具箱新增交易與連接回歸

接續 R2-1 檢查點 cf06345；修改前來源 136a540 的完整 ZIP 與 tag 保留。

## 根因及修正

原本 paletteEnd 只用 Date.now()+450 抑制後續 click，取消路徑也未完整抑制相容 click。事件狀態沒有記錄「這一個手勢已提交／已取消」；延遲相容 click 因此可走新的 insert。未發現 React StrictMode 或重複監聽器造成三次新增的證據，不將推測當根因。

新增小型 block-insert-transaction.mjs：WeakSet 一次性 token 在資料變更前消耗，擋住重入及重播，且不持有專案、沒有無界交易紀錄。token 只存在記憶體，不寫入專案／KOI Script。BlocksEditor 以手勢標記取消、移動、點擊消耗；相容 click 不再依 450ms 判斷。獨立鍵盤新增與下一次 pointerdown 保持可用。pointer capture 結束時釋放，Escape／blur／失去 capture／雙指與錯誤 pointer 均保留取消語意。

主資料入口 onInsertBlock 先檢查原專案／章節身分，再套用同一交易 gate；原有 add／addRepeat、ID allocator、連接／斷開／排列及 Undo 歷史沿用。repeat 的 repeat、wait、repeatEnd 是一組合法容器內容，不刪除必要節點。

修改：src/block-insert-transaction.mjs、src/blocks-editor.jsx、src/workspace.jsx、dist/app.js；dist/workspace.js 為必要重建輸出。沒有更改 Logo、CSS、HTML、六分類、字型、配色或積木造型。

## 實測

- palette-before.log：兩個重現案例失敗，包含一次拖曳後產生三個新增事件。
- palette-after.log：原兩個案例首次修復後通過。
- R2-2-regression.log：44 項通過、0 失敗、0 跳過，14,007.98 ms；單檔 15 秒、整批 60 秒上限。
- 7 項新案例涵蓋取消、延遲 click、重複 pointerup、錯誤 pointer、快速三次拖曳、獨立鍵盤、普通 click、防重入、Undo 後重播、持久化、Escape／blur／lost capture／畫布外放開與 C 型容器所有權。
- 其餘直接回歸涵蓋唯一 ID、巢狀與獨立串、字串／數值值槽、拆分／重接、縮放吸附、400 次固定有限操作與既有 12 項手機 Pointer／模板測試。

這些是實際 bundle 的 JSDOM／Pointer 模擬與資料模型測試，不是實機觸控、像素視覺或聽感驗收。正式建置、Worker 與四模式整合將於後續打包前另行驗證。完整巢狀值樹與素材 reporter 等舊待辦不因本包通過而被標為完成。
