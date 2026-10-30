import{readFile,writeFile}from'node:fs/promises';
const rows=JSON.parse(await readFile(new URL('../research/04012-r2/feature-inventory.json',import.meta.url),'utf8'));
const labels={A:'已實作且已驗證（限列明範圍）',B:'已實作但部分情境失敗',C:'有介面／指令但執行不完整',D:'尚未實作',E:'不適用',F:'尚未確認'},counts=Object.fromEntries(Object.keys(labels).map(k=>[k,rows.filter(r=>r.status===k).length]));
const clean=v=>String(v).replaceAll('|','／').replaceAll('\n',' ');
const md='# Koi Maker 0.40.12_r4 公開測試修訂版 — 功能完整度矩陣\n\n'+
'本公開測試版保留歷史功能清單；本輪積木位置、過場遮罩、唯讀除錯、容量整理與隔離實驗模式見[發布說明](04012-r4-release-notes.md)。一般寫入仍上限2 GiB；另建測試專案可啟用5GB實驗路徑，不宣稱瀏覽器4～5GB已驗證。作者可讀語法編輯器未完成。\n\n本表以可稽核的功能列項為分母，不是整個產品完成率。A只表示該列模型／DOM／離線格式測試通過；真實視覺、聽感、觸控與大型實機情境另列F，不算完成。合成專案使用隔離測試庫；不修改使用者正式資料。\n\n'+
'| 分類 | 定義 | 列項數 |\n|---|---|---:|\n'+Object.entries(labels).map(([k,v])=>'| '+k+' | '+v+' | '+counts[k]+' |').join('\n')+'\n\n總列項：'+rows.length+'。未知、未實作、不完整及不適用均不直接算完成，沒有任意產品完成百分比。每列ID固定，細分範圍與限制保留。\n\n'+
'| ID | 功能 | 分類 | 原始碼 | 測試依據（含保留歷史結果） | 限制 | 嚴重程度 | 建議工作包 | 是否阻擋發布 |\n|---|---|---|---|---|---|---|---|---|\n'+rows.map(r=>'| '+[r.id,r.feature,r.status,r.source,r.tests,r.limits,r.severity,r.nextPackage,r.blocksRelease?'是':'否'].map(clean).join(' | ')+' |').join('\n')+'\n\n資料安全的已知Critical／High須修復才發布；F是真正尚未確認的情境，不應宣稱通過。真實大型舊專案與裝置quota沒有保證；目前沒有已重現卻未處理的阻斷性資料安全問題。P1-C兩項Medium已由R2-E修復；R2新增功能與真人限制分列，歷史P1-C記錄保留。\n\nr2最新差異、測試、GUI及容量限制見research/04012-r2/；保留歷史列項不代表本輪全部重跑。官方參考、擷取限制與來源見research/p1c-20261020/OFFICIAL-REFERENCES.md；r3測試與新增限制見research/r3-20261021/；r2歷史見research/r2-20261021/；歷史P1-C測試仍於原目錄保留。\n';
await writeFile(new URL('../FEATURE-MATRIX.md',import.meta.url),md);await writeFile(new URL('../dist/feature-matrix.md',import.meta.url),md);
console.log(JSON.stringify({total:rows.length,counts}));
