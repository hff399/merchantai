/**
 * Command handlers composer
 * Handles /start, /menu, /help commands
 */

import { Composer } from 'grammy';
import type { MyContext } from '../context';
import { mainMenuKeyboard } from '../keyboards';
import { TEXTS } from '../../core/constants';

export function createCommandsComposer(): Composer<MyContext> {
  const composer = new Composer<MyContext>();

  // /start command
  composer.command('start', async (ctx) => {
    // Extract start parameter for referral tracking
    const startParam = ctx.match;
    await showMainMenu(ctx, false, startParam || undefined, true);
  });

  // /menu command
  composer.command('menu', async (ctx) => {
    await showMainMenu(ctx);
  });

  // /help command
  composer.command('help', async (ctx) => {
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

  return composer;
}

// Show main menu helper function
async function showMainMenu(
  ctx: MyContext,
  editMessage = false,
  startParam?: string,
  _isFirstVisit = false
): Promise<void> {
  // Parse referral/UTM parameters from start param if present
  if (startParam && ctx.from) {
    // Handle user creation/update with referral params
    const referralParams = parseStartParam(startParam);

    try {
      await ctx.services.user.getOrCreateUser(
        ctx.from.id,
        ctx.from.username,
        ctx.from.first_name,
        ctx.from.last_name,
        referralParams
      );
    } catch (error) {
      console.error('Error creating/updating user:', error);
    }
  }

  const text = TEXTS.WELCOME;

  if (editMessage && ctx.callbackQuery?.message) {
    try {
      await ctx.editMessageText(text, {
        parse_mode: 'HTML',
        reply_markup: mainMenuKeyboard(),
      });
    } catch {
      await ctx.reply(text, {
        parse_mode: 'HTML',
        reply_markup: mainMenuKeyboard(),
      });
    }
  } else {
    await ctx.reply(text, {
      parse_mode: 'HTML',
      reply_markup: mainMenuKeyboard(),
    });
  }
}

// Parse start parameter for referral/UTM tracking
function parseStartParam(param: string): {
  referralCode?: string;
  utmSource?: string;
  utmCampaign?: string;
  utmMedium?: string;
  startParam?: string;
} {
  const result: ReturnType<typeof parseStartParam> = { startParam: param };

  if (param.startsWith('ref_')) {
    result.referralCode = param.substring(4);
  } else if (param.includes('=')) {
    // Parse UTM parameters
    const pairs = param.split('&');
    for (const pair of pairs) {
      const [key, value] = pair.split('=');
      switch (key) {
        case 'utm_source':
          result.utmSource = value;
          break;
        case 'utm_campaign':
          result.utmCampaign = value;
          break;
        case 'utm_medium':
          result.utmMedium = value;
          break;
      }
    }
  }

  return result;
}

// Export for use in other modules
export { showMainMenu };
