/* ==========================================================================
   TECNOLOG — Utilidades de interfaz
   ========================================================================== */

(function () {
  "use strict";

  var Tec = (window.Tecnolog = window.Tecnolog || {});
  var toastTimer = null;

  function qs(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  function qsa(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  }

  function formatCurrency(value) {
    return "$" + Number(value || 0).toFixed(2);
  }

  function formatCount(value, singular, plural) {
    return value + " " + (value === 1 ? singular : plural);
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function titleCase(value) {
    return String(value || "")
      .split(/[\s._-]+/)
      .filter(Boolean)
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  }

  function nameFromEmail(email) {
    var local = String(email || "").split("@")[0];
    return titleCase(local) || "Alex";
  }

  function showToast(message) {
    var toast = qs("#app-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "app-toast";
      toast.className = "toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2600);
  }

  function setText(selector, text, scope) {
    qsa(selector, scope).forEach(function (node) {
      node.textContent = text;
    });
  }

  function debounce(fn, wait) {
    var timer = null;
    return function () {
      var args = arguments;
      var context = this;
      window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        fn.apply(context, args);
      }, wait);
    };
  }

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  Tec.ui = {
    qs: qs,
    qsa: qsa,
    formatCurrency: formatCurrency,
    formatCount: formatCount,
    escapeHtml: escapeHtml,
    getParam: getParam,
    titleCase: titleCase,
    nameFromEmail: nameFromEmail,
    showToast: showToast,
    setText: setText,
    debounce: debounce,
    ready: ready
  };
})();
