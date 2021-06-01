import React from 'react';
import { getSession } from 'next-auth/client';
import { HeartIcon } from '@heroicons/react/solid';
//
import { Button, Card, H1, H2 } from '@monorepo-starter/ui';
//
import { TopNavigationLayout } from 'apps/next-starter/components/layouts/top-nav';
import { ACCOUNT_PAGE_VERTICAL_NAVIGATION_LINKS } from 'apps/next-starter/util/routes/nav';
import { VerticalNavigationLayout } from 'apps/next-starter/components/layouts/vertical-nav';

export default function SubscriptionPlans() {
  return (
    <div className="space-y-6">
        <H1></H1>
    <div className="bg-gray-200">
<H2>fdsafds</H2>
    </div>
    </div>
  );
}

SubscriptionPlans.getLayout = page => {
  return (
    <TopNavigationLayout title="Subscription Plans" session={page.props.session} router={null}>
      <VerticalNavigationLayout
        navLinks={ACCOUNT_PAGE_VERTICAL_NAVIGATION_LINKS}
      >
        {page}
      </VerticalNavigationLayout>
    </TopNavigationLayout>
  )
}

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
