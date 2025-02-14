// Licznik kliknięć przycisku "Nie"
let noClickCount = 0;

const nieButton = document.getElementById('nieButton');
const takButton = document.getElementById('takButton');
const messageDiv = document.getElementById('message');

nieButton.addEventListener('click', function() {
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

// Kliknięcie "Tak" wyzwala efekt love bomb
takButton.addEventListener('click', function() {
  messageDiv.innerText = "Kocham Cię również!";
  takButton.disabled = true;
  nieButton.disabled = true;
  triggerLoveBomb();
});

// Funkcja przesuwająca przycisk "Nie" losowo wewnątrz kontenera,
// z rezerwacją dolnej strefy na wiadomość.
function moveButtonRandomly(btn) {
  const container = document.querySelector('.container');
  const containerRect = container.getBoundingClientRect();
  const btnRect = btn.getBoundingClientRect();
  const reserved = 60; // rezerwacja dolnego obszaru
  const availableHeight = containerRect.height - btnRect.height - reserved;
  const maxX = containerRect.width - btnRect.width;
  const maxY = availableHeight > 0 ? availableHeight : 0;
  const randX = Math.random() * maxX;
  const randY = Math.random() * maxY;
  btn.style.position = 'absolute';
  btn.style.left = randX + 'px';
  btn.style.top = randY + 'px';
}

// Funkcja wyzwalająca efekty: konfetti, serduszka i dynamicznie pozycjonowane GIF-y.
function triggerLoveBomb() {
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { y: 0.6 }
  });
  createHearts();
  createCornerGifs();
}

// Tworzy unoszące się serduszka, pozostające na ekranie przez 10 sekund.
function createHearts() {
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = Math.random() * window.innerHeight + 'px';
    heart.style.animationDelay = Math.random() * 2 + 's';
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 10000);
  }
}

// Tworzy cztery GIF-y i umieszcza je dynamicznie wokół kontenera.
function createCornerGifs() {
  const container = document.querySelector('.container');
  const containerRect = container.getBoundingClientRect();
  const gifUrls = [
    "https://media1.tenor.com/m/RZ7pYcEc-UgAAAAC/bubu-bubu-dudu.gif",
    "https://media1.tenor.com/m/UXLmgQdkDesAAAAd/robert-bri.gif",
    "https://media1.tenor.com/m/ZgEwD09MywgAAAAC/dudu-kissing-bubu-hearts.gif",
    "https://media1.tenor.com/m/N6z7fKyQXCgAAAAd/bubu-dudu-bubu.gif"
  ];
  const margin = 20;
  const gifWidth = 120; // standard szerokość GIF-a
  gifUrls.forEach((url, index) => {
    const gif = document.createElement('img');
    gif.src = url;
    gif.alt = "Animowany GIF miłości";
    gif.className = "corner-gif";
    gif.style.width = gifWidth + "px";
    let top, left;
    if (index === 0) { // lewy górny
      top = containerRect.top - gifWidth - margin;
      left = containerRect.left - margin;
    } else if (index === 1) { // prawy górny
      top = containerRect.top - gifWidth - margin;
      left = containerRect.right + margin - gifWidth;
    } else if (index === 2) { // lewy dolny
      top = containerRect.bottom + margin;
      left = containerRect.left - margin;
    } else if (index === 3) { // prawy dolny
      top = containerRect.bottom + margin;
      left = containerRect.right + margin - gifWidth;
    }
    // Upewnij się, że GIF nie wychodzi poza widoczny obszar ekranu:
    top = Math.max(margin, Math.min(top, window.innerHeight - gifWidth - margin));
    left = Math.max(margin, Math.min(left, window.innerWidth - gifWidth - margin));
    gif.style.top = top + "px";
    gif.style.left = left + "px";
    // Dodajemy do body, aby nie były przycięte przez kontener
    document.body.appendChild(gif);
    setTimeout(() => { gif.remove(); }, 10000);
  });
}
