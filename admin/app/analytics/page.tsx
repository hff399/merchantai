'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Users,
  CreditCard,
  Image,
  Target,
  DollarSign,
  RefreshCw,
  Calendar,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  UserPlus,
  ShoppingCart,
  BarChart3,
  PieChart,
  Activity,
} from 'lucide-react';

interface AnalyticsData {
  overview: {
    totalUsers: number;
    totalRevenue: number;
    totalCards: number;
    totalPayments: number;
    avgRevenuePerUser: number;
    conversionRate: number;
    activeUsers: number;
    paidUsers: number;
  };
  periodComparison: {
    users: { current: number; previous: number; change: number };
    revenue: { current: number; previous: number; change: number };
    cards: { current: number; previous: number; change: number };
    payments: { current: number; previous: number; change: number };
  };
  dailyData: Array<{
    date: string;
    users: number;
    revenue: number;
    cards: number;
    payments: number;
  }>;
  topSources: Array<{
    source: string;
    users: number;
    revenue: number;
    conversion: number;
  }>;
  planDistribution: Array<{
    plan: string;
    count: number;
    revenue: number;
  }>;
  userFunnel: {
    total: number;
    activated: number;
    demo: number;
    paid: number;
  };
}

type Period = '7d' | '30d' | '90d' | 'all';

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toLocaleString('ru-RU');
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatPercent(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
}

// Simple bar chart
function BarChart({ data, dataKey, color, height = 120 }: { data: any[]; dataKey: string; color: string; height?: number }) {
  const values = data.map(d => d[dataKey] || 0);
  const max = Math.max(...values, 1);
  
  return (
    <div className="flex items-end gap-1" style={{ height }}>
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center gap-1">
          <div
            className={`w-full ${color} rounded-t transition-all duration-300 hover:opacity-80`}
            style={{ height: `${(item[dataKey] / max) * 100}%`, minHeight: item[dataKey] > 0 ? '4px' : '0' }}
            title={`${item.date}: ${formatNumber(item[dataKey])}`}
          />
        </div>
      ))}
    </div>
  );
}

// Metric card component
function MetricCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color,
  subtitle,
}: { 
  title: string; 
  value: string | number; 
  change?: number;
  icon: any; 
  color: string;
  subtitle?: string;
}) {
  const isPositive = change !== undefined ? change >= 0 : true;
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            {formatPercent(change)}
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}

