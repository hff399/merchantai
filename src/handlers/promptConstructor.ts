/**
 * Prompt Constructor - Simple 3-step flow
 *
 * Flow:
 * 1. Upload 1-8 photos
 * 2. Enter product description (free form text)
 * 3. Generate card
 */

import { MyContext, DEMO_ROUTES } from '../types';
import { CALLBACKS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';
import { supabase } from '../services/supabase';
import { cardGenerator } from '../services/cardGenerator';
import { InputFile, InlineKeyboard } from 'grammy';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config';

const CARD_GENERATION_COST = 4;
const MAX_PHOTOS = 8;

// Re-export DEMO_ROUTES from types
export { DEMO_ROUTES };

// ============================================
// CALLBACKS
// ============================================

export const DEMO_CALLBACKS = {
  // Photo collection
  PHOTOS_DONE: 'demo_photos_done',

  // After generation
  NEW_VARIANT: 'demo_new_variant',
  DOWNLOAD: 'demo_download',
  RESET: 'demo_reset',

  // Legacy - keep for backward compatibility
  START_DEMO: 'demo_start',
  QUICK_DEMO: 'demo_quick_demo',
  UPLOAD_OWN: 'demo_upload_own',
  PRESET_PREMIUM_WB: 'demo_preset_premium_wb',
  PRESET_DARK_PREMIUM: 'demo_preset_dark_premium',
  PRESET_MINIMAL_WHITE: 'demo_preset_minimal_white',
  PRESET_ECO_NATURAL: 'demo_preset_eco_natural',
  PRESET_TECH_MODERN: 'demo_preset_tech_modern',
  PRESET_BRIGHT_COMMERCIAL: 'demo_preset_bright_commercial',
  EDIT_SUBMISSION: 'demo_edit_submission',
  ADVANCED_EDIT: 'demo_advanced_edit',
  EDIT_COMPOSITION: 'demo_edit_composition',
  EDIT_STYLE: 'demo_edit_style',
  EDIT_INFOGRAPHICS: 'demo_edit_infographics',
  EDIT_TEXTS: 'demo_edit_texts',
  COMP_MAX_LARGE: 'demo_comp_max_large',
  COMP_DYNAMIC: 'demo_comp_dynamic',
  COMP_STRICT: 'demo_comp_strict',
  COMP_VERTICAL: 'demo_comp_vertical',
  VS_MARKETPLACE: 'demo_vs_marketplace',
  VS_TECH: 'demo_vs_tech',
  VS_ECO: 'demo_vs_eco',
  VS_MINIMAL: 'demo_vs_minimal',
  VS_DARK: 'demo_vs_dark',
  VS_BRIGHT: 'demo_vs_bright',
  ATM_NONE: 'demo_atm_none',
  ATM_THEMATIC: 'demo_atm_thematic',
  ATM_HIGHLIGHTS: 'demo_atm_highlights',
  ATM_MOTION: 'demo_atm_motion',
  INF_CLEAN_UI: 'demo_inf_clean_ui',
  INF_LARGE_NUM: 'demo_inf_large_num',
  INF_MINIMAL: 'demo_inf_minimal',
  INF_SPECS: 'demo_inf_specs',
  TXT_FACTS: 'demo_txt_facts',
  TXT_SHORT: 'demo_txt_short',
  TXT_BENEFIT: 'demo_txt_benefit',
  TXT_TECH: 'demo_txt_tech',
  TXT_EMOTIONAL: 'demo_txt_emotional',
  HDL_LARGEST: 'demo_hdl_largest',
  HDL_SUBTITLE: 'demo_hdl_subtitle',
  HDL_MINIMAL: 'demo_hdl_minimal',
  HDL_NUMBER: 'demo_hdl_number',
} as const;

// ============================================
// KEYBOARDS
// ============================================

function getPhotosKeyboard(photoCount: number): InlineKeyboard {
  return new InlineKeyboard()
    .text(`✓ Готово (${photoCount} фото)`, DEMO_CALLBACKS.PHOTOS_DONE)
    .row()
    .text('Отмена', CALLBACKS.BACK_TO_MENU);
}

function getResultKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text('Ещё вариант', DEMO_CALLBACKS.NEW_VARIANT)
    .row()
    .text('Закончить', CALLBACKS.BACK_TO_MENU);
}

