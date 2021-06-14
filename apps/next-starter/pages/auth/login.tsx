import React from 'react';
//
import {config} from '@monorepo-starter/utils';
//
import {ApplicationLogo} from 'apps/next-starter/components/icons/logo';
import {requireNoSessionSSR} from 'apps/next-starter/util/misc';
import {LoginContainer} from 'apps/next-starter/containers/account/login';
import {getCsrfToken, getSession} from 'next-auth/client';

interface LoginPageProps {
  csrfToken: string;
}

export default function LoginPage({csrfToken}: LoginPageProps) {
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <ApplicationLogo />
        <h1 className="mt-6 text-center text-2xl font-medium text-white tracking-wide">
          Log in to {config.applicationName}
        </h1>
        <LoginContainer csrfToken={csrfToken} />
      </div>
    </div>
  );
}

export const getServerSideProps = async context => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {props: {csrfToken: await getCsrfToken(context)}};
};
