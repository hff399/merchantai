import { MyContext, PLANS } from '../types';
import { TEXTS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';
import { supabase } from '../services/supabase';
import { yookassa } from '../services/yookassa';

export async function handleBuyPlan(ctx: MyContext): Promise<void> {
  await MessageManager.cleanup(ctx);

  const plansText = `${TEXTS.BUY_PLAN_TITLE}

${TEXTS.BUY_PLAN_DESC}

${TEXTS.BUY_PLAN_STARTER}

${TEXTS.BUY_PLAN_PRO}

${TEXTS.BUY_PLAN_BUSINESS}

Выберите план:`;

  await ctx.reply(plansText, {
    reply_markup: KeyboardBuilder.planSelection(),
  });
}

export async function handlePlanSelection(ctx: MyContext, planType: string): Promise<void> {
  const plan = PLANS[planType];

  if (!plan) {
    await ctx.answerCallbackQuery('Неверный план');
    return;
  }

  await ctx.answerCallbackQuery();

  // Get user
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  try {
    // Delete the plan selection message
    if (ctx.callbackQuery?.message) {
      await ctx.api.deleteMessage(ctx.chat!.id, ctx.callbackQuery.message.message_id);
    }

    // Send processing message
    await MessageManager.sendProcessing(ctx, TEXTS.BUY_PLAN_PAYMENT_WAIT);

    // Create payment in database
    const payment = await supabase.createPayment(user.id, planType, plan.price, 'RUB');

    // Create payment with YooKassa
    const yooPayment = await yookassa.createPayment({
      amount: plan.price,
      currency: 'RUB',
      description: `План ${plan.name} - ${plan.credits} кредитов`,
      returnUrl: `https://t.me/${ctx.me.username}`,
      metadata: {
        payment_id: payment.id,
        user_id: user.id,
        plan: planType,
      },
    });

    // Update payment with YooKassa ID
    await supabase.updatePayment(payment.id, {
      yookassa_payment_id: yooPayment.id,
    });

    // Delete processing message
    await MessageManager.deleteProcessing(ctx);

    // Send payment link
    const paymentText = `💳 *Оплата плана ${plan.name}*

💰 Сумма: ${plan.price} ₽
💳 Кредитов: ${plan.credits}

Нажмите кнопку "Оплатить" и следуйте инструкциям.
После оплаты нажмите "Я оплатил" для проверки статуса.`;

    await ctx.reply(paymentText, {
      parse_mode: 'Markdown',
      reply_markup: KeyboardBuilder.paymentConfirm(yooPayment.confirmation.confirmation_url),
    });

    // Store payment ID in session for checking
    ctx.session.tempData = {
      paymentId: payment.id,
      yooPaymentId: yooPayment.id,
      plan: planType,
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

      // Get plan details
      const plan = PLANS[paymentData.plan];

      // Update payment status
      await supabase.updatePayment(paymentData.paymentId, {
        status: 'succeeded',
      });

      // Update user plan and credits
      await supabase.updateUser(user.id, {
        plan: paymentData.plan,
        credits: user.credits + plan.credits,
      });

      // Delete payment message
      if (ctx.callbackQuery?.message) {
        await ctx.api.deleteMessage(ctx.chat!.id, ctx.callbackQuery.message.message_id);
      }

      // Send success message
      await ctx.reply(
        `${TEXTS.BUY_PLAN_PAYMENT_SUCCESS}

🎉 План "${plan.name}" активирован!
💳 Начислено кредитов: ${plan.credits}
💰 Всего кредитов: ${user.credits + plan.credits}`,
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

  await ctx.reply(TEXTS.BUY_PLAN_PAYMENT_CANCELLED, {
    reply_markup: KeyboardBuilder.mainMenu(),
  });

  // Clear temp data
  ctx.session.tempData = {};
}