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






 See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
./admin/node_modules
./admin/.pnp
./admin.pnp.js

# testing
./admin/coverage

# next.js
./admin/.next/
./admin.next
./admin/out/

# production
./admin/build

# misc
./admin/.DS_Store
./admin/*.pem

# debug
./admin/npm-debug.log*
./admin/yarn-debug.log*
./admin/yarn-error.log*
./admin/pnpm-debug.log*

# local env files
./admin/.env*.local
./admin/.env

# vercel
./admin/.vercel

# typescript
./admin/*.tsbuildinfo
./admin/next-env.d.ts
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
  "name": "merchantai-bot",
  "version": "1.0.0",
  "description": "MerchantAI Telegram bot for marketplace card generation",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "tsx watch src/index.ts",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@google/genai": "^1.34.0",
    "@grammyjs/runner": "^2.0.3",
    "@supabase/supabase-js": "^2.39.0",
    "axios": "^1.6.2",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "grammy": "^1.19.2",
    "openai": "^4.24.0",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.4",
    "@types/uuid": "^9.0.7",
    "tsx": "^4.6.2",
    "typescript": "^5.3.3"
  },
  "engines": {
    "node": ">=18.0.0"
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
  notificationBotToken: string;
  notificationChatIds: number[];
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
  openai: {
    apiKey: string;
    model: string;
  };
  gemini: {
    apiKey: string;
    model: string;
  };
  media: {
    introVideoFileId: string | null;
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

const getOptionalEnvVar = (key: string, defaultValue = ''): string => {
  return process.env[key] || defaultValue;
};

export const config: Config = {
  botToken: getEnvVar('BOT_TOKEN'),
  notificationBotToken: getOptionalEnvVar('NOTIFICATION_BOT_TOKEN'),
  notificationChatIds: process.env.NOTIFICATION_CHAT_IDS?.split(',').map(Number).filter(Boolean) || [],
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
    webhookUrl: getOptionalEnvVar('N8N_WEBHOOK_URL'),
  },
  openai: {
    apiKey: getEnvVar('OPENAI_API_KEY'),
    model: getOptionalEnvVar('OPENAI_MODEL', 'gpt-4o'),
  },
  gemini: {
    apiKey: getEnvVar('GEMINI_API_KEY'),
    model: getOptionalEnvVar('GEMINI_MODEL', 'gemini-2.0-flash-exp-image-generation'),
  },
  media: {
    introVideoFileId: getOptionalEnvVar('INTRO_VIDEO_FILE_ID') || null,
  },
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
};
```

# src/constants/prompts.ts

```ts
// Prompt templates for AI services
// These can be overridden from database via admin panel

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  template: string;
  variables: string[];
  category: 'card_generation' | 'image_edit' | 'photo_session' | 'other';
  isSystem: boolean;
}

// ============================================
// CARD GENERATION PROMPTS
// ============================================

export const FIRST_SLIDE_SYSTEM_PROMPT = `You're a professional prompt writer for Gemini image generation.

Your task is to create a prompt for generating a premium e-commerce marketplace card/infographic.

You receive:
1. A user request describing what they want
2. Multiple input images with user's notes explaining how each should be used

OUTPUT RULES:
1. Write ONLY the prompt text for image generation
2. Prompt in ENGLISH, but any text on the card should be in RUSSIAN
3. Reference images by number: "From IMAGE 1...", "Use IMAGE 2 as..."
4. Be extremely detailed about composition, lighting, layout
5. Follow user's instructions for each image precisely

PROMPT STRUCTURE:
Ultra-high quality commercial product card/infographic.

IMAGE USAGE:
[describe how each image should be used based on user notes]

COMPOSITION & LAYOUT:
[detailed description]

BACKGROUND & ENVIRONMENT:
[based on user instructions]

TYPOGRAPHY (RUSSIAN text if needed):
[headlines, badges, callouts]

LIGHTING & ATMOSPHERE:
[detailed description]

QUALITY:
- Ultra-high resolution, photorealistic
- Premium commercial aesthetic

NEGATIVE PROMPT:
[unwanted elements]`;

export const NEXT_SLIDE_SYSTEM_PROMPT = `You're creating a CAROUSEL SLIDE (NOT the first slide).

CRITICAL REQUIREMENTS:
1. Must look like same carousel as slide 1
2. EXACT same visual style, colors, typography, design language
3. Only CONTENT changes based on user request

OUTPUT: Write ONLY the prompt text.
English prompt, Russian text on card if needed.
Emphasize style consistency.

PROMPT STRUCTURE:
Carousel slide - MATCH SLIDE 1 STYLE EXACTLY.

STYLE CONSISTENCY:
- Same colors, typography, badges as slide 1
- Same lighting mood, aesthetic

IMAGE USAGE:
[how each image is used based on user notes]

THIS SLIDE SHOWS:
[user's request]

COMPOSITION:
[layout for this slide]

NEGATIVE PROMPT:
[unwanted, style inconsistencies]`;

export const FIRST_SLIDE_USER_PROMPT = `USER REQUEST:
{{userPrompt}}

INPUT IMAGES ({{imageCount}} total):
{{imageContext}}

Generate a professional e-commerce marketplace card using these images according to user's notes.`;

export const NEXT_SLIDE_USER_PROMPT = `CAROUSEL SLIDE {{slideNumber}} - MUST MATCH SLIDE 1 STYLE

USER REQUEST:
{{userPrompt}}

INPUT IMAGES ({{imageCount}} total):
{{imageContext}}
{{styleReference}}
{{previousSlides}}

Maintain EXACT visual consistency with slide 1.`;

// ============================================
// IMAGE EDIT PROMPTS
// ============================================

export const IMAGE_EDIT_SYSTEM_PROMPT = `You're a professional image editor.

Modify the provided image according to user instructions.

RULES:
1. Preserve the main subject unless asked to change
2. Make changes look natural and seamless
3. Maintain image quality
4. Follow user instructions precisely

OUTPUT: Write a detailed prompt describing exactly what changes to make.`;

export const IMAGE_EDIT_USER_PROMPT = `IMAGE: Attached

USER REQUEST:
{{userPrompt}}

Describe the modifications to make.`;

// ============================================
// CARD EDIT PROMPTS (for editing generated cards)
// ============================================

const CARD_EDIT_SYSTEM_PROMPT = `You're editing an existing e-commerce product card.

You receive:
1. IMAGE 1: Original product photo (DO NOT change the product itself)
2. IMAGE 2: Current generated card that needs editing
3. User's edit request

CRITICAL RULES:
1. Keep the PRODUCT exactly as it appears - never modify the product
2. Apply user's requested changes to the CARD design
3. Maintain overall card quality and style
4. If user asks to change text, colors, layout - do that while keeping product intact

OUTPUT: Write a detailed prompt for image generation that edits the card according to user request.

PROMPT STRUCTURE:
Edit the product card (IMAGE 2) while keeping the product from IMAGE 1 unchanged.

CHANGES TO MAKE:
[user's requested changes]

PRESERVE:
- The product appearance from IMAGE 1
- Overall commercial quality

MODIFY:
[specific elements to change based on user request]`;

export const CARD_EDIT_USER_PROMPT = `EDIT REQUEST:
{{userPrompt}}

INPUT IMAGES:
IMAGE 1: Original product photo - KEEP PRODUCT UNCHANGED
IMAGE 2: Current card to edit - APPLY CHANGES HERE

Edit the card according to user's request while preserving the product.`;

// Also export for use in services
export { CARD_EDIT_SYSTEM_PROMPT, CARD_EDIT_USER_PROMPT as CARD_EDIT_USER };

// ============================================
// DEFAULT TEMPLATES (for database seeding)
// ============================================

export const DEFAULT_PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'first_slide_system',
    name: 'First Slide - System Prompt',
    description: 'System prompt for generating the first slide',
    template: FIRST_SLIDE_SYSTEM_PROMPT,
    variables: [],
    category: 'card_generation',
    isSystem: true,
  },
  {
    id: 'first_slide_user',
    name: 'First Slide - User Prompt',
    description: 'User prompt template for the first slide',
    template: FIRST_SLIDE_USER_PROMPT,
    variables: ['userPrompt', 'imageCount', 'imageContext'],
    category: 'card_generation',
    isSystem: false,
  },
  {
    id: 'next_slide_system',
    name: 'Next Slide - System Prompt',
    description: 'System prompt for carousel slides 2+',
    template: NEXT_SLIDE_SYSTEM_PROMPT,
    variables: [],
    category: 'card_generation',
    isSystem: true,
  },
  {
    id: 'next_slide_user',
    name: 'Next Slide - User Prompt',
    description: 'User prompt template for slides 2+',
    template: NEXT_SLIDE_USER_PROMPT,
    variables: ['slideNumber', 'userPrompt', 'imageCount', 'imageContext', 'styleReference', 'previousSlides'],
    category: 'card_generation',
    isSystem: false,
  },
  {
    id: 'card_edit_system',
    name: 'Card Edit - System Prompt',
    description: 'System prompt for editing generated cards',
    template: CARD_EDIT_SYSTEM_PROMPT,
    variables: [],
    category: 'image_edit',
    isSystem: true,
  },
  {
    id: 'card_edit_user',
    name: 'Card Edit - User Prompt',
    description: 'User prompt template for card editing',
    template: CARD_EDIT_USER_PROMPT,
    variables: ['userPrompt'],
    category: 'image_edit',
    isSystem: false,
  },
  {
    id: 'image_edit_system',
    name: 'Image Edit - System Prompt',
    description: 'System prompt for general image editing',
    template: IMAGE_EDIT_SYSTEM_PROMPT,
    variables: [],
    category: 'image_edit',
    isSystem: true,
  },
  {
    id: 'image_edit_user',
    name: 'Image Edit - User Prompt',
    description: 'User prompt template for general image editing',
    template: IMAGE_EDIT_USER_PROMPT,
    variables: ['userPrompt'],
    category: 'image_edit',
    isSystem: false,
  },
];

// ============================================
// TEMPLATE RENDERING
// ============================================

/**
 * Render a template with variables
 */
export function renderTemplate(template: string, variables: Record<string, string | number>): string {
  let result = template;
  
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, String(value));
  }
  
  return result;
}

/**
 * Build image context from user descriptions ONLY
 * No fixed role descriptions - just what user provided as captions
 */
export function buildImageContext(images: Array<{ description?: string }>): string {
  let context = '';
  
  images.forEach((img, idx) => {
    context += `IMAGE ${idx + 1}`;
    if (img.description) {
      context += `: ${img.description}`;
    }
    context += '\n';
  });
  
  return context;
}
```

# src/constants/texts.ts

```ts
// Custom Emoji IDs - Get these by sending custom emoji to @RawDataBot in Telegram
// Replace with your own emoji IDs
export const CUSTOM_EMOJI = {
  SUCCESS: '5368324170671202286', // Example: green checkmark
  FIRE: '5368324170671202286',    // Example: fire emoji
  SPARKLES: '5368324170671202286', // Example: sparkles
  GIFT: '5368324170671202286',     // Example: gift box
};

// Helper to create custom emoji tag
export const customEmoji = (id: string, fallback: string) => 
  `<tg-emoji emoji-id="${id}">${fallback}</tg-emoji>`;

