const oferta = {
    fotobudka: `
      <h3 class="fw-bold mb-3 text-center"><i class="fas fa-camera-retro" style="color: #f5ed96;"></i> Fotobudka 360</h3>
      <p class="lead text-center">Wir emocji, który pokochasz! To nie zwykłe zdjęcia – to kinowe przeżycie.</p>
      <hr>
      <ul class="list-unstyled ps-3 fs-5 text-center">
        <li><i class="fas fa-sync-alt" style="color: #f5ed96;"></i> Platforma obrotowa z kamerą slow-motion</li>
        <li><i class="fas fa-magic" style="color: #f5ed96;"></i> Efekty specjalne, dynamiczne ujęcia</li>
        <li><i class="fas fa-masks-theater" style="color: #f5ed96;"></i> Przebrania i rekwizyty do wyboru</li>
        <li><i class="fas fa-heart" style="color: #f5ed96;"></i> Idealna pamiątka z każdej imprezy</li>
        <li><i class="fas fa-video" style="color: #f5ed96;"></i> Możliwość wydruku zdjęć</li>
      </ul>
<div id="fotobudkaCarousel" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner h-100">
    <div class="carousel-item active h-100">
      <img src="resources/photos/fotobudka_1.jpg" class="d-block w-100" alt="fotobudka_1">
    </div>
    <div class="carousel-item h-100">
      <video class="d-block w-100 h-100" autoplay muted loop playsinline >
        <source src="resources/photos/real/fb1.MP4" type="video/mp4">
        Twója przeglądarka nie wspiera HTML5 video.
      </video>
    </div>
    <div class="carousel-item h-100">
      <video class="d-block w-100 h-100" autoplay muted loop playsinline >
        <source src="resources/photos/real/fb2.MP4" type="video/mp4">
        Twója przeglądarka nie wspiera HTML5 video.
      </video>
    </div>
    <div class="carousel-item h-100">
      <video class="d-block w-100 h-100" autoplay muted loop playsinline >
        <source src="resources/photos/real/fb3.MP4" type="video/mp4">
        Twója przeglądarka nie wspiera HTML5 video.
      </video>
    </div>
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#fotobudkaCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Poprzedni</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#fotobudkaCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Następny</span>
  </button>
</div>
    `,
    maskotki: `
      <h3 class="fw-bold mb-3 text-center"><i class="fas fa-paw" style="color: #f5ed96;"></i> Maskotki</h3>
      <p class="lead text-center">Chodzące postacie, które kradną serca – nie tylko dzieciom!</p>
      <hr>
      <div class="row g-4 justify-content-center">
        <div class="col-6 col-md-3">
          <div class="maskotka-card" data-id="mis" tabindex="0">
            <img src="resources/photos/mis.jpg" alt="Miś PartyStacji" class="img-fluid rounded-circle mb-2 shadow-sm">
            <h5 class="text-center">Miś PartyStacji</h5>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="maskotka-card" data-id="panda" tabindex="0">
            <img src="resources/photos/panda.jpg" alt="Panda Przytulanka" class="img-fluid rounded-circle mb-2 shadow-sm">
            <h5 class="text-center">Panda Przytulanka</h5>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="maskotka-card" data-id="stich" tabindex="0">
            <img src="resources/photos/stitch.png" alt="Stich" class="img-fluid rounded-circle mb-2 shadow-sm">
            <h5 class="text-center">Stich</h5>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="maskotka-card" data-id="angel" tabindex="0">
            <img src="resources/photos/real/24.JPG" alt="Angel" class="img-fluid rounded-circle mb-2 shadow-sm">
            <h5 class="text-center">Angel</h5>
          </div>
        </div>
      </div>
  
      <div id="maskotkaDetail" class="mt-5 text-center"></div>
    `,
    dekoracje: `
      <h3 class="fw-bold mb-3 text-center"><i class="fas fa-palette" style="color: #f5ed96;"></i> Dekoracje</h3>
      <p class="lead text-center">Stworzymy klimat, którego nie zapomnisz. Od bajki po glam.</p>
      <hr>
      <ul class="list-unstyled ps-3 fs-5 text-center">
        <li><i class="fas fa-birthday-cake" style="color: #f5ed96;"></i> Dekoracje balonowe</li>
        <li><i class="fas fa-camera" style="color: #f5ed96;"></i> Ścianki z balonami</li>
        <li><i class="fas fa-streamers" style="color: #f5ed96;"></i> Girlandy</li>
        <li><i class="far fa-circle" style="color: #f5ed96;"></i> Bańki mydlane, piana, dym, efekty świetlne</li>
        <li><i class="fas fa-rainbow" style="color: #f5ed96;"></i> Kolorystyka dopasowana do motywu imprezy</li>
      </ul>
<div id="dekoracjeCarousel" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner h-100">
    <div class="carousel-item active h-100">
      <img src="https://via.placeholder.com/800x400/2a2a2a/CFB53B?text=Dekoracje+1" class="d-block w-100" alt="dekoracje_1">
    </div>
    <div class="carousel-item h-100">
      <img src="https://via.placeholder.com/800x400/2a2a2a/CFB53B?text=Dekoracje+2" class="d-block w-100" alt="dekoracje_2">
    </div>
    <div class="carousel-item h-100">
      <img src="https://via.placeholder.com/800x400/2a2a2a/CFB53B?text=Dekoracje+3" class="d-block w-100" alt="dekoracje_3">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#dekoracjeCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Poprzedni</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#dekoracjeCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Następny</span>
  </button>
</div>
    `,
    swiece: `
      <h3 class="fw-bold mb-3 text-center"><i class="fas fa-candle-holder" style="color: #f5ed96;"></i> Świece</h3>
      <p class="lead text-center">Magiczny blask, który tworzy wyjątkową atmosferę każdej chwili.</p>
      <hr>
      <ul class="list-unstyled ps-3 fs-5 text-center">
        <li><i class="fas fa-birthday-cake" style="color: #f5ed96;"></i> Świece urodzinowe w różnych kształtach</li>
        <li><i class="fas fa-heart" style="color: #f5ed96;"></i> Romantyczne świece na specjalne okazje</li>
        <li><i class="fas fa-star" style="color: #f5ed96;"></i> Świece cyfry na każdy wiek</li>
        <li><i class="fas fa-fire" style="color: #f5ed96;"></i> Świece zapachowe do dekoracji stołu</li>
      </ul>
<div id="swieceCarousel" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner h-100">
    <div class="carousel-item active h-100">
      <img src="https://via.placeholder.com/800x400/2a2a2a/CFB53B?text=Świece+1" class="d-block w-100" alt="swiece_1">
    </div>
    <div class="carousel-item h-100">
      <img src="https://via.placeholder.com/800x400/2a2a2a/CFB53B?text=Świece+2" class="d-block w-100" alt="swiece_2">
    </div>
    <div class="carousel-item h-100">
      <img src="https://via.placeholder.com/800x400/2a2a2a/CFB53B?text=Świece+3" class="d-block w-100" alt="swiece_3">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#swieceCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Poprzedni</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#swieceCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Następny</span>
  </button>
</div>
    `,
    papeteria: `
      <h3 class="fw-bold mb-3 text-center"><i class="fas fa-scroll" style="color: #f5ed96;"></i> Papeteria</h3>
      <p class="lead text-center">Każdy detal ma znaczenie - dopełnij imprezę stylową papeterią!</p>
      <hr>
      
      <div class="row g-4 justify-content-center">
        <div class="col-6 col-md-3">
          <div class="papeteria-card" data-id="zaproszenia" tabindex="0">
            <div class="card-icon"><img src="resources/icons/scroll.png" alt="Zaproszenia" style="width: 54px; height: 54px;"></div>
            <h5 class="text-center">Zaproszenia</h5>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="papeteria-card" data-id="winietki" tabindex="0">
            <div class="card-icon"><img src="resources/icons/guest-card.png" alt="Winietki" style="width: 54px; height: 54px;"></div>
            <h5 class="text-center">Winietki</h5>
          </div>
        </div>
      </div>
  
      <div id="papeteriaDetail" class="mt-5 text-center"></div>
    `,
    podziekowania: `
      <h3 class="fw-bold mb-3 text-center"><i class="fas fa-gift" style="color: #f5ed96;"></i> Podziękowania</h3>
      <p class="lead text-center">Wyraź wdzięczność w wyjątkowy sposób - piękne podziękowania dla najbliższych.</p>
      <hr>
      <ul class="list-unstyled ps-3 fs-5 text-center">
        <li><i class="fas fa-heart" style="color: #f5ed96;"></i> Podziękowania dla rodziców, świadków i gości</li>
        <li><i class="fas fa-hands-holding-heart" style="color: #f5ed96;"></i> Indywidualne projekty z osobistym akcentem</li>
        <li><i class="fas fa-gift" style="color: #f5ed96;"></i> Różne formaty - kartki, bileciki, dyplomy</li>
        <li><i class="fas fa-star" style="color: #f5ed96;"></i> Dopasowane do stylu całej uroczystości</li>
      </ul>
<div id="podziekowaniaCarousel" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner h-100">
    <div class="carousel-item active h-100">
      <img src="https://via.placeholder.com/800x400/2a2a2a/CFB53B?text=Podziękowania+1" class="d-block w-100" alt="podziekowania_1">
    </div>
    <div class="carousel-item h-100">
      <img src="https://via.placeholder.com/800x400/2a2a2a/CFB53B?text=Podziękowania+2" class="d-block w-100" alt="podziekowania_2">
    </div>
    <div class="carousel-item h-100">
      <img src="https://via.placeholder.com/800x400/2a2a2a/CFB53B?text=Podziękowania+3" class="d-block w-100" alt="podziekowania_3">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#podziekowaniaCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Poprzedni</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#podziekowaniaCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Następny</span>
  </button>
</div>
    `,
    boxy: `
      <h3 class="fw-bold mb-3 text-center"><i class="fas fa-box-open" style="color: #f5ed96;"></i> Boxy prezentowe</h3>
      <p class="lead text-center">Stylowe opakowania, które zrobią wrażenie jeszcze przed rozpakowaniem!</p>
      <hr>
      <ul class="list-unstyled ps-3 fs-5 text-center">
        <li><i class="fas fa-box-open" style="color: #f5ed96;"></i> Eleganckie pudełka w różnych rozmiarach</li>
        <li><i class="fas fa-ribbon" style="color: #f5ed96;"></i> Ozdobne wstążki i dodatki dekoracyjne</li>
        <li><i class="fas fa-palette" style="color: #f5ed96;"></i> Kolorystyka dopasowana do motywu imprezy</li>
        <li><i class="fas fa-sparkles" style="color: #f5ed96;"></i> Perfekcyjne na upominki dla gości i świadków</li>
      </ul>
<div id="boxyCarousel" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner h-100">
    <div class="carousel-item active h-100">
      <img src="https://via.placeholder.com/800x400/2a2a2a/CFB53B?text=Boxy+1" class="d-block w-100" alt="boxy_1">
    </div>
    <div class="carousel-item h-100">
      <img src="https://via.placeholder.com/800x400/2a2a2a/CFB53B?text=Boxy+2" class="d-block w-100" alt="boxy_2">
    </div>
    <div class="carousel-item h-100">
      <img src="https://via.placeholder.com/800x400/2a2a2a/CFB53B?text=Boxy+3" class="d-block w-100" alt="boxy_3">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#boxyCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Poprzedni</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#boxyCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Następny</span>
  </button>
</div>
    `
  };

