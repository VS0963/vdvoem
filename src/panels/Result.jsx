
import { Panel, PanelHeader, Group, Div, Text, Button, Header } from '@vkontakte/vkui';

export const Result = ({ id, go, answers }) => {
  // Функция для получения ответа по id
  const getAnswer = (questionId) => {
    const answer = answers[questionId];
    return answer ? answer.answer : null;
  };

  const getScaleValue = (questionId) => {
    const answer = answers[questionId];
    return answer ? Number(answer.answer) : null;
  };

  // ===== АНАЛИЗ ПРОФИЛЯ =====

  // 1. Тип привязанности
  const emo1 = getScaleValue('emo_1');
  const emo2 = getScaleValue('emo_2');
  const emo3 = getScaleValue('emo_3');
  const emo4 = getScaleValue('emo_4');
  const emo12 = getScaleValue('emo_12');

  let attachmentType = 'Надёжный';
  let attachmentDesc = 'Вы умеете строить близкие отношения, не теряя себя. Вы доверяете партнёру и не боитесь близости.';

  if (emo2 >= 7 || emo12 >= 7) {
    attachmentType = 'Тревожный';
    attachmentDesc = 'Вы ищете подтверждения любви и боитесь потерять партнёра. Важно выбирать партнёра, который умеет быть надёжным.';
  } else if (emo1 >= 7 || emo3 >= 7 || emo4 >= 7) {
    attachmentType = 'Избегающий';
    attachmentDesc = 'Вы цените автономию и не любите давление. Важно выбирать партнёра, который уважает ваше пространство.';
  }

  // 2. Готовность к семье
  const goal1 = getAnswer('goal_1');
  const goal7 = getScaleValue('goal_7');

  let familyReadiness = 'Умеренная';
  let familyDesc = 'Вы понимаете, чего хотите, но, возможно, ещё не до конца готовы к переменам.';

  if (goal1 === 'Да, хочу' && goal7 >= 7) {
    familyReadiness = 'Высокая';
    familyDesc = 'Вы ориентированы на семью и детей. Вы готовы к долгосрочным отношениям с ясными целями.';
  } else if (goal1 === 'Нет, не хочу' || goal7 <= 3) {
    familyReadiness = 'Низкая';
    familyDesc = 'Семья и дети пока не в приоритете. Это нормально — важно найти партнёра с такими же взглядами.';
  }

  // 3. Ценности
  const value1 = getAnswer('value_1');
  const value2 = getAnswer('value_2');
  const value3 = getAnswer('value_3');

  let coreValues = 'ваши ценности';
  if (value1 === 'Тыл и безопасность') coreValues = 'надёжность и стабильность';
  else if (value1 === 'Партнёрство душ') coreValues = 'эмоциональная близость';
  else if (value1 === 'Команда для роста') coreValues = 'развитие и общие цели';
  else if (value1 === 'Удовольствие') coreValues = 'радость и удовольствие';
  else if (value1 === 'Продолжение рода') coreValues = 'семья и дети';
  else if (value1 === 'Совместный быт и уют') coreValues = 'уют и гармония';

  // 4. Слепые зоны
  const comm1 = getAnswer('comm_1');
  const comm5 = getAnswer('comm_5');
  const comm12 = getAnswer('comm_12');

  const blindSpots = [];
  if (comm1 === 'Промолчу, но запомню' || comm1 === 'Обесценю в ответ') {
    blindSpots.push('Склонность копить обиды — важно говорить о недовольстве сразу.');
  }
  if (comm5 === 'Жду, пока партнёр сделает шаг') {
    blindSpots.push('Ожидание первого шага от партнёра — можно застрять в холодной войне.');
  }
  if (comm12 === 'Часто') {
    blindSpots.push('Привычка говорить «всё нормально», когда это не так.');
  }
  if (blindSpots.length === 0) {
    blindSpots.push('Особых слепых зон не выявлено — вы хорошо осознаёте свои паттерны.');
  }

  // 5. Партнёр
  const life24 = getScaleValue('life_24');
  const value4 = getScaleValue('value_4');
  const value5 = getScaleValue('value_5');

  // ===== СТИЛИ ДЛЯ ЦВЕТНЫХ БЛОКОВ =====
  const blockStyle = (color) => ({
    background: color,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    color: '#fff',
  });

  const blockTitle = {
    fontSize: 13,
    opacity: 0.85,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  };

  const blockHeading = {
    fontSize: 22,
    fontWeight: 600,
    marginBottom: 8,
  };

  const blockText = {
    fontSize: 15,
    lineHeight: 1.5,
    opacity: 0.95,
  };

  return (
    <Panel id={id}>
      <PanelHeader>Ваш профиль</PanelHeader>

      <Group>
        <Div style={{ textAlign: 'center', paddingTop: 8, paddingBottom: 8 }}>
          <Text weight="1" style={{ fontSize: 28 }}>Спасибо.</Text>
          <Text style={{ marginTop: 8, color: '#818C99' }}>
            Вы прошли путь из 145 вопросов. Вот что мы поняли о вас.
          </Text>
        </Div>
      </Group>

      <Group>
        <Div>
          {/* Блок 1: Близость — ЗЕЛЁНЫЙ */}
          <div style={blockStyle('linear-gradient(135deg, #4BB34B 0%, #3A8A3A 100%)')}>
            <div style={blockTitle}>Как вы строите близость</div>
            <div style={blockHeading}>{attachmentType} тип</div>
            <div style={blockText}>{attachmentDesc}</div>
          </div>

          {/* Блок 2: Семья — СИНИЙ */}
          <div style={blockStyle('linear-gradient(135deg, #2688EB 0%, #1C6BB8 100%)')}>
            <div style={blockTitle}>Ваша готовность к семье</div>
            <div style={blockHeading}>{familyReadiness}</div>
            <div style={blockText}>{familyDesc}</div>
          </div>

          {/* Блок 3: Ценности — ФИОЛЕТОВЫЙ */}
          <div style={blockStyle('linear-gradient(135deg, #9B59B6 0%, #7B3F96 100%)')}>
            <div style={blockTitle}>Ваши главные ценности</div>
            <div style={blockHeading}>{coreValues}</div>
            <div style={blockText}>
              {value2 && <>В отношениях вы цените: <b>{value2}</b>.<br /></>}
              {value3 && <>Вы не приемлете: <b>{value3}</b>.</>}
            </div>
          </div>

          {/* Блок 4: Внимание — ЖЁЛТЫЙ */}
          <div style={blockStyle('linear-gradient(135deg, #FFC107 0%, #E5A800 100%)')}>
            <div style={blockTitle}>На что обратить внимание</div>
            {blindSpots.map((spot, i) => (
              <div key={i} style={{ ...blockText, marginTop: i > 0 ? 8 : 0 }}>
                • {spot}
              </div>
            ))}
          </div>

          {/* Блок 5: Партнёр — КРАСНЫЙ */}
          <div style={blockStyle('linear-gradient(135deg, #E64646 0%, #B83636 100%)')}>
            <div style={blockTitle}>Что для вас важно в партнёре</div>
            {life24 >= 7 && <div style={blockText}>• Тот же уровень жизни, что и у вас.</div>}
            {life24 <= 3 && <div style={blockText}>• Уровень жизни не имеет значения.</div>}
            {value4 >= 7 && <div style={{ ...blockText, marginTop: 8 }}>• Схожие политические взгляды.</div>}
            {value5 >= 7 && <div style={{ ...blockText, marginTop: 8 }}>• Схожие религиозные взгляды.</div>}
            {life24 < 7 && life24 > 3 && value4 < 7 && value5 < 7 && (
              <div style={blockText}>• Гибкость — вам важно найти своего человека, а не «идеального».</div>
            )}
          </div>
        </Div>
      </Group>

      <Group>
        <Div>
          <<Button size="l" stretched onClick={() => go('match')}>
  Посмотреть совместимость с Анной
</Button>
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