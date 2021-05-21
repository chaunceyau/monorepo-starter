import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
//
import { FormInput } from '..'
import { Form } from '../../..'
import { FormButton } from '../../button'

beforeEach(() => {
  require('mutationobserver-shim')
})

const mockHandleSubmit = jest.fn()

test('form input correctly submits', async () => {
  const component = render(
    <Form
      id='form1'
      onSubmit={mockHandleSubmit}
      // onSubmit={() => mockHandleSubmit()}
      defaultValues={{ testInput: '' }}
    >
      <FormInput
        name='testInput'
        label='Test Input'
        registerOptions={{ required: true }}
      />
      <FormButton buttonStyle='negative'>test submit</FormButton>
    </Form>
  )

  await act(async () => {
    fireEvent.click(component.getByRole('button'))
    await waitFor(
      async () =>
        await expect(
          component.getByText(/must provide a value/i)
        ).toBeInTheDocument()
    )
  })
})
