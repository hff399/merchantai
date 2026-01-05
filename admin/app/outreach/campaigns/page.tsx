'use client';

import { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import {
  Plus,
  Megaphone,
  Play,
  Pause,
  MoreVertical,
  Trash2,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  MessageSquare,
  Users,
  CheckCircle,
  X
} from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  group_message: string;
  status: string;
  messages_sent: number;
  replies_received: number;
  conversations_started: number;
  created_at: string;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  draft: { label: 'Черновик', color: 'bg-gray-100 text-gray-700' },
  active: { label: 'Активна', color: 'bg-green-100 text-green-700' },
  paused: { label: 'Приостановлена', color: 'bg-yellow-100 text-yellow-700' },
  completed: { label: 'Завершена', color: 'bg-blue-100 text-blue-700' },
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: '2-digit', month: '2-digit', year: '2-digit'
  });
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState('created_at');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMenuId, setShowMenuId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Form
  const [formData, setFormData] = useState({
    name: '',
    group_message: '',
    target_categories: [] as string[],
    dm_template: '',
    delay_between_messages: '300',
  });
  const [categories, setCategories] = useState<string[]>([]);

  const fetchCampaigns = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    params.set('sort', sort);
    params.set('order', order);
    params.set('page', String(page));

    try {
      const res = await fetch(`/api/outreach/campaigns/list?${params.toString()}`);
      const data = await res.json();
      setCampaigns(data.campaigns || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Failed to fetch campaigns:', err);
    }
    setLoading(false);
  }, [status, sort, order, page]);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/outreach/groups/list');
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  useEffect(() => {
    fetchCampaigns();
    fetchCategories();
  }, [fetchCampaigns]);

  const handleSort = (field: string) => {
    if (sort === field) {
      setOrder(order === 'desc' ? 'asc' : 'desc');
    } else {
      setSort(field);
      setOrder('desc');
    }
  };

  const handleCreate = async () => {
    if (!formData.name || !formData.group_message) {
      toast.error('Заполните название и сообщение');
      return;
    }

    setActionLoading('create');
    try {
      const res = await fetch('/api/outreach/campaigns/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          group_message: formData.group_message,
          target_categories: formData.target_categories,
          dm_templates: formData.dm_template ? [{ text: formData.dm_template }] : [],
          delay_between_messages: parseInt(formData.delay_between_messages) || 300,
        }),
      });

      if (res.ok) {
        toast.success('Кампания создана');
        setShowCreateModal(false);
        setFormData({ name: '', group_message: '', target_categories: [], dm_template: '', delay_between_messages: '300' });
        fetchCampaigns();
      } else {
        toast.error('Ошибка создания');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setActionLoading(null);
    }
  };

  const handleUpdateStatus = async (campaignId: string, newStatus: string) => {
    setActionLoading(campaignId);
    try {
      const res = await fetch('/api/outreach/campaigns/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaignId, status: newStatus }),
      });

      if (res.ok) {
        toast.success('Статус обновлён');
        fetchCampaigns();
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

  const handleDelete = async (campaignId: string) => {
    if (!confirm('Удалить кампанию?')) return;

    setActionLoading(campaignId);
    try {
      const res = await fetch('/api/outreach/campaigns/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaignId }),
      });

      if (res.ok) {
        toast.success('Кампания удалена');
        fetchCampaigns();
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
          <h1 className="text-2xl font-bold text-gray-900">Кампании</h1>
          <p className="text-gray-500">Всего: {total}</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Новая кампания
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4">
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
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          </div>
        ) : campaigns.length === 0 ? (
          <div className="p-12 text-center">
            <Megaphone className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Нет кампаний</h3>
            <p className="text-gray-500">Создайте первую кампанию для аутрича</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Кампания</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <SortButton field="messages_sent">Сообщений</SortButton>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <SortButton field="replies_received">Ответов</SortButton>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <SortButton field="conversations_started">Конверсий</SortButton>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <SortButton field="created_at">Создана</SortButton>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {campaigns.map((campaign) => {
                const statusInfo = statusConfig[campaign.status] || statusConfig.draft;

                return (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{campaign.name}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">{campaign.group_message.substring(0, 50)}...</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-gray-600">
                        <MessageSquare className="w-4 h-4" />
                        {campaign.messages_sent}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users className="w-4 h-4" />
                        {campaign.replies_received}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        {campaign.conversations_started}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formatDate(campaign.created_at)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="relative inline-block">
                        <button
                          onClick={() => setShowMenuId(showMenuId === campaign.id ? null : campaign.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-500" />
                        </button>

                        {showMenuId === campaign.id && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={() => setShowMenuId(null)} />
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                              {campaign.status === 'active' ? (
                                <button
                                  onClick={() => handleUpdateStatus(campaign.id, 'paused')}
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                >
                                  <Pause className="w-4 h-4" />
                                  Приостановить
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleUpdateStatus(campaign.id, 'active')}
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                >
                                  <Play className="w-4 h-4" />
                                  Запустить
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(campaign.id)}
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

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto py-8">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Новая кампания</h3>
              <button onClick={() => setShowCreateModal(false)}><X className="w-5 h-5" /></button>
            </div>
            
            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium mb-1">Название *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Новогодняя кампания"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Сообщение для групп *</label>
                <textarea
                  value={formData.group_message}
                  onChange={(e) => setFormData({ ...formData, group_message: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Привет! Делаю карточки для маркетплейсов с AI..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Категории групп</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        const newCats = formData.target_categories.includes(cat)
                          ? formData.target_categories.filter(c => c !== cat)
                          : [...formData.target_categories, cat];
                        setFormData({ ...formData, target_categories: newCats });
                      }}
                      className={`px-3 py-1 rounded-full text-sm ${
                        formData.target_categories.includes(cat)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                  {categories.length === 0 && (
                    <p className="text-sm text-gray-500">Нет категорий. Добавьте группы с категориями.</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Шаблон DM для ответивших</label>
                <textarea
                  value={formData.dm_template}
                  onChange={(e) => setFormData({ ...formData, dm_template: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Привет! Спасибо что откликнулись..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Задержка между сообщениями (сек)</label>
                <input
                  type="number"
                  value={formData.delay_between_messages}
                  onChange={(e) => setFormData({ ...formData, delay_between_messages: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                />
              </div>

              <div className="flex gap-3">
                <button onClick={() => setShowCreateModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Отмена</button>
                <button
                  onClick={handleCreate}
                  disabled={actionLoading === 'create'}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {actionLoading === 'create' ? 'Создание...' : 'Создать'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
