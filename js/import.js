// Funkcja do uruchomienia animacji fade-in tylko raz
function triggerFadeIn() {
  if (!document.body.classList.contains('fade-in')) {
    document.body.classList.remove('fade-out');
    document.body.classList.add('fade-in');
  }
}

// Funkcja do załadowania navbaru i aktywacji menu
function loadNavbar() {
  fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
      const navContainer = document.getElementById('nav-import');
      navContainer.innerHTML = data;

      // Opcjonalnie: ustaw styl sticky-top (klasa bootstrap ma swoje style, ale tu na pewno zadziała)
      const navbar = navContainer.querySelector('nav');
      if (navbar) {
        navbar.classList.add('navbar');
        navbar.style.position = 'sticky';
        navbar.style.top = '0';
        navbar.style.zIndex = '1030';
        navbar.style.backgroundColor = '#fff';
      }

      // Po wstawieniu navbaru odpalamy aktywację menu
      activateMenu();

      // Animacja fade-in
      triggerFadeIn();
    })
    .catch(err => console.error('Błąd wczytywania navbaru:', err));
}

// Funkcja do załadowania footeru (jak masz)
function loadFooter() {
  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer-import').innerHTML = data;
    })
    .catch(err => console.error('Błąd wczytywania stopki:', err));
}

// Fade-out przy kliknięciu linków lokalnych (bez odświeżania z animacją)
document.body.addEventListener('click', function (e) {
  const link = e.target.closest('a[href]');
  if (!link) return;

  const href = link.getAttribute('href');
  if (
    href &&
    !href.startsWith('http') &&
    !href.startsWith('#') &&
    !link.hasAttribute('target')
  ) {
    e.preventDefault();
    document.body.classList.remove('fade-in');
    document.body.classList.add('fade-out');

    setTimeout(() => {
      window.location.href = href;
    }, 500);
  }
});

// Wiszące spójniki — niełamliwa spacja
document.addEventListener("DOMContentLoaded", function () {
  function avoidHangingWords(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      let text = element.innerHTML;
      text = text.replace(/\b(i|w|z|a)\s+/gi, '$1&nbsp;');
      element.innerHTML = text;
    });
  }
  avoidHangingWords("p, h1, h2, h3, h4, h5, h6");
});

// Funkcja aktywująca menu na podstawie URL
function activateMenu() {
  let currentPath = window.location.pathname.split("/").pop();
  if (!currentPath) currentPath = "index.html";

  const pages = {
    "index.html": "index",
    "kontakt.html": "kontakt",
    "o_nas.html": "o_nas",
    "oferta.html": "oferta",
    "galeria.html": "galeria",
  };

  const menuId = pages[currentPath];
  const menuItem = document.getElementById(menuId);
  if (menuItem) {
    menuItem.classList.add("active");
  }
}

// Funkcja do inicjalizacji cookies modal
function initCookiesModal() {
  // Sprawdź czy plik cookies.js jest już załadowany
  if (typeof window.CookiesManager !== 'undefined' && window.CookiesManager.isLoaded) {
    console.log('🍪 Cookies modal już zainicjalizowany');
    return;
  }
  
  // Sprawdź czy funkcja loadCookiesModal z cookies.js istnieje
  if (typeof window.loadCookiesModal === 'function') {
    window.loadCookiesModal();
  } else {
    // Dynamicznie załaduj plik cookies.js
    console.log('🍪 Ładowanie cookies.js...');
    const script = document.createElement('script');
    script.src = 'js/cookies.js';
    script.onload = () => {
      console.log('🍪 cookies.js załadowany, inicjalizuję modal...');
      // Po załadowaniu skryptu, załaduj modal
      if (typeof window.loadCookiesModal === 'function') {
        window.loadCookiesModal();
      }
    };
    script.onerror = () => {
      console.error('❌ Błąd ładowania cookies.js');
    };
    document.head.appendChild(script);
  }
}

// Funkcja do ładowania navbar i footer (dla Barba.js)
function loadNavbarAndFooter() {
  loadNavbar();
  loadFooter();
  initCookiesModal();
}

// Startujemy wszystko po DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 DOMContentLoaded - import.js');
  loadNavbar();
  loadFooter();
  
  // Opóźnij cookies modal żeby navbar/footer się załadowały
  setTimeout(() => {
    console.log('🍪 Inicjalizuję cookies modal...');
    initCookiesModal();
  }, 1000);
});

// Export dla Barba.js
window.loadNavbarAndFooter = loadNavbarAndFooter;



