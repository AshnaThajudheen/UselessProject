const typingArea = document.getElementById("typingArea");
const roastText = document.getElementById("roastText");
const scoreText = document.getElementById("scoreText");

// 50 sarcastic roasts
const roasts = [
  "Did you drop your keyboard?",
  "Oh, that's… something.",
  "Ducks type better.",
  "Your confidence is inspiring. Your typing isn’t.",
  "Are you okay?",
  "Autocorrect checked out.",
  "Please... stop.",
  "This is why we can’t have nice things.",
  "Every keystroke hurts me.",
  "Your keyboard deserves better.",
  "Try using one finger at a time. Oh, you already are?",
  "Was that a sneeze or a sentence?",
  "Frog saw this and left.",
  "My circuits are weeping.",
  "I've seen ducks type faster.",
  "This isn't a roast. It's an intervention.",
  "You’re underachieving at an impressive rate.",
  "Even the calendar is judging you.",
  "This input should be illegal.",
  "That typo has a typo.",
  "Welcome to the hall of shame.",
  "It's like you're typing with flippers.",
  "Is your cat helping you?",
  "Bold move… typing like that.",
  "If effort could crash a site, you just did.",
  "I award you no points.",
  "Not even autocorrect could save this.",
  "Was this written in the dark?",
  "Congratulations. You made words worse.",
  "Your backspace key gave up.",
  "Even ducks are quacking in shame.",
  "My processor screamed.",
  "This made my battery drain faster.",
  "404: Good typing not found.",
  "Next time, try not typing.",
  "Duck just flew away.",
  "I expected nothing and you delivered less.",
  "Even a potato types better.",
  "No roast can capture this disaster.",
  "You just broke the English language.",
  "Please don’t submit this anywhere.",
  "Delete this before anyone sees it.",
  "Your sentence just insulted grammar.",
  "Help. I'm stuck in bad typing purgatory.",
  "Was this Morse code?",
  "My eyes… they burn.",
  "Have you considered interpretive dance instead?",
  "Send help. This is tragic.",
  "Why are you like this?",
  "Your keyboard's crying ghost tears."
];

// Words we sabotage
const badWords = {
  "deadline": "duckline",
  "meeting": "meating",
  "urgent": "un-gent",
  "code": "crash",
  "project": "problem",
  "team": "screams",
  "hello": "hellno",
  "email": "spamlet",
  "success": "oops"
};

// Randomly distort letters in a word
const chaosMistype = (word) => {
  return word
    .split("")
    .map((char) =>
      Math.random() < 0.2 ? String.fromCharCode(char.charCodeAt(0) + 1) : char
    )
    .join("");
};

typingArea.addEventListener("input", () => {
  let value = typingArea.value;

  // Slightly mistype words
  let words = value.split(/\s+/).map((word) =>
    Math.random() < 0.25 ? chaosMistype(word) : word
  );

  // Replace serious corporate words
  words = words.map((word) => {
    const lower = word.toLowerCase();
    return badWords[lower] || word;
  });

  typingArea.value = words.join(" ");

  // Show random roast below after 20-30 characters
  if (value.length > 10 && Math.random() < 0.3) {
    const roast = roasts[Math.floor(Math.random() * roasts.length)];
    roastText.innerText = roast;
  }

  // Score emojis when long enough
  if (value.length > 60) {
    const scores = ["💩", "🦥", "🙈", "🧽", "🫠", "🥴", "🐸", "🤡"];
    scoreText.innerText = "Useless score: " + scores[Math.floor(Math.random() * scores.length)];
  } else {
    scoreText.innerText = "";
  }
});
