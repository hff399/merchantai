import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { Api } from 'telegram/tl';

// Store active clients and verification data in memory
// Note: In production, consider using Redis for multi-instance support
interface ClientData {
  client: TelegramClient;
  createdAt: number;
}

interface VerificationData {
  phone: string;
  phoneCodeHash: string;
  apiId: number;
  apiHash: string;
  createdAt: number;
}

const activeClients: Map<string, ClientData> = new Map();
const pendingVerifications: Map<string, VerificationData> = new Map();

// Cleanup old clients and verifications every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000;
const CLIENT_TTL = 30 * 60 * 1000; // 30 minutes
const VERIFICATION_TTL = 10 * 60 * 1000; // 10 minutes

function cleanup() {
  const now = Date.now();
  
  // Cleanup old clients
  const clientKeys = Array.from(activeClients.keys());
  for (const id of clientKeys) {
    const data = activeClients.get(id);
    if (data && now - data.createdAt > CLIENT_TTL) {
      try {
        data.client.disconnect();
      } catch (e) {
        // Ignore disconnect errors
      }
      activeClients.delete(id);
      console.log(`[GramJS] Cleaned up stale client for account ${id}`);
    }
  }
  
  // Cleanup old verifications
  const verificationKeys = Array.from(pendingVerifications.keys());
  for (const id of verificationKeys) {
    const data = pendingVerifications.get(id);
    if (data && now - data.createdAt > VERIFICATION_TTL) {
      pendingVerifications.delete(id);
      console.log(`[GramJS] Cleaned up expired verification for account ${id}`);
    }
  }
}

// Start cleanup interval
if (typeof setInterval !== 'undefined') {
  setInterval(cleanup, CLEANUP_INTERVAL);
}

/**
 * Create a new Telegram client
 */
export async function createClient(
  apiId: number,
  apiHash: string,
  sessionString = ''
): Promise<TelegramClient> {
  const session = new StringSession(sessionString);
  
  const client = new TelegramClient(session, apiId, apiHash, {
    connectionRetries: 5,
    retryDelay: 1000,
    autoReconnect: true,
    timeout: 30000,
  });
  
  return client;
}

/**
 * Get or create a client for an account
 */
async function getOrCreateClient(
  accountId: string,
  apiId: number,
  apiHash: string,
  sessionString = ''
): Promise<TelegramClient> {
  // Check if we have an existing connected client
  const existing = activeClients.get(accountId);
  if (existing && existing.client.connected) {
    return existing.client;
  }
  
  // Create new client
  const client = await createClient(apiId, apiHash, sessionString);
  
  return client;
}

/**
 * Send verification code to phone
 */
export async function sendVerificationCode(
  accountId: string,
  phone: string,
  apiId: number,
  apiHash: string
): Promise<{ success: boolean; phoneCodeHash?: string; error?: string }> {
  console.log(`[GramJS] Sending verification code for ${phone}...`);
  
  let client: TelegramClient | null = null;
  
  try {
    // Create a fresh client for verification
    client = await createClient(apiId, apiHash);
    await client.connect();
    
    console.log(`[GramJS] Client connected, sending code...`);
    
    // Send the code
    const result = await client.sendCode(
      {
        apiId,
        apiHash,
      },
      phone
    );
    
    console.log(`[GramJS] Code sent successfully, hash: ${result.phoneCodeHash.substring(0, 8)}...`);
    
    // Store verification data
    pendingVerifications.set(accountId, {
      phone,
      phoneCodeHash: result.phoneCodeHash,
      apiId,
      apiHash,
      createdAt: Date.now(),
    });
    
    // Store the client for later use during verification
    activeClients.set(accountId, {
      client,
      createdAt: Date.now(),
    });
    
    return {
      success: true,
      phoneCodeHash: result.phoneCodeHash,
    };
  } catch (error: any) {
    console.error('[GramJS] Send code error:', error);
    
    // Cleanup on error
    if (client) {
      try {
        await client.disconnect();
      } catch (e) {
        // Ignore
      }
    }
    
    const errorMessage = error.errorMessage || error.message || '';
    
    // Handle specific errors
    if (errorMessage.includes('PHONE_NUMBER_INVALID')) {
      return { success: false, error: 'Неверный формат номера телефона.' };
    }
    if (errorMessage.includes('PHONE_NUMBER_BANNED')) {
      return { success: false, error: 'Этот номер заблокирован в Telegram.' };
    }
    if (errorMessage.includes('PHONE_NUMBER_FLOOD')) {
      return { success: false, error: 'Слишком много попыток. Подождите некоторое время.' };
    }
    if (errorMessage.includes('API_ID_INVALID')) {
      return { success: false, error: 'Неверный API ID.' };
    }
    if (errorMessage.includes('API_HASH_INVALID')) {
      return { success: false, error: 'Неверный API Hash.' };
    }
    if (errorMessage.includes('FLOOD_WAIT')) {
      const match = errorMessage.match(/FLOOD_WAIT_(\d+)/);
      const seconds = match ? parseInt(match[1]) : 60;
      return { success: false, error: `Подождите ${seconds} секунд перед повторной попыткой.` };
    }
    
    return { success: false, error: errorMessage || 'Ошибка отправки кода' };
  }
}

