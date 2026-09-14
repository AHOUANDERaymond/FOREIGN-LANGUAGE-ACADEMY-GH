/**
 * Back to Top - Version auto-injectable
 * Injecte le HTML, le CSS et le comportement du bouton.
 * 
 * @param {Object} options - Options de configuration
 * @param {number} options.scrollThreshold - Seuil de scroll en px (défaut: 300)
 * @param {string} options.position - 'right' ou 'left' (défaut: 'right')
 * @param {string} options.color - Couleur du bouton (défaut: '#3498db')
 * @param {string} options.iconColor - Couleur de l'icône (défaut: '#e74c3c')
 * @param {number} options.size - Taille en px (défaut: 60)
 * @param {string} options.tooltip - Texte du tooltip (défaut: 'Retour en haut')
 */
function initBackToTop(options = {}) {
  // Valeurs par défaut
  const config = {
    scrollThreshold: 300,
    position: 'right',
    color: '#3498db',
    hoverColor: '#2980b9',
    iconColor: '#e74c3c',
    size: 60,
    tooltip: 'Retour en haut',
    ...options
  };

  // Éviter les doublons
  if (document.getElementById('backToTop')) return;

  // 1. Injecter le CSS (une seule fois)
  if (!document.getElementById('backToTopStyles')) {
    const style = document.createElement('style');
    style.id = 'backToTopStyles';
    style.textContent = `
      .back-to-top {
        position: fixed;
        bottom: 30px;
        ${config.position}: 30px;
        width: ${config.size}px;
        height: ${config.size}px;
        background-color: white;
        border: 5px solid ${config.color};
        border-radius: 50%;
        display: none;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        opacity: 0.9;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
        text-decoration: none;
      }
      .back-to-top.visible {
        display: flex;
      }
      .back-to-top:hover {
        opacity: 1;
        transform: scale(1.1);
        border-color: ${config.hoverColor};
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      }
      .back-to-top i {
        color: ${config.iconColor};
        font-size: ${config.size * 0.4}px;
      }
    `;
    document.head.appendChild(style);
  }

  // 2. Injecter le HTML
  const backToTop = document.createElement('a');
  backToTop.href = '#';
  backToTop.id = 'backToTop';
  backToTop.className = 'back-to-top';
  backToTop.title = config.tooltip;
  backToTop.setAttribute('aria-label', config.tooltip);
  backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(backToTop);

  // 3. Comportement : clic → remonter en haut
  backToTop.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 4. Comportement : affichage selon le scroll
  const toggleVisibility = () => {
    if (window.scrollY > config.scrollThreshold) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });
  toggleVisibility(); // Vérification initiale

  // Retourner l'élément pour un usage avancé
  return backToTop;
}

// Auto-initialisation si l'attribut data-back-to-top est présent
document.addEventListener('DOMContentLoaded', function () {
  const script = document.querySelector('script[data-back-to-top]');
  if (script) {
    const opts = {};
    if (script.dataset.scrollThreshold) opts.scrollThreshold = parseInt(script.dataset.scrollThreshold);
    if (script.dataset.position) opts.position = script.dataset.position;
    if (script.dataset.color) opts.color = script.dataset.color;
    if (script.dataset.iconColor) opts.iconColor = script.dataset.iconColor;
    initBackToTop(opts);
  }
});