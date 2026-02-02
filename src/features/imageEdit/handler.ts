/**
 * Image edit feature handler
 */

import { v4 as uuidv4 } from 'uuid';
import type { MyContext } from '../../bot/context';
import { ROUTES, TEXTS, CREDITS } from '../../core/constants';
import { backToMenuKeyboard, creditPackagesKeyboard } from '../../bot/keyboards';
import { MessageManager } from '../../utils/helpers';

// ============================================
// INITIALIZATION
// ============================================

export async function handleImageEdit(ctx: MyContext, editMessage = false): Promise<void> {
  await MessageManager.cleanup(ctx);

  ctx.session.currentRoute = ROUTES.IMAGE_EDIT_WAITING_PHOTO;
  ctx.session.imageEditSession = {
    sessionId: uuidv4(),
    editCount: 0,
  };

  const text = TEXTS.IMAGE_EDIT_SEND_PHOTO;

  if (editMessage && ctx.callbackQuery?.message) {
    try {
      await ctx.editMessageText(text, {
        parse_mode: 'HTML',
        reply_markup: backToMenuKeyboard(),
      });
    } catch {
      await ctx.reply(text, {
        parse_mode: 'HTML',
        reply_markup: backToMenuKeyboard(),
      });
    }
  } else {
    await ctx.reply(text, {
      parse_mode: 'HTML',
      reply_markup: backToMenuKeyboard(),
    });
  }
}

// ============================================
// PHOTO HANDLING
// ============================================

export async function handleImageEditPhoto(ctx: MyContext): Promise<void> {
  const photo = ctx.message?.photo;
  if (!photo || photo.length === 0) {
    await ctx.reply(TEXTS.ERROR_NO_PHOTO);
    return;
  }

  // Initialize session if needed
  if (!ctx.session.imageEditSession) {
    ctx.session.imageEditSession = {
      sessionId: uuidv4(),
      editCount: 0,
    };
  }

  const session = ctx.session.imageEditSession;

  // Get the largest photo
  const largestPhoto = photo[photo.length - 1];
  const file = await ctx.api.getFile(largestPhoto.file_id);
  const photoUrl = `https://api.telegram.org/file/bot${ctx.api.token}/${file.file_path}`;

  session.photoUrl = photoUrl;
  session.photoFileId = largestPhoto.file_id;

  ctx.session.currentRoute = ROUTES.IMAGE_EDIT_WAITING_PROMPT;

  await ctx.reply(TEXTS.IMAGE_EDIT_PHOTO_RECEIVED, {
    parse_mode: 'HTML',
    reply_markup: backToMenuKeyboard(),
  });
}

// ============================================
// PROMPT HANDLING
// ============================================

export async function handleImageEditPrompt(ctx: MyContext): Promise<void> {
  const text = ctx.message?.text;
  const session = ctx.session.imageEditSession;

  if (!session?.photoUrl) {
    await ctx.reply('⚠️ Сначала отправьте изображение.');
    return;
  }

  if (!text || !text.trim()) {
    await ctx.reply(TEXTS.IMAGE_EDIT_NEED_PROMPT);
    return;
  }

  session.prompt = text.trim();

  // Check credits
  const user = await ctx.services.user.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  if (user.credits < CREDITS.IMAGE_EDIT) {
    await ctx.reply(TEXTS.IMAGE_EDIT_NO_CREDITS, {
      parse_mode: 'HTML',
      reply_markup: creditPackagesKeyboard(),
    });
    return;
  }

  await generateEdit(ctx, user.id);
}

// ============================================
// GENERATION
// ============================================

async function generateEdit(ctx: MyContext, userId: string): Promise<void> {
  const session = ctx.session.imageEditSession;
  if (!session?.photoUrl || !session.prompt) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  await MessageManager.sendProcessing(ctx, TEXTS.IMAGE_EDIT_WAIT);
  ctx.session.currentRoute = ROUTES.IMAGE_EDIT_SESSION;

  try {
    // Create order
    const order = await ctx.services.order.createOrder(
      userId,
      'image_edit',
      {
        photo_url: session.photoUrl,
        edit_prompt: session.prompt,
      },
      CREDITS.IMAGE_EDIT
    );

    session.orderId = order.id;
    await ctx.services.order.updateOrder(order.id, { status: 'processing' });

    // TODO: Implement actual image editing with AI
    // For now, this is a placeholder that shows an error
    // In the real implementation, this would call an image editing service

    await MessageManager.deleteProcessing(ctx);

    await ctx.reply(
      '🚧 Функция редактирования изображений находится в разработке.\n\nПопробуйте создать карточку вместо редактирования.',
      {
        reply_markup: backToMenuKeyboard(),
      }
    );

    await ctx.services.order.updateOrder(order.id, {
      status: 'failed',
      output_data: { error: 'Feature not implemented' },
    });
  } catch (error: any) {
    console.error('Image edit error:', error);
    await MessageManager.deleteProcessing(ctx);
    await ctx.reply(TEXTS.IMAGE_EDIT_ERROR + TEXTS.ERROR_TRY_AGAIN, {
      reply_markup: backToMenuKeyboard(),
    });
  }
}

// ============================================
// ACTIONS
// ============================================

export async function handleEditRegenerate(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const session = ctx.session.imageEditSession;
  if (!session?.photoUrl || !session.prompt) {
    await ctx.reply('⚠️ Нет данных для повтора. Начните сначала.', {
      reply_markup: backToMenuKeyboard(),
    });
    return;
  }

  const user = await ctx.services.user.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  if (user.credits < CREDITS.IMAGE_EDIT) {
    await ctx.reply(TEXTS.IMAGE_EDIT_NO_CREDITS, {
      parse_mode: 'HTML',
      reply_markup: creditPackagesKeyboard(),
    });
    return;
  }

  await generateEdit(ctx, user.id);
}
