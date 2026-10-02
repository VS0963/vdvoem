import { Button, Div } from '@vkontakte/vkui';

/**
 * Универсальная кнопка «Записаться на сессию».
 *
 * Использование:
 *   <SignupButton go={go} />                                    — если есть go
 *   <SignupButton onGo={() => navigator.push('application')} /> — если есть navigator
 */
export const SignupButton = ({ go, onGo, label = 'Записаться на сессию' }) => {
  const handleClick = () => {
    if (onGo) {
      onGo();
    } else if (go) {
      go('application');
    } else {
      console.warn('SignupButton: не передан ни go, ни onGo');
    }
  };

  return (
    <Div>
      <Button size="l" stretched mode="primary" onClick={handleClick}>
        {label}
      </Button>
    </Div>
  );
};
