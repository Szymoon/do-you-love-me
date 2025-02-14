// Licznik kliknięć przycisku "Nie"
let noClickCount = 0;

const nieButton = document.getElementById('nieButton');
const takButton = document.getElementById('takButton');
const messageDiv = document.getElementById('message');

// Obsługa kliknięcia "Nie"
nieButton.addEventListener('click', () => {
  noClickCount++;
  if (noClickCount === 1) {
    messageDiv.innerText = "Nie bądź taka nieśmiała!";
    moveButtonRandomly(nieButton);
  } else if (noClickCount === 2) {
    messageDiv.innerText = "Wiem, że mnie kochasz!";
    moveButtonRandomly(nieButton);
  } else {
    messageDiv.innerText = "Musisz wybrać TAK!";
    moveButtonRandomly(nieButton);
  }
});

// Obsługa kliknięcia "Tak"
takButton.addEventListener('click', () => {
  messageDiv.innerText = "Kocham Cię również!";
  takButton.disabled = true;
  nieButton.disabled = true;
  triggerLoveBomb();
});

// Losowe przesunięcie przycisku "Nie" wewnątrz kontenera
function moveButtonRandomly(btn) {
  const container = document.querySelector('.container');
  const containerRect = container.getBoundingClientRect();
  const btnRect = btn.getBoundingClientRect();

  const maxX = containerRect.width - btnRect.width;
  const maxY = containerRect.height - btnRect.height;
  const randX = Math.random() * maxX;
  const randY = Math.random() * maxY;

  btn.style.position = 'absolute';
  btn.style.left = randX + 'px';
  btn.style.top = randY + 'px';
}

// Wywołanie konfetti, serduszek i 4 animowanych GIF-ów
function triggerLoveBomb() {
  // Konfetti
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6 }
  });

  // Serduszka
  createHearts();

  // GIF-y w narożnikach
  createCornerGifs();
}

// Tworzy unoszące się serduszka w całym oknie
function createHearts() {
  // Pobieramy szerokość i wysokość ekranu
  const docWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const docHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  for (let i = 0; i < 30; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * docWidth + 'px';
    heart.style.top = Math.random() * docHeight + 'px';
    heart.style.animationDelay = Math.random() * 2 + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 10000);
  }
}

// Dodaje 4 GIF-y w narożnikach kontenera, z dynamicznymi wartościami %
function createCornerGifs() {
  const container = document.querySelector('.container');
  const gifUrls = [
    "https://media1.tenor.com/m/RZ7pYcEc-UgAAAAC/bubu-bubu-dudu.gif",
    "https://media1.tenor.com/m/UXLmgQdkDesAAAAd/robert-bri.gif",
    "https://media1.tenor.com/m/ZgEwD09MywgAAAAC/dudu-kissing-bubu-hearts.gif",
    "https://media1.tenor.com/m/N6z7fKyQXCgAAAAd/bubu-dudu-bubu.gif"
  ];
  
  gifUrls.forEach((url, index) => {
    const gif = document.createElement('img');
    gif.src = url;
    gif.alt = "Animowany GIF miłości";
    gif.className = "corner-gif";
    
    // Mniejsze przesunięcie -10% zamiast -30%, lepiej pasuje na telefonach
    if (index === 0) { // lewy górny
      gif.style.top = '-10%';
      gif.style.left = '-10%';
    } else if (index === 1) { // prawy górny
      gif.style.top = '-10%';
      gif.style.right = '-10%';
    } else if (index === 2) { // lewy dolny
      gif.style.bottom = '-10%';
      gif.style.left = '-10%';
    } else if (index === 3) { // prawy dolny
      gif.style.bottom = '-10%';
      gif.style.right = '-10%';
    }
    
    container.appendChild(gif);
    // Pozostawiamy GIF przez 100 sekund (zmień w razie potrzeby)
    setTimeout(() => gif.remove(), 100000);
  });
}