/**
 * Send full paywall message (same as packages button)
 */
async function sendPaywall(ctx: MyContext): Promise<void> {
  const paywallText = `<b>Тарифы</b>

⭐ <b>Starter</b> — <s>890 ₽</s> 590 ₽
15 генераций · ~39₽ / генерация
Базовый функционал для знакомства с ботом.
• Генерация карточек
• Редактирование результатов


✅ <b>Pro — популярный</b> — <s>1890 ₽</s> 1490 ₽
45 генераций · ~33₽ / генерация
Для тех, кто хочет получать <b>максимум качества</b>.
• Приоритетная поддержка
• Лучшее соотношение кол-во/цена


💎 <b>Big</b> — <s>5790 ₽</s> 4990 ₽
170 генераций · ~29₽ / генерация
• Всё то же, что в Pro
• На <b>17%</b> выгоднее, чем Pro
• В <b>4 раза</b> больше генераций — для тех, кому важен объём


<b>Enterprise</b> — от 10 000 ₽
Индивидуальные условия под большие объёмы.

<blockquote><b>Как считаются кредиты</b>
<i>4 токена = 1 генерация</i></blockquote>`;

  await ctx.reply(paywallText, {
    parse_mode: 'HTML',
    reply_markup: KeyboardBuilder.creditPackagesPaywall(),
  });
}

// ============================================
// PROMPT BUILDER
// ============================================

function buildPrompt(productInfo: string): string {
  return `Product: ${productInfo}
Style: Professional marketplace product card for WB/Ozon.
Product fills 85% of frame height.
Russian text on all badges.
Maximum 4 feature badges.
Clean modern design with premium typography.`;
}

// ============================================
// STEP 1: WELCOME - REQUEST PHOTOS
// ============================================

/**
 * Entry point - welcome and request photos
 */
export async function showDemoWelcome(ctx: MyContext): Promise<void> {
  // Initialize session with photos array
  ctx.session.demoConstructorSession = {
    sessionId: uuidv4(),
    step: 'photo',
    generationCount: 0,
  };

  // Initialize photos array in tempData
  ctx.session.tempData = ctx.session.tempData || {};
  ctx.session.tempData.demoPhotos = [];

  ctx.session.currentRoute = DEMO_ROUTES.WAITING_PHOTO;

  const welcomeText = `<b>MerchantAI — карточки для маркетплейсов</b>

Загрузите до ${MAX_PHOTOS} фото:
• Фото товара
• Стиль конкурентов
• Референсы для вдохновения
• Логотип бренда`;

  await ctx.reply(welcomeText, {
    parse_mode: 'HTML',
    reply_markup: new InlineKeyboard().text('Отмена', CALLBACKS.BACK_TO_MENU),
  });
}

// ============================================
// STEP 2: HANDLE PHOTO UPLOADS
// ============================================

/**
 * Handle photo upload
 */
