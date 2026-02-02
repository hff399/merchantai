/**
 * Application factory
 * Wires everything together and creates the bot
 */

import { Bot, Composer } from 'grammy';
import { run } from '@grammyjs/runner';
import { config } from './config';
import { createBot, MyContext } from './bot';
import { getServiceContainer } from './services';
import { ROUTES, DEMO_ROUTES, CALLBACKS, DEMO_CALLBACKS, TEXTS } from './core/constants';
import { backToMenuKeyboard, supportActionsKeyboard } from './bot/keyboards';

// Feature handlers
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
} from './features/carousel';

import {
  handleImageEdit,
  handleImageEditPhoto,
  handleImageEditPrompt,
  handleEditRegenerate,
} from './features/imageEdit';

import {
  handleDemoStartPhoto,
  handleDemoPhoto,
  handleDemoUserInput,
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
  // Skip handlers
  handleDemoSkipStyle,
  handleDemoSkipComposition,
  handleDemoSkipVisualStyle,
  handleDemoSkipAtmosphere,
  handleDemoSkipInfographics,
  handleDemoSkipTextStyle,
  handleDemoSkipHeadline,
} from './features/demo';

// Legacy handlers (for backward compatibility during transition)
import {
  handleImageCardPhoto,
  handleImageCardPrompt,
  handleRegenerate,
} from './handlers/imageCard';
import { handlePhotoSession, handlePhotoSessionPhoto } from './handlers/photoSession';
import {
  handlePriceExplainStart,
  handlePriceReason1,
  handlePriceReason2,
  handlePriceReason3,
  handlePriceFinal,
  PRICE_EXPLAIN_CALLBACKS,
} from './handlers/priceExplain';

// Create feature composers
function createCarouselComposer(): Composer<MyContext> {
  const composer = new Composer<MyContext>();

  // Carousel callbacks
  composer.callbackQuery(CALLBACKS.IMAGE_CARD, async (ctx) => {
    await ctx.answerCallbackQuery();
    await handleCarouselStart(ctx, true);
  });

  composer.callbackQuery(CALLBACKS.CAROUSEL_REGENERATE, handleCarouselRegenerate);
  composer.callbackQuery(CALLBACKS.CAROUSEL_NEXT_SLIDE, handleCarouselNextSlide);
  composer.callbackQuery(CALLBACKS.CAROUSEL_FINISH, handleCarouselFinish);
  composer.callbackQuery(CALLBACKS.CAROUSEL_IMAGES_DONE, handleCarouselImagesDone);

  return composer;
}

function createImageEditComposer(): Composer<MyContext> {
  const composer = new Composer<MyContext>();

  composer.callbackQuery(CALLBACKS.IMAGE_EDIT, async (ctx) => {
    await ctx.answerCallbackQuery();
    await handleImageEdit(ctx, true);
  });

  composer.callbackQuery(CALLBACKS.EDIT_REGENERATE, handleEditRegenerate);

  return composer;
}

