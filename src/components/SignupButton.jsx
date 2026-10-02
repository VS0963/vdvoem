import { Button, Div } from '@vkontakte/vkui';

/**
 * Универсальная кнопка «Записаться на сессию».
 * Вставляйте на любой экран — просто передайте go.
 *
 * Пример использования:
 *   <SignupButton go={go} />
 */
export const SignupButton = ({ go, label = 'Записаться на сессию' }) => {
  return (
    <Div>
      <Button size="l" stretched mode="primary" onClick={() => go('application')}>
        {label}
      </Button>
    </Div>
  );
};
