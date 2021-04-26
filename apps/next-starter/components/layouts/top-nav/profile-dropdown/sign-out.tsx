import React from 'react';
import { Menu } from '@headlessui/react';
import { signOut } from 'next-auth/client';

export function ProfileDropdownSignout(props) {
  return (
    <Menu.Item>
      <button
        onClick={() => signOut()}
        type="button"
        className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
      >
        Sign Out
      </button>
    </Menu.Item>
  );
}
