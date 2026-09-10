/* ============================================
   HAVEN WELLNESS — Premium tier
   Top-tier custom hero animation + 5 advanced scroll
   animations: horizontal pinned gallery, parallax quote,
   pinned staged reveal, parallax split, staggered
   service-card reveal. Plus stat counters and a mocked
   CRM-connected newsletter form.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    const hide = () => gsap.to(preloader, { opacity: 0, duration: 0.6, onComplete: () => preloader.style.display = 'none' });
    window.addEventListener('load', () => setTimeout(hide, 250));
    setTimeout(hide, 1800);
  }

  /* ---------- Sticky header ---------- */
  const header = document.getElementById('siteHeader');
  if (header) {
    ScrollTrigger.create({ start: 'top -70', end: 99999, toggleClass: { targets: header, className: 'scrolled' } });
  }

  /* ---------- Mobile nav ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle) {
    navToggle.addEventListener('click', () => mainNav.classList.toggle('open'));
    mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mainNav.classList.remove('open')));
  }

  /* ---------- Active nav link ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a[href]').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
  });

  /* ============================================
     HERO — top-tier custom animation
     ============================================ */
  if (document.querySelector('.hero-title')) {
    const heroTl = gsap.timeline({ delay: 0.4, defaults: { ease: 'power4.out' } });
    heroTl
      .to('.hero-kicker', { opacity: 1, y: 0, duration: 0.8 }, 0)
      .from('.hero-kicker', { y: 20 }, 0)
      .to('.hero-title .word', { opacity: 1, y: 0, duration: 1.1, stagger: 0.06 }, 0.15)
      .to('.hero-sub', { opacity: 1, duration: 0.9 }, 0.55)
      .from('.hero-sub', { y: 20 }, 0.55)
      .to('.hero-actions', { opacity: 1, duration: 0.9 }, 0.7)
      .from('.hero-actions', { y: 20 }, 0.7)
      .from('.scroll-cue', { opacity: 0, duration: 0.6 }, 1.1);

    gsap.to('.hero-media img', {
      yPercent: 12, scale: 1.02, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
    gsap.to('.hero-content', {
      yPercent: 25, opacity: 0.3, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  /* ============================================
     ADVANCED #1 — Horizontal pinned gallery
     ============================================ */
  const track = document.getElementById('hGalleryTrack');
  if (track) {
    const setGalleryScroll = () => {
      ScrollTrigger.getById('hGalleryScroll')?.kill();
      const distance = Math.max(track.scrollWidth - window.innerWidth + 44, 0);
      gsap.to(track, {
        x: -distance, ease: 'none',
        scrollTrigger: {
          id: 'hGalleryScroll', trigger: '.h-gallery-pin', start: 'top top',
          end: () => `+=${distance + window.innerHeight * 0.6}`,
          pin: true, scrub: 1, invalidateOnRefresh: true
        }
      });
    };
    setGalleryScroll();
    window.addEventListener('resize', () => { clearTimeout(window._hgTimer); window._hgTimer = setTimeout(setGalleryScroll, 250); });
  }

  /* ============================================
     ADVANCED #2 — Parallax quote
     ============================================ */
  const pqImg = document.querySelector('.parallax-quote-media img');
  if (pqImg) {
    gsap.to(pqImg, { yPercent: -14, ease: 'none', scrollTrigger: { trigger: '.parallax-quote', start: 'top bottom', end: 'bottom top', scrub: true } });
  }

  /* ============================================
     ADVANCED #3 — Pinned staged reveal (about.html)
     ============================================ */
  const pinApproach = document.querySelector('.pin-approach');
  if (pinApproach) {
    const pinMedia = gsap.utils.toArray('.pin-media');
    const pinStages = gsap.utils.toArray('.pin-stage');
    const pinDots = gsap.utils.toArray('.pin-dots span');
    function setStage(i) {
      pinMedia.forEach((m, idx) => m.classList.toggle('active', idx === i));
      pinStages.forEach((s, idx) => s.classList.toggle('active', idx === i));
      pinDots.forEach((d, idx) => d.classList.toggle('active', idx === i));
    }
    setStage(0);
    ScrollTrigger.create({
      trigger: pinApproach, start: 'top top', end: 'bottom bottom',
      onUpdate: (self) => setStage(Math.min(pinStages.length - 1, Math.floor(self.progress * pinStages.length)))
    });
  }

  /* ============================================
     ADVANCED #4 — Parallax split image
     ============================================ */
  const splitImg = document.querySelector('.split-section .split-media img');
  if (splitImg) {
    gsap.to(splitImg, { yPercent: -10, ease: 'none', scrollTrigger: { trigger: '.split-section', start: 'top bottom', end: 'bottom top', scrub: true } });
  }

  /* ============================================
     ADVANCED #5 — Staggered scale reveal (services)
     ============================================ */
  if (document.querySelector('.services-grid')) {
    gsap.from('.services-grid .service-card', {
      scale: 0.9, opacity: 0, y: 40, duration: 0.85, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: '.services-grid', start: 'top 82%' }
    });
  }

  /* ---------- Basic scroll reveal (included every tier) ---------- */
  ScrollTrigger.batch('.reveal', {
    start: 'top 88%',
    onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1 })
  });

  /* ---------- Stat counters ---------- */
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseFloat(el.getAttribute('data-count'));
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => {
        const counter = { val: 0 };
        gsap.to(counter, { val: target, duration: 1.8, ease: 'power2.out', onUpdate: () => { el.textContent = Math.floor(counter.val).toLocaleString(); } });
      }
    });
  });

  /* ---------- Marquee pause on hover ---------- */
  const marquee = document.querySelector('.marquee');
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marquee) {
    marquee.addEventListener('mouseenter', () => marqueeTrack.style.animationPlayState = 'paused');
    marquee.addEventListener('mouseleave', () => marqueeTrack.style.animationPlayState = 'running');
  }

  /* ---------- Demo forms (CRM-mocked) ---------- */
  document.querySelectorAll('[data-demo-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = form.querySelector('.form-note');
      if (note) note.textContent = "Thanks — synced to our CRM and you'll hear from us soon. (Demo form, no data sent.)";
      form.reset();
    });
  });
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = document.getElementById('newsletterNote');
      if (note) note.textContent = 'Added to the list via Mailchimp. (Demo integration, no data sent.)';
      newsletterForm.reset();
    });
  }

  ScrollTrigger.refresh();
});
