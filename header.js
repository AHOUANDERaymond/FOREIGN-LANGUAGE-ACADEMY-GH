// header.js - À placer à la racine du site

document.addEventListener('DOMContentLoaded', function() {
  
  // Détecter la page active
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Fonction pour marquer le lien actif
  function isActive(page) {
    if (currentPage === page) return 'active';
    // Cas spéciaux
    if (currentPage === '' && page === 'index.html') return 'active';
    if (currentPage === 'index.html' && page === 'index.html') return 'active';
    return '';
  }
  
  // HTML de la navbar
  const headerHTML = `
    <nav class="navbar">
      <div class="nav-container">
        <h1 class="app-name">
          <img src="logo_fla.jpg" alt="Logo FLA" class="logo">
          <span>Foreign Language Academy GH</span>
        </h1>
        <button class="menu-toggle" id="menuToggle" aria-label="Menu">
          <i class="fas fa-bars"></i>
        </button>
        <ul class="nav-tabs" id="navTabs">
          <li class="nav-tab"><a href="index.html" class="${isActive('index.html')}">Home</a></li>
          <li class="nav-tab"><a href="programmes.html" class="${isActive('programmes.html')}">Programmes</a></li>
          <li class="nav-tab"><a href="extra-scolaire.html" class="${isActive('extra-scolaire.html')}">Immersion</a></li>
          <li class="nav-tab"><a href="vie-au-ghana.html" class="${isActive('vie-au-ghana.html')}">Vivre au Ghana</a></li>
          <li class="nav-tab"><a href="staff.html" class="${isActive('staff.html')}">Équipe</a></li>
          <li class="nav-tab"><a href="alumini.html" class="${isActive('alumini.html')}">Témoignages</a></li>
          <li class="nav-tab"><a href="contactez-nous.html" class="${isActive('contactez-nous.html')}">Contacts</a></li>
        </ul>
      </div>
    </nav>
  `;
  
  // Insérer la navbar au début du body
  document.body.insertAdjacentHTML('afterbegin', headerHTML);
  
  // ===== GESTION DU MENU HAMBURGER =====
  const menuToggle = document.getElementById('menuToggle');
  const navTabs = document.getElementById('navTabs');
  
  if (menuToggle && navTabs) {
    menuToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      navTabs.classList.toggle('active');
      
      const icon = this.querySelector('i');
      if (navTabs.classList.contains('active')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    });
    
    // Fermer le menu au clic sur un lien
    navTabs.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        navTabs.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.className = 'fas fa-bars';
        }
      });
    });
    
    // Fermer le menu au clic en dehors
    document.addEventListener('click', function(e) {
      if (!navTabs.contains(e.target) && !menuToggle.contains(e.target)) {
        navTabs.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.className = 'fas fa-bars';
        }
      }
    });
  }
  
  // ===== CORRECTION DES LIENS POUR LES SOUS-DOSSIERS =====
  const currentPath = window.location.pathname;
  const pathParts = currentPath.split('/');
  const isInSubfolder = pathParts.length > 2 && !currentPath.endsWith('/');
  
  if (isInSubfolder) {
    const depth = pathParts.length - 2;
    const prefix = '../'.repeat(depth) || './';
    
    // Corriger les liens de navigation
    document.querySelectorAll('.nav-tab a').forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('/')) {
        link.setAttribute('href', prefix + href);
      }
    });
    
    // Corriger le logo
    const logo = document.querySelector('.logo');
    if (logo) {
      const src = logo.getAttribute('src');
      if (src && !src.startsWith('http') && !src.startsWith('/')) {
        logo.setAttribute('src', prefix + src);
      }
    }
  }
});