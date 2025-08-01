const wrapContainer = document.getElementById('wrapContainer');

const soundList = [
  'duck.mp3',
  'cricket.mp3',
  'frog.mp3',
  'irie.mp3',
  'minions.mp3',
  'siren.mp3'
];

let currentSound = null;

function playRandomPopSound() {
  if (currentSound) {
    currentSound.pause();
    currentSound.currentTime = 0;
  }

  const randomFile = soundList[Math.floor(Math.random() * soundList.length)];
  currentSound = new Audio(`../assets/sounds/${randomFile}`);
  currentSound.play();

  setTimeout(() => {
    if (currentSound) {
      currentSound.pause();
      currentSound.currentTime = 0;
    }
  }, 5000);
}

function createBubbleGrid(rows = 10, cols = 10) {
  wrapContainer.innerHTML = "";
  for (let i = 0; i < rows * cols; i++) {
    const bubble = document.createElement('div');
    bubble.classList.add('wrap-bubble');
    bubble.addEventListener('click', () => {
      playRandomPopSound();
      bubble.style.transform = 'scale(0.6)';
      bubble.style.opacity = '0.3';
      bubble.style.pointerEvents = 'none';
    });
    wrapContainer.appendChild(bubble);
  }
}

createBubbleGrid(10, 10);