// Funnel component
function ConversionFunnel({ data }: { data: AnalyticsData['userFunnel'] }) {
  const stages = [
    { label: 'Всего пользователей', value: data.total, color: 'bg-blue-500' },
    { label: 'Активировали (1+ карточка)', value: data.activated, color: 'bg-green-500' },
    { label: 'Демо (2+ карточки)', value: data.demo, color: 'bg-yellow-500' },
    { label: 'Оплатили', value: data.paid, color: 'bg-purple-500' },
  ];

  const maxValue = Math.max(...stages.map(s => s.value), 1);

  return (
    <div className="space-y-4">
      {stages.map((stage, index) => {
        const width = (stage.value / maxValue) * 100;
        const prevValue = index > 0 ? stages[index - 1].value : null;
        const convRate = prevValue && prevValue > 0 ? ((stage.value / prevValue) * 100).toFixed(1) : null;
        
        return (
          <div key={stage.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{stage.label}</span>
              <span className="font-medium">
                {formatNumber(stage.value)}
                {convRate && <span className="text-gray-400 ml-2">({convRate}%)</span>}
              </span>
            </div>
            <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
              <div
                className={`h-full ${stage.color} rounded-lg transition-all duration-500`}
                style={{ width: `${width}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Top sources table
function TopSourcesTable({ data }: { data: AnalyticsData['topSources'] }) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500 text-center py-4">Нет данных</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 text-xs font-medium text-gray-500 uppercase">Источник</th>
            <th className="text-right py-2 text-xs font-medium text-gray-500 uppercase">Пользователи</th>
            <th className="text-right py-2 text-xs font-medium text-gray-500 uppercase">Выручка</th>
            <th className="text-right py-2 text-xs font-medium text-gray-500 uppercase">Конверсия</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((source, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-3">
                <span className="font-medium text-gray-900">{source.source || 'Прямой'}</span>
              </td>
              <td className="py-3 text-right text-gray-600">{formatNumber(source.users)}</td>
              <td className="py-3 text-right text-gray-600">{formatCurrency(source.revenue)}</td>
              <td className="py-3 text-right">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  source.conversion >= 5 ? 'bg-green-100 text-green-700' :
                  source.conversion >= 2 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {source.conversion.toFixed(1)}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Plan distribution
function PlanDistribution({ data }: { data: AnalyticsData['planDistribution'] }) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500 text-center py-4">Нет данных</p>;
  }

  const totalRevenue = data.reduce((sum, p) => sum + p.revenue, 0);
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500'];

  return (
    <div className="space-y-4">
      {data.map((plan, index) => {
        const percentage = totalRevenue > 0 ? (plan.revenue / totalRevenue) * 100 : 0;
        
        return (
          <div key={plan.plan}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{plan.plan}</span>
              <span className="font-medium">
                {plan.count} продаж · {formatCurrency(plan.revenue)}
              </span>
            </div>
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${colors[index % colors.length]} rounded-full`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<Period>('30d');

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/analytics?period=${period}`);
      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const handleExport = async () => {
    try {
      const res = await fetch(`/api/analytics/export?period=${period}`);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics_${period}_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-96">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const { overview, periodComparison, dailyData, topSources, planDistribution, userFunnel } = data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Аналитика</h1>
          <p className="text-gray-500">Ключевые метрики и показатели</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Period selector */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            {(['7d', '30d', '90d', 'all'] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  period === p ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {p === '7d' ? '7 дней' : p === '30d' ? '30 дней' : p === '90d' ? '90 дней' : 'Всё время'}
              </button>
            ))}
          </div>
          
          <button
            onClick={fetchAnalytics}
            disabled={loading}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <RefreshCw className={`w-5 h-5 text-gray-500 ${loading ? 'animate-spin' : ''}`} />
          </button>
          
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm"
          >
            <Download className="w-4 h-4" />
            Экспорт
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Всего пользователей"
          value={formatNumber(overview.totalUsers)}
          change={periodComparison.users.change}
          icon={Users}
          color="text-blue-600 bg-blue-50"
          subtitle={`+${formatNumber(periodComparison.users.current)} за период`}
        />
        <MetricCard
          title="Общая выручка"
          value={formatCurrency(overview.totalRevenue)}
          change={periodComparison.revenue.change}
          icon={DollarSign}
          color="text-green-600 bg-green-50"
          subtitle={`+${formatCurrency(periodComparison.revenue.current)} за период`}
        />
        <MetricCard
          title="Карточек создано"
          value={formatNumber(overview.totalCards)}
          change={periodComparison.cards.change}
          icon={Image}
          color="text-purple-600 bg-purple-50"
          subtitle={`+${formatNumber(periodComparison.cards.current)} за период`}
        />
        <MetricCard
          title="Платежей"
          value={formatNumber(overview.totalPayments)}
          change={periodComparison.payments.change}
          icon={ShoppingCart}
          color="text-orange-600 bg-orange-50"
          subtitle={`+${formatNumber(periodComparison.payments.current)} за период`}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Средний чек"
          value={formatCurrency(overview.avgRevenuePerUser)}
          icon={CreditCard}
          color="text-cyan-600 bg-cyan-50"
        />
        <MetricCard
          title="Конверсия в оплату"
          value={`${overview.conversionRate.toFixed(2)}%`}
          icon={Target}
          color="text-pink-600 bg-pink-50"
        />
        <MetricCard
          title="Активные пользователи"
          value={formatNumber(overview.activeUsers)}
          icon={Activity}
          color="text-indigo-600 bg-indigo-50"
          subtitle={`${((overview.activeUsers / overview.totalUsers) * 100).toFixed(1)}% от всех`}
        />
        <MetricCard
          title="Платящие пользователи"
          value={formatNumber(overview.paidUsers)}
          icon={Zap}
          color="text-amber-600 bg-amber-50"
          subtitle={`${((overview.paidUsers / overview.totalUsers) * 100).toFixed(1)}% от всех`}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Выручка</h2>
            <span className="text-sm text-gray-500">
              {formatCurrency(periodComparison.revenue.current)} за период
            </span>
          </div>
          <BarChart data={dailyData} dataKey="revenue" color="bg-green-500" height={160} />
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>{dailyData[0]?.date}</span>
            <span>{dailyData[dailyData.length - 1]?.date}</span>
          </div>
        </div>

        {/* Users Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Новые пользователи</h2>
            <span className="text-sm text-gray-500">
              {formatNumber(periodComparison.users.current)} за период
            </span>
          </div>
          <BarChart data={dailyData} dataKey="users" color="bg-blue-500" height={160} />
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>{dailyData[0]?.date}</span>
            <span>{dailyData[dailyData.length - 1]?.date}</span>
          </div>
        </div>
      </div>

      {/* Funnel and Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Воронка конверсии</h2>
          <ConversionFunnel data={userFunnel} />
        </div>

        {/* Top Sources */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Источники трафика</h2>
          <TopSourcesTable data={topSources} />
        </div>
      </div>

      {/* Plan Distribution */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Распределение по тарифам</h2>
        <PlanDistribution data={planDistribution} />
      </div>
    </div>
  );
}