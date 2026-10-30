# 失敗與修復

1. 記憶專案ID多一字元；依Sites清單核實正確ID，沒有另建網站。
2. Source helper初次login執行失敗；非login重試成功取得3ad56d9，沒有覆寫原資料。
3. 原專案雙鎖檔衝突；採npm@11.9.0/package-lock，原pnpm鎖移入研究備存，沒有升級依賴。
4. 原基準115/116，草稿衝突獨立重跑雖過、全套仍失敗。診斷發現CodeEditor在載入專案後暫留demo程式檔與錯誤章節ID。以project.id key同步重建GUI局部state，不改模型／引擎／存檔。修復後7/7、全套116/116。
5. asset檢查硬編r2；隨授權版本更新r3標籤，逐byte比較未放寬。
6. iframe contentDocument不能透過browser read-only代理讀取；由自有測試頁正常JS輸出可見量測。漏分號修正後16組通過。測試頁不發布。
7. 後續抽驗修復舊手機字型!important與事件focus-within疊框；使用原來源與相容建置層，沒有追加!important。
8. 原#sceneArt規則清空內建圖；只修復classroom/campus/night，自訂inline與空白場景不改。

保留所有初次失敗log，不用重跑結果抹除歷史。研究5份歷史原始碼，完整95件作品檔案尚0/95，詳RESEARCH.md。未完成全站所有操作、實機、Safari、聽感、240FPS、5GB及原使用者真實大型劇本。
