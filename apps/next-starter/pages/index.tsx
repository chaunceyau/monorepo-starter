import { signIn, signOut, getSession } from 'next-auth/client';
import React from 'react';
import { TopNavigationLayout } from '../components/layouts/top-nav';

export default function Dashboard({ session, router }) {
  return (
    <TopNavigationLayout session={session} router={router} title="Dashboard">
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          <span>
            Signed in as {session.user.email} <br />
          </span>{' '}
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </TopNavigationLayout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
