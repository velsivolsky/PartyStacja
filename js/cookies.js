// ===== COOKIES MODAL MANAGEMENT =====

// Zarządzanie stanem cookies
window.CookiesManager = {
    isLoaded: false,
    consent: null,
    
    // Domyślne ustawienia
    settings: {
        necessary: true,
        analytics: false,
        marketing: false
    }
};

// Ładowanie modala cookies (fetch z cookies-modal.html)
function loadCookiesModal() {
    // Sprawdź czy jesteśmy na stronie polityki prywatności
    const currentPage = window.location.pathname;
    const isPolicyPage = currentPage.includes('polityka.html') || currentPage.includes('polityka');
    
    if (isPolicyPage) {
        console.log('🍪 Strona polityki - nie ładuję modala cookies');
        return Promise.resolve();
    }
    
    if (window.CookiesManager.isLoaded) {
        console.log('🍪 Cookies modal już załadowany');
        return Promise.resolve();
    }
    
    // Sprawdź czy modal już istnieje w DOM
    const existingModal = document.getElementById('cookies-modal');
    if (existingModal) {
        console.log('🍪 Modal już w DOM, inicjalizuję eventy');
        initCookiesEvents();
        initBackdropEvents();
        initKeyboardEvents();
        checkExistingConsent();
        window.CookiesManager.isLoaded = true;
        return Promise.resolve();
    }
    
    // Fetch modal HTML
    return fetch('cookies-modal.html')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            return response.text();
        })
        .then(html => {
            console.log('🍪 Załadowano HTML modala, dodaję do DOM');
            
            // Dodaj modal do body (na początku)
            document.body.insertAdjacentHTML('afterbegin', html);
            
            // Sprawdź czy modal został dodany
            const modal = document.getElementById('cookies-modal');
            if (!modal) {
                throw new Error('Modal nie został znaleziony po dodaniu do DOM');
            }
            
            console.log('🍪 Modal dodany do DOM, inicjalizuję eventy');
            
            // Inicjalizuj eventy
            initCookiesEvents();
            initBackdropEvents();
            initKeyboardEvents();
            
            // Sprawdź czy użytkownik już wyraził zgodę
            checkExistingConsent();
            
            window.CookiesManager.isLoaded = true;
            console.log('🍪 Cookies modal w pełni załadowany i gotowy');
        })
        .catch(error => {
            console.error('❌ Błąd ładowania cookies modal:', error);
            console.error('❌ URL:', window.location.href);
            console.error('❌ Sprawdź czy plik cookies-modal.html istnieje');
        });
}

// Sprawdzenie istniejącej zgody
function checkExistingConsent() {
    console.log('🍪 Sprawdzanie istniejącej zgody...');
    
    // Sprawdź czy jesteśmy na stronie polityki prywatności
    const currentPage = window.location.pathname;
    const isPolicyPage = currentPage.includes('polityka.html') || currentPage.includes('polityka');
    
    console.log('🍪 Obecna strona:', currentPage);
    console.log('🍪 Czy strona polityki:', isPolicyPage);
    
    if (isPolicyPage) {
        console.log('🍪 Strona polityki - pomijam modal cookies');
        return;
    }
    
    const consent = localStorage.getItem('cookies-consent');
    const settings = localStorage.getItem('cookies-settings');
    
    console.log('🍪 Zgoda z localStorage:', consent);
    console.log('🍪 Ustawienia z localStorage:', settings);
    
    if (consent) {
        window.CookiesManager.consent = JSON.parse(consent);
        
        if (settings) {
            window.CookiesManager.settings = JSON.parse(settings);
        }
        
        // Jeśli użytkownik już wyraził zgodę, nie pokazuj modala
        console.log('🍪 Znaleziono zgodę na cookies:', window.CookiesManager.consent);
        applyCookiesSettings();
    } else {
        console.log('🍪 Brak zgody - pokazuję modal za 2 sekundy');
        // Pokaż modal po krótkim opóźnieniu
        setTimeout(() => {
            console.log('🍪 Wywołuję showCookiesModal()');
            showCookiesModal();
        }, 2000);
    }
}

