import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react'
import React from 'react'
import { Modal } from './index'

const action = {
  label: 'test action',
  func: async () => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({})
      }, 2500)
    })
  }
}

const title = 'Eius at perspiciatis voluptate'
const description = 'Numquam rem maxime voluptates omnis doloremque nemo'

describe('modal component', () => {
  it('displays cancel button with no action', async () => {
    const Trigger: React.ReactNode = <button>test trigger</button>

    render(<Modal title={title} description={description} trigger={Trigger} />)

    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => screen.getByText(description))

    expect(screen.getByText(description)).toBeInTheDocument()
    expect(screen.getByRole('heading')).toHaveTextContent(title)

    fireEvent.click(screen.getByText(/close/i))

    await waitForElementToBeRemoved(() => screen.getByText(description))
  })

  it('displays action button if provided', async () => {
    render(
      <Modal
        title={title}
        description={description}
        action={action}
        trigger={<button>test trigger</button>}
      />
    )

    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => screen.getByText(action.label))

    expect(screen.getByRole('heading')).toHaveTextContent(title)
    expect(screen.getByText(action.label)).toBeInTheDocument()
  })
})
