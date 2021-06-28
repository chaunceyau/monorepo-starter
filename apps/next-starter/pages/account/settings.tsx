import React from 'react';
import {Button, Card} from '@monorepo-starter/ui';
//
import {requireSessionSSR} from 'apps/next-starter/util/misc';
import {BasicAccountSettingsLayout} from 'apps/next-starter/components/layouts/account-pages';

export default function AccountSettingsPage() {
  return (
    <div className="space-y-4">
      <Card
        title="Notications"
        description="Quam voluptas ad et eaque odio rerum impedit rerum dolore nemo. Et similique quo dolorum quis repellat enim nulla voluptatem et, Libero impedit vel ut."
      ></Card>
      <Card
        title="Delete Account"
        description="Quam voluptas ad et eaque odio rerum impedit rerum dolore nemo. Et similique quo dolorum quis repellat enim nulla voluptatem et, Libero impedit vel ut."
      >
        <Button buttonStyle="negative">Delete Account</Button>
      </Card>
    </div>
  );
}

export const getServerSideProps = requireSessionSSR;

AccountSettingsPage.getLayout = BasicAccountSettingsLayout;