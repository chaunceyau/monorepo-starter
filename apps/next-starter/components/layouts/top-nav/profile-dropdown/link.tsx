import Link from 'next/link';
import { Menu } from '@headlessui/react';

export function ProfileDropdownLink(props) {
  return (
    <Menu.Item key={props.label}>
      <Link href={props.to}>
        <a
          className={'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'}
        >
          {props.label}
        </a>
      </Link>
    </Menu.Item>
  );
}
