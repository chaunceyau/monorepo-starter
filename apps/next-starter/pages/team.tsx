import React from 'react';
//
import {TopNavigationLayout} from '@monorepo-starter/ui';
//
import {requireSessionSSR} from '../util/misc';
import { PrimaryLayout } from '../components/layouts';

export default function Team({ session, router }) {
  return (
    <h1>fladsmflmsdalfmsdalmfldsmlm</h1>
  );
}

Team.getLayout = page => {
  return (
    <PrimaryLayout title="Team" page={page}>
      {page}
    </PrimaryLayout>
  )
}

export const getServerSideProps = requireSessionSSR;