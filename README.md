# TECNOLOG — Front-end estático

Maqueta funcional de las **5 pantallas** del archivo de Figma `ECOMMERS MOBILE.fig`,
construida solo con **HTML5, CSS3 y JavaScript nativo**. No usa frameworks, librerías
de UI, backend ni autenticación real.

El objetivo es reproducir la fidelidad visual del diseño (medidas, tipografía, colores,
imágenes e iconos) y añadir interacciones demo coherentes con las pantallas existentes.

---

## Acceso demo (login)

**No hay una cuenta fija ni una contraseña predefinida.** El login es una simulación:

| Campo | Valor |
| --- | --- |
| Correo | Cualquier correo con formato válido, por ejemplo `alex@tecnolog.com` |
| Contraseña | Cualquier texto de **6 caracteres o más**, por ejemplo `tecnolog123` |

Comportamiento:

- Si el correo **no** está registrado, el nombre del saludo se deduce de la parte local
  del correo (`alex@tecnolog.com` → `Alex`).
- Si el correo **sí** está registrado (creado desde “Crear cuenta”), se usa el nombre
  completo guardado. El saludo muestra solo el primer nombre.
- La contraseña **no se compara** con la registrada: es una demo visual.
- Para probar un nombre propio: entra en **Crear cuenta**, registra por ejemplo
  `Daniel Garay` y vuelve al catálogo. Verás `Hola, Daniel 👋`.
- La sesión se guarda en `localStorage`. No hay botón de cerrar sesión porque el diseño
  no lo incluye; puedes borrarla desde la consola del navegador:

```js
localStorage.removeItem("tecnolog_session");
```

---

## Pantallas y flujos

| # | Pantalla | Archivo |
| --- | --- | --- |
| 1 | Catálogo (entrada) | `index.html` |
| 2 | Iniciar sesión | `pages/login.html` |
| 3 | Crear cuenta | `pages/registro.html` |
| 4 | Mi carrito | `pages/carrito.html` |
| 5 | Pago | `pages/checkout.html` |

Flujos implementados:

1. **El catálogo es la entrada.** Se abre `index.html` sin pedir login.
2. **Login antes de pagar:** en el carrito, “Proceder al pago” redirige a
   `pages/login.html?redirect=checkout`; tras iniciar sesión se vuelve al pago.
3. **Registro:** crea el usuario en `localStorage`, inicia sesión y vuelve al catálogo
   (o al destino indicado por `?redirect=`).
4. **Saludo dinámico:** `Hola, <nombre> 👋` usa el nombre de la sesión; por defecto
   muestra `Alex` cuando no hay sesión.
5. **Checkout protegido:** si se abre `pages/checkout.html` sin sesión, redirige al login.
6. **Carrito demo inicial:** funda (×1) + cargador (×2) = subtotal `$77.00`,
   envío `$4.99`, impuestos `$6.16`, total `$88.15`, igual que el diseño.

---

## Estructura del proyecto

```text
front-end(Figma)/
├── index.html                  # Catálogo (entrada)
├── pages/
│   ├── login.html
│   ├── registro.html
│   ├── carrito.html
│   └── checkout.html
├── css/
│   ├── variables.css           # Tokens del diseño (color, tipografía, medidas)
│   ├── global.css              # Reset, shell de la app, status bar, toast
│   ├── components.css          # Botones, campos, chips, checkbox, tipografía
│   └── pages/
│       ├── productos.css
│       ├── login.css
│       ├── registro.css
│       ├── carrito.css
│       └── checkout.css
├── js/
│   ├── main.js                 # Inicialización común (nombre, badge)
│   ├── navigation.js           # Rutas, gating de auth, enlaces demo
│   └── modules/
│       ├── icons.js            # Sprite SVG (Lucide + iconos iOS + Apple)
│       ├── storage.js          # Productos, carrito, sesión, usuarios, favoritos
│       ├── ui.js               # Toast, moneda, helpers
│       ├── auth.js             # Login y registro
│       ├── catalog.js          # Búsqueda, filtros, favoritos, agregar
│       ├── cart.js             # Cantidades, eliminar, totales
│       └── checkout.js         # Métodos de pago, formateo y pago simulado
└── assets/
    ├── fonts/                  # Inter variable (roman + italic) en WOFF2
    └── images/                 # 5 imágenes originales extraídas del .fig
```

---

## Cómo ejecutar

No requiere instalación ni build. Recomendado servir por HTTP:

```bash
cd "front-end(Figma)"
python -m http.server 4173
```

Abre <http://localhost:4173/>.

También funciona abriendo `index.html` directamente (`file://`), porque los scripts son
clásicos con `defer` y no usan módulos ES.

---

## Decisiones de diseño

- **Medidas base:** 393 × 852 px (iPhone 16), con radio de pantalla de 32 px.
- **Responsive sin rediseño:** ancho fluido de **393 a 440 px** y alto de **852 a 956 px**
  (iPhone 16/17/Pro Max). En escritorio la app se centra con un máximo de 440 px y
  956 px de alto, sobre un fondo neutro.
- **Sin desbordes horizontales:** las imágenes usan `object-fit` y proporciones fijas;
  el contenido largo se recorta con elipsis.
- **Tokens en CSS:** colores, radios, espaciados y tipografía salen de `variables.css`.
  Paleta principal: `#14283E` (tinta), `#748192` (secundario), `#00529B` (primario),
  `#004080` (primario oscuro), `#E3E9F0` (borde), `#F5F7FA` (superficie),
  `#EDF4FB` (acento).
- **Tipografía:** Inter variable, servida localmente desde `assets/fonts/`.
- **Iconos:** set **Lucide** en un sprite SVG inline, igual que el diseño. Los iconos de
  la status bar de iOS y el logo de Apple son trazos propios.
- **Textos en español:** toda la interfaz está traducida, manteniendo marca, nombres de
  producto y precios en USD.
- **Sin pantallas inventadas:** solo las 5 pantallas del archivo. Las acciones que no
  tienen pantalla (recuperar contraseña, Apple/Google, filtros avanzados, cambiar
  dirección, códigos promocionales) muestran un toast informativo.
- **Persistencia:** `localStorage` para carrito, sesión, usuarios y favoritos. No hay API.

---

## Interacciones incluidas

- Búsqueda por texto y filtros por categoría (chips).
- Filtro de favoritos y toggle del corazón en cada producto.
- Agregar al carrito con actualización del badge.
- Cambiar cantidades (mínimo 1, máximo 99), eliminar productos y recalcular totales.
- Estado de carrito vacío (aunque el diseño no lo muestre).
- Selección de método de pago (tarjeta, Apple Pay, PayPal).
- Formateo automático de número de tarjeta, vencimiento y CVV.
- Validación y **pago simulado** con toast de confirmación y retorno al catálogo.
- Toasts para acciones no contempladas en el diseño.

---

## Recursos

- Las 5 imágenes de producto/promo se extrajeron del propio archivo `.fig` y se
  conservan en `assets/images/`.
- Inter se distribuye bajo SIL Open Font License.
- El diseño original pertenece a su autor en Figma; este repositorio es una maqueta
  educativa de front-end.

---

## Limitaciones

- No hay backend, base de datos, autenticación real ni pasarela de pago.
- La contraseña no se almacena ni se valida; solo se guarda nombre, correo y teléfono.
- No existen pantallas de detalle de producto, perfil, éxito de pago ni favoritos
  dedicados, porque no están en el diseño.
