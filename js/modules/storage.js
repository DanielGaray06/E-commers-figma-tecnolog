/* ==========================================================================
   TECNOLOG — Datos demo y persistencia local
   No hay backend: todo se guarda en localStorage.
   ========================================================================== */

(function () {
  "use strict";

  var Tec = (window.Tecnolog = window.Tecnolog || {});

  var KEYS = {
    cart: "tecnolog_cart",
    session: "tecnolog_session",
    users: "tecnolog_users",
    favorites: "tecnolog_favorites"
  };

  var PRODUCTS = {
    case: {
      id: "case",
      name: "Funda de silicona MagSafe",
      variant: "iPhone 16 Pro · Medianoche",
      price: 29,
      image: "product-case.jpg",
      category: "cases"
    },
    charger: {
      id: "charger",
      name: "Cargador USB-C de 30 W",
      variant: "Carga rápida · Blanco",
      price: 24,
      image: "product-charger.jpg",
      category: "chargers"
    },
    earbuds: {
      id: "earbuds",
      name: "Auriculares inalámbricos Air",
      variant: "Sonido nítido · Blanco",
      price: 69,
      image: "product-earbuds.jpg",
      category: "audio"
    },
    glass: {
      id: "glass",
      name: "Protector de vidrio Edge",
      variant: "iPhone 16 Pro · Pack de 2",
      price: 19,
      image: "product-glass.jpg",
      category: "protectors"
    }
  };

  var DEFAULT_CART = [
    { id: "case", qty: 1 },
    { id: "charger", qty: 2 }
  ];

  function read(key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch (error) {
      return fallback;
    }
  }

  function write(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      /* localStorage puede estar bloqueado en modo privado. */
    }
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function basePath() {
    return (document.body && document.body.dataset.base) || "";
  }

  function productImage(id) {
    var product = PRODUCTS[id];
    return product ? basePath() + "assets/images/" + product.image : "";
  }

  function getCart() {
    var cart = read(KEYS.cart, null);
    if (!Array.isArray(cart)) return clone(DEFAULT_CART);
    return cart.filter(function (item) {
      return item && PRODUCTS[item.id] && Number(item.qty) > 0;
    }).map(function (item) {
      return { id: item.id, qty: Math.max(1, Math.round(Number(item.qty))) };
    });
  }

  function setCart(cart) {
    write(KEYS.cart, cart);
  }

  function addToCart(id, qty) {
    if (!PRODUCTS[id]) return getCart();
    var amount = Math.max(1, Math.round(Number(qty) || 1));
    var cart = getCart();
    var item = null;
    for (var i = 0; i < cart.length; i += 1) {
      if (cart[i].id === id) {
        item = cart[i];
        break;
      }
    }
    if (item) {
      item.qty += amount;
    } else {
      cart.push({ id: id, qty: amount });
    }
    setCart(cart);
    return cart;
  }

  function cartCount(cart) {
    return (cart || getCart()).reduce(function (total, item) {
      return total + item.qty;
    }, 0);
  }

  function cartSubtotal(cart) {
    return (cart || getCart()).reduce(function (total, item) {
      var product = PRODUCTS[item.id];
      return total + (product ? product.price * item.qty : 0);
    }, 0);
  }

  function cartTotals(cart) {
    var subtotal = cartSubtotal(cart);
    var shipping = subtotal > 0 ? 4.99 : 0;
    var tax = Math.round(subtotal * 0.08 * 100) / 100;
    return {
      subtotal: subtotal,
      shipping: shipping,
      tax: tax,
      total: Math.round((subtotal + shipping + tax) * 100) / 100
    };
  }

  function getSession() {
    var session = read(KEYS.session, null);
    if (!session || !session.name) return null;
    return session;
  }

  function setSession(session) {
    write(KEYS.session, session);
  }

  function clearSession() {
    try {
      window.localStorage.removeItem(KEYS.session);
    } catch (error) {
      /* noop */
    }
  }

  function getUsers() {
    var users = read(KEYS.users, []);
    return Array.isArray(users) ? users : [];
  }

  function saveUser(user) {
    var users = getUsers().filter(function (item) {
      return item.email.toLowerCase() !== user.email.toLowerCase();
    });
    users.push(user);
    write(KEYS.users, users);
    return user;
  }

  function findUserByEmail(email) {
    var normalized = String(email || "").trim().toLowerCase();
    var users = getUsers();
    for (var i = 0; i < users.length; i += 1) {
      if (users[i].email.toLowerCase() === normalized) return users[i];
    }
    return null;
  }

  function getFavorites() {
    var favorites = read(KEYS.favorites, []);
    return Array.isArray(favorites) ? favorites : [];
  }

  function toggleFavorite(id) {
    var favorites = getFavorites();
    var index = favorites.indexOf(id);
    if (index >= 0) {
      favorites.splice(index, 1);
    } else {
      favorites.push(id);
    }
    write(KEYS.favorites, favorites);
    return favorites;
  }

  Tec.storage = {
    KEYS: KEYS,
    PRODUCTS: PRODUCTS,
    DEFAULT_CART: DEFAULT_CART,
    basePath: basePath,
    productImage: productImage,
    getCart: getCart,
    setCart: setCart,
    addToCart: addToCart,
    cartCount: cartCount,
    cartSubtotal: cartSubtotal,
    cartTotals: cartTotals,
    getSession: getSession,
    setSession: setSession,
    clearSession: clearSession,
    getUsers: getUsers,
    saveUser: saveUser,
    findUserByEmail: findUserByEmail,
    getFavorites: getFavorites,
    toggleFavorite: toggleFavorite
  };
})();
