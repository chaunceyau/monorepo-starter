import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import {act} from 'react-dom/test-utils';
// import { act } from 'react-dom/test-utils'
import {Form} from '../../../';
import {FormInput} from '../../../elements/input';
import {FormButton} from '../../../elements/button';

// const mockOnSubmit = (data: any) => jest.fn(data)

describe('Form with text input', () => {
  const mocks = {
    formId: 'mock-form',
    input: {
      name: 'mockFieldName',
      label: 'mock label',
      defaultValue: 'some new default value',
      value: 'some new mock value',
    },
  };

  const mockOnSubmit = jest.fn();
  let wrapper;
  beforeEach(() => {
    wrapper = render(
      <Form id={mocks.formId} onSubmit={mockOnSubmit}>
        <FormInput
          name={mocks.input.name}
          label={mocks.input.label}
          defaultValue={mocks.input.defaultValue}
          registerOptions={{required: 'this value is required'}}
        />
        <FormButton buttonStyle="primary">submit</FormButton>
      </Form>
    );
  });


  it('<FormInput /> submits with default value', async () => {
    await act(async () => {
      fireEvent.submit(wrapper.getByRole('button'));
    });

    expect(mockOnSubmit).toHaveBeenCalledWith({
      [mocks.input.name]: mocks.input.defaultValue,
    });
  });

  it('<FormInput /> submits with changed value', async () => {

    await act(async () => {
      fireEvent.input(wrapper.getByLabelText(mocks.input.label), {
        target: {
          value: mocks.input.value,
        },
      });

      fireEvent.submit(wrapper.getByRole('button'));
    });

    expect(mockOnSubmit).toHaveBeenCalledWith({
      [mocks.input.name]: mocks.input.value,
    });
  });
});

// it('should display required error when value is not provided', async () => {
//   await act(async () => {
//     fireEvent.submit(screen.getByText(/save/i))

//     await waitFor(() =>
//       expect(screen.getByText(/this value is required/i)).toBeInTheDocument()
//     )

//     expect(mockOnSubmit).not.toHaveBeenCalled()
//   })
// })

// it('should be called with the correct value', async () => {
//   await act(async () => {
//     fireEvent.input(screen.getByLabelText(/example label/i), {
//       target: {
//         value: 'test-value'
//       }
//     })

//     // test-value
//     fireEvent.submit(screen.getByText(/save/i))

//     await waitFor(() =>
//       expect(mockOnSubmit).toHaveBeenCalledWith({ fieldName: 'test-value' })
//     )
//   })
// })
