const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((error) => console.warn('Service worker registration failed:', error));
  });
}

let deferredPrompt;
const installButton = document.getElementById('installButton');
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  if (installButton) installButton.style.display = 'inline-block';
});
if (installButton) {
  installButton.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installButton.style.display = 'none';
  });
}

const subjects = [
  { name: 'Mathematics', summary: 'Practice algebra, measurements, geometry, and statistics.', focus: 'Focus: equations, fractions, and graphs.' },
  { name: 'English', summary: 'Build reading, writing, grammar, and comprehension skills.', focus: 'Focus: vocabulary, essays, and comprehension.' },
  { name: 'Kiswahili', summary: 'Strengthen reading, listening, and practical communication.', focus: 'Focus: grammar, reading, and conversation.' },
  { name: 'Integrated Science', summary: 'Explore scientific concepts with step-by-step examples.', focus: 'Focus: cells, energy, and investigations.' },
  { name: 'Social Studies', summary: 'Study history, geography, and citizenship in context.', focus: 'Focus: government, heritage, and community.' },
  { name: 'Computer Studies', summary: 'Learn digital skills, logic, and safe technology use.', focus: 'Focus: coding basics and digital literacy.' }
];

const questionBank = {
  Mathematics: [
    { prompt: 'Simplify: 3(2x + 4) - 5x', options: ['x + 12', 'x + 4', '6x + 12', 'x + 8'], answer: 'x + 12', hint: 'Expand the bracket first, then collect like terms.' },
    { prompt: 'What is 25% of 200?', options: ['25', '50', '75', '100'], answer: '50', hint: 'A quarter of 200 is 50.' },
    { prompt: 'A triangle has angles of 50° and 60°. What is the third angle?', options: ['70°', '80°', '90°', '100°'], answer: '70°', hint: 'Angles in a triangle add to 180°.' },
    { prompt: 'Solve: 2x + 5 = 17', options: ['6', '7', '8', '9'], answer: '6', hint: 'Subtract 5 first, then divide by 2.' },
    { prompt: 'What is the value of 7²?', options: ['14', '49', '36', '56'], answer: '49', hint: 'Square means multiply by itself.' }
  ],
  English: [
    { prompt: 'Which sentence is grammatically correct?', options: ['She don’t know the answer.', 'She doesn’t know the answer.', 'She not know the answer.', 'She doesn’t knows the answer.'], answer: 'She doesn’t know the answer.', hint: 'Use the correct third-person singular verb form.' },
    { prompt: 'Choose the noun in this sentence: The teacher wrote on the board.', options: ['wrote', 'on', 'teacher', 'the'], answer: 'teacher', hint: 'A noun names a person, place, thing, or idea.' },
    { prompt: 'Which word is an antonym of “happy”?', options: ['glad', 'joyful', 'sad', 'cheerful'], answer: 'sad', hint: 'Think of the opposite meaning.' },
    { prompt: 'Which word best completes the sentence: “I have ___ apples.”', options: ['many', 'much', 'little', 'some'], answer: 'some', hint: 'Choose the word that fits countable items in a simple sentence.' },
    { prompt: 'What is the main purpose of a paragraph?', options: ['To mix colours', 'To present one main idea', 'To create a map', 'To build a machine'], answer: 'To present one main idea', hint: 'A paragraph focuses on one idea.' }
  ],
  Kiswahili: [
    { prompt: 'Neno lipi ni kivumishi katika sentensi: “Mti mzuri ulivunwa.”', options: ['mti', 'mzuri', 'ulivunwa', 'na'], answer: 'mzuri', hint: 'Kivumishi kinaeleza jina.' },
    { prompt: 'Ni ipi ni sentensi sahihi?', options: ['Mimi kwenda shule.', 'Mimi ninakwenda shule.', 'Mimi kwenda shuleni.', 'Mimi kwenda kwa shule.'], answer: 'Mimi ninakwenda shule.', hint: 'Tumia kitenzi sahihi kinacholingana na mhusika.' },
    { prompt: 'Chagua kitenzi katika sentensi: “Wanafunzi wanasoma kwa makini.”', options: ['wanafunzi', 'kwa', 'makini', 'soma'], answer: 'soma', hint: 'Kitenzi ni neno linaloonyesha hatua.' },
    { prompt: 'Ni sentensi gani ina kivumishi?', options: ['Mtoto anacheza.', 'Mti mkubwa uko nje.', 'Sisi tunakaa.', 'Wanafunzi wanasoma.'], answer: 'Mti mkubwa uko nje.', hint: 'Kivumishi huonyesha sifa ya kitu.' },
    { prompt: 'Kitu gani huandikwa kwenye kalamu?', options: ['majani', 'sija', 'mali', 'picha'], answer: 'sija', hint: 'Kijitabu cha kuandikia.' }
  ],
  'Integrated Science': [
    { prompt: 'Which statement best explains why plants need sunlight?', options: ['To absorb water from the soil', 'To make food by photosynthesis', 'To move nutrients through roots', 'To increase their weight in darkness'], answer: 'To make food by photosynthesis', hint: 'Plants make food using light energy.' },
    { prompt: 'What is the main function of red blood cells?', options: ['To digest food', 'To carry oxygen', 'To produce saliva', 'To absorb sunlight'], answer: 'To carry oxygen', hint: 'They transport a vital gas around the body.' },
    { prompt: 'What is the source of energy for the water cycle?', options: ['The Moon', 'The Sun', 'The Earth', 'The stars'], answer: 'The Sun', hint: 'Think about what heats water and causes evaporation.' },
    { prompt: 'Which part of the human body pumps blood?', options: ['Lungs', 'Heart', 'Liver', 'Kidneys'], answer: 'Heart', hint: 'This organ beats continuously.' },
    { prompt: 'What do we call the process of changing liquid water into vapour?', options: ['Condensation', 'Evaporation', 'Freezing', 'Melting'], answer: 'Evaporation', hint: 'The liquid changes into gas.' }
  ],
  'Social Studies': [
    { prompt: 'What is the main function of Parliament in Kenya?', options: ['To carry out medical services', 'To make laws', 'To teach in schools', 'To collect taxes only'], answer: 'To make laws', hint: 'Recall the legislative arm of government.' },
    { prompt: 'Which of these is a right of a citizen?', options: ['To ignore school rules', 'To vote', 'To damage public property', 'To refuse to pay taxes'], answer: 'To vote', hint: 'Think about democratic participation.' },
    { prompt: 'What is a map used for?', options: ['To cook food', 'To show locations and features', 'To measure time', 'To grow crops'], answer: 'To show locations and features', hint: 'Maps help us understand places.' },
    { prompt: 'What is the capital city of Kenya?', options: ['Mombasa', 'Nairobi', 'Kisumu', 'Nakuru'], answer: 'Nairobi', hint: 'It is the main administrative centre.' },
    { prompt: 'Which value helps people live peacefully together?', options: ['Rudeness', 'Respect', 'Violence', 'Neglect'], answer: 'Respect', hint: 'It promotes harmony in a community.' }
  ],
  'Computer Studies': [
    { prompt: 'In a computer system, what does CPU stand for?', options: ['Central Processing Unit', 'Computer Power Unit', 'Central Program Utility', 'Control Processing Utility'], answer: 'Central Processing Unit', hint: 'It is the brain of the computer.' },
    { prompt: 'Which of these is a safe online practice?', options: ['Sharing passwords with friends', 'Opening unknown links', 'Using strong passwords', 'Posting private details publicly'], answer: 'Using strong passwords', hint: 'Good digital safety begins with strong protection.' },
    { prompt: 'What does the keyboard do?', options: ['Stores data permanently', 'Inputs text and commands', 'Displays images', 'Produces sound'], answer: 'Inputs text and commands', hint: 'Think of how you type and send instructions.' },
    { prompt: 'What is the main use of a browser?', options: ['To print documents', 'To access websites', 'To cook food', 'To edit videos'], answer: 'To access websites', hint: 'It helps you move around the web.' },
    { prompt: 'Which device is used to store files?', options: ['Keyboard', 'Mouse', 'Hard drive', 'Monitor'], answer: 'Hard drive', hint: 'It keeps data for later use.' }
  ]
};

