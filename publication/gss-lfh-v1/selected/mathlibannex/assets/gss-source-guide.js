/* Local, dependency-free range navigation. No network, storage or CSP changes. */
(() => {
  'use strict';
  const clear = () => document.querySelectorAll('.guide-highlight').forEach(x => x.classList.remove('guide-highlight'));
  const openAncestors = target => {
    for (let node = target.parentElement; node; node = node.parentElement) {
      if (node.tagName === 'DETAILS') node.open = true;
    }
  };
  const activate = () => {
    clear();
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { return; }
    const target = document.getElementById(id);
    if (!target) return;
    if (target.classList.contains('guide-range-anchor')) {
      openAncestors(target);
      const block = document.getElementById(target.dataset.block);
      if (!block) return;
      const first = Number(target.dataset.first), last = Number(target.dataset.last);
      block.querySelectorAll('.guide-source-line').forEach(line => {
        const n = Number(line.dataset.sourceLine);
        if (n >= first && n <= last) line.classList.add('guide-highlight');
      });
      const back = block.nextElementSibling;
      if (back) back.href = '#' + target.dataset.return;
      target.scrollIntoView({block: 'start'});
      target.focus({preventScroll: true});
    } else if (target.classList.contains('guide-heading')) {
      target.scrollIntoView({block: 'center'});
      target.focus({preventScroll: true});
    }
  };
  document.addEventListener('click', event => {
    const link = event.target.closest('a.guide-heading, a.guide-return');
    if (!link || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    event.preventDefault();
    if (location.hash !== href) history.pushState(null, '', href);
    activate();
  });
  window.addEventListener('hashchange', activate);
  window.addEventListener('popstate', activate);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', activate);
  else activate();
})();
