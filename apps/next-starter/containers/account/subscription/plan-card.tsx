import React from 'react';
import {Button} from '@monorepo-starter/ui';
import {gql, useMutation} from '@apollo/client';
import {CheckCircleIcon} from '@heroicons/react/solid';

interface SubscriptionPlanCardProps {
  name: string;
  perks: string[];
  price: number;
  stripePriceId: string;
  variant: 'light' | 'primary';
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
    <div className="bg-primary rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
      <div className="pt-10 pb-12 px-8 sm:pt-16 sm:px-16 md:pt-10 lg:py-10 lg:pr-0 xl:py-10 xl:pl-16">
        <div className="lg:self-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to upgrade your account?</span>
            {/* <span className="block">Start your free trial today.</span> */}
          </h2>
          {/* <p className="mt-4 text-lg leading-6 text-indigo-200">
                Ac euismod vel sit maecenas id pellentesque eu sed consectetur.
                Malesuada adipiscing sagittis vel nulla nec.
              </p> */}
          <a
            href="#"
            className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-primary"
          >
            Click to view plans
          </a>
        </div>
      </div>
      <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
        <img
          className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
          src="https://tailwindui.com/img/component-images/full-width-with-sidebar.jpg"
          alt="App screenshot"
        />
      </div>
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
    buttonClasses.push('text-primary');
  }

  return {
    wrapperClass: wrapperClasses.join(' '),
    nameH4Class: nameH4Classes.join(' '),
    perkPClass: perkPClasses.join(' '),
    buttonClass: buttonClasses.join(' '),
  };
}
