import { MyContext } from '../types';
import { InlineKeyboard } from 'grammy';
import { CALLBACKS } from '../constants/texts';

// Price explain flow states
export const PRICE_EXPLAIN_CALLBACKS = {
  START: 'price_explain_start',
  REASON_1: 'price_reason_1',
  REASON_2: 'price_reason_2',
  REASON_3: 'price_reason_3',
  FINAL: 'price_final',
  BACK_TO_PRICING: 'back_to_pricing',
};

// Flow messages
const PRICE_MESSAGES = {
  START: `Хороший вопрос 👌

Цена — это не «за картинку».
Она формируется из 3 вещей 👇`,

  REASON_1: `1️⃣ <b>Это не одна нейросеть</b>

Мы используем связку моделей:
🔹 генерация
🔹 композиция
🔹 тексты
🔹 шрифты
🔹 пост-обработка

Каждая инфографика —
это несколько AI-проходов,
а не один запрос.`,

  REASON_2: `2️⃣ <b>У каждой инфографики есть себестоимость</b>

Каждая генерация = реальные расходы:
🔹 ChatGPT
🔹 Nano Banana PRO
🔹 инфраструктура (сервера, ИИ агенты)
🔹 хранение изображений
🔹 разработчикам на покушать

<i>(мы берем 20–30% от стоимости генерации и 0% за изменения)</i>

Мы не продаём «воздух».
Каждая инфографика что-то стоит.`,

  REASON_3: `3️⃣ <b>Это в десятки раз дешевле и быстрее ручного подхода или дизайнеров</b>

Для сравнения:
♦️ дизайнер: 400–2000₽ за карточку
♦️ сроки: дни
♦️ правки: отдельно (+время)

Здесь:
🔹 от 29₽ за инфографику (и от 14₽ за изменение)
🔹 сразу
🔹 без ограничений на варианты
🔹 дизайн на том же уровне`,

  FINAL: `<b>Если коротко:</b>

Ты платишь не за «картинку»,
а за быструю и качественную инфографику.

Мы выдаем всем новым пользователям бесплатные генерации (это стоит нам ~50₽ за пользователя), чтобы вы смогли попробовать инструмент и убедиться в качестве нашего продукта, перед тем как совершать покупку 🙂`,
};

// Keyboards for each state
const KEYBOARDS = {
  START: new InlineKeyboard()
    .text('🔍 Узнать из чего', PRICE_EXPLAIN_CALLBACKS.REASON_1)
    .row()
    .text('⬅️ Назад к тарифам', PRICE_EXPLAIN_CALLBACKS.BACK_TO_PRICING),

  REASON_1: new InlineKeyboard()
    .text('➡️ А что ещё?', PRICE_EXPLAIN_CALLBACKS.REASON_2)
    .row()
    .text('⬅️ Назад', PRICE_EXPLAIN_CALLBACKS.START),

  REASON_2: new InlineKeyboard()
    .text('➡️ Последняя причина', PRICE_EXPLAIN_CALLBACKS.REASON_3)
    .row()
    .text('🏠 Меню', CALLBACKS.BACK_TO_MENU),

  REASON_3: new InlineKeyboard()
    .text('🔥 Понял, а что в итоге?', PRICE_EXPLAIN_CALLBACKS.FINAL)
    .row()
    .text('🏠 Меню', CALLBACKS.BACK_TO_MENU),

  FINAL: new InlineKeyboard()
    .text('⭐ Выбрать пакет', PRICE_EXPLAIN_CALLBACKS.BACK_TO_PRICING)
    .row()
    .text('💬 Задать вопрос', CALLBACKS.SUPPORT),
};

// Handler functions
export async function handlePriceExplainStart(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  
  try {
    await ctx.editMessageText(PRICE_MESSAGES.START, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARDS.START,
    });
  } catch {
    await ctx.reply(PRICE_MESSAGES.START, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARDS.START,
    });
  }
}

export async function handlePriceReason1(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  
  try {
    await ctx.editMessageText(PRICE_MESSAGES.REASON_1, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARDS.REASON_1,
    });
  } catch {
    await ctx.reply(PRICE_MESSAGES.REASON_1, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARDS.REASON_1,
    });
  }
}

export async function handlePriceReason2(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  
  try {
    await ctx.editMessageText(PRICE_MESSAGES.REASON_2, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARDS.REASON_2,
    });
  } catch {
    await ctx.reply(PRICE_MESSAGES.REASON_2, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARDS.REASON_2,
    });
  }
}

export async function handlePriceReason3(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  
  try {
    await ctx.editMessageText(PRICE_MESSAGES.REASON_3, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARDS.REASON_3,
    });
  } catch {
    await ctx.reply(PRICE_MESSAGES.REASON_3, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARDS.REASON_3,
    });
  }
}

export async function handlePriceFinal(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  
  try {
    await ctx.editMessageText(PRICE_MESSAGES.FINAL, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARDS.FINAL,
    });
  } catch {
    await ctx.reply(PRICE_MESSAGES.FINAL, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARDS.FINAL,
    });
  }
}