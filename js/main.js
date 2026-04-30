// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('done');
    document.body.style.overflow = 'auto';
    // Trigger hero reveals
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 120);
    });
  }, 2000);
});
document.body.style.overflow = 'hidden';

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');
if (cursor && cursorDot) {
  let mouseX = 0, mouseY = 0;
  let curX = 0, curY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function animateCursor() {
    curX += (mouseX - curX) * 0.12;
    curY += (mouseY - curY) * 0.12;
    cursor.style.left = curX + 'px';
    cursor.style.top = curY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .service-card, .team-card, .pricing-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('expanded'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('expanded'));
  });
}

// ===== NAVIGATION =====
const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');

  // Back to top
  const btt = document.getElementById('back-to-top');
  if (btt) {
    if (window.scrollY > 400) btt.classList.add('visible');
    else btt.classList.remove('visible');
  }
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, parseInt(delay));
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start).toLocaleString();
    }
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(el => {
        const target = parseInt(el.dataset.target);
        animateCounter(el, target);
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

// ===== BEFORE/AFTER SLIDER =====
const baSlider = document.getElementById('ba-slider');
const baHandle = document.getElementById('ba-handle');
const baAfter = baSlider ? baSlider.querySelector('.ba-after') : null;

if (baSlider && baHandle && baAfter) {
  let isDragging = false;
  let startPercent = 50;

  function setSliderPosition(percent) {
    percent = Math.max(5, Math.min(95, percent));
    baAfter.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
    baHandle.style.left = percent + '%';
  }

  function getPercent(e) {
    const rect = baSlider.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    return ((clientX - rect.left) / rect.width) * 100;
  }

  baHandle.addEventListener('mousedown', () => isDragging = true);
  baSlider.addEventListener('mousedown', (e) => { isDragging = true; setSliderPosition(getPercent(e)); });
  window.addEventListener('mousemove', (e) => { if (isDragging) setSliderPosition(getPercent(e)); });
  window.addEventListener('mouseup', () => isDragging = false);

  baHandle.addEventListener('touchstart', (e) => { isDragging = true; e.preventDefault(); });
  baSlider.addEventListener('touchstart', (e) => { isDragging = true; setSliderPosition(getPercent(e)); });
  window.addEventListener('touchmove', (e) => { if (isDragging) setSliderPosition(getPercent(e)); });
  window.addEventListener('touchend', () => isDragging = false);

  // Auto animate on load
  let animDir = 1;
  let animPercent = 50;
  function autoAnimate() {
    if (!isDragging) {
      animPercent += animDir * 0.3;
      if (animPercent >= 75) animDir = -1;
      if (animPercent <= 25) animDir = 1;
      setSliderPosition(animPercent);
    }
    requestAnimationFrame(autoAnimate);
  }
  autoAnimate();
}

// ===== TESTIMONIAL SLIDER =====
const track = document.getElementById('testimonial-track');
const dotsContainer = document.getElementById('t-dots');
const prevBtn = document.getElementById('t-prev');
const nextBtn = document.getElementById('t-next');

if (track) {
  const cards = track.querySelectorAll('.testimonial-card');
  const totalCards = cards.length;
  let currentIndex = 0;
  let autoSlide;
  let cardsPerView = window.innerWidth > 900 ? 3 : window.innerWidth > 600 ? 2 : 1;

  function getCardsPerView() {
    if (window.innerWidth > 900) return 3;
    if (window.innerWidth > 600) return 2;
    return 1;
  }

  function updateCardWidths() {
    cardsPerView = getCardsPerView();
    const gap = 28;
    const containerWidth = track.parentElement.offsetWidth;
    const cardWidth = (containerWidth - gap * (cardsPerView - 1)) / cardsPerView;
    cards.forEach(card => {
      card.style.minWidth = cardWidth + 'px';
      card.style.flex = `0 0 ${cardWidth}px`;
    });
  }

  function createDots() {
    dotsContainer.innerHTML = '';
    const maxIndex = totalCards - cardsPerView;
    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement('div');
      dot.className = 't-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    document.querySelectorAll('.t-dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentIndex);
    });
  }

  function goTo(index) {
    const maxIndex = totalCards - cardsPerView;
    currentIndex = Math.max(0, Math.min(maxIndex, index));
    const gap = 28;
    const cardWidth = cards[0].offsetWidth;
    track.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
    updateDots();
  }

  function next() { goTo(currentIndex + 1); if (currentIndex >= totalCards - cardsPerView) goTo(0); }
  function prev() { goTo(currentIndex - 1); }

  prevBtn.addEventListener('click', () => { prev(); resetAuto(); });
  nextBtn.addEventListener('click', () => { next(); resetAuto(); });

  function resetAuto() {
    clearInterval(autoSlide);
    autoSlide = setInterval(next, 4500);
  }

  // Touch support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); resetAuto(); }
  });

  window.addEventListener('resize', () => {
    updateCardWidths();
    createDots();
    goTo(0);
  });

  updateCardWidths();
  createDots();
  resetAuto();
}

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ===== FORM SUBMISSION =====
function handleSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  const btn = form.querySelector('.btn-primary');

  btn.innerHTML = '<span class="btn-text">Sending...</span>';
  btn.disabled = true;

  setTimeout(() => {
    form.style.display = 'none';
    success.classList.add('visible');
  }, 1500);
}

// ===== BACK TO TOP =====
const bttBtn = document.getElementById('back-to-top');
if (bttBtn) {
  bttBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===== PARALLAX HERO =====
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const blobs = document.querySelectorAll('.blob');
  blobs.forEach((blob, i) => {
    const speed = 0.08 + i * 0.03;
    blob.style.transform = `translateY(${scrolled * speed}px)`;
  });

  // Nav link active state
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    const bottom = top + section.offsetHeight;
    if (scrolled >= top && scrolled < bottom) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + section.id) link.classList.add('active');
      });
    }
  });
});

// ===== MAGNETIC BUTTONS =====
document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
  btn.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-3px)`;
  });
  btn.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// ===== TILT EFFECT ON CARDS =====
document.querySelectorAll('.service-card, .team-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    this.style.transform = `translateY(-8px) perspective(1000px) rotateX(${y * -5}deg) rotateY(${x * 5}deg)`;
  });
  card.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// ===== STAGGERED SERVICE CARDS =====
const serviceCards = document.querySelectorAll('.service-card');
const serviceObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const index = Array.from(serviceCards).indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), index * 100);
      serviceObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
serviceCards.forEach(card => serviceObserver.observe(card));

console.log('%c🦷 PearlSmile Dental Website Loaded', 'color: #c8a96e; font-size: 16px; font-weight: bold;');
