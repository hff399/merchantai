import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { groups } = await request.json();

    if (!Array.isArray(groups) || groups.length === 0) {
      return NextResponse.json({ error: 'Groups array is required' }, { status: 400 });
    }

    const groupsWithStatus = groups.map(g => ({
      ...g,
      status: 'active',
    }));

    const { data, error } = await supabaseAdmin
      .from('outreach_groups')
      .insert(groupsWithStatus)
      .select();

    if (error) {
      console.error('Bulk create error:', error);
      return NextResponse.json({ error: 'Failed to create groups' }, { status: 500 });
    }

    return NextResponse.json({ success: true, count: data?.length || 0 });
  } catch (error) {
    console.error('Bulk create error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