const extraChallengeBank = {
  Mathematics: [
    { prompt: 'What is the greatest common factor of 12 and 18?', options: ['3', '6', '9', '12'], answer: '6', hint: 'Find the largest number that divides both evenly.' },
    { prompt: 'If a = 4 and b = 3, what is 2a + b?', options: ['7', '8', '9', '11'], answer: '11', hint: 'Substitute the values first.' }
  ],
  English: [
    { prompt: 'Which sentence uses the correct punctuation?', options: ['I am ready to learn!', 'I am ready to learn', 'I am ready to learn?', 'I am ready to learn.'], answer: 'I am ready to learn!', hint: 'Use exclamation marks for excitement.' }
  ],
  Kiswahili: [
    { prompt: 'Ni neno lipi ni kinyume cha “nzuri”?', options: ['bora', 'mbaya', 'kubwa', 'mrefu'], answer: 'mbaya', hint: 'Kinyume kinaonyesha ubaya.' }
  ],
  'Integrated Science': [
    { prompt: 'Which gas do humans breathe in?', options: ['Carbon dioxide', 'Oxygen', 'Hydrogen', 'Nitrogen'], answer: 'Oxygen', hint: 'It is the gas needed for breathing.' }
  ],
  'Social Studies': [
    { prompt: 'Which institution protects the rights of citizens in Kenya?', options: ['School', 'Court', 'Market', 'Hospital'], answer: 'Court', hint: 'Courts help interpret laws and settle disputes.' }
  ],
  'Computer Studies': [
    { prompt: 'What does a mouse help you do?', options: ['Type text', 'Move the cursor', 'Store data', 'Print pages'], answer: 'Move the cursor', hint: 'It controls the pointer on screen.' }
  ]
};

