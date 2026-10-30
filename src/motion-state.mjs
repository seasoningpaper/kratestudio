import{placement}from'./placement.mjs';
export const exitMotions={fadeOut:'淡出',exitLeft:'向左退場',exitRight:'向右退場',exitUp:'向上退場',exitDown:'向下退場'};
export const animatedExit=e=>e?.type==='character'&&e.action==='hide'&&Object.hasOwn(exitMotions,e.motion);
export function completeCharacterExit(state,key,token){const actor=state.actors?.[key];if(!actor?.exit||actor.exit.token!==token)return false;delete state.actors[key];return true}
// A Player transition may await image decoding while the live exit clock completes.
// Reconcile only exits already pending when that transition was cloned. A new show,
// replacement, or animation in the candidate state owns its own token and is kept.
export function characterExitTokens(state){return new Map(Object.entries(state.actors||{}).filter(([,a])=>a.exit).map(([key,a])=>[key,a.exit.token]))}
export function reconcileCompletedExits(candidate,live,tokens){for(const[key,token]of tokens){if(!Object.hasOwn(live.actors||{},key)&&candidate.actors?.[key]?.exit?.token===token)delete candidate.actors[key]}return candidate}
export function finishCharacterExits(state,eventId){for(const[key,a]of Object.entries(state.actors||{}))if(a.exit&&(eventId===undefined||a.exit.eventId===eventId))completeCharacterExit(state,key,a.exit.token)}
export const motionWait=e=>!!e&&['animation','character'].includes(e.type)&&e.wait===true&&(e.type==='animation'||(e.action==='hide'?animatedExit(e):!!e.motion&&e.motion!=='none'));
export const motionMilliseconds=e=>Math.max(100,Math.min(120000,Number.isFinite(Number(e?.motionDuration))?Number(e.motionDuration):800));
export function resolveActorTarget(state,target){if(!['string','number'].includes(typeof target))return null;target=String(target).trim();if(!target)return null;if(Object.hasOwn(state.actors||{},target))return target;const position={'fig-left':'left','fig-center':'center','fig-right':'right'}[target];if(!position)return null;const found=Object.keys(state.actors||{}).filter(k=>placement(state.actors[k]).position===position);return found.length===1?found[0]:null}
export function actorTargetDiagnostic(state,target,kind){const names=Object.entries(state.actors||{}).slice(0,12).map(([key,a])=>key+'（'+({left:'左',center:'中',right:'右'}[placement(a).position])+'）');return kind+'不存在或不唯一：'+String(target)+'。目前舞台：'+(names.join('、')||'沒有角色')+'。請使用舞台角色實例 ID，或只有一位角色的位置識別。'}
export function motionTargets(p){const names=new Set(['bg-main','stage-main','fig-left','fig-center','fig-right']);for(const c of p.chapters||[])for(const e of c.events)if(e.type==='character'&&e.character)names.add(e.character);return [...names].map(k=>[k,({'bg-main':'背景','stage-main':'整個舞台','fig-left':'左側角色','fig-center':'中間角色','fig-right':'右側角色'})[k]||k])}
