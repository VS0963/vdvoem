import { Panel, PanelHeader, Group, Div, Text, Button, Header, Card, Title } from '@vkontakte/vkui';

export const Result = ({ id, go, answers }) => {
  const answersList = answers ? Object.values(answers) : [];

  // Функция для подсчёта "среднего" по шкале
  const getScaleValue = (questionId) => {
    const answer = answers[questionId];
    return answer ? Number(answer.answer) : null;
  };

  // Функция для получения ответа по id
  const getAnswer = (questionId) => {
    const answer = answers[questionId];
    return answer ? answer.answer : null;
  };

  // ===== АНАЛИЗ ПРОФИЛЯ =====

  // 1. Тип привязанности (по Блоку 4)
  const emo1 = getScaleValue('emo_1'); // трудно доверять
  const emo2 = getScaleValue('emo_2'); // боюсь, что разлюбит
  const emo3 = getScaleValue('emo_3'); // отстраняюсь в конфликте
  const emo4 = getScaleValue('emo_4'); // нужно личное пространство
  const emo7 = getScaleValue('emo_7'); // ищу поддержку
  const emo12 = getScaleValue('emo_12'); // боюсь, что бросят

  let attachmentType = 'Надёжный';
  let attachmentDesc = 'Вы умеете строить близкие отношения, не теряя себя. Вы доверяете партнёру и не боитесь близости.';

  if (emo2 >= 7 || emo12 >= 7) {
    attachmentType = 'Тревожный';
    attachmentDesc = 'Вы ищете подтверждения любви и боитесь потерять партнёра. Это не плохо — но важно выбирать партнёра, который умеет быть надёжным и предсказуемым.';
  } else if (emo1 >= 7 || emo3 >= 7 || emo4 >= 7) {
    attachmentType = 'Избегающий';
    attachmentDesc = 'Вы цените автономию и не любите давление. Это не плохо — но важно выбирать партнёра, который уважает ваше пространство.';
  }

  // 2. Готовность к семье (по Блоку 3)
  const goal1 = getAnswer('goal_1'); // хотите ли детей
  const goal3 = getAnswer('goal_3'); // когда
  const goal5 = getAnswer('goal_5'); // роли
  const goal7 = getScaleValue('goal_7'); // карьера vs семья

  let familyReadiness = 'Умеренная';
  let familyDesc = 'Вы понимаете, чего хотите, но, возможно, ещё не до конца готовы к переменам.';

  if (goal1 === 'Да, хочу' && goal7 >= 7) {
    familyReadiness = 'Высокая';
    familyDesc = 'Вы ориентированы на семью и детей. Вы готовы к долгосрочным отношениям с ясными целями.';
  } else if (goal1 === 'Нет, не хочу' || goal7 <= 3) {
    familyReadiness = 'Низкая';
    familyDesc = 'Семья и дети пока не в приоритете. Это нормально — но важно найти партнёра с такими же взглядами.';
  }

  // 3. Ценности (по Блоку 2)
  const value1 = getAnswer('value_1'); // что для вас семья
  const value2 = getAnswer('value_2'); // что важнее
  const value3 = getAnswer('value_3'); // что неприемлемо

  let coreValues = '';
  if (value1 === 'Тыл и безопасность') coreValues = 'надёжность и стабильность';
  else if (value1 === 'Партнёрство душ') coreValues = 'эмоциональная близость';
  else if (value1 === 'Команда для роста') coreValues = 'развитие и общие цели';
  else if (value1 === 'Удовольствие') coreValues = 'радость и удовольствие от жизни';
  else if (value1 === 'Продолжение рода') coreValues = 'семья и дети';
  else if (value1 === 'Совместный быт и уют') coreValues = 'уют и повседневная гармония';
  else coreValues = 'ваши ценности';

  // 4. Слепые зоны (по Блоку 5)
  const comm1 = getAnswer('comm_1'); // реакция на обещание
  const comm5 = getAnswer('comm_5'); // после ссоры
  const comm12 = getAnswer('comm_12'); // "всё нормально"

  const blindSpots = [];
  if (comm1 === 'Промолчу, но запомню' || comm1 === 'Обесценю в ответ') {
    blindSpots.push('Склонность копить обиды — важно говорить о недовольстве сразу.');
  }
  if (comm5 === 'Жду, пока партнёр сделает шаг') {
    blindSpots.push('Ожидание первого шага от партнёра — можно застрять в холодной войне.');
  }
  if (comm12 === 'Часто') {
    blindSpots.push('Привычка говорить «всё нормально», когда это не так — это путь к накоплению.');
  }
  if (blindSpots.length === 0) {
    blindSpots.push('Особых слепых зон не выявлено — вы хорошо осознаёте свои паттерны.');
  }

  // 5. Что ищет в партнёре
  const life24 = getScaleValue('life_24'); // важен ли тот же уровень жизни
  const value4 = getScaleValue('value_4'); // политика
  const value5 = getScaleValue('value_5'); // религия

  return (
    <Panel id={id}>
      <PanelHeader>Ваш профиль</PanelHeader>

      <Group>
        <Div>
          <Title level="1" style={{ textAlign: 'center' }}>
            Спасибо.
          </Title>
          <Text style={{ textAlign: 'center', marginTop: 8 }}>
            Вы прошли путь из 145 вопросов. Вот что мы поняли о вас.
          </Text>
        </Div>
      </Group>

      {/* Тип привязанности */}
      <Group header={<Header>Как вы строите близость</Header>}>
        <Card mode="shadow">
          <Div>
            <Title level="2">{attachmentType} тип</Title>
            <Text style={{ marginTop: 8 }}>{attachmentDesc}</Text>
          </Div>
        </Card>
      </Group>

      {/* Готовность к семье */}
      <Group header={<Header>Ваша готовность к семье</Header>}>
        <Card mode="shadow">
          <Div>
            <Title level="2">{familyReadiness}</Title>
            <Text style={{ marginTop: 8 }}>{familyDesc}</Text>
          </Div>
        </Card>
      </Group>

      {/* Ценности */}
      <Group header={<Header>Ваши главные ценности</Header>}>
        <Card mode="shadow">
          <Div>
            <Text>
              Для вас в семье важнее всего — <b>{coreValues}</b>.
            </Text>
            {value2 && (
              <Text style={{ marginTop: 8 }}>
                В отношениях вы цените: <b>{value2}</b>.
              </Text>
            )}
            {value3 && (
              <Text style={{ marginTop: 8 }}>
                Вы не приемлете: <b>{value3}</b>.
              </Text>
            )}
          </Div>
        </Card>
      </Group>

      {/* Слепые зоны */}
      <Group header={<Header>На что обратить внимание</Header>}>
        <Card mode="shadow">
          <Div>
            {blindSpots.map((spot, i) => (
              <Text key={i} style={{ marginTop: i > 0 ? 8 : 0 }}>
                • {spot}
              </Text>
            ))}
          </Div>
        </Card>
      </Group>

      {/* Что важно в партнёре */}
      <Group header={<Header>Что для вас важно в партнёре</Header>}>
        <Card mode="shadow">
          <Div>
            {life24 >= 7 && (
              <Text>• Тот же уровень жизни, что и у вас.</Text>
            )}
            {life24 <= 3 && (
              <Text>• Уровень жизни не имеет значения.</Text>
            )}
            {value4 >= 7 && (
              <Text style={{ marginTop: 8 }}>• Схожие политические взгляды.</Text>
            )}
            {value5 >= 7 && (
              <Text style={{ marginTop: 8 }}>• Схожие религиозные взгляды.</Text>
            )}
            {life24 < 7 && life24 > 3 && value4 < 7 && value5 < 7 && (
              <Text>• Гибкость в разных сферах — вам важно найти своего человека, а не «идеального» по всем параметрам.</Text>
            )}
          </Div>
        </Card>
      </Group>

      <Group>
        <Div>
          <Button size="l" stretched onClick={() => go('welcome')}>
            Перейти к подбору (скоро)
          </Button>
        </Div>
        <Div>
          <Button size="l" stretched mode="secondary" onClick={() => go('test')}>
            Вернуться к тесту
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};