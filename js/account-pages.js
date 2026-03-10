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

function initSigninFlow() {
    var $forgotEmailToggle = $("#forgot-email-toggle");
    var $defaultContent = $("#signin-default-content");
    var $validEmailContent = $("#signin-valid-email-content");
    var $confirmContent = $("#signin-confirm-content");
    var $signinEmailInput = $("#signin-email");
    var $validEmailInput = $("#valid-email");
    var $validEmailForm = $("#valid-email-form");
    var $confirmEmailText = $("#confirm-email-text");

    if (!$forgotEmailToggle.length || !$defaultContent.length || !$validEmailContent.length || !$confirmContent.length || !$validEmailForm.length) return;

    $forgotEmailToggle.on("click", function (e) {
        e.preventDefault();
        $defaultContent.prop("hidden", true);
        $validEmailContent.prop("hidden", false);

        if ($signinEmailInput.length && $validEmailInput.length && $signinEmailInput.val()) {
            $validEmailInput.val($signinEmailInput.val());
        }

        if ($validEmailInput.length) {
            $validEmailInput.trigger("focus");
        }
    });

    $validEmailForm.on("submit", function (e) {
        e.preventDefault();
        $validEmailContent.prop("hidden", true);
        $confirmContent.prop("hidden", false);

        if ($confirmEmailText.length && $validEmailInput.length && $validEmailInput.val()) {
            $confirmEmailText.text($validEmailInput.val());
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

function initSignupForm() {
    var $signupForm = $(".account-form_signup");
    var $signupSuccess = $(".account-card_success");

    if (!$signupForm.length || !$signupSuccess.length) return;

    $signupForm.on("submit", function (e) {
        e.preventDefault();
        $signupForm.prop("hidden", true);
        $signupSuccess.prop("hidden", false);
    });
}

$(document).ready(function () {
    initAccountDropdown();
    initSigninFlow();
    initPasswordToggle();
    initSignupForm();
});
