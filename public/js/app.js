
(function () {
    const setupAnimations = () => {
        const observerOptions = {
            root: null,
            rootMargin: '100px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.reveal-up, .reveal-text, .reveal-img, .fade-in, .line-grow, .reveal-encaixe-1, .reveal-encaixe-2');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    };

    const init = () => {
        setupAnimations();
        setTimeout(setupAnimations, 200);
        setTimeout(setupAnimations, 1000);
    };

    // Run on Astro events
    document.addEventListener('astro:page-load', init);
    document.addEventListener('astro:after-swap', init);

    // Initial run
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // NProgress Integration (assuming loaded globally)
    document.addEventListener('astro:before-preparation', () => {
        if (window.NProgress) window.NProgress.start();
    });

    document.addEventListener('astro:page-load', () => {
        if (window.NProgress) window.NProgress.done();
    });

})();
