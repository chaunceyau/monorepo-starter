import React from 'react';
import { getSession } from 'next-auth/client';
import { Form, FormButton, FormInput } from '@monorepo-starter/ui';
//
import { TopNavigationLayout } from 'apps/next-starter/components/layouts/top-nav';
import { VerticalNavigationLayout } from 'apps/next-starter/components/layouts/vertical-nav';

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
        query: '{ allUsers { edges { node { id } } totalCount } }',
      }),
    })
      .then(r => r.json())
      .then(data => console.log('data returned:', data));
  }, []);
  return (
    <TopNavigationLayout title="Account Settings" session={null} router={null}>
      <VerticalNavigationLayout navLinks={[]}>
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
          <FormInput name="displayName" label="Display Name" />
          <FormInput name="email" label="Email Address" />
          <FormButton buttonStyle="primary">Submit</FormButton>
        </Form>
      </VerticalNavigationLayout>
    </TopNavigationLayout>
  );
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
