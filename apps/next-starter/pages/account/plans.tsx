import React from 'react';
import {getSession} from 'next-auth/client';
//
import {H1, H2} from '@monorepo-starter/ui';
//
import {TopNavigationLayout} from 'apps/next-starter/components/layouts/top-nav';

export default function SubscriptionPlans() {
  return (
    <div className="space-y-6 w-full">
      <H1></H1>
      <div className="bg-gray-200">
        <H2>fdsafds</H2>
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

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
