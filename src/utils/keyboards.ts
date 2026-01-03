import { InlineKeyboard } from 'grammy';
import { TEXTS, CALLBACKS } from '../constants/texts';
import { CREDIT_PACKAGES } from '../types';

export class KeyboardBuilder {
  // Main menu - now inline
  static mainMenu(): InlineKeyboard {
    return new InlineKeyboard()
      .text(TEXTS.BTN_IMAGE_CARD, CALLBACKS.IMAGE_CARD)
      //.text(TEXTS.BTN_IMAGE_EDIT, CALLBACKS.IMAGE_EDIT)
      //.row()
      //.text(TEXTS.BTN_PHOTO_SESSION, CALLBACKS.PHOTO_SESSION)
      .row()
      .text(TEXTS.BTN_MY_PROFILE, CALLBACKS.PROFILE)
      .text(TEXTS.BTN_SUPPORT, CALLBACKS.SUPPORT)
      .row()
      .text(TEXTS.BTN_BUY_CREDITS, CALLBACKS.BUY_CREDITS);
  }

  // Back to menu button
  static backToMenu(): InlineKeyboard {
    return new InlineKeyboard().text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Image card - waiting for photo
  static imageCardWaitingPhoto(): InlineKeyboard {
    return new InlineKeyboard().text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Image card - photo received, waiting for prompt (prompt is mandatory)
  static imageCardPhotoReceived(): InlineKeyboard {
    return new InlineKeyboard()
      .text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Image card session - after generation (user can send text directly or go back)
  static imageCardSession(): InlineKeyboard {
    return new InlineKeyboard()
      .text('🔁 Повторить с тем же промптом', CALLBACKS.REGENERATE)
      .row()
      .text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Image edit - waiting for photo
  static imageEditWaitingPhoto(): InlineKeyboard {
    return new InlineKeyboard().text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Image edit - photo received, waiting for prompt (prompt required for edit)
  static imageEditPhotoReceived(): InlineKeyboard {
    return new InlineKeyboard().text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Image edit session - after editing (user can send text directly or go back)
  static imageEditSession(): InlineKeyboard {
    return new InlineKeyboard()
      .text('🔁 Повторить с тем же промптом', CALLBACKS.EDIT_REGENERATE)
      .row()
      .text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Profile actions - inline
  static profileActions(): InlineKeyboard {
    return new InlineKeyboard()
      .text(TEXTS.PROFILE_BTN_BUY_CREDITS, CALLBACKS.PROFILE_BUY_CREDITS)
      .text(TEXTS.PROFILE_BTN_HISTORY, CALLBACKS.PROFILE_HISTORY)
      .row()
      .text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Support actions - inline
  static supportActions(): InlineKeyboard {
    return new InlineKeyboard()
      .text(TEXTS.SUPPORT_BTN_FAQ, CALLBACKS.SUPPORT_FAQ)
      .text(TEXTS.SUPPORT_BTN_CONTACT, CALLBACKS.SUPPORT_CONTACT)
      .row()
      .text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Credit packages selection - inline
  static creditPackages(): InlineKeyboard {
    const small = CREDIT_PACKAGES.small;
    const medium = CREDIT_PACKAGES.medium;
    const large = CREDIT_PACKAGES.large;
    const mega = CREDIT_PACKAGES.mega;

    return new InlineKeyboard()
      .text(`💚 ${small.credits} кред. - ${small.price}₽`, CALLBACKS.BUY_SMALL)
      .row()
      .text(`💙 ${medium.credits} кред. - ${medium.price}₽`, CALLBACKS.BUY_MEDIUM)
      .row()
      .text(`💜 ${large.credits} кред. - ${large.price}₽`, CALLBACKS.BUY_LARGE)
      .row()
      .text(`🧡 ${mega.credits} кред. - ${mega.price}₽`, CALLBACKS.BUY_MEGA)
      .row()
      .text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Payment confirmation
  static paymentConfirm(paymentUrl: string): InlineKeyboard {
    return new InlineKeyboard()
      .url('💳 Оплатить', paymentUrl)
      .row()
      .text('✅ Я оплатил', CALLBACKS.PAYMENT_CHECK)
      .row()
      .text(TEXTS.BTN_CANCEL, CALLBACKS.PAYMENT_CANCEL);
  }

  // Photo session
  static photoSessionWaiting(): InlineKeyboard {
    return new InlineKeyboard().text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Simple back button
  static back(): InlineKeyboard {
    return new InlineKeyboard().text(TEXTS.BTN_BACK, CALLBACKS.BACK_TO_MENU);
  }
}