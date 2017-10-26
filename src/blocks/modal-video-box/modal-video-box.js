var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var player;
var modal = document.querySelector('.modal-video-box');
var close_button = document.getElementById('js-video-modal-close');

close_button.onclick = close;

function onYouTubePlayerAPIReady() {
    player = new YT.Player('js-player', {
        height: '360',
        width: '640',
        playerVars: {
            rel: 0,
            controls: 0,
            showinfo: 0
        }
    });
}

function youtube_player_init(event) {
    modal.style.zIndex = 10;
    modal.classList.add('modal-video-box_opened');
    var id = event.target.dataset.youtubeId;
    player.loadVideoById(id, 0, "default");
}

function close() {
    player.stopVideo();
    modal.classList.remove('modal-video-box_opened');
    setTimeout(function () {
        modal.style.zIndex = -1;
    }, 1000)
}
