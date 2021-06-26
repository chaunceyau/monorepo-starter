import React from 'react';
//
import {H1} from '@monorepo-starter/ui';
//
import {TopNavigationLayout} from 'apps/next-starter/components/layouts/top-nav';
import {SubscriptionPlanCard} from 'apps/next-starter/containers/account/subscription/plan-card';
import {requireSessionSSR} from 'apps/next-starter/util/misc';

export default function SubscriptionPlans() {
  return (
    <div className="space-y-6 w-full">
      <H1></H1>
      <div className="w-full flex justify-center space-x-8">
        <SubscriptionPlanCard
          name="Basic Subscription"
          description="fldasmfldmsa"
          perks={['25GB storage','25GB storage','25GB storage']}
          price={10}
          stripePriceId="stripeTodo:ChangeMe"
          variant="light"
        />
        <SubscriptionPlanCard
          name="Basic Subscription"
          description="fldasmfldmsa"
          perks={['25GB storage','25GB storage','25GB storage']}
          price={25}
          stripePriceId="stripeTodo:ChangeMe"
          variant="primary"
          mostPopular
        />
      </div>
    </div>
  );
}

SubscriptionPlans.getLayout = page => {
  return (
    <TopNavigationLayout
      title="Subscription Plans"
      session={page.props.session}
      router={null}
    >
      {page}
    </TopNavigationLayout>
  );
};

export const getServerSideProps = requireSessionSSR;