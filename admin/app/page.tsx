import { supabaseAdmin } from '@/lib/supabase';
import { formatCurrency, formatNumber } from '@/lib/utils';
import {
  Users,
  CreditCard,
  Image,
  TrendingUp,
  UserPlus,
  Target,
} from 'lucide-react';

async function getStats() {
  const today = new Date().toISOString().split('T')[0];
  
  // Total users
  const { count: totalUsers } = await supabaseAdmin
    .from('users')
    .select('*', { count: 'exact', head: true });

  // Today's new users
  const { count: todayUsers } = await supabaseAdmin
    .from('users')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', today);

  // Total revenue
  const { data: revenueData } = await supabaseAdmin
    .from('payments')
    .select('amount')
    .eq('status', 'succeeded');
  
  const totalRevenue = revenueData?.reduce((sum, p) => sum + p.amount, 0) || 0;

  // Today's revenue
  const { data: todayRevenueData } = await supabaseAdmin
    .from('payments')
    .select('amount')
    .eq('status', 'succeeded')
    .gte('created_at', today);
  
  const todayRevenue = todayRevenueData?.reduce((sum, p) => sum + p.amount, 0) || 0;

  // Total cards generated
  const { data: cardsData } = await supabaseAdmin
    .from('users')
    .select('cards_created');
  
  const totalCards = cardsData?.reduce((sum, u) => sum + u.cards_created, 0) || 0;

  // Referral signups
  const { count: referralSignups } = await supabaseAdmin
    .from('users')
    .select('*', { count: 'exact', head: true })
    .not('referred_by', 'is', null);

  // Active outreach campaigns
  const { count: activeCampaigns } = await supabaseAdmin
    .from('outreach_campaigns')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');

  // New leads today
  const { count: newLeads } = await supabaseAdmin
    .from('outreach_leads')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', today);

  return {
    totalUsers: totalUsers || 0,
    todayUsers: todayUsers || 0,
    totalRevenue,
    todayRevenue,
    totalCards,
    referralSignups: referralSignups || 0,
    activeCampaigns: activeCampaigns || 0,
    newLeads: newLeads || 0,
  };
}

async function getRecentUsers() {
  const { data } = await supabaseAdmin
    .from('users')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);
  
  return data || [];
}

async function getRecentPayments() {
  const { data } = await supabaseAdmin
    .from('payments')
    .select('*, users(username, first_name)')
    .eq('status', 'succeeded')
    .order('created_at', { ascending: false })
    .limit(5);
  
  return data || [];
}

export default async function DashboardPage() {
  const stats = await getStats();
  const recentUsers = await getRecentUsers();
  const recentPayments = await getRecentPayments();

  const statCards = [
    {
      title: 'Пользователей',
      value: formatNumber(stats.totalUsers),
      subtitle: `+${stats.todayUsers} сегодня`,
      icon: Users,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      title: 'Выручка',
      value: formatCurrency(stats.totalRevenue),
      subtitle: `+${formatCurrency(stats.todayRevenue)} сегодня`,
      icon: CreditCard,
      color: 'text-green-600 bg-green-50',
    },
    {
      title: 'Карточек создано',
      value: formatNumber(stats.totalCards),
      subtitle: 'всего генераций',
      icon: Image,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      title: 'По рефералам',
      value: formatNumber(stats.referralSignups),
      subtitle: 'регистраций',
      icon: UserPlus,
      color: 'text-orange-600 bg-orange-50',
    },
    {
      title: 'Аутрич кампании',
      value: formatNumber(stats.activeCampaigns),
      subtitle: 'активных',
      icon: Target,
      color: 'text-pink-600 bg-pink-50',
    },
    {
      title: 'Новых лидов',
      value: formatNumber(stats.newLeads),
      subtitle: 'сегодня',
      icon: TrendingUp,
      color: 'text-cyan-600 bg-cyan-50',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Дашборд</h1>
        <p className="text-gray-500">Обзор ключевых метрик</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Новые пользователи
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {recentUsers.map((user: any) => (
              <div key={user.id} className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-medium">
                    {(user.first_name || user.username || '?')[0].toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {user.first_name || user.username || 'Без имени'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {user.username ? `@${user.username}` : `ID: ${user.telegram_id}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user.credits} токенов
                  </p>
                  <p className="text-xs text-gray-500">
                    {user.utm_source && `via ${user.utm_source}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Последние платежи
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {recentPayments.map((payment: any) => (
              <div key={payment.id} className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {payment.users?.first_name || payment.users?.username || 'Пользователь'}
                  </p>
                  <p className="text-sm text-gray-500">{payment.plan}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">
                    +{formatCurrency(payment.amount)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
