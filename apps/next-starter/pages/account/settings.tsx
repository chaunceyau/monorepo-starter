import { getSession } from 'next-auth/client';
//
import { TopNavigationLayout } from 'apps/next-starter/components/layouts/top-nav';
import { VerticalNavigationLayout } from 'apps/next-starter/components/layouts/vertical-nav';
import { ACCOUNT_PAGE_VERTICAL_NAVIGATION_LINKS } from 'apps/next-starter/util/routes/nav';

export default function AccountSettingsPage() {
  return (
    <h1>Account Settings</h1>
  );
}

AccountSettingsPage.getLayout = page => {
  return (
    <TopNavigationLayout title="Account Settings" session={page.props.session} router={null}>
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
