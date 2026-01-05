'use client';

import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import {
  Plus,
  Users,
  Search,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  ExternalLink,
  MoreVertical,
  Trash2,
  Pause,
  Play,
  Upload,
  X
} from 'lucide-react';

interface Group {
  id: string;
  telegram_id: number | null;
  username: string | null;
  title: string;
  member_count: number | null;
  category: string | null;
  status: string;
  posts_count: number;
  last_post_at: string | null;
  created_at: string;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  active: { label: 'Активна', color: 'bg-green-100 text-green-700' },
  paused: { label: 'Приостановлена', color: 'bg-yellow-100 text-yellow-700' },
  banned: { label: 'Забанена', color: 'bg-red-100 text-red-700' },
};

function formatDate(dateString: string | null) {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: '2-digit', month: '2-digit', year: '2-digit'
  });
}

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  
  // Filters
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('created_at');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showMenuId, setShowMenuId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    username: '',
    category: '',
    member_count: '',
  });
  const [bulkData, setBulkData] = useState('');

  const fetchGroups = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (status) params.set('status', status);
    if (category) params.set('category', category);
    params.set('sort', sort);
    params.set('order', order);
    params.set('page', String(page));

    try {
      const res = await fetch(`/api/outreach/groups/list?${params.toString()}`);
      const data = await res.json();
      setGroups(data.groups || []);
      setTotal(data.total || 0);
      setCategories(data.categories || []);
    } catch (err) {
      console.error('Failed to fetch groups:', err);
    }
    setLoading(false);
  }, [search, status, category, sort, order, page]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const handleSort = (field: string) => {
    if (sort === field) {
      setOrder(order === 'desc' ? 'asc' : 'desc');
    } else {
      setSort(field);
      setOrder('desc');
    }
  };

  const handleAddGroup = async () => {
    if (!formData.title) {
      toast.error('Введите название группы');
      return;
    }

    setActionLoading('add');
    try {
      const res = await fetch('/api/outreach/groups/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          username: formData.username || null,
          category: formData.category || null,
          member_count: formData.member_count ? parseInt(formData.member_count) : null,
        }),
      });

      if (res.ok) {
        toast.success('Группа добавлена');
        setShowAddModal(false);
        setFormData({ title: '', username: '', category: '', member_count: '' });
        fetchGroups();
      } else {
        toast.error('Ошибка добавления');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setActionLoading(null);
    }
  };

  const handleBulkImport = async () => {
    if (!bulkData.trim()) {
      toast.error('Введите данные');
      return;
    }

    setActionLoading('bulk');
    try {
      const lines = bulkData.trim().split('\n');
      const groups = lines.map(line => {
        const parts = line.split('|').map(p => p.trim());
        return {
          title: parts[0] || 'Без названия',
          username: parts[1] || null,
          category: parts[2] || null,
          member_count: parts[3] ? parseInt(parts[3]) : null,
        };
      });

      const res = await fetch('/api/outreach/groups/bulk-create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groups }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(`Добавлено ${data.count} групп`);
        setShowBulkModal(false);
        setBulkData('');
        fetchGroups();
      } else {
        toast.error(data.error || 'Ошибка импорта');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setActionLoading(null);
    }
  };

  const handleUpdateStatus = async (groupId: string, newStatus: string) => {
    setActionLoading(groupId);
    try {
      const res = await fetch('/api/outreach/groups/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupId, status: newStatus }),
      });

      if (res.ok) {
        toast.success('Статус обновлён');
        fetchGroups();
      } else {
        toast.error('Ошибка');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setActionLoading(null);
      setShowMenuId(null);
    }
  };

  const handleDelete = async (groupId: string) => {
    if (!confirm('Удалить группу?')) return;

    setActionLoading(groupId);
    try {
      const res = await fetch('/api/outreach/groups/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupId }),
      });

      if (res.ok) {
        toast.success('Группа удалена');
        fetchGroups();
      } else {
        toast.error('Ошибка удаления');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setActionLoading(null);
      setShowMenuId(null);
    }
  };

  const clearFilters = () => {
    setSearch('');
    setStatus('');
    setCategory('');
    setPage(1);
  };

  const hasFilters = search || status || category;
  const SortButton = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <button onClick={() => handleSort(field)} className="flex items-center gap-1 hover:text-gray-900">
      {children}
      {sort === field ? (
        order === 'desc' ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />
      ) : (
        <ArrowUpDown className="w-3 h-3 opacity-30" />
      )}
    </button>
  );

  const totalPages = Math.ceil(total / 20);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Группы для аутрича</h1>
          <p className="text-gray-500">Всего: {total}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowBulkModal(true)}
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Импорт
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Добавить
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Поиск по названию"
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg"
              />
            </div>
          </div>

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

          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            className="px-4 py-2 border border-gray-200 rounded-lg"
          >
            <option value="">Все категории</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
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
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          </div>
        ) : groups.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Нет групп</h3>
            <p className="text-gray-500">Добавьте группы для аутрича</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Группа</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Категория</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <SortButton field="member_count">Участников</SortButton>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <SortButton field="posts_count">Постов</SortButton>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <SortButton field="created_at">Добавлена</SortButton>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {groups.map((group) => {
                const statusInfo = statusConfig[group.status] || statusConfig.active;

                return (
                  <tr key={group.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
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
                    </td>
                    <td className="px-6 py-4 text-gray-600">{group.category || '—'}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {group.member_count?.toLocaleString() || '—'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{group.posts_count || 0}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formatDate(group.created_at)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="relative inline-block">
                        <button
                          onClick={() => setShowMenuId(showMenuId === group.id ? null : group.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                          disabled={actionLoading === group.id}
                        >
                          <MoreVertical className="w-5 h-5 text-gray-500" />
                        </button>

                        {showMenuId === group.id && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={() => setShowMenuId(null)} />
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                              {group.status === 'active' ? (
                                <button
                                  onClick={() => handleUpdateStatus(group.id, 'paused')}
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                >
                                  <Pause className="w-4 h-4" />
                                  Приостановить
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleUpdateStatus(group.id, 'active')}
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                >
                                  <Play className="w-4 h-4" />
                                  Активировать
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(group.id)}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                                Удалить
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Страница {page} из {totalPages}</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50">Назад</button>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50">Вперёд</button>
          </div>
        </div>
      )}

      {/* Add Group Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Добавить группу</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Название *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="WB Дизайнеры"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Username (без @)</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="wb_designers"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Категория</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="wb, freelancers"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Участников</label>
                <input
                  type="number"
                  value={formData.member_count}
                  onChange={(e) => setFormData({ ...formData, member_count: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="5000"
                />
              </div>

              <div className="flex gap-3">
                <button onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Отмена</button>
                <button
                  onClick={handleAddGroup}
                  disabled={actionLoading === 'add'}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {actionLoading === 'add' ? 'Добавление...' : 'Добавить'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Import Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
            <h3 className="text-lg font-semibold mb-4">Массовый импорт</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Данные для импорта</label>
                <p className="text-xs text-gray-500 mb-2">Формат: название|username|категория|участников</p>
                <textarea
                  value={bulkData}
                  onChange={(e) => setBulkData(e.target.value)}
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm"
                  placeholder={`WB Дизайнеры|wb_designers|wb|5000\nФриланс Биржа|freelance_birja|freelancers|12000`}
                />
              </div>

              <div className="flex gap-3">
                <button onClick={() => setShowBulkModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Отмена</button>
                <button
                  onClick={handleBulkImport}
                  disabled={actionLoading === 'bulk'}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {actionLoading === 'bulk' ? 'Импорт...' : 'Импортировать'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
