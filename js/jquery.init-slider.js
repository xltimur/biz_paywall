/* script by ProVerstka */
$(document).ready(function () {
    initSlider();
});

function initSlider() {
    var swiperNews = new Swiper(".news_list", {
        slidesPerView: "auto",
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    if ($(window).width() >= 1020) {
        var swiperTeam = new Swiper(".list_team", {
            slidesPerView: "auto",
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }
}

