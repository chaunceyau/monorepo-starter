import React from 'react';
//
import {UI_NAV_COMPONENT_LINKS} from 'apps/next-starter/util/routes/nav';
import {TopNavigationLayout} from 'apps/next-starter/components/layouts/top-nav';
import {TabNavigationLayout} from 'apps/next-starter/components/layouts/tab-nav';

export function AccountPagesLayout(props: {page: any, title: string}) {
  return (
    <TopNavigationLayout
      title={props.title || 'Account Settings'}
      session={props.page.props.session}
      router={null}
    >
      <TabNavigationLayout navLinks={UI_NAV_COMPONENT_LINKS.accountPageSubnav}>
        {props.page}
      </TabNavigationLayout>
    </TopNavigationLayout>
  );
}
