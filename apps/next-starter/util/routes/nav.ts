import {CashIcon, CogIcon, UserCircleIcon} from '@heroicons/react/outline';
//
import {routes} from '@monorepo-starter/utils';

const _PRIMARY_NAVIGATION_LINKS = [
  {to: `/`, label: `Dashboard`},
  {to: `/team`, label: `Team`},
];

const _PROFILE_DROPDOWN_LINKS = [
  {to: routes.client.account.default, label: `Your Profile`},
  {to: routes.client.logout, label: `Logout`},
];

const _ACCOUNT_PAGE_SIDEBAR_NAVIGATION_LINKS = [
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
export const UI_NAV_COMPONENT_LINKS = {
  primaryNavbar: _PRIMARY_NAVIGATION_LINKS,
  profileDropdown: _PROFILE_DROPDOWN_LINKS,
  accountPageSubnav: _ACCOUNT_PAGE_SIDEBAR_NAVIGATION_LINKS,
};
