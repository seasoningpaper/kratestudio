import React from 'react';
import {formatCapacity} from './storage-format.mjs';
import {WRITE_LIMIT} from './storage-policy.mjs';
export default function CapacityMeter({capacity,children}) {
 const bytes=capacity?.bytes||0,limit=capacity?.limit||5e9,remaining=Math.max(0,limit-bytes);
 return <>
  <b>專案容量 {capacity?formatCapacity(bytes):'計算中…'} / {(limit/1e6).toLocaleString('zh-TW')} MB</b>
  <div className="capacity-segments" role="progressbar" aria-label="專案容量（5.0 GB 政策上限）" aria-valuemin={0} aria-valuemax={limit} aria-valuenow={Math.min(bytes,limit)} aria-valuetext={`已使用 ${formatCapacity(bytes)}；剩餘 ${formatCapacity(remaining)}`}>
   {capacity?.categories.map(c=><i key={c.id} title={`${c.label}：${formatCapacity(c.bytes)}`} style={{backgroundColor:c.color,width:Math.min(100,c.bytes/limit*100)+'%'}}/>)}
  </div>
  <div className="capacity-totals"><span>已使用 {formatCapacity(bytes)}</span><span>剩餘 {formatCapacity(remaining)}</span></div>
  <ul className="capacity-legend" aria-label="各類素材容量">{capacity?.categories.map(c=><li key={c.id} data-empty={!c.bytes||undefined}><i style={{backgroundColor:c.color}} aria-hidden="true"/><span>{c.label}</span><span title={c.bytes+' bytes'}>{formatCapacity(c.bytes)}</span></li>)}</ul>
  <span>{capacity?.browserAvailable!=null?'瀏覽器估計可用 '+formatCapacity(capacity.browserAvailable):'瀏覽器未提供可用空間估計'}</span>
  {capacity?.experimental&&<span role="status">實驗測試專案：4～5 GB 瀏覽器壓力測試待驗，請勿存放唯一的重要資料。</span>}
  <details><summary>儲存說明</summary>
   <p>5.0 GB 為應用程式政策目標，非保證的瀏覽器空間。{capacity?.experimental?'本專案已啟用實驗寫入路徑，上限 5,000 MB；仍受實際配額限制。':<>一般寫入上限 {(WRITE_LIMIT/1e9).toFixed(1)} GB；5.0 GB 瀏覽器儲存尚未開放。</>}瀏覽器估計值由整個網站共用。</p>
   <p>圖片／音訊單檔上限 128 MiB，影片 512 MiB。JSON 備份及遊戲 ZIP 封裝上限 256 MB；較大專案請使用 .koib 串流備份。請定期保存獨立備份。</p>{children}
  </details>
 </>;
}
