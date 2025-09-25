// ===== BARBA.JS SETUP - PŁYNNE PRZEJŚCIA MIĘDZY STRONAMI =====

document.addEventListener('DOMContentLoaded', function() {
    // Sprawdź czy Barba.js jest załadowany
    if (typeof barba === 'undefined') {
        console.error('Barba.js nie został załadowany!');
        return;
    }

    // Stwórz globalne cząsteczki
    createGlobalParticles();
    
    // ===== INICJALIZACJA BARBA.JS =====
    barba.init({
        transitions: [{
            name: 'smooth-fade',
            
            // Asynchroniczne przejście - overlapping
            sync: false,
            
            leave(data) {
                return new Promise(resolve => {
                    // Stwórz cząsteczki na początku przejścia
                    const particlesPromise = createTransitionParticles();
                    
                    // Fade-out starej strony
                    data.current.container.style.transition = 'opacity 0.6s ease-out';
                    data.current.container.style.opacity = '0';
                    
                    // Zapisz promise cząsteczek globalnie
                    window.transitionParticlesPromise = particlesPromise;
                    
                    setTimeout(resolve, 600);
                });
            },
            
            enter(data) {
                return new Promise(resolve => {
                    // Przygotuj nową stronę (ukryta)
                    data.next.container.style.opacity = '0';
                    data.next.container.style.transition = 'opacity 0.8s ease-in';
                    
                    // Poczekaj aż cząsteczki będą gotowe do zniknięcia
                    if (window.transitionParticlesPromise) {
                        window.transitionParticlesPromise.then(() => {
                            // Teraz pokaż nową stronę i usuń cząsteczki
                            fadeInNewPage(data, resolve);
                        });
                    } else {
                        // Fallback gdyby coś poszło nie tak
                        setTimeout(() => fadeInNewPage(data, resolve), 100);
                    }
                });
            }
        }],
        
        // Preload dla szybszego ładowania
        prefetch: true,
        
        // Callbacks dla różnych stron
        views: [{
            namespace: 'home',
            afterEnter() {
                refreshParticles();
                initPageScripts();
            }
        }, {
            namespace: 'gallery', 
            afterEnter() {
                if (typeof initCarousel === 'function') initCarousel();
                refreshParticles();
                initPageScripts();
            }
        }, {
            namespace: 'about',
            afterEnter() {
                refreshParticles();
                initPageScripts();
            }
        }, {
            namespace: 'offer',
            afterEnter() {
                refreshParticles();
                initPageScripts();
                // Reinicjalizuj oferta scripts
                if (typeof initOfferTiles === 'function') initOfferTiles();
                if (typeof initMaskotki === 'function') initMaskotki();
            }
        }, {
            namespace: 'contact',
            afterEnter() {
                refreshParticles();
                initPageScripts();
            }
        }]
    });

    // Globalne hooks dla wszystkich przejść
    barba.hooks.beforeLeave(() => {
        // Wyczyść timery i eventy przed opuszczeniem strony
        cleanupPage();
    });
    
    barba.hooks.afterEnter(() => {
        // Odśwież cząsteczki i skrypty po każdym przejściu
        refreshParticles();
        initPageScripts();
    });
});

// ===== FUNKCJE POMOCNICZE =====

// Czyszczenie strony przed opuszczeniem
function cleanupPage() {
    // Wyczyść timery cząsteczek
    if (window.particlesInterval) {
        clearInterval(window.particlesInterval);
    }
    
    // Wyczyść cząsteczki przejścia
    if (window.transitionParticleInterval) {
        clearInterval(window.transitionParticleInterval);
    }
    
    // Usuń scroll listenery
    if (window.particlesScrollListener) {
        window.removeEventListener('scroll', window.particlesScrollListener);
        window.particlesScrollListener = null;
    }
    
    // Wyczyść wszystkie kontenery cząsteczek
    const particleContainers = document.querySelectorAll('#transition-particles, .fade-in-particles, .barba-overlay, .barba-smoke');
    particleContainers.forEach(el => el.remove());
}

// Inicjalizacja skryptów strony
function initPageScripts() {
    // Przeładuj import.js dla navbar/footer
    if (typeof loadNavbarAndFooter === 'function') {
        loadNavbarAndFooter();
    }
    
    // Przeładuj active links
    if (typeof updateActiveLinks === 'function') {
        updateActiveLinks();
    }
    
    // Reinicjalizuj Bootstrap komponenty
    initBootstrapComponents();
}

