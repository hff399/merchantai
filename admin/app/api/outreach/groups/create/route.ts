import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { title, username, category, member_count } = await request.json();

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('outreach_groups')
      .insert({
        title,
        username: username || null,
        category: category || null,
        member_count: member_count || null,
        status: 'active',
      })
      .select()
      .single();

    if (error) {
      console.error('Create group error:', error);
      return NextResponse.json({ error: 'Failed to create group' }, { status: 500 });
    }

    return NextResponse.json({ success: true, group: data });
  } catch (error) {
    console.error('Create group error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