const papeteria = {
    zaproszenia: {
      alt: 'Zaproszenia',
      text: `Pierwsze wrażenie to podstawa - zacznijmy od pięknych zaproszeń!`,
      desc: `
        <ul class="list-unstyled ps-3 fs-5">
            <li><i class="fas fa-palette" style="color: #f5ed96;"></i> Spersonalizowane projekty dopasowane do tematu</li>
            <li><i class="fas fa-print" style="color: #f5ed96;"></i> Wysokiej jakości druk na różnych papierach</li>
            <li><i class="fas fa-child" style="color: #f5ed96;"></i> Zaproszenia dziecięce z ulubionymi postaciami</li>
            <li><i class="fas fa-ring" style="color: #f5ed96;"></i> Eleganckie zaproszenia na wesela i imprezy dorosłych</li>
        </ul>
        `
    },
    winietki: {
      alt: 'Winietki',
      text: `Eleganckie winietki, które nadadzą szyku każdej uroczystości.`,
      desc: `
        <ul class="list-unstyled ps-3 fs-5">
          <li><i class="fas fa-table" style="color: #f5ed96;"></i> Personalizowane winietki z imionami gości</li>
          <li><i class="fas fa-palette" style="color: #f5ed96;"></i> Dopasowane do motywu przewodniego imprezy</li>
          <li><i class="fas fa-print" style="color: #f5ed96;"></i> Wysokiej jakości druk na eleganckim papierze</li>
          <li><i class="fas fa-heart" style="color: #f5ed96;"></i> Idealne na wesela, komunie i inne uroczystości</li>
        </ul>
      `
    }
  };

