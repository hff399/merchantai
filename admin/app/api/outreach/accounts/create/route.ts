import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { phone, api_id, api_hash, name, daily_limit } = await request.json();

    if (!phone || !api_id || !api_hash) {
      return NextResponse.json(
        { error: 'Phone, API ID and API Hash are required' },
        { status: 400 }
      );
    }

    // Check if phone already exists
    const { data: existing } = await supabaseAdmin
      .from('outreach_accounts')
      .select('id')
      .eq('phone', phone)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'Account with this phone already exists' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('outreach_accounts')
      .insert({
        phone,
        api_id,
        api_hash,
        name,
        daily_limit: daily_limit || 40,
        status: 'disconnected', // Need to authorize
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create account' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, account: data });
  } catch (error) {
    console.error('Create account error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
