import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import { DropzoneInputProps } from 'react-dropzone'

interface UploadInputProps {
  name: string
  hidden: boolean
  getRootProps?: any
  horizontal?: boolean
  getInputProps: (props?: DropzoneInputProps | undefined) => DropzoneInputProps
  allowedFileTypes?: Array<'image/png' | 'image/jpg' | 'image/gif'>
  maxFileSizeBytes?: number
}

export function UploadInput(props: UploadInputProps) {
  const ctx = useFormContext()

  const svgClasses = ['text-gray-400']
  const flexWrapper = ['flex items-center space-x-2']
  const containerClasses = [
    'border rounded-md flex cursor-pointer rounded-lg shadow-sm'
  ]

  if (props.horizontal) {
    containerClasses.push('justify-start pl-4 py-4')
    svgClasses.push('h-6 w-6 mr-3')
  } else {
    containerClasses.push('flex-col pt-4 pb-5')
    svgClasses.push('h-8 w-8 mb-2 mx-auto')
    flexWrapper.push('flex-col')
  }

  if (ctx.formState.isSubmitting) {
    containerClasses.push('bg-gray-200 cursor-wait shadow-sm')
    flexWrapper.push('opacity-25')
    svgClasses.push('opacity-25')
  } else {
    containerClasses.push('bg-white')
  }

  if (props.hidden) {
    containerClasses.push('hidden')
  }

  return (
    <div className={containerClasses.join(' ')} {...props.getRootProps()}>
      <svg
        className={svgClasses.join(' ')}
        stroke='currentColor'
        fill='none'
        viewBox='0 0 48 48'
        aria-hidden='true'
      >
        <path
          d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
      <div className={flexWrapper.join(' ')}>
        <div className='flex text-sm text-gray-600'>
          <span className='relative rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'>
            Upload a file
          </span>
          <input
            id={props.name}
            name={props.name}
            type='file'
            className='sr-only'
            {...props.getInputProps()}
            disabled={ctx.formState.isSubmitting}
          />
          <p className='pl-1'>or drag and drop</p>
        </div>
        <p className='text-xs text-gray-500 mt-px'>
          {props.allowedFileTypes?.join(', ') || 'Any file type'} up to{' '}
          {formatBytes(props.maxFileSizeBytes || 1024 * 1024 * 5)}
        </p>
      </div>
    </div>
  )
}
function formatBytes(a: number, b: number = 2) {
  if (0 === a) return '0 Bytes'
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024))
  return (
    parseFloat((a / Math.pow(1024, d)).toFixed(c)) +
    ' ' +
    ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]
  )
}
