import { ACCOUNT_PAGE_VERTICAL_NAVIGATION_LINKS } from 'apps/next-starter/util/routes/nav';
import { VerticalNavigationSidebar } from './sidebar';

interface SidebarNavLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface VerticalNavigationLayoutProps {
  children?: React.ReactNode | React.ReactNode[];
  navLinks: Array<SidebarNavLink>;
}

export function VerticalNavigationLayout(props: VerticalNavigationLayoutProps) {
  return (
    <div className="flex">
      <VerticalNavigationSidebar
        navLinks={ACCOUNT_PAGE_VERTICAL_NAVIGATION_LINKS}
      />
      <div>{props.children}</div>
    </div>
  );
}
