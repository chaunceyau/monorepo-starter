import { BellIcon } from '@heroicons/react/solid';
import React from 'react';

export function NotificationButton() {
  return (
    <button className="relative p-1 text-white hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
      <span className="sr-only">View notifications</span>
      <BellIcon className="h-6 w-6" aria-hidden="true" />
      <span className="absolute top-0 right-0 bg-red-600 rounded-full text-xs px-1">1</span>
    </button>
  );
}
