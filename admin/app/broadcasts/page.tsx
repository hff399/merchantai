import { supabaseAdmin } from '@/lib/supabase';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { Plus, Send, Clock, CheckCircle, XCircle } from 'lucide-react';

async function getBroadcasts() {
  const { data, error } = await supabaseAdmin
    .from('broadcasts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  return data || [];
}

const statusConfig = {
  draft: { label: 'Черновик', icon: Clock, color: 'text-gray-500 bg-gray-100' },
  scheduled: { label: 'Запланировано', icon: Clock, color: 'text-blue-500 bg-blue-100' },
  sending: { label: 'Отправка', icon: Send, color: 'text-yellow-500 bg-yellow-100' },
  completed: { label: 'Завершено', icon: CheckCircle, color: 'text-green-500 bg-green-100' },
  failed: { label: 'Ошибка', icon: XCircle, color: 'text-red-500 bg-red-100' },
};

export default async function BroadcastsPage() {
  const broadcasts = await getBroadcasts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Рассылки</h1>
          <p className="text-gray-500">Управление массовыми сообщениями</p>
        </div>

        <Link
          href="/broadcasts/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Новая рассылка
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        {broadcasts.length === 0 ? (
          <div className="p-12 text-center">
            <Send className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Нет рассылок
            </h3>
            <p className="text-gray-500 mb-4">
              Создайте первую рассылку для ваших пользователей
            </p>
            <Link
              href="/broadcasts/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Создать рассылку
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Название
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Статус
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Аудитория
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Отправлено
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Дата
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {broadcasts.map((broadcast: any) => {
                const status = statusConfig[broadcast.status as keyof typeof statusConfig];
                const StatusIcon = status.icon;

                return (
                  <tr key={broadcast.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">
                        {broadcast.title || 'Без названия'}
                      </p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">
                        {broadcast.message.substring(0, 50)}...
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-sm ${status.color}`}>
                        <StatusIcon className="w-4 h-4" />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {broadcast.target_type === 'all' && 'Все пользователи'}
                      {broadcast.target_type === 'segment' && `Теги: ${broadcast.target_tags?.join(', ')}`}
                      {broadcast.target_type === 'specific' && `${broadcast.target_user_ids?.length} получателей`}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-600">
                        {broadcast.sent_count} / {broadcast.total_recipients}
                      </span>
                      {broadcast.failed_count > 0 && (
                        <span className="text-red-500 ml-2">
                          ({broadcast.failed_count} ошибок)
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(broadcast.created_at)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
