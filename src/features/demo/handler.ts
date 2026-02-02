/**
 * Demo constructor feature handler
 * Simplified flow: Photo → Style (optional) → Product Info → Generate
 */

import { InputFile } from 'grammy';
import { v4 as uuidv4 } from 'uuid';
import type { MyContext } from '../../bot/context';
import type { DemoConstructorSession } from '../../core/types';
import { TEXTS, CREDITS, FALLBACK_PROMPTS } from '../../core/constants';
import { DEMO_ROUTES } from '../../core/types';
import {
  compositionKeyboard,
  visualStyleKeyboard,
  atmosphereKeyboard,
  infographicsKeyboard,
  textStyleKeyboard,
  headlineKeyboard,
  firstResultKeyboard,
  editChoiceKeyboard,
  paywallKeyboard,
  startDemoKeyboard,
  quickStyleKeyboard,
} from './keyboards';
import { backToMenuKeyboard, compactPackagesKeyboard } from '../../bot/keyboards';
import { cardGenerator } from '../../services/cardGenerator';
import { MessageManager } from '../../utils/helpers';

// ============================================
// WELCOME
// ============================================

export async function showDemoWelcome(ctx: MyContext): Promise<void> {
  ctx.session.demoConstructorSession = {
    sessionId: uuidv4(),
    step: 'welcome',
    generationCount: 0,
  };
  ctx.session.currentRoute = DEMO_ROUTES.WELCOME;

  await ctx.reply(TEXTS.DEMO_WELCOME, {
    parse_mode: 'HTML',
    reply_markup: startDemoKeyboard(),
  });
}

// ============================================
// PHOTO STEP
// ============================================

export async function handleDemoStartPhoto(ctx: MyContext): Promise<void> {
  if (ctx.callbackQuery) {
    await ctx.answerCallbackQuery();
  }

  if (!ctx.session.demoConstructorSession) {
    ctx.session.demoConstructorSession = {
      sessionId: uuidv4(),
      step: 'photo',
      generationCount: 0,
    };
  } else {
    ctx.session.demoConstructorSession.step = 'photo';
  }

  ctx.session.currentRoute = DEMO_ROUTES.WAITING_PHOTO;

  await ctx.reply(TEXTS.DEMO_UPLOAD_PHOTO, {
    parse_mode: 'HTML',
    reply_markup: backToMenuKeyboard(),
  });
}

export async function handleDemoPhoto(ctx: MyContext): Promise<void> {
  const photo = ctx.message?.photo;
  if (!photo || photo.length === 0) {
    await ctx.reply(TEXTS.ERROR_NO_PHOTO);
    return;
  }

  if (!ctx.session.demoConstructorSession) {
    ctx.session.demoConstructorSession = {
      sessionId: uuidv4(),
      step: 'photo',
      generationCount: 0,
    };
  }

  const session = ctx.session.demoConstructorSession;

  const largestPhoto = photo[photo.length - 1];
  const file = await ctx.api.getFile(largestPhoto.file_id);
  const photoUrl = `https://api.telegram.org/file/bot${ctx.api.token}/${file.file_path}`;

  session.photoUrl = photoUrl;
  session.photoFileId = largestPhoto.file_id;

  // Go directly to quick style selection (simplified flow)
  await showQuickStyleStep(ctx);
}

// ============================================
// SIMPLIFIED STYLE SELECTION
// ============================================

async function showQuickStyleStep(ctx: MyContext): Promise<void> {
  const session = ctx.session.demoConstructorSession;
  if (!session) return;

  session.step = 'quick_style';
  ctx.session.currentRoute = DEMO_ROUTES.VISUAL_STYLE;

  await ctx.reply(TEXTS.DEMO_STYLE_SELECTION, {
    parse_mode: 'HTML',
    reply_markup: quickStyleKeyboard(),
  });
}

// Handle skip style - go straight to product info
export async function handleDemoSkipStyle(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const session = ctx.session.demoConstructorSession;
  if (!session) {
    await ctx.reply(TEXTS.SESSION_EXPIRED);
    return;
  }

  // Use default values
  session.visualStyle = 'marketplace_premium';
  session.composition = 'max_large';
  session.atmosphere = 'no_effects';
  session.infographics = 'clean_ui';
  session.textStyle = 'facts_numbers';
  session.headline = 'largest';

  await showUserInputStep(ctx);
}

// ============================================
// INDIVIDUAL STYLE STEPS (for editing or advanced)
// ============================================

