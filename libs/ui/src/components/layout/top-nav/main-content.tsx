import React from 'react';

interface MainContentProps extends React.PropsWithChildren<{}> {}

export function MainContent(props: MainContentProps) {
  return (
    <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex-grow flex w-full">
      {props.children}
    </main>
  );
}
