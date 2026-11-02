/* Print projection of the existing GSS article. Canonical text and source are not edited. */
(() => {
  'use strict';
  const data = document.getElementById('gss-print-data');
  if (!data) return;
  const plan = JSON.parse(data.textContent);
  let saved = null, current = null, activeId = null;
  function prepare() {
    if (saved) return;
    current = document.querySelector('article'); saved = current.cloneNode(true);
    activeId = document.activeElement?.id;
    current.querySelectorAll('details:not(.exact-identity)').forEach(d => d.open = true);
    current.querySelectorAll('p').forEach(p => { if (p.textContent.trim() === 'Technical documentation') p.dataset.r3TechnicalOnly = ''; });
    const blocks = Array.from(current.querySelectorAll('pre'));
    if (blocks.length !== plan.blocks.length) throw new Error('Print block inventory changed');
    for (const block of blocks) {
      if (block.textContent.split('\n').length <= 18) block.dataset.r3PrintShort = '';
      const caption = block.previousElementSibling;
      if (caption?.tagName === 'P' && /^(Source\b|Fixed source\b)/.test(caption.textContent.trim())) caption.dataset.r3SourceCaption = '';
    }
    for (const b of plan.blocks) if (b.keep !== b.index) {
      blocks[b.index].dataset.r3PrintDuplicate = '';
      const before = blocks[b.index].previousElementSibling;
      if (before?.tagName === 'P' && /^(Source\b|Fixed source\b)/.test(before.textContent.trim())) before.dataset.r3PrintDuplicate = '';
    }
    for (const d of current.querySelectorAll('details.guide-related:not(.binder-context)')) {
      if (Array.from(d.querySelectorAll('pre')).every(p => p.hasAttribute('data-r3-print-duplicate'))) d.dataset.r3PrintDuplicatePanel = '';
    }
    for (const block of blocks) {
      if (!block.hasAttribute('data-r3-print-short') || block.hasAttribute('data-r3-print-duplicate')) continue;
      const previous = block.previousElementSibling;
      if (previous?.tagName === 'SUMMARY' && block.parentElement.tagName === 'DETAILS') {
        block.parentElement.dataset.r3PrintUnit = '';
      } else if (previous?.tagName === 'P') {
        const unit = document.createElement('div'); unit.dataset.r3PrintUnit = '';
        previous.before(unit); unit.append(previous, block);
      }
    }
    for (const panel of current.querySelectorAll('details')) {
      const shown = Array.from(panel.querySelectorAll('pre')).filter(p => !p.hasAttribute('data-r3-print-duplicate'));
      if (shown.length === 1 && shown[0].hasAttribute('data-r3-print-short')) panel.dataset.r3PrintUnit = '';
    }
    for (const t of plan.targets) {
      const block = blocks[t.printed_block_index], lines = block.textContent.split('\n');
      const offset = lines.slice(0, t.line_offset).reduce((n,s) => n + s.length + 1, 0);
      const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT); let node, remaining = offset;
      while ((node = walker.nextNode())) {
        if (remaining <= node.length) break;
        remaining -= node.length;
      }
      if (!node) throw new Error('Exact print target line missing: ' + t.target);
      const span = document.createElement('span'); span.id = t.print_target; span.className = 'r3-print-destination';
      const range = document.createRange(); range.setStart(node, remaining); range.collapse(true); range.insertNode(span);
      current.querySelectorAll('a[href]').forEach(a => { if (a.getAttribute('href') === '#' + t.target) a.href = '#' + t.print_target; });
    }
  }
  function restore() {
    if (!saved) return;
    current.replaceWith(saved); saved = null; current = null;
    if (activeId) document.getElementById(activeId)?.focus({preventScroll:true});
  }
  addEventListener('beforeprint', prepare); addEventListener('afterprint', restore);
  window.gssPrintR3 = {prepare, restore};
})();