async function showCompositionStep(ctx: MyContext): Promise<void> {
  const session = ctx.session.demoConstructorSession;
  if (!session) return;

  session.step = 'composition';
  ctx.session.currentRoute = DEMO_ROUTES.COMPOSITION;

  await ctx.reply(`<b>Как подать товар?</b>`, {
    parse_mode: 'HTML',
    reply_markup: compositionKeyboard(),
  });
}

export async function handleDemoCompositionChoice(ctx: MyContext, choice: string): Promise<void> {
  await ctx.answerCallbackQuery();

  const session = ctx.session.demoConstructorSession;
  if (!session) {
    await ctx.reply(TEXTS.SESSION_EXPIRED);
    return;
  }

  session.composition = choice;

  // Check if we're in edit mode or initial flow
  if (session.step === 'edit_choice') {
    // Regenerate with new composition
    const user = await ctx.services.user.getUser(ctx.from!.id);
    if (user && user.credits >= CREDITS.CARD_GENERATION) {
      await generateDemoCard(ctx, user.id);
    } else {
      await showPaywall(ctx);
    }
  } else {
    await showVisualStyleStep(ctx);
  }
}

// Handle skip composition
export async function handleDemoSkipComposition(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  const session = ctx.session.demoConstructorSession;
  if (!session) return;

  session.composition = 'max_large'; // default
  await showVisualStyleStep(ctx);
}

async function showVisualStyleStep(ctx: MyContext): Promise<void> {
  const session = ctx.session.demoConstructorSession;
  if (!session) return;

  session.step = 'visual_style';
  ctx.session.currentRoute = DEMO_ROUTES.VISUAL_STYLE;

  await ctx.reply(`<b>Стиль карточки:</b>`, {
    parse_mode: 'HTML',
    reply_markup: visualStyleKeyboard(),
  });
}

export async function handleDemoVisualStyleChoice(ctx: MyContext, choice: string): Promise<void> {
  await ctx.answerCallbackQuery();

  const session = ctx.session.demoConstructorSession;
  if (!session) {
    await ctx.reply(TEXTS.SESSION_EXPIRED);
    return;
  }

  session.visualStyle = choice;

  // In simplified flow, go straight to product info after style selection
  if (session.step === 'quick_style' || session.step === 'visual_style') {
    // Set defaults for other options
    if (!session.composition) session.composition = 'max_large';
    if (!session.atmosphere) session.atmosphere = 'no_effects';
    if (!session.infographics) session.infographics = 'clean_ui';
    if (!session.textStyle) session.textStyle = 'facts_numbers';
    if (!session.headline) session.headline = 'largest';

    await showUserInputStep(ctx);
  } else {
    // In edit mode, regenerate
    const user = await ctx.services.user.getUser(ctx.from!.id);
    if (user && user.credits >= CREDITS.CARD_GENERATION) {
      await generateDemoCard(ctx, user.id);
    } else {
      await showPaywall(ctx);
    }
  }
}

// Handle skip visual style
export async function handleDemoSkipVisualStyle(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  const session = ctx.session.demoConstructorSession;
  if (!session) return;

  session.visualStyle = 'marketplace_premium'; // default
  await showAtmosphereStep(ctx);
}

async function showAtmosphereStep(ctx: MyContext): Promise<void> {
  const session = ctx.session.demoConstructorSession;
  if (!session) return;

  session.step = 'atmosphere';
  ctx.session.currentRoute = DEMO_ROUTES.ATMOSPHERE;

  await ctx.reply(`<b>Атмосфера:</b>`, {
    parse_mode: 'HTML',
    reply_markup: atmosphereKeyboard(),
  });
}

export async function handleDemoAtmosphereChoice(ctx: MyContext, choice: string): Promise<void> {
  await ctx.answerCallbackQuery();

  const session = ctx.session.demoConstructorSession;
  if (!session) {
    await ctx.reply(TEXTS.SESSION_EXPIRED);
    return;
  }

  session.atmosphere = choice;

  if (session.step === 'edit_choice') {
    const user = await ctx.services.user.getUser(ctx.from!.id);
    if (user && user.credits >= CREDITS.CARD_GENERATION) {
      await generateDemoCard(ctx, user.id);
    } else {
      await showPaywall(ctx);
    }
  } else {
    await showInfographicsStep(ctx);
  }
}

// Handle skip atmosphere
export async function handleDemoSkipAtmosphere(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  const session = ctx.session.demoConstructorSession;
  if (!session) return;

  session.atmosphere = 'no_effects'; // default
  await showInfographicsStep(ctx);
}

