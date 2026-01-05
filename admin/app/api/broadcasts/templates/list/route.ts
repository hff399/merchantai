import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('broadcast_templates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Templates query error:', error);
      return NextResponse.json({ templates: [] });
    }

    return NextResponse.json({ templates: data || [] });
  } catch (error) {
    console.error('Templates list error:', error);
    return NextResponse.json({ templates: [] });
  }
}
