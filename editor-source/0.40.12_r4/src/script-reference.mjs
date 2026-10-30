// Documentation data describes the existing parser and renderer; it is not another parser.
import{koiCommands,legacyCommands}from'./script-import.mjs';
const image='PNG、JPG/JPEG、WebP、GIF、AVIF、SVG、BMP；須瀏覽器可解碼';
const audio='MP3、WAV、M4A、OGG、Opus、AAC、FLAC；匯入接受不等於瀏覽器可解碼';
const video='MP4、WebM、OGV、MOV；建議H.264 MP4／WebM，須瀏覽器可解碼';
// type, parameters/values, defaults, time, assets, legacy, limitations
const details={
 '停止音訊':['audioStop','內容：背景音樂／音樂／語音／音效／全部，或music／voice／sound／all；-素材=檔名只篩選音效','空白通道為all；未知通道診斷且不停止原音樂；素材省略即該通道全部','無',audio,'audioStop','不支援以素材參數停止指定BGM；語音停止到下一句新語音'],
 '互動':['activity','內容=既有模組ID或名稱；-變數=結果變數','變數=互動分數','由模組決定','模組可引用圖片／音訊／影片','activity','需先建立模組；不是外部任意JavaScript指令'],
 '鏡頭':['camera','-x、-y=百分比；-倍率/-zoom=0.25～6；-秒數；-晃動/-shake=0～60；-跟隨/-follow=true/false','x=50、y=50、倍率=1、1秒、晃動=0、跟隨=false','秒數為秒；duration為毫秒', '無','camera','跟隨使用目前對話name／voiceActor的精確角色鍵；不自動解析動態目標；split只可由事件JSON／GUI設定'],
 '模型':['model','內容=已匯入HTML播放器ID／名稱；none隱藏','省略名稱不會自動選模型','無','擴充中的自帶HTML播放器','model','有sandbox橋接，非原生Live2D／Spine載入器；實際模型由作者播放器提供'],
 '天氣':['effect','下雨/rain、落葉/leaves、飄雪/snow、櫻花/sakura、揚塵/dust、關閉/none','需明確指定','無','無','weather','只改天氣軌，不改濾鏡；未知值不保證有效果'],
 '濾鏡':['effect','泛黃/sepia、黑白/mono、夜視/nightvision、故障/glitch、暗角/vignette、關閉/none','需明確指定','無','無','filter','只改濾鏡軌；實際視覺待真人'],
 '影片':['video','內容=影片檔名；-可略過/-skip、-靜音/-muted、-填滿/-cover=true/false；-音量/-volume=0～100','可略過=false、靜音=false、包含、音量=100；播放完成後繼續','影片素材的真實時間；裁切／倍速在素材設定',video,'playVideo','拒播有播放入口；格式錯誤可繼續；預設暫停BGM。瀏覽器codec／音訊政策未驗'],
 '背景':['background','內容=圖片檔名或完整相對路徑；none清空素材使用預設場景','保留角色(clearActors=false)','無',image,'changeBg','原生指令沒有fit／position參數，使用GUI或事件JSON的imageFit/bgX/bgY/bgScale'],
 '立繪':['character','內容=圖片檔名／none；-id=自訂角色ID；-左/-left、-中/-center、-右/-right；-上/-top、-下/-bottom、-垂直置中/-middle；-動畫=內建名稱（退場可用淡出／向左退場／向右退場／向上退場／向下退場）；-秒數；-等待=true/false；-變形=JSON','位置中、底部；未指定id使用fig-位置並取代該位置；自訂id使用keep；未指定動畫無動作；原生等待true、舊changeFigure false','秒數為秒；duration為毫秒；只有有動作且等待才阻擋',image,'changeFigure','同一ID代表替換同一角色，不是新增同名副本；多名顯示名稱相同者需不同-id；none以相同ID移除；有退場動作時保留到完成，只移除指定角色。位置別名不唯一時診斷；立即退場保留舊規則'],
 '動作':['animation','內容=淡入／淡出／左側進入／右側進入／上方進入／下方進入／移至中央／搖晃／彈跳／旋轉／呼吸／放大／縮小／平移／下方滑入淡入／左方滑入淡入／右方滑入淡入／柔和拉近／翻轉登場／關閉；-目標/-target=角色ID、位置別名、bg-main、stage-main；-秒數；-等待=true/false','目標參數省略：保留最後立繪ID，初始fig-center；明確空字串錯誤；1秒；原生等待true、舊setAnimation false','秒數為秒；duration為毫秒，播放器100～120000毫秒', '無','setAnimation','位置別名只有唯一角色才解析；精確角色鍵優先；角色已隱藏／不存在有執行診斷。省略目標的舊規則不會推斷所有角色'],
 '變形':['animation','內容=JSON；position:{x,y}、scale:{x,y}、rotation、alpha；-目標；-秒數；-等待','位置變動未指定不覆寫；scale預設1、alpha不指定不覆寫；預設無motion；原生等待true、舊setTransform false','position以1920×1080設計座標換百分比；y正值向上；rotation為弧度；秒數為秒','無','setTransform','scale.y控制整體百分比，scale.x/y控制寬比例與水平翻轉；不是任意動畫曲線引擎'],
 '對話':['dialogue','角色|內容；-語音/-voice=音訊檔；-字速/-speed=每秒字數；-字級/-fontSize=設計字級；-文字顏色/-fontColor=CSS色；-字體/-font=字型；**粗體**；{變數}','字速／字體／字級依專案與玩家偏好；語音省略不播放','字速=字／秒',audio,'dialogue 或 角色：內容','文字會去除前後空白；換行請用事件JSON的\\n；保留分號／|時用反斜線；數字或布林的純文字值以事件JSON明確指定'],
 '旁白':['dialogue','內容及對話相同文字／語音／字體參數；不帶角色|前綴','name=旁白，showName=false','同對話',audio,'narration 或沒有冒號的文字','不是新的獨立事件型別'],
 '過場':['intro','標題|副標；-秒數；-等待/-hold=true/false；-背景色；-文字顏色；-字級=數值或small/medium/large；-動畫=舊動畫代碼','1.5秒、等待=false、字級36、黑底白字、fade；|轉換行','秒數為秒；舊delayTime為毫秒','無','intro','等待true改為手動繼續；duration不是此舊指令的delayTime別名'],
 '頭像':['avatar','內容=圖片檔名或none','none隱藏','無',image,'miniAvatar','與舞台立繪分離'],
 '文字框':['textbox','顯示/show 或 隱藏/hide','除了hide之外目前皆為顯示，請使用列出值','無','無','setTextbox','不清除角色或對話記錄；會保留到再次顯示'],
 '音樂':['music','內容=配樂檔名或none；-音量/-volume=0～100；-循環/-loop=true/false','預設循環true、音量100；與玩家音量相乘；none停止','跨淡化由專案musicCrossfade毫秒決定',audio,'bgm','逐事件音量／循環套用至主配樂；內建鋼琴loop=false播放一輪旋律。同檔新cue重新開始；鑑賞正常瀏覽不重啟。分軌gain獨立，重複來源沿用既有合併規則'],
 '音效':['sound','內容=音效檔名；-循環/-loop=true/false；-音量/-volume=0～100','循環=false，音量=100；跨對話保留已啟動音效','素材時間；循環需停止音訊解除',audio,'sound、playEffect','每個播放cue獨立；語音屬對話事件，不使用此指令代替'],
 '解鎖音樂':['unlockBgm','內容=音訊檔名；-名稱/-name=鑑賞名稱','名稱=檔名','無',audio,'unlockBgm','只解鎖，不自行試聽或切換BGM'],
 '解鎖圖片':['unlockCg','內容=圖片檔名；-名稱/-name=鑑賞名稱','名稱=檔名','無',image,'unlockCg','只解鎖，不顯示全畫面CG；全畫面CG用GUI／事件JSON'],
 '淡幕':['fade','黑/out或亮/in；-秒數','方向非out為in；1秒','秒數為秒；duration為毫秒','無','fade','會維持最後黑幕狀態到亮；不是背景圖片切換'],
 '等待':['wait','內容=非負秒數','無效內容目前回退0；請輸入有限非負數','原生等待／舊pause為秒；舊wait為毫秒','無','pause、wait','等待時保持先前對話，不寫入等待說明到歷史'],
 '標籤':['section','內容=腳本內唯一標籤','不允許重複；位置為發出section事件的索引','無','無','label、scene；註解「; 場景:NAME」舊格式','作用域為這次匯入的腳本，不是跨檔案全域命名空間'],
 '選項':['choice','問題:文字:標籤|文字:標籤；可省略問題；目的可為同腳本標籤或既有章節名／ID','問題省略=請選擇；目的缺少保持未連接並診斷','逾時只在GUI／事件JSON設定','無','choose','選項文字的冒號會參與拆分；避免歧義，複雜內容用事件JSON；分支後合流需明確跳轉'],
 '跳轉':['jump','內容=標籤或既有章節名／ID，可帶.txt副檔名','目的需存在；不猜測無效索引／章節','無','無','jumpLabel、changeScene；callScene只作jump且有不相容診斷','不提供call／return堆疊；章節同名時請用唯一ID'],
 '變數':['variable','內容=變數名；-運算/-operation=設定/set、增加/add、減少/subtract；-值/-value=數字、true、false、文字','運算set、值0；新增變數由既有模型補登記','無','無','variable','數字樣式字串與true/false會自動轉型；需要純字串"true"／"001"用事件JSON或變數編輯器；加減只用數值'],
 '條件':['condition','內容=變數名；-比較/-operator===、!=、>、<、>=、<=；-值；-成立/-then=標籤；-否則/-else=標籤','比較>=、值1；兩個目的均須明確','無','無','condition','原生條件目的只解析這次腳本標籤；跨章條件先跳本地標籤，再使用跳轉；巢狀以多個條件及標籤組合'],
 '輸入':['input','內容=問題；-變數/-variable=保存變數名','玩家名稱；最多80字','無','無','input','輸入後可在名稱／對話使用{變數}'],
 '特效':['effect','搖晃/shake、閃光/flash、淡入/fade、關閉/none','需明確指定；關閉同時清除一般特效／天氣／濾鏡','既有CSS時間','無','effect','一般特效軌與角色motion不同；重複相同特效是否重啟需真實視覺驗收'],
 '結束':['end','內容=結局名稱','空白為故事結束；解鎖以事件ID識別','無','無','end','可多個end，依分支抵達；章節接續依專案章節設定']
};
export const commandReference=koiCommands.map(([name,syntax])=>{const[type,parameters,defaults,time,formats,legacy,limitations]=details[name];return{name,eventType:type,syntax,parameters,allowedValues:parameters,defaults,timeUnits:time,assetFormats:formats,editorModes:'事件／積木／流程圖／KOI Script；進階參數以事件JSON完整保留',parseStatus:'已由實際解析器辨識；測試tests/p1c-script-reference.test.mjs',playbackStatus:name==='音樂'?'逐事件音量／循環已通過模型、Mixer與控制計時DOM；真實聽感待驗':name==='模型'?'HTML播放器橋接已實作；自帶模型內容未驗':'既有執行器已實作；真實視覺、聽感、觸控待驗',roundTripStatus:'serializeEvents輸出事件JSON，再compileProgram保留ID與參數；不是還原作者原始排版',legacySyntax:legacy,commonErrors:'缺少／重名素材、缺少標籤、錯誤檔案類型；'+limitations,testResult:'對應「P1-C reference: '+name+'」解析／重匯測試；C2測試與限制另見驗收報告',limitations}});
export const programReference=[
 {name:'事件資料',eventType:'依JSON的type',syntax:'事件:{"type":"dialogue","name":"小春","text":"早安"};',kind:'script',parameters:'完整事件JSON；id省略才產生新ID；type需為30種現有事件之一',allowedValues:'event-catalog.mjs的eventLabels；含cg、minigame、repeat／repeatEnd等無中文專用指令型別',defaults:'各事件播放器預設；沒有自動猜測素材檔名',timeUnits:'duration通常秒；motionDuration／cameraDuration／crossfade為毫秒',assetFormats:'使用已匯入素材ID，不是檔名；resourceRefs可保留來源',legacySyntax:'r49～r52既有事件JSON不改格式',limitations:'重複積木須配對loopId；原型欄位被拒絕；重複或跨章事件ID會阻擋套用'},
 {name:'設定檔',eventType:'專案settings，非劇情事件',syntax:'設定:{"textSpeed":35,"subtitle":"測試作品"};',kind:'options',parameters:'設定JSON，與現有專案設定合併',allowedValues:'既有settings欄位；不是任意腳本執行',defaults:'未提供欄位維持原值',timeUnits:'textSpeed字／秒，其他依原settings欄位',assetFormats:'素材ID',legacySyntax:'options.koi既有格式',limitations:'應使用options檔案；不保證未知settings欄位有作用'},
 {name:'遊戲介面檔',eventType:'settings.gameUI，非劇情事件',syntax:'介面:desktop|{"elements":{"dialogue":{"x":5,"y":72,"w":90,"h":22}}};',kind:'gui',parameters:'desktop／mobile|JSON；elements／既有UI欄位',allowedValues:'desktop、mobile；x/y/w/h百分比、fontSize正值',defaults:'未提供元件維持原值',timeUnits:'無',assetFormats:'image／hoverImage為素材ID或唯一檔名',legacySyntax:'gui.koi既有格式',limitations:'不是新的工程模式；錯誤尺寸或缺少資源阻擋套用'},
 {name:'功能畫面檔',eventType:'settings.menuTemplates，非劇情事件',syntax:'畫面:save@mobile|{"elements":{"header":{"fontSize":14}}};',kind:'screens',parameters:'頁面[@裝置]|JSON',allowedValues:'save、load、history、settings、gallery；desktop／mobile',defaults:'省略裝置為desktop；原元件維持，layoutActive=true',timeUnits:'無',assetFormats:'image／hoverImage為素材ID或唯一檔名',legacySyntax:'screens.koi既有格式',limitations:'一行一個指令；只編輯既有功能畫面'},
 {name:'互動模組檔',eventType:'extensions.activities，非劇情事件',syntax:'模組:{"id":"chat","kind":"messages","name":"放學訊息","items":[{"id":"m1","text":"校門口見"}]};',kind:'extensions',parameters:'模組JSON；id、kind必填，最多1000項items',allowedValues:'messages、sns、call、map、investigate、qte、rhythm等現有activityKinds',defaults:'同ID更新；新ID新增；items省略為空陣列',timeUnits:'依模組欄位',assetFormats:'image/audio/endAudio/video與有效targetEvent',legacySyntax:'extensions.koi既有格式',limitations:'不是任意外部程式；引用不存在事件或素材阻擋套用'}
].map(v=>({...v,editorModes:'程式編輯器對應檔案類型；產生資料與GUI共用',parseStatus:'由compileProgram處理；不要貼入錯誤檔案類型',playbackStatus:'由既有專案設定／事件執行，不是逐行設定指令播放器',roundTripStatus:'既有程式檔保存原source；劇情事件以JSON保留',commonErrors:v.limitations,testResult:'對應P1-C program reference測試'}));
export{legacyCommands};
export const referenceFields=[['name','中文名稱'],['eventType','內部事件／資料型別'],['syntax','正確語法'],['parameters','參數'],['allowedValues','允許值'],['defaults','預設值'],['timeUnits','時間單位'],['assetFormats','素材格式'],['editorModes','編輯模式'],['parseStatus','匯入解析'],['playbackStatus','遊戲播放'],['roundTripStatus','匯出與重匯'],['legacySyntax','舊語法'],['commonErrors','常見錯誤與限制'],['testResult','實際測試依據']];
