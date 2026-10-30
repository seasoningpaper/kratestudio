import{writeFile}from'node:fs/promises';
import{fileURLToPath}from'node:url';
import{koiCommands}from'../src/script-import.mjs';
import{commandReference,programReference,referenceFields,legacyCommands}from'../src/script-reference.mjs';
const root=fileURLToPath(new URL('../dist/',import.meta.url));
const style='body{margin:0;background:#f8f6f7;color:#383238;font:17px/1.8 system-ui,sans-serif}main{max-width:1100px;margin:auto;padding:36px 22px}h1{font-weight:500}a{color:#8d4c68}.wrap{overflow:auto}table{border-collapse:collapse;width:100%;text-align:left}td,th{padding:14px;vertical-align:top}tr:nth-child(even){background:#eee7ed}td:nth-child(2){min-width:250px}code{white-space:pre-wrap;overflow-wrap:anywhere;font-size:14px}pre{padding:20px;background:#eee7ed;overflow:auto}th{white-space:nowrap}';
const example=`; KOI Script — Koi Maker 0.40.12_r4 範本（相容0.40.10語法）；UTF-8 .txt／.koi；先匯入素材
; 必要素材：room.png、hero.png、face.png、warm.mp3、voice.wav
; 動作明確指定haru；兩個選項都能抵達合法結局。此範本無需擴充模組。
音樂:warm.mp3 -音量=70 -循環=true;
解鎖音樂:warm.mp3 -名稱=午後的配樂;
背景:room.png;
解鎖圖片:room.png -名稱=回家的路;
天氣:櫻花;
濾鏡:關閉;
過場:放學之後|一杯可可的時間 -秒數=0.3;
立繪:hero.png -id=haru -左;
動作:淡入 -目標=haru -秒數=0.3 -等待=true;
頭像:face.png;
對話:小雪|辛苦了，喝杯熱可可吧。 -語音=voice.wav -字速=35;
頭像:none;
輸入:我該怎麼稱呼你？ -變數=玩家名稱;
對話:小雪|{玩家名稱}，今天過得如何？;
變數:好感度 -運算=設定 -值=0;
選項:要說些什麼？:謝謝妳等我:聊天|先去休息:休息;
標籤:聊天;
變數:好感度 -運算=增加 -值=3;
文字框:隱藏;
動作:移至中央 -目標=haru -秒數=0.3;
變形:{"position":{"x":0,"y":30},"scale":{"x":1,"y":1}} -目標=haru -等待=false;
等待:0.1;
文字框:顯示;
對話:小雪|那就坐下來，慢慢說吧。 -字級=32 -文字顏色=#403640;
條件:好感度 -比較=>= -值=3 -成立=溫暖結局 -否則=休息;
標籤:休息;
旁白:今天就先回去休息吧。;
跳轉:夜晚;
標籤:溫暖結局;
旁白:杯中的熱氣緩緩升起，疲憊似乎也淡了一點。;
跳轉:夜晚;
標籤:夜晚;
立繪:none -id=haru -動畫=向左退場 -秒數=0.2 -等待=true;
天氣:關閉;
特效:關閉;
淡幕:黑 -秒數=0.2;
停止音訊:音效;
音樂:none;
結束:一杯可可的時間;
`;
const legacy=`; KOI Script — Koi Maker 0.40.12_r4 舊語法相容範例；資源同主範本，wait/duration是毫秒。
bgm:warm.mp3;
changeBg:room.png;
changeFigure:hero.png -left -id=haru;
setAnimation:enter-from-left -target=haru -duration=200 -hold=true;
小雪:舊語法也能說話。 -voice=voice.wav;
wait:100;
choose:留下:留下|回家:回家;
label:留下;
setTransform:{"scale":{"x":1,"y":1}} -target=haru -hold=false;
jumpLabel:結尾;
label:回家;
narration:我們明天再見。;
label:結尾;
bgm:none;
end:相容範例結束;
`;
const errors=`; 以下故意含錯誤，只作診斷測試，不能當成可玩劇本。
跳轉:不存在;
動作:搖晃 -目標=;
背景:沒有這張圖.png;
標籤:重複;
標籤:重複;
事件:{"type":"unknown","text":"錯誤"};
`;
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const entries=[...commandReference,...programReference];
const text=(s)=>String(s).replaceAll('|','\\|').replaceAll('\n',' ');
const markdown='# KOI Script — Koi Maker 0.40.12_r4 完整指令參考\n\n以實際解析器、事件模型、序列化及播放器為依據。每個指令15個欄位；測試為模型／DOM自動化，未代替真人視覺、音訊與觸控。劇情事件以JSON往返保留，不保證還原作者原排版。\n\n'+entries.map(row=>'## '+row.name+'\n\n| 欄位 | 說明 |\n|---|---|\n'+referenceFields.map(([key,label])=>'| '+label+' | '+text(row[key])+' |').join('\n')+'\n').join('\n')+'\n## 相容性與限制\n\n'+
'既有舊指令：'+legacyCommands.join('、')+'。callScene僅可診斷為jump，不建立返回堆疊；這不是完整WebGAL相容執行器。原生等待與舊pause為秒，舊wait與duration／delayTime為毫秒。動畫省略wait的舊事件非等待，新中文動作預設等待；明確false不等待。循環motion需事件JSON的motionLoop，等待只等一個週期。\n\n'+
'r4角色狀態修補：慢速換場不會重建已完成退場的舊實例；舊存檔缺少position時，位置識別沿用既有渲染的中央預設，多角色仍必須唯一。空白或null目標不會被自動替換。完整JSON、素材與互動定義缺失時，不能只靠事件副本宣稱整個專案播放通過。\n\n'+
'0.40.12_r2：repeat事件明確指定repeatMode為until時，以until布林運算式控制，count為安全上限；只用既有事件JSON，不新增中文指令。新條件模式需要r1播放器，舊次數repeat及舊腳本語意不變。角色引用只附加blockInputs來源資料，對話name仍保存執行文字。範例見koi-script-repeat-until-example.txt；操作與限制見04012-r2-release-notes.md。\n\n'+
'動畫目標：精確角色ID優先，其次唯一位置別名；null、空字串、已移除或不存在的目標有執行診斷。-目標參數省略仍保留lastActor舊規則，初始fig-center；多角色不要省略。stage-main已由真實渲染層支援；不含對話／操作UI。\n\n'+
'事件JSON的素材欄位使用資源ID；原生文字指令使用檔名或唯一完整路徑。重複檔名不任意選取。未支援英文set/change/unlock/play指令會診斷；其他「姓名:文字」保留為角色對話，不保證能辨認所有拼字錯誤。未知參數可能被忽略，請依表格使用。\n\n'+
'原生條件標籤限同腳本；跨章用跳轉或GUI／事件JSON。劇本與options/gui/screens/extensions檔案類型不可混用。音樂逐事件volume/loop尚未套用、模型只提供自帶HTML橋接；不要把可解析視為所有功能已驗證。\n\n'+
'錯誤範例另見koi-script-errors.txt，該檔故意解析有診斷，不列為可玩範本。完整短篇與舊語法範本均有實際解析、重匯及兩條路線抵達結局測試。\n';
await writeFile(root+'koi-script-example.txt',example);await writeFile(root+'koi-script-legacy-example.txt',legacy);await writeFile(root+'koi-script-errors.txt',errors);await writeFile(root+'koi-script-reference.md',markdown);await writeFile(root+'koi-script-reference.json',JSON.stringify(entries,null,2)+'\n');
const details=entries.map(row=>'<h2>'+esc(row.name)+'</h2><div class="wrap"><table><tbody>'+referenceFields.map(([key,label])=>'<tr><th>'+label+'</th><td>'+(key==='syntax'?'<code>':'')+esc(row[key])+(key==='syntax'?'</code>':'')+'</td></tr>').join('')+'</tbody></table></div>').join('');
await writeFile(root+'koi-script-guide.html',`<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>KOI Script — Koi Maker 0.40.12_r4 語法表</title><style>${style}</style><main><p><a href="04012-r4-release-notes.md">0.40.12_r4 公開測試修訂版說明</a>。本輪保留原程式編輯器及內部事件 JSON；作者可讀語法編輯器仍待後續工作包，未更換解析器。</p><p><a href="04012-r2-release-notes.md">0.40.12_r2 新積木與首提交修補</a>　<a href="koi-script-repeat-until-example.txt" download>下載有上限重複直到範例</a></p><p><a href="r4-release-notes.md">r4 角色目標與退場修補說明</a></p><p><a href="r3-user-guide.md">r3 創作工具與模板操作說明</a></p><a href="/">← 返回 Koi Maker</a><h1>KOI Script　Koi Maker 0.40.12_r4 語法說明</h1><p>KOI Script 語言名稱、.koi 副檔名及0.40.10既有語法格式維持相容，這是製作器版本與品牌更新。</p><p>每行一個指令，以半形冒號分隔、分號結尾；全形冒號亦可。註解以分號開頭。開啟 UTF-8 .txt／.koi，或貼到「專案工具 → 劇本匯入」。素材需先匯入，以唯一檔名／相對路徑配對。</p><p><a href="/koi-script-example.txt" download>下載可匯入短篇範本</a>　<a href="/koi-script-legacy-example.txt" download>下載舊語法範本</a>　<a href="/koi-script-reference.md" download>下載完整參數說明</a></p><p>原生秒數與等待用秒；舊duration／delayTime／wait用毫秒。動作預設等待，可用-等待=false並行；舊事件未指定wait維持非等待。目標請明確填角色ID；空目標／不存在角色不會猜測作用對象。stage-main已支援整舞台演出。真實視覺、聽感、觸控與各瀏覽器codec仍待人工驗收。</p><div class="wrap"><table><thead><tr><th>指令</th><th>範例</th><th>說明</th></tr></thead><tbody>${koiCommands.map(row=>'<tr>'+row.map((v,i)=>`<${i?'td':'th'}>${i===1?'<code>':''}${esc(v)}${i===1?'</code>':''}</${i?'td':'th'}>`).join('')+'</tr>').join('')}</tbody></table></div><h2>完整短篇範本</h2><pre><code>${esc(example)}</code></pre><h2>舊版語法相容</h2><pre><code>${esc(legacy)}</code></pre><p>舊語法僅限已列子集；callScene不提供返回堆疊。對話、背景、動作等由既有事件模型執行；沒有另外一套腳本播放器。</p><h2>中文診斷範例</h2><pre><code>${esc(errors)}</code></pre><p>上例故意含錯誤：未找到目的場景、動畫目標不能為空、缺少素材、重複標籤、事件型別錯誤。該錯誤檔不是可玩範本。事件JSON重複ID或跨章ID會阻擋套用；未套用草稿遇到其他模式修改時保留草稿並阻擋覆寫。</p><h2>逐項參數與支援狀態</h2><p>下列35項包含30個中文劇情指令，以及事件JSON、設定、介面、功能畫面與模組語法。設定類需使用對應檔案類型；未知欄位不保證有作用。可解析不代表視覺、音訊或自帶模型已完成真人驗收。音樂逐事件音量／循環尚未套用，使用現有全域音量設定。</p>${details}<h2>未提供的能力</h2><p>無原生call／return堆疊、Live2D專用載入器或多軌async／await。CG、重複積木、小遊戲等現有功能可透過事件JSON及GUI保存；沒有新增未實作的中文指令。完整限制與測試依據見可下載的參數說明及驗收報告。</p></main></html>`);
