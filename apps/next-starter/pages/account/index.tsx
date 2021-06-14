import React from 'react';
import { gql, useQuery } from '@apollo/client'
// 
import { Form, FormButton, FormInput, FormUpload } from '@monorepo-starter/ui';
//
import { TopNavigationLayout } from 'apps/next-starter/components/layouts/top-nav';
import { ACCOUNT_PAGE_VERTICAL_NAVIGATION_LINKS } from 'apps/next-starter/util/routes/nav';
import { TabNavigationLayout } from 'apps/next-starter/components/layouts/tab-nav';
import { requireSessionSSR } from 'apps/next-starter/util/misc';

const ViewerGql = gql`
  query Viewer { 
    viewer { 
      id
      email
    } 
  }
`

export default function AccountPage() {
  const { data } = useQuery(ViewerGql);

  console.log({ data });

  return (
    <div>
      <Form
        id="account-settings"
        styled
        onSubmit={async () => {
          console.log("FLDSAMFLDSMALFDS");
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
        <FormInput name="email" label="Email Address" />
        <FormUpload 
          name="profilePhoto"
          label="Profile Image"
          required={false}
          onDeleteMutation={() => {}} 
          presignedUpload={async (file: {
            id: string
            file: File
          }) => (
            {
              data: {
                presignedUpload: {
                  url: 'string',
                  fileId: 'string',
                  fields: []
                }
              }
            }
          )} 
          onUploadComplete={async () =>{}}
        />
        <FormButton buttonStyle="primary">Save</FormButton>
      </Form>
    </div>
  );
}


AccountPage.getLayout = page => {
  return (
    <TopNavigationLayout title="Account Settings" session={page.props.sessions} router={null}>
      <TabNavigationLayout
        navLinks={ACCOUNT_PAGE_VERTICAL_NAVIGATION_LINKS}
      >
        {page}
      </TabNavigationLayout>
    </TopNavigationLayout>
  )
}

export const getServerSideProps = requireSessionSSR;