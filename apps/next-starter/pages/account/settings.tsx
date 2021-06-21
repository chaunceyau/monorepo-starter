import {Button, Card, Form, FormButton, FormInput, FormUpload} from '@monorepo-starter/ui';
//
import {TopNavigationLayout} from 'apps/next-starter/components/layouts/top-nav';
import {ACCOUNT_PAGE_VERTICAL_NAVIGATION_LINKS} from 'apps/next-starter/util/routes/nav';
import {TabNavigationLayout} from 'apps/next-starter/components/layouts/tab-nav';
import {requireSessionSSR} from 'apps/next-starter/util/misc';
import React from 'react';

const mocks = {
  formId: 'mock-form',
  input: {
    defaultValue: 'mockDefaultValue',
    name: 'mockFieldName',
    label: 'mock label',
  },
};
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
      <Form id={mocks.formId} onSubmit={() => {}}>
        <FormUpload
          name={mocks.input.name}
          label={mocks.input.label}
          // defaultValue={mocks.input.defaultValue}
          onDeleteMutation={() => {}}
          onUploadComplete={async () => {}}
          presignedUpload={async () => ({
            data: {
              presignedUpload: {url: '', fileId: '', fields: []},
            },
          })}
          // registerOptions={{required: 'this value is required'}}
        />
        <FormButton buttonStyle="primary">submit</FormButton>
      </Form>
    </div>
  );
}

AccountSettingsPage.getLayout = page => {
  return (
    <TopNavigationLayout
      title="Account Settings"
      session={page.props.session}
      router={null}
    >
      <TabNavigationLayout navLinks={ACCOUNT_PAGE_VERTICAL_NAVIGATION_LINKS}>
        {page}
      </TabNavigationLayout>
    </TopNavigationLayout>
  );
};

export const getServerSideProps = requireSessionSSR;
