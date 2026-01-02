import { MyContext, ROUTES } from '../types';
import { TEXTS, CALLBACKS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';
import { supabase } from '../services/supabase';
import { n8n } from '../services/n8n';
import { InputFile } from 'grammy';
import { v4 as uuidv4 } from 'uuid';

const IMAGE_CARD_COST = 4; // Credits per card

// Initialize image card flow - show prompt for photo
export async function handleImageCard(ctx: MyContext, editMessage = false): Promise<void> {
  await MessageManager.cleanup(ctx);

  // Initialize session with unique ID for n8n/ChatGPT memory
  ctx.session.currentRoute = ROUTES.IMAGE_CARD_WAITING_PHOTO;
  ctx.session.imageGenSession = {
    sessionId: uuidv4(), // Generate unique session ID
    generationCount: 0,
  };

  if (editMessage && ctx.callbackQuery?.message) {
    try {
      await ctx.editMessageText(
        `${TEXTS.IMAGE_CARD_TITLE}\n\n${TEXTS.IMAGE_CARD_SEND_PHOTO}`,
        { reply_markup: KeyboardBuilder.imageCardWaitingPhoto() }
      );
    } catch {
      await ctx.reply(`${TEXTS.IMAGE_CARD_TITLE}\n\n${TEXTS.IMAGE_CARD_SEND_PHOTO}`, {
        reply_markup: KeyboardBuilder.imageCardWaitingPhoto(),
      });
    }
  } else {
    await ctx.reply(`${TEXTS.IMAGE_CARD_TITLE}\n\n${TEXTS.IMAGE_CARD_SEND_PHOTO}`, {
      reply_markup: KeyboardBuilder.imageCardWaitingPhoto(),
    });
  }
}

// Handle photo upload - photo is mandatory
export async function handleImageCardPhoto(ctx: MyContext): Promise<void> {
  // Check for photo
  if (!ctx.message?.photo || ctx.message.photo.length === 0) {
    await ctx.reply(TEXTS.ERROR_NO_PHOTO);
    return;
  }

  // Get user and check credits
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  if (user.credits < IMAGE_CARD_COST) {
    await ctx.reply(TEXTS.IMAGE_CARD_NO_CREDITS, {
      reply_markup: KeyboardBuilder.creditPackages(),
    });
    return;
  }

  // Get photo info
  const photo = ctx.message.photo[ctx.message.photo.length - 1];
  const file = await ctx.api.getFile(photo.file_id);
  const photoUrl = `https://api.telegram.org/file/bot${ctx.api.token}/${file.file_path}`;

  // Store in session
  if (!ctx.session.imageGenSession) {
    ctx.session.imageGenSession = { 
      sessionId: uuidv4(),
      generationCount: 0 
    };
  }
  ctx.session.imageGenSession.photoUrl = photoUrl;
  ctx.session.imageGenSession.photoFileId = photo.file_id;

  // If there was a caption, use it as prompt
  if (ctx.message.caption && ctx.message.caption.trim()) {
    ctx.session.imageGenSession.prompt = ctx.message.caption.trim();
    // Generate immediately
    await generateImageCard(ctx, user.id);
  } else {
    // Ask for prompt (optional)
    ctx.session.currentRoute = ROUTES.IMAGE_CARD_WAITING_PROMPT;
    await ctx.reply(TEXTS.IMAGE_CARD_PHOTO_RECEIVED, {
      reply_markup: KeyboardBuilder.imageCardPhotoReceived(),
    });
  }
}

// Handle prompt text
export async function handleImageCardPrompt(ctx: MyContext): Promise<void> {
  const text = ctx.message?.text;

  if (!ctx.session.imageGenSession?.photoUrl) {
    await ctx.reply('Сначала отправьте фото товара.');
    return;
  }

  // Store prompt
  ctx.session.imageGenSession.prompt = text || '';

  // Get user and check credits
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  if (user.credits < IMAGE_CARD_COST) {
    await ctx.reply(TEXTS.IMAGE_CARD_NO_CREDITS, {
      reply_markup: KeyboardBuilder.creditPackages(),
    });
    return;
  }

  // Generate
  await generateImageCard(ctx, user.id);
}

// Handle skip prompt callback
export async function handleSkipPrompt(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  if (!ctx.session.imageGenSession?.photoUrl) {
    await ctx.reply('Сначала отправьте фото.', {
      reply_markup: KeyboardBuilder.backToMenu(),
    });
    return;
  }

  // Delete the message asking for prompt
  if (ctx.callbackQuery?.message) {
    await MessageManager.deleteMessage(ctx, ctx.callbackQuery.message.message_id);
  }

  // Set empty prompt
  ctx.session.imageGenSession.prompt = '';

  // Get user and check credits
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  if (user.credits < IMAGE_CARD_COST) {
    await ctx.reply(TEXTS.IMAGE_CARD_NO_CREDITS, {
      reply_markup: KeyboardBuilder.creditPackages(),
    });
    return;
  }

  // Generate
  await generateImageCard(ctx, user.id);
}

// Handle regenerate callback (same photo, same prompt)
export async function handleRegenerate(ctx: MyContext): Promise<void> {
  if (ctx.callbackQuery) {
    await ctx.answerCallbackQuery();
  }

  if (!ctx.session.imageGenSession?.photoUrl) {
    await ctx.reply('Нет фото для генерации. Начните сначала.', {
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

  if (user.credits < IMAGE_CARD_COST) {
    await ctx.reply(TEXTS.IMAGE_CARD_NO_CREDITS, {
      reply_markup: KeyboardBuilder.creditPackages(),
    });
    return;
  }

  // Generate again
  await generateImageCard(ctx, user.id);
}

// Handle change prompt callback
export async function handleChangePrompt(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  // Check credits before asking for new prompt
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  if (user.credits < IMAGE_CARD_COST) {
    await ctx.reply(TEXTS.IMAGE_CARD_NO_CREDITS, {
      reply_markup: KeyboardBuilder.creditPackages(),
    });
    return;
  }

  ctx.session.currentRoute = ROUTES.IMAGE_CARD_WAITING_PROMPT;

  // Edit message to ask for new prompt
  if (ctx.callbackQuery?.message) {
    await ctx.editMessageCaption({
      caption: `📝 Введите новый промпт для генерации:\n\nТекущий промпт: ${ctx.session.imageGenSession?.prompt || '(пусто)'}`,
      reply_markup: KeyboardBuilder.imageCardPhotoReceived(),
    });
  }
}

// Handle new photo callback
export async function handleNewPhoto(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  // Reset session but keep sessionId and count for continuity
  const sessionId = ctx.session.imageGenSession?.sessionId || uuidv4();
  const count = ctx.session.imageGenSession?.generationCount || 0;
  ctx.session.imageGenSession = { 
    sessionId, // Keep same session ID for ChatGPT memory continuity
    generationCount: count 
  };
  ctx.session.currentRoute = ROUTES.IMAGE_CARD_WAITING_PHOTO;

  await ctx.reply(`${TEXTS.IMAGE_CARD_TITLE}\n\n${TEXTS.IMAGE_CARD_SEND_PHOTO}`, {
    reply_markup: KeyboardBuilder.imageCardWaitingPhoto(),
  });
}

// Main generation function
async function generateImageCard(ctx: MyContext, userId: string): Promise<void> {
  const session = ctx.session.imageGenSession;
  if (!session?.photoUrl) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  // Send processing message
  const processingMsgId = await MessageManager.sendProcessing(ctx, TEXTS.IMAGE_CARD_WAIT);
  ctx.session.currentRoute = ROUTES.IMAGE_CARD_SESSION;

  try {
    // Create order
    const order = await supabase.createOrder(
      userId,
      'image_card',
      {
        photo_url: session.photoUrl,
        description: session.prompt || '',
      },
      IMAGE_CARD_COST
    );

    session.orderId = order.id;

    // Update order status
    await supabase.updateOrder(order.id, { status: 'processing' });

    // Call n8n to generate image
    const result = await n8n.generateImageCard({
      photoUrl: session.photoUrl,
      description: session.prompt || '',
      userId: userId,
      orderId: order.id,
      sessionId: session.sessionId, // Pass session ID for ChatGPT memory
    });

    // Delete processing message
    await MessageManager.deleteProcessing(ctx);

    if (result.success && result.buffer && result.buffer.length > 0) {
      // Store result in session
      session.lastGeneratedImage = Buffer.from(result.buffer);
      session.generationCount++;

      // Send result with session options
      await ctx.replyWithPhoto(new InputFile(result.buffer, 'card.jpg'), {
        caption: `${TEXTS.IMAGE_CARD_READY}\n\n${TEXTS.IMAGE_CARD_SESSION_OPTIONS}`,
        reply_markup: KeyboardBuilder.imageCardSession(),
      });

      // Update database
      await supabase.updateOrder(order.id, {
        status: 'completed',
        output_data: { images: result.images },
      });

      // Deduct credits and increment counter
      await supabase.updateUserCredits(userId, -IMAGE_CARD_COST);
      await supabase.incrementCardsCreated(userId);
    } else {
      await ctx.reply(TEXTS.IMAGE_CARD_ERROR, {
        reply_markup: KeyboardBuilder.imageCardSession(),
      });

      await supabase.updateOrder(order.id, {
        status: 'failed',
        output_data: { error: result.error || 'Unknown error' },
      });
    }
  } catch (error) {
    console.error('Image card generation error:', error);
    await MessageManager.deleteProcessing(ctx);
    await ctx.reply(TEXTS.IMAGE_CARD_ERROR, {
      reply_markup: KeyboardBuilder.backToMenu(),
    });
  }
}