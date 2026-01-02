# .eslintrc.js

```js
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-console': 'off',
  },
  env: {
    node: true,
    es2022: true,
  },
};
```

# .gitignore

```
node_modules/
dist/
.env
*.log
.DS_Store

```

# .prettierrc

```
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

# ecosystem.js

```js
module.exports = {
  apps: [
    {
      name: 'merchantai-bot',
      script: './dist/index.js',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
      },
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 4000,
    },
  ],
};
```

# package.json

```json
{
  "name": "merchantai-telegram-bot",
  "version": "1.0.0",
  "description": "Telegram bot for generating marketplace cards with AI",
  "main": "dist/index.js",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "lint": "eslint src --ext .ts",
    "format": "prettier --write \"src/**/*.ts\""
  },
  "keywords": [
    "telegram",
    "bot",
    "grammy",
    "ai",
    "marketplace"
  ],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@grammyjs/menu": "^1.2.1",
    "@grammyjs/runner": "^2.0.3",
    "@supabase/supabase-js": "^2.39.3",
    "axios": "^1.6.5",
    "dotenv": "^16.3.1",
    "grammy": "^1.20.3",
    "i": "^0.3.7",
    "npm": "^11.7.0",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "@types/node": "^20.11.5",
    "@types/uuid": "^9.0.7",
    "@typescript-eslint/eslint-plugin": "^6.19.0",
    "@typescript-eslint/parser": "^6.19.0",
    "eslint": "^8.56.0",
    "prettier": "^3.2.4",
    "tsx": "^4.7.0",
    "typescript": "^5.3.3"
  }
}

```

# README.md

```md
# Merchant AI - Telegram Bot

A Telegram bot that helps sellers and designers create info cards for marketplaces.

## Setup

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Create a `.env` file and add your bot token:
   \`\`\`
   BOT_TOKEN=your_telegram_bot_token_here
   \`\`\`

3. Run in development mode:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Build for production:
   \`\`\`bash
   npm run build
   npm start
   \`\`\`

## Get Bot Token

1. Open Telegram and search for @BotFather
2. Send `/newbot` command
3. Follow instructions to create your bot
4. Copy the token and add it to `.env` file

## Commands

- `/start` - Start the bot
- `/create` - Create a new product card
- `/help` - Show help information

```

# src/config.ts

```ts
import dotenv from 'dotenv';

dotenv.config();

interface Config {
  botToken: string;
  supabase: {
    url: string;
    anonKey: string;
    serviceRoleKey: string;
  };
  yookassa: {
    shopId: string;
    secretKey: string;
  };
  n8n: {
    webhookUrl: string;
  };
  nodeEnv: string;
  port: number;
}

const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
};

export const config: Config = {
  botToken: getEnvVar('BOT_TOKEN'),
  supabase: {
    url: getEnvVar('SUPABASE_URL'),
    anonKey: getEnvVar('SUPABASE_ANON_KEY'),
    serviceRoleKey: getEnvVar('SUPABASE_SERVICE_ROLE_KEY'),
  },
  yookassa: {
    shopId: getEnvVar('YOOKASSA_SHOP_ID'),
    secretKey: getEnvVar('YOOKASSA_SECRET_KEY'),
  },
  n8n: {
    webhookUrl: getEnvVar('N8N_WEBHOOK_URL'),
  },
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
};
```

# src/constants/texts.ts

```ts
export const TEXTS = {
  // Main Menu
  WELCOME: `👋 Добро пожаловать в MerchantAI!

Я помогу вам создавать профессиональные карточки товаров для маркетплейсов с помощью искусственного интеллекта.

Выберите нужное действие:`,

  // Buttons
  BTN_IMAGE_CARD: '🎨 Создать карточку',
  BTN_PHOTO_SESSION: '📸 Фотосессия товара',
  BTN_MY_PROFILE: 'Мой профиль',
  BTN_SUPPORT: 'Поддержка',
  BTN_BUY_PLAN: '⭐ Купить план',
  BTN_BACK: '◀️ Назад',
  BTN_MAIN_MENU: '🏠 Главное меню',
  BTN_CANCEL: '❌ Отменить',
  BTN_CONFIRM: '✅ Подтвердить',

  // Image Card
  IMAGE_CARD_TITLE: '🎨 Создание карточки товара',
  IMAGE_CARD_DESC: `Давайте создадим профессиональную карточку для вашего товара!

Отправьте мне:
• Фото товара
• Описание товара
• Желаемый стиль (опционально)

Я создам для вас уникальную карточку с помощью ИИ.`,
  IMAGE_CARD_UPLOAD: '📤 Загрузите фото товара',
  IMAGE_CARD_WAIT: '⏳ Ваша карточка создаётся...\n\nЭто может занять 30-60 секунд.',
  IMAGE_CARD_READY: '✅ Ваша карточка готова!',
  IMAGE_CARD_ERROR: '❌ Произошла ошибка при создании карточки. Попробуйте ещё раз или обратитесь в поддержку.',
  IMAGE_CARD_NO_CREDITS: '⚠️ У вас закончились кредиты.\n\nПожалуйста, приобретите план для продолжения работы.',

  // Photo Session
  PHOTO_SESSION_TITLE: '📸 Фотосессия товара',
  PHOTO_SESSION_DESC: `Создайте серию профессиональных фотографий вашего товара!

Я создам для вас:
• 5-10 изображений в разных ракурсах
• Разные фоны и стили
• Оптимизацию для маркетплейсов

Загрузите фото товара и опишите желаемый результат.`,
  PHOTO_SESSION_UPLOAD: '📤 Загрузите основное фото товара',
  PHOTO_SESSION_WAIT: '⏳ Создаём фотосессию...\n\nЭто займёт 2-3 минуты.',
  PHOTO_SESSION_READY: '✅ Фотосессия готова! Вот ваши изображения:',
  PHOTO_SESSION_ERROR: '❌ Произошла ошибка при создании фотосессии.',

  // Profile
  PROFILE_TITLE: '👤 Мой профиль',
  PROFILE_INFO: `📊 Информация о вашем аккаунте:

👤 Имя: {name}
📅 Дата регистрации: {date}
📦 Текущий план: {plan}
💳 Кредитов осталось: {credits}
🎨 Создано карточек: {cardsCreated}

