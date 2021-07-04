import {ApolloQueryResult, gql} from '@apollo/client';
import {apolloClient} from '../util/api-client';

export const PresignedUploadQuery = gql`
  query PresignedUploadQuery($input: AwsS3UploadOptions!) {
    presignedUpload(input: $input) {
      url
      fileId
      fields {
        key
        value
      }
    }
  }
`;

// TODO: replace w/ gql
interface PresignedUploadReplaceMe {
  presignedUpload: {
    url: string;
    fileId: string;
    fields: Array<{
      key: string;
      value: string;
    }>;
  };
}

// export so we can test
export function queryPresignedUpload(
  file
): Promise<ApolloQueryResult<PresignedUploadReplaceMe>> {
  return apolloClient.query({
    query: PresignedUploadQuery,
    variables: {
      input: {
        type: file.file.type,
        size: file.file.size,
        fileName: file.file.name,
        fileId: file.id,
      },
    },
  });
}

export function usePresignedUploadQuery() {
  // const [query, queryInfo] = useLazyQuery(PresignedUploadQuery);
  // const client = useApolloClient();
  return {
    queryPresignedUpload: file => queryPresignedUpload(file),
  };
}
