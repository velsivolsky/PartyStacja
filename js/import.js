fetch('/navbar.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('nav-import').innerHTML = data;

    
    const navbar = document.querySelector('#nav-import nav');
    navbar.classList.add('sticky-top');
  });

  fetch('/footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer-import').innerHTML = data;
  });



// FAadeout page
document.body.addEventListener('click', function(e) {
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