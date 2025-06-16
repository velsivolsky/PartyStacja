fetch('/navbar.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('nav-import').innerHTML = data;

    // Upewnij się, że sticky działa
    const navbar = document.querySelector('#nav-import nav');
    navbar.classList.add('sticky-top');
  });