export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || '';
    const sort = searchParams.get('sort') || 'created_at';
    const order = searchParams.get('order') || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 20;
    const offset = (page - 1) * limit;

    let query = supabaseAdmin
      .from('broadcasts')
      .select('*', { count: 'exact' });

    if (status) {
      query = query.eq('status', status);
    }

    query = query.order(sort, { ascending: order === 'asc' });

    const { data, count, error } = await query.range(offset, offset + limit - 1);

    if (error) {
      console.error('Broadcasts query error:', error);
      return NextResponse.json({ broadcasts: [], total: 0 });
    }

    return NextResponse.json({
      broadcasts: data || [],
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error) {
    console.error('Broadcasts list error:', error);
    return NextResponse.json({ broadcasts: [], total: 0 });
  }
}
