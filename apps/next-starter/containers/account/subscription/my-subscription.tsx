import React from 'react';
import {gql, OperationVariables, QueryResult, useLazyQuery, useQuery} from '@apollo/client';
//
import {Card, Button} from '@monorepo-starter/ui';
//
import {BillingDetailCard} from './detail-card';
import {Anchor} from 'apps/next-starter/components/shared/anchor';

interface MySubscriptionCard {
  query: QueryResult<any, OperationVariables>
}

export function MySubscriptionCard(props: MySubscriptionCard) {
  return (
    <Card title="Subscription Information">
      <ActiveSubscriptionCards
        subscription={props.query.data?.subscription}
      />
    </Card>
  );
}

interface ActiveSubscriptionCardsProps {
  subscription: any;
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
    <div className="flex space-x-6 -mt-2">
      <div className="w-full flex justify-between">
        <div className="w-full">
          <div className="flex space-x-4 lg:space-x-6">
            {props.subscription ? (
              <>
                <BillingDetailCard
                  backgroundClass="bg-gradient-to-tr from-gray-200 to-gray-100"
                  textVariant="dark"
                  topLine="Next Payment"
                  amount={5000}
                  bottomLine="on May 15, 2020"
                  callToAction={
                    <Anchor
                      href="/test"
                      variant="button"
                      label="Manage Payments"
                    />
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
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

// (
//   <>
//     <SubscriptionPlanCard
//       name={'Basic Plan'}
//       perks={['perk 1', 'perk 2']}
//       price={2500}
//       stripePriceId={'fake_stripe_id'}
//       variant="light"
//     />
//     {/* <SubscriptionPlanCard
//       name={'Premium Plan'}
//       perks={['perk 1', 'perk 2', 'perk 3']}
//       price={2500}
//       stripePriceId={'fake_stripe_id'}
//       variant="primary"
//     /> */}
//   </>
// )