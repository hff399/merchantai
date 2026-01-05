import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendVerificationCode } from '@/lib/gramjs';

export async function POST(request: NextRequest) {
  try {
    const { accountId } = await request.json();

    if (!accountId) {
      return NextResponse.json(
        { error: 'Account ID is required' },
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

    // Validate API credentials
    const apiId = Number(account.api_id);
    const apiHash = String(account.api_hash).trim();
    const phone = String(account.phone).trim();

    console.log('Sending code to:', { phone, apiId, apiHashLength: apiHash.length });

    if (!apiId || isNaN(apiId)) {
      return NextResponse.json(
        { error: 'Invalid API ID. Must be a number.' },
        { status: 400 }
      );
    }

    if (!apiHash || apiHash.length < 20) {
      return NextResponse.json(
        { error: 'Invalid API Hash. Check your credentials from my.telegram.org' },
        { status: 400 }
      );
    }

    if (!phone || !phone.startsWith('+')) {
      return NextResponse.json(
        { error: 'Phone must start with + (e.g. +79001234567)' },
        { status: 400 }
      );
    }

    // Send verification code
    const result = await sendVerificationCode(
      accountId,
      phone,
      apiId,
      apiHash
    );

    if (!result.success) {
      console.error('Verification failed:', result.error);
      return NextResponse.json(
        { error: result.error || 'Failed to send code' },
        { status: 400 }
      );
    }

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
      message: 'Verification code sent to phone',
    });
  } catch (error: any) {
    console.error('Send code error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}