'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { ArrowLeft, Plus, AlertCircle } from 'lucide-react';

export default function NewAccountPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [phone, setPhone] = useState('');
  const [apiId, setApiId] = useState('');
  const [apiHash, setApiHash] = useState('');
  const [name, setName] = useState('');
  const [dailyLimit, setDailyLimit] = useState('40');

  const handleSubmit = async () => {
    if (!phone || !apiId || !apiHash) {
      toast.error('Заполните все обязательные поля');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/outreach/accounts/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          api_id: apiId,
          api_hash: apiHash,
          name: name || null,
          daily_limit: parseInt(dailyLimit) || 40,
        }),
      });

      if (res.ok) {
        toast.success('Аккаунт добавлен. Требуется авторизация.');
        router.push('/outreach/accounts');
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

  return (
    <div className="max-w-lg">
      <div className="mb-6">
        <Link
          href="/outreach/accounts"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад к аккаунтам
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Добавить аккаунт</h1>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <p className="font-medium mb-1">Важно!</p>
            <p>
              Использование личных аккаунтов для массовой рассылки может привести 
              к бану. Рекомендуем использовать отдельные аккаунты для аутрича.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Название (для себя)
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg"
            placeholder="Рабочий аккаунт 1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Номер телефона *
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg"
            placeholder="+79001234567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            API ID *
          </label>
          <input
            type="text"
            value={apiId}
            onChange={(e) => setApiId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg"
            placeholder="12345678"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            API Hash *
          </label>
          <input
            type="text"
            value={apiHash}
            onChange={(e) => setApiHash(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono"
            placeholder="a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Дневной лимит сообщений
          </label>
          <input
            type="number"
            value={dailyLimit}
            onChange={(e) => setDailyLimit(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg"
            placeholder="40"
          />
          <p className="text-xs text-gray-500 mt-1">
            Рекомендуем не более 40 сообщений в день для нового аккаунта
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !phone || !apiId || !apiHash}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {loading ? 'Добавление...' : 'Добавить аккаунт'}
        </button>
      </div>
    </div>
  );
}
