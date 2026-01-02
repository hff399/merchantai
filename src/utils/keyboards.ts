import { Keyboard, InlineKeyboard } from 'grammy';
import { TEXTS, KEYBOARD_LAYOUTS } from '../constants/texts';

export class KeyboardBuilder {
  static mainMenu(): Keyboard {
    const keyboard = new Keyboard();
    KEYBOARD_LAYOUTS.MAIN_MENU.forEach((row) => {
      keyboard.row();
      row.forEach((button) => {
        keyboard.text(button);
      });
    });
    return keyboard.resized().persistent();
  }
  

  static backToMenu(): Keyboard {
    const keyboard = new Keyboard();
    KEYBOARD_LAYOUTS.BACK_TO_MENU.forEach((row) => {
      keyboard.row();
      row.forEach((button) => {
        keyboard.text(button);
      });
    });
    return keyboard.resized().persistent();
  }


  static cancelAndBack(): InlineKeyboard {
    return new InlineKeyboard()
      .text(TEXTS.BTN_BACK, 'back_to_menu');
  }

  static profileActions(): Keyboard {
    const keyboard = new Keyboard();
    KEYBOARD_LAYOUTS.PROFILE_ACTIONS.forEach((row) => {
      keyboard.row();
      row.forEach((button) => {
        keyboard.text(button);
      });
    });
    return keyboard.resized().persistent();
  }

  static supportActions(): Keyboard {
    const keyboard = new Keyboard();
    KEYBOARD_LAYOUTS.SUPPORT_ACTIONS.forEach((row) => {
      keyboard.row();
      row.forEach((button) => {
        keyboard.text(button);
      });
    });
    return keyboard.resized().persistent();
  }

  static planSelection(): InlineKeyboard {
    return new InlineKeyboard()
      .text('💚 Стартовый - 490₽', 'plan_starter')
      .row()
      .text('💙 Профессиональный - 1490₽', 'plan_pro')
      .row()
      .text('💜 Бизнес - 2990₽', 'plan_business')
      .row()
      .text(TEXTS.BTN_BACK, 'back_to_menu');
  }

  static paymentConfirm(paymentUrl: string): InlineKeyboard {
    return new InlineKeyboard()
      .url('💳 Оплатить', paymentUrl)
      .row()
      .text('✅ Я оплатил', 'payment_check')
      .row()
      .text(TEXTS.BTN_CANCEL, 'payment_cancel');
  }

  static remove(): { remove_keyboard: boolean } {
    return { remove_keyboard: true };
  }
}