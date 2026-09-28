/* LFH common reader: R1 bounded Fix1. No project-specific implementation. */
(() => {
  'use strict';
  const root = document.querySelector('[data-project-reader]');
  if (!root) return;
  const payload = JSON.parse(document.getElementById('project-reader-data').textContent);
  const tiles = new Map([...root.querySelectorAll('.tile[data-node-id]')].map(t => [t.dataset.nodeId, t]));
  const bands = [...root.querySelectorAll('.level')];
  const search = root.querySelector('#project-search');
  const route = root.querySelector('#project-route');
  const count = root.querySelector('#visible-count');
  const bar = root.querySelector('#focus-bar');
  const text = root.querySelector('#focus-text');
  const jumps = root.querySelector('#level-jumps');
  const presets = new Map((payload.route_presets || []).map(p => [p.id, p]));
  let terminals = [], focusSet = null, activePreset = null;
  let locatedTile = null, locateTimer = null, locateSeq = 0, arrivalFrame = null;
  const ids = s => (s || '').trim().split(/\s+/).filter(Boolean);
  const canonical = xs => [...new Set(xs.filter(x => tiles.has(x)))].sort();
  const presetEnabled = p => p && p.status === 'ACTIVE' && p.activation_allowed !== false;

  function closure(ts) {
    const result = new Set(), todo = [...ts];
    while (todo.length) {
      const id = todo.pop();
      if (result.has(id) || !tiles.has(id)) continue;
      result.add(id); todo.push(...ids(tiles.get(id).dataset.prerequisites));
    }
    return result;
  }
  function currentURL() { return new URL(location.href); }
  function writeURL({replace = false, hash} = {}) {
    const url = currentURL();
    for (const key of ['focus', 'preset', 'q', 'route']) url.searchParams.delete(key);
    if (activePreset) url.searchParams.set('preset', activePreset);
    else if (terminals.length) url.searchParams.set('focus', terminals.join(','));
    if (search.value.trim()) url.searchParams.set('q', search.value.trim());
    if (route.value) url.searchParams.set('route', route.value);
    if (hash !== undefined) url.hash = hash;
    else {
      // Persisted filters must not retain a fragment pointing to a hidden tile.
      // parseURL otherwise treats that stale fragment as a new locate request
      // and clears the saved query on reload or Back/Forward.
      const fragmentTarget = hashID(url);
      if (fragmentTarget && tiles.get(fragmentTarget)?.hidden) url.hash = '#reading-route';
    }
    if (url.href !== currentURL().href) history[replace ? 'replaceState' : 'pushState']({}, '', url);
    return url;
  }
  function updateOutside() {
    for (const tile of tiles.values()) {
      const box = tile.querySelector('.outside-used-by');
      if (!box) continue;
      const outside = focusSet ? ids(tile.dataset.usedBy).filter(x => !focusSet.has(x)) : [];
      box.hidden = !focusSet || tile.hidden || !outside.length;
      box.replaceChildren();
      if (box.hidden) continue;
      box.append(document.createTextNode(`Also used by ${outside.length} declaration${outside.length === 1 ? '' : 's'} outside this focus. `));
      // Every outside reference remains accessible; large sets use native details.
      const make = id => {
        const button = document.createElement('button');
        button.type = 'button'; button.className = 'outside-used-by-action';
        button.dataset.target = id; button.textContent = tiles.get(id)?.dataset.title || id;
        return button;
      };
      outside.slice(0, 4).forEach(id => { box.append(make(id), document.createTextNode(' ')); });
      if (outside.length > 4) {
        const details = document.createElement('details'), summary = document.createElement('summary');
        summary.textContent = `Show ${outside.length - 4} more outside-focus uses`; details.append(summary);
        outside.slice(4).forEach(id => { details.append(make(id), document.createTextNode(' ')); });
        box.append(details);
      }
    }
  }
  function applyVisibility() {
    const q = search.value.trim().toLowerCase(); let visible = 0;
    for (const [id, tile] of tiles) {
      tile.hidden = !!((focusSet && !focusSet.has(id)) ||
        (route.value && !ids(tile.dataset.routes).includes(route.value)) ||
        (q && !tile.dataset.search.includes(q)));
      if (!tile.hidden) visible++;
      tile.classList.toggle('is-focus-target', terminals.includes(id));
      let clear = tile.querySelector('[data-clear-focus]');
      if (!clear) { clear = document.createElement('button'); clear.type = 'button'; clear.textContent = 'Clear focus'; clear.dataset.clearFocus = ''; tile.querySelector('.tile-actions')?.append(clear); }
      clear.hidden = !terminals.includes(id);
    }
    for (const band of bands) band.hidden = ![...band.querySelectorAll('.tile')].some(t => !t.hidden);
    for (const a of jumps.querySelectorAll('a')) a.hidden = document.getElementById(a.hash.slice(1))?.hidden ?? true;
    count.textContent = `${visible} declarations`; count.dataset.visible = String(visible);
    bar.hidden = !focusSet;
    if (focusSet) {
      text.textContent = `Target${terminals.length === 1 ? '' : 's'}: ${terminals.map(x => tiles.get(x).dataset.title).join('; ')}. Prerequisite closure: ${focusSet.size} of ${tiles.size}. Visible after filters: ${visible}. Full-project levels retained.`;
      bar.dataset.closureSize = String(focusSet.size);
    } else { text.textContent = ''; delete bar.dataset.closureSize; }
    updateOutside();
  }
  function applyFocus(ts, {preset = null, explicit = true, push = true, hash} = {}) {
    terminals = canonical(ts); activePreset = terminals.length ? preset : null;
    focusSet = terminals.length ? closure(terminals) : null;
    if (explicit) { search.value = ''; route.value = ''; }
    applyVisibility();
    if (push) writeURL({hash: hash === undefined ? (terminals.length ? '#decl-' + terminals[0] : undefined) : hash});
  }
  function clearLocate() {
    locateSeq++;
    if (arrivalFrame !== null) cancelAnimationFrame(arrivalFrame);
    arrivalFrame = null;
    if (locateTimer !== null) clearTimeout(locateTimer);
    locateTimer = null;
    if (locatedTile) locatedTile.classList.remove('is-located');
    locatedTile = null;
    delete root.dataset.locatedId;
    root.dataset.locateSeq = String(locateSeq);
  }
  function locate(id, {write = false, ensure = true} = {}) {
    const tile = tiles.get(id); if (!tile) return false;
    if (ensure && tile.hidden) {
      search.value = ''; route.value = '';
      if (focusSet && !focusSet.has(id)) applyFocus([id], {push: false});
      else applyVisibility();
    }
    if (write) writeURL({hash: '#decl-' + id});
    // Clear the previous target before cancelling/restarting this pulse.
    // Sequence and tile guards prevent a late callback from clearing a new pulse.
    clearLocate();
    locatedTile = tile; const sequence = locateSeq;
    tile.classList.remove('is-located');
    void tile.offsetWidth; // Same-target replay restarts the transient class.
    tile.setAttribute('tabindex', '-1'); tile.focus({preventScroll: true});
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    tile.scrollIntoView({block: 'center', behavior: reduced ? 'instant' : 'smooth'});
    let lastY = window.scrollY, stable = 0;
    const pulse = () => {
      if (locateSeq !== sequence || locatedTile !== tile) return;
      arrivalFrame = null;
      tile.classList.add('is-located'); root.dataset.locatedId = id;
      root.dataset.pulseStarted = String(performance.now());
      locateTimer = setTimeout(() => {
        if (locateSeq !== sequence || locatedTile !== tile) return;
        tile.classList.remove('is-located'); locatedTile = null; locateTimer = null;
        delete root.dataset.locatedId;
      }, 800);
    };
    const arrival = () => {
      if (locateSeq !== sequence) return;
      stable = Math.abs(window.scrollY - lastY) < 0.5 ? stable + 1 : 0;
      lastY = window.scrollY;
      if (stable >= 5) pulse(); else arrivalFrame = requestAnimationFrame(arrival);
    };
    if (reduced) pulse(); else arrivalFrame = requestAnimationFrame(arrival);
    return true;
  }
  function hashID(url) {
    try { const h = decodeURIComponent(url.hash.slice(1)); return h.startsWith('decl-') ? h.slice(5) : null; }
    catch (_) { return null; }
  }
  function parseURL() {
    clearLocate();
    const url = currentURL(), p = presets.get(url.searchParams.get('preset'));
    if (presetEnabled(p)) applyFocus(p.terminal_node_ids, {preset: p.id, explicit: false, push: false});
    else applyFocus((url.searchParams.get('focus') || '').split(','), {explicit: false, push: false});
    search.value = url.searchParams.get('q') || '';
    const wanted = url.searchParams.get('route') || '';
    route.value = [...route.options].some(o => o.value === wanted) ? wanted : '';
    applyVisibility();
    const id = hashID(url);
    if (id && tiles.has(id)) {
      locate(id, {ensure: true});
      // Navigation to a hidden target clears incompatible filters in both state and URL.
      writeURL({replace: true, hash: url.hash});
    }
  }
  root.addEventListener('click', event => {
    const clear = event.target.closest('[data-clear-focus]');
    if (clear) { event.preventDefault(); clearFocus(clear.closest('.tile')); return; }
    const focus = event.target.closest('[data-focus-node]');
    if (focus) {
      event.preventDefault(); const id = focus.dataset.focusNode;
      applyFocus([id], {hash: '#decl-' + id}); locate(id, {ensure: false}); return;
    }
    const presetButton = event.target.closest('[data-focus-preset]');
    if (presetButton) {
      event.preventDefault(); const p = presets.get(presetButton.dataset.focusPreset);
      if (presetButton.disabled || !presetEnabled(p)) return;
      applyFocus(p.terminal_node_ids, {preset: p.id}); locate(terminals[0], {ensure: false}); return;
    }
    const outside = event.target.closest('.outside-used-by-action');
    if (outside) {
      event.preventDefault(); const id = outside.dataset.target;
      applyFocus([id], {hash: '#decl-' + id}); locate(id, {ensure: false}); return;
    }
    const link = event.target.closest('a[href^="#decl-"]');
    if (link && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey && event.button === 0) {
      event.preventDefault(); const id = hashID(new URL(link.getAttribute('href'), currentURL()));
      if (id) locate(id, {write: true});
    }
  });
  function clearFocus(anchor = null) {
    const target = anchor || [...tiles.values()].find(t => !t.hidden && t.getBoundingClientRect().bottom > 0);
    const before = target?.getBoundingClientRect().top;
    // Keep the reading tile's height when its Clear action disappears. This also
    // prevents the document's bottom scroll limit from moving the final tile.
    if (target) target.style.minHeight = getComputedStyle(target).height;
    clearLocate();
    // Cancel any old smooth scroll before restoring the reading anchor.
    window.scrollTo({top: window.scrollY, behavior: 'instant'});
    terminals = []; focusSet = null; activePreset = null;
    applyVisibility();
    const url = currentURL(); url.searchParams.delete('focus'); url.searchParams.delete('preset');
    if (url.href !== location.href) history.pushState({}, '', url);
    if (target && !target.hidden) {
      window.scrollBy({top: target.getBoundingClientRect().top - before, behavior: 'instant'});
      target.setAttribute('tabindex', '-1'); target.focus({preventScroll: true});
    }
  }
  root.querySelector('#clear-focus').addEventListener('click', () => clearFocus());
  root.querySelector('#copy-focus-url').addEventListener('click', async () => {
    const id = hashID(currentURL());
    if (id && tiles.get(id)?.hidden) locate(id, {ensure: true});
    const url = writeURL({replace: true}).href;
    const status = root.querySelector('#copy-status');
    try { await navigator.clipboard.writeText(url); status.textContent = 'Focused URL copied.'; }
    catch (_) {
      const box = document.createElement('textarea'); box.value = url; box.setAttribute('aria-label', 'Focused URL');
      bar.append(box); box.select();
      const copied = document.execCommand('copy');
      if (copied) box.remove();
      status.textContent = copied ? 'Focused URL copied.' : 'Copy the focused URL from the selected text.';
    }
  });
  search.addEventListener('input', () => { applyVisibility(); writeURL({replace: true}); });
  route.addEventListener('change', () => {
    // Route selection exits prerequisite focus; it never changes full-project levels.
    terminals = []; focusSet = null; activePreset = null;
    applyVisibility(); writeURL();
  });
  addEventListener('popstate', parseURL);
  addEventListener('hashchange', parseURL);
  document.addEventListener('keydown', event => { if (event.key === 'Escape') clearLocate(); });
  parseURL();
})();
