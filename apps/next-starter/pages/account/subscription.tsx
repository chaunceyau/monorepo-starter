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


export default function AccountSubscriptionPage() {
  return (
    <div className="space-y-6">
      <MySubscriptionCard />
      <Card
        title="Payment History"
        description="Information about your subscription and any associated charges."
      >
        <CardStack />
      </Card>
    </div>
  );
}

const Plans = props => {
  return (
    <Form onSubmit={() => {}} id="subscriptionPlan" styled={false}>
      <FormRadioGroup
        name="subscriptionPlan"
        label="Subscription Plans"
        options={[
          {id: '12', value: 'Basic Subscription Plan', caption: '$25/month'},
          {id: '13', value: 'Premium Subscription Plan', caption: '$50/month'},
        ]}
      />
      <FormButton buttonStyle="primary">Change Plan</FormButton>
    </Form>
  );
};

/* This example requires Tailwind CSS v2.0+ */
const items = [
  {id: '1'},
  {id: '2'},
  {id: '3'},
  // More items...
];

export function CardStack() {
  return (
    <div className="bg-gray-50 shadow overflow-hidden sm:rounded-md border">
      <ul className="divide-y divide-gray-200">
        {items.map(item => (
          <li
            key={item.id}
            className="px-4 py-3 sm:px-6 even:bg-gray-100 flex justify-between space-x-6 hover:bg-gray-200 cursor-pointer"
          >
            <span className="text-sm text-gray-600 flex-shrink-0">
              August 14, 2021
            </span>
            <span className="text-sm text-gray-600 truncate">
              $50.00 - Company Plus Subscription
            </span>
          </li>
        ))}
      </ul>
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
