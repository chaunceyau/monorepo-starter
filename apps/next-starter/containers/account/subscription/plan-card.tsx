import React from 'react';
import {Button} from '@monorepo-starter/ui';
import {gql, useMutation} from '@apollo/client';
import {CheckCircleIcon, CheckIcon} from '@heroicons/react/solid';

interface SubscriptionPlanCardProps {
  name: string;
  perks: string[];
  price: number;
  mostPopular?: boolean;
  description: string;
  stripePriceId: string;
  variant: 'light' | 'primary';
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function SubscriptionPlanCard(props: SubscriptionPlanCardProps) {
  const {
    wrapperClass,
    nameH4Class,
    perkPClass,
    buttonClass,
  } = getSubscriptionPlanCardCss(props);

  const [getStripeSession, {}] = useMutation(gql`
    mutation StripeCheckoutSession($input: StripeCheckoutSessionInput) {
      stripeCheckoutSession(input: $input) {
        url
      }
    }
  `);


  return (
   
      <div
        key={props.name}
        className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col flex-1 max-w-xl"
      >
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">{props.name}</h3>
          {props.mostPopular ? (
            <p className="absolute top-0 py-1.5 px-4 bg-primary rounded-full text-xs font-semibold uppercase tracking-wide text-white transform -translate-y-1/2">
              Most popular
            </p>
          ) : null}
          <p className="mt-4 flex items-baseline text-gray-900">
            <span className="text-5xl font-extrabold tracking-tight">${props.price}</span>
            <span className="ml-1 text-xl font-semibold">per month</span>
          </p>
          <p className="mt-6 text-gray-500">{props.description}</p>

          {/* Feature list */}
          <ul role="list" className="mt-6 mb-4 space-y-5">
            {props.perks.map((feature) => (
              <li key={feature} className="flex">
                <CheckIcon className="flex-shrink-0 w-6 h-6 text-primary" aria-hidden="true" />
                <span className="ml-3 text-gray-500">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <Button
           fluid
           loading={false}
           onClick={() => getStripeSession({ variables: { input: { plan: 'PREMIUM_MONTHLY'  } } })}
           buttonStyle={props.variant === 'light' ? 'secondary' : 'primary'}
           className={buttonClass}
          >
           Upgrade Account
       </Button>
      </div>
  );
  // <div className={wrapperClass}>
  //   <h4 className={nameH4Class}>
  //     {props.name}
  //   </h4>
  //   {props.perks.map(perk => (
  //     <p
  //       key={perk}
  //       className={perkPClass}
  //     >
  //       <CheckCircleIcon className="h-4 mr-2" /> {perk}
  //     </p>
  //   ))}
  //   <div className="flex-grow flex items-end">
  //     <Button
  //         fluid
  //         loading={false}
  //         onClick={() => getStripeSession({ variables: { input: { priceId: props.stripePriceId } } })}
  //         buttonStyle={props.variant === 'light' ? 'primary' : 'secondary'}
  //         className={buttonClass}
  //         >
  //         Upgrade Account
  //     </Button>
  //     </div>
  // </div>
}

function getSubscriptionPlanCardCss(props: SubscriptionPlanCardProps) {
  const wrapperClasses = ['w-full rounded-lg px-4 pt-2 pb-4 flex flex-col'];
  const nameH4Classes = ['text-lg font-bold mb-2 tracking-wider'];
  const perkPClasses = [
    'tracking-wider mb-1 flex items-center ml-2 font-medium',
  ];
  const buttonClasses = ['mt-4'];

  if (props.variant === 'light') {
    wrapperClasses.push('bg-gray-200 text-primary');
  } else if (props.variant === 'primary') {
    wrapperClasses.push('bg-primary text-white');
    buttonClasses.push('text-white');
  }

  return {
    wrapperClass: wrapperClasses.join(' '),
    nameH4Class: nameH4Classes.join(' '),
    perkPClass: perkPClasses.join(' '),
    buttonClass: buttonClasses.join(' '),
  };
}
