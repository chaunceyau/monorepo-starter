import {gql, useLazyQuery} from '@apollo/client';

const PresignedUploadQuery = gql`
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

export function usePresignedUploadLazyQuery() {
  const info = useLazyQuery(PresignedUploadQuery);
  return info;
}
