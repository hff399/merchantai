import { supabaseAdmin } from '@/lib/supabase';
import { formatDate, formatRelativeTime } from '@/lib/utils';
import Link from 'next/link';
import { UserPlus, MessageSquare, Check, X, ExternalLink } from 'lucide-react';
import LeadActions from './LeadActions';

async function getLeads(searchParams: { status?: string; page?: string }) {
  const page = parseInt(searchParams.page || '1');
  const limit = 20;
  const offset = (page - 1) * limit;

  let query = supabaseAdmin
    .from('outreach_leads')
    .select(`
      *,
      outreach_campaigns(name),
      outreach_groups(title)
    `, { count: 'exact' })
    .order('created_at', { ascending: false });

  if (searchParams.status) {
    query = query.eq('status', searchParams.status);
  }

  const { data, count } = await query.range(offset, offset + limit - 1);

  return {
    leads: data || [],
    total: count || 0,
    page,
    totalPages: Math.ceil((count || 0) / limit),
  };
}

const statusConfig = {
  new: { label: 'Новый', color: 'bg-blue-100 text-blue-700' },
  contacted: { label: 'Связались', color: 'bg-yellow-100 text-yellow-700' },
  replied: { label: 'Ответил', color: 'bg-green-100 text-green-700' },
  qualified: { label: 'Квалифицирован', color: 'bg-purple-100 text-purple-700' },
  converted: { label: 'Конвертирован', color: 'bg-emerald-100 text-emerald-700' },
  rejected: { label: 'Отклонён', color: 'bg-red-100 text-red-700' },
};

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: { status?: string; page?: string };
}) {
  const { leads, total, page, totalPages } = await getLeads(searchParams);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Лиды</h1>
          <p className="text-gray-500">Всего: {total}</p>
        </div>
      </div>

      {/* Status Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex gap-2 flex-wrap">
          <Link
            href="/outreach/leads"
            className={`px-3 py-1 rounded-full text-sm ${
              !searchParams.status 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Все
          </Link>
          {Object.entries(statusConfig).map(([key, config]) => (
            <Link
              key={key}
              href={`/outreach/leads?status=${key}`}
              className={`px-3 py-1 rounded-full text-sm ${
                searchParams.status === key 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {config.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Leads List */}
      <div className="bg-white rounded-xl border border-gray-200">
        {leads.length === 0 ? (
          <div className="p-12 text-center">
            <UserPlus className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Нет лидов
            </h3>
            <p className="text-gray-500">
              Лиды появятся когда люди начнут отвечать на ваши объявления
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {leads.map((lead: any) => {
              const status = statusConfig[lead.status as keyof typeof statusConfig];
              
              return (
                <div key={lead.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-600 font-medium text-lg">
                        {(lead.first_name || lead.username || '?')[0].toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-gray-900">
                          {lead.first_name || 'Без имени'}
                          {lead.last_name && ` ${lead.last_name}`}
                        </p>
                        {lead.username && (
                          <a
                            href={`https://t.me/${lead.username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center gap-1 text-sm"
                          >
                            @{lead.username}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        <span className={`px-2 py-0.5 rounded text-xs ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-500 mb-2">
                        Кампания: {lead.outreach_campaigns?.name || '-'} · 
                        Группа: {lead.outreach_groups?.title || '-'}
                      </p>
                      
                      {lead.initial_message && (
                        <div className="bg-gray-50 rounded-lg p-3 mb-2">
                          <p className="text-sm text-gray-700">
                            {lead.initial_message}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span>{formatRelativeTime(lead.created_at)}</span>
                        {lead.dm_sent && (
                          <span className="flex items-center gap-1 text-green-600">
                            <Check className="w-3 h-3" />
                            DM отправлен
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <LeadActions lead={lead} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {page > 1 && (
            <Link
              href={`/outreach/leads?page=${page - 1}${searchParams.status ? `&status=${searchParams.status}` : ''}`}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Назад
            </Link>
          )}
          <span className="px-4 py-2 text-gray-600">
            Страница {page} из {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`/outreach/leads?page=${page + 1}${searchParams.status ? `&status=${searchParams.status}` : ''}`}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Вперёд
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
