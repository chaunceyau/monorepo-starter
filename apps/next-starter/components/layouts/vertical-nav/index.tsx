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
    <div className="flex w-full flex-col md:flex-row space-y-8 md:space-y-0">
      <VerticalNavigationSidebar
        navLinks={ACCOUNT_PAGE_VERTICAL_NAVIGATION_LINKS}
      />
      <div className="flex-grow">{props.children}</div>
    </div>
  );
}
