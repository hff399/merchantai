/**
 * Test Mode - Simplified prompt constructor for testing
 *
 * Flow:
 * 1. /test command
 * 2. Upload 1-8 photos
 * 3. Enter raw prompt
 * 4. Generate
 *
 * No presets, no extra steps - direct control.
 */

import { MyContext, TEST_ROUTES } from '../types';
import { cardGenerator } from '../services/cardGenerator';
import { supabase } from '../services/supabase';
import { MessageManager } from '../utils/helpers';
import { InlineKeyboard, InputFile } from 'grammy';
import { v4 as uuidv4 } from 'uuid';

// Re-export routes from types
export { TEST_ROUTES };

// Test mode callbacks
export const TEST_CALLBACKS = {
  PHOTOS_DONE: 'test_photos_done',
  REGENERATE: 'test_regenerate',
  NEW_PROMPT: 'test_new_prompt',
  DOWNLOAD: 'test_download',
  RESET: 'test_reset',
} as const;

const CARD_GENERATION_COST = 4;
const MAX_PHOTOS = 8;

// ============================================
// KEYBOARDS
// ============================================

function getPhotosKeyboard(photoCount: number): InlineKeyboard {
  return new InlineKeyboard()
    .text(`✅ Готово (${photoCount} фото)`, TEST_CALLBACKS.PHOTOS_DONE)
    .row()
    .text('🏠 Отмена', 'back_to_menu');
}

function getResultKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text('🔄 Ещё вариант', TEST_CALLBACKS.REGENERATE)
    .row()
    .text('📝 Новый промпт', TEST_CALLBACKS.NEW_PROMPT)
    .row()
    .text('💾 Скачать', TEST_CALLBACKS.DOWNLOAD)
    .row()
    .text('🔁 Сначала', TEST_CALLBACKS.RESET)
    .row()
    .text('🏠 В меню', 'back_to_menu');
}

// ============================================
// HANDLERS
// ============================================

/**
 * Start test mode - /test command
 */
export async function handleTestModeStart(ctx: MyContext): Promise<void> {
  // Initialize test session
  ctx.session.testModeSession = {
    sessionId: uuidv4(),
    photos: [],
    generationCount: 0,
  };
  ctx.session.currentRoute = TEST_ROUTES.WAITING_PHOTOS;

  const text = `🧪 <b>Test Mode</b>

Загрузите 1-${MAX_PHOTOS} фото товара.

После загрузки нажмите "Готово" и введите промпт напрямую.

<i>Отправьте фото 👇</i>`;

  await ctx.reply(text, {
    parse_mode: 'HTML',
    reply_markup: new InlineKeyboard().text('🏠 Отмена', 'back_to_menu'),
  });
}

/**
 * Handle photo upload in test mode
 */
export async function handleTestModePhoto(ctx: MyContext): Promise<void> {
  const photo = ctx.message?.photo;
  if (!photo || photo.length === 0) return;

  const session = ctx.session.testModeSession;
  if (!session) {
    await ctx.reply('Сессия истекла. Начните с /test');
    return;
  }

  if (session.photos.length >= MAX_PHOTOS) {
    await ctx.reply(`Максимум ${MAX_PHOTOS} фото. Нажмите "Готово".`);
    return;
  }

  // Get largest photo
  const largestPhoto = photo[photo.length - 1];
  const file = await ctx.api.getFile(largestPhoto.file_id);
  const photoUrl = `https://api.telegram.org/file/bot${ctx.api.token}/${file.file_path}`;

  session.photos.push({
    url: photoUrl,
    fileId: largestPhoto.file_id,
  });

  await ctx.reply(
    `📷 Фото ${session.photos.length}/${MAX_PHOTOS} добавлено\n\nОтправьте ещё или нажмите "Готово"`,
    { reply_markup: getPhotosKeyboard(session.photos.length) }
  );
}

/**
 * Handle "photos done" callback
 */
export async function handleTestModePhotosDone(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const session = ctx.session.testModeSession;
  if (!session || session.photos.length === 0) {
    await ctx.reply('Сначала загрузите хотя бы одно фото.');
    return;
  }

  ctx.session.currentRoute = TEST_ROUTES.WAITING_PROMPT;

  const text = `✅ <b>${session.photos.length} фото загружено</b>

Теперь введите промпт напрямую.

<b>Пример:</b>
<code>Professional marketplace product card for WB/Ozon.
Product shown very large, filling 80-90% of frame.
Dark premium background, soft highlights.
Russian text headlines.
Clean UI infographics with badges.</code>

<i>Введите ваш промпт 👇</i>`;

  await ctx.reply(text, {
    parse_mode: 'HTML',
    reply_markup: new InlineKeyboard().text('🏠 Отмена', 'back_to_menu'),
  });
}

/**
 * Handle prompt input
 */