export async function handleDemoPhoto(ctx: MyContext): Promise<void> {
  const photo = ctx.message?.photo;
  if (!photo || photo.length === 0) {
    await ctx.reply('Пожалуйста, отправьте фото.');
    return;
  }

  // Initialize session if needed
  if (!ctx.session.demoConstructorSession) {
    ctx.session.demoConstructorSession = {
      sessionId: uuidv4(),
      step: 'photo',
      generationCount: 0,
    };
  }

  // Initialize photos array
  if (!ctx.session.tempData) {
    ctx.session.tempData = {};
  }
  if (!ctx.session.tempData.demoPhotos) {
    ctx.session.tempData.demoPhotos = [];
  }

  const photos = ctx.session.tempData.demoPhotos as Array<{
    url: string;
    fileId: string;
  }>;

  if (photos.length >= MAX_PHOTOS) {
    await ctx.reply(`Максимум ${MAX_PHOTOS} фото. Нажмите "Готово".`);
    return;
  }

  // Get largest photo
  const largestPhoto = photo[photo.length - 1];
  const file = await ctx.api.getFile(largestPhoto.file_id);
  const photoUrl = `https://api.telegram.org/file/bot${ctx.api.token}/${file.file_path}`;

  console.log(`\n[PromptConstructor] ========== NEW PHOTO UPLOADED ==========`);
  console.log(`[PromptConstructor] Photo URL: ${photoUrl}`);
  console.log(`[PromptConstructor] File ID: ${largestPhoto.file_id}`);

  photos.push({
    url: photoUrl,
    fileId: largestPhoto.file_id,
  });

  console.log(`[PromptConstructor] Total photos: ${photos.length}`);
  console.log(`[PromptConstructor] ==========================================\n`);

  // Also store first photo URL in session for legacy compatibility
  if (photos.length === 1) {
    ctx.session.demoConstructorSession.photoUrl = photoUrl;
    ctx.session.demoConstructorSession.photoFileId = largestPhoto.file_id;
  }

  await ctx.reply(
    `Фото добавлено (${photos.length}/${MAX_PHOTOS})\n\nОтправьте ещё или нажмите "Готово"`,
    {
      parse_mode: 'HTML',
      reply_markup: getPhotosKeyboard(photos.length),
    }
  );
}

/**
 * Handle "photos done" callback - move to description step
 */
export async function handleDemoPhotosDone(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  // Debug logging
  console.log('[PromptConstructor] handleDemoPhotosDone called');
  console.log('[PromptConstructor] tempData:', JSON.stringify(ctx.session.tempData));
  console.log('[PromptConstructor] demoPhotos:', ctx.session.tempData?.demoPhotos);

  // Ensure tempData exists
  if (!ctx.session.tempData) {
    ctx.session.tempData = {};
  }

  const photos = (ctx.session.tempData.demoPhotos || []) as Array<{
    url: string;
    fileId: string;
  }>;

  console.log('[PromptConstructor] photos.length:', photos.length);

  if (!photos || photos.length === 0) {
    await ctx.reply('Сначала загрузите хотя бы одно фото.');
    return;
  }

  // Move to description step
  ctx.session.demoConstructorSession!.step = 'product_name';
  ctx.session.currentRoute = DEMO_ROUTES.PRODUCT_NAME;

  const text = `<b>Фото загружено</b>

Опишите что хотите получить:

<b>Структура промпта:</b>
1. Название товара
2. Расположение в кадре
3. Фон и стиль
4. Плашки с преимуществами
5. Цветовая гамма

<b>Пример:</b>
<code>Автомобильный пылесос Kitfort. Пылесос в центре, рядом насадки из комплекта. Фон тёмный, текстура карбона, лёгкие блики. Сверху заголовок в две строки. Слева плашки: компактный размер, мощное всасывание, работа от 12V. Справа бейдж с насадками. Стиль строгий: чёрный, красный, металлик.</code>`;

  await ctx.reply(text, {
    parse_mode: 'HTML',
    reply_markup: KeyboardBuilder.backToMenu(),
  });
}

// ============================================
// STEP 3: HANDLE PRODUCT DESCRIPTION INPUT
// ============================================

/**
 * Handle product description input - proceed to generation
 */
export async function handleProductNameInput(ctx: MyContext): Promise<void> {
  const text = ctx.message?.text;
  const session = ctx.session.demoConstructorSession;

  if (!session) {
    await ctx.reply('Сессия истекла. Начните заново с /start');
    return;
  }

  if (!text || !text.trim()) {
    await ctx.reply('Пожалуйста, введите описание товара.');
    return;
  }

  // Save product description
  session.productName = text.trim();

  // Proceed to generation
  await generateDemoCard(ctx);
}

// ============================================
// GENERATION
// ============================================

