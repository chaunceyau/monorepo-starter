import {gql, useQuery} from '@apollo/client';

export const QueryViewerAccountPage = gql`
  query QueryViewerAccountPage {
    viewer {
      email
      avatar {
        url
        fileName
      }
    }
  }
`;

export function useViewerBasicsQuery() {
  const info = useQuery(QueryViewerAccountPage);
  return info;
}
