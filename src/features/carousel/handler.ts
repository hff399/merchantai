/**
 * Carousel feature handler
 * Robust business logic for carousel/card generation
 */

import { InputFile } from 'grammy';
import { v4 as uuidv4 } from 'uuid';
import type { MyContext } from '../../bot/context';
import type { ImageInput, CarouselSlide } from '../../core/types';
import { ROUTES, TEXTS, CREDITS, LIMITS } from '../../core/constants';
import { carouselSessionKeyboard, imageCollectionKeyboard, nextSlideKeyboard } from './keyboards';
import { backToMenuKeyboard, compactPackagesKeyboard, errorKeyboard } from '../../bot/keyboards';
import { cardGenerator } from '../../services/cardGenerator';
import { MessageManager } from '../../utils/helpers';

// ============================================
// INITIALIZATION
// ============================================

export async function handleCarouselStart(ctx: MyContext, editMessage = false): Promise<void> {
  try {
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

    const text = `<b>Создание карточки</b>

Загрузите фото товара (до ${LIMITS.MAX_INPUT_IMAGES} штук).

<b>Обязательно:</b> фото товара
<b>Опционально:</b> референс стиля, логотип, примеры

<i>Добавьте подпись к фото для уточнения роли</i>`;

    if (editMessage && ctx.callbackQuery?.message) {
      try {
        await ctx.editMessageText(text, {
          parse_mode: 'HTML',
          reply_markup: imageCollectionKeyboard(0),
        });
      } catch {
        await ctx.reply(text, {
          parse_mode: 'HTML',
          reply_markup: imageCollectionKeyboard(0),
        });
      }
    } else {
      await ctx.reply(text, {
        parse_mode: 'HTML',
        reply_markup: imageCollectionKeyboard(0),
      });
    }
  } catch (error) {
    console.error('Error in handleCarouselStart:', error);
    await ctx.reply(TEXTS.ERROR_GENERAL, { reply_markup: backToMenuKeyboard() });
  }
}

// ============================================
// PHOTO HANDLING
// ============================================

export async function handleCarouselPhoto(ctx: MyContext): Promise<void> {
  try {
    const photo = ctx.message?.photo;
    if (!photo || photo.length === 0) {
      await ctx.reply(TEXTS.ERROR_NO_PHOTO);
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
      ctx.session.currentRoute = ROUTES.CAROUSEL_WAITING_PHOTO;
    }

    const session = ctx.session.carouselSession;

    // Check max images limit
    if (session.inputImages.length >= LIMITS.MAX_INPUT_IMAGES) {
      await ctx.reply(
        `Максимум ${LIMITS.MAX_INPUT_IMAGES} изображений. Нажмите «Готово».`,
        { reply_markup: imageCollectionKeyboard(session.inputImages.length) }
      );
      return;
    }

    // Get the largest photo
    const largestPhoto = photo[photo.length - 1];

    let photoUrl: string;
    try {
      const file = await ctx.api.getFile(largestPhoto.file_id);
      photoUrl = `https://api.telegram.org/file/bot${ctx.api.token}/${file.file_path}`;
    } catch (error) {
      console.error('Error getting file:', error);
      await ctx.reply('Не удалось загрузить фото. Попробуйте ещё раз.');
      return;
    }

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

    // Show confirmation
    const current = session.inputImages.length;
    const max = LIMITS.MAX_INPUT_IMAGES;
    let confirmText = `Фото ${current}/${max} добавлено.`;

    if (caption) {
      const preview = caption.length > 40 ? caption.substring(0, 40) + '...' : caption;
      confirmText += `\n<i>${preview}</i>`;
    }

    confirmText += `\n\nОтправьте ещё или нажмите «Готово».`;

    await ctx.reply(confirmText, {
      parse_mode: 'HTML',
      reply_markup: imageCollectionKeyboard(current),
    });
  } catch (error) {
    console.error('Error in handleCarouselPhoto:', error);
    await ctx.reply('Ошибка при загрузке фото. Попробуйте ещё раз.');
  }
}

