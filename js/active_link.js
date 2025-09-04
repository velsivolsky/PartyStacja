// ===== AKTYWNY LINK W NAVBAR =====
function initActiveLink() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Usuń active ze wszystkich linków
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Znajdź i oznacz aktywny link
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref && currentPage.includes(linkHref)) {
            link.classList.add('active');
        }
    });
    
    // Specjalny przypadek dla strony głównej
    if (currentPage === '/' || currentPage.includes('index.html')) {
        const homeLink = document.querySelector('.navbar-nav .nav-link[href="index.html"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }
}

// Inicjalizacja przy załadowaniu strony
document.addEventListener('DOMContentLoaded', initActiveLink);