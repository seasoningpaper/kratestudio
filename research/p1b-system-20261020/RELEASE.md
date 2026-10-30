# KOI Maker 0.40.10_r52 發布紀錄

- 正式網址：https://koimaker.briny-angel-8862.chatgpt.site/
- 正式修訂：KOI Maker 0.40.10_r52；Sites第52版。
- 發布來源／檢查點：31b17bb314e0b0a1f7ec2f359e507d41f417eb9a。
- 正式tag：release-04010-r52-20261020，指向上述來源。
- 原生版本ID：appgprj_6ad04b4f4db081918fe4a0e9d541130f~appgver_9db3c5af3e808191b7258c3b71b86af5。
- 部署ID：appgdep_6ad778596b6c8191912133212e77179a。
- Sites結果：**succeeded**；failure_message=null；updated_at=2026-10-20T14:19:23.053502+00:00。
- 環境變數修訂：0；沒有修改環境、網址或公開權限。
- 發布後get_site：active、latest_version_number=52、public、current_live_url為原網址。

## 發布門檻與限制

119個不重複案例通過，沒有尚未處理的已知Critical/High；完整建置、語法及Worker七項內嵌檔案內容比對通過。編譯產生器曾刪P0-C四行樣式，已修正並確認CSS規則不變。HTML僅版本文字r50→r52；原音效／圖示檔雜湊保持。未變更儲存schema／key，沒有清除本機專案或素材。

部署後受支援Sites回報成功。單次額外HTTP探測在代理CONNECT階段逾時，HTTP 000，未取得應用回應；不是已驗證可開站，也不能推論網站本身停機。不重試。真實瀏覽器開站、動畫視覺、聽感、觸控、真實大型及任意舊專案驗收仍待人工。P0-C原7種案例及ZIP、88項／10組DOM紀錄保留，沒有把DOM或原生部署狀態當成視覺驗收。

## 完整備份與還原

發布前完整來源：KOI-Maker-0.40.10_r52-P1B-source.zip，322項，10,183,300 bytes，ZIP CRC通過，主要執行檔與發布來源逐位元相同；SHA256 `8feb7e9ad551dcf627af2f441d9dbd4bfe3780339f962b6bc101b1266137c04c`。內含SOURCE-CHECKPOINT.txt。此ZIP保留發布前報告狀態，發布後狀態以本紀錄為準。
部署tar雜湊：sha256:39e493b68b06c530c69daf651d2240c7cafe48678719b4d598dd92eb722153dd；19項、9,553,920 bytes，保存版本回傳值。

另交付含發布後PROGRESS／報告的完整來源ZIP：KOI-Maker-0.40.10_r52-P1B-complete-source.zip。其交付紀錄提交比發布來源晚，但應用程式、樣式、Worker與素材均與31b17bb相同；ZIP清單標註兩個SHA。這不是另一個上線版本，不再次部署。

可還原到目前發布31b17bb，或使用保留的r49正式來源525dd90與其原完整ZIP；第51版開發基準c26dce3／e26c18a及P1-A 250bb44均在歷史內。若未來需撤回，先備份使用者專案，在Sites選取已保存的r49版本重新部署同一網址；不要清除IndexedDB或localStorage。本輪未執行撤回。

## P1-B交付狀態與下一步

P1-B必要修復及風險導向自動化檢查完成並發布；全面真實操作／跨瀏覽器／手機與大型專案驗收尚未完成，不宣稱全系統每項功能均正常。119項詳見TEST-INDEX.json，命令及歷史失敗見COMMANDS.md，根因／檔案／15項演出對照見REPORT.md，人工步驟見MANUAL-ACCEPTANCE.md。

下一輪P1-C先完成三角色／等待與並行、原BGM恢復、積木解除聲音、P1-A背景與P0-C七案例人工驗收；再以有界批次補真實音樂／語音匯入、跨章、舊專案及壓力測試。不實作工程模式或P2。
