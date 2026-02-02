/**
 * Support composer
 */

import { Composer } from 'grammy';
import type { MyContext } from '../context';
import { CALLBACKS, TEXTS } from '../../core/constants';
import { supportActionsKeyboard, backToMenuKeyboard } from '../keyboards';

export function createSupportComposer(): Composer<MyContext> {
  const composer = new Composer<MyContext>();

  // Show support
  composer.callbackQuery(CALLBACKS.SUPPORT, async (ctx) => {
    await ctx.answerCallbackQuery();
    await showSupport(ctx, true);
  });

  // FAQ
  composer.callbackQuery(CALLBACKS.SUPPORT_FAQ, async (ctx) => {
    await ctx.answerCallbackQuery();
    await showFAQ(ctx);
  });

  // Contact
  composer.callbackQuery(CALLBACKS.SUPPORT_CONTACT, async (ctx) => {
    await ctx.answerCallbackQuery();
    await showContact(ctx);
  });

  return composer;
}

async function showSupport(ctx: MyContext, editMessage = false): Promise<void> {
  const text = TEXTS.SUPPORT_INFO;

  if (editMessage && ctx.callbackQuery?.message) {
    try {
      await ctx.editMessageText(text, {
        parse_mode: 'HTML',
        reply_markup: supportActionsKeyboard(),
      });
    } catch {
      await ctx.reply(text, {
        parse_mode: 'HTML',
        reply_markup: supportActionsKeyboard(),
      });
    }
  } else {
    await ctx.reply(text, {
      parse_mode: 'HTML',
      reply_markup: supportActionsKeyboard(),
    });
  }
}

async function showFAQ(ctx: MyContext): Promise<void> {
  const faqText = `❓ <b>Часто задаваемые вопросы</b>

<b>Как создать карточку товара?</b>
1. Нажмите "🎨 Создать карточку"
2. Загрузите фото товара
3. Опишите желаемый результат
4. Дождитесь генерации (30-60 сек)

<b>Сколько стоят кредиты?</b>
• Starter: 590₽ за 60 кредитов
• Pro: 1490₽ за 184 кредита
• Big: 4990₽ за 664 кредита

<b>Сколько кредитов нужно?</b>
• 1 карточка = 4 кредита
• 1 редактирование = 2 кредита

<b>Что если результат не понравился?</b>
Вы можете изменить промпт и сгенерировать заново. Каждая генерация расходует кредиты.

<b>Как отменить подписку?</b>
Мы не используем подписки - только разовые покупки кредитов.`;

  await ctx.reply(faqText, {
    parse_mode: 'HTML',
    reply_markup: backToMenuKeyboard(),
  });
}

async function showContact(ctx: MyContext): Promise<void> {
  await ctx.reply(
    `📧 <b>Связаться с поддержкой</b>\n\n${TEXTS.SUPPORT_CONTACT}\n\nМы отвечаем в течение 24 часов.`,
    {
      parse_mode: 'HTML',
      reply_markup: backToMenuKeyboard(),
    }
  );
}
