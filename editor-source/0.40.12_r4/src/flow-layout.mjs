import{edges}from'./flow-math.mjs';
import{outputPorts}from'./connections.mjs';

export const FLOW_LIMIT=5000;
// Bounded layered layout: cycle edges are excluded only from visual ranking.
// Authored edges, array order, IDs and parameters are never changed.
export function layoutGraph(events){
 const n=events.length;if(n>FLOW_LIMIT)throw Error('自動排列上限為 5,000 個事件；請分章處理。');
 const links=edges(events),out=Array.from({length:n},()=>[]),incoming=Array.from({length:n},()=>[]);
 links.forEach((e,k)=>out[e.from].push(k));
 const color=new Uint8Array(n),feedback=new Set();
 for(let start=0;start<n;start++){if(color[start])continue;const stack=[{node:start,at:0}];color[start]=1;while(stack.length){const frame=stack.at(-1),list=out[frame.node];if(frame.at===list.length){color[frame.node]=2;stack.pop();continue}const k=list[frame.at++],to=links[k].to;if(color[to]===1)feedback.add(k);else if(!color[to]){color[to]=1;stack.push({node:to,at:0})}}}
 const degree=new Int32Array(n),rank=new Int32Array(n);links.forEach((e,k)=>{if(!feedback.has(k)){degree[e.to]++;incoming[e.to].push(e.from)}});
 const queue=[];for(let i=0;i<n;i++)if(!degree[i])queue.push(i);
 for(let q=0;q<queue.length;q++)for(const k of out[queue[q]]){if(feedback.has(k))continue;const e=links[k];rank[e.to]=Math.max(rank[e.to],rank[e.from]+1);if(!--degree[e.to])queue.push(e.to)}
 if(queue.length!==n)throw Error('流程圖循環分析未完成；原座標保持不變。');
 const rows=[];for(let i=0;i<n;i++)(rows[rank[i]]||=[]).push(i);
 const successors=out.map(list=>list.filter(k=>!feedback.has(k)).map(k=>links[k].to)),order=new Float64Array(n);
 const refresh=()=>rows.forEach(row=>row.forEach((v,j)=>order[v]=(j+.5)/row.length));refresh();
 // Four fixed sweeps, stable model-order tie breaks; no convergence loop.
 for(let sweep=0;sweep<4;sweep++){const down=sweep%2===0,list=down?rows:[...rows].reverse();for(const row of list){const score=v=>{const neighbors=down?incoming[v]:successors[v];return neighbors.length?neighbors.reduce((sum,x)=>{const list=out[x],slot=list.findIndex(k=>links[k].to===v);return sum+order[x]+(down&&list.length>1?(slot/(list.length-1)-.5)*.1:0)},0)/neighbors.length:order[v]};row.sort((a,b)=>score(a)-score(b)||order[a]-order[b]||a-b);row.forEach((v,j)=>order[v]=(j+.5)/row.length)}}
 const x=new Float64Array(n),gap=280;
 rows.forEach(row=>row.forEach((v,j)=>x[v]=(j-(row.length-1)/2)*gap));
 const pack=(row,neighbors)=>{const wanted=row.map(v=>neighbors[v].length?neighbors[v].reduce((s,a)=>s+x[a],0)/neighbors[v].length:x[v]),placed=[];for(let j=0;j<row.length;j++)placed[j]=j?Math.max(wanted[j],placed[j-1]+gap):wanted[j];const shift=(wanted.reduce((s,a)=>s+a,0)-placed.reduce((s,a)=>s+a,0))/Math.max(1,row.length);row.forEach((v,j)=>x[v]=placed[j]+shift)};
 for(let sweep=0;sweep<4;sweep++){for(const row of rows)pack(row,incoming);for(const row of [...rows].reverse())pack(row,successors)}
 const min=n?Math.min(...x):0;
 return{positions:Array.from(x,(v,i)=>({x:Math.round((80+v-min)*100)/100,y:40+rank[i]*160})),ranks:[...rank],feedback:[...feedback].map(k=>({...links[k]})),sweeps:4};
}

