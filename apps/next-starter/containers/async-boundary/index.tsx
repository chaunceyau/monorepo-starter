import React from 'react';
//
import {AsyncBoundaryError} from './error';
import {AsyncBoundaryLoading} from './loading';

interface AsyncBoundaryProps extends React.PropsWithChildren<{}> {
  loading: boolean;
  error: any;
}

export function AsyncBoundary(props: AsyncBoundaryProps) {
  if (props.error) {
    return <AsyncBoundaryError />;
  } else if (props.loading) {
    return <AsyncBoundaryLoading />;
  }
  return props.children;
}
