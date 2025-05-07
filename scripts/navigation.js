const menuButton = document.getElementById('menu-button');
const navUl = document.querySelector('nav ul');

if (menuButton) {
  menuButton.addEventListener('click', () => {
    navUl.classList.toggle('active');
  });
}
