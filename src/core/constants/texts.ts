/**
 * UI text strings for the bot
 * Redesigned for maximum clarity and conversion
 *
 * Guidelines:
 * - No emoji in buttons (inconsistent rendering)
 * - Max 3 lines before CTA
 * - Show costs in tokens
 * - One action per message
 */

export const TEXTS = {
  // ============================================
  // ONBOARDING
  // ============================================

  INTRO: `<b>Привет!</b>

Я делаю карточки для WB и Ozon за 30 секунд.
Вы присылаете фото — я возвращаю готовый дизайн.

<b>У вас 1 бесплатная генерация</b> для теста.`,

  WELCOME: `<b>MerchantAI</b>

Карточки для маркетплейсов за 30 секунд.
Загрузите фото — получите готовый дизайн.`,

  // Dynamic welcome with credits (use template)
  WELCOME_WITH_CREDITS: `<b>MerchantAI</b>

Карточки для маркетплейсов за 30 секунд.

Баланс: <b>{credits} токенов</b> ({cards} карточек)`,

  // ============================================
  // BUTTONS (No emoji)
  // ============================================

  BTN_CREATE_CARD: 'Создать карточку',
  BTN_MY_CARDS: 'Мои карточки',
  BTN_TOKENS: 'Токены',
  BTN_HELP: 'Помощь',
  BTN_BACK: 'Назад',
  BTN_MENU: 'Меню',
  BTN_CANCEL: 'Отмена',
  BTN_DOWNLOAD: 'Скачать',
  BTN_DOWNLOAD_HD: 'Скачать HD',
  BTN_REGENERATE: 'Ещё вариант',
  BTN_NEXT_SLIDE: 'Следующий слайд',
  BTN_FINISH: 'Завершить',
  BTN_DONE: 'Готово',
  BTN_SKIP: 'Пропустить',
  BTN_ADVANCED: 'Расширенные настройки',
  BTN_CONTACT_SUPPORT: 'Написать в поддержку',
  BTN_TRY_AGAIN: 'Попробовать снова',
  BTN_BUY_TOKENS: 'Купить токены',

  // Legacy button names (for backwards compatibility)
  BTN_IMAGE_CARD: 'Создать карточку',
  BTN_IMAGE_EDIT: 'Редактировать',
  BTN_PHOTO_SESSION: 'Фотосессия',
  BTN_MY_PROFILE: 'Мой профиль',
  BTN_SUPPORT: 'Помощь',
  BTN_BUY_CREDITS: 'Токены',
  BTN_MAIN_MENU: 'Меню',
  BTN_CONFIRM: 'Подтвердить',

  // ============================================
  // CARD CREATION FLOW
  // ============================================

  CARD_UPLOAD_PHOTO: `<b>Отправьте фото товара</b>

Один клик — одна карточка.
Качество фото = качество результата.

<i>Совет: фото на белом фоне работает лучше всего</i>`,

  CARD_UPLOAD_MULTIPLE: `<b>Загрузите изображения</b>

Отправьте до 8 фото:
• Фото товара (обязательно)
• Референс стиля
• Примеры инфографики
• Логотип

Добавьте подпись к фото для уточнения роли.`,

  CARD_PHOTO_RECEIVED: `Фото получено.

Напишите название товара и главное преимущество:

<i>Пример:
«Робот-пылесос Xiaomi — убирает сам, пока вы отдыхаете»</i>`,

  CARD_PHOTO_ADDED: `Фото {current}/{max} добавлено.

Отправьте ещё или нажмите «Готово».`,

  CARD_GENERATING: `Создаю...`,

  CARD_READY: `<b>Готово!</b>

Нравится результат?
Отправьте правки текстом или выберите действие.`,

  CARD_SLIDE_READY: `<b>Слайд {number} готов!</b>

Отправьте правки текстом или выберите действие.`,

  CARD_NO_TOKENS: `<b>Недостаточно токенов</b>

Для создания карточки нужно 4 токена.
Ваш баланс: {balance} токенов.`,

  // ============================================
  // CAROUSEL FLOW
  // ============================================

  CAROUSEL_NEXT_SLIDE: `<b>Слайд {prev} сохранён!</b>

Опишите слайд {next}:
<i>Стиль сохранится автоматически.</i>`,

  CAROUSEL_FINISHED: `<b>Карусель готова!</b>

Слайдов: {total}
Генераций: {generations}`,

  // ============================================
  // DEMO CONSTRUCTOR
  // ============================================

  DEMO_WELCOME: `<b>Создание карточки</b>

Загрузите фото — выберите стиль — получите результат.`,

  DEMO_UPLOAD_PHOTO: `<b>Отправьте фото товара</b>

Требования:
• Товар крупно в кадре
• Хорошее качество
• Без обрезанных краёв`,

  DEMO_STYLE_SELECTION: `<b>Выберите стиль</b>

Или пропустите — я подберу автоматически.`,

  DEMO_PRODUCT_INFO: `<b>Опишите товар</b>

1. Название
2. Главное преимущество
3. 2-3 характеристики

<i>Пример:
Триммер Braun Series 7
Точное бритьё за 1 проход
40 мин работы, водонепроницаемый</i>`,

  DEMO_RESULT: `<b>Готово!</b>`,

  DEMO_WHAT_TO_CHANGE: `<b>Что изменить?</b>`,

  // ============================================
  // PROFILE
  // ============================================

  PROFILE_TITLE: '<b>Профиль</b>',

  PROFILE_INFO: `<b>Профиль</b>

Баланс: <b>{credits} токенов</b>
Хватит на: <b>{cards} карточек</b>

Создано карточек: {cardsCreated}
Регистрация: {date}`,

  PROFILE_LOW_BALANCE: `\n\n⚠️ Баланс заканчивается`,

  // ============================================
  // TOKENS / PRICING
  // ============================================

  TOKENS_TITLE: '<b>Токены</b>',

  TOKENS_INFO: `<b>Баланс: {credits} токенов</b>

Стоимость операций:
• Карточка: 4 токена
• Редактирование: 4 токена
• Слайд карусели: 4 токена`,

  TOKENS_PACKAGES: `<b>Тарифы</b>

Баланс: {credits} токенов

┌─────────────────────────────┐
│ <b>Starter</b> · 590₽           │
│ 60 токенов · 15 карточек    │
│ ~39₽ за карточку            │
└─────────────────────────────┘

┌─────────────────────────────┐
│ <b>Pro</b> · 1 490₽   ★ Выгодно │
│ 184 токена · 46 карточек    │
│ ~32₽ за карточку            │
└─────────────────────────────┘

┌─────────────────────────────┐
│ <b>Big</b> · 4 990₽             │
│ 664 токена · 166 карточек   │
│ ~30₽ за карточку            │
└─────────────────────────────┘`,

  TOKENS_ENTERPRISE: `<b>Enterprise</b>

Для агентств и больших объёмов:
• Индивидуальные условия
• Приоритетная поддержка
• API доступ

Напишите: @odissey_wrk`,

  // Legacy
  BUY_CREDITS_TITLE: '<b>Токены</b>',
  BUY_CREDITS_DESC: `Выберите пакет токенов:

4 токена = 1 карточка`,
  BUY_CREDITS_PAYMENT_WAIT: 'Переходим к оплате...',
  BUY_CREDITS_PAYMENT_SUCCESS: 'Оплата прошла успешно! Токены зачислены.',
  BUY_CREDITS_PAYMENT_CANCELLED: 'Оплата отменена.',

  // ============================================
  // SUPPORT
  // ============================================

  SUPPORT_TITLE: '<b>Помощь</b>',

  SUPPORT_INFO: `<b>Помощь</b>

Частые вопросы:
• Как создать карточку?
• Сколько стоят токены?
• Как сделать карусель?

Или напишите напрямую:
@odissey_wrk`,

  SUPPORT_FAQ_HOW_TO_CREATE: `<b>Как создать карточку?</b>

1. Нажмите «Создать карточку»
2. Отправьте фото товара
3. Опишите товар и результат
4. Получите карточку за 30-60 сек

Стоимость: 4 токена за карточку.`,

  SUPPORT_FAQ_PRICING: `<b>Сколько стоят токены?</b>

• Starter: 590₽ за 60 токенов
• Pro: 1 490₽ за 184 токена
• Big: 4 990₽ за 664 токена

4 токена = 1 карточка`,

  SUPPORT_FAQ_CAROUSEL: `<b>Как сделать карусель?</b>

1. Создайте первый слайд
2. Нажмите «Следующий слайд»
3. Опишите новый слайд
4. Стиль сохранится автоматически

Каждый слайд: 4 токена.`,

  SUPPORT_CONTACT: 'Telegram: @odissey_wrk',
  SUPPORT_BTN_FAQ: 'Частые вопросы',
  SUPPORT_BTN_CONTACT: 'Написать',

  // Legacy
  PROFILE_BTN_BUY_CREDITS: 'Купить токены',
  PROFILE_BTN_HISTORY: 'История',
  PROFILE_NO_PLAN: 'Бесплатный',

  // ============================================
  // ERRORS
  // ============================================

  ERROR_GENERAL: `Произошла ошибка.

Попробуйте ещё раз или напишите в поддержку.`,

  ERROR_GENERATION_FAILED: `Не удалось создать карточку.

Возможные причины:
• Фото слишком размытое
• Сервис перегружен

Токены не списаны.`,

  ERROR_PAYMENT_FAILED: `Оплата не прошла.

Токены не списаны.
Попробуйте другую карту.`,

  ERROR_NO_PHOTO: 'Отправьте фотографию.',
  ERROR_INVALID_FORMAT: 'Неверный формат.',
  ERROR_TRY_AGAIN: '\n\nПопробуйте ещё раз.',

  // ============================================
  // SESSION
  // ============================================

  SESSION_EXPIRED: `Сессия истекла.

Это бывает после 30 минут неактивности.
Начните заново — токены на месте.`,

  SESSION_NOT_FOUND: 'Сессия не найдена.',

  // ============================================
  // PROCESSING
  // ============================================

  PROCESSING: 'Обрабатываю...',
  GENERATING: 'Генерирую...',
  DELETING: 'Удаляю...',

  // ============================================
  // NAVIGATION
  // ============================================

  NAV_HINT_MENU: 'Используйте кнопки или отправьте /menu',
  NAV_HINT_PHOTO: 'Отправьте фото для создания карточки.',
  NAV_HINT_GENERAL: 'Отправьте фото или используйте кнопки.',

  // ============================================
  // IMAGE CARD (Legacy compatibility)
  // ============================================

  IMAGE_CARD_TITLE: '<b>Создание карточки</b>',
  IMAGE_CARD_SEND_PHOTO: `<b>Отправьте фото товара</b>

Качество фото = качество результата.`,
  IMAGE_CARD_PHOTO_RECEIVED: `Фото получено.

Напишите название товара и желаемый результат:

<i>Пример: «Триммер Braun Series 7 — точное бритьё»</i>`,
  IMAGE_CARD_WAIT: 'Создаю...',
  IMAGE_CARD_READY: '<b>Карточка готова!</b>',
  IMAGE_CARD_SESSION_OPTIONS: 'Отправьте правки текстом или выберите действие.',
  IMAGE_CARD_ERROR: 'Ошибка создания карточки. Попробуйте ещё раз.',
  IMAGE_CARD_NO_CREDITS: `<b>Недостаточно токенов</b>

Для создания карточки нужно 4 токена.`,

  // ============================================
  // IMAGE EDIT (Legacy compatibility)
  // ============================================

  IMAGE_EDIT_TITLE: '<b>Редактирование</b>',
  IMAGE_EDIT_SEND_PHOTO: 'Отправьте изображение для редактирования.',
  IMAGE_EDIT_PHOTO_RECEIVED: `Изображение получено.

Опишите, что нужно изменить.`,
  IMAGE_EDIT_WAIT: 'Обрабатываю...',
  IMAGE_EDIT_READY: '<b>Готово!</b>',
  IMAGE_EDIT_SESSION_OPTIONS: 'Отправьте новые правки или вернитесь в меню.',
  IMAGE_EDIT_ERROR: 'Ошибка обработки. Попробуйте ещё раз.',
  IMAGE_EDIT_NEED_PROMPT: 'Опишите, что нужно изменить.',
  IMAGE_EDIT_NO_CREDITS: `<b>Недостаточно токенов</b>

Для редактирования нужно 4 токена.`,

  // ============================================
  // PHOTO SESSION (Legacy, not implemented)
  // ============================================

  PHOTO_SESSION_TITLE: '<b>Фотосессия</b>',
  PHOTO_SESSION_DESC: 'Функция в разработке.',
  PHOTO_SESSION_UPLOAD: 'Отправьте фото товара.',
  PHOTO_SESSION_WAIT: 'Создаю фотосессию...',
  PHOTO_SESSION_READY: 'Фотосессия готова!',
  PHOTO_SESSION_ERROR: 'Ошибка создания фотосессии.',
} as const;

// ============================================
// HELPERS
// ============================================

/**
 * Format welcome message with credit balance
 */
export function formatWelcome(credits: number): string {
  const cards = Math.floor(credits / 4);
  return TEXTS.WELCOME_WITH_CREDITS
    .replace('{credits}', String(credits))
    .replace('{cards}', String(cards));
}

/**
 * Format profile info
 */
export function formatProfile(data: {
  credits: number;
  cardsCreated: number;
  date: string;
}): string {
  const cards = Math.floor(data.credits / 4);
  let text = TEXTS.PROFILE_INFO
    .replace('{credits}', String(data.credits))
    .replace('{cards}', String(cards))
    .replace('{cardsCreated}', String(data.cardsCreated))
    .replace('{date}', data.date);

  if (data.credits < 4) {
    text += TEXTS.PROFILE_LOW_BALANCE;
  }

  return text;
}

/**
 * Format no tokens message
 */
export function formatNoTokens(balance: number): string {
  return TEXTS.CARD_NO_TOKENS.replace('{balance}', String(balance));
}

/**
 * Format tokens packages
 */
export function formatTokensPackages(credits: number): string {
  return TEXTS.TOKENS_PACKAGES.replace('{credits}', String(credits));
}
