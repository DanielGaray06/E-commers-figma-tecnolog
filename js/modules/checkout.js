/* ==========================================================================
   TECNOLOG — Pago
   ========================================================================== */

(function () {
  "use strict";

  var Tec = (window.Tecnolog = window.Tecnolog || {});
  var selectedMethod = "card";

  function paintSummary() {
    var totals = Tec.storage.cartTotals();
    var count = Tec.storage.cartCount();

    Tec.ui.qsa("[data-total]").forEach(function (node) {
      node.textContent = Tec.ui.formatCurrency(totals.total);
    });

    var detail = Tec.ui.qs("[data-order-detail]");
    if (detail) {
      if (count === 0) {
        detail.textContent = "Tu carrito está vacío.";
      } else {
        detail.textContent =
          (count === 1 ? "1 artículo" : count + " artículos") +
          " · Incluye " + Tec.ui.formatCurrency(totals.shipping) +
          " de envío y " + Tec.ui.formatCurrency(totals.tax) + " de impuestos";
      }
    }

    var name = Tec.ui.qs("[data-shipping-name]");
    var session = Tec.storage.getSession();
    if (name && session) name.textContent = session.name;
  }

  function updatePayLabel() {
    var totals = Tec.storage.cartTotals();
    var label = Tec.ui.qs("[data-pay-label]");
    if (!label) return;

    var prefix = "Pagar ahora";
    if (selectedMethod === "apple") prefix = "Pagar con Apple Pay";
    if (selectedMethod === "paypal") prefix = "Pagar con PayPal";

    label.textContent = prefix + " · " + Tec.ui.formatCurrency(totals.total);
  }

  function initMethods() {
    var options = Tec.ui.qsa("[data-method]");
    var cardDetails = Tec.ui.qs("#card-details");

    options.forEach(function (option) {
      option.addEventListener("click", function () {
        selectedMethod = option.getAttribute("data-method");

        options.forEach(function (item) {
          var selected = item === option;
          item.classList.toggle("is-selected", selected);
          item.setAttribute("aria-checked", selected ? "true" : "false");
        });

        if (cardDetails) {
          var disabled = selectedMethod !== "card";
          cardDetails.classList.toggle("is-disabled", disabled);
          cardDetails.setAttribute("aria-hidden", disabled ? "true" : "false");
          if ("inert" in cardDetails) cardDetails.inert = disabled;
        }

        updatePayLabel();
      });
    });
  }

  function onlyDigits(value, max) {
    return value.replace(/\D/g, "").slice(0, max);
  }

  function initCardFormatting() {
    var number = Tec.ui.qs("#card-number");
    var expiry = Tec.ui.qs("#card-expiry");
    var cvv = Tec.ui.qs("#card-cvv");

    if (number) {
      number.addEventListener("input", function () {
        var digits = onlyDigits(number.value, 16);
        number.value = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
        number.closest(".input").classList.remove("is-invalid");
      });
    }

    if (expiry) {
      expiry.addEventListener("input", function () {
        var digits = onlyDigits(expiry.value, 4);
        expiry.value = digits.length >= 3
          ? digits.slice(0, 2) + " / " + digits.slice(2)
          : digits;
        expiry.closest(".input").classList.remove("is-invalid");
      });
    }

    if (cvv) {
      cvv.addEventListener("input", function () {
        cvv.value = onlyDigits(cvv.value, 4);
        cvv.closest(".input").classList.remove("is-invalid");
      });
    }
  }

  function validateCard() {
    var number = Tec.ui.qs("#card-number");
    var expiry = Tec.ui.qs("#card-expiry");
    var cvv = Tec.ui.qs("#card-cvv");

    var numberOk = onlyDigits(number.value, 16).length === 16;
    var expiryDigits = onlyDigits(expiry.value, 4);
    var month = Number(expiryDigits.slice(0, 2));
    var expiryOk = expiryDigits.length === 4 && month >= 1 && month <= 12;
    var cvvOk = onlyDigits(cvv.value, 4).length >= 3;

    number.closest(".input").classList.toggle("is-invalid", !numberOk);
    expiry.closest(".input").classList.toggle("is-invalid", !expiryOk);
    cvv.closest(".input").classList.toggle("is-invalid", !cvvOk);

    if (!numberOk) {
      Tec.ui.showToast("Ingresa los 16 dígitos de tu tarjeta.");
      number.focus();
      return false;
    }

    if (!expiryOk) {
      Tec.ui.showToast("Ingresa una fecha de vencimiento válida (MM / AA).");
      expiry.focus();
      return false;
    }

    if (!cvvOk) {
      Tec.ui.showToast("Ingresa el CVV de tu tarjeta.");
      cvv.focus();
      return false;
    }

    return true;
  }

  function initPay() {
    var button = Tec.ui.qs("#pay-button");
    if (!button) return;

    button.addEventListener("click", function () {
      if (Tec.storage.cartCount() === 0) {
        Tec.ui.showToast("Tu carrito está vacío.");
        return;
      }

      if (selectedMethod === "card" && !validateCard()) return;

      var label = Tec.ui.qs("[data-pay-label]");
      var original = label ? label.textContent : "";

      button.disabled = true;
      if (label) label.textContent = "Procesando pago…";

      window.setTimeout(function () {
        Tec.storage.setCart([]);
        Tec.ui.showToast("Pago aprobado · Pedido confirmado");
        window.setTimeout(function () {
          Tec.nav.go("index");
        }, 900);
      }, 1100);

      window.setTimeout(function () {
        if (!button.disabled) return;
        button.disabled = false;
        if (label && document.body.contains(button)) label.textContent = original;
      }, 4000);
    });
  }

  function init() {
    if (!Tec.ui.qs("#pay-button")) return;
    if (!Tec.nav.requireAuth("checkout")) return;

    paintSummary();
    updatePayLabel();
    initMethods();
    initCardFormatting();
    initPay();
  }

  Tec.checkout = { init: init };

  Tec.ui.ready(init);
})();
