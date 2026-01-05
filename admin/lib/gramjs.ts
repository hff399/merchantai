import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { Api } from 'telegram/tl';

// Store active clients in memory (for verification process)
const activeClients: Map<string, TelegramClient> = new Map();
const pendingVerifications: Map<string, { phone: string; phoneCodeHash: string; apiId: number; apiHash: string }> = new Map();

export async function createClient(apiId: number, apiHash: string, sessionString = ''): Promise<TelegramClient> {
  const session = new StringSession(sessionString);
  const client = new TelegramClient(session, apiId, apiHash, {
    connectionRetries: 5,
  });
  return client;
}

export async function sendVerificationCode(
  accountId: string,
  phone: string,
  apiId: number,
  apiHash: string
): Promise<{ success: boolean; phoneCodeHash?: string; error?: string }> {
  try {
    const client = await createClient(apiId, apiHash);
    await client.connect();

    const result = await client.sendCode(
      { apiId, apiHash },
      phone
    );

    // Store client and verification info
    activeClients.set(accountId, client);
    pendingVerifications.set(accountId, {
      phone,
      phoneCodeHash: result.phoneCodeHash,
      apiId,
      apiHash,
    });

    return { success: true, phoneCodeHash: result.phoneCodeHash };
  } catch (error: any) {
    console.error('Send code error:', error);
    return { success: false, error: error.message || 'Failed to send code' };
  }
}

export async function verifyCode(
  accountId: string,
  code: string,
  password?: string
): Promise<{ success: boolean; sessionString?: string; error?: string }> {
  try {
    const client = activeClients.get(accountId);
    const pending = pendingVerifications.get(accountId);

    if (!client || !pending) {
      return { success: false, error: 'No pending verification found. Please request a new code.' };
    }

    try {
      // Use proper signIn method
      await client.invoke(
        new Api.auth.SignIn({
          phoneNumber: pending.phone,
          phoneCodeHash: pending.phoneCodeHash,
          phoneCode: code,
        })
      );
    } catch (signInError: any) {
      console.error('SignIn error:', signInError.errorMessage || signInError.message);
      
      // Check if 2FA is required
      if (signInError.errorMessage === 'SESSION_PASSWORD_NEEDED') {
        if (!password) {
          return { success: false, error: '2FA_REQUIRED' };
        }
        
        // Handle 2FA - get password info and check
        try {
          const passwordInfo = await client.invoke(new Api.account.GetPassword());
          const passwordSrp = await client.computeSrpHash(passwordInfo, password);
          
          await client.invoke(
            new Api.auth.CheckPassword({
              password: passwordSrp,
            })
          );
        } catch (pwdError: any) {
          console.error('2FA error:', pwdError);
          return { success: false, error: 'Invalid 2FA password' };
        }
      } else if (signInError.errorMessage === 'PHONE_CODE_INVALID') {
        return { success: false, error: 'Invalid code. Please try again.' };
      } else if (signInError.errorMessage === 'PHONE_CODE_EXPIRED') {
        return { success: false, error: 'Code expired. Please request a new one.' };
      } else {
        throw signInError;
      }
    }

    // Get session string
    const sessionString = client.session.save() as unknown as string;

    // Cleanup
    activeClients.delete(accountId);
    pendingVerifications.delete(accountId);

    return { success: true, sessionString };
  } catch (error: any) {
    console.error('Verify code error:', error);
    return { success: false, error: error.message || 'Failed to verify code' };
  }
}

export async function checkConnection(
  apiId: number,
  apiHash: string,
  sessionString: string
): Promise<{ connected: boolean; user?: any; error?: string }> {
  try {
    const client = await createClient(apiId, apiHash, sessionString);
    await client.connect();

    const me = await client.getMe();
    await client.disconnect();

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
    console.error('Check connection error:', error);
    return { connected: false, error: error.message };
  }
}

export async function sendMessage(
  apiId: number,
  apiHash: string,
  sessionString: string,
  target: string | number,
  message: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const client = await createClient(apiId, apiHash, sessionString);
    await client.connect();

    await client.sendMessage(target, { message });
    await client.disconnect();

    return { success: true };
  } catch (error: any) {
    console.error('Send message error:', error);
    return { success: false, error: error.message };
  }
}