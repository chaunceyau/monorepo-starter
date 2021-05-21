import React from 'react';
import { Button, ButtonProps } from './';
import { CheckIcon } from '../icons/check';

interface AsyncButtonProps extends Omit<ButtonProps, 'loading'> {
  onClick: () => Promise<void>;
}

type AsyncButtonState = 'IDLE' | 'LOADING' | 'ERROR' | 'SUCCESS';

export function AsyncButton(props: AsyncButtonProps) {
  const [state, setState] = React.useState<AsyncButtonState>('IDLE');

  return (
    <Button
      buttonStyle={props.buttonStyle}
      onClick={() => {
        setState('LOADING');
        props
          .onClick()
          .then(() => {
            setState('SUCCESS');
          })
          .catch(() => {
            setState('ERROR');
          });
      }}
      loading={state === 'LOADING'}
      disabled={state === 'LOADING' || state === 'SUCCESS'}
    >
      <div className={state === 'SUCCESS' ? 'opacity-0' : ''}>
        {props.children}
      </div>
      {state === 'SUCCESS' ? (
        <div className="text-red-400 absolute w-full h-full flex items-center justify-center -mt-7 -ml-4">
          <CheckIcon />
        </div>
      ) : null}
    </Button>
  );
}