async function showInfographicsStep(ctx: MyContext): Promise<void> {
  const session = ctx.session.demoConstructorSession;
  if (!session) return;

  session.step = 'infographics';
  ctx.session.currentRoute = DEMO_ROUTES.INFOGRAPHICS;

  await ctx.reply(`<b>Инфографика:</b>`, {
    parse_mode: 'HTML',
    reply_markup: infographicsKeyboard(),
  });
}

export async function handleDemoInfographicsChoice(ctx: MyContext, choice: string): Promise<void> {
  await ctx.answerCallbackQuery();

  const session = ctx.session.demoConstructorSession;
  if (!session) {
    await ctx.reply(TEXTS.SESSION_EXPIRED);
    return;
  }

  session.infographics = choice;

  if (session.step === 'edit_choice') {
    const user = await ctx.services.user.getUser(ctx.from!.id);
    if (user && user.credits >= CREDITS.CARD_GENERATION) {
      await generateDemoCard(ctx, user.id);
    } else {
      await showPaywall(ctx);
    }
  } else {
    await showTextStyleStep(ctx);
  }
}

// Handle skip infographics
export async function handleDemoSkipInfographics(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  const session = ctx.session.demoConstructorSession;
  if (!session) return;

  session.infographics = 'clean_ui'; // default
  await showTextStyleStep(ctx);
}

async function showTextStyleStep(ctx: MyContext): Promise<void> {
  const session = ctx.session.demoConstructorSession;
  if (!session) return;

  session.step = 'text_style';
  ctx.session.currentRoute = DEMO_ROUTES.TEXT_STYLE;

  await ctx.reply(`<b>Стиль текста:</b>`, {
    parse_mode: 'HTML',
    reply_markup: textStyleKeyboard(),
  });
}

export async function handleDemoTextStyleChoice(ctx: MyContext, choice: string): Promise<void> {
  await ctx.answerCallbackQuery();

  const session = ctx.session.demoConstructorSession;
  if (!session) {
    await ctx.reply(TEXTS.SESSION_EXPIRED);
    return;
  }

  session.textStyle = choice;

  if (session.step === 'edit_choice') {
    const user = await ctx.services.user.getUser(ctx.from!.id);
    if (user && user.credits >= CREDITS.CARD_GENERATION) {
      await generateDemoCard(ctx, user.id);
    } else {
      await showPaywall(ctx);
    }
  } else {
    await showHeadlineStep(ctx);
  }
}

// Handle skip text style
export async function handleDemoSkipTextStyle(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  const session = ctx.session.demoConstructorSession;
  if (!session) return;

  session.textStyle = 'facts_numbers'; // default
  await showHeadlineStep(ctx);
}

async function showHeadlineStep(ctx: MyContext): Promise<void> {
  const session = ctx.session.demoConstructorSession;
  if (!session) return;

  session.step = 'headline';
  ctx.session.currentRoute = DEMO_ROUTES.HEADLINE;

  await ctx.reply(`<b>Заголовок:</b>`, {
    parse_mode: 'HTML',
    reply_markup: headlineKeyboard(),
  });
}

export async function handleDemoHeadlineChoice(ctx: MyContext, choice: string): Promise<void> {
  await ctx.answerCallbackQuery();

  const session = ctx.session.demoConstructorSession;
  if (!session) {
    await ctx.reply(TEXTS.SESSION_EXPIRED);
    return;
  }

  session.headline = choice;

  if (session.step === 'edit_choice') {
    const user = await ctx.services.user.getUser(ctx.from!.id);
    if (user && user.credits >= CREDITS.CARD_GENERATION) {
      await generateDemoCard(ctx, user.id);
    } else {
      await showPaywall(ctx);
    }
  } else {
    await showUserInputStep(ctx);
  }
}

// Handle skip headline
export async function handleDemoSkipHeadline(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  const session = ctx.session.demoConstructorSession;
  if (!session) return;

  session.headline = 'largest'; // default
  await showUserInputStep(ctx);
}

async function showUserInputStep(ctx: MyContext): Promise<void> {
  const session = ctx.session.demoConstructorSession;
  if (!session) return;

  session.step = 'user_input';
  ctx.session.currentRoute = DEMO_ROUTES.USER_INPUT;

  await ctx.reply(TEXTS.DEMO_PRODUCT_INFO, {
    parse_mode: 'HTML',
    reply_markup: backToMenuKeyboard(),
  });
}

