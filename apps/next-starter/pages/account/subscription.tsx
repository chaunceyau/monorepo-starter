import React from 'react';
import {getSession} from 'next-auth/client';
import {gql, useLazyQuery} from '@apollo/client';
import {Transition} from '@headlessui/react';
// import { Transition } from '@headlessui/react';
//
import {Button, Card, Form, FormButton, FormRadioGroup} from '@monorepo-starter/ui';
//
import {TopNavigationLayout} from 'apps/next-starter/components/layouts/top-nav';
import {ACCOUNT_PAGE_VERTICAL_NAVIGATION_LINKS} from 'apps/next-starter/util/routes/nav';
import {VerticalNavigationLayout} from 'apps/next-starter/components/layouts/vertical-nav';
import {Anchor} from 'apps/next-starter/components/shared/anchor';

const BillingDetailCard = props => {
  return (
    <div
      className={`${props.backgroundClass} px-6 py-4 rounded-lg w-1/2 mb-2 hmme`}
    >
      <h3
        className={`${
          props.textVariant === 'dark' ? 'text-gray-600' : 'text-white'
        } mb-2`}
      >
        {props.topLine}
      </h3>
      <p
        className={`${
          props.textVariant === 'dark' ? 'text-gray-700' : 'text-white'
        } text-3xl font-bold`}
      >
        ${props.amount / 100}
        <span className="text-xs">.00</span>
      </p>
      <p
        className={`${
          props.textVariant === 'dark' ? 'text-gray-500' : 'text-white'
        } mb-3 mt-1 text-lg`}
      >
        {props.bottomLine}
      </p>
      {props.callToAction}
    </div>
  );
};

export default function AccountSubscriptionPage() {
  const [commit, {data, loading}] = useLazyQuery(gql`query { stripePortalSession }`);
  
  React.useEffect(() => {
    if (data?.stripePortalSession) {
      window.location.replace(data.stripePortalSession)
    }
  }, [data])

  return (
    <div className="space-y-6">
      <Card
        title="Subscription Information"
        description="Information about your subscription and any associated charges."
      >
        <div className="flex space-x-6">
          <BillingDetailCard
            backgroundClass="bg-gradient-to-br from-primary via-green-500 to-yellow-200"
            topLine="Current Subscription Plan"
            amount={2500}
            bottomLine="Company Plus"
            callToAction={
              <Button
                loading={loading}
                onClick={() => commit()}
                buttonStyle="secondary"
              >
                Change Plan
              </Button>
            }
          />
          <BillingDetailCard
            backgroundClass="bg-gradient-to-tr from-gray-200 to-gray-100"
            textVariant="dark"
            topLine="Next Payment"
            amount={5000}
            bottomLine="on May 15, 2020"
            callToAction={
              <Anchor href="/test" variant="button" label="Manage Payments" />
            }
          />
        </div>
      </Card>
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
