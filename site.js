// Replaces the bits of behaviour the original React app provided.
(function () {
  var header = document.querySelector('header');
  var top = 'border-transparent bg-transparent'.split(' ');
  var scrolled = 'border-border/70 bg-background/85 backdrop-blur-xl'.split(' ');
  function onScroll() {
    var s = window.scrollY > 10;
    header.classList.remove.apply(header.classList, s ? top : scrolled);
    header.classList.add.apply(header.classList, s ? scrolled : top);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu (slide-out sheet)
  var menu = document.getElementById('mobile-menu');
  var openBtn = document.querySelector('header button[aria-label="Open menu"]');
  function setMenu(open) {
    menu.hidden = !open;
    openBtn.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  openBtn.addEventListener('click', function () { setMenu(true); });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a') || e.target.closest('button') || e.target === menu.firstElementChild) setMenu(false);
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  // Demo form: no backend on a static site, so just confirm on screen.
  // shortcut: submissions go nowhere; point the form at Formspree/Netlify Forms/your API to collect them.
  var form = document.querySelector('form');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    form.innerHTML = '<p class="text-lg font-semibold text-foreground">Thanks! We\'ll be in touch shortly to confirm your demo.</p>';
  });
})();
