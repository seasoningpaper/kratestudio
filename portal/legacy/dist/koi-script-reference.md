# KOI Script — Koi Maker 0.40.12_r4 完整指令參考

以實際解析器、事件模型、序列化及播放器為依據。每個指令15個欄位；測試為模型／DOM自動化，未代替真人視覺、音訊與觸控。劇情事件以JSON往返保留，不保證還原作者原排版。

## 停止音訊

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 停止音訊 |
| 內部事件／資料型別 | audioStop |
| 正確語法 | 停止音訊:音效; |
| 參數 | 內容：背景音樂／音樂／語音／音效／全部，或music／voice／sound／all；-素材=檔名只篩選音效 |
| 允許值 | 內容：背景音樂／音樂／語音／音效／全部，或music／voice／sound／all；-素材=檔名只篩選音效 |
| 預設值 | 空白通道為all；未知通道診斷且不停止原音樂；素材省略即該通道全部 |
| 時間單位 | 無 |
| 素材格式 | MP3、WAV、M4A、OGG、Opus、AAC、FLAC；匯入接受不等於瀏覽器可解碼 |
| 編輯模式 | 事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留 |
| 匯入解析 | 已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs |
| 遊戲播放 | 既有執行器已實作；真實視覺、聽感、觸控待驗 |
| 匯出與重匯 | serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版 |
| 舊語法 | audioStop |
| 常見錯誤與限制 | 缺少／重名素材、缺少標籤、錯誤檔案類型；不支援以素材參數停止指定BGM；語音停止到下一句新語音 |
| 實際測試依據 | 對應「P1-C reference: 停止音訊」解析／重匯測試；C2測試與限制另見驗收報告 |

## 互動

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 互動 |
| 內部事件／資料型別 | activity |
| 正確語法 | 互動:校園訊息 -變數=互動分數; |
| 參數 | 內容=既有模組ID或名稱；-變數=結果變數 |
| 允許值 | 內容=既有模組ID或名稱；-變數=結果變數 |
| 預設值 | 變數=互動分數 |
| 時間單位 | 由模組決定 |
| 素材格式 | 模組可引用圖片／音訊／影片 |
| 編輯模式 | 事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留 |
| 匯入解析 | 已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs |
| 遊戲播放 | 既有執行器已實作；真實視覺、聽感、觸控待驗 |
| 匯出與重匯 | serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版 |
| 舊語法 | activity |
| 常見錯誤與限制 | 缺少／重名素材、缺少標籤、錯誤檔案類型；需先建立模組；不是外部任意JavaScript指令 |
| 實際測試依據 | 對應「P1-C reference: 互動」解析／重匯測試；C2測試與限制另見驗收報告 |

## 鏡頭

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 鏡頭 |
| 內部事件／資料型別 | camera |
| 正確語法 | 鏡頭:特寫 -x=30 -y=50 -倍率=2 -秒數=1; |
| 參數 | -x、-y=百分比；-倍率/-zoom=0.25～6；-秒數；-晃動/-shake=0～60；-跟隨/-follow=true/false |
| 允許值 | -x、-y=百分比；-倍率/-zoom=0.25～6；-秒數；-晃動/-shake=0～60；-跟隨/-follow=true/false |
| 預設值 | x=50、y=50、倍率=1、1秒、晃動=0、跟隨=false |
| 時間單位 | 秒數為秒；duration為毫秒 |
| 素材格式 | 無 |
| 編輯模式 | 事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留 |
| 匯入解析 | 已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs |
| 遊戲播放 | 既有執行器已實作；真實視覺、聽感、觸控待驗 |
| 匯出與重匯 | serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版 |
| 舊語法 | camera |
| 常見錯誤與限制 | 缺少／重名素材、缺少標籤、錯誤檔案類型；跟隨使用目前對話name／voiceActor的精確角色鍵；不自動解析動態目標；split只可由事件JSON／GUI設定 |
| 實際測試依據 | 對應「P1-C reference: 鏡頭」解析／重匯測試；C2測試與限制另見驗收報告 |

## 模型

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 模型 |
| 內部事件／資料型別 | model |
| 正確語法 | 模型:我的播放器; |
| 參數 | 內容=已匯入HTML播放器ID／名稱；none隱藏 |
| 允許值 | 內容=已匯入HTML播放器ID／名稱；none隱藏 |
| 預設值 | 省略名稱不會自動選模型 |
| 時間單位 | 無 |
| 素材格式 | 擴充中的自帶HTML播放器 |
| 編輯模式 | 事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留 |
| 匯入解析 | 已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs |
| 遊戲播放 | HTML播放器橋接已實作；自帶模型內容未驗 |
| 匯出與重匯 | serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版 |
| 舊語法 | model |
| 常見錯誤與限制 | 缺少／重名素材、缺少標籤、錯誤檔案類型；有sandbox橋接，非原生Live2D／Spine載入器；實際模型由作者播放器提供 |
| 實際測試依據 | 對應「P1-C reference: 模型」解析／重匯測試；C2測試與限制另見驗收報告 |

## 天氣

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 天氣 |
| 內部事件／資料型別 | effect |
| 正確語法 | 天氣:櫻花; |
| 參數 | 下雨/rain、落葉/leaves、飄雪/snow、櫻花/sakura、揚塵/dust、關閉/none |
| 允許值 | 下雨/rain、落葉/leaves、飄雪/snow、櫻花/sakura、揚塵/dust、關閉/none |
| 預設值 | 需明確指定 |
| 時間單位 | 無 |
| 素材格式 | 無 |
| 編輯模式 | 事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留 |
| 匯入解析 | 已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs |
| 遊戲播放 | 既有執行器已實作；真實視覺、聽感、觸控待驗 |
| 匯出與重匯 | serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版 |
| 舊語法 | weather |
| 常見錯誤與限制 | 缺少／重名素材、缺少標籤、錯誤檔案類型；只改天氣軌，不改濾鏡；未知值不保證有效果 |
| 實際測試依據 | 對應「P1-C reference: 天氣」解析／重匯測試；C2測試與限制另見驗收報告 |

