document.addEventListener('DOMContentLoaded', () => {

  // LOADER
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => setTimeout(() => loader.classList.add('done'), 800));

  // NAV SCROLL
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // NAV TOGGLE
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  }));

  // SCROLL ANIMATIONS
  const animEls = document.querySelectorAll('[data-anim]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.delay) || 0;
        setTimeout(() => e.target.classList.add('anim-in'), delay);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  animEls.forEach(el => observer.observe(el));

  // JOURNEY LINE
  const journeyLine = document.getElementById('journeyLine');
  if (journeyLine) {
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting) journeyLine.classList.add('active');
    }, { threshold: 0.3 }).observe(journeyLine);
  }

  // 3D TILT EFFECT
  document.querySelectorAll('[data-tilt]').forEach(el => {
    const max = parseInt(el.dataset.tiltMax) || 8;
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(800px) rotateY(${x * max}deg) rotateX(${-y * max}deg)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(800px) rotateY(0) rotateX(0)';
    });
  });

  // REVIEW CAROUSEL
  const cards = document.querySelectorAll('.rc-card');
  const dotsWrap = document.getElementById('rcDots');
  let current = 0;

  if (cards.length && dotsWrap) {
    cards.forEach((_, i) => {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });

    const dots = dotsWrap.querySelectorAll('span');

    function goTo(idx) {
      cards[current].classList.remove('rc-active');
      dots[current].classList.remove('active');
      current = idx;
      cards[current].classList.add('rc-active');
      dots[current].classList.add('active');
    }

    document.getElementById('rcNext').addEventListener('click', () => goTo((current + 1) % cards.length));
    document.getElementById('rcPrev').addEventListener('click', () => goTo((current - 1 + cards.length) % cards.length));

    setInterval(() => goTo((current + 1) % cards.length), 6000);
  }

  // PARALLAX
  const pqBg = document.querySelector('.pq-bg');
  if (pqBg) {
    window.addEventListener('scroll', () => {
      const rect = pqBg.parentElement.getBoundingClientRect();
      const speed = parseFloat(pqBg.dataset.parallaxSpeed) || 0.3;
      pqBg.style.transform = `translateY(${rect.top * speed}px)`;
    });
  }

  // FORM
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.btn-3d-submit .btn-3d-front');
      btn.textContent = 'Sent! ✓';
      setTimeout(() => { btn.textContent = 'Request Appointment'; form.reset(); }, 3000);
    });
  }

  // SMOOTH SCROLL NAV
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

});
