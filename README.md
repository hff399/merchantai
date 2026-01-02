# Merchant AI - Telegram Bot

A Telegram bot that helps sellers and designers create info cards for marketplaces.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file and add your bot token:
   ```
   BOT_TOKEN=your_telegram_bot_token_here
   ```

3. Run in development mode:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   npm start
   ```

## Get Bot Token

1. Open Telegram and search for @BotFather
2. Send `/newbot` command
3. Follow instructions to create your bot
4. Copy the token and add it to `.env` file

## Commands

- `/start` - Start the bot
- `/create` - Create a new product card
- `/help` - Show help information