## 濾鏡

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 濾鏡 |
| 內部事件／資料型別 | effect |
| 正確語法 | 濾鏡:泛黃; |
| 參數 | 泛黃/sepia、黑白/mono、夜視/nightvision、故障/glitch、暗角/vignette、關閉/none |
| 允許值 | 泛黃/sepia、黑白/mono、夜視/nightvision、故障/glitch、暗角/vignette、關閉/none |
| 預設值 | 需明確指定 |
| 時間單位 | 無 |
| 素材格式 | 無 |
| 編輯模式 | 事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留 |
| 匯入解析 | 已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs |
| 遊戲播放 | 既有執行器已實作；真實視覺、聽感、觸控待驗 |
| 匯出與重匯 | serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版 |
| 舊語法 | filter |
| 常見錯誤與限制 | 缺少／重名素材、缺少標籤、錯誤檔案類型；只改濾鏡軌；實際視覺待真人 |
| 實際測試依據 | 對應「P1-C reference: 濾鏡」解析／重匯測試；C2測試與限制另見驗收報告 |

## 影片

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 影片 |
| 內部事件／資料型別 | video |
| 正確語法 | 影片:opening.mp4 -可略過 -音量=80; |
| 參數 | 內容=影片檔名；-可略過/-skip、-靜音/-muted、-填滿/-cover=true/false；-音量/-volume=0～100 |
| 允許值 | 內容=影片檔名；-可略過/-skip、-靜音/-muted、-填滿/-cover=true/false；-音量/-volume=0～100 |
| 預設值 | 可略過=false、靜音=false、包含、音量=100；播放完成後繼續 |
| 時間單位 | 影片素材的真實時間；裁切／倍速在素材設定 |
| 素材格式 | MP4、WebM、OGV、MOV；建議H.264 MP4／WebM，須瀏覽器可解碼 |
| 編輯模式 | 事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留 |
| 匯入解析 | 已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs |
| 遊戲播放 | 既有執行器已實作；真實視覺、聽感、觸控待驗 |
| 匯出與重匯 | serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版 |
| 舊語法 | playVideo |
| 常見錯誤與限制 | 缺少／重名素材、缺少標籤、錯誤檔案類型；拒播有播放入口；格式錯誤可繼續；預設暫停BGM。瀏覽器codec／音訊政策未驗 |
| 實際測試依據 | 對應「P1-C reference: 影片」解析／重匯測試；C2測試與限制另見驗收報告 |

## 背景

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 背景 |
| 內部事件／資料型別 | background |
| 正確語法 | 背景:room.png; |
| 參數 | 內容=圖片檔名或完整相對路徑；none清空素材使用預設場景 |
| 允許值 | 內容=圖片檔名或完整相對路徑；none清空素材使用預設場景 |
| 預設值 | 保留角色(clearActors=false) |
| 時間單位 | 無 |
| 素材格式 | PNG、JPG/JPEG、WebP、GIF、AVIF、SVG、BMP；須瀏覽器可解碼 |
| 編輯模式 | 事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留 |
| 匯入解析 | 已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs |
| 遊戲播放 | 既有執行器已實作；真實視覺、聽感、觸控待驗 |
| 匯出與重匯 | serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版 |
| 舊語法 | changeBg |
| 常見錯誤與限制 | 缺少／重名素材、缺少標籤、錯誤檔案類型；原生指令沒有fit／position參數，使用GUI或事件JSON的imageFit/bgX/bgY/bgScale |
| 實際測試依據 | 對應「P1-C reference: 背景」解析／重匯測試；C2測試與限制另見驗收報告 |

## 立繪

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 立繪 |
| 內部事件／資料型別 | character |
| 正確語法 | 立繪:hero.png -左 -秒數=0.8; |
| 參數 | 內容=圖片檔名／none；-id=自訂角色ID；-左/-left、-中/-center、-右/-right；-上/-top、-下/-bottom、-垂直置中/-middle；-動畫=內建名稱（退場可用淡出／向左退場／向右退場／向上退場／向下退場）；-秒數；-等待=true/false；-變形=JSON |
| 允許值 | 內容=圖片檔名／none；-id=自訂角色ID；-左/-left、-中/-center、-右/-right；-上/-top、-下/-bottom、-垂直置中/-middle；-動畫=內建名稱（退場可用淡出／向左退場／向右退場／向上退場／向下退場）；-秒數；-等待=true/false；-變形=JSON |
| 預設值 | 位置中、底部；未指定id使用fig-位置並取代該位置；自訂id使用keep；未指定動畫無動作；原生等待true、舊changeFigure false |
| 時間單位 | 秒數為秒；duration為毫秒；只有有動作且等待才阻擋 |
| 素材格式 | PNG、JPG/JPEG、WebP、GIF、AVIF、SVG、BMP；須瀏覽器可解碼 |
| 編輯模式 | 事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留 |
| 匯入解析 | 已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs |
| 遊戲播放 | 既有執行器已實作；真實視覺、聽感、觸控待驗 |
| 匯出與重匯 | serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版 |
| 舊語法 | changeFigure |
| 常見錯誤與限制 | 缺少／重名素材、缺少標籤、錯誤檔案類型；同一ID代表替換同一角色，不是新增同名副本；多名顯示名稱相同者需不同-id；none以相同ID移除；有退場動作時保留到完成，只移除指定角色。位置別名不唯一時診斷；立即退場保留舊規則 |
| 實際測試依據 | 對應「P1-C reference: 立繪」解析／重匯測試；C2測試與限制另見驗收報告 |

