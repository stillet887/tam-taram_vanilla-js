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
