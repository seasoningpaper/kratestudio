const toggle=document.querySelector('.menu'),nav=document.querySelector('.nav');
const setMenu=open=>{if(!toggle||!nav)return;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'關閉選單':'開啟選單');nav.classList.toggle('open',open)};
toggle?.addEventListener('click',()=>setMenu(toggle.getAttribute('aria-expanded')!=='true'));
nav?.addEventListener('click',event=>{if(event.target.closest('a'))setMenu(false)});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle?.getAttribute('aria-expanded')==='true'){setMenu(false);toggle.focus()}});
window.addEventListener('resize',()=>{if(window.innerWidth>1200)setMenu(false)});
const filters=[...document.querySelectorAll('[data-filter]')],query=document.querySelector('#work-query');
if(filters.length){
  const works=[...document.querySelectorAll('[data-work]')],empty=document.querySelector('[data-filter-empty]'),count=document.querySelector('#work-count');
  let category='all';
  const updateWorks=()=>{
    const words=(query?.value||'').normalize('NFKC').toLocaleLowerCase('zh-TW').trim().split(/\s+/).filter(Boolean);
    let visible=0;
    works.forEach(work=>{const text=(work.dataset.search||work.textContent).normalize('NFKC').toLocaleLowerCase('zh-TW');const matches=(category==='all'||(work.dataset.category||'demo')===category)&&words.every(word=>text.includes(word));work.hidden=!matches;if(matches)visible++});
    if(count)count.textContent=visible+' 個作品';
    empty.hidden=visible>0;
    empty.textContent=category==='community'?'目前尚未開放社群作品投稿。':'找不到符合的作品，試試其他關鍵字。';
  };
  filters.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.filter;filters.forEach(x=>x.setAttribute('aria-pressed',String(x===button)));updateWorks()}));
  query?.addEventListener('input',updateWorks);updateWorks();
}
const tablist=document.querySelector('[data-creation-tabs]');
if(tablist){
  const tabs=[...tablist.querySelectorAll('[role="tab"]')];
  const selectTab=(tab,focus=false)=>{tabs.forEach(button=>{const selected=button===tab;button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1;document.getElementById(button.getAttribute('aria-controls')).hidden=!selected});if(focus)tab.focus()};
  tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectTab(tab));tab.addEventListener('keydown',event=>{let target;if(event.key==='ArrowRight')target=(index+1)%tabs.length;if(event.key==='ArrowLeft')target=(index+tabs.length-1)%tabs.length;if(event.key==='Home')target=0;if(event.key==='End')target=tabs.length-1;if(target!==undefined){event.preventDefault();selectTab(tabs[target],true)}})});
}
// Decorative motion is automatic and never writes project or preference storage.
const home=document.querySelector('.home');
if(home){
  const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
  const applyMotion=()=>{home.dataset.motion=preference.matches?'reduced':'auto'};
  applyMotion();
  preference.addEventListener('change',applyMotion);
  const applyVisibility=()=>{home.dataset.backgroundHidden=String(document.hidden)};
  applyVisibility();
  document.addEventListener('visibilitychange',applyVisibility);
  // Progressive enhancement: content stays visible without JavaScript or observers.
  if('IntersectionObserver' in window){
    const reveal=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{if(entry.isIntersecting){
        if(!preference.matches)entry.target.classList.add('reveal-arrived');
        reveal.unobserve(entry.target);
      }});
    },{threshold:.12});
    home.querySelectorAll('.section-head,.work,.maker-intro,.empty').forEach(el=>reveal.observe(el));
  }
}


