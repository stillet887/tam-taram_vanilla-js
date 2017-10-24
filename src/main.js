var step_by_step_options = {
    slider: document.querySelector('.js-step-by-step .slider'),
    slides: ["z8M0Fa1JVco", "Wi2KcdoCuo4", "8H6dYUgQKB8", "PZjGrmHdFME", "_wLGr24VeoI", "DG4FAU5qmMY"],
    step: 2,
    img_event: youtube_player_init
};

var education_options = {
    slider: document.querySelector('.js-education .slider'),
    slides: ["RmNWNLXmswk", "-tztXOz8Vc0", "kUfIVtyydgQ"],
    img_event: youtube_player_init
};

var inspiration_options = {
    slider: document.querySelector('.js-inspiration .slider'),
    slides: ["VmmwwzR536g", "vz0k8O-Ef9Y", "6oPBFnsqJW8"],
    img_event: youtube_player_init
};

slider_init(step_by_step_options);
slider_init(education_options);
slider_init(inspiration_options);
