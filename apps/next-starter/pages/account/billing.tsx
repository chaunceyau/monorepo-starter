import { getSession } from 'next-auth/client';
//
import { TopNavigationLayout } from 'apps/next-starter/components/layouts/top-nav';
import { ACCOUNT_PAGE_VERTICAL_NAVIGATION_LINKS } from 'apps/next-starter/util/routes/nav';
import { VerticalNavigationLayout } from 'apps/next-starter/components/layouts/vertical-nav';

export default function AccountBillingPage() {
  return (
    <h1>Account Billing</h1>
  );
}

AccountBillingPage.getLayout = page => {
  return (
    <TopNavigationLayout title="Account Settings" session={null} router={null}>
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
