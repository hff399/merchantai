import { Bot } from 'grammy';
import { config } from '../config';

class NotificationBotService {
  private bot: Bot | null = null;
  private chatIds: Set<number> = new Set();

  constructor() {
    if (config.notificationBotToken) {
      this.bot = new Bot(config.notificationBotToken);
      this.setupHandlers();
      this.start();
    } else {
      console.warn('Notification bot token not set, notifications disabled');
    }
  }

  private setupHandlers() {
    if (!this.bot) return;

    // When bot is added to a group, save the chat ID
    this.bot.on('my_chat_member', async (ctx) => {
      const chat = ctx.chat;
      const newStatus = ctx.myChatMember.new_chat_member.status;

      if (newStatus === 'member' || newStatus === 'administrator') {
        this.chatIds.add(chat.id);
        console.log(`Notification bot added to chat: ${chat.id} (${chat.type})`);
        
        await ctx.reply('✅ Бот уведомлений активирован!\n\nЯ буду присылать уведомления о покупках в этот чат.');
      } else if (newStatus === 'left' || newStatus === 'kicked') {
        this.chatIds.delete(chat.id);
        console.log(`Notification bot removed from chat: ${chat.id}`);
      }
    });

    // Command to check bot status
    this.bot.command('status', async (ctx) => {
      await ctx.reply('🤖 Бот уведомлений работает!');
    });
  }

  private async start() {
    if (!this.bot) return;

    try {
      await this.bot.start({
        onStart: (botInfo) => {
          console.log(`🔔 Notification bot started: @${botInfo.username}`);
        },
      });
    } catch (error) {
      console.error('Failed to start notification bot:', error);
    }
  }

  // Send notification to all registered chats
  async notify(message: string, parseMode: 'HTML' | 'Markdown' = 'HTML'): Promise<void> {
    if (!this.bot || this.chatIds.size === 0) {
      console.log('No chats to notify or bot not initialized');
      return;
    }

    for (const chatId of this.chatIds) {
      try {
        await this.bot.api.sendMessage(chatId, message, { parse_mode: parseMode });
      } catch (error) {
        console.error(`Failed to send notification to chat ${chatId}:`, error);
        // Remove chat if we can't send to it
        this.chatIds.delete(chatId);
      }
    }
  }

  // Notify about token purchase
  async notifyPurchase(
    userId: string,
    username: string | undefined,
    packageName: string,
    credits: number,
    amount: number,
    currency: string
  ): Promise<void> {
    const message = `💰 <b>Новая покупка!</b>

👤 Пользователь: ${username ? `@${username}` : `ID: ${userId}`}
📦 Пакет: <b>${packageName}</b>
🎯 Кредиты: <b>${credits}</b>
💵 Сумма: <b>${amount} ${currency}</b>

🕐 ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`;

    await this.notify(message);
  }

  // Notify about new user registration
  async notifyNewUser(
    userId: string,
    username: string | undefined,
    firstName: string | undefined
  ): Promise<void> {
    const message = `🆕 <b>Новый пользователь!</b>

👤 ${firstName || 'Без имени'} ${username ? `(@${username})` : ''}
🆔 ID: <code>${userId}</code>

🕐 ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`;

    await this.notify(message);
  }

  // Add chat ID manually (e.g., from env or database)
  addChatId(chatId: number): void {
    this.chatIds.add(chatId);
  }

  // Get current chat IDs
  getChatIds(): number[] {
    return Array.from(this.chatIds);
  }
}

export const notificationBot = new NotificationBotService();