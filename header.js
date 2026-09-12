/* ============================================================
   HEADER.JS - Injection automatique du header partagé
   + Gestion du menu hamburger + lien actif automatique
   ============================================================ */
(function() {
  'use strict';

  // 1. Injection du header via fetch
  function injectHeader() {
    var placeholder = document.getElementById('header-placeholder');
    if (!placeholder) return;

    fetch('header.html')
      .then(function(response) {
        if (!response.ok) throw new Error('Header introuvable');
        return response.text();
      })
      .then(function(html) {
        placeholder.innerHTML = html;
        // Une fois injecté, on initialise le menu
        initMenu();
        highlightActiveLink();
      })
      .catch(function(error) {
        console.error('Erreur chargement header:', error);
        // Fallback : header en dur si le fetch échoue (ex: ouverture locale file://)
        placeholder.innerHTML = getFallbackHeader();
        initMenu();
        highlightActiveLink();
      });
  }

  // 2. Header de secours (si fetch échoue, ex: ouverture en file://)
  function getFallbackHeader() {
    return '<nav class="navbar">' +
      '<div class="nav-container">' +
        '<h1 class="app-name">' +
          '<img src="logo_fla.jpg" alt="Logo FLA" class="logo">' +
          '<span>Foreign Language Academy GH</span>' +
        '</h1>' +
        '<button class="menu-toggle" id="menuToggle"><i class="fas fa-bars"></i></button>' +
        '<ul class="nav-tabs" id="navTabs">' +
          '<li class="nav-tab"><a href="index.html">Home</a></li>' +
          '<li class="nav-tab"><a href="programmes.html">Programmes</a></li>' +
          '<li class="nav-tab"><a href="extra-scolaire.html">Immersion</a></li>' +
          '<li class="nav-tab"><a href="vie-au-ghana.html">Vivre au Ghana</a></li>' +
          '<li class="nav-tab"><a href="alumini.html">Témoignages</a></li>' +
          '<li class="nav-tab"><a href="contactez-nous.html">Contacts</a></li>' +
        '</ul>' +
      '</div>' +
    '</nav>';
  }

  // 3. Initialisation du menu hamburger
  function initMenu() {
    var menuToggle = document.getElementById('menuToggle');
    var navTabs = document.getElementById('navTabs');

    if (!menuToggle || !navTabs) return;

    // Éviter les doublons : on clone le bouton
    var newToggle = menuToggle.cloneNode(true);
    menuToggle.parentNode.replaceChild(newToggle, menuToggle);
    menuToggle = document.getElementById('menuToggle');

    menuToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      navTabs.classList.toggle('active');

      var icon = this.querySelector('i');
      if (navTabs.classList.contains('active')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    });

    // Fermer au clic sur un lien
    navTabs.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navTabs.classList.remove('active');
        var icon = menuToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });

    // Fermer au clic en dehors
    document.addEventListener('click', function(e) {
      if (navTabs.classList.contains('active') &&
          !navTabs.contains(e.target) &&
          !menuToggle.contains(e.target)) {
        navTabs.classList.remove('active');
        var icon = menuToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      }
    });

    // Fermer avec Échap
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navTabs.classList.contains('active')) {
        navTabs.classList.remove('active');
        var icon = menuToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      }
    });

    // Fermer au redimensionnement > 992px
    window.addEventListener('resize', function() {
      if (window.innerWidth > 992 && navTabs.classList.contains('active')) {
        navTabs.classList.remove('active');
        var icon = menuToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      }
    });
  }

  // 4. Mettre en surbrillance le lien actif selon la page courante
  function highlightActiveLink() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var navLinks = document.querySelectorAll('.nav-tab a');

    navLinks.forEach(function(link) {
      var href = link.getAttribute('href');
      // Enlever l'ancienne classe active
      link.classList.remove('active');
      // Ajouter si correspondance exacte
      if (href === currentPage) {
        link.classList.add('active');
      }
    });
  }

  // 5. Lancer l'injection au chargement du DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectHeader);
  } else {
    injectHeader();
  }
})();