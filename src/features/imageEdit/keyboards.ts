/**
 * Image edit keyboards
 */

import { InlineKeyboard } from 'grammy';
import { CALLBACKS } from '../../core/constants';

export function imageEditSessionKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text('🔁 Повторить с тем же промптом', CALLBACKS.EDIT_REGENERATE)
    .row()
    .text('🏠 Главное меню', CALLBACKS.BACK_TO_MENU);
}