const maskotki = {
    mis: {
      img: 'resources/photos/mis.jpg',
      alt: 'Miś PartyStacji',
      text: `Nasz firmowy miś – uroczy, przyjazny i zawsze gotowy do zabawy.
            Idealny wybór na roczek, chrzest lub sesję z fotobudką.`,
      desc: `
        <ul class="list-unstyled ps-3 fs-5">
            <li><i class="fas fa-gift" style="color: #f5ed96;"></i> Rozdaje balony i przytulasy</li>
            <li><i class="fas fa-music" style="color: #f5ed96;"></i> Tańczy z dziećmi</li>
            <li><i class="fas fa-hand-wave" style="color: #f5ed96;"></i> Pozdrawia gości przy wejściu</li>
            <li><i class="fas fa-birthday-cake" style="color: #f5ed96;"></i> Świetnie prezentuje się przy torcie</li>
        </ul>
        `
    },
    panda: {
      img: 'resources/photos/panda.jpg',
      alt: 'Panda Przytulanka',
      text: `Spokojna, urocza i niezwykle fotogeniczna. Dzieci ją uwielbiają – dorośli też!`,
      desc: `
        <ul class="list-unstyled ps-3 fs-5">
            <li><i class="fas fa-camera" style="color: #f5ed96;"></i> Wspólne zdjęcia i przytulanki</li>
            <li><i class="fas fa-gift" style="color: #f5ed96;"></i> Obecność przy wręczaniu prezentów</li>
            <li><i class="fas fa-music" style="color: #f5ed96;"></i> Zabawy ruchowe i taneczne</li>
            <li><i class="fas fa-camera-retro" style="color: #f5ed96;"></i> Opcjonalna asysta przy fotobudce</li>
        </ul>
`
    },
    stich: {
      img: 'resources/photos/stitch.png',
      alt: 'Stich',
      text: `Mały, niebieski rozrabiaka z ogromnym sercem. Dla fanów bajek i imprez z humorem!`,
      desc: `
        <ul class="list-unstyled ps-3 fs-5">
            <li><i class="fas fa-laugh" style="color: #f5ed96;"></i> Zabawy i wygłupy z dziećmi</li>
            <li><i class="fas fa-users" style="color: #f5ed96;"></i> Interakcja z gośćmi i wspólne zdjęcia</li>
            <li><i class="fas fa-birthday-cake" style="color: #f5ed96;"></i> Idealny na imprezy urodzinowe z motywem bajkowym</li>
            <li><i class="fas fa-heart" style="color: #f5ed96;"></i> Duet ze swoją uroczą towarzyszką – Angel!</li>
        </ul>
        `
    },
    angel: {
      img: 'resources/photos/real/24.JPG',
      alt: 'Angel',
      text: `Piękna, różowa bohaterka, taniec i animacje dla najmłodszych, element niespodzianki...`,
      desc: `
        <ul class="list-unstyled ps-3 fs-5">
          <li><i class="fas fa-music" style="color: #f5ed96;"></i> Taniec i animacje dla najmłodszych</li>
          <li><i class="fas fa-heart" style="color: #f5ed96;"></i> Przyjacielskie uściski i wspólne selfie</li>
          <li><i class="fas fa-surprise" style="color: #f5ed96;"></i> Element niespodzianki na każdej imprezie</li>
          <li><i class="fas fa-palette" style="color: #f5ed96;"></i> Doskonale pasuje do dekoracji w stylu „pastel party"</li>
        </ul>
      `
    }
  };

