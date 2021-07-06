import {graphql, rest} from 'msw';
import {mockPresignedUploadResponse} from '../__test__/form.test';

// TODO: probably should just
export const mockPresignedUploadQueryResponse = (fileId: string) => ({
  data: {
    presignedUpload: {
      ...mockPresignedUploadResponse.data.presignedUpload,
      fileId,
    },
  },
});

export const handlers = [
  graphql.query('PresignedUploadQuery', (req, res, ctx) => {
    console.log('--- intercepted presigned upload query ---');
    // const {username} = req.variables;
    const fileId = req.variables.fileId;
    const presignedUpload = ctx.data(mockPresignedUploadQueryResponse(fileId));
    return res(presignedUpload);
  }),
  rest.post('https://fake.aws.com/fake_upload', (_req, res, ctx) => {
    console.log('--- intercepted aws post request ---');
    // const {username} = req.variables;
    return res(ctx.status(204));
  }),
];
