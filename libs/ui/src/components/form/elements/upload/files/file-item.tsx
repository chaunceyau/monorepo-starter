import {useFormContext} from 'react-hook-form';
//
import {UndoDeleteFileButton} from './undo-delete-button'
import {ProgressBar} from '../../../../misc/progress-bar';
import {CheckIcon} from '../../../../icons/check';
import {LoadingSpinner} from '../../../../misc/spinner';
import {useUploadFileComponent} from '../hooks/useUpload';
import {
  FileStateObject,
  OnUploadCompleteFunction,
} from '../types';
import {DeleteButton} from './delete-button';

interface FileListItemProps extends FileStateObject {
  name: string
  onUploadComplete: OnUploadCompleteFunction;
}

function useCSSClasses(props: FileListItemProps, ctx, state) {
  const pendingRemoval = props.status === 'PENDING_REMOVAL';
  const liClasses = ['flex items-center'];

  if (pendingRemoval) {
    liClasses.push('line-through');
  }

  if (pendingRemoval || ctx.formState.isSubmitting) {
    liClasses.push('text-gray-400');
  } else if (state.error) {
    liClasses.push('text-red-500');
  } else if (!props.file || state.progress === 100) {
    liClasses.push('text-green-500');
  } else {
    liClasses.push('text-gray-400');
  }

  return {
    liClasses
  }
}

export function FileListItem(props: FileListItemProps) {
  const ctx = useFormContext();
  const state = useUploadFileComponent(props, props.onUploadComplete);
  const {liClasses} = useCSSClasses(props, ctx, state);

  if (typeof ctx === 'undefined') {
    throw new Error('FileListItem must be rendered inside a Form component');
  }

  const pendingRemoval = props.status === 'PENDING_REMOVAL';

  // TODO: error on liClasses... i.e. progress not 100 and error
  const showLoading = !state.error && props.file && state.progress !== 100;

  return (
    <li key={props.id} className={liClasses.join(' ')}>
      {showLoading ? <LoadingSpinner color="currentColor" dataTestId="check-svg-file-upload-loading" /> : <CheckIcon dataTestId="check-svg-file-upload-complete" />}

      <p className="flex-shrink-0 flex-grow mr-8 ml-3 overflow-hidden text-sm tracking-wide">
        {props.fileName}
      </p>

      {showLoading ? (
        <div className="flex-grow mr-6">
          <ProgressBar percent={state.progress} />
        </div>
      ) : null}

      {pendingRemoval ? (
        <UndoDeleteFileButton file={props.file} status={props.status} progress={props.progress} id={props.id} fileName={props.fileName} name={props.name} />
      ) : null}
      
      {!pendingRemoval ? (
        <DeleteButton file={props.file} status={props.status} progress={props.progress} id={props.id} fileName={props.fileName} name={props.name} />
      ) : null}
    </li>
  );
}
