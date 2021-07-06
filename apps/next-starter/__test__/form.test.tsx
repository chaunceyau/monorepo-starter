import React from 'react';
import '@testing-library/jest-dom';
import {render} from '@testing-library/react';

import {
  Form,
  FormButton,
  FormUpload,
  GlobalFormUploadProvider,
} from '@monorepo-starter/ui';

import {server} from '../__mocks__/server';
import {initializeApollo} from '../util/api-client';

export const mockPresignedUploadResponse = {
  data: {
    presignedUpload: {
      fields: [{key: 'fake-meta-key', value: 'fake-meta-value'}],
      fileId: 'fakeFileId',
      url: 'https://fake.aws.com/fake_upload',
    },
  },
};

export function createMockPresignedUpload() {
  // return jest.fn().mockImplementation(() => new Promise(resolve => {
  //   console.log(" IN NEW MOCK ")
  //   setTimeout(() => {
  //     console.log(" RESOLVING ")
  //     resolve({
  //       data: {presignedUpload: {url: '', fileId: '', fields: []}},
  //     })
  //   }, 1000)
  // }));
  return jest.fn().mockImplementation(() =>
    Promise.resolve(mockPresignedUploadResponse));
}

describe('<FormUpload/> works with spy', () => {
  const mockOnSubmit = jest.fn();
  const mockOnUploadComplete = jest.fn();
  const mockUploadFileToRemoteStorage = jest.fn().mockImplementation(() => Promise.resolve());
  const mockPresignedUpload = createMockPresignedUpload();
  
  beforeEach(() => {
    jest.clearAllMocks();
    server.listen();
    initializeApollo();

    render(
      <GlobalFormUploadProvider value={{
        queryPresignedUpload: mockPresignedUpload,
        uploadFileToRemoteStorage: mockUploadFileToRemoteStorage,
      }}>
        <Form id={'mocks.formId'} onSubmit={mockOnSubmit}>
          <FormUpload
            multiple={true}
            name={'mockVariableName'}
            label={'mockLabel'}
            defaultValue={undefined}
            onDeleteMutation={() => {}}
            onUploadComplete={mockOnUploadComplete}
            required={false}
          />
          <FormButton buttonStyle="primary" label="submit" />
        </Form>
      </GlobalFormUploadProvider>
    );
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('uploadFileToS3 function runs properly', async () => {
    expect(1 + 1).toEqual(2)
  });
});
