import * as React from 'react';
import { Disclosure } from '@headlessui/react';
//
import { MainContent } from './main-content';
import { TopNavigationPageHeader } from './page-header';
import { TopNavigationItem } from './desktop/nav-item';
import { NotificationButton } from './desktop/notification-button';
import { ProfileDropdown } from './profile-dropdown';
import { MobileMenuBody, MobileMenuButton } from './mobile';
import Link from 'next/link';

export const navigation = [
  { to: '/', label: 'Dashboard' },
  { to: '/team', label: 'Team' },
  { to: '/projects', label: 'Projects' },
  { to: '/calendar', label: 'Calendar' },
];
export const profile = [
  { label: 'Your Profile', to: '/account' },
  { label: 'Settings', to: '/settings' },
];

export function TopNavigationLayout({
  children,
  session,
  router,
  title,
}: {
  children: React.ReactNode;
  session: any;
  router: any;
  title: string;
}) {
  return (
    <div className="h-screen bg-gray-100">
      <Disclosure as="nav" className="bg-indigo-600">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <Link href="/">
                    <a id="top-navigation-logo" className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg"
                        alt="Workflow"
                      />
                    </a>
                  </Link>
                  <LargerThanMobilePrimaryNav router={router} />
                </div>
                <LargerThanMobileRightNav session={session} />
                <div className="-mr-2 flex md:hidden">
                  <MobileMenuButton open={open} />
                </div>
              </div>
            </div>
            <MobileMenuBody />
          </>
        )}
      </Disclosure>

      <TopNavigationPageHeader title={title} />
      <MainContent children={children} />
    </div>
  );
}

function LargerThanMobileRightNav(props) {
  return (
    <div className="hidden md:block">
      <div className="ml-4 flex items-center md:ml-6">
        <NotificationButton />
        <ProfileDropdown session={props.session} profile={profile} />
      </div>
    </div>
  );
}

function LargerThanMobilePrimaryNav(props) {
  return (
    <div className="hidden md:block">
      <div className="ml-10 flex items-baseline space-x-4">
        {navigation.map((item) => (
          <TopNavigationItem key={item.to} {...item} router={props.router} />
        ))}
      </div>
    </div>
  );
}
