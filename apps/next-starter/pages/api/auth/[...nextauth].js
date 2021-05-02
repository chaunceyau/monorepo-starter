import { env } from 'apps/next-starter/util/config';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import jwt from 'jsonwebtoken';
// database: 'postgres://postgres:postgres@127.0.0.1:5432/postgres',
// Oz8tzmBy+iDXnS9M6C4NTxOF2PbeL34MkWhzcp6TSJzz0FhaS3p6aS17dufzIMXTph+MI4WVycrGkdygrXsWjw==

export default NextAuth({
  pages: {
    signIn: '/auth/signin',
  },
  // A random string used to hash tokens, sign cookies and generate crytographic keys.
  // secret: stringified_signingKey,
  secret: JSON.stringify({
    kty: 'oct',
    kid: 'X-yjrKBannu7fp7LYP3pEDHnF5enDayamaFGVTxMf3M',
    alg: 'HS512',
    k: 'Z3DVSmbLvMCXeVcHQZcnBs4jERm7Ym8YpBpGNcNY62c',
  }),
  session: {
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    // secret: 'test_secret',
    // signingKey: JSON.stringify({
    //   kty: 'oct',
    //   kid: 'X-yjrKBannu7fp7LYP3pEDHnF5enDayamaFGVTxMf3M',
    //   alg: 'HS512',
    //   k: 'Z3DVSmbLvMCXeVcHQZcnBs4jERm7Ym8YpBpGNcNY62c',
    // }),
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    async encode({ secret, token, maxAge }) {
      console.log(`[ENCODE]: secret ${secret}; token: ${token}`);
      return jwt.sign(token, secret);
      // return jwt.sign({ id: 'fsdalmfsda', sub: 'flm32l23m' }, secret);
    },
    async decode({ secret, token, maxAge }) {
      console.log('[DECODE]: starting');
      const decoded = jwt.verify(token, secret);
      console.log('[DECODE]: success -> ', decoded);
      return decoded;
    },
  },
  providers: [
    Providers.Credentials({
      // id: 'email-password-auth',
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      //
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, email, password, 2FA token, etc.
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        const match = USERS.find((u) => u.email === credentials.email);
        console.log('AUTHORIZING');
        if (!match) {
          return null;
        }

        if (match.password === credentials.password) {
          console.log('AUTHORIZING-1 ', match);
          const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' };
          return Promise.resolve(user);
          return {
            name: match.name,
            email: match.email,
            id: '',
          };
        }
        console.log('AUTHORIZING-2');

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
