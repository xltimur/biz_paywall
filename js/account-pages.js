function initAccountDropdown() {
    var $burger = $(".account-burger");
    var $dropdown = $("#account-dropdown");

    if (!$burger.length || !$dropdown.length) return;

    $burger.on("click", function (e) {
        e.stopPropagation();
        $burger.toggleClass("is-active");
        $dropdown.toggleClass("is-open");
    });

    $(document).on("click", function (e) {
        if (!$(e.target).closest($dropdown.add($burger)).length) {
            $burger.removeClass("is-active");
            $dropdown.removeClass("is-open");
        }
    });
}


function initPasswordToggle() {
    $(".account-form__toggle").on("click", function () {
        var $btn = $(this);
        var $input = $btn.closest(".account-form__field_password").find("input");
        if (!$input.length) return;

        var isPassword = $input.attr("type") === "password";
        $input.attr("type", isPassword ? "text" : "password");
        $btn.attr("aria-pressed", isPassword ? "true" : "false");
        $btn.attr("aria-label", isPassword ? "Hide password" : "Show password");
    });
}


$(document).ready(function () {
    initAccountDropdown();
    initPasswordToggle();
});
