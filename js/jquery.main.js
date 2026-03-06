/* script by ProVerstka */
$(document).ready(function () {
    initMobMenu();
    initScroll();
});

function initMobMenu() {
    $('.open_nav').on('click touchstart', function () {
        $(this).closest('body').addClass('open_menu');
        return false;
    });
    $('.close_menu').on('click touchstart', function () {
        $(this).closest('body').removeClass('open_menu');
        return false;
    });
    $('.list_nav > li > a').on('click touchstart', function () {
        var self = $(this);
        self.closest('body').removeClass('open_menu');
        window.location.href = self.attr('href');
        return false;
    });

}