export const TEXTS = {
  // Intro for new users (shown only once)
  INTRO: `👋 <b>Добро пожаловать в MerchantAI!</b>

Это ИИ-инструмент для создания продающих карточек товаров для маркетплейсов.

<b>Что умеет бот:</b>
• 🎨 Генерация инфографики с нуля
• ✏️ Редактирование готовых изображений
• 📸 AI-фотосессия товара

<b>Как начать:</b>
1. Загрузите фото товара
2. Опишите желаемый результат
3. Получите готовую карточку за 30-60 сек

🎁 <b>Вам начислено 12 бесплатных токенов</b> — это 3 генерации карточек для теста.

Рекомендуем прочитать гайд, чтобы получить максимум от сервиса 👇`,

  // Main Menu
  WELCOME: `<b>MerchantAI здесь.</b>

Сервис для дизайнеров карточек маркетплейсов, которые работают в конкурентном рынке и хотят выжать максимум из него.

Что внутри:

<blockquote>- ИИ-генерация карточек товара под маркетплейсы
- ИИ-фотосессия для товара без студий и подрядчиков
- ускорение работы над карточкой в разы
- возможность брать больше заказов без выгорания
- формат токенов: покупаешь и используешь, оплата в рублях с любых банков</blockquote>

<b>MerchantAI</b> помогает делать качественные, продающие карточки быстрее и дешевле - без поиска референсов, бесконечных правок, избегая горящих дедлайнов.

🎁 В честь праздников даем бесплатные токены новым пользователям.

Запускай и пробуй прямо сейчас <tg-emoji emoji-id="5386810955453728741">👇</tg-emoji>`,

  // Buttons
  BTN_IMAGE_CARD: '🎨 Создать карточку',
  BTN_IMAGE_EDIT: '✏️ Изменить изображение',
  BTN_PHOTO_SESSION: '📸 Фотосессия товара',
  BTN_MY_PROFILE: '👤 Мой профиль',
  BTN_SUPPORT: '💬 Поддержка',
  BTN_BUY_CREDITS: '💳 Купить кредиты',
  BTN_BACK: '◀️ Назад',
  BTN_MAIN_MENU: '🏠 Главное меню',
  BTN_CANCEL: '❌ Отменить',
  BTN_CONFIRM: '✅ Подтвердить',

  // Image Card - New Flow
  IMAGE_CARD_TITLE: '🎨 Создание карточки товара',
  IMAGE_CARD_SEND_PHOTO: `📤 Отправьте фото товара

Фото будет использовано для создания карточки.
После отправки фото вы сможете добавить описание.`,
  IMAGE_CARD_PHOTO_RECEIVED: `✅ Фото получено!

Теперь отправьте текстовое описание/промпт для карточки.

<b>Обязательно укажите:</b>
• Название продукта (пример: триммер Braun series 7)
• Общий стиль и желаемый результат

<i>Опционально можете указать пожелания:</i>
• Отправьте текста для карточки
• Опишите композицию
• Элементы дизайна
• И т.д.
`,
  IMAGE_CARD_WAIT: '⏳ Генерирую карточку...\n\nЭто займёт 30-60 секунд.',
  IMAGE_CARD_READY: '<tg-emoji emoji-id="5199610880257435665">✅</tg-emoji> Ваша карточка готова!',
  IMAGE_CARD_SESSION_OPTIONS: `Что дальше?

• Чтобы изменить эту карточку, отправьте промпт с изменениями
• Или вернитесь в главное меню`,
  IMAGE_CARD_ERROR: '❌ Произошла ошибка при создании карточки. Попробуйте ещё раз или обратитесь в поддержку.',
  IMAGE_CARD_NO_CREDITS: `⚠️ <b>Недостаточно токенов</b>

Для генерации карточки нужно 4 токена.

Выберите подходящий пакет 👇`,

  // Image Edit - New Feature
  IMAGE_EDIT_TITLE: '✏️ Редактирование изображения',
  IMAGE_EDIT_SEND_PHOTO: `📤 Отправьте изображение для редактирования

После отправки фото вы сможете описать желаемые изменения.`,
  IMAGE_EDIT_PHOTO_RECEIVED: `✅ Изображение получено!

Теперь отправьте описание того, что нужно изменить:
• Изменить фон
• Добавить элементы
• Улучшить качество
• И т.д.`,
  IMAGE_EDIT_WAIT: '⏳ Обрабатываю изменения...\n\nЭто займёт 30-60 секунд.',
  IMAGE_EDIT_READY: '✅ Изображение обработано!',
  IMAGE_EDIT_SESSION_OPTIONS: `Что дальше?

• Отправьте новый промпт для обработки
• Или вернитесь в главное меню`,
  IMAGE_EDIT_ERROR: '❌ Произошла ошибка при обработке изображения.',
  IMAGE_EDIT_NEED_PROMPT: '⚠️ Пожалуйста, опишите, что нужно изменить в изображении.',
  IMAGE_EDIT_NO_CREDITS: `⚠️ <b>Недостаточно токенов</b>

Для редактирования нужно 2 токена.

Выберите подходящий пакет 👇`,

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
💳 Кредитов: {credits}
🎨 Создано карточек: {cardsCreated}

Хотите пополнить кредиты?`,
  PROFILE_NO_PLAN: 'Бесплатный',
  PROFILE_BTN_BUY_CREDITS: '💳 Купить кредиты',
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
  SUPPORT_BTN_FAQ: '❓ FAQ',
  SUPPORT_BTN_CONTACT: '📧 Связаться',

  // Buy Credits - One-time purchases
  BUY_CREDITS_TITLE: '💳 Покупка кредитов',
  BUY_CREDITS_DESC: `Выберите пакет кредитов:

💡 1 кредит = 1 генерация карточки`,
  BUY_CREDITS_PAYMENT_WAIT: '⏳ Переходим к оплате...',
  BUY_CREDITS_PAYMENT_SUCCESS: '✅ Оплата прошла успешно! Кредиты зачислены.',
  BUY_CREDITS_PAYMENT_CANCELLED: '❌ Оплата отменена.',

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

// Inline keyboard callback data
export const CALLBACKS = {
  // Main menu
  MAIN_MENU: 'main_menu',
  CONTINUE_TO_MENU: 'continue_to_menu',
  IMAGE_CARD: 'image_card',
  IMAGE_EDIT: 'image_edit',
  PHOTO_SESSION: 'photo_session',
  PROFILE: 'profile',
  SUPPORT: 'support',
  BUY_CREDITS: 'buy_credits',

  // Image generation session
  REGENERATE: 'regenerate',
  BACK_TO_MENU: 'back_to_menu',

  // Image edit session
  EDIT_REGENERATE: 'edit_regenerate',

  // Profile
  PROFILE_BUY_CREDITS: 'profile_buy_credits',
  PROFILE_HISTORY: 'profile_history',

  // Support
  SUPPORT_FAQ: 'support_faq',
  SUPPORT_CONTACT: 'support_contact',

  // Credit packages
  BUY_STARTER: 'buy_starter',
  BUY_PRO: 'buy_pro',
  BUY_BIG: 'buy_big',
  BUY_ENTERPRISE: 'buy_enterprise',
  PRICE_EXPLAIN: 'price_explain_start',

  // Payment
  PAYMENT_CHECK: 'payment_check',
  PAYMENT_CANCEL: 'payment_cancel',

  // Carousel
  CAROUSEL_REGENERATE: 'carousel_regenerate',
  CAROUSEL_NEXT_SLIDE: 'carousel_next_slide',
  CAROUSEL_FINISH: 'carousel_finish',
  CAROUSEL_IMAGES_DONE: 'carousel_images_done',
} as const;
```

# src/handlers/buyCredits.ts

```ts
import { MyContext, CREDIT_PACKAGES } from '../types';
import { TEXTS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';
import { supabase } from '../services/supabase';
import { yookassa } from '../services/yookassa';
import { notificationBot } from '../services/notificationBot';

export async function handleBuyCredits(ctx: MyContext, editMessage = false): Promise<void> {
  await MessageManager.cleanup(ctx);

  const starter = CREDIT_PACKAGES.starter;
  const pro = CREDIT_PACKAGES.pro;
  const big = CREDIT_PACKAGES.big;


    const creditsText = `<b>Тарифы</b>

⭐ <b>${starter.name}</b> — <s>${starter.price + 300} ₽</s> <b>${starter.price} ₽</b> 
${starter.cardsCount} генераций · ~${Math.round(starter.price / starter.cardsCount)}₽ / генерация  
Базовый функционал для знакомства с ботом.
• Генерация карточек  
• Редактирование результатов   


✅ <b>${pro.name} — популярный</b> — <s>${pro.price + 400} ₽</s> <b>${pro.price} ₽</b>   
${pro.cardsCount} генераций · ~${Math.round(pro.price / pro.cardsCount)}₽ / генерация  
Для тех, кто хочет получать <b>максимум качества</b>.
• Приоритетная поддержка  
• Лучшее соотношение кол-во/цена


💎 <b>${big.name}</b> — <s>${big.price + 800} ₽</s> <b>${big.price} ₽</b>   
${big.cardsCount} генераций · ~29₽ / генерация  
• Всё то же, что в <b>${pro.name}</b>  
• На <b>17%</b> выгоднее, чем ${pro.name}  
• В <b>4 раза</b> больше генераций — для тех, кому важен объём  


<b>Enterprise</b> — от <b>10 000 ₽</b>  
Индивидуальные условия под большие объёмы.

<blockquote>
<b>Как считаются кредиты</b>  
<i>4 токена = 1 генерация</i>
</blockquote>`;


  if (editMessage && ctx.callbackQuery?.message) {
    try {
      await ctx.editMessageText(creditsText, {
        parse_mode: 'HTML',
        reply_markup: KeyboardBuilder.creditPackages(),
      });
    } catch {
      await ctx.reply(creditsText, {
        parse_mode: 'HTML',
        reply_markup: KeyboardBuilder.creditPackages(),
      });
    }
  } else {
    await ctx.reply(creditsText, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.creditPackages(),
    });
  }
}

export async function handleCreditPackageSelection(
  ctx: MyContext,
  packageId: string
): Promise<void> {
  const creditPackage = CREDIT_PACKAGES[packageId];

  if (!creditPackage) {
    await ctx.answerCallbackQuery({ text: 'Неверный пакет', show_alert: true });
    return;
  }

  await ctx.answerCallbackQuery();

  // Handle Enterprise separately - redirect to support
  if (packageId === 'enterprise') {
    if (ctx.callbackQuery?.message) {
      try {
        await ctx.api.deleteMessage(ctx.chat!.id, ctx.callbackQuery.message.message_id);
      } catch {}
    }

    const enterpriseText = `🚀 <b>ENTERPRISE тариф</b>

Индивидуальные условия для вашего бизнеса:

✅ Персональные лимиты токенов
✅ API доступ и интеграции
✅ Приоритетная поддержка
✅ Персональный менеджер
✅ Лучшие цены

💬 Для оформления напишите нам:
@leomishinbiz`;

    await ctx.reply(enterpriseText, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.backToMenu(),
    });
    return;
  }

  // Get user
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  try {
    // Delete the package selection message
    if (ctx.callbackQuery?.message) {
      await ctx.api.deleteMessage(ctx.chat!.id, ctx.callbackQuery.message.message_id);
    }

    // Send processing message
    await MessageManager.sendProcessing(ctx, TEXTS.BUY_CREDITS_PAYMENT_WAIT);

    // Create payment in database
    const payment = await supabase.createPayment(
      user.id,
      packageId,
      creditPackage.price,
      'RUB'
    );

    // Create payment with YooKassa
    const yooPayment = await yookassa.createPayment({
      amount: creditPackage.price,
      currency: 'RUB',
      description: `${creditPackage.emoji} ${creditPackage.name} — ~${creditPackage.cardsCount} карточек`,
      returnUrl: `https://t.me/${ctx.me.username}`,
      metadata: {
        payment_id: payment.id,
        user_id: user.id,
        package_id: packageId,
        credits: creditPackage.credits,
      },
    });

    // Update payment with YooKassa ID
    await supabase.updatePayment(payment.id, {
      yookassa_payment_id: yooPayment.id,
    });

    // Delete processing message
    await MessageManager.deleteProcessing(ctx);

    // Send payment link - clean design
    const paymentText = `<b>Оплата</b>

${creditPackage.name} — ${creditPackage.price} ₽
${creditPackage.credits} токенов · ${creditPackage.cardsCount} генераций

1. Нажмите «Оплатить»
2. Завершите оплату
3. Нажмите «Проверить оплату»`;

    await ctx.reply(paymentText, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.paymentConfirm(yooPayment.confirmation.confirmation_url),
    });

    // Store payment ID in session for checking
    ctx.session.tempData = {
      paymentId: payment.id,
      yooPaymentId: yooPayment.id,
      packageId: packageId,
      credits: creditPackage.credits,
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

      const creditsToAdd = paymentData.credits || 0;

      // Update payment status
      await supabase.updatePayment(paymentData.paymentId, {
        status: 'succeeded',
      });

      // Add credits to user
      await supabase.updateUserCredits(user.id, creditsToAdd);

      // Send notification about purchase
      const creditPackage = CREDIT_PACKAGES[paymentData.packageId];
      await notificationBot.notifyPurchase(
        user.id,
        ctx.from?.username,
        creditPackage?.name || paymentData.packageId,
        creditsToAdd,
        creditPackage?.price || 0,
        'RUB'
      );

      // Delete payment message
      if (ctx.callbackQuery?.message) {
        await ctx.api.deleteMessage(ctx.chat!.id, ctx.callbackQuery.message.message_id);
      }

      // Send success message
      await ctx.reply(
        `${TEXTS.BUY_CREDITS_PAYMENT_SUCCESS}

🎉 Зачислено кредитов: ${creditsToAdd}
💰 Всего кредитов: ${user.credits + creditsToAdd}`,
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

  await ctx.reply(TEXTS.BUY_CREDITS_PAYMENT_CANCELLED, {
    reply_markup: KeyboardBuilder.mainMenu(),
  });

  // Clear temp data
  ctx.session.tempData = {};
}
```

# src/handlers/carousel.ts

```ts
import { MyContext, ROUTES, CarouselSlide, ImageInput } from '../types';
import { TEXTS, CALLBACKS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';
import { supabase } from '../services/supabase';
import { cardGenerator } from '../services/cardGenerator';
import { InputFile, InlineKeyboard } from 'grammy';
import { v4 as uuidv4 } from 'uuid';

const CARD_GENERATION_COST = 4; // Credits per card
const MAX_INPUT_IMAGES = 8;

// ============================================
// CAROUSEL KEYBOARDS
// ============================================

function getCarouselSessionKeyboard(slideNumber: number): InlineKeyboard {
  const keyboard = new InlineKeyboard();
  
  if (slideNumber === 1) {
    keyboard
      .text('🔄 Регенерировать', CALLBACKS.CAROUSEL_REGENERATE)
      .row()
      .text('➡️ Следующий слайд', CALLBACKS.CAROUSEL_NEXT_SLIDE)
      .row()
      .text('✅ Завершить (1 слайд)', CALLBACKS.CAROUSEL_FINISH)
      .row()
      .text('🏠 Выход в меню', CALLBACKS.BACK_TO_MENU);
  } else {
    keyboard
      .text('🔄 Регенерировать', CALLBACKS.CAROUSEL_REGENERATE)
      .row()
      .text('➡️ Следующий слайд', CALLBACKS.CAROUSEL_NEXT_SLIDE)
      .row()
      .text(`✅ Завершить (${slideNumber} слайд${getSlideWord(slideNumber)})`, CALLBACKS.CAROUSEL_FINISH)
      .row()
      .text('🏠 Выход в меню', CALLBACKS.BACK_TO_MENU);
  }
  
  return keyboard;
}

function getImageCollectionKeyboard(imageCount: number): InlineKeyboard {
  const keyboard = new InlineKeyboard();
  
  if (imageCount > 0) {
    keyboard
      .text(`✅ Готово (${imageCount} фото)`, CALLBACKS.CAROUSEL_IMAGES_DONE)
      .row();
  }
  
  keyboard.text('🏠 Отмена', CALLBACKS.BACK_TO_MENU);
  
  return keyboard;
}

function getSlideWord(count: number): string {
  if (count === 1) return '';
  if (count >= 2 && count <= 4) return 'а';
  return 'ов';
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Start carousel generation flow
 * Entry point from main menu -> "Создать карточку"
 */
export async function handleCarouselStart(ctx: MyContext, editMessage = false): Promise<void> {
  await MessageManager.cleanup(ctx);

  // Initialize new carousel session
  ctx.session.currentRoute = ROUTES.CAROUSEL_WAITING_PHOTO;
  ctx.session.carouselSession = {
    sessionId: uuidv4(),
    inputImages: [],
    originalImageUrl: '',
    currentSlideNumber: 1,
    slides: [],
    generationCount: 0,
    isCollectingImages: true,
    collectedImagesCount: 0,
  };

  const text = `🎨 <b>Создание карточки / карусели</b>

📤 <b>Загрузите изображения</b> (до ${MAX_INPUT_IMAGES} штук):

<b>Обязательно:</b>
• 📦 Фото товара — основа для карточки

<b>Опционально:</b>
• 🎨 Референс стиля — если хотите похожий дизайн
• 🖼 Примеры инфографики — для вдохновения
• 🏷 Логотип бренда
• 🌅 Референс фона

<i>Подсказка: добавьте подпись к фото, чтобы указать его роль:
"товар", "стиль", "фон", "лого", "пример"</i>

Отправьте фото по одному или несколько сразу 👇`;

  if (editMessage && ctx.callbackQuery?.message) {
    try {
      await ctx.editMessageText(text, {
        parse_mode: 'HTML',
        reply_markup: getImageCollectionKeyboard(0),
      });
    } catch {
      await ctx.reply(text, {
        parse_mode: 'HTML',
        reply_markup: getImageCollectionKeyboard(0),
      });
    }
  } else {
    await ctx.reply(text, {
      parse_mode: 'HTML',
      reply_markup: getImageCollectionKeyboard(0),
    });
  }
}

// ============================================
// PHOTO HANDLING (MULTI-IMAGE)
// ============================================

/**
 * Handle photo upload for carousel (supports multiple images)
 */
export async function handleCarouselPhoto(ctx: MyContext): Promise<void> {
  const photo = ctx.message?.photo;
  if (!photo || photo.length === 0) {
    await ctx.reply('⚠️ Пожалуйста, отправьте фото.');
    return;
  }

  // Initialize session if needed
  if (!ctx.session.carouselSession) {
    ctx.session.carouselSession = {
      sessionId: uuidv4(),
      inputImages: [],
      originalImageUrl: '',
      currentSlideNumber: 1,
      slides: [],
      generationCount: 0,
      isCollectingImages: true,
      collectedImagesCount: 0,
    };
  }

  const session = ctx.session.carouselSession;

  // Check max images limit
  if (session.inputImages.length >= MAX_INPUT_IMAGES) {
    await ctx.reply(`⚠️ Максимум ${MAX_INPUT_IMAGES} изображений. Нажмите "Готово" чтобы продолжить.`, {
      reply_markup: getImageCollectionKeyboard(session.inputImages.length),
    });
    return;
  }

  // Get the largest photo
  const largestPhoto = photo[photo.length - 1];
  const file = await ctx.api.getFile(largestPhoto.file_id);
  const photoUrl = `https://api.telegram.org/file/bot${ctx.api.token}/${file.file_path}`;

  // Get user's caption as description
  const caption = ctx.message.caption;
  const imageIndex = session.inputImages.length;

  // Add to input images
  const imageInput: ImageInput = {
    url: photoUrl,
    fileId: largestPhoto.file_id,
    description: caption || undefined,
    index: imageIndex + 1,
  };
  session.inputImages.push(imageInput);
  session.collectedImagesCount = session.inputImages.length;

  // Set original image URL if this is the first image
  if (!session.originalImageUrl) {
    session.originalImageUrl = photoUrl;
    session.originalImageFileId = largestPhoto.file_id;
  }

  // Show confirmation with caption preview
  let confirmText = `📷 Фото ${session.inputImages.length}/${MAX_INPUT_IMAGES} добавлено`;
  if (caption) {
    confirmText += `\n📝 <i>${caption.substring(0, 50)}${caption.length > 50 ? '...' : ''}</i>`;
  }
  confirmText += `\n\nОтправьте ещё фото или нажмите "Готово"`;

  await ctx.reply(confirmText, {
    parse_mode: 'HTML',
    reply_markup: getImageCollectionKeyboard(session.inputImages.length),
  });
}

/**
 * Handle "Images Done" - proceed to prompt
 */
export async function handleCarouselImagesDone(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const session = ctx.session.carouselSession;
  
  if (!session || session.inputImages.length === 0) {
    await ctx.reply('⚠️ Сначала отправьте хотя бы одно фото товара.', {
      reply_markup: getImageCollectionKeyboard(0),
    });
    return;
  }

  // Set first image URL as original if not set
  if (!session.originalImageUrl) {
    session.originalImageUrl = session.inputImages[0].url;
    session.originalImageFileId = session.inputImages[0].fileId;
  }

  session.isCollectingImages = false;
  ctx.session.currentRoute = ROUTES.CAROUSEL_WAITING_PROMPT;

  // Build images summary from user descriptions
  const imagesSummary = session.inputImages.map((img, i) => {
    const desc = img.description 
      ? img.description.substring(0, 40) + (img.description.length > 40 ? '...' : '')
      : '(без описания)';
    return `${i + 1}. 📷 ${desc}`;
  }).join('\n');

  await ctx.reply(
    `✅ <b>Загружено ${session.inputImages.length} изображений:</b>\n\n${imagesSummary}\n\n` +
    `Теперь отправьте <b>текстовое описание/промпт</b> для карточки.\n\n` +
    `<i>Опишите что хотите получить, AI учтёт ваши подписи к фото</i>`,
    {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.backToMenu(),
    }
  );
}

// ============================================
// PROMPT HANDLING
// ============================================

/**
 * Handle text prompt for carousel
 */
export async function handleCarouselPrompt(ctx: MyContext): Promise<void> {
  const text = ctx.message?.text;
  const session = ctx.session.carouselSession;

  if (!session || session.inputImages.length === 0) {
    await ctx.reply('⚠️ Сначала отправьте фото товара.');
    return;
  }

  if (!text || !text.trim()) {
    await ctx.reply('⚠️ Пожалуйста, отправьте описание для карточки.');
    return;
  }

  session.currentPrompt = text.trim();

  // Check credits
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  if (user.credits < CARD_GENERATION_COST) {
    await ctx.reply(TEXTS.IMAGE_CARD_NO_CREDITS, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.creditPackages(),
    });
    return;
  }

  await generateCarouselSlide(ctx, user.id);
}

// ============================================
// GENERATION
// ============================================

/**
 * Generate a carousel slide with multiple input images
 * Uses OpenAI for prompt generation + Gemini for image generation
 * 
 * Two modes:
 * 1. First generation: uses ALL input images + original prompt
 * 2. Edit mode (when currentEditRequest exists): uses product + card + edit request
 */
async function generateCarouselSlide(ctx: MyContext, userId: string): Promise<void> {
  const session = ctx.session.carouselSession;
  if (!session || session.inputImages.length === 0 || !session.currentPrompt) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  // Determine if this is an edit (we have both a generated image AND an edit request)
  const isEdit = !!session.currentImageUrl && !!session.currentEditRequest;
  
  const modeText = isEdit ? '✏️ Редактирую карточку' : '🎨 Создаю карточку';
  await MessageManager.sendProcessing(ctx, `⏳ ${modeText}...\n\n🤖 GPT-4o создаёт промпт...\n🎨 Gemini генерирует изображение...\n\nЭто займёт 30-60 секунд.`);
  ctx.session.currentRoute = ROUTES.CAROUSEL_SESSION;

  try {
    // Create order
    const order = await supabase.createOrder(
      userId,
      'image_card',
      {
        images: session.inputImages.map(img => ({
          url: img.url,
          description: img.description,
        })),
        prompt: session.currentPrompt,
        edit_request: session.currentEditRequest || null,
        slide_number: session.currentSlideNumber,
        is_edit: isEdit,
        current_image_url: session.currentImageUrl || null,
        style_reference: session.styleReference?.imageUrl || null,
        previous_slides: session.slides.map(s => s.imageUrl),
      },
      CARD_GENERATION_COST
    );

    session.orderId = order.id;
    await supabase.updateOrder(order.id, { status: 'processing' });

    // Prepare images and prompt for cardGenerator
    let imagesForGenerator: Array<{ url: string; description?: string }>;
    let promptForGenerator: string;
    
    if (isEdit && session.currentImageUrl && session.currentEditRequest) {
      // EDIT MODE: Only send product photo + current generated card
      // Prompt is the EDIT REQUEST (what to change)
      imagesForGenerator = [
        {
          url: session.originalImageUrl,
          description: 'Оригинальное фото товара - сохрани товар без изменений',
        },
        {
          url: session.currentImageUrl,
          description: 'Текущая карточка - отредактируй её согласно запросу',
        },
      ];
      promptForGenerator = session.currentEditRequest;
    } else {
      // FIRST GENERATION: Use all input images + original prompt
      imagesForGenerator = session.inputImages.map((img) => ({
        url: img.url,
        description: img.description,
      }));
      promptForGenerator = session.currentPrompt;
      
      // Add previous slide as style reference for subsequent slides
      if (session.currentSlideNumber > 1 && session.styleReference) {
        imagesForGenerator.push({
          url: session.styleReference.imageUrl,
          description: `Референс стиля от слайда 1 - сохрани точно такой же стиль`,
        });
      }
    }

    // Generate card using OpenAI + Gemini
    const result = await cardGenerator.generateCard({
      images: imagesForGenerator,
      userPrompt: promptForGenerator,
      slideNumber: session.currentSlideNumber,
      isFirstSlide: session.currentSlideNumber === 1 && !isEdit,
      isEdit, // Pass edit mode flag - uses card_edit prompts
      styleReference: session.styleReference?.styleDescription,
      previousSlides: session.slides.map(s => ({
        prompt: s.prompt,
      })),
    });

    await MessageManager.deleteProcessing(ctx);

    if (result.success && result.imageBuffer) {
      // Upload to storage
      const imageUrl = await supabase.uploadImage(result.imageBuffer, userId, order.id, 'card');

      // Store current generated image
      session.currentImageUrl = imageUrl || undefined;
      session.currentImageBuffer = result.imageBuffer;
      session.generationCount++;
      
      // Clear edit request after successful generation
      session.currentEditRequest = undefined;

      // Build caption - show edit request if it was an edit
      const promptPreview = session.currentPrompt.substring(0, 100) + (session.currentPrompt.length > 100 ? '...' : '');
      
      // Send result
      const sentMessage = await ctx.replyWithPhoto(new InputFile(result.imageBuffer, `slide_${session.currentSlideNumber}.png`), {
        caption: `✅ <b>Слайд ${session.currentSlideNumber} готов!</b>\n\n` +
          `📝 ${promptPreview}\n\n` +
          `💡 <i>Отправьте текст чтобы отредактировать карточку</i>`,
        parse_mode: 'HTML',
        reply_markup: getCarouselSessionKeyboard(session.currentSlideNumber),
      });

      // Store file_id for quick access
      if (sentMessage.photo) {
        session.currentImageFileId = sentMessage.photo[sentMessage.photo.length - 1].file_id;
      }

      // Update order with generated prompt
      await supabase.updateOrder(order.id, {
        status: 'completed',
        output_data: {
          image_url: imageUrl,
          slide_number: session.currentSlideNumber,
          generated_prompt: result.generatedPrompt || null,
        },
      });

      // Deduct credits
      await supabase.updateUserCredits(userId, -CARD_GENERATION_COST);
      await supabase.incrementCardsCreated(userId);

    } else {
      await ctx.reply(
        `❌ Ошибка генерации:\n${result.error || 'Неизвестная ошибка'}\n\nПопробуйте ещё раз.`,
        {
          parse_mode: 'HTML',
          reply_markup: KeyboardBuilder.backToMenu(),
        }
      );

      await supabase.updateOrder(order.id, {
        status: 'failed',
        output_data: { 
          error: result.error || 'Unknown error',
          generated_prompt: result.generatedPrompt || null,
        },
      });
    }
  } catch (error: any) {
    console.error('Carousel generation error:', error);
    await MessageManager.deleteProcessing(ctx);
    await ctx.reply(
      `❌ Ошибка генерации:\n${error.message || 'Неизвестная ошибка'}\n\nПопробуйте ещё раз.`,
      {
        parse_mode: 'HTML',
        reply_markup: KeyboardBuilder.backToMenu(),
      }
    );
  }
}

// ============================================
// ACTIONS
// ============================================

/**
 * Regenerate current slide with same prompt
 */
export async function handleCarouselRegenerate(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const session = ctx.session.carouselSession;
  if (!session?.originalImageUrl || !session.currentPrompt) {
    await ctx.reply('⚠️ Нет данных для регенерации. Начните сначала.', {
      reply_markup: KeyboardBuilder.backToMenu(),
    });
    return;
  }

  // Check credits
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  if (user.credits < CARD_GENERATION_COST) {
    await ctx.reply(TEXTS.IMAGE_CARD_NO_CREDITS, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.creditPackages(),
    });
    return;
  }

  await generateCarouselSlide(ctx, user.id);
}

/**
 * Finalize current slide and start next
 */
export async function handleCarouselNextSlide(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const session = ctx.session.carouselSession;
  if (!session?.currentImageUrl || !session.currentPrompt) {
    await ctx.reply('⚠️ Сначала сгенерируйте слайд.', {
      reply_markup: KeyboardBuilder.backToMenu(),
    });
    return;
  }

  // Finalize current slide
  const finalizedSlide: CarouselSlide = {
    slideNumber: session.currentSlideNumber,
    imageUrl: session.currentImageUrl,
    imageFileId: session.currentImageFileId,
    prompt: session.currentPrompt,
    generatedAt: new Date().toISOString(),
  };
  session.slides.push(finalizedSlide);

  // Set style reference from first slide
  if (session.currentSlideNumber === 1) {
    session.styleReference = {
      imageUrl: session.currentImageUrl,
      styleDescription: `Style from slide 1: ${session.currentPrompt}`,
    };
  }

  // Prepare for next slide
  session.currentSlideNumber++;
  session.currentPrompt = undefined;
  session.currentImageUrl = undefined;
  session.currentImageFileId = undefined;
  session.currentImageBuffer = undefined;

  ctx.session.currentRoute = ROUTES.CAROUSEL_NEXT_SLIDE;

  // Ask for next slide prompt
  await ctx.reply(
    `✅ <b>Слайд ${session.currentSlideNumber - 1} сохранён!</b>\n\n` +
    `📝 Опишите <b>слайд ${session.currentSlideNumber}</b>:\n\n` +
    `<i>Стиль будет сохранён автоматически на основе первого слайда.</i>\n\n` +
    `Подсказка: опишите что показать на этом слайде (детали, ракурс, информация и т.д.)`,
    {
      parse_mode: 'HTML',
      reply_markup: new InlineKeyboard()
        .text(`✅ Завершить (${session.slides.length} слайд${getSlideWord(session.slides.length)})`, CALLBACKS.CAROUSEL_FINISH)
        .row()
        .text('🏠 Выход в меню', CALLBACKS.BACK_TO_MENU),
    }
  );
}

/**
 * Handle prompt for next slide (when in CAROUSEL_NEXT_SLIDE state)
 */
export async function handleCarouselNextSlidePrompt(ctx: MyContext): Promise<void> {
  const text = ctx.message?.text;
  const session = ctx.session.carouselSession;

  if (!session) {
    await ctx.reply('⚠️ Сессия не найдена. Начните сначала.', {
      reply_markup: KeyboardBuilder.backToMenu(),
    });
    return;
  }

  if (!text || !text.trim()) {
    await ctx.reply('⚠️ Пожалуйста, опишите следующий слайд.');
    return;
  }

  session.currentPrompt = text.trim();

  // Check credits
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  if (user.credits < CARD_GENERATION_COST) {
    await ctx.reply(TEXTS.IMAGE_CARD_NO_CREDITS, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.creditPackages(),
    });
    return;
  }

  await generateCarouselSlide(ctx, user.id);
}

