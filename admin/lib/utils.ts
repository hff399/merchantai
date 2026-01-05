import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return format(new Date(date), 'dd.MM.yyyy HH:mm', { locale: ru });
}

export function formatDateShort(date: string | Date): string {
  return format(new Date(date), 'dd.MM.yyyy', { locale: ru });
}

export function formatRelativeTime(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ru });
}

export function formatCurrency(amount: number, currency = 'RUB'): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ru-RU').format(num);
}

// Generate referral link
export function generateReferralLink(referralCode: string, botUsername: string): string {
  return `https://t.me/${botUsername}?start=ref_${referralCode}`;
}

// Generate UTM link
export function generateUtmLink(
  botUsername: string,
  source: string,
  campaign?: string,
  medium?: string
): string {
  const params = [`utm_source=${source}`];
  if (campaign) params.push(`utm_campaign=${campaign}`);
  if (medium) params.push(`utm_medium=${medium}`);
  
  return `https://t.me/${botUsername}?start=${params.join('__')}`;
}
