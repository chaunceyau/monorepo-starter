import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import { ReactComponent as NxLogo } from '../public/nx-logo-white.svg';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Head>
        <title>Welcome to next-starter!</title>
      </Head>
      <div className="app">
        <header className="flex">
          <NxLogo width="75" height="50" />
          <h1>Welcome to next-starter :)</h1>
        </header>
        <main>
          <Provider session={pageProps.session}>
            <Component {...pageProps} />
          </Provider>
        </main>
      </div>
    </Provider>
  );
}

export default CustomApp;
