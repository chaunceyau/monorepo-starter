import '@testing-library/jest-dom';
import {
  act,
  render,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
} from '@testing-library/react';

import {Form} from '../../../';
import {FormUpload} from '../';
import {FormButton} from '../../../elements/button';
import {createMockPresignedUpload, mocks} from './mocks';

/**
 *
 */
describe('<FormUpload/> - WITH default value provided', () => {
  const mockDefaultValue = mocks.input.defaultValue;
  const mockOnSubmit = jest.fn();
  const mockOnDeleteMutation = jest.fn();
  const mockPresignedUpload = createMockPresignedUpload();
  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = render(
      <Form id={mocks.formId} onSubmit={mockOnSubmit}>
        <FormUpload
          name={mocks.input.name}
          label={mocks.input.label}
          defaultValue={mockDefaultValue}
          onDeleteMutation={mockOnDeleteMutation}
          onUploadComplete={async () => {}}
          presignedUpload={mockPresignedUpload}
        />
        <FormButton buttonStyle="primary">submit</FormButton>
      </Form>
    );
  });

  it('switches view when click delete & returns when click undo', async () => {
    const fileName = mockDefaultValue[0].fileName;
    expect(wrapper.getByTestId('delete-' + fileName)).toBeInTheDocument();

    fireEvent.click(wrapper.getByTestId('delete-' + fileName));
    expect(wrapper.getByTestId('undo-delete-' + fileName)).toBeInTheDocument();

    fireEvent.click(wrapper.getByTestId('undo-delete-' + fileName));
    expect(wrapper.getByTestId('delete-' + fileName)).toBeInTheDocument();
  });

  it('click delete then undo - make sure not actually deleted', async () => {
    const fileName = mockDefaultValue[0].fileName;
    fireEvent.click(wrapper.getByTestId('delete-' + fileName));
    fireEvent.click(wrapper.getByTestId('undo-delete-' + fileName));
    fireEvent.submit(wrapper.getByRole('button', {name: /submit/i}));

    await waitFor(() => mockOnSubmit);

    // TODO: update mockOnSubmit assertion
    expect(mockOnSubmit).toHaveBeenCalledWith({
      mockUploadInputVariableName: [
        {
          fileName: 'fake-file.png',
          id: 'file_id_123',
          progress: 100,
          status: 'COMPLETE',
        },
        {
          fileName: 'another-file.png',
          id: 'file_id_456',
          progress: 100,
          status: 'COMPLETE',
        },
      ],
    });

    expect(mockOnDeleteMutation).toHaveBeenCalledWith([]);
  });

  it('renders the list of default files', async () => {
    expect(wrapper.getByText(mockDefaultValue[0].fileName)).toBeInTheDocument();
    expect(wrapper.getByText(mockDefaultValue[1].fileName)).toBeInTheDocument();
  });

  it('properly handles deleting 1 file and submitting', async () => {
    await act(async () => {
      // Click the delete icon
      fireEvent.click(
        wrapper.getByTestId('delete-' + mockDefaultValue[0].fileName)
      );
      fireEvent.click(wrapper.getAllByText(/submit/i)[0]);
    });
    expect(wrapper.getAllByText(/submit/i)[0]).toBeInTheDocument();
    // TODO: update mockOnSubmit assertion
    expect(mockOnSubmit).toHaveBeenCalledWith({
      mockUploadInputVariableName: [
        Object.assign({}, mockDefaultValue[0], {
          status: 'PENDING_REMOVAL',
        }),
        mockDefaultValue[1],
      ],
    });
    expect(mockOnDeleteMutation).toHaveBeenCalledWith(['file_id_123']);
  });

  it('properly handles deleting > 1 file and submitting', async () => {
    const deleteFirstIcon = wrapper.getByTestId(
      'delete-' + mockDefaultValue[0].fileName
    );
    const deleteSecondIcon = wrapper.getByTestId(
      'delete-' + mockDefaultValue[1].fileName
    );
    expect(deleteFirstIcon).toBeInTheDocument();
    expect(deleteSecondIcon).toBeInTheDocument();
    
    fireEvent.click(deleteFirstIcon);
    fireEvent.click(deleteSecondIcon);
    fireEvent.click(wrapper.getAllByText(/submit/i)[0]);

    await waitFor(() => mockOnSubmit);
    // await waitFor(() => mockOnDeleteMutation)

    expect(wrapper.getAllByText(/submit/i)[0]).toBeInTheDocument();
    // TODO: update mockOnSubmit assertion
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
    expect(mockOnDeleteMutation).toHaveBeenCalledWith([
      'file_id_123',
      'file_id_456',
    ]);
  });
});
