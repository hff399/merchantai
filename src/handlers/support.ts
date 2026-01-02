import { MyContext } from '../types';
import { TEXTS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';

export async function handleSupport(ctx: MyContext, editMessage = false): Promise<void> {
  await MessageManager.cleanup(ctx);

  const supportText = `${TEXTS.SUPPORT_TITLE}

${TEXTS.SUPPORT_DESC}

${TEXTS.SUPPORT_CONTACT}`;

  if (editMessage && ctx.callbackQuery?.message) {
    try {
      await ctx.editMessageText(supportText, {
        reply_markup: KeyboardBuilder.supportActions(),
      });
    } catch {
      await ctx.reply(supportText, {
        reply_markup: KeyboardBuilder.supportActions(),
      });
    }
  } else {
    await ctx.reply(supportText, {
      reply_markup: KeyboardBuilder.supportActions(),
    });
  }
}

export async function handleSupportFAQ(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const faqText = `❓ *Часто задаваемые вопросы*

*1. Как создать карточку товара?*
Нажмите "🎨 Создать карточку", загрузите фото товара и опционально добавьте описание. Наш ИИ создаст профессиональную карточку за 30-60 секунд.

*2. Что такое кредиты?*
Кредиты - это внутренняя валюта бота. Один кредит = одна операция с ИИ. Карточка стоит 4 кредита, фотосессия - 2 кредита, редактирование - 2 кредита.

*3. Как работает редактирование изображений?*
Нажмите "✏️ Изменить изображение", загрузите фото и опишите желаемые изменения. ИИ обработает изображение согласно вашему описанию.

*4. Можно ли вернуть деньги?*
Да, в течение 14 дней с момента покупки при условии, что вы не использовали более 10% кредитов.

*5. Какие форматы поддерживаются?*
Мы принимаем JPG, PNG, WEBP. Рекомендуемое разрешение - от 1024x1024 пикселей.

*6. Как долго хранятся результаты?*
Все созданные карточки доступны в истории заказов в течение 30 дней.

*7. Можно ли использовать коммерчески?*
Да! Все созданные изображения полностью принадлежат вам и могут использоваться для коммерческих целей.`;

  if (ctx.callbackQuery?.message) {
    await ctx.editMessageText(faqText, {
      parse_mode: 'Markdown',
      reply_markup: KeyboardBuilder.supportActions(),
    });
  }
}

export async function handleSupportContact(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const contactText = `📧 *Связаться с нами*

Если вы не нашли ответ на свой вопрос в FAQ, свяжитесь с нами:

*Telegram:* @odissey_wrk
*Время ответа:* 1-24 часа

При обращении укажите:
• Ваш Telegram ID: \`${ctx.from!.id}\`
• Описание проблемы
• Скриншоты (если есть)

Мы обязательно вам поможем! 🙂`;

  if (ctx.callbackQuery?.message) {
    await ctx.editMessageText(contactText, {
      parse_mode: 'Markdown',
      reply_markup: KeyboardBuilder.supportActions(),
    });
  }
}