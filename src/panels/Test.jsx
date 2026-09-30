import { useState, useEffect } from 'react';
import {
  Panel,
  PanelHeader,
  Group,
  Div,
  Text,
  Button,
  Progress,
  Header,
  Slider,
} from '@vkontakte/vkui';

export const Test = ({ id, go, setAnswers }) => {
  const [step, setStep] = useState(0);
  const [answers, setLocalAnswers] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('test_answers');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setLocalAnswers(parsed);
      } catch (e) {
        console.error('Ошибка загрузки ответов:', e);
      }
    }
  }, []);

  const questions = [
    // ===== БЛОК 1. БАЗОВЫЙ ПРОФИЛЬ + ХОББИ =====
    {
      id: 'hobby_1',
      block: 'Блок 1. Базовый профиль',
      question: 'Как вы чаще всего проводите свободное время?',
      options: [
        'Дома, в тишине (книги, фильмы, игры)',
        'На природе (прогулки, походы, спорт)',
        'В общении с друзьями',
        'За творчеством (музыка, рисование)',
        'За спортом (зал, бег)',
        'В путешествиях',
        'За обучением (курсы, языки)',
        'С семьёй / детьми',
      ],
    },
    {
      id: 'hobby_2',
      block: 'Блок 1. Базовый профиль',
      question: 'Насколько для вас важно, чтобы партнёр разделял ваши увлечения?',
      options: [
        'Очень важно — хочу всё делать вместе',
        'Важно, но не критично',
        'Спокойно — у каждого своя жизнь',
        'Совсем не важно — главное, чтобы не мешало',
      ],
    },
    {
      id: 'hobby_6',
      block: 'Блок 1. Базовый профиль',
      question: 'Как вы относитесь к спонтанности?',
      scale: true,
      minLabel: 'Люблю планировать',
      maxLabel: 'Люблю импровизировать',
    },
    {
      id: 'hobby_7',
      block: 'Блок 1. Базовый профиль',
      question: 'Как вы относитесь к активному отдыху?',
      scale: true,
      minLabel: 'Предпочитаю покой',
      maxLabel: 'Люблю экстрим',
    },
  ];

  const currentQuestion = questions[step];
  const totalSteps = questions.length;
  const progress = ((step + 1) / totalSteps) * 100;

  const saveAnswer = (questionId, question, answer, index) => {
    const newAnswers = {
      ...answers,
      [questionId]: {
        question: question,
        answer: answer,
        index: index,
      },
    };
    setLocalAnswers(newAnswers);
    localStorage.setItem('test_answers', JSON.stringify(newAnswers));
    return newAnswers;
  };

  const handleOptionClick = (option, index) => {
    saveAnswer(currentQuestion.id, currentQuestion.question, option, index);
    // Не переходим сразу — ждём кнопку "Далее"
  };

  const handleScaleChange = (value) => {
    saveAnswer(currentQuestion.id, currentQuestion.question, value, value);
  };

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      if (typeof setAnswers === 'function') {
        setAnswers(answers);
      }
      go('result');
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      go('welcome');
    }
  };

  const currentAnswer = answers[currentQuestion.id];
  const hasAnswer = currentAnswer !== undefined;

  return (
    <Panel id={id}>
      <PanelHeader>Психологический тест</PanelHeader>

      <Group>
        <Div>
          <Text weight="2">{currentQuestion.block}</Text>
          <Progress value={progress} />
          <Text>Вопрос {step + 1} из {totalSteps}</Text>
        </Div>
      </Group>

      <Group header={<Header>{currentQuestion.question}</Header>}>
        <Div>
          {currentQuestion.scale ? (
            // === СЛАЙДЕР ДЛЯ ШКАЛ 1–10 ===
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text>{currentQuestion.minLabel}</Text>
                <Text weight="1">
                  {currentAnswer ? currentAnswer.answer : 5}
                </Text>
                <Text>{currentQuestion.maxLabel}</Text>
              </div>
              <Slider
                min={1}
                max={10}
                step={1}
                value={currentAnswer ? currentAnswer.answer : 5}
                onChange={handleScaleChange}
              />
            </div>
          ) : (
            // === КНОПКИ ДЛЯ ОБЫЧНЫХ ВОПРОСОВ ===
            currentQuestion.options.map((option, index) => {
              const isSelected = currentAnswer?.answer === option;
              return (
                <Div key={index}>
                  <Button
                    size="l"
                    stretched
                    mode={isSelected ? 'primary' : 'secondary'}
                    onClick={() => handleOptionClick(option, index)}
                  >
                    {option}
                  </Button>
                </Div>
              );
            })
          )}
        </Div>
      </Group>

      <Group>
        <Div>
          <Button
            size="l"
            stretched
            mode="primary"
            disabled={!hasAnswer && !currentQuestion.scale}
            onClick={handleNext}
          >
            {step < totalSteps - 1 ? 'Далее' : 'Завершить'}
          </Button>
        </Div>
        <Div>
          <Button
            size="l"
            stretched
            mode="tertiary"
            onClick={handleBack}
          >
            Назад
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};