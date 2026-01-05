import { MyContext, CREDIT_PACKAGES } from '../types';
import { TEXTS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';
import { supabase } from '../services/supabase';
import { yookassa } from '../services/yookassa';
import { notificationBot } from '../services/notificationBot';

export async function handleBuyCredits(ctx: MyContext, editMessage = false): Promise<void> {
  await MessageManager.cleanup(ctx);

  const starter = CREDIT_PACKAGES.starter;
  const pro = CREDIT_PACKAGES.pro;
  const big = CREDIT_PACKAGES.big;

  const creditsText = `<b>Тарифы</b>

<b>${starter.name}</b> — ${starter.price} ₽
${starter.cardsCount} генераций · ${starter.pricePerCard} ₽/шт

<b>${pro.name}</b> — ${pro.price} ₽ ⭐
${pro.cardsCount} генераций · ${pro.pricePerCard} ₽/шт

<b>${big.name}</b> — ${big.price} ₽
${big.cardsCount} генераций · ${big.pricePerCard} ₽/шт

<b>Enterprise</b> — от 10 000 ₽
Индивидуальные условия

<i>4 токена = генерация · 2 токена = редактирование</i>`;

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
  const creditPackage = CREDIT_PACKAGES[packageId];

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
✅ SLA и гарантии

💬 Для оформления напишите нам:
@MerchantAI_Support

Или оставьте заявку, и мы свяжемся с вами!`;

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

  const paymentData = ctx.session.tempData;

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
      const creditPackage = CREDIT_PACKAGES[paymentData.packageId];
      await notificationBot.notifyPurchase(
        user.id,
        ctx.from?.username,
        creditPackage?.name || paymentData.packageId,
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

  const paymentData = ctx.session.tempData;

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