// Pokazanie modala
function showCookiesModal() {
    console.log('🍪 showCookiesModal() wywołana');
    
    const modal = document.getElementById('cookies-modal');
    const backdrop = document.getElementById('cookies-backdrop');
    
    console.log('🍪 Modal element:', modal);
    console.log('🍪 Backdrop element:', backdrop);
    
    if (modal && backdrop) {
        // Zapisz poprzedni fokus
        window.CookiesManager.previousFocus = document.activeElement;
        
        // Pokaż backdrop
        backdrop.style.display = 'block';
        modal.style.display = 'block';
        
        // Dodaj animację z opóźnieniem
        setTimeout(() => {
            backdrop.classList.add('show');
            modal.classList.add('show');
            
            // Ustaw fokus na pierwszy przycisk
            const firstButton = modal.querySelector('button:not([disabled])');
            if (firstButton) {
                firstButton.focus();
            } else {
                modal.focus();
            }
            
            // Trap focus w modalu
            trapFocus(modal);
        }, 50);
        
        console.log('🍪 Modal cookies pokazany z backdrop i focus management');
        
        // Wyślij event o pokazaniu modala
        window.dispatchEvent(new CustomEvent('cookiesModalShown'));
    }
}

// Ukrycie modala
function hideCookiesModal() {
    const modal = document.getElementById('cookies-modal');
    const backdrop = document.getElementById('cookies-backdrop');
    
    if (modal && backdrop) {
        modal.classList.remove('show');
        backdrop.classList.remove('show');
        
        // Zwróć fokus do poprzedniego elementu
        if (window.CookiesManager.previousFocus && window.CookiesManager.previousFocus.focus) {
            window.CookiesManager.previousFocus.focus();
        }
        
        setTimeout(() => {
            modal.style.display = 'none';
            backdrop.style.display = 'none';
            
            // Usuń focus trap
            removeFocusTrap();
        }, 400); // Czas animacji
        
        console.log('🍪 Modal cookies ukryty z backdrop i przywróceniem focus');
        
        // Wyślij event o ukryciu modala
        window.dispatchEvent(new CustomEvent('cookiesModalHidden'));
    }
}

// Inicjalizacja backdrop events
function initBackdropEvents() {
    const backdrop = document.getElementById('cookies-backdrop');
    if (backdrop) {
        backdrop.addEventListener('click', () => {
            // Klik na backdrop = tylko niezbędne cookies
            acceptNecessaryCookies();
        });
    }
}

// Inicjalizacja obsługi klawiatury
function initKeyboardEvents() {
    window.CookiesManager.previousFocus = null;
    
    // Obsługa klawisza Esc
    const handleEscape = (e) => {
        if (e.key === 'Escape' || e.keyCode === 27) {
            const modal = document.getElementById('cookies-modal');
            if (modal && modal.style.display !== 'none') {
                acceptNecessaryCookies(); // Esc = tylko niezbędne
            }
        }
    };
    
    // Dodaj listener tylko raz
    document.removeEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleEscape);
}

// Inicjalizacja eventów
function initCookiesEvents() {
    // Przycisk "Akceptuję wszystkie"
    const acceptBtn = document.getElementById('cookies-accept');
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            window.CookiesManager.consent = 'all';
            window.CookiesManager.settings = {
                necessary: true,
                analytics: true,
                marketing: true
            };
            saveConsent();
            applyCookiesSettings();
            hideCookiesModal();
        });
    }
    
    // Przycisk "Tylko niezbędne"
    const necessaryBtn = document.getElementById('cookies-necessary');
    if (necessaryBtn) {
        necessaryBtn.addEventListener('click', acceptNecessaryCookies);
    }
    
    // Przycisk "Polityka"
    const policyBtn = document.getElementById('cookies-policy');
    if (policyBtn) {
        policyBtn.addEventListener('click', () => {
            window.open('polityka.html', '_blank');
        });
    }
    
    // Kontynuuj inicjalizację
    continueInitCookiesEvents();
}

// Funkcja akceptowania tylko niezbędnych cookies
function acceptNecessaryCookies() {
    window.CookiesManager.consent = 'necessary';
    window.CookiesManager.settings = {
        necessary: true,
        analytics: false,
        marketing: false
    };
    saveConsent();
    applyCookiesSettings();
    hideCookiesModal();
}

// Kontynuacja initCookiesEvents
function continueInitCookiesEvents() {
    // Przycisk "Ustawienia"
    const settingsBtn = document.getElementById('cookies-settings');
    const advancedDiv = document.getElementById('cookies-advanced');
    if (settingsBtn && advancedDiv) {
        settingsBtn.addEventListener('click', () => {
            advancedDiv.style.display = 'block';
            settingsBtn.style.display = 'none';
            
            // Ustaw aria-expanded
            settingsBtn.setAttribute('aria-expanded', 'true');
            
            // Ustaw checkboxy zgodnie z aktualnymi ustawieniami
            updateCheckboxes();
            
            // Dodaj live saving dla checkboxów
            addCheckboxListeners();
        });
    }
    
    // Przycisk "Zapisz ustawienia"
    const saveBtn = document.getElementById('cookies-save-settings');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            // Pobierz stan checkboxów
            const analytics = document.getElementById('cookies-analytics-cb')?.checked || false;
            const marketing = document.getElementById('cookies-marketing-cb')?.checked || false;
            
            window.CookiesManager.consent = 'custom';
            window.CookiesManager.settings = {
                necessary: true,
                analytics: analytics,
                marketing: marketing
            };
            
            saveConsent();
            applyCookiesSettings();
            hideCookiesModal();
        });
    }
    
    // Przycisk "Powrót"
    const backBtn = document.getElementById('cookies-back');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            advancedDiv.style.display = 'none';
            settingsBtn.style.display = 'inline-block';
            
            // Ustaw aria-expanded
            settingsBtn.setAttribute('aria-expanded', 'false');
            backBtn.setAttribute('aria-expanded', 'false');
        });
    }
}

