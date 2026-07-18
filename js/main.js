/**
 * ВАШ ХОД — Landing Page Scripts
 * Деревянные настольные игры ручной работы
 */

(function () {
  'use strict';

  // Elements
  const header = document.getElementById('header');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  const detailsTabs = document.querySelectorAll('.details-tab');
  const detailsPanels = document.querySelectorAll('.details-panel');
  const orderButtons = document.querySelectorAll('[data-product]');
  const orderForm = document.getElementById('orderForm');
  const formSuccess = document.getElementById('formSuccess');

  // Header scroll effect
  function updateHeader() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // Mobile menu toggle
  function toggleMenu(forceClose) {
    const isOpen = navMenu.classList.contains('open');
    const shouldOpen = !isOpen && forceClose !== true;

    if (shouldOpen) {
      navMenu.classList.add('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      navMenu.classList.remove('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function () {
      toggleMenu();
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      toggleMenu(true);
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Scroll animations via IntersectionObserver
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    animateElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback for older browsers
    animateElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // Tabs logic
  detailsTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const targetId = this.getAttribute('aria-controls');

      detailsTabs.forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });

      detailsPanels.forEach(function (p) {
        p.classList.remove('active');
        p.setAttribute('hidden', '');
      });

      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');

      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
        targetPanel.removeAttribute('hidden');
      }
    });
  });

  // Pre-select product when clicking order button
  orderButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var product = this.getAttribute('data-product');
      if (!product) return;

      // Save selected product to localStorage for checkout page
      try {
        localStorage.setItem('selectedProduct', product);
      } catch (err) {
        // ignore
      }

      // If on index page and link points to #contact, let smooth-scroll work
      // If on checkout page, check the checkbox directly
      var productCheckboxes = document.querySelectorAll('input[name="products"]');
      if (productCheckboxes.length > 0) {
        e.preventDefault();
        productCheckboxes.forEach(function (cb) {
          if (cb.value.indexOf(product.split(' ')[0]) !== -1) {
            cb.checked = true;
          }
        });
      }
    });
  });

  // On checkout page, restore selected product from localStorage
  (function () {
    var productCheckboxes = document.querySelectorAll('input[name="products"]');
    if (productCheckboxes.length > 0) {
      try {
        var saved = localStorage.getItem('selectedProduct');
        if (saved) {
          productCheckboxes.forEach(function (cb) {
            if (cb.value.indexOf(saved.split(' ')[0]) !== -1) {
              cb.checked = true;
            }
          });
          localStorage.removeItem('selectedProduct');
        }
      } catch (err) {
        // ignore
      }
    }
  })();

  // Phone input mask (lightweight)
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
      let value = this.value.replace(/\D/g, '');
      if (value.length > 0 && value[0] === '7') {
        value = value.substring(1);
      }
      if (value.length > 10) {
        value = value.substring(0, 10);
      }

      let formatted = '+7';
      if (value.length > 0) {
        formatted += ' (' + value.substring(0, 3);
      }
      if (value.length >= 3) {
        formatted += ') ' + value.substring(3, 6);
      }
      if (value.length >= 6) {
        formatted += '-' + value.substring(6, 8);
      }
      if (value.length >= 8) {
        formatted += '-' + value.substring(8, 10);
      }

      this.value = formatted;
    });
  }

  // Form handling is now done via Google Forms inline script in index.html
  // (see the script block at the bottom of index.html)

  // Close mobile menu on escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      toggleMenu(true);
    }
  });

  // ============================================
  // Photo Gallery (Lightbox)
  // ============================================
  (function () {
    var GALLERY_IMAGES = {
      balansir: [
        'main.webp',
        'kit.webp',
        'howtoplay.webp',
        'handmade.webp',
        'packaging.webp',
        'social.webp',
        'gift.webp',
        'gameplay.webp',
        'personalization.webp',
        'example1.webp',
        'example2.webp',
        'example3.webp'
      ],
      pilos: [
        'main.webp',
        'kit.webp',
        'howtoplay.webp',
        'handmade.webp',
        'packaging.webp',
        'social.webp',
        'gift.webp',
        'gameplay.webp'
      ],
      elastik: [
        'main.webp',
        'kit.webp',
        'howtoplay.webp',
        'handmade.webp',
        'packaging.webp',
        'gift.webp',
        'gameplay.webp'
      ]
    };

    var overlay = null;
    var imgEl = null;
    var counterEl = null;
    var currentGame = null;
    var currentIndex = 0;
    var isOpen = false;

    function buildOverlay() {
      if (overlay) return;
      overlay = document.createElement('div');
      overlay.className = 'gallery-overlay';
      overlay.innerHTML =
        '<div class="gallery-container">' +
        '  <button class="gallery-close" aria-label="Закрыть галерею">' +
        '    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>' +
        '    Назад' +
        '  </button>' +
        '  <button class="gallery-nav gallery-prev" aria-label="Предыдущее фото">' +
        '    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>' +
        '  </button>' +
        '  <div class="gallery-spinner"></div>' +
        '  <img class="gallery-image" alt="" src="">' +
        '  <button class="gallery-nav gallery-next" aria-label="Следующее фото">' +
        '    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>' +
        '  </button>' +
        '  <div class="gallery-counter"></div>' +
        '</div>';

      document.body.appendChild(overlay);
      imgEl = overlay.querySelector('.gallery-image');
      counterEl = overlay.querySelector('.gallery-counter');

      overlay.querySelector('.gallery-close').addEventListener('click', closeGallery);
      overlay.querySelector('.gallery-prev').addEventListener('click', function (e) { e.stopPropagation(); prevImage(); });
      overlay.querySelector('.gallery-next').addEventListener('click', function (e) { e.stopPropagation(); nextImage(); });
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay || e.target.classList.contains('gallery-container')) {
          closeGallery();
        }
      });
    }

    function getPath(game, filename) {
      return 'images/' + game + '/' + filename;
    }

    function preload(game, index) {
      var files = GALLERY_IMAGES[game];
      if (!files || !files[index]) return;
      var img = new Image();
      img.src = getPath(game, files[index]);
    }

    function updateImage() {
      var files = GALLERY_IMAGES[currentGame];
      if (!files || !files.length) return;

      imgEl.classList.remove('loaded');
      var filename = files[currentIndex];
      counterEl.textContent = (currentIndex + 1) + ' / ' + files.length;

      var newImg = new Image();
      newImg.onload = function () {
        if (!isOpen) return;
        imgEl.src = newImg.src;
        imgEl.alt = filename;
        imgEl.classList.add('loaded');
      };
      newImg.onerror = function () {
        if (!isOpen) return;
        imgEl.alt = 'Ошибка загрузки: ' + filename;
        imgEl.classList.add('loaded');
      };
      newImg.src = getPath(currentGame, filename);

      // Preload neighbors
      preload(currentGame, currentIndex - 1);
      preload(currentGame, currentIndex + 1);
    }

    function openGallery(game) {
      if (!GALLERY_IMAGES[game]) return;
      buildOverlay();
      currentGame = game;
      currentIndex = 0;
      isOpen = true;
      document.body.style.overflow = 'hidden';
      overlay.classList.add('active');
      updateImage();
    }

    function closeGallery() {
      if (!isOpen) return;
      isOpen = false;
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      setTimeout(function () {
        imgEl.src = '';
        imgEl.classList.remove('loaded');
      }, 350);
    }

    function nextImage() {
      if (!currentGame) return;
      var files = GALLERY_IMAGES[currentGame];
      currentIndex = (currentIndex + 1) % files.length;
      updateImage();
    }

    function prevImage() {
      if (!currentGame) return;
      var files = GALLERY_IMAGES[currentGame];
      currentIndex = (currentIndex - 1 + files.length) % files.length;
      updateImage();
    }

    document.querySelectorAll('[data-gallery]').forEach(function (el) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', function () {
        var game = this.getAttribute('data-gallery');
        if (game) openGallery(game);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (!isOpen) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeGallery();
    });
  })();

  // Cookie / Yandex.Metrica notice banner
  (function () {
    if (localStorage.getItem('cookieConsent')) return;

    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.innerHTML =
      '<div style="max-width: 1200px; margin: 0 auto; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem;">' +
      '<span style="font-size: 0.9rem; line-height: 1.5;">Мы используем Яндекс.Метрику для анализа трафика. Продолжая пользоваться сайтом, вы соглашаетесь с <a href=\'privacy.html\' style=\'color: #c9a96e; text-decoration: underline;\'>политикой конфиденциальности</a>.</span>' +
      '<button id=\'cookie-accept\' style=\'background: #c9a96e; color: #1a1a1a; border: none; padding: 0.6rem 1.2rem; border-radius: 6px; font-weight: 600; cursor: pointer; white-space: nowrap;\'>Понятно</button>' +
      '</div>';
    banner.style.cssText =
      'position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999; ' +
      'background: rgba(26, 26, 26, 0.96); color: #f5f1e8; ' +
      'padding: 1rem; box-shadow: 0 -4px 20px rgba(0,0,0,0.3); ' +
      'border-top: 1px solid rgba(201, 169, 110, 0.3);';

    document.body.appendChild(banner);

    document.getElementById('cookie-accept').addEventListener('click', function () {
      localStorage.setItem('cookieConsent', 'true');
      banner.remove();
    });
  })();
})();