/**
 * Finish carousel and show summary
 */
export async function handleCarouselFinish(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const session = ctx.session.carouselSession;
  if (!session) {
    await ctx.reply('⚠️ Сессия не найдена.', {
      reply_markup: KeyboardBuilder.mainMenu(),
    });
    return;
  }

  // If current slide exists but not saved, save it
  if (session.currentImageUrl && session.currentPrompt) {
    const finalizedSlide: CarouselSlide = {
      slideNumber: session.currentSlideNumber,
      imageUrl: session.currentImageUrl,
      imageFileId: session.currentImageFileId,
      prompt: session.currentPrompt,
      generatedAt: new Date().toISOString(),
    };
    session.slides.push(finalizedSlide);
  }

  const totalSlides = session.slides.length;

  if (totalSlides === 0) {
    await ctx.reply('⚠️ Нет сохранённых слайдов.', {
      reply_markup: KeyboardBuilder.mainMenu(),
    });
    return;
  }

  // Send summary
  let summaryText = `🎉 <b>Карусель готова!</b>\n\n`;
  summaryText += `📊 Всего слайдов: ${totalSlides}\n`;
  summaryText += `🎨 Генераций: ${session.generationCount}\n\n`;
  summaryText += `<b>Слайды:</b>\n`;

  session.slides.forEach((slide, index) => {
    summaryText += `${index + 1}. ${slide.prompt.substring(0, 50)}${slide.prompt.length > 50 ? '...' : ''}\n`;
  });

  await ctx.reply(summaryText, {
    parse_mode: 'HTML',
    reply_markup: KeyboardBuilder.mainMenu(),
  });

  // Clear session
  ctx.session.carouselSession = undefined;
  ctx.session.currentRoute = ROUTES.MAIN_MENU;
}

/**
 * Handle new prompt while in carousel session (edit current slide)
 * When user sends text after a card is already generated, it's an EDIT request
 */
export async function handleCarouselSessionPrompt(ctx: MyContext): Promise<void> {
  const text = ctx.message?.text;
  const session = ctx.session.carouselSession;

  if (!session?.originalImageUrl) {
    await ctx.reply('⚠️ Сессия истекла. Начните сначала.', {
      reply_markup: KeyboardBuilder.mainMenu(),
    });
    return;
  }

  if (!text || !text.trim()) {
    await ctx.reply('⚠️ Пожалуйста, отправьте описание.');
    return;
  }

  // Save edit request (what to change) - original prompt stays intact
  session.currentEditRequest = text.trim();

  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  if (user.credits < CARD_GENERATION_COST) {
    await ctx.reply(TEXTS.IMAGE_CARD_NO_CREDITS, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.creditPackages(),
    });
    return;
  }

  await generateCarouselSlide(ctx, user.id);
}
```

# src/handlers/imageCard.ts

```ts
import { MyContext, ROUTES } from '../types';
import { TEXTS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';
import { supabase } from '../services/supabase';
import { n8n } from '../services/n8n';
import { InputFile } from 'grammy';
import { v4 as uuidv4 } from 'uuid';

const IMAGE_CARD_COST = 4; // Credits per card

// Initialize image card flow - show prompt for photo
export async function handleImageCard(ctx: MyContext, editMessage = false): Promise<void> {
  await MessageManager.cleanup(ctx);

  // Initialize session with unique ID for n8n/ChatGPT memory
  ctx.session.currentRoute = ROUTES.IMAGE_CARD_WAITING_PHOTO;
  ctx.session.imageGenSession = {
    sessionId: uuidv4(),
    generationCount: 0,
  };

  const text = `${TEXTS.IMAGE_CARD_TITLE}\n\n${TEXTS.IMAGE_CARD_SEND_PHOTO}`;

  if (editMessage && ctx.callbackQuery?.message) {
    try {
      await ctx.editMessageText(text, {
        reply_markup: KeyboardBuilder.imageCardWaitingPhoto(),
      });
    } catch {
      await ctx.reply(text, {
        reply_markup: KeyboardBuilder.imageCardWaitingPhoto(),
      });
    }
  } else {
    await ctx.reply(text, {
      reply_markup: KeyboardBuilder.imageCardWaitingPhoto(),
    });
  }
}

// Handle photo upload
export async function handleImageCardPhoto(ctx: MyContext): Promise<void> {
  const photo = ctx.message?.photo;
  if (!photo || photo.length === 0) {
    await ctx.reply('Пожалуйста, отправьте фото.');
    return;
  }

  // Initialize session if not exists
  if (!ctx.session.imageGenSession) {
    ctx.session.imageGenSession = {
      sessionId: uuidv4(),
      generationCount: 0,
    };
  }

  const session = ctx.session.imageGenSession;

  // Get the largest photo
  const largestPhoto = photo[photo.length - 1];

  // Get file URL from Telegram
  const file = await ctx.api.getFile(largestPhoto.file_id);
  const photoUrl = `https://api.telegram.org/file/bot${ctx.api.token}/${file.file_path}`;

  // Store in session
  session.photoUrl = photoUrl;
  session.photoFileId = largestPhoto.file_id;

  // If there was a caption, treat it as prompt and generate
  if (ctx.message.caption && ctx.message.caption.trim()) {
    session.prompt = ctx.message.caption.trim();

    // Get user and check credits
    const user = await supabase.getUser(ctx.from!.id);
    if (!user) {
      await ctx.reply(TEXTS.ERROR_GENERAL);
      return;
    }

    if (user.credits < IMAGE_CARD_COST) {
      await ctx.reply(TEXTS.IMAGE_CARD_NO_CREDITS, {
        parse_mode: 'HTML',
        reply_markup: KeyboardBuilder.creditPackages(),
      });
      return;
    }

    await generateImageCard(ctx, user.id);
    return;
  }

  // Update route and ask for prompt
  ctx.session.currentRoute = ROUTES.IMAGE_CARD_WAITING_PROMPT;

  await ctx.reply(TEXTS.IMAGE_CARD_PHOTO_RECEIVED, {
    parse_mode: "HTML",
    reply_markup: KeyboardBuilder.imageCardPhotoReceived(),
  });
}

// Handle prompt text
export async function handleImageCardPrompt(ctx: MyContext): Promise<void> {
  const text = ctx.message?.text;

  if (!ctx.session.imageGenSession?.photoUrl) {
    await ctx.reply('Сначала отправьте фото товара.');
    return;
  }

  // Prompt is mandatory
  if (!text || !text.trim()) {
    await ctx.reply('⚠️ Пожалуйста, отправьте описание для карточки. Промпт обязателен.');
    return;
  }

  // Store prompt
  ctx.session.imageGenSession.prompt = text.trim();

  // Get user and check credits
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  if (user.credits < IMAGE_CARD_COST) {
    await ctx.reply(TEXTS.IMAGE_CARD_NO_CREDITS, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.creditPackages(),
    });
    return;
  }

  // Generate
  await generateImageCard(ctx, user.id);
}

// Handle regenerate callback (same photo, same prompt)
export async function handleRegenerate(ctx: MyContext): Promise<void> {
  if (ctx.callbackQuery) {
    await ctx.answerCallbackQuery();
  }

  const session = ctx.session.imageGenSession;

  if (!session?.photoUrl) {
    await ctx.reply('Нет фото для генерации. Начните сначала.', {
      reply_markup: KeyboardBuilder.backToMenu(),
    });
    return;
  }

  if (!session.prompt) {
    await ctx.reply('Нет промпта для генерации. Отправьте описание.', {
      reply_markup: KeyboardBuilder.backToMenu(),
    });
    return;
  }

  // Get user and check credits
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  if (user.credits < IMAGE_CARD_COST) {
    await ctx.reply(TEXTS.IMAGE_CARD_NO_CREDITS, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.creditPackages(),
    });
    return;
  }

  // Generate again
  await generateImageCard(ctx, user.id);
}

