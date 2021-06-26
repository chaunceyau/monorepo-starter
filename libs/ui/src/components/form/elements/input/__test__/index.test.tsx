import React from 'react';
import '@testing-library/jest-dom';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
//
import {Form} from '../../../';
import {FormInput} from '../../../elements/input';
import {FormButton} from '../../../elements/button';

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
  let wrapper;
  beforeEach(() => {
    jest.resetAllMocks();
    wrapper = render(
      <Form id={mocks.formId} onSubmit={mockOnSubmit}>
        <FormInput
          name={mocks.input.name}
          label={mocks.input.label}
          defaultValue={mocks.input.defaultValue}
          registerOptions={{required: mockRequiredMessage}}
        />
        <FormButton buttonStyle="primary">submit</FormButton>
      </Form>
    );
  });

  it('<FormInput /> submits with default value', async () => {
    fireEvent.submit(wrapper.getByRole('button'));
    await waitFor(() => mockOnSubmit);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      [mocks.input.name]: mocks.input.defaultValue,
    });
  });

  it('<FormInput /> submits with changed value', async () => {
    fireEvent.input(wrapper.getByLabelText(mocks.input.label), {
      target: {
        value: mocks.input.updatedMockValue,
      },
    });

    fireEvent.submit(wrapper.getByRole('button'));
    await waitFor(() => mockOnSubmit);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      [mocks.input.name]: mocks.input.updatedMockValue,
    });
  });

  it('should display required error when value is empty string', async () => {
    fireEvent.input(wrapper.getByLabelText(mocks.input.label), {
      target: {
        value: '',
      },
    });

    fireEvent.submit(screen.getAllByText(/submit/i)[0]);
    await waitFor(() => mockOnSubmit);

    expect(mockOnSubmit).not.toHaveBeenCalled();
    expect(screen.getByText(mockRequiredMessage)).toBeInTheDocument();
  });
});
