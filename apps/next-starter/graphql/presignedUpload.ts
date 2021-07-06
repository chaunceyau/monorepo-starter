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
  file: File
): Promise<ApolloQueryResult<PresignedUploadReplaceMe>> {
  console.log({file});
  return apolloClient.query({
    query: PresignedUploadQuery,
    fetchPolicy: 'network-only',
    variables: {
      input: {
        type: file.type,
        size: file.size,
        fileName: file.name,
      },
    },
  });
}
