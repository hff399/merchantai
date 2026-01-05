import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { campaignId, status, name, group_message } = await request.json();

    if (!campaignId) {
      return NextResponse.json({ error: 'Campaign ID is required' }, { status: 400 });
    }

    const updates: any = { updated_at: new Date().toISOString() };
    if (status) updates.status = status;
    if (name) updates.name = name;
    if (group_message) updates.group_message = group_message;

    // If activating, set started_at
    if (status === 'active') {
      updates.started_at = new Date().toISOString();
    }

    const { error } = await supabaseAdmin
      .from('outreach_campaigns')
      .update(updates)
      .eq('id', campaignId);

    if (error) {
      console.error('Update campaign error:', error);
      return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update campaign error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