const segmentHits=(a,b,r)=>a.x===b.x?a.x>r.x&&a.x<r.x+216&&Math.max(a.y,b.y)>r.y&&Math.min(a.y,b.y)<r.y+r.h:a.y>r.y&&a.y<r.y+r.h&&Math.max(a.x,b.x)>r.x&&Math.min(a.x,b.x)<r.x+216;
const pathOf=points=>points.map((p,i)=>(i?'L':'M')+p.x+' '+p.y).join('');
export function routeFlowEdges(events,positions,{proxy=i=>i,height=()=>88}={}){
 const ids=[...new Set(events.map((_,i)=>proxy(i)))],rects=ids.map(i=>({...positions[i],h:height(i)}));
 if(!rects.length)return[];
 const left=Math.min(...rects.map(r=>r.x))-32,right=Math.max(...rects.map(r=>r.x+216))+32;let leftLane=0,rightLane=0;
 return edges(events).filter(e=>proxy(e.from)!==proxy(e.to)).map(e=>{
  const from=proxy(e.from),to=proxy(e.to),a=positions[from],b=positions[to],ports=outputPorts(events[e.from]),port=Math.max(0,ports.findIndex(p=>p.slot===e.slot)),sx=a.x+(port+1)/(ports.length+1)*216,sy=a.y+height(from),tx=b.x+108,ty=b.y,stub=10+Math.min(20,Math.min(port,ports.length-1-port)*2);
  const start={x:sx,y:sy},end={x:tx,y:ty};
  let points=[start,{x:sx,y:sy+stub},{x:tx,y:sy+stub},{x:tx,y:ty-12},end];
  const obstructed=ty<=sy+stub+12||points.slice(1).some((p,k)=>rects.some(r=>segmentHits(points[k],p,r)));
  if(obstructed){const useLeft=sx-left+tx-left<=right-sx+right-tx,rail=useLeft?left-8*leftLane++:right+8*rightLane++;points=[start,{x:sx,y:sy+stub},{x:rail,y:sy+stub},{x:rail,y:ty-12},{x:tx,y:ty-12},end]}
  const label={x:(points[1].x+points[2].x)/2+8,y:points[1].y-4};
  return{...e,points,path:pathOf(points),labelPoint:label,sideRoute:obstructed};
 });
}

// Exact rectangle-interior and proper orthogonal crossings for our polylines.
// Shared endpoints/collinear shared rails are not counted as crossings.
export function flowMetrics(points,routes,height=88){
 let overlaps=0,cardIntersections=0,crossings=0;const rects=points.map(p=>({...p,h:height}));
 for(let i=0;i<rects.length;i++)for(let j=i+1;j<rects.length;j++){const a=rects[i],b=rects[j];if(a.x<b.x+216&&a.x+216>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y)overlaps++}
 const segments=[];routes.forEach((e,route)=>e.points.slice(1).forEach((b,k)=>{const a=e.points[k];if(a.x===b.x&&a.y===b.y)return;for(const r of rects)if(segmentHits(a,b,r))cardIntersections++;segments.push({a,b,route})}));
 for(let i=0;i<segments.length;i++)for(let j=i+1;j<segments.length;j++){let a=segments[i],b=segments[j];if(a.route===b.route)continue;if(a.a.x!==a.b.x)[a,b]=[b,a];if(a.a.x!==a.b.x||b.a.y!==b.b.y)continue;const x=a.a.x,y=b.a.y;if(x>Math.min(b.a.x,b.b.x)&&x<Math.max(b.a.x,b.b.x)&&y>Math.min(a.a.y,a.b.y)&&y<Math.max(a.a.y,a.b.y))crossings++}
 return{overlaps,cardIntersections,crossings};
}