const state = {
  selectedSubject: subjects[0].name,
  currentQuestion: 0,
  score: 0,
  xp: 0,
  streak: 0,
  badges: 0,
  quizFinished: false,
  currentQuiz: [],
  subscription: 'Free',
  mode: 'Quick',
  notes: [],
  quizHistory: [],
  storageUsedMb: 0,
  storageQuotaMb: 0,
  storageEnabled: false
};

const subjectGrid = document.getElementById('subjectGrid');
const subjectDetail = document.getElementById('subjectDetail');
const subjectSelect = document.getElementById('subjectSelect');
const modeSelect = document.getElementById('modeSelect');
const quizPrompt = document.getElementById('quizPrompt');
const answerButtons = document.getElementById('answerButtons');
const feedback = document.getElementById('feedback');
const questionCount = document.getElementById('questionCount');
const scoreCount = document.getElementById('scoreCount');
const planStatus = document.getElementById('planStatus');
const hintButton = document.getElementById('hintButton');
const restartButton = document.getElementById('restartButton');
const newQuizButton = document.getElementById('newQuizButton');
const nextQuestionButton = document.getElementById('nextQuestionButton');
const aiTutorText = document.getElementById('aiTutorText');
const tutorPrompt = document.getElementById('tutorPrompt');
const askTutorButton = document.getElementById('askTutorButton');
const voiceButton = document.getElementById('voiceButton');
const xpValue = document.getElementById('xpValue');
const streakValue = document.getElementById('streakValue');
const badgeValue = document.getElementById('badgeValue');
const plansGrid = document.getElementById('plansGrid');
const subscriptionStatus = document.getElementById('subscriptionStatus');
const storageBar = document.getElementById('storageBar');
const storageStatus = document.getElementById('storageStatus');
const persistButton = document.getElementById('persistButton');
const noteInput = document.getElementById('noteInput');
const saveNoteButton = document.getElementById('saveNoteButton');
const clearNotesButton = document.getElementById('clearNotesButton');
const noteList = document.getElementById('noteList');

