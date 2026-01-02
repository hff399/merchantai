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