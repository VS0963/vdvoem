import { useState } from 'react';
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Group,
  Div,
  FormItem,
  Input,
  Checkbox,
  Button,
  Text,
  Spacing
} from '@vkontakte/vkui';
import { openDocument, sendApplication } from '../utils/vkBridge';

export const Application = ({ id, go }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [consentOffer, setConsentOffer] = useState(false);
  const [consentPD, setConsentPD] = useState(false);
  const [consentSpecial, setConsentSpecial] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const allChecked = consentOffer && consentPD && consentSpecial;
  const formFilled = name.trim() && contact.trim() && email.trim();
  const canSubmit = allChecked && formFilled && !sending;

  const handleSubmit = async () => {
    setSending(true);
    const result = await sendApplication({ name, contact, email });
    setSending(false);

    if (result.ok) {
      setDone(true);
    } else {
      alert('Не удалось отправить заявку: ' + (result.error || 'попробуйте позже'));
    }
  };

  if (done) {
    return (
      <Panel id={id}>
        <PanelHeader before={<PanelHeaderBack onClick={() => go('match')} />}>
          Заявка отправлена
        </PanelHeader>
        <Group>
          <Div>
            <Text weight="1" style={{ fontSize: 18, marginBottom: 12 }}>
              ✅ Спасибо! Заявка принята.
            </Text>
            <Text>
              Я свяжусь с вами в течение 24 часов по указанному контакту.
            </Text>
            <Spacing size={20} />
            <Button size="l" stretched onClick={() => go('match')}>
              Вернуться в приложение
            </Button>
          </Div>
        </Group>
      </Panel>
    );
  }

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => go('match')} />}>
        Запись на сессию
      </PanelHeader>

      <Group header={<Text weight="1">Оставьте заявку</Text>}>
        <FormItem top="Ваше имя">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Как к вам обращаться"
          />
        </FormItem>

        <FormItem top="Телефон или мессенджер для связи">
          <Input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="+7 ... или @username"
          />
        </FormItem>

        <FormItem top="Email (для чека)">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </FormItem>
      </Group>

      <Group header={<Text weight="1">Согласия</Text>}>
        <Div>
          <Checkbox
            checked={consentOffer}
            onChange={(e) => setConsentOffer(e.target.checked)}
          >
            Я принимаю условия{' '}
            <span
              onClick={(e) => { e.preventDefault(); openDocument('offer'); }}
              style={{ color: '#4986cc', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Публичной оферты
            </span>
          </Checkbox>

          <Spacing size={12} />

          <Checkbox
            checked={consentPD}
            onChange={(e) => setConsentPD(e.target.checked)}
          >
            Я даю{' '}
            <span
              onClick={(e) => { e.preventDefault(); openDocument('pd'); }}
              style={{ color: '#4986cc', cursor: 'pointer', textDecoration: 'underline' }}
            >
              согласие на обработку персональных данных
            </span>
          </Checkbox>

          <Spacing size={12} />

          <Checkbox
            checked={consentSpecial}
            onChange={(e) => setConsentSpecial(e.target.checked)}
          >
            Я даю{' '}
            <span
              onClick={(e) => { e.preventDefault(); openDocument('special'); }}
              style={{ color: '#4986cc', cursor: 'pointer', textDecoration: 'underline' }}
            >
              отдельное согласие на обработку специальных категорий ПД
            </span>{' '}
            (сведения о здоровье, эмоциональном состоянии, личных отношениях)
          </Checkbox>
        </Div>
      </Group>

      <Group>
        <Div>
          <Button
            size="l"
            stretched
            disabled={!canSubmit}
            loading={sending}
            onClick={handleSubmit}
          >
            {sending ? 'Отправка...' : 'Записаться на сессию'}
          </Button>
          {!canSubmit && (
            <>
              <Spacing size={8} />
              <Text style={{ color: '#888', fontSize: 13, textAlign: 'center' }}>
                Заполните все поля и подтвердите три согласия
              </Text>
            </>
          )}
        </Div>
      </Group>
    </Panel>
  );
};
