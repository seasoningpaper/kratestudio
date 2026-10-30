# r4 完整應用程式隔離驗收

這是既有 Koi Maker 的測試環境，並非獨立展示網站。三份應用程式使用相同的代表性測試專案，但各自使用不同的 IndexedDB 與舊版儲存鍵；不刪除或遷移正式專案資料。

- r3 固定來源：`3f9d5d7`。
- 0.40.12_r4 固定來源：`3fa39c9`。
- r4：目前 checkout 的建置結果。

先確認 `dist/_qa` 不存在，執行 `npm run build`，再依序執行：

```sh
node qa/prepare-r4-preview.mjs --init
node scripts/build-worker.mjs
sites-preview start /workspace/sites/koimaker
```

開啟預覽的 `/_qa/index.html`。選擇版本與視窗尺寸後，透過完整應用程式操作各頁；「量測」會讀取實際 iframe viewport 的 DOM 幾何與字級。這些 viewport 尺寸測試不能代替 Chrome 瀏覽器縮放或系統字體縮放。

發布前必須移除產生的 `dist/_qa`，重新執行 `npm run build`。`validate-worker.mjs` 會拒絕含有測試目錄或測試 worker 的產物。不要將 QA worker 部署到正式站。

尚待補齊的真實瀏覽器驗收：Chrome 90%／125%／150%、系統字體縮放、滑鼠拖曳與連接、完整大尺寸視覺檢查，以及原生色彩視窗的實際編輯／取消。不得用 CSS zoom、transform 或只修改偏好值代替。
