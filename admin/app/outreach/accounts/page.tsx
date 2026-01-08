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
  ArrowUpDown,
  ExternalLink,
  Info,
  Shield,
  Loader2,
  Copy,
  Eye,
  EyeOff,
} from 'lucide-react';

interface Account {
  id: string;
  phone: string;
  name: string | null;
  api_id: string;
  api_hash: string;
  status: string;
  daily_messages_sent: number;
  daily_limit: number;
  total_messages_sent: number;
  total_replies: number;
  telegram_username: string | null;
  created_at: string;
  updated_at: string;
}

const statusConfig: Record<string, { label: string; icon: any; color: string; bgColor: string }> = {
  connected: { label: 'Подключён', icon: Wifi, color: 'text-green-600', bgColor: 'bg-green-100' },
  disconnected: { label: 'Отключён', icon: WifiOff, color: 'text-gray-600', bgColor: 'bg-gray-100' },
  pending_verification: { label: 'Ожидает верификации', icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  awaiting_code: { label: 'Введите код', icon: Key, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  awaiting_2fa: { label: 'Требуется 2FA', icon: Shield, color: 'text-purple-600', bgColor: 'bg-purple-100' },
  banned: { label: 'Заблокирован', icon: AlertTriangle, color: 'text-red-600', bgColor: 'bg-red-100' },
  limited: { label: 'Ограничен', icon: AlertTriangle, color: 'text-orange-600', bgColor: 'bg-orange-100' },
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit'
  });
}

