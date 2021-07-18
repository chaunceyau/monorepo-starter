import {useRouter} from 'next/router';
import React from 'react';
import {LoginFormContainer} from './form';
import {OAuthProvidersContainer} from './oauth-providers';

interface LoginContainerProps {
  csrfToken?: string
}

export function LoginContainer({csrfToken}: LoginContainerProps) {
  const router = useRouter();

  const [state, setState] = React.useState<'default' | 'email-password'>(
    'default'
  );

  return (
    <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
      {state === 'email-password' && (
        <button
          className="px-2 mb-4 block text-gray-500 text-sm"
          onClick={() => setState('default')}
        >
          ← Return to sign-in options
        </button>
      )}
      <div className="pt-2 pb-8 sm:rounded-lg">
        {state === 'default' && router.query.error === 'CredentialsSignin' ? (
          <p className="text-red-500 text-sm text-center mb-6 -mt-2">
            Login failed with the provided credentials
          </p>
        ) : null}
        {state === 'default' && (
          <OAuthProvidersContainer
            onClickEmailPassword={() => setState('email-password')}
          />
        )}
        {state === 'email-password' && (
          <LoginFormContainer csrfToken={csrfToken} />
        )}
      </div>
    </div>
  );
}
