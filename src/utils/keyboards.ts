import { InlineKeyboard } from 'grammy';
import { TEXTS, CALLBACKS } from '../constants/texts';
import { CREDIT_PACKAGES, CreditPackageId } from '../core/constants';

export class KeyboardBuilder {
  // Main menu - now inline
  static mainMenu(): InlineKeyboard {
    return new InlineKeyboard()
      .text(TEXTS.BTN_IMAGE_CARD, CALLBACKS.IMAGE_CARD)
      //.text(TEXTS.BTN_IMAGE_EDIT, CALLBACKS.IMAGE_EDIT)
      .row()
      //.text(TEXTS.BTN_PHOTO_SESSION, CALLBACKS.PHOTO_SESSION)
      //.row()
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

  // Image card - photo received, waiting for prompt
  static imageCardPhotoReceived(): InlineKeyboard {
    return new InlineKeyboard().text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Image card session - after generation
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

  // Image edit - photo received, waiting for prompt
  static imageEditPhotoReceived(): InlineKeyboard {
    return new InlineKeyboard().text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Image edit session - after editing
  static imageEditSession(): InlineKeyboard {
    return new InlineKeyboard()
      .text('🔁 Повторить с тем же промптом', CALLBACKS.EDIT_REGENERATE)
      .row()
      .text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Photo session - waiting for photo
  static photoSessionWaiting(): InlineKeyboard {
    return new InlineKeyboard().text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
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

  // Credit packages selection - clean design
  static creditPackages(): InlineKeyboard {
    const starter = CREDIT_PACKAGES.starter;
    const pro = CREDIT_PACKAGES.pro;
    const big = CREDIT_PACKAGES.big;

    return new InlineKeyboard()
      .text(`⭐ ${starter.name} · ${starter.price}₽`, CALLBACKS.BUY_STARTER)
      .row()
      .text(`✅ ${pro.name} · ${pro.price}₽`, CALLBACKS.BUY_PRO)
      .row()
      .text(`💎 ${big.name} · ${big.price}₽`, CALLBACKS.BUY_BIG)
      .row()
      .text(`Enterprise · от 10 000 ₽`, CALLBACKS.BUY_ENTERPRISE)
      .row()
      .text('❓ Почему такая цена?', CALLBACKS.PRICE_EXPLAIN)
      .row()
      .text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Credit packages for paywall - NO menu button
  static creditPackagesPaywall(): InlineKeyboard {
    const starter = CREDIT_PACKAGES.starter;
    const pro = CREDIT_PACKAGES.pro;
    const big = CREDIT_PACKAGES.big;

    return new InlineKeyboard()
      .text(`⭐ ${starter.name} · ${starter.price}₽`, CALLBACKS.BUY_STARTER)
      .row()
      .text(`✅ ${pro.name} · ${pro.price}₽`, CALLBACKS.BUY_PRO)
      .row()
      .text(`💎 ${big.name} · ${big.price}₽`, CALLBACKS.BUY_BIG)
      .row()
      .text(`Enterprise · от 10 000 ₽`, CALLBACKS.BUY_ENTERPRISE);
  }

  // Payment confirmation
  static paymentConfirm(paymentUrl: string): InlineKeyboard {
    return new InlineKeyboard()
      .url('💳 Оплатить', paymentUrl)
      .row()
      .text('✅ Проверить оплату', CALLBACKS.PAYMENT_CHECK)
      .row()
      .text('❌ Отмена', CALLBACKS.PAYMENT_CANCEL);
  }

  // Simple back button
  static back(): InlineKeyboard {
    return new InlineKeyboard().text(TEXTS.BTN_BACK, CALLBACKS.BACK_TO_MENU);
  }

  // ========== PAYWALL KEYBOARDS ==========

  // Aggressive paywall with recommended package highlighted
  static paywallPackages(recommendedId: CreditPackageId = 'pro'): InlineKeyboard {
    const starter = CREDIT_PACKAGES.starter;
    const pro = CREDIT_PACKAGES.pro;
    const big = CREDIT_PACKAGES.big;

    const keyboard = new InlineKeyboard();

    // Highlight recommended package
    if (recommendedId === 'starter') {
      keyboard.text(`⭐ ${starter.name} · ${starter.price}₽ ← ВЫБРАТЬ`, CALLBACKS.BUY_STARTER);
    } else {
      keyboard.text(`⭐ ${starter.name} · ${starter.price}₽`, CALLBACKS.BUY_STARTER);
    }

    keyboard.row();

    if (recommendedId === 'pro') {
      keyboard.text(`🔥 ${pro.name} · ${pro.price}₽ ← ЛУЧШИЙ ВЫБОР`, CALLBACKS.BUY_PRO);
    } else {
      keyboard.text(`✅ ${pro.name} · ${pro.price}₽`, CALLBACKS.BUY_PRO);
    }

    keyboard.row();

    if (recommendedId === 'big') {
      keyboard.text(`💎 ${big.name} · ${big.price}₽ ← МАКСИМУМ`, CALLBACKS.BUY_BIG);
    } else {
      keyboard.text(`💎 ${big.name} · ${big.price}₽`, CALLBACKS.BUY_BIG);
    }

    keyboard.row();
    keyboard.text('💬 Enterprise · индивидуально', CALLBACKS.BUY_ENTERPRISE);
    keyboard.row();
    keyboard.text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);

    return keyboard;
  }

  // Low credits critical warning keyboard
  static lowCreditsWarning(): InlineKeyboard {
    const pro = CREDIT_PACKAGES.pro;

    return new InlineKeyboard()
      .text(`🔥 Пополнить Pro · ${pro.price}₽`, CALLBACKS.BUY_PRO)
      .row()
      .text('📦 Все пакеты', CALLBACKS.BUY_CREDITS)
      .text('Позже', CALLBACKS.BACK_TO_MENU);
  }

  // Soft upsell keyboard for low credits
  static softUpsell(): InlineKeyboard {
    return new InlineKeyboard()
      .text('💳 Пополнить', CALLBACKS.BUY_CREDITS)
      .text('Продолжить', CALLBACKS.BACK_TO_MENU);
  }
}