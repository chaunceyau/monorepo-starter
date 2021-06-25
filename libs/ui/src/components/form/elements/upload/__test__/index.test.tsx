import '@testing-library/jest-dom';
import {MockedProvider} from '@apollo/client/testing';
import {
  act,
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
// import { act } from 'react-dom/test-utils'

import {Form} from '../../../';
import {FormUpload} from '../';
import {FormButton} from '../../../elements/button';
import {FakeQueriedDefaultValueForm, mocks, queryMocks} from './mocks';

/**
 *
 */
describe('<FormUpload/> - WITHOUT default value provided', () => {
  const mockOnSubmit = jest.fn();
  const mockPresignedUpload = createMockPresignedUpload()
  let wrapper;
  beforeEach(() => {
    wrapper = render(
      <Form id={mocks.formId} onSubmit={mockOnSubmit}>
        <FormUpload
          name={mocks.input.name}
          label={mocks.input.label}
          onDeleteMutation={() => {}}
          onUploadComplete={async () => {}}
          presignedUpload={mockPresignedUpload}
        />
        <FormButton buttonStyle="primary">submit</FormButton>
      </Form>
    );
  });

  it('shows upload a file message if no files', async () => {
    expect(wrapper.getByText(/Upload a file/i)).toBeInTheDocument();
  });
});

/**
 *
 */
describe('<FormUpload/> - WITH default value provided', () => {
  const mockOnSubmit = jest.fn();
  const mockOnDeleteMutation = jest.fn();
  const mockPresignedUpload = createMockPresignedUpload();
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
          presignedUpload={mockPresignedUpload}
        />
        <FormButton buttonStyle="primary">submit</FormButton>
      </Form>
    );
  });

  /**
   * if fileName > 20 char this test will fail b/c of
   * .slice(...) in file-item.tsx
   */
  it('renders the list of default files', async () => {
    expect(
      wrapper.getByText(mocks.input.defaultValue[0].fileName)
    ).toBeInTheDocument();
    expect(
      wrapper.getByText(mocks.input.defaultValue[1].fileName)
    ).toBeInTheDocument();
    // expect(wrapper.findAllByText('Add another file'));
  });

  it('properly handles deleting 1 file and submitting', async () => {
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
    expect(mockOnDeleteMutation).toHaveBeenCalled();
  });

  it('properly handles deleting > 1 file and submitting', async () => {
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
});

describe('<FormUpload/> - with queried default value', () => {
  const mockOnSubmit = jest.fn();
  let wrapper;
  beforeEach(() => {
    wrapper = render(
      <MockedProvider mocks={queryMocks} addTypename={false}>
        <FakeQueriedDefaultValueForm onSubmit={mockOnSubmit} />
      </MockedProvider>
    );
  });

  it('renders list after data returns', async () => {
    await waitForElementToBeRemoved(wrapper.queryByText(/loading/i));
    expect(wrapper.queryByText(/some mocked fileName2/i)).toBeInTheDocument();
  });
});

describe('<FormUpload/> - WITH default value provided & multiple = true', () => {
  const mockOnSubmit = jest.fn();
  const mockPresignedUpload = createMockPresignedUpload();
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
          presignedUpload={mockPresignedUpload}
        />
        <FormButton buttonStyle="primary">submit</FormButton>
      </Form>
    );
  });

  it('<FormUpload/> renders file list with add another file button', async () => {
    expect(
      wrapper.getByText(mocks.input.defaultValue[0].fileName)
    ).toBeInTheDocument();
    expect(wrapper.getAllByText('Add another file')[0]).toBeInTheDocument();
  });
});

function createMockPresignedUpload() {
  return jest.fn().mockImplementation(() => new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: {presignedUpload: {url: '', fileId: '', fields: []}},
      })
    }, 10000)
  }));
}