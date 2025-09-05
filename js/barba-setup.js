// ===== BARBA.JS SETUP - PŁYNNE PRZEJŚCIA MIĘDZY STRONAMI =====

document.addEventListener('DOMContentLoaded', function() {
    // Sprawdź czy Barba.js jest załadowany
    if (typeof barba === 'undefined') {
        console.error('Barba.js nie został załadowany!');
        // Ukryj loader jeśli istnieje
        const loader = document.getElementById('page-loader');
        if (loader) loader.style.display = 'none';
        return;
    }

    // Stwórz globalne cząsteczki po załadowaniu
    createGlobalParticles();
    
    // ===== INICJALIZACJA BARBA.JS =====
    barba.init({
        // Włącz prefetch dla lepszej wydajności
        prefetch: true,
        
        transitions: [{
            name: 'gold-fade',
            sync: true, // Ważne - zapobiega nakładaniu się przejść
            
            // Przed przejściem - ukryj nową zawartość
            beforeEnter(data) {
                console.log('beforeEnter - przygotowuję nową stronę:', data.next.url);
                data.next.container.style.opacity = '0';
                data.next.container.style.transform = 'translateY(20px)';
                data.next.container.style.transition = 'none'; // Wyłącz transition początkowo
            },
            
            leave(data) {
                console.log('Leave transition started for:', data.current.url);
                return new Promise(resolve => {
                    // Stwórz mgłę NATYCHMIAST - bez opóźnienia
                    const { overlay, smokeContainer } = createTransitionEffect();
                    
                    // Ukryj starą zawartość pod mgłą (po krótkim czasie)
                    setTimeout(() => {
                        data.current.container.style.transition = 'opacity 0.3s ease-out';
                        data.current.container.style.opacity = '0';
                        
                        // Rozwiąż szybko żeby nowa strona mogła się załadować
                        setTimeout(() => {
                            console.log('Leave transition completed - content hidden under fog');
                            resolve();
                        }, 300);
                    }, 400); // Poczekaj 400ms żeby mgła się ustabilizowała
                });
            },
            
            enter(data) {
                console.log('Enter transition started for:', data.next.url);
                return new Promise(resolve => {
                    // Nowa zawartość ładuje się pod mgłą (niewidocznie)
                    setTimeout(() => {
                        data.next.container.style.transition = 'opacity 0.5s ease-in-out';
                        data.next.container.style.opacity = '1';
                        data.next.container.style.transform = 'translateY(0)';
                        
                        console.log('New content loaded under fog');
                        
                        // Ukryj loader
                        const loader = document.getElementById('page-loader');
                        if (loader) loader.style.display = 'none';
                        
                        // WAŻNE: Mgła znika dopiero po 1.5s całkowitego czasu
                        setTimeout(() => {
                            const overlay = document.querySelector('.barba-overlay');
                            const smokeContainer = document.querySelector('.barba-smoke');
                            
                            if (overlay) {
                                overlay.style.transition = 'opacity 0.5s ease-out';
                                overlay.style.opacity = '0';
                                setTimeout(() => overlay.remove(), 500);
                            }
                            if (smokeContainer) {
                                smokeContainer.style.transition = 'opacity 0.5s ease-out';
                                smokeContainer.style.opacity = '0';
                                setTimeout(() => smokeContainer.remove(), 500);
                            }
                            
                            console.log('Fog cleared - transition completed');
                            resolve();
                        }, 1500); // Mgła trwa 1.5s od początku przejścia
                    }, 800); // Nowa zawartość gotowa pod mgłą
                });
            },
            
            // Once method to handle initial page load
            once(data) {
                console.log('Once - początkowe ładowanie strony:', data.next.url);
                return new Promise(resolve => {
                    // Ukryj loader jeśli istnieje
                    const loader = document.getElementById('page-loader');
                    if (loader) {
                        loader.style.transition = 'opacity 0.8s ease-in-out';
                        loader.style.opacity = '0';
                        setTimeout(() => {
                            loader.style.display = 'none';
                        }, 800);
                    }
                    
                    // Upewnij się, że zawartość jest widoczna
                    data.next.container.style.opacity = '1';
                    data.next.container.style.transform = 'translateY(0)';
                    
                    resolve();
                });
            }
        }],
        
        // Callbacks dla różnych stron
        views: [{
            namespace: 'home',
            afterEnter() {
                console.log('Strona główna załadowana');
                refreshParticles();
            }
        }, {
            namespace: 'gallery', 
            afterEnter() {
                console.log('Galeria załadowana');
                if (typeof initCarousel === 'function') initCarousel();
                refreshParticles();
            }
        }, {
            namespace: 'about',
            afterEnter() {
                console.log('O nas załadowana');
                refreshParticles();
            }
        }, {
            namespace: 'offer',
            afterEnter() {
                console.log('Oferta załadowana');
                refreshParticles();
            }
        }, {
            namespace: 'contact',
            afterEnter() {
                console.log('Kontakt załadowany');
                refreshParticles();
            }
        }]
    });

    // Odśwież cząsteczki po przejściu
    barba.hooks.afterEnter(() => {
        refreshParticles();
    });
});

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
    
    // Stwórz nowe cząsteczki z opóźnieniem żeby DOM był gotowy
    setTimeout(() => {
        createGlobalParticles();
    }, 200);
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
        
        const size = Math.random() * 4 + 2;
        const shades = ['#FFD700', '#FFA500', '#DAA520', '#B8860B', '#CD853F'];
        const color = shades[Math.floor(Math.random() * shades.length)];
        
        // Cząsteczki pojawiają się na dole hero section
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            box-shadow: 0 0 ${size * 2}px ${color};
            left: ${Math.random() * 100}%;
            top: ${heroHeight}px;
            pointer-events: none;
        `;

        container.appendChild(particle);

        // Animacja cząsteczki - od dołu hero section do góry
        const duration = Math.random() * 8000 + 6000;
        const drift = (Math.random() - 0.5) * 200;

        particle.animate([
            {
                transform: `translateY(0px) translateX(0px)`,
                opacity: 0
            },
            {
                transform: `translateY(-${heroHeight * 0.2}px) translateX(${drift/4}px)`,
                opacity: 0.6,
                offset: 0.1
            },
            {
                transform: `translateY(-${heroHeight + 100}px) translateX(${drift}px)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'linear'
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

