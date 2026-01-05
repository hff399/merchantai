'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { MoreVertical, Trash2, RefreshCw, Settings } from 'lucide-react';

interface Account {
  id: string;
  name: string | null;
  phone: string;
  status: string;
}

export default function AccountActions({ account }: { account: Account }) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReconnect = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/outreach/accounts/reconnect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId: account.id }),
      });

      if (res.ok) {
        toast.success('Переподключение запущено');
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

  const handleDelete = async () => {
    if (!confirm(`Удалить аккаунт ${account.name || account.phone}?`)) return;

    setLoading(true);
    try {
      const res = await fetch('/api/outreach/accounts/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId: account.id }),
      });

      if (res.ok) {
        toast.success('Аккаунт удалён');
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

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 hover:bg-gray-100 rounded-lg"
        disabled={loading}
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
              onClick={handleReconnect}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Переподключить
            </button>
            <hr className="my-1" />
            <button
              onClick={handleDelete}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600"
            >
              <Trash2 className="w-4 h-4" />
              Удалить
            </button>
          </div>
        </>
      )}
    </div>
  );
}
