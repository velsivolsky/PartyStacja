const oferta = {
    fotobudka: `
      <h3 class="fw-bold mb-3 text-center"><i class="fas fa-camera-retro" style="color: #CFB53B;"></i> Fotobudka 360</h3>
      <p class="lead text-center">Wir emocji, który pokochasz! To nie zwykłe zdjęcia – to kinowe przeżycie.</p>
      <hr>
      <ul class="list-unstyled ps-3 fs-5 text-center">
        <li><i class="fas fa-sync-alt" style="color: #CFB53B;"></i> Platforma obrotowa z kamerą slow-motion</li>
        <li><i class="fas fa-magic" style="color: #CFB53B;"></i> Efekty specjalne, dynamiczne ujęcia</li>
        <li><i class="fas fa-masks-theater" style="color: #CFB53B;"></i> Przebrania i rekwizyty do wyboru</li>
        <li><i class="fas fa-heart" style="color: #CFB53B;"></i> Idealna pamiątka z każdej imprezy</li>
      </ul>
<div id="fotobudkaCarousel" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner h-100">
    <div class="carousel-item active h-100">
      <img src="resources/photos/fotobudka_1.jpg" class="d-block w-100" alt="fotobudka_1">
    </div>
    <div class="carousel-item h-100">
      <img src="resources/photos/fotobudka_2.jpg" class="d-block w-100" alt="fotobudka_2">
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
      <h3 class="fw-bold mb-3 text-center"><i class="fas fa-paw" style="color: #CFB53B;"></i> Maskotki</h3>
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
            <img src="resources/photos/stitch.jpg" alt="Stich" class="img-fluid rounded-circle mb-2 shadow-sm">
            <h5 class="text-center">Stich</h5>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="maskotka-card" data-id="angel" tabindex="0">
            <img src="resources/photos/angel.jpg" alt="Angel" class="img-fluid rounded-circle mb-2 shadow-sm">
            <h5 class="text-center">Angel</h5>
          </div>
        </div>
      </div>
  
      <div id="maskotkaDetail" class="mt-5 text-center"></div>
    `,
    dekoracje: `
      <h3 class="fw-bold mb-3 text-center"><i class="fas fa-palette" style="color: #CFB53B;"></i> Dekoracje</h3>
      <p class="lead text-center">Stworzymy klimat, którego nie zapomnisz. Od bajki po glam.</p>
      <hr>
      <ul class="list-unstyled ps-3 fs-5 text-center">
        <li><i class="fas fa-birthday-cake" style="color: #CFB53B;"></i> Balony z helem i girlandy tematyczne</li>
        <li><i class="fas fa-camera" style="color: #CFB53B;"></i> Ścianki zdjęciowe – glamour lub dziecięce</li>
        <li><i class="fas fa-sparkles" style="color: #CFB53B;"></i> Bańki mydlane, piana, dym, efekty świetlne</li>
        <li><i class="fas fa-rainbow" style="color: #CFB53B;"></i> Kolorystyka dopasowana do motywu imprezy</li>
      </ul>
    `
  };


const maskotki = {
    mis: {
      img: 'resources/photos/mis.jpg',
      alt: 'Miś PartyStacji',
      text: `Nasz firmowy miś – uroczy, przyjazny i zawsze gotowy do zabawy.
            Idealny wybór na roczek, chrzest lub sesję z fotobudką.`,
      desc: `
        <ul class="list-unstyled ps-3 fs-5">
            <li><i class="fas fa-gift" style="color: #CFB53B;"></i> Rozdaje balony i przytulasy</li>
            <li><i class="fas fa-music" style="color: #CFB53B;"></i> Tańczy z dziećmi</li>
            <li><i class="fas fa-hand-wave" style="color: #CFB53B;"></i> Pozdrawia gości przy wejściu</li>
            <li><i class="fas fa-birthday-cake" style="color: #CFB53B;"></i> Świetnie prezentuje się przy torcie</li>
        </ul>
        `
    },
    panda: {
      img: 'resources/photos/panda.jpg',
      alt: 'Panda Przytulanka',
      text: `Spokojna, urocza i niezwykle fotogeniczna. Dzieci ją uwielbiają – dorośli też!`,
      desc: `
        <ul class="list-unstyled ps-3 fs-5">
            <li><i class="fas fa-camera" style="color: #CFB53B;"></i> Wspólne zdjęcia i przytulanki</li>
            <li><i class="fas fa-gift" style="color: #CFB53B;"></i> Obecność przy wręczaniu prezentów</li>
            <li><i class="fas fa-music" style="color: #CFB53B;"></i> Zabawy ruchowe i taneczne</li>
            <li><i class="fas fa-camera-retro" style="color: #CFB53B;"></i> Opcjonalna asysta przy fotobudce</li>
        </ul>
`
    },
    stich: {
      img: 'resources/photos/stitch.jpg',
      alt: 'Stich',
      text: `Mały, niebieski rozrabiaka z ogromnym sercem. Dla fanów bajek i imprez z humorem!`,
      desc: `
        <ul class="list-unstyled ps-3 fs-5">
            <li><i class="fas fa-laugh" style="color: #CFB53B;"></i> Zabawy i wygłupy z dziećmi</li>
            <li><i class="fas fa-users" style="color: #CFB53B;"></i> Interakcja z gośćmi i wspólne zdjęcia</li>
            <li><i class="fas fa-birthday-cake" style="color: #CFB53B;"></i> Idealny na imprezy urodzinowe z motywem bajkowym</li>
            <li><i class="fas fa-heart" style="color: #CFB53B;"></i> Duet ze swoją uroczą towarzyszką – Angel!</li>
        </ul>
        `
    },
    angel: {
      img: 'resources/photos/angel.jpg',
      alt: 'Angel',
      text: `Piękna, różowa bohaterka, taniec i animacje dla najmłodszych, element niespodzianki...`,
      desc: `
        <ul class="list-unstyled ps-3 fs-5">
          <li><i class="fas fa-music" style="color: #CFB53B;"></i> Taniec i animacje dla najmłodszych</li>
          <li><i class="fas fa-heart" style="color: #CFB53B;"></i> Przyjacielskie uściski i wspólne selfie</li>
          <li><i class="fas fa-surprise" style="color: #CFB53B;"></i> Element niespodzianki na każdej imprezie</li>
          <li><i class="fas fa-palette" style="color: #CFB53B;"></i> Doskonale pasuje do dekoracji w stylu „pastel party"</li>
        </ul>
      `
    }
  };

function loadMaskotka(id) {
  const container = document.getElementById('maskotkaDetail');
  const m = maskotki[id];
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
      <hr>
    <button class="btn btn-warning shadow rounded-pill px-4 py-2 fw-bold" 
            onclick="showOfferSection('maskotki')" style="background: linear-gradient(135deg, #CFB53B, #B8860B); border: none;">
      <i class="fas fa-arrow-left"></i>
    <br>
        Powrót do maskotki
    </button>`;
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

  function showOfferSection(section) {
    const ofertaContent = document.getElementById('oferta-content');
    ofertaContent.classList.add('fade-out');
    setTimeout(() => {
      ofertaContent.innerHTML = oferta[section];
      if (section === 'maskotki') {
        setTimeout(() => initMaskotki(), 100);
      }
      ofertaContent.classList.remove('fade-out');
    }, 250);
  }

  // Initialize when page loads
  document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('oferta-content')) {
      initMaskotki();
    }
  });
