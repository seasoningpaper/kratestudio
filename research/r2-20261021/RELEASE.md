# Koi Maker 0.40.11_r2 已正式發布

- 原網址：https://koimaker.briny-angel-8862.chatgpt.site/
- 正式顯示：Koi Maker 視覺小說創作平台 0.40.11_r2。
- Sites版本：54；保存ID：`appgprj_6ad04b4f4db081918fe4a0e9d541130f~appgver_b839568b70e08191b5699f446715e55f`。
- 發布來源：`5b004f31b8ebfddfe9523703c73269af58cf71f1`；正式tag：release-04011-r2-20261021。
- 部署ID：`appgdep_6ad7b385130c8191bdfb2a5814eb9473`；狀態：**succeeded**；failure_message=null。
- 原生時間：2026-10-20T18:31:44.883075+00:00（台灣2026-10-21 02:31）。
- 原生metadata確認active／public／同URL／latest54／新title。沒有建立新Site、換網址或改公開權限，沒有重建／清除使用者localStorage／IndexedDB。

## 備份及可回復來源

正式來源ZIP：Koi-Maker-0.40.11_r2-source.zip，來源5b004f3，483項，10,619,173 bytes，SHA256 2b95bf6c02a561865bd29c67aba8bc1793319e0176fba99d9f721a37ec74fc82；CRC通過。完整含發布後交接ZIP另存Koi-Maker-0.40.11_r2-complete-source.zip，其產品程式與發布來源逐位元相同，只補紀錄。

原生部署archive：Koi-Maker-0.40.11_r2-deployment.tar.gz；24項、10024960 bytes，hash `sha256:4a4160b1435f90ca9b8ccee9619ce2d53d3f9f7d1127f9d665b0a739aae244d1`。來源透過Sites helper推送後，保存匹配archive，再以保存的第54版部署；未使用publish-on-push。

回復到上一正式版本：Sites53，來源48b545768e0e124776d269acc2138eb0e6522b46，保存ID `appgprj_6ad04b4f4db081918fe4a0e9d541130f~appgver_9827e9ae67048191b994ecf2771948f2`；原Koi-Maker-0.40.11-complete-source.zip保留。需回復時使用同Site的該已保存版本部署，保留public；重設顯示title為Koi Maker 0.40.11，不改使用者資料。沒有在本輪實際演練正式站回滾，避免覆蓋新發布。

## 驗證與待驗

發布前230個不重複自動化通過；24語法、build／ESM、22本機Worker資產逐位元與root200。發布後以Sites原生succeeded及metadata確認部署，不將本機Worker測試當正式HTTP／瀏覽器操作。

沒有受支援真實瀏覽器工具；沒有反覆找插件或安裝替代瀏覽器。正式站真人可開啟、視覺、音訊聽感、觸控／實機長圖與任意大型舊專案仍待驗，見MANUAL-ACCEPTANCE.md。原P0-C七案例與ZIP保留。不能把單元／DOM通過等同於全部真人通過。

Sites原生description欄位仍為「視覺化 Galgame 製作器測試版」；目前原生工具只支援title更新，沒有description參數。網站HTML title／meta description與正式顯示title已為新名稱；未假稱卡片說明同步。這是非阻斷的託管metadata限制。

功能／Bug／檔案／測試／P2後續：FINAL-REPORT.md、BUG-LIST.md、MODIFIED-FILES.txt、TEST-INDEX.json、根目錄FEATURE-MATRIX.md與P2-A-FEATURE-COMPARISON.md。沒有啟動P2-C、工程模式、Live2D或其他大型新模組。
