import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Button, ButtonProps } from '../../../button'

interface FormButtonProps extends Omit<ButtonProps, 'onClick' | 'type'> {}

export function FormButton(props: FormButtonProps) {
  const ctx = useFormContext()

  return (
    <Button
      {...props}
      type='submit'
      loading={ctx.formState.isSubmitting}
      disabled={props.disabled}
    />
  )
}
