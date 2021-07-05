import * as React from 'react';
import Head from 'next/head';
import NProgress from 'nprogress';
import Router from 'next/router';
import {AppProps} from 'next/app';
//
import '../styles/tailwind.generated.css';
//
import {env} from '../util/config';
import { ApplicationProviders } from '../containers/providers';
//
Router.events.on('routeChangeStart', url => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function CustomApp({Component, pageProps}: AppProps) {
  const getLayout = (Component as any).getLayout || (page => page);
  const fragments = (Component as any).fragments;
  return (
    <>
      <Head>
        <title>{env.TITLE_BAR_BASE}</title>
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      </Head>
      <ApplicationProviders pageProps={pageProps}>
        {getLayout(<Component {...pageProps} fragments={fragments} />)}{' '}
      </ApplicationProviders>
    </>
  );
}

export default CustomApp;
