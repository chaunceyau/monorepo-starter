import {routes} from '@monorepo-starter/utils';
import {getCsrfToken, getSession} from 'next-auth/client';

/**
 * HOC
 * @param innerFn
 */
export async function requireSessionSSR(context?: any) {
  // return async context => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: routes.client.login,
        permanent: false,
      },
    };
  }

  return {props: {session, csrfToken: await getCsrfToken(context)}};
  // };
}

/**
 * HOC
 * @param innerFn
 */
export const requireNoSessionSSR = async context => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {props: {}};
};
