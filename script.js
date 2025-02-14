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

// Losowe przesunięcie przycisku "Nie" wewnątrz kontenera, z rezerwacją dolnej strefy
function moveButtonRandomly(btn) {
  const container = document.querySelector('.container');
  const containerRect = container.getBoundingClientRect();
  const btnRect = btn.getBoundingClientRect();

  // Rezerwujemy trochę miejsca na tekst na dole
  const reservedSpace = 60; 
  const maxX = containerRect.width - btnRect.width;
  const maxY = containerRect.height - btnRect.height - reservedSpace;
  const randX = Math.random() * (maxX > 0 ? maxX : 0);
  const randY = Math.random() * (maxY > 0 ? maxY : 0);

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

// Tworzenie unoszących się serduszek
function createHearts() {
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = Math.random() * window.innerHeight + 'px';
    heart.style.animationDelay = Math.random() * 2 + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 10000);
  }
}

// Dodawanie 4 GIF-ów w narożnikach kontenera
function createCornerGifs() {
  const container = document.querySelector('.container');
  const gifUrls = [
    "https://media1.tenor.com/m/RZ7pYcEc-UgAAAAC/bubu-bubu-dudu.gif",
    "https://media1.tenor.com/m/UXLmgQdkDesAAAAd/robert-bri.gif",
    "https://media1.tenor.com/m/ZgEwD09MywgAAAAC/dudu-kissing-bubu-hearts.gif",
    "https://media1.tenor.com/m/N6z7fKyQXCgAAAAd/bubu-dudu-bubu.gif"
  ];
  const cornerClasses = ["top-left", "top-right", "bottom-left", "bottom-right"];

  gifUrls.forEach((url, index) => {
    const gif = document.createElement('img');
    gif.src = url;
    gif.alt = "Animowany GIF miłości";
    gif.classList.add("corner-gif", cornerClasses[index]);
    container.appendChild(gif);
    setTimeout(() => gif.remove(), 10000);
  });
}
