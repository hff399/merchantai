import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const { data } = await supabaseAdmin
      .from('users')
      .select('tags');

    const tagSet = new Set<string>();
    data?.forEach(user => {
      user.tags?.forEach((tag: string) => tagSet.add(tag));
    });

    return NextResponse.json({ tags: Array.from(tagSet) });
  } catch (error) {
    console.error('Get tags error:', error);
    return NextResponse.json({ tags: [] });
  }
}
