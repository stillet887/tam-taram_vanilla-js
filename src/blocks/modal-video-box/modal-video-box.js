var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var player;
var modal = document.querySelector('.modal-video-box');
var close_button = document.getElementById('js-video-modal-close');
var video_cover = modal.querySelector('.modal-video-box__cover');
var body = document.body;

close_button.onclick = close;

function youtube_player_init(event) {
    modal.classList.add('modal-video-box_opened');
    body.style.overflow = 'hidden';
    var id = event.target.dataset.youtubeId;
    player.loadVideoById(id, 0, 'default');
    var url = 'https://img.youtube.com/vi/' + id + '/maxresdefault.jpg';
    video_cover.style.backgroundImage = 'url(' + url + ')';
}

player_state_change = function(event) {
    if(event.data == 0) {
        video_cover.classList.remove('modal-video-box__cover_hidden');
    }
};

video_cover.onclick = replay_video;

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
