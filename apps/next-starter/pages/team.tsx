import React from 'react';
//
import {TopNavigationLayout} from '@monorepo-starter/ui';
//
import {requireSessionSSR} from '../util/misc';

export default function Team({ session, router }) {
  return (
    <h1>fladsmflmsdalfmsdalmfldsmlm</h1>
  );
}

Team.getLayout = page => {
  return (
    <TopNavigationLayout title="Team" session={page.props.session} router={null}>
      {page}
    </TopNavigationLayout>
  )
}

export const getServerSideProps = requireSessionSSR;