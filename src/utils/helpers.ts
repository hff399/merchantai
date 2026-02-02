import { MyContext } from '../types';

// Store typing intervals globally by chat ID
const typingIntervals = new Map<number, NodeJS.Timeout>();

export class MessageManager {
  /**
   * Delete a message safely (catches errors if message doesn't exist)
   */
  static async deleteMessage(ctx: MyContext, messageId: number): Promise<void> {
    try {
      await ctx.api.deleteMessage(ctx.chat!.id, messageId);
    } catch (error) {
      // Ignore errors (message might be already deleted)
    }
  }

  /**
   * Delete multiple messages
   */
  static async deleteMessages(ctx: MyContext, messageIds: number[]): Promise<void> {
    for (const messageId of messageIds) {
      await this.deleteMessage(ctx, messageId);
    }
  }

  /**
   * Send a message and store its ID in session
   */
  static async sendAndStore(
    ctx: MyContext,
    text: string,
    extra?: any,
    storeKey = 'lastMessageId'
  ): Promise<number> {
    const message = await ctx.reply(text, extra);
    if (storeKey) {
      (ctx.session as any)[storeKey] = message.message_id;
    }
    return message.message_id;
  }

  /**
   * Update a message and store the new ID
   */
  static async editOrSend(
    ctx: MyContext,
    text: string,
    messageId?: number,
    extra?: any
  ): Promise<number> {
    // Try to delete old message
    if (messageId) {
      await this.deleteMessage(ctx, messageId);
    }

    // Send new message
    const message = await ctx.reply(text, extra);
    return message.message_id;
  }

  /**
   * Send a processing message that will be updated/deleted later
   * Also starts "typing" indicator that refreshes every 4 seconds
   */
  static async sendProcessing(ctx: MyContext, text: string): Promise<number> {
    const chatId = ctx.chat!.id;

    // Send typing indicator immediately
    try {
      await ctx.api.sendChatAction(chatId, 'typing');
    } catch {}

    // Start interval to keep typing indicator active (expires after ~5 sec)
    const interval = setInterval(async () => {
      try {
        await ctx.api.sendChatAction(chatId, 'typing');
      } catch {}
    }, 4000);

    typingIntervals.set(chatId, interval);

    const message = await ctx.reply(text);
    ctx.session.processingMessageId = message.message_id;
    return message.message_id;
  }

  /**
   * Delete the processing message and stop typing indicator
   */
  static async deleteProcessing(ctx: MyContext): Promise<void> {
    const chatId = ctx.chat?.id;

    // Stop typing indicator
    if (chatId && typingIntervals.has(chatId)) {
      clearInterval(typingIntervals.get(chatId)!);
      typingIntervals.delete(chatId);
    }

    if (ctx.session.processingMessageId) {
      await this.deleteMessage(ctx, ctx.session.processingMessageId);
      ctx.session.processingMessageId = undefined;
    }
  }

  /**
   * Clean up old messages from session
   */
  static async cleanup(ctx: MyContext): Promise<void> {
    await this.deleteProcessing(ctx);
    if (ctx.session.lastMessageId) {
      await this.deleteMessage(ctx, ctx.session.lastMessageId);
      ctx.session.lastMessageId = undefined;
    }
  }
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString('ru-RU');
};

export const escapeMarkdown = (text: string): string => {
  return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
};