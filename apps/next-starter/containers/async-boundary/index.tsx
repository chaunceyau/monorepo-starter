import React from 'react';
import { AsyncBoundaryError } from './error';
//
import { AsyncBoundaryLoading } from './loading';

export function AsyncBoundary({
  loading,
  error,
  children,
}: {
  loading: boolean;
  error: any;
  children: React.ReactNode;
}): any {
  if (error) {
    return <AsyncBoundaryError />;
  } else if (loading) {
    return <AsyncBoundaryLoading />;
  }
  return children;
}
