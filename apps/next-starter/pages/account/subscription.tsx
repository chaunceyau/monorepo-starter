import React from 'react';
import {gql, useQuery} from '@apollo/client';
//
import {requireSessionSSR} from 'apps/next-starter/util/misc';
import {MySubscriptionCard} from 'apps/next-starter/containers/account/subscription/my-subscription';
import {UpgradePlanBanner} from 'apps/next-starter/containers/account/subscription/upgrade-banner';
import {BasicAccountSettingsLayout} from 'apps/next-starter/components/layouts/account-pages';

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

export const getServerSideProps = requireSessionSSR;

AccountSubscriptionPage.getLayout = BasicAccountSettingsLayout;