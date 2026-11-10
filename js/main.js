/* ==========================================================================
   AMAC | Bolsa de Trabajo · main.js
   JavaScript mínimo y opcional: el sitio funciona sin él.
   1. Marca <html class="js"> para que el CSS esconda el menú móvil.
   2. Abre / cierra el menú hamburguesa.
   3. Cierra el submenú "Registro" con Escape o al hacer clic fuera.
   4. Muestra / oculta la contraseña.
   ========================================================================== */

document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {
  /* ---------- 2. Menú hamburguesa ---------- */
  var toggle = document.querySelector('.site-header__toggle');
  var nav = document.getElementById('site-nav');
  var escritorio = window.matchMedia('(min-width: 80em)');

  function setMenu(abierto) {
    toggle.setAttribute('aria-expanded', String(abierto));
    nav.classList.toggle('site-nav--open', abierto);
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Al pasar a escritorio el menú siempre se ve: se reinicia el estado
    escritorio.addEventListener('change', function (e) {
      if (e.matches) setMenu(false);
    });
  }

  /* ---------- 3. Submenú "Registro" (<details>) ---------- */
  var submenus = document.querySelectorAll('.site-nav__submenu');

  document.addEventListener('click', function (e) {
    submenus.forEach(function (d) {
      if (d.open && !d.contains(e.target)) d.open = false;
    });
  });

  /* Escape: cierra primero el submenú; si no hay, cierra el menú móvil */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;

    var abierto = document.querySelector('.site-nav__submenu[open]');
    if (abierto) {
      abierto.open = false;
      abierto.querySelector('summary').focus();
    } else if (toggle && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });

  /* ---------- 4. Mostrar / ocultar contraseña ---------- */
  document.querySelectorAll('.field__toggle').forEach(function (boton) {
    var input = document.getElementById(boton.getAttribute('aria-controls'));
    var texto = boton.querySelector('.visually-hidden');
    if (!input) return;

    boton.addEventListener('click', function () {
      var mostrar = input.type === 'password';
      input.type = mostrar ? 'text' : 'password';
      boton.setAttribute('aria-pressed', String(mostrar));
      if (texto) texto.textContent = mostrar ? 'Ocultar contraseña' : 'Mostrar contraseña';
    });
  });
});
