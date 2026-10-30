import{prepareSceneAssets}from'./scene-assets.mjs';
import{useEffect,useRef,useState}from'react';
// Runtime clocks belong to the real Player. Saved remaining time lives in its cloned actors,
// never in project events. Tokens prevent an old callback deleting a replacement instance.
export function useCharacterExits(engine,paused){
 const[,redraw]=useState(0),clocks=useRef(new Map()),currentState=useRef(engine.state);
 const actors=engine.state.actors,key=JSON.stringify(Object.entries(actors).filter(([,a])=>a.exit).map(([id,a])=>[id,a.exit.token]));
 useEffect(()=>{if(currentState.current!==engine.state){clocks.current.clear();currentState.current=engine.state}const timers=[];let live=true;const alive=new Set();for(const[id,a]of Object.entries(engine.state.actors)){if(!a.exit)continue;const token=a.exit.token;alive.add(token);let clock=clocks.current.get(token);if(!clock){clock={remaining:Math.max(0,Number(a.exit.remaining)||0)};clocks.current.set(token,clock)}if(paused)continue;prepareSceneAssets([engine.p.images.find(v=>v.id===a.image)?.data].filter(Boolean)).then(()=>{if(!live)return;const started=performance.now(),timer=setTimeout(()=>{clock.remaining=0;if(engine.completeCharacterExit(id,token))redraw(v=>v+1)},clock.remaining);timers.push({timer,started,clock,id,token})})}for(const token of clocks.current.keys())if(!alive.has(token))clocks.current.delete(token);return()=>{live=false;for(const{timer,started,clock,id,token}of timers){clearTimeout(timer);clock.remaining=Math.max(0,clock.remaining-(performance.now()-started));if(engine.state.actors[id]?.exit?.token===token)engine.state.actors[id].exit.remaining=clock.remaining}}},[engine,engine.state,paused,key]);
}
