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
  handleCarouselSelectReference,
  handleCarouselUseCurrent,
} from './handlers/carousel';


import {
  handleTestModeStart,
  handleTestModePhoto,
  handleTestModePhotosDone,
  handleTestModePrompt,
  handleTestModeNewPrompt,
  handleTestModeRegenerate,
  handleTestModeDownload,
  handleTestModeReset,
  TEST_CALLBACKS,
  TEST_ROUTES,
} from './handlers/testMode';

import {
  handleDemoStartPhoto,
  handleDemoPhoto,
  handleDemoUserInput,
  handleDemoPhotosDone,
  handleDemoReset,
  handleDemoCompositionChoice,
  handleDemoVisualStyleChoice,
  handleDemoAtmosphereChoice,
  handleDemoInfographicsChoice,
  handleDemoTextStyleChoice,
  handleDemoHeadlineChoice,
  handleDemoEditSubmission,
  handleDemoEditComposition,
  handleDemoEditStyle,
  handleDemoEditInfographics,
  handleDemoEditTexts,
  handleDemoNewVariant,
  handleDemoDownload,
  handleDemoAdvancedEdit,
  handleQuickDemo,
  handleUploadOwn,
  handleStylePresetChoice,
  showDemoPaywall,
  DEMO_CALLBACKS,
  DEMO_ROUTES,
} from './handlers/promptConstructor';
import { supabase } from './services/supabase';

const CARD_GENERATION_COST = 4;

// Helper to check if user should be blocked by paywall (not enough credits)
async function shouldBlockWithPaywall(ctx: MyContext): Promise<boolean> {
  if (!ctx.from) return false;
  const user = await supabase.getUser(ctx.from.id);
  return !user || user.credits < CARD_GENERATION_COST;
}

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

// Test mode command
bot.command('test', handleTestModeStart);

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
  // Block when user has no credits
  if (await shouldBlockWithPaywall(ctx)) {
    await showDemoPaywall(ctx);
    return;
  }
  await showMainMenu(ctx, true);
});

bot.callbackQuery(CALLBACKS.CONTINUE_TO_MENU, handleContinueToMenu);

// IMAGE_CARD now uses carousel flow
bot.callbackQuery(CALLBACKS.IMAGE_CARD, async (ctx) => {
  await ctx.answerCallbackQuery();
  if (await shouldBlockWithPaywall(ctx)) {
    await showDemoPaywall(ctx);
    return;
  }
  await handleCarouselStart(ctx, true);
});

bot.callbackQuery(CALLBACKS.IMAGE_EDIT, async (ctx) => {
  await ctx.answerCallbackQuery();
  if (await shouldBlockWithPaywall(ctx)) {
    await showDemoPaywall(ctx);
    return;
  }
  await handleImageEdit(ctx, true);
});

bot.callbackQuery(CALLBACKS.PHOTO_SESSION, async (ctx) => {
  await ctx.answerCallbackQuery();
  if (await shouldBlockWithPaywall(ctx)) {
    await showDemoPaywall(ctx);
    return;
  }
  await handlePhotoSession(ctx, true);
});

bot.callbackQuery(CALLBACKS.PROFILE, async (ctx) => {
  await ctx.answerCallbackQuery();
  if (await shouldBlockWithPaywall(ctx)) {
    await showDemoPaywall(ctx);
    return;
  }
  await handleProfile(ctx, true);
});

bot.callbackQuery(CALLBACKS.SUPPORT, async (ctx) => {
  await ctx.answerCallbackQuery();
  if (await shouldBlockWithPaywall(ctx)) {
    await showDemoPaywall(ctx);
    return;
  }
  await handleSupport(ctx, true);
});

