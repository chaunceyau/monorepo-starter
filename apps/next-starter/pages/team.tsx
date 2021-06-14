import React from 'react';
//
import { requireSessionSSR } from '../util/misc';
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

export const getServerSideProps = requireSessionSSR;