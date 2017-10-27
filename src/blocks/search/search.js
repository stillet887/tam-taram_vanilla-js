const search = document.querySelector('.search');
const search_icon = search.querySelector('.search__icon')
const search_input = search.querySelector('.search__input')

search_icon.onclick = open_search;
search_input.onblur = close_search;

function open_search(){
    search_input.focus();
    search.classList.add('search_open');
}

function close_search(){
    search_input.value = '';
    search.classList.remove('search_open');
}