async function generateDemoCard(ctx: MyContext): Promise<void> {
  const session = ctx.session.demoConstructorSession;
  const photos = (ctx.session.tempData?.demoPhotos || []) as Array<{
    url: string;
    fileId: string;
  }>;

  if (!session || photos.length === 0) {
    await ctx.reply('Сессия истекла. Начните заново с /start');
    return;
  }

  // Build prompt from product description
  const prompt = buildPrompt(session.productName || 'Product');

  // Check credits
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply('Ошибка получения пользователя.');
    return;
  }

  if (user.credits < CARD_GENERATION_COST) {
    session.step = 'paywall';
    ctx.session.currentRoute = DEMO_ROUTES.PAYWALL;

    await sendPaywall(ctx);
    return;
  }

  session.step = 'generating';
  ctx.session.currentRoute = DEMO_ROUTES.GENERATING;

  // Config reference images are added as style examples
  const configReferences = config.media.referenceImages;

  console.log(`\n[PromptConstructor] ========== GENERATION START ==========`);
  console.log(`[PromptConstructor] Total uploaded photos: ${photos.length}`);
  console.log(`[PromptConstructor] - Config references: ${configReferences.length}`);
  console.log(`[PromptConstructor] Product: ${session.productName}`);
  console.log(`[PromptConstructor] Built prompt: ${prompt.substring(0, 300)}...`);

  await MessageManager.sendProcessing(ctx, `Создаю...`);

  try {
    // Create order
    const order = await supabase.createOrder(
      user.id,
      'image_card',
      {
        photos: photos.map((p) => p.url),
        prompt,
        reference_images: configReferences,
        product_name: session.productName,
      },
      CARD_GENERATION_COST
    );

    session.orderId = order.id;
    await supabase.updateOrder(order.id, { status: 'processing' });

    // Send all photos to cardGenerator
    const result = await cardGenerator.generateCard({
      images: photos.map((p, i) => ({
        url: p.url,
        description: `Photo ${i + 1}`,
      })),
      userPrompt: prompt,
      slideNumber: 1,
      isFirstSlide: true,
      isEdit: false,
      referenceImages: configReferences,
    });

    console.log(`[PromptConstructor] ==========================================\n`);

    await MessageManager.deleteProcessing(ctx);

    if (result.success && result.imageBuffer && result.imageBuffer.length > 0) {
      session.lastGeneratedImage = result.imageBuffer;
      session.generationCount++;
      session.step = 'result';
      ctx.session.currentRoute = DEMO_ROUTES.RESULT;

      // Upload to storage
      const imageUrl = await supabase.uploadImage(
        result.imageBuffer,
        user.id,
        order.id,
        'card'
      );
      session.lastGeneratedImageUrl = imageUrl || undefined;

      // Send result
      await ctx.replyWithPhoto(new InputFile(result.imageBuffer, 'card.jpg'), {
        caption: `<tg-emoji emoji-id="5199610880257435665">✅</tg-emoji> <b>Карточка готова</b>`,
        parse_mode: 'HTML',
      });

      // Send paywall as separate message
      await sendPaywall(ctx);

      // Update order
      await supabase.updateOrder(order.id, {
        status: 'completed',
        output_data: { generated_image_url: imageUrl ?? undefined },
      });

      // Deduct credits
      await supabase.updateUserCredits(user.id, -CARD_GENERATION_COST);
      await supabase.incrementCardsCreated(user.id);
    } else {
      await ctx.reply(
        `❌ Ошибка генерации: ${result.error || 'Неизвестная ошибка'}\n\nПопробуйте ещё раз.`,
        { reply_markup: getResultKeyboard() }
      );

      await supabase.updateOrder(order.id, {
        status: 'failed',
        output_data: { error: result.error || 'Unknown error' },
      });
    }
  } catch (error: any) {
    console.error('[PromptConstructor] Generation error:', error);
    await MessageManager.deleteProcessing(ctx);
    await ctx.reply(
      `❌ Ошибка: ${error.message || 'Неизвестная ошибка'}\n\nПопробуйте ещё раз.`,
      { reply_markup: KeyboardBuilder.backToMenu() }
    );
  }
}

// ============================================
// USER INPUT HANDLER (for text after result)
// ============================================

/**
 * Handle user text input - routes to appropriate step handler
 */
