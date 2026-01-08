import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).toISOString();
    const weekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).toISOString();

    // Run all queries in parallel for better performance
    const [
      totalUsersResult,
      todayUsersResult,
      yesterdayUsersResult,
      revenueResult,
      todayRevenueResult,
      yesterdayRevenueResult,
      cardsResult,
      todayCardsResult,
      referralResult,
      activeCampaignsResult,
      newLeadsResult,
      activeUsersResult,
      demoUsersResult,
      paidUsersResult,
      todayPaidUsersResult,
      recentUsersResult,
      recentPaymentsResult,
      dailyStatsResult,
    ] = await Promise.all([
      // Total users
      supabaseAdmin
        .from('users')
        .select('*', { count: 'exact', head: true }),
      
      // Today's users
      supabaseAdmin
        .from('users')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today),
      
      // Yesterday's users
      supabaseAdmin
        .from('users')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', yesterday)
        .lt('created_at', today),
      
      // Total revenue
      supabaseAdmin
        .from('payments')
        .select('amount')
        .eq('status', 'succeeded'),
      
      // Today's revenue
      supabaseAdmin
        .from('payments')
        .select('amount')
        .eq('status', 'succeeded')
        .gte('created_at', today),
      
      // Yesterday's revenue
      supabaseAdmin
        .from('payments')
        .select('amount')
        .eq('status', 'succeeded')
        .gte('created_at', yesterday)
        .lt('created_at', today),
      
      // Total cards (sum of cards_created)
      supabaseAdmin
        .from('users')
        .select('cards_created'),
      
      // Today's cards - from orders table
      supabaseAdmin
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'completed')
        .gte('created_at', today),
      
      // Referral signups
      supabaseAdmin
        .from('users')
        .select('*', { count: 'exact', head: true })
        .not('referred_by', 'is', null),
      
      // Active outreach campaigns
      supabaseAdmin
        .from('outreach_campaigns')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active'),
      
      // New leads today
      supabaseAdmin
        .from('outreach_leads')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today),
      
      // Active users (cards_created > 0)
      supabaseAdmin
        .from('users')
        .select('*', { count: 'exact', head: true })
        .gt('cards_created', 0),
      
      // Demo users (cards_created > 1)
      supabaseAdmin
        .from('users')
        .select('*', { count: 'exact', head: true })
        .gt('cards_created', 1),
      
      // Paid users (total_spent > 0)
      supabaseAdmin
        .from('users')
        .select('*', { count: 'exact', head: true })
        .gt('total_spent', 0),
      
      // Today's paid users
      supabaseAdmin
        .from('payments')
        .select('user_id')
        .eq('status', 'succeeded')
        .gte('created_at', today),
      
      // Recent users (last 10)
      supabaseAdmin
        .from('users')
        .select('id, telegram_id, username, first_name, credits, cards_created, utm_source, created_at')
        .order('created_at', { ascending: false })
        .limit(10),
      
      // Recent payments (last 10)
      supabaseAdmin
        .from('payments')
        .select('id, amount, plan, created_at, users(username, first_name)')
        .eq('status', 'succeeded')
        .order('created_at', { ascending: false })
        .limit(10),
      
      // Daily stats for the past 14 days
      getDailyStats(weekAgo),
    ]);

    // Calculate totals
    const totalRevenue = revenueResult.data?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;
    const todayRevenue = todayRevenueResult.data?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;
    const yesterdayRevenue = yesterdayRevenueResult.data?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;
    const totalCards = cardsResult.data?.reduce((sum, u) => sum + (u.cards_created || 0), 0) || 0;
    
    // Get unique paid users today
    const todayPaidUserIds = new Set(todayPaidUsersResult.data?.map(p => p.user_id) || []);

    const stats = {
      totalUsers: totalUsersResult.count || 0,
      todayUsers: todayUsersResult.count || 0,
      yesterdayUsers: yesterdayUsersResult.count || 0,
      totalRevenue,
      todayRevenue,
      yesterdayRevenue,
      totalCards,
      todayCards: todayCardsResult.count || 0,
      referralSignups: referralResult.count || 0,
      activeCampaigns: activeCampaignsResult.count || 0,
      newLeads: newLeadsResult.count || 0,
      activeUsers: activeUsersResult.count || 0,
      demoUsers: demoUsersResult.count || 0,
      paidUsers: paidUsersResult.count || 0,
      todayPaidUsers: todayPaidUserIds.size,
    };

    return NextResponse.json({
      stats,
      recentUsers: recentUsersResult.data || [],
      recentPayments: recentPaymentsResult.data || [],
      dailyData: dailyStatsResult,
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}

async function getDailyStats(startDate: string): Promise<any[]> {
  const days = [];
  const now = new Date();
  
  for (let i = 13; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const nextDate = new Date(date.getTime() + 24 * 60 * 60 * 1000).toISOString();
    
    days.push({
      date: dateStr,
      startDate: date.toISOString(),
      endDate: nextDate,
    });
  }

  // Fetch data for all days in parallel
  const results = await Promise.all(
    days.map(async (day) => {
      const [newUsersResult, paidUsersResult, revenueResult] = await Promise.all([
        supabaseAdmin
          .from('users')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', day.startDate)
          .lt('created_at', day.endDate),
        
        supabaseAdmin
          .from('payments')
          .select('user_id')
          .eq('status', 'succeeded')
          .gte('created_at', day.startDate)
          .lt('created_at', day.endDate),
        
        supabaseAdmin
          .from('payments')
          .select('amount')
          .eq('status', 'succeeded')
          .gte('created_at', day.startDate)
          .lt('created_at', day.endDate),
      ]);

      const uniquePaidUsers = new Set(paidUsersResult.data?.map(p => p.user_id) || []);
      const totalRevenue = revenueResult.data?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;

      return {
        date: day.date,
        newUsers: newUsersResult.count || 0,
        activeUsers: 0, // Would need additional tracking
        demoUsers: 0, // Would need additional tracking
        paidUsers: uniquePaidUsers.size,
        revenue: totalRevenue,
      };
    })
  );

  return results;
}