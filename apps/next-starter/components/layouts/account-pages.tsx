import React from 'react';
//
import {TabNavigationLayout, TopNavigationLayout} from '@monorepo-starter/ui';
//
import {UI_NAV_COMPONENT_LINKS} from 'apps/next-starter/util/routes/nav';

// export function AccountPagesLayout(props: {page: any, title: string}) {
//   return (
//     <TopNavigationLayout
//       title={props.title || 'Account Settings'}
//       session={props.page.props.session}
//       router={null}
//     >
//       <TabNavigationLayout tabs={UI_NAV_COMPONENT_LINKS.accountPageSubnav}>
//         {props.page}
//       </TabNavigationLayout>
//     </TopNavigationLayout>
//   );
// }


export const BasicAccountSettingsLayout = page => {
  return (
    <TopNavigationLayout
      title="Account Settings"
      session={page.props.sessions}
      router={null}
    >
      <TabNavigationLayout tabs={UI_NAV_COMPONENT_LINKS.accountPageSubnav}>
        {page}
      </TabNavigationLayout>
    </TopNavigationLayout>
  );
};