// Inicjalizacja komponentów Bootstrap po przejściu
function initBootstrapComponents() {
    // Karuzele
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        if (window.bootstrap && window.bootstrap.Carousel) {
            new window.bootstrap.Carousel(carousel);
        }
    });
    
    // Tooltips i Popovers jeśli istnieją
    if (window.bootstrap) {
        const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltips.forEach(tooltip => {
            new window.bootstrap.Tooltip(tooltip);
        });
    }
}

// Funkcja do odświeżania cząsteczek
function refreshParticles() {
    // Usuń stare cząsteczki jeśli istnieją
    const existingContainer = document.getElementById('particles-container');
    if (existingContainer) {
        clearInterval(window.particlesInterval);
        // Usuń scroll listener jeśli istnieje
        if (window.particlesScrollListener) {
            window.removeEventListener('scroll', window.particlesScrollListener);
        }
        existingContainer.remove();
    }
    
    // Stwórz nowe cząsteczki z małym opóźnieniem
    setTimeout(() => {
        createGlobalParticles();
    }, 100);
}

// ===== GLOBALNE CZĄSTECZKI ZŁOTA - OGRANICZONE DO HERO SECTION =====
function createGlobalParticles() {
    // Usuń stary kontener jeśli istnieje
    const existingContainer = document.getElementById('particles-container');
    if (existingContainer) {
        existingContainer.remove();
    }

    // Znajdź hero section na aktualnej stronie
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) {
        console.log('Brak hero section na tej stronie - pomijam cząsteczki');
        return;
    }

    // Pobierz wymiary hero section
    const heroRect = heroSection.getBoundingClientRect();
    const heroTop = heroSection.offsetTop;
    const heroHeight = heroSection.offsetHeight;

    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particles-container';
    particlesContainer.style.cssText = `
        position: absolute;
        top: ${heroTop}px;
        left: 0;
        width: 100vw;
        height: ${heroHeight}px;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    // Dodaj do body
    document.body.appendChild(particlesContainer);

    // Mniej cząsteczek na mobile
    const particleCount = window.innerWidth <= 768 ? 10 : 20;

    function createParticle() {
        // Sprawdź czy kontener nadal istnieje
        const container = document.getElementById('particles-container');
        if (!container) return;
        
        const particle = document.createElement('div');
        particle.className = 'gold-particle';
        
        // ISKIERKI zamiast kulek - różne rozmiary i kształty
        const width = Math.random() * 6 + 2; // 2-8px szerokość
        const height = Math.random() * 3 + 1; // 1-4px wysokość
        const shades = ['#FFD700', '#FFA500', '#DAA520', '#B8860B', '#CD853F'];
        const color = shades[Math.floor(Math.random() * shades.length)];
        
        // Losowy kąt obrotu dla iskierek
        const rotation = Math.random() * 360;
        
        // Cząsteczki pojawiają się na dole hero section
        particle.style.cssText = `
            position: absolute;
            width: ${width}px;
            height: ${height}px;
            background: linear-gradient(45deg, ${color}, ${color}AA);
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
            box-shadow: 0 0 ${width * 2}px ${color}66, 0 0 ${width * 4}px ${color}33;
            left: ${Math.random() * 100}%;
            top: ${heroHeight}px;
            pointer-events: none;
            transform: rotate(${rotation}deg);
        `;

        container.appendChild(particle);

        // Animacja iskierek - od dołu hero section do góry z obrotem
        const duration = Math.random() * 8000 + 6000;
        const drift = (Math.random() - 0.5) * 200;
        const spin = (Math.random() - 0.5) * 720; // Obracanie się

        particle.animate([
            {
                transform: `translateY(0px) translateX(0px) rotate(${rotation}deg)`,
                opacity: 0
            },
            {
                transform: `translateY(-${heroHeight * 0.2}px) translateX(${drift/4}px) rotate(${rotation + spin/3}deg)`,
                opacity: 0.8,
                offset: 0.1
            },
            {
                transform: `translateY(-${heroHeight + 100}px) translateX(${drift}px) rotate(${rotation + spin}deg)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'ease-out'
        });

        // Usuń cząsteczkę po animacji
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, duration);
    }

    // Stwórz początkowe cząsteczki
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => createParticle(), i * 300);
    }

    // Ciągle dodawaj nowe cząsteczki - rzadziej
    window.particlesInterval = setInterval(() => {
        createParticle();
    }, 1000);
    
    // Sprawdź czy hero section jest widoczny podczas scrollu
    const scrollHandler = () => {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;
        
        const heroRect = heroSection.getBoundingClientRect();
        const isVisible = heroRect.bottom > 0 && heroRect.top < window.innerHeight;
        
        // Dodaj cząsteczki tylko gdy hero section jest widoczny
        if (isVisible && Math.random() < 0.3) {
            createParticle();
        }
    };
    
    // Zapisz listener żeby móc go później usunąć
    window.particlesScrollListener = scrollHandler;
    window.addEventListener('scroll', scrollHandler, { passive: true });
}

