// ===== BARBA.JS SETUP - PŁYNNE PRZEJŚCIA MIĘDZY STRONAMI =====

// ===== GLOBALNY CACHE DLA PREFETCH =====
window.PageCache = {};

// Lista wszystkich stron do prefetch - 100% pewności że wszystko zostanie załadowane
const ALL_PAGES = [
    '/',
    '/index.html',
    '/o_nas.html',
    '/galeria.html', 
    '/oferta.html',
    '/kontakt.html',
    '/sklep.html',
    '/polityka.html'
];

// Normalizacja URL żeby uniknąć duplikatów w cache
function normalizeUrl(url) {
    try {
        let u = new URL(url, window.location.origin);
        u.hash = '';
        u.search = '';
        return u.toString().replace(/\/$/, ''); // usuń trailing slash
    } catch {
        return url;
    }
}

// Debug functions - sprawdź co jest w cache
window.debugCache = () => {
    console.log('📦 Cache content:', Object.keys(window.PageCache));
    return window.PageCache;
};

// Test function - ręczny prefetch
window.testPrefetch = () => {
    console.log('🧪 Test prefetch...');
    prefetchAllPages();
};

// ===== PARTICLES MANAGER - ZARZĄDZANIE GLOBALNYM STANEM =====
window.ParticlesManager = {
    interval: null,
    transitionInterval: null,
    scrollListener: null,
    intersectionObserver: null,
    globalContainer: null,
    isInitialized: false,
    isCleaningUp: false
};

