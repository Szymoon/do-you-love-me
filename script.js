// Licznik kliknięć przycisku "Nie"
let noClickCount = 0;

const nieButton = document.getElementById('nieButton');
const takButton = document.getElementById('takButton');
const messageDiv = document.getElementById('message');

nieButton.addEventListener('click', function(e) {
  noClickCount++;
  if (noClickCount === 1) {
    messageDiv.innerText = "Nie bądź taka nieśmiała!";
    moveButtonRandomly(nieButton);
  } else if (noClickCount === 2) {
    messageDiv.innerText = "Wiem, że mnie kochasz!";
    moveButtonRandomly(nieButton);
  } else if (noClickCount >= 3) {
    messageDiv.innerText = "Musisz wybrać TAK!";
    moveButtonRandomly(nieButton);
  }
});

// Kliknięcie "Tak" wyzwala efekt love bomb
takButton.addEventListener('click', function() {
  messageDiv.innerText = "Kocham Cię również!";
  // Wyłącz oba przyciski
  takButton.disabled = true;
  nieButton.disabled = true;
  triggerLoveBomb();
});

// Funkcja przesuwająca przycisk "Nie" losowo wewnątrz kontenera
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

// Funkcja wyzwalająca efekty konfetti, serduszek i czterech GIF-ów w narożnikach
function triggerLoveBomb() {
  // Uruchom konfetti (subtelny efekt fajerwerków)
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6 }
  });

  // Tworzenie unoszących się serduszek, "wylewających się" poza białe pudełko
  createHearts();

  // Dodaj cztery GIF-y w narożnikach białego pudełka
  createCornerGifs();
}

// Tworzy wiele serduszek i dodaje je do document.body
function createHearts() {
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    // Losowe pozycje względem okna przeglądarki
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = Math.random() * window.innerHeight + 'px';
    heart.style.animationDelay = Math.random() * 2 + 's';
    document.body.appendChild(heart);
    // Zmieniono czas usuwania na 10000ms (10 sekund)
    setTimeout(() => {
      heart.remove();
    }, 10000);
  }
}

// Tworzy cztery GIF-y w narożnikach kontenera
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
    
    // Ustal pozycje zależnie od indeksu
    if(index === 0) { // lewy górny róg
      gif.style.top = '-100px';
      gif.style.left = '-100px';
    } else if(index === 1) { // prawy górny róg
      gif.style.top = '-100px';
      gif.style.right = '-100px';
    } else if(index === 2) { // lewy dolny róg
      gif.style.bottom = '-100px';
      gif.style.left = '-100px';
    } else if(index === 3) { // prawy dolny róg
      gif.style.bottom = '-100px';
      gif.style.right = '-100px';
    }
    
    container.appendChild(gif);
    // Zmieniono czas usuwania na 10000ms (10 sekund)
    setTimeout(() => {
      gif.remove();
    }, 100000);
  });
}
