const custom_select = document.querySelector('.custom-select');
const custom_select_options = custom_select.querySelectorAll('.custom-select__option');
const custom_select_current_value = custom_select.querySelector('.custom-select__current-value');
custom_select_options.forEach(function(option){
    option.onclick = change_selected_option;
});

function change_selected_option(event) {
    const new_select_option = event.target;
    custom_select_options.forEach(function(option){
        if(option != new_select_option) {
            option.classList.remove('custom-select__option_selected');
        } else {
            option.classList.add('custom-select__option_selected');
            custom_select_current_value.innerHTML = option.innerHTML;
        }
    });
}

const header = document.querySelector('.header');
const menu_button = header.querySelector('.header__menu-button');
const menu_close_button = header.querySelector('.header__close-button');
const header__nav = header.querySelector('.header__nav');

menu_button.onclick = open_links;

function open_links() {
    menu_button.classList.toggle('header__menu-button_pressed');
    menu_close_button.classList.toggle('header__close-button_visible');
    header__nav.classList.toggle('header__nav_mobile-opened');
}

const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubePlayerAPIReady() {
    window.player = new YT.Player('js-player', {
        height: '360',
        width: '640',
        playerVars: {
            rel: 0,
            autoplay: 1,
            controls: 0,
            showinfo: 0
        },
        events: {
            'onReady': player_ready,
            'onStateChange': player_state_change
        }
    });
}

const modal = document.querySelector('.modal-video-box');
const close_button = document.getElementById('js-video-modal-close');
const video_cover = modal.querySelector('.modal-video-box__cover');
const body = document.body;
let player_status = false;

close_button.onclick = close;
video_cover.onclick = replay_video;

function player_state_change (event) {
    if(event.data == 0) {
        video_cover.classList.remove('modal-video-box__cover_hidden');
    }
}

function youtube_player_init(event) {
    if(player_status) {
        modal.classList.add('modal-video-box_opened');
        body.style.overflow = 'hidden';
        const id = event.target.dataset.youtubeId;
        player.loadVideoById(id, 0, 'default');
        const url = 'https://img.youtube.com/vi/' + id + '/maxresdefault.jpg';
        video_cover.style.backgroundImage = 'url(' + url + ')';
    }
}

function player_ready() {
    player_status = true;
    const video_covers = document.querySelectorAll('.unavailable');
    video_covers.forEach(function (cover) {
        cover.classList.remove('unavailable');
    })
}

function close() {
    modal.classList.remove('modal-video-box_opened');
    video_cover.classList.add('modal-video-box__cover_hidden');
    body.style.overflow = 'auto';
    player.stopVideo();
}

function replay_video() {
    window.player.playVideo();
    video_cover.classList.add('modal-video-box__cover_hidden');
}

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


function slider_init(options){
    const slider = options.slider,
        slides = options.slides,
        slide_width = options.slide_width || 324,
        step = options.step || 1,
        left_arrow = slider.querySelector('.slider__arrow_left'),
        right_arrow = slider.querySelector('.slider__arrow_right'),
        load_more_button =  slider.querySelector('.slider__load-more'),
        container = slider.querySelector('.slider__container');

    if(slides.length <=3 && screen.width < 768) {
        slider.removeChild(load_more_button);
        slider.style.height = '630px';
    }

    slides.forEach(function(id, index){
        const slide = document.createElement('div');
        if( index >= 3) {
            slide.className = 'slider__img unavailable slider__img_phone-transparency ';
        } else {
            slide.className = 'slider__img unavailable';
        }

        const url = 'https://img.youtube.com/vi/' + id + '/maxresdefault.jpg';
        slide.style.backgroundImage = 'url(' + url + ')';
        slide.dataset.youtubeId = id;
        slide.onclick = options.img_event;
        container.appendChild(slide);
    });

    let slider_width = parseInt(window.getComputedStyle(slider).width),
        available_offset_to_left = 0,
        available_offset_to_right = Math.floor(slides.length - slider_width/slide_width);


    container.style.left = 0;
    update_arrows_styles();

    right_arrow.onclick = scroll_right;
    left_arrow.onclick = scroll_left;

    load_more_button.onclick = mobile_disclosure;


    function scroll_left() {
        if (available_offset_to_left > 0) {
            const displaceables_number = step < available_offset_to_left ? step : available_offset_to_left;

            container.style.left = parseInt(container.style.left) + slide_width * displaceables_number + 'px';
            available_offset_to_left -= displaceables_number;
            available_offset_to_right += displaceables_number;

            update_arrows_styles();
        }
    }

    function scroll_right() {
        if (available_offset_to_right > 0) {
            const displaceables_number = step < available_offset_to_right ? step : available_offset_to_right;

            container.style.left = parseInt(container.style.left) - slide_width * displaceables_number + 'px';
            available_offset_to_left += displaceables_number;
            available_offset_to_right -= displaceables_number;

            update_arrows_styles();
        }
    }

    function update_arrows_styles() {
        if (available_offset_to_right > 0) {
            right_arrow.classList.add('slider__arrow_enabled');
        } else {
            right_arrow.classList.remove('slider__arrow_enabled');
        }

        if (available_offset_to_left > 0) {
            left_arrow.classList.add('slider__arrow_enabled');
        } else {
            left_arrow.classList.remove('slider__arrow_enabled');
        }
    }

    function mobile_disclosure() {
        slider.querySelectorAll('.slider__img_phone-transparency').forEach(function(slide){
            slide.classList.remove('slider__img_phone-transparency');
        });
        slider.style.height = slides.length * 225 - 45 + 'px';
        slider.removeChild(load_more_button);
    }
}

document.addEventListener('DOMContentLoaded', ready);

function ready() {
    resize_main_video_cover();

    const step_by_step_options = {
        slider: document.querySelector('.js-step-by-step .slider'),
        slides: ['z8M0Fa1JVco', 'Wi2KcdoCuo4', '8H6dYUgQKB8', 'PZjGrmHdFME', '_wLGr24VeoI', 'DG4FAU5qmMY'],
        step: 2,
        img_event: youtube_player_init
    };

    const education_options = {
        slider: document.querySelector('.js-education .slider'),
        slides: ['RmNWNLXmswk', '-tztXOz8Vc0', 'kUfIVtyydgQ'],
        img_event: youtube_player_init
    };

    const inspiration_options = {
        slider: document.querySelector('.js-inspiration .slider'),
        slides: ['VmmwwzR536g', 'vz0k8O-Ef9Y', '6oPBFnsqJW8'],
        img_event: youtube_player_init
    };

    slider_init(step_by_step_options);
    slider_init(education_options);
    slider_init(inspiration_options);
}

const main_video_cover = document.querySelector('.js-main-video-cover');
main_video_cover.onclick = youtube_player_init;

window.onresize = resize_main_video_cover;

function resize_main_video_cover() {
    main_video_cover.style.height = main_video_cover.offsetWidth / 2 + 'px';
}
