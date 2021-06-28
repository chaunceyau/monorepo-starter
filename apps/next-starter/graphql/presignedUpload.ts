import {gql, useApolloClient} from '@apollo/client';

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

export function usePresignedUploadQuery() {
  // const [query, queryInfo] = useLazyQuery(PresignedUploadQuery);
  const client = useApolloClient();

  return {
    queryPresignedUpload: async file =>
      client.query({
        query: PresignedUploadQuery,
        variables: {
          input: {
            type: file.file.type,
            size: file.file.size,
            fileName: file.file.name,
            fileId: file.id,
          },
        },
      }),
  };
}
