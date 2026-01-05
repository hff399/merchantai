import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const campaign = searchParams.get('campaign') || '';
    const dmSent = searchParams.get('dm') || '';
    const sort = searchParams.get('sort') || 'created_at';
    const order = searchParams.get('order') || 'desc';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 20;
    const offset = (page - 1) * limit;

    let query = supabaseAdmin
      .from('outreach_leads')
      .select(`
        *,
        outreach_campaigns(name)
      `, { count: 'exact' });

    // Search filter
    if (search) {
      query = query.or(`username.ilike.%${search}%,first_name.ilike.%${search}%`);
    }

    // Status filter
    if (status) {
      query = query.eq('status', status);
    }

    // Campaign filter
    if (campaign) {
      query = query.eq('campaign_id', campaign);
    }

    // DM sent filter
    if (dmSent === 'true') {
      query = query.eq('dm_sent', true);
    } else if (dmSent === 'false') {
      query = query.eq('dm_sent', false);
    }

    // Sorting
    query = query.order(sort, { ascending: order === 'asc' });

    // Pagination
    const { data, count, error } = await query.range(offset, offset + limit - 1);

    if (error) {
      console.error('Leads query error:', error);
      return NextResponse.json({ leads: [], total: 0 });
    }

    // Transform data to include campaign name
    const leads = data?.map(lead => ({
      ...lead,
      campaign_name: lead.outreach_campaigns?.name || null,
    })) || [];

    return NextResponse.json({
      leads,
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error) {
    console.error('Leads list error:', error);
    return NextResponse.json({ leads: [], total: 0 });
  }
}
