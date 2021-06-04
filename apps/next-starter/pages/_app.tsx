import React from 'react';
import Head from 'next/head';
import NProgress from 'nprogress';
import Router from 'next/router';
import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import { ApolloProvider } from '@apollo/client';
//
import { createAbilitiesForUser } from '@monorepo-starter/casl';
//
import '../styles/tailwind.generated.css';
//
import { AbilityContext } from '../util/casl';
import { client } from '../util/api-client';

//
Router.events.on('routeChangeStart', (url) => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function CustomApp({ Component, pageProps }: AppProps) {
  // @ts-ignore
  const getLayout = Component.getLayout || (page => page)
  return (
    <>
      <Head>
        <title>Monorepo Starter</title>
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      </Head>
      <Provider session={pageProps.session}>
        <ApolloProvider client={client}>
          <AbilityContext.Provider
            value={createAbilitiesForUser(pageProps.session?.user)}
          >
            {getLayout(<Component {...pageProps} />)}
          </AbilityContext.Provider>
        </ApolloProvider>
      </Provider>
    </>
  );
}

export default CustomApp;