// Main generation function
async function generateImageCard(ctx: MyContext, userId: string): Promise<void> {
  const session = ctx.session.imageGenSession;
  if (!session?.photoUrl) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  // Send processing message
  await MessageManager.sendProcessing(ctx, TEXTS.IMAGE_CARD_WAIT);
  ctx.session.currentRoute = ROUTES.IMAGE_CARD_SESSION;

  try {
    // Create order
    const order = await supabase.createOrder(
      userId,
      'image_card',
      {
        photo_url: session.photoUrl,
        description: session.prompt || '',
      },
      IMAGE_CARD_COST
    );

    session.orderId = order.id;

    // Update order status
    await supabase.updateOrder(order.id, { status: 'processing' });

    // Call n8n to generate image
    const result = await n8n.generateImageCard({
      photoUrl: session.photoUrl,
      description: session.prompt || '',
      userId: userId,
      orderId: order.id,
      sessionId: session.sessionId,
    });

    // Delete processing message
    await MessageManager.deleteProcessing(ctx);

    if (result.success && result.buffer && result.buffer.length > 0) {
      // Store result in session
      const imageBuffer = Buffer.from(result.buffer);
      session.lastGeneratedImage = imageBuffer;
      session.generationCount++;

      // Upload to Supabase Storage
      const imageUrl = await supabase.uploadImage(imageBuffer, userId, order.id, 'card');

      // Send result with session options (using HTML for custom emoji support)
      await ctx.replyWithPhoto(new InputFile(result.buffer, 'card.jpg'), {
        caption: `${TEXTS.IMAGE_CARD_READY}\n\n${TEXTS.IMAGE_CARD_SESSION_OPTIONS}`,
        parse_mode: 'HTML',
        reply_markup: KeyboardBuilder.imageCardSession(),
      });

      // Update database with image URL
      await supabase.updateOrder(order.id, {
        status: 'completed',
        output_data: {
          images: result.images,
          generated_image_url: imageUrl,
        },
      });

      // Deduct credits and increment counter
      await supabase.updateUserCredits(userId, -IMAGE_CARD_COST);
      await supabase.incrementCardsCreated(userId);
    } else {
      await ctx.reply(TEXTS.IMAGE_CARD_ERROR, {
        reply_markup: KeyboardBuilder.imageCardSession(),
      });

      await supabase.updateOrder(order.id, {
        status: 'failed',
        output_data: { error: result.error || 'Unknown error' },
      });
    }
  } catch (error) {
    console.error('Image card generation error:', error);
    await MessageManager.deleteProcessing(ctx);
    await ctx.reply(TEXTS.IMAGE_CARD_ERROR, {
      reply_markup: KeyboardBuilder.backToMenu(),
    });
  }
}
```

# src/handlers/imageEdit.ts

```ts
import { MyContext, ROUTES } from '../types';
import { TEXTS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';
import { supabase } from '../services/supabase';
import { n8n } from '../services/n8n';
import { InputFile } from 'grammy';
import { v4 as uuidv4 } from 'uuid';

const IMAGE_EDIT_COST = 2; // Credits per edit (half of generation)

// Initialize image edit flow
export async function handleImageEdit(ctx: MyContext, editMessage = false): Promise<void> {
  await MessageManager.cleanup(ctx);

  // Initialize session with unique ID for n8n/ChatGPT memory
  ctx.session.currentRoute = ROUTES.IMAGE_EDIT_WAITING_PHOTO;
  ctx.session.imageEditSession = {
    sessionId: uuidv4(),
    editCount: 0,
  };

  const text = `${TEXTS.IMAGE_EDIT_TITLE}\n\n${TEXTS.IMAGE_EDIT_SEND_PHOTO}`;

  if (editMessage && ctx.callbackQuery?.message) {
    try {
      await ctx.editMessageText(text, {
        reply_markup: KeyboardBuilder.imageEditWaitingPhoto(),
      });
    } catch {
      await ctx.reply(text, {
        reply_markup: KeyboardBuilder.imageEditWaitingPhoto(),
      });
    }
  } else {
    await ctx.reply(text, {
      reply_markup: KeyboardBuilder.imageEditWaitingPhoto(),
    });
  }
}

// Handle photo upload for editing
export async function handleImageEditPhoto(ctx: MyContext): Promise<void> {
  const photo = ctx.message?.photo;
  if (!photo || photo.length === 0) {
    await ctx.reply('Пожалуйста, отправьте изображение.');
    return;
  }

  // Initialize session if not exists
  if (!ctx.session.imageEditSession) {
    ctx.session.imageEditSession = {
      sessionId: uuidv4(),
      editCount: 0,
    };
  }

  const session = ctx.session.imageEditSession;

  // Get the largest photo
  const largestPhoto = photo[photo.length - 1];

  // Get file URL from Telegram
  const file = await ctx.api.getFile(largestPhoto.file_id);
  const photoUrl = `https://api.telegram.org/file/bot${ctx.api.token}/${file.file_path}`;

  // Store in session
  session.photoUrl = photoUrl;
  session.photoFileId = largestPhoto.file_id;

  // Update route
  ctx.session.currentRoute = ROUTES.IMAGE_EDIT_WAITING_PROMPT;

  await ctx.reply(TEXTS.IMAGE_EDIT_PHOTO_RECEIVED, {
    reply_markup: KeyboardBuilder.imageEditPhotoReceived(),
  });
}

// Handle prompt text for editing
export async function handleImageEditPrompt(ctx: MyContext): Promise<void> {
  const text = ctx.message?.text;

  if (!ctx.session.imageEditSession?.photoUrl) {
    await ctx.reply('Сначала отправьте изображение для редактирования.');
    return;
  }

  if (!text || !text.trim()) {
    await ctx.reply(TEXTS.IMAGE_EDIT_NEED_PROMPT);
    return;
  }

  // Store prompt
  ctx.session.imageEditSession.prompt = text.trim();

  // Get user and check credits
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  if (user.credits < IMAGE_EDIT_COST) {
    await ctx.reply(TEXTS.IMAGE_EDIT_NO_CREDITS, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.creditPackages(),
    });
    return;
  }

  // Process edit
  await processImageEdit(ctx, user.id);
}

// Handle regenerate callback (same photo, same prompt)
export async function handleEditRegenerate(ctx: MyContext): Promise<void> {
  if (ctx.callbackQuery) {
    await ctx.answerCallbackQuery();
  }

  const session = ctx.session.imageEditSession;

  if (!session?.photoUrl || !session.prompt) {
    await ctx.reply('Нет данных для обработки. Начните сначала.', {
      reply_markup: KeyboardBuilder.backToMenu(),
    });
    return;
  }

  // Get user and check credits
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  if (user.credits < IMAGE_EDIT_COST) {
    await ctx.reply(TEXTS.IMAGE_EDIT_NO_CREDITS, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.creditPackages(),
    });
    return;
  }

  // Process again
  await processImageEdit(ctx, user.id);
}

// Main edit processing function
async function processImageEdit(ctx: MyContext, userId: string): Promise<void> {
  const session = ctx.session.imageEditSession;
  if (!session?.photoUrl || !session.prompt) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  // Send processing message
  await MessageManager.sendProcessing(ctx, TEXTS.IMAGE_EDIT_WAIT);
  ctx.session.currentRoute = ROUTES.IMAGE_EDIT_SESSION;

  try {
    // Create order
    const order = await supabase.createOrder(
      userId,
      'image_edit',
      {
        photo_url: session.photoUrl,
        description: session.prompt,
      },
      IMAGE_EDIT_COST
    );

    session.orderId = order.id;

    // Update order status
    await supabase.updateOrder(order.id, { status: 'processing' });

    // Call n8n to edit image
    const result = await n8n.editImage({
      photoUrl: session.photoUrl,
      description: session.prompt,
      userId: userId,
      orderId: order.id,
      sessionId: session.sessionId,
    });

    // Delete processing message
    await MessageManager.deleteProcessing(ctx);

    if (result.success && result.buffer && result.buffer.length > 0) {
      // Store result in session
      const imageBuffer = Buffer.from(result.buffer);
      session.lastEditedImage = imageBuffer;
      session.editCount++;

      // Upload to Supabase Storage
      const imageUrl = await supabase.uploadImage(imageBuffer, userId, order.id, 'edit');

      // Send result with session options
      await ctx.replyWithPhoto(new InputFile(result.buffer, 'edited.jpg'), {
        caption: `${TEXTS.IMAGE_EDIT_READY}\n\n${TEXTS.IMAGE_EDIT_SESSION_OPTIONS}`,
        parse_mode: 'HTML',
        reply_markup: KeyboardBuilder.imageEditSession(),
      });

      // Update database with image URL
      await supabase.updateOrder(order.id, {
        status: 'completed',
        output_data: {
          images: result.images,
          generated_image_url: imageUrl,
        },
      });

      // Deduct credits
      await supabase.updateUserCredits(userId, -IMAGE_EDIT_COST);
    } else {
      await ctx.reply(TEXTS.IMAGE_EDIT_ERROR, {
        reply_markup: KeyboardBuilder.imageEditSession(),
      });

      await supabase.updateOrder(order.id, {
        status: 'failed',
        output_data: { error: result.error || 'Unknown error' },
      });
    }
  } catch (error) {
    console.error('Image edit error:', error);
    await MessageManager.deleteProcessing(ctx);
    await ctx.reply(TEXTS.IMAGE_EDIT_ERROR, {
      reply_markup: KeyboardBuilder.backToMenu(),
    });
  }
}
```

# src/handlers/mainMenu.ts

```ts
import { MyContext, ROUTES } from '../types';
import { TEXTS, CALLBACKS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';
import { supabase } from '../services/supabase';
import { InlineKeyboard } from 'grammy';

// Parse start parameter for referral tracking
// Formats supported:
// - ref_XXXXXXXX (referral code)
// - utm_source=xxx&utm_campaign=xxx
// - Combined: ref_XXXXXXXX__utm_source=xxx
function parseStartParam(startParam: string | undefined): {
  referralCode?: string;
  utmSource?: string;
  utmCampaign?: string;
  utmMedium?: string;
  startParam?: string;
} {
  if (!startParam) return {};

  const result: {
    referralCode?: string;
    utmSource?: string;
    utmCampaign?: string;
    utmMedium?: string;
    startParam: string;
  } = { startParam };

  // Check for referral code (ref_XXXXXXXX)
  const refMatch = startParam.match(/ref_([a-zA-Z0-9]+)/);
  if (refMatch) {
    result.referralCode = refMatch[1];
  }

  // Check for UTM parameters (utm_source=xxx)
  const utmSourceMatch = startParam.match(/utm_source[=_]([a-zA-Z0-9_-]+)/);
  if (utmSourceMatch) {
    result.utmSource = utmSourceMatch[1];
  }

  const utmCampaignMatch = startParam.match(/utm_campaign[=_]([a-zA-Z0-9_-]+)/);
  if (utmCampaignMatch) {
    result.utmCampaign = utmCampaignMatch[1];
  }

  const utmMediumMatch = startParam.match(/utm_medium[=_]([a-zA-Z0-9_-]+)/);
  if (utmMediumMatch) {
    result.utmMedium = utmMediumMatch[1];
  }

  return result;
}

export async function showMainMenu(
  ctx: MyContext, 
  editMessage = false,
  startParam?: string,
  fromStart = false
): Promise<void> {
  // Ensure user exists in database with referral tracking
  if (ctx.from) {
    try {
      const referralParams = parseStartParam(startParam);
      
      await supabase.getOrCreateUser(
        ctx.from.id,
        ctx.from.username,
        ctx.from.first_name,
        ctx.from.last_name,
        referralParams
      );
    } catch (error) {
      console.error('Error creating/getting user:', error);
      // Continue anyway - user might already exist
    }
  }

  // Clean up any old messages
  await MessageManager.cleanup(ctx);

  // Reset session
  ctx.session.currentRoute = ROUTES.MAIN_MENU;
  ctx.session.tempData = {};
  ctx.session.imageGenSession = undefined;
  ctx.session.imageEditSession = undefined;

  // Show intro on /start command
  if (fromStart) {
    await showIntro(ctx);
    return;
  }

  // Send or edit welcome message with inline keyboard
  if (editMessage && ctx.callbackQuery?.message) {
    try {
      await ctx.editMessageText(TEXTS.WELCOME, {
        parse_mode: 'HTML',
        reply_markup: KeyboardBuilder.mainMenu(),
      });
    } catch (error) {
      await ctx.reply(TEXTS.WELCOME, {
        parse_mode: 'HTML',
        reply_markup: KeyboardBuilder.mainMenu(),
      });
    }
  } else {
    await ctx.reply(TEXTS.WELCOME, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.mainMenu(),
    });
  }
}

// Show introduction for new users
async function showIntro(ctx: MyContext): Promise<void> {
  const introKeyboard = new InlineKeyboard()
    .url('📖 Читать гайд', 'https://teletype.in/@merchantai/guide')
    .row()
    .text('▶️ Продолжить', CALLBACKS.CONTINUE_TO_MENU);

  // Send video with caption and buttons
  // You can use either:
  // 1. File ID (after first upload, Telegram returns file_id)
  // 2. URL to video file
  // 3. Local file path with InputFile
  
  const videoFileId = 'BAACAgIAAxkBAAICumldNa8xfF9NRtG2kpbidctyj0SOAAJyjAAC1dHoSgwwErkVQHVWOAQ'; // Replace with actual file_id
  
  await ctx.replyWithVideo(videoFileId, {
    caption: TEXTS.INTRO,
    parse_mode: 'HTML',
    reply_markup: introKeyboard,
  });
}

// Handle continue to menu from intro
export async function handleContinueToMenu(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  
  // Delete intro message
  if (ctx.callbackQuery?.message) {
    try {
      await ctx.api.deleteMessage(ctx.chat!.id, ctx.callbackQuery.message.message_id);
    } catch {}
  }

  // Show main menu
  await ctx.reply(TEXTS.WELCOME, {
    parse_mode: 'HTML',
    reply_markup: KeyboardBuilder.mainMenu(),
  });
}

