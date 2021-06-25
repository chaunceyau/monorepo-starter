import cuid from 'cuid';
import * as React from 'react';
import {useDropzone} from 'react-dropzone';
import {useController} from 'react-hook-form';
//
import {FileList as FileListComponent} from './files/file-list';

import {UploadInput} from './input';
import {FormLabel} from '../misc/label';
import {FileStateObject, PresignedUpload} from './types';

/**
 * we don't want to use basic HTML defaultValue because
 * it simply expects string and we want to pass an object
 */
export type FormUploadProps = {
  name: string;
  label: string;
  required?: boolean;
  maxFiles?: number;
  allowedFileTypes?: string[];
  defaultValue?: FileStateObject[];
  onDeleteMutation: () => void;
  presignedUpload: PresignedUpload;
  onUploadComplete: (key: string) => Promise<any>;
} & Partial<Omit<HTMLInputElement, 'value' | 'defaultValue'>>;

/**
 * Upload file component
 *
 *
 * @param props
 * @returns
 */
export function FormUpload(props: FormUploadProps) {
  const {
    field: {ref, ...inputProps},
  } = useController({
    name: props.name,
    rules: {required: props.required},
    defaultValue: convertProvidedDefaultValueToArray(props.defaultValue),
  });

  const onDrop = React.useCallback(
    async (acceptedFiles: File[]) => {
      const currentFiles = inputProps.value;
      const newFiles = mapDroppedFilesToState(acceptedFiles);
      inputProps.onChange([...currentFiles, ...newFiles]);
    },
    [inputProps]
  );

  // should destructure all props of FormUploadProps
  const {
    name,
    label,
    onUploadComplete,
    // onDeleteMutation,
    presignedUpload,
  } = props;

  const {getRootProps, getInputProps, inputRef} = useDropzone({
    onDrop,
    ...inputProps,
    multiple: !!props.multiple,
    maxFiles: props.maxFiles,
    accept: props.allowedFileTypes,
  });

  return (
    <div>
      {/* TODO: FIX ERROR */}
      <FormLabel label={label} name={name} error={false} />
      <FileListComponent
        name={props.name}
        // name={name} <- try this
        value={inputProps.value}
        uploadInputRef={inputRef}
        presignedUpload={presignedUpload}
        onUploadComplete={onUploadComplete}
        allowMultipleFiles={!!props.multiple}
      />
      <UploadInput
        name={name}
        hidden={!!inputProps.value?.length}
        getRootProps={getRootProps}
        getInputProps={getInputProps}
      />
    </div>
  );
}

const mapDroppedFilesToState = (
  acceptedFiles: File[]
): Array<FileStateObject> =>
  acceptedFiles.map(file => ({
    id: cuid(),
    file: file,
    fileName: file.name,
    status: 'IDLE',
    progress: 0,
  }));

function convertProvidedDefaultValueToArray(
  value: undefined | FileStateObject[]
) {
  if (value) {
    return Array.isArray(value) ? value : [value];
  }
  return [];
}
