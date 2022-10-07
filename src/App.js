import { useState } from 'react';
import Game from './components/Game';
import Result from './components/Result';
import './index.scss';

// Массив вопросов
const questions = [
  {
    title: 'React - это ... ?',
    variants: ['Библиотека', 'Фреймворк', 'Приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: [
      'Это простой HTML',
      'Это функция',
      'Это тот же HTML, но с возможностью выполнять JS-код',
    ],
    correct: 2,
  },
];

// Основной компонент
function App() {
  const [step, setStep] = useState(0); // Номер шага - нужен для прогрессбара
  const [correct, setCorrect] = useState(0); // Номер правильного ответа
  const question = questions[step]; // Номер вопроса

  // Функция клика по вариантам
  const onClickVariant = (index) => {
    console.log(step, index)
    setStep(step + 1)

    // Сравнение на правильность варианта
    if (index === question.correct) {
      setCorrect(correct + 1)
    }
  };

  return (
    <div className="App">
      {
        step !== questions.length ? <Game step={step} question={question} onClickVariant={onClickVariant} questions={questions} /> : <Result correct={correct} questions={questions} />
      }
    </div>
  );
}

export default App;
