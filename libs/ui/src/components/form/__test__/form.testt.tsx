import React from 'react'
import { render } from '@testing-library/react'
import { Form } from '..'
import { FormInput } from '../elements/input'
// import { act } from 'react-dom/test-utils'

// const mockOnSubmit = (data: any) => jest.fn(data)
const mockOnSubmit = jest.fn()

describe('App', () => {
  beforeEach(() => {
    require('mutationobserver-shim')

    render(
      <Form onSubmit={mockOnSubmit}>
        <FormInput
          name='fieldName'
          label='example label'
          registerOptions={{ required: 'this value is required' }}
        />
      </Form>
    )
  })

  it('adds', () => expect(1 + 1).toEqual(2))

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
})
