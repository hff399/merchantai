import { MyContext, ROUTES } from '../types';
import { TEXTS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';
import { supabase } from '../services/supabase';
import { n8n } from '../services/n8n';
import { InputFile } from 'grammy';
import { v4 as uuidv4 } from 'uuid';

const IMAGE_EDIT_COST = 2; // Credits per edit (half of generation)

// Initialize image edit flow
export async function handleImageEdit(ctx: MyContext, editMessage = false): Promise<void> {
  await MessageManager.cleanup(ctx);

  // Initialize session with unique ID for n8n/ChatGPT memory
  ctx.session.currentRoute = ROUTES.IMAGE_EDIT_WAITING_PHOTO;
  ctx.session.imageEditSession = {
    sessionId: uuidv4(),
    editCount: 0,
  };

  const text = `${TEXTS.IMAGE_EDIT_TITLE}\n\n${TEXTS.IMAGE_EDIT_SEND_PHOTO}`;

  if (editMessage && ctx.callbackQuery?.message) {
    try {
      await ctx.editMessageText(text, {
        reply_markup: KeyboardBuilder.imageEditWaitingPhoto(),
      });
    } catch {
      await ctx.reply(text, {
        reply_markup: KeyboardBuilder.imageEditWaitingPhoto(),
      });
    }
  } else {
    await ctx.reply(text, {
      reply_markup: KeyboardBuilder.imageEditWaitingPhoto(),
    });
  }
}

// Handle photo upload for editing
export async function handleImageEditPhoto(ctx: MyContext): Promise<void> {
  const photo = ctx.message?.photo;
  if (!photo || photo.length === 0) {
    await ctx.reply('Пожалуйста, отправьте изображение.');
    return;
  }

  // Initialize session if not exists
  if (!ctx.session.imageEditSession) {
    ctx.session.imageEditSession = {
      sessionId: uuidv4(),
      editCount: 0,
    };
  }

  const session = ctx.session.imageEditSession;

  // Get the largest photo
  const largestPhoto = photo[photo.length - 1];

  // Get file URL from Telegram
  const file = await ctx.api.getFile(largestPhoto.file_id);
  const photoUrl = `https://api.telegram.org/file/bot${ctx.api.token}/${file.file_path}`;

  // Store in session
  session.photoUrl = photoUrl;
  session.photoFileId = largestPhoto.file_id;

  // Update route
  ctx.session.currentRoute = ROUTES.IMAGE_EDIT_WAITING_PROMPT;

  await ctx.reply(TEXTS.IMAGE_EDIT_PHOTO_RECEIVED, {
    reply_markup: KeyboardBuilder.imageEditPhotoReceived(),
  });
}

// Handle prompt text for editing
export async function handleImageEditPrompt(ctx: MyContext): Promise<void> {
  const text = ctx.message?.text;

  if (!ctx.session.imageEditSession?.photoUrl) {
    await ctx.reply('Сначала отправьте изображение для редактирования.');
    return;
  }

  if (!text || !text.trim()) {
    await ctx.reply(TEXTS.IMAGE_EDIT_NEED_PROMPT);
    return;
  }

  // Store prompt
  ctx.session.imageEditSession.prompt = text.trim();

  // Get user and check credits
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  if (user.credits < IMAGE_EDIT_COST) {
    await ctx.reply(TEXTS.IMAGE_EDIT_NO_CREDITS, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.creditPackages(),
    });
    return;
  }

  // Process edit
  await processImageEdit(ctx, user.id);
}

// Handle regenerate callback (same photo, same prompt)
export async function handleEditRegenerate(ctx: MyContext): Promise<void> {
  if (ctx.callbackQuery) {
    await ctx.answerCallbackQuery();
  }

  const session = ctx.session.imageEditSession;

  if (!session?.photoUrl || !session.prompt) {
    await ctx.reply('Нет данных для обработки. Начните сначала.', {
      reply_markup: KeyboardBuilder.backToMenu(),
    });
    return;
  }

  // Get user and check credits
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  if (user.credits < IMAGE_EDIT_COST) {
    await ctx.reply(TEXTS.IMAGE_EDIT_NO_CREDITS, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.creditPackages(),
    });
    return;
  }

  // Process again
  await processImageEdit(ctx, user.id);
}

// Main edit processing function
async function processImageEdit(ctx: MyContext, userId: string): Promise<void> {
  const session = ctx.session.imageEditSession;
  if (!session?.photoUrl || !session.prompt) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  // Send processing message
  await MessageManager.sendProcessing(ctx, TEXTS.IMAGE_EDIT_WAIT);
  ctx.session.currentRoute = ROUTES.IMAGE_EDIT_SESSION;

  try {
    // Create order
    const order = await supabase.createOrder(
      userId,
      'image_edit',
      {
        photo_url: session.photoUrl,
        description: session.prompt,
      },
      IMAGE_EDIT_COST
    );

    session.orderId = order.id;

    // Update order status
    await supabase.updateOrder(order.id, { status: 'processing' });

    // Call n8n to edit image
    const result = await n8n.editImage({
      photoUrl: session.photoUrl,
      description: session.prompt,
      userId: userId,
      orderId: order.id,
      sessionId: session.sessionId,
    });

    // Delete processing message
    await MessageManager.deleteProcessing(ctx);

    if (result.success && result.buffer && result.buffer.length > 0) {
      // Store result in session
      const imageBuffer = Buffer.from(result.buffer);
      session.lastEditedImage = imageBuffer;
      session.editCount++;

      // Upload to Supabase Storage
      const imageUrl = await supabase.uploadImage(imageBuffer, userId, order.id, 'edit');

      // Send result with session options
      await ctx.replyWithPhoto(new InputFile(result.buffer, 'edited.jpg'), {
        caption: `${TEXTS.IMAGE_EDIT_READY}\n\n${TEXTS.IMAGE_EDIT_SESSION_OPTIONS}`,
        parse_mode: 'HTML',
        reply_markup: KeyboardBuilder.imageEditSession(),
      });

      // Update database with image URL
      await supabase.updateOrder(order.id, {
        status: 'completed',
        output_data: {
          images: result.images,
          generated_image_url: imageUrl,
        },
      });

      // Deduct credits
      await supabase.updateUserCredits(userId, -IMAGE_EDIT_COST);
    } else {
      await ctx.reply(TEXTS.IMAGE_EDIT_ERROR, {
        reply_markup: KeyboardBuilder.imageEditSession(),
      });

      await supabase.updateOrder(order.id, {
        status: 'failed',
        output_data: { error: result.error || 'Unknown error' },
      });
    }
  } catch (error) {
    console.error('Image edit error:', error);
    await MessageManager.deleteProcessing(ctx);
    await ctx.reply(TEXTS.IMAGE_EDIT_ERROR, {
      reply_markup: KeyboardBuilder.backToMenu(),
    });
  }
}