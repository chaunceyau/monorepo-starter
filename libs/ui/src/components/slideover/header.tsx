import React from 'react'

export interface SlideoverHeaderProps {
  title: string
  description: string
}

type SlideoverHeaderComponentProps = SlideoverHeaderProps & {
  onClose: () => any
}

export function SlideoverHeader({
  onClose,
  title,
  description
}: SlideoverHeaderComponentProps) {
  return (
    <div className='px-4 py-6 bg-gray-200 sm:px-6 flex-shrink-0'>
      <div className='flex items-start justify-between space-x-3'>
        <div className='space-y-1'>
          <h2
            id='slide-over-heading'
            className='text-lg font-medium text-gray-900'
          >
            {title}
          </h2>
          <p className='text-sm text-gray-500'>{description}</p>
        </div>
        <div className='h-7 flex items-center'>
          <button
            type='button'
            onClick={onClose}
            className='bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          >
            <span className='sr-only'>Close panel</span>
            {/* <!-- Heroicon name: x --> */}
            <svg
              className='h-6 w-6'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
