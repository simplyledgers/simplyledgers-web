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

  // Demo form: emailed to the team via Web3Forms (free tier, 250/month). The access key is public by design.
  var form = document.querySelector('form');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    var btn = form.querySelector('button[type="submit"]') || form.querySelector('button');
    var err = form.querySelector('[data-form-error]');
    if (err) err.remove();
    var data = new FormData(form);
    data.append('access_key', '6f078c88-5a00-4532-8b9d-7a2fa62a336e');
    data.append('subject', 'New demo request — SimplyLedgers');
    data.append('from_name', 'SimplyLedgers website');
    data.append('replyto', data.get('workEmail') || '');
    if (btn) btn.disabled = true;
    fetch('https://api.web3forms.com/submit', { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (!res.success) throw new Error(res.message);
        form.innerHTML = '<p class="text-lg font-semibold text-foreground">Thanks! We\'ll be in touch shortly to confirm your demo.</p>';
      })
      .catch(function () {
        if (btn) btn.disabled = false;
        var p = document.createElement('p');
        p.setAttribute('data-form-error', '');
        p.setAttribute('role', 'alert');
        p.className = 'text-sm font-semibold text-destructive sm:col-span-2';
        p.textContent = 'Sorry, your request could not be sent. Please try again or email us directly.';
        form.appendChild(p);
      });
  });
})();
