import {graphql, rest} from 'msw';

export const mockPresignedUploadQueryResponse = (fileId: string) => ({
  presignedUpload: {
    fields: [{key: 'fake-meta-key', value: 'fake-meta-value'}],
    fileId: fileId,
    url: 'https://fake.aws.com/fake_upload',
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
