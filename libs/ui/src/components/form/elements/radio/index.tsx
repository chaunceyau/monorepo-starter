import React from 'react'

import { FormLabel } from '../misc/label'
import { FormOption, FormRadioOption } from './option'

export interface FormRadioGroupProps {
  name: string
  label: string
  options: FormOption[]
}

// TODO: a11y friendly
/**
 * select one of multiple options
 * @param props
 */
export function FormRadioGroup(props: FormRadioGroupProps) {
  if (props.options.length === 0) {
    throw new Error('you must provide atleast one option')
  }

  return (
    <fieldset>
      <FormLabel name={props.label} label={props.label} error={false} />
      <legend className='sr-only'>{props.label}</legend>
      <ul className='relative bg-white -space-y-px shadow-sm divide-y border rounded-lg'>
        {props.options.map((option) => (
          <FormRadioOption
            {...option}
            key={option.id}
            variableName={props.name}
          />
        ))}
      </ul>
    </fieldset>
  )
}
