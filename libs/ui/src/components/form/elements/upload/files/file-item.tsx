import React from 'react'
import { useFormContext } from 'react-hook-form'
//
import { ProgressBar } from '../../../../misc/progress-bar'
import { CheckIcon } from '../../../../icons/check'
import { ArchiveSvg } from '../../../../icons/archive'
import { LoadingSpinner } from '../../../../misc/spinner'
import { useUpload } from '../hooks/useUpload'
import {
  FileStateObject,
  OnUploadCompleteFunction,
  PresignedUpload
} from '../types'

interface FileListItemProps extends FileStateObject {
  name: string
  onUploadComplete: OnUploadCompleteFunction
  presignedUpload: PresignedUpload
}

export function FileListItem(props: FileListItemProps) {
  const ctx = useFormContext()

  const state = useUpload(props, props.onUploadComplete, props.presignedUpload)

  if (typeof ctx === 'undefined') {
    throw new Error('FileListItem must be rendered inside a Form component')
  }

  const pendingRemoval = props.status === 'PENDING_REMOVAL'

  const liClasses = ['flex items-center']

  if (pendingRemoval) {
    liClasses.push('line-through')
  }

  if (pendingRemoval || ctx.formState.isSubmitting) {
    liClasses.push('text-gray-400')
  } else if (state.error) {
    liClasses.push('text-red-500')
  } else if (!props.file || state.progress === 100) {
    liClasses.push('text-green-500')
  } else {
    liClasses.push('text-gray-400')
  }

  // TODO: error on liClasses... i.e. progress not 100 and error
  const showLoading = !state.error && props.file && state.progress !== 100

  return (
    <li key={props.id} className={liClasses.join(' ')}>
      {showLoading ? <LoadingSpinner color='currentColor' /> : <CheckIcon />}

      <p className='flex-shrink-0 flex-grow mr-8 ml-3 overflow-hidden text-sm tracking-wide'>
        {props.fileName.slice(0, 20)}
        {props.fileName.length > 20 ? '...' : null}
      </p>

      {showLoading ? (
        <div className='flex-grow mr-6'>
          <ProgressBar percent={state.progress} />
        </div>
      ) : null}

      {pendingRemoval ? (
        <button
          type='button'
          disabled={ctx.formState.isSubmitting}
          onClick={() => {
            // map through existing and update statuss

            ctx.setValue(
              props.name,
              ctx
                .getValues()
                [props.name].map((val: any) =>
                  val.id === props.id
                    ? Object.assign({}, val, { status: 'IDLE' })
                    : val
                )
            )
          }}
        >
          <svg
            aria-hidden='true'
            focusable='false'
            data-prefix='fas'
            data-icon='undo-alt'
            className='w-3 h-auto'
            role='img'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
          >
            <path
              fill='currentColor'
              d='M255.545 8c-66.269.119-126.438 26.233-170.86 68.685L48.971 40.971C33.851 25.851 8 36.559 8 57.941V192c0 13.255 10.745 24 24 24h134.059c21.382 0 32.09-25.851 16.971-40.971l-41.75-41.75c30.864-28.899 70.801-44.907 113.23-45.273 92.398-.798 170.283 73.977 169.484 169.442C423.236 348.009 349.816 424 256 424c-41.127 0-79.997-14.678-110.63-41.556-4.743-4.161-11.906-3.908-16.368.553L89.34 422.659c-4.872 4.872-4.631 12.815.482 17.433C133.798 479.813 192.074 504 256 504c136.966 0 247.999-111.033 248-247.998C504.001 119.193 392.354 7.755 255.545 8z'
            ></path>
          </svg>
        </button>
      ) : null}
      {!pendingRemoval ? (
        <button
          type='button'
          className={`ml-4 ${ctx.formState.isSubmitting ? '' : 'text-red-500'}`}
          disabled={ctx.formState.isSubmitting}
          onClick={() => {
            ctx.setValue(
              props.name,
              // map through existing and update statuss
              ctx
                .getValues()
                [props.name].map((val: any) =>
                  val.id === props.id
                    ? Object.assign({}, val, { status: 'PENDING_REMOVAL' })
                    : val
                )
            )
          }}
        >
          <ArchiveSvg />
        </button>
      ) : null}
    </li>
  )
}
