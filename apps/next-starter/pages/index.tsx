import React from 'react';
import {signIn} from 'next-auth/client';
//
import {TopNavigationLayout} from '@monorepo-starter/ui';
//
import {requireSessionSSR} from '../util/misc';

export default function Dashboard({session}) {
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
          <h2 className="text-xl font-bold" id="welcome-message">Welcome, {session.user.email}!</h2>
        </div>
      )}
    </>
  );
}

Dashboard.getLayout = page => {
  return (
    <TopNavigationLayout
      session={page.props.session}
      router={null}
      title="Dashboard"
    >
      {page}
    </TopNavigationLayout>
  );
};

export const getServerSideProps = requireSessionSSR;
