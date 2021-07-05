import React from 'react';
import {FileStateObject} from './types';

/**
 * We use a provider for the queryPresignedUpload &
 * uploadFileToRemoteStorage b/c we don't want to pass
 * these to every component as it shouldn't change
 * also - we don't want to put the query logic in the
 * lib b/c we don't have access to the apollo client
 */

export interface GlobalFormUploadContextValues {
  queryPresignedUpload: (file: File) => void;
  uploadFileToRemoteStorage: (file: FileStateObject) => void;
}

export interface GlobalFormUploadProviderProps
  extends React.PropsWithChildren<{value: GlobalFormUploadContextValues}> {}

const GlobalFormUploadContext =
  React.createContext<GlobalFormUploadContextValues>({
    queryPresignedUpload: (file: File) => {},
    uploadFileToRemoteStorage: (file: FileStateObject) => {},
  });
  
export function GlobalFormUploadProvider(props: GlobalFormUploadProviderProps) {
  return (
    <GlobalFormUploadContext.Provider value={props.value}>
      {props.children}
    </GlobalFormUploadContext.Provider>
  );
}
export function useGlobalFormUploadContext() {
  const ctx = React.useContext<GlobalFormUploadContextValues>(
    GlobalFormUploadContext
  );
  return ctx;
}
