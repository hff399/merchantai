import { MyContext } from '../types';
import { TEXTS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager, formatDate } from '../utils/helpers';
import { supabase } from '../services/supabase';

export async function handleProfile(ctx: MyContext, editMessage = false): Promise<void> {
  await MessageManager.cleanup(ctx);

  // Get user from database
  const user = await supabase.getUser(ctx.from!.id);

  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL, {
      reply_markup: KeyboardBuilder.mainMenu(),
    });
    return;
  }

  // Format profile information
  const profileText = TEXTS.PROFILE_INFO
    .replace('{name}', user.first_name || user.username || 'Пользователь')
    .replace('{date}', formatDate(user.created_at))
    .replace('{credits}', user.credits.toString())
    .replace('{cardsCreated}', user.cards_created.toString());

  const fullText = `${TEXTS.PROFILE_TITLE}\n\n${profileText}`;

  if (editMessage && ctx.callbackQuery?.message) {
    try {
      await ctx.editMessageText(fullText, {
        reply_markup: KeyboardBuilder.profileActions(),
      });
    } catch {
      await ctx.reply(fullText, {
        reply_markup: KeyboardBuilder.profileActions(),
      });
    }
  } else {
    await ctx.reply(fullText, {
      reply_markup: KeyboardBuilder.profileActions(),
    });
  }
}

export async function handleProfileHistory(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  // Get user
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  // Get orders
  const orders = await supabase.getUserOrders(user.id, 10);

  if (orders.length === 0) {
    // Edit message to show empty history
    if (ctx.callbackQuery?.message) {
      await ctx.editMessageText(
        '📜 *История заказов пуста*\n\nВы ещё не создавали карточки.',
        {
          parse_mode: 'Markdown',
          reply_markup: KeyboardBuilder.profileActions(),
        }
      );
    }
    return;
  }

  // Format history
  let historyText = '📜 *История ваших заказов:*\n\n';

  orders.forEach((order) => {
    const emoji =
      order.type === 'image_card' ? '🎨' : order.type === 'image_edit' ? '✏️' : '📸';
    const status =
      order.status === 'completed' ? '✅' : order.status === 'failed' ? '❌' : '⏳';
    const date = formatDate(order.created_at);
    const typeName =
      order.type === 'image_card'
        ? 'Карточка'
        : order.type === 'image_edit'
          ? 'Редактирование'
          : 'Фотосессия';

    historyText += `${emoji} ${status} ${date}\n`;
    historyText += `Тип: ${typeName} | Кредитов: ${order.credits_used}\n\n`;
  });

  // Edit message to show history
  if (ctx.callbackQuery?.message) {
    await ctx.editMessageText(historyText, {
      parse_mode: 'Markdown',
      reply_markup: KeyboardBuilder.profileActions(),
    });
  }
}