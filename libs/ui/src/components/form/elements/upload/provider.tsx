import React from 'react';
import {FileStateObject, PresignedUploadFunction, UploadToRemoteFileStorageFunction} from './types';

/**
 * We use a provider for the queryPresignedUpload &
 * uploadFileToRemoteStorage b/c we don't want to pass
 * these to every component as it shouldn't change
 * also - we don't want to put the query logic in the
 * lib b/c we don't have access to the apollo client
 */

export interface GlobalFormUploadContextValues {
  queryPresignedUpload: PresignedUploadFunction;
  uploadFileToRemoteStorage: UploadToRemoteFileStorageFunction;
}

export interface GlobalFormUploadProviderProps
  extends React.PropsWithChildren<{value: GlobalFormUploadContextValues}> {}

const GlobalFormUploadContext =
  React.createContext<GlobalFormUploadContextValues>({
    queryPresignedUpload: async (file: File) => ({
      data: {
        presignedUpload: { 
          url: '',
          fileId: '',
          fields: [],
        }
      }
    }),
    uploadFileToRemoteStorage: async (file: File) => ({success:true}),
  });
  
export function GlobalFormUploadProvider(props: GlobalFormUploadProviderProps) {
  console.log("HEREEEEEE")
  return (
    <GlobalFormUploadContext.Provider value={props.value}>
      {props.children}
    </GlobalFormUploadContext.Provider>
  );
}

export function useGlobalFormUploadContext() {
  console.log('fmasdf9m923k9dfm923m392')
  const ctx = React.useContext<GlobalFormUploadContextValues>(
    GlobalFormUploadContext
  );
  return ctx;
}
