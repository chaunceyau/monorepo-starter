import {gql, useQuery} from '@apollo/client';

const query = gql`
  query ViewerEmail {
    ...AccountPage_viewerEmail
  }
  fragment AccountPage_viewerEmail on Query { viewer { email } }
`;

export function useViewerEmailQuery() {
  const info = useQuery(query);
  return info;
}