export async function handleMainMenuCallback(ctx: MyContext): Promise<void> {
  const callbackData = ctx.callbackQuery?.data;

  if (!callbackData) return;

  await ctx.answerCallbackQuery();

  switch (callbackData) {
    case CALLBACKS.BACK_TO_MENU:
      await showMainMenu(ctx, true);
      break;
  }
}
```

# src/handlers/photoSession.ts

```ts
import { MyContext, ROUTES } from '../types';
import { TEXTS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';
import { supabase } from '../services/supabase';
import { n8n } from '../services/n8n';
import { InputMediaPhoto } from 'grammy/types';

const PHOTO_SESSION_COST = 2; // Credits per session

export async function handlePhotoSession(ctx: MyContext, editMessage = false): Promise<void> {
  await MessageManager.cleanup(ctx);

  ctx.session.currentRoute = ROUTES.PHOTO_SESSION;

  const sessionText = `${TEXTS.PHOTO_SESSION_TITLE}

${TEXTS.PHOTO_SESSION_DESC}

${TEXTS.PHOTO_SESSION_UPLOAD}`;

  if (editMessage && ctx.callbackQuery?.message) {
    try {
      await ctx.editMessageText(sessionText, {
        reply_markup: KeyboardBuilder.photoSessionWaiting(),
      });
    } catch {
      await ctx.reply(sessionText, {
        reply_markup: KeyboardBuilder.photoSessionWaiting(),
      });
    }
  } else {
    await ctx.reply(sessionText, {
      reply_markup: KeyboardBuilder.photoSessionWaiting(),
    });
  }
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
      reply_markup: KeyboardBuilder.creditPackages(),
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
  await MessageManager.sendProcessing(ctx, TEXTS.PHOTO_SESSION_WAIT);

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

# src/handlers/priceExplain.ts

```ts
import { MyContext } from '../types';
import { InlineKeyboard } from 'grammy';
import { CALLBACKS } from '../constants/texts';

// Price explain flow states
export const PRICE_EXPLAIN_CALLBACKS = {
  START: 'price_explain_start',
  REASON_1: 'price_reason_1',
  REASON_2: 'price_reason_2',
  REASON_3: 'price_reason_3',
  FINAL: 'price_final',
  BACK_TO_PRICING: 'back_to_pricing',
};

// Flow messages
const PRICE_MESSAGES = {
  START: `Хороший вопрос 👌

Цена — это не «за картинку».
Она формируется из 3 вещей 👇`,

  REASON_1: `1️⃣ <b>Это не одна нейросеть</b>

Мы используем связку моделей:
🔹 генерация
🔹 композиция
🔹 тексты
🔹 шрифты
🔹 пост-обработка

Каждая инфографика —
это несколько AI-проходов,
а не один запрос.`,

  REASON_2: `2️⃣ <b>У каждой инфографики есть себестоимость</b>

Каждая генерация = реальные расходы:
🔹 ChatGPT
🔹 Nano Banana PRO
🔹 инфраструктура (сервера, ИИ агенты)
🔹 хранение изображений
🔹 оплата труда разработчиков

<i>(мы берем 20–30% от стоимости генерации)</i>

Мы не продаём «воздух».
Каждая инфографика что-то стоит.`,

  REASON_3: `3️⃣ <b>Это в десятки раз дешевле и быстрее ручного подхода или дизайнеров</b>

Для сравнения:
♦️ дизайнер: 400–2000₽ за карточку
♦️ сроки: дни
♦️ правки: отдельно (+время)

Здесь:
🔹 от 29₽ за инфографику
🔹 сразу
🔹 без ограничений на варианты
🔹 дизайн на том же уровне`,

  FINAL: `<b>Если коротко:</b>

Ты платишь не за «картинку»,
а за быструю и качественную инфографику.

Мы выдаем всем новым пользователям бесплатные генерации (это стоит нам ~50₽ за пользователя), чтобы вы смогли попробовать инструмент и убедиться в качестве нашего продукта, перед тем как совершать покупку 🙂`,
};

// Keyboards for each state
const KEYBOARDS = {
  START: new InlineKeyboard()
    .text('🔍 Узнать из чего', PRICE_EXPLAIN_CALLBACKS.REASON_1)
    .row()
    .text('⬅️ Назад к тарифам', PRICE_EXPLAIN_CALLBACKS.BACK_TO_PRICING),

  REASON_1: new InlineKeyboard()
    .text('➡️ А что ещё?', PRICE_EXPLAIN_CALLBACKS.REASON_2)
    .row()
    .text('⬅️ Назад', PRICE_EXPLAIN_CALLBACKS.START),

  REASON_2: new InlineKeyboard()
    .text('➡️ Последняя причина', PRICE_EXPLAIN_CALLBACKS.REASON_3)
    .row()
    .text('🏠 Меню', CALLBACKS.BACK_TO_MENU),

  REASON_3: new InlineKeyboard()
    .text('🔥 Понял, а что в итоге?', PRICE_EXPLAIN_CALLBACKS.FINAL)
    .row()
    .text('🏠 Меню', CALLBACKS.BACK_TO_MENU),

  FINAL: new InlineKeyboard()
    .text('⭐ Выбрать пакет', PRICE_EXPLAIN_CALLBACKS.BACK_TO_PRICING)
    .row()
    .text('💬 Задать вопрос', CALLBACKS.SUPPORT),
};

// Handler functions
export async function handlePriceExplainStart(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  
  try {
    await ctx.editMessageText(PRICE_MESSAGES.START, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARDS.START,
    });
  } catch {
    await ctx.reply(PRICE_MESSAGES.START, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARDS.START,
    });
  }
}

export async function handlePriceReason1(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  
  try {
    await ctx.editMessageText(PRICE_MESSAGES.REASON_1, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARDS.REASON_1,
    });
  } catch {
    await ctx.reply(PRICE_MESSAGES.REASON_1, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARDS.REASON_1,
    });
  }
}

export async function handlePriceReason2(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  
  try {
    await ctx.editMessageText(PRICE_MESSAGES.REASON_2, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARDS.REASON_2,
    });
  } catch {
    await ctx.reply(PRICE_MESSAGES.REASON_2, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARDS.REASON_2,
    });
  }
}

export async function handlePriceReason3(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  
  try {
    await ctx.editMessageText(PRICE_MESSAGES.REASON_3, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARDS.REASON_3,
    });
  } catch {
    await ctx.reply(PRICE_MESSAGES.REASON_3, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARDS.REASON_3,
    });
  }
}

export async function handlePriceFinal(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  
  try {
    await ctx.editMessageText(PRICE_MESSAGES.FINAL, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARDS.FINAL,
    });
  } catch {
    await ctx.reply(PRICE_MESSAGES.FINAL, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARDS.FINAL,
    });
  }
}
```

# src/handlers/profile.ts

```ts
import { MyContext } from '../types';
import { TEXTS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager, formatDate } from '../utils/helpers';
import { supabase } from '../services/supabase';

export async function handleProfile(ctx: MyContext, editMessage = false): Promise<void> {
  await MessageManager.cleanup(ctx);

  try {
    // Get user from database
    const user = await supabase.getUser(ctx.from!.id);

    if (!user) {
      await ctx.reply(TEXTS.ERROR_GENERAL, {
        reply_markup: KeyboardBuilder.mainMenu(),
      });
      return;
    }

    // Get referral stats (with safe defaults)
    //const referralStats = await supabase.getReferralStats(user.id);
    
    // Build bot username for referral link
    //const botUsername = ctx.me?.username || 'MerchantAIBot';
    //const referralCode = referralStats.referralCode || user.id.substring(0, 8);
    //const referralLink = `https://t.me/${botUsername}?start=ref_${referralCode}`;

    // Format profile information
    const profileText = `<b>Профиль</b>

Имя: ${user.first_name || user.username || 'Пользователь'}
Дата регистрации: ${formatDate(user.created_at)}

<b>Баланс:</b> ${user.credits || 0} токенов
<b>Создано карточек:</b> ${user.cards_created || 0}`;

// <b>Реферальная программа</b>
// Приглашено: ${referralStats.referralsCount} чел.
// Заработано: ${referralStats.earnings} ₽

// Ваша ссылка:
// <code>${referralLink}</code>

// <i>Получайте 10% от покупок приглашённых!</i>`;

    if (editMessage && ctx.callbackQuery?.message) {
      try {
        await ctx.editMessageText(profileText, {
          parse_mode: 'HTML',
          reply_markup: KeyboardBuilder.profileActions(),
        });
      } catch {
        await ctx.reply(profileText, {
          parse_mode: 'HTML',
          reply_markup: KeyboardBuilder.profileActions(),
        });
      }
    } else {
      await ctx.reply(profileText, {
        parse_mode: 'HTML',
        reply_markup: KeyboardBuilder.profileActions(),
      });
    }
  } catch (error) {
    console.error('Profile error:', error);
    await ctx.reply(TEXTS.ERROR_GENERAL, {
      reply_markup: KeyboardBuilder.mainMenu(),
    });
  }
}

