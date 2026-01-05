import { supabaseAdmin } from '@/lib/supabase';
import { formatDate, formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  MoreVertical,
  Send,
  Gift,
  Ban,
  ExternalLink,
} from 'lucide-react';
import UserActions from './UserActions';

async function getUsers(searchParams: { 
  search?: string; 
  page?: string;
  tag?: string;
}) {
  const page = parseInt(searchParams.page || '1');
  const limit = 20;
  const offset = (page - 1) * limit;

  let query = supabaseAdmin
    .from('users')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  // Search
  if (searchParams.search) {
    query = query.or(
      `username.ilike.%${searchParams.search}%,first_name.ilike.%${searchParams.search}%,telegram_id.eq.${parseInt(searchParams.search) || 0}`
    );
  }

  // Tag filter
  if (searchParams.tag) {
    query = query.contains('tags', [searchParams.tag]);
  }

  const { data, count, error } = await query.range(offset, offset + limit - 1);

  return {
    users: data || [],
    total: count || 0,
    page,
    totalPages: Math.ceil((count || 0) / limit),
  };
}

async function getAllTags() {
  const { data } = await supabaseAdmin
    .from('users')
    .select('tags');
  
  const tagSet = new Set<string>();
  data?.forEach(user => {
    user.tags?.forEach((tag: string) => tagSet.add(tag));
  });
  
  return Array.from(tagSet);
}

export default async function UsersPage({
  searchParams,
}: {
  searchParams: { search?: string; page?: string; tag?: string };
}) {
  const { users, total, page, totalPages } = await getUsers(searchParams);
  const allTags = await getAllTags();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Пользователи</h1>
          <p className="text-gray-500">Всего: {total}</p>
        </div>
        
        <div className="flex gap-3">
          <Link
            href="/broadcasts/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Рассылка
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <form className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="search"
              defaultValue={searchParams.search}
              placeholder="Поиск по имени, username или ID..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select 
            name="tag"
            defaultValue={searchParams.tag}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Все теги</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
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

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Пользователь
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Токены
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Потрачено
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Рефералы
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Источник
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Дата
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user: any) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-medium">
                        {(user.first_name || user.username || '?')[0].toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {user.first_name || 'Без имени'}
                        {user.last_name && ` ${user.last_name}`}
                      </p>
                      <p className="text-sm text-gray-500">
                        {user.username ? `@${user.username}` : `ID: ${user.telegram_id}`}
                      </p>
                    </div>
                    {user.is_blocked && (
                      <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded">
                        Заблокирован
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium">{user.credits}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-600">
                    {formatCurrency(user.total_spent || 0)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-600">
                    {user.referrals_count || 0}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {user.utm_source && (
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded">
                        {user.utm_source}
                      </span>
                    )}
                    {user.referred_by && (
                      <span className="px-2 py-0.5 bg-orange-50 text-orange-600 text-xs rounded">
                        реферал
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatDate(user.created_at)}
                </td>
                <td className="px-6 py-4 text-right">
                  <UserActions user={user} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {page > 1 && (
            <Link
              href={`/users?page=${page - 1}${searchParams.search ? `&search=${searchParams.search}` : ''}`}
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
              href={`/users?page=${page + 1}${searchParams.search ? `&search=${searchParams.search}` : ''}`}
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
