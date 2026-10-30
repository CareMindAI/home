/* CareMind AI — small progressive enhancements. The page works without JS. */
(function () {
  document.documentElement.classList.add('js');

  // Mobile menu
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
  });
  links.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Nav border + back-to-top button
  const nav = document.querySelector('.nav');
  const toTop = document.getElementById('toTop');
  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
    toTop.classList.toggle('is-shown', window.scrollY > 800);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Reveal on scroll (also triggers the bar and ring animations)
  const revealables = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealables.forEach((el) => io.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add('is-visible'));
  }

  // Highlight the nav link for the section in view
  const navAnchors = [...links.querySelectorAll('a[href^="#"]:not(.btn)')];
  const sections = navAnchors.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => spy.observe(s));
  }

  // Screenshot gallery arrows
  const gallery = document.getElementById('gallery');
  document.querySelectorAll('.gallery__nav .icon-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const step = gallery.querySelector('figure').offsetWidth + 28;
      gallery.scrollBy({ left: step * 2 * Number(btn.dataset.dir), behavior: 'smooth' });
    });
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
