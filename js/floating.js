document.addEventListener("DOMContentLoaded", () => {
    const floatingLinks = document.querySelectorAll(".floating-nav .floating-link");

    // 🔁 Permet les div ou section avec id
    const sections = Array.from(document.querySelectorAll("section[id], div[id]"));

    if (sections.length === 0 || floatingLinks.length === 0) {
        console.warn("Aucune section ou lien détecté.");
        return;
    }

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                    const id = entry.target.id;

                    console.log(`Section visible : ${id}`); // Debug

                    // Supprimer la classe active
                    floatingLinks.forEach(link => link.classList.remove("active"));

                    // Ajouter la classe active au lien correspondant
                    const activeLink = document.querySelector(`.floating-link[href="#${id}"]`);
                    if (activeLink) {
                        activeLink.classList.add("active");
                        console.log(`Active appliqué à ${activeLink.textContent}`);
                    } else {
                        console.warn(`Aucun lien trouvé pour #${id}`);
                    }
                }
            });
        },
        {
            threshold: 0.5
        }
    );

    sections.forEach(section => {
        observer.observe(section);
    });
});
