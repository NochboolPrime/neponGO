/*script.css*/


const sets = {
    set1: [
    { japanese: "Конбанва", translation: "Приветствие на вечер" },
        { japanese: "Охай", translation: "Приветствие утром" },
        { japanese: "Данойни ", translation: "Каким образом" },
        { japanese: "Нипон", translation: "Япония" },
        { japanese: "Намае", translation: "Имя" },
        { japanese: "Доу", translation: "Как" },
        { japanese: "Ёкотта", translation: "Хорошо" },
        { japanese: "Кирей", translation: "Чистый" },
        { japanese: "Нини", translation: "Что" },
        { japanese: "Сите", translation: "Свершать, делать" },
        { japanese: "Киёу", translation: "Сегодня" },
        { japanese: "Нэзэ", translation: "Почему" },
        { japanese: "Аригатоу", translation: "Спасибо" },
        { japanese: "Тай", translation: "Должно быть" },
        { japanese: "Ята", translation: "Сделал" },
        { japanese: "Со", translation: "Так" },
        { japanese: "Нипонго", translation: "Японский язык" },
        { japanese: "Кудайсай", translation: "Дай" },
        { japanese: "Дайёбу", translation:"Все в порядке" },
        { japanese:"Фурусиши", translation:"Старый"},
        { japanese:"Миёнуи", translation:"Завтра"},
        { japanese:"Киноу", translation:"Вчера"},
        { japanese:"Дэсу", translation:"Считать)"},
        { japanese:"Суру", translation:"Опытный"},
        { japanese:"Хонто", translation:"Действительно"},
        { japanese:"Ни", translation:"Что"},
        { japanese:"Дэкиру", translation:"Смочь"},
        { japanese:"Косай", translation:"Небольшой"},
        { japanese:"Ии", translation:"Хорошо"},
        { japanese:"Окуии", translation:"Большой"},
        { japanese:"Сити", translation:"Знать"},
        { japanese:"Моу", translation:"Уже"},
        { japanese:"На ноу", translation:"Что"},
        { japanese:"Дэму",translation:"Смочь"},
        { japanese:"Ёдо",translation:"Цвет"},
        { japanese:"Вотсу",translation:"Нет, другой"},
        { japanese:"Доре",translation:"Который"},
        { japanese:"Ииу",translation:"Говорящий"},
        { japanese:"Декёру",translation:"Справиться"},
        { japanese:"Икёу",translation:"Делать"},
        { japanese:"Ари",translation:"Есть"},
        { japanese:"Jikân",translation:"Время"},
        { japanese :"Ниру",translation :"Спать"},
        {japanese :"Какатта.",translation :"Попался"}, 
        {japanese :"Боку",translation :"Я"} 
    ],
    set2 : [
        { japanese: "Конбанва", translation: "Приветствие на вечер" },
    ]
};

let currentWordIndex = 0;
let selectedSet = [];
let musicPlaying = true;

const startScreen = document.getElementById('start-screen');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('submit-btn');
const backButton = document.getElementById('back-btn');

const music = document.getElementById('background-music');

// Sound effect elements
const hoverSound = document.getElementById('hover-sound');
const clickSound = document.getElementById('click-sound');
const completionSound = document.getElementById('completion-sound');

function playHoverSound() {
    hoverSound.currentTime = 0; // Reset time to allow replay
    hoverSound.play();
}

function playClickSound() {
    clickSound.currentTime = 0; // Reset time to allow replay
    clickSound.play();
}

function playCompletionSound() {
    completionSound.currentTime = 0; // Reset time to allow replay
    completionSound.play();
}

function showWord() {
    if (currentWordIndex < selectedSet.length) {
       quizContainer.innerHTML = `
            <div class="card">
                <p>${selectedSet[currentWordIndex].japanese}</p>
                <input type="text" id="answer" placeholder="Введите перевод">
            </div>
       `;
       nextButton.classList.remove('hidden');
       submitButton.classList.add('hidden');
   } else {
       nextButton.classList.add('hidden');
       submitButton.classList.remove('hidden');
   }
}

function startQuiz(set) {
   selectedSet = set;
   currentWordIndex = 0;

   startScreen.classList.add('hidden');
   quizContainer.classList.remove('hidden');
   backButton.classList.remove('hidden'); 
   
   showWord();
}

function showStartScreen() {
   startScreen.classList.remove('hidden');
   quizContainer.classList.add('hidden');
   resultContainer.innerHTML = ''; 
   backButton.classList.add('hidden'); 
}

document.getElementById('continue-btn').addEventListener('click', () => {
   playClickSound(); // Play click sound
   document.querySelector('.welcome').classList.add('hidden'); 
   document.querySelector('.gif-container').classList.add('hidden'); 
   startScreen.classList.remove('hidden'); 
});

document.getElementById('set1-btn').addEventListener('click', () => { 
   playClickSound(); // Play click sound
   startQuiz(sets.set1);
});
document.getElementById('set2-btn').addEventListener('click', () => { 
   playClickSound(); // Play click sound
   startQuiz(sets.set2);
});

nextButton.addEventListener('click', () => {
   const userAnswer = document.getElementById('answer').value.trim();
   
   if (userAnswer) {
       selectedSet[currentWordIndex].userAnswer = userAnswer; 
       currentWordIndex++;
       showWord();
   } else {
       alert("Пожалуйста, введите перевод перед переходом к следующему слову.");
   }
});

submitButton.addEventListener('click', () => {
   let score = 0;
   let feedback = '';

   selectedSet.forEach((word) => {
       if (word.userAnswer === word.translation) {
           score++;
           feedback += `<p style="color: green;">${word.japanese} - Правильно!</p>`;
       } else {
           feedback += `<p style="color:red;">${word.japanese} - Неправильно! Правильный ответ:${word.translation}</p>`;
       }
   });

   resultContainer.innerHTML = `
       <div class="results-container">
           <div>
               <h2>Результаты:</h2>
               <p>Ваш счет:${score} из ${selectedSet.length}</p>${feedback}
           </div>
           <img src="images/rikka-takanashi-takanashi-rikka.gif" alt="Rikka Takanashi GIF">
       </div>`;
   
   playCompletionSound(); // Play completion sound when test is finished
   
   backButton.classList.remove('hidden'); 
});

backButton.addEventListener('click', showStartScreen); 

// Music toggle functionality
document.getElementById('music-toggle-btn').addEventListener('click', () => {
   if (musicPlaying) {
       music.pause();
       musicPlaying = false;
       document.getElementById('music-toggle-btn').textContent = 'Включить музыку';
   } else {
       music.play();
       musicPlaying = true;
       document.getElementById('music-toggle-btn').textContent = 'Отключить музыку';
   }
});

// Add event listeners for hover effects on buttons
const buttons = [document.getElementById('continue-btn'), 
                document.getElementById('set1-btn'), 
                document.getElementById('set2-btn'), 
                nextButton, 
                submitButton, 
                backButton];

buttons.forEach(button => {
   button.addEventListener('mouseover', playHoverSound);
});

document.getElementById('refresh-btn').addEventListener('click', function() {
    window.location.reload();
});
