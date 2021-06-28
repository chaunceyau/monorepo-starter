import * as React from 'react';
import Link from 'next/link';
import {BellIcon} from '@heroicons/react/solid';
import {Disclosure, Transition} from '@headlessui/react';
//
import {NavigationLink} from '../../types';

interface TopNavigationMobileMenuProps {
  primaryNavigationLinks: Array<NavigationLink>;
  profileDropdownNavigationLinks: Array<NavigationLink>;
}

export function TopNavigationMobileMenu(props: TopNavigationMobileMenuProps) {
  return (
    <Disclosure.Panel className="md:hidden">
      {({open}) => {
        return (
          <Transition
            show={open}
            enter="ease-out duration-100"
            enterFrom="transform opacity-0 scale-50"
            enterTo="transform opacity-100 scale-100"
            leave="ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            as={React.Fragment}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* todo: fix itemIdx */}
              {props.primaryNavigationLinks.map((item, itemIdx) =>
                itemIdx === 0 ? (
                  <React.Fragment key={item.label}>
                    {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                    <Link href={item.href}>
                      <a className="bg-gray-800 bg-opacity-75 text-white block px-3 py-2 rounded-md text-base font-medium">
                        {item.label}
                      </a>
                    </Link>
                  </React.Fragment>
                ) : (
                  <Link href={item.href} key={item.label}>
                    <a className="text-gray-200 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                      {item.label}
                    </a>
                  </Link>
                )
              )}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200 border-opacity-25">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-200">
                    Tom Cook
                  </div>
                  <div className="text-sm font-medium text-gray-200">
                    tom@example.com
                  </div>
                </div>
                <button className="ml-auto flex-shrink-0 p-1 rounded-full text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 px-2 space-y-1">
                {/* todo: profile items again */}
                {props.profileDropdownNavigationLinks.map(item => (
                  <Link key={item.label} href={item.href}>
                    <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-white hover:bg-gray-700">
                      {item.label}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </Transition>
        );
      }}
    </Disclosure.Panel>
  );
}
