import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { name, group_message, target_categories, dm_templates, delay_between_messages } = await request.json();

    if (!name || !group_message) {
      return NextResponse.json({ error: 'Name and message are required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('outreach_campaigns')
      .insert({
        name,
        group_message,
        target_categories: target_categories || [],
        dm_templates: dm_templates || [],
        delay_between_messages: delay_between_messages || 300,
        status: 'draft',
      })
      .select()
      .single();

    if (error) {
      console.error('Create campaign error:', error);
      return NextResponse.json({ error: 'Failed to create campaign' }, { status: 500 });
    }

    return NextResponse.json({ success: true, campaign: data });
  } catch (error) {
    console.error('Create campaign error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
