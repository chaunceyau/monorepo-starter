import React from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
// 
import {conditionallyConcatClassNames} from '@monorepo-starter/utils';
// 
import {NavigationLink} from '../types';

interface TabNavigationLayoutProps {
  children?: React.ReactNode | React.ReactNode[];
  tabs: Array<NavigationLink>;
}

export function TabNavigationLayout(props: TabNavigationLayoutProps) {
  const router = useRouter();

  return (
    <div className="-mt-4 flex w-full flex-col space-y-8 md:space-y-0 max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
          >
            {props.tabs.map(tab => (
              <option key={tab.label}>{tab.label}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {props.tabs.map(tab => {
                const active = tab.href === router.pathname;
                return (
                  <Link key={tab.label} href={tab.href}>
                    <a
                      className={conditionallyConcatClassNames(
                        active
                          ? 'border-primary text-primary'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                        'whitespace-nowrap py-4 pl-3 pr-4 border-b-2 font-medium text-sm flex items-center'
                      )}
                      aria-current={active ? 'page' : undefined}
                    >
                        <tab.icon className="h-4 mr-2" />
                        {tab.label}
                    </a>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex-grow">{props.children}</div>
    </div>
  );
}
