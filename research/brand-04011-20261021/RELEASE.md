# Koi Maker 0.40.11 正式發布紀錄

正式網址：https://koimaker.briny-angel-8862.chatgpt.site/ 。保留原網址與public公開權限，沒有新建網站。

- 產品版本：**Koi Maker 0.40.11**。
- Sites保存版本：**第53版**。
- 發布來源：48b545768e0e124776d269acc2138eb0e6522b46。
- 發布tag：release-04011-20261021。
- 原生版本ID：appgprj_6ad04b4f4db081918fe4a0e9d541130f~appgver_9827e9ae67048191b994ecf2771948f2。
- 部署ID：appgdep_6ad79ec29c9881919498692339af25a4。
- 原生部署狀態：**succeeded**，failure_message=null。
- 原生回傳時間：2026-10-20T17:03:11.994233+00:00（台灣2026-10-21 01:03:11）。
- 發布後get_site：active／public／第53版，title=Koi Maker 0.40.11，current_live_url為原網址。
- env_set_revision=0；沒有變更環境、資料庫綁定或權限。

## 發布門檻與證據

P1-C 243個不重複案例與品牌6個，共249個通過；本輪2 Critical／6 High已修復，沒有尚未處理的已知阻斷性問題。語法、完整build、Worker ESM及22個內嵌資產逐一與檔案比對通過。8.6MB／500事件／132素材與有限1000事件編譯有有界紀錄，不能視為實機效能或大容量保證。

品牌更名保持KOI Script、.koi、ID、格式、API、儲存key與IndexedDB schema；CSS及HTML結構只有允許的品牌／版本／快取參數差異。沒有清除使用者資料、重新初始化素材庫或發布大型新模組。

正式發布來源在部署前已推送並完整備份。部署tar：24項、9,973,760 bytes，原生內容雜湊sha256:7f2808766ce49c8b07a19b3ac8f4963c3d7663f28e940f323449a754f3c6ee09。
精確發布前來源ZIP：Koi-Maker-0.40.11-source.zip，396項、10,457,444 bytes；CRC與主要來源檔比對通過；SHA256 54949161fd16687e5a90a33a54c19d1eb99435980df0e45650a812f6ef7a93ae。

另交付Koi-Maker-0.40.11-complete-source.zip，加入發布後RELEASE與PROGRESS紀錄。交付紀錄提交較晚，但全部src／scripts／dist／worker執行與資產內容與48b5457相同；ZIP清單標明兩個SHA，不是另一個上線版本。

## 尚未完成與未通過項目

原生Sites結果證明部署成功，不能當作正式瀏覽器開站／操作驗證。沒有受支援的瀏覽器工具，因此未獨立確認真人開站、動畫視覺、聽感及觸控；未重試已知不可用的代理／替代瀏覽器路徑。原P0-C 7案例、88測試／10組DOM歷史與visual-acceptance.zip保留待人工。

Logo只改o/i筆畫。離線SVG已檢視，但嚴格K像素相等檢查未通過：K向量座標不變，重新光柵化有160個邊緣alpha微差、最大13/255；Maker區域像素相同。沒有把這項檢查寫成通過，也沒有為消除微差改動字型或CSS。完整GUI真人視覺仍待人工。

功能矩陣99列：A75（限列明範圍）、B1、C3、D5、E2、F13。兩項Medium保留：BGM stems／分割圖的次要素材引用清理、BGM逐事件volume／loop未完整套用。真實任意舊專案、長時間記憶體、512MiB／2GiB quota與各裝置codec未確認；不得算完成。

## 檢查點與回復

- 發布前原正式r52：31b17bb314e0b0a1f7ec2f359e507d41f417eb9a；原完整來源ZIP保留。
- r52交付基準：c3e4de4d7ac1e303360b037786a3d8ae987ecc0f。
- P1-C穩定、未部署：34a1e05fe8ff8f54b5a82ec42f153599cd52f486；tag checkpoint-04010-p1c-validated-20261020；完整ZIP KOI-Maker-0.40.10-P1C-validated-source.zip保留。
- 0.40.11發布來源：48b5457；tag release-04011-20261021／checkpoint-04011-brand-validated-20261021。
- 含發布後文件的最新接續提交：見tag checkpoint-04011-handoff-20261021與完整ZIP的SOURCE-CHECKPOINT.txt。

若日後需撤回，先備份使用者專案，在同一Sites專案選已保存第52版重新部署；不要清除IndexedDB或localStorage。本輪沒有執行撤回。

## 交付與下一步

P1-C完整報告research/p1c-20261020/FINAL-REPORT.md；功能矩陣FEATURE-MATRIX.md；語法參考dist/koi-script-reference.md；可玩原生／舊格式範本dist/koi-script-example.txt與koi-script-legacy-example.txt；壓力紀錄PRESSURE-500.json；品牌明細REPORT.md及TEST-INDEX.json。

下一輪先完成MANUAL-ACCEPTANCE.md，P2-A補官方／實機差距，P2-B受控修復兩項Medium，P2-C再評估返回堆疊、模型隔離與工程模式。本輪未開始P2、0.41.11工程模式或Live2D大型模組。
