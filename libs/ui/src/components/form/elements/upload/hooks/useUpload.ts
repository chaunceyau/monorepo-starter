import * as React from 'react';
//
//
import {UploadReducerState, useUploadReducer} from './reducer';
import {useGlobalFormUploadContext} from '../provider';
import {
  OnUploadCompleteFunction,
  FileStateObject,
  GetUploadUrlAndUploadFileOptions,
} from '../types';
import {FieldValues, useFormContext, UseFormReturn} from 'react-hook-form';
import {FileListItemProps} from '../files/file-item';

// TODO: check args
export function useUploadFileComponent(
  fileState: FileListItemProps,
  // user provided funciton
  onUploadComplete: OnUploadCompleteFunction
): UploadReducerState {
  const [state, dispatch] = useUploadReducer();
  const {queryPresignedUpload, uploadFileToRemoteStorage} =
    useGlobalFormUploadContext();
  const formCtx = useFormContext();

  React.useEffect(() => {
    if (fileState.file && !state.loading && state.progress !== 100) {
      getUploadUrlAndUploadFile(formCtx, fileState, {
        fieldName: fileState.fieldName,
        queryPresignedUpload,
        uploadFileToRemoteStorage,
        uploadEvents: {
          onUploadStart: () => dispatch({type: 'START_UPLOAD'}),
          onUploadComplete: fileState => {
            dispatch({type: 'UPLOAD_COMPLETE'});
            return onUploadComplete(fileState);
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
 * file id is initially set to filename
 * so server can reliably generate us a new id.
 * when id comes back, we need to update the item id
 */
function updateExistingStateFileId(
  ctx: UseFormReturn<FieldValues>,
  key: string,
  newId: string,
  idFieldName: string = 'id'
) {
  const value = ctx.getValues(key);
  const newValue = Object.assign({}, value, {[idFieldName]: newId});

  ctx.setValue(key, newValue);
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
  ctx: UseFormReturn<FieldValues>,
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

      updateExistingStateFileId(
        ctx,
        'options.fieldName',
        presignedUpload.fileId
      );

      await options
        .uploadFileToRemoteStorage(
          fileState.file,
          presignedUpload.url,
          fileForm,
          options.uploadEvents.onUploadProgressFunction
        )
        .then(() => {
          // TODO: make sure this is correct
          options.uploadEvents.onUploadComplete(fileState);
        })
        .catch(error => {
          options.uploadEvents.onUploadError(error);
        });
      return res;
    })
    .catch(err => {
      // TODO: handle this with better
      console.log('errrr presigning upload');
    });
  return response;
}
