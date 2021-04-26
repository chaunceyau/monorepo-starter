import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
//
import './styles.css';
import { TopNavigationLayout } from '../components/layouts/top-nav';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>Welcome to next-starter!</title>
      </Head>
      {/* <TopNavigationLayout session={null} router={null}> */}
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
      {/* </TopNavigationLayout> */}
    </Provider>
  );
}

export default CustomApp;
