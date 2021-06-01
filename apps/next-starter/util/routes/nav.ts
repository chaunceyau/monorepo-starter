import { CashIcon, CogIcon, UserCircleIcon } from '@heroicons/react/outline';
//
import { ACCOUNT_ROUTES } from './';

export const PRIMARY_NAVIGATION_LINKS = [
  { to: `/`, label: `Dashboard` },
  { to: `/team`, label: `Team` },
];

export const PROFILE_DROPDOWN_LINKS = [
  { to: `/account`, label: `Your Profile` },
];

export const ACCOUNT_PAGE_VERTICAL_NAVIGATION_LINKS = [
  {
    label: 'Profile',
    href: ACCOUNT_ROUTES.ACCOUNT_PROFILE_PAGE,
    icon: UserCircleIcon,
  },
  {
    label: 'Subscription',
    href: ACCOUNT_ROUTES.ACCOUNT_SUBSCRIPTION_PAGE,
    icon: CashIcon,
  },
  {
    label: 'Settings',
    href: ACCOUNT_ROUTES.ACCOUNT_SETTINGS_PAGE,
    icon: CogIcon,
  },
];
