import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
// import { act } from 'react-dom/test-utils'
import {Form} from '../../../';
import {FormButton} from '../../../elements/button';
import {FormUpload} from '..';
import {FileStateObject} from '../types';

// const mockOnSubmit = (data: any) => jest.fn(data)
const defaultValue: Array<FileStateObject> = [{
  fileName: 'fake-file.png',
  status: 'COMPLETE',
  progress: 100,
  id: 'mock_random_id',
}];
const mocks = {
  formId: 'mock-form',
  input: {
    defaultValue,
    name: 'mockFieldName',
    label: 'mock label',
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
  let wrapper;
  beforeEach(() => {
    wrapper = render(
      <Form id={mocks.formId} onSubmit={mockOnSubmit}>
        <FormUpload
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

  it('<FormUpload /> renders file list with default value provided', async () => {
    expect(
      wrapper.getByText(mocks.input.defaultValue[0].fileName)
    ).toBeInTheDocument();
  });
});
