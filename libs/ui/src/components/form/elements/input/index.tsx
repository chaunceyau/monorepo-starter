import React from 'react'
import * as RHForm from 'react-hook-form'
import { FormLabel } from '../misc/label'
import { FormInputErrorMessage } from './error-message'

export interface FormInputProps {
  name: string
  label: string
  type?: 'text' | 'number'
  placeholder?: string
  registerOptions?: RHForm.RegisterOptions
}

function getFormInputStyles({ loading, error }: any) {
  let textColor = 'text-gray-700'

  const inputBaseClasses = [
    'border',
    'block',
    'w-full',
    'px-3 py-2',
    'pr-10',
    'sm:text-sm',
    'rounded-md',
    'focus:outline-none'
  ]

  if (loading) {
    inputBaseClasses.push('bg-gray-200 text-gray-400 cursor-wait')
  } else {
    inputBaseClasses.push('bg-white')
  }

  if (typeof error === 'undefined') {
    inputBaseClasses.push(
      'border-gray-300',
      'placeholder-gray-300',
      'focus:ring-gray-500',
      'focus:border-indigo-500'
    )
  } else {
    inputBaseClasses.push(
      'border-red-400',
      'placeholder-red-300',
      'focus:ring-red-500',
      'focus:border-red-500'
    )
  }

  if (error) {
    textColor = 'text-red-600'
  }

  return {
    textColor,
    inputBaseClasses
  }
}

export const FormInput = (props: FormInputProps) => {
  const ctx = RHForm.useFormContext()
  if (ctx === undefined) {
    throw new Error('FormInput must be rendered inside a Form component')
  }

  const styles = getFormInputStyles({
    loading: ctx.formState.isSubmitting,
    error: ctx.errors[props.name]
  })

  return (
    <div className={styles.textColor}>
      <FormLabel
        name={props.name}
        label={props.label}
        error={!!ctx.errors[props.name]}
        required={Boolean(props.registerOptions?.required)}
      />
      <div className='relative rounded-md shadow-sm'>
        <input
          type={props.type || 'text'}
          id={props.name}
          name={props.name}
          ref={ctx.register(props.registerOptions)}
          disabled={ctx.formState.isSubmitting}
          placeholder={props.placeholder}
          className={styles.inputBaseClasses.join(' ')}
          aria-describedby={
            ctx.formState.errors ? props.name + '-error' : props.name
          }
          aria-invalid={!!ctx.errors[props.name]}
        />
      </div>
      {ctx.errors[props.name] ? (
        <FormInputErrorMessage
          name={props.name}
          message={
            ctx.errors[props.name]?.message ||
            ctx.errors[props.name]?.type === 'required'
              ? 'You must provide a value for this field'
              : ''
          }
        />
      ) : null}
    </div>
  )
}
