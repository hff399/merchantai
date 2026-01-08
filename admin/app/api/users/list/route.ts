import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const tag = searchParams.get('tag') || '';
    const blocked = searchParams.get('blocked') || '';
    const hasSpent = searchParams.get('hasSpent') || '';
    const sort = searchParams.get('sort') || 'created_at';
    const order = searchParams.get('order') || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 20;
    const offset = (page - 1) * limit;

    // Build query
    let query = supabaseAdmin
      .from('users')
      .select('id, telegram_id, username, first_name, credits, cards_created, total_spent, referred_by, utm_source, is_blocked, tags, created_at', { count: 'exact' });

    // Search filter
    if (search) {
      const searchNum = parseInt(search);
      if (!isNaN(searchNum)) {
        query = query.or(`username.ilike.%${search}%,first_name.ilike.%${search}%,telegram_id.eq.${searchNum}`);
      } else {
        query = query.or(`username.ilike.%${search}%,first_name.ilike.%${search}%`);
      }
    }

    // Tag filter
    if (tag) {
      query = query.contains('tags', [tag]);
    }

    // Blocked filter
    if (blocked === 'true') {
      query = query.eq('is_blocked', true);
    } else if (blocked === 'false') {
      query = query.eq('is_blocked', false);
    }

    // Has spent filter
    if (hasSpent === 'true') {
      query = query.gt('total_spent', 0);
    } else if (hasSpent === 'false') {
      query = query.eq('total_spent', 0);
    }

    // Sorting
    query = query.order(sort, { ascending: order === 'asc' });

    // Pagination
    const { data, count, error } = await query.range(offset, offset + limit - 1);

    if (error) {
      console.error('Users query error:', error);
      return NextResponse.json({ users: [], total: 0 });
    }

    // Fetch stats in parallel
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayISO = today.toISOString();

    const [totalResult, activeResult, paidResult, blockedResult, todayResult, tagsResult] = await Promise.all([
      supabaseAdmin.from('users').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('users').select('*', { count: 'exact', head: true }).gt('cards_created', 0),
      supabaseAdmin.from('users').select('*', { count: 'exact', head: true }).gt('total_spent', 0),
      supabaseAdmin.from('users').select('*', { count: 'exact', head: true }).eq('is_blocked', true),
      supabaseAdmin.from('users').select('*', { count: 'exact', head: true }).gte('created_at', todayISO),
      supabaseAdmin.from('users').select('tags'),
    ]);

    // Collect all unique tags
    const tagSet = new Set<string>();
    tagsResult.data?.forEach(user => {
      user.tags?.forEach((t: string) => tagSet.add(t));
    });

    return NextResponse.json({
      users: data || [],
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit),
      stats: {
        total: totalResult.count || 0,
        active: activeResult.count || 0,
        paid: paidResult.count || 0,
        blocked: blockedResult.count || 0,
        todayNew: todayResult.count || 0,
      },
      allTags: Array.from(tagSet).sort(),
    });
  } catch (error) {
    console.error('Users list error:', error);
    return NextResponse.json({ users: [], total: 0 });
  }
}