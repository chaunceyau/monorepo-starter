import React from 'react'
import * as RHForm from 'react-hook-form'
import { FormLabel } from '../misc/label'

interface FormTextAreaProps {
  name: string
  label: string
  placeholder?: string
  registerOptions?: RHForm.RegisterOptions
}

export function FormTextarea(props: FormTextAreaProps) {
  const ctx = RHForm.useFormContext()

  const textAreaClasses: string[] = ['p-2 text-sm text-gray-700 w-full']

  // if(disabled)

  textAreaClasses.push('border border-gray-300 rounded-lg')

  return (
    <div>
      <FormLabel name={props.name} label={props.label} error={false} />
      <textarea
        id={props.name}
        className={textAreaClasses.join(' ')}
        {...ctx.register(props.name, props.registerOptions)}
      />
    </div>
  )
}
