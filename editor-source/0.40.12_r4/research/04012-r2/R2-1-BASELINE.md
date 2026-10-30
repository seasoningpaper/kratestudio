# R2-1：來源、備份與重現基準（2026-10-22，台灣）

最新可取得來源 136a54067a7fb9a6fe837e207d95840a46c072d8；開始時 Git 乾淨。保留 npm 鎖檔、本機 HTTP 與 Windows 文件，不以 73931c8 覆蓋。

Sites 原生 get_site 確認既有 project_id、public／active、latest58、0.40.12_r1 與原網址。發布執行來源 2d4ee8a；本輪尚未發布。修改前完整 ZIP：Koi-Maker-before-0.40.12_r2-136a540.zip；tag before-04012-r2-136a540。

## 可重現問題

- High：一次已完成工具箱拖曳，接續延遲相容 click（測試將時鐘前移 5 秒）後，450ms 抑制失效；原 3 個事件變成 6 個，而應只有 4 個。第二個 click 不是新的 pointerdown。這是可產生三個獨立新增事件的程式路徑，不代表已於實機重現使用者同一手勢時序。
- High：pointercancel 後 click 路徑仍可新增；取消不能新增的條件失敗。
- repeat 本來就建立 repeat／wait／repeatEnd 三筆合法子結構，不能將其當成三次獨立新增而刪掉必要節點。
- 事件統計：summary 排除 section，footer 直接加總陣列（含 section、全部章節）；來源與範圍不同，待採共同統計與明確範圍診斷，不能捏造一致數字。
- 容量：真實應用程式上限仍為 2 GiB，尚未驗證 5 GB。禁止只改顯示或常數就宣稱支援。

## 瀏覽器與 GUI 基準限制

本輪可使用 CUA，且遵循 managed Sites preview。首次啟動因本機腳本拒絕 supervisor 的 --host／--strictPort 失敗；已僅修正開發啟動參數，相同問題只修一次後成功。預設仍只綁 127.0.0.1。

受支援 HTTP 預覽 terminal.local 中 crypto.randomUUID 不存在，現有 app.js 在 defaults() 初始化失敗。正式 HTTPS 與 127.0.0.1 的安全環境不同，不能推論正式站無法啟動。依 Sites troubleshooting，不修改正常應用程式或另起瀏覽器來補償環境限制。

因此沒有有效的事件／積木 GUI 截圖基準，局部平面化／排版修改先保持未執行；不把空白工作區當作視覺驗收。仍可用實際 bundle 的 JSDOM／Pointer 模擬重現與修復資料邏輯。

原始失敗紀錄 palette-before.log 保留；後續必須通過對應重現與連接、ID、Undo／Redo、儲存等回歸後才能標記修復。
