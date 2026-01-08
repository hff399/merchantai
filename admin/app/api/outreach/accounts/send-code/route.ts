import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendVerificationCode } from '@/lib/gramjs';

export const maxDuration = 60; // Allow up to 60 seconds for this operation

export async function POST(request: NextRequest) {
  try {
    const { accountId } = await request.json();

    if (!accountId) {
      return NextResponse.json(
        { error: 'Account ID is required' },
        { status: 400 }
      );
    }

    // Get account details
    const { data: account, error: fetchError } = await supabaseAdmin
      .from('outreach_accounts')
      .select('*')
      .eq('id', accountId)
      .single();

    if (fetchError || !account) {
      console.error('Account fetch error:', fetchError);
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      );
    }

    // Validate API credentials
    const apiId = parseInt(account.api_id);
    if (isNaN(apiId)) {
      return NextResponse.json(
        { error: 'Invalid API ID' },
        { status: 400 }
      );
    }

    if (!account.api_hash || account.api_hash.length < 20) {
      return NextResponse.json(
        { error: 'Invalid API Hash' },
        { status: 400 }
      );
    }

    // Clean phone number
    const phone = account.phone.trim();
    if (!phone.startsWith('+')) {
      return NextResponse.json(
        { error: 'Phone must start with + (e.g., +79001234567)' },
        { status: 400 }
      );
    }

    console.log(`[SendCode] Starting verification for account ${accountId}, phone: ${phone}`);

    // Send verification code
    const result = await sendVerificationCode(
      accountId,
      phone,
      apiId,
      account.api_hash
    );

    if (!result.success) {
      console.error(`[SendCode] Failed for account ${accountId}:`, result.error);
      
      // Update account status
      await supabaseAdmin
        .from('outreach_accounts')
        .update({
          status: 'disconnected',
          updated_at: new Date().toISOString(),
        })
        .eq('id', accountId);

      return NextResponse.json(
        { error: result.error || 'Failed to send verification code' },
        { status: 400 }
      );
    }

    console.log(`[SendCode] Code sent successfully for account ${accountId}`);

    // Update account status
    await supabaseAdmin
      .from('outreach_accounts')
      .update({
        status: 'awaiting_code',
        updated_at: new Date().toISOString(),
      })
      .eq('id', accountId);

    return NextResponse.json({
      success: true,
      message: 'Verification code sent to Telegram',
    });
  } catch (error: any) {
    console.error('[SendCode] Unhandled error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}