// ===== FUNKCJA POMOCNICZA DO FADE-IN NOWEJ STRONY =====
function fadeInNewPage(data, resolve) {
    // Fade-in nowej strony
    requestAnimationFrame(() => {
        data.next.container.style.opacity = '1';
        
        // Wyczyść cząsteczki i zakończ przejście
        setTimeout(() => {
            clearTransitionParticles();
            data.next.container.style.transition = '';
            resolve();
        }, 800);
    });
}

// ===== CZĄSTECZKI PRZEJŚCIA - WIDOCZNE POD CZAS ŁADOWANIA =====
function createTransitionParticles() {
    return new Promise((resolve) => {
        const particlesContainer = document.createElement('div');
        particlesContainer.id = 'transition-particles';
        particlesContainer.className = 'transition-particles';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 99999;
            overflow: hidden;
            background: rgba(0, 0, 0, 0.1);
        `;
        
        document.body.appendChild(particlesContainer);
        window.transitionParticlesContainer = particlesContainer;

        // Różne kolory złota
        const goldColors = ['#FFD700', '#FFA500', '#DAA520', '#B8860B', '#CD853F', '#F4E87C'];
        
        // Więcej cząsteczek na dłużej
        const particleCount = window.innerWidth <= 768 ? 20 : 35;
        
        // Stwórz cząsteczki natychmiast
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => createLongTransitionParticle(particlesContainer, goldColors), i * 100);
        }
        
        // Kontynuuj tworzenie cząsteczek przez czas przejścia
        const particleInterval = setInterval(() => {
            if (document.getElementById('transition-particles')) {
                for (let i = 0; i < 3; i++) {
                    createLongTransitionParticle(particlesContainer, goldColors);
                }
            } else {
                clearInterval(particleInterval);
            }
        }, 800);
        
        window.transitionParticleInterval = particleInterval;
        
        // Sygnalizuj że cząsteczki są gotowe po 1 sekundzie
        setTimeout(resolve, 1000);
    });
}

function createLongTransitionParticle(container, goldColors) {
    if (!container || !container.parentNode) return;
    
    const particle = document.createElement('div');
    
    // Różne rozmiary i kształty cząsteczek
    const size = Math.random() * 10 + 4; // 4-14px
    const color = goldColors[Math.floor(Math.random() * goldColors.length)];
    const isCircle = Math.random() > 0.3;
    
    // Startowa pozycja - losowo z całego ekranu
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const endX = Math.random() * window.innerWidth;
    const endY = Math.random() * window.innerHeight;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, ${color}FF, ${color}AA, ${color}55);
        border-radius: ${isCircle ? '50%' : '30%'};
        left: ${startX}px;
        top: ${startY}px;
        box-shadow: 
            0 0 ${size * 3}px ${color}AA,
            0 0 ${size * 6}px ${color}55,
            inset 0 0 ${size * 2}px ${color}DD;
        filter: blur(0.8px);
    `;
    
    container.appendChild(particle);
    
    // Długa animacja - cząsteczki krążą podczas ładowania
    const duration = 3000 + Math.random() * 2000;
    const rotation = Math.random() * 1440 - 720; // Więcej obrotów
    
    particle.animate([
        {
            transform: `translate(0, 0) rotate(0deg) scale(0.5)`,
            opacity: 0
        },
        {
            transform: `translate(${(endX - startX) * 0.2}px, ${(endY - startY) * 0.2}px) rotate(${rotation * 0.2}deg) scale(1.2)`,
            opacity: 1,
            offset: 0.1
        },
        {
            transform: `translate(${(endX - startX) * 0.8}px, ${(endY - startY) * 0.8}px) rotate(${rotation * 0.8}deg) scale(1)`,
            opacity: 0.9,
            offset: 0.9
        },
        {
            transform: `translate(${endX - startX}px, ${endY - startY}px) rotate(${rotation}deg) scale(0)`,
            opacity: 0
        }
    ], {
        duration: duration,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        iterations: 1
    });
    
    // Usuń cząsteczkę po animacji
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, duration);
}

function clearTransitionParticles() {
    // Wyczyść interval
    if (window.transitionParticleInterval) {
        clearInterval(window.transitionParticleInterval);
        window.transitionParticleInterval = null;
    }
    
    // Usuń kontener z fade-out
    const container = document.getElementById('transition-particles');
    if (container) {
        container.style.transition = 'opacity 0.6s ease-out';
        container.style.opacity = '0';
        setTimeout(() => {
            if (container.parentNode) {
                container.remove();
            }
            window.transitionParticlesContainer = null;
        }, 600);
    }
    
    // Wyczyść promise
    window.transitionParticlesPromise = null;
}

// ===== STARE CZĄSTECZKI FADE-IN (BACKUP) =====
function createFadeInParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'fade-in-particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
    `;
    
    document.body.appendChild(particlesContainer);

    // Różne kolory złota
    const goldColors = ['#FFD700', '#FFA500', '#DAA520', '#B8860B', '#CD853F', '#F4E87C'];
    
    // Mniej cząsteczek na mobile
    const particleCount = window.innerWidth <= 768 ? 15 : 25;
    
    // Stwórz cząsteczki z różnych punktów ekranu
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => createSingleFadeParticle(particlesContainer, goldColors), i * 50);
    }
    
    // Usuń kontener po 3 sekundach
    setTimeout(() => {
        if (particlesContainer.parentNode) {
            particlesContainer.style.transition = 'opacity 0.5s ease-out';
            particlesContainer.style.opacity = '0';
            setTimeout(() => particlesContainer.remove(), 500);
        }
    }, 2500);
}

function createSingleFadeParticle(container, goldColors) {
    const particle = document.createElement('div');
    
    // Różne rozmiary i kształty cząsteczek
    const size = Math.random() * 8 + 3; // 3-11px
    const color = goldColors[Math.floor(Math.random() * goldColors.length)];
    const isCircle = Math.random() > 0.3;
    
    // Startowa pozycja - losowo z brzegów ekranu
    let startX, startY, endX, endY;
    const edge = Math.floor(Math.random() * 4);
    
    switch(edge) {
        case 0: // Góra
            startX = Math.random() * window.innerWidth;
            startY = -20;
            endX = Math.random() * window.innerWidth;
            endY = window.innerHeight / 3;
            break;
        case 1: // Prawo
            startX = window.innerWidth + 20;
            startY = Math.random() * window.innerHeight;
            endX = window.innerWidth * 2/3;
            endY = Math.random() * window.innerHeight;
            break;
        case 2: // Dół
            startX = Math.random() * window.innerWidth;
            startY = window.innerHeight + 20;
            endX = Math.random() * window.innerWidth;
            endY = window.innerHeight * 2/3;
            break;
        case 3: // Lewo
            startX = -20;
            startY = Math.random() * window.innerHeight;
            endX = window.innerWidth / 3;
            endY = Math.random() * window.innerHeight;
            break;
    }
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, ${color}FF, ${color}AA, ${color}44);
        border-radius: ${isCircle ? '50%' : '30%'};
        left: ${startX}px;
        top: ${startY}px;
        box-shadow: 
            0 0 ${size * 2}px ${color}88,
            0 0 ${size * 4}px ${color}44,
            inset 0 0 ${size}px ${color}CC;
        filter: blur(0.5px);
    `;
    
    container.appendChild(particle);
    
    // Animacja - lot do centrum i fade out
    const duration = 1500 + Math.random() * 1000;
    const rotation = Math.random() * 720 - 360;
    
    particle.animate([
        {
            transform: `translate(0, 0) rotate(0deg) scale(0)`,
            opacity: 0
        },
        {
            transform: `translate(${(endX - startX) * 0.3}px, ${(endY - startY) * 0.3}px) rotate(${rotation * 0.3}deg) scale(1)`,
            opacity: 1,
            offset: 0.3
        },
        {
            transform: `translate(${endX - startX}px, ${endY - startY}px) rotate(${rotation}deg) scale(0.8)`,
            opacity: 0.8,
            offset: 0.7
        },
        {
            transform: `translate(${endX - startX}px, ${endY - startY}px) rotate(${rotation}deg) scale(0)`,
            opacity: 0
        }
    ], {
        duration: duration,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    // Usuń cząsteczkę po animacji
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, duration);
}

// ===== SUBTELNE EFEKTY PRZEJŚCIA (OPCJONALNE) =====
// Usunięte ciężkie overlaye - teraz przejścia są czysto fade bez dodatkowych efektów
// Cząsteczki zostają tylko w hero sections dla ambient effect