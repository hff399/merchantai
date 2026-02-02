/**
 * Profile composer
 */

import { Composer } from 'grammy';
import type { MyContext } from '../context';
import { CALLBACKS, TEXTS } from '../../core/constants';
import { profileActionsKeyboard, backToMenuKeyboard, creditPackagesKeyboard } from '../keyboards';

export function createProfileComposer(): Composer<MyContext> {
  const composer = new Composer<MyContext>();

  // Show profile
  composer.callbackQuery(CALLBACKS.PROFILE, async (ctx) => {
    await ctx.answerCallbackQuery();
    await showProfile(ctx, true);
  });

  // Buy credits from profile
  composer.callbackQuery(CALLBACKS.PROFILE_BUY_CREDITS, async (ctx) => {
    await ctx.answerCallbackQuery();
    await showBuyCredits(ctx, true);
  });

  // Profile history
  composer.callbackQuery(CALLBACKS.PROFILE_HISTORY, async (ctx) => {
    await ctx.answerCallbackQuery();
    await showProfileHistory(ctx);
  });

  return composer;
}

async function showProfile(ctx: MyContext, editMessage = false): Promise<void> {
  const user = await ctx.services.user.getUser(ctx.from!.id);

  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  const name = user.first_name || user.username || 'Пользователь';
  const date = new Date(user.created_at).toLocaleDateString('ru-RU');
  const credits = user.credits;
  const cardsCreated = user.cards_created || 0;

  const text = TEXTS.PROFILE_INFO
    .replace('{name}', name)
    .replace('{date}', date)
    .replace('{credits}', String(credits))
    .replace('{cardsCreated}', String(cardsCreated));

  if (editMessage && ctx.callbackQuery?.message) {
    try {
      await ctx.editMessageText(text, {
        parse_mode: 'HTML',
        reply_markup: profileActionsKeyboard(),
      });
    } catch {
      await ctx.reply(text, {
        parse_mode: 'HTML',
        reply_markup: profileActionsKeyboard(),
      });
    }
  } else {
    await ctx.reply(text, {
      parse_mode: 'HTML',
      reply_markup: profileActionsKeyboard(),
    });
  }
}

async function showBuyCredits(ctx: MyContext, editMessage = false): Promise<void> {
  const text = TEXTS.BUY_CREDITS_TITLE + '\n\n' + TEXTS.BUY_CREDITS_DESC;

  if (editMessage && ctx.callbackQuery?.message) {
    try {
      await ctx.editMessageText(text, {
        parse_mode: 'HTML',
        reply_markup: creditPackagesKeyboard(),
      });
    } catch {
      await ctx.reply(text, {
        parse_mode: 'HTML',
        reply_markup: creditPackagesKeyboard(),
      });
    }
  } else {
    await ctx.reply(text, {
      parse_mode: 'HTML',
      reply_markup: creditPackagesKeyboard(),
    });
  }
}

async function showProfileHistory(ctx: MyContext): Promise<void> {
  const user = await ctx.services.user.getUser(ctx.from!.id);

  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  const orders = await ctx.services.order.getUserOrders(user.id, 10);

  if (orders.length === 0) {
    await ctx.reply('У вас пока нет генераций. Создайте первую карточку!', {
      reply_markup: backToMenuKeyboard(),
    });
    return;
  }

  let historyText = '📜 <b>История генераций</b>\n\n';

  for (const order of orders) {
    const date = new Date(order.created_at).toLocaleDateString('ru-RU');
    const status =
      order.status === 'completed' ? '✅' : order.status === 'failed' ? '❌' : '⏳';
    const type =
      order.type === 'image_card'
        ? '🎨 Карточка'
        : order.type === 'image_edit'
        ? '✏️ Редактирование'
        : '📸 Фотосессия';

    historyText += `${status} ${type} - ${date} (${order.credits_used} кр.)\n`;
  }

  await ctx.reply(historyText, {
    parse_mode: 'HTML',
    reply_markup: backToMenuKeyboard(),
  });
}
