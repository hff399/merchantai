/**
 * Demo constructor keyboards
 * Simplified flow with combined style selection
 */

import { InlineKeyboard } from 'grammy';
import { CALLBACKS, DEMO_CALLBACKS } from '../../core/constants';
import { TEXTS } from '../../core/constants/texts';

// ============================================
// QUICK START
// ============================================

/**
 * Start demo keyboard
 */
export function startDemoKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text('Создать карточку', DEMO_CALLBACKS.START_DEMO);
}

/**
 * Photo upload keyboard with advanced options
 */
export function photoUploadKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text(TEXTS.BTN_CANCEL, CALLBACKS.BACK_TO_MENU);
}

// ============================================
// SIMPLIFIED STYLE SELECTION (Combined)
// ============================================

/**
 * Quick style selection - most popular options only
 */
export function quickStyleKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text('Marketplace', DEMO_CALLBACKS.VS_MARKETPLACE)
    .text('Tech', DEMO_CALLBACKS.VS_TECH)
    .row()
    .text('Minimal', DEMO_CALLBACKS.VS_MINIMAL)
    .text('Premium', DEMO_CALLBACKS.VS_DARK)
    .row()
    .text('Пропустить', DEMO_CALLBACKS.SKIP_STYLE);
}

/**
 * Combined style picker - all categories in one
 */
export function combinedStyleKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    // Row 1: Visual styles
    .text('Marketplace', DEMO_CALLBACKS.VS_MARKETPLACE)
    .text('Tech', DEMO_CALLBACKS.VS_TECH)
    .text('Eco', DEMO_CALLBACKS.VS_ECO)
    .row()
    .text('Minimal', DEMO_CALLBACKS.VS_MINIMAL)
    .text('Dark', DEMO_CALLBACKS.VS_DARK)
    .text('Яркий', DEMO_CALLBACKS.VS_BRIGHT)
    .row()
    // Row 2: Apply or skip
    .text('Пропустить', DEMO_CALLBACKS.SKIP_STYLE)
    .text('Назад', CALLBACKS.BACK_TO_MENU);
}

// ============================================
// INDIVIDUAL STYLE KEYBOARDS (for editing)
// ============================================

/**
 * Composition keyboard
 */
export function compositionKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text('Крупно (80-90%)', DEMO_CALLBACKS.COMP_MAX_LARGE)
    .row()
    .text('Динамично', DEMO_CALLBACKS.COMP_DYNAMIC)
    .row()
    .text('Строго', DEMO_CALLBACKS.COMP_STRICT)
    .row()
    .text('Вертикально', DEMO_CALLBACKS.COMP_VERTICAL)
    .row()
    .text('Пропустить', DEMO_CALLBACKS.SKIP_COMPOSITION);
}

/**
 * Visual style keyboard
 */
export function visualStyleKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text('Marketplace', DEMO_CALLBACKS.VS_MARKETPLACE)
    .text('Tech', DEMO_CALLBACKS.VS_TECH)
    .row()
    .text('Eco', DEMO_CALLBACKS.VS_ECO)
    .text('Minimal', DEMO_CALLBACKS.VS_MINIMAL)
    .row()
    .text('Dark premium', DEMO_CALLBACKS.VS_DARK)
    .text('Яркий', DEMO_CALLBACKS.VS_BRIGHT)
    .row()
    .text('Пропустить', DEMO_CALLBACKS.SKIP_VISUAL_STYLE);
}

/**
 * Atmosphere keyboard
 */
export function atmosphereKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text('Без эффектов', DEMO_CALLBACKS.ATM_NONE)
    .row()
    .text('Тематическая', DEMO_CALLBACKS.ATM_THEMATIC)
    .row()
    .text('Мягкие блики', DEMO_CALLBACKS.ATM_HIGHLIGHTS)
    .row()
    .text('Движение', DEMO_CALLBACKS.ATM_MOTION)
    .row()
    .text('Пропустить', DEMO_CALLBACKS.SKIP_ATMOSPHERE);
}

/**
 * Infographics keyboard
 */
