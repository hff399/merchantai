/**
 * Keyboard exports
 */

export * from './mainMenu';
export * from './carousel';
export * from './demo';

// Legacy KeyboardBuilder class for backward compatibility
import { InlineKeyboard } from 'grammy';
import {
  mainMenuKeyboard,
  backToMenuKeyboard,
  creditPackagesKeyboard,
  compactPackagesKeyboard,
  paymentConfirmKeyboard,
  profileActionsKeyboard,
  supportActionsKeyboard,
  errorKeyboard,
  cancelKeyboard,
} from './mainMenu';

export class KeyboardBuilder {
  static mainMenu(credits?: number): InlineKeyboard {
    return mainMenuKeyboard(credits);
  }

  static backToMenu(): InlineKeyboard {
    return backToMenuKeyboard();
  }

  static creditPackages(): InlineKeyboard {
    return creditPackagesKeyboard();
  }

  static compactPackages(): InlineKeyboard {
    return compactPackagesKeyboard();
  }

  static paymentConfirm(paymentUrl: string): InlineKeyboard {
    return paymentConfirmKeyboard(paymentUrl);
  }

  static profileActions(): InlineKeyboard {
    return profileActionsKeyboard();
  }

  static supportActions(): InlineKeyboard {
    return supportActionsKeyboard();
  }

  static error(): InlineKeyboard {
    return errorKeyboard();
  }

  static cancel(): InlineKeyboard {
    return cancelKeyboard();
  }

  static back(): InlineKeyboard {
    return backToMenuKeyboard();
  }

  // Legacy methods for compatibility
  static imageCardWaitingPhoto(): InlineKeyboard {
    return backToMenuKeyboard();
  }

  static imageCardPhotoReceived(): InlineKeyboard {
    return backToMenuKeyboard();
  }

  static imageCardSession(): InlineKeyboard {
    return new InlineKeyboard()
      .text('Ещё вариант', 'regenerate')
      .row()
      .text('Меню', 'back_to_menu');
  }

  static imageEditWaitingPhoto(): InlineKeyboard {
    return backToMenuKeyboard();
  }

  static imageEditPhotoReceived(): InlineKeyboard {
    return backToMenuKeyboard();
  }

  static imageEditSession(): InlineKeyboard {
    return new InlineKeyboard()
      .text('Ещё вариант', 'edit_regenerate')
      .row()
      .text('Меню', 'back_to_menu');
  }

  static photoSessionWaiting(): InlineKeyboard {
    return backToMenuKeyboard();
  }
}
