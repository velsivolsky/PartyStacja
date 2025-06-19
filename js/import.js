// Funkcja do uruchomienia animacji fade-in tylko raz
function triggerFadeIn() {
  if (!document.body.classList.contains('fade-in')) {
    document.body.classList.remove('fade-out');
    document.body.classList.add('fade-in');
  }
}

fetch('navbar.html')
  .then(response => response.text())
  .then(data => {
    const navContainer = document.getElementById('nav-import');
    navContainer.innerHTML = data;

    // Znajdź navbar wewnątrz wczytanego HTML-a i dołóż sticky, jeśli nie ma
    const navbar = navContainer.querySelector('nav');
    if (navbar) {
      navbar.classList.add('navbar'); // na wszelki wypadek
      navbar.style.position = 'sticky-top';
      navbar.style.top = '0';
      navbar.style.zIndex = '1030';
      navbar.style.backgroundColor = '#fff';
    }

    // URUCHOM animację fade-in dopiero po załadowaniu nav (ważne na index.html)
    triggerFadeIn();
  });

fetch('footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer-import').innerHTML = data;
  });

// FADE OUT effect przy klikaniu w linki
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