// Native scrolling shares one position with automatic motion, including touch inertia.
document.querySelectorAll('[data-marquee]').forEach(strip=>{
 strip.dataset.ready='true';
 const group=strip.querySelector('.marquee-group'),reduce=window.matchMedia?.('(prefers-reduced-motion: reduce)');
 let position=strip.scrollLeft,last=0,hover=false,down=null,manualUntil=0,suppressUntil=0;
 const now=()=>performance.now();
 document.addEventListener('keydown',event=>{if(event.key==='Tab')strip.dataset.keyboard='true'});
 document.addEventListener('pointerdown',event=>{if(!strip.contains(event.target))delete strip.dataset.keyboard});
 strip.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')hover=true});
 strip.addEventListener('pointerleave',event=>{if(event.pointerType==='mouse')hover=false});
 strip.addEventListener('pointerdown',event=>{
  if(event.button!==0)return;
  delete strip.dataset.keyboard;
  down={id:event.pointerId,x:event.clientX,y:event.clientY,left:strip.scrollLeft,mouse:event.pointerType==='mouse',drag:false};
  manualUntil=now()+1800;
 });
 strip.addEventListener('pointermove',event=>{
  if(!down||down.id!==event.pointerId||!down.mouse)return;
  const dx=event.clientX-down.x,dy=event.clientY-down.y;
  if(!down.drag&&Math.abs(dx)>6&&Math.abs(dx)>Math.abs(dy)){
   down.drag=true;strip.dataset.dragging='true';strip.setPointerCapture?.(event.pointerId);
  }
  if(down.drag){event.preventDefault();strip.scrollLeft=down.left-dx;position=strip.scrollLeft}
 });
 const release=event=>{
  if(!down||down.id!==event.pointerId)return;
  if(down.drag){suppressUntil=now()+350;if(strip.hasPointerCapture?.(event.pointerId))strip.releasePointerCapture(event.pointerId)}
  down=null;delete strip.dataset.dragging;position=strip.scrollLeft;manualUntil=now()+1800;
 };
 window.addEventListener('pointerup',release);window.addEventListener('pointercancel',release);
 strip.addEventListener('wheel',()=>{manualUntil=now()+1800},{passive:true});
 strip.addEventListener('scroll',()=>{if(down||now()<manualUntil){position=strip.scrollLeft;manualUntil=now()+1800}},{passive:true});
 strip.addEventListener('dragstart',event=>event.preventDefault());
 strip.addEventListener('click',event=>{if(now()<suppressUntil){event.preventDefault();event.stopImmediatePropagation()}},true);
 const frame=time=>{
  const elapsed=last?Math.min(time-last,64):0;last=time;
  const paused=reduce?.matches||document.hidden||down||hover||time<manualUntil||strip.dataset.keyboard==='true'||document.querySelector('.story-dialog[open]')||document.querySelector('.home[data-background-hidden=true]');
  if(paused)position=strip.scrollLeft;
  else{const length=group?.getBoundingClientRect().width||0;if(length){position=(position+length*elapsed/126000)%length;strip.scrollLeft=position}}
  window.requestAnimationFrame(frame);
 };
 window.requestAnimationFrame?.(frame);
});
// User supplied story art, viewed at full size without inventing playable projects.
const storyDialog=document.querySelector('.story-dialog');
if(storyDialog){
 let sourceCard;
 document.querySelectorAll('[data-story-id]').forEach(card=>card.addEventListener('click',event=>{
  if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||typeof storyDialog.showModal!=='function')return;
  event.preventDefault();sourceCard=card;
  const image=card.querySelector('img'),title=card.querySelector('h3').textContent;
  storyDialog.querySelector('[data-story-image]').src=image.getAttribute('src');
  storyDialog.querySelector('[data-story-image]').alt=title;
  storyDialog.querySelector('[data-story-image]').className=image.className;
  storyDialog.querySelector('h2').textContent=title;
  storyDialog.querySelector('[data-story-caption]').textContent=card.querySelector('p').textContent;
  storyDialog.showModal();
 }));
 storyDialog.querySelector('.story-close').addEventListener('click',()=>storyDialog.close());
 storyDialog.addEventListener('click',event=>{if(event.target===storyDialog){const r=storyDialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)storyDialog.close()}});
 storyDialog.addEventListener('close',()=>sourceCard?.focus({preventScroll:true}));
}
// Local reflection never changes layout or project storage.
document.querySelectorAll('.hero,.action,.news-row,.step-panel,.showcase-item').forEach(surface=>{
 if(!surface.classList.contains('hero'))surface.classList.add('reflective');
 const reduce=window.matchMedia?.('(prefers-reduced-motion: reduce)'),fine=window.matchMedia?.('(hover: hover) and (pointer: fine)');
 let frame;
 const clear=()=>{window.cancelAnimationFrame?.(frame);surface.removeAttribute('data-pointer-light')};
 surface.addEventListener('pointermove',event=>{
  if(reduce?.matches||!fine?.matches||(event.pointerType&&event.pointerType!=='mouse'))return;
  const r=surface.getBoundingClientRect();
  window.cancelAnimationFrame?.(frame);frame=window.requestAnimationFrame(()=>{surface.style.setProperty('--pointer-x',(event.clientX-r.left)/r.width*100+'%');surface.style.setProperty('--pointer-y',(event.clientY-r.top)/r.height*100+'%');surface.dataset.pointerLight='true'});
 });
 surface.addEventListener('pointerleave',clear);reduce?.addEventListener('change',clear);document.addEventListener('visibilitychange',()=>{if(document.hidden)clear()});
});
const newsButtons=[...document.querySelectorAll('[data-news-filter]')];
if(newsButtons.length){
 const rows=[...document.querySelectorAll('[data-news-list] .news-row')],status=document.querySelector('[data-news-count]');
 newsButtons.forEach(button=>button.addEventListener('click',()=>{
  newsButtons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  let count=0;rows.forEach(row=>{row.hidden=button.dataset.newsFilter!=='all'&&row.querySelector('.category').textContent.trim()!==button.dataset.newsFilter;if(!row.hidden)count++});
  if(status)status.textContent=count+' 則消息';
 }));
}
document.querySelectorAll('[data-copy-link]').forEach(button=>button.addEventListener('click',async()=>{
 const status=button.parentElement.querySelector('[data-copy-status]');
 try{await navigator.clipboard.writeText(location.href);if(status)status.textContent='已複製連結。'}catch{if(status)status.textContent='請複製瀏覽器網址列中的連結。'}
}));

// Home spotlights rotate as a whole; navigation and page layout stay still.
const heroCarousel=document.querySelector('.hero-carousel');
if(heroCarousel){
 const slides=[...heroCarousel.querySelectorAll('[data-hero-slide]')],choices=[...heroCarousel.querySelectorAll('[data-hero-to]')],reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)');let current=0,interval;
 const display=n=>{current=(n+slides.length)%slides.length;slides.forEach((s,i)=>{s.hidden=i!==current});choices.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===current)))};
 const stop=()=>{clearInterval(interval);interval=null};
 const start=()=>{stop();if(!reduced?.matches&&!document.hidden&&!heroCarousel.matches(':hover')&&!heroCarousel.contains(document.activeElement))interval=setInterval(()=>display(current+1),6500)};
 choices.forEach((b,i)=>b.addEventListener('click',()=>{display(i);start()}));
 heroCarousel.addEventListener('mouseenter',stop);heroCarousel.addEventListener('mouseleave',start);heroCarousel.addEventListener('focusin',stop);heroCarousel.addEventListener('focusout',()=>setTimeout(start,0));document.addEventListener('visibilitychange',start);reduced?.addEventListener('change',start);start();
}
