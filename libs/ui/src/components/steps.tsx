import React from 'react'

interface ActivityProps {
  items: any[]
}

export function Activity(props: ActivityProps) {
  return (
    <div className='flow-root'>
      <ul className='-mb-8'>
        {props.items.map((_, index) => (
          // TODO: update key
          <li key={index}>
            <div className='relative pb-8'>
              {index < props.items.length - 1 ? (
                <span
                  className='absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200'
                  aria-hidden='true'
                />
              ) : null}
              <div className='relative flex items-start space-x-3'>
                <div>
                  <div className='relative px-1'>
                    <div className='h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center'>
                      {/* <!-- Heroicon name: user-circle --> */}
                      <svg
                        className='h-5 w-5 text-gray-500'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                      >
                        <path
                          fillRule='evenodd'
                          d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className='min-w-0 flex-1 py-1.5'>
                  <div className='text-sm text-gray-500'>
                    <a
                      href='https://google.com'
                      className='font-medium text-gray-900 mr-1'
                    >
                      Hilary Mahy
                    </a>
                    assigned
                    <a
                      href='https://google.com'
                      className='font-medium text-gray-900 ml-1 mr-2'
                    >
                      Kristin Watson
                    </a>
                    <span className='whitespace-nowrap'>2d ago</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
