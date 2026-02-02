/**
 * Order-related type definitions
 */

// Order types
export type OrderType = 'image_card' | 'photo_session' | 'image_edit';
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'failed';

// Order entity
export interface Order {
  id: string;
  user_id: string;
  type: OrderType;
  status: OrderStatus;
  input_data: OrderInputData;
  output_data?: OrderOutputData;
  credits_used: number;
  created_at: string;
  updated_at: string;
}

// Typed input data for orders (replaces `any`)
export interface OrderInputData {
  // Common fields
  photo_url?: string;
  description?: string;
  prompt?: string;

  // Carousel/Card generation
  images?: Array<{
    url: string;
    description?: string;
  }>;
  edit_request?: string;
  slide_number?: number;
  is_edit?: boolean;
  current_image_url?: string;
  style_reference?: string;
  previous_slides?: string[];

  // Demo constructor
  demo_mode?: boolean;
  generation_number?: number;
  constructor_choices?: {
    composition?: string;
    visualStyle?: string;
    atmosphere?: string;
    infographics?: string;
    textStyle?: string;
    headline?: string;
  };
  user_input?: {
    productName?: string;
    mainUSP?: string;
    features?: string;
  };

  // Image edit
  edit_prompt?: string;
}

// Typed output data for orders (replaces `any`)
export interface OrderOutputData {
  // Common fields
  image_url?: string;
  generated_image_url?: string;
  error?: string;

  // Generation results
  generated_prompt?: string;
  slide_number?: number;

  // Multiple images (photo session)
  images?: string[];
}

// Payment entity
export interface Payment {
  id: string;
  user_id: string;
  plan: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'cancelled';
  yookassa_payment_id?: string;
  created_at: string;
  updated_at: string;
}

// Order creation parameters
export interface CreateOrderParams {
  userId: string;
  type: OrderType;
  inputData: OrderInputData;
  creditsUsed: number;
}
