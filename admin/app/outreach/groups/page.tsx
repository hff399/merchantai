import { supabaseAdmin } from '@/lib/supabase';
import { formatDate, formatNumber } from '@/lib/utils';
import Link from 'next/link';
import { Plus, MessageSquare, ExternalLink } from 'lucide-react';
import GroupActions from './GroupActions';

async function getGroups(searchParams: { category?: string; page?: string }) {
  const page = parseInt(searchParams.page || '1');
  const limit = 20;
  const offset = (page - 1) * limit;

  let query = supabaseAdmin
    .from('outreach_groups')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  if (searchParams.category) {
    query = query.eq('category', searchParams.category);
  }

  const { data, count } = await query.range(offset, offset + limit - 1);

  return {
    groups: data || [],
    total: count || 0,
    page,
    totalPages: Math.ceil((count || 0) / limit),
  };
}

async function getCategories() {
  const { data } = await supabaseAdmin
    .from('outreach_groups')
    .select('category')
    .not('category', 'is', null);

  const categories = new Set<string>();
  data?.forEach(g => g.category && categories.add(g.category));
  return Array.from(categories);
}

export default async function GroupsPage({
  searchParams,
}: {
  searchParams: { category?: string; page?: string };
}) {
  const { groups, total, page, totalPages } = await getGroups(searchParams);
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Группы для аутрича</h1>
          <p className="text-gray-500">Всего: {total}</p>
        </div>

        <Link
          href="/outreach/groups/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Добавить группу
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <form className="flex gap-4">
          <select
            name="category"
            defaultValue={searchParams.category}
            className="px-4 py-2 border border-gray-200 rounded-lg"
          >
            <option value="">Все категории</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Применить
          </button>
        </form>
      </div>

      {/* Groups Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {groups.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Нет групп
            </h3>
            <p className="text-gray-500 mb-4">
              Добавьте группы для аутрича
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Группа
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Категория
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Участников
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Статус
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Добавлено
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {groups.map((group: any) => (
                <tr key={group.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{group.title}</p>
                        {group.username && (
                          <a
                            href={`https://t.me/${group.username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                          >
                            @{group.username}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {group.category && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                        {group.category}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {group.member_count ? formatNumber(group.member_count) : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-sm rounded ${
                      group.status === 'active' 
                        ? 'bg-green-100 text-green-700'
                        : group.status === 'paused'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {group.status === 'active' ? 'Активна' : 
                       group.status === 'paused' ? 'Пауза' : 'Забанена'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(group.created_at)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <GroupActions group={group} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {page > 1 && (
            <Link
              href={`/outreach/groups?page=${page - 1}`}
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
              href={`/outreach/groups?page=${page + 1}`}
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
