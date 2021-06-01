import * as React from 'react'
import { useFormContext } from 'react-hook-form'
//
import { FileListItem } from './file-item'
import { Button } from '../../../../button'
import { FileStateObject, PresignedUpload } from '../types'

interface FileListProps {
  name: string
  value: FileStateObject[]
  uploadInputRef: any
  onDeleteMutation: any
  onUploadComplete: any
  allowMultipleFiles: boolean
  presignedUpload: PresignedUpload
}

export function FileList(props: FileListProps) {
  const ctx = useFormContext()

  if (ctx === undefined) {
    throw new Error('FormToggle must be rendered inside a Form component')
  }

  const onClickAddImageButton = React.useCallback(() => {
    props.uploadInputRef.current?.click()
  }, [props.uploadInputRef])

  const ulClasses = ['space-y-4']

  if (!props.allowMultipleFiles || ctx.formState.isSubmitting) {
    ulClasses.push('mb-1')
  } else {
    ulClasses.push('mb-5')
  }

  const wrapperClasses = ['w-full px-6 py-4 border rounded-lg shadow-sm']
  if (ctx.formState.isSubmitting) {
    wrapperClasses.push('bg-gray-200')
  }

  return null
}
