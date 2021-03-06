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
