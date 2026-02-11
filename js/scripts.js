/*!
 * Yuxuan Lou – Personal Homepage
 * Custom Scripts
 */

/* ---- Dark Mode (runs independently) ---- */
(function initDarkMode() {
    var toggle = document.getElementById('darkModeToggle');
    var icon = document.getElementById('darkModeIcon');

    function updateIcon(theme) {
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    // Sync icon with current theme on load
    updateIcon(document.documentElement.getAttribute('data-bs-theme') || 'light');

    if (toggle) {
        toggle.addEventListener('click', function() {
            var current = document.documentElement.getAttribute('data-bs-theme') || 'light';
            var next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-bs-theme', next);
            localStorage.setItem('theme', next);
            updateIcon(next);
        });
    }
})();

/* ---- Bootstrap & UI features (after DOM ready) ---- */
document.addEventListener('DOMContentLoaded', function() {

    // ScrollSpy (wrapped in try-catch so failures don't block other code)
    try {
        if (typeof bootstrap !== 'undefined' && bootstrap.ScrollSpy) {
            var sideNav = document.body.querySelector('#sideNav');
            if (sideNav) {
                new bootstrap.ScrollSpy(document.body, {
                    target: '#sideNav',
                    rootMargin: '0px 0px -40%',
                });
            }
        }
    } catch (e) {
        console.warn('ScrollSpy init failed:', e);
    }

    // Responsive Navbar: collapse on link click
    var navbarToggler = document.body.querySelector('.navbar-toggler');
    var navLinks = document.querySelectorAll('#navbarResponsive .nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (navbarToggler && window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Scroll Reveal Animations
    var revealElements = document.querySelectorAll('.fade-in-section');
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        revealElements.forEach(function(el) { observer.observe(el); });
    } else {
        revealElements.forEach(function(el) { el.classList.add('visible'); });
    }

});
