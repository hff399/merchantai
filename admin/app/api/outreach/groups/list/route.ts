import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const category = searchParams.get('category') || '';
    const sort = searchParams.get('sort') || 'created_at';
    const order = searchParams.get('order') || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 20;
    const offset = (page - 1) * limit;

    let query = supabaseAdmin
      .from('outreach_groups')
      .select('*', { count: 'exact' });

    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    if (status) {
      query = query.eq('status', status);
    }

    if (category) {
      query = query.eq('category', category);
    }

    query = query.order(sort, { ascending: order === 'asc' });

    const { data, count, error } = await query.range(offset, offset + limit - 1);

    if (error) {
      console.error('Groups query error:', error);
      return NextResponse.json({ groups: [], total: 0, categories: [] });
    }

    // Get unique categories
    const { data: catData } = await supabaseAdmin
      .from('outreach_groups')
      .select('category')
      .not('category', 'is', null);

    const categories = [...new Set(catData?.map(g => g.category).filter(Boolean) || [])];

    return NextResponse.json({
      groups: data || [],
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit),
      categories,
    });
  } catch (error) {
    console.error('Groups list error:', error);
    return NextResponse.json({ groups: [], total: 0, categories: [] });
  }
}
