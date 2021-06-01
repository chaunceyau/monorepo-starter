import React from 'react';
import { getSession } from 'next-auth/client';
import { Card, Form, FormButton, FormInput, FormUpload } from '@monorepo-starter/ui';
//
import { TopNavigationLayout } from 'apps/next-starter/components/layouts/top-nav';
import { VerticalNavigationLayout } from 'apps/next-starter/components/layouts/vertical-nav';
import { ACCOUNT_PAGE_VERTICAL_NAVIGATION_LINKS } from 'apps/next-starter/util/routes/nav';

export default function AccountPage() {
  React.useEffect(() => {
    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // Authorization:
      },
      credentials: 'include',
      body: JSON.stringify({
        query: '{ allUsers { edges { node { id email } } pageInfo { startCursor } } }',
      }),
    })
      .then(r => r.json())
      .then(data => console.log('data returned:', data));
  }, []);

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
          defaultValue={undefined}
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
        <FormButton buttonStyle="primary">Submit</FormButton>
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
