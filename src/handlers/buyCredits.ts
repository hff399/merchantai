import { MyContext, CREDIT_PACKAGES } from '../types';
import { TEXTS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';
import { supabase } from '../services/supabase';
import { yookassa } from '../services/yookassa';
import { notificationBot } from '../services/notificationBot';

export async function handleBuyCredits(ctx: MyContext, editMessage = false): Promise<void> {
  await MessageManager.cleanup(ctx);

  const creditsText = `<b>Тарифы</b>

⭐ <b>Starter</b> — <s>890 ₽</s> 590 ₽
15 генераций · ~39₽ / генерация
Базовый функционал для знакомства с ботом.
• Генерация карточек
• Редактирование результатов


✅ <b>Pro — популярный</b> — <s>1890 ₽</s> 1490 ₽
45 генераций · ~33₽ / генерация
Для тех, кто хочет получать <b>максимум качества</b>.
• Приоритетная поддержка
• Лучшее соотношение кол-во/цена


💎 <b>Big</b> — <s>5790 ₽</s> 4990 ₽
170 генераций · ~29₽ / генерация
• Всё то же, что в Pro
• На <b>17%</b> выгоднее, чем Pro
• В <b>4 раза</b> больше генераций — для тех, кому важен объём


<b>Enterprise</b> — от 10 000 ₽
Индивидуальные условия под большие объёмы.

<blockquote><b>Как считаются кредиты</b>
<i>4 токена = 1 генерация</i></blockquote>`;


  if (editMessage && ctx.callbackQuery?.message) {
    try {
      await ctx.editMessageText(creditsText, {
        parse_mode: 'HTML',
        reply_markup: KeyboardBuilder.creditPackages(),
      });
    } catch {
      await ctx.reply(creditsText, {
        parse_mode: 'HTML',
        reply_markup: KeyboardBuilder.creditPackages(),
      });
    }
  } else {
    await ctx.reply(creditsText, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.creditPackages(),
    });
  }
}

export async function handleCreditPackageSelection(
  ctx: MyContext,
  packageId: string
): Promise<void> {
  // Type guard for valid package IDs
  if (!['starter', 'pro', 'big', 'enterprise'].includes(packageId)) {
    await ctx.answerCallbackQuery({ text: 'Неверный пакет', show_alert: true });
    return;
  }
  const creditPackage = CREDIT_PACKAGES[packageId as keyof typeof CREDIT_PACKAGES];

  if (!creditPackage) {
    await ctx.answerCallbackQuery({ text: 'Неверный пакет', show_alert: true });
    return;
  }

  await ctx.answerCallbackQuery();

  // Handle Enterprise separately - redirect to support
  if (packageId === 'enterprise') {
    if (ctx.callbackQuery?.message) {
      try {
        await ctx.api.deleteMessage(ctx.chat!.id, ctx.callbackQuery.message.message_id);
      } catch {}
    }

    const enterpriseText = `🚀 <b>ENTERPRISE тариф</b>

Индивидуальные условия для вашего бизнеса:

✅ Персональные лимиты токенов
✅ API доступ и интеграции
✅ Приоритетная поддержка
✅ Персональный менеджер
✅ Лучшие цены

💬 Для оформления напишите нам:
@leomishinbiz`;

    await ctx.reply(enterpriseText, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.backToMenu(),
    });
    return;
  }

  // Get user
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  try {
    // Delete the package selection message
    if (ctx.callbackQuery?.message) {
      await ctx.api.deleteMessage(ctx.chat!.id, ctx.callbackQuery.message.message_id);
    }

    // Send processing message
    await MessageManager.sendProcessing(ctx, TEXTS.BUY_CREDITS_PAYMENT_WAIT);

    // Create payment in database
    const payment = await supabase.createPayment(
      user.id,
      packageId,
      creditPackage.price,
      'RUB'
    );

    // Create payment with YooKassa
    const yooPayment = await yookassa.createPayment({
      amount: creditPackage.price,
      currency: 'RUB',
      description: `${creditPackage.emoji} ${creditPackage.name} — ~${creditPackage.cardsCount} карточек`,
      returnUrl: `https://t.me/${ctx.me.username}`,
      metadata: {
        payment_id: payment.id,
        user_id: user.id,
        package_id: packageId,
        credits: creditPackage.credits,
      },
    });

    // Update payment with YooKassa ID
    await supabase.updatePayment(payment.id, {
      yookassa_payment_id: yooPayment.id,
    });

    // Delete processing message
    await MessageManager.deleteProcessing(ctx);

    // Send payment link - clean design
    const paymentText = `<b>Оплата</b>

${creditPackage.name} — ${creditPackage.price} ₽
${creditPackage.credits} токенов · ${creditPackage.cardsCount} генераций

1. Нажмите «Оплатить»
2. Завершите оплату
3. Нажмите «Проверить оплату»`;

    await ctx.reply(paymentText, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.paymentConfirm(yooPayment.confirmation.confirmation_url),
    });

    // Store payment ID in session for checking
    ctx.session.tempData = {
      paymentId: payment.id,
      yooPaymentId: yooPayment.id,
      packageId: packageId,
      credits: creditPackage.credits,
    };
  } catch (error) {
    console.error('Payment creation error:', error);

    await MessageManager.deleteProcessing(ctx);

    await ctx.reply('❌ Произошла ошибка при создании платежа. Попробуйте ещё раз.', {
      reply_markup: KeyboardBuilder.mainMenu(),
    });
  }
}