function loadMaskotka(id) {
  const container = document.getElementById('maskotkaDetail');
  const m = maskotki[id];
  
  // If container already has content, fade it out first
  if (container.innerHTML.trim() !== '') {
    container.classList.add('fade-out');
    setTimeout(() => {
      updateMaskotkaContent(container, m);
    }, 400);
  } else {
    // For first time display, also use fade-in animation
    container.classList.add('fade-out'); // Start invisible
    setTimeout(() => {
      updateMaskotkaContent(container, m);
    }, 100); // Slightly longer delay for first display
  }
}

function updateMaskotkaContent(container, m) {
  container.innerHTML = `
    <div class="row align-items-center mb-5">
      <div class="col-md-6 text-center">
        <img src="${m.img}" alt="${m.alt}" class="img-fluid rounded shadow" style="max-height:400px;">
      </div>
      <div class="col-md-6">
        <h3 class="fw-bold mb-3">${m.alt}</h3>
        <p class="lead fw-bold">${m.text}</p>
        ${m.desc}
      </div>
    </div>
    <hr>`;
  
  // Reset any inline styles and classes
  container.style.opacity = '';
  container.classList.remove('fade-out');
  container.classList.add('fade-in');
  
  // Smooth scroll to the details
  setTimeout(() => {
    container.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }, 100);
  
  // Remove fade-in class after animation completes
  setTimeout(() => {
    container.classList.remove('fade-in');
  }, 400);
}

