// Multi-step Form Logic
let currentStep = 1;
const totalSteps = 5;
let formData = {
  inquiryType: '',
  eventType: '',
  eventCustom: '',
  eventDate: '',
  location: '',
  guestCount: '',
  services: [],
  name: '',
  email: '',
  phone: '',
  message: '',
  ofertaPDF: false
};

document.addEventListener('DOMContentLoaded', function() {
  initForm();
});

function initForm() {
  // Step 1: Inquiry Type Selection
  document.querySelectorAll('.inquiry-type-card').forEach(card => {
    card.addEventListener('click', function() {
      document.querySelectorAll('.inquiry-type-card').forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');
      const type = this.dataset.type;
      document.getElementById('inquiryType').value = type;
      formData.inquiryType = type;
      
      // Show/hide event-only categories based on selection
      updateServiceCategoriesVisibility(type);
      
      // Auto-navigate to next step
      setTimeout(() => {
        navigateStep(1);
      }, 300);
    });
  });

  // Step 2: Event Type Selection
  document.querySelectorAll('.event-type-option').forEach(option => {
    option.addEventListener('click', function() {
      document.querySelectorAll('.event-type-option').forEach(o => o.classList.remove('selected'));
      this.classList.add('selected');
      const value = this.dataset.value;
      document.getElementById('eventType').value = value;
      formData.eventType = value;
      
      // Show/hide custom input
      const customInput = document.getElementById('eventCustom');
      if (value === 'Inne') {
        customInput.style.display = 'block';
        customInput.required = true;
      } else {
        customInput.style.display = 'none';
        customInput.required = false;
        customInput.value = '';
        formData.eventCustom = '';
      }
      
      checkStep2Completion();
    });
  });

  // Custom event input
  document.getElementById('eventCustom').addEventListener('input', function() {
    formData.eventCustom = this.value;
    checkStep2Completion();
  });

  // Event details inputs
  document.getElementById('eventDate').addEventListener('change', function() {
    formData.eventDate = this.value;
  });
  
  document.getElementById('eventLocation').addEventListener('change', function() {
    formData.location = this.value;
  });
  
  document.getElementById('guestCount').addEventListener('input', function() {
    formData.guestCount = this.value;
  });

  // Step 3: Service Categories Toggle
  document.querySelectorAll('.service-category-header').forEach(header => {
    header.addEventListener('click', function() {
      const category = this.closest('.service-category');
      category.classList.toggle('open');
    });
  });

  // Service selection
  document.querySelectorAll('input[name="services[]"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateSelectedServices);
  });

  // Step 4: Contact details
  document.getElementById('contactName').addEventListener('input', function() {
    formData.name = this.value;
  });
  
  document.getElementById('contactEmail').addEventListener('input', function() {
    formData.email = this.value;
  });
  
  document.getElementById('contactPhone').addEventListener('input', function() {
    formData.phone = this.value;
  });
  
  document.getElementById('additionalMessage').addEventListener('input', function() {
    formData.message = this.value;
    checkStep4Completion();
  });

  // Listen to form changes to update Next button visibility
  document.getElementById('eventDate').addEventListener('change', checkStep2Completion);
  document.getElementById('eventLocation').addEventListener('input', checkStep2Completion);
  document.getElementById('guestCount').addEventListener('input', checkStep2Completion);
  
  document.getElementById('contactName').addEventListener('input', checkStep4Completion);
  document.getElementById('contactEmail').addEventListener('input', checkStep4Completion);
  document.getElementById('contactPhone').addEventListener('input', checkStep4Completion);

  // Navigation
  document.getElementById('prevBtn').addEventListener('click', () => navigateStep(-1));
  document.getElementById('nextBtn').addEventListener('click', () => navigateStep(1));
  
  // Form submission
  document.getElementById('multiStepForm').addEventListener('submit', handleSubmit);
  
  // Initialize display
  updateStepDisplay();
}

function updateSelectedServices() {
  formData.services = Array.from(document.querySelectorAll('input[name="services[]"]:checked'))
    .map(cb => cb.value);
  checkStep3Completion();
}

