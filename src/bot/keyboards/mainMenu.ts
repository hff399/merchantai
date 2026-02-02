/**
 * Main menu keyboards
 * Clean, no-emoji design for consistent rendering
 */

import { InlineKeyboard } from 'grammy';
import { TEXTS, CALLBACKS, CREDIT_PACKAGES } from '../../core/constants';

/**
 * Main menu keyboard with optional credit display
 */
export function mainMenuKeyboard(creditsBalance?: number): InlineKeyboard {
  const keyboard = new InlineKeyboard()
    .text(TEXTS.BTN_CREATE_CARD, CALLBACKS.IMAGE_CARD)
    .row()
    .text(TEXTS.BTN_MY_PROFILE, CALLBACKS.PROFILE)
    .text(TEXTS.BTN_HELP, CALLBACKS.SUPPORT)
    .row()
    .text(TEXTS.BTN_TOKENS, CALLBACKS.BUY_CREDITS);

  // Add urgent buy button if low on credits
  if (creditsBalance !== undefined && creditsBalance < 4) {
    keyboard.row().text('Пополнить баланс', CALLBACKS.BUY_CREDITS);
  }

  return keyboard;
}

/**
 * Back to menu button
 */
export function backToMenuKeyboard(): InlineKeyboard {
  return new InlineKeyboard().text(TEXTS.BTN_MENU, CALLBACKS.BACK_TO_MENU);
}

/**
 * Cancel button
 */
export function cancelKeyboard(): InlineKeyboard {
  return new InlineKeyboard().text(TEXTS.BTN_CANCEL, CALLBACKS.BACK_TO_MENU);
}

/**
 * Credit packages keyboard - clean pricing
 */
export function creditPackagesKeyboard(): InlineKeyboard {
  const starter = CREDIT_PACKAGES.starter;
  const pro = CREDIT_PACKAGES.pro;
  const big = CREDIT_PACKAGES.big;

  return new InlineKeyboard()
    .text(`Starter · ${starter.price}₽`, CALLBACKS.BUY_STARTER)
    .row()
    .text(`Pro · ${pro.price}₽ · Выгодно`, CALLBACKS.BUY_PRO)
    .row()
    .text(`Big · ${big.price}₽`, CALLBACKS.BUY_BIG)
    .row()
    .text(`Enterprise · от 10 000₽`, CALLBACKS.BUY_ENTERPRISE)
    .row()
    .text('Почему такая цена?', CALLBACKS.PRICE_EXPLAIN)
    .row()
    .text(TEXTS.BTN_MENU, CALLBACKS.BACK_TO_MENU);
}

/**
 * Compact credit packages (for paywalls)
 */
export function compactPackagesKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text('Starter · 590₽', CALLBACKS.BUY_STARTER)
    .row()
    .text('Pro · 1 490₽', CALLBACKS.BUY_PRO)
    .row()
    .text('Big · 4 990₽', CALLBACKS.BUY_BIG)
    .row()
    .text(TEXTS.BTN_MENU, CALLBACKS.BACK_TO_MENU);
}

/**
 * Payment confirmation keyboard
 */
export function paymentConfirmKeyboard(paymentUrl: string): InlineKeyboard {
  return new InlineKeyboard()
    .url('Оплатить', paymentUrl)
    .row()
    .text('Проверить оплату', CALLBACKS.PAYMENT_CHECK)
    .row()
    .text(TEXTS.BTN_CANCEL, CALLBACKS.PAYMENT_CANCEL);
}

/**
 * Profile actions keyboard
 */
export function profileActionsKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text(TEXTS.BTN_BUY_TOKENS, CALLBACKS.PROFILE_BUY_CREDITS)
    .text(TEXTS.PROFILE_BTN_HISTORY, CALLBACKS.PROFILE_HISTORY)
    .row()
    .text(TEXTS.BTN_MENU, CALLBACKS.BACK_TO_MENU);
}

/**
 * Support actions keyboard
 */
export function supportActionsKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text('Как создать карточку?', CALLBACKS.SUPPORT_FAQ_CREATE)
    .row()
    .text('Сколько стоят токены?', CALLBACKS.SUPPORT_FAQ_PRICING)
    .row()
    .text('Как сделать карусель?', CALLBACKS.SUPPORT_FAQ_CAROUSEL)
    .row()
    .text('Написать в поддержку', CALLBACKS.SUPPORT_CONTACT)
    .row()
    .text(TEXTS.BTN_MENU, CALLBACKS.BACK_TO_MENU);
}

/**
 * Error recovery keyboard
 */
export function errorKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text(TEXTS.BTN_TRY_AGAIN, CALLBACKS.IMAGE_CARD)
    .row()
    .text(TEXTS.BTN_CONTACT_SUPPORT, CALLBACKS.SUPPORT_CONTACT)
    .row()
    .text(TEXTS.BTN_MENU, CALLBACKS.BACK_TO_MENU);
}

/**
 * Confirmation keyboard (Yes/No)
 */
export function confirmKeyboard(confirmCallback: string, cancelCallback: string = CALLBACKS.BACK_TO_MENU): InlineKeyboard {
  return new InlineKeyboard()
    .text('Да', confirmCallback)
    .text('Нет', cancelCallback);
}
