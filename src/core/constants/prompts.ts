/**
 * Fallback prompt templates for AI generation
 * Used when database templates are unavailable
 */

export const FALLBACK_PROMPTS = {
  // Card generation system prompt
  CARD_GENERATION_SYSTEM: `You are a professional e-commerce product card designer specializing in WB/Ozon marketplace cards.
Your task is to create detailed, conversion-optimized prompts for AI image generation.

Focus on:
- Clear product presentation
- Professional marketplace aesthetics
- Eye-catching but clean design
- Russian text for any labels/badges`,

  // Card generation user prompt template
  CARD_GENERATION_USER: `Create a professional product card for {productName}.
Style: {style}
Key features: {features}
Target marketplace: WB/Ozon

Requirements:
- Product should be the focal point (80-90% of frame)
- Clean, professional background
- Modern infographic elements
- Russian text if needed`,

  // Image edit system prompt
  IMAGE_EDIT_SYSTEM: `You are a professional image editor specializing in product photography enhancement.
Your task is to modify existing images based on user requests while maintaining product integrity.

Focus on:
- Preserving original product appearance
- Professional quality edits
- Marketplace-ready results`,

  // Image edit user prompt template
  IMAGE_EDIT_USER: `Edit this product image:
Current state: {currentDescription}
Requested changes: {editRequest}

Requirements:
- Keep the product unchanged
- Apply only the requested modifications
- Maintain professional quality`,

  // Style descriptions for demo constructor
  DEMO_STYLE_DESCRIPTIONS: {
    composition: {
      max_large: 'Product shown very large, filling 80-90% of the frame, centered, dominant presence',
      dynamic: 'Product at dynamic angle, slight tilt, sense of motion and energy',
      strict: 'Product perfectly centered, symmetrical composition, formal and balanced',
      vertical: 'Vertical emphasis, product elongated view, tall format optimization',
    },
    visualStyle: {
      marketplace_premium: 'Marketplace premium style, clean professional look, WB/Ozon optimized, high-end product photography feel',
      tech: 'Tech style, modern digital aesthetic, sleek surfaces, blue/gray tones, futuristic elements',
      eco: 'Eco/natural style, organic textures, earth tones, sustainable vibe, natural materials',
      minimal: 'Minimal white style, clean white background, maximum negative space, elegant simplicity',
      dark_premium: 'Dark premium style, black/dark background, dramatic lighting, luxury feel',
      bright_commercial: 'Bright commercial style, vivid colors, high energy, attention-grabbing, promotional feel',
    },
    atmosphere: {
      no_effects: 'Clean product shot, no special effects, pure focus on product',
      light_thematic: 'Light thematic atmosphere, subtle contextual elements, gentle mood setting',
      soft_highlights: 'Soft highlights and glows, gentle light effects, premium luminosity',
      motion: 'Sense of motion, dynamic blur effects, speed lines, active energy',
    },
    infographics: {
      clean_ui: 'Clean UI infographics, modern icons, minimal badges, sleek info blocks',
      large_numbers: 'Large prominent numbers, bold statistics, key figures highlighted',
      minimal_text: 'Minimal text approach, icons over words, visual communication first',
      specs_focus: 'Specifications focus, detailed features, technical highlights, comparison-ready',
    },
    textStyle: {
      facts_numbers: 'Facts and numbers USP style, data-driven, concrete benefits',
      short_powerful: 'Short and powerful text, impactful phrases, punchy headlines',
      benefit_focused: 'Benefit-focused text, customer value first, problem-solution approach',
      technical: 'Technical text style, specifications highlight, professional terminology',
      emotional: 'Emotional text (moderate), feeling-based appeal, relatable messaging',
    },
    headline: {
      largest: 'Headline as largest text element, maximum visual hierarchy, attention-first',
      with_subtitle: 'Main headline with supporting subtitle, two-level hierarchy',
      minimalist: 'Minimalist headline, subtle but clear, integrated with design',
      number_focus: 'Number-focused headline, key statistic as hero, data-led',
    },
  },
} as const;

export type CompositionStyle = keyof typeof FALLBACK_PROMPTS.DEMO_STYLE_DESCRIPTIONS.composition;
export type VisualStyle = keyof typeof FALLBACK_PROMPTS.DEMO_STYLE_DESCRIPTIONS.visualStyle;
export type AtmosphereStyle = keyof typeof FALLBACK_PROMPTS.DEMO_STYLE_DESCRIPTIONS.atmosphere;
export type InfographicsStyle = keyof typeof FALLBACK_PROMPTS.DEMO_STYLE_DESCRIPTIONS.infographics;
export type TextStyleType = keyof typeof FALLBACK_PROMPTS.DEMO_STYLE_DESCRIPTIONS.textStyle;
export type HeadlineStyle = keyof typeof FALLBACK_PROMPTS.DEMO_STYLE_DESCRIPTIONS.headline;