Хотите улучшить план?`,
  PROFILE_NO_PLAN: 'Бесплатный',
  PROFILE_BTN_UPGRADE: '⬆️ Купить токены',
  PROFILE_BTN_HISTORY: '📜 История генераций',

  // Support
  SUPPORT_TITLE: '💬 Поддержка',
  SUPPORT_DESC: `Здравствуйте! Чем мы можем вам помочь?

🔹 Часто задаваемые вопросы:
• Как создать карточку?
• Сколько стоят кредиты?
• Как работает фотосессия?
• Технические проблемы

Вы также можете написать нам напрямую:`,
  SUPPORT_CONTACT: '💬 Telegram: @odissey_wrk',
  SUPPORT_BTN_FAQ: '❓ Часто задаваемые вопросы',
  SUPPORT_BTN_CONTACT: '📧 Связаться с нами',

  // Buy Plan
  BUY_PLAN_TITLE: '⭐ Выберите план',
  BUY_PLAN_DESC: 'Выберите подходящий план для ваших нужд:',
  BUY_PLAN_STARTER: `Стартовый
💳 50 кредитов
💰 490₽`,
  BUY_PLAN_PRO: `Профессиональный
💳 200 кредитов
🎁 Приоритетная поддержка
💰 1490₽`,
  BUY_PLAN_BUSINESS: `Бизнес
💳 500 кредитов
🎁 Приоритетная поддержка
💰 2990₽`,
  BUY_PLAN_PAYMENT_WAIT: '⏳ Переходим к оплате...',
  BUY_PLAN_PAYMENT_SUCCESS: '✅ Оплата прошла успешно! Ваш план активирован.',
  BUY_PLAN_PAYMENT_CANCELLED: '❌ Оплата отменена.',

  // Errors
  ERROR_GENERAL: '❌ Произошла ошибка. Пожалуйста, попробуйте ещё раз.',
  ERROR_NO_PHOTO: '⚠️ Пожалуйста, отправьте фотографию.',
  ERROR_INVALID_FORMAT: '⚠️ Неверный формат данных.',
  ERROR_TRY_AGAIN: '\n\nПопробуйте ещё раз или обратитесь в поддержку.',

  // Processing
  PROCESSING: '⏳ Обрабатываю ваш запрос...',
  DELETING: '🗑️ Удаляю...',
  GENERATING: '✨ Генерирую...',
};

export const KEYBOARD_LAYOUTS = {
  MAIN_MENU: [
    [TEXTS.BTN_IMAGE_CARD, TEXTS.BTN_PHOTO_SESSION],
    [TEXTS.BTN_MY_PROFILE, TEXTS.BTN_SUPPORT],
    [TEXTS.BTN_BUY_PLAN],
  ],
  BACK_TO_MENU: [[TEXTS.BTN_MAIN_MENU]],
  CANCEL_AND_BACK: [[TEXTS.BTN_CANCEL], [TEXTS.BTN_MAIN_MENU]],
  PROFILE_ACTIONS: [[TEXTS.PROFILE_BTN_UPGRADE, TEXTS.PROFILE_BTN_HISTORY], [TEXTS.BTN_MAIN_MENU]],
  SUPPORT_ACTIONS: [[TEXTS.SUPPORT_BTN_FAQ], [TEXTS.BTN_MAIN_MENU]],
};
```

# src/handlers/buyPlan.ts

```ts
import { MyContext, PLANS } from '../types';
import { TEXTS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';
import { supabase } from '../services/supabase';
import { yookassa } from '../services/yookassa';

export async function handleBuyPlan(ctx: MyContext): Promise<void> {
  await MessageManager.cleanup(ctx);

  const plansText = `${TEXTS.BUY_PLAN_TITLE}

${TEXTS.BUY_PLAN_DESC}

${TEXTS.BUY_PLAN_STARTER}

${TEXTS.BUY_PLAN_PRO}

${TEXTS.BUY_PLAN_BUSINESS}

Выберите план:`;

  await ctx.reply(plansText, {
    reply_markup: KeyboardBuilder.planSelection(),
  });
}

export async function handlePlanSelection(ctx: MyContext, planType: string): Promise<void> {
  const plan = PLANS[planType];

  if (!plan) {
    await ctx.answerCallbackQuery('Неверный план');
    return;
  }

  await ctx.answerCallbackQuery();

  // Get user
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  try {
    // Delete the plan selection message
    if (ctx.callbackQuery?.message) {
      await ctx.api.deleteMessage(ctx.chat!.id, ctx.callbackQuery.message.message_id);
    }

    // Send processing message
    await MessageManager.sendProcessing(ctx, TEXTS.BUY_PLAN_PAYMENT_WAIT);

    // Create payment in database
    const payment = await supabase.createPayment(user.id, planType, plan.price, 'RUB');

    // Create payment with YooKassa
    const yooPayment = await yookassa.createPayment({
      amount: plan.price,
      currency: 'RUB',
      description: `План ${plan.name} - ${plan.credits} кредитов`,
      returnUrl: `https://t.me/${ctx.me.username}`,
      metadata: {
        payment_id: payment.id,
        user_id: user.id,
        plan: planType,
      },
    });

    // Update payment with YooKassa ID
    await supabase.updatePayment(payment.id, {
      yookassa_payment_id: yooPayment.id,
    });

    // Delete processing message
    await MessageManager.deleteProcessing(ctx);

    // Send payment link
    const paymentText = `💳 *Оплата плана ${plan.name}*

💰 Сумма: ${plan.price} ₽
💳 Кредитов: ${plan.credits}

Нажмите кнопку "Оплатить" и следуйте инструкциям.
После оплаты нажмите "Я оплатил" для проверки статуса.`;

    await ctx.reply(paymentText, {
      parse_mode: 'Markdown',
      reply_markup: KeyboardBuilder.paymentConfirm(yooPayment.confirmation.confirmation_url),
    });

    // Store payment ID in session for checking
    ctx.session.tempData = {
      paymentId: payment.id,
      yooPaymentId: yooPayment.id,
      plan: planType,
    };
  } catch (error) {
    console.error('Payment creation error:', error);

    await MessageManager.deleteProcessing(ctx);

    await ctx.reply('❌ Произошла ошибка при создании платежа. Попробуйте ещё раз.', {
      reply_markup: KeyboardBuilder.mainMenu(),
    });
  }
}

