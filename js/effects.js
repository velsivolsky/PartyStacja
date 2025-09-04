// ===== EFEKTY PRZEJŚCIA MIĘDZY STRONAMI =====
function createPageTransitionEffect() {
    // Złoty dym/mgła
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    document.body.appendChild(overlay);
    
    // Aktywuj overlay natychmiast
    setTimeout(() => {
        overlay.classList.add('active');
    }, 10);
    
    // Wykryj czy to urządzenie mobilne
    const isMobile = window.innerWidth <= 768;
    
    // Kontener na dym
    const smokeContainer = document.createElement('div');
    smokeContainer.className = 'smoke-container';
    document.body.appendChild(smokeContainer);
    
    // Mniej cząsteczek dymu na mobile
    const smokeCount = isMobile ? 8 : 15;
    const smokeDelay = isMobile ? 100 : 80;
    
        // Stwórz cząsteczki dymu
        for (let i = 0; i < smokeCount; i++) {
            setTimeout(() => {
                createSmokeParticle(smokeContainer);
            }, i * smokeDelay);
        }    // Aktywuj overlay
    setTimeout(() => {
        overlay.classList.add('active');
    }, 50);
    
    // Stwórz złote fale
    createGoldenWaves(isMobile);
    
    // Eksplozja cząsteczek
    setTimeout(() => {
        createTransitionBurst(isMobile);
    }, 300);
    
    // Usuń efekty po czasie
    setTimeout(() => {
        overlay.remove();
        smokeContainer.remove();
    }, 1800);
}

function createSmokeParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'smoke-particle';
    
    const size = Math.random() * 30 + 20;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    container.appendChild(particle);
    
    // Animacja dymu
    particle.animate([
        {
            transform: 'scale(0) rotate(0deg)',
            opacity: 0
        },
        {
            transform: 'scale(1) rotate(180deg)',
            opacity: 0.6,
            offset: 0.3
        },
        {
            transform: 'scale(2.5) rotate(360deg)',
            opacity: 0
        }
    ], {
        duration: 2200,
        easing: 'ease-out'
    });
}

function createGoldenWaves(isMobile = false) {
    const waveCount = isMobile ? 2 : 3;
    const waveDelay = isMobile ? 400 : 300;
    
    for (let i = 0; i < waveCount; i++) {
        setTimeout(() => {
            const wave = document.createElement('div');
            wave.className = 'golden-wave';
            document.body.appendChild(wave);
            
            setTimeout(() => {
                wave.classList.add('active');
            }, 50);
            
            setTimeout(() => {
                wave.remove();
            }, 1500);
        }, i * waveDelay);
    }
}

function createTransitionBurst(isMobile = false) {
    const burst = document.createElement('div');
    burst.className = 'transition-burst';
    document.body.appendChild(burst);
    
    const goldColors = ['#FFD700', '#D4AF37', '#DAA520', '#F0E68C', '#CFB53B'];
    const particleCount = isMobile ? 12 : 24;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'burst-particle';
        
        const color = goldColors[Math.floor(Math.random() * goldColors.length)];
        particle.style.background = `radial-gradient(circle, ${color}, transparent)`;
        particle.style.boxShadow = `0 0 6px ${color}`;
        
        burst.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const distance = isMobile ? Math.random() * 200 + 150 : Math.random() * 300 + 200;
        
        particle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 1200,
            easing: 'ease-out'
        });
    }
    
    setTimeout(() => {
        burst.remove();
    }, 1200);
}

// ===== SPA - PŁYNNA WYMIANA ZAWARTOŚCI =====
async function loadPageContent(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const parser = new DOMParser();
        const newDoc = parser.parseFromString(html, 'text/html');
        
        // Wyciągnij główną zawartość (wszystko w body oprócz skryptów)
        const newBody = newDoc.body.cloneNode(true);
        
        // Usuń stare skrypty żeby nie duplikować
        const oldScripts = newBody.querySelectorAll('script');
        oldScripts.forEach(script => script.remove());
        
        return {
            title: newDoc.title,
            body: newBody,
            url: url
        };
    } catch (error) {
        console.error('Błąd ładowania strony:', error);
        return null;
    }
}

