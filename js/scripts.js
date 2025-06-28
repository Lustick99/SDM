
// Navigation fluide sur liens internes
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetID = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetID);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Décalage pour header fixe si besoin
                    behavior: "smooth"
                });
            }
        });
    });
});

// Fonction pour charger dynamiquement une section HTML dans la page principale
function loadSection(sectionUrl, targetSelector = '#main-content') {
    fetch(sectionUrl)
        .then(response => {
            if (!response.ok) throw new Error('Erreur de chargement');
            return response.text();
        })
        .then(html => {
            document.querySelector(targetSelector).innerHTML = html;
            animateSection(targetSelector);
        })
        .catch(error => {
            document.querySelector(targetSelector).innerHTML = `<p>Erreur : ${error.message}</p>`;
        });
}

// Animation simple lors du chargement d'une section
function animateSection(selector) {
    const section = document.querySelector(selector);
    section.style.opacity = 0;
    section.style.transition = 'opacity 0.5s';
    setTimeout(() => {
        section.style.opacity = 1;
    }, 50);
}

// Gestion du clic sur les liens de navigation pour charger dynamiquement les sections
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', function (e) {
        const link = e.target.closest('a[data-section]');
        if (link) {
            e.preventDefault();
            const sectionUrl = link.getAttribute('href');
            loadSection(sectionUrl);
            history.pushState({ section: sectionUrl }, '', sectionUrl);
        }
    });

    // Gestion du bouton retour du navigateur
    window.addEventListener('popstate', function (e) {
        if (e.state && e.state.section) {
            loadSection(e.state.section);
        }
    });

    // Chargement initial (optionnel)
    // loadSection('home.html');
});

// Exemple d'animation supplémentaire : effet de survol sur les boutons
document.addEventListener('mouseover', function (e) {
    const btn = e.target.closest('.btn-animate');
    if (btn) {
        btn.style.transform = 'scale(1.05)';
        btn.style.transition = 'transform 0.2s';
    }
});
document.addEventListener('mouseout', function (e) {
    const btn = e.target.closest('.btn-animate');
    if (btn) {
        btn.style.transform = 'scale(1)';
    }
});


// Lightbox simple pour galerie
document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");
    const closeBtn = document.querySelector(".lightbox-close");
    const galleryImages = document.querySelectorAll(".gallery-grid img");

    galleryImages.forEach(img => {
        img.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt || "Image agrandie";
        });
    });

    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
        lightboxImg.src = "";
    });

    // Fermer lightbox au clic en dehors de l'image
    lightbox.addEventListener("click", e => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
            lightboxImg.src = "";
        }
    });

    // Fermeture avec touche Échap
    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && lightbox.style.display === "flex") {
            lightbox.style.display = "none";
            lightboxImg.src = "";
        }
    });
});