export async function handleProfileHistory(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  // Get user
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  // Get orders
  const orders = await supabase.getUserOrders(user.id, 10);

  if (orders.length === 0) {
    if (ctx.callbackQuery?.message) {
      await ctx.editMessageText(
        '<b>История заказов пуста</b>\n\nВы ещё не создавали карточки.',
        {
          parse_mode: 'HTML',
          reply_markup: KeyboardBuilder.profileActions(),
        }
      );
    }
    return;
  }

  // Format history
  let historyText = '<b>История заказов</b>\n\n';

  orders.forEach((order) => {
    const emoji =
      order.type === 'image_card' ? '🎨' : order.type === 'image_edit' ? '✏️' : '📸';
    const status =
      order.status === 'completed' ? '✅' : order.status === 'failed' ? '❌' : '⏳';
    const date = formatDate(order.created_at);
    const typeName =
      order.type === 'image_card'
        ? 'Карточка'
        : order.type === 'image_edit'
          ? 'Редактирование'
          : 'Фотосессия';

    historyText += `${emoji} ${status} ${date}\n`;
    historyText += `${typeName} · ${order.credits_used} токенов\n\n`;
  });

  if (ctx.callbackQuery?.message) {
    await ctx.editMessageText(historyText, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.profileActions(),
    });
  }
}
```

# src/handlers/support.ts

```ts
import { MyContext } from '../types';
import { TEXTS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';

export async function handleSupport(ctx: MyContext, editMessage = false): Promise<void> {
  await MessageManager.cleanup(ctx);

  const supportText = `${TEXTS.SUPPORT_TITLE}

${TEXTS.SUPPORT_DESC}

${TEXTS.SUPPORT_CONTACT}`;

  if (editMessage && ctx.callbackQuery?.message) {
    try {
      await ctx.editMessageText(supportText, {
        reply_markup: KeyboardBuilder.supportActions(),
      });
    } catch {
      await ctx.reply(supportText, {
        reply_markup: KeyboardBuilder.supportActions(),
      });
    }
  } else {
    await ctx.reply(supportText, {
      reply_markup: KeyboardBuilder.supportActions(),
    });
  }
}

export async function handleSupportFAQ(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const faqText = `❓ *Часто задаваемые вопросы*

*1. Как создать карточку товара?*
Нажмите "🎨 Создать карточку", загрузите фото товара и опционально добавьте описание. Наш ИИ создаст профессиональную карточку за 30-60 секунд.

*2. Что такое кредиты?*
Кредиты - это внутренняя валюта бота. Один кредит = одна операция с ИИ. Карточка стоит 4 кредита, фотосессия - 2 кредита, редактирование - 2 кредита.

*3. Как работает редактирование изображений?*
Нажмите "✏️ Изменить изображение", загрузите фото и опишите желаемые изменения. ИИ обработает изображение согласно вашему описанию.

*4. Можно ли вернуть деньги?*
Да, в течение 14 дней с момента покупки при условии, что вы не использовали более 10% кредитов.

*5. Какие форматы поддерживаются?*
Мы принимаем JPG, PNG, WEBP. Рекомендуемое разрешение - от 1024x1024 пикселей.

*6. Как долго хранятся результаты?*
Все созданные карточки доступны в истории заказов в течение 30 дней.

*7. Можно ли использовать коммерчески?*
Да! Все созданные изображения полностью принадлежат вам и могут использоваться для коммерческих целей.`;

  if (ctx.callbackQuery?.message) {
    await ctx.editMessageText(faqText, {
      parse_mode: 'Markdown',
      reply_markup: KeyboardBuilder.supportActions(),
    });
  }
}

export async function handleSupportContact(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const contactText = `📧 *Связаться с нами*

Если вы не нашли ответ на свой вопрос в FAQ, свяжитесь с нами:

*Telegram:* @odissey_wrk
*Время ответа:* 1-24 часа

При обращении укажите:
• Ваш Telegram ID: \`${ctx.from!.id}\`
• Описание проблемы
• Скриншоты (если есть)

Мы обязательно вам поможем! 🙂`;

  if (ctx.callbackQuery?.message) {
    await ctx.editMessageText(contactText, {
      parse_mode: 'Markdown',
      reply_markup: KeyboardBuilder.supportActions(),
    });
  }
}
```

# src/index.ts

```ts
import { Bot, session } from 'grammy';
import { run } from '@grammyjs/runner';
import { config } from './config';
import { MyContext, SessionData, ROUTES } from './types';
import { CALLBACKS } from './constants/texts';
import { KeyboardBuilder } from './utils/keyboards';

// Handlers
import { showMainMenu, handleContinueToMenu } from './handlers/mainMenu';
import {
  handleImageCard,
  handleImageCardPhoto,
  handleImageCardPrompt,
  handleRegenerate,
} from './handlers/imageCard';
import {
  handleImageEdit,
  handleImageEditPhoto,
  handleImageEditPrompt,
  handleEditRegenerate,
} from './handlers/imageEdit';
import { handlePhotoSession, handlePhotoSessionPhoto } from './handlers/photoSession';
import { handleProfile, handleProfileHistory } from './handlers/profile';
import { handleSupport, handleSupportFAQ, handleSupportContact } from './handlers/support';
import {
  handleBuyCredits,
  handleCreditPackageSelection,
  handlePaymentCheck,
  handlePaymentCancel,
} from './handlers/buyCredits';
import {
  handlePriceExplainStart,
  handlePriceReason1,
  handlePriceReason2,
  handlePriceReason3,
  handlePriceFinal,
  PRICE_EXPLAIN_CALLBACKS,
} from './handlers/priceExplain';
import {
  handleCarouselStart,
  handleCarouselPhoto,
  handleCarouselPrompt,
  handleCarouselRegenerate,
  handleCarouselNextSlide,
  handleCarouselNextSlidePrompt,
  handleCarouselFinish,
  handleCarouselSessionPrompt,
  handleCarouselImagesDone,
} from './handlers/carousel';

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
  // Extract start parameter for referral tracking
  // Format: /start ref_XXXXXXXX or /start utm_source=xxx
  const startParam = ctx.match;
  await showMainMenu(ctx, false, startParam || undefined, true);
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
   • Можете изменить промпт и сгенерировать снова

2️⃣ *Редактирование изображения*
   • Нажмите "✏️ Изменить изображение"
   • Загрузите изображение
   • Опишите желаемые изменения
   • Получите обработанное изображение!

3️⃣ *Фотосессия товара*
   • Нажмите "📸 Фотосессия товара"
   • Загрузите фото товара
   • Получите 5-10 профессиональных фото!

4️⃣ *Управление аккаунтом*
   • "👤 Мой профиль" - информация об аккаунте
   • "💳 Купить кредиты" - приобрести кредиты
   • "💬 Поддержка" - связаться с нами

*Вопросы?*
Напишите в поддержку или посмотрите FAQ в разделе "💬 Поддержка"`;

  await ctx.reply(helpText, { parse_mode: 'Markdown' });
});

// ============================================
// CALLBACK QUERY HANDLERS
// ============================================

// Main menu callbacks
bot.callbackQuery(CALLBACKS.BACK_TO_MENU, async (ctx) => {
  await ctx.answerCallbackQuery();
  await showMainMenu(ctx, true);
});

bot.callbackQuery(CALLBACKS.CONTINUE_TO_MENU, handleContinueToMenu);

// IMAGE_CARD now uses carousel flow
bot.callbackQuery(CALLBACKS.IMAGE_CARD, async (ctx) => {
  await ctx.answerCallbackQuery();
  await handleCarouselStart(ctx, true);
});

bot.callbackQuery(CALLBACKS.IMAGE_EDIT, async (ctx) => {
  await ctx.answerCallbackQuery();
  await handleImageEdit(ctx, true);
});

bot.callbackQuery(CALLBACKS.PHOTO_SESSION, async (ctx) => {
  await ctx.answerCallbackQuery();
  await handlePhotoSession(ctx, true);
});

bot.callbackQuery(CALLBACKS.PROFILE, async (ctx) => {
  await ctx.answerCallbackQuery();
  await handleProfile(ctx, true);
});

bot.callbackQuery(CALLBACKS.SUPPORT, async (ctx) => {
  await ctx.answerCallbackQuery();
  await handleSupport(ctx, true);
});

bot.callbackQuery(CALLBACKS.BUY_CREDITS, async (ctx) => {
  await ctx.answerCallbackQuery();
  await handleBuyCredits(ctx, true);
});

// Image card session callbacks
bot.callbackQuery(CALLBACKS.REGENERATE, handleRegenerate);

// Image edit session callbacks
bot.callbackQuery(CALLBACKS.EDIT_REGENERATE, handleEditRegenerate);

// Profile callbacks
bot.callbackQuery(CALLBACKS.PROFILE_BUY_CREDITS, async (ctx) => {
  await ctx.answerCallbackQuery();
  await handleBuyCredits(ctx, true);
});
bot.callbackQuery(CALLBACKS.PROFILE_HISTORY, handleProfileHistory);

// Support callbacks
bot.callbackQuery(CALLBACKS.SUPPORT_FAQ, handleSupportFAQ);
bot.callbackQuery(CALLBACKS.SUPPORT_CONTACT, handleSupportContact);

// Credit package purchase callbacks
bot.callbackQuery(CALLBACKS.BUY_STARTER, async (ctx) => {
  await handleCreditPackageSelection(ctx, 'starter');
});
bot.callbackQuery(CALLBACKS.BUY_PRO, async (ctx) => {
  await handleCreditPackageSelection(ctx, 'pro');
});
bot.callbackQuery(CALLBACKS.BUY_BIG, async (ctx) => {
  await handleCreditPackageSelection(ctx, 'big');
});
bot.callbackQuery(CALLBACKS.BUY_ENTERPRISE, async (ctx) => {
  await handleCreditPackageSelection(ctx, 'enterprise');
});

// Payment callbacks
bot.callbackQuery(CALLBACKS.PAYMENT_CHECK, handlePaymentCheck);
bot.callbackQuery(CALLBACKS.PAYMENT_CANCEL, handlePaymentCancel);

// Price explain flow callbacks
bot.callbackQuery(PRICE_EXPLAIN_CALLBACKS.START, handlePriceExplainStart);
bot.callbackQuery(PRICE_EXPLAIN_CALLBACKS.REASON_1, handlePriceReason1);
bot.callbackQuery(PRICE_EXPLAIN_CALLBACKS.REASON_2, handlePriceReason2);
bot.callbackQuery(PRICE_EXPLAIN_CALLBACKS.REASON_3, handlePriceReason3);
bot.callbackQuery(PRICE_EXPLAIN_CALLBACKS.FINAL, handlePriceFinal);
bot.callbackQuery(PRICE_EXPLAIN_CALLBACKS.BACK_TO_PRICING, async (ctx) => {
  await ctx.answerCallbackQuery();
  await handleBuyCredits(ctx, true);
});

// Carousel callbacks
bot.callbackQuery(CALLBACKS.CAROUSEL_REGENERATE, handleCarouselRegenerate);
bot.callbackQuery(CALLBACKS.CAROUSEL_NEXT_SLIDE, handleCarouselNextSlide);
bot.callbackQuery(CALLBACKS.CAROUSEL_FINISH, handleCarouselFinish);
bot.callbackQuery(CALLBACKS.CAROUSEL_IMAGES_DONE, handleCarouselImagesDone);

// ============================================
// MESSAGE HANDLERS
// ============================================

// Text message handler
bot.on('message:text', async (ctx) => {
  const route = ctx.session.currentRoute;

  // Handle prompt input based on current route
  switch (route) {
    // Carousel routes
    case ROUTES.CAROUSEL_WAITING_PROMPT:
      await handleCarouselPrompt(ctx);
      break;

    case ROUTES.CAROUSEL_SESSION:
      await handleCarouselSessionPrompt(ctx);
      break;

    case ROUTES.CAROUSEL_NEXT_SLIDE:
      await handleCarouselNextSlidePrompt(ctx);
      break;

    // Legacy image card routes (keep for backward compatibility)
    case ROUTES.IMAGE_CARD_WAITING_PROMPT:
      await handleImageCardPrompt(ctx);
      break;

    case ROUTES.IMAGE_EDIT_WAITING_PROMPT:
      await handleImageEditPrompt(ctx);
      break;

    case ROUTES.IMAGE_CARD_SESSION:
      // User sent text while in session - treat as new prompt and regenerate
      console.log('IMAGE_CARD_SESSION: received text, session:', JSON.stringify(ctx.session.imageGenSession));
      
      if (!ctx.message.text || !ctx.message.text.trim()) {
        await ctx.reply('⚠️ Пожалуйста, отправьте описание для карточки. Промпт обязателен.');
        return;
      }
      
      // Check if session exists
      if (!ctx.session.imageGenSession?.photoUrl) {
        await ctx.reply('⚠️ Сессия истекла. Пожалуйста, начните заново.', {
          reply_markup: KeyboardBuilder.mainMenu(),
        });
        return;
      }
      
      ctx.session.imageGenSession.prompt = ctx.message.text.trim();
      // handleRegenerate will check credits
      await handleRegenerate(ctx);
      break;

    case ROUTES.IMAGE_EDIT_SESSION:
      // User sent text while in edit session - treat as new prompt and regenerate
      if (!ctx.message.text || !ctx.message.text.trim()) {
        await ctx.reply('⚠️ Пожалуйста, отправьте описание изменений. Промпт обязателен.');
        return;
      }
      if (ctx.session.imageEditSession) {
        ctx.session.imageEditSession.prompt = ctx.message.text.trim();
      }
      // handleEditRegenerate will check credits
      await handleEditRegenerate(ctx);
      break;

    default:
      // Unknown state - show hint
      console.log('Text handler default case. Current route:', route, 'Session:', JSON.stringify(ctx.session));
      await ctx.reply(
        'Используйте кнопки меню для навигации или отправьте /menu для возврата в главное меню.'
      );
  }
});

// TEMPORARY: Get video file_id - remove after getting the ID
bot.on('message:video', async (ctx) => {
  const fileId = ctx.message.video.file_id;
  console.log('VIDEO FILE_ID:', fileId);
  await ctx.reply(`✅ Video file_id:\n\n<code>${fileId}</code>\n\nСкопируй и вставь в mainMenu.ts`, {
    parse_mode: 'HTML',
  });
});

// Photo handler - context-aware
bot.on('message:photo', async (ctx) => {
  const route = ctx.session.currentRoute;

  switch (route) {
    // Carousel routes
    case ROUTES.CAROUSEL_WAITING_PHOTO:
    case ROUTES.CAROUSEL_SESSION:
      await handleCarouselPhoto(ctx);
      break;

    // Legacy image card routes
    case ROUTES.IMAGE_CARD_WAITING_PHOTO:
    case ROUTES.IMAGE_CARD_SESSION:
      await handleImageCardPhoto(ctx);
      break;

    case ROUTES.IMAGE_EDIT_WAITING_PHOTO:
    case ROUTES.IMAGE_EDIT_SESSION:
      await handleImageEditPhoto(ctx);
      break;

    case ROUTES.PHOTO_SESSION:
      await handlePhotoSessionPhoto(ctx);
      break;

    default:
      await ctx.reply(
        'Для загрузки фото выберите соответствующий раздел:\n• 🎨 Создать карточку\n• ✏️ Изменить изображение\n• 📸 Фотосессия товара',
        { reply_markup: { inline_keyboard: [[{ text: '🏠 Главное меню', callback_data: CALLBACKS.BACK_TO_MENU }]] } }
      );
  }
});

// Handle other message types
bot.on('message', async (ctx) => {
  await ctx.reply('Пожалуйста, отправьте фото или используйте кнопки меню для навигации.', {
    reply_markup: { inline_keyboard: [[{ text: '🏠 Главное меню', callback_data: CALLBACKS.BACK_TO_MENU }]] },
  });
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

# src/services/cardGenerator.ts

```ts
import { openai } from './openai';
import { gemini } from './gemini';

export interface ImageInput {
  url: string;
  description?: string; // User's caption for the image
}

export interface CardGenerationParams {
  images: ImageInput[];
  userPrompt: string;
  slideNumber?: number;
  isFirstSlide?: boolean;
  isEdit?: boolean; // True when editing existing card (uses only product + current card)
  styleReference?: string;
  previousSlides?: Array<{ prompt: string }>;
}

export interface CardGenerationResult {
  success: boolean;
  imageBuffer?: Buffer;
  mimeType?: string;
  generatedPrompt?: string;
  error?: string;
}

// Aspect ratio instruction to append to all prompts
const ASPECT_RATIO = 'Output image aspect ratio: 3:4 (portrait, width:height = 3:4)';

class CardGeneratorService {
  /**
   * Generate a marketplace card/infographic
   * 
   * Modes:
   * - isEdit=true: DIRECT to Gemini (no OpenAI) - user's edit request sent as-is
   * - isFirstSlide=true: OpenAI generates prompt → Gemini generates image
   * - else: OpenAI generates prompt for next slide → Gemini generates image
   */
  async generateCard(params: CardGenerationParams): Promise<CardGenerationResult> {
    const {
      images,
      userPrompt,
      slideNumber = 1,
      isFirstSlide = true,
      isEdit = false,
      styleReference,
      previousSlides,
    } = params;

    if (images.length === 0) {
      return { success: false, error: 'At least one image is required' };
    }

    if (images.length > 8) {
      return { success: false, error: 'Maximum 8 images allowed' };
    }

    try {
      const mode = isEdit ? 'EDIT' : (isFirstSlide ? 'CREATE' : 'SLIDE');
      console.log(`\n[CardGenerator] ========== ${mode} MODE ==========`);
      console.log(`[CardGenerator] User prompt: ${userPrompt.substring(0, 100)}${userPrompt.length > 100 ? '...' : ''}`);
      console.log(`[CardGenerator] Images: ${images.length}`);
      images.forEach((img, i) => {
        console.log(`[CardGenerator]   Image ${i + 1}: ${img.description || '(no description)'}`);
      });

      let finalPrompt: string;

      if (isEdit) {
        // EDIT MODE: Skip OpenAI, send user's edit request directly to Gemini
        finalPrompt = `Edit this product card image.

IMAGE 1: Original product photo - keep the product exactly as shown, do not modify it
IMAGE 2: Current card design - apply the requested changes to this card

EDIT REQUEST: ${userPrompt}

Important: Preserve the product from IMAGE 1 unchanged. Only modify the card design according to the edit request.

${ASPECT_RATIO}`;
        
        console.log(`[CardGenerator] EDIT MODE - Skipping OpenAI, sending directly to Gemini`);
      } else {
        // CREATE/SLIDE MODE: Use OpenAI to generate optimized prompt
        console.log(`[CardGenerator] Using OpenAI to generate prompt...`);
        
        finalPrompt = await openai.generateImagePrompt({
          userPrompt,
          images: images.map(img => ({ description: img.description })),
          slideNumber,
          isFirstSlide,
          isEdit: false,
          styleReference,
          previousSlides,
        });

        // Append aspect ratio to OpenAI-generated prompt
        finalPrompt = `${finalPrompt}\n\n${ASPECT_RATIO}\n\n
        - If texts on the card aren't clear – regenerate
        - If you've repeated the same element twice – regenerate
        - If there's any problems that make card not ready to post on marketplace right now – regenerate
      `;

        console.log(`[CardGenerator] OpenAI generated prompt (${finalPrompt.length} chars)`);
      }

      // Generate image using Gemini
      console.log(`[CardGenerator] Sending to Gemini with ${images.length} input images...`);
      
      const imageUrls = images.map(img => img.url);
      const result = await gemini.generateImageFromUrls(finalPrompt, imageUrls);

      if (!result.success) {
        console.error(`[CardGenerator] Gemini failed: ${result.error}`);
        return {
          success: false,
          error: result.error,
          generatedPrompt: finalPrompt,
        };
      }

      console.log(`[CardGenerator] Image generated successfully`);

      return {
        success: true,
        imageBuffer: result.imageBuffer,
        mimeType: result.mimeType,
        generatedPrompt: finalPrompt,
      };
    } catch (error: any) {
      console.error('[CardGenerator] Error:', error.message);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Generate carousel slide with style consistency
   */
  async generateCarouselSlide(params: CardGenerationParams): Promise<CardGenerationResult> {
    return this.generateCard(params);
  }

  /**
   * Edit existing card - DIRECT to Gemini (no OpenAI)
   * Sends: product photo + current card + user's edit request
   */
  async editCard(
    productImageUrl: string,
    currentCardUrl: string,
    editRequest: string
  ): Promise<CardGenerationResult> {
    console.log(`\n[CardGenerator] ========== EDIT CARD ==========`);
    console.log(`[CardGenerator] Edit request: ${editRequest}`);
    
    const finalPrompt = `Edit this product card image.

IMAGE 1: Original product photo - keep the product exactly as shown, do not modify it
IMAGE 2: Current card design - apply the requested changes to this card

EDIT REQUEST: ${editRequest}

Important: Preserve the product from IMAGE 1 unchanged. Only modify the card design according to the edit request.

${ASPECT_RATIO}`;

    const result = await gemini.generateImageFromUrls(finalPrompt, [productImageUrl, currentCardUrl]);
    
    return {
      success: result.success,
      imageBuffer: result.imageBuffer,
      mimeType: result.mimeType,
      generatedPrompt: finalPrompt,
      error: result.error,
    };
  }

  /**
   * Simple image edit (single image + prompt) - direct Gemini call
   */
  async editImage(imageUrl: string, editPrompt: string): Promise<CardGenerationResult> {
    try {
      console.log(`[CardGenerator] Editing image...`);

      // Add aspect ratio to simple edit
      const promptWithRatio = `${editPrompt}\n\n${ASPECT_RATIO}`;
      const result = await gemini.editImage(promptWithRatio, imageUrl);

      if (!result.success) {
        return {
          success: false,
          error: result.error,
        };
      }

      return {
        success: true,
        imageBuffer: result.imageBuffer,
        mimeType: result.mimeType,
        generatedPrompt: promptWithRatio,
      };
    } catch (error: any) {
      console.error('[CardGenerator] Edit error:', error.message);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Generate with enhanced prompt (uses OpenAI for prompt, then Gemini)
   */
  async generateWithEnhancedPrompt(
    imageUrl: string,
    userPrompt: string,
    imageDescription?: string
  ): Promise<CardGenerationResult> {
    return this.generateCard({
      images: [{ url: imageUrl, description: imageDescription }],
      userPrompt,
    });
  }
}

export const cardGenerator = new CardGeneratorService();
```

# src/services/gemini.ts

```ts
import axios from 'axios';
import { config } from '../config';
import { GoogleGenAI } from "@google/genai";


export interface GeminiImageInput {
  base64: string;
  mimeType: string;
}

export interface GeminiGenerationResult {
  success: boolean;
  imageBuffer?: Buffer;
  mimeType?: string;
  error?: string;
  textResponse?: string;
}

class GeminiService {
  private apiKey: string;
  private model: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = config.gemini.apiKey;
    this.model = config.gemini.model;
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta';
  }

  /**
   * Download image from URL and convert to base64
   */
  async downloadImageAsBase64(url: string): Promise<GeminiImageInput> {
    try {
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
        timeout: 30000,
      });

      const buffer = Buffer.from(response.data);
      const base64 = buffer.toString('base64');
      
      // Detect mime type from response header, URL extension, or magic bytes
      let mimeType = this.detectMimeType(
        response.headers['content-type'],
        url,
        buffer
      );

      return { base64, mimeType };
    } catch (error: any) {
      console.error(`Failed to download image from ${url}:`, error.message);
      throw new Error(`Failed to download image: ${error.message}`);
    }
  }

  /**
   * Detect MIME type from various sources
   */
  private detectMimeType(
    contentType: string | undefined,
    url: string,
    buffer: Buffer
  ): string {
    // 1. Try content-type header (if not octet-stream)
    if (contentType && !contentType.includes('octet-stream')) {
      const mime = contentType.split(';')[0].trim();
      if (mime.startsWith('image/')) {
        return mime;
      }
    }

    // 2. Try URL extension
    const urlLower = url.toLowerCase();
    if (urlLower.includes('.jpg') || urlLower.includes('.jpeg')) {
      return 'image/jpeg';
    }
    if (urlLower.includes('.png')) {
      return 'image/png';
    }
    if (urlLower.includes('.gif')) {
      return 'image/gif';
    }
    if (urlLower.includes('.webp')) {
      return 'image/webp';
    }

    // 3. Try magic bytes
    if (buffer.length >= 4) {
      // JPEG: FF D8 FF
      if (buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) {
        return 'image/jpeg';
      }
      // PNG: 89 50 4E 47
      if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
        return 'image/png';
      }
      // GIF: 47 49 46 38
      if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x38) {
        return 'image/gif';
      }
      // WebP: 52 49 46 46 ... 57 45 42 50
      if (buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46) {
        if (buffer.length >= 12 && buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50) {
          return 'image/webp';
        }
      }
    }

    // 4. Default to JPEG (most common for photos)
    console.log(`[Gemini] Could not detect MIME type, defaulting to image/jpeg`);
    return 'image/jpeg';
  }

  /**
   * Generate image using Gemini with multiple input images
   * Supports up to 8 input images
   */
  async generateImage(
    prompt: string,
    images: GeminiImageInput[]
  ): Promise<GeminiGenerationResult> {
    if (images.length === 0) {
      return { success: false, error: 'At least one image is required' };
    }

    if (images.length > 8) {
      return { success: false, error: 'Maximum 8 images allowed' };
    }

    // Build parts array: images first, then text prompt
    const parts: any[] = [];

    // Add all images
    for (const img of images) {
      parts.push({
        inlineData: {
          mimeType: img.mimeType,
          data: img.base64,
        },
      });
    }

    // Add text prompt
    parts.push({
      text: prompt,
    });

    const requestBody = {
      contents: [
        {
          parts,
        },
      ],
      generationConfig: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    };

    try {
        const ai = new GoogleGenAI({apiKey: config.gemini.apiKey})
        // const response await ai.models.generateContent({
        //     model: "gemini-3-pro-image-preview",
        //     contents: 
        // })
      const response = await axios.post(
        `${this.baseUrl}/models/${this.model}:generateContent?key=${this.apiKey}`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 120000, // 2 minutes timeout
        }
      );

      // Extract image from response
      const candidates = response.data?.candidates;
      if (!candidates || candidates.length === 0) {
        return { success: false, error: 'No candidates in response' };
      }

      const content = candidates[0]?.content;
      if (!content?.parts) {
        return { success: false, error: 'No content parts in response' };
      }

      // Find image part
      let imageData: string | null = null;
      let imageMimeType = 'image/png';
      let textResponse = '';

      for (const part of content.parts) {
        if (part.inlineData) {
          imageData = part.inlineData.data;
          imageMimeType = part.inlineData.mimeType || 'image/png';
        }
        if (part.text) {
          textResponse += part.text;
        }
      }

      if (!imageData) {
        return { 
          success: false, 
          error: 'No image in response',
          textResponse: textResponse || undefined,
        };
      }

      const imageBuffer = Buffer.from(imageData, 'base64');

      return {
        success: true,
        imageBuffer,
        mimeType: imageMimeType,
        textResponse: textResponse || undefined,
      };
    } catch (error: any) {
      console.error('Gemini API error:', error.response?.data || error.message);
      
      // Extract error message from API response
      const apiError = error.response?.data?.error?.message || error.message;
      
      return {
        success: false,
        error: `Gemini generation failed: ${apiError}`,
      };
    }
  }

  /**
   * Generate image from URLs (convenience method)
   * Downloads all images and calls generateImage
   */
  async generateImageFromUrls(
    prompt: string,
    imageUrls: string[]
  ): Promise<GeminiGenerationResult> {
    try {
      console.log(`\n[Gemini] ========== GENERATION REQUEST ==========`);
      console.log(`[Gemini] Images: ${imageUrls.length}`);
      console.log(`[Gemini] Prompt length: ${prompt.length} chars`);
      console.log(`[Gemini] FINAL PROMPT:\n${prompt}`);
      console.log(`[Gemini] ==========================================\n`);
      
      // Download all images in parallel
      const downloadPromises = imageUrls.map(url => this.downloadImageAsBase64(url));
      const images = await Promise.all(downloadPromises);

      return this.generateImage(prompt, images);
    } catch (error: any) {
      return {
        success: false,
        error: `Failed to prepare images: ${error.message}`,
      };
    }
  }

  /**
   * Edit/transform an image with a prompt
   */
  async editImage(
    prompt: string,
    imageUrl: string
  ): Promise<GeminiGenerationResult> {
    return this.generateImageFromUrls(prompt, [imageUrl]);
  }
}

export const gemini = new GeminiService();
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
  sessionId: string;
}

interface ImageEditParams {
  photoUrl: string;
  description: string;
  userId: string;
  orderId: string;
  sessionId: string;
}

interface PhotoSessionParams {
  photoUrl: string;
  description?: string;
  count?: number;
  userId: string;
  orderId: string;
}

interface CarouselImageInput {
  url: string;
  role: 'product' | 'style_reference' | 'previous_slide' | 'inspiration' | 'background' | 'element' | 'logo' | 'other';
  description?: string;
  index: number;
}

interface CarouselSlideParams {
  // Multiple input images (up to 8)
  images: CarouselImageInput[];
  
  // Legacy: primary product image URL (for backward compatibility)
  originalImageUrl: string;
  
  // Prompt and slide info
  prompt: string;
  slideNumber: number;
  isFirstSlide: boolean;
  
  // Style reference (for slides 2+)
  styleReference?: {
    imageUrl: string;
    styleDescription: string;
  } | null;
  
  // Previous slides context
  previousSlides: Array<{
    imageUrl: string;
    prompt: string;
    style?: string;
  }>;
  
  // IDs
  userId: string;
  orderId: string;
  sessionId: string;
}

interface N8NResponse {
  success: boolean;
  images?: string[];
  buffer?: Uint8Array;
  contentType?: string;
  filename?: string;
  error?: string;
  message?: string;
  extractedStyle?: string;
}

class N8NService {
  private webhookUrl: string;

