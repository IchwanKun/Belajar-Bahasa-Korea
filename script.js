const hangeulData = {
  basicConsonants: [
    { char: "ㄱ", romaji: "g/k", type: "Konsonan Dasar" },
    { char: "ㄴ", romaji: "n", type: "Konsonan Dasar" },
    { char: "ㄷ", romaji: "d/t", type: "Konsonan Dasar" },
    { char: "ㄹ", romaji: "r/l", type: "Konsonan Dasar" },
    { char: "ㅁ", romaji: "m", type: "Konsonan Dasar" },
    { char: "ㅂ", romaji: "b/p", type: "Konsonan Dasar" },
    { char: "ㅅ", romaji: "s", type: "Konsonan Dasar" },
    { char: "ㅇ", romaji: "ng", type: "Konsonan Dasar" },
    { char: "ㅈ", romaji: "j", type: "Konsonan Dasar" },
    { char: "ㅊ", romaji: "ch", type: "Konsonan Dasar" },
    { char: "ㅋ", romaji: "k", type: "Konsonan Dasar" },
    { char: "ㅌ", romaji: "t", type: "Konsonan Dasar" },
    { char: "ㅍ", romaji: "p", type: "Konsonan Dasar" },
    { char: "ㅎ", romaji: "h", type: "Konsonan Dasar" },
  ],
  doubleConsonants: [
    { char: "ㄲ", romaji: "kk", type: "Konsonan Ganda" },
    { char: "ㄸ", romaji: "tt", type: "Konsonan Ganda" },
    { char: "ㅃ", romaji: "pp", type: "Konsonan Ganda" },
    { char: "ㅆ", romaji: "ss", type: "Konsonan Ganda" },
    { char: "ㅉ", romaji: "jj", type: "Konsonan Ganda" },
  ],
  basicVowels: [
    { char: "ㅏ", romaji: "a", type: "Vokal Dasar" },
    { char: "ㅑ", romaji: "ya", type: "Vokal Dasar" },
    { char: "ㅓ", romaji: "eo", type: "Vokal Dasar" },
    { char: "ㅕ", romaji: "yeo", type: "Vokal Dasar" },
    { char: "ㅗ", romaji: "o", type: "Vokal Dasar" },
    { char: "ㅛ", romaji: "yo", type: "Vokal Dasar" },
    { char: "ㅜ", romaji: "u", type: "Vokal Dasar" },
    { char: "ㅠ", romaji: "yu", type: "Vokal Dasar" },
    { char: "ㅡ", romaji: "eu", type: "Vokal Dasar" },
    { char: "ㅣ", romaji: "i", type: "Vokal Dasar" },
    { char: "ㅐ", romaji: "ae", type: "Vokal Dasar" },
    { char: "ㅒ", romaji: "yae", type: "Vokal Dasar" },
    { char: "ㅔ", romaji: "e", type: "Vokal Dasar" },
    { char: "ㅖ", romaji: "ye", type: "Vokal Dasar" },
  ],
  doubleVowels: [
    { char: "ㅘ", romaji: "wa", type: "Vokal Ganda" },
    { char: "ㅙ", romaji: "wae", type: "Vokal Ganda" },
    { char: "ㅚ", romaji: "oe", type: "Vokal Ganda" },
    { char: "ㅝ", romaji: "wo", type: "Vokal Ganda" },
    { char: "ㅞ", romaji: "we", type: "Vokal Ganda" },
    { char: "ㅟ", romaji: "wi", type: "Vokal Ganda" },
    { char: "ㅢ", romaji: "ui", type: "Vokal Ganda" },
  ],
};

let progressData = JSON.parse(localStorage.getItem("hangeulProgress")) || {};

let currentSession = {
  questions: [],
  currentQuestion: 0,
  correctAnswers: 0,
  totalQuestions: 0,
};

function openTab(tabId) {
  const tabContents = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].classList.remove("active");
    tabContents[i].setAttribute("hidden", "hidden");
  }

  const tabButtons = document.getElementsByClassName("tab-btn");
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove("active");
    tabButtons[i].setAttribute("aria-selected", "false");
  }

  const activeTab = document.getElementById(tabId);
  activeTab.classList.add("active");
  activeTab.removeAttribute("hidden");

  const buttons = Array.from(tabButtons);
  const clickedButton = buttons.find(
    (btn) => btn.getAttribute("aria-controls") === tabId
  );
  if (clickedButton) {
    clickedButton.classList.add("active");
    clickedButton.setAttribute("aria-selected", "true");
    clickedButton.focus();
  }
}

function saveProgress() {
  localStorage.setItem("hangeulProgress", JSON.stringify(progressData));
}