export async function handleDemoUserInput(ctx: MyContext): Promise<void> {
  const session = ctx.session.demoConstructorSession;
  const route = ctx.session.currentRoute;

  if (!session) {
    await ctx.reply('Сессия истекла. Начните заново с /start');
    return;
  }

  // Route to appropriate handler based on current step
  switch (route) {
    case DEMO_ROUTES.PRODUCT_NAME:
      await handleProductNameInput(ctx);
      break;
    case DEMO_ROUTES.USER_INPUT:
    case DEMO_ROUTES.RESULT:
    case DEMO_ROUTES.ADVANCED_EDIT:
      // After result - treat as edit request (regenerate with new prompt)
      await handleEditRequest(ctx);
      break;
    default:
      await ctx.reply('Пожалуйста, используйте кнопки для навигации.');
  }
}

/**
 * Handle edit request after generation
 */
async function handleEditRequest(ctx: MyContext): Promise<void> {
  const text = ctx.message?.text;
  const session = ctx.session.demoConstructorSession;
  const photos = (ctx.session.tempData?.demoPhotos || []) as Array<{
    url: string;
    fileId: string;
  }>;

  if (!session || photos.length === 0) {
    await ctx.reply('Сессия истекла. Начните заново с /start');
    return;
  }

  if (!text || !text.trim()) {
    await ctx.reply('Пожалуйста, введите описание изменений.');
    return;
  }

  // Build base prompt and append edit request
  const basePrompt = buildPrompt(session.productName || 'Product');
  const editPrompt = `${basePrompt}\n\nUser edit request: ${text.trim()}`;

  // Store for regeneration
  session.features = editPrompt;

  await generateDemoCardWithPrompt(ctx, editPrompt);
}

async function generateDemoCardWithPrompt(ctx: MyContext, prompt: string): Promise<void> {
  const session = ctx.session.demoConstructorSession;
  const photos = (ctx.session.tempData?.demoPhotos || []) as Array<{
    url: string;
    fileId: string;
  }>;

  if (!session || photos.length === 0) {
    await ctx.reply('Сессия истекла. Начните заново с /start');
    return;
  }

  // Check credits
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply('Ошибка получения пользователя.');
    return;
  }

  if (user.credits < CARD_GENERATION_COST) {
    session.step = 'paywall';
    ctx.session.currentRoute = DEMO_ROUTES.PAYWALL;

    await sendPaywall(ctx);
    return;
  }

  session.step = 'generating';
  ctx.session.currentRoute = DEMO_ROUTES.GENERATING;

  const configReferences = config.media.referenceImages;

  await MessageManager.sendProcessing(ctx, `Создаю...`);

  try {
    const order = await supabase.createOrder(
      user.id,
      'image_card',
      {
        photos: photos.map((p) => p.url),
        prompt,
        reference_images: configReferences,
      },
      CARD_GENERATION_COST
    );

    session.orderId = order.id;
    await supabase.updateOrder(order.id, { status: 'processing' });

    const result = await cardGenerator.generateCard({
      images: photos.map((p, i) => ({
        url: p.url,
        description: `Photo ${i + 1}`,
      })),
      userPrompt: prompt,
      slideNumber: 1,
      isFirstSlide: true,
      isEdit: true,
      referenceImages: configReferences,
    });

    await MessageManager.deleteProcessing(ctx);

    if (result.success && result.imageBuffer && result.imageBuffer.length > 0) {
      session.lastGeneratedImage = result.imageBuffer;
      session.generationCount++;
      session.step = 'result';
      ctx.session.currentRoute = DEMO_ROUTES.RESULT;

      const imageUrl = await supabase.uploadImage(
        result.imageBuffer,
        user.id,
        order.id,
        'card'
      );
      session.lastGeneratedImageUrl = imageUrl || undefined;

      await ctx.replyWithPhoto(new InputFile(result.imageBuffer, 'card.jpg'), {
        caption: `<tg-emoji emoji-id="5199610880257435665">✅</tg-emoji> <b>Новый вариант готов</b>`,
        parse_mode: 'HTML',
      });

      // Send paywall as separate message
      await sendPaywall(ctx);

      await supabase.updateOrder(order.id, {
        status: 'completed',
        output_data: { generated_image_url: imageUrl ?? undefined },
      });

      await supabase.updateUserCredits(user.id, -CARD_GENERATION_COST);
      await supabase.incrementCardsCreated(user.id);
    } else {
      await ctx.reply(
        `❌ Ошибка генерации: ${result.error || 'Неизвестная ошибка'}\n\nПопробуйте ещё раз.`,
        { reply_markup: getResultKeyboard() }
      );

      await supabase.updateOrder(order.id, {
        status: 'failed',
        output_data: { error: result.error || 'Unknown error' },
      });
    }
  } catch (error: any) {
    console.error('[PromptConstructor] Generation error:', error);
    await MessageManager.deleteProcessing(ctx);
    await ctx.reply(
      `❌ Ошибка: ${error.message || 'Неизвестная ошибка'}\n\nПопробуйте ещё раз.`,
      { reply_markup: KeyboardBuilder.backToMenu() }
    );
  }
}

