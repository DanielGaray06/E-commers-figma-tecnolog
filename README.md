# TECNOLOG — E-commerce Mobile

**Frontend web estático desarrollado con HTML5, CSS3 y JavaScript Vanilla**, basado en el diseño original de Figma `ECOMMERS MOBILE.fig`.

El proyecto reproduce cinco pantallas de una aplicación de comercio electrónico móvil, manteniendo la identidad visual del diseño original e incorporando interacciones funcionales para simular la experiencia de compra.

> **Estado:** Frontend funcional | **Backend:** No implementado | **Tipo:** Proyecto educativo

---

## 1. Características principales

- Reproducción visual del diseño original de Figma.
- Interfaz responsive inspirada en dispositivos iPhone.
- Catálogo de productos con búsqueda y filtros.
- Sistema de registro e inicio de sesión simulado.
- Gestión dinámica del carrito de compras.
- Proceso de checkout con métodos de pago.
- Persistencia de información mediante `localStorage`.
- Validaciones de formularios y notificaciones dinámicas.

## 2. Tecnologías utilizadas

| Tecnología | Aplicación |
|---|---|
| HTML5 | Estructura de las interfaces |
| CSS3 | Estilos, componentes y diseño responsive |
| JavaScript ES6+ | Lógica e interactividad |
| SVG | Iconografía |
| LocalStorage | Persistencia de datos en el navegador |
| Inter | Tipografía principal |

**Arquitectura:** Frontend estático, sin frameworks, librerías de UI ni dependencias externas.

---

## 3. Pantallas implementadas

| # | Pantalla | Archivo |
|---|---|---|
| 01 | Catálogo de productos | `index.html` |
| 02 | Inicio de sesión | `pages/login.html` |
| 03 | Registro de usuarios | `pages/registro.html` |
| 04 | Carrito de compras | `pages/carrito.html` |
| 05 | Checkout | `pages/checkout.html` |

### Flujo de navegación

1. El usuario ingresa directamente al catálogo.
2. Puede explorar productos, buscar, filtrar y agregarlos al carrito.
3. Para proceder al pago debe iniciar sesión o crear una cuenta.
4. Después de autenticarse, continúa automáticamente al checkout.
5. Puede seleccionar un método de pago y completar la simulación de compra.

---

## 4. Estructura del proyecto

```text
front-end(Figma)/
│
├── index.html
│
├── pages/
│   ├── login.html
│   ├── registro.html
│   ├── carrito.html
│   └── checkout.html
│
├── css/
│   ├── variables.css
│   ├── global.css
│   ├── components.css
│   └── pages/
│       ├── productos.css
│       ├── login.css
│       ├── registro.css
│       ├── carrito.css
│       └── checkout.css
│
├── js/
│   ├── main.js
│   ├── navigation.js
│   └── modules/
│       ├── icons.js
│       ├── storage.js
│       ├── ui.js
│       ├── auth.js
│       ├── catalog.js
│       ├── cart.js
│       └── checkout.js
│
└── assets/
    ├── fonts/
    └── images/
```

### Organización del código

El proyecto utiliza una estructura modular para separar responsabilidades:

- **CSS:** variables globales, estilos compartidos y hojas específicas por pantalla.
- **JavaScript:** navegación, almacenamiento, autenticación simulada, catálogo, carrito y checkout.
- **Assets:** recursos gráficos, imágenes y tipografías.

---

## 5. Instalación y ejecución

El proyecto no requiere instalación de dependencias ni procesos de compilación.

**Requisitos:**
- Python 3 instalado (opcional, para levantar un servidor local).
- Navegador web moderno.

**Ejecutar localmente:**

```bash
cd "front-end(Figma)"
python -m http.server 4173
```

Abrir en el navegador:

```text
http://localhost:4173/
```

También es posible abrir directamente `index.html`, ya que los scripts utilizan `defer` y no dependen de módulos ES.

---

## 6. Funcionalidades implementadas

### Catálogo
- Búsqueda dinámica de productos.
- Filtros por categoría.
- Visualización de favoritos.
- Agregar productos al carrito.

### Autenticación simulada
- Registro de usuarios.
- Inicio de sesión.
- Validación básica del correo y contraseña.
- Personalización del saludo según el usuario.
- Persistencia de sesión mediante `localStorage`.

### Carrito de compras
- Modificación de cantidades.
- Eliminación de productos.
- Actualización automática de subtotales y totales.
- Control de cantidades entre 1 y 99.
- Gestión del estado de carrito vacío.

### Checkout
- Selección de tarjeta, Apple Pay y PayPal.
- Formateo automático de los datos de tarjeta.
- Validación de campos.
- Simulación de pago y confirmación visual.

---

## 7. Acceso a la demo

La autenticación es exclusivamente visual y no utiliza un sistema de usuarios real.

| Campo | Valor de prueba |
|---|---|
| Correo | `alex@tecnolog.com` |
| Contraseña | `tecnolog123` |

**Consideraciones:**

- Se acepta cualquier correo con formato válido.
- La contraseña debe tener mínimo seis caracteres.
- Los usuarios registrados conservan su nombre completo en `localStorage`.
- Si el correo no está registrado, el nombre del saludo se obtiene de la dirección de correo.
- La contraseña no se compara contra una contraseña almacenada.

Para probar un nombre personalizado, utiliza la opción **Crear cuenta** y registra un usuario.

Para reiniciar la sesión desde la consola del navegador:

```javascript
localStorage.removeItem("tecnolog_session");
```

---

## 8. Decisiones técnicas y diseño

| Elemento | Especificación |
|---|---|
| Diseño base | 393 × 852 px |
| Ancho responsive | 393 – 440 px |
| Alto responsive | 852 – 956 px |
| Tipografía | Inter Variable |
| Iconografía | Lucide + SVG |
| Paleta principal | Azul oscuro, azul primario y tonos neutros |
| Persistencia | LocalStorage |

Se utilizaron variables CSS para centralizar colores, tipografía, espaciados y radios de los componentes.

La interfaz mantiene una estructura visual orientada a dispositivos móviles, con un ancho máximo de 440 px en escritorio.

---

## 9. Limitaciones conocidas

Este proyecto representa exclusivamente la capa frontend.

- No dispone de backend.
- No utiliza una base de datos.
- No implementa autenticación real.
- No almacena ni verifica contraseñas.
- No utiliza una pasarela de pagos.
- Los métodos de pago son simulaciones.
- Las acciones sin pantalla asociada muestran notificaciones informativas.

---

## 10. Recursos y créditos

- **Diseño:** archivo original de Figma `ECOMMERS MOBILE.fig`.
- **Tipografía:** Inter, distribuida bajo SIL Open Font License.
- **Iconografía:** Lucide y recursos SVG.
- **Imágenes:** recursos extraídos del diseño original.

Este repositorio tiene fines educativos y de práctica en desarrollo frontend. Los derechos del diseño original corresponden a su respectivo autor.

---

**TECNOLOG**  
*Frontend Development · HTML5 · CSS3 · JavaScript*