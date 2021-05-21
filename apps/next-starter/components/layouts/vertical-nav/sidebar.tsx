import Link, { LinkProps } from 'next/link';
//
import { useRouter } from 'next/router';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

interface VerticalNavigationLink extends Pick<LinkProps, 'href'> {
  label: string;
  icon?: any;
  current?: boolean;
}

interface VerticalNavigationSidebarProps {
  navLinks: Array<VerticalNavigationLink>;
}

export function VerticalNavigationSidebar(
  props: VerticalNavigationSidebarProps
) {
  const router = useRouter();
  return (
    <nav className="space-y-1 pr-12" aria-label="Sidebar">
      {props.navLinks.map((item) => {
        const active = item.href === router.pathname;
        return (
          <Link key={item.label} href={item.href}>
            <a
              className={classNames(
                active
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center px-4 py-2 text-sm font-medium rounded-md pr-16'
              )}
              aria-current={item.current ? 'page' : undefined}
            >
              <item.icon
                className={classNames(
                  active
                    ? 'text-white'
                    : 'text-gray-400 group-hover:text-gray-500',
                  'flex-shrink-0 -ml-1 mr-3 h-5 w-5 my-px'
                )}
                aria-hidden="true"
              />
              <span className="truncate">{item.label}</span>
            </a>
          </Link>
        );
      })}
    </nav>
  );
}
