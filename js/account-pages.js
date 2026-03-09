(function () {
    var burger = document.querySelector(".account-burger");
    var dropdown = document.getElementById("account-dropdown");
    if (burger && dropdown) {
        burger.addEventListener("click", function (e) {
            e.stopPropagation();
            burger.classList.toggle("is-active");
            dropdown.classList.toggle("is-open");
        });
        document.addEventListener("click", function (e) {
            if (!dropdown.contains(e.target) && !burger.contains(e.target)) {
                burger.classList.remove("is-active");
                dropdown.classList.remove("is-open");
            }
        });
    }
})();

(function () {
    var forgotEmailToggle = document.getElementById("forgot-email-toggle");
    var defaultContent = document.getElementById("signin-default-content");
    var validEmailContent = document.getElementById("signin-valid-email-content");
    var confirmContent = document.getElementById("signin-confirm-content");
    var signinEmailInput = document.getElementById("signin-email");
    var validEmailInput = document.getElementById("valid-email");
    var validEmailForm = document.getElementById("valid-email-form");
    var confirmEmailText = document.getElementById("confirm-email-text");

    if (!forgotEmailToggle || !defaultContent || !validEmailContent || !confirmContent || !validEmailForm) {
        return;
    }

    forgotEmailToggle.addEventListener("click", function (event) {
        event.preventDefault();
        defaultContent.hidden = true;
        validEmailContent.hidden = false;

        if (signinEmailInput && validEmailInput && signinEmailInput.value) {
            validEmailInput.value = signinEmailInput.value;
        }

        if (validEmailInput) {
            validEmailInput.focus();
        }
    });

    validEmailForm.addEventListener("submit", function (event) {
        event.preventDefault();
        validEmailContent.hidden = true;
        confirmContent.hidden = false;

        if (confirmEmailText && validEmailInput && validEmailInput.value) {
            confirmEmailText.textContent = validEmailInput.value;
        }
    });
})();

(function () {
    var toggles = document.querySelectorAll('.account-form__toggle');
    toggles.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var wrap = this.closest('.account-form__field_password');
            var input = wrap ? wrap.querySelector('input') : null;
            if (!input) return;
            var isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            this.setAttribute('aria-pressed', isPassword ? 'true' : 'false');
            this.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
        });
    });

    var signupForm = document.querySelector('.account-form_signup');
    var signupSuccess = document.querySelector('.account-card_success');

    if (signupForm && signupSuccess) {
        signupForm.addEventListener('submit', function (event) {
            event.preventDefault();
            signupForm.hidden = true;
            signupSuccess.hidden = false;
        });
    }
})();
