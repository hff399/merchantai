import { Bot, session } from 'grammy';
import { run } from '@grammyjs/runner';
import { config } from './config';
import { MyContext, SessionData, ROUTES } from './types';
import { CALLBACKS } from './constants/texts';
import { KeyboardBuilder } from './utils/keyboards';

// Handlers
import { showMainMenu, handleContinueToMenu } from './handlers/mainMenu';
import {
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