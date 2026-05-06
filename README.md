# ☕ Cafetería — Reseñas y Valoraciones

App web para que los clientes dejen reseñas con puntajes por categoría.
Construida con **Vue 3 (CDN)**, HTML y CSS puro. Sin dependencias de build.
Soporta **múltiples idiomas (i18n)** — viene con español e inglés incluidos.

## Estructura del proyecto

```
cafeteria-resenas/
├── index.html          → Estructura y plantilla Vue
├── css/
│   └── style.css       → Estilos (variables de color al inicio)
└── js/
    ├── data.js         → ⭐ EDITÁ ESTE para personalizar todo
    └── app.js          → Lógica Vue + sistema i18n
```

---

## Cómo personalizar (solo editá data.js)

### Cambiar el negocio
```js
const NEGOCIO = {
  nombre:      'Tu negocio',
  descripcion: { es: 'Tu descripción', en: 'Your description' },
  direccion:   'Tu dirección',
  horario:     { es: 'Tus horarios', en: 'Your hours' },
  logo:        '🏪',
};
```

### Cambiar las categorías
```js
const CATEGORIAS = [
  { id: 'servicio', label: { es: 'Servicio', en: 'Service' }, icono: '🤝' },
  { id: 'precio',   label: { es: 'Precio',   en: 'Price'   }, icono: '💰' },
];
```

### Cambiar o agregar traducciones
Todas las cadenas de texto están en el objeto `TRADUCCIONES` en `data.js`.
Cada clave tiene su valor en cada idioma:
```js
const TRADUCCIONES = {
  btn_dejar_resena: { es: '✍️ Dejá tu reseña', en: '✍️ Leave a review' },
  // ...
};
```

---

## Cómo agregar un idioma nuevo (ej: portugués)

1. Agregarlo en `IDIOMAS_DISPONIBLES`:
```js
{ codigo: 'pt', etiqueta: 'Português', bandera: '🇧🇷' }
```

2. Agregar la traducción `pt` en cada clave de `TRADUCCIONES`:
```js
btn_dejar_resena: { es: '...', en: '...', pt: 'Deixe sua avaliação' }
```

3. Agregar `pt` en los campos multiidioma de `NEGOCIO` y `CATEGORIAS`.

---

## Cómo cambiar colores
Variables al inicio de `style.css`:
```css
:root {
  --crema:    #F5EDD8;   /* fondo principal       */
  --espresso: #2C1A0E;   /* header / texto oscuro  */
  --marron:   #6B3F2A;   /* acento principal        */
  --oliva:    #5C6B3A;   /* botón enviar            */
  --dorado:   #C9963F;   /* estrellas               */
}
```

---

## Cómo abrir
Abrí `index.html` directamente en el navegador. No necesita servidor.

## Cómo desplegarlo (gratis)
- **GitHub Pages**: subí la carpeta a un repo → Settings → Pages
- **Netlify Drop**: arrastrá la carpeta a [netlify.com/drop](https://netlify.com/drop)

---

## Posibles mejoras (escalabilidad)
- Backend con Node.js / PHP para guardar reseñas en base de datos real
- Panel de admin para moderar reseñas
- Paginación cuando haya muchas reseñas
- Migrar a Vue 3 + Vite cuando el proyecto crezca
