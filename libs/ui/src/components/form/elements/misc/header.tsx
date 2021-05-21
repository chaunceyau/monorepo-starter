import React from 'react'

interface FormHeaderProps {
  title: string
  description?: string
}

export function FormHeader({ title, description }: FormHeaderProps) {
  return (
    <div>
      <h3 className='text-lg leading-6 font-medium text-gray-900 tracking-wide'>
        {title}
      </h3>
      {description ? (
        <p className='mt-1 text-sm text-gray-500'>{description}</p>
      ) : null}
    </div>
  )
}
