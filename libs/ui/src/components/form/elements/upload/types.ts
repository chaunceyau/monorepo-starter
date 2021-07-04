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

export type PresignedUploadFunction = (file: {id: string; file: File}) => Promise<{
  data: {
    presignedUpload: PresignedUploadPayload;
  };
}>;

export type OnUploadCompleteFunction = (fileId: string) => any;

interface PresignedUploadPayload {
  url: string;
  fileId: string;
  fields: Array<{[key: string]: string}>;
}
