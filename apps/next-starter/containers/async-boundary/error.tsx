import React from 'react';
import { AyncBoundaryIllustration } from './illustration';

export function AsyncBoundaryError() {
  return (
    <div className="flex flex-col items-center justify-center mx-auto">
      <AyncBoundaryIllustration />
      <h2 className="mt-8 text-gray-700">
        Uh oh, something unexpected happened.
      </h2>
      <h2 className="mt-2 text-gray-700">
        Please try again or{' '}
        <a className="text-primary underline" href="mailto:support@gmail.com">
          contact support
        </a>
      </h2>
    </div>
  );
}
