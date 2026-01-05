'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { MoreVertical, Send, Check, X, MessageSquare, UserCheck } from 'lucide-react';

interface Lead {
  id: string;
  telegram_id: number;
  username: string | null;
  status: string;
  dm_sent: boolean;
}

export default function LeadActions({ lead }: { lead: Lead }) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdateStatus = async (newStatus: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/outreach/leads/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: lead.id, status: newStatus }),
      });

      if (res.ok) {
        toast.success('Статус обновлён');
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

  const handleSendDM = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/outreach/leads/send-dm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: lead.id }),
      });

      if (res.ok) {
        toast.success('DM отправлен');
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.error || 'Ошибка');
      }
    } catch (error) {
      toast.error('Ошибка');
    } finally {
      setLoading(false);
      setShowMenu(false);
    }
  };

  return (
    <div className="relative flex-shrink-0">
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
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            {lead.username && (
              <a
                href={`https://t.me/${lead.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Открыть в Telegram
              </a>
            )}
            
            {!lead.dm_sent && (
              <button
                onClick={handleSendDM}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Отправить DM
              </button>
            )}

            <hr className="my-1" />

            <p className="px-4 py-1 text-xs text-gray-400 uppercase">Изменить статус</p>

            <button
              onClick={() => handleUpdateStatus('contacted')}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <Send className="w-4 h-4 text-yellow-500" />
              Связались
            </button>
            
            <button
              onClick={() => handleUpdateStatus('replied')}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-green-500" />
              Ответил
            </button>
            
            <button
              onClick={() => handleUpdateStatus('qualified')}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-purple-500" />
              Квалифицирован
            </button>
            
            <button
              onClick={() => handleUpdateStatus('converted')}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <Check className="w-4 h-4 text-emerald-500" />
              Конвертирован
            </button>
            
            <button
              onClick={() => handleUpdateStatus('rejected')}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600"
            >
              <X className="w-4 h-4" />
              Отклонить
            </button>
          </div>
        </>
      )}
    </div>
  );
}
