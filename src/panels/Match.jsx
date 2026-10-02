import { Panel, PanelHeader, Group, Div, Text, Button, Header } from '@vkontakte/vkui';

// Демо-профиль для сравнения (потом заменим на реального пользователя)
const DEMO_PROFILE = {
  name: 'Анна',
  age: 35,
  city: 'Москва',
  answers: {
    hobby_1: { answer: 'На природе (прогулки, походы, спорт)' },
    value_1: { answer: 'Партнёрство душ' },
    value_2: { answer: 'Доверие' },
    value_3: { answer: 'Унижение' },
    goal_1: { answer: 'Да, хочу' },
    goal_5: { answer: 'Оба работают, быт пополам' },
    goal_7: { answer: 8 },
    emo_2: { answer: 4 },
    emo_3: { answer: 3 },
    comm_1: { answer: 'Спокойно скажу, что мне неприятно' },
    comm_5: { answer: 'Иду мириться первым(ой)' },
    life_1: { answer: 'Оба поровну' },
    life_4: { answer: 7 },
    sex_1: { answer: 'Способ почувствовать глубокую эмоциональную связь' },
    past_6: { answer: 'Нет' },
    ready_3: { answer: 'Да, готов(а)' },
  },
};

export const Match = ({ id, go, answers }) => {
  const myAnswers = answers || {};
  const partnerAnswers = DEMO_PROFILE.answers;

  // Функция: получить ответ по id
  const get = (source, id) => source[id]?.answer;

  // ===== СРАВНЕНИЕ ПО БЛОКАМ =====

  const matches = []; // 🟢
  const discuss = []; // 🟡
  const warnings = []; // 🔴

  // --- Блок 1: Хобби ---
  const myHobby = get(myAnswers, 'hobby_1');
  const partnerHobby = get(partnerAnswers, 'hobby_1');
  if (myHobby && partnerHobby) {
    if (myHobby === partnerHobby) {
      matches.push('Совпадают увлечения и способ проводить свободное время.');
    } else {
      discuss.push('Разные способы отдыха — обсудите, как будете проводить выходные.');
    }
  }

  // --- Блок 2: Ценности ---
  const myValue1 = get(myAnswers, 'value_1');
  const partnerValue1 = get(partnerAnswers, 'value_1');
  if (myValue1 && partnerValue1) {
    if (myValue1 === partnerValue1) {
      matches.push(`Совпадают главные ценности: ${myValue1}.`);
    } else {
      discuss.push(`Разные взгляды на семью: вы — «${myValue1}», партнёр — «${partnerValue1}».`);
    }
  }

  const myValue3 = get(myAnswers, 'value_3');
  const partnerValue3 = get(partnerAnswers, 'value_3');
  if (myValue3 && partnerValue3) {
    if (myValue3 === partnerValue3) {
      matches.push(`Оба не приемлете: ${myValue3}.`);
    }
  }

  // --- Блок 3: Цели ---
  const myGoal1 = get(myAnswers, 'goal_1');
  const partnerGoal1 = get(partnerAnswers, 'goal_1');
  if (myGoal1 && partnerGoal1) {
    if (myGoal1 === partnerGoal1) {
      matches.push(`Совпадают взгляды на детей: ${myGoal1}.`);
    } else if (
      (myGoal1 === 'Да, хочу' && partnerGoal1 === 'Нет, не хочу') ||
      (myGoal1 === 'Нет, не хочу' && partnerGoal1 === 'Да, хочу')
    ) {
      warnings.push('Разные взгляды на детей — это критичное расхождение. Обсудите до серьёзных отношений.');
    } else {
      discuss.push('Разные сроки или планы по детям — обсудите.');
    }
  }

  const myGoal5 = get(myAnswers, 'goal_5');
  const partnerGoal5 = get(partnerAnswers, 'goal_5');
  if (myGoal5 && partnerGoal5) {
    if (myGoal5 === partnerGoal5) {
      matches.push('Совпадают взгляды на роли в семье.');
    } else {
      discuss.push('Разные взгляды на распределение ролей — обсудите, кто что делает.');
    }
  }

  // --- Блок 4: Эмоции ---
  const myEmo2 = Number(get(myAnswers, 'emo_2') || 0);
  const partnerEmo2 = Number(get(partnerAnswers, 'emo_2') || 0);
  if (myEmo2 >= 7 && partnerEmo2 <= 3) {
    discuss.push('Вы более тревожны в привязанности, партнёр — более спокойный. Это может работать, но важно говорить о страхах.');
  } else if (myEmo2 <= 3 && partnerEmo2 >= 7) {
    discuss.push('Партнёр более тревожен, вы — спокойнее. Важно давать ему подтверждение чувств.');
  } else {
    matches.push('Схожий уровень тревожности в отношениях — вы понимаете друг друга.');
  }

  // --- Блок 5: Коммуникация ---
  const myComm5 = get(myAnswers, 'comm_5');
  const partnerComm5 = get(partnerAnswers, 'comm_5');
  if (myComm5 && partnerComm5) {
    if (myComm5 === 'Иду мириться первым(ой)' && partnerComm5 === 'Жду, пока партнёр сделает шаг') {
      discuss.push('Вы делаете первый шаг, партнёр ждёт. Это может привести к дисбалансу.');
    } else if (myComm5 === partnerComm5) {
      matches.push('Схожий стиль примирения после ссоры.');
    }
  }

  // --- Блок 6: Быт ---
  const myLife1 = get(myAnswers, 'life_1');
  const partnerLife1 = get(partnerAnswers, 'life_1');
  if (myLife1 && partnerLife1) {
    if (myLife1 === partnerLife1) {
      matches.push('Совпадают взгляды на распределение быта.');
    } else {
      discuss.push('Разные взгляды на быт — обсудите, кто что делает.');
    }
  }

  // --- Блок 7: Секс ---
  const mySex1 = get(myAnswers, 'sex_1');
  const partnerSex1 = get(partnerAnswers, 'sex_1');
  if (mySex1 && partnerSex1) {
    if (mySex1 === partnerSex1) {
      matches.push('Совпадают ожидания от близости.');
    } else {
      discuss.push('Разные ожидания от секса — обсудите, что важно для каждого.');
    }
  }

  // --- Блок 8: Прошлое ---
  const myPast6 = get(myAnswers, 'past_6');
  const partnerPast6 = get(partnerAnswers, 'past_6');
  if (myPast6 && partnerPast6) {
    if (myPast6 === 'Нет' && partnerPast6 === 'Нет') {
      matches.push('У обоих нет незавершённых отношений.');
    } else if (myPast6 !== 'Нет' || partnerPast6 !== 'Нет') {
      discuss.push('У одного из вас есть незавершённые отношения — обсудите это.');
    }
  }

  // --- Блок 9: Готовность ---
  const myReady3 = get(myAnswers, 'ready_3');
  const partnerReady3 = get(partnerAnswers, 'ready_3');
  if (myReady3 && partnerReady3) {
    if (myReady3 === 'Да, готов(а)' && partnerReady3 === 'Да, готов(а)') {
      matches.push('Оба готовы работать над отношениями.');
    } else if (myReady3 === 'Нет, меняться не буду' || partnerReady3 === 'Нет, меняться не буду') {
      warnings.push('Один из вас не готов меняться — это серьёзный риск.');
    }
  }

  // ===== СТИЛИ =====
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

  return (
    <Panel id={id}>
      <PanelHeader>Совместимость</PanelHeader>

            <Group>
        <Div style={{ paddingTop: 16, paddingBottom: 8 }}>
          {/* Аватар-заглушка + имя */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #9B59B6 0%, #2688EB 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 28,
                fontWeight: 600,
                flexShrink: 0,
              }}
            >
              {DEMO_PROFILE.name.charAt(0)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 22, fontWeight: 600 }}>
                {DEMO_PROFILE.name}, {DEMO_PROFILE.age}
              </div>
              <div style={{ fontSize: 14, color: '#818C99', marginTop: 4 }}>
                📍 {DEMO_PROFILE.city}
              </div>
              <div style={{ fontSize: 14, color: '#4BB34B', marginTop: 4, fontWeight: 500 }}>
                ● Онлайн недавно
              </div>
            </div>
          </div>

          {/* Разделитель */}
          <div style={{ height: 1, background: '#E5E7EB', margin: '16px 0' }} />

          {/* Описание */}
          <div style={{ fontSize: 14, color: '#818C99', textAlign: 'center' }}>
            Мы сравнили ваши ответы. Вот что получилось.
          </div>
        </Div>
      </Group>

      <Group>
        <Div>
          {/* 🟢 СОВПАДЕНИЯ — ЗЕЛЁНЫЙ */}
          <div style={blockStyle('linear-gradient(135deg, #4BB34B 0%, #3A8A3A 100%)')}>
            <div style={blockTitle}>🟢 Вы совпали ({matches.length})</div>
            {matches.length === 0 ? (
              <div style={{ fontSize: 15 }}>Пока нет явных совпадений.</div>
            ) : (
              matches.map((m, i) => (
                <div key={i} style={{ fontSize: 15, marginTop: i > 0 ? 8 : 0 }}>
                  • {m}
                </div>
              ))
            )}
          </div>

          {/* 🟡 ОБСУДИТЕ — ЖЁЛТЫЙ */}
          <div style={blockStyle('linear-gradient(135deg, #FFC107 0%, #E5A800 100%)')}>
            <div style={blockTitle}>🟡 Обсудите ({discuss.length})</div>
            {discuss.length === 0 ? (
              <div style={{ fontSize: 15 }}>Нет тем для обсуждения — всё совпадает.</div>
            ) : (
              discuss.map((d, i) => (
                <div key={i} style={{ fontSize: 15, marginTop: i > 0 ? 8 : 0 }}>
                  • {d}
                </div>
              ))
            )}
          </div>

          {/* 🔴 ВНИМАНИЕ — КРАСНЫЙ */}
          {warnings.length > 0 && (
            <div style={blockStyle('linear-gradient(135deg, #E64646 0%, #B83636 100%)')}>
              <div style={blockTitle}>🔴 Обратите внимание ({warnings.length})</div>
              {warnings.map((w, i) => (
                <div key={i} style={{ fontSize: 15, marginTop: i > 0 ? 8 : 0 }}>
                  • {w}
                </div>
              ))}
            </div>
          )}
        </Div>
      </Group>

      <Group>
        <Div>
          <Button size="l" stretched onClick={() => go('result')}>
            Вернуться к профилю
          </Button>
        </Div>
        <Div>
          <Button size="l" stretched mode="secondary" onClick={() => go('welcome')}>
            На главную
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};