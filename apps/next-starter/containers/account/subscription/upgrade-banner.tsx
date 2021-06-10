import { ACCOUNT_ROUTES } from 'apps/next-starter/util/routes';
import Link from 'next/link';
import React from 'react';

interface UpgradePlanBannerProps {}

export function UpgradePlanBanner(props: UpgradePlanBannerProps) {
  return (
    <div className="max-w-4xl bg-primary rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
      <div className="pt-10 pb-12 px-8 sm:pt-16 sm:px-16 md:pt-10 lg:py-10 lg:pr-0 xl:py-10 xl:pl-16">
        <div className="lg:self-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to upgrade your account?
          </h2>
          <Link
            href={ACCOUNT_ROUTES.ACCOUNT_PLANS_PAGE}
          >
            <a
              className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-primary"
            >
              Click to view plans
            </a>
          </Link>
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
}
