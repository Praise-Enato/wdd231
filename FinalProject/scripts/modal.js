// scripts/modal.js

export function setupNavigation() {
  const toggleBtn = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }
}
