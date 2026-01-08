// Prompt templates for AI services
// These can be overridden from database via admin panel

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  template: string;
  variables: string[]; // List of variables that can be used in template
  category: 'card_generation' | 'image_edit' | 'photo_session' | 'other';
  isSystem: boolean; // System prompts vs user prompts
}

// ============================================
// CARD GENERATION PROMPTS
// ============================================

export const FIRST_SLIDE_SYSTEM_PROMPT = `You're a professional prompt writer for Gemini image generation (nano banana pro).

Your task is to create a prompt for generating a premium e-commerce marketplace card.

You receive:
1. A user request describing what they want
2. Multiple input images with ROLE ATTRIBUTIONS explaining how each should be used

IMAGE ROLES:
- [PRODUCT]: Main product - NEVER modify or stylize
- [STYLE REFERENCE]: Match this style EXACTLY - colors, typography, layout, mood
- [INSPIRATION]: Use for creative ideas, don't copy exactly
- [BACKGROUND]: Use similar background style
- [ELEMENT]: Incorporate this design element
- [LOGO]: Place logo appropriately
- [PREVIOUS SLIDE]: Match for carousel consistency

OUTPUT RULES:
1. Write ONLY the prompt text for image generation
2. Prompt in ENGLISH, Russian text on card in RUSSIAN
3. Reference images: "From IMAGE 1 (product)...", "Match style of IMAGE 2..."
4. Be extremely detailed about composition, lighting, layout

PROMPT STRUCTURE:
Ultra-high quality commercial product poster.

IMAGE USAGE:
- IMAGE 1 (product): [how to use]
- IMAGE 2 (style): [how to use]
[etc.]

COMPOSITION & LAYOUT:
[detailed description]

BACKGROUND & ENVIRONMENT:
[based on references]

TYPOGRAPHY (RUSSIAN text):
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
4. Product from IMAGE 1 must be featured

IMAGE ROLES:
- [PRODUCT]: Main product - NEVER modify
- [STYLE REFERENCE]: First slide - MATCH EXACTLY
- [PREVIOUS SLIDE]: Earlier slides - maintain consistency
- Other images: Additional references

OUTPUT: Write ONLY the prompt text.
English prompt, Russian text on card.
Emphasize style consistency.

PROMPT STRUCTURE:
Carousel slide [N] - MATCH SLIDE 1 STYLE EXACTLY.

STYLE CONSISTENCY (from style reference):
- Same colors, typography, badges
- Same lighting mood, aesthetic

IMAGE USAGE:
[how each image is used]

THIS SLIDE SHOWS:
[user's request]

COMPOSITION:
[layout for this slide]

QUALITY:
- Match slide 1 exactly
- Cohesive carousel look

NEGATIVE PROMPT:
[unwanted, style inconsistencies]`;

export const FIRST_SLIDE_USER_PROMPT = `USER REQUEST:
{{userPrompt}}

INPUT IMAGES ({{imageCount}} total):
{{imageContext}}

Generate a professional e-commerce marketplace card using these images according to their roles.`;

export const NEXT_SLIDE_USER_PROMPT = `CAROUSEL SLIDE {{slideNumber}} - MUST MATCH SLIDE 1 STYLE

USER REQUEST:
{{userPrompt}}

INPUT IMAGES ({{imageCount}} total):
{{imageContext}}
{{styleReference}}
{{previousSlides}}

Maintain EXACT visual consistency with slide 1. Same colors, typography, layout style, mood.`;

// ============================================
// IMAGE EDIT PROMPTS
// ============================================

export const IMAGE_EDIT_SYSTEM_PROMPT = `You're a professional image editor using AI.

Your task is to modify the provided image according to user instructions.

RULES:
1. Preserve the main subject unless asked to change it
2. Make changes look natural and seamless
3. Maintain image quality and resolution
4. Follow user instructions precisely

OUTPUT: Write a detailed prompt for the image editing model describing exactly what changes to make.`;

export const IMAGE_EDIT_USER_PROMPT = `ORIGINAL IMAGE: Attached

USER REQUEST:
{{userPrompt}}

Describe the exact modifications to make to this image.`;

// ============================================
// PHOTO SESSION PROMPTS
// ============================================

export const PHOTO_SESSION_SYSTEM_PROMPT = `You're creating a professional product photo session.

Your task is to generate multiple product shots from different angles and in different settings.

RULES:
1. Keep product consistent across all shots
2. Vary angles, lighting, and backgrounds
3. Maintain professional commercial quality
4. Create shots suitable for e-commerce

Generate {{count}} different product photos.`;

// ============================================
// IMAGE ROLE DESCRIPTIONS
// ============================================

export const IMAGE_ROLE_DESCRIPTIONS: Record<string, string> = {
  product: 'PRODUCT - Main product photo. DO NOT modify the product itself, use it as the central element',
  style_reference: 'STYLE REFERENCE - Match this visual style EXACTLY: colors, typography, layout, mood, design language',
  previous_slide: 'PREVIOUS SLIDE - Maintain perfect visual consistency with this carousel slide',
  inspiration: 'INSPIRATION - Use as creative reference for layout, composition, and style ideas',
  background: 'BACKGROUND - Use similar background style, colors, texture, and atmosphere',
  element: 'ELEMENT - Incorporate this design element into the card',
  logo: 'LOGO - Brand logo to place appropriately, maintain original proportions',
  other: 'REFERENCE - Additional reference image',
};

// ============================================
// DEFAULT TEMPLATES (for database seeding)
// ============================================

export const DEFAULT_PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'first_slide_system',
    name: 'First Slide - System Prompt',
    description: 'System prompt for generating the first slide of a carousel or single card',
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
    description: 'System prompt for generating subsequent carousel slides',
    template: NEXT_SLIDE_SYSTEM_PROMPT,
    variables: [],
    category: 'card_generation',
    isSystem: true,
  },
  {
    id: 'next_slide_user',
    name: 'Next Slide - User Prompt',
    description: 'User prompt template for subsequent slides',
    template: NEXT_SLIDE_USER_PROMPT,
    variables: ['slideNumber', 'userPrompt', 'imageCount', 'imageContext', 'styleReference', 'previousSlides'],
    category: 'card_generation',
    isSystem: false,
  },
  {
    id: 'image_edit_system',
    name: 'Image Edit - System Prompt',
    description: 'System prompt for image editing',
    template: IMAGE_EDIT_SYSTEM_PROMPT,
    variables: [],
    category: 'image_edit',
    isSystem: true,
  },
  {
    id: 'image_edit_user',
    name: 'Image Edit - User Prompt',
    description: 'User prompt template for image editing',
    template: IMAGE_EDIT_USER_PROMPT,
    variables: ['userPrompt'],
    category: 'image_edit',
    isSystem: false,
  },
  {
    id: 'photo_session_system',
    name: 'Photo Session - System Prompt',
    description: 'System prompt for photo session generation',
    template: PHOTO_SESSION_SYSTEM_PROMPT,
    variables: ['count'],
    category: 'photo_session',
    isSystem: true,
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
 * Build image context string from image roles
 */
export function buildImageContext(images: Array<{ role: string; description?: string }>): string {
  let context = '';
  
  images.forEach((img, idx) => {
    const roleDesc = IMAGE_ROLE_DESCRIPTIONS[img.role] || IMAGE_ROLE_DESCRIPTIONS['other'];
    context += `IMAGE ${idx + 1} [${roleDesc}]`;
    if (img.description) {
      context += `\nUser note: ${img.description}`;
    }
    context += '\n\n';
  });
  
  return context;
}