export async function handleCarouselImagesDone(ctx: MyContext): Promise<void> {
  try {
    await ctx.answerCallbackQuery();

    const session = ctx.session.carouselSession;

    if (!session || session.inputImages.length === 0) {
      await ctx.reply('Сначала отправьте хотя бы одно фото.', {
        reply_markup: imageCollectionKeyboard(0),
      });
      return;
    }

    // Set first image URL as original if not set
    if (!session.originalImageUrl && session.inputImages.length > 0) {
      session.originalImageUrl = session.inputImages[0].url;
      session.originalImageFileId = session.inputImages[0].fileId;
    }

    session.isCollectingImages = false;
    ctx.session.currentRoute = ROUTES.CAROUSEL_WAITING_PROMPT;

    // Build images summary
    const imagesSummary = session.inputImages
      .map((img, i) => {
        const desc = img.description
          ? (img.description.length > 30 ? img.description.substring(0, 30) + '...' : img.description)
          : 'без описания';
        return `${i + 1}. ${desc}`;
      })
      .join('\n');

    await ctx.reply(
      `<b>Загружено ${session.inputImages.length} фото:</b>\n${imagesSummary}\n\n` +
      `Напишите название товара и что хотите получить:\n\n` +
      `<i>Пример: «Триммер Braun Series 7 — карточка для WB с акцентом на функциях»</i>`,
      {
        parse_mode: 'HTML',
        reply_markup: backToMenuKeyboard(),
      }
    );
  } catch (error) {
    console.error('Error in handleCarouselImagesDone:', error);
    await ctx.reply(TEXTS.ERROR_GENERAL, { reply_markup: backToMenuKeyboard() });
  }
}

// ============================================
// PROMPT HANDLING
// ============================================

export async function handleCarouselPrompt(ctx: MyContext): Promise<void> {
  try {
    const text = ctx.message?.text;
    const session = ctx.session.carouselSession;

    if (!session || session.inputImages.length === 0) {
      await ctx.reply('Сначала отправьте фото товара.', { reply_markup: backToMenuKeyboard() });
      return;
    }

    if (!text || !text.trim()) {
      await ctx.reply('Опишите, что хотите получить.');
      return;
    }

    session.currentPrompt = text.trim();

    // Check credits
    const user = await ctx.services.user.getUser(ctx.from!.id);
    if (!user) {
      await ctx.reply(TEXTS.ERROR_GENERAL, { reply_markup: backToMenuKeyboard() });
      return;
    }

    if (user.credits < CREDITS.CARD_GENERATION) {
      await ctx.reply(
        `<b>Недостаточно токенов</b>\n\nНужно: 4 токена\nУ вас: ${user.credits} токенов`,
        {
          parse_mode: 'HTML',
          reply_markup: compactPackagesKeyboard(),
        }
      );
      return;
    }

    await generateCarouselSlide(ctx, user.id);
  } catch (error) {
    console.error('Error in handleCarouselPrompt:', error);
    await ctx.reply(TEXTS.ERROR_GENERAL, { reply_markup: backToMenuKeyboard() });
  }
}

// ============================================
// GENERATION
// ============================================