## 動作

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 動作 |
| 內部事件／資料型別 | animation |
| 正確語法 | 動作:左側進入 -目標=fig-left -秒數=1; |
| 參數 | 內容=淡入／淡出／左側進入／右側進入／上方進入／下方進入／移至中央／搖晃／彈跳／旋轉／呼吸／放大／縮小／平移／下方滑入淡入／左方滑入淡入／右方滑入淡入／柔和拉近／翻轉登場／關閉；-目標/-target=角色ID、位置別名、bg-main、stage-main；-秒數；-等待=true/false |
| 允許值 | 內容=淡入／淡出／左側進入／右側進入／上方進入／下方進入／移至中央／搖晃／彈跳／旋轉／呼吸／放大／縮小／平移／下方滑入淡入／左方滑入淡入／右方滑入淡入／柔和拉近／翻轉登場／關閉；-目標/-target=角色ID、位置別名、bg-main、stage-main；-秒數；-等待=true/false |
| 預設值 | 目標參數省略：保留最後立繪ID，初始fig-center；明確空字串錯誤；1秒；原生等待true、舊setAnimation false |
| 時間單位 | 秒數為秒；duration為毫秒，播放器100～120000毫秒 |
| 素材格式 | 無 |
| 編輯模式 | 事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留 |
| 匯入解析 | 已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs |
| 遊戲播放 | 既有執行器已實作；真實視覺、聽感、觸控待驗 |
| 匯出與重匯 | serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版 |
| 舊語法 | setAnimation |
| 常見錯誤與限制 | 缺少／重名素材、缺少標籤、錯誤檔案類型；位置別名只有唯一角色才解析；精確角色鍵優先；角色已隱藏／不存在有執行診斷。省略目標的舊規則不會推斷所有角色 |
| 實際測試依據 | 對應「P1-C reference: 動作」解析／重匯測試；C2測試與限制另見驗收報告 |

## 變形

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 變形 |
| 內部事件／資料型別 | animation |
| 正確語法 | 變形:{"position":{"x":0,"y":100},"scale":{"x":1.2,"y":1.2}} -目標=fig-left; |
| 參數 | 內容=JSON；position:{x,y}、scale:{x,y}、rotation、alpha；-目標；-秒數；-等待 |
| 允許值 | 內容=JSON；position:{x,y}、scale:{x,y}、rotation、alpha；-目標；-秒數；-等待 |
| 預設值 | 位置變動未指定不覆寫；scale預設1、alpha不指定不覆寫；預設無motion；原生等待true、舊setTransform false |
| 時間單位 | position以1920×1080設計座標換百分比；y正值向上；rotation為弧度；秒數為秒 |
| 素材格式 | 無 |
| 編輯模式 | 事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留 |
| 匯入解析 | 已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs |
| 遊戲播放 | 既有執行器已實作；真實視覺、聽感、觸控待驗 |
| 匯出與重匯 | serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版 |
| 舊語法 | setTransform |
| 常見錯誤與限制 | 缺少／重名素材、缺少標籤、錯誤檔案類型；scale.y控制整體百分比，scale.x/y控制寬比例與水平翻轉；不是任意動畫曲線引擎 |
| 實際測試依據 | 對應「P1-C reference: 變形」解析／重匯測試；C2測試與限制另見驗收報告 |

## 對話

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 對話 |
| 內部事件／資料型別 | dialogue |
| 正確語法 | 對話:小雪\|今天辛苦了。 -語音=voice.wav -字速=35; |
| 參數 | 角色\|內容；-語音/-voice=音訊檔；-字速/-speed=每秒字數；-字級/-fontSize=設計字級；-文字顏色/-fontColor=CSS色；-字體/-font=字型；**粗體**；{變數} |
| 允許值 | 角色\|內容；-語音/-voice=音訊檔；-字速/-speed=每秒字數；-字級/-fontSize=設計字級；-文字顏色/-fontColor=CSS色；-字體/-font=字型；**粗體**；{變數} |
| 預設值 | 字速／字體／字級依專案與玩家偏好；語音省略不播放 |
| 時間單位 | 字速=字／秒 |
| 素材格式 | MP3、WAV、M4A、OGG、Opus、AAC、FLAC；匯入接受不等於瀏覽器可解碼 |
| 編輯模式 | 事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留 |
| 匯入解析 | 已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs |
| 遊戲播放 | 既有執行器已實作；真實視覺、聽感、觸控待驗 |
| 匯出與重匯 | serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版 |
| 舊語法 | dialogue 或 角色：內容 |
| 常見錯誤與限制 | 缺少／重名素材、缺少標籤、錯誤檔案類型；文字會去除前後空白；換行請用事件JSON的\n；保留分號／\|時用反斜線；數字或布林的純文字值以事件JSON明確指定 |
| 實際測試依據 | 對應「P1-C reference: 對話」解析／重匯測試；C2測試與限制另見驗收報告 |