function createDemoComposer(): Composer<MyContext> {
  const composer = new Composer<MyContext>();

  composer.callbackQuery(DEMO_CALLBACKS.START_DEMO, handleDemoStartPhoto);

  // Skip handlers for simplified flow
  composer.callbackQuery(DEMO_CALLBACKS.SKIP_STYLE, handleDemoSkipStyle);
  composer.callbackQuery(DEMO_CALLBACKS.SKIP_COMPOSITION, handleDemoSkipComposition);
  composer.callbackQuery(DEMO_CALLBACKS.SKIP_VISUAL_STYLE, handleDemoSkipVisualStyle);
  composer.callbackQuery(DEMO_CALLBACKS.SKIP_ATMOSPHERE, handleDemoSkipAtmosphere);
  composer.callbackQuery(DEMO_CALLBACKS.SKIP_INFOGRAPHICS, handleDemoSkipInfographics);
  composer.callbackQuery(DEMO_CALLBACKS.SKIP_TEXT_STYLE, handleDemoSkipTextStyle);
  composer.callbackQuery(DEMO_CALLBACKS.SKIP_HEADLINE, handleDemoSkipHeadline);

  // Composition
  composer.callbackQuery(DEMO_CALLBACKS.COMP_MAX_LARGE, (ctx) => handleDemoCompositionChoice(ctx, 'max_large'));
  composer.callbackQuery(DEMO_CALLBACKS.COMP_DYNAMIC, (ctx) => handleDemoCompositionChoice(ctx, 'dynamic'));
  composer.callbackQuery(DEMO_CALLBACKS.COMP_STRICT, (ctx) => handleDemoCompositionChoice(ctx, 'strict'));
  composer.callbackQuery(DEMO_CALLBACKS.COMP_VERTICAL, (ctx) => handleDemoCompositionChoice(ctx, 'vertical'));

  // Visual style
  composer.callbackQuery(DEMO_CALLBACKS.VS_MARKETPLACE, (ctx) => handleDemoVisualStyleChoice(ctx, 'marketplace_premium'));
  composer.callbackQuery(DEMO_CALLBACKS.VS_TECH, (ctx) => handleDemoVisualStyleChoice(ctx, 'tech'));
  composer.callbackQuery(DEMO_CALLBACKS.VS_ECO, (ctx) => handleDemoVisualStyleChoice(ctx, 'eco'));
  composer.callbackQuery(DEMO_CALLBACKS.VS_MINIMAL, (ctx) => handleDemoVisualStyleChoice(ctx, 'minimal'));
  composer.callbackQuery(DEMO_CALLBACKS.VS_DARK, (ctx) => handleDemoVisualStyleChoice(ctx, 'dark_premium'));
  composer.callbackQuery(DEMO_CALLBACKS.VS_BRIGHT, (ctx) => handleDemoVisualStyleChoice(ctx, 'bright_commercial'));

  // Atmosphere
  composer.callbackQuery(DEMO_CALLBACKS.ATM_NONE, (ctx) => handleDemoAtmosphereChoice(ctx, 'no_effects'));
  composer.callbackQuery(DEMO_CALLBACKS.ATM_THEMATIC, (ctx) => handleDemoAtmosphereChoice(ctx, 'light_thematic'));
  composer.callbackQuery(DEMO_CALLBACKS.ATM_HIGHLIGHTS, (ctx) => handleDemoAtmosphereChoice(ctx, 'soft_highlights'));
  composer.callbackQuery(DEMO_CALLBACKS.ATM_MOTION, (ctx) => handleDemoAtmosphereChoice(ctx, 'motion'));

  // Infographics
  composer.callbackQuery(DEMO_CALLBACKS.INF_CLEAN_UI, (ctx) => handleDemoInfographicsChoice(ctx, 'clean_ui'));
  composer.callbackQuery(DEMO_CALLBACKS.INF_LARGE_NUM, (ctx) => handleDemoInfographicsChoice(ctx, 'large_numbers'));
  composer.callbackQuery(DEMO_CALLBACKS.INF_MINIMAL, (ctx) => handleDemoInfographicsChoice(ctx, 'minimal_text'));
  composer.callbackQuery(DEMO_CALLBACKS.INF_SPECS, (ctx) => handleDemoInfographicsChoice(ctx, 'specs_focus'));

  // Text style
  composer.callbackQuery(DEMO_CALLBACKS.TXT_FACTS, (ctx) => handleDemoTextStyleChoice(ctx, 'facts_numbers'));
  composer.callbackQuery(DEMO_CALLBACKS.TXT_SHORT, (ctx) => handleDemoTextStyleChoice(ctx, 'short_powerful'));
  composer.callbackQuery(DEMO_CALLBACKS.TXT_BENEFIT, (ctx) => handleDemoTextStyleChoice(ctx, 'benefit_focused'));
  composer.callbackQuery(DEMO_CALLBACKS.TXT_TECH, (ctx) => handleDemoTextStyleChoice(ctx, 'technical'));
  composer.callbackQuery(DEMO_CALLBACKS.TXT_EMOTIONAL, (ctx) => handleDemoTextStyleChoice(ctx, 'emotional'));

  // Headline
  composer.callbackQuery(DEMO_CALLBACKS.HDL_LARGEST, (ctx) => handleDemoHeadlineChoice(ctx, 'largest'));
  composer.callbackQuery(DEMO_CALLBACKS.HDL_SUBTITLE, (ctx) => handleDemoHeadlineChoice(ctx, 'with_subtitle'));
  composer.callbackQuery(DEMO_CALLBACKS.HDL_MINIMAL, (ctx) => handleDemoHeadlineChoice(ctx, 'minimalist'));
  composer.callbackQuery(DEMO_CALLBACKS.HDL_NUMBER, (ctx) => handleDemoHeadlineChoice(ctx, 'number_focus'));

  // Post-generation
  composer.callbackQuery(DEMO_CALLBACKS.EDIT_SUBMISSION, handleDemoEditSubmission);
  composer.callbackQuery(DEMO_CALLBACKS.EDIT_COMPOSITION, handleDemoEditComposition);
  composer.callbackQuery(DEMO_CALLBACKS.EDIT_STYLE, handleDemoEditStyle);
  composer.callbackQuery(DEMO_CALLBACKS.EDIT_INFOGRAPHICS, handleDemoEditInfographics);
  composer.callbackQuery(DEMO_CALLBACKS.EDIT_TEXTS, handleDemoEditTexts);
  composer.callbackQuery(DEMO_CALLBACKS.NEW_VARIANT, handleDemoNewVariant);
  composer.callbackQuery(DEMO_CALLBACKS.DOWNLOAD, handleDemoDownload);

  return composer;
}

function createPriceExplainComposer(): Composer<MyContext> {
  const composer = new Composer<MyContext>();

  composer.callbackQuery(PRICE_EXPLAIN_CALLBACKS.START, handlePriceExplainStart);
  composer.callbackQuery(PRICE_EXPLAIN_CALLBACKS.REASON_1, handlePriceReason1);
  composer.callbackQuery(PRICE_EXPLAIN_CALLBACKS.REASON_2, handlePriceReason2);
  composer.callbackQuery(PRICE_EXPLAIN_CALLBACKS.REASON_3, handlePriceReason3);
  composer.callbackQuery(PRICE_EXPLAIN_CALLBACKS.FINAL, handlePriceFinal);

  return composer;
}

