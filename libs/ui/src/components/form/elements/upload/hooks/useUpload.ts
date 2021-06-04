import axios from 'axios'
import * as React from 'react'
import {
  OnUploadCompleteFunction,
  FileStateObject,
  PresignedUpload
} from '../types'
import {
  UploadReducerState,
  UploadFileAction,
  useUploadReducer
} from './reducer'

// TODO: check args
export function useUpload(
  fileState: FileStateObject,
  // function to update a record with newly uploaded s3 id
  onUploadComplete: OnUploadCompleteFunction,
  // imageUploadUrl: ImageUploadUrl
  presignedUpload: PresignedUpload
): UploadReducerState {
  const [state, dispatch] = useUploadReducer()
  React.useEffect(() => {
    if (fileState.file && !state.loading && state.progress !== 100) {
      uploadFileToS3(fileState, onUploadComplete, presignedUpload, dispatch)
    }
  }, [fileState])
  return state
}

async function uploadFileToS3(
  fileState: FileStateObject,
  onUploadComplete: OnUploadCompleteFunction,
  presignedUpload: PresignedUpload,
  dispatch: React.Dispatch<UploadFileAction>
) {
  console.log({fileState});
  if (fileState.file) {
    dispatch({ type: 'START_UPLOAD' })

    const res = await presignedUpload({
      id: fileState.id,
      file: fileState.file
    })

    const fileForm = new FormData()
    res.data.presignedUpload.fields.forEach(({ key, value }) =>
      fileForm.append(key, value)
    )
    fileForm.append('file', fileState.file)

    const response = postFileToS3(
      fileState.file,
      res.data.presignedUpload.url,
      fileForm,
      (progressEvent) => {
        console.log({
          payload: (progressEvent.loaded / progressEvent.total) * 100
        })
        dispatch({
          type: 'INCREASE_PROGRESS',
          payload: (progressEvent.loaded / progressEvent.total) * 100
        })
      }
    )
      .then(() => {
        console.log('UPLOAD_COMPLETE')
        dispatch({ type: 'UPLOAD_COMPLETE' })
        // aws s3 file key
        onUploadComplete(fileState.id + '/' + fileState.fileName)
      })
      .catch((err) => dispatch({ type: 'ERROR', payload: err }))

    return response
  }
}

async function postFileToS3(
  file: File,
  url: string,
  formData: FormData,
  onUploadProgress: (progressEvent: ProgressEvent) => void
) {
  const response = await axios.post(url, formData, {
    onUploadProgress,
    headers: {
      'Content-Type': 'multipart/form-data',
      // 'Content-Disposition': contentDisposition(fileName)
      // NOTE/TODO: no content-dispo might break upload
      'Content-Disposition': `attachment; filename=${
        file.name //+ '.' + file.type
      }`
      // Content-Disposition: form-data; name="fieldName"; filename="filename.jpg"
    }
  })
  return response
}
