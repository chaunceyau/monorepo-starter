export interface NavigationLink {
  label: string;
  href: string;
  icon?: any;
}

export interface LayoutContext {
  primaryNavigationLinks: Array<NavigationLink>;
  accountPageNavigationLinks: Array<NavigationLink>;
  profileDropdownNavigationLinks: Array<NavigationLink>;
}
