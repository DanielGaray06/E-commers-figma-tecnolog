/* ==========================================================================
   TECNOLOG — Autenticación demo
   No hay backend: la sesión y los usuarios se guardan en localStorage.
   ========================================================================== */

(function () {
  "use strict";

  var Tec = (window.Tecnolog = window.Tecnolog || {});

  function redirectTarget() {
    var target = Tec.ui.getParam("redirect");
    return target && Tec.nav.routes[target] ? target : "index";
  }

  function afterAuth(name) {
    Tec.ui.showToast("Bienvenido, " + name);
    var target = redirectTarget();
    window.setTimeout(function () {
      Tec.nav.go(target);
    }, 600);
  }

  function markInvalid(input, invalid) {
    if (!input) return;
    var wrapper = input.closest(".input");
    if (wrapper) wrapper.classList.toggle("is-invalid", Boolean(invalid));
    input.setAttribute("aria-invalid", invalid ? "true" : "false");
  }

  function initPasswordToggles() {
    Tec.ui.qsa("[data-password-toggle]").forEach(function (button) {
      button.addEventListener("click", function () {
        var input = document.getElementById(button.getAttribute("data-password-toggle"));
        if (!input) return;
        var show = input.type === "password";
        input.type = show ? "text" : "password";
        button.setAttribute("aria-label", show ? "Ocultar contraseña" : "Mostrar contraseña");
        var use = button.querySelector("use");
        if (use) use.setAttribute("href", show ? "#i-eye" : "#i-eye-off");
      });
    });
  }

  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  }

  function initLogin() {
    var form = Tec.ui.qs("#login-form");
    if (!form) return;

    var email = Tec.ui.qs("#login-email");
    var password = Tec.ui.qs("#login-password");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var emailValue = email.value.trim();
      var passwordValue = password.value;

      markInvalid(email, !isEmail(emailValue));
      markInvalid(password, passwordValue.length < 6);

      if (!isEmail(emailValue)) {
        Tec.ui.showToast("Ingresa un correo electrónico válido.");
        email.focus();
        return;
      }

      if (passwordValue.length < 6) {
        Tec.ui.showToast("Ingresa tu contraseña (mínimo 6 caracteres).");
        password.focus();
        return;
      }

      var user = Tec.storage.findUserByEmail(emailValue);
      var name = user ? user.name : Tec.ui.nameFromEmail(emailValue);

      Tec.storage.setSession({ name: name, email: emailValue });
      afterAuth(Tec.main.firstName(name));
    });

    [email, password].forEach(function (input) {
      input.addEventListener("input", function () {
        markInvalid(input, false);
      });
    });
  }

  function initRegister() {
    var form = Tec.ui.qs("#register-form");
    if (!form) return;

    var name = Tec.ui.qs("#register-name");
    var email = Tec.ui.qs("#register-email");
    var phone = Tec.ui.qs("#register-phone");
    var password = Tec.ui.qs("#register-password");
    var terms = Tec.ui.qs("#register-terms");
    var termsLabel = terms ? terms.closest(".checkbox") : null;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var nameValue = name.value.trim();
      var emailValue = email.value.trim();
      var passwordValue = password.value;

      markInvalid(name, nameValue.length < 3);
      markInvalid(email, !isEmail(emailValue));
      markInvalid(password, passwordValue.length < 8 || !/\d/.test(passwordValue));
      if (termsLabel) termsLabel.classList.toggle("is-invalid", !terms.checked);

      if (nameValue.length < 3) {
        Tec.ui.showToast("Escribe tu nombre completo.");
        name.focus();
        return;
      }

      if (!isEmail(emailValue)) {
        Tec.ui.showToast("Ingresa un correo electrónico válido.");
        email.focus();
        return;
      }

      if (passwordValue.length < 8 || !/\d/.test(passwordValue)) {
        Tec.ui.showToast("La contraseña necesita 8 caracteres y un número.");
        password.focus();
        return;
      }

      if (!terms.checked) {
        Tec.ui.showToast("Debes aceptar los términos para continuar.");
        return;
      }

      if (Tec.storage.findUserByEmail(emailValue)) {
        Tec.ui.showToast("Ya existe una cuenta con este correo.");
        email.focus();
        return;
      }

      Tec.storage.saveUser({
        name: nameValue,
        email: emailValue,
        phone: phone.value.trim()
      });
      Tec.storage.setSession({ name: nameValue, email: emailValue });

      afterAuth(Tec.main.firstName(nameValue));
    });

    [name, email, phone, password].forEach(function (input) {
      input.addEventListener("input", function () {
        markInvalid(input, false);
      });
    });

    if (terms) {
      terms.addEventListener("change", function () {
        if (termsLabel) termsLabel.classList.remove("is-invalid");
      });
    }
  }

  function init() {
    initPasswordToggles();
    initLogin();
    initRegister();
  }

  Tec.auth = { init: init };

  Tec.ui.ready(init);
})();