## 旁白

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 旁白 |
| 內部事件／資料型別 | dialogue |
| 正確語法 | 旁白:窗外下起了雨。; |
| 參數 | 內容及對話相同文字／語音／字體參數；不帶角色\|前綴 |
| 允許值 | 內容及對話相同文字／語音／字體參數；不帶角色\|前綴 |
| 預設值 | name=旁白，showName=false |
| 時間單位 | 同對話 |
| 素材格式 | MP3、WAV、M4A、OGG、Opus、AAC、FLAC；匯入接受不等於瀏覽器可解碼 |
| 編輯模式 | 事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留 |
| 匯入解析 | 已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs |
| 遊戲播放 | 既有執行器已實作；真實視覺、聽感、觸控待驗 |
| 匯出與重匯 | serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版 |
| 舊語法 | narration 或沒有冒號的文字 |
| 常見錯誤與限制 | 缺少／重名素材、缺少標籤、錯誤檔案類型；不是新的獨立事件型別 |
| 實際測試依據 | 對應「P1-C reference: 旁白」解析／重匯測試；C2測試與限制另見驗收報告 |

## 過場

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 過場 |
| 內部事件／資料型別 | intro |
| 正確語法 | 過場:第一幕\|回家的路 -秒數=1.5 -背景色=#000000 -文字顏色=#ffffff; |
| 參數 | 標題\|副標；-秒數；-等待/-hold=true/false；-背景色；-文字顏色；-字級=數值或small/medium/large；-動畫=舊動畫代碼 |
| 允許值 | 標題\|副標；-秒數；-等待/-hold=true/false；-背景色；-文字顏色；-字級=數值或small/medium/large；-動畫=舊動畫代碼 |
| 預設值 | 1.5秒、等待=false、字級36、黑底白字、fade；\|轉換行 |
| 時間單位 | 秒數為秒；舊delayTime為毫秒 |
| 素材格式 | 無 |
| 編輯模式 | 事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留 |
| 匯入解析 | 已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs |
| 遊戲播放 | 既有執行器已實作；真實視覺、聽感、觸控待驗 |
| 匯出與重匯 | serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版 |
| 舊語法 | intro |
| 常見錯誤與限制 | 缺少／重名素材、缺少標籤、錯誤檔案類型；等待true改為手動繼續；duration不是此舊指令的delayTime別名 |
| 實際測試依據 | 對應「P1-C reference: 過場」解析／重匯測試；C2測試與限制另見驗收報告 |

## 頭像

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 頭像 |
| 內部事件／資料型別 | avatar |
| 正確語法 | 頭像:face.png; |
| 參數 | 內容=圖片檔名或none |
| 允許值 | 內容=圖片檔名或none |
| 預設值 | none隱藏 |
| 時間單位 | 無 |
| 素材格式 | PNG、JPG/JPEG、WebP、GIF、AVIF、SVG、BMP；須瀏覽器可解碼 |
| 編輯模式 | 事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留 |
| 匯入解析 | 已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs |
| 遊戲播放 | 既有執行器已實作；真實視覺、聽感、觸控待驗 |
| 匯出與重匯 | serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版 |
| 舊語法 | miniAvatar |
| 常見錯誤與限制 | 缺少／重名素材、缺少標籤、錯誤檔案類型；與舞台立繪分離 |
| 實際測試依據 | 對應「P1-C reference: 頭像」解析／重匯測試；C2測試與限制另見驗收報告 |

## 文字框

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 文字框 |
| 內部事件／資料型別 | textbox |
| 正確語法 | 文字框:隱藏; |
| 參數 | 顯示/show 或 隱藏/hide |
| 允許值 | 顯示/show 或 隱藏/hide |
| 預設值 | 除了hide之外目前皆為顯示，請使用列出值 |
| 時間單位 | 無 |
| 素材格式 | 無 |
| 編輯模式 | 事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留 |
| 匯入解析 | 已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs |
| 遊戲播放 | 既有執行器已實作；真實視覺、聽感、觸控待驗 |
| 匯出與重匯 | serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版 |
| 舊語法 | setTextbox |
| 常見錯誤與限制 | 缺少／重名素材、缺少標籤、錯誤檔案類型；不清除角色或對話記錄；會保留到再次顯示 |
| 實際測試依據 | 對應「P1-C reference: 文字框」解析／重匯測試；C2測試與限制另見驗收報告 |

## 音樂

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 音樂 |
| 內部事件／資料型別 | music |
| 正確語法 | 音樂:warm.mp3; |
| 參數 | 內容=配樂檔名或none；-音量/-volume=0～100；-循環/-loop=true/false |
| 允許值 | 內容=配樂檔名或none；-音量/-volume=0～100；-循環/-loop=true/false |
| 預設值 | 預設循環true、音量100；與玩家音量相乘；none停止 |
| 時間單位 | 跨淡化由專案musicCrossfade毫秒決定 |
| 素材格式 | MP3、WAV、M4A、OGG、Opus、AAC、FLAC；匯入接受不等於瀏覽器可解碼 |
| 編輯模式 | 事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留 |
| 匯入解析 | 已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs |
| 遊戲播放 | 逐事件音量／循環已通過模型、Mixer與控制計時DOM；真實聽感待驗 |
| 匯出與重匯 | serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版 |
| 舊語法 | bgm |
| 常見錯誤與限制 | 缺少／重名素材、缺少標籤、錯誤檔案類型；逐事件音量／循環套用至主配樂；內建鋼琴loop=false播放一輪旋律。同檔新cue重新開始；鑑賞正常瀏覽不重啟。分軌gain獨立，重複來源沿用既有合併規則 |
| 實際測試依據 | 對應「P1-C reference: 音樂」解析／重匯測試；C2測試與限制另見驗收報告 |

