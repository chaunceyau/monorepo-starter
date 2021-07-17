import {AxiosRequestConfig} from 'axios';

export interface FileStateObject extends RemoteFile {
  file?: File;
  // ALREADY_SAVED: If has been uploaded and ran `onUploadComplete?` func
  status: 'UPLOADING' | 'SAVED' | 'PENDING_REMOVAL' | 'ERROR';
  progress: number;
}

interface RemoteFile {
  id: string;
  fileName: string;
}

interface PresignedUploadPayload {
  url: string;
  fileId: string;
  fields: Array<{[key: string]: string}>;
}

export type RemoveFileMutation = () => any;
export interface PresignedUploadResponse {
  data: {
    presignedUpload: PresignedUploadPayload;
  };
}

export type PresignedUploadFunction = (
  file: File
) => Promise<PresignedUploadResponse>;

export type UploadToRemoteFileStorageFunction = (
  file: File,
  url: string,
  formData: FormData,
  progressEvent: OnUploadProgressFunction
) => Promise<{success: boolean}>;

export type OnUploadCompleteFunction = (file: FileStateObject) => any;
export type OnUploadProgressFunction = AxiosRequestConfig['onUploadProgress'];
export type OnUploadStartFunction = () => any;
export type OnUploadErrorFunction = (error: any) => any;

export interface UploadEvents {
  onUploadStart?: OnUploadStartFunction;
  onUploadProgressFunction?: OnUploadProgressFunction;
  onUploadComplete?: OnUploadCompleteFunction;
  onUploadError?: OnUploadErrorFunction;
}

export interface GetUploadUrlAndUploadFileOptions {
  queryPresignedUpload: PresignedUploadFunction;
  uploadFileToRemoteStorage: UploadToRemoteFileStorageFunction;
  uploadEvents?: UploadEvents;
  fieldName: string
}
