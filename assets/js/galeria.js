document.addEventListener('DOMContentLoaded', () => {

  // ── Intersection observer for entrance animation ──
  function observeCards() {
    const cards = document.querySelectorAll('.photo-card:not([data-observed])');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.dataset.delay) || 0;
          setTimeout(() => el.classList.add('visible'), delay);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach((card, i) => {
      card.dataset.delay = i * 80;
      card.dataset.observed = '1';
      observer.observe(card);
    });
  }

  observeCards();

  // ── Lightbox ──────────────────────────────────────
  const lightbox   = document.getElementById('lightbox');
  const lbImg      = document.getElementById('lb-img');
  const lbCaption  = document.getElementById('lb-caption');
  let photos       = [];
  let currentIdx   = 0;

  function buildPhotoList() {
    photos = [];
    document.querySelectorAll('.photo-card').forEach(card => {
      const img     = card.querySelector('img');
      const caption = card.querySelector('.photo-caption');
      photos.push({ src: img.src, caption: caption ? caption.textContent.trim() : '' });
    });
  }

  function bindCardClick(card, idx) {
    card.addEventListener('click', () => {
      buildPhotoList();
      // recalculate index after rebuild
      const allCards = Array.from(document.querySelectorAll('.photo-card'));
      const realIdx  = allCards.indexOf(card);
      openLightbox(realIdx);
    });
  }

  document.querySelectorAll('.photo-card').forEach((card, i) => bindCardClick(card, i));

  function openLightbox(idx) {
    currentIdx = idx;
    lbImg.src  = photos[idx].src;
    lbCaption.textContent = photos[idx].caption;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('lb-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  document.getElementById('lb-prev').addEventListener('click', e => {
    e.stopPropagation();
    currentIdx = (currentIdx - 1 + photos.length) % photos.length;
    lbImg.src  = photos[currentIdx].src;
    lbCaption.textContent = photos[currentIdx].caption;
  });

  document.getElementById('lb-next').addEventListener('click', e => {
    e.stopPropagation();
    currentIdx = (currentIdx + 1) % photos.length;
    lbImg.src  = photos[currentIdx].src;
    lbCaption.textContent = photos[currentIdx].caption;
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   document.getElementById('lb-prev').click();
    if (e.key === 'ArrowRight')  document.getElementById('lb-next').click();
  });

  // ── "Ver mais fotos" button ───────────────────────
  const btn = document.getElementById('btn-ver-mais');
  if (btn) {
    btn.addEventListener('click', () => {
      const extras = document.querySelectorAll('.photo-card.extra');

      if (extras.length === 0) {
        // Nenhuma foto extra – botão fica oculto (pode remover o botão)
        btn.style.display = 'none';
        return;
      }

      btn.classList.add('loading');
      btn.querySelector('.btn-text').textContent = 'Carregando...';

      extras.forEach(card => {
        card.classList.add('revealed');
        card.classList.remove('extra');
      });

      // Re-observe newly visible cards
      observeCards();

      // Re-bind lightbox clicks for new cards
      extras.forEach(card => bindCardClick(card));

      // Hide button if no more extras
      const remaining = document.querySelectorAll('.photo-card.extra');
      if (remaining.length === 0) {
        setTimeout(() => {
          btn.style.opacity = '0';
          btn.style.transform = 'translateY(10px)';
          setTimeout(() => btn.closest('.galeria-footer').style.display = 'none', 400);
        }, 400);
      } else {
        btn.classList.remove('loading');
        btn.querySelector('.btn-text').textContent = 'Ver mais fotos';
      }
    });
  }

});
