import React from 'react';
import { Menu, Transition } from '@headlessui/react';
//
import { ProfileDropdownLink } from './link';
import { ProfileDropdownSignout } from './sign-out';
import { ProfileDropdownCurrentUser } from './viewer-info';
import { useSession } from 'next-auth/client';

export function ProfileDropdown(props) {
  const [session] = useSession();
  React.useEffect(() => {
    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ query: `
        query {
          viewer {
            id
          }
        }` 
      })
      })
    .then(res => res.json())
    .then(res => console.log(res.data));
  }, []);
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
              {props.profile.map((item) => (
                <ProfileDropdownLink key={item.label} {...item} />
              ))}
              <ProfileDropdownSignout />
              <ProfileDropdownCurrentUser email={session?.user?.email} />
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
