import jwt from 'jsonwebtoken';
import NextAuth from 'next-auth';
import {JWT} from 'next-auth/jwt';
import Providers from 'next-auth/providers';
//
import {env} from 'apps/next-starter/util/config';
import {prisma} from 'apps/next-starter/util/prisma';
import {UserSession} from 'apps/next-starter/util/types';
//
import {routes} from '@monorepo-starter/utils';

export default NextAuth({
  pages: {
    signIn: routes.client.login,
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  // secret: '',
  jwt: {
    secret: env.JWT_SIGNING_KEY,
    // signingKey: '',
    async encode({secret, token, maxAge}) {
      const encoded = jwt.sign(token, secret);
      return encoded;
    },
    async decode({secret, token, maxAge}) {
      try {
        const decoded = jwt.verify(token, secret);
        return decoded as JWT;
      } catch (err) {
        console.log({token});
        console.log('errerrerrerrerr');
        console.log(err);
        throw new Error(err);
      }
    },
  },
  callbacks: {
    async jwt(token, user, _account, _profile, _isNewUser) {
      // TODO: might not need this anymore...
      return {roles: user?.roles || [], ...token};
    },
    async session(session: UserSession, token): Promise<UserSession> {
      // convert sub -> id
      const {iat, ...user} = token;
      const {sub, ...rest} = user;
      session.user = {...rest, id: sub as string};
      return session as UserSession;
    },
  },
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, email, password, 2FA token, etc.
      credentials: {
        // TODO: type -> email?
        email: {label: 'Email', type: 'text'},
        password: {label: 'Password', type: 'password'},
      },

      // TODO: fix this ts ignore
      // @ts-ignore
      async authorize(credentials: any) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        const match = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!match) {
          return false;
        }

        if (match.password === credentials.password) {
          const {password, ...rest} = match;
          return Promise.resolve(rest);
        }
        return null;
      },
    }),
    Providers.Google({
      clientId: env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: env.GOOGLE_OAUTH_CLIENT_SECRET,
    }),
  ],
  // database: process.env.DATABASE_URL,
});
