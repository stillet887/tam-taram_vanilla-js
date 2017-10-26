const header = document.querySelector('.header');
const menu_button = header.querySelector('.header__menu-button');
const menu_close_button = header.querySelector('.header__close-button');
const header__nav = header.querySelector('.header__nav');

menu_button.onclick = open_links;

function open_links() {
    menu_button.classList.toggle('header__menu-button_pressed');
    menu_close_button.classList.toggle('header__close-button_visible')
    header__nav.classList.toggle('header__nav_mobile-opened');
}
