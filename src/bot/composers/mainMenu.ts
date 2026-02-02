/**
 * Main menu callbacks composer
 */

import { Composer } from 'grammy';
import type { MyContext } from '../context';
import { CALLBACKS, TEXTS, ROUTES } from '../../core/constants';
import { mainMenuKeyboard } from '../keyboards';

export function createMainMenuComposer(): Composer<MyContext> {
  const composer = new Composer<MyContext>();

  // Back to menu
  composer.callbackQuery(CALLBACKS.BACK_TO_MENU, async (ctx) => {
    await ctx.answerCallbackQuery();

    ctx.session.currentRoute = ROUTES.MAIN_MENU;

    try {
      await ctx.editMessageText(TEXTS.WELCOME, {
        parse_mode: 'HTML',
        reply_markup: mainMenuKeyboard(),
      });
    } catch {
      await ctx.reply(TEXTS.WELCOME, {
        parse_mode: 'HTML',
        reply_markup: mainMenuKeyboard(),
      });
    }
  });

  // Continue to menu
  composer.callbackQuery(CALLBACKS.CONTINUE_TO_MENU, async (ctx) => {
    await ctx.answerCallbackQuery();

    ctx.session.currentRoute = ROUTES.MAIN_MENU;

    await ctx.reply(TEXTS.WELCOME, {
      parse_mode: 'HTML',
      reply_markup: mainMenuKeyboard(),
    });
  });

  return composer;
}
