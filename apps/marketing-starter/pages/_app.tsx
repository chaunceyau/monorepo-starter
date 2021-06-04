import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
// 
import '../styles/tailwind.generated.css';
// 
import { Footer } from '../components/footer';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to marketing-starter!</title>
      </Head>
      <div>
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default CustomApp;
