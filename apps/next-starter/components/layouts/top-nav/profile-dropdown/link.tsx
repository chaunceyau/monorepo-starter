import { Menu } from '@headlessui/react';

const anchorClassNames = (active) => {
  let classNames = 'block px-4 py-2 text-sm text-gray-700';
  if (active) {
    classNames += ' bg-gray-100';
  }
  return classNames;
};

export function ProfileDropdownLink(props) {
  return (
    <Menu.Item key={props.label}>
      {({ active }) => (
        <a href={props.to} className={anchorClassNames(active)}>
          {props.label}
        </a>
      )}
    </Menu.Item>
  );
}
