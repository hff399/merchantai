import { MyContext, ROUTES } from '../types';
import { TEXTS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';
import { supabase } from '../services/supabase';
import { n8n } from '../services/n8n';
import { InputMediaPhoto } from 'grammy/types';

const PHOTO_SESSION_COST = 2; // Credits per session

export async function handlePhotoSession(ctx: MyContext, editMessage = false): Promise<void> {
  await MessageManager.cleanup(ctx);

  ctx.session.currentRoute = ROUTES.PHOTO_SESSION;

  const sessionText = `${TEXTS.PHOTO_SESSION_TITLE}

${TEXTS.PHOTO_SESSION_DESC}

${TEXTS.PHOTO_SESSION_UPLOAD}`;

  if (editMessage && ctx.callbackQuery?.message) {
    try {
      await ctx.editMessageText(sessionText, {
        reply_markup: KeyboardBuilder.photoSessionWaiting(),
      });
    } catch {
      await ctx.reply(sessionText, {
        reply_markup: KeyboardBuilder.photoSessionWaiting(),
      });
    }
  } else {
    await ctx.reply(sessionText, {
      reply_markup: KeyboardBuilder.photoSessionWaiting(),
    });
  }
}

export async function handlePhotoSessionPhoto(ctx: MyContext): Promise<void> {
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
  if (user.credits < PHOTO_SESSION_COST) {
    await ctx.reply(TEXTS.IMAGE_CARD_NO_CREDITS, {
      reply_markup: KeyboardBuilder.creditPackages(),
    });
    return;
  }

  // Get photo URL
  const photo = ctx.message.photo[ctx.message.photo.length - 1];
  const file = await ctx.api.getFile(photo.file_id);
  const photoUrl = `https://api.telegram.org/file/bot${ctx.api.token}/${file.file_path}`;

  // Get description if provided
  const description = ctx.message.caption || '';

  // Send processing message
  await MessageManager.sendProcessing(ctx, TEXTS.PHOTO_SESSION_WAIT);

  try {
    // Create order
    const order = await supabase.createOrder(
      user.id,
      'photo_session',
      {
        photo_url: photoUrl,
        description,
      },
      PHOTO_SESSION_COST
    );

    // Update order status
    await supabase.updateOrder(order.id, { status: 'processing' });

    // Call n8n to generate photo session
    const result = await n8n.generatePhotoSession({
      photoUrl,
      description,
      count: 5,
      userId: user.id,
      orderId: order.id,
    });

    if (result.success && result.images && result.images.length > 0) {
      // Delete processing message
      await MessageManager.deleteProcessing(ctx);

      // Send results as media group
      if (result.images.length === 1) {
        await ctx.replyWithPhoto(result.images[0], {
          caption: TEXTS.PHOTO_SESSION_READY,
          reply_markup: KeyboardBuilder.mainMenu(),
        });
      } else {
        // Send caption separately
        await ctx.reply(TEXTS.PHOTO_SESSION_READY);

        // Create media group
        const mediaGroup: InputMediaPhoto[] = result.images.map((url, index) => ({
          type: 'photo' as const,
          media: url,
          caption: index === 0 ? `Фото ${index + 1} из ${result.images!.length}` : undefined,
        }));

        // Send media group
        await ctx.replyWithMediaGroup(mediaGroup);

        // Send main menu
        await ctx.reply('Готово! 🎉', {
          reply_markup: KeyboardBuilder.mainMenu(),
        });
      }

      // Update database
      await supabase.updateOrder(order.id, {
        status: 'completed',
        output_data: { images: result.images },
      });

      // Deduct credits and increment counter
      await supabase.updateUserCredits(user.id, -PHOTO_SESSION_COST);
      await supabase.incrementCardsCreated(user.id);
    } else {
      // Delete processing message
      await MessageManager.deleteProcessing(ctx);

      await ctx.reply(TEXTS.PHOTO_SESSION_ERROR, {
        reply_markup: KeyboardBuilder.mainMenu(),
      });

      await supabase.updateOrder(order.id, {
        status: 'failed',
        output_data: { error: result.error || 'Unknown error' },
      });
    }
  } catch (error) {
    console.error('Photo session generation error:', error);

    // Delete processing message
    await MessageManager.deleteProcessing(ctx);

    await ctx.reply(TEXTS.PHOTO_SESSION_ERROR, {
      reply_markup: KeyboardBuilder.mainMenu(),
    });
  }
}