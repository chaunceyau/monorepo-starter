import '@testing-library/jest-dom';
import {act, fireEvent, render} from '@testing-library/react';
// import { act } from 'react-dom/test-utils'

import {Form} from '../../../';
import {FormUpload} from '../';
import {FileStateObject} from '../types';
import {FormButton} from '../../../elements/button';

// keep fileNames <= 20 characters or test will break
const defaultValue: Array<FileStateObject> = [
  {
    fileName: 'fake-file.png',
    status: 'COMPLETE',
    progress: 100,
    id: 'file_id_123',
  },
  {
    fileName: 'another-file.png',
    status: 'COMPLETE',
    progress: 100,
    id: 'file_id_456',
  },
];

const mocks = {
  formId: 'mock-form',
  input: {
    defaultValue,
    name: 'mockUploadInputVariableName',
    label: 'mock upload input label',
    // value: 'some new mock value',
  },
};

describe('<FormUpload /> without default value provided', () => {
  const mockOnSubmit = jest.fn();
  let wrapper;
  beforeEach(() => {
    wrapper = render(
      <Form id={mocks.formId} onSubmit={mockOnSubmit}>
        <FormUpload
          name={mocks.input.name}
          label={mocks.input.label}
          onDeleteMutation={() => {}}
          onUploadComplete={async () => {}}
          presignedUpload={async () => ({
            data: {presignedUpload: {url: '', fileId: '', fields: []}},
          })}
        />
        <FormButton buttonStyle="primary">submit</FormButton>
      </Form>
    );
  });

  it('<FormUpload /> renders with no default', async () => {
    expect(wrapper.getByText(/Upload a file/i)).toBeInTheDocument();
  });
});

describe('<FormUpload /> with default value provided', () => {
  const mockOnSubmit = jest.fn();
  const mockOnDeleteMutation = jest.fn();
  let wrapper;

  beforeEach(() => {
    wrapper = render(
      <Form id={mocks.formId} onSubmit={mockOnSubmit}>
        <FormUpload
          name={mocks.input.name}
          label={mocks.input.label}
          defaultValue={mocks.input.defaultValue}
          onDeleteMutation={mockOnDeleteMutation}
          onUploadComplete={async () => {}}
          presignedUpload={async () => ({
            data: {presignedUpload: {url: '', fileId: '', fields: []}},
          })}
          // registerOptions={{required: 'this value is required'}}
        />
        <FormButton buttonStyle="primary">submit</FormButton>
      </Form>
    );
  });

  /**
   * if fileName > 20 char this test will fail b/c of
   * .slice(...) in file-item.tsx
   */
  it('<FormUpload /> renders file list with default value provided', async () => {
    expect(
      wrapper.getByText(mocks.input.defaultValue[0].fileName)
    ).toBeInTheDocument();
    expect(
      wrapper.getByText(mocks.input.defaultValue[1].fileName)
    ).toBeInTheDocument();
    // expect(wrapper.findAllByText('Add another file'));
  });

  it('<FormUpload /> delete 1', async () => {
    await act(async () => {
      // Click the delete icon
      fireEvent.click(
        wrapper.getByTestId('delete-' + mocks.input.defaultValue[0].fileName)
      );
      fireEvent.click(wrapper.getAllByText(/submit/i)[0]);
    });
    expect(wrapper.getAllByText(/submit/i)[0]).toBeInTheDocument();
    // TODO: update below...
    expect(mockOnSubmit).toHaveBeenCalledWith({
      mockUploadInputVariableName: [
        {
          fileName: 'fake-file.png',
          id: 'file_id_123',
          progress: 100,
          status: 'PENDING_REMOVAL',
        },
        {
          fileName: 'another-file.png',
          id: 'file_id_456',
          progress: 100,
          status: 'COMPLETE',
        },
      ],
    });
    expect(mockOnDeleteMutation).toHaveBeenCalled()
  });

  it('<FormUpload /> delete 2', async () => {
    await act(async () => {
      // Click the delete icons
      fireEvent.click(
        wrapper.getByTestId('delete-' + mocks.input.defaultValue[0].fileName)
      );
      fireEvent.click(
        wrapper.getByTestId('delete-' + mocks.input.defaultValue[1].fileName)
      );
      fireEvent.click(wrapper.getAllByText(/submit/i)[0]);
    });
    expect(wrapper.getAllByText(/submit/i)[0]).toBeInTheDocument();
    // TODO: update below...
    expect(mockOnSubmit).toHaveBeenCalledWith({
      mockUploadInputVariableName: [
        {
          fileName: 'fake-file.png',
          id: 'file_id_123',
          progress: 100,
          status: 'PENDING_REMOVAL',
        },
        {
          fileName: 'another-file.png',
          id: 'file_id_456',
          progress: 100,
          status: 'PENDING_REMOVAL',
        },
      ],
    });
  });

  // it('<FormUpload /> adds key for deleteFileId when clicking trash and submit', async () => {
  //   act(() => {
  //     fireEvent.click(
  //       wrapper.getByRole('button', {
  //         name: `Delete ${mocks.input.defaultValue[1].fileName}`,
  //       })
  //     );
  //     fireEvent.click(
  //       wrapper.getByRole('button', {
  //         name: 'save',
  //       })
  //     );
  //   });
  // });
});
describe('<FormUpload /> with default value provided & multiple = true', () => {
  const mockOnSubmit = jest.fn();
  let wrapper;
  beforeEach(() => {
    wrapper = render(
      <Form id={mocks.formId} onSubmit={mockOnSubmit}>
        <FormUpload
          multiple={true}
          name={mocks.input.name}
          label={mocks.input.label}
          defaultValue={mocks.input.defaultValue}
          onDeleteMutation={() => {}}
          onUploadComplete={async () => {}}
          presignedUpload={async () => ({
            data: {presignedUpload: {url: '', fileId: '', fields: []}},
          })}
          // registerOptions={{required: 'this value is required'}}
        />
        <FormButton buttonStyle="primary">submit</FormButton>
      </Form>
    );
  });

  it('<FormUpload /> renders file list with add another file button', async () => {
    expect(
      wrapper.getByText(mocks.input.defaultValue[0].fileName)
    ).toBeInTheDocument();
    expect(wrapper.getAllByText('Add another file')[0]).toBeInTheDocument();
  });
});
