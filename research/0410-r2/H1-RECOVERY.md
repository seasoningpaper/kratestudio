# H1 來源復原結論

正式站 Sites 62／0.41.0，發布來源 baf3da1。正確專案 ID appgprj_6ad04b4f4db081918fe4a0e9d541130f（任務中的尾碼2為誤植），公開權限維持 public。透過 Sites source helper 1.1.2 重新取得 main 5f4a6ac；與正式來源只差發布紀錄。

完整遠端分支為 main 與 feature/desktop-0.41.0；fetch 全部分支後，cat-file 無法取得 83d7272、eac47dc、bfdc11e。Git fsck 未找到可回復的 dangling commit；目前工作區有限深度查無其他 .git 或 bundle。Sites 歷史版本沒有 r2。

原本的 r2 修改來源在目前可取得的來源中無法恢復。接下來是受控重建，不是原始 83d7272。

既存 Koi-Maker-0.41.0-online-source.zip：13,926,234 bytes，1077 entries，CRC 無錯誤，SHA-256 47a31dbf675fa364309d4430c0b3e33d174afcc5858bbed1e2c6287e7db4e364。比對 package.json、engine、player、blocks-editor、program-sync 與 HTML，全部與 main 內容相同（需排除 desktop/package.json 同尾名）。

架構為 React 19.2、原生 DOM 外殼、esbuild 與 Worker ESM，Node24。未使用 Vue，無新增 UI 框架。npm ci 安裝58套依賴成功。基準 npm test 111/111 通過。正式網站與使用者瀏覽器資料均未修改。

逐包提交後以 scripts/checkpoint-softflow.mjs 產生 ZIP、完整 Git bundle 與 SHA-256，再同步 feature 分支並 fetch 比對。
