document.addEventListener('DOMContentLoaded', () => {

  // LOADER — counter + bar fill
  const loader = document.getElementById('loader');
  const loaderCounter = document.getElementById('loaderCounter');
  const loaderFill = document.getElementById('loaderFill');
  let count = 0;
  const loaderInterval = setInterval(() => {
    count += Math.floor(Math.random() * 8) + 2;
    if (count >= 100) count = 100;
    loaderCounter.textContent = count;
    loaderFill.style.width = count + '%';
    if (count >= 100) {
      clearInterval(loaderInterval);
      setTimeout(() => loader.classList.add('done'), 400);
    }
  }, 40);

  // NAV SCROLL
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  // BURGER
  const burger = document.getElementById('burger');
  const menu = document.getElementById('mobileMenu');
  burger.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

  // SMOOTH SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // SCROLL ANIMATIONS
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const d = parseInt(e.target.dataset.delay) || 0;
        setTimeout(() => e.target.classList.add('in'), d);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('[data-anim]').forEach(el => obs.observe(el));

  // PARALLAX
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.parallax);
      const rect = el.parentElement.getBoundingClientRect();
      const offset = (rect.top + scrollY) - scrollY;
      el.style.transform = `translateY(${offset * speed * -0.15}px)`;
    });
  });

  // COUNTER ANIMATION
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        const start = performance.now();
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target);
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        counterObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.counter').forEach(el => counterObs.observe(el));

  // HORIZONTAL DRAG SCROLL
  const scrollContainer = document.getElementById('servicesScroll');
  if (scrollContainer) {
    let isDown = false, startX, scrollLeft;
    scrollContainer.addEventListener('mousedown', e => {
      isDown = true;
      scrollContainer.classList.add('grabbing');
      startX = e.pageX - scrollContainer.offsetLeft;
      scrollLeft = scrollContainer.scrollLeft;
    });
    scrollContainer.addEventListener('mouseleave', () => { isDown = false; scrollContainer.classList.remove('grabbing'); });
    scrollContainer.addEventListener('mouseup', () => { isDown = false; scrollContainer.classList.remove('grabbing'); });
    scrollContainer.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      scrollContainer.scrollLeft = scrollLeft - (x - startX) * 1.5;
    });
  }

  // FORM
  const form = document.getElementById('contactForm');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button');
    btn.innerHTML = 'SENT! ✓';
    setTimeout(() => { btn.innerHTML = 'BOOK APPOINTMENT <i class="fas fa-arrow-right"></i>'; form.reset(); }, 3000);
  });

});
