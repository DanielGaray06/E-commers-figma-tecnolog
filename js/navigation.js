/* ==========================================================================
   TECNOLOG — Rutas y navegación compartida
   ========================================================================== */

(function () {
  "use strict";

  var Tec = (window.Tecnolog = window.Tecnolog || {});
  var inPages = window.location.pathname.indexOf("/pages/") !== -1;

  var ROUTES = inPages
    ? {
        index: "../index.html",
        login: "login.html",
        register: "registro.html",
        cart: "carrito.html",
        checkout: "checkout.html"
      }
    : {
        index: "index.html",
        login: "pages/login.html",
        register: "pages/registro.html",
        cart: "pages/carrito.html",
        checkout: "pages/checkout.html"
      };

  function href(page) {
    return ROUTES[page] || ROUTES.index;
  }

  function go(page) {
    window.location.href = href(page);
  }

  function isLoggedIn() {
    return Boolean(Tec.storage && Tec.storage.getSession());
  }

  function requireAuth(target) {
    if (isLoggedIn()) return true;
    var destination = href("login") + "?redirect=" + encodeURIComponent(target || "index");
    window.location.href = destination;
    return false;
  }

  function initProfile() {
    Tec.ui.qsa("[data-profile]").forEach(function (node) {
      node.addEventListener("click", function (event) {
        event.preventDefault();
        var session = Tec.storage.getSession();
        if (session) {
          Tec.ui.showToast("Sesión iniciada como " + session.name);
          return;
        }
        go("login");
      });
    });
  }

  function initDemoLinks() {
    Tec.ui.qsa("[data-demo]").forEach(function (node) {
      node.addEventListener("click", function (event) {
        event.preventDefault();
        Tec.ui.showToast(node.getAttribute("data-demo") || "Función no incluida en el diseño.");
      });
    });
  }

  Tec.nav = {
    routes: ROUTES,
    href: href,
    go: go,
    isLoggedIn: isLoggedIn,
    requireAuth: requireAuth,
    initProfile: initProfile,
    initDemoLinks: initDemoLinks
  };
})();
