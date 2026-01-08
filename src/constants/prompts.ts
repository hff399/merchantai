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
// CARD GENERATION PROMPTS
// ============================================

export const FIRST_SLIDE_SYSTEM_PROMPT = `You're a professional prompt writer for Gemini image generation.

Your task is to create a prompt for generating a premium e-commerce marketplace card/infographic.

You receive:
1. A user request describing what they want
2. Multiple input images with user's notes explaining how each should be used

OUTPUT RULES:
1. Write ONLY the prompt text for image generation
2. Prompt in ENGLISH, but any text on the card should be in RUSSIAN
3. Reference images by number: "From IMAGE 1...", "Use IMAGE 2 as..."
4. Be extremely detailed about composition, lighting, layout
5. Follow user's instructions for each image precisely

PROMPT STRUCTURE:
Ultra-high quality commercial product card/infographic.

IMAGE USAGE:
[describe how each image should be used based on user notes]

COMPOSITION & LAYOUT:
[detailed description]

BACKGROUND & ENVIRONMENT:
[based on user instructions]

TYPOGRAPHY (RUSSIAN text if needed):
[headlines, badges, callouts]

LIGHTING & ATMOSPHERE:
[detailed description]

QUALITY:
- Ultra-high resolution, photorealistic
- Premium commercial aesthetic

NEGATIVE PROMPT:
[unwanted elements]`;

export const NEXT_SLIDE_SYSTEM_PROMPT = `You're creating a CAROUSEL SLIDE (NOT the first slide).

CRITICAL REQUIREMENTS:
1. Must look like same carousel as slide 1
2. EXACT same visual style, colors, typography, design language
3. Only CONTENT changes based on user request

OUTPUT: Write ONLY the prompt text.
English prompt, Russian text on card if needed.
Emphasize style consistency.

PROMPT STRUCTURE:
Carousel slide - MATCH SLIDE 1 STYLE EXACTLY.

STYLE CONSISTENCY:
- Same colors, typography, badges as slide 1
- Same lighting mood, aesthetic

IMAGE USAGE:
[how each image is used based on user notes]

THIS SLIDE SHOWS:
[user's request]

COMPOSITION:
[layout for this slide]

NEGATIVE PROMPT:
[unwanted, style inconsistencies]`;

export const FIRST_SLIDE_USER_PROMPT = `USER REQUEST:
{{userPrompt}}

INPUT IMAGES ({{imageCount}} total):
{{imageContext}}

Generate a professional e-commerce marketplace card using these images according to user's notes.`;

export const NEXT_SLIDE_USER_PROMPT = `CAROUSEL SLIDE {{slideNumber}} - MUST MATCH SLIDE 1 STYLE

USER REQUEST:
{{userPrompt}}

INPUT IMAGES ({{imageCount}} total):
{{imageContext}}
{{styleReference}}
{{previousSlides}}

Maintain EXACT visual consistency with slide 1.`;

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