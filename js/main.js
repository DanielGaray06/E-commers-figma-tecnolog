/* ==========================================================================
   TECNOLOG — Inicialización común
   ========================================================================== */

(function () {
  "use strict";

  var Tec = (window.Tecnolog = window.Tecnolog || {});

  function firstName(value) {
    return String(value || "").trim().split(/\s+/)[0] || "Alex";
  }

  function paintUserName() {
    var session = Tec.storage.getSession();
    var name = session ? firstName(session.name) : "Alex";
    Tec.ui.qsa("[data-user-name]").forEach(function (node) {
      node.textContent = name;
    });
  }

  function paintCartBadge() {
    var count = Tec.storage.cartCount();
    Tec.ui.qsa("[data-cart-badge]").forEach(function (node) {
      node.textContent = String(count);
      node.hidden = count === 0;
    });
  }

  function init() {
    paintUserName();
    paintCartBadge();
    Tec.nav.initProfile();
    Tec.nav.initDemoLinks();

    window.addEventListener("storage", function (event) {
      if (event.key === Tec.storage.KEYS.cart) paintCartBadge();
      if (event.key === Tec.storage.KEYS.session) paintUserName();
    });
  }

  Tec.main = {
    init: init,
    paintUserName: paintUserName,
    paintCartBadge: paintCartBadge,
    firstName: firstName
  };

  Tec.ui.ready(init);
})();
