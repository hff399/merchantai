'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  UserPlus, 
  Search, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown,
  ExternalLink,
  Check,
  X
} from 'lucide-react';
import LeadActions from './LeadActions';

interface Lead {
  id: string;
  telegram_id: number;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  initial_message: string | null;
  status: string;
  dm_sent: boolean;
  created_at: string;
  campaign_name?: string;
  group_title?: string;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  new: { label: 'Новый', color: 'bg-blue-100 text-blue-700' },
  contacted: { label: 'Связались', color: 'bg-yellow-100 text-yellow-700' },
  replied: { label: 'Ответил', color: 'bg-green-100 text-green-700' },
  qualified: { label: 'Квалифицирован', color: 'bg-purple-100 text-purple-700' },
  converted: { label: 'Конвертирован', color: 'bg-emerald-100 text-emerald-700' },
  rejected: { label: 'Отклонён', color: 'bg-red-100 text-red-700' },
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function LeadsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState<{ id: string; name: string }[]>([]);
  
  // Filters
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [status, setStatus] = useState(searchParams.get('status') || '');
  const [campaign, setCampaign] = useState(searchParams.get('campaign') || '');
  const [dmSent, setDmSent] = useState(searchParams.get('dm') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'created_at');
  const [order, setOrder] = useState<'asc' | 'desc'>((searchParams.get('order') as 'asc' | 'desc') || 'desc');
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (status) params.set('status', status);
    if (campaign) params.set('campaign', campaign);
    if (dmSent) params.set('dm', dmSent);
    params.set('sort', sort);
    params.set('order', order);
    params.set('page', String(page));

    try {
      const res = await fetch(`/api/outreach/leads/list?${params.toString()}`);
      const data = await res.json();
      setLeads(data.leads || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    }
    setLoading(false);
  }, [search, status, campaign, dmSent, sort, order, page]);

  const fetchCampaigns = async () => {
    try {
      const res = await fetch('/api/outreach/campaigns/list');
      const data = await res.json();
      setCampaigns(data.campaigns || []);
    } catch (err) {
      console.error('Failed to fetch campaigns:', err);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleSort = (field: string) => {
    if (sort === field) {
      setOrder(order === 'desc' ? 'asc' : 'desc');
    } else {
      setSort(field);
      setOrder('desc');
    }
  };

  const clearFilters = () => {
    setSearch('');
    setStatus('');
    setCampaign('');
    setDmSent('');
    setPage(1);
  };

  const hasFilters = search || status || campaign || dmSent;
  const totalPages = Math.ceil(total / 20);

  const SortButton = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 hover:text-gray-900"
    >
      {children}
      {sort === field ? (
        order === 'desc' ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />
      ) : (
        <ArrowUpDown className="w-3 h-3 opacity-30" />
      )}
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Лиды</h1>
          <p className="text-gray-500">Всего: {total}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Поиск по имени или username"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>
          </div>

          {/* Status filter */}
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            className="px-4 py-2 border border-gray-200 rounded-lg"
          >
            <option value="">Все статусы</option>
            {Object.entries(statusConfig).map(([key, config]) => (
              <option key={key} value={key}>{config.label}</option>
            ))}
          </select>

          {/* Campaign filter */}
          <select
            value={campaign}
            onChange={(e) => { setCampaign(e.target.value); setPage(1); }}
            className="px-4 py-2 border border-gray-200 rounded-lg"
          >
            <option value="">Все кампании</option>
            {campaigns.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* DM sent filter */}
          <select
            value={dmSent}
            onChange={(e) => { setDmSent(e.target.value); setPage(1); }}
            className="px-4 py-2 border border-gray-200 rounded-lg"
          >
            <option value="">DM: все</option>
            <option value="true">DM отправлен</option>
            <option value="false">DM не отправлен</option>
          </select>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Сбросить
            </button>
          )}
        </div>

        {/* Status quick filters */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => { setStatus(''); setPage(1); }}
            className={`px-3 py-1 rounded-full text-sm ${
              !status ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Все
          </button>
          {Object.entries(statusConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => { setStatus(key); setPage(1); }}
              className={`px-3 py-1 rounded-full text-sm ${
                status === key ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {config.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-500">Загрузка...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center">
            <UserPlus className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Лиды не найдены
            </h3>
            <p className="text-gray-500">
              {hasFilters ? 'Попробуйте изменить параметры поиска' : 'Лиды появятся когда люди начнут отвечать на объявления'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Лид
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    <SortButton field="status">Статус</SortButton>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Кампания
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    DM
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Сообщение
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    <SortButton field="created_at">Дата</SortButton>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((lead) => {
                  const statusInfo = statusConfig[lead.status] || statusConfig.new;
                  
                  return (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-gray-600 font-medium">
                              {(lead.first_name || lead.username || '?')[0].toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {lead.first_name || 'Без имени'}
                              {lead.last_name && ` ${lead.last_name}`}
                            </p>
                            {lead.username && (
                              <a
                                href={`https://t.me/${lead.username}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                              >
                                @{lead.username}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {lead.campaign_name || '—'}
                      </td>
                      <td className="px-6 py-4">
                        {lead.dm_sent ? (
                          <span className="flex items-center gap-1 text-green-600 text-sm">
                            <Check className="w-4 h-4" />
                            Да
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">Нет</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {lead.initial_message && (
                          <p className="text-sm text-gray-600 max-w-xs truncate" title={lead.initial_message}>
                            {lead.initial_message}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(lead.created_at)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <LeadActions lead={lead} onUpdate={fetchLeads} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Показано {(page - 1) * 20 + 1}–{Math.min(page * 20, total)} из {total}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Назад
            </button>
            <span className="px-4 py-2 text-gray-600">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Вперёд
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