export async function handlePaymentCheck(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const paymentData = ctx.session.tempData;

  if (!paymentData?.paymentId || !paymentData?.yooPaymentId) {
    await ctx.reply('❌ Информация о платеже не найдена', {
      reply_markup: KeyboardBuilder.mainMenu(),
    });
    return;
  }

  try {
    // Check payment status with YooKassa
    const yooPayment = await yookassa.getPayment(paymentData.yooPaymentId);

    if (yookassa.isPaymentSucceeded(yooPayment)) {
      // Get user
      const user = await supabase.getUser(ctx.from!.id);
      if (!user) {
        await ctx.reply(TEXTS.ERROR_GENERAL);
        return;
      }

      // Get plan details
      const plan = PLANS[paymentData.plan];

      // Update payment status
      await supabase.updatePayment(paymentData.paymentId, {
        status: 'succeeded',
      });

      // Update user plan and credits
      await supabase.updateUser(user.id, {
        plan: paymentData.plan,
        credits: user.credits + plan.credits,
      });

      // Delete payment message
      if (ctx.callbackQuery?.message) {
        await ctx.api.deleteMessage(ctx.chat!.id, ctx.callbackQuery.message.message_id);
      }

      // Send success message
      await ctx.reply(
        `${TEXTS.BUY_PLAN_PAYMENT_SUCCESS}

🎉 План "${plan.name}" активирован!
💳 Начислено кредитов: ${plan.credits}
💰 Всего кредитов: ${user.credits + plan.credits}`,
        {
          reply_markup: KeyboardBuilder.mainMenu(),
        }
      );

      // Clear temp data
      ctx.session.tempData = {};
    } else if (yookassa.isPaymentPending(yooPayment)) {
      await ctx.answerCallbackQuery({
        text: '⏳ Платёж ещё обрабатывается. Попробуйте через минуту.',
        show_alert: true,
      });
    } else {
      await ctx.answerCallbackQuery({
        text: '❌ Платёж не найден или отменён',
        show_alert: true,
      });
    }
  } catch (error) {
    console.error('Payment check error:', error);
    await ctx.reply('❌ Ошибка проверки платежа. Обратитесь в поддержку.', {
      reply_markup: KeyboardBuilder.mainMenu(),
    });
  }
}

