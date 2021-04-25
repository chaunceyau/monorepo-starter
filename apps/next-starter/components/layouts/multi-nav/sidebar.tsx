import React from 'react';
import { Link } from 'react-router-dom';
//
import { SidebarItem as ISidebarItem } from './menu';

export function SidebarNavigation(props: { items: Array<ISidebarItem> }) {
  return (
    <nav
      aria-label="Sidebar"
      className="hidden md:block md:flex-shrink-0 md:bg-gray-800 md:overflow-y-auto"
    >
      <div className="relative w-20 flex flex-col p-3 space-y-3">
        {props.items.map((item) => (
          <SidebarItem key={item.to} item={item} />
        ))}
      </div>
    </nav>
  );
}

export function SidebarItem({ item }: { item: ISidebarItem }) {
  const location = '/archive'; // uselcoation
  const itemActive = item.to === location;

  return (
    <Link
      to={item.to}
      className={`text-white flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg ${
        itemActive && 'bg-gray-900'
      }`}
    >
      <span className="sr-only">{item.label}</span>
      {/* @ts-ignore */}
      <item.icon />
    </Link>
  );
}