document.addEventListener('DOMContentLoaded', function() {
    // Sprawdź czy Barba.js jest załadowany
    if (typeof barba === 'undefined') {
        console.error('Barba.js nie został załadowany!');
        return;
    }

    // Stwórz globalny kontener tylko raz
    if (!window.ParticlesManager.isInitialized) {
        createGlobalParticlesContainer();
        window.ParticlesManager.isInitialized = true;
    }
    
    // Stwórz globalne cząsteczki
    createGlobalParticles();
    
    // ===== PREFETCH PRZENOSIMY DO HOOKA ŻEBY DOM BYŁ W PEŁNI ZAŁADOWANY =====
    // (prefetch będzie w barba.hooks.after)
    
    // ===== INICJALIZACJA BARBA.JS =====
    barba.init({
        // Custom request interceptor żeby używać naszego cache
        request: (url, trigger, action, cache) => {
            // Normalizuj URL żeby uniknąć problemów z różnymi formatami
            const key = normalizeUrl(url);
            
            // Sprawdź czy mamy w cache
            if (window.PageCache[key]) {
                console.log('🚀 Używam cache dla:', key);
                return Promise.resolve(window.PageCache[key]);
            }
            
            // Jeśli nie ma w cache, użyj standardowego fetch
            return fetch(url, { credentials: 'include' })
                .then(res => {
                    if (!res.ok) throw new Error(`Request failed: ${url}`);
                    return res.text();
                })
                .then(html => {
                    // Zapisz do cache na przyszłość (z normalizowanym kluczem)
                    window.PageCache[key] = html;
                    console.log('💾 Zapisano do cache:', key);
                    return html;
                });
        },
        
        requestError: (trigger, action, url, response) => {
            console.error('❌ Barba request error:', url, response);
        },
        
        transitions: [{
            name: 'smooth-fade',
            
            // Asynchroniczne przejście - overlapping
            sync: false,
            
            leave(data) {
                return new Promise(resolve => {
                    //console.log('🎭 Barba LEAVE: Tworzenie cząsteczek...');
                    // Stwórz cząsteczki PRZED fade-out
                    createTransitionParticles();
                    
                    // Krótkie opóźnienie żeby cząsteczki się pojawiły
                    setTimeout(() => {
                        //console.log('🎭 Barba LEAVE: Fade-out starej strony...');
                        // Fade-out starej strony
                        data.current.container.style.transition = 'opacity 0.6s ease-out';
                        data.current.container.style.opacity = '0';
                        
                        setTimeout(resolve, 600);
                    }, 200);
                });
            },
            
            enter(data) {
                return new Promise(resolve => {
                    //console.log('🎭 Barba ENTER: Przygotowanie nowej strony...');
                    // Przygotuj nową stronę (ukryta)
                    data.next.container.style.opacity = '0';
                    
                    // Fade-in nowej strony z cząsteczkami nadal widocznymi
                    setTimeout(() => {
                        //console.log('🎭 Barba ENTER: Fade-in nowej strony...');
                        data.next.container.style.transition = 'opacity 0.8s ease-in';
                        data.next.container.style.opacity = '1';
                        
                        // Usuń cząsteczki DOPIERO po fade-in nowej strony
                        setTimeout(() => {
                            //console.log('🎭 Barba ENTER: Usuwanie cząsteczek...');
                            clearTransitionParticles();
                            data.next.container.style.transition = '';
                            resolve();
                        }, 1000); // Więcej czasu na fade-in + cleanup
                    }, 100);
                });
            }
        }],
        
        // Inteligentne prefetch - 4G, Wi-Fi, bez oszczędzania danych
        prefetch: navigator.connection ? 
            (['4g', 'wifi'].includes(navigator.connection.effectiveType) && !navigator.connection.saveData) : 
            true,
        
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
        }, {
            namespace: 'shop',
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

    barba.hooks.after(() => {
        // Prefetch po pełnym załadowaniu DOM (navbar, footer, itp.)
        if (!window._barbaPrefetched) {
            console.log('� Uruchamianie prefetch po załadowaniu DOM');
            prefetchAllPages();
            window._barbaPrefetched = true;
        }
    });
});

// ===== FUNKCJE POMOCNICZE =====

// Globalny kontener na cząsteczki - POZA zasięgiem Barba.js
function createGlobalParticlesContainer() {
    // Guard - sprawdź czy już istnieje
    if (window.ParticlesManager.globalContainer && document.body.contains(window.ParticlesManager.globalContainer)) {
        //console.log('🌟 Globalny kontener już istnieje, pomijam tworzenie');
        return;
    }
    
    // Usuń stary kontener jeśli istnieje
    const existingContainer = document.getElementById('global-particles-overlay');
    if (existingContainer) {
        existingContainer.remove();
    }
    
    // Stwórz globalny kontener
    const globalContainer = document.createElement('div');
    globalContainer.id = 'global-particles-overlay';
    globalContainer.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        pointer-events: none !important;
        z-index: 999998 !important;
        overflow: hidden !important;
        display: block !important;
    `;
    
    // Dodaj do body - POZA data-barba="wrapper"
    document.body.appendChild(globalContainer);
    window.ParticlesManager.globalContainer = globalContainer;
    
    //console.log('🌟 Globalny kontener cząsteczek utworzony:', globalContainer.id);
    
    // Debug - sprawdź czy kontener przetrwa Barba przejścia
    const observer = new MutationObserver(() => {
        if (!document.body.contains(globalContainer)) {
            console.error('❌ Globalny kontener został usunięty z DOM!');
            window.ParticlesManager.globalContainer = null;
        }
    });
    observer.observe(document.body, { childList: true });
}

// Czyszczenie strony przed opuszczeniem
function cleanupPage() {
    const manager = window.ParticlesManager;
    manager.isCleaningUp = true;
    
    // Wyczyść timery cząsteczek
    if (manager.interval) {
        clearInterval(manager.interval);
        manager.interval = null;
    }
    
    // Wyczyść cząsteczki przejścia
    if (manager.transitionInterval) {
        clearInterval(manager.transitionInterval);
        manager.transitionInterval = null;
    }
    
    // Usuń scroll listenery
    if (manager.scrollListener) {
        window.removeEventListener('scroll', manager.scrollListener);
        manager.scrollListener = null;
    }
    
    // Wyczyść intersection observer
    if (manager.intersectionObserver) {
        manager.intersectionObserver.disconnect();
        manager.intersectionObserver = null;
    }
    
    // Wyczyść tylko cząsteczki przejścia - NIE globalny kontener
    const globalContainer = manager.globalContainer || document.getElementById('global-particles-overlay');
    if (globalContainer) {
        const transitionParticles = globalContainer.querySelector('#transition-particles');
        if (transitionParticles) {
            transitionParticles.remove();
        }
    }
    
    // Wyczyść inne efekty
    const otherContainers = document.querySelectorAll('.fade-in-particles, .barba-overlay, .barba-smoke');
    otherContainers.forEach(el => el.remove());
    
    // Reset flagi cleanup po zakończeniu
    setTimeout(() => {
        manager.isCleaningUp = false;
    }, 200);
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
    const manager = window.ParticlesManager;
    
    // Usuń stare cząsteczki jeśli istnieją
    const existingContainer = document.getElementById('particles-container');
    if (existingContainer) {
        if (manager.interval) {
            clearInterval(manager.interval);
            manager.interval = null;
        }
        // Usuń scroll listener jeśli istnieje
        if (manager.scrollListener) {
            window.removeEventListener('scroll', manager.scrollListener);
            manager.scrollListener = null;
        }
        // Usuń intersection observer
        if (manager.intersectionObserver) {
            manager.intersectionObserver.disconnect();
            manager.intersectionObserver = null;
        }
        existingContainer.remove();
    }
    
    // Stwórz nowe cząsteczki z małym opóźnieniem - z guardem
    setTimeout(() => {
        // Guard - sprawdź czy DOM nadal istnieje i czy nie ma cleanup w trakcie
        if (document.body && !window.ParticlesManager.isCleaningUp) {
            createGlobalParticles();
        }
    }, 100);
}

// ===== GLOBALNE CZĄSTECZKI ZŁOTA - HERO SECTION + FALLBACK =====
function createGlobalParticles() {
    // Usuń stary kontener jeśli istnieje
    const existingContainer = document.getElementById('particles-container');
    if (existingContainer) {
        existingContainer.remove();
    }

    // Znajdź hero section na aktualnej stronie
    const heroSection = document.querySelector('.hero-section');
    
    if (!heroSection) {
        //console.log('Brak hero section - tworzę subtelne cząsteczki tła');
        createFallbackParticles();
        return;
    }

    // Pozycjonowanie względem hero section - unika problemów z reflow
    const heroHeight = heroSection.offsetHeight;
    
    // Ustaw hero section jako relative jeśli nie jest
    const heroStyle = window.getComputedStyle(heroSection);
    if (heroStyle.position === 'static') {
        heroSection.style.position = 'relative';
    }

    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particles-container';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    // Dodaj bezpośrednio do hero section zamiast body
    heroSection.appendChild(particlesContainer);

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
        
        // Cząsteczki startują z samego dołu jak iskierki z ognia
        particle.style.cssText = `
            position: absolute;
            width: ${width}px;
            height: ${height}px;
            background: linear-gradient(45deg, ${color}, ${color}AA);
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
            box-shadow: 0 0 ${width * 2}px ${color}66, 0 0 ${width * 4}px ${color}33;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 10 + 90}%;
            pointer-events: none;
            transform: rotate(${rotation}deg);
        `;

        container.appendChild(particle);

        // Animacja iskierek - jak iskry nad ogniskiem (szybki start, potem kołysanie)
        const duration = Math.random() * 6000 + 5000; // Dłużej, 5-11 sekund
        const horizontalDrift = (Math.random() - 0.5) * 120; // Więcej bujania na boki
        const wavyMotion = Math.random() * 40 + 20; // Falujący ruch
        const spin = Math.random() * 360; // Pełny obrót

        particle.animate([
            {
                transform: `translateY(0px) translateX(0px) rotate(${rotation}deg) scale(0)`,
                opacity: 0
            },
            {
                // Szybki start w górę
                transform: `translateY(-8vh) translateX(${horizontalDrift * 0.1}px) rotate(${rotation + spin * 0.1}deg) scale(1)`,
                opacity: 1,
                offset: 0.15
            },
            {
                // Zwalnianie i zaczynanie kołysania
                transform: `translateY(-25vh) translateX(${horizontalDrift * 0.4 + Math.sin(1) * wavyMotion}px) rotate(${rotation + spin * 0.3}deg) scale(0.9)`,
                opacity: 0.9,
                offset: 0.35
            },
            {
                // Kołysanie w środku lotu
                transform: `translateY(-45vh) translateX(${horizontalDrift * 0.7 + Math.sin(2) * wavyMotion}px) rotate(${rotation + spin * 0.6}deg) scale(0.8)`,
                opacity: 0.7,
                offset: 0.6
            },
            {
                // Więcej kołysania i zwalnianie
                transform: `translateY(-65vh) translateX(${horizontalDrift * 0.9 + Math.sin(3) * wavyMotion * 0.8}px) rotate(${rotation + spin * 0.8}deg) scale(0.6)`,
                opacity: 0.5,
                offset: 0.8
            },
            {
                // Delikatne wygaszanie na górze
                transform: `translateY(-75vh) translateX(${horizontalDrift + Math.sin(4) * wavyMotion * 0.5}px) rotate(${rotation + spin}deg) scale(0.3)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)', // Start szybki, potem spowolnienie
            composite: 'replace'
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

    // Ciągle dodawaj nowe cząsteczki - częściej dla lepszego efektu iskier
    window.ParticlesManager.interval = setInterval(() => {
        createParticle();
    }, 800);
    
    // REUŻYWALNY INTERSECTION OBSERVER
    const manager = window.ParticlesManager;
    
    // Wyczyść stary observer jeśli istnieje
    if (manager.intersectionObserver) {
        manager.intersectionObserver.disconnect();
    }
    
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && Math.random() < 0.4) {
                // Hero section jest widoczny - dodaj dodatkowe cząsteczki
                for (let i = 0; i < 2; i++) {
                    setTimeout(() => createParticle(), i * 200);
                }
            }
        });
    };
    
    manager.intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);
    manager.intersectionObserver.observe(heroSection);
}

