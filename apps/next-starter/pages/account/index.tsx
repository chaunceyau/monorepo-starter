import React from 'react';
import {gql} from '@apollo/client';
//
import {Form, FormButton, FormInput, FormUpload} from '@monorepo-starter/ui';
//
import {requireSessionSSR} from 'apps/next-starter/util/misc';
import {BasicAccountSettingsLayout} from 'apps/next-starter/components/layouts/account-pages';
import {FragmentAvatarFields, QueryViewerAccountPage, useViewerBasicsQuery} from 'apps/next-starter/graphql/pages/account/useViewer';
import {apolloClient} from 'apps/next-starter/util/api-client';

const MUTATION_UPDATE_USER_AVATAR = gql`
  mutation UpdateAvatar($remoteFileId: String!) {
    updateAvatar(remoteFileId: $remoteFileId)
  }
`;

const MUTATION_REMOVE_VIEWER_AVATAR = gql`
  mutation RemoveViewerAvatar {
    removeViewerAvatar
  }
`;

export default function AccountPage() {
  const {data, loading, client} = useViewerBasicsQuery();
  if (!data) {
    return null;
  }
  return (
    <div>
      <Form
        id="account-settings"
        // defaultValues={{
        //   avatar:[ {
        //     fileId: 'data.viewer.avatar.url',
        //     fileName: 'data.viewer.avatar.url',
        //     status: 'SAVED',
        //     progress: 100
        //   }]
        // }}
        styled
        onSubmit={() => {
          return new Promise((resolve, _reject) =>
            setTimeout(() => resolve(), 5000)
          );
        }}
        title="Personal Information"
        description="Update your account and personal information"
      >
        <FormInput
          name="email"
          label="Email Address"
          defaultValue={data?.viewer?.email}
          disabled
        />
        <FormUpload
          name="avatar"
          label="Profile Image"
          required={false}
          defaultValue={
            data?.viewer?.avatar
              ? [
                  {
                    id: data?.viewer?.avatar.url,
                    fileName: data?.viewer?.avatar.url,
                    status: 'SAVED',
                    progress: 100,
                  },
                ]
              : []
          }
          onDeleteMutation={() =>
            apolloClient.mutate({
              mutation: MUTATION_REMOVE_VIEWER_AVATAR,
              update: cache => {
                console.log({cache})
                console.log({data})
                if (cache && data) {
                  cache.writeQuery({
                    query: QueryViewerAccountPage,
                    data: {
                      viewer: {
                        ...data.viewer,
                        avatar: {
                          ...data.viewer.avatar,
                          url: 'fdslamfldsma321',
                        }
                      },
                    },
                  })
                }

                // cache.writeQuery({
                //   query: QueryViewerAccountPage,
                //   data: {}
                // })
              },
            })
          }
          onUploadComplete={async fileState =>
            apolloClient.mutate({
              mutation: MUTATION_UPDATE_USER_AVATAR,
              variables: {
                remoteFileId: fileState.id,
              },
            })
          }
          multiple
          // defaultValue={[
          //   {
          //     fileName: 'fake-file.png',
          //     status: 'SAVED',
          //     progress: 100,
          //     id: 'mock_random_id',
          //   },
          //   {
          //     fileName: 'another-example-file.png',
          //     status: 'SAVED',
          //     progress: 100,
          //     id: 'mock_random_id_2',
          //   },
          // ]}
        />
        <FormButton buttonStyle="primary" label="Save" />
      </Form>
    </div>
  );
}

export const getServerSideProps = requireSessionSSR;

AccountPage.getLayout = BasicAccountSettingsLayout;
