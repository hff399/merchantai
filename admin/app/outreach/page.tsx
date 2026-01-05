import { supabaseAdmin } from '@/lib/supabase';
import { formatNumber } from '@/lib/utils';
import Link from 'next/link';
import {
  Target,
  Users,
  MessageSquare,
  UserPlus,
  Plus,
  PlayCircle,
  PauseCircle,
} from 'lucide-react';

async function getOutreachStats() {
  const { count: totalAccounts } = await supabaseAdmin
    .from('outreach_accounts')
    .select('*', { count: 'exact', head: true });

  const { count: connectedAccounts } = await supabaseAdmin
    .from('outreach_accounts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'connected');

  const { count: totalGroups } = await supabaseAdmin
    .from('outreach_groups')
    .select('*', { count: 'exact', head: true });

  const { count: activeCampaigns } = await supabaseAdmin
    .from('outreach_campaigns')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');

  const { count: totalLeads } = await supabaseAdmin
    .from('outreach_leads')
    .select('*', { count: 'exact', head: true });

  const { count: newLeads } = await supabaseAdmin
    .from('outreach_leads')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'new');

  return {
    totalAccounts: totalAccounts || 0,
    connectedAccounts: connectedAccounts || 0,
    totalGroups: totalGroups || 0,
    activeCampaigns: activeCampaigns || 0,
    totalLeads: totalLeads || 0,
    newLeads: newLeads || 0,
  };
}

async function getActiveCampaigns() {
  const { data } = await supabaseAdmin
    .from('outreach_campaigns')
    .select('*')
    .in('status', ['active', 'paused'])
    .order('created_at', { ascending: false })
    .limit(5);

  return data || [];
}

export default async function OutreachPage() {
  const stats = await getOutreachStats();
  const campaigns = await getActiveCampaigns();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Аутрич</h1>
          <p className="text-gray-500">Автоматизация привлечения клиентов</p>
        </div>

        <Link
          href="/outreach/campaigns/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Новая кампания
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Link
          href="/outreach/accounts"
          className="bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 transition-colors"
        >
          <Users className="w-6 h-6 text-blue-600 mb-2" />
          <p className="text-2xl font-bold">{stats.connectedAccounts}/{stats.totalAccounts}</p>
          <p className="text-sm text-gray-500">Аккаунтов</p>
        </Link>

        <Link
          href="/outreach/groups"
          className="bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 transition-colors"
        >
          <MessageSquare className="w-6 h-6 text-purple-600 mb-2" />
          <p className="text-2xl font-bold">{formatNumber(stats.totalGroups)}</p>
          <p className="text-sm text-gray-500">Групп</p>
        </Link>

        <Link
          href="/outreach/campaigns"
          className="bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 transition-colors"
        >
          <Target className="w-6 h-6 text-green-600 mb-2" />
          <p className="text-2xl font-bold">{stats.activeCampaigns}</p>
          <p className="text-sm text-gray-500">Активных кампаний</p>
        </Link>

        <Link
          href="/outreach/leads"
          className="bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 transition-colors"
        >
          <UserPlus className="w-6 h-6 text-orange-600 mb-2" />
          <p className="text-2xl font-bold">{formatNumber(stats.totalLeads)}</p>
          <p className="text-sm text-gray-500">Всего лидов</p>
        </Link>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <UserPlus className="w-6 h-6 text-cyan-600 mb-2" />
          <p className="text-2xl font-bold">{stats.newLeads}</p>
          <p className="text-sm text-gray-500">Новых лидов</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/outreach/accounts"
          className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold text-gray-900 mb-2">Telegram аккаунты</h3>
          <p className="text-sm text-gray-500">
            Управление аккаунтами для аутрича
          </p>
        </Link>

        <Link
          href="/outreach/groups"
          className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold text-gray-900 mb-2">Группы</h3>
          <p className="text-sm text-gray-500">
            База групп для размещения объявлений
          </p>
        </Link>

        <Link
          href="/outreach/campaigns"
          className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold text-gray-900 mb-2">Кампании</h3>
          <p className="text-sm text-gray-500">
            Настройка и запуск кампаний
          </p>
        </Link>

        <Link
          href="/outreach/leads"
          className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <h3 className="font-semibold text-gray-900 mb-2">Лиды</h3>
          <p className="text-sm text-gray-500">
            Люди, откликнувшиеся на объявления
          </p>
        </Link>
      </div>

      {/* Active Campaigns */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Активные кампании
          </h2>
          <Link
            href="/outreach/campaigns"
            className="text-blue-600 text-sm hover:underline"
          >
            Все кампании →
          </Link>
        </div>

        {campaigns.length === 0 ? (
          <div className="p-12 text-center">
            <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Нет активных кампаний
            </h3>
            <p className="text-gray-500 mb-4">
              Создайте первую кампанию для привлечения клиентов
            </p>
            <Link
              href="/outreach/campaigns/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Создать кампанию
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {campaigns.map((campaign: any) => (
              <div key={campaign.id} className="p-4 flex items-center gap-4">
                <div className={`p-2 rounded-lg ${
                  campaign.status === 'active' 
                    ? 'bg-green-100' 
                    : 'bg-yellow-100'
                }`}>
                  {campaign.status === 'active' 
                    ? <PlayCircle className="w-5 h-5 text-green-600" />
                    : <PauseCircle className="w-5 h-5 text-yellow-600" />
                  }
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{campaign.name}</p>
                  <p className="text-sm text-gray-500">
                    Отправлено: {campaign.messages_sent} · 
                    Ответов: {campaign.replies_received} · 
                    Конверсий: {campaign.conversations_started}
                  </p>
                </div>
                <Link
                  href={`/outreach/campaigns/${campaign.id}`}
                  className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                >
                  Подробнее
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