## 音效

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 音效 |
| 內部事件／資料型別 | sound |
| 正確語法 | 音效:door.wav; |
| 參數 | 內容=音效檔名；-循環/-loop=true/false；-音量/-volume=0～100 |
| 允許值 | 內容=音效檔名；-循環/-loop=true/false；-音量/-volume=0～100 |
| 預設值 | 循環=false，音量=100；跨對話保留已啟動音效 |
| 時間單位 | 素材時間；循環需停止音訊解除 |
| 素材格式 | MP3、WAV、M4A、OGG、Opus、AAC、FLAC；匯入接受不等於瀏覽器可解碼 |
| 編輯模式 | 事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留 |
| 匯入解析 | 已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs |
| 遊戲播放 | 既有執行器已實作；真實視覺、聽感、觸控待驗 |
| 匯出與重匯 | serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版 |
| 舊語法 | sound、playEffect |
| 常見錯誤與限制 | 缺少／重名素材、缺少標籤、錯誤檔案類型；每個播放cue獨立；語音屬對話事件，不使用此指令代替 |
| 實際測試依據 | 對應「P1-C reference: 音效」解析／重匯測試；C2測試與限制另見驗收報告 |

## 解鎖音樂

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 解鎖音樂 |
| 內部事件／資料型別 | unlockBgm |
| 正確語法 | 解鎖音樂:warm.mp3 -名稱=溫暖的霧氣; |
| 參數 | 內容=音訊檔名；-名稱/-name=鑑賞名稱 |
| 允許值 | 內容=音訊檔名；-名稱/-name=鑑賞名稱 |
| 預設值 | 名稱=檔名 |
| 時間單位 | 無 |
| 素材格式 | MP3、WAV、M4A、OGG、Opus、AAC、FLAC；匯入接受不等於瀏覽器可解碼 |
| 編輯模式 | 事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留 |
| 匯入解析 | 已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs |
| 遊戲播放 | 既有執行器已實作；真實視覺、聽感、觸控待驗 |
| 匯出與重匯 | serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版 |
| 舊語法 | unlockBgm |
| 常見錯誤與限制 | 缺少／重名素材、缺少標籤、錯誤檔案類型；只解鎖，不自行試聽或切換BGM |
| 實際測試依據 | 對應「P1-C reference: 解鎖音樂」解析／重匯測試；C2測試與限制另見驗收報告 |

## 解鎖圖片

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 解鎖圖片 |
| 內部事件／資料型別 | unlockCg |
| 正確語法 | 解鎖圖片:room.png -名稱=雨夜; |
| 參數 | 內容=圖片檔名；-名稱/-name=鑑賞名稱 |
| 允許值 | 內容=圖片檔名；-名稱/-name=鑑賞名稱 |
| 預設值 | 名稱=檔名 |
| 時間單位 | 無 |
| 素材格式 | PNG、JPG/JPEG、WebP、GIF、AVIF、SVG、BMP；須瀏覽器可解碼 |
| 編輯模式 | 事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留 |
| 匯入解析 | 已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs |
| 遊戲播放 | 既有執行器已實作；真實視覺、聽感、觸控待驗 |
| 匯出與重匯 | serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版 |
| 舊語法 | unlockCg |
| 常見錯誤與限制 | 缺少／重名素材、缺少標籤、錯誤檔案類型；只解鎖，不顯示全畫面CG；全畫面CG用GUI／事件JSON |
| 實際測試依據 | 對應「P1-C reference: 解鎖圖片」解析／重匯測試；C2測試與限制另見驗收報告 |

## 淡幕

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 淡幕 |
| 內部事件／資料型別 | fade |
| 正確語法 | 淡幕:黑 -秒數=1; |
| 參數 | 黑/out或亮/in；-秒數 |
| 允許值 | 黑/out或亮/in；-秒數 |
| 預設值 | 方向非out為in；1秒 |
| 時間單位 | 秒數為秒；duration為毫秒 |
| 素材格式 | 無 |
| 編輯模式 | 事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留 |
| 匯入解析 | 已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs |
| 遊戲播放 | 既有執行器已實作；真實視覺、聽感、觸控待驗 |
| 匯出與重匯 | serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版 |
| 舊語法 | fade |
| 常見錯誤與限制 | 缺少／重名素材、缺少標籤、錯誤檔案類型；會維持最後黑幕狀態到亮；不是背景圖片切換 |
| 實際測試依據 | 對應「P1-C reference: 淡幕」解析／重匯測試；C2測試與限制另見驗收報告 |

## 等待

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 等待 |
| 內部事件／資料型別 | wait |
| 正確語法 | 等待:1.5; |
| 參數 | 內容=非負秒數 |
| 允許值 | 內容=非負秒數 |
| 預設值 | 無效內容目前回退0；請輸入有限非負數 |
| 時間單位 | 原生等待／舊pause為秒；舊wait為毫秒 |
| 素材格式 | 無 |
| 編輯模式 | 事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留 |
| 匯入解析 | 已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs |
| 遊戲播放 | 既有執行器已實作；真實視覺、聽感、觸控待驗 |
| 匯出與重匯 | serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版 |
| 舊語法 | pause、wait |
| 常見錯誤與限制 | 缺少／重名素材、缺少標籤、錯誤檔案類型；等待時保持先前對話，不寫入等待說明到歷史 |
| 實際測試依據 | 對應「P1-C reference: 等待」解析／重匯測試；C2測試與限制另見驗收報告 |

