/**
 * Credits purchase composer
 */

import { Composer } from 'grammy';
import type { MyContext } from '../context';
import { CALLBACKS, TEXTS, CREDIT_PACKAGES } from '../../core/constants';
import { creditPackagesKeyboard, paymentConfirmKeyboard, backToMenuKeyboard } from '../keyboards';

export function createCreditsComposer(): Composer<MyContext> {
  const composer = new Composer<MyContext>();

  // Show buy credits
  composer.callbackQuery(CALLBACKS.BUY_CREDITS, async (ctx) => {
    await ctx.answerCallbackQuery();
    await showBuyCredits(ctx, true);
  });

  // Package selection
  composer.callbackQuery(CALLBACKS.BUY_STARTER, async (ctx) => {
    await handlePackageSelection(ctx, 'starter');
  });

  composer.callbackQuery(CALLBACKS.BUY_PRO, async (ctx) => {
    await handlePackageSelection(ctx, 'pro');
  });

  composer.callbackQuery(CALLBACKS.BUY_BIG, async (ctx) => {
    await handlePackageSelection(ctx, 'big');
  });

  composer.callbackQuery(CALLBACKS.BUY_ENTERPRISE, async (ctx) => {
    await handleEnterpriseSelection(ctx);
  });

  // Payment check
  composer.callbackQuery(CALLBACKS.PAYMENT_CHECK, async (ctx) => {
    await handlePaymentCheck(ctx);
  });

  // Payment cancel
  composer.callbackQuery(CALLBACKS.PAYMENT_CANCEL, async (ctx) => {
    await handlePaymentCancel(ctx);
  });

  return composer;
}

async function showBuyCredits(ctx: MyContext, editMessage = false): Promise<void> {
  const user = await ctx.services.user.getUser(ctx.from!.id);
  const currentCredits = user?.credits || 0;

  const text = `💳 <b>Покупка токенов</b>

Ваш баланс: <b>${currentCredits} токенов</b>

<b>Стоимость операций:</b>
• 1 карточка = 4 токена
• 1 редактирование = 2 токена

Выберите пакет 👇`;

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

async function handlePackageSelection(
  ctx: MyContext,
  packageId: keyof typeof CREDIT_PACKAGES
): Promise<void> {
  await ctx.answerCallbackQuery();

  const pkg = CREDIT_PACKAGES[packageId];
  if (!pkg) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  const user = await ctx.services.user.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  // Create payment
  const payment = await ctx.services.payment.createPayment(user.id, packageId, pkg.price);

  // Store payment ID in session for later verification
  ctx.session.tempData = { paymentId: payment.id, packageId };

  // For now, show a placeholder payment message
  // In real implementation, this would integrate with YooKassa
  const text = `💳 <b>Оплата пакета ${pkg.name}</b>

💰 Сумма: ${pkg.price}₽
📦 Кредитов: ${pkg.credits}
🎨 Хватит на: ~${pkg.cardsCount} карточек

После оплаты нажмите "Проверить оплату"`;

  await ctx.reply(text, {
    parse_mode: 'HTML',
    reply_markup: paymentConfirmKeyboard(`https://example.com/pay/${payment.id}`),
  });
}

async function handleEnterpriseSelection(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  await ctx.reply(
    `💎 <b>Enterprise пакет</b>

Для крупных заказов мы предлагаем индивидуальные условия:
• Персональный менеджер
• Приоритетная поддержка
• Скидки на объём
• API доступ

Свяжитесь с нами: ${TEXTS.SUPPORT_CONTACT}`,
    {
      parse_mode: 'HTML',
      reply_markup: backToMenuKeyboard(),
    }
  );
}

async function handlePaymentCheck(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const paymentId = ctx.session.tempData?.paymentId as string | undefined;
  const packageId = ctx.session.tempData?.packageId as string | undefined;

  if (!paymentId || !packageId) {
    await ctx.reply('Платёж не найден. Попробуйте оформить заказ заново.', {
      reply_markup: creditPackagesKeyboard(),
    });
    return;
  }

  const payment = await ctx.services.payment.getPayment(paymentId);

  if (!payment) {
    await ctx.reply('Платёж не найден.', {
      reply_markup: creditPackagesKeyboard(),
    });
    return;
  }

  if (payment.status === 'succeeded') {
    // Payment already processed
    await ctx.reply(TEXTS.BUY_CREDITS_PAYMENT_SUCCESS, {
      reply_markup: backToMenuKeyboard(),
    });
    return;
  }

  // In real implementation, check with YooKassa here
  // For now, just show waiting message
  await ctx.reply('⏳ Платёж ещё не подтверждён. Попробуйте через несколько секунд.', {
    reply_markup: paymentConfirmKeyboard(`https://example.com/pay/${paymentId}`),
  });
}

async function handlePaymentCancel(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const paymentId = ctx.session.tempData?.paymentId as string | undefined;

  if (paymentId) {
    try {
      await ctx.services.payment.updatePayment(paymentId, { status: 'cancelled' });
    } catch (error) {
      console.error('Error cancelling payment:', error);
    }
  }

  ctx.session.tempData = {};

  await ctx.reply(TEXTS.BUY_CREDITS_PAYMENT_CANCELLED, {
    reply_markup: creditPackagesKeyboard(),
  });
}
