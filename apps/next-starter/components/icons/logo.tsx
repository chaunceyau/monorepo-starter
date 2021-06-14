import {config} from '@monorepo-starter/utils';
import React from 'react';

type ApplicationLogoTypes = 'svg-only' | 'svg-and-text' | 'text-only';

interface ApplicationLogoProps {
  logoClassOverrides?: '';
  textClassOverrides?: '';
  variant?: ApplicationLogoTypes;
  orientation?: 'vertical' | 'horizontal';
}

function _ApplicationLogo({
  variant,
  logoClassOverrides,
  textClassOverrides,
}: ApplicationLogoProps) {
  if (variant === 'text-only') {
    return <ApplicationLogoTitle className={textClassOverrides} />;
  } else if (variant === 'svg-and-text') {
    return (
      <>
        <ApplicationLogoImage className={logoClassOverrides} />
        <ApplicationLogoTitle className={textClassOverrides} />
      </>
    );
  } else if (variant === 'svg-only'){
    return <ApplicationLogoImage className={logoClassOverrides} />;
  }
  return <ApplicationLogoImage className={logoClassOverrides} />;
}

export function ApplicationLogo({
  variant = 'svg-only',
  orientation = 'horizontal',
  logoClassOverrides = '',
  textClassOverrides = '',
}: ApplicationLogoProps) {
  const wrapperClasses = [
    'flex',
    orientation === 'vertical' ? 'flex-col' : 'flex-row',
  ];
  return (
    <div className={wrapperClasses.join(' ')}>
      <_ApplicationLogo
        variant={variant}
        logoClassOverrides={logoClassOverrides}
        textClassOverrides={textClassOverrides}
      />
    </div>
  );
}

interface ApplicationLogoTitleProps {
  className?: string;
}

export function ApplicationLogoTitle({className}: ApplicationLogoTitleProps) {
  return <h1 className="text-2xl">{config.applicationName}</h1>;
}

interface ApplicationLogoImageProps {
  className?: string;
}

export function ApplicationLogoImage({className}: ApplicationLogoImageProps) {
  return (
    <img
      className={`mx-auto w-auto h-12`}
      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
      alt="Workflow"
    />
  );
}
