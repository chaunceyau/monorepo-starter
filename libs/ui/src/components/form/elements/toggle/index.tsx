import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { FormLabel } from '../misc/label'

interface FormToggleProps {
  name: string
  label: string
  description?: string
}

export function FormToggle(props: FormToggleProps) {
  return (
    <Controller
      name={props.name}
      render={({ field }) => (
        <Toggle {...props} value={field.value} onChange={field.onChange} />
      )}
    />
  )
}

function Toggle({
  name,
  label,
  description,
  value,
  onChange
}: FormToggleProps & {
  value: boolean
  onChange: (isActive: boolean) => void
}) {
  const btnClasses = [
    'h-6 w-10 relative inline-flex flex-shrink-0',
    'border-2 border-transparent rounded-full',
    'transition-colors ease-in-out duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
  ]

  const circleClasses = [
    'h-5 w-5 inline-block rounded-full shadow',
    'transform ring-0 transition ease-in-out duration-200'
  ]

  circleClasses.push(value ? 'translate-x-4' : 'translate-x-0')

  const ctx = useFormContext()

  if (ctx === undefined) {
    throw new Error('FormToggle must be rendered inside a Form component')
  }

  const wrapperClasses = [
    'rounded-lg flex items-center justify-between border rounded-lg py-3 px-4 shadow-sm'
  ]

  const descriptionClasses = ['text-sm leading-normal tracking-wide']

  if (ctx.formState.isSubmitting) {
    wrapperClasses.push('bg-gray-200')
    descriptionClasses.push('text-gray-400')
    btnClasses.push('bg-gray-300 cursor-wait')
    circleClasses.push('bg-gray-200')
  } else {
    btnClasses.push('cursor-pointer', value ? 'bg-indigo-600' : 'bg-gray-300')
    descriptionClasses.push('text-gray-500')
    circleClasses.push('bg-white')
  }

  return (
    <div className='flex flex-col justify-between'>
      <FormLabel name={name} label={label} error={false} />
      <div className={wrapperClasses.join(' ')}>
        <button
          type='button'
          aria-pressed={value}
          className={btnClasses.join(' ')}
          onClick={() => onChange(!value)}
          disabled={ctx.formState.isSubmitting}
        >
          <span className='sr-only'>Use setting</span>
          <span aria-hidden={!value} className={circleClasses.join(' ')} />
        </button>
        {description ? (
          <span className={descriptionClasses.join(' ')}>{description}</span>
        ) : null}
      </div>
    </div>
  )
}
