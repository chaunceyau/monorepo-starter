import React from 'react';
import {gql, useQuery} from '@apollo/client';
//
import { requireSessionSSR } from 'apps/next-starter/util/misc';
import {TopNavigationLayout} from 'apps/next-starter/components/layouts/top-nav';
import {MySubscriptionCard} from 'apps/next-starter/containers/account/subscription/my-subscription';
import {UpgradePlanBanner} from 'apps/next-starter/containers/account/subscription/upgrade-banner';
import {TabNavigationLayout} from 'apps/next-starter/components/layouts/tab-nav';
import {ACCOUNT_PAGE_VERTICAL_NAVIGATION_LINKS} from 'apps/next-starter/util/routes/nav';

export default function AccountSubscriptionPage() {
  const query = useQuery(
    gql`
      query {
        subscription {
          id
        }
      }
    `
  );

  return (
    <div className="space-y-6">
      {query.data && !query.data.subscription && <UpgradePlanBanner />}
      {!!query.data?.subscription && <MySubscriptionCard query={query} />}
    </div>
  );
}

AccountSubscriptionPage.getLayout = page => {
  return (
    <TopNavigationLayout
      title="Account Settings"
      session={page.props.session}
      router={null}
    >
      <TabNavigationLayout navLinks={ACCOUNT_PAGE_VERTICAL_NAVIGATION_LINKS}>
        {page}
      </TabNavigationLayout>
    </TopNavigationLayout>
  );
};

export const getServerSideProps = requireSessionSSR;
