import { MyContext, ROUTES } from '../types';
import { TEXTS, CALLBACKS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';
import { supabase } from '../services/supabase';

// Parse start parameter for referral tracking
// Formats supported:
// - ref_XXXXXXXX (referral code)
// - utm_source=xxx&utm_campaign=xxx
// - Combined: ref_XXXXXXXX__utm_source=xxx
function parseStartParam(startParam: string | undefined): {
  referralCode?: string;
  utmSource?: string;
  utmCampaign?: string;
  utmMedium?: string;
  startParam?: string;
} {
  if (!startParam) return {};

  const result: {
    referralCode?: string;
    utmSource?: string;
    utmCampaign?: string;
    utmMedium?: string;
    startParam: string;
  } = { startParam };

  // Check for referral code (ref_XXXXXXXX)
  const refMatch = startParam.match(/ref_([a-zA-Z0-9]+)/);
  if (refMatch) {
    result.referralCode = refMatch[1];
  }

  // Check for UTM parameters (utm_source=xxx)
  const utmSourceMatch = startParam.match(/utm_source[=_]([a-zA-Z0-9_-]+)/);
  if (utmSourceMatch) {
    result.utmSource = utmSourceMatch[1];
  }

  const utmCampaignMatch = startParam.match(/utm_campaign[=_]([a-zA-Z0-9_-]+)/);
  if (utmCampaignMatch) {
    result.utmCampaign = utmCampaignMatch[1];
  }

  const utmMediumMatch = startParam.match(/utm_medium[=_]([a-zA-Z0-9_-]+)/);
  if (utmMediumMatch) {
    result.utmMedium = utmMediumMatch[1];
  }

  return result;
}

export async function showMainMenu(
  ctx: MyContext, 
  editMessage = false,
  startParam?: string
): Promise<void> {
  // Ensure user exists in database with referral tracking
  if (ctx.from) {
    try {
      const referralParams = parseStartParam(startParam);
      
      await supabase.getOrCreateUser(
        ctx.from.id,
        ctx.from.username,
        ctx.from.first_name,
        ctx.from.last_name,
        referralParams
      );
    } catch (error) {
      console.error('Error creating/getting user:', error);
      // Continue anyway - user might already exist
    }
  }

  // Clean up any old messages
  await MessageManager.cleanup(ctx);

  // Reset session
  ctx.session.currentRoute = ROUTES.MAIN_MENU;
  ctx.session.tempData = {};
  ctx.session.imageGenSession = undefined;
  ctx.session.imageEditSession = undefined;

  // Send or edit welcome message with inline keyboard
  if (editMessage && ctx.callbackQuery?.message) {
    try {
      await ctx.editMessageText(TEXTS.WELCOME, {
        parse_mode: 'HTML',
        reply_markup: KeyboardBuilder.mainMenu(),
      });
    } catch (error) {
      await ctx.reply(TEXTS.WELCOME, {
        parse_mode: 'HTML',
        reply_markup: KeyboardBuilder.mainMenu(),
      });
    }
  } else {
    await ctx.reply(TEXTS.WELCOME, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.mainMenu(),
    });
  }
}

export async function handleMainMenuCallback(ctx: MyContext): Promise<void> {
  const callbackData = ctx.callbackQuery?.data;

  if (!callbackData) return;

  await ctx.answerCallbackQuery();

  switch (callbackData) {
    case CALLBACKS.BACK_TO_MENU:
      await showMainMenu(ctx, true);
      break;
  }
}