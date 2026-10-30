import {test} from 'node:test';
import assert from 'node:assert/strict';
import {CloseGuard,SaveHandshake} from '../src/close-guard.ts';

test('關閉先等待儲存完成，重複關閉共用一次交易',async()=>{
 let release!:(value:boolean)=>void,saves=0;
 const guard=new CloseGuard({save:()=>{saves++;return new Promise(r=>{release=r})},choose:async()=>{assert.fail('成功儲存不需確認')}});
 const a=guard.request(),b=guard.request();assert.equal(a,b);assert.equal(saves,1);release(true);assert.equal(await a,true);
});
test('儲存失敗或拋錯且選擇取消時必須留在程式',async()=>{
 for(const save of [async()=>false,async()=>{throw Error('磁碟已滿')}]){
  const guard=new CloseGuard({save,choose:async()=> 'cancel'});assert.equal(await guard.request(),false);
 }
});
test('只有明確放棄或成功重試才能在儲存失敗後離開',async()=>{
 const discard=new CloseGuard({save:async()=>false,choose:async()=> 'discard'});assert.equal(await discard.request(),true);
 let attempts=0;const retry=new CloseGuard({save:async()=>++attempts===2,choose:async()=> 'retry'});assert.equal(await retry.request(),true);assert.equal(attempts,2);
});
test('每次關閉最多兩次儲存嘗試，不會無限重試',async()=>{
 let attempts=0;const guard=new CloseGuard({save:async()=>{attempts++;return false},choose:async()=> 'retry'});assert.equal(await guard.request(),false);assert.equal(attempts,2);
});
test('關閉握手拒絕過期、偽造及非布林回覆',async()=>{
 let request='';const handshake=new SaveHandshake({id:()=> 'request-1',send:id=>{request=id}}),pending=handshake.request();assert.equal(request,'request-1');
 assert.equal(handshake.acknowledge('old',true),false);assert.equal(handshake.acknowledge(request,'true'),false);assert.equal(handshake.acknowledge(request,true),true);assert.equal(await pending,true);assert.equal(handshake.acknowledge(request,true),false);
});
test('Renderer無回應或無法發送時不允許離開',async()=>{
 const h=new SaveHandshake({id:()=> 'id',send:()=>{},timeoutMs:5});assert.equal(await h.request(),false);
 const broken=new SaveHandshake({id:()=> 'id',send:()=>{throw Error('renderer已停止')}});assert.equal(await broken.request(),false);
});
