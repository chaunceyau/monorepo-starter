export interface GenerateSignedUploadUrl {
  maxSizeBytes?: number;
  fileName: string;
  fileId: string;
  type: string;
  size: number;
  contentTypeRestrictions?: 'image/png' | 'image' | 'application/pdf';
  meta?: {
    [key: string]: any;
  };
}
