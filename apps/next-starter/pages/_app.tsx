import React from 'react';
import Head from 'next/head';
import NProgress from 'nprogress';
import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
//
import './styles.css';
import Router from 'next/router';

Router.events.on('routeChangeStart', (url) => {
  // console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>Welcome to next-starter!</title>
        {/* css for nprogress */}
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      </Head>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </Provider>
  );
}

export default CustomApp;
