import { UI_NAV_COMPONENT_LINKS } from 'apps/next-starter/util/routes/nav';
import {VerticalNavigationSidebar} from './sidebar';

interface SidebarNavLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface SidebarNavigationLayoutProps {
  children?: React.ReactNode | React.ReactNode[];
  navLinks: Array<SidebarNavLink>;
}

export function SidebarNavigationLayout(props: SidebarNavigationLayoutProps) {
  return (
    <div className="flex w-full flex-col md:flex-row space-y-8 md:space-y-0">
      <VerticalNavigationSidebar
        navLinks={UI_NAV_COMPONENT_LINKS.accountPageSubnav}
      />
      <div className="flex-grow">{props.children}</div>
    </div>
  );
}
