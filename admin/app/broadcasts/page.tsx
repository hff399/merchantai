'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  Plus,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Users,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Play,
  Pause,
  Trash2,
  Copy,
  MoreVertical,
  Eye
} from 'lucide-react';

interface Broadcast {
  id: string;
  title: string;
  message: string;
  parse_mode: string;
  target_type: string;
  target_tags: string[];
  total_recipients: number;
  sent_count: number;
  failed_count: number;
  status: string;
  scheduled_at: string | null;
  created_at: string;
}

interface Template {
  id: string;
  name: string;
  message: string;
  parse_mode: string;
  created_at: string;
}

const statusConfig: Record<string, { label: string; icon: any; color: string }> = {
  draft: { label: 'Черновик', icon: FileText, color: 'bg-gray-100 text-gray-700' },
  scheduled: { label: 'Запланирована', icon: Clock, color: 'bg-yellow-100 text-yellow-700' },
  sending: { label: 'Отправка', icon: Send, color: 'bg-blue-100 text-blue-700' },
  completed: { label: 'Завершена', icon: CheckCircle, color: 'bg-green-100 text-green-700' },
  failed: { label: 'Ошибка', icon: XCircle, color: 'bg-red-100 text-red-700' },
  paused: { label: 'Приостановлена', icon: Pause, color: 'bg-orange-100 text-orange-700' },
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit'
  });
}