// ============================================
// USER INPUT & GENERATION
// ============================================

export async function handleDemoUserInput(ctx: MyContext): Promise<void> {
  const text = ctx.message?.text;
  const session = ctx.session.demoConstructorSession;

  if (!session || !session.photoUrl) {
    await ctx.reply(TEXTS.SESSION_EXPIRED);
    return;
  }

  if (!text || !text.trim()) {
    await ctx.reply('Введите данные о товаре.');
    return;
  }

  const lines = text.trim().split('\n');
  session.productName = lines[0] || '';
  session.mainUSP = lines[1] || '';
  session.features = lines.slice(2).join(', ') || '';

  const user = await ctx.services.user.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  if (user.credits < CREDITS.CARD_GENERATION) {
    await ctx.reply(TEXTS.IMAGE_CARD_NO_CREDITS, {
      parse_mode: 'HTML',
      reply_markup: compactPackagesKeyboard(),
    });
    return;
  }

  await generateDemoCard(ctx, user.id);
}

function buildPromptFromChoices(session: DemoConstructorSession): string {
  const styles = FALLBACK_PROMPTS.DEMO_STYLE_DESCRIPTIONS;
  const parts: string[] = [];

  if (session.productName) {
    parts.push(`Product: ${session.productName}`);
  }
  if (session.mainUSP) {
    parts.push(`Main USP: ${session.mainUSP}`);
  }
  if (session.features) {
    parts.push(`Features: ${session.features}`);
  }

  if (session.composition && styles.composition[session.composition as keyof typeof styles.composition]) {
    parts.push(styles.composition[session.composition as keyof typeof styles.composition]);
  }
  if (session.visualStyle && styles.visualStyle[session.visualStyle as keyof typeof styles.visualStyle]) {
    parts.push(styles.visualStyle[session.visualStyle as keyof typeof styles.visualStyle]);
  }
  if (session.atmosphere && styles.atmosphere[session.atmosphere as keyof typeof styles.atmosphere]) {
    parts.push(styles.atmosphere[session.atmosphere as keyof typeof styles.atmosphere]);
  }
  if (session.infographics && styles.infographics[session.infographics as keyof typeof styles.infographics]) {
    parts.push(styles.infographics[session.infographics as keyof typeof styles.infographics]);
  }
  if (session.textStyle && styles.textStyle[session.textStyle as keyof typeof styles.textStyle]) {
    parts.push(styles.textStyle[session.textStyle as keyof typeof styles.textStyle]);
  }
  if (session.headline && styles.headline[session.headline as keyof typeof styles.headline]) {
    parts.push(styles.headline[session.headline as keyof typeof styles.headline]);
  }

  parts.push('Professional marketplace product card for WB/Ozon');
  parts.push('High quality, sales-optimized, ready for immediate use');
  parts.push('Russian text if any text needed');

  return parts.join('. ');
}

async function generateDemoCard(ctx: MyContext, userId: string): Promise<void> {
  const session = ctx.session.demoConstructorSession;
  if (!session || !session.photoUrl) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  session.step = 'generating';
  ctx.session.currentRoute = DEMO_ROUTES.GENERATING;

  await MessageManager.sendProcessing(ctx, TEXTS.CARD_GENERATING);

  try {
    const prompt = buildPromptFromChoices(session);

    const order = await ctx.services.order.createOrder(
      userId,
      'image_card',
      {
        photo_url: session.photoUrl,
        description: prompt,
        demo_mode: true,
        constructor_choices: {
          composition: session.composition,
          visualStyle: session.visualStyle,
          atmosphere: session.atmosphere,
          infographics: session.infographics,
          textStyle: session.textStyle,
          headline: session.headline,
        },
        user_input: {
          productName: session.productName,
          mainUSP: session.mainUSP,
          features: session.features,
        },
      },
      CREDITS.CARD_GENERATION
    );

    session.orderId = order.id;
    await ctx.services.order.updateOrder(order.id, { status: 'processing' });

    const result = await cardGenerator.generateCard({
      images: [{ url: session.photoUrl, description: session.productName || 'Product photo' }],
      userPrompt: prompt,
      slideNumber: 1,
      isFirstSlide: true,
      isEdit: false,
    });

    await MessageManager.deleteProcessing(ctx);

    if (result.success && result.imageBuffer && result.imageBuffer.length > 0) {
      session.lastGeneratedImage = result.imageBuffer;
      session.generationCount++;
      session.step = 'result';
      ctx.session.currentRoute = DEMO_ROUTES.RESULT;

      const imageUrl = await ctx.services.storage.uploadImage(result.imageBuffer, userId, order.id, 'card');
      session.lastGeneratedImageUrl = imageUrl ?? undefined;

      await ctx.replyWithPhoto(new InputFile(result.imageBuffer, 'card.jpg'), {
        caption: TEXTS.DEMO_RESULT,
        parse_mode: 'HTML',
        reply_markup: firstResultKeyboard(),
      });

      await ctx.services.order.updateOrder(order.id, {
        status: 'completed',
        output_data: { generated_image_url: imageUrl ?? undefined },
      });

      await ctx.services.user.updateUserCredits(userId, -CREDITS.CARD_GENERATION);
      await ctx.services.user.incrementCardsCreated(userId);
    } else {
      await ctx.reply(TEXTS.ERROR_GENERATION_FAILED, {
        parse_mode: 'HTML',
        reply_markup: backToMenuKeyboard(),
      });

      await ctx.services.order.updateOrder(order.id, {
        status: 'failed',
        output_data: { error: result.error || 'Unknown error' },
      });
    }
  } catch (error) {
    console.error('Demo card generation error:', error);
    await MessageManager.deleteProcessing(ctx);
    await ctx.reply(TEXTS.ERROR_GENERATION_FAILED, {
      parse_mode: 'HTML',
      reply_markup: backToMenuKeyboard(),
    });
  }
}

