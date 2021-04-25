import * as React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
//
import { TopNavigationPageHeader } from './page-header';

const navigation = [
  { to: '/', label: 'Dashboard' },
  { to: '/team', label: 'Team' },
  { to: '/projects', label: 'Projects' },
  { to: '/calendar', label: 'Calendar' },
];
const profile = ['Your Profile', 'Settings', 'Sign out'];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function TopNavigationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen">
      <Disclosure as="nav" className="bg-indigo-600">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div id="top-navigation-logo" className="flex-shrink-0">
                    <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg"
                      alt="Workflow"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <TopNavigationItem key={item.to} {...item} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <NotificationButton />
                    {/* Profile dropdown */}
                    <ProfileDropdown />
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-indigo-600 inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item, itemIdx) =>
                  itemIdx === 0 ? (
                    <React.Fragment key={item.to}>
                      {/* Current: "bg-indigo-700 text-white", Default: "text-white hover:bg-indigo-500 hover:bg-opacity-75" */}
                      <Link href={`/${item.to}`} key={item.to}>
                        <a className="bg-indigo-700 text-white block px-3 py-2 rounded-md text-base font-medium">
                          {item.label}
                        </a>
                      </Link>
                    </React.Fragment>
                  ) : (
                    <Link href={`/${item.to}`} key={item.to}>
                      <a className="text-white hover:bg-indigo-500 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium">
                        {item.label}
                      </a>
                    </Link>
                  )
                )}
              </div>
              <div className="pt-4 pb-3 border-t border-indigo-700">
                <div className="px-2 space-y-1">
                  {profile.map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75"
                    >
                      {item}
                    </a>
                  ))}
                </div>
                <div className="flex items-center px-5 pt-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      Tom Cook
                    </div>
                    <div className="text-sm font-medium text-indigo-300">
                      tom@example.com
                    </div>
                  </div>
                  <button className="ml-auto bg-indigo-600 flex-shrink-0 p-1 rounded-full text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <TopNavigationPageHeader title="Dashboard?" />
      <MainContent children={children} />
    </div>
  );
}

function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-gray-100 h-full">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </main>
  );
}

export function TopNavigationItem(props) {
  const router = useRouter();
  const match = router.pathname === props.href;
  return match ? (
    <React.Fragment>
      {/* Current: "bg-indigo-700 text-white", Default: "text-white hover:bg-indigo-500 hover:bg-opacity-75" */}
      <Link key={props.to} href={props.to}>
        <a className="bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium">
          {props.label}
        </a>
      </Link>
    </React.Fragment>
  ) : (
    <Link href={props.to}>
      <a className="text-white hover:bg-indigo-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium">
        {props.label}
      </a>
    </Link>
  );
}

function ProfileDropdown() {
  return (
    <Menu as="div" className="ml-3 relative">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="max-w-xs bg-indigo-600 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </Menu.Button>
          </div>
          <Transition
            show={open}
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {profile.map((item) => (
                <Menu.Item key={item}>
                  {({ active }) => (
                    <button
                      onClick={() => {
                        signOut();
                      }}
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700 w-full text-left'
                      )}
                    >
                      {item}
                    </button>
                  )}
                  {/* {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      Your Profile
                    </a>
                  )} */}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}

function NotificationButton() {
  return (
    <button className="p-1 bg-indigo-600 rounded-full text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
      <span className="sr-only">View notifications</span>
      <BellIcon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
}