// ===== FALLBACK CZĄSTECZKI DLA STRON BEZ HERO SECTION =====
function createFallbackParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particlesContainer);

    // Bardzo subtelne cząsteczki tła - mniej i mniejsze
    const particleCount = window.innerWidth <= 768 ? 3 : 5;

    function createSubtleParticle() {
        const container = document.getElementById('particles-container');
        if (!container) return;
        
        const particle = document.createElement('div');
        particle.className = 'subtle-particle';
        
        // Małe, subtelne iskierki
        const size = Math.random() * 3 + 1; // 1-4px
        const shades = ['#FFD700', '#DAA520', '#B8860B'];
        const color = shades[Math.floor(Math.random() * shades.length)];
        
        // Losowa pozycja na całym ekranie
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color}66;
            border-radius: 50%;
            box-shadow: 0 0 ${size * 2}px ${color}33;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
        `;

        container.appendChild(particle);

        // Bardzo powolna animacja
        const duration = Math.random() * 15000 + 10000;
        const drift = (Math.random() - 0.5) * 100;

        particle.animate([
            {
                transform: `translateY(0px) translateX(0px)`,
                opacity: 0
            },
            {
                transform: `translateY(-50px) translateX(${drift/2}px)`,
                opacity: 0.3,
                offset: 0.2
            },
            {
                transform: `translateY(-150px) translateX(${drift}px)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'ease-out',
            composite: 'replace'
        });

        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, duration);
    }

    // Stwórz początkowe cząsteczki
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => createSubtleParticle(), i * 1000);
    }

    // Bardzo rzadko dodawaj nowe
    window.ParticlesManager.interval = setInterval(() => {
        if (Math.random() < 0.3) {
            createSubtleParticle();
        }
    }, 3000);
}