// ============================================
// POST-GENERATION ACTIONS
// ============================================

export async function handleDemoEditSubmission(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const session = ctx.session.demoConstructorSession;
  if (!session) {
    await ctx.reply(TEXTS.SESSION_EXPIRED);
    return;
  }

  session.step = 'edit_choice';
  ctx.session.currentRoute = DEMO_ROUTES.EDIT_CHOICE;

  await ctx.reply(TEXTS.DEMO_WHAT_TO_CHANGE, {
    parse_mode: 'HTML',
    reply_markup: editChoiceKeyboard(),
  });
}

export async function handleDemoEditComposition(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  const session = ctx.session.demoConstructorSession;
  if (!session) {
    await ctx.reply(TEXTS.SESSION_EXPIRED);
    return;
  }
  await showCompositionStep(ctx);
}

export async function handleDemoEditStyle(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  const session = ctx.session.demoConstructorSession;
  if (!session) {
    await ctx.reply(TEXTS.SESSION_EXPIRED);
    return;
  }
  await showVisualStyleStep(ctx);
}

export async function handleDemoEditInfographics(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  const session = ctx.session.demoConstructorSession;
  if (!session) {
    await ctx.reply(TEXTS.SESSION_EXPIRED);
    return;
  }
  await showInfographicsStep(ctx);
}

export async function handleDemoEditTexts(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  const session = ctx.session.demoConstructorSession;
  if (!session) {
    await ctx.reply(TEXTS.SESSION_EXPIRED);
    return;
  }
  await showTextStyleStep(ctx);
}

export async function handleDemoNewVariant(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const session = ctx.session.demoConstructorSession;
  if (!session || !session.photoUrl) {
    await ctx.reply(TEXTS.SESSION_EXPIRED);
    return;
  }

  const user = await ctx.services.user.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  if (user.credits < CREDITS.CARD_GENERATION) {
    await ctx.reply(TEXTS.IMAGE_CARD_NO_CREDITS, {
      parse_mode: 'HTML',
      reply_markup: compactPackagesKeyboard(),
    });
    return;
  }

  await generateDemoCard(ctx, user.id);
}

export async function handleDemoDownload(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const session = ctx.session.demoConstructorSession;
  if (!session || !session.lastGeneratedImage) {
    await ctx.reply('Изображение не найдено.');
    return;
  }

  await ctx.replyWithDocument(new InputFile(session.lastGeneratedImage, `card_${Date.now()}.jpg`), {
    caption: 'Ваша карточка в полном качестве',
  });
}

async function showPaywall(ctx: MyContext): Promise<void> {
  const session = ctx.session.demoConstructorSession;
  if (session) {
    session.step = 'paywall';
  }
  ctx.session.currentRoute = DEMO_ROUTES.PAYWALL;

  await ctx.reply(TEXTS.IMAGE_CARD_NO_CREDITS, {
    parse_mode: 'HTML',
    reply_markup: paywallKeyboard(),
  });
}

export async function showDemoPaywall(ctx: MyContext): Promise<void> {
  await showPaywall(ctx);
}
