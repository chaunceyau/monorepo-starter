import { env } from 'apps/next-starter/util/config';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  // Configure one or more authentication providers
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      //
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, email, password, 2FA token, etc.
      credentials: {
        // , placeholder: "jsmith"
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60, // 30 days
      },
      async authorize(credentials) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        const match = USERS.find((u) => u.email === credentials.email);
        if (!match) {
          return null;
        }

        if (match.password === credentials.password) {
          console.log('RETURNING USE2R', match);
          return match;
        }

        return null;
      },
    }),
    Providers.Google({
      clientId: env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: env.GOOGLE_OAUTH_CLIENT_SECRET,
    }),
  ],

  // A database is optional, but required to persist accounts in a database
  //   database: process.env.DATABASE_URL,
});

const USERS = [
  {
    id: 55674,
    name: 'Catherine Crist',
    email: 'crist@gmail.com',
    password: 'password',
  },
  {
    id: 15168,
    name: 'Valerie Doyle',
    email: 'doyle@gmail.com',
    password: 'password',
  },
  {
    id: 22235,
    name: 'Electa Ernser',
    email: 'ernser@gmail.com',
    password: 'password',
  },
];
