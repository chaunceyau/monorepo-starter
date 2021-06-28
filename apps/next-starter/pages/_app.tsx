import React from 'react';
import Head from 'next/head';
import NProgress from 'nprogress';
import Router from 'next/router';
import {AppProps} from 'next/app';
import {Provider as AuthProvider} from 'next-auth/client';
import {ApolloProvider} from '@apollo/client';
//
import {LayoutProvider} from '@monorepo-starter/ui';
import {createAbilitiesForUser} from '@monorepo-starter/casl';
//
import '../styles/tailwind.generated.css';
//
import {AbilityContext} from '../util/casl';
import {useApollo} from '../util/api-client';
import {UI_APP_NAVIGATION} from '../util/routes/nav';

//
Router.events.on('routeChangeStart', url => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function CustomApp({Component, pageProps}: AppProps) {
  const getLayout = (Component as any).getLayout || (page => page);
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <>
      <Head>
        <title>Monorepo Starter</title>
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      </Head>

      <AuthProvider session={pageProps.session}>
        <LayoutProvider value={UI_APP_NAVIGATION}>
          <ApolloProvider client={apolloClient}>
            <AbilityContext.Provider
              value={createAbilitiesForUser(pageProps.session?.user)}
            >
              {getLayout(<Component {...pageProps} />)}
            </AbilityContext.Provider>
          </ApolloProvider>
        </LayoutProvider>
      </AuthProvider>
    </>
  );
}

export default CustomApp;
