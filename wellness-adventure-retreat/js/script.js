/* ============================================
   WILDER RETREATS — cinematic scroll interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById('preloader');
  const hidePreloader = () => {
    gsap.to(preloader, { opacity: 0, duration: 0.6, onComplete: () => preloader.style.display = 'none' });
  };
  window.addEventListener('load', () => setTimeout(hidePreloader, 300));
  setTimeout(hidePreloader, 2000);

  /* ---------- Sticky header ---------- */
  const header = document.getElementById('advHeader');
  ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    toggleClass: { targets: header, className: 'scrolled' }
  });

  /* ---------- Mobile nav ---------- */
  const navToggle = document.getElementById('advNavToggle');
  const nav = document.getElementById('advNav');
  if (navToggle) {
    navToggle.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  /* ============================================
     HERO — stagger reveal + slow Ken Burns zoom
     ============================================ */
  const heroTl = gsap.timeline({ delay: 0.4, defaults: { ease: 'power4.out' } });
  heroTl
    .to('.hero-title-adv .word', { opacity: 1, y: 0, duration: 1.1, stagger: 0.05 }, 0.1)
    .to('[data-hero-el]', { opacity: 1, y: 0, duration: 0.9, stagger: 0.15 }, 0.5)
    .from('[data-hero-el]', { y: 20, stagger: 0.15 }, 0.5)
    .from('.hero-adv-badge', { opacity: 0, x: 20, duration: 0.8 }, 0.9);

  gsap.to('#heroAdvImg', { scale: 1, duration: 8, ease: 'none' });

  gsap.to('.hero-adv-content', {
    yPercent: 25,
    opacity: 0.4,
    ease: 'none',
    scrollTrigger: { trigger: '.hero-adv', start: 'top top', end: 'bottom top', scrub: true }
  });
  gsap.to('#heroAdvImg', {
    yPercent: 12,
    ease: 'none',
    scrollTrigger: { trigger: '.hero-adv', start: 'top top', end: 'bottom top', scrub: true }
  });

  /* ============================================
     PINNED FEATURE — crossfading background + text stages
     ============================================ */
  const pinFeature = document.querySelector('.pin-feature');
  const pinBgs = gsap.utils.toArray('.pin-bg');
  const pinStages = gsap.utils.toArray('.pin-stage');
  const pinDots = gsap.utils.toArray('.pin-progress span');

  function setPinStage(index) {
    pinBgs.forEach((bg, i) => bg.classList.toggle('active', i === index));
    pinStages.forEach((stage, i) => stage.classList.toggle('active', i === index));
    pinDots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  }
  setPinStage(0);

  if (pinFeature) {
    ScrollTrigger.create({
      trigger: pinFeature,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const stageCount = pinStages.length;
        const idx = Math.min(stageCount - 1, Math.floor(self.progress * stageCount));
        setPinStage(idx);
      }
    });
  }

  /* ============================================
     HORIZONTAL PINNED GALLERY
     ============================================ */
  const track = document.getElementById('hGalleryTrack');
  if (track) {
    const setGalleryScroll = () => {
      ScrollTrigger.getById('hGalleryScroll')?.kill();
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const distance = Math.max(trackWidth - viewportWidth + 48, 0);

      gsap.to(track, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          id: 'hGalleryScroll',
          trigger: '.h-gallery-pin',
          start: 'top top',
          end: () => `+=${distance + window.innerHeight}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    };
    setGalleryScroll();
    window.addEventListener('resize', () => {
      clearTimeout(window._hGalleryResizeTimer);
      window._hGalleryResizeTimer = setTimeout(setGalleryScroll, 250);
    });
  }

  /* ============================================
     PARALLAX QUOTE IMAGE
     ============================================ */
  gsap.to('#parallaxQuoteImg', {
    yPercent: -15,
    ease: 'none',
    scrollTrigger: { trigger: '.parallax-quote', start: 'top bottom', end: 'bottom top', scrub: true }
  });

  /* ============================================
     SCROLL REVEALS
     ============================================ */
  ScrollTrigger.batch('.reveal-adv', {
    start: 'top 88%',
    onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1 })
  });

  /* ============================================
     STAT COUNTERS
     ============================================ */
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseFloat(el.getAttribute('data-count'));
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.floor(counter.val).toLocaleString(); }
        });
      }
    });
  });

  /* ---------- CTA form (demo submit) ---------- */
  const advForm = document.getElementById('advForm');
  const advFormNote = document.getElementById('advFormNote');
  if (advForm) {
    advForm.addEventListener('submit', (e) => {
      e.preventDefault();
      advFormNote.textContent = "You're on the list — we'll email you when the next season opens. (Demo form, no data sent.)";
      advForm.reset();
    });
  }

  ScrollTrigger.refresh();
});
