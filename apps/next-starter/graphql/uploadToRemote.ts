import axios from 'axios';

interface UploadHeaders {
  'Content-Type': 'multipart/form-data';
  'Content-Disposition': string;
}

const getUploadHeaders = (file: File): UploadHeaders => ({
  'Content-Type': 'multipart/form-data',
  'Content-Disposition': `attachment; filename=${file.name}`,
});

export async function uploadFileToPresignedS3Url(
  file: File,
  url: string,
  formData: FormData,
  onUploadProgress: (progressEvent: ProgressEvent) => void
) {
  try {
    const response = await axios.post(url, formData, {
      onUploadProgress,
      headers: getUploadHeaders(file),
    });
    return {success: response.status === 204};
  } catch (error) {
    console.log('error:uploadFileToPresignedS3Url');
    console.log(error);
    return {success: false};
  }
}
