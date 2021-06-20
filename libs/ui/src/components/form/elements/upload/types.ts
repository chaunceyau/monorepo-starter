export interface FileStateObject extends RemoteFile {
  file?: File;
  status: 'IDLE' | 'COMPLETE' | 'PENDING_REMOVAL' | 'UPLOADING' | 'ERROR';
  progress: number;
}

interface RemoteFile {
  id: string;
  fileName: string;
}

export type PresignedUpload = (file: {
  id: string;
  file: File;
}) => Promise<{
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
