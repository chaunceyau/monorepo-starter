import React from 'react';
import { signIn, getSession } from 'next-auth/client';
//
import { TopNavigationLayout } from '../components/layouts/top-nav';

export default function Dashboard({ session, router }) {
  return (
    <>
      {!session && (
        <div>
          <span>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
          </span>
        </div>
      )}
      {session && (
        <div>
          <h2 className="text-xl font-bold">Welcome, {session.user.email}!</h2>
        </div>
      )}
    </>
  );
}

Dashboard.getLayout = page => {
  return (
    <TopNavigationLayout session={page.props.session} router={null} title="Dashboard">
      {page}
    </TopNavigationLayout>
  )
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
