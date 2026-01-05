'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { ArrowLeft, Plus, Upload } from 'lucide-react';

export default function NewGroupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'single' | 'bulk'>('single');

  // Single group form
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [category, setCategory] = useState('');
  const [memberCount, setMemberCount] = useState('');

  // Bulk import
  const [bulkData, setBulkData] = useState('');

  const handleAddSingle = async () => {
    if (!title.trim()) {
      toast.error('Введите название группы');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/outreach/groups/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          username: username || null,
          category: category || null,
          member_count: memberCount ? parseInt(memberCount) : null,
        }),
      });

      if (res.ok) {
        toast.success('Группа добавлена');
        router.push('/outreach/groups');
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

  const handleBulkImport = async () => {
    if (!bulkData.trim()) {
      toast.error('Введите данные для импорта');
      return;
    }

    setLoading(true);
    try {
      // Parse bulk data (format: title|username|category|members per line)
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

      if (res.ok) {
        const data = await res.json();
        toast.success(`Добавлено ${data.count} групп`);
        router.push('/outreach/groups');
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
    <div className="max-w-2xl">
      <div className="mb-6">
        <Link
          href="/outreach/groups"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад к группам
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Добавить группы</h1>
      </div>

      {/* Mode Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setMode('single')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              mode === 'single'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Одна группа
          </button>
          <button
            onClick={() => setMode('bulk')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${
              mode === 'bulk'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Массовый импорт
          </button>
        </div>

        <div className="p-6">
          {mode === 'single' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Название группы *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="WB Дизайнеры"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Username (без @)
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="wb_designers"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Категория
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="wb_designers, freelancers, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Количество участников
                </label>
                <input
                  type="number"
                  value={memberCount}
                  onChange={(e) => setMemberCount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="5000"
                />
              </div>

              <button
                onClick={handleAddSingle}
                disabled={loading || !title.trim()}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                {loading ? 'Добавление...' : 'Добавить группу'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Данные для импорта
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Формат: название|username|категория|участников (по одной группе на строку)
                </p>
                <textarea
                  value={bulkData}
                  onChange={(e) => setBulkData(e.target.value)}
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm"
                  placeholder={`WB Дизайнеры|wb_designers|wb_designers|5000
Фриланс Биржа|freelance_birja|freelancers|12000
Удалённая работа|remote_job|jobs|8000`}
                />
              </div>

              <button
                onClick={handleBulkImport}
                disabled={loading || !bulkData.trim()}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                {loading ? 'Импорт...' : 'Импортировать группы'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
