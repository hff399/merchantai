// Telegram Bot API wrapper for admin dashboard

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

export interface TelegramMessage {
  chat_id: number;
  text: string;
  parse_mode?: 'HTML' | 'Markdown' | 'MarkdownV2';
  disable_notification?: boolean;
}

export interface SendResult {
  success: boolean;
  message_id?: number;
  error?: string;
}

export async function sendMessage(params: TelegramMessage): Promise<SendResult> {
  try {
    const response = await fetch(`${API_URL}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const data = await response.json();

    if (data.ok) {
      return { success: true, message_id: data.result.message_id };
    } else {
      return { success: false, error: data.description };
    }
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function sendBulkMessages(
  messages: TelegramMessage[],
  delayMs = 50
): Promise<{ success: number; failed: number; errors: string[] }> {
  const results = {
    success: 0,
    failed: 0,
    errors: [] as string[],
  };

  for (const msg of messages) {
    const result = await sendMessage(msg);
    
    if (result.success) {
      results.success++;
    } else {
      results.failed++;
      results.errors.push(`Chat ${msg.chat_id}: ${result.error}`);
    }

    // Rate limiting - Telegram allows 30 messages/second
    await new Promise(resolve => setTimeout(resolve, delayMs));
  }

  return results;
}

// HTML formatting helpers
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function bold(text: string): string {
  return `<b>${escapeHtml(text)}</b>`;
}

export function italic(text: string): string {
  return `<i>${escapeHtml(text)}</i>`;
}

export function code(text: string): string {
  return `<code>${escapeHtml(text)}</code>`;
}

export function link(text: string, url: string): string {
  return `<a href="${url}">${escapeHtml(text)}</a>`;
}
