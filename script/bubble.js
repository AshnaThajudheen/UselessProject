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

// Preload sound files
const preloadedSounds = soundList.map(filename => {
  const audio = new Audio(`../assets/sounds/${filename}`);
  audio.preload = 'auto';
  return audio;
});

function playRandomPopSound() {
  // Stop and reset the current sound if still playing
  if (currentSound && !currentSound.ended) {
    currentSound.pause();
    currentSound.currentTime = 0;
  }

  // Pick a random preloaded sound
  const randomSound = preloadedSounds[Math.floor(Math.random() * preloadedSounds.length)];
  currentSound = randomSound;

  currentSound.currentTime = 0;
  currentSound.play();
}

// Create bubble grid
function createBubbleGrid(rows = 10, cols = 10) {
  wrapContainer.innerHTML = "";

  for (let i = 0; i < rows * cols; i++) {
    const bubble = document.createElement('div');
    bubble.classList.add('wrap-bubble');

    bubble.addEventListener('click', () => {
      playRandomPopSound();
      bubble.style.transform = 'scale(0.6)';
      bubble.style.opacity = '0.3';
      bubble.style.pointerEvents = 'none'; // disable after pop
    });

    wrapContainer.appendChild(bubble);
  }
}

// Call on load
createBubbleGrid(10, 10);

// Clean up sound on page unload
window.addEventListener('beforeunload', () => {
  if (currentSound) {
    currentSound.pause();
    currentSound.currentTime = 0;
  }
});
