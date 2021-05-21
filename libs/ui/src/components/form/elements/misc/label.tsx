import * as React from 'react'

export interface FormLabelProps {
  name: string
  label: string
  error: boolean
  required?: boolean
}

export function FormLabel({ name, label, error, required }: FormLabelProps) {
  const classes = ['text-sm font-bold tracking-wide']

  classes.push(error ? 'text-red-600' : 'text-gray-800')

  return (
    <div className='mb-2'>
      <label htmlFor={name} className={classes.join(' ')}>
        {label}
        {required ? <span className='text-red-500 ml-px'>*</span> : null}
      </label>
    </div>
  )
}