// ===== OBSŁUGA PRZEJŚĆ MIĘDZY STRONAMI =====
function initPageTransitions() {
    // Cache dla załadowanych stron
    const pageCache = new Map();
    
    // Usuń stare event listenery jeśli istnieją
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.replaceWith(link.cloneNode(true));
    });
    
    // Obsługa wszystkich linków do innych stron
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener('click', async function(e) {
            e.preventDefault();
            
            // Sprawdź czy już trwa jakieś przejście
            if (document.querySelector('.page-transition-overlay')) {
                return; // Ignoruj kliknięcia podczas przejścia
            }
            
            const href = this.getAttribute('href');
            
            // Sprawdź czy strona jest w cache
            let pageData = pageCache.get(href);
            
            // Jeśli nie ma w cache, załaduj teraz
            if (!pageData) {
                pageData = await loadPageContent(href);
                if (pageData) {
                    pageCache.set(href, pageData);
                }
            }
            
            if (!pageData) {
                // Fallback do normalnej nawigacji
                window.location.href = href;
                return;
            }
            
            // Uruchom efekt przejścia
            createPageTransitionEffect();
            
            // Dodaj fade-out do body
            document.body.classList.add('fade-out');
            
            // Wymień zawartość W POŁOWIE animacji (podczas mgły)
            setTimeout(() => {
                // Wymień zawartość bez przeładowania strony!
                document.title = pageData.title;
                
                // Zachowaj efekty cząsteczek
                const particles = document.getElementById('particles-container');
                
                // Wymień całą zawartość body
                document.body.innerHTML = pageData.body.innerHTML;
                
                // Przywróć cząsteczki
                if (particles) {
                    document.body.appendChild(particles);
                }
                
                // Zaktualizuj URL w przeglądarce
                history.pushState({ page: href }, pageData.title, href);
                
                // Usuń fade-out i dodaj fade-in
                document.body.classList.remove('fade-out');
                document.body.classList.add('fade-in');
                
                // Uruchom ponownie inicjalizację po zmianie zawartości
                setTimeout(() => {
                    initPageTransitions(); // Re-bind event listeners
                    initActiveLink(); // Zaktualizuj aktywny link
                    
                    // Jeśli są efekty specyficzne dla strony, uruchom je
                    if (typeof initCarousel === 'function') initCarousel();
                    if (typeof initMascots === 'function') initMascots();
                    
                    document.body.classList.remove('fade-in');
                }, 100);
                
            }, 600);
            
            // WAŻNE: Usuń overlay i efekty po pełnej animacji
            setTimeout(() => {
                const overlay = document.querySelector('.page-transition-overlay');
                const smokeContainer = document.querySelector('.smoke-container');
                if (overlay) {
                    overlay.remove();
                    console.log('Overlay usunięty');
                }
                if (smokeContainer) {
                    smokeContainer.remove();
                    console.log('Smoke container usunięty');
                }
            }, 2500);
        });
    });
    
    // Obsługa przycisku "wstecz" w przeglądarce
    window.addEventListener('popstate', function(e) {
        if (e.state && e.state.page) {
            location.reload(); // Dla uproszczenia, przeładuj przy cofaniu
        }
    });
}

// ===== ZŁOTE CZĄSTECZKI =====
let particleContainer;

function createParticlesContainer() {
    particleContainer = document.createElement('div');
    particleContainer.className = 'particles-container';
    document.body.appendChild(particleContainer);
}

function createSingleParticle() {
    if (!particleContainer) return;
    
    const goldClasses = ['gold-1', 'gold-2', 'gold-3', 'gold-4', 'gold-5'];
    const particle = document.createElement('div');
    const goldClass = goldClasses[Math.floor(Math.random() * goldClasses.length)];
    
    particle.className = `particle ${goldClass}`;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = '0s';
    particle.style.animationDuration = (Math.random() * 4 + 8) + 's';
    
    particleContainer.appendChild(particle);
    
    // Usuń cząsteczkę po zakończeniu animacji
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, (Math.random() * 4 + 8) * 1000 + 1000);
}

function initParticleSystem() {
    createParticlesContainer();
    
    // Wykryj czy to urządzenie mobilne
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 15 : 30;
    const particleInterval = isMobile ? 1200 : 800;
    
    // Stwórz początkowy zestaw cząsteczek
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            createSingleParticle();
        }, Math.random() * 5000);
    }
    
    // Ciągłe dodawanie nowych cząsteczek
    setInterval(() => {
        createSingleParticle();
    }, particleInterval);
}

// ===== INICJALIZACJA =====
document.addEventListener('DOMContentLoaded', function() {
    // Opóźnienie dla lepszej wydajności
    setTimeout(() => {
        initParticleSystem();
        initPageTransitions();
    }, 500);
});

// ===== EASTER EGG - Złote konfetti przy kliknięciu logo =====
function createConfetti(x, y) {
    const goldColors = ['#FFD700', '#D4AF37', '#DAA520', '#F0E68C', '#CFB53B'];
    
    for (let i = 0; i < 15; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.width = Math.random() * 4 + 3 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.background = goldColors[Math.floor(Math.random() * goldColors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.boxShadow = `0 0 6px ${goldColors[Math.floor(Math.random() * goldColors.length)]}`;
        
        const angle = (Math.PI * 2 * i) / 15;
        const velocity = Math.random() * 300 + 150;
        
        document.body.appendChild(confetti);
        
        confetti.animate([
            { 
                transform: 'translate(0, 0) scale(1) rotate(0deg)', 
                opacity: 1 
            },
            { 
                transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity + 300}px) scale(0) rotate(${Math.random() * 360}deg)`, 
                opacity: 0 
            }
        ], {
            duration: 1500,
            easing: 'ease-out'
        }).onfinish = () => confetti.remove();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('img[alt*="Logo"]');
    if (logo) {
        logo.addEventListener('click', (e) => {
            const rect = e.target.getBoundingClientRect();
            createConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
        });
        
        // Dodaj kursor pointer do logo
        logo.style.cursor = 'pointer';
        logo.style.transition = 'transform 0.2s ease';
        
        // Hover effect na logo
        logo.addEventListener('mouseenter', () => {
            logo.style.transform = 'scale(1.05)';
        });
        
        logo.addEventListener('mouseleave', () => {
            logo.style.transform = 'scale(1)';
        });
    }
});

// ===== INICJALIZACJA PO ZAŁADOWANIU STRONY =====
document.addEventListener('DOMContentLoaded', function() {
    // Dodaj fade-in na start
    document.body.classList.add('fade-in');
    setTimeout(() => {
        document.body.classList.remove('fade-in');
    }, 3000);
    
    // Inicjalizuj wszystkie efekty
    createGlobalParticles();
    initPageTransitions();
});
