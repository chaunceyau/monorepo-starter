import React from 'react';
import { Menu } from '@headlessui/react';

export function ProfileDropdownCurrentUser(props: {
  email: string | undefined;
}) {
  return (
    <Menu.Item>
      <div className="block px-4 py-2 text-sm w-full text-left border-t mt-1">
        <p className="font-bold text-gray-700">Current User</p>
        <p className="text-gray-400 truncate">{props.email}</p>
      </div>
    </Menu.Item>
  );
}
