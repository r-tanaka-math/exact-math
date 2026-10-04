/* Historical topic/tag URL adapter, scoped to preserved source exploration only. */
(() => {
 'use strict';
 const root=document.querySelector('[data-project-reader]'), route=document.querySelector('#project-route'), note=document.querySelector('#legacy-route-context');
 if(!root || !route || !note)return;
 const url=()=>new URL(location.href);
 function sync(){
  const u=url(), fragment=/^#route-(R0[1-9])$/.exec(u.hash)?.[1];
  const wanted=u.searchParams.get('route') || u.searchParams.get('preset') || fragment;
  if(!wanted){note.hidden=true;return;}
  const option=[...route.options].find(o=>o.value===wanted);
  if(option){
   // The existing reader has already restored a valid query route and focus.
   // Only fragment/preset compatibility needs a new route selection.
   if(route.value!==wanted){route.value=wanted;route.dispatchEvent(new Event('change',{bubbles:true}));}
   const n=[...root.querySelectorAll('.tile[data-node-id]')].filter(e=>!e.hidden).length;
   note.textContent=`Historical route: ${wanted} - ${option.textContent}. ${n} items in the preserved topic/tag scope; these are not the new prerequisite-inclusive Card route counts.`;
   if(n===0)note.textContent+=' The historical route has no assigned source tags; the current orientation Card route is available in the selected reader.';
  } else {
   for(const e of root.querySelectorAll('.tile[data-node-id], .level'))e.hidden=true;
   const count=root.querySelector('#visible-count');count.textContent='0 historical items';count.dataset.visible='0';
   note.textContent=`Unknown historical route state: ${wanted}. No route or All view was substituted. Choose a listed route to continue.`;
  }
  note.hidden=false;
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',sync,{once:true});else sync(); addEventListener('popstate',sync);addEventListener('hashchange',sync);
 route.addEventListener('change',()=>{
  const option=route.selectedOptions[0];
  if(!option?.value){note.hidden=true;return;}
  note.textContent=`Historical route: ${option.textContent}. Preserved topic/tag scope, separate from the current prerequisite-inclusive Card route.`;note.hidden=false;
 });
})();