export async function handlePaymentCancel(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const paymentData = ctx.session.tempData;

  if (paymentData?.paymentId) {
    await supabase.updatePayment(paymentData.paymentId, {
      status: 'cancelled',
    });
  }

  // Delete payment message
  if (ctx.callbackQuery?.message) {
    await ctx.api.deleteMessage(ctx.chat!.id, ctx.callbackQuery.message.message_id);
  }

  await ctx.reply(TEXTS.BUY_PLAN_PAYMENT_CANCELLED, {
    reply_markup: KeyboardBuilder.mainMenu(),
  });

  // Clear temp data
  ctx.session.tempData = {};
}
```

# src/handlers/imageCard.ts

```ts
import { MyContext } from '../types';
import { TEXTS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';
import { supabase } from '../services/supabase';
import { n8n } from '../services/n8n';
import { InputFile } from 'grammy';

const IMAGE_CARD_COST = 4; // Credits per card

export async function handleImageCard(ctx: MyContext): Promise<void> {
  await MessageManager.cleanup(ctx);

  await ctx.reply(TEXTS.IMAGE_CARD_TITLE, {
    reply_markup: KeyboardBuilder.backToMenu(),
  });

  await ctx.reply(TEXTS.IMAGE_CARD_DESC);
  await ctx.reply(TEXTS.IMAGE_CARD_UPLOAD);
}

export async function handleImageCardPhoto(ctx: MyContext): Promise<void> {
  // Check for photo
  if (!ctx.message?.photo || ctx.message.photo.length === 0) {
    await ctx.reply(TEXTS.ERROR_NO_PHOTO);
    return;
  }

  // Get user
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  // Check credits
  if (user.credits < IMAGE_CARD_COST) {
    await ctx.reply(TEXTS.IMAGE_CARD_NO_CREDITS, {
      reply_markup: KeyboardBuilder.planSelection(),
    });
    return;
  }

  // Get photo URL
  const photo = ctx.message.photo[ctx.message.photo.length - 1]; // Get largest photo
  const file = await ctx.api.getFile(photo.file_id);
  const photoUrl = `https://api.telegram.org/file/bot${ctx.api.token}/${file.file_path}`;

  // Get description if provided
  const description = ctx.message.caption || '';

  // Send processing message
  const processingMsg = await MessageManager.sendProcessing(ctx, TEXTS.IMAGE_CARD_WAIT);

  try {
    // Create order
    const order = await supabase.createOrder(user.id, 'image_card', {
      photo_url: photoUrl,
      description,
    }, IMAGE_CARD_COST);

    // Update order status
    await supabase.updateOrder(order.id, { status: 'processing' });

    // Call n8n to generate image
    const result = await n8n.generateImageCard({
      photoUrl,
      description,
      userId: user.id,
      orderId: order.id,
    });

    console.log(result)

    if (result.success && result.buffer && result.buffer.length > 0) {
      // Delete processing message
      await MessageManager.deleteProcessing(ctx);

      // Send result
      // Send image from binary buffer
  await ctx.replyWithPhoto(
    new InputFile(
      result.buffer,
    ),
    {
      caption: TEXTS.IMAGE_CARD_READY,
      reply_markup: KeyboardBuilder.mainMenu(),
    }
  );

      // Update database
      await supabase.updateOrder(order.id, {
        status: 'completed',
        output_data: { images: result.images },
      });

      // Deduct credits and increment counter
      await supabase.updateUserCredits(user.id, -IMAGE_CARD_COST);
      await supabase.incrementCardsCreated(user.id);
    } else {
      // Delete processing message
      await MessageManager.deleteProcessing(ctx);

      await ctx.reply(TEXTS.IMAGE_CARD_ERROR, {
        reply_markup: KeyboardBuilder.mainMenu(),
      });

      await supabase.updateOrder(order.id, {
        status: 'failed',
        output_data: { error: result.error || 'Unknown error' },
      });
    }
  } catch (error) {
    console.error('Image card generation error:', error);

    // Delete processing message
    await MessageManager.deleteProcessing(ctx);

    await ctx.reply(TEXTS.IMAGE_CARD_ERROR, {
      reply_markup: KeyboardBuilder.mainMenu(),
    });
  }
}
```

# src/handlers/mainMenu.ts

```ts
import { MyContext, ROUTES } from '../types';
import { TEXTS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';
import { supabase } from '../services/supabase';

export async function showMainMenu(ctx: MyContext): Promise<void> {
  // Ensure user exists in database
  if (ctx.from) {
    await supabase.getOrCreateUser(
      ctx.from.id,
      ctx.from.username,
      ctx.from.first_name,
      ctx.from.last_name
    );
  }

  // Clean up any old messages
  await MessageManager.cleanup(ctx);

  // Update session
  ctx.session.currentRoute = ROUTES.MAIN_MENU;
  ctx.session.tempData = {};

  // Send welcome message with main menu keyboard
  await ctx.reply(TEXTS.WELCOME, {
    reply_markup: KeyboardBuilder.mainMenu(),
  });
}

export async function handleMainMenuNavigation(ctx: MyContext): Promise<boolean> {
  const text = ctx.message?.text;

  if (!text) return false;

  switch (text) {
    case TEXTS.BTN_IMAGE_CARD:
      ctx.session.currentRoute = ROUTES.IMAGE_CARD;
      return true;

    case TEXTS.BTN_PHOTO_SESSION:
      ctx.session.currentRoute = ROUTES.PHOTO_SESSION;
      return true;

    case TEXTS.BTN_MY_PROFILE:
      ctx.session.currentRoute = ROUTES.PROFILE;
      return true;

    case TEXTS.BTN_SUPPORT:
      ctx.session.currentRoute = ROUTES.SUPPORT;
      return true;

    case TEXTS.BTN_BUY_PLAN:
      ctx.session.currentRoute = ROUTES.BUY_PLAN;
      return true;

    case TEXTS.BTN_MAIN_MENU:
      await showMainMenu(ctx);
      return true;

    default:
      return false;
  }
}
```

# src/handlers/photoSession.ts

```ts
import { MyContext } from '../types';
import { TEXTS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';
import { supabase } from '../services/supabase';
import { n8n } from '../services/n8n';
import { InputMediaPhoto } from 'grammy/types';

const PHOTO_SESSION_COST = 4; // Credits per session

export async function handlePhotoSession(ctx: MyContext): Promise<void> {
  await MessageManager.cleanup(ctx);

  await ctx.reply(TEXTS.PHOTO_SESSION_TITLE, {
    reply_markup: KeyboardBuilder.backToMenu(),
  });

  await ctx.reply(TEXTS.PHOTO_SESSION_DESC);
  await ctx.reply(TEXTS.PHOTO_SESSION_UPLOAD);
}

export async function handlePhotoSessionPhoto(ctx: MyContext): Promise<void> {
  // Check for photo
  if (!ctx.message?.photo || ctx.message.photo.length === 0) {
    await ctx.reply(TEXTS.ERROR_NO_PHOTO);
    return;
  }

  // Get user
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  // Check credits
  if (user.credits < PHOTO_SESSION_COST) {
    await ctx.reply(TEXTS.IMAGE_CARD_NO_CREDITS, {
      reply_markup: KeyboardBuilder.planSelection(),
    });
    return;
  }

  // Get photo URL
  const photo = ctx.message.photo[ctx.message.photo.length - 1];
  const file = await ctx.api.getFile(photo.file_id);
  const photoUrl = `https://api.telegram.org/file/bot${ctx.api.token}/${file.file_path}`;

  // Get description if provided
  const description = ctx.message.caption || '';

  // Send processing message
  const processingMsg = await MessageManager.sendProcessing(ctx, TEXTS.PHOTO_SESSION_WAIT);

  try {
    // Create order
    const order = await supabase.createOrder(
      user.id,
      'photo_session',
      {
        photo_url: photoUrl,
        description,
      },
      PHOTO_SESSION_COST
    );

    // Update order status
    await supabase.updateOrder(order.id, { status: 'processing' });

    // Call n8n to generate photo session
    const result = await n8n.generatePhotoSession({
      photoUrl,
      description,
      count: 5,
      userId: user.id,
      orderId: order.id,
    });

    if (result.success && result.images && result.images.length > 0) {
      // Delete processing message
      await MessageManager.deleteProcessing(ctx);

      // Send results as media group
      if (result.images.length === 1) {
        await ctx.replyWithPhoto(result.images[0], {
          caption: TEXTS.PHOTO_SESSION_READY,
          reply_markup: KeyboardBuilder.mainMenu(),
        });
      } else {
        // Send caption separately
        await ctx.reply(TEXTS.PHOTO_SESSION_READY);

        // Create media group
        const mediaGroup: InputMediaPhoto[] = result.images.map((url, index) => ({
          type: 'photo' as const,
          media: url,
          caption: index === 0 ? `Фото ${index + 1} из ${result.images!.length}` : undefined,
        }));

        // Send media group
        await ctx.replyWithMediaGroup(mediaGroup);

        // Send main menu
        await ctx.reply('Готово! 🎉', {
          reply_markup: KeyboardBuilder.mainMenu(),
        });
      }

      // Update database
      await supabase.updateOrder(order.id, {
        status: 'completed',
        output_data: { images: result.images },
      });

      // Deduct credits and increment counter
      await supabase.updateUserCredits(user.id, -PHOTO_SESSION_COST);
      await supabase.incrementCardsCreated(user.id);
    } else {
      // Delete processing message
      await MessageManager.deleteProcessing(ctx);

      await ctx.reply(TEXTS.PHOTO_SESSION_ERROR, {
        reply_markup: KeyboardBuilder.mainMenu(),
      });

      await supabase.updateOrder(order.id, {
        status: 'failed',
        output_data: { error: result.error || 'Unknown error' },
      });
    }
  } catch (error) {
    console.error('Photo session generation error:', error);

    // Delete processing message
    await MessageManager.deleteProcessing(ctx);

    await ctx.reply(TEXTS.PHOTO_SESSION_ERROR, {
      reply_markup: KeyboardBuilder.mainMenu(),
    });
  }
}
```

# src/handlers/profile.ts

```ts
import { MyContext, PLANS } from '../types';
import { TEXTS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager, formatDate } from '../utils/helpers';
import { supabase } from '../services/supabase';

export async function handleProfile(ctx: MyContext): Promise<void> {
  await MessageManager.cleanup(ctx);

  // Get user from database
  const user = await supabase.getUser(ctx.from!.id);

  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL, {
      reply_markup: KeyboardBuilder.mainMenu(),
    });
    return;
  }

  // Format profile information
  const planName = user.plan === 'free' ? TEXTS.PROFILE_NO_PLAN : PLANS[user.plan]?.name || user.plan;

  const profileText = TEXTS.PROFILE_INFO.replace('{name}', user.first_name || user.username || 'Пользователь')
    .replace('{date}', formatDate(user.created_at))
    .replace('{plan}', planName)
    .replace('{credits}', user.credits.toString())
    .replace('{cardsCreated}', user.cards_created.toString());

  await ctx.reply(TEXTS.PROFILE_TITLE, {
    reply_markup: KeyboardBuilder.profileActions(),
  });

  await ctx.reply(profileText);
}

export async function handleProfileHistory(ctx: MyContext): Promise<void> {
  // Get user
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  // Get orders
  const orders = await supabase.getUserOrders(user.id, 10);

  if (orders.length === 0) {
    await ctx.reply('📜 История заказов пуста.\n\nВы ещё не создавали карточки.', {
      reply_markup: KeyboardBuilder.profileActions(),
    });
    return;
  }

  // Format history
  let historyText = '📜 *История ваших заказов:*\n\n';

  orders.forEach((order, index) => {
    const emoji = order.type === 'image_card' ? '🎨' : '📸';
    const status =
      order.status === 'completed' ? '✅' : order.status === 'failed' ? '❌' : '⏳';
    const date = formatDate(order.created_at);

    historyText += `${emoji} ${status} ${date}\n`;
    historyText += `Тип: ${order.type === 'image_card' ? 'Карточка' : 'Фотосессия'}\n`;
    historyText += `Кредитов: ${order.credits_used}\n\n`;
  });

  await ctx.reply(historyText, {
    parse_mode: 'Markdown',
    reply_markup: KeyboardBuilder.profileActions(),
  });
}
```

# src/handlers/support.ts

```ts
import { MyContext } from '../types';
import { TEXTS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';

export async function handleSupport(ctx: MyContext): Promise<void> {
  await MessageManager.cleanup(ctx);

  await ctx.reply(TEXTS.SUPPORT_TITLE, {
    reply_markup: KeyboardBuilder.supportActions(),
  });

  await ctx.reply(TEXTS.SUPPORT_DESC);
  await ctx.reply(TEXTS.SUPPORT_CONTACT);
}

export async function handleSupportFAQ(ctx: MyContext): Promise<void> {
  const faqText = `❓ *Часто задаваемые вопросы*

*1. Как создать карточку товара?*
Нажмите "🎨 Создать карточку", загрузите фото товара и опишите его. Наш ИИ создаст профессиональную карточку за 30-60 секунд.

*2. Что такое кредиты?*
Кредиты - это внутренняя валюта бота. Один кредит = одна операция с ИИ. Карточка стоит 5 кредитов, фотосессия - 15 кредитов.

*3. Как работает фотосессия?*
Вы загружаете одно фото товара, а получаете 5-10 профессиональных изображений с разными фонами и ракурсами.

*4. Можно ли вернуть деньги?*
Да, в течение 14 дней с момента покупки при условии, что вы не использовали более 10% кредитов.

*5. Какие форматы поддерживаются?*
Мы принимаем JPG, PNG, WEBP. Рекомендуемое разрешение - от 1024x1024 пикселей.

*6. Как долго хранятся результаты?*
Все созданные карточки доступны в истории заказов в течение 30 дней.

*7. Можно ли использовать коммерчески?*
Да! Все созданные изображения полностью принадлежат вам и могут использоваться для коммерческих целей.

*8. Есть ли API доступ?*
Да, API доступ включён в план "Бизнес". Свяжитесь с нами для получения ключей.`;

  await ctx.reply(faqText, {
    parse_mode: 'Markdown',
    reply_markup: KeyboardBuilder.supportActions(),
  });
}

export async function handleSupportContact(ctx: MyContext): Promise<void> {
  const contactText = `📧 *Связаться с нами*

Если вы не нашли ответ на свой вопрос в FAQ, свяжитесь с нами одним из способов:

*Email:* support@merchantai.com
*Telegram:* @merchantai_support
*Время ответа:* 1-24 часа

Для владельцев планов Pro и Business - приоритетная поддержка в течение 1-4 часов.

При обращении укажите:
• Ваш Telegram ID: \`${ctx.from!.id}\`
• Описание проблемы
• Скриншоты (если есть)

Мы обязательно вам поможем! 🙂`;

  await ctx.reply(contactText, {
    parse_mode: 'Markdown',
    reply_markup: KeyboardBuilder.supportActions(),
  });
}
```

# src/index.ts

```ts
import { Bot, session } from 'grammy';
import { run } from '@grammyjs/runner';
import { config } from './config';
import { MyContext, SessionData, ROUTES } from './types';
import { TEXTS } from './constants/texts';

// Handlers
import { showMainMenu, handleMainMenuNavigation } from './handlers/mainMenu';
import { handleImageCard, handleImageCardPhoto } from './handlers/imageCard';
import { handlePhotoSession, handlePhotoSessionPhoto } from './handlers/photoSession';
import { handleProfile, handleProfileHistory } from './handlers/profile';
import { handleSupport, handleSupportFAQ, handleSupportContact } from './handlers/support';
import {
  handleBuyPlan,
  handlePlanSelection,
  handlePaymentCheck,
  handlePaymentCancel,
} from './handlers/buyPlan';

// Create bot instance
const bot = new Bot<MyContext>(config.botToken);

// Session middleware
bot.use(
  session({
    initial: (): SessionData => ({
      currentRoute: ROUTES.MAIN_MENU,
      tempData: {},
    }),
  })
);

// Error handling
bot.catch((err) => {
  console.error('Bot error:', err);
});

// Command handlers
bot.command('start', async (ctx) => {
  await showMainMenu(ctx);
});

bot.command('menu', async (ctx) => {
  await showMainMenu(ctx);
});

bot.command('help', async (ctx) => {
  const helpText = `🤖 *MerchantAI - Помощь*

*Основные команды:*
/start - Начать работу с ботом
/menu - Вернуться в главное меню
/help - Показать это сообщение

*Как пользоваться ботом:*

1️⃣ *Создание карточки товара*
   • Нажмите "🎨 Создать карточку"
   • Загрузите фото товара
   • Добавьте описание (опционально)
   • Получите готовую карточку!

2️⃣ *Фотосессия товара*
   • Нажмите "📸 Фотосессия товара"
   • Загрузите фото товара
   • Получите 5-10 профессиональных фото!

3️⃣ *Управление аккаунтом*
   • "👤 Мой профиль" - информация об аккаунте
   • "⭐ Купить план" - приобрести кредиты
   • "💬 Поддержка" - связаться с нами

*Вопросы?*
Напишите в поддержку или посмотрите FAQ в разделе "💬 Поддержка"`;

  await ctx.reply(helpText, { parse_mode: 'Markdown' });
});

// Callback query handlers
bot.callbackQuery(/^plan_(.+)$/, async (ctx) => {
  const planType = ctx.match[1];
  await handlePlanSelection(ctx, planType);
});

bot.callbackQuery('payment_check', handlePaymentCheck);
bot.callbackQuery('payment_cancel', handlePaymentCancel);
bot.callbackQuery('back_to_menu', async (ctx) => {
  await ctx.answerCallbackQuery();
  if (ctx.callbackQuery?.message) {
    await ctx.api.deleteMessage(ctx.chat!.id, ctx.callbackQuery.message.message_id);
  }
  await showMainMenu(ctx);
});

// Message handlers
bot.on('message:text', async (ctx) => {
  const text = ctx.message.text;

  // Handle navigation based on current route
  const navigationHandled = await handleMainMenuNavigation(ctx);
  if (navigationHandled) {
    // Route changed, handle the new route
    switch (ctx.session.currentRoute) {
      case ROUTES.IMAGE_CARD:
        await handleImageCard(ctx);
        break;
      case ROUTES.PHOTO_SESSION:
        await handlePhotoSession(ctx);
        break;
      case ROUTES.PROFILE:
        await handleProfile(ctx);
        break;
      case ROUTES.SUPPORT:
        await handleSupport(ctx);
        break;
      case ROUTES.BUY_PLAN:
        await handleBuyPlan(ctx);
        break;
    }
    return;
  }

  // Handle specific actions based on current route
  switch (ctx.session.currentRoute) {
    case ROUTES.PROFILE:
      if (text === TEXTS.PROFILE_BTN_UPGRADE) {
        ctx.session.currentRoute = ROUTES.BUY_PLAN;
        await handleBuyPlan(ctx);
      } else if (text === TEXTS.PROFILE_BTN_HISTORY) {
        await handleProfileHistory(ctx);
      }
      break;

    case ROUTES.SUPPORT:
      if (text === TEXTS.SUPPORT_BTN_FAQ) {
        await handleSupportFAQ(ctx);
      } else if (text === TEXTS.SUPPORT_BTN_CONTACT) {
        await handleSupportContact(ctx);
      }
      break;

    default:
      // Unknown command in current route
      await ctx.reply(
        'Используйте кнопки меню для навигации или отправьте /menu для возврата в главное меню.'
      );
  }
});

// Photo handlers - context-aware
bot.on('message:photo', async (ctx) => {
  switch (ctx.session.currentRoute) {
    case ROUTES.IMAGE_CARD:
      await handleImageCardPhoto(ctx);
      break;

    case ROUTES.PHOTO_SESSION:
      await handlePhotoSessionPhoto(ctx);
      break;

    default:
      await ctx.reply(
        'Для загрузки фото выберите соответствующий раздел:\n• 🎨 Создать карточку\n• 📸 Фотосессия товара'
      );
  }
});

// Handle other message types
bot.on('message', async (ctx) => {
  await ctx.reply('Пожалуйста, используйте кнопки меню для навигации.');
});

// Start bot
async function startBot() {
  console.log('🤖 Starting MerchantAI Bot...');

  // Enable graceful stop
  process.once('SIGINT', () => bot.stop());
  process.once('SIGTERM', () => bot.stop());

  // Start bot with runner for better performance
  await bot.init();
  console.log(`✅ Bot started as @${bot.botInfo.username}`);

  const runner = run(bot);

  // Handle runner errors
  // @ts-ignore
  runner.task().catch((error) => {
    console.error('Runner error:', error);
  });
}

// Handle unhandled rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
});

