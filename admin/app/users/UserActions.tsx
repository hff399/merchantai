'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  MoreVertical,
  Send,
  Gift,
  Ban,
  Tag,
  MessageSquare,
  X,
} from 'lucide-react';

interface User {
  id: string;
  telegram_id: number;
  username: string | null;
  first_name: string | null;
  credits: number;
  is_blocked: boolean;
  tags: string[];
}

export default function UserActions({ user }: { user: User }) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState<'message' | 'credits' | 'tags' | null>(null);
  const [loading, setLoading] = useState(false);

  // Form states
  const [message, setMessage] = useState('');
  const [parseMode, setParseMode] = useState<'HTML' | 'Markdown'>('HTML');
  const [creditsAmount, setCreditsAmount] = useState('');
  const [newTag, setNewTag] = useState('');
  const [userTags, setUserTags] = useState<string[]>(user.tags || []);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/users/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telegramId: user.telegram_id,
          message,
          parseMode,
        }),
      });

      if (res.ok) {
        toast.success('Сообщение отправлено');
        setShowModal(null);
        setMessage('');
      } else {
        const data = await res.json();
        toast.error(data.error || 'Ошибка отправки');
      }
    } catch (error) {
      toast.error('Ошибка отправки');
    } finally {
      setLoading(false);
    }
  };

  const handleGiveCredits = async () => {
    const amount = parseInt(creditsAmount);
    if (!amount || amount === 0) return;

    setLoading(true);
    try {
      const res = await fetch('/api/users/give-credits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          amount,
        }),
      });

      if (res.ok) {
        toast.success(`Начислено ${amount} токенов`);
        setShowModal(null);
        setCreditsAmount('');
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.error || 'Ошибка');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBlock = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users/toggle-block', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          block: !user.is_blocked,
        }),
      });

      if (res.ok) {
        toast.success(user.is_blocked ? 'Пользователь разблокирован' : 'Пользователь заблокирован');
        router.refresh();
      } else {
        toast.error('Ошибка');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setLoading(false);
      setShowMenu(false);
    }
  };

  const handleUpdateTags = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/users/update-tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          tags: userTags,
        }),
      });

      if (res.ok) {
        toast.success('Теги обновлены');
        setShowModal(null);
        router.refresh();
      } else {
        toast.error('Ошибка');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !userTags.includes(newTag.trim())) {
      setUserTags([...userTags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setUserTags(userTags.filter(t => t !== tag));
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <MoreVertical className="w-5 h-5 text-gray-500" />
        </button>

        {showMenu && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setShowMenu(false)} 
            />
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
              <button
                onClick={() => { setShowModal('message'); setShowMenu(false); }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Отправить сообщение
              </button>
              <button
                onClick={() => { setShowModal('credits'); setShowMenu(false); }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
              >
                <Gift className="w-4 h-4" />
                Начислить токены
              </button>
              <button
                onClick={() => { setShowModal('tags'); setShowMenu(false); }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
              >
                <Tag className="w-4 h-4" />
                Управление тегами
              </button>
              <hr className="my-1" />
              <button
                onClick={handleToggleBlock}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 ${
                  user.is_blocked ? 'text-green-600' : 'text-red-600'
                }`}
              >
                <Ban className="w-4 h-4" />
                {user.is_blocked ? 'Разблокировать' : 'Заблокировать'}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Send Message Modal */}
      {showModal === 'message' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Отправить сообщение
              </h3>
              <button onClick={() => setShowModal(null)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Получатель: {user.first_name || user.username || `ID: ${user.telegram_id}`}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Формат</label>
                <select
                  value={parseMode}
                  onChange={(e) => setParseMode(e.target.value as 'HTML' | 'Markdown')}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                >
                  <option value="HTML">HTML</option>
                  <option value="Markdown">Markdown</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Сообщение</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm"
                  placeholder={parseMode === 'HTML' 
                    ? '<b>Жирный</b>, <i>курсив</i>, <code>код</code>'
                    : '*Жирный*, _курсив_, `код`'
                  }
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(null)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Отмена
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={loading || !message.trim()}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Отправка...' : 'Отправить'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Give Credits Modal */}
      {showModal === 'credits' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Начислить токены</h3>
              <button onClick={() => setShowModal(null)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Текущий баланс: {user.credits} токенов
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Количество токенов
                </label>
                <input
                  type="number"
                  value={creditsAmount}
                  onChange={(e) => setCreditsAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Введите число (можно отрицательное)"
                />
              </div>

              <div className="flex gap-2">
                {[10, 50, 100, 200].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setCreditsAmount(String(amount))}
                    className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm"
                  >
                    +{amount}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(null)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Отмена
                </button>
                <button
                  onClick={handleGiveCredits}
                  disabled={loading || !creditsAmount}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Сохранение...' : 'Начислить'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tags Modal */}
      {showModal === 'tags' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Управление тегами</h3>
              <button onClick={() => setShowModal(null)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTag()}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Новый тег"
                />
                <button
                  onClick={addTag}
                  className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Добавить
                </button>
              </div>

              <div className="flex flex-wrap gap-2 min-h-[60px] p-3 bg-gray-50 rounded-lg">
                {userTags.length === 0 ? (
                  <span className="text-gray-400 text-sm">Нет тегов</span>
                ) : (
                  userTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded flex items-center gap-1"
                    >
                      {tag}
                      <button onClick={() => removeTag(tag)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(null)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Отмена
                </button>
                <button
                  onClick={handleUpdateTags}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
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
