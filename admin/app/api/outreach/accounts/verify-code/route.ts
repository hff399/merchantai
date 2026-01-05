import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyCode, checkConnection } from '@/lib/gramjs';

export async function POST(request: NextRequest) {
  try {
    const { accountId, code, password } = await request.json();

    if (!accountId || !code) {
      return NextResponse.json(
        { error: 'Account ID and code are required' },
        { status: 400 }
      );
    }

    // Get account
    const { data: account, error: fetchError } = await supabaseAdmin
      .from('outreach_accounts')
      .select('*')
      .eq('id', accountId)
      .single();

    if (fetchError || !account) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      );
    }

    // Verify code
    const result = await verifyCode(accountId, code, password);
    console.log("!!!!!!" + result.error)

    if (!result.success) {
      if (result.error === '2FA_REQUIRED') {
        // Update status and request password
        await supabaseAdmin
          .from('outreach_accounts')
          .update({
            status: 'awaiting_2fa',
            updated_at: new Date().toISOString(),
          })
          .eq('id', accountId);

        return NextResponse.json(
          { error: '2FA_REQUIRED', message: 'Two-factor authentication required' },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: result.error || 'Failed to verify code' },
        { status: 400 }
      );
    }

    // Get user info
    const connectionCheck = await checkConnection(
      parseInt(account.api_id),
      account.api_hash,
      result.sessionString!
    );

    // Update account with session and connected status
    await supabaseAdmin
      .from('outreach_accounts')
      .update({
        session_string: result.sessionString,
        status: 'connected',
        telegram_id: connectionCheck.user?.id ? parseInt(connectionCheck.user.id) : null,
        telegram_username: connectionCheck.user?.username || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', accountId);

    return NextResponse.json({ 
      success: true,
      message: 'Account connected successfully',
      user: connectionCheck.user,
    });
  } catch (error) {
    console.error('Verify code error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
