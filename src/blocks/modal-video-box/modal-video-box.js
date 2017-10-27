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
