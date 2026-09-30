import { Panel, PanelHeader, Group, Div, Text, Button, Header } from '@vkontakte/vkui';

export const Result = ({ id, go, answers }) => {
  const answersList = answers ? Object.values(answers) : [];

  return (
    <Panel id={id}>
      <PanelHeader>Ваш профиль</PanelHeader>

      <Group>
        <Div>
          <Text weight="1">
            Спасибо. Вы прошли первую часть.
          </Text>
        </Div>
        <Div>
          <Text>
            Вот что вы рассказали о себе. На основе этих ответов
            мы будем подбирать людей, с которыми у вас есть
            реальная совместимость.
          </Text>
        </Div>
      </Group>

      <Group header={<Header>Ваши ответы</Header>}>
        <Div>
          {answersList.length === 0 ? (
            <Text>Вы пока не ответили ни на один вопрос.</Text>
          ) : (
            answersList.map((item, index) => (
              <Div key={index}>
                <Text weight="2">{item.question}</Text>
                <Text>{item.answer}</Text>
              </Div>
            ))
          )}
        </Div>
      </Group>

      <Group>
        <Div>
          <Button size="l" stretched onClick={() => go('welcome')}>
            Вернуться на главную<Div>
  <Button
    size="l"
    stretched
    mode="destructive"
    onClick={() => {
      localStorage.removeItem('test_answers');
      go('welcome');
    }}
  >
    Сбросить ответы и начать заново
  </Button>
</Div>
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};