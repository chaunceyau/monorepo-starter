import React from 'react';
import {gql, useApolloClient, useLazyQuery, useQuery} from '@apollo/client';
//
import {Form, FormButton, FormInput, FormUpload} from '@monorepo-starter/ui';
//
import {TopNavigationLayout} from 'apps/next-starter/components/layouts/top-nav';
import {ACCOUNT_PAGE_VERTICAL_NAVIGATION_LINKS} from 'apps/next-starter/util/routes/nav';
import {TabNavigationLayout} from 'apps/next-starter/components/layouts/tab-nav';
import {requireSessionSSR} from 'apps/next-starter/util/misc';

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

  if (data) {
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
          defaultValues={{email: data.viewer.email}}
          title="Personal Information"
          description="Culpa possimus qui laboriosam voluptatem. Iusto tenetur et saepe
            et. Perferendis illo omnis ut voluptates rerum ea. Nulla quas
            corrupti quo id atque aspernatur. Ad est mollitia id est quisquam.
            Omnis magnam cum veniam facere."
        >
          <FormInput name="email" label="Email Address" disabled/>
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
          />
          <FormButton buttonStyle="primary">Save</FormButton>
        </Form>
      </div>
    );
  }
  return <span>loading</span>;
}

AccountPage.getLayout = page => {
  return (
    <TopNavigationLayout
      title="Account Settings"
      session={page.props.sessions}
      router={null}
    >
      <TabNavigationLayout navLinks={ACCOUNT_PAGE_VERTICAL_NAVIGATION_LINKS}>
        {page}
      </TabNavigationLayout>
    </TopNavigationLayout>
  );
};

export const getServerSideProps = requireSessionSSR;
