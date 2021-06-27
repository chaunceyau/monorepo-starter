import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';

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

  beforeEach(() => {
    jest.clearAllMocks();
    render(
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

  it('shows upload a file message if no files', () => {
    expect(screen.getByText(/Upload a file/i)).toBeInTheDocument();
  });
});

describe('<FormUpload/> - WITH default value provided & multiple = true', () => {
  const mockOnSubmit = jest.fn();
  const mockPresignedUpload = createMockPresignedUpload();

  beforeEach(() => {
    jest.clearAllMocks();
    render(
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

  it('<FormUpload/> renders file list with add another file button', () => {
    expect(
      screen.getByText(mocks.input.defaultValue[0].fileName)
    ).toBeInTheDocument();
    expect(screen.getAllByText('Add another file')[0]).toBeInTheDocument();
  });
});
