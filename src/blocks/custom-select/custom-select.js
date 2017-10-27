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
