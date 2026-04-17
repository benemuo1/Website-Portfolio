document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('navHamburger');
  const sideMenu = document.getElementById('sideMenu');
  const overlay = document.getElementById('smOverlay');
  const close = document.getElementById('smClose');

  function openMenu() { sideMenu.classList.add('open'); overlay.classList.add('open'); }
  function closeMenu() { sideMenu.classList.remove('open'); overlay.classList.remove('open'); }
  hamburger.addEventListener('click', openMenu);
  close.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
  sideMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } });
  }, { threshold: 0.15 });
  document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => { const t = document.querySelector(a.getAttribute('href')); if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); } });
  });

  const form = document.getElementById('contactForm');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button');
    btn.textContent = 'Sent! ✓';
    setTimeout(() => { btn.textContent = 'Send'; form.reset(); }, 3000);
  });
});