export default function BroadcastsPage() {
  const [tab, setTab] = useState<'broadcasts' | 'templates'>('broadcasts');
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState('created_at');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState<Broadcast | null>(null);
  const [showMenuId, setShowMenuId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    parse_mode: 'HTML',
    target_type: 'all',
    target_tags: [] as string[],
    scheduled_at: '',
  });
  const [templateForm, setTemplateForm] = useState({
    name: '',
    message: '',
    parse_mode: 'HTML',
  });
  const [allTags, setAllTags] = useState<string[]>([]);
  const [recipientCount, setRecipientCount] = useState(0);

  const fetchBroadcasts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    params.set('sort', sort);
    params.set('order', order);
    params.set('page', String(page));

    try {
      const res = await fetch(`/api/broadcasts/list?${params.toString()}`);
      const data = await res.json();
      setBroadcasts(data.broadcasts || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Failed to fetch broadcasts:', err);
    }
    setLoading(false);
  }, [status, sort, order, page]);

  const fetchTemplates = async () => {
    try {
      const res = await fetch('/api/broadcasts/templates/list');
      const data = await res.json();
      setTemplates(data.templates || []);
    } catch (err) {
      console.error('Failed to fetch templates:', err);
    }
  };

  const fetchTags = async () => {
    try {
      const res = await fetch('/api/broadcasts/tags');
      const data = await res.json();
      setAllTags(data.tags || []);
    } catch (err) {
      console.error('Failed to fetch tags:', err);
    }
  };

  const fetchRecipientCount = async () => {
    try {
      const res = await fetch('/api/broadcasts/count', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target_type: formData.target_type,
          target_tags: formData.target_tags,
        }),
      });
      const data = await res.json();
      setRecipientCount(data.count || 0);
    } catch (err) {
      console.error('Failed to fetch count:', err);
    }
  };

  useEffect(() => {
    if (tab === 'broadcasts') {
      fetchBroadcasts();
    } else {
      fetchTemplates();
    }
    fetchTags();
  }, [tab, fetchBroadcasts]);

  useEffect(() => {
    if (showCreateModal) {
      fetchRecipientCount();
    }
  }, [formData.target_type, formData.target_tags, showCreateModal]);

  const handleSort = (field: string) => {
    if (sort === field) {
      setOrder(order === 'desc' ? 'asc' : 'desc');
    } else {
      setSort(field);
      setOrder('desc');
    }
  };

  const handleCreateBroadcast = async (sendNow: boolean) => {
    if (!formData.message.trim()) {
      toast.error('Введите текст сообщения');
      return;
    }

    setActionLoading('create');
    try {
      const res = await fetch('/api/broadcasts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          status: sendNow ? 'sending' : 'draft',
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(sendNow ? 'Рассылка запущена' : 'Черновик сохранён');
        setShowCreateModal(false);
        setFormData({ title: '', message: '', parse_mode: 'HTML', target_type: 'all', target_tags: [], scheduled_at: '' });
        fetchBroadcasts();
      } else {
        toast.error(data.error || 'Ошибка');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setActionLoading(null);
    }
  };

  const handleSaveTemplate = async () => {
    if (!templateForm.name.trim() || !templateForm.message.trim()) {
      toast.error('Заполните название и текст');
      return;
    }

    setActionLoading('template');
    try {
      const res = await fetch('/api/broadcasts/templates/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(templateForm),
      });

      if (res.ok) {
        toast.success('Шаблон сохранён');
        setShowTemplateModal(false);
        setTemplateForm({ name: '', message: '', parse_mode: 'HTML' });
        fetchTemplates();
      } else {
        toast.error('Ошибка сохранения');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteBroadcast = async (id: string) => {
    if (!confirm('Удалить рассылку?')) return;
    
    setActionLoading(id);
    try {
      const res = await fetch('/api/broadcasts/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ broadcastId: id }),
      });

      if (res.ok) {
        toast.success('Рассылка удалена');
        fetchBroadcasts();
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

  const handleDeleteTemplate = async (id: string) => {
    if (!confirm('Удалить шаблон?')) return;
    
    try {
      const res = await fetch('/api/broadcasts/templates/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId: id }),
      });

      if (res.ok) {
        toast.success('Шаблон удалён');
        fetchTemplates();
      } else {
        toast.error('Ошибка удаления');
      }
    } catch (error) {
      toast.error('Ошибка');
    }
  };

  const handleUseTemplate = (template: Template) => {
    setFormData({
      ...formData,
      message: template.message,
      parse_mode: template.parse_mode,
    });
    setShowCreateModal(true);
  };

  const handleDuplicate = (broadcast: Broadcast) => {
    setFormData({
      title: `${broadcast.title} (копия)`,
      message: broadcast.message,
      parse_mode: broadcast.parse_mode,
      target_type: broadcast.target_type,
      target_tags: broadcast.target_tags || [],
      scheduled_at: '',
    });
    setShowCreateModal(true);
    setShowMenuId(null);
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
          <h1 className="text-2xl font-bold text-gray-900">Рассылки</h1>
          <p className="text-gray-500">{tab === 'broadcasts' ? `Всего: ${total}` : `Шаблонов: ${templates.length}`}</p>
        </div>
        <div className="flex gap-2">
          {tab === 'templates' && (
            <button
              onClick={() => setShowTemplateModal(true)}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Новый шаблон
            </button>
          )}
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Новая рассылка
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setTab('broadcasts')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              tab === 'broadcasts' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Рассылки
          </button>
          <button
            onClick={() => setTab('templates')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              tab === 'templates' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Шаблоны
          </button>
        </div>

        {tab === 'broadcasts' && (
          <>
            {/* Filters */}
            <div className="p-4 border-b border-gray-200">
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
            {loading ? (
              <div className="p-12 text-center">
                <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
              </div>
            ) : broadcasts.length === 0 ? (
              <div className="p-12 text-center">
                <Send className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Нет рассылок</h3>
                <p className="text-gray-500">Создайте первую рассылку</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Рассылка</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Аудитория</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      <SortButton field="sent_count">Отправлено</SortButton>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      <SortButton field="created_at">Дата</SortButton>
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {broadcasts.map((broadcast) => {
                    const statusInfo = statusConfig[broadcast.status] || statusConfig.draft;
                    const StatusIcon = statusInfo.icon;

                    return (
                      <tr key={broadcast.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">{broadcast.title || 'Без названия'}</p>
                          <p className="text-sm text-gray-500 truncate max-w-xs">{broadcast.message.substring(0, 50)}...</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-sm ${statusInfo.color}`}>
                            <StatusIcon className="w-4 h-4" />
                            {statusInfo.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Users className="w-4 h-4" />
                            {broadcast.total_recipients}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className="text-green-600">{broadcast.sent_count}</span>
                          {broadcast.failed_count > 0 && (
                            <span className="text-red-600 ml-2">/ {broadcast.failed_count} ошибок</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{formatDate(broadcast.created_at)}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="relative inline-block">
                            <button
                              onClick={() => setShowMenuId(showMenuId === broadcast.id ? null : broadcast.id)}
                              className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                              <MoreVertical className="w-5 h-5 text-gray-500" />
                            </button>

                            {showMenuId === broadcast.id && (
                              <>
                                <div className="fixed inset-0 z-40" onClick={() => setShowMenuId(null)} />
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                  <button
                                    onClick={() => { setShowPreviewModal(broadcast); setShowMenuId(null); }}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                  >
                                    <Eye className="w-4 h-4" />
                                    Просмотр
                                  </button>
                                  <button
                                    onClick={() => handleDuplicate(broadcast)}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                  >
                                    <Copy className="w-4 h-4" />
                                    Дублировать
                                  </button>
                                  <button
                                    onClick={() => handleDeleteBroadcast(broadcast.id)}
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
          </>
        )}

        {tab === 'templates' && (
          <div className="p-6">
            {templates.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Нет шаблонов</h3>
                <p className="text-gray-500">Создайте шаблоны для быстрой рассылки</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {templates.map((template) => (
                  <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300">
                    <h4 className="font-medium text-gray-900 mb-2">{template.name}</h4>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-3">{template.message}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUseTemplate(template)}
                        className="flex-1 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                      >
                        Использовать
                      </button>
                      <button
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="px-3 py-1 border border-gray-200 text-sm rounded hover:bg-gray-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      {tab === 'broadcasts' && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Страница {page} из {totalPages}</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50">Назад</button>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50">Вперёд</button>
          </div>
        </div>
      )}

      {/* Create Broadcast Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto py-8">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
            <h3 className="text-lg font-semibold mb-4">Новая рассылка</h3>
            
            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium mb-1">Название (для себя)</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Новогодняя акция"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Формат</label>
                <select
                  value={formData.parse_mode}
                  onChange={(e) => setFormData({ ...formData, parse_mode: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                >
                  <option value="HTML">HTML</option>
                  <option value="Markdown">Markdown</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Сообщение *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm"
                  placeholder={formData.parse_mode === 'HTML' ? '<b>Привет!</b>\n\nТекст сообщения' : '**Привет!**\n\nТекст сообщения'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Аудитория</label>
                <select
                  value={formData.target_type}
                  onChange={(e) => setFormData({ ...formData, target_type: e.target.value, target_tags: [] })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                >
                  <option value="all">Все пользователи</option>
                  <option value="tags">По тегам</option>
                </select>
              </div>

              {formData.target_type === 'tags' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Теги</label>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          const newTags = formData.target_tags.includes(tag)
                            ? formData.target_tags.filter(t => t !== tag)
                            : [...formData.target_tags, tag];
                          setFormData({ ...formData, target_tags: newTags });
                        }}
                        className={`px-3 py-1 rounded-full text-sm ${
                          formData.target_tags.includes(tag)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">
                  <Users className="w-4 h-4 inline mr-1" />
                  Получателей: <strong>{recipientCount}</strong>
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Отмена
                </button>
                <button
                  onClick={() => handleCreateBroadcast(false)}
                  disabled={actionLoading === 'create'}
                  className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Сохранить черновик
                </button>
                <button
                  onClick={() => handleCreateBroadcast(true)}
                  disabled={actionLoading === 'create' || recipientCount === 0}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {actionLoading === 'create' ? 'Отправка...' : 'Отправить сейчас'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Template Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
            <h3 className="text-lg font-semibold mb-4">Новый шаблон</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Название *</label>
                <input
                  type="text"
                  value={templateForm.name}
                  onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Приветственное сообщение"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Формат</label>
                <select
                  value={templateForm.parse_mode}
                  onChange={(e) => setTemplateForm({ ...templateForm, parse_mode: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                >
                  <option value="HTML">HTML</option>
                  <option value="Markdown">Markdown</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Текст *</label>
                <textarea
                  value={templateForm.message}
                  onChange={(e) => setTemplateForm({ ...templateForm, message: e.target.value })}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm"
                />
              </div>

              <div className="flex gap-3">
                <button onClick={() => setShowTemplateModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Отмена</button>
                <button
                  onClick={handleSaveTemplate}
                  disabled={actionLoading === 'template'}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {actionLoading === 'template' ? 'Сохранение...' : 'Сохранить'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
            <h3 className="text-lg font-semibold mb-4">Просмотр рассылки</h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div dangerouslySetInnerHTML={{ __html: showPreviewModal.message.replace(/\n/g, '<br>') }} />
            </div>
            <button onClick={() => setShowPreviewModal(null)} className="w-full px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
}
