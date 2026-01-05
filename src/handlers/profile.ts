import { MyContext } from '../types';
import { TEXTS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager, formatDate } from '../utils/helpers';
import { supabase } from '../services/supabase';
import { config } from '../config';

export async function handleProfile(ctx: MyContext, editMessage = false): Promise<void> {
  await MessageManager.cleanup(ctx);

  try {
    // Get user from database
    const user = await supabase.getUser(ctx.from!.id);

    if (!user) {
      await ctx.reply(TEXTS.ERROR_GENERAL, {
        reply_markup: KeyboardBuilder.mainMenu(),
      });
      return;
    }

    // Get referral stats (with safe defaults)
    const referralStats = await supabase.getReferralStats(user.id);
    
    // Build bot username for referral link
    const botUsername = ctx.me?.username || 'MerchantAIBot';
    const referralCode = referralStats.referralCode || user.id.substring(0, 8);
    const referralLink = `https://t.me/${botUsername}?start=ref_${referralCode}`;

    // Format profile information
    const profileText = `<b>Профиль</b>

Имя: ${user.first_name || user.username || 'Пользователь'}
Дата регистрации: ${formatDate(user.created_at)}

<b>Баланс:</b> ${user.credits || 0} токенов
<b>Создано карточек:</b> ${user.cards_created || 0}

<b>Реферальная программа</b>
Приглашено: ${referralStats.referralsCount} чел.
Заработано: ${referralStats.earnings} ₽

Ваша ссылка:
<code>${referralLink}</code>

<i>Получайте 10% от покупок приглашённых!</i>`;

    if (editMessage && ctx.callbackQuery?.message) {
      try {
        await ctx.editMessageText(profileText, {
          parse_mode: 'HTML',
          reply_markup: KeyboardBuilder.profileActions(),
        });
      } catch {
        await ctx.reply(profileText, {
          parse_mode: 'HTML',
          reply_markup: KeyboardBuilder.profileActions(),
        });
      }
    } else {
      await ctx.reply(profileText, {
        parse_mode: 'HTML',
        reply_markup: KeyboardBuilder.profileActions(),
      });
    }
  } catch (error) {
    console.error('Profile error:', error);
    await ctx.reply(TEXTS.ERROR_GENERAL, {
      reply_markup: KeyboardBuilder.mainMenu(),
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
    if (ctx.callbackQuery?.message) {
      await ctx.editMessageText(
        '<b>История заказов пуста</b>\n\nВы ещё не создавали карточки.',
        {
          parse_mode: 'HTML',
          reply_markup: KeyboardBuilder.profileActions(),
        }
      );
    }
    return;
  }

  // Format history
  let historyText = '<b>История заказов</b>\n\n';

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
    historyText += `${typeName} · ${order.credits_used} токенов\n\n`;
  });

  if (ctx.callbackQuery?.message) {
    await ctx.editMessageText(historyText, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.profileActions(),
    });
  }
}