function checkStep2Completion() {
  const nextBtn = document.getElementById('nextBtn');
  if (currentStep === 2 && formData.inquiryType === 'event') {
    const isComplete = formData.eventType && 
                      formData.eventDate && 
                      formData.location && 
                      formData.guestCount &&
                      (formData.eventType !== 'Inne' || formData.eventCustom);
    nextBtn.style.display = isComplete ? 'inline-block' : 'none';
  }
}

function checkStep3Completion() {
  const nextBtn = document.getElementById('nextBtn');
  if (currentStep === 3) {
    const isComplete = formData.services.length > 0;
    nextBtn.style.display = isComplete ? 'inline-block' : 'none';
  }
}

function checkStep4Completion() {
  const nextBtn = document.getElementById('nextBtn');
  if (currentStep === 4) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isComplete = formData.name && 
                      formData.email && 
                      emailRegex.test(formData.email) &&
                      formData.phone;
    nextBtn.style.display = isComplete ? 'inline-block' : 'none';
  }
}

function updateServiceCategoriesVisibility(inquiryType) {
  const eventOnlyCategories = document.querySelectorAll('.service-category[data-availability="event-only"]');
  
  if (inquiryType === 'shop') {
    // Hide event-only categories for shop customers
    eventOnlyCategories.forEach(category => {
      category.style.display = 'none';
    });
  } else {
    // Show all categories for event customers
    eventOnlyCategories.forEach(category => {
      category.style.display = 'block';
    });
  }
}

function navigateStep(direction) {
  // Validate current step before moving forward
  if (direction > 0 && !validateStep(currentStep)) {
    return;
  }

  // Special handling for shop type (skip step 2)
  if (formData.inquiryType === 'shop') {
    if (currentStep === 1 && direction > 0) {
      currentStep = 3; // Skip step 2
    } else if (currentStep === 3 && direction < 0) {
      currentStep = 1; // Go back to step 1
    } else {
      currentStep += direction;
    }
  } else {
    // Normal navigation for event type
    currentStep += direction;
  }

  // Ensure we stay within bounds
  currentStep = Math.max(1, Math.min(currentStep, totalSteps));

  updateStepDisplay();
}

function validateStep(step) {
  switch(step) {
    case 1:
      if (!formData.inquiryType) {
        Swal.fire({
          icon: 'warning',
          title: 'Wybierz typ zapytania',
          text: 'Proszę wybierz, czy organizujesz event, czy chcesz kupić produkty.',
          confirmButtonColor: '#f5ed96',
          confirmButtonText: 'OK'
        });
        return false;
      }
      return true;
    
    case 2:
      if (formData.inquiryType === 'event') {
        if (!formData.eventType) {
          Swal.fire({
            icon: 'warning',
            title: 'Wybierz rodzaj imprezy',
            text: 'Proszę wybierz rodzaj wydarzenia.',
            confirmButtonColor: '#f5ed96',
            confirmButtonText: 'OK'
          });
          return false;
        }
        if (formData.eventType === 'Inne' && !formData.eventCustom) {
          Swal.fire({
            icon: 'warning',
            title: 'Uzupełnij rodzaj wydarzenia',
            text: 'Proszę wpisz rodzaj wydarzenia.',
            confirmButtonColor: '#f5ed96',
            confirmButtonText: 'OK'
          });
          return false;
        }
        if (!formData.eventDate) {
          Swal.fire({
            icon: 'warning',
            title: 'Wybierz datę wydarzenia',
            text: 'Proszę wybierz datę wydarzenia.',
            confirmButtonColor: '#f5ed96',
            confirmButtonText: 'OK'
          });
          return false;
        }
        if (!formData.location) {
          Swal.fire({
            icon: 'warning',
            title: 'Podaj lokalizację',
            text: 'Proszę podaj miasto/miejscowość wydarzenia.',
            confirmButtonColor: '#f5ed96',
            confirmButtonText: 'OK'
          });
          return false;
        }
        if (!formData.guestCount) {
          Swal.fire({
            icon: 'warning',
            title: 'Podaj liczbę gości',
            text: 'Proszę podaj szacowaną liczbę gości.',
            confirmButtonColor: '#f5ed96',
            confirmButtonText: 'OK'
          });
          return false;
        }
      }
      return true;
    
    case 3:
      if (formData.services.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Wybierz usługi',
          text: 'Proszę wybierz przynajmniej jedną usługę.',
          confirmButtonColor: '#f5ed96',
          confirmButtonText: 'OK'
        });
        return false;
      }
      return true;
    
    case 4:
      if (!formData.name || !formData.email || !formData.phone) {
        Swal.fire({
          icon: 'warning',
          title: 'Uzupełnij dane kontaktowe',
          text: 'Proszę wypełnij wszystkie wymagane pola.',
          confirmButtonColor: '#f5ed96',
          confirmButtonText: 'OK'
        });
        return false;
      }
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        Swal.fire({
          icon: 'warning',
          title: 'Nieprawidłowy email',
          text: 'Proszę podaj prawidłowy adres email.',
          confirmButtonColor: '#f5ed96',
          confirmButtonText: 'OK'
        });
        return false;
      }
      // Generate summary for step 5
      generateSummary();
      return true;
    
    default:
      return true;
  }
}

