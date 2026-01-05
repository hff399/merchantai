import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { target_type, target_tags } = await request.json();

    let query = supabaseAdmin
      .from('users')
      .select('id', { count: 'exact', head: true })
      .eq('is_blocked', false);

    if (target_type === 'tags' && target_tags?.length > 0) {
      query = query.overlaps('tags', target_tags);
    }

    const { count } = await query;

    return NextResponse.json({ count: count || 0 });
  } catch (error) {
    console.error('Count error:', error);
    return NextResponse.json({ count: 0 });
  }
}
