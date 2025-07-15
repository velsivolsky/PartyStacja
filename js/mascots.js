const oferta = {
    fotobudka: `
      <h3 class="fw-bold mb-3 text-center">📸 Fotobudka 360</h3>
      <p class="lead text-center">Wir emocji, który pokochasz! To nie zwykłe zdjęcia – to kinowe przeżycie.</p>
      <hr>
      <ul class="list-unstyled ps-3 fs-5 text-center">
        <li>🌀 Platforma obrotowa z kamerą slow-motion</li>
        <li>💥 Efekty specjalne, dynamiczne ujęcia</li>
        <li>🎭 Przebrania i rekwizyty do wyboru</li>
        <li>🎉 Idealna pamiątka z każdej imprezy</li>
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
    <span class="visually-hidden">Poprzednie</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#fotobudkaCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Następne</span>
  </button>
</div>
    `,
    maskotki: `
      <h3 class="fw-bold mb-3 text-center">🐻 Maskotki</h3>
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
      <h3 class="fw-bold mb-3 text-center">🎈 Dekoracje</h3>
      <p class="lead text-center">Stworzymy klimat, którego nie zapomnisz. Od bajki po glam.</p>
      <hr>
      <ul class="list-unstyled ps-3 fs-5 text-center">
        <li>🎈 Balony z helem i girlandy tematyczne</li>
        <li>📸 Ścianki zdjęciowe – glamour lub dziecięce</li>
        <li>🫧 Bańki mydlane, piana, dym, efekty świetlne</li>
        <li>🌈 Kolorystyka dopasowana do motywu imprezy</li>
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
            <li>🎈 Rozdaje balony i przytulasy</li>
            <li>🕺 Tańczy z dziećmi</li>
            <li>👋 Pozdrawia gości przy wejściu</li>
            <li>🎂 Świetnie prezentuje się przy torcie</li>
        </ul>
        `
    },
    panda: {
      img: 'resources/photos/panda.jpg',
      alt: 'Panda Przytulanka',
      text: `Spokojna, urocza i niezwykle fotogeniczna. Dzieci ją uwielbiają – dorośli też!`,
      desc: `
        <ul class="list-unstyled ps-3 fs-5">
            <li>📸 Wspólne zdjęcia i przytulanki</li>
            <li>🎁 Obecność przy wręczaniu prezentów</li>
            <li>🎶 Zabawy ruchowe i taneczne</li>
            <li>📷 Opcjonalna asysta przy fotobudce</li>
        </ul>
`
    },
    stich: {
      img: 'resources/photos/stitch.jpg',
      alt: 'Stich',
      text: `Mały, niebieski rozrabiaka z ogromnym sercem. Dla fanów bajek i imprez z humorem!`,
      desc: `
        <ul class="list-unstyled ps-3 fs-5">
            <li>😜 Zabawy i wygłupy z dziećmi</li>
            <li>🫂 Interakcja z gośćmi i wspólne zdjęcia</li>
            <li>🎉 Idealny na imprezy urodzinowe z motywem bajkowym</li>
            <li>👩‍❤️‍👨 Duet ze swoją uroczą towarzyszką – Angel!</li>
        </ul>
        `
    },
    angel: {
      img: 'resources/photos/angel.jpg',
      alt: 'Angel',
      text: `Piękna, różowa bohaterka, taniec i animacje dla najmłodszych, element niespodzianki...`,
      desc: `
    <ul class="list-unstyled ps-3 fs-5">
      <li>💃 Taniec i animacje dla najmłodszych</li>
      <li>🤗 Przyjacielskie uściski i wspólne selfie</li>
      <li>🎁 Element niespodzianki na każdej imprezie</li>
      <li>🎨 Doskonale pasuje do dekoracji w stylu „pastel party”</li>
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
  <div class="container text-center">
    <h2 class="fw-bold mt-4">🎉 Występ maskotki zawiera:</h2>
    <br>
    <ul class="list-unstyled ps-3 fs-5">
    <li>⏰ <strong>30–60 minut</strong> obecności na imprezie</li>
    <li>🤝 Interakcje z gośćmi (przywitania, zdjęcia, taniec)</li>
    <li>🎂 Możliwość personalizacji wejścia (np. wspólne wyjście do tortu)</li>
    <li>📸 Opcjonalne połączenie z usługą fotobudki lub animacji</li>
    </ul>
  </div>
  `;
}


  
  function initMaskotki() {
    document.querySelectorAll('.maskotka-card').forEach(card => {
      card.addEventListener('click', () => {
        loadMaskotka(card.dataset.id);
        document.querySelectorAll('.maskotka-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });
    });
    // Domyślna
    loadMaskotka('mis');
    document.querySelector('.maskotka-card[data-id="mis"]').classList.add('active');
  }
  
  const ofertaContent = document.getElementById("oferta-content");
  const tiles = document.querySelectorAll('[data-show]');
  
  function showOferta(id) {
    ofertaContent.classList.add('fade-out');
  
    setTimeout(() => {
      ofertaContent.innerHTML = oferta[id];
  
      tiles.forEach(tile => {
        tile.classList.remove('active');
        tile.querySelector('.emoji')?.classList.remove('swaying');
      });
  
      const activeTile = document.querySelector(`[data-show="${id}"]`);
      activeTile.classList.add('active');
  
      const emoji = activeTile.querySelector('.emoji');
      emoji.classList.remove('swaying');
      void emoji.offsetWidth; // force reflow
      setTimeout(() => emoji.classList.add('swaying'), 300);
  
      if (id === "maskotki") {
        initMaskotki();
      }
  
      ofertaContent.classList.remove('fade-out');
      ofertaContent.classList.add('fade-in');
  
      // Usuwamy fade-in po animacji, by nie blokować kolejnych
      setTimeout(() => ofertaContent.classList.remove('fade-in'), 400);
  
    }, 400); // Czas trwania fade-out
  }
  
  // Podpinamy eventy raz, np. zaraz po deklaracji zmiennych
  tiles.forEach(tile =>
    tile.addEventListener("click", () => showOferta(tile.dataset.show))
  );
  
  // Na start ładujemy domyślną ofertę
  showOferta('fotobudka');  // lub inny domyślny id
  
  // Inicjalizacja
  showOferta("fotobudka");
  tiles.forEach(btn =>
    btn.addEventListener("click", () => showOferta(tiles.dataset.show))
  );
  



  function showMaskotka(id) {
    const container = document.getElementById('maskotkaDetail');
  
    container.classList.add('fade-out');
  
    setTimeout(() => {
      const m = maskotki[id];
      container.innerHTML = `
        <div class="row align-items-center mb-5">
          <div class="col-md-6 text-center">
            <img src="${m.img}" alt="${m.alt}" class="img-fluid rounded shadow mb-2" style="max-height:400px;">
          </div>
          <div class="col-md-6">
            <h3 class="fw-bold mb-3 fs-1">${m.alt}</h3>
            <p class="lead fw-bold">${m.text}</p>
            ${m.desc}
          </div>
        </div>
        <hr>
        <div class="container text-center">
          <h2 class="fw-bold mt-4">🎉 Występ maskotki zawiera:</h2>
          <br>
          <ul class="list-unstyled ps-3 fs-5">
            <li>⏰ <strong>30–60 minut</strong> obecności na imprezie</li>
            <li>🤝 Interakcje z gośćmi (przywitania, zdjęcia, taniec)</li>
            <li>🎂 Możliwość personalizacji wejścia (np. wspólne wyjście do tortu)</li>
            <li>📸 Opcjonalne połączenie z usługą fotobudki lub animacji</li>
          </ul>
        </div>
      `;
  
      container.classList.remove('fade-out');
      container.classList.add('fade-in');
  
      // Po animacji usuwamy klasę fade-in, żeby efekt można było powtórzyć
      setTimeout(() => container.classList.remove('fade-in'), 400);
  
    }, 400);
  }
  
  function initMaskotki() {
    document.querySelectorAll('.maskotka-card').forEach(card => {
      card.addEventListener('click', () => {
        // Usuń active ze wszystkich kart
        document.querySelectorAll('.maskotka-card').forEach(c => c.classList.remove('active'));
  
        // Dodaj active do klikniętej
        card.classList.add('active');
  
        // Pokaż maskotkę z animacją
        showMaskotka(card.dataset.id);
      });
    });
  
    // Domyślna maskotka
    document.querySelector('.maskotka-card[data-id="mis"]').classList.add('active');
    showMaskotka('mis');
  }