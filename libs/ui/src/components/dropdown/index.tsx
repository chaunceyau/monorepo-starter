import { Transition } from '@headlessui/react'
import React from 'react'
import { useClickOutside } from '../../hooks/useClickOutside'

interface Link {
  to: string
  label: string
}

interface DropdownMenuProps {
  links: Link[]
  linkComponent: (link: Link) => React.ReactNode
}

export function DropdownMenu(props: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false)

  const popupRef = React.useRef<HTMLDivElement>(null)

  useClickOutside(popupRef, () => setOpen(false))

  return (
    <div className='relative inline-block text-left'>
      <div>
        <button
          type='button'
          className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'
          // TODO: probably update this...
          id='options-menu'
          aria-haspopup='true'
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          Options
          <svg
            className='-mr-1 ml-2 h-5 w-5'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>

      <Transition
        show={open}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <div
          ref={popupRef}
          className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'
        >
          <div
            className='py-1'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='options-menu'
          >
            {props.links.map((link) =>
              React.cloneElement(props.linkComponent(link) as any, {
                className:
                  'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              })
            )}
          </div>
        </div>
      </Transition>
    </div>
  )
}
