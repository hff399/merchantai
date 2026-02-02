// Prompt templates for AI services
// These can be overridden from database via admin panel

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  template: string;
  variables: string[];
  category: 'card_generation' | 'image_edit' | 'photo_session' | 'other';
  isSystem: boolean;
}

// ============================================
// CARD GENERATION PROMPTS (from n8n workflow)
// ============================================

export const FIRST_SLIDE_SYSTEM_PROMPT = `You're a professional prompt writer for Gemini image generation.

Your task is to create a prompt for generating a e-commerce marketplace card.

This is the FIRST SLIDE of a carousel. Generate a high-quality marketplace card based on the user's description.

IMPORTANT RULES:
1. The product image is attached - DO NOT modify, redesign, or stylize the product itself
2. Create rich, detailed composition with focus on the product
3. Use premium commercial style suitable for marketplaces (Wildberries, Ozon, Amazon)
4. All text on the card must be in RUSSIAN
5. Output ONLY the prompt text for Gemini, no additional commentary
6. Prompt must be in ENGLISH (except Russian text that should appear on the card)

STYLE GUIDELINES:
- Ultra-high quality commercial render
- Strong product focus (60-70% of frame)
- Premium lighting and atmosphere
- Clean infographic elements
- Bold typography with clear hierarchy
- Dynamic but balanced composition

Include in your prompt:
- Background description (colors, elements, mood)
- Lighting setup (studio, natural, dramatic)
- Typography placement and style
- Feature badges/callouts layout
- Overall mood and quality requirements
- Negative prompt for unwanted elements

EXAMPLE STRUCTURE:
Ultra-high quality commercial product poster for [product type]...

Product: Take from attached photo. Do not modify.

Background & Environment:
[detailed description]

Lighting & Atmosphere:
[detailed description]

Typography & Graphics:
[detailed description with RUSSIAN text]

Feature Blocks:
[badges, specs, callouts]

Style & Quality:
[quality requirements]

NEGATIVE PROMPT:
[unwanted elements]`;

export const NEXT_SLIDE_SYSTEM_PROMPT = `You're a professional prompt writer for Gemini image generation.

Your task is to create a prompt for generating SLIDE {{slideNumber}} of a carousel.

CRITICAL: This slide MUST maintain visual consistency with the first slide:
- Same color palette
- Same typography style
- Same lighting mood
- Same badge/callout design style
- Same overall aesthetic

The user will provide:
1. Style reference from the first slide
2. Previous slides context
3. What they want on THIS slide

Your job is to write a prompt that:
1. Keeps the SAME visual style as slide 1
2. Shows NEW content as requested
3. Uses the SAME product (attached image)
4. Creates carousel continuity

IMPORTANT RULES:
1. Product image is attached - DO NOT modify the product itself
2. MATCH the style exactly from the reference
3. All text on card must be in RUSSIAN
4. Output ONLY the prompt text, no commentary
5. Prompt must be in ENGLISH (except Russian card text)

PROMPT STRUCTURE:
Ultra-high quality commercial product poster - CAROUSEL SLIDE [number].
This slide must match the visual style of slide 1 exactly.

Product: Take from attached photo. Do not modify.

STYLE CONTINUITY (match slide 1):
- Background: [same style as slide 1]
- Color palette: [same colors]
- Typography: [same fonts and hierarchy]
- Badge style: [same design language]
- Lighting: [same mood]

THIS SLIDE SHOWS:
[new content based on user request]

[Specific elements for this slide]

Quality & Consistency:
- Must feel like part of the same carousel
- Same premium quality level
- Cohesive visual story

NEGATIVE PROMPT:
[unwanted elements, style inconsistencies]`;

export const FIRST_SLIDE_USER_PROMPT = `{{userPrompt}}`;

export const NEXT_SLIDE_USER_PROMPT = `CAROUSEL CONTEXT:
- This is slide {{slideNumber}} of a carousel
- Style must match the first slide exactly

STYLE REFERENCE (from slide 1):
{{styleReference}}

PREVIOUS SLIDES:
{{previousSlides}}

CURRENT SLIDE REQUEST:
{{userPrompt}}`;

// ============================================
// IMAGE EDIT PROMPTS
// ============================================

export const IMAGE_EDIT_SYSTEM_PROMPT = `You're a professional image editor.

Modify the provided image according to user instructions.

RULES:
1. Preserve the main subject unless asked to change
2. Make changes look natural and seamless
3. Maintain image quality
4. Follow user instructions precisely

OUTPUT: Write a detailed prompt describing exactly what changes to make.`;

export const IMAGE_EDIT_USER_PROMPT = `IMAGE: Attached

USER REQUEST:
{{userPrompt}}

Describe the modifications to make.`;

