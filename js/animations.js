
document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target); // animation une seule fois
                }
            });
        },
        {
            threshold: 0.2, // déclenche à 20% visible
        }
    );

    document.querySelectorAll(".fade-in-up").forEach(el => {
        observer.observe(el);
    });
});