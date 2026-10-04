// Same-origin site frame for immutable Workbench HTML; no external requests.
const control = document.querySelector('.back-to-top[data-exact-mounted]');
const topTarget = document.getElementById('site-top');
if (control && topTarget) {
  let scheduled = false;
  const update = () => {
    scheduled = false;
    control.hidden = window.scrollY < 600;
    control.classList.remove('is-obstructed');
    if (control.hidden || document.activeElement === control) return;
    const r = control.getBoundingClientRect();
    const blocked = [...document.querySelectorAll('input:not([type=hidden]),textarea,select,button,nav,a,summary,[role=doc-footnote],.footnotes,sup')].some(element => {
      if (element === control || control.contains(element)) return false;
      if (!['fixed', 'sticky'].includes(getComputedStyle(element).position)) return false;
      const b = element.getBoundingClientRect();
      return b.width > 0 && b.height > 0 && b.left < r.right + 4 && b.right > r.left - 4 && b.top < r.bottom + 4 && b.bottom > r.top - 4;
    });
    control.classList.toggle('is-obstructed', blocked);
  };
  const schedule = () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(update);
    }
  };
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  control.addEventListener('blur', schedule);
  control.addEventListener('click', event => {
    event.preventDefault();
    topTarget.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  });
  update();
}
