import { Disclosure } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React from 'react';
import { navigation, profile } from '..';

export function MobileMenuBody(props) {
  return (
    <Disclosure.Panel className="md:hidden">
      <MobileMenuPrimaryLinks />
      <div className="pt-4 pb-3 border-t border-indigo-700">
        <MobileMenuUserLinks />
        <MobileMenuViewer />
      </div>
    </Disclosure.Panel>
  );
}

function MobileMenuPrimaryLinks(props) {
  return (
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
  );
}
function MobileMenuUserLinks(props) {
  return (
    <div className="px-2 space-y-1">
      {profile.map((item) => (
        <Link key={item.label} href={item.to}>
          <a className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75">
            {item.label}
          </a>
        </Link>
      ))}
    </div>
  );
}

function MobileMenuViewer(props) {
  return (
    <div className="flex items-center px-5 pt-4">
      <div className="flex-shrink-0">
        <img
          className="h-10 w-10 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
      <div className="ml-3">
        <div className="text-base font-medium text-white">Tom Cook</div>
        <div className="text-sm font-medium text-indigo-300">
          tom@example.com
        </div>
      </div>
      <button className="ml-auto bg-indigo-600 flex-shrink-0 p-1 rounded-full text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
}

export function MobileMenuButton(props) {
  return (
    <Disclosure.Button className="bg-indigo-600 inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
      <span className="sr-only">Open main menu</span>
      {props.open ? (
        <XIcon className="block h-6 w-6" aria-hidden="true" />
      ) : (
        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
      )}
    </Disclosure.Button>
  );
}
