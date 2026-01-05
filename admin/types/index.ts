// Database types for admin dashboard

export interface User {
  id: string;
  telegram_id: number;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  plan: string;
  credits: number;
  cards_created: number;
  referral_code: string;
  referred_by: string | null;
  utm_source: string | null;
  utm_campaign: string | null;
  utm_medium: string | null;
  start_param: string | null;
  total_spent: number;
  referral_earnings: number;
  referrals_count: number;
  is_blocked: boolean;
  is_admin: boolean;
  notes: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  type: 'image_card' | 'photo_session' | 'image_edit';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  input_data: Record<string, any>;
  output_data: Record<string, any> | null;
  credits_used: number;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  plan: string;
  amount: number;
  currency: string;
  status: 'pending' | 'waiting_for_capture' | 'succeeded' | 'canceled';
  yookassa_payment_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Broadcast {
  id: string;
  title: string | null;
  message: string;
  message_html: string | null;
  parse_mode: 'HTML' | 'Markdown' | 'None';
  target_type: 'all' | 'segment' | 'specific';
  target_tags: string[];
  target_user_ids: string[];
  total_recipients: number;
  sent_count: number;
  failed_count: number;
  status: 'draft' | 'scheduled' | 'sending' | 'completed' | 'failed';
  scheduled_at: string | null;
  started_at: string | null;
  completed_at: string | null;
  created_by: string | null;
  created_at: string;
}

export interface OutreachAccount {
  id: string;
  phone: string;
  api_id: string;
  api_hash: string;
  session_string: string | null;
  name: string | null;
  status: 'connected' | 'disconnected' | 'banned' | 'limited';
  daily_messages_sent: number;
  daily_limit: number;
  last_message_at: string | null;
  cooldown_until: string | null;
  total_messages_sent: number;
  total_replies: number;
  created_at: string;
  updated_at: string;
}

export interface OutreachGroup {
  id: string;
  telegram_id: number | null;
  username: string | null;
  title: string;
  member_count: number | null;
  category: string | null;
  tags: string[];
  status: 'active' | 'paused' | 'banned';
  last_scraped_at: string | null;
  notes: string | null;
  created_at: string;
}

export interface OutreachCampaign {
  id: string;
  name: string;
  group_message: string;
  dm_templates: { text: string; delay?: number }[];
  target_group_ids: string[];
  target_categories: string[];
  replies_per_account: number;
  delay_between_messages: number;
  messages_sent: number;
  replies_received: number;
  conversations_started: number;
  status: 'draft' | 'active' | 'paused' | 'completed';
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface OutreachLead {
  id: string;
  campaign_id: string;
  account_id: string;
  group_id: string;
  telegram_id: number;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  initial_message: string | null;
  status: 'new' | 'contacted' | 'replied' | 'qualified' | 'converted' | 'rejected';
  dm_sent: boolean;
  dm_sent_at: string | null;
  dm_template_used: number | null;
  converted_user_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface DailyStats {
  id: string;
  date: string;
  new_users: number;
  active_users: number;
  cards_generated: number;
  revenue: number;
  referral_signups: number;
  outreach_leads: number;
}

// API Response types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  todayRevenue: number;
  cardsGenerated: number;
  activeOutreachCampaigns: number;
  pendingLeads: number;
}
