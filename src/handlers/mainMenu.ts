import { MyContext, ROUTES } from '../types';
import { TEXTS, CALLBACKS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';
import { supabase } from '../services/supabase';

export async function showMainMenu(ctx: MyContext, editMessage = false): Promise<void> {
  // Ensure user exists in database
  if (ctx.from) {
    await supabase.getOrCreateUser(
      ctx.from.id,
      ctx.from.username,
      ctx.from.first_name,
      ctx.from.last_name
    );
  }

  // Clean up any old messages
  await MessageManager.cleanup(ctx);

  // Reset session
  ctx.session.currentRoute = ROUTES.MAIN_MENU;
  ctx.session.tempData = {};
  ctx.session.imageGenSession = undefined;
  ctx.session.imageEditSession = undefined;

  // Send or edit welcome message with inline keyboard
  if (editMessage && ctx.callbackQuery?.message) {
    try {
      await ctx.editMessageText(TEXTS.WELCOME, {
        reply_markup: KeyboardBuilder.mainMenu(),
      });
    } catch (error) {
      // If edit fails, send new message
      await ctx.reply(TEXTS.WELCOME, {
        reply_markup: KeyboardBuilder.mainMenu(),
      });
    }
  } else {
    await ctx.reply(TEXTS.WELCOME, {
      reply_markup: KeyboardBuilder.mainMenu(),
    });
  }
}

export async function handleMainMenuCallback(ctx: MyContext): Promise<void> {
  const callbackData = ctx.callbackQuery?.data;

  if (!callbackData) return;

  await ctx.answerCallbackQuery();

  switch (callbackData) {
    case CALLBACKS.BACK_TO_MENU:
      await showMainMenu(ctx, true);
      break;
  }
}