// ===== CZĄSTECZKI PRZEJŚCIA - WIDOCZNE POD CZAS ŁADOWANIA =====
function createTransitionParticles() {
    //console.log('✨ Tworzenie cząsteczek przejścia...');
    
    // Sprawdź czy globalny kontener istnieje
    const globalContainer = window.ParticlesManager.globalContainer || document.getElementById('global-particles-overlay');
    if (!globalContainer) {
        console.error('❌ Brak globalnego kontenera cząsteczek!');
        createGlobalParticlesContainer();
        return;
    }
    
    // Usuń stare cząsteczki przejścia jeśli istnieją
    const existingParticles = globalContainer.querySelector('#transition-particles');
    if (existingParticles) {
        //console.log('✨ Usuwanie starych cząsteczek...');
        existingParticles.remove();
    }
    
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'transition-particles';
    particlesContainer.className = 'transition-particles';
    particlesContainer.style.cssText = `
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        pointer-events: none !important;
        z-index: 10 !important;
        overflow: hidden !important;
        background: rgba(0, 0, 0, 0.3) !important;
        display: block !important;
    `;
    
    // Dodaj do GLOBALNEGO kontenera - nie do body!
    globalContainer.appendChild(particlesContainer);

    // Różne kolory złota
    const goldColors = ['#FFD700', '#FFA500', '#DAA520', '#B8860B', '#CD853F', '#F4E87C'];
    
    // Więcej cząsteczek na dłużej
    const particleCount = window.innerWidth <= 768 ? 25 : 40;
    
    // Stwórz cząsteczki natychmiast
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => createLongTransitionParticle(particlesContainer, goldColors), i * 50);
    }
    
    // Kontynuuj tworzenie cząsteczek przez czas przejścia
    const particleInterval = setInterval(() => {
        if (document.getElementById('transition-particles')) {
            for (let i = 0; i < 4; i++) {
                createLongTransitionParticle(particlesContainer, goldColors);
            }
        } else {
            clearInterval(particleInterval);
        }
    }, 500);
    
    window.ParticlesManager.transitionInterval = particleInterval;
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
        iterations: 1,
        composite: 'replace'
    });
    
    // Usuń cząsteczkę po animacji
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, duration);
}

