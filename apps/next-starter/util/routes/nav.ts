import {CashIcon, CogIcon, UserCircleIcon} from '@heroicons/react/outline';
//
import {routes} from '@monorepo-starter/utils';
import {LayoutContext, NavigationLink} from 'libs/ui/src/components/layout/types';

const _PRIMARY_NAVIGATION_LINKS: Array<NavigationLink> = [
  {href: `/`, label: `Dashboard`},
  {href: `/team`, label: `Team`},
];

const _PROFILE_DROPDOWN_NAVIGATION_LINKS: Array<NavigationLink> = [
  {href: routes.client.account.default, label: `Your Profile`},
  {href: routes.client.logout, label: `Logout`},
];

const _ACCOUNT_PAGE_NAVIGATION_LINKS: Array<NavigationLink> = [
  {
    label: 'Profile',
    href: routes.client.account.default,
    icon: UserCircleIcon,
  },
  {
    label: 'Subscription',
    href: routes.client.account.billing,
    icon: CashIcon,
  },
  {
    label: 'Settings',
    href: routes.client.account.settings,
    icon: CogIcon,
  },
];

/**
 * Links in navigation components (e.g. top nav, sidebar nav, etc.)
 */
export const UI_APP_NAVIGATION: LayoutContext = {
  primaryNavigationLinks: _PRIMARY_NAVIGATION_LINKS,
  accountPageNavigationLinks: _ACCOUNT_PAGE_NAVIGATION_LINKS,
  profileDropdownNavigationLinks: _PROFILE_DROPDOWN_NAVIGATION_LINKS,
};
