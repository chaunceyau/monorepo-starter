import React from 'react';
import '@testing-library/jest-dom';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
//
import {Form} from '../../../';
import {FormInput} from '../../../elements/input';
import {FormButton} from '../../../elements/button';
import {GlobalFormUploadProvider} from '../../upload';
import {createMockPresignedUpload} from '../../upload/__test__/mocks';

const mockRequiredMessage = 'this value is required';

describe('Form with text input', () => {
  const mocks = {
    formId: 'mock-form',
    input: {
      name: 'mockFieldName',
      label: 'mock label',
      defaultValue: 'some new default value',
      updatedMockValue: 'some new mock value',
    },
  };

  const mockOnSubmit = jest.fn();
  const mockUploadFileToRemoteStorage = jest.fn().mockImplementation(() => Promise.resolve());
  const mockPresignedUpload = createMockPresignedUpload();

  beforeEach(() => {
    jest.resetAllMocks();
    render(
      <GlobalFormUploadProvider value={{
        queryPresignedUpload: mockPresignedUpload,
        uploadFileToRemoteStorage: mockUploadFileToRemoteStorage,
      }}>        
        <Form id={mocks.formId} onSubmit={mockOnSubmit}>
          <FormInput
            name={mocks.input.name}
            label={mocks.input.label}
            defaultValue={mocks.input.defaultValue}
            registerOptions={{required: mockRequiredMessage}}
          />
          <FormButton buttonStyle="primary" label="submit" />
        </Form>
      </GlobalFormUploadProvider>
    );
  });

  it('<FormInput /> submits with default value', async () => {
    fireEvent.submit(screen.getByRole('button'));
    await waitFor(() => mockPresignedUpload);
    await waitFor(() => mockUploadFileToRemoteStorage);
    await waitFor(() => mockOnSubmit);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      [mocks.input.name]: mocks.input.defaultValue,
    });
  });

  it('<FormInput /> submits with changed value', async () => {
    fireEvent.input(screen.getByLabelText(mocks.input.label), {
      target: {
        value: mocks.input.updatedMockValue,
      },
    });

    fireEvent.submit(screen.getByRole('button'));
    await waitFor(() => mockPresignedUpload);
    await waitFor(() => mockUploadFileToRemoteStorage);
    await waitFor(() => mockOnSubmit);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      [mocks.input.name]: mocks.input.updatedMockValue,
    });
  });

  it('should display required error when value is empty string', async () => {
    fireEvent.input(screen.getByLabelText(mocks.input.label), {
      target: {
        value: '',
      },
    });

    fireEvent.submit(screen.getAllByText(/submit/i)[0]);
    await waitFor(() => mockPresignedUpload);
    await waitFor(() => mockUploadFileToRemoteStorage);
    await waitFor(() => mockOnSubmit);

    expect(mockOnSubmit).not.toHaveBeenCalled();
    expect(screen.getByText(mockRequiredMessage)).toBeInTheDocument();
  });
});