function loadProgress() {
  const saved = localStorage.getItem('genius-progress');
  if (!saved) return;
  const parsed = JSON.parse(saved);
  state.xp = parsed.xp || 0;
  state.streak = parsed.streak || 0;
  state.badges = parsed.badges || 0;
  state.subscription = parsed.subscription || 'Free';
  state.mode = parsed.mode || 'Quick';
  state.notes = parsed.notes || [];
  state.quizHistory = parsed.quizHistory || [];
}

function saveProgress() {
  try {
    localStorage.setItem('genius-progress', JSON.stringify({
      xp: state.xp,
      streak: state.streak,
      badges: state.badges,
      subscription: state.subscription,
      mode: state.mode,
      notes: state.notes,
      quizHistory: state.quizHistory
    }));
  } catch (error) {
    console.warn('Unable to save progress locally:', error);
  }
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getQuestionPool(subjectName) {
  const baseQuestions = questionBank[subjectName] || [];
  const challengeQuestions = state.mode === 'Infinite' || state.mode === 'Mastery' ? extraChallengeBank[subjectName] || [] : [];
  return [...baseQuestions, ...challengeQuestions];
}

function buildQuiz(subjectName) {
  const pool = getQuestionPool(subjectName);
  const modeLength = state.mode === 'Infinite' ? 10 : state.mode === 'Mastery' ? 8 : 5;
  const quizLength = state.subscription === 'Elite' ? modeLength + 2 : state.subscription === 'Pro' ? modeLength + 1 : modeLength;
  state.currentQuiz = shuffle(pool).slice(0, Math.min(quizLength, pool.length));
  state.currentQuestion = 0;
  state.score = 0;
  state.quizFinished = false;
  renderQuiz();
}

function renderSubjects() {
  subjectGrid.innerHTML = '';
  subjects.forEach((subject) => {
    const card = document.createElement('article');
    card.className = `card ${subject.name === state.selectedSubject ? 'active' : ''}`;
    card.innerHTML = `<h3>${subject.name}</h3><p>${subject.summary}</p><strong>${subject.focus}</strong>`;
    card.addEventListener('click', () => {
      state.selectedSubject = subject.name;
      subjectSelect.value = subject.name;
      renderSubjects();
      renderSubjectDetail();
      buildQuiz(subject.name);
    });
    subjectGrid.appendChild(card);
  });
}

function renderSubjectDetail() {
  const subject = subjects.find((item) => item.name === state.selectedSubject);
  if (!subject) return;
  subjectDetail.innerHTML = `<h3>${subject.name}</h3><p>${subject.summary}</p><p><strong>Suggested practice:</strong> ${subject.focus}</p><p>Open a fresh quiz set whenever you want more challenge.</p>`;
}

function renderQuiz() {
  if (!state.currentQuiz.length) {
    buildQuiz(state.selectedSubject);
    return;
  }
  if (state.quizFinished) {
    quizPrompt.textContent = `You finished the quiz! Your score is ${state.score}/${state.currentQuiz.length}.`;
    answerButtons.innerHTML = '';
    feedback.textContent = 'Excellent work. Start another round to keep growing.';
    questionCount.textContent = 'Quiz complete';
    scoreCount.textContent = `Score: ${state.score}`;
    aiTutorText.textContent = 'You are building strong momentum. Ask for another hint or start a new quiz.';
    const bonus = state.mode === 'Infinite' ? 15 : state.mode === 'Mastery' ? 10 : 5;
    state.xp += state.score * 10 + bonus;
    state.streak += 1;
    state.badges += state.score >= Math.ceil(state.currentQuiz.length * 0.7) ? 1 : 0;
    state.quizHistory.push({ subject: state.selectedSubject, mode: state.mode, score: state.score, date: new Date().toLocaleDateString() });
    saveProgress();
    updateProgress();
    return;
  }
  const question = state.currentQuiz[state.currentQuestion];
  quizPrompt.textContent = question.prompt;
  questionCount.textContent = `Question ${state.currentQuestion + 1}/${state.currentQuiz.length}`;
  scoreCount.textContent = `Score: ${state.score}`;
  feedback.textContent = '';
  answerButtons.innerHTML = '';
  question.options.forEach((option) => {
    const button = document.createElement('button');
    button.className = 'answer-btn';
    button.textContent = option;
    button.addEventListener('click', () => handleAnswer(option));
    answerButtons.appendChild(button);
  });
}

function handleAnswer(option) {
  const current = state.currentQuiz[state.currentQuestion];
  if (option === current.answer) {
    state.score += 1;
    feedback.textContent = 'Correct! Great work.';
    aiTutorText.textContent = `Great choice! ${current.hint}`;
  } else {
    feedback.textContent = `Not quite. The correct answer is ${current.answer}.`;
    aiTutorText.textContent = `Try again with this hint: ${current.hint}`;
  }
  state.currentQuestion += 1;
  if (state.currentQuestion >= state.currentQuiz.length) {
    state.quizFinished = true;
  }
  setTimeout(() => renderQuiz(), 900);
}

function handleHint() {
  const current = state.currentQuiz[state.currentQuestion];
  aiTutorText.textContent = `Hint: ${current.hint}`;
  feedback.textContent = 'Take your time and think through the idea.';
}

function restartQuiz() {
  buildQuiz(state.selectedSubject);
}

function nextQuestion() {
  if (state.currentQuestion < state.currentQuiz.length - 1) {
    state.currentQuestion += 1;
    renderQuiz();
  } else {
    feedback.textContent = 'This was the last question. Start a fresh quiz for more practice.';
  }
}

function askTutor() {
  const current = state.currentQuiz[state.currentQuestion];
  const input = tutorPrompt.value.trim();
  const base = input ? input : 'Explain this question to me';
  let response = `Tutor tip: ${current.hint}`;
  if (base.toLowerCase().includes('explain')) {
    response = `Tutor explanation: First, read the question carefully. Then identify the key terms before choosing an answer. For this question, ${current.hint.toLowerCase()}`;
  } else if (base.toLowerCase().includes('step')) {
    response = `Tutor step plan: 1) Read the question. 2) Eliminate wrong options. 3) Pick the best answer. ${current.hint}`;
  }
  aiTutorText.textContent = response;
  feedback.textContent = 'The tutor has shared a guide. Use it to learn the reasoning.';
}

function speakHint() {
  const text = aiTutorText.textContent;
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  }
}