// Start the bot
startBot().catch((error) => {
  console.error('Failed to start bot:', error);
  process.exit(1);
});

export { bot };
```

# src/services/n8n.ts

```ts
import axios from 'axios';
import { config } from '../config';

interface ImageGenerationParams {
  photoUrl: string;
  description?: string;
  style?: string;
  userId: string;
  orderId: string;
}

interface PhotoSessionParams {
  photoUrl: string;
  description?: string;
  count?: number;
  userId: string;
  orderId: string;
}

interface N8NResponse {
  success: boolean;

  // JSON-based response (recommended path)
  images?: string[];

  // Binary-based response (when returning raw image)
  buffer?: Uint8Array;
  contentType?: string;
  filename?: string;

  // Errors / messages
  error?: string;
  message?: string;
}


class N8NService {
  private webhookUrl: string;

  constructor() {
    this.webhookUrl = config.n8n.webhookUrl;
  }



  async generateImageCard(params: ImageGenerationParams): Promise<N8NResponse> {
  try {
    const response = await axios.post(
      `${this.webhookUrl}/image-card`,
      {
        photo_url: params.photoUrl,
        description: params.description || '',
        style: params.style || 'modern',
        user_id: params.userId,
        order_id: params.orderId,
        action: 'generate_card',
      },
      {
        timeout: 120000,

        // 🔴 CRITICAL: do NOT let axios touch encoding
        responseType: 'arraybuffer',
        transformResponse: (data) => data,

        headers: {
          Accept: 'image/jpeg,image/png',
        },
      }
    );

    // response.data is now a REAL ArrayBuffer
    const uint8 = new Uint8Array(response.data);

    return {
      success: true,
      buffer: uint8,
      contentType: response.headers['content-type'],
    };
  } catch (error: any) {
    console.error('n8n image card generation error:', error.message);
    return {
      success: false,
      error: 'Ошибка генерации карточки',
    };
  }
}


