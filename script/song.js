const moodSongs = {
  happy: [
    "You're smiling wide, but your inbox screams,\nDeadlines lurking, shattering dreams.\nDancing in meetings like it's a show,\nBut inside you're crying — we all know.",
    "Happy face with eyes so bright,\nStill forgot to log off last night.\nJoyful soul in work attire,\nRunning on 2 hours and caffeine fire."
  ],
  sad: [
    "Sad and slow, the day drags on,\nYour hopes are missing, dreams are gone.\nYou cried in the break room — twice,\nBut hey! Your misery's kind of nice.",
    "Tears and reports all mixed today,\nAnother passive-aggressive email on the way.\nYou weep, the printer jams again,\nLet’s sing your sadness in corporate pain."
  ],
  tired: [
    "Yawning through meetings with vacant eyes,\nKeyboard impressions from power-naps — nice!\nYour soul left the Zoom at 9:03,\nBut your body's here, unfortunately.",
    "Dragging feet through digital hell,\nYou replied to your own email — oh well.\nPowerPoint dreams and Excel fights,\nYou're just surviving through silent nights."
  ],
  overworked: [
    "They said 'just one task', now it's twenty-three,\nYour calendar cried and then ran free.\nYou breathe caffeine, skip your lunch,\nAnd still attend the 3 PM punch.",
    "Deadlines whisper while you eat,\n“Just finish this before you sleep.”\nCorporate chaos, your daily fuel,\nBurnout mode: activated. Cool."
  ],
  chaotic: [
    "Duck quacks in your calendar’s soul,\nYour tasks escape — out of control!\nEvents shuffle like a bad dance,\nBut HR says 'Give stress a chance!'",
    "Your planner is now a meme,\nTime's a myth, a forgotten dream.\nMeetings crash and emails scream,\nWelcome to the chaos team!"
  ]
};

document.getElementById("generate-song").addEventListener("click", () => {
  const mood = document.getElementById("mood").value;
  const output = document.getElementById("song-output");

  if (!mood || !moodSongs[mood]) {
    output.textContent = "Please select your mood to receive your custom roast melody. 🎵";
    return;
  }

  const lines = moodSongs[mood];
  const randomLine = lines[Math.floor(Math.random() * lines.length)];
  output.textContent = randomLine;
});
