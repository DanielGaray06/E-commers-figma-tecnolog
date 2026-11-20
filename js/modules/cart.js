/* ==========================================================================
   TECNOLOG — Carrito
   ========================================================================== */

(function () {
  "use strict";

  var Tec = (window.Tecnolog = window.Tecnolog || {});

  function itemTemplate(item) {
    var product = Tec.storage.PRODUCTS[item.id];
    if (!product) return "";

    var image = Tec.storage.productImage(item.id);
    var name = Tec.ui.escapeHtml(product.name);
    var variant = Tec.ui.escapeHtml(product.variant);
    var lineTotal = Tec.ui.formatCurrency(product.price * item.qty);
    var minusDisabled = item.qty <= 1 ? " disabled" : "";

    return (
      '<article class="cart-item" data-item="' + item.id + '">' +
        '<img class="cart-item__image" src="' + image + '" alt="' + name + '" loading="lazy">' +
        '<div class="cart-item__details">' +
          '<div class="cart-item__head">' +
            '<h2 class="cart-item__name">' + name + "</h2>" +
            '<button class="cart-item__remove" type="button" data-remove="' + item.id + '" aria-label="Quitar ' + name + ' del carrito">' +
              '<svg class="icon icon-16" aria-hidden="true"><use href="#i-trash-2"></use></svg>' +
            "</button>" +
          "</div>" +
          '<p class="cart-item__variant">' + variant + "</p>" +
          '<p class="cart-item__unit">' + Tec.ui.formatCurrency(product.price) + " c/u</p>" +
          '<div class="cart-item__foot">' +
            '<div class="qty" role="group" aria-label="Cantidad de ' + name + '">' +
              '<button class="qty__button" type="button" data-qty="minus" data-id="' + item.id + '" aria-label="Quitar una unidad"' + minusDisabled + ">" +
                '<svg class="icon icon-12" aria-hidden="true"><use href="#i-minus"></use></svg>' +
              "</button>" +
              '<span class="qty__value" aria-live="polite">' + item.qty + "</span>" +
              '<button class="qty__button" type="button" data-qty="plus" data-id="' + item.id + '" aria-label="Agregar una unidad">' +
                '<svg class="icon icon-12" aria-hidden="true"><use href="#i-plus"></use></svg>' +
              "</button>" +
            "</div>" +
            '<span class="cart-item__total">' + lineTotal + "</span>" +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  function emptyTemplate() {
    return (
      '<div class="cart-empty">' +
        '<svg class="icon icon-26 cart-empty__icon" aria-hidden="true"><use href="#i-shopping-bag"></use></svg>' +
        '<p class="cart-empty__title">Tu carrito está vacío</p>' +
        '<p class="cart-empty__text">Explora el catálogo y agrega tus esenciales.</p>' +
        '<a class="btn btn-primary cart-empty__action" href="../index.html">Ver productos</a>' +
      "</div>"
    );
  }

  function paintTotals() {
    var totals = Tec.storage.cartTotals();
    Tec.ui.qsa("[data-subtotal]").forEach(function (node) {
      node.textContent = Tec.ui.formatCurrency(totals.subtotal);
    });
    Tec.ui.qsa("[data-shipping]").forEach(function (node) {
      node.textContent = Tec.ui.formatCurrency(totals.shipping);
    });
    Tec.ui.qsa("[data-tax]").forEach(function (node) {
      node.textContent = Tec.ui.formatCurrency(totals.tax);
    });
    Tec.ui.qsa("[data-total]").forEach(function (node) {
      node.textContent = Tec.ui.formatCurrency(totals.total);
    });

    var count = Tec.storage.cartCount();
    var label = Tec.ui.qs("[data-cart-count-label]");
    if (label) {
      label.textContent = count === 1 ? "1 artículo en tu bolsa" : count + " artículos en tu bolsa";
    }
  }

  function render() {
    var list = Tec.ui.qs("#cart-items");
    if (!list) return;

    var cart = Tec.storage.getCart();
    list.innerHTML = cart.length
      ? cart.map(itemTemplate).join("")
      : emptyTemplate();

    paintTotals();
    Tec.main.paintCartBadge();
  }

  function changeQty(id, delta) {
    var cart = Tec.storage.getCart();
    var next = cart.map(function (item) {
      if (item.id !== id) return item;
      return { id: item.id, qty: Math.min(99, Math.max(1, item.qty + delta)) };
    });
    Tec.storage.setCart(next);
    render();
  }

  function removeItem(id) {
    var cart = Tec.storage.getCart().filter(function (item) {
      return item.id !== id;
    });
    Tec.storage.setCart(cart);
    render();
    Tec.ui.showToast("Producto eliminado del carrito.");
  }

  function init() {
    var list = Tec.ui.qs("#cart-items");
    if (!list) return;

    list.addEventListener("click", function (event) {
      var qtyButton = event.target.closest("[data-qty]");
      if (qtyButton) {
        changeQty(qtyButton.getAttribute("data-id"), qtyButton.getAttribute("data-qty") === "plus" ? 1 : -1);
        return;
      }

      var removeButton = event.target.closest("[data-remove]");
      if (removeButton) {
        removeItem(removeButton.getAttribute("data-remove"));
      }
    });

    var promo = Tec.ui.qs("#promo-form");
    if (promo) {
      promo.addEventListener("submit", function (event) {
        event.preventDefault();
        Tec.ui.showToast("Los códigos promocionales no están disponibles en esta demo.");
      });
    }

    var checkout = Tec.ui.qs("#checkout-button");
    if (checkout) {
      checkout.addEventListener("click", function () {
        if (Tec.storage.cartCount() === 0) {
          Tec.ui.showToast("Tu carrito está vacío.");
          return;
        }
        Tec.nav.requireAuth("checkout");
      });
    }

    render();
  }

  Tec.cart = { render: render };

  Tec.ui.ready(init);
})();
