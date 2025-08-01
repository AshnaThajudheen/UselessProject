document.addEventListener('DOMContentLoaded', function() {
  const sarcasticQuotes = [
    "Oh look, another pointless meeting.",
    "Who needs lunch breaks anyway?",
    "This could've been an email.",
    "Time to pretend to be productive.",
    "I'd rather be a duck right now.",
    "Let the burnout begin!",
    "More deadlines, less happiness!",
    "Soul-crushing alignment call scheduled!"
  ];

  const quackSound = new Audio('../assets/sounds/duck.mp3');
  const pastelColors = ['#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff'];

  if (!localStorage.getItem('calenDuckEvents')) {
    const defaultEvents = [
      { title: 'Pointless Sync', start: '2025-08-05' },
      { title: 'Lunch? Maybe.', start: '2025-08-12' }
    ];
    localStorage.setItem('calenDuckEvents', JSON.stringify(defaultEvents));
  }

  function getEventsFromStorage() {
    return JSON.parse(localStorage.getItem('calenDuckEvents'));
  }

  function saveEventsToStorage(events) {
    localStorage.setItem('calenDuckEvents', JSON.stringify(events));
  }

  function getRandomColor() {
    return pastelColors[Math.floor(Math.random() * pastelColors.length)];
  }

  function showModal() {
    const modal = document.getElementById('comment-modal');
    const content = document.getElementById('comment-content');
    content.innerText = sarcasticQuotes[Math.floor(Math.random() * sarcasticQuotes.length)];
    modal.style.display = 'flex';
    setTimeout(() => modal.style.display = 'none', 3000);
  }

  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    initialDate: '2025-08-01',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    events: getEventsFromStorage().map(e => ({
      ...e,
      backgroundColor: getRandomColor()
    })),
    eventDidMount: function(info) {
      const quote = sarcasticQuotes[Math.floor(Math.random() * sarcasticQuotes.length)];
      tippy(info.el, {
        content: quote,
        theme: 'light-border',
        placement: 'top'
      });
      info.el.addEventListener('mouseenter', () => {
        quackSound.currentTime = 0;
        quackSound.play().catch(e => console.warn('Quack error:', e));
      });
    },
    dateClick: function(info) {
      const input = document.getElementById('event-input');
      input.dataset.selectedDate = info.dateStr;
      input.placeholder = `Add event for ${info.dateStr}`;
    }
  });

  calendar.render();

  function shuffleEvents() {
    const events = calendar.getEvents();
    const titles = events.map(e => e.title).sort(() => Math.random() - 0.5);
    const dates = events.map(e => e.start).sort(() => Math.random() - 0.5);
    const colors = events.map(e => e.backgroundColor).sort(() => Math.random() - 0.5);

    events.forEach((e, i) => {
      e.setProp('title', titles[i]);
      e.setStart(dates[i]);
      e.setProp('backgroundColor', colors[i]);
    });

    const updated = events.map(e => ({
      title: e.title,
      start: e.startStr,
      backgroundColor: e.backgroundColor
    }));
    saveEventsToStorage(updated);
  }

  document.getElementById('add-event-button').addEventListener('click', () => {
    const input = document.getElementById('event-input');
    const title = input.value.trim();
    const date = input.dataset.selectedDate || calendar.getDate().toISOString().split('T')[0];

    if (title) {
      const newEvent = {
        title,
        start: date,
        backgroundColor: getRandomColor()
      };
      const all = getEventsFromStorage();
      all.push(newEvent);
      saveEventsToStorage(all);
      calendar.addEvent(newEvent);
      input.value = '';
      input.placeholder = 'Add a new chaotic event...';
      showModal();
      setTimeout(shuffleEvents, 8000);
    }
  });
});