async function generateCarouselSlide(ctx: MyContext, userId: string): Promise<void> {
  const session = ctx.session.carouselSession;
  if (!session || session.inputImages.length === 0 || !session.currentPrompt) {
    await ctx.reply(TEXTS.ERROR_GENERAL, { reply_markup: backToMenuKeyboard() });
    return;
  }

  // Determine if this is an edit
  const isEdit = !!session.currentImageUrl && !!session.currentEditRequest;
  const modeText = isEdit ? 'Редактирую' : 'Создаю';

  await MessageManager.sendProcessing(ctx, `${modeText}...`);
  ctx.session.currentRoute = ROUTES.CAROUSEL_SESSION;

  try {
    // Create order
    const order = await ctx.services.order.createOrder(
      userId,
      'image_card',
      {
        images: session.inputImages.map((img) => ({
          url: img.url,
          description: img.description,
        })),
        prompt: session.currentPrompt,
        edit_request: session.currentEditRequest,
        slide_number: session.currentSlideNumber,
        is_edit: isEdit,
        current_image_url: session.currentImageUrl,
        style_reference: session.styleReference?.imageUrl,
        previous_slides: session.slides.map((s) => s.imageUrl),
      },
      CREDITS.CARD_GENERATION
    );

    session.orderId = order.id;
    await ctx.services.order.updateOrder(order.id, { status: 'processing' });

    // Prepare images and prompt for cardGenerator
    let imagesForGenerator: Array<{ url: string; description?: string }>;
    let promptForGenerator: string;

    if (isEdit && session.currentImageUrl && session.currentEditRequest) {
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

    // Generate card
    const result = await cardGenerator.generateCard({
      images: imagesForGenerator,
      userPrompt: promptForGenerator,
      slideNumber: session.currentSlideNumber,
      isFirstSlide: session.currentSlideNumber === 1 && !isEdit,
      isEdit,
      styleReference: session.styleReference?.styleDescription,
      previousSlides: session.slides.map((s) => ({
        prompt: s.prompt,
      })),
    });

    await MessageManager.deleteProcessing(ctx);

    if (result.success && result.imageBuffer) {
      // Upload to storage
      const imageUrl = await ctx.services.storage.uploadImage(
        result.imageBuffer,
        userId,
        order.id,
        'card'
      );

      // Store current generated image
      session.currentImageUrl = imageUrl ?? undefined;
      session.currentImageBuffer = result.imageBuffer;
      session.generationCount++;

      // Clear edit request after successful generation
      session.currentEditRequest = undefined;

      // Build caption
      const promptPreview = session.currentPrompt.length > 100
        ? session.currentPrompt.substring(0, 100) + '...'
        : session.currentPrompt;

      // Send result
      const sentMessage = await ctx.replyWithPhoto(
        new InputFile(result.imageBuffer, `slide_${session.currentSlideNumber}.png`),
        {
          caption: `<b>Слайд ${session.currentSlideNumber} готов!</b>\n\n` +
            `<i>${promptPreview}</i>\n\n` +
            `Отправьте правки текстом или выберите действие.`,
          parse_mode: 'HTML',
          reply_markup: carouselSessionKeyboard(session.currentSlideNumber),
        }
      );

      // Store file_id for quick access
      if (sentMessage.photo) {
        session.currentImageFileId = sentMessage.photo[sentMessage.photo.length - 1].file_id;
      }

      // Update order
      await ctx.services.order.updateOrder(order.id, {
        status: 'completed',
        output_data: {
          image_url: imageUrl ?? undefined,
          slide_number: session.currentSlideNumber,
          generated_prompt: result.generatedPrompt ?? undefined,
        },
      });

      // Deduct credits
      await ctx.services.user.updateUserCredits(userId, -CREDITS.CARD_GENERATION);
      await ctx.services.user.incrementCardsCreated(userId);
    } else {
      // Generation failed
      const errorMessage = result.error || 'Неизвестная ошибка';
      console.error('Generation failed:', errorMessage);

      await ctx.reply(
        `<b>Не удалось создать карточку</b>\n\n${errorMessage}\n\nТокены не списаны.`,
        {
          parse_mode: 'HTML',
          reply_markup: errorKeyboard(),
        }
      );

      await ctx.services.order.updateOrder(order.id, {
        status: 'failed',
        output_data: {
          error: errorMessage,
          generated_prompt: result.generatedPrompt ?? undefined,
        },
      });
    }
  } catch (error: any) {
    console.error('Carousel generation error:', error);
    await MessageManager.deleteProcessing(ctx);

    await ctx.reply(
      `<b>Ошибка генерации</b>\n\n${error.message || 'Попробуйте ещё раз'}\n\nТокены не списаны.`,
      {
        parse_mode: 'HTML',
        reply_markup: errorKeyboard(),
      }
    );
  }
}

// ============================================
// ACTIONS
// ============================================

export async function handleCarouselRegenerate(ctx: MyContext): Promise<void> {
  try {
    await ctx.answerCallbackQuery();

    const session = ctx.session.carouselSession;
    if (!session?.originalImageUrl || !session.currentPrompt) {
      await ctx.reply('Нет данных для регенерации. Начните сначала.', {
        reply_markup: backToMenuKeyboard(),
      });
      return;
    }

    const user = await ctx.services.user.getUser(ctx.from!.id);
    if (!user) {
      await ctx.reply(TEXTS.ERROR_GENERAL, { reply_markup: backToMenuKeyboard() });
      return;
    }

    if (user.credits < CREDITS.CARD_GENERATION) {
      await ctx.reply(
        `<b>Недостаточно токенов</b>\n\nНужно: 4 токена\nУ вас: ${user.credits} токенов`,
        {
          parse_mode: 'HTML',
          reply_markup: compactPackagesKeyboard(),
        }
      );
      return;
    }

    await generateCarouselSlide(ctx, user.id);
  } catch (error) {
    console.error('Error in handleCarouselRegenerate:', error);
    await ctx.reply(TEXTS.ERROR_GENERAL, { reply_markup: backToMenuKeyboard() });
  }
}

export async function handleCarouselNextSlide(ctx: MyContext): Promise<void> {
  try {
    await ctx.answerCallbackQuery();

    const session = ctx.session.carouselSession;
    if (!session?.currentImageUrl || !session.currentPrompt) {
      await ctx.reply('Сначала сгенерируйте слайд.', { reply_markup: backToMenuKeyboard() });
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

    await ctx.reply(
      `<b>Слайд ${session.currentSlideNumber - 1} сохранён!</b>\n\n` +
      `Опишите слайд ${session.currentSlideNumber}:\n\n` +
      `<i>Стиль сохранится автоматически.</i>`,
      {
        parse_mode: 'HTML',
        reply_markup: nextSlideKeyboard(session.slides.length),
      }
    );
  } catch (error) {
    console.error('Error in handleCarouselNextSlide:', error);
    await ctx.reply(TEXTS.ERROR_GENERAL, { reply_markup: backToMenuKeyboard() });
  }
}

export async function handleCarouselNextSlidePrompt(ctx: MyContext): Promise<void> {
  try {
    const text = ctx.message?.text;
    const session = ctx.session.carouselSession;

    if (!session) {
      await ctx.reply(TEXTS.SESSION_EXPIRED, { reply_markup: backToMenuKeyboard() });
      return;
    }

    if (!text || !text.trim()) {
      await ctx.reply('Опишите следующий слайд.');
      return;
    }

    session.currentPrompt = text.trim();

    const user = await ctx.services.user.getUser(ctx.from!.id);
    if (!user) {
      await ctx.reply(TEXTS.ERROR_GENERAL, { reply_markup: backToMenuKeyboard() });
      return;
    }

    if (user.credits < CREDITS.CARD_GENERATION) {
      await ctx.reply(
        `<b>Недостаточно токенов</b>\n\nНужно: 4 токена\nУ вас: ${user.credits} токенов`,
        {
          parse_mode: 'HTML',
          reply_markup: compactPackagesKeyboard(),
        }
      );
      return;
    }

    await generateCarouselSlide(ctx, user.id);
  } catch (error) {
    console.error('Error in handleCarouselNextSlidePrompt:', error);
    await ctx.reply(TEXTS.ERROR_GENERAL, { reply_markup: backToMenuKeyboard() });
  }
}

export async function handleCarouselFinish(ctx: MyContext): Promise<void> {
  try {
    await ctx.answerCallbackQuery();

    const session = ctx.session.carouselSession;
    if (!session) {
      await ctx.reply(TEXTS.SESSION_NOT_FOUND, { reply_markup: backToMenuKeyboard() });
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

    // Send current image as document (HD download)
    if (session.currentImageBuffer) {
      await ctx.replyWithDocument(
        new InputFile(session.currentImageBuffer, `card_${Date.now()}.png`),
        { caption: 'Карточка в полном качестве' }
      );
    }

    const totalSlides = session.slides.length;

    if (totalSlides === 0) {
      await ctx.reply('Нет сохранённых слайдов.', { reply_markup: backToMenuKeyboard() });
      return;
    }

    // Send summary
    let summaryText = `<b>Карусель готова!</b>\n\n`;
    summaryText += `Слайдов: ${totalSlides}\n`;
    summaryText += `Генераций: ${session.generationCount}`;

    await ctx.reply(summaryText, {
      parse_mode: 'HTML',
      reply_markup: backToMenuKeyboard(),
    });

    // Clear session
    ctx.session.carouselSession = undefined;
    ctx.session.currentRoute = ROUTES.MAIN_MENU;
  } catch (error) {
    console.error('Error in handleCarouselFinish:', error);
    await ctx.reply(TEXTS.ERROR_GENERAL, { reply_markup: backToMenuKeyboard() });
  }
}

export async function handleCarouselSessionPrompt(ctx: MyContext): Promise<void> {
  try {
    const text = ctx.message?.text;
    const session = ctx.session.carouselSession;

    if (!session?.originalImageUrl) {
      await ctx.reply(TEXTS.SESSION_EXPIRED, { reply_markup: backToMenuKeyboard() });
      return;
    }

    if (!text || !text.trim()) {
      await ctx.reply('Опишите желаемые изменения.');
      return;
    }

    // Save edit request
    session.currentEditRequest = text.trim();

    const user = await ctx.services.user.getUser(ctx.from!.id);
    if (!user) {
      await ctx.reply(TEXTS.ERROR_GENERAL, { reply_markup: backToMenuKeyboard() });
      return;
    }

    if (user.credits < CREDITS.CARD_GENERATION) {
      await ctx.reply(
        `<b>Недостаточно токенов</b>\n\nНужно: 4 токена\nУ вас: ${user.credits} токенов`,
        {
          parse_mode: 'HTML',
          reply_markup: compactPackagesKeyboard(),
        }
      );
      return;
    }

    await generateCarouselSlide(ctx, user.id);
  } catch (error) {
    console.error('Error in handleCarouselSessionPrompt:', error);
    await ctx.reply(TEXTS.ERROR_GENERAL, { reply_markup: backToMenuKeyboard() });
  }
}
