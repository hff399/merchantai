'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  Users,
  Search,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  MoreVertical,
  MessageSquare,
  Tag,
  Ban,
  CheckCircle,
  CreditCard,
  ExternalLink,
  RefreshCw,
  X,
  Plus,
  Coins,
  Calendar,
  TrendingUp,
  Loader2,
} from 'lucide-react';

interface User {
  id: string;
  telegram_id: number;
  username: string | null;
  first_name: string | null;
  credits: number;
  cards_created: number;
  total_spent: number;
  referred_by: string | null;
  utm_source: string | null;
  is_blocked: boolean;
  tags: string[];
  created_at: string;
}

interface UsersStats {
  total: number;
  active: number;
  paid: number;
  blocked: number;
  todayNew: number;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit',
  });
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(amount);
}

function UserActions({ user, onUpdate }: { user: User; onUpdate: () => void }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState<'message' | 'credits' | 'tags' | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [parseMode, setParseMode] = useState('HTML');
  const [creditsAmount, setCreditsAmount] = useState('');
  const [userTags, setUserTags] = useState<string[]>(user.tags || []);
  const [newTag, setNewTag] = useState('');

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/users/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telegramId: user.telegram_id, message, parseMode }),
      });
      if (res.ok) {
        toast.success('Сообщение отправлено');
        setShowModal(null);
        setMessage('');
      } else {
        const data = await res.json();
        toast.error(data.error || 'Ошибка отправки');
      }
    } catch { toast.error('Ошибка соединения'); }
    finally { setLoading(false); }
  };

  const handleGiveCredits = async () => {
    const amount = parseInt(creditsAmount);
    if (isNaN(amount) || amount === 0) { toast.error('Введите корректное число'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/users/give-credits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, amount }),
      });
      if (res.ok) {
        toast.success(`Баланс изменён на ${amount > 0 ? '+' : ''}${amount}`);
        setShowModal(null);
        setCreditsAmount('');
        onUpdate();
      } else { toast.error('Ошибка'); }
    } catch { toast.error('Ошибка соединения'); }
    finally { setLoading(false); }
  };

  const handleUpdateTags = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users/update-tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, tags: userTags }),
      });
      if (res.ok) { toast.success('Теги обновлены'); setShowModal(null); onUpdate(); }
      else { toast.error('Ошибка'); }
    } catch { toast.error('Ошибка соединения'); }
    finally { setLoading(false); }
  };

  const handleToggleBlock = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users/toggle-block', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, block: !user.is_blocked }),
      });
      if (res.ok) {
        toast.success(user.is_blocked ? 'Пользователь разблокирован' : 'Пользователь заблокирован');
        setShowMenu(false);
        onUpdate();
      } else { toast.error('Ошибка'); }
    } catch { toast.error('Ошибка соединения'); }
    finally { setLoading(false); }
  };

  const addTag = () => {
    if (newTag.trim() && !userTags.includes(newTag.trim())) {
      setUserTags([...userTags, newTag.trim()]);
      setNewTag('');
    }
  };

  return (
    <>
      <div className="relative">
        <button onClick={() => setShowMenu(!showMenu)} className="p-2 hover:bg-gray-100 rounded-lg" disabled={loading}>
          {loading ? <Loader2 className="w-5 h-5 animate-spin text-gray-500" /> : <MoreVertical className="w-5 h-5 text-gray-500" />}
        </button>
        {showMenu && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              {user.username && (
                <a href={`https://t.me/${user.username}`} target="_blank" rel="noopener noreferrer" className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" /> Открыть в Telegram
                </a>
              )}
              <button onClick={() => { setShowModal('message'); setShowMenu(false); }} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> Написать сообщение
              </button>
              <button onClick={() => { setShowModal('credits'); setShowMenu(false); }} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                <Coins className="w-4 h-4" /> Начислить токены
              </button>
              <button onClick={() => { setShowModal('tags'); setShowMenu(false); }} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                <Tag className="w-4 h-4" /> Редактировать теги
              </button>
              <hr className="my-1" />
              <button onClick={handleToggleBlock} className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 ${user.is_blocked ? 'text-green-600' : 'text-red-600'}`}>
                {user.is_blocked ? <CheckCircle className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                {user.is_blocked ? 'Разблокировать' : 'Заблокировать'}
              </button>
            </div>
          </>
        )}
      </div>

      {showModal === 'message' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Отправить сообщение</h3>
              <button onClick={() => setShowModal(null)}><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <div className="space-y-4">
              <select value={parseMode} onChange={(e) => setParseMode(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg">
                <option value="HTML">HTML</option>
                <option value="Markdown">Markdown</option>
              </select>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className="w-full px-3 py-2 border border-gray-200 rounded-lg" placeholder="Введите текст сообщения..." />
              <div className="flex gap-3">
                <button onClick={() => setShowModal(null)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Отмена</button>
                <button onClick={handleSendMessage} disabled={loading || !message.trim()} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                  {loading ? 'Отправка...' : 'Отправить'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal === 'credits' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Начислить токены</h3>
              <button onClick={() => setShowModal(null)}><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <p className="text-sm text-gray-500 mb-4">Текущий баланс: <span className="font-medium">{user.credits}</span></p>
            <div className="space-y-4">
              <input type="number" value={creditsAmount} onChange={(e) => setCreditsAmount(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg" placeholder="Введите число" />
              <div className="flex flex-wrap gap-2">
                {[10, 50, 100, 200].map((amount) => (
                  <button key={amount} onClick={() => setCreditsAmount(String(amount))} className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm">+{amount}</button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowModal(null)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Отмена</button>
                <button onClick={handleGiveCredits} disabled={loading || !creditsAmount} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50">
                  {loading ? 'Сохранение...' : 'Начислить'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal === 'tags' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Редактировать теги</h3>
              <button onClick={() => setShowModal(null)}><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input type="text" value={newTag} onChange={(e) => setNewTag(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTag()} className="flex-1 px-3 py-2 border border-gray-200 rounded-lg" placeholder="Новый тег" />
                <button onClick={addTag} className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"><Plus className="w-4 h-4" /></button>
              </div>
              <div className="flex flex-wrap gap-2 min-h-[60px] p-3 bg-gray-50 rounded-lg">
                {userTags.length === 0 ? <span className="text-gray-400 text-sm">Нет тегов</span> : userTags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded flex items-center gap-1">
                    {tag} <button onClick={() => setUserTags(userTags.filter(t => t !== tag))}><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowModal(null)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Отмена</button>
                <button onClick={handleUpdateTags} disabled={loading} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                  {loading ? 'Сохранение...' : 'Сохранить'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function UsersPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UsersStats | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [tag, setTag] = useState(searchParams.get('tag') || '');
  const [blocked, setBlocked] = useState(searchParams.get('blocked') || '');
  const [hasSpent, setHasSpent] = useState(searchParams.get('hasSpent') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'created_at');
  const [order, setOrder] = useState<'asc' | 'desc'>((searchParams.get('order') as 'asc' | 'desc') || 'desc');
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (tag) params.set('tag', tag);
    if (blocked) params.set('blocked', blocked);
    if (hasSpent) params.set('hasSpent', hasSpent);
    params.set('sort', sort);
    params.set('order', order);
    params.set('page', String(page));

    try {
      const res = await fetch(`/api/users/list?${params.toString()}`);
      const data = await res.json();
      setUsers(data.users || []);
      setTotal(data.total || 0);
      setStats(data.stats || null);
      setAllTags(data.allTags || []);
    } catch { toast.error('Ошибка загрузки'); }
    setLoading(false);
  }, [search, tag, blocked, hasSpent, sort, order, page]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleSort = (field: string) => {
    if (sort === field) { setOrder(order === 'desc' ? 'asc' : 'desc'); }
    else { setSort(field); setOrder('desc'); }
    setPage(1);
  };

  const clearFilters = () => { setSearch(''); setTag(''); setBlocked(''); setHasSpent(''); setPage(1); };
  const hasFilters = search || tag || blocked || hasSpent;
  const totalPages = Math.ceil(total / 20);

  const SortButton = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <button onClick={() => handleSort(field)} className="flex items-center gap-1 hover:text-gray-900">
      {children}
      {sort === field ? (order === 'desc' ? <ArrowDown className="w-3 h-3" /> : <ArrowUp className="w-3 h-3" />) : <ArrowUpDown className="w-3 h-3 opacity-30" />}
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Пользователи</h1>
          <p className="text-gray-500">Управление пользователями бота</p>
        </div>
        <button onClick={fetchUsers} disabled={loading} className="p-2 hover:bg-gray-100 rounded-lg">
          <RefreshCw className={`w-5 h-5 text-gray-500 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-50"><Users className="w-5 h-5 text-blue-600" /></div>
              <div><p className="text-2xl font-bold">{stats.total.toLocaleString()}</p><p className="text-xs text-gray-500">Всего</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-50"><TrendingUp className="w-5 h-5 text-green-600" /></div>
              <div><p className="text-2xl font-bold">{stats.active.toLocaleString()}</p><p className="text-xs text-gray-500">Активных</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-50"><CreditCard className="w-5 h-5 text-purple-600" /></div>
              <div><p className="text-2xl font-bold">{stats.paid.toLocaleString()}</p><p className="text-xs text-gray-500">Платящих</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-50"><Calendar className="w-5 h-5 text-orange-600" /></div>
              <div><p className="text-2xl font-bold">+{stats.todayNew}</p><p className="text-xs text-gray-500">Сегодня</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-50"><Ban className="w-5 h-5 text-red-600" /></div>
              <div><p className="text-2xl font-bold">{stats.blocked}</p><p className="text-xs text-gray-500">Заблокировано</p></div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Поиск по имени, username или ID..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg" />
          </div>
          <select value={tag} onChange={(e) => { setTag(e.target.value); setPage(1); }} className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
            <option value="">Все теги</option>
            {allTags.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={hasSpent} onChange={(e) => { setHasSpent(e.target.value); setPage(1); }} className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
            <option value="">Все пользователи</option>
            <option value="true">Платящие</option>
            <option value="false">Бесплатные</option>
          </select>
          <select value={blocked} onChange={(e) => { setBlocked(e.target.value); setPage(1); }} className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
            <option value="">Любой статус</option>
            <option value="false">Активные</option>
            <option value="true">Заблокированные</option>
          </select>
          {hasFilters && <button onClick={clearFilters} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"><X className="w-4 h-4" />Сбросить</button>}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading && users.length === 0 ? (
          <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
        ) : users.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Пользователи не найдены</h3>
            <p className="text-gray-500">Попробуйте изменить параметры поиска</p>
          </div>
        ) : (
          <div className="overflow-x-auto overflow-visible">
            <table className="w-full overflow-visible">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Пользователь</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"><SortButton field="credits">Токены</SortButton></th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"><SortButton field="cards_created">Карточки</SortButton></th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"><SortButton field="total_spent">Потрачено</SortButton></th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Источник</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"><SortButton field="created_at">Регистрация</SortButton></th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr key={user.id} className={`hover:bg-gray-50 ${user.is_blocked ? 'bg-red-50/50' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${user.total_spent > 0 ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-gray-200'}`}>
                          <span className={`font-medium ${user.total_spent > 0 ? 'text-white' : 'text-gray-600'}`}>{(user.first_name || user.username || '?')[0].toUpperCase()}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">{user.first_name || user.username || 'Без имени'}</p>
                            {user.is_blocked && <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-xs rounded">Заблокирован</span>}
                          </div>
                          <p className="text-sm text-gray-500">{user.username ? `@${user.username}` : `ID: ${user.telegram_id}`}</p>
                          {user.tags?.length > 0 && (
                            <div className="flex gap-1 mt-1">
                              {user.tags.slice(0, 3).map(tag => <span key={tag} className="px-1.5 py-0.5 bg-blue-100 text-blue-600 text-xs rounded">{tag}</span>)}
                              {user.tags.length > 3 && <span className="text-xs text-gray-400">+{user.tags.length - 3}</span>}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><span className={`font-medium ${user.credits > 0 ? 'text-green-600' : 'text-gray-400'}`}>{user.credits}</span></td>
                    <td className="px-6 py-4"><span className="font-medium text-gray-900">{user.cards_created}</span></td>
                    <td className="px-6 py-4"><span className={`font-medium ${user.total_spent > 0 ? 'text-purple-600' : 'text-gray-400'}`}>{formatCurrency(user.total_spent)}</span></td>
                    <td className="px-6 py-4">
                      {user.utm_source ? <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">{user.utm_source}</span>
                       : user.referred_by ? <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">Реферал</span>
                       : <span className="text-gray-400 text-sm">Прямой</span>}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formatDate(user.created_at)}</td>
                    <td className="px-6 py-4 text-right"><UserActions user={user} onUpdate={fetchUsers} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Показано {(page - 1) * 20 + 1}–{Math.min(page * 20, total)} из {total.toLocaleString()}</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50">Назад</button>
            <span className="px-4 py-2 text-gray-600">{page} / {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50">Вперёд</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function UsersPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-96"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>}>
      <UsersPageContent />
    </Suspense>
  );
}