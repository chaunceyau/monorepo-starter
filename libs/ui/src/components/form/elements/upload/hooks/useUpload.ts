import * as React from 'react';
//
import {useGlobalFormUploadContext} from '@monorepo-starter/ui';
//
import {UploadReducerState, useUploadReducer} from './reducer';
import {
  OnUploadCompleteFunction,
  FileStateObject,
  GetUploadUrlAndUploadFileOptions,
} from '../types';

// TODO: check args
export function useUploadFileComponent(
  fileState: FileStateObject,
  // user provided funcitno
  onUploadComplete: OnUploadCompleteFunction
): UploadReducerState {
  const [state, dispatch] = useUploadReducer();
  const {queryPresignedUpload, uploadFileToRemoteStorage} =
    useGlobalFormUploadContext();
  React.useEffect(() => {
    if (fileState.file && !state.loading && state.progress !== 100) {
      getUploadUrlAndUploadFile(fileState, {
        queryPresignedUpload,
        uploadFileToRemoteStorage,
        uploadEvents: {
          onUploadStart: () => dispatch({type: 'START_UPLOAD'}),
          onUploadComplete: () => {
            dispatch({type: 'UPLOAD_COMPLETE'});
            return onUploadComplete;
          },
          onUploadProgressFunction: () => dispatch({type: 'INCREASE_PROGRESS'}),
          onUploadError: error => dispatch({type: 'ERROR', payload: {error}}),
        },
      });
    }
  }, [fileState]);
  return state;
}

/**
 * Handles both calling to request an aws presigned post request url
 * (https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html)
 * and then takes file and uploads to the presigned post url
 * @param fileState
 * @param onUploadComplete
 * @param queryPresignedUpload
 * @param uploadFileToRemoteStorage
 * @param onUploadStart
 * @returns
 */
export async function getUploadUrlAndUploadFile(
  fileState: FileStateObject,
  options: GetUploadUrlAndUploadFileOptions
) {
  options.uploadEvents.onUploadStart();

  const response = await options
    .queryPresignedUpload(fileState.file)
    .then(async res => {
      const presignedUpload = res.data.presignedUpload;
      const fileForm = new FormData();
      for (const {key, value} of presignedUpload.fields) {
        fileForm.append(key, value);
      }
      fileForm.append('file', fileState.file);

      await options
        .uploadFileToRemoteStorage(
          fileState.file,
          presignedUpload.url,
          fileForm,
          options.uploadEvents.onUploadProgressFunction
        )
        .then(() => {
          // TODO: make sure this is correct
          options.uploadEvents.onUploadComplete(
            fileState.id + '/' + fileState.fileName
          );
        })
        .catch(error => {
          options.uploadEvents.onUploadError(error);
        });
      options.uploadEvents.onUploadComplete(res.data.presignedUpload.fileId);
      return res;
    })
    .catch(err => {
      // TODO: handle this with better
      console.log('errrr presigning upload');
    });
  return response;
}