export async function handleTestModePrompt(ctx: MyContext): Promise<void> {
  const text = ctx.message?.text;
  if (!text || !text.trim()) {
    await ctx.reply('Введите промпт.');
    return;
  }

  const session = ctx.session.testModeSession;
  if (!session || session.photos.length === 0) {
    await ctx.reply('Сессия истекла. Начните с /test');
    return;
  }

  session.prompt = text.trim();

  await generateTestCard(ctx);
}

/**
 * Handle new prompt request
 */
export async function handleTestModeNewPrompt(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const session = ctx.session.testModeSession;
  if (!session) {
    await ctx.reply('Сессия истекла. Начните с /test');
    return;
  }

  ctx.session.currentRoute = TEST_ROUTES.WAITING_PROMPT;

  await ctx.reply(
    `📝 <b>Введите новый промпт:</b>\n\n<i>Текущий:</i>\n<code>${session.prompt?.substring(0, 200)}...</code>`,
    {
      parse_mode: 'HTML',
      reply_markup: new InlineKeyboard().text('🏠 Отмена', 'back_to_menu'),
    }
  );
}

/**
 * Handle regenerate
 */
export async function handleTestModeRegenerate(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const session = ctx.session.testModeSession;
  if (!session || !session.prompt) {
    await ctx.reply('Сессия истекла. Начните с /test');
    return;
  }

  await generateTestCard(ctx);
}

/**
 * Handle download
 */
export async function handleTestModeDownload(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const session = ctx.session.testModeSession;
  if (!session || !session.lastGeneratedImage) {
    await ctx.reply('Изображение не найдено.');
    return;
  }

  await ctx.replyWithDocument(
    new InputFile(session.lastGeneratedImage, `test_card_${Date.now()}.jpg`),
    { caption: '💾 Карточка в полном качестве' }
  );
}

/**
 * Handle reset
 */
export async function handleTestModeReset(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  await handleTestModeStart(ctx);
}

// ============================================
// GENERATION
// ============================================

async function generateTestCard(ctx: MyContext): Promise<void> {
  const session = ctx.session.testModeSession;
  if (!session || session.photos.length === 0 || !session.prompt) {
    await ctx.reply('Нет фото или промпта. Начните с /test');
    return;
  }

  // Check credits
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply('Ошибка получения пользователя.');
    return;
  }

  if (user.credits < CARD_GENERATION_COST) {
    await ctx.reply(
      `<b>Недостаточно токенов</b>\n\nНужно: ${CARD_GENERATION_COST}\nУ вас: ${user.credits}`,
      { parse_mode: 'HTML' }
    );
    return;
  }

  ctx.session.currentRoute = TEST_ROUTES.GENERATING;

  await MessageManager.sendProcessing(ctx, `Создаю...`);

  try {
    // Create order (use image_card type for test mode)
    const order = await supabase.createOrder(
      user.id,
      'image_card',
      {
        photos: session.photos.map((p) => p.url),
        prompt: session.prompt,
        test_mode: true,
      },
      CARD_GENERATION_COST
    );

    session.orderId = order.id;
    await supabase.updateOrder(order.id, { status: 'processing' });

    console.log(`[TestMode] Generating with ${session.photos.length} photos`);
    console.log(`[TestMode] Prompt: ${session.prompt.substring(0, 200)}...`);

    // Generate
    const result = await cardGenerator.generateCard({
      images: session.photos.map((p, i) => ({
        url: p.url,
        description: p.description || `Photo ${i + 1}`,
      })),
      userPrompt: session.prompt,
      slideNumber: 1,
      isFirstSlide: true,
      isEdit: false,
    });

    await MessageManager.deleteProcessing(ctx);

    if (result.success && result.imageBuffer && result.imageBuffer.length > 0) {
      session.lastGeneratedImage = result.imageBuffer;
      session.generationCount++;
      ctx.session.currentRoute = TEST_ROUTES.RESULT;

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
        caption: `✅ <b>Готово!</b>\n\n📷 Фото: ${session.photos.length}\n🔢 Генерация #${session.generationCount}\n\n<code>${session.prompt.substring(0, 150)}...</code>`,
        parse_mode: 'HTML',
        reply_markup: getResultKeyboard(),
      });

      // Update order
      await supabase.updateOrder(order.id, {
        status: 'completed',
        output_data: { generated_image_url: imageUrl ?? undefined },
      });

      // Deduct credits
      await supabase.updateUserCredits(user.id, -CARD_GENERATION_COST);
      await supabase.incrementCardsCreated(user.id);
    } else {
      await ctx.reply(`❌ Ошибка: ${result.error || 'Unknown'}`, {
        reply_markup: getResultKeyboard(),
      });

      await supabase.updateOrder(order.id, {
        status: 'failed',
        output_data: { error: result.error || 'Unknown' },
      });
    }
  } catch (error: any) {
    console.error('[TestMode] Generation error:', error);
    await MessageManager.deleteProcessing(ctx);
    await ctx.reply(`❌ Ошибка: ${error.message || 'Unknown'}`);
  }
}
