import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('outreach_campaigns')
      .select('id, name')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Campaigns list error:', error);
      return NextResponse.json({ campaigns: [] });
    }

    return NextResponse.json({ campaigns: data || [] });
  } catch (error) {
    console.error('Campaigns list error:', error);
    return NextResponse.json({ campaigns: [] });
  }
}