/**
 * Verify the code and complete sign in
 */
export async function verifyCode(
  accountId: string,
  code: string,
  password?: string
): Promise<{ 
  success: boolean; 
  sessionString?: string; 
  user?: any;
  error?: string;
  requires2FA?: boolean;
}> {
  console.log(`[GramJS] Verifying code for account ${accountId}...`);
  
  // Get pending verification
  const verification = pendingVerifications.get(accountId);
  if (!verification) {
    return { success: false, error: 'Сессия верификации не найдена. Запросите код заново.' };
  }
  
  // Get the active client
  const clientData = activeClients.get(accountId);
  if (!clientData || !clientData.client) {
    return { success: false, error: 'Клиент не найден. Запросите код заново.' };
  }
  
  const client = clientData.client;
  const { phone, phoneCodeHash, apiId, apiHash } = verification;
  
  try {
    // Make sure we're connected
    if (!client.connected) {
      await client.connect();
    }
    
    console.log(`[GramJS] Attempting sign in...`);
    
    try {
      // Try to sign in with the code
      const result = await client.invoke(
        new Api.auth.SignIn({
          phoneNumber: phone,
          phoneCodeHash: phoneCodeHash,
          phoneCode: code,
        })
      );
      
      console.log(`[GramJS] Sign in successful`);
      
      // Get session string
      const sessionString = (client.session as StringSession).save();
      
      // Get user info
      const me = await client.getMe();
      
      // Clean up verification data but keep client
      pendingVerifications.delete(accountId);
      
      return {
        success: true,
        sessionString,
        user: {
          id: me?.id?.toString(),
          username: me?.username,
          firstName: me?.firstName,
          lastName: me?.lastName,
          phone: me?.phone,
        },
      };
    } catch (signInError: any) {
      const errorMessage = signInError.errorMessage || signInError.message || '';
      console.log(`[GramJS] Sign in error: ${errorMessage}`);
      
      // Check if 2FA is required
      if (errorMessage.includes('SESSION_PASSWORD_NEEDED')) {
        console.log(`[GramJS] 2FA required`);
        
        if (!password) {
          return { success: false, error: '2FA_REQUIRED', requires2FA: true };
        }
        
        // Get 2FA password info
        const passwordInfo = await client.invoke(new Api.account.GetPassword());
        
        // Compute the SRP check using the telegram library
        const { computeCheck } = await import('telegram/Password');
        const srpResult = await computeCheck(passwordInfo, password);
        
        // Check password
        await client.invoke(
          new Api.auth.CheckPassword({
            password: srpResult,
          })
        );
        
        console.log(`[GramJS] 2FA verification successful`);
        
        // Get session string
        const sessionString = (client.session as StringSession).save();
        
        // Get user info
        const me = await client.getMe();
        
        // Clean up
        pendingVerifications.delete(accountId);
        
        return {
          success: true,
          sessionString,
          user: {
            id: me?.id?.toString(),
            username: me?.username,
            firstName: me?.firstName,
            lastName: me?.lastName,
            phone: me?.phone,
          },
        };
      }
      
      // Handle other errors
      if (errorMessage.includes('PHONE_CODE_INVALID')) {
        return { success: false, error: 'Неверный код. Проверьте и попробуйте снова.' };
      }
      if (errorMessage.includes('PHONE_CODE_EXPIRED')) {
        pendingVerifications.delete(accountId);
        return { success: false, error: 'Код истёк. Запросите новый код.' };
      }
      if (errorMessage.includes('PHONE_CODE_EMPTY')) {
        return { success: false, error: 'Введите код из Telegram.' };
      }
      if (errorMessage.includes('SESSION_EXPIRED')) {
        pendingVerifications.delete(accountId);
        return { success: false, error: 'Сессия истекла. Запросите новый код.' };
      }
      if (errorMessage.includes('PASSWORD_HASH_INVALID')) {
        return { success: false, error: 'Неверный пароль 2FA.' };
      }
      
      return { success: false, error: errorMessage || 'Ошибка верификации' };
    }
  } catch (error: any) {
    console.error('[GramJS] Verify code error:', error);
    return { success: false, error: error.message || 'Внутренняя ошибка' };
  }
}

