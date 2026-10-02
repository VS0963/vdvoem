import bridge from '@vkontakte/vk-bridge';

// ============================================================
// КОНСТАНТЫ (наши данные)
// ============================================================
const GROUP_ID = 217208317;              // ID сообщества "МАСТЕРСКАЯ САМОПОЗНАНИЯ"
const ADMIN_USER_ID = 94811917;          // Ваш личный ID ВК (куда падают заявки)
const ACCESS_TOKEN = 'vk1.a.u04kMZLeIR0HDxU5CoiXRyPTniCufYlHL0Cn5bAyRPRkVrchc62H5dRlhw60KU324SJdmM1I1LnqsnKgIkHkbDbiY5X1WDNCZAHhMW-DmxpfbZ1B5CFofw9_ty1M4xUenwmP9RxVFKvrYQCefJjpUmDsz92R4-9OR0yNCZpmuJ7D-eXleAkoKm0Gtk64tIZKnt8ay3UBPuuenlHdkG21oQ';

// Ссылки на документы (GitHub Pages)
const DOCUMENTS_BASE = 'https://vs0963.github.io/legal';

// ============================================================
// 1. ОТКРЫТИЕ ДОКУМЕНТОВ
// ============================================================
export function openDocument(anchor) {
  // anchor: 'offer' | 'pd' | 'special'
  bridge.send('VKWebAppOpenURL', {
    url: `${DOCUMENTS_BASE}/#${anchor}`
  });
}

// ============================================================
// 2. ОТПРАВКА ЗАЯВКИ
// ============================================================
export async function sendApplication(data) {
  try {
    // Шаг 1: запрашиваем разрешение на сообщения от сообщества
    const permission = await bridge.send('VKWebAppAllowMessagesFromGroup', {
      group_id: GROUP_ID,
      key: 'legal_consent_v1'
    });

    if (!permission || !permission.result) {
      return { ok: false, error: 'Пользователь не разрешил сообщения' };
    }

    // Шаг 2: формируем текст заявки
    const message = [
      '🔔 Новая заявка из приложения «Вдвоём»',
      '',
      `👤 Имя: ${data.name}`,
      `📱 Контакт: ${data.contact}`,
      `📧 Email: ${data.email}`,
      '',
      '✅ Согласия:',
      '• Оферта — принято',
      '• Обработка ПД — дано',
      '• Спец. категории ПД — дано',
      '',
      `🕐 ${new Date().toLocaleString('ru-RU')}`
    ].join('\n');

    // Шаг 3: отправляем сообщение администратору от имени сообщества
    await bridge.send('VKWebAppCallAPIMethod', {
      method: 'messages.send',
      params: {
        user_id: ADMIN_USER_ID,
        message: message,
        random_id: Math.floor(Math.random() * 2147483647),
        access_token: ACCESS_TOKEN,
        v: '5.199'
      }
    });

    return { ok: true };
  } catch (error) {
    console.error('Ошибка отправки заявки:', error);
    return { ok: false, error: error?.message || 'Неизвестная ошибка' };
  }
}

// ============================================================
// 3. ПОЛУЧЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ (опционально)
// ============================================================
export async function getUserInfo() {
  try {
    return await bridge.send('VKWebAppGetUserInfo');
  } catch (e) {
    return null;
  }
}
