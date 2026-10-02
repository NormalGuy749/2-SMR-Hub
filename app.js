'use strict';

/* SMR Hub — aplicación principal
   Fase 2: inicio, recursos y glosario con datos reales */

const SMR = (window.SMR = window.SMR = window.SMR || {});
const D = window.SMR_DATA || { categories: [], resources: [], glossary: [], activity: [] };
const CATEGORIES = D.categories;
const LEVELS = ['Básico', 'Intermedio', 'Avanzado'];

/* ---------- Utilidades ---------- */

const $ = (sel, root = document) => root.querySelector(sel);

SMR.esc = (value) =>
  String(value).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));

/* ---------- Almacenamiento local ---------- */

const STORE_PREFIX = 'smrhub:';

SMR.store = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(STORE_PREFIX + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(STORE_PREFIX + key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
  remove(key) {
    try { localStorage.removeItem(STORE_PREFIX + key); } catch { /* sin almacenamiento */ }
  }
};

/* ---------- Iconos (SVG inline, sin dependencias externas) ---------- */

const ICONS = {
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
  network: '<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/>',
  cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v2"/><path d="M15 2v2"/><path d="M9 20v2"/><path d="M15 20v2"/><path d="M2 9h2"/><path d="M2 15h2"/><path d="M20 9h2"/><path d="M20 15h2"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  clipboard: '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
  bookOpen: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  menu: '<line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  box: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  fileText: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  calculator: '<rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/>',
  repeat: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'
};

SMR.icon = (name, size = 16, filled = false) =>
  `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${filled ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;

/* ---------- Referencias al DOM ---------- */

const dom = {
  sidebar: $('#sidebar'),
  scrim: $('#scrim'),
  menuBtn: $('#menu-btn'),
  navList: $('#nav-list'),
  navFooter: $('#nav-footer'),
  pageTitle: $('#page-title'),
  pageDesc: $('#page-desc'),
  content: $('#content'),
  searchWrap: $('#search'),
  searchInput: $('#search-input'),
  searchPanel: $('#search-results'),
  searchIcon: $('#search-icon'),
  themeBtn: $('#theme-btn')
};

/* ---------- Preferencias ---------- */

const SETTINGS_DEFAULTS = { theme: null, textSize: 'md', animations: true };

SMR.settings = Object.assign({}, SETTINGS_DEFAULTS, SMR.store.get('settings', {}));

const mediaDark = window.matchMedia('(prefers-color-scheme: dark)');

function effectiveTheme() {
  if (SMR.settings.theme === 'light' || SMR.settings.theme === 'dark') {
    return SMR.settings.theme;
  }
  return mediaDark.matches ? 'dark' : 'light';
}

function applySettings() {
  const root = document.documentElement;
  root.dataset.theme = effectiveTheme();
  root.dataset.textSize = SMR.settings.textSize || 'md';
  root.dataset.animations = SMR.settings.animations ? 'on' : 'off';
}

function saveSettings() {
  SMR.store.set('settings', SMR.settings);
}

function updateThemeButton() {
  const dark = effectiveTheme() === 'dark';
  dom.themeBtn.innerHTML = SMR.icon(dark ? 'sun' : 'moon');
  dom.themeBtn.title = dark ? 'Modo claro' : 'Modo oscuro';
  dom.themeBtn.setAttribute('aria-label', dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
}

SMR.setTheme = (theme) => {
  SMR.settings.theme = theme;
  saveSettings();
  applySettings();
  updateThemeButton();
  if (currentRouteId() === 'configuracion') render();
};

SMR.toggleTheme = () => SMR.setTheme(effectiveTheme() === 'dark' ? 'light' : 'dark');

try {
  mediaDark.addEventListener('change', () => {
    if (!SMR.settings.theme) {
      applySettings();
      updateThemeButton();
    }
  });
} catch { /* navegador antiguo */ }

/* ---------- Favoritos ---------- */

SMR.favorites = {
  data: SMR.store.get('favorites', {}),
  has(kind, id) {
    return !!(this.data[kind] && this.data[kind][id]);
  },
  toggle(kind, id) {
    if (!this.data[kind]) this.data[kind] = {};
    if (this.data[kind][id]) delete this.data[kind][id];
    else this.data[kind][id] = true;
    SMR.store.set('favorites', this.data);
    return this.has(kind, id);
  }
};

function updateFavButtons(kind, id, active) {
  document.querySelectorAll(`[data-fav="${kind}:${id}"]`).forEach((btn) => {
    btn.setAttribute('aria-pressed', String(active));
    if (btn.classList.contains('fav-btn')) {
      btn.classList.toggle('active', active);
      btn.innerHTML = SMR.icon('star', 16, active);
      const label = active ? 'Quitar de favoritos' : 'Añadir a favoritos';
      btn.title = label;
      btn.setAttribute('aria-label', label);
    } else if (btn.classList.contains('fav-text')) {
      btn.innerHTML = `${SMR.icon('star', 15, active)}${active ? 'Quitar de favoritos' : 'Añadir a favoritos'}`;
    }
  });
}

function bindFav(container) {
  container.querySelectorAll('[data-fav]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const [kind, id] = btn.dataset.fav.split(':');
      const active = SMR.favorites.toggle(kind, id);
      updateFavButtons(kind, id, active);
    });
  });
}

/* ---------- Modal ---------- */

const modalState = { overlay: null, cleanup: null };

SMR.modal = {
  open(buildContent) {
    SMR.modal.close();
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = '<div class="modal" role="dialog" aria-modal="true"></div>';
    document.body.appendChild(overlay);
    modalState.overlay = overlay;

    const box = overlay.firstElementChild;
    buildContent(box);

    overlay.addEventListener('mousedown', (event) => {
      if (event.target === overlay) SMR.modal.close();
    });

    const onKey = (event) => {
      if (event.key === 'Escape') SMR.modal.close();
    };
    document.addEventListener('keydown', onKey);
    modalState.cleanup = () => document.removeEventListener('keydown', onKey);

    document.body.style.overflow = 'hidden';
    const closeBtn = box.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
  },
  close() {
    if (!modalState.overlay) return;
    modalState.overlay.remove();
    modalState.overlay = null;
    document.body.style.overflow = '';
    if (modalState.cleanup) {
      modalState.cleanup();
      modalState.cleanup = null;
    }
  }
};

/* ---------- Consultas de ruta (p. ej. #/recursos?q=...) ---------- */

SMR.activeQuery = new URLSearchParams();

/* ---------- Página de inicio ---------- */

const HOME_TOOLS = [
  { icon: 'calculator', title: 'Calculadora de subredes', desc: 'Red, broadcast y rango de hosts a partir de una IP y su prefijo.', hash: '#/herramientas' },
  { icon: 'repeat', title: 'Conversor numérico', desc: 'Convierte entre decimal, binario y hexadecimal.', hash: '#/herramientas' },
  { icon: 'network', title: 'Tabla de puertos', desc: 'Puertos TCP y UDP habituales con su servicio y descripción.', hash: '#/redes' },
  { icon: 'clipboard', title: 'Tests', desc: 'Cuestionarios de autoevaluación por módulo.', hash: '#/tests' }
];

function renderHome(root) {
  const recent = [...D.resources]
    .sort((a, b) => b.added.localeCompare(a.added))
    .slice(0, 4);

  root.innerHTML = `
    <section class="hero">
      <h2>SMR Hub</h2>
      <p>Recursos y herramientas para Sistemas Microinformáticos y Redes.</p>
    </section>
    <section aria-label="Herramientas frecuentes">
      <h3 class="section-label">Herramientas frecuentes</h3>
      <ul class="link-list">
        ${HOME_TOOLS.map((t) => `
          <li><a class="link-row" href="${t.hash}">
            ${SMR.icon(t.icon)}
            <span class="link-row-text">
              <span class="link-row-title">${t.title}</span>
              <span class="link-row-desc">${t.desc}</span>
            </span>
            ${SMR.icon('chevronRight')}
          </a></li>`).join('')}
      </ul>
    </section>
    <div class="home-grid">
      <section aria-label="Actividad reciente">
        <h3 class="section-label">Actividad reciente</h3>
        <ul class="link-list compact">
          ${D.activity.map((a) => `
            <li><a class="link-row" href="${a.hash}">
              ${SMR.icon('clock')}
              <span class="link-row-text">
                <span class="link-row-title">${SMR.esc(a.title)}</span>
              </span>
              <span class="link-row-meta">${SMR.esc(a.meta)}</span>
              ${SMR.icon('chevronRight')}
            </a></li>`).join('')}
        </ul>
      </section>
      <section aria-label="Recursos recientes">
        <h3 class="section-label">Recursos recientes</h3>
        <ul class="link-list">
          ${recent.map((r) => `
            <li><a class="link-row" href="#/recursos?q=${encodeURIComponent(r.title)}">
              ${SMR.icon('fileText')}
              <span class="link-row-text">
                <span class="link-row-title">${SMR.esc(r.title)}</span>
                <span class="link-row-desc">${SMR.esc(r.category)} · ${SMR.esc(r.level)}</span>
              </span>
              ${SMR.icon('chevronRight')}
            </a></li>`).join('')}
        </ul>
      </section>
    </div>`;
}

/* ---------- Página de recursos ---------- */

const resState = { q: '', cat: 'Todas', level: 'Todos', favs: false };

function chipHtml(value, active) {
  return `<button type="button" class="chip${active ? ' active' : ''}" data-value="${SMR.esc(value)}">${SMR.esc(value)}</button>`;
}

function resourceRow(r) {
  const fav = SMR.favorites.has('recurso', r.id);
  return `
    <li class="row-item">
      <div class="row-main">
        <div class="row-top">
          <h3 class="row-title">${SMR.esc(r.title)}</h3>
          <span class="badge">${SMR.esc(r.category)}</span>
          <span class="badge badge-level">${SMR.esc(r.level)}</span>
        </div>
        <p class="row-desc">${SMR.esc(r.desc)}</p>
      </div>
      <div class="row-actions">
        <button type="button" class="icon-btn fav-btn${fav ? ' active' : ''}" data-fav="recurso:${r.id}"
                aria-pressed="${fav}" title="${fav ? 'Quitar de favoritos' : 'Añadir a favoritos'}"
                aria-label="${fav ? 'Quitar de favoritos' : 'Añadir a favoritos'}">${SMR.icon('star', 16, fav)}</button>
        <button type="button" class="btn btn-sm" data-open="${r.id}">Abrir</button>
      </div>
    </li>`;
}

function openResource(id) {
  const r = D.resources.find((x) => x.id === id);
  if (!r) return;
  SMR.modal.open((box) => {
    const fav = SMR.favorites.has('recurso', r.id);
    box.innerHTML = `
      <div class="modal-head">
        <div>
          <h3 class="modal-title">${SMR.esc(r.title)}</h3>
          <p class="modal-meta">
            <span class="badge">${SMR.esc(r.category)}</span>
            <span class="badge badge-level">${SMR.esc(r.level)}</span>
          </p>
        </div>
        <button type="button" class="icon-btn modal-close" aria-label="Cerrar">${SMR.icon('x')}</button>
      </div>
      <p class="modal-desc">${SMR.esc(r.desc)}</p>
      <h4 class="modal-sub">Contenido</h4>
      <ul class="modal-list">${r.content.map((c) => `<li>${SMR.esc(c)}</li>`).join('')}</ul>
      <div class="modal-foot">
        <button type="button" class="btn fav-text" data-fav="recurso:${r.id}" aria-pressed="${fav}">
          ${SMR.icon('star', 15, fav)}${fav ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        </button>
      </div>`;
    box.querySelector('.modal-close').addEventListener('click', SMR.modal.close);
    bindFav(box);
  });
}

function renderRecursos(root) {
  const urlQ = SMR.activeQuery.get('q');
  if (urlQ) resState.q = urlQ;

  root.innerHTML = `
    <div class="toolbar">
      <input type="search" class="input page-search" id="res-search" placeholder="Buscar recursos"
             aria-label="Buscar recursos" value="${SMR.esc(resState.q)}">
      <select class="input" id="res-level" aria-label="Filtrar por nivel">
        <option value="Todos">Todos los niveles</option>
        ${LEVELS.map((l) => `<option value="${l}">${l}</option>`).join('')}
      </select>
    </div>
    <div class="chip-bar" role="group" aria-label="Categorías">
      ${chipHtml('Todas', resState.cat === 'Todas')}
      ${CATEGORIES.map((c) => chipHtml(c, resState.cat === c)).join('')}
      <button type="button" class="chip${resState.favs ? ' active' : ''}" data-res-favs aria-pressed="${resState.favs}">Solo favoritos</button>
    </div>
    <p class="count-note" id="res-count"></p>
    <ul class="row-list" id="res-list"></ul>`;

  const searchInput = root.querySelector('#res-search');
  const levelSel = root.querySelector('#res-level');
  const chipBar = root.querySelector('.chip-bar');
  const listEl = root.querySelector('#res-list');
  const countEl = root.querySelector('#res-count');
  levelSel.value = resState.level;

  function apply() {
    const q = resState.q.trim().toLowerCase();
    const list = D.resources.filter((r) =>
      (resState.cat === 'Todas' || r.category === resState.cat) &&
      (resState.level === 'Todos' || r.level === resState.level) &&
      (!resState.favs || SMR.favorites.has('recurso', r.id)) &&
      (!q || (r.title + ' ' + r.desc + ' ' + r.category).toLowerCase().includes(q))
    ).sort((a, b) => b.added.localeCompare(a.added));

    countEl.textContent = `${list.length} de ${D.resources.length} recursos`;

    if (!list.length) {
      listEl.innerHTML = `
        <li class="empty-item"><div class="empty">
          <p class="empty-title">Sin resultados</p>
          <p class="empty-text">Ningún recurso coincide con los filtros aplicados.</p>
          <button type="button" class="btn" id="res-clear">Limpiar filtros</button>
        </div></li>`;
      listEl.querySelector('#res-clear').addEventListener('click', () => {
        resState.q = ''; resState.cat = 'Todas'; resState.level = 'Todos'; resState.favs = false;
        renderRecursos(root);
      });
      return;
    }

    listEl.innerHTML = list.map(resourceRow).join('');
    bindFav(listEl);
    listEl.querySelectorAll('[data-open]').forEach((btn) => {
      btn.addEventListener('click', () => openResource(btn.dataset.open));
    });
  }

  searchInput.addEventListener('input', () => {
    resState.q = searchInput.value;
    apply();
  });

  levelSel.addEventListener('change', () => {
    resState.level = levelSel.value;
    apply();
  });

  chipBar.addEventListener('click', (event) => {
    const chip = event.target.closest('.chip');
    if (!chip) return;
    if (chip.hasAttribute('data-res-favs')) {
      resState.favs = !resState.favs;
    } else {
      resState.cat = chip.dataset.value;
    }
    chipBar.querySelectorAll('.chip').forEach((ch) => {
      if (ch.hasAttribute('data-res-favs')) {
        ch.classList.toggle('active', resState.favs);
        ch.setAttribute('aria-pressed', String(resState.favs));
      } else {
        ch.classList.toggle('active', ch.dataset.value === resState.cat);
      }
    });
    apply();
  });

  apply();
}

/* ---------- Página de glosario ---------- */

const gloState = { q: '', letter: 'Todas' };

function renderGlosario(root) {
  const urlQ = SMR.activeQuery.get('q');
  if (urlQ) gloState.q = urlQ;

  const letters = [...new Set(D.glossary.map((t) => t.term[0].toUpperCase()))]
    .sort((a, b) => a.localeCompare(b, 'es'));

  root.innerHTML = `
    <div class="toolbar">
      <input type="search" class="input page-search" id="glo-search" placeholder="Buscar término o definición"
             aria-label="Buscar en el glosario" value="${SMR.esc(gloState.q)}">
    </div>
    <div class="chip-bar" role="group" aria-label="Filtrar por letra inicial">
      ${chipHtml('Todas', gloState.letter === 'Todas')}
      ${letters.map((l) => chipHtml(l, gloState.letter === l)).join('')}
    </div>
    <p class="count-note" id="glo-count"></p>
    <ul class="row-list" id="glo-list"></ul>`;

  const searchInput = root.querySelector('#glo-search');
  const chipBar = root.querySelector('.chip-bar');
  const listEl = root.querySelector('#glo-list');
  const countEl = root.querySelector('#glo-count');

  function apply() {
    const q = gloState.q.trim().toLowerCase();
    const list = D.glossary.filter((t) =>
      (gloState.letter === 'Todas' || t.term[0].toUpperCase() === gloState.letter) &&
      (!q || (t.term + ' ' + t.definition).toLowerCase().includes(q))
    ).sort((a, b) => a.term.localeCompare(b.term, 'es'));

    countEl.textContent = `${list.length} de ${D.glossary.length} términos`;

    if (!list.length) {
      listEl.innerHTML = `
        <li class="empty-item"><div class="empty">
          <p class="empty-title">Sin resultados</p>
          <p class="empty-text">Ningún término coincide con la búsqueda.</p>
          <button type="button" class="btn" id="glo-clear">Limpiar filtros</button>
        </div></li>`;
      listEl.querySelector('#glo-clear').addEventListener('click', () => {
        gloState.q = ''; gloState.letter = 'Todas';
        renderGlosario(root);
      });
      return;
    }

    listEl.innerHTML = list.map((t) => {
      const fav = SMR.favorites.has('termino', t.id);
      return `
        <li class="gloss-item">
          <div class="gloss-head">
            <span class="gloss-term">${SMR.esc(t.term)}</span>
            <button type="button" class="icon-btn fav-btn${fav ? ' active' : ''}" data-fav="termino:${t.id}"
                    aria-pressed="${fav}" title="${fav ? 'Quitar de favoritos' : 'Añadir a favoritos'}"
                    aria-label="${fav ? 'Quitar de favoritos' : 'Añadir a favoritos'}">${SMR.icon('star', 15, fav)}</button>
          </div>
          <p class="gloss-def">${SMR.esc(t.definition)}</p>
        </li>`;
    }).join('');
    bindFav(listEl);
  }

  searchInput.addEventListener('input', () => {
    gloState.q = searchInput.value;
    apply();
  });

  chipBar.addEventListener('click', (event) => {
    const chip = event.target.closest('.chip');
    if (!chip) return;
    gloState.letter = chip.dataset.value;
    chipBar.querySelectorAll('.chip').forEach((ch) => {
      ch.classList.toggle('active', ch.dataset.value === gloState.letter);
    });
    apply();
  });

  apply();
}

/* ---------- Página de configuración ---------- */

function renderSettings(root) {
  const s = SMR.settings;
  const themeValue = effectiveTheme();

  root.innerHTML = `
    <section class="settings-group" aria-labelledby="settings-appearance">
      <h3 class="section-label" id="settings-appearance">Apariencia</h3>
      <div class="option-row">
        <div>
          <p class="option-label">Tema</p>
          <p class="option-hint">Claro u oscuro. Si no eliges uno, se usa la preferencia del sistema.</p>
        </div>
        <div class="segmented" role="group" aria-label="Tema">
          <button type="button" data-theme-opt="light" class="${themeValue === 'light' ? 'active' : ''}">Claro</button>
          <button type="button" data-theme-opt="dark" class="${themeValue === 'dark' ? 'active' : ''}">Oscuro</button>
        </div>
      </div>
      <div class="option-row">
        <div>
          <p class="option-label">Tamaño de texto</p>
          <p class="option-hint">Escala base de toda la interfaz.</p>
        </div>
        <select class="input" id="setting-text-size" aria-label="Tamaño de texto">
          <option value="sm">Pequeño</option>
          <option value="md">Normal</option>
          <option value="lg">Grande</option>
          <option value="xl">Muy grande</option>
        </select>
      </div>
      <div class="option-row">
        <div>
          <p class="option-label">Animaciones</p>
          <p class="option-hint">Transiciones cortas al abrir el menú y en los controles.</p>
        </div>
        <input type="checkbox" class="switch" id="setting-animations" aria-label="Activar animaciones">
      </div>
    </section>
    <section class="settings-group" aria-labelledby="settings-reset">
      <h3 class="section-label" id="settings-reset">Restablecer</h3>
      <div class="option-row">
        <div>
          <p class="option-label">Restablecer configuración</p>
          <p class="option-hint">Borra las preferencias guardadas y vuelve a los valores predeterminados.</p>
        </div>
        <button type="button" class="btn" id="setting-reset">Restablecer</button>
      </div>
    </section>`;

  const sizeSelect = $('#setting-text-size', root);
  const animCheck = $('#setting-animations', root);
  sizeSelect.value = s.textSize || 'md';
  animCheck.checked = !!s.animations;

  root.querySelectorAll('[data-theme-opt]').forEach((btn) => {
    btn.addEventListener('click', () => SMR.setTheme(btn.dataset.themeOpt));
  });

  sizeSelect.addEventListener('change', () => {
    SMR.settings.textSize = sizeSelect.value;
    saveSettings();
    applySettings();
  });

  animCheck.addEventListener('change', () => {
    SMR.settings.animations = animCheck.checked;
    saveSettings();
    applySettings();
  });

  $('#setting-reset', root).addEventListener('click', () => {
    SMR.settings = Object.assign({}, SETTINGS_DEFAULTS);
    SMR.store.remove('settings');
    applySettings();
    updateThemeButton();
    render();
  });
}

function makePending(pending) {
  return (root) => {
    root.innerHTML = `
      <div class="empty">
        ${SMR.icon('box', 22)}
        <p class="empty-title">Sección en preparación</p>
        <p class="empty-text">Incluirá: ${pending}.</p>
      </div>`;
  };
}

/* ---------- Rutas ---------- */

const ROUTES = {
  inicio: {
    title: 'Inicio',
    desc: 'Recursos y herramientas para Sistemas Microinformáticos y Redes.',
    icon: 'home',
    render: renderHome
  },
  recursos: {
    title: 'Recursos',
    desc: 'Materiales de estudio organizados por módulos del ciclo.',
    icon: 'book',
    render: renderRecursos
  },
  redes: {
    title: 'Redes',
    desc: 'Modelos de referencia, direccionamiento IP y servicios de red.',
    icon: 'network',
    pending: 'el modelo OSI, el modelo TCP/IP, la tabla de puertos y el direccionamiento IP',
    render: null
  },
  sistemas: {
    title: 'Sistemas',
    desc: 'Sistemas operativos, archivos, procesos, servicios y comandos.',
    icon: 'cpu',
    pending: 'comandos de Windows y Linux, sistemas de archivos, procesos, servicios y permisos',
    render: null
  },
  herramientas: {
    title: 'Herramientas',
    desc: 'Calculadoras y conversores de uso frecuente.',
    icon: 'wrench',
    pending: 'la calculadora de subredes, los conversores, el generador de contraseñas y la tabla de puertos',
    render: null
  },
  tests: {
    title: 'Tests',
    desc: 'Cuestionarios de autoevaluación por módulo.',
    icon: 'clipboard',
    pending: 'tests de redes, sistemas, hardware y seguridad con corrección y explicaciones',
    render: null
  },
  glosario: {
    title: 'Glosario',
    desc: 'Definiciones de los términos técnicos del ciclo.',
    icon: 'bookOpen',
    render: renderGlosario
  },
  configuracion: {
    title: 'Configuración',
    desc: 'Preferencias de la aplicación.',
    icon: 'settings',
    render: renderSettings
  }
};

ROUTES.redes.render = makePending(ROUTES.redes.pending);
ROUTES.sistemas.render = makePending(ROUTES.sistemas.pending);
ROUTES.herramientas.render = makePending(ROUTES.herramientas.pending);
ROUTES.tests.render = makePending(ROUTES.tests.pending);

const NAV_MAIN = ['inicio', 'recursos', 'redes', 'sistemas', 'herramientas', 'tests', 'glosario'];
const NAV_FOOTER = ['configuracion'];

/* ---------- Navegación lateral ---------- */

function buildNav() {
  const makeItem = (id) => {
    const route = ROUTES[id];
    const li = document.createElement('li');
    li.innerHTML =
      `<a class="nav-link" href="#/${id}" data-route="${id}">` +
      `${SMR.icon(route.icon)}<span>${route.title}</span></a>`;
    return li;
  };
  dom.navList.replaceChildren(...NAV_MAIN.map(makeItem));
  dom.navFooter.replaceChildren(...NAV_FOOTER.map(makeItem));
}

function setActiveNav(id) {
  document.querySelectorAll('.nav-link').forEach((link) => {
    const active = link.dataset.route === id;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}

/* ---------- Router por hash (con consulta opcional: #/recursos?q=...) ---------- */

function parseHash() {
  const raw = location.hash.replace(/^#\/?/, '');
  const [path, query] = raw.split('?');
  return {
    id: path ? path.split('/')[0].toLowerCase() : 'inicio',
    query: new URLSearchParams(query || '')
  };
}

function currentRouteId() {
  const { id } = parseHash();
  return Object.prototype.hasOwnProperty.call(ROUTES, id) ? id : null;
}

function render() {
  const { id, query } = parseHash();
  if (!currentRouteId()) {
    location.replace('#/inicio');
    return;
  }
  SMR.activeQuery = query;
  const route = ROUTES[id];
  setActiveNav(id);
  dom.pageTitle.textContent = route.title;
  dom.pageDesc.textContent = route.desc;
  document.title = `${route.title} · SMR Hub`;
  dom.content.replaceChildren();
  route.render(dom.content);
  SMR.activeQuery = new URLSearchParams(); // la consulta se consume al renderizar
  closeDrawer();
  window.scrollTo(0, 0);
}

SMR.navigate = (hash) => {
  /* Si el hash es idéntico al actual no hay hashchange: re-render manual */
  if (location.hash === hash) render();
  else location.hash = hash;
};

/* ---------- Buscador global ---------- */

SMR.searchIndex = [];

SMR.registerSearchEntries = (entries) => {
  SMR.searchIndex.push(...entries);
};

function buildSearchIndex() {
  SMR.searchIndex.length = 0;

  /* Secciones */
  SMR.registerSearchEntries(
    Object.entries(ROUTES).map(([id, route]) => ({
      title: route.title,
      meta: 'Sección',
      hash: `#/${id}`,
      text: `${route.title} ${route.desc}`.toLowerCase()
    }))
  );

  /* Recursos */
  SMR.registerSearchEntries(
    D.resources.map((r) => ({
      title: r.title,
      meta: `Recurso · ${r.category}`,
      hash: `#/recursos?q=${encodeURIComponent(r.title)}`,
      text: `${r.title} ${r.desc} ${r.category} ${r.level}`.toLowerCase()
    }))
  );

  /* Glosario */
  SMR.registerSearchEntries(
    D.glossary.map((t) => ({
      title: t.term,
      meta: 'Glosario',
      hash: `#/glosario?q=${encodeURIComponent(t.term)}`,
      text: `${t.term} ${t.definition}`.toLowerCase()
    }))
  );
}

