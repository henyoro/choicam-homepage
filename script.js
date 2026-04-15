/* ========================================
   ちょいCam Homepage - JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- HEADER SCROLL ----------
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (scrollY > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  // ---------- HAMBURGER MENU ----------
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ---------- SCROLL ANIMATIONS ----------
  const fadeElements = document.querySelectorAll('.fade-up');

  function revealVisible() {
    fadeElements.forEach(el => {
      if (el.classList.contains('visible')) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < windowHeight + 60) {
        el.classList.add('visible');
      }
    });
  }

  // Run on load
  revealVisible();

  // Run on scroll with throttle
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        revealVisible();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Safety: reveal everything after 4s
  setTimeout(() => {
    fadeElements.forEach(el => el.classList.add('visible'));
  }, 4000);

  // ---------- LINEUP TABS ----------
  const tabs = document.querySelectorAll('.lineup__tab');
  const tabContents = document.querySelectorAll('.lineup__content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetContent = document.getElementById('tab-' + target);
      targetContent.classList.add('active');

      // Animate new tab's cards
      const newFadeEls = targetContent.querySelectorAll('.fade-up');
      newFadeEls.forEach(el => {
        el.classList.remove('visible');
        void el.offsetWidth;
        setTimeout(() => el.classList.add('visible'), 50);
      });
    });
  });

  // ---------- SMOOTH SCROLL ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const top = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top, behavior: 'smooth' });

        // Reveal elements after scroll
        setTimeout(revealVisible, 500);
        setTimeout(revealVisible, 1000);
      }
    });
  });

  // ---------- NEWS TICKER (mobile) ----------
  const newsList = document.querySelector('.news__list');
  if (newsList && window.innerWidth < 768) {
    let scrollPos = 0;
    const scrollSpeed = 0.5;
    const maxScroll = newsList.scrollWidth - newsList.clientWidth;

    function autoScrollNews() {
      scrollPos += scrollSpeed;
      if (scrollPos >= maxScroll) scrollPos = 0;
      newsList.scrollLeft = scrollPos;
      requestAnimationFrame(autoScrollNews);
    }

    if (maxScroll > 0) {
      autoScrollNews();
    }
  }

  // ---------- CONTACT FORM ----------
  const form = document.querySelector('.contact__form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('お問い合わせありがとうございます。内容を確認の上、担当者よりご連絡いたします。');
      form.reset();
    });
  }

});
