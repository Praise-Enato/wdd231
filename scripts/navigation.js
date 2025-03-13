const menuButton = document.getElementById('menu-button');
const navUl = document.querySelector('nav ul');

menuButton.addEventListener('click', () => {
    navUl.classList.toggle('active');
});