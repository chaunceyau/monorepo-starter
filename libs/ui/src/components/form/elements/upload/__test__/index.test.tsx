import '@testing-library/jest-dom';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';

import {Form} from '../../../';
import {FormUpload} from '../';
import {FormButton} from '../../../elements/button';
import {createMockPresignedUpload, mockPresignedUploadResponse, mocks} from './mocks';
import {GlobalFormUploadProvider} from '../provider';

/**
 *
 */
describe('<FormUpload/> shows normal upload component with no default value', () => {
  const mockOnSubmit = jest.fn();
  const mockOnUploadComplete = jest.fn();
  const mockOnDeleteMutation = jest.fn();
  const mockUploadFileToRemoteStorage = jest.fn().mockImplementation(() => Promise.resolve());
  const mockPresignedUpload = createMockPresignedUpload();

  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <GlobalFormUploadProvider value={{
        queryPresignedUpload: mockPresignedUpload,
        uploadFileToRemoteStorage: mockUploadFileToRemoteStorage,
      }}>
        <Form id={mocks.formId} onSubmit={mockOnSubmit}>
          <FormUpload
            name={mocks.input.name}
            label={mocks.input.label}
            onDeleteMutation={mockOnDeleteMutation}
            onUploadComplete={mockOnUploadComplete}
          />
          <FormButton buttonStyle="primary" label="submit" />
        </Form>
      </GlobalFormUploadProvider>
    );
  });

  it('shows upload a file message if no files', () => {
    expect(screen.getByText(/Upload a file/i)).toBeInTheDocument();
  });
});

describe('<FormUpload/> basics with default value', () => {
  const mockOnSubmit = jest.fn();
  const mockOnUploadComplete = jest.fn();
  const mockOnDelete = jest.fn();
  const mockUploadFileToRemoteStorage = jest.fn().mockImplementation(() => Promise.resolve());
  const mockPresignedUpload = createMockPresignedUpload();

  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <GlobalFormUploadProvider value={{
        queryPresignedUpload: mockPresignedUpload,
        uploadFileToRemoteStorage: mockUploadFileToRemoteStorage,
      }}>
        <Form id={mocks.formId} onSubmit={mockOnSubmit}>
          <FormUpload
            multiple={true}
            name={mocks.input.name}
            label={mocks.input.label}
            defaultValue={mocks.input.defaultValue}
            onDeleteMutation={mockOnDelete}
            onUploadComplete={mockOnUploadComplete}
          />
          <FormButton buttonStyle="primary" label="submit" />
        </Form>
      </GlobalFormUploadProvider>
    );
  });

  it('renders provided default values/files', () => {
    for (const file of mocks.input.defaultValue) {
      expect(screen.getByText(file.fileName)).toBeInTheDocument();
    }
  });

  it('rends add another file button when files selected', () => {
    expect(screen.getAllByText('Add another file')[0]).toBeInTheDocument();
  });

  it('handles input change with adding a file', async () => {
    const file = new File([new ArrayBuffer(1)], 'file.jpg');

    fireEvent.change(screen.getByLabelText(/upload a file/i), {
      target: {files: [file]},
    });

    await waitFor(() => mockPresignedUpload);
    await waitFor(() => mockUploadFileToRemoteStorage);

    expect(mockPresignedUpload()).resolves.toEqual(mockPresignedUploadResponse);

    expect(mockPresignedUpload).toHaveBeenCalled();
    
    // await waitFor(() => mockOnUploadComplete);
    // expect(mockOnUploadComplete).toHaveBeenCalled();
    
    // expect(mockOnUploadComplete).toHaveBeenCalled();
    // expect(screen.getAllByText(/submit/i)[0]).toBeInTheDocument();
    // fireEvent.click(screen.getAllByText(/submit/i)[0]);
    // await waitFor(() => mockOnSubmit)
    // expect(mockOnSubmit).toHaveBeenCalledWith({});
    // expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    // expect(mockOnSubmit).toHaveBeenCalledWith({
    //   fileState: {
    //     id: 'ckqizqnax0000z1v3bgaq44te',
    //     file: file,
    //     fileName: 'file.jpg',
    //     status: 'IDLE',
    //     progress: 0,
    //     name: 'mockUploadInputVariableName',
    //     presignedUpload: mockPresignedUpload,
    //     onUploadComplete: mockOnUploadComplete,
    //   }
    // })
    // await waitFor(() => expect(screen.getByText(file.name)).toBeInTheDocument())
    // fireEvent.change(screen.getByTestId('upload-input-add-file-button'), {target:{files:[file]}});
    // expect(screen.getByRole('button',{name:file.name})).toBeInTheDocument()

    // expect(screen.getByText(file.name)).toBeInTheDocument();
  });
});