function updateProgress() {
  xpValue.textContent = state.xp;
  streakValue.textContent = state.streak;
  badgeValue.textContent = state.badges;
}

function renderPlans() {
  const plans = [
    { name: 'Free', price: 'Ksh 0', description: 'Daily practice with a quick start.', perks: ['Basic questions', 'Limited hints', 'Daily progress'] },
    { name: 'Pro', price: 'Ksh 499', description: 'Unlock longer mastery study sets and richer tutor support.', perks: ['Mastery quiz sets', 'Unlimited hints', 'Premium streak rewards'], featured: true },
    { name: 'Elite', price: 'Ksh 999', description: 'Get the deepest practice and continuous challenge flow.', perks: ['Infinite quizzes', 'Priority tutor guidance', 'Extra storage boost'] }
  ];
  plansGrid.innerHTML = '';
  plans.forEach((plan) => {
    const card = document.createElement('article');
    card.className = `plan-card ${plan.featured ? 'featured' : ''}`;
    card.innerHTML = `
      <h3>${plan.name}</h3>
      <p>${plan.description}</p>
      <div class="plan-price">${plan.price}</div>
      <ul>${plan.perks.map((perk) => `<li>${perk}</li>`).join('')}</ul>
      <button class="btn btn-primary" data-plan="${plan.name}">Subscribe</button>
    `;
    card.querySelector('button').addEventListener('click', () => subscribe(plan.name));
    plansGrid.appendChild(card);
  });
}

