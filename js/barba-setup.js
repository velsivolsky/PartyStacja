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
                    // Pokaż loader
                    const loader = document.getElementById('page-loader');
                    if (loader) loader.style.display = 'flex';
                    
                    // Stwórz efekty wizualne przejścia
                    const { overlay, smokeContainer } = createTransitionEffect();
                    
                    // Animacja wyjścia - płynne zanikanie
                    data.current.container.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                    data.current.container.style.opacity = '0';
                    data.current.container.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        console.log('Leave transition completed');
                        resolve();
                    }, 600);
                });
            },
            
            enter(data) {
                console.log('Enter transition started for:', data.next.url);
                return new Promise(resolve => {
                    // Poczekaj chwilę przed pokazaniem nowej zawartości
                    setTimeout(() => {
                        // Włącz transition dla nowej zawartości
                        data.next.container.style.transition = 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out';
                        
                        // Animacja wejścia - płynne pojawianie się
                        requestAnimationFrame(() => {
                            data.next.container.style.opacity = '1';
                            data.next.container.style.transform = 'translateY(0)';
                        });
                        
                        // Ukryj loader po zakończeniu animacji
                        setTimeout(() => {
                            const loader = document.getElementById('page-loader');
                            if (loader) loader.style.display = 'none';
                            
                            // Usuń efekty przejścia
                            const overlay = document.querySelector('.barba-overlay');
                            const smokeContainer = document.querySelector('.barba-smoke');
                            if (overlay) overlay.remove();
                            if (smokeContainer) smokeContainer.remove();
                            
                            console.log('Enter transition completed');
                            resolve();
                        }, 800);
                    }, 300); // Krótkie opóźnienie
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

// ===== EFEKT PRZEJŚCIA =====
function createTransitionEffect() {
    // Overlay
    const overlay = document.createElement('div');
    overlay.className = 'barba-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: radial-gradient(ellipse at center, 
            rgba(255, 215, 0, 0.4) 0%,
            rgba(212, 175, 55, 0.3) 30%,
            rgba(184, 134, 11, 0.2) 50%,
            rgba(0, 0, 0, 0.85) 80%,
            rgba(0, 0, 0, 0.95) 100%);
        z-index: 9999;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.4s ease-in-out;
    `;
    document.body.appendChild(overlay);

    // Aktywuj overlay
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
    });

    // Cząsteczki mgły
    const smokeContainer = document.createElement('div');
    smokeContainer.className = 'barba-smoke';
    smokeContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 10000;
        overflow: hidden;
    `;
    document.body.appendChild(smokeContainer);

    // Stwórz cząsteczki mgły
    const particleCount = window.innerWidth <= 768 ? 8 : 15;
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => createSmokeParticle(smokeContainer), i * 80);
    }

    return { overlay, smokeContainer };
}

function createSmokeParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 40 + 30;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.4), rgba(255, 215, 0, 0.1));
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
    `;
    
    container.appendChild(particle);

    particle.animate([
        { transform: 'scale(0) rotate(0deg)', opacity: 0 },
        { transform: 'scale(1) rotate(180deg)', opacity: 0.8, offset: 0.2 },
        { transform: 'scale(1.5) rotate(270deg)', opacity: 0.8, offset: 0.7 },
        { transform: 'scale(2.5) rotate(360deg)', opacity: 0 }
    ], {
        duration: 3000,
        easing: 'ease-out'
    });

    // Usuń cząsteczkę po dłuższej animacji
    setTimeout(() => particle.remove(), 3000);
}