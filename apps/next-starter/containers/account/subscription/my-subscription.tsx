import React from 'react';
import {gql, useLazyQuery, useQuery} from '@apollo/client';
//
import {Card, Button} from '@monorepo-starter/ui';
//
import {BillingDetailCard} from './detail-card';
import {Anchor} from 'apps/next-starter/components/shared/anchor';

export function MySubscriptionCard() {
  const subscriptionQuery = useQuery(
    gql`
      query {
        subscription {
          id
        }
      }
    `
  );
  return (
    <Card
      title="Subscription Information"
      description="Information about your subscription and any associated charges."
    >
      <ActiveSubscriptionCards subscription={subscriptionQuery.data?.subscription} />
    </Card>
  );
}

interface ActiveSubscriptionCardsProps {
  subscription: any
}

function ActiveSubscriptionCards(props: ActiveSubscriptionCardsProps) {
  const [commit, portalQuery] = useLazyQuery(
    gql`
      query {
        stripePortalSession
      }
    `
  );

  React.useEffect(() => {
    if (portalQuery.data?.stripePortalSession) {
      window.location.replace(portalQuery.data.stripePortalSession);
    }
  }, [portalQuery.data]);

  return (
    <div className="flex space-x-6">
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
      <BillingDetailCard
        backgroundClass="bg-gradient-to-br from-primary via-green-500 to-yellow-200"
        topLine="Subscription Plan"
        amount={2500}
        bottomLine="Company Plus"
        callToAction={
          <Button
            loading={portalQuery.loading}
            onClick={() => commit()}
            buttonStyle="secondary"
          >
            Change Plan
          </Button>
        }
      />
    </div>
  );
}
