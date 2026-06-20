window.dmAPI.runOnReady('mplus-cultural-platform', () => {

  // ============================================================
  // LOAD GOOGLE FONTS
  // ============================================================
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap';
  document.head.appendChild(fontLink);

  // ============================================================
  // HERO BACKGROUND — PDF page 1: candlelit dinner in vaulted barn
  // ============================================================
  const heroBg = element.querySelector('#hero-bg');
  if (heroBg) {
    heroBg.style.backgroundImage = "url('https://image-res-platform.s3.amazonaws.com/cwdt/5d1277935f26495a85796cc6afbae1fa/images/e39eb550-ad9c-4738-8c94-efc083cf8c09.png')";
    heroBg.style.backgroundSize = 'cover';
    heroBg.style.backgroundPosition = 'center';
  }

  // ============================================================
  // MANIFESTO BACKGROUND — PDF page 7 bottom: sunflower field + hills
  // ============================================================
  const manifestoBg = element.querySelector('#manifesto-bg');
  if (manifestoBg) {
    manifestoBg.style.backgroundImage = "url('https://image-res-platform.s3.amazonaws.com/cwdt/5d1277935f26495a85796cc6afbae1fa/images/d87843eb-bf57-4f1b-976d-84b2659ecfaf.png')";
    manifestoBg.style.backgroundSize = 'cover';
    manifestoBg.style.backgroundPosition = 'center';
  }

  // ============================================================
  // LANGUAGE SWITCHER
  // ============================================================
  const currentLang = { value: 'it' };

  function setLanguage(lang) {
    currentLang.value = lang;

    element.querySelectorAll('[data-it]').forEach(el => {
      const text = el.getAttribute('data-' + lang);
      if (text) el.textContent = text;
    });

    element.querySelectorAll('[data-placeholder-it]').forEach(el => {
      const ph = el.getAttribute('data-placeholder-' + lang);
      if (ph !== null) el.setAttribute('placeholder', ph);
    });

    element.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    element.querySelectorAll('#lang-' + lang + ', #mob-lang-' + lang + ', #footer-lang-' + lang).forEach(btn => {
      if (btn) btn.classList.add('active');
    });
  }

  const langItBtns = element.querySelectorAll('#lang-it, #mob-lang-it, #footer-lang-it');
  const langEnBtns = element.querySelectorAll('#lang-en, #mob-lang-en, #footer-lang-en');

  langItBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', () => setLanguage('it'));
  });

  langEnBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', () => setLanguage('en'));
  });

  // ============================================================
  // SMOOTH SCROLL NAVIGATION
  // ============================================================
  element.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = element.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = parseInt(getComputedStyle(element).getPropertyValue('--nav-height') || '72', 10);
        const elementRect = target.getBoundingClientRect();
        const absoluteTop = window.pageYOffset + elementRect.top - navHeight;
        window.scrollTo({ top: absoluteTop, behavior: 'smooth' });

        const mobileMenu = element.querySelector('#nav-mobile-menu');
        if (mobileMenu) mobileMenu.classList.remove('open');
      }
    });
  });

  // ============================================================
  // MOBILE HAMBURGER MENU
  // ============================================================
  const hamburger = element.querySelector('#nav-hamburger');
  const mobileMenu = element.querySelector('#nav-mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

  // ============================================================
  // STICKY NAV SHADOW ON SCROLL
  // ============================================================
  const nav = element.querySelector('.mplus-nav');
  function updateNavOnScroll() {
    if (!nav) return;
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNavOnScroll, { passive: true });
  updateNavOnScroll();

  // ============================================================
  // FADE-IN ON SCROLL (Intersection Observer)
  // ============================================================
  const fadeInSections = element.querySelectorAll('.fade-in-section');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.08
  };

  const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        intersectionObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeInSections.forEach(section => {
    intersectionObserver.observe(section);
  });

  // ============================================================
  // GALLERY ITEMS STAGGER ANIMATION
  // ============================================================
  const galleryItems = element.querySelectorAll('.gallery-item');
  const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 70);
        galleryObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  galleryItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(24px)';
    item.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
    galleryObserver.observe(item);
  });

  // ============================================================
  // VALUE CARDS STAGGER
  // ============================================================
  const valueCards = element.querySelectorAll('.value-card');
  const valuesGrid = element.querySelector('.values-grid');

  const valueObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.value-card');
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, i * 80);
        });
        valueObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  if (valuesGrid) {
    valueCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease, border-color 0.3s ease';
    });
    valueObserver.observe(valuesGrid);
  }

  // ============================================================
  // MANIFESTO LINE-BY-LINE ANIMATION
  // ============================================================
  const manifestoLines = element.querySelectorAll('.manifesto-line, .manifesto-signature');
  const manifestoText = element.querySelector('.manifesto-text');

  const manifestoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lines = entry.target.querySelectorAll('.manifesto-line, .manifesto-signature');
        lines.forEach((line, i) => {
          setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
          }, i * 100);
        });
        manifestoObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  if (manifestoText) {
    manifestoLines.forEach(line => {
      line.style.opacity = '0';
      line.style.transform = 'translateY(16px)';
      line.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    });
    manifestoObserver.observe(manifestoText);
  }

  // ============================================================
  // CONTACT FORM SUBMISSION
  // ============================================================
  const contactForm = element.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = this.querySelector('.btn-send');
      if (!btn) return;
      const originalText = btn.textContent;
      btn.textContent = currentLang.value === 'it' ? 'Inviato ✓' : 'Sent ✓';
      btn.style.background = 'var(--olive)';
      btn.style.borderColor = 'var(--olive)';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
        contactForm.reset();
      }, 3000);
    });
  }

  // Newsletter buttons
  element.querySelectorAll('.btn-newsletter, .btn-footer-nl').forEach(btn => {
    btn.addEventListener('click', function() {
      const form = this.closest('.newsletter-form, .footer-nl-form');
      if (!form) return;
      const input = form.querySelector('input[type="email"]');
      if (input && input.value.includes('@')) {
        const original = this.textContent;
        this.textContent = '✓';
        this.style.background = 'var(--olive)';
        setTimeout(() => {
          this.textContent = original;
          this.style.background = '';
          input.value = '';
        }, 2500);
      }
    });
  });

  // ============================================================
  // ACTIVE NAV LINK ON SCROLL
  // ============================================================
  const sections = element.querySelectorAll('section[id]');
  const navLinks = element.querySelectorAll('.nav-link');

  function setActiveLink() {
    let current = '';
    const navH = 80;
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top <= navH + 60) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === '#' + current) {
        link.style.opacity = '1';
        link.style.color = 'var(--terracotta)';
      } else {
        link.style.opacity = '';
        link.style.color = '';
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

});
