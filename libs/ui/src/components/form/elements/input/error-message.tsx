import React from 'react'

interface FormInputErrorMessageProps {
  message?: string
  name: string
}

export function FormInputErrorMessage({
  message,
  name
}: FormInputErrorMessageProps) {
  return (
    <p className='mt-2 text-sm text-red-600' id={name + '-error'} role='alert'>
      {message || 'There is an issue with this input'}
    </p>
  )
}