// Dodanie live saving dla checkboxów
function addCheckboxListeners() {
    const analyticsCheckbox = document.getElementById('cookies-analytics-cb');
    const marketingCheckbox = document.getElementById('cookies-marketing-cb');
    
    if (analyticsCheckbox) {
        analyticsCheckbox.addEventListener('change', () => {
            window.CookiesManager.settings.analytics = analyticsCheckbox.checked;
            saveConsent();
            applyCookiesSettings();
            console.log('📊 Analytics cookies:', analyticsCheckbox.checked ? 'włączone' : 'wyłączone');
        });
    }
    
    if (marketingCheckbox) {
        marketingCheckbox.addEventListener('change', () => {
            window.CookiesManager.settings.marketing = marketingCheckbox.checked;
            saveConsent();
            applyCookiesSettings();
            console.log('🎯 Marketing cookies:', marketingCheckbox.checked ? 'włączone' : 'wyłączone');
        });
    }
}

// Aktualizacja checkboxów
function updateCheckboxes() {
    const analyticsCheckbox = document.getElementById('cookies-analytics-cb');
    const marketingCheckbox = document.getElementById('cookies-marketing-cb');
    
    if (analyticsCheckbox) {
        analyticsCheckbox.checked = window.CookiesManager.settings.analytics;
    }
    
    if (marketingCheckbox) {
        marketingCheckbox.checked = window.CookiesManager.settings.marketing;
    }
}

// Zapisanie zgody w localStorage
function saveConsent() {
    localStorage.setItem('cookies-consent', JSON.stringify(window.CookiesManager.consent));
    localStorage.setItem('cookies-settings', JSON.stringify(window.CookiesManager.settings));
    
    console.log('🍪 Zapisano zgodę na cookies:', {
        consent: window.CookiesManager.consent,
        settings: window.CookiesManager.settings
    });
}

// Zastosowanie ustawień cookies
function applyCookiesSettings() {
    const settings = window.CookiesManager.settings;
    
    // Analytics cookies - śledzenie ruchu na stronie
    if (settings.analytics) {
        console.log('📊 Włączono cookies analityczne');
        enableAnalytics();
        
        // Przykład: Google Analytics (gdy będziesz miał)
        // gtag('consent', 'update', { analytics_storage: 'granted' });
        // gtag('config', 'GA_MEASUREMENT_ID');
        
        // Custom tracking dla PartyStacja
        trackPageView(window.location.pathname);
    } else {
        console.log('📊 Wyłączono cookies analityczne');
        disableAnalytics();
        
        // gtag('consent', 'update', { analytics_storage: 'denied' });
        clearAnalyticsCookies();
    }
    
    // Marketing cookies - personalizacja i reklamy
    if (settings.marketing) {
        console.log('📢 Włączono cookies marketingowe');
        enableMarketing();
        
        // Przykład: Facebook Pixel (gdy będziesz miał)
        // fbq('consent', 'grant');
        // fbq('track', 'PageView');
        
        // Przykład: Google Ads (gdy będziesz miał)
        // gtag('consent', 'update', { ad_storage: 'granted' });
        
        // Custom marketing tracking
        trackUserPreferences();
    } else {
        console.log('📢 Wyłączono cookies marketingowe');
        disableMarketing();
        
        // fbq('consent', 'revoke');
        // gtag('consent', 'update', { ad_storage: 'denied' });
        clearMarketingCookies();
    }
    
    // Cookies niezbędne są zawsze włączone
    console.log('⚙️ Cookies niezbędne: włączone (zawsze)');
    
    // Wyślij event o zmianie ustawień
    dispatchCookiesEvent();
}

// Event o zmianie ustawień cookies
function dispatchCookiesEvent() {
    const event = new CustomEvent('cookiesSettingsChanged', {
        detail: {
            consent: window.CookiesManager.consent,
            settings: window.CookiesManager.settings
        }
    });
    window.dispatchEvent(event);
}