bot.callbackQuery(CALLBACKS.BUY_CREDITS, async (ctx) => {
  await ctx.answerCallbackQuery();
  // BUY_CREDITS is always allowed
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
bot.callbackQuery(CALLBACKS.CAROUSEL_USE_CURRENT, handleCarouselUseCurrent);

// Carousel reference selection (dynamic callback with variant index)
bot.callbackQuery(/^carousel_select_ref_(\d+)$/, async (ctx) => {
  const match = ctx.callbackQuery.data.match(/^carousel_select_ref_(\d+)$/);
  if (match) {
    const variantIndex = parseInt(match[1], 10);
    await handleCarouselSelectReference(ctx, variantIndex);
  }
});



// Demo constructor callbacks - new flow
bot.callbackQuery(DEMO_CALLBACKS.PHOTOS_DONE, handleDemoPhotosDone);
bot.callbackQuery(DEMO_CALLBACKS.RESET, handleDemoReset);

// Demo constructor callbacks - legacy
bot.callbackQuery(DEMO_CALLBACKS.START_DEMO, handleDemoStartPhoto);
bot.callbackQuery(DEMO_CALLBACKS.QUICK_DEMO, handleQuickDemo);
bot.callbackQuery(DEMO_CALLBACKS.UPLOAD_OWN, handleUploadOwn);

// Style presets
bot.callbackQuery(DEMO_CALLBACKS.PRESET_PREMIUM_WB, (ctx) => handleStylePresetChoice(ctx, 'premium_wb'));
bot.callbackQuery(DEMO_CALLBACKS.PRESET_DARK_PREMIUM, (ctx) => handleStylePresetChoice(ctx, 'dark_premium'));
bot.callbackQuery(DEMO_CALLBACKS.PRESET_MINIMAL_WHITE, (ctx) => handleStylePresetChoice(ctx, 'minimal_white'));
bot.callbackQuery(DEMO_CALLBACKS.PRESET_ECO_NATURAL, (ctx) => handleStylePresetChoice(ctx, 'eco_natural'));
bot.callbackQuery(DEMO_CALLBACKS.PRESET_TECH_MODERN, (ctx) => handleStylePresetChoice(ctx, 'tech_modern'));
bot.callbackQuery(DEMO_CALLBACKS.PRESET_BRIGHT_COMMERCIAL, (ctx) => handleStylePresetChoice(ctx, 'bright_commercial'));

// Advanced edit
bot.callbackQuery(DEMO_CALLBACKS.ADVANCED_EDIT, handleDemoAdvancedEdit);

// Composition
bot.callbackQuery(DEMO_CALLBACKS.COMP_MAX_LARGE, (ctx) => handleDemoCompositionChoice(ctx, 'max_large'));
bot.callbackQuery(DEMO_CALLBACKS.COMP_DYNAMIC, (ctx) => handleDemoCompositionChoice(ctx, 'dynamic'));
bot.callbackQuery(DEMO_CALLBACKS.COMP_STRICT, (ctx) => handleDemoCompositionChoice(ctx, 'strict'));
bot.callbackQuery(DEMO_CALLBACKS.COMP_VERTICAL, (ctx) => handleDemoCompositionChoice(ctx, 'vertical'));

// Visual style
bot.callbackQuery(DEMO_CALLBACKS.VS_MARKETPLACE, (ctx) => handleDemoVisualStyleChoice(ctx, 'marketplace_premium'));
bot.callbackQuery(DEMO_CALLBACKS.VS_TECH, (ctx) => handleDemoVisualStyleChoice(ctx, 'tech'));
bot.callbackQuery(DEMO_CALLBACKS.VS_ECO, (ctx) => handleDemoVisualStyleChoice(ctx, 'eco'));
bot.callbackQuery(DEMO_CALLBACKS.VS_MINIMAL, (ctx) => handleDemoVisualStyleChoice(ctx, 'minimal'));
bot.callbackQuery(DEMO_CALLBACKS.VS_DARK, (ctx) => handleDemoVisualStyleChoice(ctx, 'dark_premium'));
bot.callbackQuery(DEMO_CALLBACKS.VS_BRIGHT, (ctx) => handleDemoVisualStyleChoice(ctx, 'bright_commercial'));

// Atmosphere
bot.callbackQuery(DEMO_CALLBACKS.ATM_NONE, (ctx) => handleDemoAtmosphereChoice(ctx, 'no_effects'));
bot.callbackQuery(DEMO_CALLBACKS.ATM_THEMATIC, (ctx) => handleDemoAtmosphereChoice(ctx, 'light_thematic'));
bot.callbackQuery(DEMO_CALLBACKS.ATM_HIGHLIGHTS, (ctx) => handleDemoAtmosphereChoice(ctx, 'soft_highlights'));
bot.callbackQuery(DEMO_CALLBACKS.ATM_MOTION, (ctx) => handleDemoAtmosphereChoice(ctx, 'motion'));

// Infographics
bot.callbackQuery(DEMO_CALLBACKS.INF_CLEAN_UI, (ctx) => handleDemoInfographicsChoice(ctx, 'clean_ui'));
bot.callbackQuery(DEMO_CALLBACKS.INF_LARGE_NUM, (ctx) => handleDemoInfographicsChoice(ctx, 'large_numbers'));
bot.callbackQuery(DEMO_CALLBACKS.INF_MINIMAL, (ctx) => handleDemoInfographicsChoice(ctx, 'minimal_text'));
bot.callbackQuery(DEMO_CALLBACKS.INF_SPECS, (ctx) => handleDemoInfographicsChoice(ctx, 'specs_focus'));

// Text style
bot.callbackQuery(DEMO_CALLBACKS.TXT_FACTS, (ctx) => handleDemoTextStyleChoice(ctx, 'facts_numbers'));
bot.callbackQuery(DEMO_CALLBACKS.TXT_SHORT, (ctx) => handleDemoTextStyleChoice(ctx, 'short_powerful'));
bot.callbackQuery(DEMO_CALLBACKS.TXT_BENEFIT, (ctx) => handleDemoTextStyleChoice(ctx, 'benefit_focused'));
bot.callbackQuery(DEMO_CALLBACKS.TXT_TECH, (ctx) => handleDemoTextStyleChoice(ctx, 'technical'));
bot.callbackQuery(DEMO_CALLBACKS.TXT_EMOTIONAL, (ctx) => handleDemoTextStyleChoice(ctx, 'emotional'));

// Headline
bot.callbackQuery(DEMO_CALLBACKS.HDL_LARGEST, (ctx) => handleDemoHeadlineChoice(ctx, 'largest'));
bot.callbackQuery(DEMO_CALLBACKS.HDL_SUBTITLE, (ctx) => handleDemoHeadlineChoice(ctx, 'with_subtitle'));
bot.callbackQuery(DEMO_CALLBACKS.HDL_MINIMAL, (ctx) => handleDemoHeadlineChoice(ctx, 'minimalist'));
bot.callbackQuery(DEMO_CALLBACKS.HDL_NUMBER, (ctx) => handleDemoHeadlineChoice(ctx, 'number_focus'));

// Post-generation
bot.callbackQuery(DEMO_CALLBACKS.EDIT_SUBMISSION, handleDemoEditSubmission);
bot.callbackQuery(DEMO_CALLBACKS.EDIT_COMPOSITION, handleDemoEditComposition);
bot.callbackQuery(DEMO_CALLBACKS.EDIT_STYLE, handleDemoEditStyle);
bot.callbackQuery(DEMO_CALLBACKS.EDIT_INFOGRAPHICS, handleDemoEditInfographics);
bot.callbackQuery(DEMO_CALLBACKS.EDIT_TEXTS, handleDemoEditTexts);
bot.callbackQuery(DEMO_CALLBACKS.NEW_VARIANT, handleDemoNewVariant);
bot.callbackQuery(DEMO_CALLBACKS.DOWNLOAD, handleDemoDownload);


// Test mode callbacks
bot.callbackQuery(TEST_CALLBACKS.PHOTOS_DONE, handleTestModePhotosDone);
bot.callbackQuery(TEST_CALLBACKS.REGENERATE, handleTestModeRegenerate);
bot.callbackQuery(TEST_CALLBACKS.NEW_PROMPT, handleTestModeNewPrompt);
bot.callbackQuery(TEST_CALLBACKS.DOWNLOAD, handleTestModeDownload);
bot.callbackQuery(TEST_CALLBACKS.RESET, handleTestModeReset);

// ============================================
// MESSAGE HANDLERS
// ============================================

// Text message handler
bot.on('message:text', async (ctx) => {
  const route = ctx.session.currentRoute;

  // Block when user has no credits
  if (await shouldBlockWithPaywall(ctx)) {
    await showDemoPaywall(ctx);
    return;
  }

  // Handle prompt input based on current route
  switch (route) {
    // Test mode routes
    case TEST_ROUTES.WAITING_PROMPT:
    case TEST_ROUTES.RESULT:
      await handleTestModePrompt(ctx);
      break;

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

    case DEMO_ROUTES.USER_INPUT:
      await handleDemoUserInput(ctx);
      break;

    case DEMO_ROUTES.PRODUCT_NAME:
      // Product description input
      await handleDemoUserInput(ctx);
      break;

    case DEMO_ROUTES.RESULT:
    case DEMO_ROUTES.ADVANCED_EDIT:
      // User sends text after result - treat as edit request
      await handleDemoUserInput(ctx);
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

  // Block when user has no credits
  if (await shouldBlockWithPaywall(ctx)) {
    await showDemoPaywall(ctx);
    return;
  }

  switch (route) {
    // Test mode routes
    case TEST_ROUTES.WAITING_PHOTOS:
      await handleTestModePhoto(ctx);
      break;

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

    case DEMO_ROUTES.WAITING_PHOTO:
    case DEMO_ROUTES.STYLE_PRESET:
    case DEMO_ROUTES.QUICK_DEMO:
      // Accept photo at any point in demo flow
      await handleDemoPhoto(ctx);
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
  // Block when user has no credits
  if (await shouldBlockWithPaywall(ctx)) {
    await showDemoPaywall(ctx);
    return;
  }
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

  // Register bot commands in Telegram menu
  await bot.api.setMyCommands([
    { command: 'start', description: 'Начать работу с ботом' },
    { command: 'menu', description: 'Главное меню' },
    { command: 'help', description: 'Помощь и инструкции' },
  ]);
  console.log('📋 Bot commands registered');

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