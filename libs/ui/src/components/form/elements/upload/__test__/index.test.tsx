import '@testing-library/jest-dom';
import {render} from '@testing-library/react';

import {Form} from '../../../';
import {FormUpload} from '../';
import {FormButton} from '../../../elements/button';
import {createMockPresignedUpload, mocks} from './mocks';

/**
 *
 */
describe('<FormUpload/> - WITHOUT default value provided', () => {
  const mockOnSubmit = jest.fn();
  const mockPresignedUpload = createMockPresignedUpload();
  let wrapper;
  beforeEach(() => {
    jest.clearAllMocks();
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

describe('<FormUpload/> - WITH default value provided & multiple = true', () => {
  const mockOnSubmit = jest.fn();
  const mockPresignedUpload = createMockPresignedUpload();
  let wrapper;
  beforeEach(() => {
    jest.clearAllMocks();
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
