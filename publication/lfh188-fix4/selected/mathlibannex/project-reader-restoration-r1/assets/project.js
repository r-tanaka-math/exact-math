(function(){
  const search=document.getElementById('search');
  const route=document.getElementById('route-filter');
  const count=document.getElementById('visible-count');
  const tiles=[...document.querySelectorAll('.tile[id^="decl-"]')];
  const levels=[...document.querySelectorAll('section.level')];
  function filter(){
    if(!search||!route)return;
    const q=search.value.trim().toLocaleLowerCase();
    const selected=route.value;
    let visible=0;
    for(const tile of tiles){
      const routes=(tile.dataset.routes||'').split(' ');
      tile.hidden=Boolean((q&&!tile.dataset.search.includes(q))||(selected&&!routes.includes(selected)));
      if(!tile.hidden)visible++;
    }
    for(const level of levels)level.hidden=![...level.querySelectorAll('.tile')].some(tile=>!tile.hidden);
    count.textContent=visible+' declarations';
  }
  function revealHash(){
    const id=decodeURIComponent(location.hash.slice(1));
    if(!id)return;
    const target=document.getElementById(id);
    if(!target)return;
    if(target.hidden||target.closest('.level[hidden]')){
      if(search)search.value='';
      if(route)route.value='';
      filter();
    }
    if(target.classList.contains('tile')){
      target.setAttribute('tabindex','-1');
      target.focus({preventScroll:true});
      target.scrollIntoView({block:'center'});
    }
  }
  if(search&&route){search.addEventListener('input',filter);route.addEventListener('change',filter);filter();}
  addEventListener('hashchange',revealHash);
  revealHash();
})();
