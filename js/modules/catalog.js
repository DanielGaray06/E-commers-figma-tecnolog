/* ==========================================================================
   TECNOLOG — Catálogo
   Búsqueda, filtros por categoría, favoritos y agregado al carrito.
   ========================================================================== */

(function () {
  "use strict";

  var Tec = (window.Tecnolog = window.Tecnolog || {});

  var state = {
    query: "",
    category: null,
    favorites: false
  };

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function setActiveChip(value) {
    Tec.ui.qsa("#category-chips .chip").forEach(function (chip) {
      chip.classList.toggle("is-active", chip.getAttribute("data-category") === value);
    });
  }

  function applyFilters() {
    var favorites = Tec.storage.getFavorites();
    var visible = 0;

    Tec.ui.qsa("[data-product-card]").forEach(function (card) {
      var id = card.getAttribute("data-id");
      var categoryOk = !state.category || card.getAttribute("data-category") === state.category;
      var queryOk = !state.query || normalize(card.getAttribute("data-search")).indexOf(state.query) !== -1;
      var favoritesOk = !state.favorites || favorites.indexOf(id) !== -1;
      var show = categoryOk && queryOk && favoritesOk;

      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });

    var empty = Tec.ui.qs("#catalog-empty");
    if (empty) {
      empty.hidden = visible !== 0;
      if (visible === 0) {
        empty.textContent = state.favorites && favorites.length === 0
          ? "Aún no tienes favoritos. Toca el corazón de un producto."
          : "No encontramos productos con esa búsqueda.";
      }
    }
  }

  function paintFavorites() {
    var favorites = Tec.storage.getFavorites();
    Tec.ui.qsa("[data-favorite]").forEach(function (button) {
      var active = favorites.indexOf(button.getAttribute("data-favorite")) !== -1;
      button.classList.toggle("is-favorite", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function initSearch() {
    var form = Tec.ui.qs("#catalog-search");
    var input = Tec.ui.qs("#search-input");
    if (!input) return;

    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
      });
    }

    input.addEventListener("input", function () {
      state.query = normalize(input.value.trim());
      applyFilters();
    });
  }

  function initChips() {
    Tec.ui.qsa("#category-chips .chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        var value = chip.getAttribute("data-category");
        if (state.category === value) {
          state.category = null;
          setActiveChip(null);
        } else {
          state.category = value;
          setActiveChip(value);
        }
        applyFilters();
      });
    });
  }

  function initFavoritesFilter() {
    Tec.ui.qsa("[data-favorites-filter]").forEach(function (button) {
      button.addEventListener("click", function () {
        state.favorites = !state.favorites;
        Tec.ui.qsa("[data-favorites-filter]").forEach(function (item) {
          item.classList.toggle("is-filtering", state.favorites);
        });

        if (state.favorites && Tec.storage.getFavorites().length === 0) {
          Tec.ui.showToast("Aún no tienes favoritos.");
        }

        applyFilters();
      });
    });
  }

  function initFavoriteButtons() {
    Tec.ui.qsa("[data-favorite]").forEach(function (button) {
      button.addEventListener("click", function () {
        Tec.storage.toggleFavorite(button.getAttribute("data-favorite"));
        paintFavorites();
        applyFilters();
      });
    });
  }

  function initAddToCart() {
    Tec.ui.qsa("[data-add-to-cart]").forEach(function (button) {
      button.addEventListener("click", function () {
        var id = button.getAttribute("data-add-to-cart");
        var product = Tec.storage.PRODUCTS[id];
        Tec.storage.addToCart(id, 1);
        Tec.main.paintCartBadge();
        Tec.ui.showToast((product ? product.name : "Producto") + " agregado al carrito.");
      });
    });
  }

  function initScrollActions() {
    var feed = Tec.ui.qs("#catalog-feed");
    var grid = Tec.ui.qs("#product-grid");
    var chips = Tec.ui.qs("#category-chips");

    Tec.ui.qsa("[data-scroll-to-products]").forEach(function (button) {
      button.addEventListener("click", function () {
        if (grid) grid.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    Tec.ui.qsa("[data-scroll-to-categories]").forEach(function (button) {
      button.addEventListener("click", function () {
        if (chips) chips.scrollIntoView({ behavior: "smooth", block: "center" });
        else if (feed) feed.scrollTo({ top: 0, behavior: "smooth" });
      });
    });

    Tec.ui.qsa("[data-reset-filter]").forEach(function (button) {
      button.addEventListener("click", function () {
        state.query = "";
        state.category = null;
        state.favorites = false;

        var input = Tec.ui.qs("#search-input");
        if (input) input.value = "";
        setActiveChip(null);
        Tec.ui.qsa("[data-favorites-filter]").forEach(function (item) {
          item.classList.remove("is-filtering");
        });
        applyFilters();
      });
    });
  }

  function init() {
    if (!Tec.ui.qs("#product-grid")) return;

    paintFavorites();
    initSearch();
    initChips();
    initFavoritesFilter();
    initFavoriteButtons();
    initAddToCart();
    initScrollActions();
    applyFilters();
  }

  Tec.catalog = { init: init, applyFilters: applyFilters };

  Tec.ui.ready(init);
})();
