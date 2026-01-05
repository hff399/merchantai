import { supabaseAdmin } from '@/lib/supabase';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { Plus, Smartphone, Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import AccountActions from './AccountActions';

async function getAccounts() {
  const { data } = await supabaseAdmin
    .from('outreach_accounts')
    .select('*')
    .order('created_at', { ascending: false });

  return data || [];
}

const statusConfig = {
  connected: { label: 'Подключён', icon: Wifi, color: 'text-green-600 bg-green-100' },
  disconnected: { label: 'Отключён', icon: WifiOff, color: 'text-gray-600 bg-gray-100' },
  banned: { label: 'Забанен', icon: AlertTriangle, color: 'text-red-600 bg-red-100' },
  limited: { label: 'Лимит', icon: AlertTriangle, color: 'text-yellow-600 bg-yellow-100' },
};

export default async function AccountsPage() {
  const accounts = await getAccounts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Telegram аккаунты</h1>
          <p className="text-gray-500">Аккаунты для аутрича</p>
        </div>

        <Link
          href="/outreach/accounts/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Добавить аккаунт
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        {accounts.length === 0 ? (
          <div className="p-12 text-center">
            <Smartphone className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Нет аккаунтов
            </h3>
            <p className="text-gray-500 mb-4">
              Добавьте Telegram аккаунты для аутрича
            </p>
            <Link
              href="/outreach/accounts/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Добавить аккаунт
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Аккаунт
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Статус
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Сегодня
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Всего
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Ответов
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {accounts.map((account: any) => {
                const status = statusConfig[account.status as keyof typeof statusConfig];
                const StatusIcon = status?.icon || WifiOff;

                return (
                  <tr key={account.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Smartphone className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {account.name || account.phone}
                          </p>
                          <p className="text-sm text-gray-500">{account.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-sm ${status?.color || 'bg-gray-100'}`}>
                        <StatusIcon className="w-4 h-4" />
                        {status?.label || account.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900">
                        {account.daily_messages_sent} / {account.daily_limit}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {account.total_messages_sent}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {account.total_replies}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <AccountActions account={account} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Как получить API ID и Hash?</h3>
        <ol className="list-decimal list-inside text-sm text-blue-800 space-y-1">
          <li>Перейдите на <a href="https://my.telegram.org" target="_blank" rel="noopener noreferrer" className="underline">my.telegram.org</a></li>
          <li>Войдите с номером телефона</li>
          <li>Выберите "API development tools"</li>
          <li>Создайте приложение (название любое)</li>
          <li>Скопируйте App api_id и App api_hash</li>
        </ol>
      </div>
    </div>
  );
}