function subscribe(planName) {
  state.subscription = planName;
  saveProgress();
  updateSubscription();
}

function updateSubscription() {
  const label = state.subscription === 'Elite' ? 'Elite Plan' : state.subscription === 'Pro' ? 'Pro Plan' : 'Free Plan';
  planStatus.textContent = `${label} • ${state.mode}`;
  subscriptionStatus.textContent = `${label} active. ${state.subscription === 'Free' ? 'Upgrade to unlock richer quizzes and more tutor help.' : 'You now have premium study access.'}`;
}

function populateSubjectSelect() {
  subjectSelect.innerHTML = subjects.map((subject) => `<option value="${subject.name}" ${subject.name === state.selectedSubject ? 'selected' : ''}>${subject.name}</option>`).join('');
  subjectSelect.addEventListener('change', (event) => {
    state.selectedSubject = event.target.value;
    renderSubjects();
    renderSubjectDetail();
    buildQuiz(state.selectedSubject);
  });
}

function renderNotes() {
  noteList.innerHTML = '';
  if (!state.notes.length) {
    noteList.innerHTML = '<p class="note-item">Your notes will appear here as your study vault grows.</p>';
    return;
  }
  state.notes.slice(0, 8).forEach((note) => {
    const item = document.createElement('div');
    item.className = 'note-item';
    item.textContent = note.text;
    noteList.appendChild(item);
  });
}

function saveNote() {
  const text = noteInput.value.trim();
  if (!text) return;
  state.notes.unshift({ id: Date.now(), text });
  state.notes = state.notes.slice(0, 12);
  noteInput.value = '';
  saveProgress();
  renderNotes();
}

function clearNotes() {
  state.notes = [];
  saveProgress();
  renderNotes();
}

async function updateStorageEstimate() {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    const estimate = await navigator.storage.estimate();
    state.storageUsedMb = Number(((estimate.usage || 0) / (1024 * 1024)).toFixed(1));
    state.storageQuotaMb = Number(((estimate.quota || 0) / (1024 * 1024)).toFixed(1));
    if (!state.storageQuotaMb) {
      state.storageQuotaMb = 500;
    }
    state.storageEnabled = state.storageQuotaMb >= 100;
    const percentage = Math.min(100, Math.round((state.storageUsedMb / 500) * 100));
    storageBar.style.width = `${percentage}%`;
    storageStatus.textContent = `Used ${state.storageUsedMb} MB of ${Math.max(state.storageQuotaMb, 500)} MB target. Persistent storage ${state.storageEnabled ? 'ready' : 'available'}.`;
  } else {
    storageStatus.textContent = 'Storage estimate isn’t available in this browser yet.';
  }
}

async function requestPersistentStorage() {
  if ('storage' in navigator && 'persist' in navigator.storage) {
    const granted = await navigator.storage.persist();
    state.storageEnabled = granted;
  }
  await updateStorageEstimate();
}

hintButton.addEventListener('click', handleHint);
restartButton.addEventListener('click', restartQuiz);
newQuizButton.addEventListener('click', () => buildQuiz(state.selectedSubject));
nextQuestionButton.addEventListener('click', nextQuestion);
askTutorButton.addEventListener('click', askTutor);
voiceButton.addEventListener('click', speakHint);
saveNoteButton.addEventListener('click', saveNote);
clearNotesButton.addEventListener('click', clearNotes);
persistButton.addEventListener('click', requestPersistentStorage);
modeSelect.addEventListener('change', (event) => {
  state.mode = event.target.value;
  updateSubscription();
  buildQuiz(state.selectedSubject);
  saveProgress();
});

loadProgress();
updateProgress();
populateSubjectSelect();
renderSubjects();
renderSubjectDetail();
renderPlans();
renderNotes();
updateSubscription();
modeSelect.value = state.mode;
buildQuiz(state.selectedSubject);
requestPersistentStorage();