function wireSearch() {
  let open = false;
  const closePanel = () => {
    if (!open) return;
    dom.searchPanel.hidden = true;
    open = false;
  };

  dom.searchInput.addEventListener('input', () => {
    const q = dom.searchInput.value.trim().toLowerCase();
    if (!q) {
      closePanel();
      return;
    }
    const hits = SMR.searchIndex
      .filter((e) => e.title.toLowerCase().includes(q) || e.text.includes(q))
      .slice(0, 10);

    dom.searchPanel.innerHTML = hits.length
      ? hits.map((e) =>
          `<button type="button" class="search-item" data-hash="${e.hash}">` +
          `<span class="search-item-title">${SMR.esc(e.title)}</span>` +
          `<span class="search-item-meta">${SMR.esc(e.meta)}</span></button>`
        ).join('')
      : `<p class="search-empty">Sin resultados para «${SMR.esc(dom.searchInput.value.trim())}»</p>`;

    dom.searchPanel.hidden = false;
    open = true;
  });

  dom.searchPanel.addEventListener('mousedown', (event) => {
    const item = event.target.closest('.search-item');
    if (!item) return;
    event.preventDefault();
    SMR.navigate(item.dataset.hash);
    dom.searchInput.value = '';
    closePanel();
    dom.searchInput.blur();
  });

  dom.searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closePanel();
      dom.searchInput.blur();
    }
  });

  document.addEventListener('click', (event) => {
    if (open && !dom.searchWrap.contains(event.target)) closePanel();
  });

  /* Atajo: la tecla "/" sitúa el foco en el buscador */
  document.addEventListener('keydown', (event) => {
    if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey) {
      const target = event.target;
      const typing = target instanceof HTMLElement &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' ||
         target.tagName === 'SELECT' || target.isContentEditable);
      if (!typing) {
        event.preventDefault();
        dom.searchInput.focus();
      }
    }
  });
}