function createSupportComposer(): Composer<MyContext> {
  const composer = new Composer<MyContext>();

  // FAQ handlers
  composer.callbackQuery(CALLBACKS.SUPPORT_FAQ_CREATE, async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply(TEXTS.SUPPORT_FAQ_HOW_TO_CREATE, {
      parse_mode: 'HTML',
      reply_markup: supportActionsKeyboard(),
    });
  });

  composer.callbackQuery(CALLBACKS.SUPPORT_FAQ_PRICING, async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply(TEXTS.SUPPORT_FAQ_PRICING, {
      parse_mode: 'HTML',
      reply_markup: supportActionsKeyboard(),
    });
  });

  composer.callbackQuery(CALLBACKS.SUPPORT_FAQ_CAROUSEL, async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply(TEXTS.SUPPORT_FAQ_CAROUSEL, {
      parse_mode: 'HTML',
      reply_markup: supportActionsKeyboard(),
    });
  });

  composer.callbackQuery(CALLBACKS.SUPPORT_CONTACT, async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.reply(`Напишите нам: ${TEXTS.SUPPORT_CONTACT}`, {
      reply_markup: backToMenuKeyboard(),
    });
  });

  return composer;
}

function createPhotoSessionComposer(): Composer<MyContext> {
  const composer = new Composer<MyContext>();

  composer.callbackQuery(CALLBACKS.PHOTO_SESSION, async (ctx) => {
    await ctx.answerCallbackQuery();
    await handlePhotoSession(ctx, true);
  });

  return composer;
}

function createMessageHandlers(): Composer<MyContext> {
  const composer = new Composer<MyContext>();

  // Text message handler
  composer.on('message:text', async (ctx) => {
    const route = ctx.session.currentRoute;

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

      // Legacy image card routes
      case ROUTES.IMAGE_CARD_WAITING_PROMPT:
        await handleImageCardPrompt(ctx);
        break;

      case ROUTES.IMAGE_EDIT_WAITING_PROMPT:
        await handleImageEditPrompt(ctx);
        break;

      case DEMO_ROUTES.USER_INPUT:
        await handleDemoUserInput(ctx);
        break;

      case ROUTES.IMAGE_CARD_SESSION:
        if (ctx.session.imageGenSession?.photoUrl && ctx.message?.text?.trim()) {
          ctx.session.imageGenSession.prompt = ctx.message.text.trim();
          await handleRegenerate(ctx);
        }
        break;

      case ROUTES.IMAGE_EDIT_SESSION:
        if (ctx.session.imageEditSession && ctx.message.text?.trim()) {
          ctx.session.imageEditSession.prompt = ctx.message.text.trim();
          await handleEditRegenerate(ctx);
        }
        break;

      default:
        await ctx.reply(TEXTS.NAV_HINT_MENU);
    }
  });

  // Photo handler
  composer.on('message:photo', async (ctx) => {
    const route = ctx.session.currentRoute;

    switch (route) {
      case ROUTES.CAROUSEL_WAITING_PHOTO:
      case ROUTES.CAROUSEL_SESSION:
        await handleCarouselPhoto(ctx);
        break;

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
        await handleDemoPhoto(ctx);
        break;

      default:
        await ctx.reply(TEXTS.NAV_HINT_PHOTO, { reply_markup: backToMenuKeyboard() });
    }
  });

  // Handle other message types
  composer.on('message', async (ctx) => {
    await ctx.reply(TEXTS.NAV_HINT_GENERAL, {
      reply_markup: backToMenuKeyboard(),
    });
  });

  return composer;
}

// Create the full application
export function createApp(): Bot<MyContext> {
  // Create base bot with core composers
  const bot = createBot({
    token: config.botToken,
    services: getServiceContainer(),
    enableLogging: config.nodeEnv !== 'production',
  });

  // Register feature composers
  bot.use(createCarouselComposer());
  bot.use(createImageEditComposer());
  bot.use(createDemoComposer());
  bot.use(createPriceExplainComposer());
  bot.use(createSupportComposer());
  bot.use(createPhotoSessionComposer());

  // Register message handlers last
  bot.use(createMessageHandlers());

  return bot;
}

// Start the application
export async function startApp(): Promise<void> {
  const bot = createApp();

  console.log('Starting MerchantAI Bot...');

  // Enable graceful stop
  process.once('SIGINT', () => bot.stop());
  process.once('SIGTERM', () => bot.stop());

  // Start bot with runner for better performance
  await bot.init();
  console.log(`Bot started as @${bot.botInfo.username}`);

  const runner = run(bot);

  // Handle runner errors
  const task = runner.task();
  if (task) {
    task.catch((error) => {
      console.error('Runner error:', error);
    });
  }
}