/**
 * Check if a session is still valid
 */
export async function checkConnection(
  apiId: number,
  apiHash: string,
  sessionString: string
): Promise<{ connected: boolean; user?: any; error?: string }> {
  console.log(`[GramJS] Checking connection...`);
  
  let client: TelegramClient | null = null;
  
  try {
    client = await createClient(apiId, apiHash, sessionString);
    await client.connect();
    
    const me = await client.getMe();
    
    console.log(`[GramJS] Connection valid for user ${me?.username || me?.id}`);
    
    return {
      connected: true,
      user: {
        id: me?.id?.toString(),
        username: me?.username,
        firstName: me?.firstName,
        lastName: me?.lastName,
        phone: me?.phone,
      },
    };
  } catch (error: any) {
    console.error('[GramJS] Check connection error:', error);
    
    const errorMessage = error.errorMessage || error.message || '';
    
    if (errorMessage.includes('AUTH_KEY_UNREGISTERED') || errorMessage.includes('SESSION_REVOKED')) {
      return { connected: false, error: 'Сессия отозвана. Необходима повторная авторизация.' };
    }
    
    return { connected: false, error: errorMessage || 'Connection failed' };
  } finally {
    if (client) {
      try {
        await client.disconnect();
      } catch (e) {
        // Ignore
      }
    }
  }
}

/**
 * Send a message using a session
 */
export async function sendMessage(
  apiId: number,
  apiHash: string,
  sessionString: string,
  target: string | number,
  message: string
): Promise<{ success: boolean; messageId?: number; error?: string }> {
  console.log(`[GramJS] Sending message to ${target}...`);
  
  let client: TelegramClient | null = null;
  
  try {
    client = await createClient(apiId, apiHash, sessionString);
    await client.connect();
    
    const result = await client.sendMessage(target, { message });
    
    console.log(`[GramJS] Message sent, ID: ${result.id}`);
    
    return {
      success: true,
      messageId: result.id,
    };
  } catch (error: any) {
    console.error('[GramJS] Send message error:', error);
    
    const errorMessage = error.errorMessage || error.message || '';
    
    if (errorMessage.includes('PEER_FLOOD')) {
      return { success: false, error: 'Ограничение Telegram на отправку сообщений. Попробуйте позже.' };
    }
    if (errorMessage.includes('USER_BANNED_IN_CHANNEL')) {
      return { success: false, error: 'Аккаунт заблокирован в этом чате.' };
    }
    if (errorMessage.includes('CHAT_WRITE_FORBIDDEN')) {
      return { success: false, error: 'Нет прав на отправку сообщений в этот чат.' };
    }
    
    return { success: false, error: errorMessage || 'Ошибка отправки' };
  } finally {
    if (client) {
      try {
        await client.disconnect();
      } catch (e) {
        // Ignore
      }
    }
  }
}

