import { MyContext, PLANS } from '../types';
import { TEXTS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager, formatDate } from '../utils/helpers';
import { supabase } from '../services/supabase';

export async function handleProfile(ctx: MyContext): Promise<void> {
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
  const planName = user.plan === 'free' ? TEXTS.PROFILE_NO_PLAN : PLANS[user.plan]?.name || user.plan;

  const profileText = TEXTS.PROFILE_INFO.replace('{name}', user.first_name || user.username || 'Пользователь')
    .replace('{date}', formatDate(user.created_at))
    .replace('{plan}', planName)
    .replace('{credits}', user.credits.toString())
    .replace('{cardsCreated}', user.cards_created.toString());

  await ctx.reply(TEXTS.PROFILE_TITLE, {
    reply_markup: KeyboardBuilder.profileActions(),
  });

  await ctx.reply(profileText);
}

export async function handleProfileHistory(ctx: MyContext): Promise<void> {
  // Get user
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  // Get orders
  const orders = await supabase.getUserOrders(user.id, 10);

  if (orders.length === 0) {
    await ctx.reply('📜 История заказов пуста.\n\nВы ещё не создавали карточки.', {
      reply_markup: KeyboardBuilder.profileActions(),
    });
    return;
  }

  // Format history
  let historyText = '📜 *История ваших заказов:*\n\n';

  orders.forEach((order, index) => {
    const emoji = order.type === 'image_card' ? '🎨' : '📸';
    const status =
      order.status === 'completed' ? '✅' : order.status === 'failed' ? '❌' : '⏳';
    const date = formatDate(order.created_at);

    historyText += `${emoji} ${status} ${date}\n`;
    historyText += `Тип: ${order.type === 'image_card' ? 'Карточка' : 'Фотосессия'}\n`;
    historyText += `Кредитов: ${order.credits_used}\n\n`;
  });

  await ctx.reply(historyText, {
    parse_mode: 'Markdown',
    reply_markup: KeyboardBuilder.profileActions(),
  });
}