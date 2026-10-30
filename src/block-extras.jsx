import{assetOptions,audioOptions}from'./asset-options.mjs';
import{motionTargets,exitMotions}from'./motion-state.mjs';
import React from'react';
import{socketType}from'./value-sockets.mjs';
import{motions}from'./game-ui.mjs';
export default function BlockExtras({e,p,index,t,patch,fieldRenderer}){
 const field=(key,zh,en,type='text')=>fieldRenderer?fieldRenderer(key,zh,en,type):<label><span className="block-field-label">{t(zh,en)}</span><input aria-label={t(zh,en)+' '+(index+1)} type={type} step={type==='number'?.1:undefined} min={type==='number'?0:undefined} value={e[key]??''} onChange={ev=>patch({[key]:type==='number'?Number(ev.target.value):ev.target.value})}/></label>;
 const pick=(key,zh,en,list)=><label><span className="block-field-label">{t(zh,en)}</span><select aria-label={t(zh,en)+' '+(index+1)} value={e[key]??''} onChange={ev=>patch({[key]:ev.target.value})}><option value="">{t('未指定','Not set')}</option>{list.map(([id,label])=><option key={id} value={id}>{label}</option>)}</select></label>;
 const check=(key,zh,en,initial=false)=>fieldRenderer&&socketType(e,key)==='boolean'?fieldRenderer(key,zh,en,'checkbox'):<label><input type="checkbox" checked={e[key]??initial} onChange={ev=>patch({[key]:ev.target.checked})}/><span className="block-field-label">{t(zh,en)}</span></label>;
 const images=assetOptions(p.images,e.image);
 return <>
 {['character','animation'].includes(e.type)&&check('wait','等待動畫完成','Wait for animation')}
 {['background','character','animation'].includes(e.type)&&<>{pick('motion','動作','Motion',Object.entries(e.type==='character'&&e.action==='hide'?{none:'立即退場',...exitMotions}:motions))}{field('motionDuration','動畫毫秒','Animation ms','number')}{pick('motionEase','動畫曲線','Easing',['linear','ease','ease-in','ease-out','ease-in-out'].map(x=>[x,x]))}{check('motionLoop','循環動畫','Loop animation')}</>}
 {e.type==='activity'&&pick('activity','互動模組','Interactive module',(p.extensions?.activities||[]).map(a=>[a.id,a.name]))}
 {e.type==='camera'&&<>{field('cameraX','鏡頭 X %','Camera X','number')}{field('cameraY','鏡頭 Y %','Camera Y','number')}{field('cameraZoom','鏡頭倍率','Camera zoom','number')}{field('cameraDuration','鏡頭毫秒','Camera ms','number')}{field('cameraShake','晃動強度','Shake strength','number')}</>}
 {e.type==='choice'&&<>{field('timeout','限時秒數（0 關閉）','Timeout seconds','number')}{field('timeoutOption','逾時選項（從 0 起）','Timeout option','number')}</>}
 {e.type==='animation'&&pick('target','動畫目標','Animation target',motionTargets(p))}
 {e.type==='character'&&<>{pick('replaceMode','替換方式','Replace mode',[['slot',t('替換位置原立繪','Replace slot')],['keep',t('保留其他角色','Keep actors')]])}{field('zIndex','目標圖層','Layer','number')}{pick('action','角色登場／退場','Show or hide',[['show',t('登場','Show')],['hide',t('退場','Hide')]])}</>}
 {e.type==='background'&&<>{check('clearActors','清除舞台角色','Clear actors',true)}{pick('backgroundVideo','動態背景影片','Video backdrop',[['','無'],...p.videos.map(v=>[v.id,v.name])])}</>}
 {['avatar','cg'].includes(e.type)&&<>{pick('image',e.type==='avatar'?'小頭像':'CG 圖片',e.type==='avatar'?'Avatar':'CG image',[['none',t('隱藏','Hide')],...images])}{field('label','鑑賞名稱','Gallery name')}</>}
 {e.type==='textbox'&&check('visible','顯示對話框','Show dialogue box',true)}
 {e.type==='fade'&&<>{pick('direction','轉場方向','Direction',[['out',t('漸黑','Fade out')],['in',t('漸亮','Fade in')]])}{field('duration','持續秒數','Duration seconds','number')}</>}
 {e.type==='dialogue'&&field('speed','文字速度','Text speed','number')}
 {e.type==='dialogue'&&pick('voiceActor','語音位置','Voice position',[['fig-left','左'],['fig-center','中'],['fig-right','右']])}
 {e.type==='sound'&&pick('actor','音效位置','Sound position',[['fig-left','左'],['fig-center','中'],['fig-right','右']])}
 {e.type==='audioStop'&&pick('channel','停止音軌','Stop channel',[['all','全部音訊'],['music','背景音樂'],['voice','語音'],['sound','音效']])}
 {e.type==='sound'&&<>{check('loop','循環播放','Loop sound')}{field('volume','音量 %','Volume %','number')}</>}
 {e.type==='music'&&field('crossfade','交叉淡化毫秒','Crossfade ms','number')}
 {e.type==='effect'&&<>{pick('effect','畫面效果','Effect',[['none',t('無','None')],['fade',t('淡入','Fade')],['shake',t('震動','Shake')],['flash',t('閃光','Flash')],['rain','下雨'],['snow','飄雪'],['leaves','落葉'],['sakura','櫻花'],['dust','揚塵'],['filter:sepia','泛黃'],['filter:mono','黑白'],['filter:nightvision','夜視'],['filter:glitch','故障'],['filter:vignette','暗角'],['filter:none','取消濾鏡']])}{field('duration','持續秒數','Duration seconds','number')}</>}
 {e.type==='intro'&&<>{field('text','標題文字','Title text')}{field('introFont','字體大小','Font size','number')}{field('duration','持續秒數','Duration seconds','number')}{field('fontColor','文字顏色','Text color')}{field('backgroundColor','背景顏色','Background color')}</>}
 {e.type==='input'&&<>{field('text','輸入提示','Prompt')}{pick('variable','儲存變數','Store variable',Object.keys(p.variables||{}).map(k=>[k,k]))}</>}
 {e.type==='unlockBgm'&&field('label','鑑賞名稱','Gallery name')}
 {['dialogue','intro'].includes(e.type)&&pick('voice','語音','Voice',audioOptions(p,e.voice,'voice'))}
 
 {e.type==='video'&&<>{check('skippable','允許略過','Allow skip',true)}{check('muted','靜音','Mute')}{field('volume','影片音量 0–100','Video volume 0–100','number')}</>}
 {e.type==='choice'&&<button onClick={()=>patch({options:[...e.options||[],{text:t('新選項','New option'),target:null}]})}>{t('加入選項','Add option')}</button>}
 </>
}
