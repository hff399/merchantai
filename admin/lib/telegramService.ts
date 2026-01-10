/**
 * TELEGRAM OUTREACH SERVICE
 * 
 * Event-driven architecture using gram.js persistent connections.
 * Each connected account maintains a live connection that receives messages instantly.
 * 
 * Flow:
 * 1. Account connects -> Listener starts -> NewMessage event handler attached
 * 2. New message arrives -> Event fires immediately (like a webhook)
 * 3. If new person -> Create lead -> Assign campaign -> Schedule sequence
 * 4. If existing lead -> Update lead -> Continue or pause sequence based on settings
 * 5. Queue processor sends scheduled messages
 */

import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { NewMessage, NewMessageEvent } from 'telegram/events';
import { Api } from 'telegram/tl';
import { supabaseAdmin } from '@/lib/supabase';

// ==========================================
// CONFIGURATION
// ==========================================

const IGNORED_TELEGRAM_IDS = new Set([
  777000,
]);

const IGNORED_USERNAMES = new Set([
  'telegram', 'botfather', 'stickers', 'gif', 'spambot', 'groupanonymousbot', 'rawdatabot',
]);

// ==========================================
// TYPES
// ==========================================

interface ActiveListener {
  client: TelegramClient;
  accountId: string;
  phone: string;
  telegramUserId: number;
  connected: boolean;
  lastActivity: number;
}

interface SequenceStep {
  type: 'text' | 'voice' | 'video_note' | 'photo' | 'video';
  content: string;
  mediaUrl?: string;
  delay_minutes: number;
}

// ==========================================
// STATE
// ==========================================

const activeListeners = new Map<string, ActiveListener>();
const processedMessageIds = new Map<string, Set<number>>();

// ==========================================
// HELPERS
// ==========================================

function toNumber(id: any): number {
  if (typeof id === 'bigint') return Number(id);
  if (typeof id === 'number') return id;
  if (id?.toJSNumber) return id.toJSNumber();
  return parseInt(String(id), 10);
}

function shouldIgnore(userId: number, username?: string): boolean {
  if (IGNORED_TELEGRAM_IDS.has(userId)) return true;
  if (username && IGNORED_USERNAMES.has(username.toLowerCase())) return true;
  return false;
}

// ==========================================
// LISTENER MANAGEMENT
// ==========================================

export async function startAccountListener(
  accountId: string,
  phone: string,
  apiId: number,
  apiHash: string,
  sessionString: string
): Promise<{ success: boolean; error?: string }> {
  console.log(`[Telegram] Starting listener for ${phone}`);

  // Check existing
  const existing = activeListeners.get(accountId);
  if (existing?.connected && existing.client?.connected) {
    return { success: true };
  }

  // Cleanup old
  if (existing) {
    try { await existing.client.disconnect(); } catch {}
    activeListeners.delete(accountId);
  }

  try {
    const client = new TelegramClient(
      new StringSession(sessionString),
      apiId,
      apiHash,
      { connectionRetries: 5, retryDelay: 2000, autoReconnect: true }
    );

    await client.connect();
    const me = await client.getMe();
    if (!me) throw new Error('Failed to authenticate');

    const myId = toNumber(me.id);

    // Initialize message tracking
    processedMessageIds.set(accountId, new Set());

    

    // Attach event handler - THIS IS THE "WEBHOOK"
    client.addEventHandler(
      (event: NewMessageEvent) => handleIncomingMessage(accountId, event),
      new NewMessage({ incoming: true })
    );

    activeListeners.set(accountId, {
      client,
      accountId,
      phone,
      telegramUserId: myId,
      connected: true,
      lastActivity: Date.now(),
    });

    await supabaseAdmin
      .from('outreach_accounts')
      .update({ status: 'connected', telegram_id: myId, last_error: null })
      .eq('id', accountId);

    console.log(`[Telegram] ✓ Listener active for ${phone} (ID: ${myId})`);
    return { success: true };

  } catch (error: any) {
    console.error(`[Telegram] ✗ Failed for ${phone}:`, error.message);
    await supabaseAdmin
      .from('outreach_accounts')
      .update({ status: 'disconnected', last_error: error.message })
      .eq('id', accountId);
    return { success: false, error: error.message };
  }
}

export async function stopAccountListener(accountId: string): Promise<void> {
  const listener = activeListeners.get(accountId);
  if (listener) {
    try { await listener.client.disconnect(); } catch {}
    activeListeners.delete(accountId);
    processedMessageIds.delete(accountId);
  }
}

