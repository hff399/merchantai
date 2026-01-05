import { NextRequest, NextResponse } from 'next/server';
import { sendMessage } from '@/lib/telegram';

export async function POST(request: NextRequest) {
  try {
    const { telegramId, message, parseMode } = await request.json();

    if (!telegramId || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await sendMessage({
      chat_id: telegramId,
      text: message,
      parse_mode: parseMode || 'HTML',
    });

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Send message error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
