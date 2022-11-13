/*
= require ./lib/flatpickr.min
= require ./lib/flatpickr-ru.locale
= require ./mdl/mdl_handler
= require ./mdl/slider
= require ./mdl/textfield
= require ./mdl/textfield_patch
= require ./mdl/ripple
*/

document.addEventListener('DOMContentLoaded', function () {
    // componentHandler.upgradeDom();

    setTimeout(function() {
        var fields = document.getElementsByClassName('credential_field');
        for (var i = 0; i < fields.length; i ++) {
            if (fields[i].attributes.length > 0) {
                fields[i].parentNode.classList.add('is-dirty');
            };
        };
    }, 400);

    flatpickr(".flatpickr", {
        enableTime: true,
        time_24hr: true,
        dateFormat: "Y-m-d H:i:S,",
        defaultHour: 00,
        locale: 'ru',
        allowInput: true
    });
});
