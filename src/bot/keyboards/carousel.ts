/**
 * Carousel keyboards
 * Clean buttons without emoji for consistent rendering
 */

import { InlineKeyboard } from 'grammy';
import { CALLBACKS } from '../../core/constants';

// Get slide word ending (Russian morphology)
function getSlideWord(count: number): string {
  const lastTwo = count % 100;
  const lastOne = count % 10;

  if (lastTwo >= 11 && lastTwo <= 19) return 'ов';
  if (lastOne === 1) return '';
  if (lastOne >= 2 && lastOne <= 4) return 'а';
  return 'ов';
}

/**
 * Carousel session keyboard - shown after generating a slide
 * Download is primary action
 */
export function carouselSessionKeyboard(slideNumber: number): InlineKeyboard {
  return new InlineKeyboard()
    // Primary action: Download
    .text('Скачать HD', CALLBACKS.CAROUSEL_FINISH) // Will trigger download on finish
    .row()
    // Secondary actions
    .text('Ещё вариант', CALLBACKS.CAROUSEL_REGENERATE)
    .text('+ Слайд', CALLBACKS.CAROUSEL_NEXT_SLIDE)
    .row()
    // Finish option
    .text(`Завершить (${slideNumber} слайд${getSlideWord(slideNumber)})`, CALLBACKS.CAROUSEL_FINISH)
    .row()
    .text('Меню', CALLBACKS.BACK_TO_MENU);
}

/**
 * Simple result keyboard - for single card in carousel flow
 */
export function carouselResultKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text('Скачать HD', CALLBACKS.CAROUSEL_FINISH)
    .row()
    .text('Ещё вариант', CALLBACKS.CAROUSEL_REGENERATE)
    .text('+ Слайд', CALLBACKS.CAROUSEL_NEXT_SLIDE)
    .row()
    .text('Меню', CALLBACKS.BACK_TO_MENU);
}

/**
 * Image collection keyboard - shown while collecting photos
 */
export function imageCollectionKeyboard(imageCount: number): InlineKeyboard {
  const keyboard = new InlineKeyboard();

  if (imageCount > 0) {
    keyboard
      .text(`Готово (${imageCount} фото)`, CALLBACKS.CAROUSEL_IMAGES_DONE)
      .row();
  }

  keyboard.text('Отмена', CALLBACKS.BACK_TO_MENU);

  return keyboard;
}

/**
 * Next slide keyboard - shown after saving a slide
 */
export function nextSlideKeyboard(slidesCount: number): InlineKeyboard {
  return new InlineKeyboard()
    .text(`Завершить (${slidesCount} слайд${getSlideWord(slidesCount)})`, CALLBACKS.CAROUSEL_FINISH)
    .row()
    .text('Меню', CALLBACKS.BACK_TO_MENU);
}

/**
 * Prompt input keyboard - shown when waiting for prompt
 */
export function promptInputKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text('Отмена', CALLBACKS.BACK_TO_MENU);
}
