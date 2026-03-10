document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.promessa-item');
  const footer = document.querySelector('.promessas-footer');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay) || 0;
        setTimeout(() => el.classList.add('visible'), delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  items.forEach((item, i) => {
    item.dataset.delay = i * 120;
    observer.observe(item);
  });

  if (footer) {
    const footerObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          footer.classList.add('visible');
          footerObs.unobserve(footer);
        }
      });
    }, { threshold: 0.5 });
    footerObs.observe(footer);
  }
});
