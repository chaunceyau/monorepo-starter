import * as React from 'react';
import {Provider as AuthProvider} from 'next-auth/client';
import {AppProps} from 'next/app';
import {ApolloProvider} from '@apollo/client';
//
import {FileStateObject, GlobalFormUploadProvider, LayoutProvider} from '@monorepo-starter/ui';
import {createAbilitiesForUser} from '@monorepo-starter/casl';
//
import {useApollo} from '../util/api-client';
import {AbilityContext} from '../util/casl';
import {UI_APP_NAVIGATION} from '../util/routes/nav';
//

interface ApplicationProvidersProps extends Pick<AppProps, 'pageProps'> {}

export function ApplicationProviders({
  pageProps,
  children,
}: React.PropsWithChildren<ApplicationProvidersProps>) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <AuthProvider session={pageProps.session}>
      <LayoutProvider value={UI_APP_NAVIGATION}>
        <ApolloProvider client={apolloClient}>
          <AbilityContext.Provider
            value={createAbilitiesForUser(pageProps.session?.user)}
          >
            <GlobalFormUploadProvider value={{
                queryPresignedUpload: (file: File) => {},
                uploadFileToRemoteStorage: (file: FileStateObject) => {},
            }}>
              {children}
            </GlobalFormUploadProvider>
          </AbilityContext.Provider>
        </ApolloProvider>
      </LayoutProvider>
    </AuthProvider>
  );
}