// ===== FOCUS MANAGEMENT =====
let focusTrapHandler = null;

function trapFocus(element) {
    // Znajdź wszystkie focusable elementy
    const focusableElements = element.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    focusTrapHandler = (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    };
    
    document.addEventListener('keydown', focusTrapHandler);
}

function removeFocusTrap() {
    if (focusTrapHandler) {
        document.removeEventListener('keydown', focusTrapHandler);
        focusTrapHandler = null;
    }
}

// Funkcja do resetowania zgody (przydatna do testów)
window.resetCookiesConsent = () => {
    localStorage.removeItem('cookies-consent');
    localStorage.removeItem('cookies-settings');
    window.CookiesManager.consent = null;
    window.CookiesManager.settings = {
        necessary: true,
        analytics: false,
        marketing: false
    };
    console.log('🍪 Zresetowano zgodę na cookies');
    
    // Pokaż modal ponownie
    setTimeout(() => {
        showCookiesModal();
    }, 500);
};

// Funkcja do sprawdzenia czy określony typ cookies jest dozwolony
window.isCookieAllowed = (type) => {
    return window.CookiesManager.settings[type] || false;
};

// ===== FUNKCJE ANALYTICS I MARKETING =====

// Analytics functions
function enableAnalytics() {
    console.log('🔧 Włączanie systemu analityki...');
    localStorage.setItem('analytics_enabled', 'true');
    
    // Inicjalizuj dataLayer jeśli nie istnieje
    if (typeof window.dataLayer === 'undefined') {
        window.dataLayer = [];
    }
    
    window.dataLayer.push({
        event: 'analytics_enabled',
        page: window.location.pathname
    });
}

function disableAnalytics() {
    console.log('🔧 Wyłączanie systemu analityki...');
    localStorage.setItem('analytics_enabled', 'false');
    clearAnalyticsCookies();
}

function clearAnalyticsCookies() {
    console.log('🧹 Usuwanie cookies analitycznych...');
    const analyticsCookies = ['_ga', '_ga_', '_gid', '_gat', '_gtag_'];
    
    analyticsCookies.forEach(cookieName => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
}

function trackPageView(page) {
    if (localStorage.getItem('analytics_enabled') === 'true') {
        console.log('📊 Tracking page view:', page);
        
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'page_view',
                page_path: page,
                page_title: document.title,
                timestamp: new Date().toISOString()
            });
        }
    }
}

// Marketing functions
function enableMarketing() {
    console.log('🎯 Włączanie systemu marketingowego...');
    localStorage.setItem('marketing_enabled', 'true');
}

function disableMarketing() {
    console.log('🎯 Wyłączanie systemu marketingowego...');
    localStorage.setItem('marketing_enabled', 'false');
    clearMarketingCookies();
}

function clearMarketingCookies() {
    console.log('🧹 Usuwanie cookies marketingowych...');
    const marketingCookies = ['_fbp', '_fbc', 'fr', 'tr'];
    
    marketingCookies.forEach(cookieName => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });
}

function trackUserPreferences() {
    if (localStorage.getItem('marketing_enabled') === 'true') {
        console.log('🎯 Tracking user preferences...');
        
        const preferences = {
            visited_pages: JSON.parse(localStorage.getItem('visited_pages') || '[]'),
            last_visit: new Date().toISOString()
        };
        
        if (!preferences.visited_pages.includes(window.location.pathname)) {
            preferences.visited_pages.push(window.location.pathname);
            preferences.visited_pages = preferences.visited_pages.slice(-10);
        }
        
        localStorage.setItem('user_preferences', JSON.stringify(preferences));
        localStorage.setItem('visited_pages', JSON.stringify(preferences.visited_pages));
    }
}

// Funkcja do pokazania modala z zewnątrz (np. link w stopce)
window.showCookiesSettings = function() {
    console.log('🍪 Wywołano showCookiesSettings z linku');
    
    // Jeśli modal nie jest załadowany, załaduj go
    if (!window.CookiesManager?.isLoaded) {
        console.log('🍪 Modal nie załadowany, ładuję...');
        loadCookiesModal().then(() => {
            // Reset zgody i pokaż modal
            window.CookiesManager.consent = null;
            showCookiesModal();
        });
    } else {
        // Modal już załadowany, pokaż go
        showCookiesModal();
    }
};

// Export funkcji dla innych skryptów
window.loadCookiesModal = loadCookiesModal;
window.showCookiesModal = showCookiesModal;
window.hideCookiesModal = hideCookiesModal;
window.trackPageView = trackPageView;
window.trackUserPreferences = trackUserPreferences;