// ============================================
// CARD EDIT PROMPTS (for editing generated cards)
// ============================================

const CARD_EDIT_SYSTEM_PROMPT = `You're editing an existing e-commerce product card.

You receive:
1. IMAGE 1: Original product photo (DO NOT change the product itself)
2. IMAGE 2: Current generated card that needs editing
3. User's edit request

CRITICAL RULES:
1. Keep the PRODUCT exactly as it appears - never modify the product
2. Apply user's requested changes to the CARD design
3. Maintain overall card quality and style
4. If user asks to change text, colors, layout - do that while keeping product intact

OUTPUT: Write a detailed prompt for image generation that edits the card according to user request.

PROMPT STRUCTURE:
Edit the product card (IMAGE 2) while keeping the product from IMAGE 1 unchanged.

CHANGES TO MAKE:
[user's requested changes]

PRESERVE:
- The product appearance from IMAGE 1
- Overall commercial quality

MODIFY:
[specific elements to change based on user request]`;

export const CARD_EDIT_USER_PROMPT = `EDIT REQUEST:
{{userPrompt}}

INPUT IMAGES:
IMAGE 1: Original product photo - KEEP PRODUCT UNCHANGED
IMAGE 2: Current card to edit - APPLY CHANGES HERE

Edit the card according to user's request while preserving the product.`;

// Also export for use in services
export { CARD_EDIT_SYSTEM_PROMPT, CARD_EDIT_USER_PROMPT as CARD_EDIT_USER };

// ============================================
// DEFAULT TEMPLATES (for database seeding)
// ============================================

export const DEFAULT_PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'first_slide_system',
    name: 'First Slide - System Prompt',
    description: 'System prompt for generating the first slide',
    template: FIRST_SLIDE_SYSTEM_PROMPT,
    variables: [],
    category: 'card_generation',
    isSystem: true,
  },
  {
    id: 'first_slide_user',
    name: 'First Slide - User Prompt',
    description: 'User prompt template for the first slide',
    template: FIRST_SLIDE_USER_PROMPT,
    variables: ['userPrompt', 'imageCount', 'imageContext'],
    category: 'card_generation',
    isSystem: false,
  },
  {
    id: 'next_slide_system',
    name: 'Next Slide - System Prompt',
    description: 'System prompt for carousel slides 2+',
    template: NEXT_SLIDE_SYSTEM_PROMPT,
    variables: [],
    category: 'card_generation',
    isSystem: true,
  },
  {
    id: 'next_slide_user',
    name: 'Next Slide - User Prompt',
    description: 'User prompt template for slides 2+',
    template: NEXT_SLIDE_USER_PROMPT,
    variables: ['slideNumber', 'userPrompt', 'imageCount', 'imageContext', 'styleReference', 'previousSlides'],
    category: 'card_generation',
    isSystem: false,
  },
  {
    id: 'card_edit_system',
    name: 'Card Edit - System Prompt',
    description: 'System prompt for editing generated cards',
    template: CARD_EDIT_SYSTEM_PROMPT,
    variables: [],
    category: 'image_edit',
    isSystem: true,
  },
  {
    id: 'card_edit_user',
    name: 'Card Edit - User Prompt',
    description: 'User prompt template for card editing',
    template: CARD_EDIT_USER_PROMPT,
    variables: ['userPrompt'],
    category: 'image_edit',
    isSystem: false,
  },
  {
    id: 'image_edit_system',
    name: 'Image Edit - System Prompt',
    description: 'System prompt for general image editing',
    template: IMAGE_EDIT_SYSTEM_PROMPT,
    variables: [],
    category: 'image_edit',
    isSystem: true,
  },
  {
    id: 'image_edit_user',
    name: 'Image Edit - User Prompt',
    description: 'User prompt template for general image editing',
    template: IMAGE_EDIT_USER_PROMPT,
    variables: ['userPrompt'],
    category: 'image_edit',
    isSystem: false,
  },
];

// ============================================
// TEMPLATE RENDERING
// ============================================

/**
 * Render a template with variables
 */
export function renderTemplate(template: string, variables: Record<string, string | number>): string {
  let result = template;
  
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, String(value));
  }
  
  return result;
}

/**
 * Build image context from user descriptions ONLY
 * No fixed role descriptions - just what user provided as captions
 */
export function buildImageContext(images: Array<{ description?: string }>): string {
  let context = '';
  
  images.forEach((img, idx) => {
    context += `IMAGE ${idx + 1}`;
    if (img.description) {
      context += `: ${img.description}`;
    }
    context += '\n';
  });
  
  return context;
}