  async generatePhotoSession(params: PhotoSessionParams): Promise<N8NResponse> {
    try {
      const response = await axios.post(
        `${this.webhookUrl}/photo-session`,
        {
          photo_url: params.photoUrl,
          description: params.description || '',
          count: params.count || 5,
          user_id: params.userId,
          order_id: params.orderId,
          action: 'generate_session',
        },
        {
          timeout: 180000, // 3 minutes timeout
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('n8n photo session generation error:', error.message);
      return {
        success: false,
        error: 'Ошибка генерации фотосессии',
      };
    }
  }

  async checkStatus(orderId: string): Promise<N8NResponse> {
    try {
      const response = await axios.get(`${this.webhookUrl}/status/${orderId}`, {
        timeout: 10000,
      });

      return response.data;
    } catch (error: any) {
      console.error('n8n status check error:', error.message);
      return {
        success: false,
        error: 'Ошибка проверки статуса',
      };
    }
  }
}

export const n8n = new N8NService();
```

# src/services/supabase.ts

```ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from '../config';
import { User, Order, Payment } from '../types';

class SupabaseService {
  private client: SupabaseClient;

  constructor() {
    this.client = createClient(config.supabase.url, config.supabase.serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  // User operations
  async getUser(telegramId: number): Promise<User | null> {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('telegram_id', telegramId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }

    return data;
  }

  async createUser(
    telegramId: number,
    username?: string,
    firstName?: string,
    lastName?: string
  ): Promise<User> {
    const { data, error } = await this.client
      .from('users')
      .insert({
        telegram_id: telegramId,
        username,
        first_name: firstName,
        last_name: lastName,
        plan: 'free',
        credits: 12, // Free trial credits
        cards_created: 0,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    const { data, error } = await this.client
      .from('users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateUserCredits(userId: string, creditsChange: number): Promise<User> {
    const { data: user } = await this.client.from('users').select('credits').eq('id', userId).single();

    if (!user) throw new Error('User not found');

    const newCredits = user.credits + creditsChange;
    return this.updateUser(userId, { credits: newCredits });
  }

  async incrementCardsCreated(userId: string): Promise<void> {
    await this.client.rpc('increment_cards_created', { user_id: userId });
  }

  // Order operations
  async createOrder(
    userId: string,
    type: 'image_card' | 'photo_session',
    inputData: any,
    creditsUsed: number
  ): Promise<Order> {
    const { data, error } = await this.client
      .from('orders')
      .insert({
        user_id: userId,
        type,
        status: 'pending',
        input_data: inputData,
        credits_used: creditsUsed,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateOrder(orderId: string, updates: Partial<Order>): Promise<Order> {
    const { data, error } = await this.client
      .from('orders')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getUserOrders(userId: string, limit = 10): Promise<Order[]> {
    const { data, error } = await this.client
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  // Payment operations
  async createPayment(
    userId: string,
    plan: string,
    amount: number,
    currency = 'RUB'
  ): Promise<Payment> {
    const { data, error } = await this.client
      .from('payments')
      .insert({
        user_id: userId,
        plan,
        amount,
        currency,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updatePayment(paymentId: string, updates: Partial<Payment>): Promise<Payment> {
    const { data, error } = await this.client
      .from('payments')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', paymentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getPayment(paymentId: string): Promise<Payment | null> {
    const { data, error } = await this.client.from('payments').select('*').eq('id', paymentId).single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data;
  }

  // Get or create user
  async getOrCreateUser(
    telegramId: number,
    username?: string,
    firstName?: string,
    lastName?: string
  ): Promise<User> {
    let user = await this.getUser(telegramId);
    if (!user) {
      user = await this.createUser(telegramId, username, firstName, lastName);
    }
    return user;
  }
}

export const supabase = new SupabaseService();
```

# src/services/yookassa.ts

```ts
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config';

interface CreatePaymentParams {
  amount: number;
  currency: string;
  description: string;
  returnUrl: string;
  metadata?: Record<string, any>;
}

interface PaymentResponse {
  id: string;
  status: string;
  paid: boolean;
  amount: {
    value: string;
    currency: string;
  };
  confirmation: {
    type: string;
    confirmation_url: string;
  };
  metadata?: Record<string, any>;
}

class YooKassaService {
  private baseUrl = 'https://api.yookassa.ru/v3';
  private auth: string;

  constructor() {
    this.auth = Buffer.from(`${config.yookassa.shopId}:${config.yookassa.secretKey}`).toString(
      'base64'
    );
  }

  async createPayment(params: CreatePaymentParams): Promise<PaymentResponse> {
    const idempotenceKey = uuidv4();

    try {
      const response = await axios.post(
        `${this.baseUrl}/payments`,
        {
          amount: {
            value: params.amount.toFixed(2),
            currency: params.currency,
          },
          confirmation: {
            type: 'redirect',
            return_url: params.returnUrl,
          },
          capture: true,
          description: params.description,
          metadata: params.metadata,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${this.auth}`,
            'Idempotence-Key': idempotenceKey,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('YooKassa payment creation error:', error.response?.data || error.message);
      throw new Error('Ошибка создания платежа');
    }
  }

  async getPayment(paymentId: string): Promise<PaymentResponse> {
    try {
      const response = await axios.get(`${this.baseUrl}/payments/${paymentId}`, {
        headers: {
          Authorization: `Basic ${this.auth}`,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('YooKassa get payment error:', error.response?.data || error.message);
      throw new Error('Ошибка получения информации о платеже');
    }
  }

  async cancelPayment(paymentId: string): Promise<PaymentResponse> {
    const idempotenceKey = uuidv4();

    try {
      const response = await axios.post(
        `${this.baseUrl}/payments/${paymentId}/cancel`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${this.auth}`,
            'Idempotence-Key': idempotenceKey,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('YooKassa cancel payment error:', error.response?.data || error.message);
      throw new Error('Ошибка отмены платежа');
    }
  }

  isPaymentSucceeded(payment: PaymentResponse): boolean {
    return payment.status === 'succeeded' && payment.paid;
  }

  isPaymentPending(payment: PaymentResponse): boolean {
    return payment.status === 'pending';
  }

  isPaymentCanceled(payment: PaymentResponse): boolean {
    return payment.status === 'canceled';
  }
}

export const yookassa = new YooKassaService();
```

# src/types.ts

```ts
import { Context, SessionFlavor } from 'grammy';

export interface User {
  id: string;
  telegram_id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  plan: 'free' | 'starter' | 'pro' | 'business';
  credits: number;
  cards_created: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  type: 'image_card' | 'photo_session';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  input_data: any;
  output_data?: any;
  credits_used: number;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  plan: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'cancelled';
  yookassa_payment_id?: string;
  created_at: string;
  updated_at: string;
}

export interface SessionData {
  currentRoute?: string;
  tempData?: any;
  lastMessageId?: number;
  processingMessageId?: number;
}

export type MyContext = Context & SessionFlavor<SessionData>;

export interface PlanDetails {
  name: string;
  credits: number;
  price: number;
  features: string[];
}

export const PLANS: Record<string, PlanDetails> = {
  starter: {
    name: 'Стартовый',
    credits: 50,
    price: 490,
    features: ['50 кредитов', 'Базовая поддержка'],
  },
  pro: {
    name: 'Профессиональный',
    credits: 200,
    price: 1490,
    features: ['200 кредитов', 'Приоритетная поддержка', 'Расширенные стили'],
  },
  business: {
    name: 'Бизнес',
    credits: 500,
    price: 2890,
    features: ['500 кредитов', 'Приоритетная поддержка', 'API доступ', 'Белый лейбл'],
  },
};

export const ROUTES = {
  MAIN_MENU: 'main_menu',
  IMAGE_CARD: 'image_card',
  PHOTO_SESSION: 'photo_session',
  PROFILE: 'profile',
  SUPPORT: 'support',
  BUY_PLAN: 'buy_plan',
} as const;

export type RouteType = (typeof ROUTES)[keyof typeof ROUTES];
```

# src/utils/helpers.ts

```ts
import { MyContext } from '../types';

export class MessageManager {
  /**
   * Delete a message safely (catches errors if message doesn't exist)
   */
  static async deleteMessage(ctx: MyContext, messageId: number): Promise<void> {
    try {
      await ctx.api.deleteMessage(ctx.chat!.id, messageId);
    } catch (error) {
      // Ignore errors (message might be already deleted)
    }
  }

  /**
   * Delete multiple messages
   */
  static async deleteMessages(ctx: MyContext, messageIds: number[]): Promise<void> {
    for (const messageId of messageIds) {
      await this.deleteMessage(ctx, messageId);
    }
  }

  /**
   * Send a message and store its ID in session
   */
  static async sendAndStore(
    ctx: MyContext,
    text: string,
    extra?: any,
    storeKey = 'lastMessageId'
  ): Promise<number> {
    const message = await ctx.reply(text, extra);
    if (storeKey) {
      (ctx.session as any)[storeKey] = message.message_id;
    }
    return message.message_id;
  }

  /**
   * Update a message and store the new ID
   */
  static async editOrSend(
    ctx: MyContext,
    text: string,
    messageId?: number,
    extra?: any
  ): Promise<number> {
    // Try to delete old message
    if (messageId) {
      await this.deleteMessage(ctx, messageId);
    }

    // Send new message
    const message = await ctx.reply(text, extra);
    return message.message_id;
  }

  /**
   * Send a processing message that will be updated/deleted later
   */
  static async sendProcessing(ctx: MyContext, text: string): Promise<number> {
    const message = await ctx.reply(text);
    ctx.session.processingMessageId = message.message_id;
    return message.message_id;
  }

  /**
   * Delete the processing message
   */
  static async deleteProcessing(ctx: MyContext): Promise<void> {
    if (ctx.session.processingMessageId) {
      await this.deleteMessage(ctx, ctx.session.processingMessageId);
      ctx.session.processingMessageId = undefined;
    }
  }

  /**
   * Clean up old messages from session
   */
  static async cleanup(ctx: MyContext): Promise<void> {
    await this.deleteProcessing(ctx);
    if (ctx.session.lastMessageId) {
      await this.deleteMessage(ctx, ctx.session.lastMessageId);
      ctx.session.lastMessageId = undefined;
    }
  }
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString('ru-RU');
};

export const escapeMarkdown = (text: string): string => {
  return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
};
```

# src/utils/keyboards.ts

```ts
import { Keyboard, InlineKeyboard } from 'grammy';
import { TEXTS, KEYBOARD_LAYOUTS } from '../constants/texts';

export class KeyboardBuilder {
  static mainMenu(): Keyboard {
    const keyboard = new Keyboard();
    KEYBOARD_LAYOUTS.MAIN_MENU.forEach((row) => {
      keyboard.row();
      row.forEach((button) => {
        keyboard.text(button);
      });
    });
    return keyboard.resized().persistent();
  }
  

  static backToMenu(): Keyboard {
    const keyboard = new Keyboard();
    KEYBOARD_LAYOUTS.BACK_TO_MENU.forEach((row) => {
      keyboard.row();
      row.forEach((button) => {
        keyboard.text(button);
      });
    });
    return keyboard.resized().persistent();
  }


  static cancelAndBack(): InlineKeyboard {
    return new InlineKeyboard()
      .text(TEXTS.BTN_BACK, 'back_to_menu');
  }

  static profileActions(): Keyboard {
    const keyboard = new Keyboard();
    KEYBOARD_LAYOUTS.PROFILE_ACTIONS.forEach((row) => {
      keyboard.row();
      row.forEach((button) => {
        keyboard.text(button);
      });
    });
    return keyboard.resized().persistent();
  }

  static supportActions(): Keyboard {
    const keyboard = new Keyboard();
    KEYBOARD_LAYOUTS.SUPPORT_ACTIONS.forEach((row) => {
      keyboard.row();
      row.forEach((button) => {
        keyboard.text(button);
      });
    });
    return keyboard.resized().persistent();
  }

  static planSelection(): InlineKeyboard {
    return new InlineKeyboard()
      .text('💚 Стартовый - 490₽', 'plan_starter')
      .row()
      .text('💙 Профессиональный - 1490₽', 'plan_pro')
      .row()
      .text('💜 Бизнес - 2990₽', 'plan_business')
      .row()
      .text(TEXTS.BTN_BACK, 'back_to_menu');
  }

  static paymentConfirm(paymentUrl: string): InlineKeyboard {
    return new InlineKeyboard()
      .url('💳 Оплатить', paymentUrl)
      .row()
      .text('✅ Я оплатил', 'payment_check')
      .row()
      .text(TEXTS.BTN_CANCEL, 'payment_cancel');
  }

  static remove(): { remove_keyboard: boolean } {
    return { remove_keyboard: true };
  }
}
```

# tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "removeComments": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*", "src/types.ts"],
  "exclude": ["node_modules", "dist"]
}
```

