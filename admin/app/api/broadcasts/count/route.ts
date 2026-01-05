import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const targetType = searchParams.get('targetType') || 'all';
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || [];

    let query = supabaseAdmin
      .from('users')
      .select('id', { count: 'exact', head: true })
      .eq('is_blocked', false);

    if (targetType === 'segment' && tags.length > 0) {
      query = query.overlaps('tags', tags);
    }

    const { count, error } = await query;

    if (error) {
      return NextResponse.json({ count: 0 });
    }

    return NextResponse.json({ count: count || 0 });
  } catch (error) {
    console.error('Count error:', error);
    return NextResponse.json({ count: 0 });
  }
}
