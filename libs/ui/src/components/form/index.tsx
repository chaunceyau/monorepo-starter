import React from 'react'
import { toast } from 'react-hot-toast'
import * as RHForm from 'react-hook-form'

//
import { Toasts } from '../misc/toasts'
import { FormButton } from './elements/button'
import { FormUpload } from './elements/upload'
import { FormInput } from './elements/input'
import { FormToggle } from './elements/toggle'
import { FormSelect } from './elements/select'
import { FormDivider } from './elements/divider'
import { FormRadioGroup, FormRadioGroupProps } from './elements/radio'
import { FormTextarea } from './elements/textarea'
import { FormDateInput } from './elements/date'
import { CardHeader } from '../card/header'
import { Card } from '@monorepo-starter/ui'

export interface FormProps {
  id: string
  title?: string
  styled?: boolean
  description?: string
  clearValuesOnSubmit?: boolean
  children: React.ReactElement | React.ReactElement[]
  defaultValues?: { [key: string]: any }
  // UPDATE
  onSubmit: (data: any) => void | Promise<void>
}

// TODO: am i using formsubmitbutton?
const ValidFormComponents: any = [
  FormInput,
  FormUpload,
  FormToggle,
  FormButton,
  FormSelect,
  FormDivider,
  FormTextarea,
  FormDateInput,
  FormRadioGroup
]

function validateChild(child: any) {
  if (!ValidFormComponents.includes(child.type)) {
    // fn = "Error: function FormHeader({ ...etc }) { }"
    const fn: string = child.type.toString()
    const firstParenthesisIndex = fn.indexOf('(')
    // 9 = "function ".length
    const componentName: string = fn.slice(9, firstParenthesisIndex)
    throw new Error(
      `${componentName} is not a valid child of the Form component.`
    )
  }
}

function initializeOptionInForm(child: any, defaultValues: any = {}) {
  switch (child.type) {
    case FormRadioGroup: {
      const props: FormRadioGroupProps = child.props

      const noDefaultValueForRadioGroup =
        !defaultValues || !defaultValues[props.name]

      // default to first value
      if (noDefaultValueForRadioGroup && !!props.options?.length) {
        Object.assign(defaultValues, {
          [props.name]: props.options[0].id
        })
      }
    }
  }
}

// currently causes errors with storybook
const VALIDATE_CHILDREN = false

function validateChildrenAndInitializeOptionForm(
  children: React.ReactElement | React.ReactElement[],
  defaultValues?: { [key: string]: any }
) {
  React.Children.map(children, (child) => {
    // make sure valid child
    if (VALIDATE_CHILDREN) {
      validateChild(child)
    }
    // add default values if not provided for options
    initializeOptionInForm(child, defaultValues)
  })
}

export function Form({
  id,
  onSubmit: _onSubmit,
  children,
  title,
  description,
  styled,
  clearValuesOnSubmit,
  defaultValues
}: FormProps) {
  //
  validateChildrenAndInitializeOptionForm(children, defaultValues)

  const methods = RHForm.useForm({ defaultValues })
  const { handleSubmit, reset, setValue } = methods

  const onSubmit = async (data: any) => {
    const isFunctionAsync = _onSubmit.constructor.name === 'AsyncFunction'

    const deleteFiles: { [key: string]: string[] } = {}

    React.Children.forEach(children, async (child) => {
      if (child.type === FormUpload) {
        deleteFiles[child.props.name] = data[child.props.name].reduce(
          (acc: any, val: any) => {
            return val.status === 'PENDING_REMOVAL' ? acc.concat(val.id) : acc
          },
          []
        )
      }
    })

    try {
      for (const [, value] of Object.entries(deleteFiles)) {
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve(value)
          }, 500)
        )
      }

      await _onSubmit(data)

      for (const [key, deletes] of Object.entries<any>(deleteFiles)) {
        setValue(
          key,
          data[key].filter(
            (val: any) => !deletes.some((d: string) => d === val.id)
          )
        )
      }

      if (clearValuesOnSubmit) {
        reset()
      }

      if (isFunctionAsync) {
        toast.success('successfully submitted your info')
      }
    } catch (err) {
      if (isFunctionAsync) {
        toast.error(err)
      }
    }
  }

  // TODO: test this for form id...
  // const ref = useRef<any>()
  // ref.current = Math.random()

  return (
    // todo pass formId to form children
    <form id={id} onSubmit={handleSubmit(onSubmit)}>
      <Card styled={styled} title={title} description={description}>
        {/* <div className={styled ? 'border rounded-lg bg-white py-6 px-8 shadow-sm relative' : ''}> */}
        {/* {title ? <CardHeader title={title} description={description} /> : null} */}
        <div className={`flex flex-col space-y-4 ${styled ? 'pb-20' : ''}`}>
          <RHForm.FormProvider {...methods}>
            {React.Children.map(children, (child) => {
              switch (child.type) {
                case FormButton: {
                  return (
                    <div
                      className={
                        styled
                          ? 'bg-gray-100 py-4 px-8 rounded-b-lg shadow-t flex justify-end absolute bottom-0 left-0 w-full'
                          : 'pt-2'
                      }
                    >
                      {child}
                    </div>
                  )
                }
                default:
                  return child
              }
            })}
          </RHForm.FormProvider>
        </div>
      </Card>
      <Toasts />
    </form>
  )
}
