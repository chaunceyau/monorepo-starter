import React from 'react';
import { getSession } from 'next-auth/client';
import { gql, useQuery } from '@apollo/client'
// 
import { Card, Form, FormButton, FormInput, FormUpload } from '@monorepo-starter/ui';
//
import { TopNavigationLayout } from 'apps/next-starter/components/layouts/top-nav';
import { VerticalNavigationLayout } from 'apps/next-starter/components/layouts/vertical-nav';
import { ACCOUNT_PAGE_VERTICAL_NAVIGATION_LINKS } from 'apps/next-starter/util/routes/nav';

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
      <VerticalNavigationLayout
        navLinks={ACCOUNT_PAGE_VERTICAL_NAVIGATION_LINKS}
      >
        {page}
      </VerticalNavigationLayout>
    </TopNavigationLayout>
  )
}


export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
