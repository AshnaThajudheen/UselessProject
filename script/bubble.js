const wrapContainer = document.getElementById('wrapContainer');

const soundList = [
  'duck.mp3',
  'cricket.mp3',
  'frog.mp3',
  'irie.mp3',
  'minions.mp3',
  'siren.mp3'
];

// Preload file paths for faster access (optional, not using <audio> instances to allow overlap)
const soundPaths = soundList.map(file => `../assets/sounds/${file}`);

function playRandomPopSound() {
  const randomFile = soundPaths[Math.floor(Math.random() * soundPaths.length)];
  const sound = new Audio(randomFile);
  sound.play(); // Allow to play independently
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