function UsageBar({ used, limit }: { used: number; limit: number }) {
  const percentage = Math.min((used / limit) * 100, 100);
  const getColor = () => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>{used} / {limit}</span>
        <span>{percentage.toFixed(0)}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${getColor()} transition-all duration-300`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState('created_at');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState<Account | null>(null);
  const [showMenuId, setShowMenuId] = useState<string | null>(null);
  const [showApiHash, setShowApiHash] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    phone: '',
    api_id: '',
    api_hash: '',
    name: '',
    daily_limit: '40',
  });
  const [verifyCode, setVerifyCode] = useState('');
  const [twoFactorPassword, setTwoFactorPassword] = useState('');
  const [step, setStep] = useState<'add' | 'sending' | 'code' | '2fa'>('add');

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
      toast.error('Не удалось загрузить аккаунты');
    }
    setLoading(false);
  }, [status, sort, order, page]);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  useEffect(() => {
    const interval = setInterval(fetchAccounts, 30000);
    return () => clearInterval(interval);
  }, [fetchAccounts]);

  const handleSort = (field: string) => {
    if (sort === field) {
      setOrder(order === 'desc' ? 'asc' : 'desc');
    } else {
      setSort(field);
      setOrder('desc');
    }
  };

  const resetForm = () => {
    setFormData({ phone: '', api_id: '', api_hash: '', name: '', daily_limit: '40' });
    setVerifyCode('');
    setTwoFactorPassword('');
    setStep('add');
  };

  const handleAddAccount = async () => {
    if (!formData.phone || !formData.api_id || !formData.api_hash) {
      toast.error('Заполните обязательные поля');
      return;
    }

    if (!formData.phone.startsWith('+')) {
      toast.error('Номер должен начинаться с + (например, +79001234567)');
      return;
    }

    if (!/^\d+$/.test(formData.api_id.trim())) {
      toast.error('API ID должен содержать только цифры');
      return;
    }

    setActionLoading('add');
    try {
      const res = await fetch('/api/outreach/accounts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: formData.phone.trim(),
          api_id: formData.api_id.trim(),
          api_hash: formData.api_hash.trim(),
          name: formData.name || null,
          daily_limit: parseInt(formData.daily_limit) || 40,
        }),
      });

      const data = await res.json();
      if (res.ok && data.account) {
        toast.success('Аккаунт добавлен');
        fetchAccounts();
        setShowVerifyModal(data.account);
        setShowAddModal(false);
        await handleSendCode(data.account.id);
      } else {
        toast.error(data.error || 'Ошибка добавления');
      }
    } catch (error) {
      toast.error('Ошибка соединения');
    } finally {
      setActionLoading(null);
    }
  };

  const handleSendCode = async (accountId: string) => {
    setActionLoading('sendCode');
    setStep('sending');
    
    try {
      const res = await fetch('/api/outreach/accounts/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Код отправлен в Telegram');
        setStep('code');
        fetchAccounts();
      } else {
        toast.error(data.error || 'Ошибка отправки кода');
        setStep('add');
      }
    } catch (error) {
      toast.error('Ошибка соединения');
      setStep('add');
    } finally {
      setActionLoading(null);
    }
  };

  const handleVerifyCode = async () => {
    if (!showVerifyModal) return;
    
    const code = verifyCode.trim();
    const password = twoFactorPassword.trim();
    
    if (!code && step !== '2fa') {
      toast.error('Введите код из Telegram');
      return;
    }
    
    if (step === '2fa' && !password) {
      toast.error('Введите пароль 2FA');
      return;
    }

    setActionLoading('verify');
    try {
      const res = await fetch('/api/outreach/accounts/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountId: showVerifyModal.id,
          code: code,
          password: password || undefined,
        }),
      });

      const data = await res.json();
      
      if (data.error === '2FA_REQUIRED') {
        setStep('2fa');
        toast('Требуется пароль двухфакторной аутентификации');
        fetchAccounts();
        return;
      }
      
      if (res.ok && data.success) {
        toast.success('Аккаунт успешно подключён! 🎉');
        setShowVerifyModal(null);
        resetForm();
        fetchAccounts();
      } else {
        toast.error(data.error || 'Ошибка верификации');
      }
    } catch (error) {
      toast.error('Ошибка соединения');
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
        toast.success(`Аккаунт активен${data.user?.username ? ` (@${data.user.username})` : ''}`);
      } else {
        toast.error(data.error || 'Аккаунт отключён');
      }
      fetchAccounts();
    } catch (error) {
      toast.error('Ошибка проверки');
    } finally {
      setActionLoading(null);
      setShowMenuId(null);
    }
  };

  const handleReconnect = async (account: Account) => {
    setShowVerifyModal(account);
    setStep('add');
    await handleSendCode(account.id);
  };

  const handleDelete = async (accountId: string) => {
    if (!confirm('Удалить аккаунт? Это действие нельзя отменить.')) return;

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
      toast.error('Ошибка соединения');
    } finally {
      setActionLoading(null);
      setShowMenuId(null);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} скопирован`);
  };

  const totalPages = Math.ceil(total / 20);

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Telegram Аккаунты</h1>
          <p className="text-gray-500">Управление аккаунтами для аутрича</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchAccounts}
            disabled={loading}
            className="p-2 hover:bg-gray-100 rounded-lg"
            title="Обновить"
          >
            <RefreshCw className={`w-5 h-5 text-gray-500 ${loading ? 'animate-spin' : ''}`} />
          </button>
          
          <button
            onClick={() => { setShowAddModal(true); resetForm(); }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Добавить аккаунт
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50">
              <Smartphone className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{total}</p>
              <p className="text-xs text-gray-500">Всего аккаунтов</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-50">
              <Wifi className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {accounts.filter(a => a.status === 'connected').length}
              </p>
              <p className="text-xs text-gray-500">Подключено</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-50">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {accounts.filter(a => ['pending_verification', 'awaiting_code', 'awaiting_2fa'].includes(a.status)).length}
              </p>
              <p className="text-xs text-gray-500">Ожидают</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-50">
              <Check className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {accounts.reduce((sum, a) => sum + a.total_messages_sent, 0)}
              </p>
              <p className="text-xs text-gray-500">Сообщений</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
          >
            <option value="">Все статусы</option>
            <option value="connected">Подключён</option>
            <option value="disconnected">Отключён</option>
            <option value="awaiting_code">Ожидает код</option>
            <option value="awaiting_2fa">Требуется 2FA</option>
            <option value="banned">Заблокирован</option>
          </select>
          
          {status && (
            <button
              onClick={() => setStatus('')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Сбросить фильтр
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading && accounts.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : accounts.length === 0 ? (
          <div className="text-center py-12">
            <Smartphone className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Нет аккаунтов</h3>
            <p className="text-gray-500 mb-4">Добавьте первый Telegram аккаунт для аутрича</p>
            <button
              onClick={() => { setShowAddModal(true); resetForm(); }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Добавить аккаунт
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto overflow-visible">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Аккаунт</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    <SortButton field="daily_messages_sent">Лимит</SortButton>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    <SortButton field="total_messages_sent">Сообщений</SortButton>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    <SortButton field="created_at">Добавлен</SortButton>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {accounts.map((account) => {
                  const statusInfo = statusConfig[account.status] || statusConfig.disconnected;
                  const StatusIcon = statusInfo.icon;
                  const needsAction = ['awaiting_code', 'awaiting_2fa', 'pending_verification'].includes(account.status);
                  
                  return (
                    <tr key={account.id} className={`hover:bg-gray-50 ${needsAction ? 'bg-yellow-50/50' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${statusInfo.bgColor}`}>
                            <Smartphone className={`w-5 h-5 ${statusInfo.color}`} />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{account.name || account.phone}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <span>{account.phone}</span>
                              {account.telegram_username && (
                                <a
                                  href={`https://t.me/${account.telegram_username}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline flex items-center gap-1"
                                >
                                  @{account.telegram_username}
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {statusInfo.label}
                        </span>
                        {needsAction && (
                          <button
                            onClick={() => {
                              setShowVerifyModal(account);
                              if (account.status === 'awaiting_2fa') {
                                setStep('2fa');
                              } else if (account.status === 'awaiting_code') {
                                setStep('code');
                              } else {
                                handleSendCode(account.id);
                              }
                            }}
                            className="ml-2 text-xs text-blue-600 hover:underline"
                          >
                            Продолжить →
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-32">
                          <UsageBar used={account.daily_messages_sent} limit={account.daily_limit} />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">{account.total_messages_sent}</p>
                          <p className="text-gray-500">{account.total_replies} ответов</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{formatDate(account.created_at)}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="relative">
                          <button
                            onClick={() => setShowMenuId(showMenuId === account.id ? null : account.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                            disabled={actionLoading === account.id}
                          >
                            {actionLoading === account.id ? (
                              <Loader2 className="w-5 h-5 animate-spin text-gray-500" />
                            ) : (
                              <MoreVertical className="w-5 h-5 text-gray-500" />
                            )}
                          </button>

                          {showMenuId === account.id && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={() => setShowMenuId(null)} />
                              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                {account.status === 'connected' && (
                                  <button
                                    onClick={() => handleCheckConnection(account.id)}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                  >
                                    <RefreshCw className="w-4 h-4" />
                                    Проверить соединение
                                  </button>
                                )}
                                
                                {account.status !== 'connected' && (
                                  <button
                                    onClick={() => handleReconnect(account)}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                  >
                                    <Wifi className="w-4 h-4" />
                                    Переподключить
                                  </button>
                                )}
                                
                                <button
                                  onClick={() => copyToClipboard(account.api_id, 'API ID')}
                                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                                >
                                  <Copy className="w-4 h-4" />
                                  Копировать API ID
                                </button>
                                
                                <hr className="my-1" />
                                
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
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

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
            <span className="px-4 py-2 text-gray-600">{page} / {totalPages}</span>
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

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Добавить Telegram аккаунт</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Название (необязательно)</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Рабочий аккаунт"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Номер телефона *</label>
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
                <div className="relative">
                  <input
                    type={showApiHash === 'add' ? 'text' : 'password'}
                    value={formData.api_hash}
                    onChange={(e) => setFormData({ ...formData, api_hash: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm pr-10"
                    placeholder="a1b2c3d4e5f6..."
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiHash(showApiHash === 'add' ? null : 'add')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                  >
                    {showApiHash === 'add' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Дневной лимит сообщений</label>
                <input
                  type="number"
                  value={formData.daily_limit}
                  onChange={(e) => setFormData({ ...formData, daily_limit: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  min="1"
                  max="200"
                />
                <p className="text-xs text-gray-500 mt-1">Рекомендуется 30-50 для новых аккаунтов</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Как получить API ID и Hash?</p>
                    <ol className="list-decimal list-inside space-y-1 text-blue-700">
                      <li>Перейдите на <a href="https://my.telegram.org" target="_blank" rel="noopener noreferrer" className="underline">my.telegram.org</a></li>
                      <li>Войдите с номером телефона</li>
                      <li>Выберите «API development tools»</li>
                      <li>Создайте приложение (любое название)</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => { setShowAddModal(false); resetForm(); }}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Отмена
                </button>
                <button
                  onClick={handleAddAccount}
                  disabled={actionLoading === 'add'}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {actionLoading === 'add' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Добавление...
                    </>
                  ) : (
                    'Добавить и подключить'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showVerifyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-2">
              {step === 'sending' && 'Отправка кода...'}
              {step === 'code' && 'Введите код из Telegram'}
              {step === '2fa' && 'Двухфакторная аутентификация'}
            </h3>
            
            <p className="text-gray-600 mb-4">
              {step === 'sending' && 'Подождите, отправляем код на ваш Telegram...'}
              {step === 'code' && `Код отправлен на ${showVerifyModal.phone}`}
              {step === '2fa' && 'Введите пароль двухфакторной аутентификации'}
            </p>

            {step === 'sending' ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : (
              <div className="space-y-4">
                {step === 'code' && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Код из Telegram</label>
                    <input
                      type="text"
                      value={verifyCode}
                      onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                      className="w-full px-3 py-3 border border-gray-200 rounded-lg text-center text-2xl tracking-[0.5em] font-mono"
                      placeholder="12345"
                      maxLength={5}
                      autoFocus
                    />
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Код придёт в Telegram от официального аккаунта
                    </p>
                  </div>
                )}

                {step === '2fa' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">Пароль 2FA</label>
                      <input
                        type="password"
                        value={twoFactorPassword}
                        onChange={(e) => setTwoFactorPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                        placeholder="Ваш пароль двухфакторной аутентификации"
                        autoFocus
                      />
                    </div>
                    {verifyCode && (
                      <div>
                        <label className="block text-sm font-medium mb-1">Код из Telegram (если запрошен)</label>
                        <input
                          type="text"
                          value={verifyCode}
                          onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-center tracking-widest"
                          placeholder="12345"
                          maxLength={5}
                        />
                      </div>
                    )}
                  </>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowVerifyModal(null);
                      resetForm();
                    }}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={handleVerifyCode}
                    disabled={actionLoading === 'verify' || (step === 'code' && !verifyCode) || (step === '2fa' && !twoFactorPassword)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {actionLoading === 'verify' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Проверка...
                      </>
                    ) : (
                      'Подтвердить'
                    )}
                  </button>
                </div>

                {step === 'code' && (
                  <button
                    onClick={() => handleSendCode(showVerifyModal.id)}
                    disabled={actionLoading === 'sendCode'}
                    className="w-full text-sm text-blue-600 hover:underline disabled:opacity-50"
                  >
                    {actionLoading === 'sendCode' ? 'Отправка...' : 'Отправить код повторно'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}