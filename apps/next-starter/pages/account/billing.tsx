import React from 'react';
import { getSession } from 'next-auth/client';
//
import { Button, Card, H2 } from '@monorepo-starter/ui';
//
import { TopNavigationLayout } from 'apps/next-starter/components/layouts/top-nav';
import { ACCOUNT_PAGE_VERTICAL_NAVIGATION_LINKS } from 'apps/next-starter/util/routes/nav';
import { VerticalNavigationLayout } from 'apps/next-starter/components/layouts/vertical-nav';
// geometric-zig-zag-bg

const BillingDetailCard = (props) => {
  return (
    <div className={`${props.backgroundClass} px-6 py-4 rounded-lg w-1/2`}>
      <h3 className={`${props.textVariant === 'dark' ? 'text-gray-600' : 'text-white'} mb-2`}>{props.topLine}</h3>
      <p className={`${props.textVariant === 'dark' ? 'text-gray-700' : 'text-white'} text-3xl font-bold`}>${props.amount / 100}<span className="text-xs">.00</span></p>
      <p className={`${props.textVariant === 'dark' ? 'text-gray-500' : 'text-white'} mb-3 mt-1 text-lg`}>{props.bottomLine}</p>
      {props.button}
    </div>
  )
}

export default function AccountBillingPage() {
  return (
    <div>
      <Card title="Subscription Information" description="Information about your subscription and any associated charges.">
        <div className="flex space-x-6">
          <BillingDetailCard backgroundClass="bg-gradient-to-br from-primary via-green-500 to-yellow-200"
            topLine="Current Subscription Plan"
            amount={2500}
            bottomLine="Company Plus"
            button={
              <Button buttonStyle="secondary">
                Change Plan
              </Button>
            }
          />
          <BillingDetailCard backgroundClass="bg-gradient-to-tr from-gray-200 to-gray-100"
            textVariant="dark"
            topLine="Next Payment"
            amount={5000}
            bottomLine="on May 15, 2020"
            button={
              <Button buttonStyle="primary">
                Manage Payments  
              </Button>
            }
          />
        </div>
        <H2 className="my-4">Payment History</H2>
      </Card>
    </div>
  );
}

AccountBillingPage.getLayout = page => {
  return (
    <TopNavigationLayout title="Account Settings" session={page.props.session} router={null}>
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
