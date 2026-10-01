import { Panel, PanelHeader, Header, Group, Div, Button, Text } from '@vkontakte/vkui';

export const Welcome = ({ id, go }) => {
  return (
    <Panel id={id}>
      <PanelHeader>Вдвоём</PanelHeader>

      <Group>
        <Div>
          <Text weight="1" style={{ fontSize: 24, textAlign: 'center' }}>
            Вдвоём
          </Text>
          <Text style={{ textAlign: 'center', marginTop: 8 }}>
            Искусство быть вместе
          </Text>
        </Div>
      </Group>

      <Group>
        <Div>
          <Text>
            Здравствуйте.
          </Text>
        </Div>
        <Div>
          <Text>
            Меня зовут Вадим Свиридов. Я психолог с 30-летним опытом.
            Это пространство для тех, кто ищет не просто партнёра,
            а спутника жизни.
          </Text>
        </Div>
        <Div>
          <Text>
            Здесь нет бесконечной ленты лиц. Нет свайпов.
            Есть путь: от знакомства с собой — до построения семьи.
          </Text>
        </Div>
        <Div>
          <Text>
            Прежде чем вы кого-то увидите, я хочу понять вас.
            Это займёт 20–30 минут. Ответы видите только вы и алгоритм.
          </Text>
        </Div>
      </Group>

      <Group>
        <Div>
          <Button size="l" stretched onClick={() => go('test')}>
            Начать знакомство с собой
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};