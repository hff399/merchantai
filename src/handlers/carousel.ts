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