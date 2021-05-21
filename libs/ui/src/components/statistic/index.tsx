import React from 'react'

interface StatisicProps {
  title: string
  value: number
  // change in value, pos or neg, num or percent
  delta?: string | number
  footerLink?: string
  icon?: React.ReactNode
}

function getDeltaVerb(delta: string | number): 'INCREASED' | 'DECREASED' {
  if (typeof delta === 'string') {
    return delta.startsWith('-') ? 'DECREASED' : 'INCREASED'
  }
  return delta < 0 ? 'DECREASED' : 'INCREASED'
}

export function Statistic(props: StatisicProps) {
  const deltaVerb = props.delta ? getDeltaVerb(props.delta) : null

  const svgClasses = ['self-center flex-shrink-0 h-5 w-5']

  if (deltaVerb === 'INCREASED') {
    //
  } else if (deltaVerb === 'DECREASED') {
    svgClasses.push('transform rotate-180')
  }

  const deltaTextColor =
    deltaVerb === 'INCREASED' ? 'text-green-500' : 'text-red-500'

  return (
    <div className='bg-white overflow-hidden shadow rounded-lg'>
      <div className='px-4 py-5 sm:p-6'>
        <div className='flex items-center'>
          <div className='flex-shrink-0 bg-indigo-500 rounded-md p-3'>
            {/* <!-- Heroicon name: users --> */}
            <div className='h-6 w-6 text-white'>{props.icon}</div>
          </div>
          <div className='ml-5 w-0 flex-1'>
            <dt className='text-sm font-medium text-gray-500 truncate'>
              {props.title}
            </dt>
            <dd className='flex items-baseline'>
              <div className='text-2xl font-semibold text-gray-900'>
                {props.value.toLocaleString()}
              </div>

              {deltaVerb ? (
                <div
                  className={`ml-2 flex items-baseline text-sm font-semibold ${deltaTextColor}`}
                >
                  <svg
                    className={svgClasses.join(' ')}
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span className='sr-only'>{deltaVerb} by</span>
                  {props.delta}
                </div>
              ) : null}
            </dd>
          </div>
        </div>
      </div>
      <div className='bg-gray-100 px-4 py-4 sm:px-6'>
        <div className='text-sm'>
          <a
            href={props.footerLink || '#'}
            className='font-medium text-indigo-600 hover:text-indigo-500'
          >
            View all<span className='sr-only'> {props.title} stats</span>
          </a>
        </div>
      </div>
    </div>
  )
}
