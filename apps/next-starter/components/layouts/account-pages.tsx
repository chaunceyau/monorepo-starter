import React from 'react';
//
import {TabNavigationLayout, TopNavigationLayout} from '@monorepo-starter/ui';
//
import {UI_APP_NAVIGATION} from 'apps/next-starter/util/routes/nav';

export const BasicAccountSettingsLayout = page => {
  return (
    <TopNavigationLayout
      title="Account Settings"
      session={page.props.sessions}
      router={null}
    >
      <TabNavigationLayout tabs={UI_APP_NAVIGATION.accountPageNavigationLinks}>
        {page}
      </TabNavigationLayout>
    </TopNavigationLayout>
  );
};