/* ---------- Menú desplegable en pantallas pequeñas ---------- */

function openDrawer() {
  dom.sidebar.classList.add('open');
  dom.scrim.hidden = false;
  requestAnimationFrame(() => dom.scrim.classList.add('show'));
  dom.menuBtn.setAttribute('aria-expanded', 'true');
}

function closeDrawer() {
  if (!dom.sidebar.classList.contains('open')) return;
  dom.sidebar.classList.remove('open');
  dom.scrim.classList.remove('show');
  dom.menuBtn.setAttribute('aria-expanded', 'false');
  window.setTimeout(() => {
    if (!dom.sidebar.classList.contains('open')) dom.scrim.hidden = true;
  }, 200);
}

function wireDrawer() {
  dom.menuBtn.innerHTML = SMR.icon('menu');
  dom.menuBtn.addEventListener('click', () => {
    if (dom.sidebar.classList.contains('open')) closeDrawer();
    else openDrawer();
  });
  dom.scrim.addEventListener('click', closeDrawer);
}

/* ---------- Arranque ---------- */

function init() {
  applySettings();
  buildNav();
  buildSearchIndex();
  wireSearch();
  wireDrawer();

  dom.themeBtn.addEventListener('click', SMR.toggleTheme);
  dom.searchIcon.innerHTML = SMR.icon('search', 15);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && dom.sidebar.classList.contains('open')) {
      closeDrawer();
    }
  });

  /* El enlace "saltar al contenido" no debe chocar con el router de hash */
  $('.skip-link').addEventListener('click', (event) => {
    event.preventDefault();
    dom.content.focus();
  });

  window.addEventListener('hashchange', render);
  updateThemeButton();
  render();
}

init();
