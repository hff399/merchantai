/**
 * Centralized Paywall & WTA (Willingness To Act) System
 * Optimized for higher conversion with psychological triggers
 */

import { MyContext, CREDIT_PACKAGES } from '../types';
import { CREDITS } from '../core/constants';
import { KeyboardBuilder } from './keyboards';
import { supabase } from '../services/supabase';

// Thresholds
const LOW_CREDITS_THRESHOLD = 8; // Warn when below this
const CRITICAL_CREDITS_THRESHOLD = 4; // Strong warning
const UPGRADE_THRESHOLD_PERCENT = 0.2; // 20% - suggest upgrade if within this of next tier

type OperationType = 'card' | 'edit' | 'photo_session' | 'carousel';

const OPERATION_COSTS: Record<OperationType, number> = {
  card: CREDITS.CARD_GENERATION,
  edit: CREDITS.IMAGE_EDIT,
  photo_session: CREDITS.PHOTO_SESSION,
  carousel: CREDITS.CARD_GENERATION,
};

/**
 * ONE-LINER: Check if user has enough credits and show optimized paywall if not
 * Returns true if user can proceed, false if blocked by paywall
 *
 * Usage in handlers:
 * const { canProceed, user } = await checkCreditsOrShowPaywall(ctx, 'card', ctx.from!.id);
 * if (!canProceed) return;
 */
export async function checkCreditsOrShowPaywall(
  ctx: MyContext,
  operation: OperationType,
  userId: number
): Promise<{ canProceed: boolean; user: any }> {
  const user = await supabase.getUser(userId);

  if (!user) {
    await ctx.reply('❌ Ошибка получения данных пользователя');
    return { canProceed: false, user: null };
  }

  const cost = OPERATION_COSTS[operation];

  if (user.credits >= cost) {
    return { canProceed: true, user };
  }

  // Show aggressive paywall
  await showPaywall(ctx, user, operation);
  return { canProceed: false, user };
}

// Backward compatibility alias
export const checkCreditsOrPaywall = checkCreditsOrShowPaywall;

/**
 * PUNCHY paywall message - short and conversion-optimized
 */
async function showPaywall(
  ctx: MyContext,
  user: any,
  operation: OperationType
): Promise<void> {
  const cost = OPERATION_COSTS[operation];

  // Calculate which package solves their problem best
  const recommendedPackage = getRecommendedPackage(user.credits, operation);

  const starter = CREDIT_PACKAGES.starter;
  const pro = CREDIT_PACKAGES.pro;
  const big = CREDIT_PACKAGES.big;

  // Calculate savings percentages
  const proSavings = Math.round((1 - pro.pricePerCard / starter.pricePerCard) * 100);
  const bigSavings = Math.round((1 - big.pricePerCard / starter.pricePerCard) * 100);

  // PUNCHY format - get straight to the point
  const message = `❌ Не хватает токенов

Нужно: ${cost} | У вас: ${user.credits}

⭐ Starter · ${starter.cardsCount} карточек · ${starter.pricePerCard}₽/шт
   ${starter.price}₽

✅ Pro · ${pro.cardsCount} карточек · ${pro.pricePerCard}₽/шт${recommendedPackage.id === 'pro' ? ' ← рекомендуем' : ''}
   ${pro.price}₽ · экономия ${proSavings}%

💎 Big · ${big.cardsCount} карточек · ${big.pricePerCard}₽/шт
   ${big.price}₽ · экономия ${bigSavings}%`;

  await ctx.reply(message, {
    parse_mode: 'HTML',
    reply_markup: KeyboardBuilder.paywallPackages(recommendedPackage.id),
  });
}

/**
 * Show low credits warning after successful operation
 */
