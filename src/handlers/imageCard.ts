import { MyContext } from '../types';
import { TEXTS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';
import { supabase } from '../services/supabase';
import { n8n } from '../services/n8n';
import { InputFile } from 'grammy';

const IMAGE_CARD_COST = 4; // Credits per card

export async function handleImageCard(ctx: MyContext): Promise<void> {
  await MessageManager.cleanup(ctx);

  await ctx.reply(TEXTS.IMAGE_CARD_TITLE, {
    reply_markup: KeyboardBuilder.backToMenu(),
  });

  await ctx.reply(TEXTS.IMAGE_CARD_DESC);
  await ctx.reply(TEXTS.IMAGE_CARD_UPLOAD);
}

export async function handleImageCardPhoto(ctx: MyContext): Promise<void> {
  // Check for photo
  if (!ctx.message?.photo || ctx.message.photo.length === 0) {
    await ctx.reply(TEXTS.ERROR_NO_PHOTO);
    return;
  }

  // Get user
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  // Check credits
  if (user.credits < IMAGE_CARD_COST) {
    await ctx.reply(TEXTS.IMAGE_CARD_NO_CREDITS, {
      reply_markup: KeyboardBuilder.planSelection(),
    });
    return;
  }

  // Get photo URL
  const photo = ctx.message.photo[ctx.message.photo.length - 1]; // Get largest photo
  const file = await ctx.api.getFile(photo.file_id);
  const photoUrl = `https://api.telegram.org/file/bot${ctx.api.token}/${file.file_path}`;

  // Get description if provided
  const description = ctx.message.caption || '';

  // Send processing message
  const processingMsg = await MessageManager.sendProcessing(ctx, TEXTS.IMAGE_CARD_WAIT);

  try {
    // Create order
    const order = await supabase.createOrder(user.id, 'image_card', {
      photo_url: photoUrl,
      description,
    }, IMAGE_CARD_COST);

    // Update order status
    await supabase.updateOrder(order.id, { status: 'processing' });

    // Call n8n to generate image
    const result = await n8n.generateImageCard({
      photoUrl,
      description,
      userId: user.id,
      orderId: order.id,
    });

    console.log(result)

    if (result.success && result.buffer && result.buffer.length > 0) {
      // Delete processing message
      await MessageManager.deleteProcessing(ctx);

      // Send result
      // Send image from binary buffer
  await ctx.replyWithPhoto(
    new InputFile(
      result.buffer,
    ),
    {
      caption: TEXTS.IMAGE_CARD_READY,
      reply_markup: KeyboardBuilder.mainMenu(),
    }
  );

      // Update database
      await supabase.updateOrder(order.id, {
        status: 'completed',
        output_data: { images: result.images },
      });

      // Deduct credits and increment counter
      await supabase.updateUserCredits(user.id, -IMAGE_CARD_COST);
      await supabase.incrementCardsCreated(user.id);
    } else {
      // Delete processing message
      await MessageManager.deleteProcessing(ctx);

      await ctx.reply(TEXTS.IMAGE_CARD_ERROR, {
        reply_markup: KeyboardBuilder.mainMenu(),
      });

      await supabase.updateOrder(order.id, {
        status: 'failed',
        output_data: { error: result.error || 'Unknown error' },
      });
    }
  } catch (error) {
    console.error('Image card generation error:', error);

    // Delete processing message
    await MessageManager.deleteProcessing(ctx);

    await ctx.reply(TEXTS.IMAGE_CARD_ERROR, {
      reply_markup: KeyboardBuilder.mainMenu(),
    });
  }
}