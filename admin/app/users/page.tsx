import { supabaseAdmin } from '@/lib/supabase';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { Users, Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import UserActions from './UserActions';

interface SearchParams {
  search?: string;
  tag?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  page?: string;
  blocked?: string;
}

async function getUsers(searchParams: SearchParams) {
  const page = parseInt(searchParams.page || '1');
  const limit = 20;
  const offset = (page - 1) * limit;
  const sortField = searchParams.sort || 'created_at';
  const sortOrder = searchParams.order || 'desc';

  let query = supabaseAdmin
    .from('users')
    .select('*', { count: 'exact' });

  // Search filter
  if (searchParams.search) {
    const search = searchParams.search;
    query = query.or(`username.ilike.%${search}%,first_name.ilike.%${search}%,telegram_id.eq.${parseInt(search) || 0}`);
  }

  // Tag filter
  if (searchParams.tag) {
    query = query.contains('tags', [searchParams.tag]);
  }

  // Blocked filter
  if (searchParams.blocked === 'true') {
    query = query.eq('is_blocked', true);
  } else if (searchParams.blocked === 'false') {
    query = query.eq('is_blocked', false);
  }

  // Sorting
  query = query.order(sortField, { ascending: sortOrder === 'asc' });

  const { data, count } = await query.range(offset, offset + limit - 1);

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
  return Array.from(tagSet).sort();
}

function SortLink({ 
  field, 
  currentSort, 
  currentOrder, 
  searchParams, 
  children 
}: { 
  field: string;
  currentSort: string;
  currentOrder: string;
  searchParams: SearchParams;
  children: React.ReactNode;
}) {
  const isActive = currentSort === field;
  const nextOrder = isActive && currentOrder === 'desc' ? 'asc' : 'desc';
  
  const params = new URLSearchParams();
  if (searchParams.search) params.set('search', searchParams.search);
  if (searchParams.tag) params.set('tag', searchParams.tag);
  if (searchParams.blocked) params.set('blocked', searchParams.blocked);
  params.set('sort', field);
  params.set('order', nextOrder);

  return (
    <Link 
      href={`/users?${params.toString()}`}
      className="flex items-center gap-1 hover:text-gray-900"
    >
      {children}
      {isActive ? (
        currentOrder === 'desc' ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />
      ) : (
        <ArrowUpDown className="w-3 h-3 opacity-30" />
      )}
    </Link>
  );
}

export default async function UsersPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { users, total, page, totalPages } = await getUsers(searchParams);
  const allTags = await getAllTags();
  const currentSort = searchParams.sort || 'created_at';
  const currentOrder = searchParams.order || 'desc';

  // Build URL helper
  const buildUrl = (newParams: Partial<SearchParams>) => {
    const params = new URLSearchParams();
    const merged = { ...searchParams, ...newParams };
    if (merged.search) params.set('search', merged.search);
    if (merged.tag) params.set('tag', merged.tag);
    if (merged.sort) params.set('sort', merged.sort);
    if (merged.order) params.set('order', merged.order);
    if (merged.blocked) params.set('blocked', merged.blocked);
    if (merged.page && merged.page !== '1') params.set('page', merged.page);
    return `/users?${params.toString()}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Пользователи</h1>
          <p className="text-gray-500">Всего: {total}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <form className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                name="search"
                defaultValue={searchParams.search}
                placeholder="Поиск по имени, username или ID"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>
          </div>

          {/* Tag filter */}
          <select
            name="tag"
            defaultValue={searchParams.tag}
            className="px-4 py-2 border border-gray-200 rounded-lg min-w-[150px]"
          >
            <option value="">Все теги</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>

          {/* Blocked filter */}
          <select
            name="blocked"
            defaultValue={searchParams.blocked}
            className="px-4 py-2 border border-gray-200 rounded-lg"
          >
            <option value="">Все статусы</option>
            <option value="false">Активные</option>
            <option value="true">Заблокированные</option>
          </select>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Применить
          </button>

          {(searchParams.search || searchParams.tag || searchParams.blocked) && (
            <Link
              href="/users"
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Сбросить
            </Link>
          )}
        </form>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        {users.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Пользователи не найдены
            </h3>
            <p className="text-gray-500">
              Попробуйте изменить параметры поиска
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Пользователь
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    <SortLink field="credits" currentSort={currentSort} currentOrder={currentOrder} searchParams={searchParams}>
                      Токены
                    </SortLink>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    <SortLink field="cards_created" currentSort={currentSort} currentOrder={currentOrder} searchParams={searchParams}>
                      Карточек
                    </SortLink>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    <SortLink field="total_spent" currentSort={currentSort} currentOrder={currentOrder} searchParams={searchParams}>
                      Потрачено
                    </SortLink>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Теги
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    <SortLink field="created_at" currentSort={currentSort} currentOrder={currentOrder} searchParams={searchParams}>
                      Регистрация
                    </SortLink>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user: any) => (
                  <tr key={user.id} className={`hover:bg-gray-50 ${user.is_blocked ? 'bg-red-50' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium">
                            {(user.first_name || user.username || '?')[0].toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.first_name || 'Без имени'}
                            {user.is_blocked && <span className="ml-2 text-xs text-red-500">заблокирован</span>}
                          </p>
                          <p className="text-sm text-gray-500">
                            {user.username ? `@${user.username}` : `ID: ${user.telegram_id}`}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{user.credits || 0}</td>
                    <td className="px-6 py-4 text-gray-600">{user.cards_created || 0}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {user.total_spent ? `${user.total_spent} ₽` : '—'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {user.tags?.slice(0, 3).map((tag: string) => (
                          <Link
                            key={tag}
                            href={buildUrl({ tag, page: '1' })}
                            className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded hover:bg-gray-200"
                          >
                            {tag}
                          </Link>
                        ))}
                        {user.tags?.length > 3 && (
                          <span className="px-2 py-0.5 text-gray-400 text-xs">
                            +{user.tags.length - 3}
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
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Показано {(page - 1) * 20 + 1}–{Math.min(page * 20, total)} из {total}
          </p>
          <div className="flex items-center gap-2">
            {page > 1 && (
              <Link
                href={buildUrl({ page: String(page - 1) })}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Назад
              </Link>
            )}
            <span className="px-4 py-2 text-gray-600">
              {page} / {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={buildUrl({ page: String(page + 1) })}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Вперёд
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
