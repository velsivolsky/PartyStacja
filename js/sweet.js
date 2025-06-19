document.querySelector('.form-container').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const form = this;
    const formData = new FormData(form);
  
    fetch(form.action, {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Super!',
          text: data.message,
        });
        form.reset();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Ups...',
          text: data.message,
        });
      }
    })
    .catch(() => {
      Swal.fire({
        icon: 'error',
        title: 'Błąd',
        text: 'Coś poszło nie tak, spróbuj ponownie.',
      });
    });
  });