function clearTransitionParticles() {
    //console.log('🧹 Czyszczenie cząsteczek przejścia...');
    const manager = window.ParticlesManager;
    
    // Wyczyść interval
    if (manager.transitionInterval) {
        clearInterval(manager.transitionInterval);
        manager.transitionInterval = null;
    }
    
    // Szukaj kontenera w globalnym kontenerze
    const globalContainer = manager.globalContainer || document.getElementById('global-particles-overlay');
    const container = globalContainer?.querySelector('#transition-particles');
    
    if (container) {
        //console.log('🧹 Płynne fade-out cząsteczek i overlayu...');
        // Szybszy fade-out dla lepszej responsywności
        container.style.transition = 'opacity 0.4s ease-out';
        container.style.opacity = '0';
        
        setTimeout(() => {
            if (container.parentNode) {
                //console.log('🧹 Usuwanie kontenera cząsteczek z globalnego kontenera');
                container.remove();
            }
        }, 400); // Skrócony czas dla szybszego przejścia
    } else {
        //console.log('🧹 Brak kontenera cząsteczek do usunięcia');
    }
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
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        composite: 'replace'
    });
    
    // Usuń cząsteczkę po animacji
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, duration);
}

// ===== PREFETCH WSZYSTKICH STRON DLA BŁYSKAWICZNYCH PRZEJŚĆ =====
function prefetchAllPages() {
    // Używamy stałej listy wszystkich stron zamiast szukać w DOM
    const links = ALL_PAGES;

    console.log('� Rozpoczynam prefetch wszystkich stron:', links);

    // Sekwencyjne ściąganie z małymi opóźnieniami żeby nie przeciążyć serwera
    links.forEach((url, index) => {
        setTimeout(() => {
            const key = normalizeUrl(url);
            
            // Sprawdź czy już nie mamy w cache
            if (window.PageCache[key]) {
                console.log(`⚡ Już w cache: ${key}`);
                return;
            }
            
            fetch(url, { credentials: 'include' })
                .then(res => {
                    if (!res.ok) throw new Error(`Prefetch failed: ${url}`);
                    return res.text();
                })
                .then(html => {
                    // Zapisz do naszego cache z normalizowanym kluczem
                    window.PageCache[key] = html;
                    console.log(`✅ Prefetched (${index + 1}/${links.length}): ${key}`);
                })
                .catch(err => console.warn('⚠️ Prefetch error:', err));
        }, index * 200); // 200ms między requestami
    });
}

// ===== SUBTELNE EFEKTY PRZEJŚCIA (OPCJONALNE) =====
// Usunięte ciężkie overlaye - teraz przejścia są czysto fade bez dodatkowych efektów
// Cząsteczki zostają tylko w hero sections dla ambient effect