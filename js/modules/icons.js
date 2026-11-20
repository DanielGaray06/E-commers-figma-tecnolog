/* ==========================================================================
   TECNOLOG — Sprite de iconos
   Los iconos de interfaz son Lucide, el mismo set usado en el diseño.
   Los iconos de la status bar y el logo de Apple son trazos propios.
   ========================================================================== */

(function () {
  "use strict";

  var sprite = [
    '<svg class="svg-sprite" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">',

    /* Lucide */
    '<symbol id="i-arrow-right" viewBox="0 0 24 24">',
    '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    '</symbol>',

    '<symbol id="i-check" viewBox="0 0 24 24">',
    '<path d="M20 6 9 17l-5-5"/>',
    '</symbol>',

    '<symbol id="i-chevron-down" viewBox="0 0 24 24">',
    '<path d="m6 9 6 6 6-6"/>',
    '</symbol>',

    '<symbol id="i-chevron-left" viewBox="0 0 24 24">',
    '<path d="m15 18-6-6 6-6"/>',
    '</symbol>',

    '<symbol id="i-circle-help" viewBox="0 0 24 24">',
    '<circle cx="12" cy="12" r="10"/>',
    '<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>',
    '<path d="M12 17h.01"/>',
    '</symbol>',

    '<symbol id="i-credit-card" viewBox="0 0 24 24">',
    '<rect width="20" height="14" x="2" y="5" rx="2"/>',
    '<line x1="2" x2="22" y1="10" y2="10"/>',
    '</symbol>',

    '<symbol id="i-eye" viewBox="0 0 24 24">',
    '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>',
    '<circle cx="12" cy="12" r="3"/>',
    '</symbol>',

    '<symbol id="i-eye-off" viewBox="0 0 24 24">',
    '<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/>',
    '<path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/>',
    '<path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/>',
    '<path d="m2 2 20 20"/>',
    '</symbol>',

    '<symbol id="i-heart" viewBox="0 0 24 24">',
    '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    '</symbol>',

    '<symbol id="i-house" viewBox="0 0 24 24">',
    '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/>',
    '<path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    '</symbol>',

    '<symbol id="i-layout-grid" viewBox="0 0 24 24">',
    '<rect width="7" height="7" x="3" y="3" rx="1"/>',
    '<rect width="7" height="7" x="14" y="3" rx="1"/>',
    '<rect width="7" height="7" x="14" y="14" rx="1"/>',
    '<rect width="7" height="7" x="3" y="14" rx="1"/>',
    '</symbol>',

    '<symbol id="i-lock-keyhole" viewBox="0 0 24 24">',
    '<circle cx="12" cy="16" r="1"/>',
    '<rect x="3" y="10" width="18" height="12" rx="2"/>',
    '<path d="M7 10V7a5 5 0 0 1 10 0v3"/>',
    '</symbol>',

    '<symbol id="i-mail" viewBox="0 0 24 24">',
    '<rect width="20" height="16" x="2" y="4" rx="2"/>',
    '<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    '</symbol>',

    '<symbol id="i-map-pin" viewBox="0 0 24 24">',
    '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>',
    '<circle cx="12" cy="10" r="3"/>',
    '</symbol>',

    '<symbol id="i-minus" viewBox="0 0 24 24">',
    '<path d="M5 12h14"/>',
    '</symbol>',

    '<symbol id="i-more-horizontal" viewBox="0 0 24 24">',
    '<circle cx="12" cy="12" r="1"/>',
    '<circle cx="19" cy="12" r="1"/>',
    '<circle cx="5" cy="12" r="1"/>',
    '</symbol>',

    '<symbol id="i-phone" viewBox="0 0 24 24">',
    '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    '</symbol>',

    '<symbol id="i-plus" viewBox="0 0 24 24">',
    '<path d="M5 12h14"/><path d="M12 5v14"/>',
    '</symbol>',

    '<symbol id="i-search" viewBox="0 0 24 24">',
    '<circle cx="11" cy="11" r="8"/>',
    '<path d="m21 21-4.3-4.3"/>',
    '</symbol>',

    '<symbol id="i-shopping-bag" viewBox="0 0 24 24">',
    '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>',
    '<path d="M3 6h18"/>',
    '<path d="M16 10a4 4 0 0 1-8 0"/>',
    '</symbol>',

    '<symbol id="i-sliders-horizontal" viewBox="0 0 24 24">',
    '<line x1="21" x2="14" y1="4" y2="4"/>',
    '<line x1="10" x2="3" y1="4" y2="4"/>',
    '<line x1="21" x2="12" y1="12" y2="12"/>',
    '<line x1="8" x2="3" y1="12" y2="12"/>',
    '<line x1="21" x2="16" y1="20" y2="20"/>',
    '<line x1="12" x2="3" y1="20" y2="20"/>',
    '<line x1="14" x2="14" y1="2" y2="6"/>',
    '<line x1="8" x2="8" y1="10" y2="14"/>',
    '<line x1="16" x2="16" y1="18" y2="22"/>',
    '</symbol>',

    '<symbol id="i-star" viewBox="0 0 24 24">',
    '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
    '</symbol>',

    '<symbol id="i-ticket-percent" viewBox="0 0 24 24">',
    '<path d="M2 9a3 3 0 1 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 1 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>',
    '<path d="M9 9h.01"/>',
    '<path d="m15 9-6 6"/>',
    '<path d="M15 15h.01"/>',
    '</symbol>',

    '<symbol id="i-trash-2" viewBox="0 0 24 24">',
    '<path d="M3 6h18"/>',
    '<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>',
    '<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
    '<line x1="10" x2="10" y1="11" y2="17"/>',
    '<line x1="14" x2="14" y1="11" y2="17"/>',
    '</symbol>',

    '<symbol id="i-truck" viewBox="0 0 24 24">',
    '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>',
    '<path d="M15 18H9"/>',
    '<path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>',
    '<circle cx="17" cy="18" r="2"/>',
    '<circle cx="7" cy="18" r="2"/>',
    '</symbol>',

    '<symbol id="i-user-round" viewBox="0 0 24 24">',
    '<circle cx="12" cy="8" r="5"/>',
    '<path d="M20 21a8 8 0 0 0-16 0"/>',
    '</symbol>',

    /* Apple (marca) */
    '<symbol id="i-apple" viewBox="0 0 24 24">',
    '<path fill="currentColor" stroke="none" d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.702"/>',
    '</symbol>',

    /* Status bar iOS */
    '<symbol id="i-ios-signal" viewBox="0 0 18 18">',
    '<rect x="0.36" y="11.1" width="3.2" height="3.4" rx="0.8" fill="currentColor"/>',
    '<rect x="4.8" y="9.2" width="3.2" height="5.3" rx="0.8" fill="currentColor"/>',
    '<rect x="9.24" y="7.1" width="3.2" height="7.4" rx="0.8" fill="currentColor"/>',
    '<rect x="13.68" y="3.95" width="3.2" height="10.55" rx="0.8" fill="currentColor"/>',
    '</symbol>',

    '<symbol id="i-ios-wifi" viewBox="0 0 18 18">',
    '<path d="M1.5 6.2a11 11 0 0 1 15 0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    '<path d="M4 8.8a7.5 7.5 0 0 1 10 0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    '<path d="M6.6 11.4a4 4 0 0 1 4.8 0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    '<circle cx="9" cy="13.8" r="1.1" fill="currentColor"/>',
    '</symbol>',

    '<symbol id="i-ios-battery" viewBox="0 0 25 25">',
    '<rect x="0.6" y="5" width="21.5" height="11.5" rx="3" fill="none" stroke="currentColor" stroke-width="1.2"/>',
    '<rect x="2.4" y="6.8" width="17" height="8" rx="1.8" fill="currentColor"/>',
    '<path d="M23.2 9.2h1.2a1 1 0 0 1 1 1v3.6a1 1 0 0 1-1 1h-1.2z" fill="currentColor"/>',
    '</symbol>',

    '</svg>'
  ].join("");

  if (document.body) {
    document.body.insertAdjacentHTML("afterbegin", sprite);
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      document.body.insertAdjacentHTML("afterbegin", sprite);
    });
  }
})();