// ============================================
// POST-GENERATION HANDLERS
// ============================================

export async function handleDemoNewVariant(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const session = ctx.session.demoConstructorSession;
  const photos = ctx.session.tempData?.demoPhotos as Array<{
    url: string;
    fileId: string;
  }>;

  if (!session || !photos || photos.length === 0) {
    await ctx.reply('Сессия истекла. Начните заново с /start');
    return;
  }

  await generateDemoCard(ctx);
}

export async function handleDemoDownload(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const session = ctx.session.demoConstructorSession;
  if (!session || !session.lastGeneratedImage) {
    await ctx.reply('Изображение не найдено.');
    return;
  }

  await ctx.replyWithDocument(
    new InputFile(session.lastGeneratedImage, `card_${Date.now()}.jpg`),
    { caption: 'Ваша карточка в полном качестве' }
  );
}

export async function handleDemoReset(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  await showDemoWelcome(ctx);
}

export async function showDemoPaywall(ctx: MyContext): Promise<void> {
  const session = ctx.session.demoConstructorSession;
  if (session) {
    session.step = 'paywall';
  }
  ctx.session.currentRoute = DEMO_ROUTES.PAYWALL;

  await sendPaywall(ctx);
}

// ============================================
// LEGACY HANDLERS (keep for backward compatibility)
// ============================================

export async function handleDemoStartPhoto(ctx: MyContext): Promise<void> {
  await showDemoWelcome(ctx);
}

export async function handleQuickDemo(ctx: MyContext): Promise<void> {
  if (ctx.callbackQuery) {
    await ctx.answerCallbackQuery();
  }
  await showDemoWelcome(ctx);
}

export async function handleUploadOwn(ctx: MyContext): Promise<void> {
  if (ctx.callbackQuery) {
    await ctx.answerCallbackQuery();
  }
  await showDemoWelcome(ctx);
}

export async function handleStylePresetChoice(
  ctx: MyContext,
  _preset: string
): Promise<void> {
  await ctx.answerCallbackQuery();
  await showDemoWelcome(ctx);
}

// Legacy handlers that do nothing now
export async function handleDemoEditSubmission(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  await ctx.reply('Отправьте текст для редактирования карточки.');
}

export async function handleDemoAdvancedEdit(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  await ctx.reply('Отправьте текст для редактирования карточки.');
}

export async function handleDemoEditComposition(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
}

export async function handleDemoCompositionChoice(
  ctx: MyContext,
  _choice: string
): Promise<void> {
  await ctx.answerCallbackQuery();
}

export async function handleDemoEditStyle(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
}

export async function handleDemoVisualStyleChoice(
  ctx: MyContext,
  _choice: string
): Promise<void> {
  await ctx.answerCallbackQuery();
}

export async function handleDemoEditInfographics(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
}

export async function handleDemoInfographicsChoice(
  ctx: MyContext,
  _choice: string
): Promise<void> {
  await ctx.answerCallbackQuery();
}

export async function handleDemoEditTexts(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
}

export async function handleDemoTextStyleChoice(
  ctx: MyContext,
  _choice: string
): Promise<void> {
  await ctx.answerCallbackQuery();
}

export async function handleDemoAtmosphereChoice(
  ctx: MyContext,
  _choice: string
): Promise<void> {
  await ctx.answerCallbackQuery();
}

export async function handleDemoHeadlineChoice(
  ctx: MyContext,
  _choice: string
): Promise<void> {
  await ctx.answerCallbackQuery();
}
