import React from 'react';
import { getSession } from 'next-auth/client';
//
import { TopNavigationLayout } from '../components/layouts/top-nav';

export default function Team({ session, router }) {
  return (
    <>
      <h1>fladsmflmsdalfmsdalmfldsmlm</h1>
    </>
  );
}

Team.getLayout = page => {
  return (
    <TopNavigationLayout session={page.props.session} router={null} title="Team">
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
