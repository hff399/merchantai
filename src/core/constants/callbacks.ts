/**
 * Callback data strings for inline keyboard buttons
 * Centralized to avoid typos and enable easy refactoring
 */

export const CALLBACKS = {
  // Main menu
  MAIN_MENU: 'main_menu',
  CONTINUE_TO_MENU: 'continue_to_menu',
  IMAGE_CARD: 'image_card',
  IMAGE_EDIT: 'image_edit',
  PHOTO_SESSION: 'photo_session',
  PROFILE: 'profile',
  SUPPORT: 'support',
  BUY_CREDITS: 'buy_credits',

  // Image generation session
  REGENERATE: 'regenerate',
  BACK_TO_MENU: 'back_to_menu',

  // Image edit session
  EDIT_REGENERATE: 'edit_regenerate',

  // Profile
  PROFILE_BUY_CREDITS: 'profile_buy_credits',
  PROFILE_HISTORY: 'profile_history',

  // Support
  SUPPORT_FAQ: 'support_faq',
  SUPPORT_CONTACT: 'support_contact',
  SUPPORT_FAQ_CREATE: 'support_faq_create',
  SUPPORT_FAQ_PRICING: 'support_faq_pricing',
  SUPPORT_FAQ_CAROUSEL: 'support_faq_carousel',

  // Credit packages
  BUY_STARTER: 'buy_starter',
  BUY_PRO: 'buy_pro',
  BUY_BIG: 'buy_big',
  BUY_ENTERPRISE: 'buy_enterprise',
  PRICE_EXPLAIN: 'price_explain_start',

  // Payment
  PAYMENT_CHECK: 'payment_check',
  PAYMENT_CANCEL: 'payment_cancel',

  // Carousel
  CAROUSEL_REGENERATE: 'carousel_regenerate',
  CAROUSEL_NEXT_SLIDE: 'carousel_next_slide',
  CAROUSEL_FINISH: 'carousel_finish',
  CAROUSEL_IMAGES_DONE: 'carousel_images_done',
} as const;

// Price explain flow callbacks
export const PRICE_EXPLAIN_CALLBACKS = {
  START: 'price_explain_start',
  REASON_1: 'price_reason_1',
  REASON_2: 'price_reason_2',
  REASON_3: 'price_reason_3',
  FINAL: 'price_final',
  BACK_TO_PRICING: 'back_to_pricing',
} as const;

// Demo constructor callbacks
export const DEMO_CALLBACKS = {
  // Start demo
  START_DEMO: 'demo_start',

  // Skip options (for simplified flow)
  SKIP_STYLE: 'demo_skip_style',
  SKIP_COMPOSITION: 'demo_skip_composition',
  SKIP_VISUAL_STYLE: 'demo_skip_visual_style',
  SKIP_ATMOSPHERE: 'demo_skip_atmosphere',
  SKIP_INFOGRAPHICS: 'demo_skip_infographics',
  SKIP_TEXT_STYLE: 'demo_skip_text_style',
  SKIP_HEADLINE: 'demo_skip_headline',
  SKIP_ALL: 'demo_skip_all',

  // Composition
  COMP_MAX_LARGE: 'demo_comp_max_large',
  COMP_DYNAMIC: 'demo_comp_dynamic',
  COMP_STRICT: 'demo_comp_strict',
  COMP_VERTICAL: 'demo_comp_vertical',

  // Visual style
  VS_MARKETPLACE: 'demo_vs_marketplace',
  VS_TECH: 'demo_vs_tech',
  VS_ECO: 'demo_vs_eco',
  VS_MINIMAL: 'demo_vs_minimal',
  VS_DARK: 'demo_vs_dark',
  VS_BRIGHT: 'demo_vs_bright',

  // Atmosphere
  ATM_NONE: 'demo_atm_none',
  ATM_THEMATIC: 'demo_atm_thematic',
  ATM_HIGHLIGHTS: 'demo_atm_highlights',
  ATM_MOTION: 'demo_atm_motion',

  // Infographics
  INF_CLEAN_UI: 'demo_inf_clean_ui',
  INF_LARGE_NUM: 'demo_inf_large_num',
  INF_MINIMAL: 'demo_inf_minimal',
  INF_SPECS: 'demo_inf_specs',

  // Text style
  TXT_FACTS: 'demo_txt_facts',
  TXT_SHORT: 'demo_txt_short',
  TXT_BENEFIT: 'demo_txt_benefit',
  TXT_TECH: 'demo_txt_tech',
  TXT_EMOTIONAL: 'demo_txt_emotional',

  // Headline
  HDL_LARGEST: 'demo_hdl_largest',
  HDL_SUBTITLE: 'demo_hdl_subtitle',
  HDL_MINIMAL: 'demo_hdl_minimal',
  HDL_NUMBER: 'demo_hdl_number',

  // After first generation
  EDIT_SUBMISSION: 'demo_edit_submission',
  NEW_VARIANT: 'demo_new_variant',
  DOWNLOAD: 'demo_download',

  // Edit choices
  EDIT_COMPOSITION: 'demo_edit_composition',
  EDIT_STYLE: 'demo_edit_style',
  EDIT_INFOGRAPHICS: 'demo_edit_infographics',
  EDIT_TEXTS: 'demo_edit_texts',
} as const;

export type CallbackType = typeof CALLBACKS[keyof typeof CALLBACKS];
export type DemoCallbackType = typeof DEMO_CALLBACKS[keyof typeof DEMO_CALLBACKS];