export async function showLowCreditsWarning(
  ctx: MyContext,
  currentCredits: number
): Promise<void> {
  if (currentCredits >= LOW_CREDITS_THRESHOLD) return;

  const generationsLeft = Math.floor(currentCredits / CREDITS.CARD_GENERATION);

  if (currentCredits < CRITICAL_CREDITS_THRESHOLD) {
    // Critical - strong warning
    const message = `⚠️ <b>Токены почти закончились!</b>

У вас осталось <b>${currentCredits}</b> токенов — этого ${generationsLeft === 0 ? 'недостаточно даже на одну генерацию' : `хватит на ${generationsLeft} ${getGenerationWord(generationsLeft)}`}.

${getSalesPitch()}`;

    await ctx.reply(message, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.lowCreditsWarning(),
    });
  } else if (currentCredits < LOW_CREDITS_THRESHOLD) {
    // Low - soft warning
    const message = `💡 <b>Напоминание:</b> осталось ${currentCredits} токенов (${generationsLeft} ${getGenerationWord(generationsLeft)})

Пополните сейчас со скидкой 👇`;

    await ctx.reply(message, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.softUpsell(),
    });
  }
}


/**
 * Get recommended package based on deficit and smart upgrade logic
 * If deficit < 30, recommend Starter
 * If deficit < 100, recommend Pro
 * Else recommend Big
 * BUT if user is close to next tier (within 20%), suggest upgrade
 */
function getRecommendedPackage(currentCredits: number, operation: OperationType) {
  const cost = OPERATION_COSTS[operation];
  const deficit = Math.max(0, cost - currentCredits);

  // Base recommendations by deficit
  let recommended: typeof CREDIT_PACKAGES.starter | typeof CREDIT_PACKAGES.pro | typeof CREDIT_PACKAGES.big;

  if (deficit < 30) {
    recommended = CREDIT_PACKAGES.starter;
  } else if (deficit < 100) {
    recommended = CREDIT_PACKAGES.pro;
  } else {
    recommended = CREDIT_PACKAGES.big;
  }

  // Smart upgrade: if within 20% of next tier, suggest upgrade
  // Example: deficit = 26, starter = 60, but 26 is close to 30, so suggest pro
  if (recommended === CREDIT_PACKAGES.starter) {
    const starterCoverage = CREDIT_PACKAGES.starter.credits;
    const upgradeThreshold = starterCoverage * (1 + UPGRADE_THRESHOLD_PERCENT);

    if (deficit > upgradeThreshold || deficit > starterCoverage * 0.8) {
      recommended = CREDIT_PACKAGES.pro;
    }
  } else if (recommended === CREDIT_PACKAGES.pro) {
    const proCoverage = CREDIT_PACKAGES.pro.credits;
    const upgradeThreshold = proCoverage * (1 + UPGRADE_THRESHOLD_PERCENT);

    if (deficit > upgradeThreshold || deficit > proCoverage * 0.8) {
      recommended = CREDIT_PACKAGES.big;
    }
  }

  return recommended;
}


/**
 * Sales pitch for low credits warning
 */
function getSalesPitch(): string {
  const pro = CREDIT_PACKAGES.pro;
  return `🎯 <b>Рекомендуем Pro:</b>
${pro.cardsCount} генераций за ${pro.price}₽ — всего ${pro.pricePerCard}₽ за карточку

<i>Не теряйте время — продолжайте создавать!</i>`;
}

/**
 * Get correct Russian word form for generations count
 */
function getGenerationWord(count: number): string {
  if (count === 0) return 'генераций';
  if (count === 1) return 'генерацию';
  if (count >= 2 && count <= 4) return 'генерации';
  return 'генераций';
}

/**
 * Success message with soft upsell after generation
 */
export function getSuccessWithUpsell(creditsLeft: number, operation: OperationType): string {
  const generationsLeft = Math.floor(creditsLeft / OPERATION_COSTS[operation]);

  if (creditsLeft < CRITICAL_CREDITS_THRESHOLD) {
    return `\n\n⚠️ <i>Осталось ${creditsLeft} токенов</i>`;
  }

  if (creditsLeft < LOW_CREDITS_THRESHOLD) {
    return `\n\n💡 <i>Осталось ${creditsLeft} токенов (${generationsLeft} ${getGenerationWord(generationsLeft)})</i>`;
  }

  return '';
}
