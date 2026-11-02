(() => {
  'use strict';
  const el = document.getElementById('gss-source-data');
  if (!el) return;
  const d = JSON.parse(el.textContent);
  function show() {
    document.querySelectorAll('.gss-source-line.is-selected').forEach(x => x.classList.remove('is-selected'));
    const u = new URL(location.href), from = u.searchParams.get('from');
    const start = Number(u.searchParams.get('start')), end = Number(u.searchParams.get('end'));
    const requested = u.searchParams.get('ranges');
    const c = d.callers.find(x => x.key === from && x.first === start && x.last === end &&
      (requested ? (x.ranges || []).map(r => r.join('-')).join(',') === requested : !x.ranges));
    const links = document.getElementById('source-range-links');
    links.replaceChildren();
    if (!c) { document.getElementById('source-range-status').textContent = 'Exact full file. No registered caller range was selected.'; return; }
    const ranges = c.ranges || [[start, end]];
    for (const [first, last] of ranges) {
      for (let i = first; i <= last; i++) document.getElementById('L' + i)?.classList.add('is-selected');
      const a = document.createElement('a'); a.href = d.fixed + '#L' + first + '-L' + last;
      a.textContent = 'Fixed original, lines ' + first + '–' + last; links.append(a, document.createTextNode(' · '));
    }
    const back = document.getElementById('source-return'); back.href = c.back; back.textContent = 'Back to the referring manuscript';
    document.getElementById('fixed-source-link').href = d.fixed + '#L' + start + '-L' + end;
    document.getElementById('source-range-status').textContent = c.label + ' · selected lines ' + ranges.map(r => r.join('–')).join(', ') + '.';
  }
  addEventListener('popstate', show); show();
})();
