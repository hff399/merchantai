import { MyContext, ROUTES } from '../types';
import { TEXTS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';
import { supabase } from '../services/supabase';

export async function showMainMenu(ctx: MyContext): Promise<void> {
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

  // Update session
  ctx.session.currentRoute = ROUTES.MAIN_MENU;
  ctx.session.tempData = {};

  // Send welcome message with main menu keyboard
  await ctx.reply(TEXTS.WELCOME, {
    reply_markup: KeyboardBuilder.mainMenu(),
  });
}

export async function handleMainMenuNavigation(ctx: MyContext): Promise<boolean> {
  const text = ctx.message?.text;

  if (!text) return false;

  switch (text) {
    case TEXTS.BTN_IMAGE_CARD:
      ctx.session.currentRoute = ROUTES.IMAGE_CARD;
      return true;

    case TEXTS.BTN_PHOTO_SESSION:
      ctx.session.currentRoute = ROUTES.PHOTO_SESSION;
      return true;

    case TEXTS.BTN_MY_PROFILE:
      ctx.session.currentRoute = ROUTES.PROFILE;
      return true;

    case TEXTS.BTN_SUPPORT:
      ctx.session.currentRoute = ROUTES.SUPPORT;
      return true;

    case TEXTS.BTN_BUY_PLAN:
      ctx.session.currentRoute = ROUTES.BUY_PLAN;
      return true;

    case TEXTS.BTN_MAIN_MENU:
      await showMainMenu(ctx);
      return true;

    default:
      return false;
  }
}