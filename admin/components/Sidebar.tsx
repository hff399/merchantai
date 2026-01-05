'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Send,
  Target,
  Smartphone,
  Users2,
  UserPlus,
  Megaphone,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Дашборд', href: '/', icon: LayoutDashboard },
  { name: 'Пользователи', href: '/users', icon: Users },
  { name: 'Рассылки', href: '/broadcasts', icon: Send },
];

const outreachItems = [
  { name: 'Обзор', href: '/outreach', icon: Target },
  { name: 'Аккаунты', href: '/outreach/accounts', icon: Smartphone },
  { name: 'Группы', href: '/outreach/groups', icon: Users2 },
  { name: 'Кампании', href: '/outreach/campaigns', icon: Megaphone },
  { name: 'Лиды', href: '/outreach/leads', icon: UserPlus },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [outreachOpen, setOutreachOpen] = useState(pathname.startsWith('/outreach'));

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col min-h-screen">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">MerchantAI</h1>
        <p className="text-sm text-gray-500">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}

        {/* Outreach Section */}
        <div>
          <button
            onClick={() => setOutreachOpen(!outreachOpen)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname.startsWith('/outreach') ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5" />
              Аутрич
            </div>
            {outreachOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {outreachOpen && (
            <div className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-4">
              {outreachItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
