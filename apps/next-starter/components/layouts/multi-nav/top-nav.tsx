import React from 'react';
import { LayoutSearchBar } from '../search';

export function SidebarTopNavigation() {
  return (
    <div className="hidden md:min-w-0 md:flex-1 md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1 px-8">
        <LayoutSearchBar />
      </div>
      <div className="ml-10 pr-4 flex-shrink-0 flex items-center space-x-10">
        <nav aria-label="Global" className="flex space-x-10">
          <TopRightNavigationLink to="/inboxes" label="Inboxes" />
          <TopRightNavigationLink to="/reporting" label="Reporting" />
          <TopRightNavigationLink to="/settings" label="Settings" />
        </nav>
        <div className="flex items-center space-x-8">
          <span className="inline-flex">
            <a
              href="#"
              className="-mx-1 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">View notifications</span>
              {/* <!-- Heroicon name: outline/bell --> */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

function TopRightNavigationLink(props: { to: string; label: string }) {
  return (
    <a href="#" className="text-sm font-medium text-gray-900">
      Inboxes
    </a>
  );
}