## 標籤

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 標籤 |
| 內部事件／資料型別 | section |
| 正確語法 | 標籤:回家; |
| 參數 | 內容=腳本內唯一標籤 |
| 允許值 | 內容=腳本內唯一標籤 |
| 預設值 | 不允許重複；位置為發出section事件的索引 |
| 時間單位 | 無 |
| 素材格式 | 無 |
| 編輯模式 | 事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留 |
| 匯入解析 | 已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs |
| 遊戲播放 | 既有執行器已實作；真實視覺、聽感、觸控待驗 |
| 匯出與重匯 | serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版 |
| 舊語法 | label、scene；註解「; 場景:NAME」舊格式 |
| 常見錯誤與限制 | 缺少／重名素材、缺少標籤、錯誤檔案類型；作用域為這次匯入的腳本，不是跨檔案全域命名空間 |
| 實際測試依據 | 對應「P1-C reference: 標籤」解析／重匯測試；C2測試與限制另見驗收報告 |

## 選項

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 選項 |
| 內部事件／資料型別 | choice |
| 正確語法 | 選項:要去哪裡？:回家:回家\|留在這裡:留下; |
| 參數 | 問題:文字:標籤\|文字:標籤；可省略問題；目的可為同腳本標籤或既有章節名／ID |
| 允許值 | 問題:文字:標籤\|文字:標籤；可省略問題；目的可為同腳本標籤或既有章節名／ID |
| 預設值 | 問題省略=請選擇；目的缺少保持未連接並診斷 |
| 時間單位 | 逾時只在GUI／事件JSON設定 |
| 素材格式 | 無 |
| 編輯模式 | 事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留 |
| 匯入解析 | 已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs |
| 遊戲播放 | 既有執行器已實作；真實視覺、聽感、觸控待驗 |
| 匯出與重匯 | serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版 |
| 舊語法 | choose |
| 常見錯誤與限制 | 缺少／重名素材、缺少標籤、錯誤檔案類型；選項文字的冒號會參與拆分；避免歧義，複雜內容用事件JSON；分支後合流需明確跳轉 |
| 實際測試依據 | 對應「P1-C reference: 選項」解析／重匯測試；C2測試與限制另見驗收報告 |

## 跳轉

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 跳轉 |
| 內部事件／資料型別 | jump |
| 正確語法 | 跳轉:回家; |
| 參數 | 內容=標籤或既有章節名／ID，可帶.txt副檔名 |
| 允許值 | 內容=標籤或既有章節名／ID，可帶.txt副檔名 |
| 預設值 | 目的需存在；不猜測無效索引／章節 |
| 時間單位 | 無 |
| 素材格式 | 無 |
| 編輯模式 | 事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留 |
| 匯入解析 | 已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs |
| 遊戲播放 | 既有執行器已實作；真實視覺、聽感、觸控待驗 |
| 匯出與重匯 | serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版 |
| 舊語法 | jumpLabel、changeScene；callScene只作jump且有不相容診斷 |
| 常見錯誤與限制 | 缺少／重名素材、缺少標籤、錯誤檔案類型；不提供call／return堆疊；章節同名時請用唯一ID |
| 實際測試依據 | 對應「P1-C reference: 跳轉」解析／重匯測試；C2測試與限制另見驗收報告 |

## 變數

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 變數 |
| 內部事件／資料型別 | variable |
| 正確語法 | 變數:好感度 -運算=增加 -值=1; |
| 參數 | 內容=變數名；-運算/-operation=設定/set、增加/add、減少/subtract；-值/-value=數字、true、false、文字 |
| 允許值 | 內容=變數名；-運算/-operation=設定/set、增加/add、減少/subtract；-值/-value=數字、true、false、文字 |
| 預設值 | 運算set、值0；新增變數由既有模型補登記 |
| 時間單位 | 無 |
| 素材格式 | 無 |
| 編輯模式 | 事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留 |
| 匯入解析 | 已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs |
| 遊戲播放 | 既有執行器已實作；真實視覺、聽感、觸控待驗 |
| 匯出與重匯 | serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版 |
| 舊語法 | variable |
| 常見錯誤與限制 | 缺少／重名素材、缺少標籤、錯誤檔案類型；數字樣式字串與true/false會自動轉型；需要純字串"true"／"001"用事件JSON或變數編輯器；加減只用數值 |
| 實際測試依據 | 對應「P1-C reference: 變數」解析／重匯測試；C2測試與限制另見驗收報告 |

## 條件

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 條件 |
| 內部事件／資料型別 | condition |
| 正確語法 | 條件:好感度 -比較=>= -值=3 -成立=親近 -否則=普通; |
| 參數 | 內容=變數名；-比較/-operator===、!=、>、<、>=、<=；-值；-成立/-then=標籤；-否則/-else=標籤 |
| 允許值 | 內容=變數名；-比較/-operator===、!=、>、<、>=、<=；-值；-成立/-then=標籤；-否則/-else=標籤 |
| 預設值 | 比較>=、值1；兩個目的均須明確 |
| 時間單位 | 無 |
| 素材格式 | 無 |
| 編輯模式 | 事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留 |
| 匯入解析 | 已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs |
| 遊戲播放 | 既有執行器已實作；真實視覺、聽感、觸控待驗 |
| 匯出與重匯 | serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版 |
| 舊語法 | condition |
| 常見錯誤與限制 | 缺少／重名素材、缺少標籤、錯誤檔案類型；原生條件目的只解析這次腳本標籤；跨章條件先跳本地標籤，再使用跳轉；巢狀以多個條件及標籤組合 |
| 實際測試依據 | 對應「P1-C reference: 條件」解析／重匯測試；C2測試與限制另見驗收報告 |

