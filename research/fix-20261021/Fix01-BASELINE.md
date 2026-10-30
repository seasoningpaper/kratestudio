# Fix-01 已確認基準與問題索引

實際原碼95a99a3，正式Sites56／03b922c，public與URL不變；原始碼ZIP與checkpoint-fix-before-20261021保存，保留Sites55及54回復。工作樹初始乾淨，未覆蓋Logo。

已讀12張Bug圖：094920 Logo開啟原專案清單（現有行為）；095550 模板手機欄位密集；095604 fig-right執行錯誤；095753 列表刪除；100037 角色積木過高；100045 對話欄位「說」垂直壓縮；100311／100417 字串插入與語音下拉；100430 素材庫；100652 動畫Inspector與角色舞台；100852 fig-center退場錯誤；100932 character_me2角色目標欄位。原圖作內部診斷，不重新發布使用者畫面。圖中含實際私人素材，交付只列索引與文字結果。

確定根因：stackLayout將實測高度與角色310px估算取max，阻止縮回；Flex label可縮至極小且caption是可分裂匿名文字，造成換行壓縮；語音下拉直接列全部audio，尚未區分類型；單一deleteEvent缺projectId／chapterId宣告，真實bundle接受確認後ReferenceError，資料未改。Fix02-before有兩個預期失敗，Fix01-delete-baseline.json有真實重現。

待追蹤：fig位置alias本身已有唯一性解析，不能憑截圖判定全部失效；需驗證快速預覽前綴、跨章跳轉及角色鍵／position的區別，真正不存在的目標仍須診斷。現有typed socket僅部分文字／repeat／變數值，數值與素材模組需要漸進補強；不另建事件AST。大型UI與觸控仍需真人。

官方對照：Blockly input／statement／next connection、renderer與JSON序列化；Scratch Blocks以Blockly為基礎；Code.org Blockly fork。App Inventor本次官方GitHub目錄讀取失敗，沿用既有C1官方來源界線；Scratch2技術資料沿用既有盤點，不宣稱本輪執行舊引擎。引用見OFFICIAL-REFERENCES.md。未複製外部程式碼、未引入新相依。
