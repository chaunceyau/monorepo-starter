import { env } from 'apps/next-starter/util/config';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import jwt from 'jsonwebtoken';

export default NextAuth({
  pages: {
    signIn: '/auth/signin',
  },
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
    signingKey: JSON.stringify({
      kty: 'oct',
      kid: 'X-yjrKBannu7fp7LYP3pEDHnF5enDayamaFGVTxMf3M',
      alg: 'HS512',
      k: 'Z3DVSmbLvMCXeVcHQZcnBs4jERm7Ym8YpBpGNcNY62c',
    }),
    async encode({ secret, token, maxAge }) {
      return jwt.sign(token, secret);
    },
    async decode({ secret, token, maxAge }) {
      const decoded = jwt.verify(token, secret);
      return decoded;
    },
  },
  providers: [
    Providers.Credentials({
      // id: 'email-password-auth',
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

        if (!match) {
          return null;
        }

        if (match.password === credentials.password) {
          const {password, ...rest} = match
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

const USERS = [
  {
    id: 55674,
    name: 'Catherine Crist',
    email: 'crist@gmail.com',
    password: 'password',
  },
  {
    id: 1,
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
