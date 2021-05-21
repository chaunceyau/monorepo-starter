import React from 'react'
import { useFormContext } from 'react-hook-form'
export interface FormOption {
  id: string
  value: string
  // more description info
  caption?: string
}

export function FormRadioOption(
  props: FormOption & {
    variableName: string
  }
) {
  const ctx = useFormContext()

  if (ctx === undefined) {
    throw new Error('FormRadioOption must be rendered inside a Form component')
  }

  const wrapperClasses = [
    'p-4 flex w-full'
    // 'md:pl-4 md:pr-6 md:grid md:grid-cols-2',
    // 'first:rounded-t-md last:rounded-b-md'
    // 'first:rounded-t-md last:rounded-b-md'
  ]

  const inputClasses = [
    'focus:ring-indigo-500 h-5 w-5 cursor-pointer border-gray-300'
  ]
  const labelClasses = ['flex items-center text-sm w-full']
  const captionClasses = [
    'text-sm',
    'md:ml-0 md:pl-0 md:text-right',
    'ml-6 pl-1'
  ]

  if (ctx.formState.isSubmitting) {
    labelClasses.push('cursor-wait')
    captionClasses.push('text-gray-400')
    wrapperClasses.push('bg-gray-200 text-gray-400')
    inputClasses.push('text-gray-400 cursor-wait')
  } else {
    labelClasses.push('cursor-pointer')
    captionClasses.push('text-gray-500')
    inputClasses.push('text-indigo-600')
  }

  /* <!-- On: "bg-indigo-50 border-indigo-200 z-10", Off: "border-gray-200" --> */

  return (
    <li key={props.id} className={wrapperClasses.join(' ')}>
      <label className={labelClasses.join(' ')} htmlFor={props.id}>
        <input
          type='radio'
          id={props.id}
          value={props.id}
          name={props.variableName}
          disabled={ctx.formState.isSubmitting}
          ref={ctx.register({ required: true })}
          className={inputClasses.join(' ')}
          aria-describedby='plan-option-pricing-0 plan-option-limit-0'
        />
        <div className='flex justify-between pl-2 -mt-px w-full'>
          <span className='font-medium'>{props.value}</span>
          {props.caption ? (
            <span
              // id='plan-option-limit-0'
              className={captionClasses.join(' ')}
            >
              {props.caption}
            </span>
          ) : null}
        </div>
      </label>
      {/* <!-- On: "text-indigo-700", Off: "text-gray-500" --> */}
    </li>
  )
}
