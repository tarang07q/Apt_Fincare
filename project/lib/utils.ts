import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAmount(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formUrlQuery({
  params,
  key,
  value,
}: {
  params: string;
  key: string;
  value: string;
}): string {
  const currentUrl = new URLSearchParams(params);
  currentUrl.set(key, value);
  return `?${currentUrl.toString()}`;
}

export function encryptId(id: string): string {
  // This is a simple mock encryption for demo purposes
  // In a real app, use a proper encryption method
  return btoa(id);
}

export function decryptId(encryptedId: string): string {
  // This is a simple mock decryption for demo purposes
  // In a real app, use a proper decryption method
  return atob(encryptedId);
}