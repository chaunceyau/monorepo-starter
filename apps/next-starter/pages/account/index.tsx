import React from 'react';
import {gql, useApolloClient, useQuery} from '@apollo/client';
//
import {Form, FormButton, FormInput, FormUpload} from '@monorepo-starter/ui';
//
import {TopNavigationLayout} from 'apps/next-starter/components/layouts/top-nav';
import {TabNavigationLayout} from 'apps/next-starter/components/layouts/tab-nav';
import {requireSessionSSR} from 'apps/next-starter/util/misc';
import {UI_NAV_COMPONENT_LINKS} from 'apps/next-starter/util/routes/nav';

const ViewerGql = gql`
  query Viewer {
    viewer {
      id
      email
      avatar {
        url
      }
    }
  }
`;

const PresignedUploadQuery = gql`
  query PresignedUploadQuery($input: AwsS3UploadOptions!) {
    presignedUpload(input: $input) {
      url
      fileId
      fields {
        key
        value
      }
    }
  }
`;

export default function AccountPage() {
  const {data} = useQuery(ViewerGql);
  // const [quer,{ data: upload }] = useLazyQuery(PresignedUploadQuery);
  const client = useApolloClient();

  return (
    <div>
      <Form
        id="account-settings"
        styled
        onSubmit={async () => {
          console.log('FLDSAMFLDSMALFDS');
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
          presignedUpload={file =>
            client.query({
              query: PresignedUploadQuery,
              variables: {
                input: {
                  type: file.file.type,
                  size: file.file.size,
                  fileName: file.file.name,
                  fileId: file.id,
                },
              },
            })
          }
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

AccountPage.getLayout = page => {
  return (
    <TopNavigationLayout
      title="Account Settings"
      session={page.props.sessions}
      router={null}
    >
      <TabNavigationLayout navLinks={UI_NAV_COMPONENT_LINKS.accountPageSubnav}>
        {page}
      </TabNavigationLayout>
    </TopNavigationLayout>
  );
};

export const getServerSideProps = requireSessionSSR;