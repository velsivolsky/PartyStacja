# 🍪 Cookies Modal - Dokumentacja

## Przegląd
Modal do obsługi zgodności z RODO, który:
- ✅ Automatycznie pojawia się przy pierwszej wizycie
- ✅ Zapisuje preferencje użytkownika w localStorage
- ✅ Jest zintegrowany z Barba.js (działa na wszystkich stronach)
- ✅ Ma elegancki design pasujący do stylu strony
- ✅ Pozwala na szczegółowe ustawienia cookies

## Pliki
- `cookies-modal.html` - Struktura i style modalu
- `js/cookies.js` - Logika obsługi cookies
- `test-cookies.html` - Strona testowa

## Automatyczne ładowanie
Modal ładuje się automatycznie przez `js/import.js` na każdej stronie.

## Funkcje dostępne globalnie

### `window.isCookieAllowed(type)`
Sprawdza czy określony typ cookies jest dozwolony:
```javascript
if (window.isCookieAllowed('analytics')) {
    // Inicjalizuj Google Analytics
    gtag('config', 'GA_MEASUREMENT_ID');
}

if (window.isCookieAllowed('marketing')) {
    // Inicjalizuj Facebook Pixel
    fbq('init', 'YOUR_PIXEL_ID');
}
```

### `window.resetCookiesConsent()`
Resetuje zgodę użytkownika (przydatne do testów):
```javascript
window.resetCookiesConsent(); // Pokaże modal ponownie
```

### `window.showCookiesModal()`
Pokazuje modal cookies:
```javascript
window.showCookiesModal(); // Ręczne pokazanie
```

### `window.debugCache()`
Debug funkcja dla Barba.js cache (bonus):
```javascript
window.debugCache(); // Pokaże co jest w cache prefetch
```

## Events

### `cookiesSettingsChanged`
Nasłuchuje na zmiany ustawień cookies:
```javascript
window.addEventListener('cookiesSettingsChanged', (e) => {
    console.log('Nowe ustawienia:', e.detail);
    
    // e.detail.consent = 'all' | 'necessary' | 'custom'
    // e.detail.settings = { necessary: true, analytics: bool, marketing: bool }
    
    if (e.detail.settings.analytics) {
        // Włącz analytics
    }
});
```

## LocalStorage
Modal zapisuje dwa klucze:
- `cookies-consent` - typ zgody ('all', 'necessary', 'custom')  
- `cookies-settings` - szczegółowe ustawienia (JSON)

## Typy cookies
1. **Niezbędne** (always true) - podstawowe funkcje strony
2. **Analityczne** - Google Analytics, statystyki
3. **Marketingowe** - Facebook Pixel, reklamy

## Testowanie
1. Uruchom serwer: `python3 -m http.server 8000`
2. Otwórz: `http://localhost:8000/test-cookies.html`
3. Przetestuj wszystkie funkcje

## Integracja z Google Analytics
```javascript
// W head sekcji HTML
window.addEventListener('cookiesSettingsChanged', (e) => {
    if (e.detail.settings.analytics) {
        // Załaduj GA
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
    }
});
```

## Stylowanie
Wszystkie style są w `cookies-modal.html`. Główne zmienne:
- Kolor główny: `#DAA520` (złoty)
- Tło: `linear-gradient(135deg, #2c3e50, #34495e)`
- Przyciski: `border-radius: 25px`

## Mobile responsive ✅
Modal jest w pełni responsywny z breakpoint na 768px.

## Barba.js compatibility ✅ 
Modal działa z SPA transitions - ładuje się automatycznie na każdej stronie.