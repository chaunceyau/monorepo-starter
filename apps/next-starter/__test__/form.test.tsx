import React from 'react';
import '@testing-library/jest-dom';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import {
  Form,
  FormButton,
  FormUpload,
  mapDroppedFilesToState,
} from '@monorepo-starter/ui';

import {queryPresignedUpload} from '../graphql/presignedUpload';
import {server} from '../__mocks__/server';
import {initializeApollo} from '../util/api-client';
import {uploadFileToS3} from 'libs/ui/src/components/form/elements/upload/hooks/useUpload';
import { mockPresignedUploadQueryResponse } from '../__mocks__/handlers';

describe('<FormUpload/> works with spy', () => {
  const mockOnSubmit = jest.fn();
  const mockPresignedUpload = jest.fn().mockImplementation(() => Promise.resolve({
    data: {
      presignedUpload: {
        fields: [{key: 'fake-meta-key', value: 'fake-meta-value'}],
        fileId: 'req.variables.fileId',
        url: 'https://fake.aws.com/fake_upload',
      },
    },
  }));
  const mockOnUploadComplete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    server.listen();
    initializeApollo();

    render(
      <Form id={'mocks.formId'} onSubmit={mockOnSubmit}>
        <FormUpload
          multiple={true}
          name={'mockVariableName'}
          label={'mockLabel'}
          defaultValue={undefined}
          onDeleteMutation={() => {}}
          onUploadComplete={mockOnUploadComplete}
          presignedUpload={mockPresignedUpload}
          required={false}
        />
        <FormButton buttonStyle="primary" label="submit">
      </Form>
    );
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('uploadFileToS3 function runs properly', async () => {
    const file = new File([''], 'filename.txt', {type: 'text/html'});
    const fileState = mapDroppedFilesToState([file]);

    await uploadFileToS3(
      fileState[0],
      mockOnUploadComplete,
      mockPresignedUpload,
      () => {}
    );

    expect(mockPresignedUpload).toHaveReturned()
    expect(mockOnUploadComplete).toHaveBeenCalled()
  });
});
