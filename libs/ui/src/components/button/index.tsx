import React from 'react'
import {CheckCircleIcon} from '@heroicons/react/solid'
import { LoadingSpinner } from '../misc/spinner'
import { Transition } from '@headlessui/react'

export interface ButtonProps extends React.PropsWithChildren<{}> {
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
  dataTestId?: string
}

export type ButtonStyle = 'primary' | 'positive' | 'negative' | 'secondary'

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
    // position
    'relative',
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
    'focus:ring-indigo-500',
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
    <LoadingSpinner color='white' />
  )
  
  const buttonProps = getButtonProps({
    type: props.type,
    loading: props.loading,
    disabled: props.disabled,
    className: btnClasses.join(' '),
    onClick: props.onClick
  })

  const buttonState = useButtonState(props.loading);
  return (
    <button {...buttonProps} data-testid={props.dataTestId}>
      <div className='absolute w-full h-full flex flex-col items-center justify-center -mt-2'>
        {buttonState === 'loading' ? spinner : null}
        <Transition 
          show={buttonState === 'completed'}
          enter="duration-50"
          enterFrom="opacity-50"
          enterTo="opacity-100"
          leave="duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          as="span"
        >
          <CheckCircleIcon height={20} width={20} />
        </Transition>
        <Transition 
          show={buttonState === 'idle'}
          enter="delay-150 duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave=""
          leaveFrom=""
          leaveTo=""
          as="span"
        >
          {props.children}
        </Transition>
      </div>
      <span className="opacity-0">{props.children}</span>
    </button>
  )
}

type ButtonState = 'idle' |'loading' | 'completed'

function useButtonState(loading: boolean) {
  const [buttonState, setButtonState] = React.useState<ButtonState>('idle')

  React.useEffect(() => {
    if (loading) {
      setButtonState('loading')
    }
  }, [loading])
  
  React.useEffect(() => {
    let timeout;

    setButtonState(prevState => {
      if (!loading && prevState === 'loading') {
        setTimeout(() => {
          timeout = setButtonState('idle')
        }, 1000)
        return 'completed'
      }

      return prevState
    })

    return () => clearTimeout(timeout);
  }, [buttonState, loading])

  return buttonState
}