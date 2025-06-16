fetch('navbar.html')
.then(response => {
  if (!response.ok) throw new Error('Network error');
  return response.text();
})
.then(html => {
  document.getElementById('nav-import').innerHTML = html;
})
.catch(err => {
  console.error('Błąd podczas ładowania navbar:', err);
});