import React from 'react';
import {gql} from '@apollo/client';
//
import {Form, FormButton, FormInput, FormUpload} from '@monorepo-starter/ui';
//
import {requireSessionSSR} from 'apps/next-starter/util/misc';
import {BasicAccountSettingsLayout} from 'apps/next-starter/components/layouts/account-pages';
import {useViewerEmailQuery} from 'apps/next-starter/graphql/pages/account/useViewer';
import {usePresignedUploadQuery} from 'apps/next-starter/graphql/presignedUpload';

export default function AccountPage() {
  const {data} = useViewerEmailQuery();
  const {queryPresignedUpload} = usePresignedUploadQuery();
  return (
    <div>
      <Form
        id="account-settings"
        styled
        onSubmit={async () => {
          return new Promise((resolve, _reject) =>
            setTimeout(() => resolve(), 5000)
          );
        }}
        title="Personal Information"
        description="Culpa possimus qui laboriosam voluptatem. Iusto tenetur et saepe
            et. Perferendis illo omnis ut voluptates rerum ea. Nulla quas
            corrupti quo id atque aspernatur. Ad est mollitia id est quisquam.
            Omnis magnam cum veniam facere."
      >
        <FormInput
          name="email"
          label="Email Address"
          defaultValue={data?.viewer.email}
          disabled
        />
        <FormUpload
          name="avatar"
          label="Profile Image"
          required={false}
          onDeleteMutation={() => {}}
          presignedUpload={file => queryPresignedUpload(file)}
          onUploadComplete={async () => {}}
          multiple
          defaultValue={[
            {
              fileName: 'fake-file.png',
              status: 'COMPLETE',
              progress: 100,
              id: 'mock_random_id',
            },
            {
              fileName: 'another-example-file.png',
              status: 'COMPLETE',
              progress: 100,
              id: 'mock_random_id_2',
            },
          ]}
        />
        <FormButton buttonStyle="primary">Save</FormButton>
      </Form>
    </div>
  );
}

export const getServerSideProps = requireSessionSSR;

AccountPage.getLayout = BasicAccountSettingsLayout;

AccountPage.fragments = {
  viewerEmail: gql`fragment AccountPage_viewerEmail on User { viewer { email } }`
}