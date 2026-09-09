// footer.js - Footer identique à celui de index.html

(function() {
    function createFooter() {
        return `
        <footer class="app-footer">
            <div class="footer-tabs">
                <!-- Onglet About -->
                <div class="footer-tab">
                    <div class="tab-header">
                        <i class="fas fa-info-circle"></i>
                        <span>À PROPOS</span>
                    </div>
                    <div class="tab-content">
                        <a href="index.html">Notre académie</a>
                        <a href="index.html">Notre équipe</a>
                        <a href="alumini.html">Alumini</a>
                    </div>
                </div>
                
                <!-- Onglet Programmes -->
                <div class="footer-tab">
                    <div class="tab-header">
                        <i class="fas fa-book"></i>
                        <span>PROGRAMMES</span>
                    </div>
                    <div class="tab-content">
                        <a href="programmes.html">Anglais</a>
                        <a href="#">Français</a>
                        <a href="etudes-bourses.html">Études à l'étranger</a>
                    </div>
                </div>
                
                <!-- Onglet Contact -->
                <div class="footer-tab">
                    <div class="tab-header">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>CONTACTS</span>
                    </div>
                    <div class="tab-content">
                        <a href="contactez-nous.html">Nous contacter</a>
                        <a href="map.html">Localisation</a>
                    </div>
                </div>
                
                <!-- Onglet Réservations -->
                <div class="footer-tab">
                    <div class="tab-header">
                        <i class="fas fa-calendar-alt"></i>
                        <span>RÉSERVATIONS</span>
                    </div>
                    <div class="tab-content">
                        <a href="fiche_de_preinscription.html">S'inscrire</a>
                        <a href="housing.html">Hébergement</a>
                    </div>
                </div>
            </div>

            <!-- RÉSEAUX SOCIAUX DANS LE FOOTER -->
            <div class="footer-social">
                <h3><i class="fas fa-share-alt" style="margin-right: 10px;"></i>SUIVEZ-NOUS SUR NOS RÉSEAUX</h3>
                <div class="footer-social-grid">
                    <a href="https://www.facebook.com/share/1Fhuc6zToL/" target="_blank" class="footer-social-item" title="Facebook">
                        <div class="footer-social-icon"><i class="fab fa-facebook-f"></i></div>
                        <span>Facebook</span>
                        <small>@fla.ghana</small>
                    </a>
                    <a href="https://www.instagram.com/foreignlanguageacademygh?igsi=MWJidWNwcXdkNGgxcw==" target="_blank" class="footer-social-item" title="Instagram">
                        <div class="footer-social-icon"><i class="fab fa-instagram"></i></div>
                        <span>Instagram</span>
                        <small>@fla.ghana</small>
                    </a>
                    <a href="https://www.tiktok.com/@flaghana?_r=1&_t=ZS-99MrSPnee16" target="_blank" class="footer-social-item" title="TikTok">
                        <div class="footer-social-icon"><i class="fab fa-tiktok"></i></div>
                        <span>TikTok</span>
                        <small>@flaghana</small>
                    </a>
                    <a href="https://www.threads.com/@foreignlanguageacademygh" target="_blank" class="footer-social-item" title="Threads">
                        <div class="footer-social-icon"><i class="fa-brands fa-threads"></i></div>
                        <span>Threads</span>
                        <small>@fla.ghana</small>
                    </a>
                    <a href="https://wa.me/233536725050" target="_blank" class="footer-social-item" title="WhatsApp">
                        <div class="footer-social-icon"><i class="fab fa-whatsapp"></i></div>
                        <span>WhatsApp</span>
                        <small>+233 536725050</small>
                    </a>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>Foreign Language Academy GH © 2025 | Numéro d'agrément : CS152770924</p>
                <p>Ashongman Estates, Accra Ghana | +233 536725050 / +233 202165231</p>
                <p>flaghaccra@gmail.com</p>
            </div>
        </footer>
        `;
    }

    function appendFooter() {
        if (!document.querySelector('footer')) {
            const footerContainer = document.createElement('div');
            footerContainer.innerHTML = createFooter();
            document.body.appendChild(footerContainer.firstElementChild);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', appendFooter);
    } else {
        appendFooter();
    }
})();