export async function handlePaymentCheck(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const paymentData = ctx.session.tempData as {
    paymentId?: string;
    yooPaymentId?: string;
    packageId?: string;
    credits?: number;
  };

  if (!paymentData?.paymentId || !paymentData?.yooPaymentId) {
    await ctx.reply('❌ Информация о платеже не найдена', {
      reply_markup: KeyboardBuilder.mainMenu(),
    });
    return;
  }

  try {
    // Check payment status with YooKassa
    const yooPayment = await yookassa.getPayment(paymentData.yooPaymentId);

    if (yookassa.isPaymentSucceeded(yooPayment)) {
      // Get user
      const user = await supabase.getUser(ctx.from!.id);
      if (!user) {
        await ctx.reply(TEXTS.ERROR_GENERAL);
        return;
      }

      const creditsToAdd = paymentData.credits || 0;

      // Update payment status
      await supabase.updatePayment(paymentData.paymentId, {
        status: 'succeeded',
      });

      // Add credits to user
      await supabase.updateUserCredits(user.id, creditsToAdd);

      // Send notification about purchase
      const pkgId = paymentData.packageId as keyof typeof CREDIT_PACKAGES | undefined;
      const creditPackage = pkgId ? CREDIT_PACKAGES[pkgId] : undefined;
      await notificationBot.notifyPurchase(
        user.id,
        ctx.from?.username,
        creditPackage?.name || paymentData.packageId || 'Unknown',
        creditsToAdd,
        creditPackage?.price || 0,
        'RUB'
      );

      // Delete payment message
      if (ctx.callbackQuery?.message) {
        await ctx.api.deleteMessage(ctx.chat!.id, ctx.callbackQuery.message.message_id);
      }

      // Send success message
      await ctx.reply(
        `${TEXTS.BUY_CREDITS_PAYMENT_SUCCESS}

🎉 Зачислено кредитов: ${creditsToAdd}
💰 Всего кредитов: ${user.credits + creditsToAdd}`,
        {
          reply_markup: KeyboardBuilder.mainMenu(),
        }
      );

      // Clear temp data
      ctx.session.tempData = {};
    } else if (yookassa.isPaymentPending(yooPayment)) {
      await ctx.answerCallbackQuery({
        text: '⏳ Платёж ещё обрабатывается. Попробуйте через минуту.',
        show_alert: true,
      });
    } else {
      await ctx.answerCallbackQuery({
        text: '❌ Платёж не найден или отменён',
        show_alert: true,
      });
    }
  } catch (error) {
    console.error('Payment check error:', error);
    await ctx.reply('❌ Ошибка проверки платежа. Обратитесь в поддержку.', {
      reply_markup: KeyboardBuilder.mainMenu(),
    });
  }
}

export async function handlePaymentCancel(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const paymentData = ctx.session.tempData as { paymentId?: string };

  if (paymentData?.paymentId) {
    await supabase.updatePayment(paymentData.paymentId, {
      status: 'cancelled',
    });
  }

  // Delete payment message
  if (ctx.callbackQuery?.message) {
    await ctx.api.deleteMessage(ctx.chat!.id, ctx.callbackQuery.message.message_id);
  }

  await ctx.reply(TEXTS.BUY_CREDITS_PAYMENT_CANCELLED, {
    reply_markup: KeyboardBuilder.mainMenu(),
  });

  // Clear temp data
  ctx.session.tempData = {};
}