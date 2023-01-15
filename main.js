const questions = [
  {
    question: "Столицей США является город:",
    answers: ["Голливуд", "Вашингтон", "Нью-Йорк", "Бостон"],
    correct: 2,
  },
  {
    question: "Столицей Турции является город:",
    answers: ["Анталия", "Анкара", "Стамбул", "Измир"],
    correct: 2,
  },
  {
    question: "Столицей Сирии является город:",
    answers: ["Дамаск", "Алеппо", "Бейрут", "Амман"],
    correct: 1,
  },
  {
    question: "Столицей Канады является город:",
    answers: ["Квебек", "Оттава", "Монреаль", "Салливан"],
    correct: 2,
  },

  {
    question: "Столицей Бразилии является город:",
    answers: ["Буэнос-Айрес", "Бразилиа", "Сан-Паулу", "Сантьяго"],
    correct: 2,
  },
];

const headerContainer = document.querySelector("#header");
const listContainer = document.querySelector("#list");
const submitBtn = document.querySelector("#submit");

let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage() {
  headerContainer.innerHTML = "";
  listContainer.innerHTML = "";
}

function showQuestion() {
  const headerTemplate = ` <h2 class="title">%title%</h2>`;

  const title = headerTemplate.replace(
    "%title%",
    questions[questionIndex]["question"]
  );

  headerContainer.innerHTML = title;

  let answerNumber = 1;

  for (answerText of questions[questionIndex]["answers"]) {
    const questionTemplate = ` <li>
      <label>
        <input value="%number%" type="radio" class="answer" name="answer" />
        <span>%answer%</span>
      </label>
    </li>`;
    const answerHTML = questionTemplate
      .replace("%answer%", answerText)
      .replace("%number%", answerNumber);

    listContainer.innerHTML += answerHTML;
    answerNumber++;
  }
}

function checkAnswer() {
  const checkedRadio = listContainer.querySelector("input[type=radio]:checked");

  if (!checkedRadio) {
    submitBtn.blur();
    alert("Вы не выбрали ответ");
    return;
  }

  const userAnswer = parseInt(checkedRadio.value);

  if (userAnswer === questions[questionIndex]["correct"]) {
    score++;
  }

  if (questionIndex !== questions.length - 1) {
    questionIndex++;
    clearPage();
    showQuestion();
  } else {
    clearPage();
    showResults();
  }
}

function showResults() {
  const resultsTemplate = `<h2 class="title">%title%</h2>
  <h3 class="summary">%message%</h3>
  <p class="result">%result%</p>`;

  let title, message;

  if (score === questions.length) {
    title = "Поздравляем!";
    message = "Вы ответили верно на все вопросы!";
  } else if ((score * 100) / questions.length >= 50) {
    title = "Неплохой результат!";
    message = "Вы дали более половины правильных ответов!";
  } else {
    title = "Стоит постараться!";
    message = "Вы дали меньше половины правильных ответов!";
  }

  let result = `${score} из ${questions.length}`;

  const finalMessage = resultsTemplate
    .replace("%title%", title)
    .replace("%message%", message)
    .replace("%result%", result);
  headerContainer.innerHTML = finalMessage;

  submitBtn.blur();
  submitBtn.innerHTML = "Начать заново";
  submitBtn.onclick = () => history.go();
}