/**
 * Join a chat/channel
 */
export async function joinChat(
  apiId: number,
  apiHash: string,
  sessionString: string,
  chatLink: string
): Promise<{ success: boolean; chat?: any; error?: string }> {
  console.log(`[GramJS] Joining chat ${chatLink}...`);
  
  let client: TelegramClient | null = null;
  
  try {
    client = await createClient(apiId, apiHash, sessionString);
    await client.connect();
    
    // Extract username or invite hash from link
    let target = chatLink;
    if (chatLink.includes('t.me/')) {
      target = chatLink.split('t.me/')[1].split('/')[0].replace('+', '');
    }
    
    let result;
    
    if (target.startsWith('joinchat/') || chatLink.includes('/+')) {
      // It's an invite link
      const hash = target.replace('joinchat/', '');
      result = await client.invoke(
        new Api.messages.ImportChatInvite({ hash })
      );
    } else {
      // It's a public username
      result = await client.invoke(
        new Api.channels.JoinChannel({
          channel: target,
        })
      );
    }
    
    console.log(`[GramJS] Joined chat successfully`);
    
    return {
      success: true,
      chat: result,
    };
  } catch (error: any) {
    console.error('[GramJS] Join chat error:', error);
    
    const errorMessage = error.errorMessage || error.message || '';
    
    if (errorMessage.includes('INVITE_HASH_EXPIRED')) {
      return { success: false, error: 'Ссылка-приглашение истекла.' };
    }
    if (errorMessage.includes('INVITE_HASH_INVALID')) {
      return { success: false, error: 'Неверная ссылка-приглашение.' };
    }
    if (errorMessage.includes('USER_ALREADY_PARTICIPANT')) {
      return { success: true }; // Already in the chat
    }
    if (errorMessage.includes('CHANNELS_TOO_MUCH')) {
      return { success: false, error: 'Аккаунт состоит в слишком многих группах/каналах.' };
    }
    
    return { success: false, error: errorMessage || 'Ошибка вступления' };
  } finally {
    if (client) {
      try {
        await client.disconnect();
      } catch (e) {
        // Ignore
      }
    }
  }
}

/**
 * Get chat participants
 */
export async function getChatParticipants(
  apiId: number,
  apiHash: string,
  sessionString: string,
  chatId: string | number,
  limit = 200
): Promise<{ success: boolean; participants?: any[]; error?: string }> {
  console.log(`[GramJS] Getting participants for ${chatId}...`);
  
  let client: TelegramClient | null = null;
  
  try {
    client = await createClient(apiId, apiHash, sessionString);
    await client.connect();
    
    const participants = await client.getParticipants(chatId, { limit });
    
    console.log(`[GramJS] Got ${participants.length} participants`);
    
    return {
      success: true,
      participants: participants.map(p => ({
        id: p.id?.toString(),
        username: p.username,
        firstName: p.firstName,
        lastName: p.lastName,
        phone: p.phone,
      })),
    };
  } catch (error: any) {
    console.error('[GramJS] Get participants error:', error);
    return { success: false, error: error.message || 'Failed to get participants' };
  } finally {
    if (client) {
      try {
        await client.disconnect();
      } catch (e) {
        // Ignore
      }
    }
  }
}

/**
 * Disconnect all clients (for cleanup)
 */
export async function disconnectAll(): Promise<void> {
  console.log(`[GramJS] Disconnecting all clients...`);
  
  const clientKeys = Array.from(activeClients.keys());
  for (const id of clientKeys) {
    const data = activeClients.get(id);
    if (data) {
      try {
        await data.client.disconnect();
      } catch (e) {
        // Ignore
      }
    }
  }
  
  activeClients.clear();
  pendingVerifications.clear();
  
  console.log(`[GramJS] All clients disconnected`);
}