'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  Users,
  CreditCard,
  Image,
  UserPlus,
  Target,
  TrendingUp,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  DollarSign,
  Eye,
  Zap,
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  todayUsers: number;
  yesterdayUsers: number;
  totalRevenue: number;
  todayRevenue: number;
  yesterdayRevenue: number;
  totalCards: number;
  todayCards: number;
  referralSignups: number;
  activeCampaigns: number;
  newLeads: number;
  activeUsers: number;
  demoUsers: number;
  paidUsers: number;
  todayPaidUsers: number;
}

interface RecentUser {
  id: string;
  telegram_id: number;
  username: string | null;
  first_name: string | null;
  credits: number;
  cards_created: number;
  utm_source: string | null;
  created_at: string;
}

interface RecentPayment {
  id: string;
  amount: number;
  plan: string;
  created_at: string;
  users: {
    username: string | null;
    first_name: string | null;
  } | null;
}

interface DailyData {
  date: string;
  newUsers: number;
  activeUsers: number;
  demoUsers: number;
  paidUsers: number;
  revenue: number;
}

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getChangePercent(current: number, previous: number): { value: number; isPositive: boolean } {
  if (previous === 0) return { value: current > 0 ? 100 : 0, isPositive: current > 0 };
  const change = ((current - previous) / previous) * 100;
  return { value: Math.abs(change), isPositive: change >= 0 };
}

// Simple bar chart component
function MiniBarChart({ data, dataKey, color }: { data: DailyData[]; dataKey: keyof DailyData; color: string }) {
  const values = data.map(d => Number(d[dataKey]) || 0);
  const max = Math.max(...values, 1);
  
  return (
    <div className="flex items-end gap-1 h-16">
      {data.slice(-7).map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center gap-1">
          <div
            className={`w-full rounded-t ${color}`}
            style={{ height: `${(Number(item[dataKey]) / max) * 100}%`, minHeight: '2px' }}
          />
          <span className="text-[10px] text-gray-400">
            {new Date(item.date).toLocaleDateString('ru-RU', { weekday: 'short' }).slice(0, 2)}
          </span>
        </div>
      ))}
    </div>
  );
}

