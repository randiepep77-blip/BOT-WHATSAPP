/* ============================================================
   BOT WA BY RAN — Main Script v3.0
   ============================================================ */

(function() {
  'use strict';

  const GROUP_LINK = 'https://chat.whatsapp.com/JfZjHEmiCnRANWMMQhg13O';

  /* ============ 1. LOADER ============ */
  const loader = document.getElementById('loader');
  const loaderProgress = document.getElementById('loaderProgress');
  const loaderText = document.getElementById('loaderText');

  document.body.classList.add('loading');

  let progress = 0;
  const messages = ['Memuat', 'Menyiapkan', 'Hampir selesai', 'Selesai'];
  let msgIndex = 0;

  const loadInterval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress > 100) progress = 100;
    if (loaderProgress) loaderProgress.style.width = progress + '%';

    if (progress > 25 && msgIndex < 1) { msgIndex = 1; if (loaderText) loaderText.textContent = messages[1]; }
    if (progress > 60 && msgIndex < 2) { msgIndex = 2; if (loaderText) loaderText.textContent = messages[2]; }
    if (progress > 95 && msgIndex < 3) { msgIndex = 3; if (loaderText) loaderText.textContent = messages[3]; }

    if (progress >= 100) {
      clearInterval(loadInterval);
      setTimeout(() => {
        if (loader) loader.classList.add('hidden');
        document.body.classList.remove('loading');
      }, 400);
    }
  }, 180);

  /* ============ 2. CURSOR ============ */
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursorFollower');

  if (cursor && cursorFollower && window.matchMedia('(pointer: fine)').matches) {
    let mx = 0, my = 0, fx = 0, fy = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });
    function animateFollower() {
      fx += (mx - fx) * 0.18;
      fy += (my - fy) * 0.18;
      cursorFollower.style.transform = `translate(${fx}px, ${fy}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    document.querySelectorAll('a, button, .feature-card, .faq-item summary').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.classList.add('grow'); cursorFollower.classList.add('grow'); });
      el.addEventListener('mouseleave', () => { cursor.classList.remove('grow'); cursorFollower.classList.remove('grow'); });
    });
  }

  /* ============ 3. SPARKLES ============ */
  const sparklesContainer = document.getElementById('sparkles');
  if (sparklesContainer) {
    for (let i = 0; i < 30; i++) {
      const s = document.createElement('div');
      s.className = 'sparkle';
      s.style.left = Math.random() * 100 + '%';
      s.style.animationDuration = (Math.random() * 8 + 8) + 's';
      s.style.animationDelay = (Math.random() * 10) + 's';
      s.style.opacity = Math.random() * 0.7 + 0.3;
      sparklesContainer.appendChild(s);
    }
  }

  /* ============ 4. CONSTELLATION ============ */
  const canvas = document.getElementById('constellation');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particleCount = window.innerWidth < 768 ? 30 : 60;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5
      });
    }

    function drawConstellation() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(drawConstellation);
    }
    drawConstellation();
  }

  /* ============ 5. LIVE CLOCK ============ */
  const liveClock = document.getElementById('liveClock');
  if (liveClock) {
    function updateClock() {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      liveClock.textContent = `${h}:${m}:${s}`;
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

  /* ============ 6. TYPEWRITER ============ */
  const typewriter = document.getElementById('typewriter');
  if (typewriter) {
    const texts = [
      'Akses fitur premium cuma Rp 20.000',
      '100+ perintah siap pakai',
      'Bot online 24/7 non-stop',
      'Gratis untuk fitur umum'
    ];
    let textIndex = 0, charIndex = 0, isDeleting = false;
    function typeLoop() {
      const currentText = texts[textIndex];
      if (!isDeleting) {
        typewriter.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentText.length) { isDeleting = true; setTimeout(typeLoop, 2000); return; }
      } else {
        typewriter.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) { isDeleting = false; textIndex = (textIndex + 1) % texts.length; }
      }
      setTimeout(typeLoop, isDeleting ? 30 : 70);
    }
    typeLoop();
  }

  /* ============ 7. COUNTERS ============ */
  function animateCounter(el, target, prefix = '', suffix = '') {
    let current = 0;
    const duration = 1500;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const pct = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - pct, 3);
      current = Math.floor(eased * target);
      el.textContent = prefix + current + suffix;
      if (pct < 1) requestAnimationFrame(update);
      else el.textContent = prefix + target + suffix;
    }
    requestAnimationFrame(update);
  }

  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        animateCounter(el, parseInt(el.dataset.count) || 0, el.dataset.prefix || '', el.dataset.suffix || '');
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  counters.forEach(c => counterObserver.observe(c));

  /* ============ 8. STAT COUNTERS ============ */
  ['memberCount', 'msgCount'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const target = parseInt(el.dataset.target) || 0;
    let current = 0;
    const interval = setInterval(() => {
      current += Math.ceil(target / 40);
      if (current >= target) { current = target; clearInterval(interval); }
      el.textContent = current;
    }, 40);
  });

  /* ============ 9. SCROLL PROGRESS ============ */
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  if (scrollProgressBar) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgressBar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
    });
  }

  /* ============ 10. REVEAL ============ */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(r => revealObserver.observe(r));

  /* ============ 11. BACK TO TOP ============ */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) backToTop.classList.add('visible');
      else backToTop.classList.remove('visible');
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ============ 12. STICKY CTA ============ */
  const stickyCta = document.getElementById('stickyCta');
  if (stickyCta) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500 && window.innerWidth <= 900) stickyCta.classList.add('visible');
      else stickyCta.classList.remove('visible');
    });
  }

  /* ============ 13. COPY ============ */
  const copyBtn = document.getElementById('copyBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(GROUP_LINK);
        showToast('✅ Link berhasil disalin!');
      } catch (e) {
        const input = document.createElement('input');
        input.value = GROUP_LINK;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        showToast('✅ Link berhasil disalin!');
      }
    });
  }

  /* ============ 14. SHARE ============ */
  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const shareData = {
        title: 'BOT WA BY RAN',
        text: 'Akses fitur premium cuma Rp 20.000! Join grup sekarang:',
        url: GROUP_LINK
      };
      if (navigator.share) {
        try { await navigator.share(shareData); }
        catch (e) { if (e.name !== 'AbortError') showToast('❌ Gagal share'); }
      } else {
        try {
          await navigator.clipboard.writeText(shareData.text + ' ' + GROUP_LINK);
          showToast('✅ Link disalin, share manual ya!');
        } catch (e) { showToast('❌ Browser tidak support share'); }
      }
    });
  }

  /* ============ 15. QR MODAL ============ */
  const qrBtn = document.getElementById('qrBtn');
  const qrModal = document.getElementById('qrModal');
  const qrCode = document.getElementById('qrCode');
  const qrDownloadBtn = document.getElementById('qrDownloadBtn');

  function generateQR() {
    if (!qrCode) return;
    qrCode.innerHTML = '';
    const size = 220;
    const img = document.createElement('img');
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(GROUP_LINK)}`;
    img.alt = 'QR Code';
    img.crossOrigin = 'anonymous';
    qrCode.appendChild(img);
  }

  if (qrBtn && qrModal) {
    qrBtn.addEventListener('click', () => { qrModal.classList.add('open'); generateQR(); });
  }

  document.querySelectorAll('[data-close-modal]').forEach(el => {
    el.addEventListener('click', () => { if (qrModal) qrModal.classList.remove('open'); });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && qrModal) qrModal.classList.remove('open');
  });

  if (qrDownloadBtn) {
    qrDownloadBtn.addEventListener('click', async () => {
      const img = qrCode.querySelector('img');
      if (!img) { showToast('❌ QR belum di-generate'); return; }
      try {
        const res = await fetch(img.src);
        const blob = await res.blob();
        const dataUrl = await new Promise(resolve => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
        const link = document.createElement('a');
        link.download = 'qr-bot-wa-ran.png';
        link.href = dataUrl;
        link.click();
        showToast('✅ QR berhasil didownload!');
      } catch (e) { showToast('❌ Gagal download QR'); }
    });
  }

  /* ============ 16. TOAST ============ */
  const toastContainer = document.getElementById('toastContainer');
  function showToast(message) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">✨</span><span>${message}</span>`;
    toastContainer.appendChild(toast);
    requestAnimationFrame(() => setTimeout(() => toast.classList.add('show'), 50));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 2800);
  }

  /* ============ 17. SOUND TOGGLE ============ */
  const soundToggle = document.getElementById('soundToggle');
  let soundEnabled = false;
  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundToggle.classList.toggle('muted', !soundEnabled);
      showToast(soundEnabled ? '🔊 Suara aktif' : '🔇 Suara dimatikan');
    });
  }

  /* ============ 18. SHORTCUTS ============ */
  const shortcutsPanel = document.getElementById('shortcutsPanel');
  const shortcutsClose = document.getElementById('shortcutsClose');
  if (shortcutsClose) {
    shortcutsClose.addEventListener('click', () => {
      if (shortcutsPanel) shortcutsPanel.classList.remove('open');
    });
  }

  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    const key = e.key.toLowerCase();
    if (key === 'enter') window.open(GROUP_LINK, '_blank');
    else if (key === 'c') { if (copyBtn) copyBtn.click(); }
    else if (key === 's') { if (shareBtn) shareBtn.click(); }
    else if (key === 'q') { if (qrBtn) qrBtn.click(); }
    else if (key === 't') window.scrollTo({ top: 0, behavior: 'smooth' });
    else if (key === '?' || (e.shiftKey && key === '/')) {
      if (shortcutsPanel) shortcutsPanel.classList.toggle('open');
    }
  });

  /* ============ 19. JOIN BUTTON ============ */
  const joinBtn = document.getElementById('joinBtn');
  if (joinBtn) {
    joinBtn.addEventListener('click', () => showToast('🚀 Membuka grup WhatsApp...'));
  }

  /* ============ 20. CARD ENTRANCE ============ */
  document.querySelectorAll('.feature-card').forEach((card, i) => {
    card.style.animationDelay = (i * 0.03) + 's';
  });

  /* ============ 21. FEATURE CARD PRESS EFFECT ============ */
  (function() {
    const cards = document.querySelectorAll('.feature-card');
    if (!cards.length) return;

    function resetAll() { cards.forEach(c => c.classList.remove('pressed')); }
    function pressCard(card) {
      resetAll();
      card.classList.add('pressed');
      setTimeout(() => card.classList.remove('pressed'), 500);
    }

    cards.forEach(card => {
      card.addEventListener('click', function(e) {
        e.stopPropagation();
        pressCard(this);
      });
      card.addEventListener('touchstart', function() {
        resetAll();
        this.classList.add('pressed');
      }, { passive: true });
      card.addEventListener('touchend', function() {
        const self = this;
        setTimeout(() => self.classList.remove('pressed'), 500);
      }, { passive: true });
      card.addEventListener('touchcancel', function() {
        this.classList.remove('pressed');
      }, { passive: true });
    });

    console.log('✅ Feature card press effect loaded:', cards.length, 'cards');
  })();

  /* ============ 22. YEAR ============ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ============ 23. SMOOTH SCROLL ============ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  /* ============ EXPORT ============ */
  window.showToast = showToast;
  window.GROUP_LINK = GROUP_LINK;

  console.log('%c🤖 BOT WA BY RAN', 'color:#fff;background:#000;padding:6px 12px;border-radius:4px;font-weight:bold;font-size:14px');
  console.log('%cAkses Fitur Premium Hanya 20K', 'color:#ffd24a;font-weight:bold;font-size:12px');

})();