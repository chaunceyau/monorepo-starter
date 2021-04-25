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
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        // , placeholder: "jsmith"
        username: { label: 'Username', type: 'text' },
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
        const match = USERS.find((u) => u.email === credentials.username);
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
      clientId:
        '826478107421-psjilupapk79e5q5nena6ir07hup625c.apps.googleusercontent.com',
      clientSecret: 'DDLphrsFtEWLSLU4qeKPbWbh',
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
    id: 4733,
    name: 'Asa Luettgen',
    email: 'luettgen@gmail.com',
    password: 'password',
  },
  {
    id: 43731,
    name: 'Ahmed Kilback',
    email: 'kilback@gmail.com',
    password: 'password',
  },
  {
    id: 19684,
    name: 'Simeon Leuschke',
    email: 'leuschke@gmail.com',
    password: 'password',
  },
  {
    id: 23949,
    name: 'Frida Rippin',
    email: 'rippin@gmail.com',
    password: 'password',
  },
  {
    id: 57003,
    name: 'Mckayla Brekke',
    email: 'brekke@gmail.com',
    password: 'password',
  },
  {
    id: 52023,
    name: 'Edyth Kuhlman',
    email: 'kuhlman@gmail.com',
    password: 'password',
  },
  {
    id: 50233,
    name: 'Noemie Russel',
    email: 'russel@gmail.com',
    password: 'password',
  },
  {
    id: 6435,
    name: 'Conner Mosciski',
    email: 'mosciski@gmail.com',
    password: 'password',
  },
  {
    id: 2424,
    name: 'Davin Sanford',
    email: 'sanford@gmail.com',
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