export function infographicsKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text('UI-инфографика', DEMO_CALLBACKS.INF_CLEAN_UI)
    .row()
    .text('Крупные цифры', DEMO_CALLBACKS.INF_LARGE_NUM)
    .row()
    .text('Минимум текста', DEMO_CALLBACKS.INF_MINIMAL)
    .row()
    .text('Характеристики', DEMO_CALLBACKS.INF_SPECS)
    .row()
    .text('Пропустить', DEMO_CALLBACKS.SKIP_INFOGRAPHICS);
}

/**
 * Text style keyboard
 */
export function textStyleKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text('Факты + цифры', DEMO_CALLBACKS.TXT_FACTS)
    .row()
    .text('Кратко и мощно', DEMO_CALLBACKS.TXT_SHORT)
    .row()
    .text('Польза', DEMO_CALLBACKS.TXT_BENEFIT)
    .row()
    .text('Технический', DEMO_CALLBACKS.TXT_TECH)
    .row()
    .text('Пропустить', DEMO_CALLBACKS.SKIP_TEXT_STYLE);
}

/**
 * Headline keyboard
 */
export function headlineKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text('Самый большой', DEMO_CALLBACKS.HDL_LARGEST)
    .row()
    .text('С подзаголовком', DEMO_CALLBACKS.HDL_SUBTITLE)
    .row()
    .text('Минимальный', DEMO_CALLBACKS.HDL_MINIMAL)
    .row()
    .text('Акцент на цифре', DEMO_CALLBACKS.HDL_NUMBER)
    .row()
    .text('Пропустить', DEMO_CALLBACKS.SKIP_HEADLINE);
}

// ============================================
// RESULT KEYBOARDS
// ============================================

/**
 * First result keyboard - Download as primary action
 */
export function firstResultKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text('Скачать HD', DEMO_CALLBACKS.DOWNLOAD)
    .row()
    .text('Ещё вариант', DEMO_CALLBACKS.NEW_VARIANT)
    .text('Изменить', DEMO_CALLBACKS.EDIT_SUBMISSION)
    .row()
    .text('Меню', CALLBACKS.BACK_TO_MENU);
}

/**
 * Card result keyboard with carousel option
 */
export function cardResultKeyboard(): InlineKeyboard {
  const keyboard = new InlineKeyboard()
    .text('Скачать HD', DEMO_CALLBACKS.DOWNLOAD)
    .row()
    .text('Ещё вариант', DEMO_CALLBACKS.NEW_VARIANT)
    .text('Изменить', DEMO_CALLBACKS.EDIT_SUBMISSION);

  // Add carousel option
  keyboard.row().text('+ Слайд карусели', CALLBACKS.CAROUSEL_NEXT_SLIDE);

  keyboard.row().text('Меню', CALLBACKS.BACK_TO_MENU);

  return keyboard;
}

/**
 * Edit choice keyboard - what to change
 */
export function editChoiceKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text('Композицию', DEMO_CALLBACKS.EDIT_COMPOSITION)
    .text('Стиль', DEMO_CALLBACKS.EDIT_STYLE)
    .row()
    .text('Инфографику', DEMO_CALLBACKS.EDIT_INFOGRAPHICS)
    .text('Тексты', DEMO_CALLBACKS.EDIT_TEXTS)
    .row()
    .text('Новый вариант', DEMO_CALLBACKS.NEW_VARIANT)
    .row()
    .text('Назад', CALLBACKS.BACK_TO_MENU);
}

// ============================================
// PAYWALL KEYBOARDS
// ============================================

/**
 * Paywall keyboard with pricing
 */
export function paywallKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text('Starter · 590₽', CALLBACKS.BUY_STARTER)
    .row()
    .text('Pro · 1 490₽', CALLBACKS.BUY_PRO)
    .row()
    .text('Big · 4 990₽', CALLBACKS.BUY_BIG)
    .row()
    .text('Назад', CALLBACKS.BACK_TO_MENU);
}

/**
 * No credits keyboard
 */
export function noCreditsKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text('Купить токены', CALLBACKS.BUY_CREDITS)
    .row()
    .text('Меню', CALLBACKS.BACK_TO_MENU);
}
