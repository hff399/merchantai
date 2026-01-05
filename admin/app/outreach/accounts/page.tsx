'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { 
  Plus, 
  Smartphone, 
  Wifi, 
  WifiOff, 
  AlertTriangle,
  Clock,
  RefreshCw,
  Trash2,
  MoreVertical,
  Check,
  Key,
  ArrowUp,
  ArrowDown,
  ArrowUpDown
} from 'lucide-react';

interface Account {
  id: string;
  phone: string;
  name: string | null;
  api_id: string;
  status: string;
  daily_messages_sent: number;
  daily_limit: number;
  total_messages_sent: number;
  total_replies: number;
  telegram_username: string | null;
  created_at: string;
}

const statusConfig: Record<string, { label: string; icon: any; color: string }> = {
  connected: { label: 'Подключён', icon: Wifi, color: 'text-green-600 bg-green-100' },
  disconnected: { label: 'Отключён', icon: WifiOff, color: 'text-gray-600 bg-gray-100' },
  pending_verification: { label: 'Ожидает код', icon: Clock, color: 'text-yellow-600 bg-yellow-100' },
  awaiting_code: { label: 'Введите код', icon: Key, color: 'text-blue-600 bg-blue-100' },
  awaiting_2fa: { label: 'Введите 2FA', icon: Key, color: 'text-purple-600 bg-purple-100' },
  banned: { label: 'Забанен', icon: AlertTriangle, color: 'text-red-600 bg-red-100' },
};

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  
  // Filters
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState('created_at');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState<Account | null>(null);
  const [showMenuId, setShowMenuId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    phone: '',
    api_id: '',
    api_hash: '',
    name: '',
    daily_limit: '40',
  });
  const [verifyCode, setVerifyCode] = useState('');
  const [twoFactorPassword, setTwoFactorPassword] = useState('');

  const fetchAccounts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (status) params.set('status', status);
    params.set('sort', sort);
    params.set('order', order);
    params.set('page', String(page));

    try {
      const res = await fetch(`/api/outreach/accounts/list?${params.toString()}`);
      const data = await res.json();
      setAccounts(data.accounts || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error('Failed to fetch accounts:', err);
    }
    setLoading(false);
  }, [status, sort, order, page]);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const handleSort = (field: string) => {
    if (sort === field) {
      setOrder(order === 'desc' ? 'asc' : 'desc');
    } else {
      setSort(field);
      setOrder('desc');
    }
  };

  const handleAddAccount = async () => {
    if (!formData.phone || !formData.api_id || !formData.api_hash) {
      toast.error('Заполните обязательные поля');
      return;
    }

    setActionLoading('add');
    try {
      const res = await fetch('/api/outreach/accounts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: formData.phone,
          api_id: formData.api_id,
          api_hash: formData.api_hash,
          name: formData.name || null,
          daily_limit: parseInt(formData.daily_limit) || 40,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Аккаунт добавлен');
        setShowAddModal(false);
        setFormData({ phone: '', api_id: '', api_hash: '', name: '', daily_limit: '40' });
        fetchAccounts();
        // Auto-open verification
        setShowVerifyModal(data.account);
        handleSendCode(data.account.id);
      } else {
        toast.error(data.error || 'Ошибка');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setActionLoading(null);
    }
  };

  const handleSendCode = async (accountId: string) => {
    setActionLoading(accountId);
    try {
      const res = await fetch('/api/outreach/accounts/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Код отправлен на телефон');
        fetchAccounts();
      } else {
        toast.error(data.error || 'Ошибка отправки кода');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setActionLoading(null);
    }
  };

  const handleVerifyCode = async () => {
    if (!showVerifyModal || !verifyCode) return;

    setActionLoading('verify');
    try {
      const res = await fetch('/api/outreach/accounts/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountId: showVerifyModal.id,
          code: verifyCode,
          password: twoFactorPassword || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Аккаунт подключён!');
        setShowVerifyModal(null);
        setVerifyCode('');
        setTwoFactorPassword('');
        fetchAccounts();
      } else if (data.error === '2FA_REQUIRED') {
        toast.error('Требуется пароль двухфакторной аутентификации');
        fetchAccounts();
      } else {
        toast.error(data.error || 'Неверный код');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setActionLoading(null);
    }
  };

  const handleCheckConnection = async (accountId: string) => {
    setActionLoading(accountId);
    try {
      const res = await fetch('/api/outreach/accounts/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId }),
      });

      const data = await res.json();
      if (data.connected) {
        toast.success('Аккаунт активен');
      } else {
        toast.error('Аккаунт отключён');
      }
      fetchAccounts();
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setActionLoading(null);
      setShowMenuId(null);
    }
  };

  const handleDelete = async (accountId: string) => {
    if (!confirm('Удалить аккаунт?')) return;

    setActionLoading(accountId);
    try {
      const res = await fetch('/api/outreach/accounts/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId }),
      });

      if (res.ok) {
        toast.success('Аккаунт удалён');
        fetchAccounts();
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
          <h1 className="text-2xl font-bold text-gray-900">Telegram аккаунты</h1>
          <p className="text-gray-500">Всего: {total}</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Добавить аккаунт
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

      {/* Accounts Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          </div>
        ) : accounts.length === 0 ? (
          <div className="p-12 text-center">
            <Smartphone className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Нет аккаунтов</h3>
            <p className="text-gray-500 mb-4">Добавьте Telegram аккаунты для аутрича</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Аккаунт</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <SortButton field="daily_messages_sent">Сегодня</SortButton>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <SortButton field="total_messages_sent">Всего</SortButton>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <SortButton field="total_replies">Ответов</SortButton>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {accounts.map((account) => {
                const statusInfo = statusConfig[account.status] || statusConfig.disconnected;
                const StatusIcon = statusInfo.icon;
                const needsVerification = ['pending_verification', 'awaiting_code', 'awaiting_2fa'].includes(account.status);

                return (
                  <tr key={account.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Smartphone className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{account.name || account.phone}</p>
                          <p className="text-sm text-gray-500">
                            {account.telegram_username ? `@${account.telegram_username}` : account.phone}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-sm ${statusInfo.color}`}>
                        <StatusIcon className="w-4 h-4" />
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900">{account.daily_messages_sent} / {account.daily_limit}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{account.total_messages_sent}</td>
                    <td className="px-6 py-4 text-gray-600">{account.total_replies}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {needsVerification && (
                          <button
                            onClick={() => {
                              setShowVerifyModal(account);
                              if (account.status === 'pending_verification') {
                                handleSendCode(account.id);
                              }
                            }}
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                          >
                            Верифицировать
                          </button>
                        )}
                        
                        <div className="relative">
                          <button
                            onClick={() => setShowMenuId(showMenuId === account.id ? null : account.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                            disabled={actionLoading === account.id}
                          >
                            <MoreVertical className="w-5 h-5 text-gray-500" />
                          </button>

                          {showMenuId === account.id && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={() => setShowMenuId(null)} />
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                {account.status === 'connected' && (
                                  <button
                                    onClick={() => handleCheckConnection(account.id)}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                  >
                                    <RefreshCw className="w-4 h-4" />
                                    Проверить связь
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDelete(account.id)}
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Удалить
                                </button>
                              </div>
                            </>
                          )}
                        </div>
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
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Назад
            </button>
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

      {/* Add Account Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Добавить аккаунт</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Название</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Рабочий аккаунт 1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Телефон *</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="+79001234567"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">API ID *</label>
                <input
                  type="text"
                  value={formData.api_id}
                  onChange={(e) => setFormData({ ...formData, api_id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="12345678"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">API Hash *</label>
                <input
                  type="text"
                  value={formData.api_hash}
                  onChange={(e) => setFormData({ ...formData, api_hash: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm"
                  placeholder="a1b2c3d4e5f6..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Дневной лимит</label>
                <input
                  type="number"
                  value={formData.daily_limit}
                  onChange={(e) => setFormData({ ...formData, daily_limit: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                />
              </div>

              <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
                <p className="font-medium mb-1">Как получить API ID и Hash?</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Перейдите на <a href="https://my.telegram.org" target="_blank" className="underline">my.telegram.org</a></li>
                  <li>Войдите с номером телефона</li>
                  <li>Выберите "API development tools"</li>
                  <li>Создайте приложение</li>
                </ol>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Отмена
                </button>
                <button
                  onClick={handleAddAccount}
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

      {/* Verify Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Верификация аккаунта</h3>
            
            <p className="text-gray-600 mb-4">
              {showVerifyModal.status === 'awaiting_2fa'
                ? 'Введите пароль двухфакторной аутентификации'
                : `Код отправлен на ${showVerifyModal.phone}`
              }
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {showVerifyModal.status === 'awaiting_2fa' ? '2FA пароль' : 'Код из Telegram'}
                </label>
                {showVerifyModal.status === 'awaiting_2fa' ? (
                  <input
                    type="password"
                    value={twoFactorPassword}
                    onChange={(e) => setTwoFactorPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-center text-2xl tracking-widest"
                    placeholder="••••••"
                  />
                ) : (
                  <input
                    type="text"
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-center text-2xl tracking-widest"
                    placeholder="12345"
                    maxLength={5}
                  />
                )}
              </div>

              {showVerifyModal.status === 'awaiting_2fa' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Код из сообщения (если ещё нужен)</label>
                  <input
                    type="text"
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-center tracking-widest"
                    placeholder="12345"
                    maxLength={5}
                  />
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowVerifyModal(null);
                    setVerifyCode('');
                    setTwoFactorPassword('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Отмена
                </button>
                <button
                  onClick={handleVerifyCode}
                  disabled={actionLoading === 'verify' || (!verifyCode && !twoFactorPassword)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {actionLoading === 'verify' ? 'Проверка...' : 'Подтвердить'}
                </button>
              </div>

              {showVerifyModal.status !== 'awaiting_2fa' && (
                <button
                  onClick={() => handleSendCode(showVerifyModal.id)}
                  disabled={actionLoading === showVerifyModal.id}
                  className="w-full text-sm text-blue-600 hover:underline"
                >
                  Отправить код повторно
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