export async function startAllListeners(): Promise<{ success: number; failed: number }> {
  const { data: accounts } = await supabaseAdmin
    .from('outreach_accounts')
    .select('id, phone, api_id, api_hash, session_string')
    .not('session_string', 'is', null)
    .neq('session_string', '');

  let success = 0, failed = 0;

  for (const acc of accounts || []) {
    const result = await startAccountListener(
      acc.id, acc.phone, parseInt(acc.api_id), acc.api_hash, acc.session_string
    );
    result.success ? success++ : failed++;
    await new Promise(r => setTimeout(r, 500));
  }

  return { success, failed };
}

export function getListenerStatus() {
  const accounts = Array.from(activeListeners.values()).map(l => ({
    id: l.accountId,
    phone: l.phone,
    connected: l.connected && l.client?.connected,
    lastActivity: l.lastActivity,
  }));
  return { total: accounts.length, connected: accounts.filter(a => a.connected).length, accounts };
}

// ==========================================
// INCOMING MESSAGE HANDLER (THE "WEBHOOK")
// ==========================================

async function handleIncomingMessage(accountId: string, event: NewMessageEvent): Promise<void> {
  try {
    
    const message = event.message;
    if (!message || message.out) return;



    console.log(event)
    console.log(event.peerId.className)
    console.log(event)
    if (event.peerId.className != "PeerUser") return

    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!@@@@@@")
    
    const chatId = toNumber(message.chatId);
    console.log(chatId)
    if (!chatId) return;

    console.log(message.text)
    
    const sender = await message.getSender() as Api.User;
    if (!sender || sender.bot) return;
    
    const userId = toNumber(sender.id);
    const msgId = message.id;
    
    
    if (shouldIgnore(userId, sender.username || undefined)) return;
    
    


    // Parse message
    let type = 'text';
    let content = message.text || '';

    if (message.voice) { type = 'voice'; content = content || '[Голосовое]'; }
    else if (message.videoNote) { type = 'video_note'; content = content || '[Видеокружок]'; }
    else if (message.photo) { type = 'photo'; content = content || '[Фото]'; }
    else if (message.video) { type = 'video'; content = content || '[Видео]'; }
    else if (message.sticker) { type = 'sticker'; content = message.sticker.id.toString() || '[Стикер]'; }

    console.log(`[Telegram] 📨 ${sender.username || userId}: ${content.substring(0, 50)}`);

    // Process the message
    
    await processIncomingMessage({
      accountId,
      chatId,
      userId,
      messageId: msgId,
      username: sender.username,
      firstName: sender.firstName,
      lastName: sender.lastName,
      type,
      content,
    });

    // Update listener activity
    const listener = activeListeners.get(accountId);
    if (listener) listener.lastActivity = Date.now();


  } catch (error: any) {
    console.error(`[Telegram] Handler error:`, error.message);
  }
}

// ==========================================
// MESSAGE PROCESSING LOGIC
// ==========================================