function displayLetters() {
  const basicConsonantsContainer = document.getElementById(
    "basic-consonants-grid"
  );
  const doubleConsonantsContainer = document.getElementById(
    "double-consonants-grid"
  );
  const basicVowelsContainer = document.getElementById("basic-vowels-grid");
  const doubleVowelsContainer = document.getElementById("double-vowels-grid");

  basicConsonantsContainer.innerHTML = "";
  doubleConsonantsContainer.innerHTML = "";
  basicVowelsContainer.innerHTML = "";
  doubleVowelsContainer.innerHTML = "";

  function createCard(letter) {
    const progress = progressData[letter.char] || 0;
    const progressPercent = (progress / 20) * 100;
    return `
            <div class="alphabet-card ${progress >= 20 ? "learned" : ""}">
                <div class="alphabet-char">${letter.char}</div>
                <div class="alphabet-romaji">${letter.romaji}</div>
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${progressPercent}%;"></div>
                </div>
            </div>
        `;
  }

  hangeulData.basicConsonants.forEach((letter) => {
    basicConsonantsContainer.innerHTML += createCard(letter);
  });

  hangeulData.doubleConsonants.forEach((letter) => {
    doubleConsonantsContainer.innerHTML += createCard(letter);
  });

  hangeulData.basicVowels.forEach((letter) => {
    basicVowelsContainer.innerHTML += createCard(letter);
  });

  hangeulData.doubleVowels.forEach((letter) => {
    doubleVowelsContainer.innerHTML += createCard(letter);
  });
}

function startPracticeSession() {
  currentSession.totalQuestions = Math.floor(Math.random() * 11) + 10;
  currentSession.questions = [];
  currentSession.currentQuestion = 0;
  currentSession.correctAnswers = 0;

  const allLetters = [
    ...hangeulData.basicConsonants,
    ...hangeulData.doubleConsonants,
    ...hangeulData.basicVowels,
    ...hangeulData.doubleVowels,
  ];

  for (let i = 0; i < currentSession.totalQuestions; i++) {
    const randomIndex = Math.floor(Math.random() * allLetters.length);
    currentSession.questions.push(allLetters[randomIndex]);
  }

  showNextQuestion();
}

function showNextQuestion() {
  if (currentSession.currentQuestion >= currentSession.totalQuestions) {
    showResults();
    return;
  }

  const modal = document.getElementById("practice-modal");
  const quizChar = document.getElementById("quiz-char");
  const quizOptions = document.getElementById("quiz-options");
  const feedback = document.getElementById("feedback");

  feedback.textContent = "";
  feedback.className = "feedback";

  const currentLetter =
    currentSession.questions[currentSession.currentQuestion];
  quizChar.textContent = currentLetter.char;

  quizOptions.innerHTML = "";

  let options = [currentLetter.romaji];
  const allRomaji = [
    ...hangeulData.basicConsonants,
    ...hangeulData.doubleConsonants,
    ...hangeulData.basicVowels,
    ...hangeulData.doubleVowels,
  ].map((l) => l.romaji);

  while (options.length < 4) {
    const randomIndex = Math.floor(Math.random() * allRomaji.length);
    const randomRomaji = allRomaji[randomIndex];
    if (!options.includes(randomRomaji)) {
      options.push(randomRomaji);
    }
  }

  options = options.sort(() => Math.random() - 0.5);

  options.forEach((option) => {
    const optionBtn = document.createElement("div");
    optionBtn.className = "quiz-option";
    optionBtn.textContent = option;
    optionBtn.onclick = function () {
      checkAnswer(currentLetter.char, option, currentLetter.romaji);
    };
    quizOptions.appendChild(optionBtn);
  });

  modal.style.display = "flex";
  modal.focus();
}

function checkAnswer(char, selectedRomaji, correctRomaji) {
  const options = document.querySelectorAll(".quiz-option");
  const feedback = document.getElementById("feedback");

  options.forEach((option) => {
    option.onclick = null;
  });

  if (selectedRomaji === correctRomaji) {
    currentSession.correctAnswers++;
    progressData[char] = (progressData[char] || 0) + 1;
    saveProgress();

    feedback.textContent = "Benar! [👍🏻]";
    feedback.className = "feedback correct";

    options.forEach((option) => {
      if (option.textContent === correctRomaji) {
        option.classList.add("correct");
      }
    });
  } else {
    feedback.textContent = `Salah! Jawaban benar: ${correctRomaji}`;
    feedback.className = "feedback incorrect";

    options.forEach((option) => {
      if (option.textContent === selectedRomaji) {
        option.classList.add("incorrect");
      }
      if (option.textContent === correctRomaji) {
        option.classList.add("correct");
      }
    });
  }

  setTimeout(() => {
    currentSession.currentQuestion++;
    showNextQuestion();
  }, 1500);
}

function showResults() {
  closeModal();

  const resultModal = document.getElementById("result-modal");
  const resultScore = document.getElementById("result-score");
  const resultMessage = document.getElementById("result-message");

  const score = Math.round(
    (currentSession.correctAnswers / currentSession.totalQuestions) * 100
  );
  resultScore.textContent = `Skor: ${score}% (${currentSession.correctAnswers}/${currentSession.totalQuestions} benar)`;

  if (score >= 80) {
    resultMessage.textContent = "Luar biasa! Anda sangat menguasai Hangeul!";
  } else if (score >= 60) {
    resultMessage.textContent =
      "Bagus! Terus berlatih untuk hasil yang lebih baik!";
  } else {
    resultMessage.textContent =
      "Terus berlatih ya! Anda pasti bisa menguasainya!";
  }

  refreshDisplay();

  resultModal.style.display = "flex";
  resultModal.focus();
}

function closeModal() {
  document.getElementById("practice-modal").style.display = "none";
}

function closeResultModal() {
  document.getElementById("result-modal").style.display = "none";
}

function refreshDisplay() {
  displayLetters();
}

function toggleTheme() {
  const body = document.body;
  body.classList.toggle("dark-mode");
}

window.onload = displayLetters;
