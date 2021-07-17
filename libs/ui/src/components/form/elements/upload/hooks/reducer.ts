import React from 'react';

export interface UploadReducerState {
  error: any;
  loading: boolean;
  progress: number;
}

export interface UploadFileAction {
  type:
    | 'START_UPLOAD'
    | 'UPLOAD_COMPLETE'
    | 'INCREASE_PROGRESS'
    | 'REMOVE_FILE'
    | 'ERROR';
  payload?: any;
}

function uploadReducer(
  state: UploadReducerState,
  action: UploadFileAction
): UploadReducerState {
  switch (action.type) {
    case 'START_UPLOAD': {
      return Object.assign({}, state, {loading: true});
    }
    case 'UPLOAD_COMPLETE': {
      return Object.assign({}, state, {loading: false, progress: 100});
    }
    case 'INCREASE_PROGRESS': {
      return Object.assign({}, state, {progress: action.payload});
    }
    case 'REMOVE_FILE': {
      return null;
    }
    case 'ERROR': {
      return Object.assign({}, state, {
        progress: 0,
        loading: false,
        error: action.payload,
      });
    }
    default: {
      throw new Error('unhandled action in uploadReducer');
    }
  }
}

const initialUploadReducerState = {
  loading: false,
  progress: 0,
  error: undefined,
};

export function useUploadReducer() {
  return React.useReducer(uploadReducer, initialUploadReducerState);
}
