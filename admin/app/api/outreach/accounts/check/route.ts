import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { checkConnection } from '@/lib/gramjs';

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

    if (!account.session_string) {
      return NextResponse.json(
        { error: 'Account not authenticated' },
        { status: 400 }
      );
    }

    const result = await checkConnection(
      parseInt(account.api_id),
      account.api_hash,
      account.session_string
    );

    // Update status based on result
    await supabaseAdmin
      .from('outreach_accounts')
      .update({
        status: result.connected ? 'connected' : 'disconnected',
        updated_at: new Date().toISOString(),
      })
      .eq('id', accountId);

    return NextResponse.json({
      success: true,
      connected: result.connected,
      user: result.user,
      error: result.error,
    });
  } catch (error) {
    console.error('Check connection error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
