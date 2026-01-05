import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { name, message, parse_mode } = await request.json();

    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('broadcast_templates')
      .insert({
        name,
        message,
        parse_mode: parse_mode || 'HTML',
      })
      .select()
      .single();

    if (error) {
      console.error('Create template error:', error);
      return NextResponse.json({ error: 'Failed to create template' }, { status: 500 });
    }

    return NextResponse.json({ success: true, template: data });
  } catch (error) {
    console.error('Create template error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
