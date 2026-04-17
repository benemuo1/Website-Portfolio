// Navbar
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', scrollY > 60));

// Mobile nav
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('active')));

// Scroll reveal with stagger
const animEls = document.querySelectorAll('[data-anim]');
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      const delay = e.target.dataset.anim === 'stagger' ? i * 80 : 0;
      setTimeout(() => e.target.classList.add('visible'), delay);
    }
  });
}, { threshold: 0.12 });
animEls.forEach(el => obs.observe(el));

// Testimonial slider
const track = document.getElementById('testimonialTrack');
const slides = track.querySelectorAll('.testimonial-slide');
const dotsWrap = document.getElementById('testimonialDots');
let current = 0;

slides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goTo(i));
  dotsWrap.appendChild(dot);
});

function goTo(n) {
  current = (n + slides.length) % slides.length;
  track.style.transform = `translateX(-${current * 100}%)`;
  dotsWrap.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
}

document.getElementById('prevSlide').addEventListener('click', () => goTo(current - 1));
document.getElementById('nextSlide').addEventListener('click', () => goTo(current + 1));

// Auto-advance
setInterval(() => goTo(current + 1), 6000);

// Form
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Request Sent ✓';
  btn.style.background = 'var(--g5)';
  setTimeout(() => { btn.textContent = 'Request Appointment'; btn.style.background = ''; e.target.reset(); }, 3000);
});
