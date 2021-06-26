import React from 'react';
import {getCsrfToken} from 'next-auth/client';

interface LoginFormContainerProps {
  csrfToken: string;
}

export function LoginFormContainer({csrfToken}: LoginFormContainerProps) {
  const csrf = useCsrf();
  return (
    <form
      method="POST"
      action="/api/auth/callback/credentials"
      className="space-y-6 bg-gray-100 pt-2 pb-8 px-4 shadow sm:rounded-lg sm:px-10"
    >
      <input name="csrfToken" type="hidden" value={csrf} />
      <div>
        <h3 className="text-2xl font-bold tracking-wide text-primary mt-2">
          Login with email
        </h3>
        <p className="text-sm text-gray-600 max-w mt-1">
          or{' '}
          <a href="#" className="font-medium text-primary hover:text-primary">
            create a new account
          </a>
        </p>
      </div>

      {/*  */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember_me"
            name="remember_me"
            type="checkbox"
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label
            htmlFor="remember_me"
            className="ml-2 block text-sm text-gray-900"
          >
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a href="#" className="font-medium text-primary hover:text-primary">
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <button
          id="submit-login"
          type="submit"
          className="w-full flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Sign In
        </button>
      </div>
    </form>
  );
}

function useCsrf() {
  const [csrf, setCsrf] = React.useState<string | undefined>();
  React.useEffect(() => {
    getCsrfToken().then(token => {
      setCsrf(token);
    });
  }, []);
  return csrf;
}
