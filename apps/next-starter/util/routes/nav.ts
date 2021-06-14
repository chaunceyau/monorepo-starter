import {CashIcon, CogIcon, UserCircleIcon} from '@heroicons/react/outline';
//
import {routes} from '@monorepo-starter/utils';

export const PRIMARY_NAVIGATION_LINKS = [
  {to: `/`, label: `Dashboard`},
  {to: `/team`, label: `Team`},
];

export const PROFILE_DROPDOWN_LINKS = [
  {to: routes.client.account.default, label: `Your Profile`},
  {to: routes.client.logout, label: `Logout`},
];

export const ACCOUNT_PAGE_VERTICAL_NAVIGATION_LINKS = [
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
