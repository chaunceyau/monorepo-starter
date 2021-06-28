import {gql, useQuery} from '@apollo/client';
import AccountPage from 'apps/next-starter/pages/account';

const query = gql`
  query ViewerEmail {
    ...AccountPage_viewerEmail
  }
  ${AccountPage.fragments.viewerEmail}
`;

export function useViewerEmailQuery() {
  const info = useQuery(query);
  return info;
}