function updateStepDisplay() {
  // Update progress bar
  document.querySelectorAll('.form-progress-step').forEach(step => {
    const stepNum = parseInt(step.dataset.step);
    step.classList.remove('active', 'completed');
    if (stepNum === currentStep) {
      step.classList.add('active');
    } else if (stepNum < currentStep) {
      step.classList.add('completed');
    }
  });

  // Show/hide form steps
  document.querySelectorAll('.form-step').forEach(step => {
    step.classList.remove('active');
  });
  const activeFormStep = document.querySelector(`.form-step[data-step="${currentStep}"]`);
  if (activeFormStep) {
    activeFormStep.classList.add('active');
  }

  // Update navigation buttons
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');

  // Hide Prev button on step 1
  if (currentStep === 1) {
    prevBtn.style.display = 'none';
  } else {
    prevBtn.style.display = 'inline-block';
  }

  // Hide Next button on step 1 (auto-navigate) and step 5 (show Submit instead)
  if (currentStep === 1) {
    nextBtn.style.display = 'none';
  } else if (currentStep === totalSteps) {
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'inline-block';
  } else {
    submitBtn.style.display = 'none';
    // Check if current step is complete to show Next button
    if (currentStep === 2) {
      checkStep2Completion();
    } else if (currentStep === 3) {
      checkStep3Completion();
    } else if (currentStep === 4) {
      checkStep4Completion();
    } else {
      nextBtn.style.display = 'inline-block';
    }
  }

  // Scroll to form (not to top of page)
  const formContainer = document.querySelector('.form-container');
  if (formContainer) {
    // Get position of form relative to viewport
    const formRect = formContainer.getBoundingClientRect();
    const scrollOffset = window.pageYOffset + formRect.top - 100; // 100px offset from top
    
    window.scrollTo({ 
      top: scrollOffset, 
      behavior: 'smooth' 
    });
  }
}

