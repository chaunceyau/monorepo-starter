import React from 'react';
import {gql} from '@apollo/client';
//
import {Form, FormButton, FormInput, FormUpload} from '@monorepo-starter/ui';
//
import {requireSessionSSR} from 'apps/next-starter/util/misc';
import {BasicAccountSettingsLayout} from 'apps/next-starter/components/layouts/account-pages';
import {
  QueryViewerAccountPage,
  useViewerBasicsQuery,
} from 'apps/next-starter/graphql/pages/account/useViewer';
import {apolloClient} from 'apps/next-starter/util/api-client';

const MUTATION_UPDATE_USER_AVATAR = gql`
  mutation UpdateAvatar($input: UpdateAvatarInput!) {
    updateAvatar(input: $input)
  }
`;

const MUTATION_REMOVE_VIEWER_AVATAR = gql`
  mutation RemoveViewerAvatar {
    removeViewerAvatar
  }
`;

function useAccountPage() {
  return {
    form: {
      fields: {
        avatar: {
          onUploadComplete: async fileState =>
            apolloClient.mutate({
              mutation: MUTATION_UPDATE_USER_AVATAR,
              variables: {
                input: {
                  remoteFileId: fileState.id,
                  fileName: fileState.fileName,
                  fileType: fileState.file.type,
                },
              },
            }),
          onDeleteMutation: viewerData =>
            apolloClient.mutate({
              mutation: MUTATION_REMOVE_VIEWER_AVATAR,
              update: cache => {
                console.log({cache});
                console.log({viewerData});
                if (cache && viewerData) {
                  cache.writeQuery({
                    query: QueryViewerAccountPage,
                    data: {
                      viewer: {
                        ...viewerData,
                        avatar: {
                          ...viewerData.avatar,
                          url: 'fdslamfldsma321',
                        },
                      },
                    },
                  });
                }

                // cache.writeQuery({
                //   query: QueryViewerAccountPage,
                //   data: {}
                // })
              },
            }),
        },
      },
    },
  };
}

export default function AccountPage() {
  const {data, loading, client} = useViewerBasicsQuery();

  const controller = useAccountPage();

  if (!data) {
    return null;
  }
  return (
    <div>
      <Form
        id="account-settings"
        styled
        onSubmit={() => {
          return new Promise((resolve, _reject) =>
            setTimeout(() => resolve(), 2000)
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
          multiple
          name="avatar"
          label="Profile Image"
          required={false}
          defaultValue={
            data?.viewer?.avatar
              ? [
                  {
                    id: data?.viewer?.avatar.url,
                    fileName: data?.viewer?.avatar.fileName,
                    status: 'SAVED',
                    progress: 100,
                  },
                ]
              : []
          }
          onDeleteMutation={() =>
            controller.form.fields.avatar.onDeleteMutation(data?.viewer)
          }
          onUploadComplete={controller.form.fields.avatar.onUploadComplete}
        />
        <FormButton buttonStyle="primary" label="Save" />
      </Form>
    </div>
  );
}

export const getServerSideProps = requireSessionSSR;

AccountPage.getLayout = BasicAccountSettingsLayout;
