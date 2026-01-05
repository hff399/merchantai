'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Send, Users, Tag, User, ArrowLeft, Eye } from 'lucide-react';
import Link from 'next/link';

export default function NewBroadcastPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [recipientCount, setRecipientCount] = useState<number | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [parseMode, setParseMode] = useState<'HTML' | 'Markdown'>('HTML');
  const [targetType, setTargetType] = useState<'all' | 'segment' | 'specific'>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  // Load available tags
  useEffect(() => {
    fetch('/api/broadcasts/tags')
      .then(res => res.json())
      .then(data => setAvailableTags(data.tags || []));
  }, []);

  // Calculate recipients
  useEffect(() => {
    const params = new URLSearchParams({
      targetType,
      tags: selectedTags.join(','),
    });

    fetch(`/api/broadcasts/count?${params}`)
      .then(res => res.json())
      .then(data => setRecipientCount(data.count));
  }, [targetType, selectedTags]);

  const handleSubmit = async (send: boolean) => {
    if (!message.trim()) {
      toast.error('Введите текст сообщения');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/broadcasts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          message,
          parseMode,
          targetType,
          targetTags: selectedTags,
          sendNow: send,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(send ? 'Рассылка запущена' : 'Черновик сохранён');
        router.push('/broadcasts');
      } else {
        toast.error(data.error || 'Ошибка');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <Link
          href="/broadcasts"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад к рассылкам
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Новая рассылка</h1>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Название (для себя)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                placeholder="Например: Новогодняя акция"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Формат сообщения
              </label>
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
              <label className="block text-sm font-medium mb-1">
                Текст сообщения
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={10}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm"
                placeholder={parseMode === 'HTML'
                  ? `<b>Заголовок</b>\n\nТекст сообщения\n\n<i>Курсив</i>, <code>код</code>\n<a href="url">Ссылка</a>`
                  : `**Заголовок**\n\nТекст сообщения\n\n_Курсив_, \`код\`\n[Ссылка](url)`
                }
              />
              <p className="text-xs text-gray-500 mt-1">
                {parseMode === 'HTML' 
                  ? 'Поддерживается: <b>, <i>, <code>, <pre>, <a href="">'
                  : 'Поддерживается: **жирный**, _курсив_, `код`, [ссылка](url)'
                }
              </p>
            </div>
          </div>

          {/* Target Audience */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h3 className="font-semibold text-gray-900">Аудитория</h3>

            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="target"
                  checked={targetType === 'all'}
                  onChange={() => setTargetType('all')}
                  className="w-4 h-4 text-blue-600"
                />
                <Users className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">Все пользователи</p>
                  <p className="text-sm text-gray-500">Отправить всем активным пользователям</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="target"
                  checked={targetType === 'segment'}
                  onChange={() => setTargetType('segment')}
                  className="w-4 h-4 text-blue-600"
                />
                <Tag className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">По тегам</p>
                  <p className="text-sm text-gray-500">Выбрать пользователей с определёнными тегами</p>
                </div>
              </label>
            </div>

            {targetType === 'segment' && (
              <div className="pl-10">
                <label className="block text-sm font-medium mb-2">Выберите теги</label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.length === 0 ? (
                    <p className="text-sm text-gray-500">Нет доступных тегов</p>
                  ) : (
                    availableTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          if (selectedTags.includes(tag)) {
                            setSelectedTags(selectedTags.filter(t => t !== tag));
                          } else {
                            setSelectedTags([...selectedTags, tag]);
                          }
                        }}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          selectedTags.includes(tag)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recipients Count */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Получателей</p>
              <p className="text-3xl font-bold text-gray-900">
                {recipientCount !== null ? recipientCount : '...'}
              </p>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Предпросмотр</h3>
              <button
                onClick={() => setPreview(!preview)}
                className="text-blue-600 text-sm hover:underline flex items-center gap-1"
              >
                <Eye className="w-4 h-4" />
                {preview ? 'Скрыть' : 'Показать'}
              </button>
            </div>

            {preview && (
              <div className="bg-gray-100 rounded-lg p-4">
                <div 
                  className="text-sm whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ 
                    __html: parseMode === 'HTML' 
                      ? message 
                      : message
                          .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
                          .replace(/_(.*?)_/g, '<i>$1</i>')
                          .replace(/`(.*?)`/g, '<code>$1</code>')
                  }}
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => handleSubmit(true)}
              disabled={loading || !message.trim()}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              {loading ? 'Отправка...' : 'Отправить сейчас'}
            </button>

            <button
              onClick={() => handleSubmit(false)}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Сохранить черновик
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
