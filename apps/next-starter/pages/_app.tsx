import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Provider, useSession } from 'next-auth/client';
//
import './styles.css';
import { TopNavigationLayout } from '../components/layouts/top-nav';

function CustomApp({ Component, pageProps, router }: AppProps) {
  const clientSession = useSession();
  const session = pageProps.session || clientSession;

  const provider = (
    <Provider session={session}>
      <Component {...pageProps} />
    </Provider>
  );

  return (
    <Provider session={session}>
      <Head>
        <title>Client Application Starter</title>
      </Head>
      {session ? (
        <TopNavigationLayout session={session} router={router}>
          {provider}
        </TopNavigationLayout>
      ) : (
        provider
      )}
    </Provider>
  );
}

export default CustomApp;
