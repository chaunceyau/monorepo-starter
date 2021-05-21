import React from 'react'
import { LoadingSpinner } from '../misc/spinner'

export interface ButtonProps {
  children: React.ReactNode
  className?: string
  // TODO: should seperate loading/disabled to either or
  loading?: boolean
  disabled?: boolean
  // full-width?
  fluid?: boolean
  buttonStyle: ButtonStyle
  type?: ButtonType // | 'reset'
  alignRight?: boolean
  //
  onClick?: () => void
}

type ButtonStyle = 'primary' | 'positive' | 'negative' | 'secondary'

type ButtonType = 'submit' | 'button'

function getButtonProps({
  type = 'button',
  className,
  disabled,
  loading,
  onClick
}: any) {
  const buttonProps = {
    type,
    className,
    role: 'button',
    disabled: loading || disabled
  }

  // type === "button"
  if (onClick) {
    // needed? type === 'button' ? props.onClick : null
    Object.assign(buttonProps, { onClick: onClick })
  }

  return buttonProps
}

function getButtonClasses({
  fluid,
  loading,
  disabled,
  className,
  alignRight,
  buttonStyle
}: Pick<
  ButtonProps,
  'fluid' | 'loading' | 'disabled' | 'className' | 'alignRight' | 'buttonStyle'
>): string[] {
  const buttonBaseClasses = [
    // padding
    'py-2',
    'px-4',
    // border
    'border',
    'border-transparent',
    // flex
    'flex',
    'justify-center',
    // text
    'text-sm',
    'font-medium',
    // misc
    'shadow-sm',
    'rounded-md',
    // focus
    'focus:ring-2',
    'focus:outline-none',
    'focus:ring-offset-2',
    'focus:ring-indigo-500'
  ]

  switch (buttonStyle) {
    case 'secondary': {
      buttonBaseClasses.push('border border-gray-300 bg-white text-gray-700')
      if (!disabled) {
        buttonBaseClasses.push('hover:bg-gray-50')
      }
      break
    }

    case 'positive': {
      buttonBaseClasses.push('bg-green-600 text-white')
      if (!disabled) {
        buttonBaseClasses.push('hover:bg-green-700')
      }
      break
    }

    case 'negative': {
      buttonBaseClasses.push('bg-red-600 text-white')
      if (!disabled) {
        buttonBaseClasses.push('hover:bg-red-700')
      }
      break
    }

    case 'primary':
    default: {
      buttonBaseClasses.push('bg-primary text-white')
      if (!disabled) {
        // buttonBaseClasses.push('hover:bg-indigo-700')
        buttonBaseClasses.push('hover:bg-primary')
      }
      break
    }
  }

  if (alignRight) {
    buttonBaseClasses.push('ml-auto')
  }

  if (loading) {
    buttonBaseClasses.push('opacity-50', 'relative', 'cursor-wait')
  }

  if (disabled) {
    buttonBaseClasses.push('opacity-50', 'relative', 'cursor-not-allowed')
  }

  if (fluid) {
    buttonBaseClasses.push('w-full')
  }

  if (typeof className === 'string') {
    buttonBaseClasses.push(className)
  }

  return buttonBaseClasses
}

export function Button(props: ButtonProps) {
  const btnClasses = getButtonClasses({
    fluid: props.fluid,
    loading: props.loading,
    disabled: props.disabled,
    className: props.className,
    alignRight: props.alignRight,
    buttonStyle: props.buttonStyle
  })

  const spinner = (
    <div className='absolute w-full h-full flex items-center justify-center -mt-2'>
      <LoadingSpinner color='white' />
    </div>
  )

  const buttonProps = getButtonProps({
    type: props.type,
    loading: props.loading,
    disabled: props.disabled,
    className: btnClasses.join(' '),
    onClick: props.onClick
  })

  return (
    <button {...buttonProps}>
      {props.loading ? spinner : null}
      <span className={props.loading ? 'opacity-0' : 'font-bold'}>
        {props.children}
      </span>
    </button>
  )
}
