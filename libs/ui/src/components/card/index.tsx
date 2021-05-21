import React from 'react'

interface CardProps {
  title?: string
  description?: string
  actions?: any[]
}
export function Card({ title, description, actions }: CardProps) {
  const Title = title ? <h2 className='text-xl font-medium'>{title}</h2> : null

  const Description = description ? (
    <p className='text-base text-gray-700'>{description}</p>
  ) : null

  const Actions =
    actions?.map((action) => (
      <button
        key={action}
        className='bg-green-500 py-2 px-4 rounded text-white font-semibold'
      >
        {action} interest
      </button>
    )) || null

  return (
    <div className='border rounded-lg bg-white w-full max-w-4xl pt-4 pb-5 px-4'>
      <div className='flex items-start justify-between space-x-2'>
        <div>
          {Title}
          {Description}
        </div>
        <div className='flex space-x-2 flex-shrink-0 pl-2'>{Actions}</div>
      </div>
    </div>
  )
}
