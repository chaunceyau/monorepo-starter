import React from 'react';
//
import { SidebarNavigation } from './sidebar';
import { SidebarItem as ISidebarItem, SidebarMenu } from './menu';

interface MultiNavLayoutProps {
  sidebarItems: Array<ISidebarItem>;
  logo: React.ReactNode;
  loading?: boolean;
  error?: string;
  children?: React.ReactNode | React.ReactNode[];
}

export function MultiNavLayout(props: MultiNavLayoutProps) {
  return (
    <div className="h-screen overflow-hidden bg-gray-100 flex flex-col">
      <SidebarMenu logo={props.logo} sidebarItems={props.sidebarItems} />
      <div className="min-h-0 flex-1 flex overflow-hidden">
        <SidebarNavigation items={props.sidebarItems} />
        <main className="min-w-0 flex-1 border-t border-gray-200 lg:flex p-4">
          {props.children}
        </main>
      </div>
    </div>
  );
}
