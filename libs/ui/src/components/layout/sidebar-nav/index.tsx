import {NavigationLink} from '../types';
import {VerticalNavigationSidebar} from './sidebar';

interface SidebarNavigationLayoutProps {
  children?: React.ReactNode | React.ReactNode[];
  navLinks: Array<NavigationLink>;
}

export function SidebarNavigationLayout(props: SidebarNavigationLayoutProps) {
  return (
    <div className="flex w-full flex-col md:flex-row space-y-8 md:space-y-0">
      <VerticalNavigationSidebar
        navLinks={props.navLinks}
      />
      <div className="flex-grow">{props.children}</div>
    </div>
  );
}