function showMaskotka(event) {
    const card = event.currentTarget;
    loadMaskotka(card.dataset.id);
}

function initMaskotki() {
    document.querySelectorAll('.maskotka-card').forEach(card => {
        card.addEventListener('click', showMaskotka);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showMaskotka(e);
            }
        });
    });
  }

function loadPapeteria(id) {
  const container = document.getElementById('papeteriaDetail');
  const p = papeteria[id];
  
  // If container already has content, fade it out first
  if (container.innerHTML.trim() !== '') {
    container.classList.add('fade-out');
    setTimeout(() => {
      updatePapeteriaContent(container, p);
    }, 400);
  } else {
    // For first time display, also use fade-in animation
    container.classList.add('fade-out'); // Start invisible
    setTimeout(() => {
      updatePapeteriaContent(container, p);
    }, 100); // Slightly longer delay for first display
  }
}

function updatePapeteriaContent(container, p) {
  const carouselId = `${p.alt.toLowerCase()}Carousel`;
  container.innerHTML = `
    <div class="row align-items-center mb-5">
      <div class="col-md-6">
        <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner h-100">
            <div class="carousel-item active h-100">
              <img src="https://via.placeholder.com/800x400/2a2a2a/CFB53B?text=${p.alt}+1" class="d-block w-100" alt="${p.alt}_1">
            </div>
            <div class="carousel-item h-100">
              <img src="https://via.placeholder.com/800x400/2a2a2a/CFB53B?text=${p.alt}+2" class="d-block w-100" alt="${p.alt}_2">
            </div>
            <div class="carousel-item h-100">
              <img src="https://via.placeholder.com/800x400/2a2a2a/CFB53B?text=${p.alt}+3" class="d-block w-100" alt="${p.alt}_3">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Poprzedni</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Następny</span>
          </button>
        </div>
      </div>
      <div class="col-md-6">
        <h3 class="fw-bold mb-3">${p.alt}</h3>
        <p class="lead fw-bold">${p.text}</p>
        ${p.desc}
      </div>
    </div>
    <hr>`;
  
  // Reset any inline styles and classes
  container.style.opacity = '';
  container.classList.remove('fade-out');
  container.classList.add('fade-in');
  
  // Smooth scroll to the details
  setTimeout(() => {
    container.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  }, 100);
  
  // Remove fade-in class after animation completes
  setTimeout(() => {
    container.classList.remove('fade-in');
  }, 400);
}

