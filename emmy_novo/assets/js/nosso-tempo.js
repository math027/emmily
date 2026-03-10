window.addEventListener('load', () => {
  update();
  setInterval(update, 1000);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  const target = document.querySelector('#tempo');
  if (target) observer.observe(target);
});

const startDate = new Date(2024, 11, 14); // 14 de dezembro de 2024

function update() {
  const now  = new Date();
  const diff = now - startDate;

  const totalSec = Math.floor(diff / 1000);
  const totalMin = Math.floor(totalSec / 60);
  const totalHrs = Math.floor(totalMin / 60);
  const totalDay = Math.floor(totalHrs / 24);

  const elDays = document.querySelector('.cnt-days');
  const elHrs  = document.querySelector('.cnt-hours');
  const elMin  = document.querySelector('.cnt-minutes');
  const elSec  = document.querySelector('.cnt-seconds');

  if (elDays) elDays.textContent  = pad(totalDay);
  if (elHrs)  elHrs.textContent   = pad(totalHrs % 24);
  if (elMin)  elMin.textContent   = pad(totalMin % 60);
  if (elSec)  elSec.textContent   = pad(totalSec % 60);
}

function pad(n) { return n < 10 ? '0' + n : n; }