## 輸入

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 輸入 |
| 內部事件／資料型別 | input |
| 正確語法 | 輸入:你的名字？ -變數=玩家名稱; |
| 參數 | 內容=問題；-變數/-variable=保存變數名 |
| 允許值 | 內容=問題；-變數/-variable=保存變數名 |
| 預設值 | 玩家名稱；最多80字 |
| 時間單位 | 無 |
| 素材格式 | 無 |
| 編輯模式 | 事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留 |
| 匯入解析 | 已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs |
| 遊戲播放 | 既有執行器已實作；真實視覺、聽感、觸控待驗 |
| 匯出與重匯 | serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版 |
| 舊語法 | input |
| 常見錯誤與限制 | 缺少／重名素材、缺少標籤、錯誤檔案類型；輸入後可在名稱／對話使用{變數} |
| 實際測試依據 | 對應「P1-C reference: 輸入」解析／重匯測試；C2測試與限制另見驗收報告 |

## 特效

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 特效 |
| 內部事件／資料型別 | effect |
| 正確語法 | 特效:搖晃; |
| 參數 | 搖晃/shake、閃光/flash、淡入/fade、關閉/none |
| 允許值 | 搖晃/shake、閃光/flash、淡入/fade、關閉/none |
| 預設值 | 需明確指定；關閉同時清除一般特效／天氣／濾鏡 |
| 時間單位 | 既有CSS時間 |
| 素材格式 | 無 |
| 編輯模式 | 事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留 |
| 匯入解析 | 已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs |
| 遊戲播放 | 既有執行器已實作；真實視覺、聽感、觸控待驗 |
| 匯出與重匯 | serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版 |
| 舊語法 | effect |
| 常見錯誤與限制 | 缺少／重名素材、缺少標籤、錯誤檔案類型；一般特效軌與角色motion不同；重複相同特效是否重啟需真實視覺驗收 |
| 實際測試依據 | 對應「P1-C reference: 特效」解析／重匯測試；C2測試與限制另見驗收報告 |

## 結束

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 結束 |
| 內部事件／資料型別 | end |
| 正確語法 | 結束:晚安，明天見。; |
| 參數 | 內容=結局名稱 |
| 允許值 | 內容=結局名稱 |
| 預設值 | 空白為故事結束；解鎖以事件ID識別 |
| 時間單位 | 無 |
| 素材格式 | 無 |
| 編輯模式 | 事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留 |
| 匯入解析 | 已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs |
| 遊戲播放 | 既有執行器已實作；真實視覺、聽感、觸控待驗 |
| 匯出與重匯 | serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版 |
| 舊語法 | end |
| 常見錯誤與限制 | 缺少／重名素材、缺少標籤、錯誤檔案類型；可多個end，依分支抵達；章節接續依專案章節設定 |
| 實際測試依據 | 對應「P1-C reference: 結束」解析／重匯測試；C2測試與限制另見驗收報告 |

## 事件資料

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 事件資料 |
| 內部事件／資料型別 | 依JSON的type |
| 正確語法 | 事件:{"type":"dialogue","name":"小春","text":"早安"}; |
| 參數 | 完整事件JSON；id省略才產生新ID；type需為30種現有事件之一 |
| 允許值 | event-catalog.mjs的eventLabels；含cg、minigame、repeat／repeatEnd等無中文專用指令型別 |
| 預設值 | 各事件播放器預設；沒有自動猜測素材檔名 |
| 時間單位 | duration通常秒；motionDuration／cameraDuration／crossfade為毫秒 |
| 素材格式 | 使用已匯入素材ID，不是檔名；resourceRefs可保留來源 |
| 編輯模式 | 程式編輯器對應檔案類型；產生資料與GUI共用 |
| 匯入解析 | 由compileProgram處理；不要貼入錯誤檔案類型 |
| 遊戲播放 | 由既有專案設定／事件執行，不是逐行設定指令播放器 |
| 匯出與重匯 | 既有程式檔保存原source；劇情事件以JSON保留 |
| 舊語法 | r49～r52既有事件JSON不改格式 |
| 常見錯誤與限制 | 重複積木須配對loopId；原型欄位被拒絕；重複或跨章事件ID會阻擋套用 |
| 實際測試依據 | 對應P1-C program reference測試 |

## 設定檔

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 設定檔 |
| 內部事件／資料型別 | 專案settings，非劇情事件 |
| 正確語法 | 設定:{"textSpeed":35,"subtitle":"測試作品"}; |
| 參數 | 設定JSON，與現有專案設定合併 |
| 允許值 | 既有settings欄位；不是任意腳本執行 |
| 預設值 | 未提供欄位維持原值 |
| 時間單位 | textSpeed字／秒，其他依原settings欄位 |
| 素材格式 | 素材ID |
| 編輯模式 | 程式編輯器對應檔案類型；產生資料與GUI共用 |
| 匯入解析 | 由compileProgram處理；不要貼入錯誤檔案類型 |
| 遊戲播放 | 由既有專案設定／事件執行，不是逐行設定指令播放器 |
| 匯出與重匯 | 既有程式檔保存原source；劇情事件以JSON保留 |
| 舊語法 | options.koi既有格式 |
| 常見錯誤與限制 | 應使用options檔案；不保證未知settings欄位有作用 |
| 實際測試依據 | 對應P1-C program reference測試 |