async function processIncomingMessage(data: {
  accountId: string;
  chatId: number;
  userId: number;
  messageId: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  type: string;
  content: string;
}): Promise<void> {
  const { accountId, chatId, userId, messageId, username, firstName, lastName, type, content } = data;

  // Check if lead exists
  const { data: existingLead } = await supabaseAdmin
    .from('outreach_leads')
    .select('id, status, campaign_id, total_messages_received')
    .eq('account_id', accountId)
    .eq('telegram_id', userId)
    .single();

  

  let leadId: string;
  let isNewLead = false;

  if (existingLead) {
    // EXISTING LEAD - Update and handle reply
    leadId = existingLead.id;
    
    const wasInSequence = existingLead.status === 'sequence_active';
    const isFirstReply = existingLead.status === 'new' || wasInSequence;

    await supabaseAdmin
      .from('outreach_leads')
      .update({
        last_lead_message: content,
        total_messages_received: (existingLead.total_messages_received || 0) + 1,
        status: isFirstReply ? 'replied' : existingLead.status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', leadId);

    // Update campaign stats only on first reply
    if (isFirstReply && existingLead.campaign_id) {
      await supabaseAdmin.rpc('increment_campaign_replies', { 
        campaign_id: existingLead.campaign_id 
      })
    }

    // DON'T cancel pending messages - let the sequence continue
    // Only pause if campaign settings say to pause on reply
    if (wasInSequence && existingLead.campaign_id) {
      const { data: campaign } = await supabaseAdmin
        .from('outreach_campaigns')
        .select('pause_on_reply')
        .eq('id', existingLead.campaign_id)
        .single();

      if (campaign?.pause_on_reply) {
        await supabaseAdmin
          .from('outreach_message_queue')
          .update({ status: 'paused' })
          .eq('lead_id', leadId)
          .eq('status', 'pending');
      }
    }

    console.log(`[Telegram] Updated lead ${leadId}`);

  } else {
    console.log("22222222222222")

    // NEW LEAD - Create and start campaign
    isNewLead = true;
    console.log(`[Telegram] 🎉 New lead: ${username || userId}`);

    // Get account's default campaign
    const { data: account } = await supabaseAdmin
      .from('outreach_accounts')
      .select('default_campaign_id, total_conversations')
      .eq('id', accountId)
      .single();

    const { data: newLead, error } = await supabaseAdmin
      .from('outreach_leads')
      .insert({
        account_id: accountId,
        telegram_id: userId,
        telegram_chat_id: chatId,
        username,
        first_name: firstName,
        last_name: lastName,
        source: 'incoming_dm',
        initial_message: content,
        last_lead_message: content,
        status: 'new',
        total_messages_received: 1,
        campaign_id: account?.default_campaign_id || null,
      })
      .select()
      .single();

    if (error || !newLead) {
      console.error(`[Telegram] Failed to create lead:`, error);
      return;
    }

    leadId = newLead.id;

    // Update account stats
    await supabaseAdmin
      .from('outreach_accounts')
      .update({ total_conversations: (account?.total_conversations || 0) + 1 })
      .eq('id', accountId);

    // Start campaign sequence
    if (account?.default_campaign_id) {
        console.log('sequence started')
      await startSequenceForLead(leadId, accountId, account.default_campaign_id);
    }
  }

  // Save message to outreach_messages (for chat display)
  const res = await supabaseAdmin.from('outreach_messages').insert({
    lead_id: leadId,
    account_id: accountId,
    direction: 'incoming',
    type,
    message: content,
    telegram_message_id: messageId,
    status: 'delivered',
    created_at: new Date().toISOString(),
  });

  // Record in incoming messages table
  await supabaseAdmin.from('outreach_incoming_messages').insert({
    account_id: accountId,
    telegram_chat_id: chatId,
    telegram_message_id: messageId,
    telegram_user_id: userId,
    username,
    first_name: firstName,
    last_name: lastName,
    type,
    content,
    is_first_message: isNewLead,
    processed: true,
    lead_id: leadId,
  });
}

// ==========================================
// SEQUENCE MANAGEMENT
// ==========================================

async function startSequenceForLead(leadId: string, accountId: string, campaignId: string): Promise<void> {
  const { data: campaign } = await supabaseAdmin
    .from('outreach_campaigns')
    .select('*')
    .eq('id', campaignId)
    .eq('status', 'active')
    .single();

  if (!campaign) {
    console.log(`[Telegram] Campaign ${campaignId} not active`);
    return;
  }

  // Use auto_reply_sequence for incoming leads, dm_sequence for outbound
  const sequence: SequenceStep[] = campaign.dm_sequence || [];
  
  if (sequence.length === 0) {
    console.log(`[Telegram] Campaign has no sequence`);
    return;
  }

  console.log(`[Telegram] Starting "${campaign.name}" sequence (${sequence.length} steps) for lead ${leadId}`);

  // Update lead
  await supabaseAdmin
    .from('outreach_leads')
    .update({
      campaign_id: campaignId,
      current_sequence_step: 0,
      sequence_started_at: new Date().toISOString(),
      status: 'sequence_active',
    })
    .eq('id', leadId);

  // Schedule all messages in sequence
  let scheduledTime = new Date();

  for (let i = 0; i < sequence.length; i++) {
    const step = sequence[i];
    scheduledTime = new Date(scheduledTime.getTime() + (step.delay_minutes || 1) * 60 * 1000);

    const res = await supabaseAdmin.from('outreach_message_queue').insert({
      lead_id: leadId,
      account_id: accountId,
      campaign_id: campaignId,
      type: step.type || 'text',
      content: step.content || '',
      media_url: step.mediaUrl || null,
      scheduled_at: scheduledTime.toISOString(),
      priority: 10 - i, // Earlier steps have higher priority
      status: 'pending',
    });

    console.log(res)
  }

  // Update campaign stats
  await supabaseAdmin
    .from('outreach_campaigns')
    .update({ sequences_started: (campaign.sequences_started || 0) + 1 })
    .eq('id', campaignId);

  console.log(`[Telegram] Scheduled ${sequence.length} messages, first at ${scheduledTime.toISOString()}`);
}

// ==========================================
// QUEUE PROCESSOR
// ==========================================

export async function processMessageQueue(limit = 10): Promise<{
  processed: number;
  sent: number;
  failed: number;
  errors: string[];
}> {
  const results = { processed: 0, sent: 0, failed: 0, errors: [] as string[] };

  // Get pending messages that are due
  const { data: messages } = await supabaseAdmin
    .from('outreach_message_queue')
    .select('*, outreach_leads(telegram_chat_id, username, telegram_id, status)')
    .eq('status', 'pending')
    .lte('scheduled_at', new Date().toISOString())
    .order('priority', { ascending: false })
    .order('scheduled_at', { ascending: true })
    .limit(limit);

    console.log(messages)

  if (!messages || messages.length === 0) return results;

  console.log(`[Queue] Processing ${messages.length} messages`);

  for (const msg of messages) {
    results.processed++;

    // Skip if lead has replied and campaign pauses on reply
    if (msg.outreach_leads?.status === 'replied') {
      const { data: campaign } = await supabaseAdmin
        .from('outreach_campaigns')
        .select('pause_on_reply')
        .eq('id', msg.campaign_id)
        .single();

      if (campaign?.pause_on_reply) {
        await supabaseAdmin
          .from('outreach_message_queue')
          .update({ status: 'paused' })
          .eq('id', msg.id);
        continue;
      }
    }

    // Mark as processing
    await supabaseAdmin
      .from('outreach_message_queue')
      .update({ status: 'processing', attempts: (msg.attempts || 0) + 1 })
      .eq('id', msg.id);

    // Get account
    const { data: account } = await supabaseAdmin
      .from('outreach_accounts')
      .select('*')
      .eq('id', msg.account_id)
      .single();

    if (!account?.session_string) {
      await supabaseAdmin
        .from('outreach_message_queue')
        .update({ status: 'failed', error_message: 'Account not connected' })
        .eq('id', msg.id);
      results.failed++;
      continue;
    }

    // Get target
    const lead = msg.outreach_leads;
    const target = lead?.telegram_chat_id || lead?.username || lead?.telegram_id;

    if (!target) {
      await supabaseAdmin
        .from('outreach_message_queue')
        .update({ status: 'failed', error_message: 'No target' })
        .eq('id', msg.id);
      results.failed++;
      continue;
    }

    // Send message
    const sendResult = await sendTelegramMessage(
      account,
      target,
      msg.type,
      msg.content,
      msg.media_url
    );

    if (sendResult.success) {
      results.sent++;

      // Update queue
      await supabaseAdmin
        .from('outreach_message_queue')
        .update({ status: 'sent' })
        .eq('id', msg.id);

      // Save to messages
      await supabaseAdmin.from('outreach_messages').insert({
        lead_id: msg.lead_id,
        account_id: msg.account_id,
        direction: 'outgoing',
        type: msg.type,
        content: msg.content,
        media_url: msg.media_url,
        telegram_message_id: sendResult.messageId,
        is_auto_sent: true,
        sequence_step: msg.sequence_step,
        status: 'sent',
        sent_at: new Date().toISOString(),
      });

      // Update lead
      await supabaseAdmin
        .from('outreach_leads')
        .update({
          total_messages_sent: 1, // Will be handled by trigger
          last_our_message: msg.content,
          last_message_sent_at: new Date().toISOString(),
          current_sequence_step: (msg.sequence_step || 0) + 1,
        })
        .eq('id', msg.lead_id);

      // Update campaign stats
      if (msg.campaign_id) {
        const { data: camp } = await supabaseAdmin
          .from('outreach_campaigns')
          .select('messages_sent')
          .eq('id', msg.campaign_id)
          .single();

        await supabaseAdmin
          .from('outreach_campaigns')
          .update({ messages_sent: (camp?.messages_sent || 0) + 1 })
          .eq('id', msg.campaign_id);
      }

      console.log(`[Queue] ✓ Sent to ${target}`);

    } else {
      results.failed++;
      results.errors.push(`${msg.id}: ${sendResult.error}`);

      if ((msg.attempts || 0) >= 3) {
        await supabaseAdmin
          .from('outreach_message_queue')
          .update({ status: 'failed', error_message: sendResult.error })
          .eq('id', msg.id);
      } else {
        // Retry in 5 minutes
        await supabaseAdmin
          .from('outreach_message_queue')
          .update({
            status: 'pending',
            error_message: sendResult.error,
            scheduled_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
          })
          .eq('id', msg.id);
      }

      console.log(`[Queue] ✗ Failed: ${sendResult.error}`);
    }

    // Rate limit delay
    await new Promise(r => setTimeout(r, 2000 + Math.random() * 2000));
  }

  return results;
}

// ==========================================
// TELEGRAM SEND FUNCTIONS
// ==========================================

async function sendTelegramMessage(
  account: any,
  target: string | number,
  type: string,
  content: string,
  mediaUrl?: string
): Promise<{ success: boolean; messageId?: number; error?: string }> {
  let client: TelegramClient | null = null;

  try {
    // Try to use existing listener's client
    const listener = activeListeners.get(account.id);
    
    if (listener?.client?.connected) {
      client = listener.client;
    } else {
      // Create new client
      client = new TelegramClient(
        new StringSession(account.session_string),
        parseInt(account.api_id),
        account.api_hash,
        { connectionRetries: 3 }
      );
      await client.connect();
    }

    await client.getDialogs()

    const peer = await client.getEntity(target);

    let result: any;

    const messages = await client.getMessages(
      new Api.InputPeerSelf(),
      { limit: 1 }
    );

    if (type === 'text' || !mediaUrl) {
      result = await client.sendMessage(peer, { message: content });
    } else if (type === 'voice') {
      result = await client.forwardMessages(peer, {messages: messages[0].id, fromPeer: new Api.InputPeerSelf(), dropAuthor: true});
    } else if (type === 'video_note') {
      result = await client.forwardMessages(peer, {messages: messages[0].id, fromPeer: new Api.InputPeerSelf(), dropAuthor: true});
    } else {
      result = await client.sendFile(peer, { file: mediaUrl, caption: content });
    }

    // Disconnect only if we created a new client
    if (!listener?.client?.connected && client) {
      await client.disconnect();
    }

    return { success: true, messageId: result.id };

  } catch (error: any) {
    console.error(`[Telegram] Send error:`, error.message);

    // Disconnect on error if we created a new client
    if (client && !activeListeners.get(account.id)?.client?.connected) {
      try { await client.disconnect(); } catch {}
    }

    return { success: false, error: error.message };
  }
}

// ==========================================
// MANUAL SEND (from chat panel)
// ==========================================

export async function sendManualMessage(
  leadId: string,
  type: string,
  content: string,
  mediaUrl?: string
): Promise<{ success: boolean; messageId?: Number; error?: string }> {
  const { data: lead } = await supabaseAdmin
    .from('outreach_leads')
    .select('*, outreach_accounts(*)')
    .eq('id', leadId)
    .single();

  if (!lead?.outreach_accounts?.session_string) {
    return { success: false, error: 'Account not connected' };
  }

  const account = lead.outreach_accounts;
  const target = lead.telegram_chat_id || lead.username || lead.telegram_id;

  const result = await sendTelegramMessage(account, target, type, content, mediaUrl);

  if (result.success) {
    // Save message
    const { data: saved } = await supabaseAdmin.from('outreach_messages').insert({
      lead_id: leadId,
      account_id: account.id,
      direction: 'outgoing',
      type,
      content,
      media_url: mediaUrl,
      telegram_message_id: result.messageId,
      is_auto_sent: false,
      status: 'sent',
      sent_at: new Date().toISOString(),
    }).select().single();

    // Update lead
    await supabaseAdmin
      .from('outreach_leads')
      .update({
        total_messages_sent: (lead.total_messages_sent || 0) + 1,
        last_our_message: content,
        last_message_sent_at: new Date().toISOString(),
      })
      .eq('id', leadId);

    return { success: true, messageId: saved?.id };
  }

  return result;
}

// ==========================================
// HEALTH CHECK
// ==========================================

export async function healthCheck(): Promise<{ checked: number; reconnected: number; failed: number }> {
  const results = { checked: 0, reconnected: 0, failed: 0 };

  const { data: accounts } = await supabaseAdmin
    .from('outreach_accounts')
    .select('id, phone, api_id, api_hash, session_string')
    .not('session_string', 'is', null);

  for (const acc of accounts || []) {
    results.checked++;
    const listener = activeListeners.get(acc.id);

    if (!listener?.connected || !listener.client?.connected) {
      const result = await startAccountListener(
        acc.id, acc.phone, parseInt(acc.api_id), acc.api_hash, acc.session_string
      );
      result.success ? results.reconnected++ : results.failed++;
    }
  }

  return results;
}
