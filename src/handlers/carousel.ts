import { MyContext, ROUTES, CarouselSlide, ImageInput } from '../types';
import { TEXTS, CALLBACKS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';
import { supabase } from '../services/supabase';
import { cardGenerator } from '../services/cardGenerator';
import { contextEngine } from '../services/contextEngine';
import { openai, isSimpleEditInstruction } from '../services/openai';
import { InputFile, InlineKeyboard } from 'grammy';
import { v4 as uuidv4 } from 'uuid';

const CARD_GENERATION_COST = 4; // Credits per card
const MAX_INPUT_IMAGES = 8;
const LOCK_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

// ============================================
// SESSION LOCKING
// ============================================

/**
 * Check if session is locked for generation
 * Auto-unlocks stale locks (>5 minutes)
 */
function isSessionLocked(session: MyContext['session']['carouselSession']): boolean {
  if (!session || !session.isGenerating) return false;

  // Auto-unlock stale locks
  if (session.generationStartedAt) {
    const started = new Date(session.generationStartedAt).getTime();
    const now = Date.now();
    if (now - started > LOCK_TIMEOUT_MS) {
      return false; // Lock expired
    }
  }
  return true;
}

// ============================================
// CAROUSEL KEYBOARDS
// ============================================

function getCarouselSessionKeyboard(): InlineKeyboard {
  const keyboard = new InlineKeyboard();

  keyboard
    .text('Ещё вариант', CALLBACKS.CAROUSEL_REGENERATE)
    .text('След. слайд', CALLBACKS.CAROUSEL_NEXT_SLIDE)
    .row()
    .text('Закончить', CALLBACKS.CAROUSEL_FINISH);

  return keyboard;
}

function getImageCollectionKeyboard(imageCount: number): InlineKeyboard {
  const keyboard = new InlineKeyboard();

  if (imageCount > 0) {
    keyboard
      .text('Готово', CALLBACKS.CAROUSEL_IMAGES_DONE)
      .row();
  }

  keyboard.text('Отмена', CALLBACKS.BACK_TO_MENU);

  return keyboard;
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

  const sessionId = uuidv4();

  // Initialize new carousel session
  ctx.session.currentRoute = ROUTES.CAROUSEL_WAITING_PHOTO;
  ctx.session.carouselSession = {
    sessionId,
    inputImages: [],
    originalImageUrl: '',
    currentSlideNumber: 1,
    slides: [],
    generationCount: 0,
    isCollectingImages: true,
    collectedImagesCount: 0,
  };

  // Initialize ContextEngine session for smart context management
  contextEngine.getSession(sessionId, String(ctx.from!.id));
  console.log(`[Carousel] Initialized ContextEngine session: ${sessionId}`);

  const text = `<b>Создание карточки / карусели</b>

<b>Загрузите изображения</b> (до ${MAX_INPUT_IMAGES} штук):

<b>Обязательно:</b>
• Фото товара — основа для карточки

<b>Опционально:</b>
• Референс стиля — если хотите похожий дизайн
• Примеры инфографики — для вдохновения
• Логотип бренда
• Референс фона

<i>Подсказка: добавьте подпись к фото, чтобы указать его роль:
"товар", "стиль", "фон", "лого", "пример"</i>

Отправьте фото по одному или несколько сразу`;

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
    await ctx.reply('Пожалуйста, отправьте фото.');
    return;
  }

  // Check if session is locked
  if (isSessionLocked(ctx.session.carouselSession)) {
    await ctx.reply('Генерация уже идёт. Пожалуйста, подождите завершения.');
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

  // Block photos if collection phase is over (user already clicked "Готово")
  if (session.isCollectingImages === false) {
    await ctx.reply(
      '<b>Добавление фото завершено</b>\n\n' +
      'Вы можете редактировать карточку текстом или использовать кнопки.\n\n' +
      '<i>Чтобы добавить новые фото, начните новую сессию командой /start</i>',
      { parse_mode: 'HTML' }
    );
    return;
  }

  // Check max images limit
  if (session.inputImages.length >= MAX_INPUT_IMAGES) {
    await ctx.reply(`Максимум ${MAX_INPUT_IMAGES} изображений. Нажмите "Готово" чтобы продолжить.`, {
      reply_markup: getImageCollectionKeyboard(session.inputImages.length),
    });
    return;
  }

  // Get the largest photo
  const largestPhoto = photo[photo.length - 1];
  const file = await ctx.api.getFile(largestPhoto.file_id);
  const photoUrl = `https://api.telegram.org/file/bot${ctx.api.token}/${file.file_path}`;

  // Get user's caption as description
  const userCaption = ctx.message.caption;

  // Register image with ContextEngine (handles GPT Vision analysis)
  await ctx.api.sendChatAction(ctx.chat!.id, 'typing');

  const ctxSession = contextEngine.getSession(session.sessionId, String(ctx.from!.id));
  const registeredImage = await contextEngine.registerImage(
    ctxSession,
    photoUrl,
    largestPhoto.file_id,
    userCaption
  );

  const caption = userCaption || registeredImage.description;
  const detectedRole = registeredImage.role;

  console.log(`[Carousel] Registered in ContextEngine: ${registeredImage.id}`);
  console.log(`[Carousel] Role: ${detectedRole}, Description: ${caption?.substring(0, 50)}...`);

  const imageIndex = session.inputImages.length;

  // Add to input images
  const imageInput: ImageInput = {
    url: photoUrl,
    fileId: largestPhoto.file_id,
    description: caption || undefined,
    detectedRole: detectedRole as any, // Role detected by GPT
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
  let confirmText = `Фото добавлено (${session.inputImages.length}/${MAX_INPUT_IMAGES})`;
  if (caption) {
    confirmText += `\n<i>${caption.substring(0, 50)}${caption.length > 50 ? '...' : ''}</i>`;
    if (detectedRole && detectedRole !== 'unknown') {
      const roleNames: Record<string, string> = {
        product: 'Товар',
        logo: 'Логотип',
        style_reference: 'Референс стиля',
        background: 'Фон',
        detail: 'Деталь',
      };
      confirmText += `\n<i>Определено: ${roleNames[detectedRole] || detectedRole}</i>`;
    }
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
    await ctx.reply('Сначала отправьте хотя бы одно фото товара.', {
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
    return `${i + 1}. ${desc}`;
  }).join('\n');

  const promptExample = `<b>Структура промпта:</b>
1. Название товара
2. Расположение в кадре
3. Фон и стиль
4. Плашки с преимуществами
5. Цветовая гамма

<b>Пример:</b>
<code>Автомобильный пылесос Kitfort. Пылесос в центре, рядом насадки из комплекта. Фон тёмный, текстура карбона, лёгкие блики. Сверху заголовок в две строки. Слева плашки: компактный размер, мощное всасывание, работа от 12V. Справа бейдж с насадками. Стиль строгий: чёрный, красный, металлик.</code>`;

  await ctx.reply(
    `<b>Загружено ${session.inputImages.length} изображений:</b>\n\n${imagesSummary}\n\n` +
    `Опишите что хотите получить:\n\n` +
    promptExample,
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
    await ctx.reply('Сначала отправьте фото товара.');
    return;
  }

  // Check if session is locked
  if (isSessionLocked(session)) {
    await ctx.reply('Генерация уже идёт. Пожалуйста, подождите завершения.');
    return;
  }

  if (!text || !text.trim()) {
    await ctx.reply('Пожалуйста, отправьте описание для карточки.');
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

  // Lock session for generation
  session.isGenerating = true;
  session.generationStartedAt = new Date().toISOString();

  // Determine if this is an edit (we have both a generated image AND an edit request)
  const isEdit = !!session.currentImageUrl && !!session.currentEditRequest;

  const modeText = isEdit ? 'Редактирую' : 'Создаю';
  await MessageManager.sendProcessing(ctx, `${modeText}...`);
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
    let referenceImagesForGenerator: string[] = [];
    let promptForGenerator: string;
    let styleReferenceHint: string | undefined;

    // Get ContextEngine session for smart image resolution
    const ctxSession = contextEngine.getSession(session.sessionId, String(ctx.from!.id));

    if (isEdit && session.currentImageUrl && session.currentEditRequest) {
      // EDIT MODE: Use ContextEngine to analyze intent and find relevant images
      console.log(`\n[Carousel] ========== EDIT MODE WITH CONTEXT ==========`);

      // Analyze what the user wants to change
      const intent = await contextEngine.analyzeIntent(ctxSession, session.currentEditRequest);

      console.log(`[Carousel] Edit intent: ${intent.action}`);
      console.log(`[Carousel] References style: ${intent.styleReferences.length > 0 ? 'YES' : 'NO'}`);

      // Always include product + current card
      imagesForGenerator = [
        {
          url: session.originalImageUrl,
          description: 'IMAGE 1: Original product photo - keep product EXACTLY as shown',
        },
        {
          url: session.currentImageUrl,
          description: 'IMAGE 2: Current card design - apply edits to this',
        },
      ];

      // If user references style, include style images from context
      if (intent.styleReferences.length > 0) {
        for (const refId of intent.styleReferences) {
          const img = ctxSession.images.get(refId);
          if (img) {
            referenceImagesForGenerator.push(img.url);
            console.log(`[Carousel] Including style ref from context: ${img.id}`);
          }
        }
        styleReferenceHint = `User references ${intent.styleReferences.length} style image(s) from earlier. MATCH THAT VISUAL STYLE for the edits.`;
      } else {
        // Check if ANY style references exist in session - user might be implicitly referencing
        const allStyleRefs = Array.from(ctxSession.images.values())
          .filter(img => img.role === 'style_reference' && img.isActive);
        if (allStyleRefs.length > 0) {
          referenceImagesForGenerator = allStyleRefs.map(img => img.url);
          styleReferenceHint = `Session has ${allStyleRefs.length} style reference(s). Apply that style to the edits.`;
          console.log(`[Carousel] Auto-including ${allStyleRefs.length} style refs from session`);
        }
      }

      promptForGenerator = session.currentEditRequest;
      console.log(`[Carousel] ==========================================\n`);
    } else {
      // FIRST GENERATION: SEPARATE product images from style references
      const productImages = session.inputImages.filter(img =>
        img.detectedRole !== 'style_reference' &&
        img.detectedRole !== 'background'
      );
      const styleRefImages = session.inputImages.filter(img =>
        img.detectedRole === 'style_reference'
      );
      const backgroundImages = session.inputImages.filter(img =>
        img.detectedRole === 'background'
      );

      console.log(`\n[Carousel] ========== IMAGE SEPARATION ==========`);
      console.log(`[Carousel] Total input images: ${session.inputImages.length}`);
      console.log(`[Carousel] Product images: ${productImages.length}`);
      console.log(`[Carousel] Style reference images: ${styleRefImages.length}`);
      console.log(`[Carousel] Background images: ${backgroundImages.length}`);
      session.inputImages.forEach((img, i) => {
        console.log(`[Carousel]   ${i + 1}. [${img.detectedRole || 'unknown'}] ${img.description?.substring(0, 50) || '(no desc)'}...`);
      });
      console.log(`[Carousel] ==========================================\n`);

      // Use only product images as main images
      imagesForGenerator = productImages.map((img) => ({
        url: img.url,
        description: img.description,
      }));

      // If no product images detected, use ALL images as fallback
      // (GPT Vision may have misclassified products as style_reference)
      if (imagesForGenerator.length === 0) {
        console.log(`[Carousel] No product images detected, using ALL ${session.inputImages.length} images as fallback`);
        imagesForGenerator = session.inputImages.map((img) => ({
          url: img.url,
          description: img.description,
        }));
        // Clear style references since we're using all images as products
        referenceImagesForGenerator = [];
      }

      // Style references go to referenceImages array
      if (styleRefImages.length > 0) {
        referenceImagesForGenerator = styleRefImages.map(img => img.url);
        styleReferenceHint = `User provided ${styleRefImages.length} style reference image(s). Match that visual style closely.`;
      }

      promptForGenerator = session.currentPrompt;

      // Add previous slide as style reference for subsequent slides
      if (session.currentSlideNumber > 1 && session.styleReference) {
        referenceImagesForGenerator.push(session.styleReference.imageUrl);
        styleReferenceHint = styleReferenceHint || session.styleReference.styleDescription;
      }
    }

    console.log(`[Carousel] Sending to cardGenerator:`);
    console.log(`[Carousel]   Product images: ${imagesForGenerator.length}`);
    console.log(`[Carousel]   Reference images: ${referenceImagesForGenerator.length}`);
    console.log(`[Carousel]   Style hint: ${styleReferenceHint || '(none)'}`);
    console.log(`[Carousel]   Slide number: ${session.currentSlideNumber}`);

    let result;

    // FAST PATH FOR SUBSEQUENT SLIDES (2, 3, etc.): Skip intent classification
    // Structure: 1) product, 2) previous slide, 3) first slide (for slide 3+)
    if (session.currentSlideNumber > 1 && !isEdit && session.styleReference) {
      console.log(`[Carousel] FAST PATH: Slide ${session.currentSlideNumber} - skipping intent classification`);

      // Build reference images in correct order
      const slideReferenceImages: string[] = [];

      // For slide 3+: add previous slide first, then first slide
      if (session.currentSlideNumber > 2 && session.slides.length >= 1) {
        const previousSlide = session.slides[session.slides.length - 1];
        if (previousSlide?.imageUrl) {
          slideReferenceImages.push(previousSlide.imageUrl);
          console.log(`[Carousel] Added previous slide (${session.currentSlideNumber - 1}) as reference`);
        }
      }

      // Always add first slide as style reference
      slideReferenceImages.push(session.styleReference.imageUrl);
      console.log(`[Carousel] Added first slide as style reference`);

      // Build images: product first, then user's original images
      const imagesForSubsequentSlide = [
        {
          url: session.originalImageUrl,
          description: 'IMAGE 1: Original product photo - keep product EXACTLY as shown',
        },
        ...imagesForGenerator.filter(img => img.url !== session.originalImageUrl),
      ];

      console.log(`[Carousel] Sending ${imagesForSubsequentSlide.length} product images + ${slideReferenceImages.length} reference images`);

      result = await cardGenerator.generateCard({
        images: imagesForSubsequentSlide,
        userPrompt: promptForGenerator,
        slideNumber: session.currentSlideNumber,
        isFirstSlide: false,
        isEdit: false,
        styleReference: session.styleReference.styleDescription,
        referenceImages: slideReferenceImages,
        previousSlides: session.slides.map(s => ({
          prompt: s.prompt,
          imageUrl: s.imageUrl,
        })),
      });
    } else if (isEdit && session.currentImageUrl && isSimpleEditInstruction(promptForGenerator)) {
      // QUICK_EDIT MODE: Simple edits like "сделай больше", "подвинь влево"
      console.log(`[Carousel] Using QUICK_EDIT mode (FAST) - simple edit detected`);
      console.log(`[Carousel] Edit instruction: "${promptForGenerator}"`);

      result = await cardGenerator.quickEdit(
        session.currentImageUrl,
        promptForGenerator
      );
    } else if (session.currentSlideNumber === 1 && !isEdit) {
      // FIRST SLIDE: Do intent classification for smart routing
      const intentClassification = await openai.classifyImageIntent({
        userPrompt: promptForGenerator,
        hasProductImages: imagesForGenerator.length > 0,
        hasStyleReference: referenceImagesForGenerator.length > 0,
        hasExistingCard: isEdit,
      });

      console.log(`\n[Carousel] ========== INTENT CLASSIFICATION ==========`);
      console.log(`[Carousel] Intent: ${intentClassification.intent}`);
      console.log(`[Carousel] Confidence: ${intentClassification.confidence}`);
      console.log(`[Carousel] Reasoning: ${intentClassification.reasoning}`);
      console.log(`[Carousel] ==========================================\n`);

      if (intentClassification.intent === 'template_copy' && referenceImagesForGenerator.length > 0 && imagesForGenerator.length > 0) {
        console.log(`[Carousel] Using COPY_CARD mode (FAST) - replacing product in template`);

        result = await cardGenerator.copyCard({
          templateImageUrl: referenceImagesForGenerator[0],
          productImageUrl: imagesForGenerator[0].url,
          modifications: intentClassification.modifications,
        });
      } else {
        console.log(`[Carousel] Using STANDARD mode (${intentClassification.intent})`);

        result = await cardGenerator.generateCard({
          images: imagesForGenerator,
          userPrompt: promptForGenerator,
          slideNumber: session.currentSlideNumber,
          isFirstSlide: true,
          isEdit: false,
          styleReference: styleReferenceHint,
          referenceImages: referenceImagesForGenerator,
          previousSlides: [],
        });
      }
    } else {
      // EDIT MODE or fallback: standard generation
      console.log(`[Carousel] Using STANDARD mode (edit or fallback)`);

      result = await cardGenerator.generateCard({
        images: imagesForGenerator,
        userPrompt: promptForGenerator,
        slideNumber: session.currentSlideNumber,
        isFirstSlide: session.currentSlideNumber === 1 && !isEdit,
        isEdit,
        styleReference: styleReferenceHint || session.styleReference?.styleDescription,
        referenceImages: referenceImagesForGenerator,
        previousSlides: session.slides.map(s => ({
          prompt: s.prompt,
          imageUrl: s.imageUrl,
        })),
      });
    }

    await MessageManager.deleteProcessing(ctx);

    if (result.success && result.imageBuffer) {
      // Upload to storage
      const imageUrl = await supabase.uploadImage(result.imageBuffer, userId, order.id, 'card');

      // Store current generated image
      session.currentImageUrl = imageUrl || undefined;
      session.currentImageBuffer = result.imageBuffer;
      session.generationCount++;

      // Save variant for reference selection (for slide 1)
      if (session.currentSlideNumber === 1 && imageUrl) {
        if (!session.currentSlideVariants) {
          session.currentSlideVariants = [];
        }
        session.currentSlideVariants.push({
          imageUrl: imageUrl,
          prompt: session.currentPrompt || '',
          generatedAt: new Date().toISOString(),
        });
        console.log(`[Carousel] Saved variant ${session.currentSlideVariants.length} for slide 1`);
      }

      // CRITICAL: Update style reference for slide 1 (used by subsequent slides)
      // This runs on EVERY slide 1 generation/regeneration to capture current style
      if (session.currentSlideNumber === 1 && imageUrl) {
        try {
          console.log(`[Carousel] Analyzing slide 1 style for consistency in subsequent slides...`);
          const styleAnalysis = await openai.analyzeStyleReference(imageUrl);
          session.styleReference = {
            imageUrl: imageUrl,
            styleDescription: styleAnalysis || `Style from slide 1: ${session.currentPrompt}`,
          };
          console.log(`[Carousel] Style reference updated (${session.styleReference.styleDescription.length} chars)`);
        } catch (err) {
          console.warn(`[Carousel] Style analysis failed, using basic reference:`, err);
          session.styleReference = {
            imageUrl: imageUrl,
            styleDescription: `Match the visual style of slide 1 exactly: colors, fonts, badges, layout. Prompt: ${session.currentPrompt}`,
          };
        }
      }

      // Clear edit request after successful generation
      session.currentEditRequest = undefined;

      // Send result
      const sentMessage = await ctx.replyWithPhoto(new InputFile(result.imageBuffer, `slide_${session.currentSlideNumber}.png`), {
        caption: `<tg-emoji emoji-id="5199610880257435665">✅</tg-emoji> <b>Слайд ${session.currentSlideNumber} готов!</b>`,
        parse_mode: 'HTML',
        reply_markup: getCarouselSessionKeyboard(),
      });

      // Store file_id for quick access
      if (sentMessage.photo) {
        session.currentImageFileId = sentMessage.photo[sentMessage.photo.length - 1].file_id;

        // Also update the variant with file_id
        if (session.currentSlideNumber === 1 && session.currentSlideVariants && session.currentSlideVariants.length > 0) {
          const lastVariant = session.currentSlideVariants[session.currentSlideVariants.length - 1];
          lastVariant.imageFileId = sentMessage.photo[sentMessage.photo.length - 1].file_id;
        }
      }

      // Update order with generated prompt
      await supabase.updateOrder(order.id, {
        status: 'completed',
        output_data: {
          image_url: imageUrl ?? undefined,
          slide_number: session.currentSlideNumber,
          generated_prompt: result.generatedPrompt ?? undefined,
        },
      });

      // Deduct credits
      await supabase.updateUserCredits(userId, -CARD_GENERATION_COST);
      await supabase.incrementCardsCreated(userId);

      // Unlock session after successful generation
      session.isGenerating = false;
      session.generationStartedAt = undefined;

    } else {
      await ctx.reply(
        `Ошибка генерации:\n${result.error || 'Неизвестная ошибка'}\n\nПопробуйте ещё раз.`,
        {
          parse_mode: 'HTML',
          reply_markup: KeyboardBuilder.backToMenu(),
        }
      );

      await supabase.updateOrder(order.id, {
        status: 'failed',
        output_data: {
          error: result.error || 'Unknown error',
          generated_prompt: result.generatedPrompt ?? undefined,
        },
      });
    }
  } catch (error: any) {
    console.error('Carousel generation error:', error);
    await MessageManager.deleteProcessing(ctx);
    await ctx.reply(
      `Ошибка генерации:\n${error.message || 'Неизвестная ошибка'}\n\nПопробуйте ещё раз.`,
      {
        parse_mode: 'HTML',
        reply_markup: KeyboardBuilder.backToMenu(),
      }
    );
  } finally {
    // Always unlock session in finally block
    if (session) {
      session.isGenerating = false;
      session.generationStartedAt = undefined;
    }
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
    await ctx.reply(
      'Сессия истекла или была повреждена.\n\n' +
      'Начните создание карточки заново.',
      {
        parse_mode: 'HTML',
        reply_markup: new InlineKeyboard()
          .text('Начать заново', CALLBACKS.IMAGE_CARD)
          .row()
          .text('В меню', CALLBACKS.BACK_TO_MENU),
      }
    );
    return;
  }

  // Check if session is locked
  if (isSessionLocked(session)) {
    await ctx.reply('Генерация уже идёт. Пожалуйста, подождите завершения.');
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
    await ctx.reply(
      'Сессия истекла или была повреждена.\n\n' +
      'Начните создание карточки заново.',
      {
        parse_mode: 'HTML',
        reply_markup: new InlineKeyboard()
          .text('Начать заново', CALLBACKS.IMAGE_CARD)
          .row()
          .text('В меню', CALLBACKS.BACK_TO_MENU),
      }
    );
    return;
  }

  // Check if user should select reference from multiple variants (only on slide 1 with multiple variants)
  if (session.currentSlideNumber === 1 && session.currentSlideVariants && session.currentSlideVariants.length > 1) {
    // Show reference selection UI
    ctx.session.currentRoute = ROUTES.CAROUSEL_SELECT_REFERENCE;

    // Build keyboard with variant options
    const keyboard = new InlineKeyboard();

    // Add option to use current (last generated) variant
    keyboard.text(`Использовать текущий вариант`, CALLBACKS.CAROUSEL_USE_CURRENT);
    keyboard.row();

    // Add options for other variants (if more than 2, show all)
    if (session.currentSlideVariants.length <= 4) {
      // Show all variants as individual buttons
      for (let i = 0; i < session.currentSlideVariants.length - 1; i++) {
        keyboard.text(`Вариант ${i + 1}`, `${CALLBACKS.CAROUSEL_SELECT_REF}${i}`);
      }
      keyboard.row();
    } else {
      // For many variants, show first 3 + current
      for (let i = 0; i < 3; i++) {
        keyboard.text(`Вар. ${i + 1}`, `${CALLBACKS.CAROUSEL_SELECT_REF}${i}`);
      }
      keyboard.row();
    }

    keyboard.text('❌ Отмена', CALLBACKS.BACK_TO_MENU);

    // Send all variants as a media group for easy comparison
    const mediaGroup = session.currentSlideVariants.map((variant, index) => ({
      type: 'photo' as const,
      media: variant.imageFileId || variant.imageUrl,
      caption: index === session.currentSlideVariants!.length - 1
        ? `Вариант ${index + 1} (текущий)`
        : `Вариант ${index + 1}`,
    }));

    try {
      await ctx.replyWithMediaGroup(mediaGroup);
    } catch (err) {
      console.warn(`[Carousel] Failed to send media group, continuing:`, err);
    }

    await ctx.reply(
      `<b>Выберите референс для карусели</b>\n\n` +
      `У вас есть <b>${session.currentSlideVariants.length}</b> вариант(а/ов) первого слайда.\n\n` +
      `Выбранный вариант станет <b>стилевым референсом</b> для всех последующих слайдов карусели.\n\n` +
      `<i>Стиль, цвета, шрифты и композиция будут автоматически применяться к слайдам 2, 3 и т.д.</i>`,
      {
        parse_mode: 'HTML',
        reply_markup: keyboard,
      }
    );
    return;
  }

  // Finalize current slide (no variant selection needed)
  await finalizeSlideAndProceed(ctx, session);
}

/**
 * Handle reference selection from variants
 */
export async function handleCarouselSelectReference(ctx: MyContext, variantIndex: number): Promise<void> {
  await ctx.answerCallbackQuery();

  const session = ctx.session.carouselSession;
  if (!session?.currentSlideVariants || variantIndex >= session.currentSlideVariants.length) {
    await ctx.reply('Ошибка выбора варианта. Попробуйте ещё раз.');
    return;
  }

  const selectedVariant = session.currentSlideVariants[variantIndex];

  // Update session with selected variant
  session.currentImageUrl = selectedVariant.imageUrl;
  session.currentImageFileId = selectedVariant.imageFileId;
  session.currentPrompt = selectedVariant.prompt;

  console.log(`[Carousel] User selected variant ${variantIndex + 1} as reference`);

  // Finalize and proceed
  await finalizeSlideAndProceed(ctx, session);
}

/**
 * Handle "use current variant" selection
 */
export async function handleCarouselUseCurrent(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const session = ctx.session.carouselSession;
  if (!session?.currentSlideVariants || session.currentSlideVariants.length === 0) {
    await ctx.reply('Ошибка. Попробуйте ещё раз.');
    return;
  }

  // Current variant is already set in session (last generated)
  console.log(`[Carousel] User selected current (last) variant as reference`);

  // Finalize and proceed
  await finalizeSlideAndProceed(ctx, session);
}

/**
 * Helper to finalize slide and proceed to next
 */
async function finalizeSlideAndProceed(ctx: MyContext, session: NonNullable<typeof ctx.session.carouselSession>): Promise<void> {
  if (!session.currentImageUrl || !session.currentPrompt) {
    await ctx.reply('Ошибка сессии. Начните заново.');
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

  // Set style reference from first slide - NO analysis, just use the image directly
  if (session.currentSlideNumber === 1) {
    session.styleReference = {
      imageUrl: session.currentImageUrl,
      styleDescription: `Match the visual style of slide 1 exactly: colors, fonts, badges, layout.`,
    };
    console.log(`[Carousel] Style reference set from slide 1 (no analysis)`);
  }

  // Clear variants after selection
  session.currentSlideVariants = undefined;

  // Prepare for next slide
  session.currentSlideNumber++;
  session.currentPrompt = undefined;
  session.currentImageUrl = undefined;
  session.currentImageFileId = undefined;
  session.currentImageBuffer = undefined;

  ctx.session.currentRoute = ROUTES.CAROUSEL_NEXT_SLIDE;

  // Ask for next slide prompt
  await ctx.reply(
    `<b>Слайд ${session.currentSlideNumber - 1} сохранён!</b>\n\n` +
    `Опишите <b>слайд ${session.currentSlideNumber}</b>:\n\n` +
    `<i>Стиль будет сохранён автоматически.</i>\n\n` +
    `<b>Пример для слайда:</b>\n` +
    `<code>Крупный план насадок. Плашки: турбощётка, щелевая насадка, мягкая щётка. Текст: "3 насадки в комплекте"</code>`,
    {
      parse_mode: 'HTML',
      reply_markup: new InlineKeyboard()
        .text('Закончить', CALLBACKS.CAROUSEL_FINISH)
        .row()
        .text('Отмена', CALLBACKS.BACK_TO_MENU),
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
    await ctx.reply(
      'Сессия истекла или была повреждена.\n\n' +
      'Начните создание карточки заново.',
      {
        parse_mode: 'HTML',
        reply_markup: new InlineKeyboard()
          .text('Начать заново', CALLBACKS.IMAGE_CARD)
          .row()
          .text('В меню', CALLBACKS.BACK_TO_MENU),
      }
    );
    return;
  }

  // Check if session is locked
  if (isSessionLocked(session)) {
    await ctx.reply('Генерация уже идёт. Пожалуйста, подождите завершения.');
    return;
  }

  if (!text || !text.trim()) {
    await ctx.reply('Пожалуйста, опишите следующий слайд.');
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
    await ctx.reply('Сессия не найдена.', {
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
    await ctx.reply('Нет сохранённых слайдов.', {
      reply_markup: KeyboardBuilder.mainMenu(),
    });
    return;
  }

  // Send summary
  let summaryText = `<tg-emoji emoji-id="5199610880257435665">✅</tg-emoji> <b>Карусель готова!</b>\n\n`;
  summaryText += `Всего слайдов: ${totalSlides}\n`;
  summaryText += `Генераций: ${session.generationCount}\n\n`;
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
    await ctx.reply(
      'Сессия истекла или была повреждена.\n\n' +
      'Начните создание карточки заново.',
      {
        parse_mode: 'HTML',
        reply_markup: new InlineKeyboard()
          .text('Начать заново', CALLBACKS.IMAGE_CARD)
          .row()
          .text('В меню', CALLBACKS.BACK_TO_MENU),
      }
    );
    return;
  }

  // Check if session is locked
  if (isSessionLocked(session)) {
    await ctx.reply('Генерация уже идёт. Пожалуйста, подождите завершения.');
    return;
  }

  if (!text || !text.trim()) {
    await ctx.reply('Пожалуйста, отправьте описание.');
    return;
  }

  // Save edit request (what to change) - original prompt stays intact
  session.currentEditRequest = text.trim();

  // Confirmation message when entering edit mode
  await ctx.reply('Редактирую карточку по вашему запросу...', { parse_mode: 'HTML' });

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