  constructor() {
    this.webhookUrl = config.n8n.webhookUrl;
  }

  async generateImageCard(params: ImageGenerationParams): Promise<N8NResponse> {
    try {
      const response = await axios.post(
        `${this.webhookUrl}/carousel-slide`,
        {
          photo_url: params.photoUrl,
          description: params.description || '',
          style: params.style || 'modern',
          user_id: params.userId,
          order_id: params.orderId,
          session_id: params.sessionId,
          action: 'generate_card',
        },
        {
          timeout: 120000,
          responseType: 'arraybuffer',
          transformResponse: (data) => data,
          headers: {
            Accept: 'image/jpeg,image/png',
          },
        }
      );

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

  async editImage(params: ImageEditParams): Promise<N8NResponse> {
    try {
      const response = await axios.post(
        `${this.webhookUrl}/image-edit`,
        {
          photo_url: params.photoUrl,
          description: params.description,
          user_id: params.userId,
          order_id: params.orderId,
          session_id: params.sessionId,
          action: 'edit_image',
        },
        {
          timeout: 120000,
          responseType: 'arraybuffer',
          transformResponse: (data) => data,
          headers: {
            Accept: 'image/jpeg,image/png',
          },
        }
      );

      const uint8 = new Uint8Array(response.data);

      return {
        success: true,
        buffer: uint8,
        contentType: response.headers['content-type'],
      };
    } catch (error: any) {
      console.error('n8n image edit error:', error.message);
      return {
        success: false,
        error: 'Ошибка редактирования изображения',
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
          timeout: 180000,
          responseType: 'arraybuffer',
          transformResponse: (data) => data,
          headers: {
            Accept: 'image/jpeg,image/png',
          },
        }
      );

      const uint8 = new Uint8Array(response.data);

      return {
        success: true,
        buffer: uint8,
        contentType: response.headers['content-type'],
      };
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

  /**
   * Generate a carousel slide with style consistency
   * Supports up to 8 input images with role attribution
   * Falls back to /carousel-slide endpoint if /carousel-slide is not available
   */
  async generateCarouselSlide(params: CarouselSlideParams): Promise<N8NResponse> {
    try {
      // Prepare images array with attribution
      const imagesPayload = params.images.map((img, idx) => ({
        url: img.url,
        role: img.role,
        description: img.description || this.getDefaultDescription(img.role),
        index: img.index || idx + 1,
      }));

      // Try carousel-specific endpoint first
      const response = await axios.post(
        `${this.webhookUrl}/carousel-slide`,
        {
          // Multiple images with attribution (up to 8)
          images: imagesPayload,
          
          // Legacy field for backward compatibility
          original_image_url: params.originalImageUrl,
          
          // Current slide info
          prompt: params.prompt,
          slide_number: params.slideNumber,
          is_first_slide: params.isFirstSlide,
          
          // Style reference (for slides 2+)
          style_reference: params.styleReference ? {
            image_url: params.styleReference.imageUrl,
            style_description: params.styleReference.styleDescription,
          } : null,
          
          // Previous slides for context
          previous_slides: params.previousSlides.map(s => ({
            image_url: s.imageUrl,
            prompt: s.prompt,
            style: s.style || null,
          })),
          
          // IDs for tracking
          user_id: params.userId,
          order_id: params.orderId,
          session_id: params.sessionId,
          
          action: 'generate_carousel_slide',
        },
        {
          timeout: 120000,
          responseType: 'arraybuffer',
          transformResponse: (data) => data,
          headers: {
            Accept: 'image/jpeg,image/png',
          },
        }
      );

      const uint8 = new Uint8Array(response.data);
      const extractedStyle = response.headers['x-extracted-style'] || undefined;

      return {
        success: true,
        buffer: uint8,
        contentType: response.headers['content-type'],
        extractedStyle,
      };
    } catch (error: any) {
      // If carousel endpoint fails, fallback to image-card endpoint
      console.log('Carousel endpoint failed, falling back to image-card:', error.message);
      
      try {
        // Build enhanced prompt with image context
        let enhancedPrompt = params.prompt;
        
        // Add image context to prompt
        if (params.images.length > 1) {
          const imageContext = params.images
            .filter(img => img.role !== 'product')
            .map(img => `[${img.role.toUpperCase()}]: ${img.description || 'reference image'}`)
            .join('\n');
          
          if (imageContext) {
            enhancedPrompt = `${params.prompt}\n\nADDITIONAL REFERENCES:\n${imageContext}`;
          }
        }
        
        if (!params.isFirstSlide && params.styleReference) {
          enhancedPrompt = `CAROUSEL SLIDE ${params.slideNumber} - MUST MATCH STYLE OF SLIDE 1\n\n` +
            `Style Reference: ${params.styleReference.styleDescription}\n\n` +
            `This slide should show: ${enhancedPrompt}\n\n` +
            `IMPORTANT: Maintain exact same visual style, colors, typography, and mood as the first slide.`;
        }
        
        const fallbackResponse = await axios.post(
          `${this.webhookUrl}/carousel-slide`,
          {
            photo_url: params.originalImageUrl,
            description: enhancedPrompt,
            style: 'carousel',
            user_id: params.userId,
            order_id: params.orderId,
            session_id: params.sessionId,
            action: 'generate_card',
          },
          {
            timeout: 120000,
            responseType: 'arraybuffer',
            transformResponse: (data) => data,
            headers: {
              Accept: 'image/jpeg,image/png',
            },
          }
        );

        const uint8 = new Uint8Array(fallbackResponse.data);

        return {
          success: true,
          buffer: uint8,
          contentType: fallbackResponse.headers['content-type'],
        };
      } catch (fallbackError: any) {
        console.error('Fallback to image-card also failed:', fallbackError.message);
        return {
          success: false,
          error: 'Ошибка генерации слайда карусели',
        };
      }
    }
  }

  /**
   * Get default description for image role
   */
  private getDefaultDescription(role: string): string {
    const descriptions: Record<string, string> = {
      product: 'Main product photo - DO NOT modify the product itself',
      style_reference: 'Style reference - match this visual style exactly',
      previous_slide: 'Previous carousel slide - maintain consistency',
      inspiration: 'Design inspiration - use as creative reference',
      background: 'Background reference - use similar background style',
      element: 'Design element - incorporate this element',
      logo: 'Brand logo - place appropriately on the card',
      other: 'Additional reference image',
    };
    return descriptions[role] || 'Reference image';
  }
}

export const n8n = new N8NService();
```

# src/services/notificationBot.ts

```ts
import { Bot } from 'grammy';
import { config } from '../config';

class NotificationBotService {
  private bot: Bot | null = null;
  private chatIds: Set<number> = new Set();

  constructor() {
    if (config.notificationBotToken) {
      this.bot = new Bot(config.notificationBotToken);
      this.setupHandlers();
      this.start();
    } else {
      console.warn('Notification bot token not set, notifications disabled');
    }
  }

  private setupHandlers() {
    if (!this.bot) return;

    // When bot is added to a group, save the chat ID
    this.bot.on('my_chat_member', async (ctx) => {
      const chat = ctx.chat;
      const newStatus = ctx.myChatMember.new_chat_member.status;

      if (newStatus === 'member' || newStatus === 'administrator') {
        this.chatIds.add(chat.id);
        console.log(`Notification bot added to chat: ${chat.id} (${chat.type})`);
        
        await ctx.reply('✅ Бот уведомлений активирован!\n\nЯ буду присылать уведомления о покупках в этот чат.');
      } else if (newStatus === 'left' || newStatus === 'kicked') {
        this.chatIds.delete(chat.id);
        console.log(`Notification bot removed from chat: ${chat.id}`);
      }
    });

    // Command to check bot status
    this.bot.command('status', async (ctx) => {
      await ctx.reply('🤖 Бот уведомлений работает!');
    });
  }

  private async start() {
    if (!this.bot) return;

    try {
      await this.bot.start({
        onStart: (botInfo) => {
          console.log(`🔔 Notification bot started: @${botInfo.username}`);
        },
      });
    } catch (error) {
      console.error('Failed to start notification bot:', error);
    }
  }

  // Send notification to all registered chats
  async notify(message: string, parseMode: 'HTML' | 'Markdown' = 'HTML'): Promise<void> {
    if (!this.bot || this.chatIds.size === 0) {
      console.log('No chats to notify or bot not initialized');
      return;
    }

    for (const chatId of this.chatIds) {
      try {
        await this.bot.api.sendMessage(chatId, message, { parse_mode: parseMode });
      } catch (error) {
        console.error(`Failed to send notification to chat ${chatId}:`, error);
        // Remove chat if we can't send to it
        this.chatIds.delete(chatId);
      }
    }
  }

  // Notify about token purchase
  async notifyPurchase(
    userId: string,
    username: string | undefined,
    packageName: string,
    credits: number,
    amount: number,
    currency: string
  ): Promise<void> {
    const message = `💰 <b>Новая покупка!</b>

👤 Пользователь: ${username ? `@${username}` : `ID: ${userId}`}
📦 Пакет: <b>${packageName}</b>
🎯 Кредиты: <b>${credits}</b>
💵 Сумма: <b>${amount} ${currency}</b>

🕐 ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`;

    await this.notify(message);
  }

  // Notify about new user registration
  async notifyNewUser(
    userId: string,
    username: string | undefined,
    firstName: string | undefined
  ): Promise<void> {
    const message = `🆕 <b>Новый пользователь!</b>

👤 ${firstName || 'Без имени'} ${username ? `(@${username})` : ''}
🆔 ID: <code>${userId}</code>

🕐 ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`;

    await this.notify(message);
  }

  // Add chat ID manually (e.g., from env or database)
  addChatId(chatId: number): void {
    this.chatIds.add(chatId);
  }

  // Get current chat IDs
  getChatIds(): number[] {
    return Array.from(this.chatIds);
  }
}

export const notificationBot = new NotificationBotService();
```

# src/services/openai.ts

```ts
import OpenAI from 'openai';
import { config } from '../config';
import { promptsService } from './prompts';

export interface ImageInput {
  description?: string; // User's caption for the image
}

export interface PromptGenerationParams {
  userPrompt: string;
  images: ImageInput[];
  slideNumber: number;
  isFirstSlide: boolean;
  isEdit?: boolean; // True when editing an existing card
  styleReference?: string;
  previousSlides?: Array<{ prompt: string }>;
}

class OpenAIService {
  private client: OpenAI;
  private model: string;

  constructor() {
    this.client = new OpenAI({
      apiKey: config.openai.apiKey,
    });
    this.model = config.openai.model;
  }

  /**
   * Generate optimized prompt for Gemini image generation
   * Uses only user-provided descriptions for images
   * 
   * Modes:
   * - isEdit=true: Uses card_edit prompts (for editing existing cards)
   * - isFirstSlide=true: Uses first_slide prompts
   * - else: Uses next_slide prompts
   */
  async generateImagePrompt(params: PromptGenerationParams): Promise<string> {
    // Build image context from user descriptions ONLY
    const imageContext = promptsService.buildImageContext(params.images);

    // Determine which prompts to use
    let systemPromptKey: string;
    let userPromptKey: string;

    if (params.isEdit) {
      // Edit mode: use card edit prompts
      systemPromptKey = 'card_edit_system';
      userPromptKey = 'card_edit_user';
    } else if (params.isFirstSlide) {
      // First generation
      systemPromptKey = 'first_slide_system';
      userPromptKey = 'first_slide_user';
    } else {
      // Subsequent slides
      systemPromptKey = 'next_slide_system';
      userPromptKey = 'next_slide_user';
    }

    // Build style reference section (for non-edit mode)
    let styleReferenceText = '';
    if (!params.isEdit && !params.isFirstSlide && params.styleReference) {
      styleReferenceText = `\nSTYLE REFERENCE FROM SLIDE 1:\n${params.styleReference}`;
    }

    // Build previous slides section (for non-edit mode)
    let previousSlidesText = '';
    if (!params.isEdit && params.previousSlides && params.previousSlides.length > 0) {
      previousSlidesText = '\nPREVIOUS SLIDES:';
      params.previousSlides.forEach((slide, idx) => {
        previousSlidesText += `\nSlide ${idx + 1}: ${slide.prompt}`;
      });
    }

    const systemPrompt = await promptsService.getTemplate(systemPromptKey);
    let userMessage = await promptsService.getTemplate(userPromptKey);
    
    // Replace variables in user template
    userMessage = userMessage
      .replace(/\{\{userPrompt\}\}/g, params.userPrompt)
      .replace(/\{\{imageCount\}\}/g, String(params.images.length))
      .replace(/\{\{imageContext\}\}/g, imageContext)
      .replace(/\{\{slideNumber\}\}/g, String(params.slideNumber))
      .replace(/\{\{styleReference\}\}/g, styleReferenceText)
      .replace(/\{\{previousSlides\}\}/g, previousSlidesText);

    try {
      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.7,
        max_completion_tokens: 2000,
      });

      const generatedPrompt = response.choices[0]?.message?.content || '';
      
      // Clean up the prompt (remove markdown code blocks if present)
      return generatedPrompt
        .replace(/\`\`\`[\s\S]*?\`\`\`/g, (match) => match.replace(/\`\`\`\w*\n?/g, '').trim())
        .trim();
    } catch (error: any) {
      console.error('OpenAI prompt generation error:', error.message);
      throw new Error(`Failed to generate prompt: ${error.message}`);
    }
  }

  /**
   * Simple completion for other use cases
   */
  async complete(prompt: string, systemPrompt?: string): Promise<string> {
    try {
      const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];
      
      if (systemPrompt) {
        messages.push({ role: 'system', content: systemPrompt });
      }
      messages.push({ role: 'user', content: prompt });

      const response = await this.client.chat.completions.create({
        model: this.model,
        messages,
        temperature: 0.7,
        max_completion_tokens: 2000,
      });

      return response.choices[0]?.message?.content || '';
    } catch (error: any) {
      console.error('OpenAI completion error:', error.message);
      throw new Error(`Failed to complete: ${error.message}`);
    }
  }
}

export const openai = new OpenAIService();
```

# src/services/prompts.ts

```ts
import { supabase } from './supabase';
import {
  FIRST_SLIDE_SYSTEM_PROMPT,
  FIRST_SLIDE_USER_PROMPT,
  NEXT_SLIDE_SYSTEM_PROMPT,
  NEXT_SLIDE_USER_PROMPT,
  IMAGE_EDIT_SYSTEM_PROMPT,
  IMAGE_EDIT_USER_PROMPT,
  CARD_EDIT_SYSTEM_PROMPT,
  CARD_EDIT_USER_PROMPT,
  buildImageContext,
  type PromptTemplate,
} from '../constants/prompts';

interface CachedPrompt {
  template: string;
  cachedAt: number;
}

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

class PromptsService {
  private cache: Map<string, CachedPrompt> = new Map();

  /**
   * Get prompt template from database or fallback to default
   */
  async getTemplate(id: string): Promise<string> {
    // Check cache first
    const cached = this.cache.get(id);
    if (cached && Date.now() - cached.cachedAt < CACHE_TTL) {
      return cached.template;
    }

    try {
      const data = await supabase.getPromptTemplate(id);

      if (data) {
        this.cache.set(id, {
          template: data.template,
          cachedAt: Date.now(),
        });
        return data.template;
      }
    } catch (e) {
      // Silently fallback to defaults
    }

    return this.getDefaultTemplate(id);
  }

  /**
   * Get default template (hardcoded fallback)
   */
  private getDefaultTemplate(id: string): string {
    const defaults: Record<string, string> = {
      first_slide_system: FIRST_SLIDE_SYSTEM_PROMPT,
      first_slide_user: FIRST_SLIDE_USER_PROMPT,
      next_slide_system: NEXT_SLIDE_SYSTEM_PROMPT,
      next_slide_user: NEXT_SLIDE_USER_PROMPT,
      image_edit_system: IMAGE_EDIT_SYSTEM_PROMPT,
      image_edit_user: IMAGE_EDIT_USER_PROMPT,
      card_edit_system: CARD_EDIT_SYSTEM_PROMPT,
      card_edit_user: CARD_EDIT_USER_PROMPT,
    };

    return defaults[id] || '';
  }

  /**
   * Get all templates (for admin panel)
   */
  async getAllTemplates(): Promise<PromptTemplate[]> {
    const data = await supabase.getAllPromptTemplates();
    return data.map(d => ({
      id: d.id,
      name: d.name,
      description: d.description,
      template: d.template,
      variables: d.variables,
      category: d.category as PromptTemplate['category'],
      isSystem: d.is_system,
    }));
  }

  /**
   * Update template (from admin panel)
   */
  async updateTemplate(id: string, template: string): Promise<boolean> {
    const success = await supabase.updatePromptTemplate(id, template);
    if (success) {
      this.cache.delete(id);
    }
    return success;
  }

  /**
   * Create new template
   */
  async createTemplate(data: {
    id: string;
    name: string;
    description?: string;
    template: string;
    variables?: string[];
    category: PromptTemplate['category'];
    isSystem?: boolean;
  }): Promise<boolean> {
    return supabase.createPromptTemplate({
      id: data.id,
      name: data.name,
      description: data.description,
      template: data.template,
      variables: data.variables,
      category: data.category,
      is_system: data.isSystem,
    });
  }

  /**
   * Delete template
   */
  async deleteTemplate(id: string): Promise<boolean> {
    const success = await supabase.deletePromptTemplate(id);
    if (success) {
      this.cache.delete(id);
    }
    return success;
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Build image context from user descriptions
   */
  buildImageContext(images: Array<{ description?: string }>): string {
    return buildImageContext(images);
  }
}

export const promptsService = new PromptsService();
```

# src/services/supabase.ts

```ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from '../config';
import { User, Order, Payment } from '../types';

interface ReferralParams {
  referralCode?: string;
  utmSource?: string;
  utmCampaign?: string;
  utmMedium?: string;
  startParam?: string;
}

class SupabaseService {
  private _client: SupabaseClient;
  private bucketName = 'generated-images';

  constructor() {
    this._client = createClient(config.supabase.url, config.supabase.serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  // Public getter for direct database access
  get client(): SupabaseClient {
    return this._client;
  }

  // Upload image to Supabase Storage
  async uploadImage(
    buffer: Buffer,
    userId: string,
    orderId: string,
    type: 'card' | 'edit' | 'session' = 'card'
  ): Promise<string | null> {
    try {
      const timestamp = Date.now();
      const fileName = `${type}/${userId}/${orderId}_${timestamp}.jpg`;

      const { data, error } = await this._client.storage
        .from(this.bucketName)
        .upload(fileName, buffer, {
          contentType: 'image/jpeg',
          upsert: false,
        });

      if (error) {
        console.error('Supabase storage upload error:', error);
        return null;
      }

      const { data: urlData } = this._client.storage
        .from(this.bucketName)
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Upload image error:', error);
      return null;
    }
  }

  // User operations
  async getUser(telegramId: number): Promise<User | null> {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('telegram_id', telegramId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data;
  }

  // Find user by referral code
  async getUserByReferralCode(code: string): Promise<User | null> {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('referral_code', code.toLowerCase())
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data;
  }

  async createUser(
    telegramId: number,
    username?: string,
    firstName?: string,
    lastName?: string,
    referralParams?: ReferralParams
  ): Promise<User> {
    // Find referrer if referral code provided
    let referrerId: string | null = null;
    
    if (referralParams?.referralCode) {
      try {
        const referrer = await this.getUserByReferralCode(referralParams.referralCode);
        if (referrer) {
          referrerId = referrer.id;
          // Increment referrer's count
          await this.client
            .from('users')
            .update({ 
              referrals_count: (referrer.referrals_count || 0) + 1,
              updated_at: new Date().toISOString()
            })
            .eq('id', referrer.id);
        }
      } catch (err) {
        console.error('Error finding referrer:', err);
        // Continue without referrer
      }
    }

    const { data, error } = await this.client
      .from('users')
      .insert({
        telegram_id: telegramId,
        username: username || null,
        first_name: firstName || null,
        last_name: lastName || null,
        plan: 'free',
        credits: 12,
        cards_created: 0,
        referred_by: referrerId,
        utm_source: referralParams?.utmSource || null,
        utm_campaign: referralParams?.utmCampaign || null,
        utm_medium: referralParams?.utmMedium || null,
        start_param: referralParams?.startParam || null,
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
    const { data: user } = await this.client
      .from('users')
      .select('credits')
      .eq('id', userId)
      .single();

    if (!user) throw new Error('User not found');

    const newCredits = user.credits + creditsChange;
    return this.updateUser(userId, { credits: newCredits });
  }

  async incrementCardsCreated(userId: string): Promise<void> {
    try {
      // Try using the RPC function first
      const { error: rpcError } = await this._client.rpc('increment_cards_created', { p_user_id: userId });
      
      if (rpcError) {
        console.error('RPC increment_cards_created error:', rpcError);
        // Fallback: direct update
        const { data: user } = await this.client
          .from('users')
          .select('cards_created')
          .eq('id', userId)
          .single();
        
        if (user) {
          await this.client
            .from('users')
            .update({ 
              cards_created: (user.cards_created || 0) + 1,
              updated_at: new Date().toISOString()
            })
            .eq('id', userId);
        }
      }
    } catch (err) {
      console.error('incrementCardsCreated error:', err);
      // Silent fail - not critical
    }
  }

  // Get user's referral stats
  async getReferralStats(userId: string): Promise<{
    referralCode: string;
    referralsCount: number;
    earnings: number;
  }> {
    try {
      const { data, error } = await this.client
        .from('users')
        .select('referral_code, referrals_count, referral_earnings')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('getReferralStats error:', error);
        return { referralCode: '', referralsCount: 0, earnings: 0 };
      }

      return {
        referralCode: data?.referral_code || '',
        referralsCount: data?.referrals_count || 0,
        earnings: Number(data?.referral_earnings) || 0,
      };
    } catch (err) {
      console.error('getReferralStats error:', err);
      return { referralCode: '', referralsCount: 0, earnings: 0 };
    }
  }

  // Process referral commission after payment
  async processReferralCommission(paymentId: string, commissionPercent = 10): Promise<void> {
    await this._client.rpc('process_referral_commission', {
      p_payment_id: paymentId,
      p_commission_percent: commissionPercent,
    });
  }

  // Order operations
  async createOrder(
    userId: string,
    type: 'image_card' | 'photo_session' | 'image_edit',
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
    const { data, error } = await this.client
      .from('payments')
      .select('*')
      .eq('id', paymentId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data;
  }

  // Get or create user with referral tracking
  async getOrCreateUser(
    telegramId: number,
    username?: string,
    firstName?: string,
    lastName?: string,
    referralParams?: ReferralParams
  ): Promise<User> {
    let user = await this.getUser(telegramId);
    if (!user) {
      user = await this.createUser(telegramId, username, firstName, lastName, referralParams);
    }
    return user;
  }

  // ============================================
  // PROMPT TEMPLATES
  // ============================================

  /**
   * Get a prompt template by ID
   */
  async getPromptTemplate(id: string): Promise<{ id: string; template: string } | null> {
    const { data, error } = await this._client
      .from('prompt_templates')
      .select('id, template')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      console.error('getPromptTemplate error:', error);
      return null;
    }

    return data;
  }

  /**
   * Get all prompt templates
   */
  async getAllPromptTemplates(): Promise<Array<{
    id: string;
    name: string;
    description: string;
    template: string;
    variables: string[];
    category: string;
    is_system: boolean;
    is_active: boolean;
    updated_at: string;
  }>> {
    const { data, error } = await this._client
      .from('prompt_templates')
      .select('*')
      .order('category')
      .order('is_system', { ascending: false });

    if (error) {
      console.error('getAllPromptTemplates error:', error);
      return [];
    }

    return data || [];
  }

  /**
   * Update a prompt template
   */
  async updatePromptTemplate(id: string, template: string): Promise<boolean> {
    const { error } = await this._client
      .from('prompt_templates')
      .update({ 
        template, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', id);

    if (error) {
      console.error('updatePromptTemplate error:', error);
      return false;
    }

    return true;
  }

  /**
   * Create a new prompt template
   */
  async createPromptTemplate(data: {
    id: string;
    name: string;
    description?: string;
    template: string;
    variables?: string[];
    category: 'card_generation' | 'image_edit' | 'photo_session' | 'other';
    is_system?: boolean;
  }): Promise<boolean> {
    const { error } = await this._client
      .from('prompt_templates')
      .insert({
        id: data.id,
        name: data.name,
        description: data.description || '',
        template: data.template,
        variables: data.variables || [],
        category: data.category,
        is_system: data.is_system || false,
        is_active: true,
      });

    if (error) {
      console.error('createPromptTemplate error:', error);
      return false;
    }

    return true;
  }

  /**
   * Delete (deactivate) a prompt template
   */
  async deletePromptTemplate(id: string): Promise<boolean> {
    const { error } = await this._client
      .from('prompt_templates')
      .update({ 
        is_active: false,
        updated_at: new Date().toISOString() 
      })
      .eq('id', id);

    if (error) {
      console.error('deletePromptTemplate error:', error);
      return false;
    }

    return true;
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
  // Referral fields
  referral_code?: string;
  referred_by?: string;
  referrals_count?: number;
  referral_earnings?: number;
  // UTM tracking
  utm_source?: string;
  utm_campaign?: string;
  utm_medium?: string;
  start_param?: string;
  // Admin fields
  total_spent?: number;
  is_blocked?: boolean;
  is_admin?: boolean;
  notes?: string;
  tags?: string[];
  // Timestamps
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  type: 'image_card' | 'photo_session' | 'image_edit';
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

// Image generation session for tracking state
export interface ImageGenSession {
  sessionId: string; // Unique ID for n8n/ChatGPT memory
  photoUrl?: string;
  photoFileId?: string;
  prompt?: string;
  lastGeneratedImage?: Buffer;
  lastGeneratedImageUrl?: string;
  orderId?: string;
  generationCount: number;
}

// Image edit session
export interface ImageEditSession {
  sessionId: string; // Unique ID for n8n/ChatGPT memory
  photoUrl?: string;
  photoFileId?: string;
  prompt?: string;
  lastEditedImage?: Buffer;
  lastEditedImageUrl?: string;
  orderId?: string;
  editCount: number;
}

// Image input for AI generation
export interface ImageInput {
  url: string;
  fileId?: string;           // Telegram file_id
  description?: string;      // User's caption/note for this image
  index: number;             // Order in the array (1-8)
}

// Carousel slide data
export interface CarouselSlide {
  slideNumber: number;
  imageUrl: string;           // URL in storage (Banana/Supabase)
  imageFileId?: string;       // Telegram file_id for quick resend
  prompt: string;
  style?: string;             // Extracted/detected style description
  generatedAt: string;
}

// Carousel session for multi-slide generation
export interface CarouselSession {
  sessionId: string;
  
  // Input images (up to 8)
  inputImages: ImageInput[];
  
  // Primary product image (shortcut to first product image)
  originalImageUrl: string;
  originalImageFileId?: string;
  
  // Current working state
  currentSlideNumber: number;
  currentPrompt?: string;         // Original prompt for the card
  currentEditRequest?: string;    // Edit request (what to change)
  currentImageUrl?: string;       // Latest generated image URL
  currentImageFileId?: string;    // Latest generated image Telegram file_id
  currentImageBuffer?: Buffer;    // Latest generated image buffer
  
  // Finalized slides (confirmed by user)
  slides: CarouselSlide[];
  
  // Style reference (extracted from first finalized slide)
  styleReference?: {
    imageUrl: string;
    styleDescription: string;
  };
  
  // Generation tracking
  generationCount: number;       // Total generations in this session
  orderId?: string;              // Current order ID
  
  // Multi-image collection state
  isCollectingImages?: boolean;  // True when waiting for more images
  collectedImagesCount?: number;
}

export interface SessionData {
  currentRoute?: string;
  tempData?: any;
  lastMessageId?: number;
  processingMessageId?: number;
  // Legacy image generation session (keep for backward compatibility)
  imageGenSession?: ImageGenSession;
  // Image edit session
  imageEditSession?: ImageEditSession;
  // New carousel session
  carouselSession?: CarouselSession;
}

export type MyContext = Context & SessionFlavor<SessionData>;

export interface CreditPackage {
  id: string;
  name: string;
  emoji: string;
  credits: number;
  price: number;
  pricePerCard: number;
  cardsCount: number;
  description: string;
  badge?: string; // Optional badge like "ХИТ", "ВЫГОДНО"
  isPopular?: boolean;
}

// New pricing structure optimized for conversions
// 4 credits = 1 card generation, 2 credits = 1 edit
export const CREDIT_PACKAGES: Record<string, CreditPackage> = {
  starter: {
    id: 'starter',
    name: 'Starter',
    emoji: '',
    credits: 60,
    price: 590,
    pricePerCard: 39,
    cardsCount: 15,
    description: '',
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    emoji: '',
    credits: 184,
    price: 1490,
    pricePerCard: 32,
    cardsCount: 46,
    description: 'Рекомендуем',
    isPopular: true,
  },
  big: {
    id: 'big',
    name: 'Big',
    emoji: '',
    credits: 664,
    price: 4990,
    pricePerCard: 30,
    cardsCount: 166,
    description: 'Выгодно',
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    emoji: '',
    credits: 0,
    price: 10000,
    pricePerCard: 0,
    cardsCount: 0,
    description: 'Индивидуально',
  },
};

// Keep old PLANS for backward compatibility
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
  IMAGE_CARD_WAITING_PHOTO: 'image_card_waiting_photo',
  IMAGE_CARD_WAITING_PROMPT: 'image_card_waiting_prompt',
  IMAGE_CARD_SESSION: 'image_card_session',
  // Carousel routes
  CAROUSEL_WAITING_PHOTO: 'carousel_waiting_photo',
  CAROUSEL_WAITING_PROMPT: 'carousel_waiting_prompt',
  CAROUSEL_SESSION: 'carousel_session',
  CAROUSEL_NEXT_SLIDE: 'carousel_next_slide',
  // Image edit
  IMAGE_EDIT: 'image_edit',
  IMAGE_EDIT_WAITING_PHOTO: 'image_edit_waiting_photo',
  IMAGE_EDIT_WAITING_PROMPT: 'image_edit_waiting_prompt',
  IMAGE_EDIT_SESSION: 'image_edit_session',
  PHOTO_SESSION: 'photo_session',
  PROFILE: 'profile',
  SUPPORT: 'support',
  BUY_CREDITS: 'buy_credits',
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
import { InlineKeyboard } from 'grammy';
import { TEXTS, CALLBACKS } from '../constants/texts';
import { CREDIT_PACKAGES } from '../types';

export class KeyboardBuilder {
  // Main menu - now inline
  static mainMenu(): InlineKeyboard {
    return new InlineKeyboard()
      .text(TEXTS.BTN_IMAGE_CARD, CALLBACKS.IMAGE_CARD)
      //.text(TEXTS.BTN_IMAGE_EDIT, CALLBACKS.IMAGE_EDIT)
      .row()
      //.text(TEXTS.BTN_PHOTO_SESSION, CALLBACKS.PHOTO_SESSION)
      //.row()
      .text(TEXTS.BTN_MY_PROFILE, CALLBACKS.PROFILE)
      .text(TEXTS.BTN_SUPPORT, CALLBACKS.SUPPORT)
      .row()
      .text(TEXTS.BTN_BUY_CREDITS, CALLBACKS.BUY_CREDITS);
  }

  // Back to menu button
  static backToMenu(): InlineKeyboard {
    return new InlineKeyboard().text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Image card - waiting for photo
  static imageCardWaitingPhoto(): InlineKeyboard {
    return new InlineKeyboard().text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Image card - photo received, waiting for prompt
  static imageCardPhotoReceived(): InlineKeyboard {
    return new InlineKeyboard().text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Image card session - after generation
  static imageCardSession(): InlineKeyboard {
    return new InlineKeyboard()
      .text('🔁 Повторить с тем же промптом', CALLBACKS.REGENERATE)
      .row()
      .text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Image edit - waiting for photo
  static imageEditWaitingPhoto(): InlineKeyboard {
    return new InlineKeyboard().text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Image edit - photo received, waiting for prompt
  static imageEditPhotoReceived(): InlineKeyboard {
    return new InlineKeyboard().text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Image edit session - after editing
  static imageEditSession(): InlineKeyboard {
    return new InlineKeyboard()
      .text('🔁 Повторить с тем же промптом', CALLBACKS.EDIT_REGENERATE)
      .row()
      .text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Photo session - waiting for photo
  static photoSessionWaiting(): InlineKeyboard {
    return new InlineKeyboard().text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Profile actions - inline
  static profileActions(): InlineKeyboard {
    return new InlineKeyboard()
      .text(TEXTS.PROFILE_BTN_BUY_CREDITS, CALLBACKS.PROFILE_BUY_CREDITS)
      .text(TEXTS.PROFILE_BTN_HISTORY, CALLBACKS.PROFILE_HISTORY)
      .row()
      .text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Support actions - inline
  static supportActions(): InlineKeyboard {
    return new InlineKeyboard()
      .text(TEXTS.SUPPORT_BTN_FAQ, CALLBACKS.SUPPORT_FAQ)
      .text(TEXTS.SUPPORT_BTN_CONTACT, CALLBACKS.SUPPORT_CONTACT)
      .row()
      .text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Credit packages selection - clean design
  static creditPackages(): InlineKeyboard {
    const starter = CREDIT_PACKAGES.starter;
    const pro = CREDIT_PACKAGES.pro;
    const big = CREDIT_PACKAGES.big;

    return new InlineKeyboard()
      .text(`⭐ ${starter.name} · ${starter.price}₽`, CALLBACKS.BUY_STARTER)
      .row()
      .text(`✅ ${pro.name} · ${pro.price}₽`, CALLBACKS.BUY_PRO)
      .row()
      .text(`💎 ${big.name} · ${big.price}₽`, CALLBACKS.BUY_BIG)
      .row()
      .text(`Enterprise · от 10 000 ₽`, CALLBACKS.BUY_ENTERPRISE)
      .row()
      .text('❓ Почему такая цена?', CALLBACKS.PRICE_EXPLAIN)
      .row()
      .text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Payment confirmation
  static paymentConfirm(paymentUrl: string): InlineKeyboard {
    return new InlineKeyboard()
      .url('💳 Оплатить', paymentUrl)
      .row()
      .text('✅ Проверить оплату', CALLBACKS.PAYMENT_CHECK)
      .row()
      .text('❌ Отмена', CALLBACKS.PAYMENT_CANCEL);
  }

  // Simple back button
  static back(): InlineKeyboard {
    return new InlineKeyboard().text(TEXTS.BTN_BACK, CALLBACKS.BACK_TO_MENU);
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

