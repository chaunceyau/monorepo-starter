import React from 'react';
import {getSession} from 'next-auth/client';
// import { Transition } from '@headlessui/react';
//
import {Card, Form, FormButton, FormRadioGroup} from '@monorepo-starter/ui';
//
import {TopNavigationLayout} from 'apps/next-starter/components/layouts/top-nav';
import {ACCOUNT_PAGE_VERTICAL_NAVIGATION_LINKS} from 'apps/next-starter/util/routes/nav';
import {VerticalNavigationLayout} from 'apps/next-starter/components/layouts/vertical-nav';
import {MySubscriptionCard} from 'apps/next-starter/containers/account/subscription/my-subscription';
import { gql, useQuery } from '@apollo/client';
import { UpgradePlanBanner } from 'apps/next-starter/containers/account/subscription/upgrade-banner';


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
      {query.data && !query.data.subscription && (
        <UpgradePlanBanner />
      )}
      {!!query.data?.subscription && (
        <MySubscriptionCard query={query} />
      )}
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
      <VerticalNavigationLayout
        navLinks={ACCOUNT_PAGE_VERTICAL_NAVIGATION_LINKS}
      >
        {page}
      </VerticalNavigationLayout>
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
