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

    return NextResponse.json({ tags: Array.from(tagSet).sort() });
  } catch (error) {
    console.error('Tags error:', error);
    return NextResponse.json({ tags: [] });
  }
}
