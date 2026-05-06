// ============================================================
//  APP.JS — Lógica principal con i18n (Vue 3 CDN)
// ============================================================

const { createApp, ref, computed, provide, inject } = Vue;

// ─────────────────────────────────────────
//  UTILIDADES GENERALES
// ─────────────────────────────────────────

function generarId() {
  return 'r-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
}

function formatearFecha(isoString, idioma) {
  const fecha = new Date(isoString);
  return fecha.toLocaleDateString(idioma === 'es' ? 'es-AR' : 'en-US', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

function promedioResena(puntajes) {
  const valores = Object.values(puntajes);
  return valores.reduce((acc, v) => acc + v, 0) / valores.length;
}

function cargarDesdeStorage() {
  try {
    const raw = localStorage.getItem('cafeteria-resenas');
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function guardarEnStorage(resenas) {
  localStorage.setItem('cafeteria-resenas', JSON.stringify(resenas));
}

// ─────────────────────────────────────────
//  SISTEMA i18n
//  t(clave) devuelve el string en el idioma activo.
//  tVal(valor) traduce un campo que puede ser string o { es, en }.
// ─────────────────────────────────────────

const idiomaActivo = ref(
  localStorage.getItem('cafeteria-idioma') || 'es'
);

function t(clave) {
  const entrada = TRADUCCIONES[clave];
  if (!entrada) return clave;
  return entrada[idiomaActivo.value] ?? entrada['es'] ?? clave;
}

function tVal(valor) {
  if (typeof valor === 'string') return valor;
  return valor[idiomaActivo.value] ?? valor['es'] ?? '';
}

function cambiarIdioma(codigo) {
  idiomaActivo.value = codigo;
  localStorage.setItem('cafeteria-idioma', codigo);
}

// ─────────────────────────────────────────
//  COMPONENTE: Banner de autoría
// ─────────────────────────────────────────

const BannerAutor = {
  name: 'BannerAutor',
  setup() {
    return { AUTOR, idiomaActivo, tVal };
  },
  template: `
    <a
      class="banner-autor"
      :href="AUTOR.url"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="tVal(AUTOR.etiqueta) + ' ' + AUTOR.nombre"
    >
      <span class="banner-autor__icono">✦</span>
      <span class="banner-autor__texto">{{ tVal(AUTOR.etiqueta) }} <strong>{{ AUTOR.nombre }}</strong></span>
    </a>
  `,
};

// ─────────────────────────────────────────
//  COMPONENTE: Estrellas
// ─────────────────────────────────────────

const CompEstrellas = {
  name: 'CompEstrellas',
  props: {
    modelValue: { type: Number, default: 0 },
    readonly:   { type: Boolean, default: false },
    size:       { type: String, default: 'md' },
  },
  emits: ['update:modelValue'],
  data() { return { hover: 0 }; },
  template: `
    <div class="estrellas" :class="'estrellas--' + size" role="group">
      <button
        v-for="n in 5" :key="n"
        type="button"
        class="estrella-btn"
        :class="{ activa: n <= modelValue, readonly }"
        :disabled="readonly"
        :aria-label="'Rating ' + n + ' of 5'"
        @click="!readonly && $emit('update:modelValue', n)"
        @mouseenter="!readonly && (hover = n)"
        @mouseleave="!readonly && (hover = 0)"
      ><span :class="{ filled: n <= (hover || modelValue) }">★</span></button>
    </div>
  `,
};

// ─────────────────────────────────────────
//  COMPONENTE: Selector de idioma
// ─────────────────────────────────────────

const SelectorIdioma = {
  name: 'SelectorIdioma',
  components: { },
  setup() {
    return { IDIOMAS_DISPONIBLES, idiomaActivo, cambiarIdioma };
  },
  template: `
    <div class="selector-idioma" role="group" aria-label="Language selector">
      <button
        v-for="lang in IDIOMAS_DISPONIBLES"
        :key="lang.codigo"
        class="lang-btn"
        :class="{ activo: idiomaActivo === lang.codigo }"
        @click="cambiarIdioma(lang.codigo)"
        :aria-pressed="idiomaActivo === lang.codigo"
        :aria-label="lang.etiqueta"
      >
        {{ lang.bandera }} {{ lang.etiqueta }}
      </button>
    </div>
  `,
};

// ─────────────────────────────────────────
//  COMPONENTE: Tarjeta de reseña
// ─────────────────────────────────────────

const TarjetaResena = {
  name: 'TarjetaResena',
  components: { CompEstrellas },
  props: {
    resena: { type: Object, required: true },
  },
  setup(props) {
    const promedio       = computed(() => promedioResena(props.resena.puntajes));
    const fechaFormateada = computed(() => formatearFecha(props.resena.fecha, idiomaActivo.value));
    const iniciales      = computed(() =>
      props.resena.nombre.split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase()
    );
    const comentario     = computed(() => tVal(props.resena.comentario));

    return { promedio, fechaFormateada, iniciales, comentario, CATEGORIAS, tVal };
  },
  template: `
    <article class="tarjeta-resena">
      <header class="tarjeta-resena__header">
        <div class="avatar">{{ iniciales }}</div>
        <div class="tarjeta-resena__meta">
          <strong class="tarjeta-resena__nombre">{{ resena.nombre }}</strong>
          <time class="tarjeta-resena__fecha">{{ fechaFormateada }}</time>
        </div>
        <div class="tarjeta-resena__promedio">
          <span class="promedio-numero">{{ promedio.toFixed(1) }}</span>
          <comp-estrellas :model-value="Math.round(promedio)" :readonly="true" size="sm" />
        </div>
      </header>

      <p class="tarjeta-resena__comentario">"{{ comentario }}"</p>

      <div class="tarjeta-resena__categorias">
        <div v-for="cat in CATEGORIAS" :key="cat.id" class="cat-fila">
          <span class="cat-label">{{ cat.icono }} {{ tVal(cat.label) }}</span>
          <comp-estrellas :model-value="resena.puntajes[cat.id]" :readonly="true" size="sm" />
        </div>
      </div>
    </article>
  `,
};

// ─────────────────────────────────────────
//  APP PRINCIPAL
// ─────────────────────────────────────────

createApp({
  components: { CompEstrellas, SelectorIdioma, TarjetaResena, BannerAutor },

  setup() {
    // Estado
    const resenasPropias    = ref(cargarDesdeStorage());
    const mostrarFormulario = ref(false);
    const enviado           = ref(false);
    const errores           = ref([]);

    // Formulario
    const formNombre     = ref('');
    const formComentario = ref('');
    const formPuntajes   = ref(
      Object.fromEntries(CATEGORIAS.map(c => [c.id, 0]))
    );

    // ── Computed ──

    const todasLasResenas = computed(() => [
      ...resenasPropias.value,
      ...RESENAS_EJEMPLO,
    ]);

    const promedioGlobal = computed(() => {
      if (!todasLasResenas.value.length) return 0;
      const suma = todasLasResenas.value.reduce(
        (acc, r) => acc + promedioResena(r.puntajes), 0
      );
      return suma / todasLasResenas.value.length;
    });

    const promediosPorCategoria = computed(() =>
      CATEGORIAS.map(cat => {
        const suma = todasLasResenas.value.reduce(
          (acc, r) => acc + (r.puntajes[cat.id] || 0), 0
        );
        const avg = todasLasResenas.value.length
          ? suma / todasLasResenas.value.length : 0;
        return { ...cat, promedio: avg };
      })
    );

    const distribucionEstrellas = computed(() => {
      const conteo = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      todasLasResenas.value.forEach(r => {
        const p = Math.round(promedioResena(r.puntajes));
        if (conteo[p] !== undefined) conteo[p]++;
      });
      const total = todasLasResenas.value.length || 1;
      return [5, 4, 3, 2, 1].map(n => ({
        estrellas: n,
        cantidad: conteo[n],
        porcentaje: Math.round((conteo[n] / total) * 100),
      }));
    });

    const progresoFormulario = computed(() =>
      Object.values(formPuntajes.value).filter(v => v > 0).length
    );

    // ── Métodos ──

    function abrirFormulario() {
      mostrarFormulario.value = true;
      enviado.value = false;
      errores.value = [];
      formNombre.value = '';
      formComentario.value = '';
      formPuntajes.value = Object.fromEntries(CATEGORIAS.map(c => [c.id, 0]));
      setTimeout(() => {
        document.getElementById('form-resena')
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }

    function validarFormulario() {
      const lista = [];
      if (!formNombre.value.trim())
        lista.push(t('error_nombre'));
      if (!formComentario.value.trim() || formComentario.value.trim().length < 10)
        lista.push(t('error_comentario'));
      const sinPuntuar = CATEGORIAS.filter(c => formPuntajes.value[c.id] === 0);
      if (sinPuntuar.length)
        lista.push(`${t('error_puntajes')} ${sinPuntuar.map(c => tVal(c.label)).join(', ')}.`);
      return lista;
    }

    function enviarResena() {
      errores.value = validarFormulario();
      if (errores.value.length) return;

      const nueva = {
        id:         generarId(),
        nombre:     formNombre.value.trim(),
        fecha:      new Date().toISOString(),
        // Las reseñas nuevas se guardan en el idioma actual como string plano
        comentario: formComentario.value.trim(),
        puntajes:   { ...formPuntajes.value },
      };

      resenasPropias.value = [nueva, ...resenasPropias.value];
      guardarEnStorage(resenasPropias.value);
      enviado.value = true;
      mostrarFormulario.value = false;

      setTimeout(() => {
        document.getElementById('seccion-resenas')
          ?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }

    return {
      // datos
      NEGOCIO, CATEGORIAS, IDIOMAS_DISPONIBLES,
      // i18n
      idiomaActivo, t, tVal,
      // estado
      todasLasResenas, mostrarFormulario, enviado, errores,
      // formulario
      formNombre, formComentario, formPuntajes,
      // computed
      promedioGlobal, promediosPorCategoria,
      distribucionEstrellas, progresoFormulario,
      // métodos
      abrirFormulario, enviarResena,
    };
  },
}).mount('#app');