function generateSummary() {
  const summaryContent = document.getElementById('summaryContent');
  let html = '';

  // Inquiry type
  html += `
    <div class="summary-section">
      <h5><i class="fas fa-clipboard-list"></i> Typ zapytania</h5>
      <p>${formData.inquiryType === 'event' ? '🎉 Organizuję event' : '🛍️ Chcę zapytać o produkty'}</p>
    </div>
  `;

  // Event details (if applicable)
  if (formData.inquiryType === 'event') {
    html += `
      <div class="summary-section">
        <h5><i class="fas fa-calendar"></i> Szczegóły wydarzenia</h5>
        <p><strong>Rodzaj:</strong> ${formData.eventType === 'Inne' ? formData.eventCustom : formData.eventType}</p>
        ${formData.eventDate ? `<p><strong>Data:</strong> ${new Date(formData.eventDate).toLocaleDateString('pl-PL')}</p>` : ''}
        ${formData.location ? `<p><strong>Lokalizacja:</strong> ${formData.location}</p>` : ''}
        ${formData.guestCount ? `<p><strong>Liczba gości:</strong> ${formData.guestCount}</p>` : ''}
      </div>
    `;
  }

  // Selected services
  if (formData.services.length > 0) {
    html += `
      <div class="summary-section">
        <h5><i class="fas fa-list-check"></i> Wybrane usługi (${formData.services.length})</h5>
        <ul>
          ${formData.services.map(service => `<li>${service}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  // Contact details
  html += `
    <div class="summary-section">
      <h5><i class="fas fa-user"></i> Dane kontaktowe</h5>
      <p><strong>Imię i nazwisko:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Telefon:</strong> ${formData.phone}</p>
      ${formData.message ? `<p><strong>Dodatkowe informacje:</strong> ${formData.message}</p>` : ''}
      ${formData.ofertaPDF ? '<p>✉️ Chcę otrzymać ofertę PDF</p>' : ''}
    </div>
  `;

  summaryContent.innerHTML = html;
}

function handleSubmit(e) {
  e.preventDefault();
  
  // Check RODO consent
  if (!document.getElementById('rodo').checked) {
    Swal.fire({
      icon: 'warning',
      title: 'Brak zgody',
      text: 'Musisz wyrazić zgodę na przetwarzanie danych osobowych.',
      confirmButtonColor: '#f5ed96',
      confirmButtonText: 'OK'
    });
    return;
  }

  // Show loading
  Swal.fire({
    title: 'Wysyłanie...',
    text: 'Proszę czekać',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  // Submit form via AJAX
  const formElement = document.getElementById('multiStepForm');
  const formDataToSend = new FormData(formElement);

  fetch('send_mail.php', {
    method: 'POST',
    body: formDataToSend
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Success confetti
      createConfetti();
      
      Swal.fire({
        icon: 'success',
        title: 'Dziękujemy!',
        text: 'Twoje zapytanie zostało wysłane. Skontaktujemy się z Tobą wkrótce!',
        confirmButtonColor: '#f5ed96',
        confirmButtonText: 'Super!'
      }).then(() => {
        // Reset form
        window.location.reload();
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Błąd',
        text: data.message || 'Wystąpił błąd podczas wysyłania. Spróbuj ponownie.',
        confirmButtonColor: '#f5ed96',
        confirmButtonText: 'OK'
      });
    }
  })
  .catch(error => {
    console.error('Error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Błąd',
      text: 'Wystąpił błąd podczas wysyłania. Spróbuj ponownie.',
      confirmButtonColor: '#f5ed96',
      confirmButtonText: 'OK'
    });
  });
}

// Confetti function
function createConfetti() {
  const colors = ['#f5ed96', '#CFB53B', '#FFD700', '#F0E68C', '#BDB76B'];
  
  for (let i = 0; i < 60; i++) {
    const confettiPiece = document.createElement('div');
    confettiPiece.style.position = 'fixed';
    confettiPiece.style.width = Math.random() * 15 + 8 + 'px';
    confettiPiece.style.height = Math.random() * 15 + 8 + 'px';
    confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confettiPiece.style.left = Math.random() * window.innerWidth + 'px';
    confettiPiece.style.top = '-30px';
    confettiPiece.style.borderRadius = '3px';
    confettiPiece.style.opacity = '0.9';
    confettiPiece.style.pointerEvents = 'none';
    confettiPiece.style.zIndex = '9999';
    confettiPiece.style.boxShadow = '0 2px 8px rgba(245, 237, 150, 0.6)';
    
    document.body.appendChild(confettiPiece);
    
    const fallDuration = Math.random() * 3000 + 2000;
    const swayAmount = Math.random() * 300 + 100;
    const rotationAmount = Math.random() * 720 + 360;
    
    animateConfetti(confettiPiece, fallDuration, swayAmount, rotationAmount);
  }
}

function animateConfetti(element, duration, swayAmount, rotation) {
  const startTime = Date.now();
  const startX = parseFloat(element.style.left);
  const startY = parseFloat(element.style.top);
  const endY = window.innerHeight + 50;
  
  function animate() {
    const elapsed = Date.now() - startTime;
    const progress = elapsed / duration;
    
    if (progress >= 1) {
      element.remove();
      return;
    }
    
    const currentY = startY + (endY - startY) * progress;
    const swayProgress = progress * Math.PI * 4;
    const currentX = startX + Math.sin(swayProgress) * swayAmount * (1 - progress * 0.5);
    const currentRotation = rotation * progress;
    const opacity = progress > 0.8 ? (1 - progress) * 5 : 0.9;
    
    element.style.left = currentX + 'px';
    element.style.top = currentY + 'px';
    element.style.transform = `rotate(${currentRotation}deg)`;
    element.style.opacity = opacity;
    
    requestAnimationFrame(animate);
  }
  
  animate();
}
