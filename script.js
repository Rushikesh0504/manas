// script.js

// 1) Scroll reveal (intersection observer)
document.addEventListener('DOMContentLoaded', () => {
  const elems = document.querySelectorAll('.fade-scroll');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('show');
    });
  }, { threshold: 0.20 });

  elems.forEach(el => io.observe(el));
});

// 2) Contact form submission
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const status = document.getElementById('formStatus');
    status.textContent = 'Sending...';

    const payload = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      message: document.getElementById('message').value.trim()
    };

    try {
      const resp = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await resp.json();
      if (data.ok) {
        status.textContent = 'Message sent — we will contact you soon. Thank you!';
        form.reset();
      } else {
        status.textContent = 'Error: ' + (data.error || 'Unable to send');
      }
    } catch (err) {
      console.error(err);
      status.textContent = 'Network error — try again later.';
    }

    setTimeout(()=>{ status.textContent = '' }, 6000);
  });
  // 3) Hero background image slider
  const hero = document.querySelector('.hero');

  const images = [
    '/images/bg3.jpg',
    '/images/bg2.jpg',
    '/images/bg1.jpg',
  ];

  let index = 0;

  function changeHeroBackground() {
    hero.style.backgroundImage = `url('${images[index]}')`;
    index = (index + 1) % images.length;
  }

  changeHeroBackground('/images/bg3.jpg');                // set first image
  setInterval(changeHeroBackground, 4000); // change every 4 seconds

}
