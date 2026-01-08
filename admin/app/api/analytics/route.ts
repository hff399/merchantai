import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30d';

    const now = new Date();
    let startDate: Date;
    let previousStartDate: Date;

    switch (period) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        previousStartDate = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        previousStartDate = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        previousStartDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date('2020-01-01');
        previousStartDate = new Date('2020-01-01');
    }

    // Fetch all data in parallel
    const [
      // Overview stats
      totalUsersResult,
      totalRevenueResult,
      totalCardsResult,
      totalPaymentsResult,
      activeUsersResult,
      paidUsersResult,
      
      // Period comparison - current
      currentUsersResult,
      currentRevenueResult,
      currentCardsResult,
      currentPaymentsResult,
      
      // Period comparison - previous
      previousUsersResult,
      previousRevenueResult,
      previousCardsResult,
      previousPaymentsResult,
      
      // Top sources
      sourcesResult,
      
      // Plan distribution
      plansResult,
    ] = await Promise.all([
      // Overview
      supabaseAdmin.from('users').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('payments').select('amount').eq('status', 'succeeded'),
      supabaseAdmin.from('users').select('cards_created'),
      supabaseAdmin.from('payments').select('*', { count: 'exact', head: true }).eq('status', 'succeeded'),
      supabaseAdmin.from('users').select('*', { count: 'exact', head: true }).gt('cards_created', 0),
      supabaseAdmin.from('users').select('*', { count: 'exact', head: true }).gt('total_spent', 0),
      
      // Current period
      supabaseAdmin.from('users').select('*', { count: 'exact', head: true }).gte('created_at', startDate.toISOString()),
      supabaseAdmin.from('payments').select('amount').eq('status', 'succeeded').gte('created_at', startDate.toISOString()),
      supabaseAdmin.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'completed').gte('created_at', startDate.toISOString()),
      supabaseAdmin.from('payments').select('*', { count: 'exact', head: true }).eq('status', 'succeeded').gte('created_at', startDate.toISOString()),
      
      // Previous period
      supabaseAdmin.from('users').select('*', { count: 'exact', head: true }).gte('created_at', previousStartDate.toISOString()).lt('created_at', startDate.toISOString()),
      supabaseAdmin.from('payments').select('amount').eq('status', 'succeeded').gte('created_at', previousStartDate.toISOString()).lt('created_at', startDate.toISOString()),
      supabaseAdmin.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'completed').gte('created_at', previousStartDate.toISOString()).lt('created_at', startDate.toISOString()),
      supabaseAdmin.from('payments').select('*', { count: 'exact', head: true }).eq('status', 'succeeded').gte('created_at', previousStartDate.toISOString()).lt('created_at', startDate.toISOString()),
      
      // Sources
      supabaseAdmin.from('users').select('utm_source, total_spent').gte('created_at', startDate.toISOString()),
      
      // Plans
      supabaseAdmin.from('payments').select('plan, amount').eq('status', 'succeeded').gte('created_at', startDate.toISOString()),
    ]);

    // Calculate totals
    const totalRevenue = totalRevenueResult.data?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;
    const totalCards = totalCardsResult.data?.reduce((sum, u) => sum + (u.cards_created || 0), 0) || 0;
    
    const currentRevenue = currentRevenueResult.data?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;
    const previousRevenue = previousRevenueResult.data?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;

    // Calculate conversion rate
    const totalUsers = totalUsersResult.count || 0;
    const paidUsers = paidUsersResult.count || 0;
    const conversionRate = totalUsers > 0 ? (paidUsers / totalUsers) * 100 : 0;
    const avgRevenuePerUser = paidUsers > 0 ? totalRevenue / paidUsers : 0;

    // Calculate period comparison percentages
    const currentUsers = currentUsersResult.count || 0;
    const previousUsers = previousUsersResult.count || 0;
    const currentCards = currentCardsResult.count || 0;
    const previousCards = previousCardsResult.count || 0;
    const currentPayments = currentPaymentsResult.count || 0;
    const previousPayments = previousPaymentsResult.count || 0;

    const calcChange = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    // Process sources data
    const sourcesMap = new Map<string, { users: number; revenue: number }>();
    sourcesResult.data?.forEach((user: any) => {
      const source = user.utm_source || 'direct';
      const existing = sourcesMap.get(source) || { users: 0, revenue: 0 };
      sourcesMap.set(source, {
        users: existing.users + 1,
        revenue: existing.revenue + (user.total_spent || 0),
      });
    });

    const topSources = Array.from(sourcesMap.entries())
      .map(([source, data]) => ({
        source,
        users: data.users,
        revenue: data.revenue,
        conversion: data.users > 0 ? (data.revenue > 0 ? (data.users / sourcesMap.size) * 100 : 0) : 0,
      }))
      .sort((a, b) => b.users - a.users)
      .slice(0, 10);

    // Process plans data
    const plansMap = new Map<string, { count: number; revenue: number }>();
    plansResult.data?.forEach((payment: any) => {
      const plan = payment.plan || 'Unknown';
      const existing = plansMap.get(plan) || { count: 0, revenue: 0 };
      plansMap.set(plan, {
        count: existing.count + 1,
        revenue: existing.revenue + (payment.amount || 0),
      });
    });

    const planDistribution = Array.from(plansMap.entries())
      .map(([plan, data]) => ({
        plan,
        count: data.count,
        revenue: data.revenue,
      }))
      .sort((a, b) => b.revenue - a.revenue);

    // Generate daily data
    const dailyData = await getDailyData(startDate, now);

    // User funnel
    const { count: activatedCount } = await supabaseAdmin
      .from('users')
      .select('*', { count: 'exact', head: true })
      .gt('cards_created', 0);
    
    const { count: demoCount } = await supabaseAdmin
      .from('users')
      .select('*', { count: 'exact', head: true })
      .gt('cards_created', 1);

    return NextResponse.json({
      overview: {
        totalUsers,
        totalRevenue,
        totalCards,
        totalPayments: totalPaymentsResult.count || 0,
        avgRevenuePerUser,
        conversionRate,
        activeUsers: activeUsersResult.count || 0,
        paidUsers,
      },
      periodComparison: {
        users: {
          current: currentUsers,
          previous: previousUsers,
          change: calcChange(currentUsers, previousUsers),
        },
        revenue: {
          current: currentRevenue,
          previous: previousRevenue,
          change: calcChange(currentRevenue, previousRevenue),
        },
        cards: {
          current: currentCards,
          previous: previousCards,
          change: calcChange(currentCards, previousCards),
        },
        payments: {
          current: currentPayments,
          previous: previousPayments,
          change: calcChange(currentPayments, previousPayments),
        },
      },
      dailyData,
      topSources,
      planDistribution,
      userFunnel: {
        total: totalUsers,
        activated: activatedCount || 0,
        demo: demoCount || 0,
        paid: paidUsers,
      },
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

async function getDailyData(startDate: Date, endDate: Date) {
  const days = [];
  const current = new Date(startDate);
  
  while (current <= endDate) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  // Limit to last 60 days max for performance
  const limitedDays = days.slice(-60);

  const results = await Promise.all(
    limitedDays.map(async (date) => {
      const dateStr = date.toISOString().split('T')[0];
      const nextDate = new Date(date.getTime() + 24 * 60 * 60 * 1000).toISOString();
      
      const [usersResult, paymentsResult] = await Promise.all([
        supabaseAdmin
          .from('users')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', date.toISOString())
          .lt('created_at', nextDate),
        supabaseAdmin
          .from('payments')
          .select('amount')
          .eq('status', 'succeeded')
          .gte('created_at', date.toISOString())
          .lt('created_at', nextDate),
      ]);

      const revenue = paymentsResult.data?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;
      const payments = paymentsResult.data?.length || 0;

      return {
        date: dateStr,
        users: usersResult.count || 0,
        revenue,
        cards: 0, // Would need to track this separately
        payments,
      };
    })
  );

  return results;
}