// Activity funnel component
function ActivityFunnel({ stats }: { stats: DashboardStats }) {
  const funnelData = [
    { label: 'Всего пользователей', value: stats.totalUsers, color: 'bg-blue-500' },
    { label: 'Активировали (1+ карточка)', value: stats.activeUsers, color: 'bg-green-500' },
    { label: 'Демо (2+ карточки)', value: stats.demoUsers, color: 'bg-yellow-500' },
    { label: 'Оплатили', value: stats.paidUsers, color: 'bg-purple-500' },
  ];

  const maxValue = Math.max(...funnelData.map(d => d.value), 1);

  return (
    <div className="space-y-3">
      {funnelData.map((item, index) => {
        const width = (item.value / maxValue) * 100;
        const convRate = index > 0 && funnelData[index - 1].value > 0
          ? ((item.value / funnelData[index - 1].value) * 100).toFixed(1)
          : null;
        
        return (
          <div key={item.label} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{item.label}</span>
              <span className="font-medium">
                {formatNumber(item.value)}
                {convRate && <span className="text-gray-400 ml-2">({convRate}%)</span>}
              </span>
            </div>
            <div className="h-6 bg-gray-100 rounded-lg overflow-hidden">
              <div
                className={`h-full ${item.color} rounded-lg transition-all duration-500`}
                style={{ width: `${width}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Today's metrics component
function TodayMetrics({ stats }: { stats: DashboardStats }) {
  const metrics = [
    {
      label: 'Новые пользователи',
      value: stats.todayUsers,
      icon: UserPlus,
      color: 'text-gray-400 bg-blue-50',
    },
    {
      label: 'Активировали демо',
      value: stats.demoUsers,
      icon: Zap,
      color: 'text-yellow-600 bg-yellow-50',
    },
    {
      label: 'Оплатили сегодня',
      value: stats.todayPaidUsers,
      icon: CreditCard,
      color: 'text-green-600 bg-green-50',
    },
    {
      label: 'Выручка сегодня',
      value: formatCurrency(stats.todayRevenue),
      icon: DollarSign,
      color: 'text-purple-600 bg-purple-50',
      isText: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${metric.color}`}>
              <metric.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl text-black font-bold">{metric.isText ? metric.value : formatNumber(metric.value as number)}</p>
              <p className="text-xs text-gray-500">{metric.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [recentPayments, setRecentPayments] = useState<RecentPayment[]>([]);
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchDashboardData = useCallback(async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    
    try {
      const res = await fetch('/api/dashboard/stats');
      const data = await res.json();
      
      setStats(data.stats);
      setRecentUsers(data.recentUsers || []);
      setRecentPayments(data.recentPayments || []);
      setDailyData(data.dailyData || []);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => fetchDashboardData(), 30000);
    return () => clearInterval(interval);
  }, [fetchDashboardData]);

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center h-96">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const usersChange = getChangePercent(stats.todayUsers, stats.yesterdayUsers);
  const revenueChange = getChangePercent(stats.todayRevenue, stats.yesterdayRevenue);

  const statCards = [
    {
      title: 'Всего пользователей',
      value: formatNumber(stats.totalUsers),
      change: usersChange,
      subtitle: `+${stats.todayUsers} сегодня`,
      icon: Users,
      color: 'text-blue-600 bg-blue-50',
      href: '/users',
    },
    {
      title: 'Общая выручка',
      value: formatCurrency(stats.totalRevenue),
      change: revenueChange,
      subtitle: `+${formatCurrency(stats.todayRevenue)} сегодня`,
      icon: CreditCard,
      color: 'text-green-600 bg-green-50',
      href: '/analytics',
    },
    {
      title: 'Карточек создано',
      value: formatNumber(stats.totalCards),
      subtitle: `+${stats.todayCards} сегодня`,
      icon: Image,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      title: 'По рефералам',
      value: formatNumber(stats.referralSignups),
      subtitle: 'регистраций',
      icon: UserPlus,
      color: 'text-orange-600 bg-orange-50',
      href: '/users?referred=true',
    },
    {
      title: 'Аутрич кампании',
      value: formatNumber(stats.activeCampaigns),
      subtitle: 'активных',
      icon: Target,
      color: 'text-pink-600 bg-pink-50',
      href: '/outreach/campaigns',
    },
    {
      title: 'Новых лидов',
      value: formatNumber(stats.newLeads),
      subtitle: 'сегодня',
      icon: TrendingUp,
      color: 'text-cyan-600 bg-cyan-50',
      href: '/outreach/leads',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Дашборд</h1>
          <p className="text-gray-500">
            Обзор ключевых метрик
            {lastUpdated && (
              <span className="ml-2 text-xs text-gray-400">
                Обновлено: {lastUpdated.toLocaleTimeString('ru-RU')}
              </span>
            )}
          </p>
        </div>
        <button
          onClick={() => fetchDashboardData(true)}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Обновить
        </button>
      </div>

      {/* Today's Key Metrics */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Сегодня
        </h2>
        <TodayMetrics stats={stats} />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat) => {
          const Card = stat.href ? Link : 'div';
          return (
            <Card
              key={stat.title}
              href={stat.href || '#'}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                {stat.change && (
                  <div className={`flex items-center gap-1 text-sm ${stat.change.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {stat.change.value.toFixed(1)}%
                  </div>
                )}
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-1">{stat.subtitle}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts and Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Funnel */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Воронка пользователей
          </h2>
          <ActivityFunnel stats={stats} />
        </div>

        {/* Weekly Activity Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Активность за неделю
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Новые пользователи</span>
                <span className="text-sm font-medium text-blue-600">
                  {dailyData.slice(-7).reduce((sum, d) => sum + d.newUsers, 0)}
                </span>
              </div>
              <MiniBarChart data={dailyData} dataKey="newUsers" color="bg-blue-500" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Платные пользователи</span>
                <span className="text-sm font-medium text-green-600">
                  {dailyData.slice(-7).reduce((sum, d) => sum + d.paidUsers, 0)}
                </span>
              </div>
              <MiniBarChart data={dailyData} dataKey="paidUsers" color="bg-green-500" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Выручка</span>
                <span className="text-sm font-medium text-purple-600">
                  {formatCurrency(dailyData.slice(-7).reduce((sum, d) => sum + d.revenue, 0))}
                </span>
              </div>
              <MiniBarChart data={dailyData} dataKey="revenue" color="bg-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Новые пользователи
            </h2>
            <Link href="/users" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              Все <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentUsers.length === 0 ? (
              <div className="p-6 text-center text-gray-500">Нет данных</div>
            ) : (
              recentUsers.map((user) => (
                <div key={user.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {(user.first_name || user.username || '?')[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {user.first_name || user.username || 'Без имени'}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {user.username ? `@${user.username}` : `ID: ${user.telegram_id}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {user.cards_created} карточек
                    </p>
                    <p className="text-xs text-gray-500">
                      {user.utm_source ? `via ${user.utm_source}` : formatDate(user.created_at)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Последние платежи
            </h2>
            <Link href="/analytics" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              Аналитика <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentPayments.length === 0 ? (
              <div className="p-6 text-center text-gray-500">Нет данных</div>
            ) : (
              recentPayments.map((payment) => (
                <div key={payment.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {payment.users?.first_name || payment.users?.username || 'Пользователь'}
                    </p>
                    <p className="text-sm text-gray-500">{payment.plan}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">
                      +{formatCurrency(payment.amount)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(payment.created_at)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}