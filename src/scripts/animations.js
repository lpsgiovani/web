
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
        // Se já estiver visível por algum motivo ou se o JS demorar, garante que observe
        observer.observe(el);
    });
};

const init = () => {
    setupAnimations();

    // Catch any late hydration
    setTimeout(setupAnimations, 200);
    setTimeout(setupAnimations, 1000);

    // Defer NProgress and non-critical logic to window.onload
    // We use dynamic import for nprogress to keep it bundled but loaded on demand if needed
    // However, for pure client-side interaction here, checking window.NProgress might be safer if loaded via script
    // But since we use npm package, we'll keep the dynamic import pattern or move it.
};

// Run on page-load for behavior with ViewTransitions
document.addEventListener('astro:page-load', init);

// NProgress Handling
document.addEventListener('astro:before-preparation', () => {
    import('nprogress').then(NProgress => {
        // Handle both default and named export
        const np = NProgress.default || NProgress;
        if (np && np.start) np.start();
    }).catch(() => { });
});

document.addEventListener('astro:after-swap', () => {
    // Re-init animations after swap
    init();
});

document.addEventListener('astro:page-load', () => {
    import('nprogress').then(NProgress => {
        const np = NProgress.default || NProgress;
        if (np && np.done) np.done();
    }).catch(() => { });
});

// Initial run
init();