function showPapeteria(event) {
    const card = event.currentTarget;
    
    // Reset all papeteria cards to inactive state
    document.querySelectorAll('.papeteria-card').forEach(c => {
        c.classList.remove('active');
    });
    
    // Add active class to clicked card
    card.classList.add('active');
    
    loadPapeteria(card.dataset.id);
}

function initPapeteria() {
    document.querySelectorAll('.papeteria-card').forEach(card => {
        card.addEventListener('click', showPapeteria);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showPapeteria(e);
            }
        });
    });
}

  function showOfferSection(section) {
    const ofertaContent = document.getElementById('oferta-content');
    
    // Clear maskotka details with fade-out when switching sections
    const maskotkaDetail = document.getElementById('maskotkaDetail');
    if (maskotkaDetail && maskotkaDetail.innerHTML.trim() !== '') {
      maskotkaDetail.classList.add('fade-out');
      setTimeout(() => {
        maskotkaDetail.innerHTML = '';
        maskotkaDetail.classList.remove('fade-out');
      }, 400);
    }
    
    // Clear papeteria details with fade-out when switching sections
    const papeteriaDetail = document.getElementById('papeteriaDetail');
    if (papeteriaDetail && papeteriaDetail.innerHTML.trim() !== '') {
      papeteriaDetail.classList.add('fade-out');
      setTimeout(() => {
        papeteriaDetail.innerHTML = '';
        papeteriaDetail.classList.remove('fade-out');
      }, 400);
    }
    
    ofertaContent.classList.add('fade-out');
    setTimeout(() => {
      ofertaContent.innerHTML = oferta[section];
      ofertaContent.classList.remove('fade-out');
      ofertaContent.classList.add('fade-in');
      
      if (section === 'maskotki') {
        setTimeout(() => initMaskotki(), 100);
      }
      
      if (section === 'papeteria') {
        setTimeout(() => initPapeteria(), 100);
      }
      
      // Remove fade-in class after animation completes
      setTimeout(() => {
        ofertaContent.classList.remove('fade-in');
      }, 400);
    }, 400);
  }

  // Initialize offer tiles
  function initOfferTiles() {
    document.querySelectorAll('.oferta-tile').forEach(tile => {
      tile.addEventListener('click', function() {
        const section = this.dataset.show;
        
        // Usuń active z wszystkich kafelków
        document.querySelectorAll('.oferta-tile').forEach(t => {
          t.classList.remove('active');
          const emoji = t.querySelector('.emoji');
          if (emoji) {
            emoji.classList.remove('swaying');
          }
        });
        
        // Dodaj active do klikniętego kafelka
        this.classList.add('active');
        const emoji = this.querySelector('.emoji');
        if (emoji) {
          // Krótkiego timeout dla animacji wejścia
          setTimeout(() => {
            emoji.classList.add('swaying');
          }, 300);
        }
        
        showOfferSection(section);
        
        // Scroll to content on mobile devices
        if (window.innerWidth <= 768) {
          setTimeout(() => {
            const ofertaContent = document.getElementById('oferta-content');
            if (ofertaContent) {
              ofertaContent.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
              });
            }
          }, 500); // Wait for content to load before scrolling
        }
      });
      
      // Touch events dla lepszej responsywności na mobile
      tile.addEventListener('touchstart', function(e) {
        e.preventDefault(); // Zapobiega podwójnemu kliknięciu
        this.click();
      });
    });
  }

  // Initialize when page loads
  document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('oferta-content')) {
      initOfferTiles();
      initMaskotki();
      
      // Aktywuj pierwszy kafelek domyślnie
      const firstTile = document.querySelector('.oferta-tile[data-show="fotobudka"]');
      if (firstTile) {
        firstTile.classList.add('active');
        const emoji = firstTile.querySelector('.emoji');
        if (emoji) {
          setTimeout(() => {
            emoji.classList.add('swaying');
          }, 300);
        }
        showOfferSection('fotobudka');
      }
    }
  });