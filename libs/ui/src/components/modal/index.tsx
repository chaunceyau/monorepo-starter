import { Transition } from '@headlessui/react'
import React from 'react'
import ReactDOM from 'react-dom'
import { useClickOutside } from '../../hooks/useClickOutside'
import { Button } from '../button'
import { AsyncButton } from '../button/async-button'
import { ButtonGroup } from '../button/group'
import { CheckIcon } from '../icons/check'

interface ModalProps {
  title: string
  description: string
  type?: ModalType
  trigger: any // React.ReactNode
  // onClose: () => void
  // show: boolean
  action?: {
    label: string
    func: () => Promise<void>
  }
}

export function Modal(props: ModalProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <div>
      {React.cloneElement(props.trigger as any, {
        onClick: () => setIsOpen(true)
      })}
      <Portal {...props} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}

const textColor = (type?: 'info' | 'positive' | 'negative' | undefined) => {
  switch (type) {
    case 'info': {
      return 'text-blue-600'
    }
    case 'positive': {
      return 'text-green-600'
    }
    case 'negative': {
      return 'text-red-600'
    }
    default: {
      return 'text-gray-900'
    }
  }
}

function Portal(
  props: Omit<ModalProps, 'trigger'> & { isOpen: boolean; onClose: () => void }
) {
  const [actionLoading, setActionLoading] = React.useState(false)
  const modalRef = React.useRef<HTMLDivElement>(null)

  useClickOutside(modalRef, () => props.onClose())

  return ReactDOM.createPortal(
    <Transition
      show={props.isOpen}
      enter='ease-out duration-300'
      className='fixed z-10 inset-0 overflow-y-auto'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='ease-in duration-200'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
          <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
        </div>

        {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
        <span
          className='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'
        >
          &#8203;
        </span>

        <Transition
          show={props.isOpen}
          enter='ease-out duration-300'
          enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          enterTo='opacity-100 translate-y-0 sm:scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 translate-y-0 sm:scale-100'
          leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-sm transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
          role='dialog'
          aria-modal='true'
          aria-labelledby='modal-headline'
        >
          <div
            className={`bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 relative ${
              actionLoading ? 'opacity-50' : ''
            }`}
            ref={modalRef}
          >
            <div className='absolute top-0 right-0'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <div className='sm:flex sm:items-start'>
              {props.type ? <ModalIcon type={props.type} /> : null}
              <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                <h3
                  role='heading'
                  id='modal-headline'
                  className={
                    'text-lg leading-6 font-medium ' + textColor(props.type)
                  }
                >
                  {props.title}
                </h3>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>{props.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
            <ButtonGroup>
              <Button
                buttonStyle='secondary'
                onClick={props.onClose}
                disabled={actionLoading}
              >
                {props.action ? 'Cancel' : 'Close'}
              </Button>
              {props.action ? (
                <AsyncButton
                  buttonStyle='negative'
                  onClick={async () => {
                    setActionLoading(true)
                    await props.action?.func()
                    setTimeout(() => {
                      props.onClose()
                      setActionLoading(false)
                    }, 2150)
                  }}
                >
                  {props.action.label || (
                    <div className='text-red-400 flex items-center justify-center'>
                      <CheckIcon />
                    </div>
                  )}
                </AsyncButton>
              ) : null}
            </ButtonGroup>
          </div>
        </Transition>
      </div>
    </Transition>,
    document.body
  )
}

type ModalType = 'info' | 'positive' | 'negative'

interface ModalIconProps {
  type: ModalType
}

function ModalIcon(props: ModalIconProps) {
  const wrapperClasses = [
    'mx-auto flex-shrink-0 flex items-center justify-center',
    'h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10'
  ]
  const svgClasses = ['h-6 w-6']

  switch (props.type) {
    case 'positive': {
      wrapperClasses.push('bg-green-100')
      svgClasses.push('text-green-600')
      break
    }
    case 'negative': {
      wrapperClasses.push('bg-red-100')
      svgClasses.push('text-red-600')
      break
    }
    case 'info': {
      wrapperClasses.push('bg-blue-100')
      svgClasses.push('text-blue-600')
      break
    }
  }

  return (
    <div className={wrapperClasses.join(' ')}>
      <svg
        className={svgClasses.join(' ')}
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        aria-hidden='true'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
        />
      </svg>
    </div>
  )
}
