# 技術依據（本輪查閱）

- WHATWG Storage Standard：<https://storage.spec.whatwg.org/>。quota是實作定義的保守估計，不是應用可以自行保證的磁碟容量。
- WebKit官方儲存政策：<https://www.webkit.org/blog/14403/updates-to-storage-policy/>。明確說明quota是上限且不保證可寫滿，仍須處理QuotaExceededError。
- JSZip官方限制：<https://github.com/Stuk/jszip/blob/main/documentation/limitations.md>。ZIP64／數值與記憶體限制需評估；不能把目前generateAsync(blob)路徑當5GB安全封裝。

這些說明是架構風險的依據，不是本產品的實測結果。實際結果與範圍見FINAL-REPORT及large-backup.json。
