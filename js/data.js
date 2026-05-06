// ── Banner de autoría ──────────────────────────────────────
//  Cambiá estos datos con los tuyos. Se muestra en la esquina
//  inferior derecha de la pantalla en todas las demos.
// ──────────────────────────────────────────────────────────
const AUTOR = {
  nombre:    'Celina M.',
  url:       'https://www.linkedin.com/in/celina-moscardi-bevacqua',
  etiqueta:  { es: 'Demo por', en: 'Demo by' },
};

const NEGOCIO = {
  nombre:      'Café La Esquina',
  descripcion: { es: 'Cafetería de especialidad en el corazón del barrio', en: 'Specialty coffee in the heart of the neighborhood' },
  direccion:   'Av. Corrientes 1234, Buenos Aires',
  horario:     { es: 'Lunes a viernes 8–20 h · Sábados 9–18 h', en: 'Mon–Fri 8 am–8 pm · Sat 9 am–6 pm' },
  logo:        '☕',
};

// ============================================================
//  IDIOMAS DISPONIBLES
//  Para agregar un idioma nuevo:
//  1. Agregá su código acá (ej: 'fr')
//  2. Agregá todas sus traducciones en el objeto TRADUCCIONES
// ============================================================
const IDIOMAS_DISPONIBLES = [
  { codigo: 'es', etiqueta: 'Español', bandera: '🇦🇷' },
  { codigo: 'en', etiqueta: 'English', bandera: '🇺🇸' },
];

// ============================================================
//  TRADUCCIONES
//  Cada clave tiene su valor en cada idioma disponible.
// ============================================================
const TRADUCCIONES = {
  // Header
  tagline: {
    es: 'Contanos tu experiencia',
    en: 'Share your experience',
  },

  // Resumen
  resenas:           { es: 'reseñas',       en: 'reviews'          },
  detalle_categorias:{ es: 'Detalle por categoría', en: 'Details by category' },

  // Botones
  btn_dejar_resena:  { es: '✍️ Dejá tu reseña', en: '✍️ Leave a review'   },
  btn_publicar:      { es: '☕ Publicar reseña', en: '☕ Publish review'   },

  // Formulario
  form_titulo:       { es: 'Contanos tu experiencia',    en: 'Tell us about your visit'   },
  form_progreso:     { es: 'categorías puntuadas',       en: 'categories rated'           },
  form_nombre_label: { es: 'Tu nombre o apodo',          en: 'Your name or nickname'      },
  form_nombre_ph:    { es: 'Ej: María G.',               en: 'E.g. Maria G.'              },
  form_comment_label:{ es: '¿Qué fue lo más memorable?', en: 'What was most memorable?'  },
  form_comment_ph:   { es: 'Contanos tu experiencia en el café...', en: 'Tell us about your experience...' },

  // Validaciones
  error_nombre:      { es: 'Tu nombre es obligatorio.',              en: 'Your name is required.'             },
  error_comentario:  { es: 'El comentario debe tener al menos 10 caracteres.', en: 'Comment must be at least 10 characters.' },
  error_puntajes:    { es: 'Falta puntuar:',                        en: 'Still needs a rating:'              },

  // Éxito
  msg_enviado:       { es: '✅ ¡Gracias por tu reseña! Ya aparece en la lista.', en: '✅ Thanks for your review! It\'s now listed.' },

  // Listado
  lo_que_dice:       { es: 'Lo que dice la gente', en: 'What people say'   },
  estado_vacio:      { es: 'Todavía no hay reseñas. ¡Sé el primero!', en: 'No reviews yet. Be the first!' },

  // Footer
  footer:            { es: 'Hecho con 🤎 y mucha cafeína', en: 'Made with 🤎 and lots of caffeine' },

  // Aria / accesibilidad
  aria_resumen:      { es: 'Resumen de calificaciones',  en: 'Ratings summary'       },
  aria_listado:      { es: 'Listado de reseñas',         en: 'Reviews list'          },
  aria_formulario:   { es: 'Formulario para dejar una reseña', en: 'Review form'     },
  aria_puntajes:     { es: 'Puntajes por categoría',     en: 'Ratings by category'   },
};

// ============================================================
//  CATEGORÍAS A VALORAR
//  label puede ser string o { es, en } para traducción
// ============================================================
const CATEGORIAS = [
  { id: 'cafe',     label: { es: 'Calidad del café',          en: 'Coffee quality'       }, icono: '☕' },
  { id: 'comida',   label: { es: 'Comida y pastelería',       en: 'Food & pastries'      }, icono: '🥐' },
  { id: 'atencion', label: { es: 'Atención',                  en: 'Service'              }, icono: '🤝' },
  { id: 'ambiente', label: { es: 'Ambiente',                  en: 'Atmosphere'           }, icono: '✨' },
  { id: 'precio',   label: { es: 'Relación precio/calidad',   en: 'Value for money'      }, icono: '💰' },
];

// ============================================================
//  RESEÑAS DE EJEMPLO
// ============================================================
const RESENAS_EJEMPLO = [
  {
    id: 'ejemplo-1',
    nombre: 'Martina G.',
    fecha: '2026-04-10',
    comentario: {
      es: 'El flat white es increíble, y la atención siempre muy cálida. Mi lugar favorito para trabajar.',
      en: 'The flat white is incredible, and the service is always so warm. My favorite place to work from.',
    },
    puntajes: { cafe: 5, comida: 4, atencion: 5, ambiente: 5, precio: 4 },
  },
  {
    id: 'ejemplo-2',
    nombre: 'Lucas P.',
    fecha: '2026-04-18',
    comentario: {
      es: 'Los croissants recién horneados son un must. El espresso podría ser un poco más intenso.',
      en: 'The freshly baked croissants are a must. The espresso could be a bit stronger for my taste.',
    },
    puntajes: { cafe: 4, comida: 5, atencion: 4, ambiente: 4, precio: 5 },
  },
  {
    id: 'ejemplo-3',
    nombre: 'Sofía R.',
    fecha: '2026-05-02',
    comentario: {
      es: 'Ambiente acogedor, ideal para reuniones tranquilas. El WiFi excelente.',
      en: 'Cozy atmosphere, perfect for quiet meetings. Excellent WiFi.',
    },
    puntajes: { cafe: 5, comida: 3, atencion: 5, ambiente: 5, precio: 3 },
  },
];
