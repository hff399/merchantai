import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { phone, api_id, api_hash, name, daily_limit } = await request.json();

    // Validate required fields
    if (!phone || !api_id || !api_hash) {
      return NextResponse.json(
        { error: 'Phone, API ID and API Hash are required' },
        { status: 400 }
      );
    }

    // Validate phone format
    const cleanPhone = phone.trim();
    if (!cleanPhone.startsWith('+')) {
      return NextResponse.json(
        { error: 'Phone must start with + (e.g. +79001234567)' },
        { status: 400 }
      );
    }

    // Validate API ID (should be a number)
    const cleanApiId = String(api_id).trim();
    if (!/^\d+$/.test(cleanApiId)) {
      return NextResponse.json(
        { error: 'API ID must be a number' },
        { status: 400 }
      );
    }

    // Validate API Hash (should be 32 hex characters)
    const cleanApiHash = api_hash.trim();
    if (cleanApiHash.length < 20) {
      return NextResponse.json(
        { error: 'API Hash seems invalid. Get it from my.telegram.org' },
        { status: 400 }
      );
    }

    // Check if phone already exists
    const { data: existing } = await supabaseAdmin
      .from('outreach_accounts')
      .select('id')
      .eq('phone', cleanPhone)
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
        phone: cleanPhone,
        api_id: cleanApiId,
        api_hash: cleanApiHash,
        name: name || null,
        daily_limit: daily_limit || 40,
        status: 'pending_verification',
      })
      .select()
      .single();

    if (error) {
      console.error('Create account error:', error);
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