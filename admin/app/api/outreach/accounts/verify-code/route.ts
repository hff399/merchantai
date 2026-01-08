import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyCode } from '@/lib/gramjs';

export const maxDuration = 60; // Allow up to 60 seconds for this operation

export async function POST(request: NextRequest) {
  try {
    const { accountId, code, password } = await request.json();

    if (!accountId) {
      return NextResponse.json(
        { error: 'Account ID is required' },
        { status: 400 }
      );
    }

    if (!code && !password) {
      return NextResponse.json(
        { error: 'Verification code is required' },
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

    console.log(`[VerifyCode] Starting verification for account ${accountId}`);

    // Verify the code
    const result = await verifyCode(accountId, code, password);

    if (!result.success) {
      console.error(`[VerifyCode] Failed for account ${accountId}:`, result.error);

      // Check if 2FA is required
      if (result.error === '2FA_REQUIRED') {
        // Update status to awaiting 2FA
        await supabaseAdmin
          .from('outreach_accounts')
          .update({
            status: 'awaiting_2fa',
            updated_at: new Date().toISOString(),
          })
          .eq('id', accountId);

        return NextResponse.json(
          { error: '2FA_REQUIRED', message: 'Two-factor authentication required' },
          { status: 200 } // Return 200 because this is an expected state
        );
      }

      // For session expired errors, reset status
      if (result.error?.includes('истекла') || result.error?.includes('expired')) {
        await supabaseAdmin
          .from('outreach_accounts')
          .update({
            status: 'pending_verification',
            updated_at: new Date().toISOString(),
          })
          .eq('id', accountId);
      }

      return NextResponse.json(
        { error: result.error || 'Verification failed' },
        { status: 400 }
      );
    }

    console.log(`[VerifyCode] Success for account ${accountId}`);

    // Update account with session and connected status
    const updateData: any = {
      session_string: result.sessionString,
      status: 'connected',
      updated_at: new Date().toISOString(),
    };

    // Add user info if available
    if (result.user) {
      if (result.user.username) {
        updateData.telegram_username = result.user.username;
      }
      if (result.user.firstName) {
        updateData.name = result.user.firstName + (result.user.lastName ? ' ' + result.user.lastName : '');
      }
    }

    const { error: updateError } = await supabaseAdmin
      .from('outreach_accounts')
      .update(updateData)
      .eq('id', accountId);

    if (updateError) {
      console.error('Account update error:', updateError);
      // Don't return error - verification succeeded, just logging
    }

    return NextResponse.json({
      success: true,
      message: 'Account connected successfully',
      user: result.user,
    });
  } catch (error: any) {
    console.error('[VerifyCode] Unhandled error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}