// ===== EFEKT PRZEJŚCIA - ZOPTYMALIZOWANY =====
function createTransitionEffect() {
    // Overlay - NATYCHMIAST widoczny, bez transition
    const overlay = document.createElement('div');
    overlay.className = 'barba-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: radial-gradient(ellipse at center, 
            rgba(255, 215, 0, 0.3) 0%,
            rgba(212, 175, 55, 0.25) 30%,
            rgba(184, 134, 11, 0.2) 50%,
            rgba(0, 0, 0, 0.9) 80%,
            rgba(0, 0, 0, 0.95) 100%);
        z-index: 10000;
        pointer-events: none;
        opacity: 1;
    `;
    document.body.appendChild(overlay);

    // Cząsteczki mgły - gęstsze i trwalsze
    const smokeContainer = document.createElement('div');
    smokeContainer.className = 'barba-smoke';
    smokeContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 10001;
        overflow: hidden;
    `;
    document.body.appendChild(smokeContainer);

    // Więcej cząsteczek mgły dla lepszego maskowania
    const particleCount = window.innerWidth <= 768 ? 10 : 20;
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => createSmokeParticle(smokeContainer), i * 50);
    }

    return { overlay, smokeContainer };
}

function createSmokeParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 50 + 40; // Większe cząsteczki
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.4), rgba(255, 215, 0, 0.08));
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        will-change: transform, opacity;
    `;
    
    container.appendChild(particle);

    // Długa animacja dla lepszego maskowania
    particle.animate([
        { transform: 'scale(0) rotate(0deg)', opacity: 0 },
        { transform: 'scale(1) rotate(120deg)', opacity: 0.8, offset: 0.2 },
        { transform: 'scale(1.5) rotate(240deg)', opacity: 0.8, offset: 0.7 },
        { transform: 'scale(2.5) rotate(360deg)', opacity: 0 }
    ], {
        duration: 3000, // Długa animacja
        easing: 'ease-out'
    });

    // Usuń cząsteczkę po animacji
    setTimeout(() => particle.remove(), 3000);
}