## 遊戲介面檔

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 遊戲介面檔 |
| 內部事件／資料型別 | settings.gameUI，非劇情事件 |
| 正確語法 | 介面:desktop\|{"elements":{"dialogue":{"x":5,"y":72,"w":90,"h":22}}}; |
| 參數 | desktop／mobile\|JSON；elements／既有UI欄位 |
| 允許值 | desktop、mobile；x/y/w/h百分比、fontSize正值 |
| 預設值 | 未提供元件維持原值 |
| 時間單位 | 無 |
| 素材格式 | image／hoverImage為素材ID或唯一檔名 |
| 編輯模式 | 程式編輯器對應檔案類型；產生資料與GUI共用 |
| 匯入解析 | 由compileProgram處理；不要貼入錯誤檔案類型 |
| 遊戲播放 | 由既有專案設定／事件執行，不是逐行設定指令播放器 |
| 匯出與重匯 | 既有程式檔保存原source；劇情事件以JSON保留 |
| 舊語法 | gui.koi既有格式 |
| 常見錯誤與限制 | 不是新的工程模式；錯誤尺寸或缺少資源阻擋套用 |
| 實際測試依據 | 對應P1-C program reference測試 |

## 功能畫面檔

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 功能畫面檔 |
| 內部事件／資料型別 | settings.menuTemplates，非劇情事件 |
| 正確語法 | 畫面:save@mobile\|{"elements":{"header":{"fontSize":14}}}; |
| 參數 | 頁面[@裝置]\|JSON |
| 允許值 | save、load、history、settings、gallery；desktop／mobile |
| 預設值 | 省略裝置為desktop；原元件維持，layoutActive=true |
| 時間單位 | 無 |
| 素材格式 | image／hoverImage為素材ID或唯一檔名 |
| 編輯模式 | 程式編輯器對應檔案類型；產生資料與GUI共用 |
| 匯入解析 | 由compileProgram處理；不要貼入錯誤檔案類型 |
| 遊戲播放 | 由既有專案設定／事件執行，不是逐行設定指令播放器 |
| 匯出與重匯 | 既有程式檔保存原source；劇情事件以JSON保留 |
| 舊語法 | screens.koi既有格式 |
| 常見錯誤與限制 | 一行一個指令；只編輯既有功能畫面 |
| 實際測試依據 | 對應P1-C program reference測試 |

## 互動模組檔

| 欄位 | 說明 |
|---|---|
| 中文名稱 | 互動模組檔 |
| 內部事件／資料型別 | extensions.activities，非劇情事件 |
| 正確語法 | 模組:{"id":"chat","kind":"messages","name":"放學訊息","items":[{"id":"m1","text":"校門口見"}]}; |
| 參數 | 模組JSON；id、kind必填，最多1000項items |
| 允許值 | messages、sns、call、map、investigate、qte、rhythm等現有activityKinds |
| 預設值 | 同ID更新；新ID新增；items省略為空陣列 |
| 時間單位 | 依模組欄位 |
| 素材格式 | image/audio/endAudio/video與有效targetEvent |
| 編輯模式 | 程式編輯器對應檔案類型；產生資料與GUI共用 |
| 匯入解析 | 由compileProgram處理；不要貼入錯誤檔案類型 |
| 遊戲播放 | 由既有專案設定／事件執行，不是逐行設定指令播放器 |
| 匯出與重匯 | 既有程式檔保存原source；劇情事件以JSON保留 |
| 舊語法 | extensions.koi既有格式 |
| 常見錯誤與限制 | 不是任意外部程式；引用不存在事件或素材阻擋套用 |
| 實際測試依據 | 對應P1-C program reference測試 |

## 相容性與限制

既有舊指令：audioStop、activity、model、camera、weather、filter、playVideo、playEffect、bgm、sound、intro、changeBg、changeFigure、setAnimation、setTransform、miniAvatar、setTextbox、fade、pause、wait、variable、condition、input、effect、choose、label、scene、jumpLabel、changeScene、callScene、end、dialogue、narration、unlockCg、unlockBgm。callScene僅可診斷為jump，不建立返回堆疊；這不是完整WebGAL相容執行器。原生等待與舊pause為秒，舊wait與duration／delayTime為毫秒。動畫省略wait的舊事件非等待，新中文動作預設等待；明確false不等待。循環motion需事件JSON的motionLoop，等待只等一個週期。

r4角色狀態修補：慢速換場不會重建已完成退場的舊實例；舊存檔缺少position時，位置識別沿用既有渲染的中央預設，多角色仍必須唯一。空白或null目標不會被自動替換。完整JSON、素材與互動定義缺失時，不能只靠事件副本宣稱整個專案播放通過。

0.40.12_r2：repeat事件明確指定repeatMode為until時，以until布林運算式控制，count為安全上限；只用既有事件JSON，不新增中文指令。新條件模式需要r1播放器，舊次數repeat及舊腳本語意不變。角色引用只附加blockInputs來源資料，對話name仍保存執行文字。範例見koi-script-repeat-until-example.txt；操作與限制見04012-r2-release-notes.md。

動畫目標：精確角色ID優先，其次唯一位置別名；null、空字串、已移除或不存在的目標有執行診斷。-目標參數省略仍保留lastActor舊規則，初始fig-center；多角色不要省略。stage-main已由真實渲染層支援；不含對話／操作UI。

事件JSON的素材欄位使用資源ID；原生文字指令使用檔名或唯一完整路徑。重複檔名不任意選取。未支援英文set/change/unlock/play指令會診斷；其他「姓名:文字」保留為角色對話，不保證能辨認所有拼字錯誤。未知參數可能被忽略，請依表格使用。

原生條件標籤限同腳本；跨章用跳轉或GUI／事件JSON。劇本與options/gui/screens/extensions檔案類型不可混用。音樂逐事件volume/loop尚未套用、模型只提供自帶HTML橋接；不要把可解析視為所有功能已驗證。

錯誤範例另見koi-script-errors.txt，該檔故意解析有診斷，不列為可玩範本。完整短篇與舊語法範本均有實際解析、重匯及兩條路線抵達結局測試。
