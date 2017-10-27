document.addEventListener("DOMContentLoaded", ready);

function ready() {
    var step_by_step_options = {
        slider: document.querySelector('.js-step-by-step .slider'),
        slides: ['z8M0Fa1JVco', 'Wi2KcdoCuo4', '8H6dYUgQKB8', 'PZjGrmHdFME', '_wLGr24VeoI', 'DG4FAU5qmMY'],
        step: 2,
        img_event: youtube_player_init
    };

    var education_options = {
        slider: document.querySelector('.js-education .slider'),
        slides: ['RmNWNLXmswk', '-tztXOz8Vc0', 'kUfIVtyydgQ'],
        img_event: youtube_player_init
    };

    var inspiration_options = {
        slider: document.querySelector('.js-inspiration .slider'),
        slides: ['VmmwwzR536g', 'vz0k8O-Ef9Y', '6oPBFnsqJW8'],
        img_event: youtube_player_init
    };

    slider_init(step_by_step_options);
    slider_init(education_options);
    slider_init(inspiration_options);
}

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
            'onStateChange': player_state_change
        }
    });

    window.main_player =  new YT.Player('js-main-player', {
        height: '360',
        width: '640',
        videoId: 'Jp594-ajK5E',
        playerVars: {
            rel: 0,
            controls: 0,
            showinfo: 0
        },
        events: {
            'onStateChange': main_player_state_change
        }
    });
}

main_player_cover = document.querySelector('.main-player-cover');
main_player_cover.onclick = play_main_video;

function play_main_video() {
    window.main_player.playVideo();
    main_player_cover.classList.add('main-player-cover_hidden');
}

function main_player_state_change(event) {
    if(event.data == 0) {
        main_player_cover.classList.remove('main-player-cover_hidden');
    }
}
