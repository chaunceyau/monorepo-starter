import React from 'react'
import DatePicker from 'react-datepicker'
//
import { FormLabel } from '../misc/label'
// import 'react-datepicker/dist/react-datepicker.css'
import { Controller, useFormContext } from 'react-hook-form'

interface FormDateInputProps {
  name: string
  label: string
  showHours?: boolean
}

export function FormDateInput(props: FormDateInputProps) {
  const ctx = useFormContext()

  return (
    <div>
      <FormLabel name={props.name} label={props.label} error={false} />
      <Controller
        control={ctx.control}
        name={props.name}
        defaultValue={new Date()}
        render={({ field }) => (
          <DatePicker
            className='border border-gray-300 rounded-lg p-2 w-full text-gray-800'
            onBlur={field.onBlur}
            selected={field.value}
            onChange={field.onChange}
            timeInputLabel='Time:'
            dateFormat='MM/dd/yyyy h:mm aa'
            showTimeSelect={!!props.showHours}
            autoComplete='false'
          />
        )}
      />
    </div>
  )
}
